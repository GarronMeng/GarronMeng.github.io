import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
/** Share compiled geometry across identical real-room appearances, not across their state IDs. */
const templates=new Map<string,T.Group>();
function mergeBoundary(root:T.Group){root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert();
 const buckets=new Map<string,{material:T.Material;cast:boolean;receive:boolean;items:T.Mesh[]}>();
 root.traverse(o=>{if(!(o instanceof T.Mesh)||Array.isArray(o.material)||o.userData.interactive)return;let p=o.parent;while(p&&p!==root){if(p.userData.dynamic)return;p=p.parent;}
  const cast=o.castShadow&&!o.material.transparent,key=o.material.uuid+':'+cast+':'+o.receiveShadow;let b=buckets.get(key);if(!b){b={material:o.material,cast,receive:o.receiveShadow,items:[]};buckets.set(key,b);}b.items.push(o);
 });
 for(const b of buckets.values()){if(b.items.length<2)continue;const parts=b.items.map(o=>{const geo=o.geometry.index?o.geometry.toNonIndexed():o.geometry.clone();geo.applyMatrix4(new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld));return geo;});const merged=mergeGeometries(parts,false);parts.forEach(g=>g.dispose());if(!merged)throw Error('Diorama geometry attributes must match');merged.userData.templateOwned=true;const mesh=new T.Mesh(merged,b.material);mesh.name='room-material-batch';mesh.userData.diorama=true;mesh.layers.enable(1);mesh.castShadow=b.cast;mesh.receiveShadow=b.receive;merged.computeBoundingSphere();b.items.forEach(o=>o.removeFromParent());root.add(mesh);}
}
export function roomTemplate(key:string,make:()=>T.Group){let template=templates.get(key);if(!template){template=make();for(const child of template.children)if(child instanceof T.Group&&child.userData.dynamic)mergeBoundary(child);mergeBoundary(template);template.userData.templateKey=key;templates.set(key,template);}return template.clone(true);}
function release(g:T.Group){const owned=new Set<T.BufferGeometry>();g.traverse(o=>{if(o instanceof T.Mesh&&o.geometry.userData.templateOwned)owned.add(o.geometry);});owned.forEach(geometry=>geometry.dispose());}
export function pruneRoomTemplates(active:Set<string>){for(const [key,g] of templates)if(!active.has(key)){release(g);templates.delete(key);}}
export function disposeRoomTemplates(){templates.forEach(release);templates.clear();}
export function roomTemplateStats(){const unique=new Set<T.BufferGeometry>();templates.forEach(g=>g.traverse(o=>{if(o instanceof T.Mesh)unique.add(o.geometry);}));let bytes=0;unique.forEach(g=>{Object.values(g.attributes).forEach(a=>bytes+=a.array.byteLength);bytes+=g.index?.array.byteLength??0;});return {templates:templates.size,geometries:unique.size,geometryBytes:bytes};}
