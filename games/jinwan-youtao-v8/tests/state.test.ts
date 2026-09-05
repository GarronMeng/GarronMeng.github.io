import test from 'node:test';
import assert from 'node:assert/strict';
import {createVisualFixture} from '../src/state/fixture';
import {createStore} from '../src/state/store';
import {floorForEntity,rooms} from '../src/state/selectors';
import {sceneLayout} from '../src/render/layout';
import {roomFactory} from '../src/render/room';
import {facilityFactory} from '../src/render/facilities';
import {batchStatic} from '../src/render/primitives';
import {Group,Mesh,InstancedMesh} from 'three';
test('each room/facility belongs to exactly one real floor and one renderer anchor',()=>{
 const s=createVisualFixture(),layout=sceneLayout(s),ids=s.floors.flatMap(f=>f.entityIds);
 assert.equal(new Set(ids).size,ids.length);assert.equal(ids.length,Object.keys(s.entities).length);
 for(const id of ids){assert.equal(layout.entities.filter(a=>a.id===id).length,1);assert.equal(floorForEntity(s,id)?.id,s.entities[id].floorId);}
 assert.equal(rooms(s).length,9);
});
test('301 selection resolves 301 data; no index or private renderer state involved',()=>{
 const store=createStore();let emissions=0;const stop=store.subscribe(()=>emissions++);store.select('room-301');
 const s=store.getState(),r=s.entities[s.selectedId!];assert.equal(r.kind,'room');if(r.kind==='room'){assert.equal(r.number,'301');assert.equal(r.floorId,'floor-3');assert.equal(r.guestId,'guest-chen');}
 store.select('room-301');assert.equal(s.visited.length,1);assert.equal(store.getState().visited.length,1);assert.equal(emissions,2);stop();store.select(null);assert.equal(emissions,2);
 assert.throws(()=>store.select('room-999'));assert.throws(()=>store.focusFloor('missing'));
});
test('layout scales beyond 8F without room/facility role collision',()=>{
 const s=createVisualFixture(7),layout=sceneLayout(s);assert.ok(s.floors.some(f=>f.label==='8F'));assert.equal(s.floors.find(f=>f.role==='club')?.label,'9F');
 assert.equal(layout.entities.find(e=>e.id==='room-801')?.floorId,'floor-8');assert.equal(s.entities['facility-club'].kind,'facility');
 assert.ok(layout.height>sceneLayout(createVisualFixture()).height);
});
test('store is immutable and all speeds available on initial fixture',()=>{
 const store=createStore();for(const v of [1,2,4] as const){store.setSpeed(v);assert.equal(store.getState().speed,v);}
 assert.throws(()=>{(store.getState().entities['room-301'] as any).number='999'});assert.throws(()=>store.setSpeed(3 as any));
 store.setAtmosphere('night');assert.equal(store.getState().atmosphere,'night');
});
test('factories produce finite geometry for each status and distinct public spaces',()=>{
 const s=createVisualFixture(),room=rooms(s)[0];for(const status of ['available','occupied','reserved','dirty','cleaning','maintenance','unbuilt'] as const){const g=roomFactory({...room,status});assert.ok(g.children.length>8);g.traverse(o=>assert.ok([...o.position,...o.scale].every(Number.isFinite)));}
 const sizes=new Set(['lobby','breakfast','club','gym','rooftop'].map(role=>facilityFactory(role as any).children.length));assert.equal(sizes.size,5);
});
test('batching preserves static mesh count and yields far fewer draw objects',()=>{
 const g=new Group();for(const role of ['lobby','breakfast','club','gym','rooftop'])g.add(facilityFactory(role as any));let before=0;g.traverse(o=>{if(o instanceof Mesh)before++});batchStatic(g);let after=0,instances=0;g.traverse(o=>{if(o instanceof Mesh)after++;if(o instanceof InstancedMesh)instances+=o.count;});assert.ok(after<before/3);assert.ok(instances>100);
});
import {createEntityCollider,pickEntity} from '../src/render/interaction';
import {OrthographicCamera,Raycaster,Vector2,Vector3} from 'three';
test('raycasts select the exact entity on every floor including expanded 8F',()=>{
 const s=createVisualFixture(7),layout=sceneLayout(s),root=new Group();const colliders:Mesh[]=[];
 for(const anchor of layout.entities){const g=new Group();g.position.copy(anchor.position);root.add(g);const mesh=createEntityCollider(anchor.id,s.entities[anchor.id].kind==='room'?4.65:14.6,2.3);g.add(mesh);colliders.push(mesh);}root.updateMatrixWorld(true);
 const camera=new OrthographicCamera(-10,10,12,-12,.1,100);camera.position.set(3.4,20,46);camera.lookAt(-.3,13.6,0);camera.updateMatrixWorld();
 const ray=new Raycaster();for(const c of colliders){const p=c.getWorldPosition(new Vector3()).project(camera);ray.setFromCamera(new Vector2(p.x,p.y),camera);assert.equal(pickEntity(ray,colliders),c.userData.entityId);}
});
test('public usage counters equal actual fixture guests, excluding staff',()=>{const s=createVisualFixture();for(const e of Object.values(s.entities)){if(e.kind==='facility'){assert.equal(e.usage,s.guests.filter(g=>g.floorId===e.floorId&&!g.staff).length);assert.equal(e.staffing,s.guests.filter(g=>g.floorId===e.floorId&&g.staff).length);}}});
