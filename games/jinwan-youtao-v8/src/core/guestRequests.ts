import type {Guest} from '../state/types';
export const lateHour=(g:Guest)=>g.lateHour??(g.tier==='Globalist'?16:14);
export const lateLabel=(g:Guest)=>lateHour(g)===16?'4PM':'2PM';
export const fallbackHour=(g:Guest)=>lateHour(g)===16?14:12;
export const checkoutMinute=(g:Guest)=>g.late==='honor'?lateHour(g)*60:g.late==='deny'||g.late==='pending'?fallbackHour(g)*60:660;
/** Short visits dominate; resorts retain a modest longer-stay tail. */
export function stayNights(holiday:boolean,roll:number,longRoll:number){return holiday?(roll<.35?1:roll<.82?2:roll<.95?3:4+Math.floor(longRoll*2)):(roll<.6?1:roll<.9?2:roll<.98?3:4+Math.floor(longRoll*2));}
