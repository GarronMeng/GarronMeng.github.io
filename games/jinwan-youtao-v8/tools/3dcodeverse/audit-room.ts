/**
 * Offline P2 diorama geometry gate; does not instantiate WebGL or alter a save.
 * Run: npm run diorama:audit
 *
 * This is deterministic program/geometry QA, not the 3DCodeVerse VLM judge.
 * Actual FPS, GPU memory and photographic likeness require separate checks.
 */
import * as T from 'three';
import {newGame} from '../../src/core/game';
import type {Room} from '../../src/state/types';
import {dioramaRoom} from '../../src/render/diorama/room';
import {SAMPLE} from '../../src/render/diorama/config';
import {ROOM_REFERENCE} from '../../src/render/diorama/reference';
import {dioramaGeometryStats,disposeDioramaGeometry} from '../../src/render/diorama/assets';
import {dioramaMaterials,disposeDioramaMaterials,dioramaTextureBytes} from '../../src/render/diorama/materials';
import {roomTemplateStats,disposeRoomTemplates} from '../../src/render/diorama/templates';

const categories=['standard','view','suite','premium'] as const;
const beds=['king','twin'] as const;
const failures:string[]=[];
const warnings:string[]=[];
const rows:Array<{variant:string;dimensions:number[];meshSubmissions:number;triangles:number}>=[];
const canonical=newGame({guided:false}).entities['room-201'] as Room;

try {
 for(const category of categories) for(const bed of beds) for(let level=1;level<=5;level++){
  const variant=`${category}/${bed}/L${level}`;
  const room:Room={...canonical,id:`qa-${category}-${bed}-${level}`,category,bed,level};
  const before=JSON.stringify(room);
  const model=dioramaRoom(room);
  model.updateMatrixWorld(true);
  const b=new T.Box3().setFromObject(model),size=b.getSize(new T.Vector3());
  const dims=size.toArray().map(v=>Math.round(v*1000)/1000);
  let draws=0,triangles=0;
  model.traverse(o=>{
   if(!o.matrixWorld.elements.every(Number.isFinite))failures.push(`${variant}: non-finite transform at ${o.name}`);
   if(!(o instanceof T.Mesh))return;
   draws++;
   const g=o.geometry,positions=g.attributes.position;
   if(!positions || !Array.from(positions.array).every(Number.isFinite)) failures.push(`${variant}: invalid geometry at ${o.name}`);
   triangles+=(g.index?.count??positions?.count??0)/3;
  });
  if(JSON.stringify(room)!==before)failures.push(`${variant}: model mutated the real Room data`);
  if(model.userData.entityId!==room.id)failures.push(`${variant}: entityId mismatch`);
  if(model.userData.bedCount!==(bed==='twin'?2:1))failures.push(`${variant}: incorrect bed count`);
  for(const name of ['hyatt-media-work-center','hyatt-window-chaise','cutaway-side-wall','cutaway-rear-wall']){
   if(!model.getObjectByName(name))failures.push(`${variant}: missing ${name}`);
  }
  if(!model.getObjectByName(bed==='king'?'hyatt-king-sleep-zone':'hyatt-twin-sleep-zone'))
   failures.push(`${variant}: missing bed group`);
  if(dims.some(d=>!Number.isFinite(d)) || size.x>4.9 || size.y>2.55 || size.z>3.4)
   failures.push(`${variant}: out of room envelope: ${dims.join(' x ')} m`);
  if(draws>=35)failures.push(`${variant}: ${draws} model submissions exceeds existing P2 contract (<35)`);
  if(triangles>80000)warnings.push(`${variant}: high triangle count (${Math.round(triangles)}) — review on iPhone`);
  rows.push({variant,dimensions:dims,meshSubmissions:draws,triangles:Math.round(triangles)});
  model.traverse(o=>{if(o instanceof T.InstancedMesh)o.dispose();});
 }
 const geometry=dioramaGeometryStats(),templates=roomTemplateStats();
 const result={
  ok:failures.length===0,
  checkedVariants:rows.length,
  constraints:{roomMetres:[SAMPLE.width,SAMPLE.height,SAMPLE.depth],boundingEnvelopeMetres:[4.9,2.55,3.4],maxMeshSubmissionsExclusive:35},
  referenceId:ROOM_REFERENCE.id,
  source:'real P2 room factory / real Room types, without changes to saves',
  geometryCache:geometry,
  templateCache:templates,
  estimatedTextureBytes:dioramaTextureBytes(),
  rows,failures,warnings,
  limitations:'Geometry-only gate; overlap semantics, reference-image likeness, WebGL draw calls and physical iPhone FPS are not certified.'
 };
 console.log(JSON.stringify(result,null,2));
 if(failures.length)process.exitCode=1;
}finally{
 disposeRoomTemplates();
 disposeDioramaGeometry();
 disposeDioramaMaterials();
}
