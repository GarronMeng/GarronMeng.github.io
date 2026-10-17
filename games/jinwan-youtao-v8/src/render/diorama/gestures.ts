/** Only the isolated inspection camera owns these gestures; overview keeps native scroll. */
export function inspectionGestures(el:HTMLElement,active:()=>boolean,change:(dx:number,dy:number,zoom:number)=>void){
 const points=new Map<number,{x:number;y:number}>();let moved=false,pinch=0;
 const down=(e:PointerEvent)=>{if(!active()||(e.target as HTMLElement).closest('button'))return;if(!points.size)moved=false;points.set(e.pointerId,{x:e.clientX,y:e.clientY});if(points.size>1){moved=true;const [a,b]=[...points.values()];pinch=Math.hypot(a.x-b.x,a.y-b.y);}el.setPointerCapture(e.pointerId);};
 const move=(e:PointerEvent)=>{const previous=points.get(e.pointerId);if(!active()||!previous)return;const dx=e.clientX-previous.x,dy=e.clientY-previous.y;points.set(e.pointerId,{x:e.clientX,y:e.clientY});if(Math.hypot(dx,dy)>.5)moved=true;
 if(points.size===2){const [a,b]=[...points.values()],distance=Math.hypot(a.x-b.x,a.y-b.y);change(0,0,pinch>0?distance/pinch:1);pinch=distance;}else if(points.size===1)change(dx,dy,1);
 };
 const up=(e:PointerEvent)=>{points.delete(e.pointerId);if(points.size<2)pinch=0;};
 el.addEventListener('pointerdown',down);el.addEventListener('pointermove',move);el.addEventListener('pointerup',up);el.addEventListener('pointercancel',up);
 return {suppressTap:()=>moved,dispose(){el.removeEventListener('pointerdown',down);el.removeEventListener('pointermove',move);el.removeEventListener('pointerup',up);el.removeEventListener('pointercancel',up);points.clear();}};
}
