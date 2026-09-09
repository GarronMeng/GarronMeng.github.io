import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.js';

export function createVFXSystem({scene,actors,timer,shake}){
  const transients=[];
  const sharedGeo={ring:null,beam:null,slash:null};
  const tmp=new THREE.Vector3(),tmp2=new THREE.Vector3();
  const quality=(()=>{const mem=Number(navigator.deviceMemory||0),mobile=Math.min(innerWidth||999,innerHeight||999)<520;if(mobile&&(mem&&mem<=4))return{name:'LOW',factor:.42,particles:72};if(mobile)return{name:'MED',factor:.7,particles:120};return{name:'HIGH',factor:1,particles:180}})();

  class ParticlePool{
    constructor(capacity){
      this.capacity=capacity;this.cursor=0;
      const g=new THREE.InstancedBufferGeometry();
      g.setAttribute('position',new THREE.BufferAttribute(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3));
      g.setAttribute('uv',new THREE.BufferAttribute(new Float32Array([0,0,1,0,1,1,0,1]),2));
      g.setIndex(new THREE.BufferAttribute(new Uint16Array([0,1,2,0,2,3]),1));
      const defs={start:[3,new Float32Array(capacity*3)],vel:[3,new Float32Array(capacity*3)],color:[3,new Float32Array(capacity*3)],spawn:[1,new Float32Array(capacity)],life:[1,new Float32Array(capacity)],size:[1,new Float32Array(capacity)]};
      this.attrs={};this.data={};
      for(const [k,[n,a]] of Object.entries(defs)){const x=new THREE.InstancedBufferAttribute(a,n);x.setUsage(THREE.DynamicDrawUsage);g.setAttribute('a'+k[0].toUpperCase()+k.slice(1),x);this.attrs[k]=x;this.data[k]=a}
      this.data.spawn.fill(-999);g.instanceCount=capacity;g.boundingSphere=new THREE.Sphere(new THREE.Vector3(),100);
      this.mat=new THREE.ShaderMaterial({transparent:true,depthWrite:false,depthTest:true,blending:THREE.AdditiveBlending,toneMapped:false,uniforms:{uTime:{value:0},uGravity:{value:new THREE.Vector3(0,-1.35,0)}},vertexShader:`attribute vec3 aStart;attribute vec3 aVel;attribute vec3 aColor;attribute float aSpawn;attribute float aLife;attribute float aSize;uniform float uTime;uniform vec3 uGravity;varying vec2 vUv;varying vec3 vColor;varying float vAlpha;void main(){float age=(uTime-aSpawn)/max(.001,aLife);float live=step(0.,age)*step(age,1.);float e=clamp(age,0.,1.);vec3 wp=aStart+aVel*(e*aLife)+.5*uGravity*(e*aLife)*(e*aLife);vec4 mv=viewMatrix*vec4(wp,1.);float s=aSize*(.7+.45*sin(3.14159*e));mv.xy+=position.xy*s;gl_Position=projectionMatrix*mv;vUv=uv;vColor=aColor;vAlpha=live*(1.-smoothstep(.55,1.,e))*smoothstep(0.,.08,e);}`,fragmentShader:`varying vec2 vUv;varying vec3 vColor;varying float vAlpha;void main(){float d=length(vUv-.5);float a=smoothstep(.5,.06,d)*vAlpha;if(a<.01)discard;gl_FragColor=vec4(vColor,a);}`});
      this.mesh=new THREE.Mesh(g,this.mat);this.mesh.frustumCulled=false;this.mesh.renderOrder=14;scene.add(this.mesh);this.geometry=g;
    }
    emit(position,color,count,{speed=1,spread=.7,up=.25,size=.12,life=.55,dir=null}={}){count=Math.max(1,Math.round(count*quality.factor));const c=new THREE.Color(color),base=dir?dir.clone().normalize():null;for(let n=0;n<count;n++){const i=this.cursor;this.cursor=(i+1)%this.capacity;const i3=i*3;this.data.start[i3]=position.x;this.data.start[i3+1]=position.y;this.data.start[i3+2]=position.z;let vx=(Math.random()-.5)*spread,vy=up+Math.random()*spread*.55,vz=(Math.random()-.5)*spread;if(base){vx+=base.x*speed;vy+=base.y*speed;vz+=base.z*speed}else{const l=Math.hypot(vx,vy,vz)||1;vx=vx/l*speed;vy=vy/l*speed;vz=vz/l*speed}this.data.vel[i3]=vx;this.data.vel[i3+1]=vy;this.data.vel[i3+2]=vz;this.data.color[i3]=c.r;this.data.color[i3+1]=c.g;this.data.color[i3+2]=c.b;this.data.spawn[i]=timer.getElapsed();this.data.life[i]=life*(.8+Math.random()*.4);this.data.size[i]=size*(.75+Math.random()*.55)}Object.values(this.attrs).forEach(a=>a.needsUpdate=true)}
    update(t){this.mat.uniforms.uTime.value=t}
    dispose(){scene.remove(this.mesh);this.geometry.dispose();this.mat.dispose()}
  }
  const particles=new ParticlePool(quality.particles);
  const retire=e=>{scene.remove(e.o);if(!e.o.userData.sharedGeo)e.o.geometry?.dispose?.();e.o.material?.dispose?.()};
  const transient=(o,duration,update)=>{if(transients.length>=22)retire(transients.shift());scene.add(o);transients.push({o,age:0,duration,update});return o};
  const ringGeo=()=>sharedGeo.ring||(sharedGeo.ring=new THREE.RingGeometry(.58,1,28));
  const beamGeo=()=>sharedGeo.beam||(sharedGeo.beam=new THREE.CylinderGeometry(1,1,1,8,1,true));
  const slashGeo=()=>sharedGeo.slash||(sharedGeo.slash=new THREE.PlaneGeometry(1,.075));
  const pulseRing=(at,color,size=.28,duration=.5)=>{const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.75,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending});const o=new THREE.Mesh(ringGeo(),mat);o.userData.sharedGeo=true;o.position.copy(at);o.rotation.x=-Math.PI/2;return transient(o,duration,q=>{o.scale.setScalar(size*(.75+q*2.4));mat.opacity=.78*(1-q)})};
  const beam=(a,b,color,width=.055,duration=.25)=>{const d=tmp.copy(b).sub(a),len=d.length(),mid=tmp2.copy(a).add(b).multiplyScalar(.5);const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.75,blending:THREE.AdditiveBlending,depthWrite:false});const o=new THREE.Mesh(beamGeo(),mat);o.userData.sharedGeo=true;o.position.copy(mid);o.scale.set(width,len,width);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),d.normalize());return transient(o,duration,q=>{mat.opacity=.82*(1-q);o.scale.x=o.scale.z=width*(1+q*.7)})};
  const slash=(at,color=0xc287ff,strong=false)=>{for(const r of [-.62,.62]){const mat=new THREE.MeshBasicMaterial({color,transparent:true,opacity:.88,side:THREE.DoubleSide,depthWrite:false,blending:THREE.AdditiveBlending});const o=new THREE.Mesh(slashGeo(),mat);o.userData.sharedGeo=true;o.position.copy(at).add(new THREE.Vector3(0,.8,0));o.scale.x=strong?1.55:1.15;o.rotation.z=r;transient(o,.28,q=>{o.scale.x=(strong?1.55:1.15)*(1+q*.55);mat.opacity=.9*(1-q)})}};
  const head=g=>g.localToWorld(new THREE.Vector3(0,1.52,0));
  const hand=g=>g.localToWorld(new THREE.Vector3(g.userData.enemy?-.32:.32,.86,0));
  const cadence=a=>{const star=a.userData.star||1;a.userData.castCount=(a.userData.castCount||0)+1;if(a.userData.kind==='boss')return a.userData.castCount%2===0;if(a.userData.kind==='prism')return true;if(star>=3)return a.userData.castCount%2===0;if(star>=2)return a.userData.castCount%3===0;return false};

  function cast(detail){const a=actors.get(detail.src),b=actors.get(detail.tgt);if(!a||!b)return;const type=detail.srcType||a.userData.kind,star=a.userData.star||1,strong=cadence(a),src=hand(a),dst=head(b),dir=dst.clone().sub(src).normalize();
    if(type==='guard'&&detail.kind==='melee'&&strong){setTimeout(()=>{if(!b.parent)return;const at=b.position.clone();pulseRing(at,0x7ebcff,.34+star*.035,.5);particles.emit(at.clone().add(new THREE.Vector3(0,.12,0)),0xa7d2ff,14+star*4,{speed:.8,spread:1.2,up:.65,size:.09,life:.5});shake(.055*star)},105);return}
    if(type==='ranger'&&detail.kind==='shot'){beam(src,dst,strong?0xffd982:0xd9bb76,strong?.035:.018,strong?.22:.14);particles.emit(src,0xffe2a0,strong?10:4,{speed:2.2,spread:.18,up:.02,size:.055,life:.28,dir});if(strong)setTimeout(()=>{if(b.parent)particles.emit(dst,0xffd17a,18,{speed:1.15,spread:1.05,up:.2,size:.065,life:.4})},115);return}
    if((type==='mage'||type==='prism')&&detail.kind==='magic'){const c=type==='prism'?0xffe39b:0xb783ff;beam(src,dst,c,strong?.075:.04,strong?.36:.22);particles.emit(src,c,strong?16:6,{speed:1.55,spread:.38,up:.12,size:.075,life:.38,dir});if(strong)setTimeout(()=>{if(!b.parent)return;pulseRing(b.position.clone(),c,.32+star*.04,.58);particles.emit(dst,c,24+star*5,{speed:.85,spread:1.35,up:.45,size:.105,life:.62});shake(.045*star)},140);return}
    if(type==='medic'&&detail.kind==='heal'){beam(src,dst,0x72efb3,strong?.052:.028,strong?.34:.23);const at=b.position.clone();pulseRing(at,0x68dfaa,.22+star*.025,.5);particles.emit(at.clone().add(new THREE.Vector3(0,.15,0)),0x7ff0bb,strong?22:10,{speed:.52,spread:.62,up:1.25,size:.08,life:.72});return}
    if(type==='rogue'&&detail.kind==='melee'&&strong){setTimeout(()=>{if(!b.parent)return;slash(b.position.clone(),0xc47dff,star>=3);particles.emit(dst,0xd69cff,20+star*4,{speed:1.2,spread:1.55,up:.12,size:.065,life:.36});shake(.035*star)},85);return}
    if(type==='boss'&&strong){const at=b.position.clone();pulseRing(at,0xff5d76,.55,.7);setTimeout(()=>{if(!b.parent)return;particles.emit(head(b),0xff667a,34,{speed:1.35,spread:1.8,up:.45,size:.12,life:.7});for(let i=0;i<3;i++)pulseRing(at,0xa94e79,.36+i*.16,.52+i*.08);shake(.22)},180)}
  }
  function update(dt,t){particles.update(t);for(let i=transients.length-1;i>=0;i--){const e=transients[i];e.age+=dt;const q=Math.min(1,e.age/e.duration);e.update?.(q,dt);if(q>=1){retire(e);transients.splice(i,1)}}}
  function dispose(){for(const e of transients)retire(e);transients.length=0;particles.dispose();Object.values(sharedGeo).forEach(g=>g?.dispose?.());sharedGeo.ring=sharedGeo.beam=sharedGeo.slash=null}
  return{cast,update,dispose,quality:quality.name};
}
