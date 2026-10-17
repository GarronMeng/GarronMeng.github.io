import * as T from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {dioramaMaterials} from './materials';
const cache=new Map<string,T.BufferGeometry>();
function geo(key:string,make:()=>T.BufferGeometry){let g=cache.get(key);if(!g){g=make();cache.set(key,g);}return g;}
export function mesh(parent:T.Object3D,name:string,geometry:T.BufferGeometry,material:T.Material,x=0,y=0,z=0){const o=new T.Mesh(geometry,material);o.name=name;o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;o.userData.diorama=true;o.layers.enable(1);parent.add(o);return o;}
export function rounded(parent:T.Object3D,name:string,x:number,y:number,z:number,w:number,h:number,d:number,mat:T.Material,r=.045){const radius=Math.min(r,Math.min(w,h,d)*.45),key=`round:${w}:${h}:${d}:${radius}`;return mesh(parent,name,geo(key,()=>new RoundedBoxGeometry(w,h,d,2,radius)),mat,x,y,z);}
export function cylinder(parent:T.Object3D,name:string,x:number,y:number,z:number,r:number,h:number,mat:T.Material,top=r){return mesh(parent,name,geo(`cyl:${r}:${top}:${h}`,()=>new T.CylinderGeometry(top,r,h,20)),mat,x,y,z);}
export function oval(parent:T.Object3D,name:string,x:number,y:number,z:number,w:number,h:number,d:number,mat:T.Material){const o=mesh(parent,name,geo('oval',()=>new T.SphereGeometry(1,16,10)),mat,x,y,z);o.scale.set(w,h,d);return o;}
export function contact(parent:T.Object3D,x:number,z:number,w:number,d:number,y=.103){const o=mesh(parent,'soft-contact',geo('plane',()=>new T.PlaneGeometry(1,1)),dioramaMaterials().contact,x,y,z);o.rotation.x=-Math.PI/2;o.scale.set(w,d,1);o.castShadow=false;o.receiveShadow=false;return o;}
export function pottery(parent:T.Object3D,x:number,y:number,z:number,scale=.25){const m=dioramaMaterials();const g=geo('vase',()=>new T.LatheGeometry([new T.Vector2(.2,0),new T.Vector2(.38,.1),new T.Vector2(.42,.45),new T.Vector2(.24,.7),new T.Vector2(.2,.9),new T.Vector2(.23,.93)],20));const p=mesh(parent,'ceramic-vase',g,m.ceramic,x,y,z);p.scale.setScalar(scale);return p;}
export function plant(parent:T.Object3D,x:number,z:number,size=.8){const m=dioramaMaterials();const p=new T.Group();p.name='living-plant';p.position.set(x,.11,z);p.scale.setScalar(size);parent.add(p);cylinder(p,'tapered-planter',0,.22,0,.2,.44,m.ceramic,.25);cylinder(p,'soil',0,.447,0,.216,.015,m.soil);
 for(let i=0;i<9;i++){const a=i*2.4,h=.5+i*.075;const stem=cylinder(p,'plant-stem',Math.sin(a)*.075,h/2+.2,Math.cos(a)*.07,.009,h,m.leaf);stem.rotation.z=Math.sin(a)*.13;const l=oval(p,'curved-leaf',Math.sin(a)*.19,h+.16,Math.cos(a)*.18,.09,.24,.025,i%2?m.leaf:m.leafLight);l.rotation.set(.38,a,Math.sin(a)*.75);}
 contact(parent,x,z,.82,.75);return p;
}
export function lamp(parent:T.Object3D,x:number,y:number,z:number){const m=dioramaMaterials();cylinder(parent,'lamp-foot',x,y+.018,z,.105,.035,m.brass);cylinder(parent,'lamp-stem',x,y+.15,z,.014,.28,m.brass);const shade=mesh(parent,'linen-lampshade',geo('lamp-shade',()=>new T.CylinderGeometry(.105,.17,.21,24,1,true)),m.linen,x,y+.33,z);shade.castShadow=false;cylinder(parent,'warm-diffuser',x,y+.235,z,.14,.012,m.lamp);}
export function loungeChair(parent:T.Object3D,x:number,z:number){const m=dioramaMaterials();const p=new T.Group();p.name='sculpted-lounge-chair';p.position.set(x,0,z);p.rotation.y=-.48;parent.add(p);
 for(const a of [-1,1])for(const b of [-1,1])cylinder(p,'turned-chair-leg',a*.21,.27,b*.21,.025,.36,m.walnut);
 rounded(p,'chair-seat',0,.45,0,.62,.18,.64,m.upholstery,.08);const back=rounded(p,'curved-chair-back',0,.72,-.23,.65,.51,.18,m.upholstery,.085);back.rotation.x=-.12;
 for(const a of [-1,1])rounded(p,'upholstered-arm',a*.3,.62,-.02,.13,.26,.61,m.upholstery,.06);
 const cushion=oval(p,'chair-cushion',.02,.67,-.13,.2,.18,.08,m.linen);cushion.rotation.z=-.18;contact(parent,x,z,.96,.92);return p;
}
/** Batch in MODEL coordinates, not world coordinates; the room remains movable. */
export function batchDiorama(root:T.Group){root.updateMatrixWorld(true);const inverse=root.matrixWorld.clone().invert(),buckets=new Map<string,{g:T.BufferGeometry;m:T.Material;items:T.Mesh[]}>();root.traverse(o=>{if(!(o instanceof T.Mesh)||o instanceof T.InstancedMesh||o.userData.interactive||Array.isArray(o.material)||o.material.transparent||o.userData.dynamic)return;let ancestor=o.parent;while(ancestor&&ancestor!==root){if(ancestor.userData.dynamic)return;ancestor=ancestor.parent;}const key=o.geometry.uuid+o.material.uuid;let b=buckets.get(key);if(!b){b={g:o.geometry,m:o.material,items:[]};buckets.set(key,b);}b.items.push(o);});
 for(const b of buckets.values()){if(b.items.length<2)continue;const inst=new T.InstancedMesh(b.g,b.m,b.items.length);inst.name='diorama-batch';inst.userData.diorama=true;inst.layers.enable(1);b.items.forEach((o,i)=>inst.setMatrixAt(i,new T.Matrix4().multiplyMatrices(inverse,o.matrixWorld)));inst.castShadow=true;inst.receiveShadow=true;inst.computeBoundingSphere();b.items.forEach(o=>o.removeFromParent());root.add(inst);}
}
export function disposeDioramaGeometry(){cache.forEach(g=>g.dispose());cache.clear();}
export function dioramaGeometryStats(){let triangles=0,bytes=0;cache.forEach(g=>{triangles+=(g.index?.count??g.attributes.position.count)/3;Object.values(g.attributes).forEach(a=>bytes+=a.array.byteLength);bytes+=g.index?.array.byteLength??0;});return {unique:cache.size,triangles,bytes};}
