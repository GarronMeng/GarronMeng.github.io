import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {newGame} from '../src/core/game';
import {loadGame,saveGame,SAVE_KEY} from '../src/core/save';
import type {Room} from '../src/state/types';
import {dioramaRoom,setRoomCutaway} from '../src/render/diorama/room';
import {SAMPLE_ROOM,isSampleRoom,dioramaOptions} from '../src/render/diorama/config';
import {ROOM_REFERENCE} from '../src/render/diorama/reference';
import {dioramaGeometryStats,disposeDioramaGeometry} from '../src/render/diorama/assets';
import {dioramaMaterials,disposeDioramaMaterials} from '../src/render/diorama/materials';
import {batchStatic} from '../src/render/primitives';
import {createInspectionCollider,pickEntity} from '../src/render/interaction';
const room=()=>newGame().entities[SAMPLE_ROOM] as Room;
test('真实嘉轩 King 照片约束：床与媒体台相对、窗边休息位、保留前方通道',()=>{
 const g=dioramaRoom(room());assert.equal(g.userData.reference,ROOM_REFERENCE.id);const bed=g.getObjectByName('hyatt-king-sleep-zone')!,desk=g.getObjectByName('hyatt-media-work-center')!,chaise=g.getObjectByName('hyatt-window-chaise')!;assert.ok(bed.position.x>0&&desk.position.x<0);assert.ok(chaise.position.z<0);assert.ok(g.getObjectByName('white-ergonomic-work-chair'));assert.ok(!g.getObjectByName('oak-floor-board'));assert.ok(!g.getObjectByName('sage-woven-runner'));releaseInstances(g);
});
function meshes(g:T.Group){const list:T.Mesh[]=[];g.traverse(o=>{if(o instanceof T.Mesh)list.push(o);});return list;}
function releaseInstances(g:T.Group){g.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});}
test('仅 201 普通大床 Lv1 使用样板，升级、改房型或施工回到原有渲染',()=>{
 const r=room();assert.ok(isSampleRoom(r,true));assert.ok(!isSampleRoom(r,false));for(const patch of [{id:'room-303'},{level:2},{category:'suite' as const},{bed:'twin' as const},{status:'unbuilt' as const},{construction:{remaining:90,total:90,targetLevel:2}}])assert.ok(!isSampleRoom({...r,...patch},true));
 const old=dioramaOptions(new URL('https://example.com/games/jinwan-youtao-v8-preview/'));assert.equal(old.enabled,false);assert.equal(old.inspect,false);
 assert.equal(dioramaOptions(new URL('https://example.com/games/jinwan-youtao-diorama-preview/?visual=original&view=room')).inspect,true);
 assert.equal(dioramaOptions(new URL('https://example.com/games/jinwan-youtao-diorama-preview/?visual=original')).enabled,false);
});
test('房间工厂读取真实状态、不改经营数据，家具、厚墙与空间范围正确',()=>{
 const r=room(),snapshot=JSON.stringify(r),g=dioramaRoom(r);assert.equal(JSON.stringify(r),snapshot);assert.ok(g.getObjectByName('cutaway-rear-wall'));assert.ok(g.getObjectByName('cutaway-side-wall'));assert.equal(g.userData.entityId,SAMPLE_ROOM);
 const bounds=new T.Box3().setFromObject(g).getSize(new T.Vector3());assert.ok(bounds.x<4.9&&bounds.y<2.55&&bounds.z<3.4);assert.ok(meshes(g).some(o=>o instanceof T.InstancedMesh));
 const states=['occupied','dirty','cleaning','maintenance','reserved'] as const;
 for(const status of states){const current=dioramaRoom({...r,status,extraBed:true,suaBookingId:status==='reserved'?'real-booking':undefined});assert.equal(current.userData.entityId,r.id);if(status==='maintenance')assert.ok(current.getObjectByName('fault-lamp'));releaseInstances(current);}
 setRoomCutaway(g,new T.Vector3(8,7,8));assert.equal(g.getObjectByName('cutaway-side-wall')!.visible,false);setRoomCutaway(g,new T.Vector3(-6,7,8));assert.equal(g.getObjectByName('cutaway-side-wall')!.visible,true);releaseInstances(g);
});
test('局部模型变换、建筑合批和俯视点击仍返回真实实体 ID',()=>{
 const g=dioramaRoom(room()),collider=createInspectionCollider(SAMPLE_ROOM);g.add(collider);g.position.set(-4.93,5.1,0);const root=new T.Group();root.add(g);batchStatic(root);root.updateMatrixWorld(true);
 assert.equal(collider.parent,g);assert.ok(root.getObjectByName('cutaway-side-wall'));const target=new T.Vector3(-5.7,5.8,0),origin=target.clone().add(new T.Vector3(-6.5,7.1,8.5)),ray=new T.Raycaster(origin,target.clone().sub(origin).normalize());ray.layers.set(1);assert.equal(pickEntity(ray,[collider]),SAMPLE_ROOM);ray.layers.set(0);assert.equal(pickEntity(ray,[collider]),null);releaseInstances(g);collider.geometry.dispose();(collider.material as T.Material).dispose();
});
test('重复构建复用几何和贴图，缓存释放后可重建，未引入昂贵材质',()=>{
 const a=dioramaRoom(room()),stats=dioramaGeometryStats(),p=dioramaMaterials();const b=dioramaRoom(room());assert.equal(dioramaGeometryStats().unique,stats.unique);assert.equal(p,dioramaMaterials());assert.ok(stats.bytes<2_000_000);assert.ok(stats.unique<100);assert.equal(p.oak.map!.colorSpace,T.SRGBColorSpace);assert.ok(p.glass.transparent);releaseInstances(a);releaseInstances(b);disposeDioramaGeometry();disposeDioramaMaterials();assert.equal(dioramaGeometryStats().unique,0);const c=dioramaRoom(room());assert.ok(dioramaGeometryStats().unique>0);releaseInstances(c);
});
test('独立预览存档槽不会覆盖原版，默认读写行为保持兼容',()=>{
 const data=new Map<string,string>();Object.defineProperty(globalThis,'localStorage',{configurable:true,value:{getItem:(k:string)=>data.get(k)??null,setItem:(k:string,v:string)=>data.set(k,v)}});const s=newGame();saveGame(s);const baseline=data.get(SAVE_KEY);s.metrics.cash=12345;saveGame(s,SAVE_KEY+'_diorama_p1');assert.equal(data.get(SAVE_KEY),baseline);assert.equal(loadGame(SAVE_KEY+'_diorama_p1').metrics.cash,12345);assert.notEqual(loadGame().metrics.cash,12345);delete (globalThis as {localStorage?:unknown}).localStorage;
});
