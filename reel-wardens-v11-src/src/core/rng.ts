export type Rng = () => number;
export function createSeededRandom(seed=1): Rng {
  let s = seed >>> 0 || 1;
  return () => {s += 0x6D2B79F5;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return ((t^(t>>>14))>>>0)/4294967296;};
}
export const int=(rng:Rng,n:number)=>Math.floor(rng()*n);
export const chance=(rng:Rng,p:number)=>rng()<p;
export const pick=<T>(rng:Rng,a:readonly T[]):T=>a[int(rng,a.length)]!;
export function shuffle<T>(rng:Rng,a:readonly T[]):T[]{const out=[...a];for(let i=out.length-1;i>0;i--){const j=int(rng,i+1);[out[i],out[j]]=[out[j]!,out[i]!]}return out;}
