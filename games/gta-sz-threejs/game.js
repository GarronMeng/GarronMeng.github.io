import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.186.0/build/three.module.js';

const canvas = document.querySelector('#game');
const ui = {
  start: document.querySelector('#start-screen'),
  startBtn: document.querySelector('#start-btn'),
  hud: document.querySelector('#hud'),
  speed: document.querySelector('#speed'),
  district: document.querySelector('#district'),
  road: document.querySelector('#road'),
  mode: document.querySelector('#drive-mode'),
  fps: document.querySelector('#fps'),
  distance: document.querySelector('#distance'),
  missionProgress: document.querySelector('#mission-progress'),
  map: document.querySelector('#minimap'),
  steerZone: document.querySelector('#steer-zone'),
  steerThumb: document.querySelector('#steer-thumb'),
  gas: document.querySelector('#gas-btn'),
  brake: document.querySelector('#brake-btn'),
  handbrake: document.querySelector('#handbrake-btn'),
  camera: document.querySelector('#camera-btn'),
  light: document.querySelector('#light-btn'),
  mapBtn: document.querySelector('#map-btn'),
  toast: document.querySelector('#toast'),
};

const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, powerPreference: 'high-performance' });
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.shadowMap.enabled = false;

let targetDpr = Math.min(devicePixelRatio || 1, 1.35);
let renderDpr = targetDpr;
renderer.setPixelRatio(renderDpr);
renderer.setSize(innerWidth, innerHeight, false);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7899ae);
scene.fog = new THREE.FogExp2(0x7899ae, 0.00038);

const camera = new THREE.PerspectiveCamera(62, innerWidth / innerHeight, 0.25, 5000);
camera.position.set(-930, 8, 400);

const hemi = new THREE.HemisphereLight(0xcbe5ff, 0x5b524b, 2.15);
scene.add(hemi);
const sun = new THREE.DirectionalLight(0xffe2bd, 4.3);
sun.position.set(-900, 1200, 600);
scene.add(sun);

const world = new THREE.Group();
scene.add(world);

const roadColor = new THREE.Color(0x343a3d);
const roadMat = new THREE.MeshStandardMaterial({ color: roadColor, roughness: 0.93, metalness: 0.05 });
const shoulderMat = new THREE.MeshStandardMaterial({ color: 0x596066, roughness: 1 });
const lineMat = new THREE.MeshBasicMaterial({ color: 0xd7e0df, toneMapped: false });
const grassMat = new THREE.MeshStandardMaterial({ color: 0x476754, roughness: 1 });
const groundMat = new THREE.MeshStandardMaterial({ color: 0x6f8072, roughness: 1 });
const waterMat = new THREE.MeshPhysicalMaterial({ color: 0x3c7991, roughness: 0.26, metalness: 0.05, transmission: 0, transparent: true, opacity: 0.92 });

const ground = new THREE.Mesh(new THREE.PlaneGeometry(3600, 1900), groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.set(0, -0.08, 0);
world.add(ground);

const bay = new THREE.Mesh(new THREE.PlaneGeometry(4200, 2100), waterMat);
bay.rotation.x = -Math.PI / 2;
bay.position.set(0, -0.03, 1650);
world.add(bay);

const xRoads = [-1450, -1210, -960, -710, -450, -190, 80, 350, 620, 900, 1180, 1450];
const zRoads = [-610, -455, -300, -145, 35, 220, 445, 625];
const majorZ = new Map([[-145, 48], [445, 58]]);
const verticalWidth = 32;
const collisions = [];
const buildingMaterials = [];
const nightReactive = [];
const landmarks = [];

function addRoadStrip(horizontal, coord, width) {
  const length = horizontal ? 3300 : 1500;
  const geom = new THREE.PlaneGeometry(horizontal ? length : width, horizontal ? width : length);
  const mesh = new THREE.Mesh(geom, roadMat);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(horizontal ? 0 : coord, 0.02, horizontal ? coord : 10);
  world.add(mesh);

  const edgeGeom = new THREE.PlaneGeometry(horizontal ? length : 2.5, horizontal ? 2.5 : length);
  for (const side of [-1, 1]) {
    const edge = new THREE.Mesh(edgeGeom, shoulderMat);
    edge.rotation.x = -Math.PI / 2;
    if (horizontal) edge.position.set(0, 0.024, coord + side * (width / 2 + 1.4));
    else edge.position.set(coord + side * (width / 2 + 1.4), 0.024, 10);
    world.add(edge);
  }

  const dashGeom = new THREE.BoxGeometry(horizontal ? 18 : 0.65, 0.03, horizontal ? 0.65 : 18);
  const dashCount = Math.floor(length / 42);
  const dashMesh = new THREE.InstancedMesh(dashGeom, lineMat, dashCount);
  const dummy = new THREE.Object3D();
  for (let i = 0; i < dashCount; i++) {
    const p = -length / 2 + i * 42 + 20;
    dummy.position.set(horizontal ? p : coord, 0.045, horizontal ? coord : p + 10);
    dummy.updateMatrix();
    dashMesh.setMatrixAt(i, dummy.matrix);
  }
  dashMesh.instanceMatrix.needsUpdate = true;
  world.add(dashMesh);
}

zRoads.forEach(z => addRoadStrip(true, z, majorZ.get(z) || 34));
xRoads.forEach(x => addRoadStrip(false, x, verticalWidth));

const park = new THREE.Mesh(new THREE.PlaneGeometry(3300, 140), grassMat);
park.rotation.x = -Math.PI / 2;
park.position.set(0, 0.015, 705);
world.add(park);

function rng(seed) {
  let t = seed >>> 0;
  return () => {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}
const random = rng(20260916);

function districtForX(x) {
  if (x < -500) return '南山';
  if (x < 520) return '福田';
  return '罗湖';
}

const buildingGeom = new THREE.BoxGeometry(1, 1, 1);
const buildBatches = [
  { mat: new THREE.MeshStandardMaterial({ color: 0xa7b6bf, roughness: .55, metalness: .15, vertexColors: true }), list: [] },
  { mat: new THREE.MeshStandardMaterial({ color: 0x798a94, roughness: .62, metalness: .18, vertexColors: true }), list: [] },
  { mat: new THREE.MeshStandardMaterial({ color: 0xb5a89b, roughness: .68, metalness: .08, vertexColors: true }), list: [] },
];
buildBatches.forEach(b => { buildingMaterials.push(b.mat); nightReactive.push(b.mat); });

function addBuildingRecord(x, z, w, d, h, tint) {
  const batch = buildBatches[Math.floor(random() * buildBatches.length)];
  batch.list.push({ x, z, w, d, h, tint });
  collisions.push({ minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 });
}

for (let xi = 0; xi < xRoads.length - 1; xi++) {
  for (let zi = 0; zi < zRoads.length - 1; zi++) {
    const x0 = xRoads[xi] + verticalWidth / 2 + 13;
    const x1 = xRoads[xi + 1] - verticalWidth / 2 - 13;
    const z0 = zRoads[zi] + (majorZ.get(zRoads[zi]) || 34) / 2 + 12;
    const z1 = zRoads[zi + 1] - (majorZ.get(zRoads[zi + 1]) || 34) / 2 - 12;
    if (x1 - x0 < 55 || z1 - z0 < 55) continue;
    const district = districtForX((x0 + x1) / 2);
    const count = 2 + Math.floor(random() * 3);
    for (let b = 0; b < count; b++) {
      const w = 34 + random() * 52;
      const d = 34 + random() * 54;
      const x = THREE.MathUtils.lerp(x0 + w / 2, x1 - w / 2, random());
      const z = THREE.MathUtils.lerp(z0 + d / 2, z1 - d / 2, random());
      const centerBoost = Math.max(0, 1 - Math.abs(x) / 1000);
      const distBoost = district === '福田' ? 1.45 : district === '罗湖' ? 1.1 : 1.0;
      const h = 30 + random() * 90 + random() * random() * 120 * distBoost + centerBoost * random() * 55;
      const tint = new THREE.Color().setHSL(0.53 + (random() - .5) * .07, .08 + random() * .12, .48 + random() * .18);
      addBuildingRecord(x, z, w, d, h, tint);
    }
  }
}

for (const batch of buildBatches) {
  const mesh = new THREE.InstancedMesh(buildingGeom, batch.mat, batch.list.length);
  mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  const dummy = new THREE.Object3D();
  batch.list.forEach((b, i) => {
    dummy.position.set(b.x, b.h / 2, b.z);
    dummy.scale.set(b.w, b.h, b.d);
    dummy.rotation.y = (random() - .5) * .12;
    dummy.updateMatrix();
    mesh.setMatrixAt(i, dummy.matrix);
    mesh.setColorAt(i, b.tint);
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = true;
  world.add(mesh);
}

function addLandmark(name, x, z, height, color, kind = 'tower') {
  const group = new THREE.Group();
  group.position.set(x, 0, z);
  let body;
  const mat = new THREE.MeshStandardMaterial({ color, roughness: .35, metalness: .35, emissive: 0x000000 });
  nightReactive.push(mat);
  if (kind === 'bamboo') {
    body = new THREE.Mesh(new THREE.CylinderGeometry(25, 38, height, 10), mat);
    body.position.y = height / 2;
    const crown = new THREE.Mesh(new THREE.ConeGeometry(25, 42, 10), mat);
    crown.position.y = height + 18;
    group.add(body, crown);
  } else if (kind === 'kk') {
    body = new THREE.Mesh(new THREE.BoxGeometry(58, height, 42), mat);
    body.position.y = height / 2;
    body.scale.x = .78;
    group.add(body);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(38, 24, 34), mat);
    cap.position.y = height + 12;
    group.add(cap);
  } else {
    body = new THREE.Mesh(new THREE.BoxGeometry(46, height, 46), mat);
    body.position.y = height / 2;
    group.add(body);
    const top = new THREE.Mesh(new THREE.ConeGeometry(16, 46, 4), mat);
    top.position.y = height + 23;
    top.rotation.y = Math.PI / 4;
    group.add(top);
  }
  world.add(group);
  collisions.push({ minX: x - 38, maxX: x + 38, minZ: z - 38, maxZ: z + 38 });
  landmarks.push({ name, x, z, group });
  return group;
}

addLandmark('华润春笋', -870, 65, 210, 0x9fbcc8, 'bamboo');
addLandmark('平安金融中心', 235, -210, 355, 0x899ba5, 'tower');
addLandmark('京基100', 1020, -190, 265, 0xa7b7bd, 'kk');

const civic = new THREE.Group();
civic.position.set(50, 0, -470);
const civicMat = new THREE.MeshStandardMaterial({ color: 0xb8bfc0, roughness: .55 });
const civicRoofMat = new THREE.MeshStandardMaterial({ color: 0xc94b3e, roughness: .48, emissive: 0x000000 });
nightReactive.push(civicRoofMat);
for (const x of [-42, 42]) {
  const t = new THREE.Mesh(new THREE.ConeGeometry(28, 78, 4), civicMat);
  t.position.set(x, 39, 0); t.rotation.y = Math.PI / 4; civic.add(t);
}
const roof = new THREE.Mesh(new THREE.BoxGeometry(150, 10, 54), civicRoofMat); roof.position.y = 78; civic.add(roof);
world.add(civic); landmarks.push({ name: '深圳市民中心', x: 50, z: -470, group: civic });
collisions.push({ minX: -35, maxX: 135, minZ: -510, maxZ: -430 });

const mountainMat = new THREE.MeshStandardMaterial({ color: 0x536760, roughness: 1 });
for (let i = 0; i < 22; i++) {
  const x = -1750 + i * 170 + random() * 50;
  const r = 100 + random() * 130;
  const h = 160 + random() * 240;
  const m = new THREE.Mesh(new THREE.ConeGeometry(r, h, 5), mountainMat);
  m.position.set(x, h / 2 - 15, -980 - random() * 120);
  m.rotation.y = random() * Math.PI;
  world.add(m);
}

const car = new THREE.Group();
const carBodyMat = new THREE.MeshStandardMaterial({ color: 0xd7dde0, roughness: .25, metalness: .68 });
const carDark = new THREE.MeshStandardMaterial({ color: 0x171b1d, roughness: .38, metalness: .35 });
const carGlass = new THREE.MeshStandardMaterial({ color: 0x28434f, roughness: .18, metalness: .3, transparent: true, opacity: .78 });
const body = new THREE.Mesh(new THREE.BoxGeometry(2.05, .58, 4.45), carBodyMat); body.position.y = .68; car.add(body);
const roofMesh = new THREE.Mesh(new THREE.BoxGeometry(1.7, .56, 2.2), carGlass); roofMesh.position.set(0, 1.18, -.25); car.add(roofMesh);
const bumper = new THREE.Mesh(new THREE.BoxGeometry(2.1, .22, .24), carDark); bumper.position.set(0, .5, 2.2); car.add(bumper);
const wheelGeo = new THREE.CylinderGeometry(.42, .42, .28, 14);
for (const x of [-1.02, 1.02]) for (const z of [-1.45, 1.45]) {
  const w = new THREE.Mesh(wheelGeo, carDark); w.rotation.z = Math.PI / 2; w.position.set(x, .47, z); car.add(w);
}
world.add(car);

const state = { x: -900, z: 438, y: .08, yaw: Math.PI / 2, speed: 0, steer: 0, cameraMode: 0, night: false, missionDone: false };
const input = { steer: 0, throttle: 0, brake: 0, handbrake: 0 };
const target = { x: 235, z: -210 };
const initialDistance = Math.hypot(state.x - target.x, state.z - target.z);
const cameraPos = new THREE.Vector3();
const lookTarget = new THREE.Vector3();
const forward = new THREE.Vector3();
const previous = { x: state.x, z: state.z };

const beaconMat = new THREE.MeshBasicMaterial({ color: 0x71f5c6, transparent: true, opacity: .23, depthWrite: false });
const beacon = new THREE.Mesh(new THREE.CylinderGeometry(7, 7, 180, 12, 1, true), beaconMat);
beacon.position.set(target.x, 90, target.z);
world.add(beacon);

const traffic = [];
const trafficGeom = new THREE.BoxGeometry(1.8, .7, 4.0);
const trafficMats = [0x4f6f84, 0xb7bab8, 0x80625b, 0x29343a].map(c => new THREE.MeshStandardMaterial({ color: c, roughness: .45, metalness: .35 }));
for (let i = 0; i < 28; i++) {
  const axis = i % 4 === 0 ? 'z' : 'x';
  const lane = axis === 'x' ? (i % 2 ? -145 : 445) + (i % 3 - 1) * 7.2 : [-960, -190, 620, 1180][i % 4] + (i % 2 ? 6.5 : -6.5);
  const mesh = new THREE.Mesh(trafficGeom, trafficMats[i % trafficMats.length]);
  const dir = i % 2 ? 1 : -1;
  const t = { mesh, axis, lane, dir, p: -1450 + random() * 2900, speed: 15 + random() * 12 };
  traffic.push(t); world.add(mesh);
}

function updateTraffic(dt) {
  for (const t of traffic) {
    t.p += t.dir * t.speed * dt;
    if (t.p > 1550) t.p = -1550;
    if (t.p < -1550) t.p = 1550;
    if (t.axis === 'x') {
      t.mesh.position.set(t.p, .45, t.lane);
      t.mesh.rotation.y = t.dir > 0 ? Math.PI / 2 : -Math.PI / 2;
    } else {
      t.mesh.position.set(t.lane, .45, t.p / 1.75);
      t.mesh.rotation.y = t.dir > 0 ? 0 : Math.PI;
    }
  }
}

function nearestRoad() {
  let best = { d: Infinity, name: '城市支路', road: true };
  for (const z of zRoads) {
    const d = Math.abs(state.z - z);
    if (d < best.d) best = { d, name: z === 445 ? '滨海大道' : z === -145 ? '深南大道' : '城市支路', road: true };
  }
  for (const x of xRoads) {
    const d = Math.abs(state.x - x);
    if (d < best.d) best = { d, name: '南北城市道路', road: true };
  }
  best.road = best.d < 31;
  return best;
}

function collides(x, z) {
  if (x < -1640 || x > 1640 || z < -770 || z > 735) return true;
  for (const b of collisions) {
    if (x > b.minX - 2.0 && x < b.maxX + 2.0 && z > b.minZ - 2.5 && z < b.maxZ + 2.5) return true;
  }
  return false;
}

let toastTimer = 0;
function toast(message) {
  ui.toast.textContent = message;
  ui.toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => ui.toast.classList.remove('show'), 1700);
}

function updateCar(dt) {
  const road = nearestRoad();
  const maxForward = road.road ? 64 : 28;
  const accel = road.road ? 19 : 11;
  const rolling = road.road ? .996 : .985;

  if (input.throttle) state.speed += accel * input.throttle * dt;
  if (input.brake) {
    if (state.speed > 1.2) state.speed -= 35 * input.brake * dt;
    else state.speed -= 10 * input.brake * dt;
  }
  if (!input.throttle && !input.brake) state.speed *= Math.pow(rolling, dt * 60);
  if (input.handbrake) state.speed *= Math.pow(.94, dt * 60);
  state.speed = THREE.MathUtils.clamp(state.speed, -11, maxForward);

  state.steer = THREE.MathUtils.lerp(state.steer, input.steer, 1 - Math.pow(.0015, dt));
  const speedFactor = THREE.MathUtils.clamp(Math.abs(state.speed) / 12, 0, 1);
  const steerGain = (input.handbrake ? 1.8 : 1.0) * (0.9 + (1 - Math.min(Math.abs(state.speed) / 55, 1)) * .42);
  state.yaw += state.steer * speedFactor * steerGain * (state.speed >= 0 ? 1 : -1) * dt;

  previous.x = state.x; previous.z = state.z;
  forward.set(Math.sin(state.yaw), 0, Math.cos(state.yaw));
  state.x += forward.x * state.speed * dt;
  state.z += forward.z * state.speed * dt;

  if (collides(state.x, state.z)) {
    state.x = previous.x; state.z = previous.z;
    if (Math.abs(state.speed) > 4) toast('撞到了，慢一点');
    state.speed *= -0.18;
  }

  car.position.set(state.x, state.y, state.z);
  car.rotation.y = state.yaw;

  const dist = Math.hypot(state.x - target.x, state.z - target.z);
  if (!state.missionDone && dist < 58) {
    state.missionDone = true;
    toast('已抵达平安金融中心');
  }
}

function updateCamera(dt) {
  forward.set(Math.sin(state.yaw), 0, Math.cos(state.yaw));
  if (state.cameraMode === 2) {
    cameraPos.set(state.x + forward.x * 1.0, 1.72, state.z + forward.z * 1.0);
    camera.position.lerp(cameraPos, 1 - Math.pow(.00001, dt));
    lookTarget.set(state.x + forward.x * 35, 1.45, state.z + forward.z * 35);
  } else {
    const far = state.cameraMode === 1;
    const back = far ? 14.5 : 8.4;
    const height = far ? 7.2 : 4.3;
    cameraPos.set(state.x - forward.x * back, height, state.z - forward.z * back);
    camera.position.lerp(cameraPos, 1 - Math.pow(.002, dt));
    lookTarget.set(state.x + forward.x * (far ? 7 : 5), 1.25, state.z + forward.z * (far ? 7 : 5));
  }
  camera.lookAt(lookTarget);
}

function updateHud() {
  const speedKmh = Math.round(Math.abs(state.speed) * 3.6);
  ui.speed.textContent = String(speedKmh);
  ui.district.textContent = districtForX(state.x);
  const road = nearestRoad();
  ui.road.textContent = road.name;
  ui.mode.textContent = road.road ? '公路' : '非铺装';
  const dist = Math.hypot(state.x - target.x, state.z - target.z);
  ui.distance.textContent = dist > 1000 ? `${(dist / 1000).toFixed(1)} km` : `${Math.round(dist)} m`;
  const progress = THREE.MathUtils.clamp(1 - dist / initialDistance, 0, 1);
  ui.missionProgress.style.width = `${Math.round(progress * 100)}%`;
}

const mapCtx = ui.map.getContext('2d');
function drawMap() {
  const w = ui.map.width, h = ui.map.height;
  const sx = w / 3300, sz = h / 1500;
  const mx = x => w / 2 + x * sx;
  const mz = z => h / 2 + z * sz;
  mapCtx.clearRect(0, 0, w, h);
  mapCtx.fillStyle = '#071014'; mapCtx.fillRect(0, 0, w, h);
  mapCtx.fillStyle = '#143446'; mapCtx.fillRect(0, mz(735), w, h - mz(735));
  mapCtx.strokeStyle = 'rgba(220,235,240,.25)'; mapCtx.lineWidth = 3;
  for (const z of zRoads) { mapCtx.beginPath(); mapCtx.moveTo(0, mz(z)); mapCtx.lineTo(w, mz(z)); mapCtx.stroke(); }
  for (const x of xRoads) { mapCtx.beginPath(); mapCtx.moveTo(mx(x), 0); mapCtx.lineTo(mx(x), h); mapCtx.stroke(); }
  mapCtx.font = '16px -apple-system, sans-serif'; mapCtx.fillStyle = 'rgba(255,255,255,.35)';
  mapCtx.fillText('南山', 35, 28); mapCtx.fillText('福田', 140, 28); mapCtx.fillText('罗湖', 248, 28);
  mapCtx.fillStyle = '#71f5c6';
  mapCtx.beginPath(); mapCtx.arc(mx(target.x), mz(target.z), 6, 0, Math.PI * 2); mapCtx.fill();
  mapCtx.save(); mapCtx.translate(mx(state.x), mz(state.z)); mapCtx.rotate(-state.yaw + Math.PI / 2); mapCtx.fillStyle = '#ffffff';
  mapCtx.beginPath(); mapCtx.moveTo(9, 0); mapCtx.lineTo(-7, -6); mapCtx.lineTo(-4, 0); mapCtx.lineTo(-7, 6); mapCtx.closePath(); mapCtx.fill(); mapCtx.restore();
}

function setNight(on) {
  state.night = on;
  if (on) {
    scene.background.set(0x091321); scene.fog.color.set(0x091321); scene.fog.density = .00048;
    hemi.intensity = .42; hemi.color.set(0x5b75a2); hemi.groundColor.set(0x171923);
    sun.intensity = .25; sun.color.set(0x6d84bd);
    waterMat.color.set(0x163e55); roadMat.color.set(0x1f2529); groundMat.color.set(0x2b3a33);
    nightReactive.forEach(m => { m.emissive.set(0x24384a); m.emissiveIntensity = .42; });
    beaconMat.opacity = .42;
  } else {
    scene.background.set(0x7899ae); scene.fog.color.set(0x7899ae); scene.fog.density = .00038;
    hemi.intensity = 2.15; hemi.color.set(0xcbe5ff); hemi.groundColor.set(0x5b524b);
    sun.intensity = 4.3; sun.color.set(0xffe2bd);
    waterMat.color.set(0x3c7991); roadMat.color.set(0x343a3d); groundMat.color.set(0x6f8072);
    nightReactive.forEach(m => { m.emissive.set(0x000000); m.emissiveIntensity = 0; });
    beaconMat.opacity = .23;
  }
}

const keyMap = new Set();
addEventListener('keydown', e => { keyMap.add(e.code); if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight','Space'].includes(e.code)) e.preventDefault(); });
addEventListener('keyup', e => keyMap.delete(e.code));

function applyKeyboard() {
  const left = keyMap.has('KeyA') || keyMap.has('ArrowLeft');
  const right = keyMap.has('KeyD') || keyMap.has('ArrowRight');
  const up = keyMap.has('KeyW') || keyMap.has('ArrowUp');
  const down = keyMap.has('KeyS') || keyMap.has('ArrowDown');
  if (left || right) input.steer = (right ? 1 : 0) - (left ? 1 : 0);
  input.throttle = up ? 1 : input.throttle;
  input.brake = down ? 1 : input.brake;
  input.handbrake = keyMap.has('Space') ? 1 : input.handbrake;
}

let steerPointer = null;
function steerFromEvent(e) {
  const r = ui.steerZone.getBoundingClientRect();
  const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
  let dx = e.clientX - cx, dy = e.clientY - cy;
  const radius = r.width * .34;
  const len = Math.hypot(dx, dy);
  if (len > radius) { dx = dx / len * radius; dy = dy / len * radius; }
  input.steer = THREE.MathUtils.clamp(dx / radius, -1, 1);
  ui.steerThumb.style.transform = `translate3d(${dx}px,${dy * .45}px,0)`;
}
ui.steerZone.addEventListener('pointerdown', e => { steerPointer = e.pointerId; ui.steerZone.setPointerCapture(e.pointerId); steerFromEvent(e); });
ui.steerZone.addEventListener('pointermove', e => { if (e.pointerId === steerPointer) steerFromEvent(e); });
ui.steerZone.addEventListener('pointerup', e => { if (e.pointerId !== steerPointer) return; steerPointer = null; input.steer = 0; ui.steerThumb.style.transform = 'translate3d(0,0,0)'; });
ui.steerZone.addEventListener('pointercancel', () => { steerPointer = null; input.steer = 0; ui.steerThumb.style.transform = 'translate3d(0,0,0)'; });

function bindHold(el, key, value = 1) {
  const on = e => { e.preventDefault(); input[key] = value; el.classList.add('active'); try { el.setPointerCapture(e.pointerId); } catch {} };
  const off = e => { e.preventDefault(); input[key] = 0; el.classList.remove('active'); };
  el.addEventListener('pointerdown', on); el.addEventListener('pointerup', off); el.addEventListener('pointercancel', off); el.addEventListener('lostpointercapture', off);
}
bindHold(ui.gas, 'throttle'); bindHold(ui.brake, 'brake'); bindHold(ui.handbrake, 'handbrake');

ui.camera.addEventListener('click', () => { state.cameraMode = (state.cameraMode + 1) % 3; toast(['追尾镜头','远景镜头','车头镜头'][state.cameraMode]); });
ui.light.addEventListener('click', () => { setNight(!state.night); toast(state.night ? '夜景模式' : '白天模式'); });
ui.mapBtn.addEventListener('click', () => { const hidden = ui.map.style.display === 'none'; ui.map.style.display = hidden ? '' : 'none'; toast(hidden ? '小地图已打开' : '小地图已隐藏'); });

async function enterGame() {
  try {
    if (document.documentElement.requestFullscreen && !document.fullscreenElement) await document.documentElement.requestFullscreen();
  } catch {}
  try {
    if (screen.orientation?.lock) await screen.orientation.lock('landscape');
  } catch {}
  ui.start.classList.add('hidden');
  ui.hud.classList.remove('hidden');
  running = true;
  last = performance.now();
  toast('目的地：平安金融中心');
}
ui.startBtn.addEventListener('click', enterGame);

let running = false;
let last = performance.now();
let fpsFrames = 0, fpsLast = performance.now(), lowFpsTicks = 0;
let hudTimer = 0, mapTimer = 0;

function animate(now) {
  requestAnimationFrame(animate);
  const rawDt = Math.min((now - last) / 1000, .05); last = now;
  if (!running) {
    camera.position.x = -900 + Math.sin(now * .00008) * 80;
    camera.lookAt(-820, 20, 420);
    renderer.render(scene, camera);
    return;
  }

  input.throttle = ui.gas.classList.contains('active') ? 1 : 0;
  input.brake = ui.brake.classList.contains('active') ? 1 : 0;
  input.handbrake = ui.handbrake.classList.contains('active') ? 1 : 0;
  applyKeyboard();

  updateCar(rawDt);
  updateTraffic(rawDt);
  updateCamera(rawDt);
  beacon.rotation.y += rawDt * .22;
  renderer.render(scene, camera);

  hudTimer += rawDt; mapTimer += rawDt;
  if (hudTimer > .1) { updateHud(); hudTimer = 0; }
  if (mapTimer > .15) { drawMap(); mapTimer = 0; }

  fpsFrames++;
  if (now - fpsLast >= 1000) {
    const fps = Math.round(fpsFrames * 1000 / (now - fpsLast));
    ui.fps.textContent = `${fps} FPS`;
    fpsFrames = 0; fpsLast = now;
    if (fps < 32) lowFpsTicks++; else lowFpsTicks = Math.max(0, lowFpsTicks - 1);
    if (lowFpsTicks >= 3 && renderDpr > .85) {
      renderDpr = Math.max(.85, renderDpr - .15); renderer.setPixelRatio(renderDpr); renderer.setSize(innerWidth, innerHeight, false); lowFpsTicks = 0;
      toast('已自动降低画质以保持流畅');
    }
  }
}
requestAnimationFrame(animate);

function resize() {
  camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix();
  renderer.setSize(innerWidth, innerHeight, false);
}
addEventListener('resize', resize, { passive: true });
addEventListener('orientationchange', () => setTimeout(resize, 180), { passive: true });

drawMap();
updateHud();
