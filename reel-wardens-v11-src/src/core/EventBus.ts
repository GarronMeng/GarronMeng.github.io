import type { GameEvent } from './types';
export class EventBus {
  private listeners = new Set<(event:GameEvent)=>void>();
  on(fn:(event:GameEvent)=>void){ this.listeners.add(fn); return ()=>this.listeners.delete(fn); }
  emit(event:GameEvent){ for(const fn of this.listeners) fn(event); }
  clear(){ this.listeners.clear(); }
}
