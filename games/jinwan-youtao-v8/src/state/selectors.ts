import type {PreviewState,Room} from './types';
export const rooms=(s:Readonly<PreviewState>)=>Object.values(s.entities).filter((e):e is Room=>e.kind==='room');
export const availableSuites=(s:Readonly<PreviewState>)=>rooms(s).filter(r=>r.type==='suite'&&r.status==='available').length;
export const occupiedRooms=(s:Readonly<PreviewState>)=>rooms(s).filter(r=>r.status==='occupied').length;
export const floorForEntity=(s:Readonly<PreviewState>,id:string)=>s.floors.find(f=>f.id===s.entities[id]?.floorId);
