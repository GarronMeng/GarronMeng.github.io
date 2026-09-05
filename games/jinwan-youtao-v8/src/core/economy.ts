import type {Room} from '../state/types';
export const roomRate=(price:number,room:Pick<Room,'type'|'level'>,member=false)=>Math.round(price*(room.type==='suite'&&!member?1.45:1)*(1+((room.level??1)-1)*.1));
export const roomUpgradeCost=(level:number)=>2500*level;
export const houseMinutes=(level:number)=>level?Math.max(8,24-level*5):30;
export const engineeringMinutes=(level:number)=>level?Math.max(10,35-level*7):40;
export const supplyCost=(level:number)=>Math.max(140,260-level*20);
export const revenuePrice=(base:number,hotelLevel:number,managerLevel:number)=>Math.round(base*(1+hotelLevel*.04+(managerLevel-1)*.06));
