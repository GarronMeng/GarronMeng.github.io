import {standardSuite} from '../content/roomTypes';
import type {PreviewState,Room} from './types';
export const roomSlots=(s:Readonly<PreviewState>)=>Object.values(s.entities).filter((e):e is Room=>e.kind==='room');
export const rooms=(s:Readonly<PreviewState>)=>roomSlots(s).filter(r=>r.status!=='unbuilt');
export const availableSuites=(s:Readonly<PreviewState>)=>rooms(s).filter(r=>standardSuite(r)&&r.status==='available').length;
export const occupiedRooms=(s:Readonly<PreviewState>)=>rooms(s).filter(r=>r.status==='occupied').length;
export const floorForEntity=(s:Readonly<PreviewState>,id:string)=>s.floors.find(f=>f.id===s.entities[id]?.floorId);
