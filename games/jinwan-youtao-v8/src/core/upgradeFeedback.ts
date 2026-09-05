import type {PreviewState} from '../state/types';
export function upgradeFeedback(s:PreviewState,id:string){const e=s.entities[id];if(!e)return;s.game!.upgradeEffect={id:s.game!.nextId++,entityId:id};
 const observer=s.guests.find(g=>!g.staff&&!g.departing&&g.floorId===e.floorId&&!g.movement?.steps.length)??s.guests.find(g=>g.staff&&(g.floorId===e.floorId||e.kind==='room'));
 if(observer){observer.speech={next:0,recent:observer.speech?.recent??[],event:'renovation',eventUntil:s.game!.day*1440+s.game!.minute+40};observer.thought=observer.staff?(e.kind==='room'?'客房已布置完成，可以安排下一位了。':'公区升级完成，新设施可以使用了。'):e.kind==='room'?'这间刚翻新了，下次住住看。':'这里刚升级了，看起来更舒服了。';}
}
