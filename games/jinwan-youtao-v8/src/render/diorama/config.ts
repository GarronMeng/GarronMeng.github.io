import type {Room} from '../../state/types';
import {roomBed,roomTier} from '../../content/roomTypes';
/** P1 deliberately applies to ONE real room. Never manufacture display-only state. */
export const SAMPLE_ROOM='room-201';
export const SAMPLE={width:4.7,depth:3.1,height:2.38,wall:.13,eye:[-6.5,7.1,8.5] as const};
export function isSampleRoom(room:Room,enabled:boolean){return enabled&&room.id===SAMPLE_ROOM&&roomTier(room)==='standard'&&roomBed(room)==='king'&&room.status!=='unbuilt'&&!room.construction&&(room.level??1)===1;}
export interface DioramaOptions {enabled:boolean;inspect:boolean;low:boolean;diagnostics:boolean;}
export function dioramaOptions(url:URL):DioramaOptions{
 const p=url.searchParams,enabled=p.get('visual')==='diorama'||url.pathname.includes('diorama')&&p.get('visual')!=='original';
 return {enabled,inspect:p.get('view')==='room',low:p.get('quality')==='low',diagnostics:p.get('diagnostics')==='1'};
}
