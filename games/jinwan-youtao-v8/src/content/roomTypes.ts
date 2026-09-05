import type {Room} from '../state/types';
export const ROOM_TIERS={standard:{name:'普通客房',factor:1,cost:0},view:{name:'景观客房',factor:1.2,cost:1000},suite:{name:'套房',factor:1.45,cost:2500},premium:{name:'尊享套房',factor:1.9,cost:5000}} as const;
export const roomTier=(r:Pick<Room,'type'|'category'>)=>r.category??(r.type==='suite'?'suite':'standard');
export const roomBed=(r:Room)=>r.bed??(r.type==='twin'?'twin':'king');
export const isSuite=(r:Room)=>['suite','premium'].includes(roomTier(r));
export const standardSuite=(r:Room)=>roomTier(r)==='suite';
export const roomName=(r:Room)=>ROOM_TIERS[roomTier(r)].name+' · '+(roomBed(r)==='twin'?'双床':'大床');
