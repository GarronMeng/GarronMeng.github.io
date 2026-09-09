export class Loop {
  private raf=0; private last=0; private elapsed=0;
  constructor(private update:(dt:number,elapsed:number)=>void, private render:()=>void){}
  start(){ if(this.raf)return; this.last=performance.now(); const step=(now:number)=>{const dt=Math.min(.05,(now-this.last)/1000);this.last=now;this.elapsed+=dt;this.update(dt,this.elapsed);this.render();this.raf=requestAnimationFrame(step)};this.raf=requestAnimationFrame(step); }
  stop(){ if(this.raf)cancelAnimationFrame(this.raf); this.raf=0; }
}
