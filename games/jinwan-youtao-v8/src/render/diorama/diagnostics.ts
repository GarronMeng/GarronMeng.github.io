import * as T from 'three';
import {dioramaTextureBytes} from './materials';
import {dioramaGeometryStats} from './assets';
import {roomTemplateStats} from './templates';
export function createDiagnostics(host:HTMLElement,renderer:T.WebGLRenderer,enabled:boolean,low:boolean){
 const started=performance.now();let first:number|undefined,frames=0,interval=started,last=started;const times:number[]=[];
 const el=enabled?document.createElement('output'):null;if(el){el.className='diorama-diagnostics';el.setAttribute('aria-label','渲染性能诊断');Object.assign(el.style,{position:'absolute',left:'8px',bottom:'8px',zIndex:'4',font:'10px/1.5 monospace',color:'#edf2df',background:'#243b32e6',borderRadius:'8px',padding:'8px',pointerEvents:'none',whiteSpace:'pre-line'});host.append(el);}
 return {tick(now:number){first??=now;frames++;times.push(now-last);last=now;if(times.length>180)times.shift();if(now-interval<1000)return;const dt=now-interval,fps=Math.round(frames*1000/dt),sorted=[...times].sort((a,b)=>a-b),info=renderer.info;
 const snapshot={quality:low?'low':'standard',fps,frameP95Ms:Math.round((sorted[Math.floor(sorted.length*.95)]??0)*10)/10,drawCalls:info.render.calls,triangles:info.render.triangles,geometries:info.memory.geometries,textures:info.memory.textures,programs:info.programs?.length??0,sampleGeometry:dioramaGeometryStats(),roomTemplates:roomTemplateStats(),sampleTextureEstimateBytes:Math.round(dioramaTextureBytes()),firstFrameMs:Math.round(first-started),dpr:renderer.getPixelRatio(),gpuBytes:'unknown: WebGL exposes resource counts, not resident VRAM',deviceValidation:'not a substitute for physical-device measurements'};
 host.dataset.renderMetrics=JSON.stringify(snapshot);if(el)el.textContent=`${fps} FPS · p95 ${snapshot.frameP95Ms} ms\n${snapshot.drawCalls} draws · ${snapshot.triangles.toLocaleString()} tris\n${snapshot.geometries} geo · ${snapshot.textures} tex · DPR ${snapshot.dpr}\nfirst frame ${snapshot.firstFrameMs} ms · ${snapshot.quality}`;frames=0;interval=now;
 },dispose(){el?.remove();delete host.dataset.renderMetrics;}};
}
