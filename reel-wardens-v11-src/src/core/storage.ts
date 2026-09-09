const KEY='reel_wardens_v11_high';
export function readHigh(){try{return Number(localStorage.getItem(KEY)||0)||0}catch{return 0}}
export function writeHigh(value:number){try{localStorage.setItem(KEY,String(value))}catch{}}
