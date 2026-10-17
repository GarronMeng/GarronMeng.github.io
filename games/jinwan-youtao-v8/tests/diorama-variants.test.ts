import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {newGame,execute} from '../src/core/game';
import {tickConstruction} from '../src/core/construction';
import type {Room} from '../src/state/types';
import {dioramaRoom,setRoomCutaway} from '../src/render/diorama/room';
import {roomTemplateStats,pruneRoomTemplates,disposeRoomTemplates} from '../src/render/diorama/templates';
import {roomVisualPlan,roomTemplateKey} from '../src/render/diorama/variants';
import {REGENCY_SUITE_REFERENCE} from '../src/render/diorama/reference';
import {isSampleRoom} from '../src/render/diorama/config';
function count(g:T.Group){let draws=0,triangles=0;g.traverse(o=>{if(o instanceof T.Mesh){draws++;triangles+=(o.geometry.index?.count??o.geometry.attributes.position.count)/3;}});return {draws,triangles};}
test('四房型 × 两床型 × 五等级均可构建，40 种组合保持原房间范围与真实 ID',()=>{
 const base=newGame().entities['room-201'] as Room;const keys=new Set<string>();for(const category of ['standard','view','suite','premium'] as const)for(const bed of ['king','twin'] as const)for(let level=1;level<=5;level++){
  const r={...base,id:'actual-'+category+'-'+bed+'-'+level,category,bed,level},before=JSON.stringify(r),g=dioramaRoom(r),bounds=new T.Box3().setFromObject(g).getSize(new T.Vector3());keys.add(g.userData.templateKey);assert.equal(g.userData.entityId,r.id);assert.equal(JSON.stringify(r),before);assert.equal(g.userData.bedCount,bed==='twin'?2:1);assert.equal(g.userData.visual.category,category);assert.equal(g.userData.visual.level,level);assert.ok(bounds.x<4.9&&bounds.y<2.55&&bounds.z<3.4,r.id+': '+bounds.toArray());assert.ok(count(g).draws<35,r.id+' too many submissions');
 }assert.equal(keys.size,40);pruneRoomTemplates(new Set());assert.equal(roomTemplateStats().templates,0);
});
test('每级增加可见几何，景观房与套房具有不同布局，非只改颜色或编号',()=>{
 const base=newGame().entities['room-201'] as Room;let last=0;for(let level=1;level<=5;level++){const g=dioramaRoom({...base,level}),n=count(g).triangles;assert.ok(n>last);last=n;}
 const standard=roomVisualPlan(base),view=roomVisualPlan({...base,category:'view'}),suite=roomVisualPlan({...base,category:'suite'}),premium=roomVisualPlan({...base,category:'premium'});assert.ok(view.windowWidth>standard.windowWidth);assert.ok(suite.features.includes('suite-sofa'));assert.ok(premium.features.includes('premium-stonework'));assert.ok(roomVisualPlan({...base,level:4}).features.includes('stone-vanity'));
});
test('装修期间不冒充竣工，真实施工完成后模型跟随原等级升级，经济状态不被工厂改动',()=>{
 const s=newGame({guided:false}),r=s.entities['room-201'] as Room;execute(s,{type:'upgrade',id:r.id});assert.ok(r.construction);assert.equal(isSampleRoom(r,true),false);for(let i=0;i<90;i++)tickConstruction(s);assert.equal(r.level,2);assert.equal(isSampleRoom(r,true),true);const saved=JSON.stringify(s),g=dioramaRoom(r);assert.equal(g.userData.visual.level,2);assert.equal(JSON.stringify(s),saved);
});
test('同款客房共享几何但不共享状态/点击 ID/墙体隐藏；淘汰旧模板并释放合并几何',()=>{
 disposeRoomTemplates();const r=newGame().entities['room-201'] as Room,a=dioramaRoom(r),b=dioramaRoom({...r,id:'room-303'});setRoomCutaway(a,new T.Vector3(8,7,8));assert.equal(b.getObjectByName('cutaway-side-wall')!.visible,true);assert.equal(b.userData.entityId,'room-303');const occupied=dioramaRoom({...r,status:'occupied'});assert.equal(occupied.userData.templateKey,a.userData.templateKey);assert.ok(occupied.getObjectByName('guest-luggage'));assert.ok(!a.getObjectByName('guest-luggage'));dioramaRoom({...r,status:'dirty'});assert.equal(roomTemplateStats().templates,2);pruneRoomTemplates(new Set([roomTemplateKey(r)]));assert.equal(roomTemplateStats().templates,1);disposeRoomTemplates();assert.equal(roomTemplateStats().geometryBytes,0);
});


test('84㎡深圳机场凯悦嘉宾轩套房：独立起居、卧室、卫浴与入口衣柜区域',()=>{
 const base=newGame().entities['room-201'] as Room;
 for(const bed of ['king','twin'] as const){
  const room={...base,id:'regency-suite-'+bed,category:'suite' as const,bed,level:1};
  const g=dioramaRoom(room),bounds=new T.Box3().setFromObject(g).getSize(new T.Vector3());
  assert.equal(g.userData.reference,REGENCY_SUITE_REFERENCE.id);
  assert.equal(g.userData.suitePrototype,'regency-suite-84sqm');
  assert.equal(g.userData.bedCount,bed==='twin'?2:1);
  for(const name of ['suite-living-zone','suite-bedroom-zone','suite-bathroom-zone','suite-entry-wardrobe-zone','suite-dining-zone','suite-slatted-divider-zone','suite-window-assembly'])assert.ok(g.getObjectByName(name),name+' should exist');
  assert.ok(bounds.x<4.9&&bounds.z<3.4,'suite must preserve the existing game-room envelope');
  release(g);
 }
 const suite=roomVisualPlan({...base,category:'suite'});
 assert.ok(suite.features.includes('regency-suite-84m2'));
 assert.ok(suite.features.includes('separate-bathroom'));
});
test('84㎡套房的五级装修逐级增加可见几何，普通客房仍使用原嘉轩参考',()=>{
 const base=newGame().entities['room-201'] as Room;let previous=0;
 for(let level=1;level<=5;level++){
  const g=dioramaRoom({...base,category:'suite',level});
  const triangles=count(g).triangles;assert.ok(triangles>previous,'suite level '+level+' should add geometry');previous=triangles;release(g);
 }
 const standard=dioramaRoom(base);assert.equal(standard.userData.reference,'hyatt-place-shenzhen-dongmen-king');release(standard);
});
function release(g:T.Group){g.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});}
