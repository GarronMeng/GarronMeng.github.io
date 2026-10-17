import * as T from 'three';
type MapKind='oak'|'linen'|'rug'|'plaster'|'contact';
const maps=new Map<MapKind,T.DataTexture>();
function map(kind:MapKind){let found=maps.get(kind);if(found)return found;const size=128,data=new Uint8Array(size*size*4);
 for(let y=0;y<size;y++)for(let x=0;x<size;x++){
  const i=(y*size+x)*4,noise=(Math.sin(x*12.9898+y*78.233)*43758.5453)%1;
  const value=kind==='oak'?224+11*Math.sin(x*.23+Math.sin(y*.06)*.8)+noise*7:kind==='linen'?239+(x%3===0?-9:2)+(y%3===0?-6:2)+noise*3:kind==='rug'?224+(x%4===0||y%4===0?-19:8):244+noise*7;
  data[i]=data[i+1]=data[i+2]=Math.max(0,Math.min(255,value));
  const d=Math.hypot((x-size/2)/(size/2),(y-size/2)/(size/2));data[i+3]=kind==='contact'?Math.round(Math.pow(Math.max(0,1-d),2)*140):255;
 }
 found=new T.DataTexture(data,size,size);found.colorSpace=T.SRGBColorSpace;found.wrapS=found.wrapT=kind==='contact'?T.ClampToEdgeWrapping:T.RepeatWrapping;found.magFilter=T.LinearFilter;found.minFilter=T.LinearMipmapLinearFilter;found.generateMipmaps=true;found.needsUpdate=true;maps.set(kind,found);return found;
}
let palette:ReturnType<typeof createPalette>|undefined;
function createPalette(){const standard=(color:number,roughness=.8,kind?:MapKind)=>new T.MeshStandardMaterial({color,roughness,...(kind?{map:map(kind)}:{})});
 return {
  oak:standard(0x745438,.73,'oak'),edge:standard(0x675241,.78,'oak'),walnut:standard(0x49382c,.72,'oak'),
  wall:standard(0xe3e0d6,.94,'plaster'),sage:standard(0xd7d4c8,.94,'plaster'),linen:standard(0xf7f5ed,.97,'linen'),
  upholstery:standard(0xaaa69a,.96,'linen'),throw:standard(0x8c795e,.97,'linen'),rug:standard(0xaaa89f,1,'rug'),
  ceramic:standard(0xe6dfcf,.66),terracotta:standard(0xb7896d,.91),leaf:standard(0x57774e,.92),leafLight:standard(0x7d965d,.95),soil:standard(0x675747,1),
  brass:new T.MeshStandardMaterial({color:0xa88a55,metalness:.65,roughness:.48}),
  chrome:new T.MeshStandardMaterial({color:0xa6abad,metalness:.72,roughness:.36}),
  headboard:standard(0x756052,.9,'linen'),darkFrame:standard(0x2c3031,.6),olive:standard(0x76744e,.96,'linen'),
  stone:standard(0xc6c0b3,.56,'plaster'),accentFabric:standard(0x79756b,.96,'linen'),
  floralRed:standard(0xa6502d,.92),floralGold:standard(0xc29c52,.92),
  glass:new T.MeshStandardMaterial({color:0xb2ccd0,roughness:.35,transparent:true,opacity:.23,depthWrite:false}),
  window:new T.MeshStandardMaterial({color:0xd9e4df,roughness:.7,emissive:0xb5c2b1,emissiveIntensity:.16}),
  lamp:new T.MeshStandardMaterial({color:0xf2ddad,roughness:.95,emissive:0xeeb778,emissiveIntensity:.32}),
  ink:standard(0x35433c,.92),paper:standard(0xece2cf,.94),art:standard(0xb89d75,.9),book:standard(0x8b6854,.9),
  contact:new T.MeshBasicMaterial({color:0x665e4d,map:map('contact'),transparent:true,opacity:.45,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),
 };
}
export function dioramaMaterials(){return palette??=createPalette();}
export function disposeDioramaMaterials(){if(palette)Object.values(palette).forEach(m=>m.dispose());maps.forEach(t=>t.dispose());maps.clear();palette=undefined;}
export function dioramaTextureBytes(){return maps.size*128*128*4*4/3;}
