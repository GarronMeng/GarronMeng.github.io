import * as T from 'three';
import type {PreviewState} from '../state/types';
import {FLOOR_HEIGHT,ROOM_CENTERS} from '../content/place';
export interface EntityAnchor {id:string;floorId:string;position:T.Vector3;label:T.Vector3;}
export function sceneLayout(state:Readonly<PreviewState>){
 const entities:EntityAnchor[]=[];const floorY=new Map<string,number>();
 state.floors.forEach((floor,index)=>{
  const y=index*FLOOR_HEIGHT;floorY.set(floor.id,y);
  floor.entityIds.forEach((id,col)=>{const room=state.entities[id].kind==='room';const x=room?ROOM_CENTERS[col]:0;entities.push({id,floorId:floor.id,position:new T.Vector3(x,y,0),label:new T.Vector3(room?x-1.97:-6.92,y+(floor.role==='rooftop'?.37:2.02),1.81)});});
 });
 return {entities,floorY,height:(state.floors.length-1)*FLOOR_HEIGHT+3.6};
}
