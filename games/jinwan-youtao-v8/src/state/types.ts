export type RoomStatus = 'available'|'reserved'|'occupied'|'dirty'|'cleaning'|'maintenance'|'unbuilt';
export type FacilityRole = 'lobby'|'breakfast'|'club'|'gym'|'rooftop';
export interface Room {id:string; kind:'room'; floorId:string; number:string; type:'king'|'twin'|'suite'; status:RoomStatus; guestId?:string; nightsLeft:number;}
export interface Facility {id:string; kind:'facility'; floorId:string; role:FacilityRole; name:string; capacity:number; usage:number; staffing:number; quality:number; maintenance:number;}
export type Entity = Room|Facility;
export interface Floor {id:string; number:number; label:string; name:string; role:'guest'|FacilityRole; entityIds:string[];}
export interface Guest {id:string; name:string; tier:string; roomId?:string; floorId:string; thought:string; color:number; route:number[]; z?:number; staff?:boolean;}
export interface PreviewState {schemaVersion:8; mode:'visual-slice'; brandId:'place'; metrics:{cash:number;reputation:number;owner:number}; floors:Floor[]; entities:Record<string,Entity>; guests:Guest[]; selectedId:string|null; focusedFloorId:string|null; speed:1|2|4; atmosphere:'dusk'|'night'|'day'; visited:string[];}
export interface Store {getState():Readonly<PreviewState>; subscribe(fn:(state:Readonly<PreviewState>)=>void):()=>void; select(id:string|null):void; focusFloor(id:string):void; setSpeed(speed:1|2|4):void; setAtmosphere(value:PreviewState['atmosphere']):void;}
