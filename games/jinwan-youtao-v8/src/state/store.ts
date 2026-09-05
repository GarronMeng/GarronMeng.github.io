import type {PreviewState,Store} from './types';
import {createVisualFixture} from './fixture';
function freeze<T>(value:T):T {if(value&&typeof value==='object'&&!Object.isFrozen(value)){Object.freeze(value);for(const v of Object.values(value))freeze(v);}return value;}
export function createStore(initial:PreviewState=createVisualFixture()):Store {
 let state=freeze(structuredClone(initial)); const listeners=new Set<(state:Readonly<PreviewState>)=>void>();
 const patch=(next:Partial<PreviewState>)=>{state=freeze({...state,...next});listeners.forEach(fn=>fn(state));};
 return {getState:()=>state,subscribe(fn){listeners.add(fn);return()=>listeners.delete(fn)},
 select(id){if(id!==null&&!state.entities[id])throw new Error('Unknown entity: '+id);patch({selectedId:id,visited:id?[...new Set([...state.visited,id])]:state.visited});},
 focusFloor(id){if(!state.floors.some(f=>f.id===id))throw new Error('Unknown floor: '+id);patch({focusedFloorId:id});},
 setSpeed(speed){if(![1,2,4].includes(speed))throw new Error('Invalid speed');patch({speed})},
 setAtmosphere(atmosphere){if(!['dusk','night','day'].includes(atmosphere))throw new Error('Invalid atmosphere');patch({atmosphere})}};
}
