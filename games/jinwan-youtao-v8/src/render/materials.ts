import * as T from 'three';
import {PLACE} from '../content/place';
/** Small deterministic material maps; no image backgrounds or embedded base64. */
function texture(kind:'wood'|'stone'|'cloth') {
 const size=128,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const n=(Math.sin(x*127.1+y*311.7)*43758.5453)%1;
  const v=kind==='wood'?205+21*Math.sin(x*.5+Math.sin(y*.07)*2)+n*12:kind==='cloth'?231+(x%2?7:-7)+(y%2?4:-4):228+12*Math.sin(x*.12+y*.075+Math.sin(y*.08)*3)+n*8;
  const i=(y*size+x)*4;data[i]=data[i+1]=data[i+2]=Math.max(0,Math.min(255,v));data[i+3]=255;
 }
 const t=new T.DataTexture(data,size,size);t.wrapS=t.wrapT=T.RepeatWrapping;t.colorSpace=T.SRGBColorSpace;t.needsUpdate=true;return t;
}
const woodMap=texture('wood'),stoneMap=texture('stone'),clothMap=texture('cloth');
export const materials={
 stone:new T.MeshStandardMaterial({color:PLACE.materials.stone,map:stoneMap,roughness:.72}),
 wall:new T.MeshStandardMaterial({color:PLACE.materials.wall,roughness:.88}),
 wood:new T.MeshStandardMaterial({color:PLACE.materials.wood,map:woodMap,roughness:.52}),
 walnut:new T.MeshStandardMaterial({color:PLACE.materials.darkWood,map:woodMap,roughness:.5}),
 gold:new T.MeshStandardMaterial({color:PLACE.materials.metal,metalness:.7,roughness:.36}),
 navy:new T.MeshStandardMaterial({color:PLACE.materials.blue,roughness:.65}),
 white:new T.MeshStandardMaterial({color:PLACE.materials.linen,map:clothMap,roughness:.93}),
 teal:new T.MeshStandardMaterial({color:PLACE.materials.accent,map:clothMap,roughness:.83}),
 rust:new T.MeshStandardMaterial({color:0x975e43,map:clothMap,roughness:.84}),
 carpet:new T.MeshStandardMaterial({color:0x687479,map:clothMap,roughness:1}),
 black:new T.MeshStandardMaterial({color:0x161e24,roughness:.6}),
 green:new T.MeshStandardMaterial({color:0x355742,roughness:.86}),
 leaf:new T.MeshStandardMaterial({color:0x658050,roughness:.8}),
 glass:new T.MeshStandardMaterial({color:0x8fbbcf,metalness:.4,roughness:.22,transparent:true,opacity:.25,depthWrite:false}),
 window:new T.MeshStandardMaterial({color:0x497380,metalness:.24,roughness:.27,emissive:0x355667,emissiveIntensity:.25}),
 glow:new T.MeshStandardMaterial({color:0xffe6b2,emissive:0xffc769,emissiveIntensity:1.35,roughness:1}),
 shade:new T.MeshStandardMaterial({color:0xffe8bf,emissive:0xffc887,emissiveIntensity:.3,roughness:.8}),
 screen:new T.MeshStandardMaterial({color:0x132a34,emissive:0x2b5563,emissiveIntensity:.3}),
 skin:new T.MeshStandardMaterial({color:0xd5a17a,roughness:.9}),
 hair:new T.MeshStandardMaterial({color:0x252122,roughness:.9}),
 ao:new T.MeshBasicMaterial({color:0x1d1814,transparent:true,opacity:.12,depthWrite:false}),
};
const colors=new Map<number,T.MeshStandardMaterial>();
export function colorMaterial(color:number){let m=colors.get(color);if(!m){m=new T.MeshStandardMaterial({color,roughness:.75});colors.set(color,m);}return m;}
export function disposeMaterials(){Object.values(materials).forEach(m=>m.dispose());colors.forEach(m=>m.dispose());[woodMap,stoneMap,clothMap].forEach(t=>t.dispose());}
