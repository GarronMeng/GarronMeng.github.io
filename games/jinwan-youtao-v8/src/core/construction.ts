import type {PreviewState} from '../state/types';
import {upgradeFeedback} from './upgradeFeedback';
import {operationsLog} from './operations';
export function tickConstruction(s:PreviewState){for(const f of s.floors){if(f.construction&&--f.construction.remaining<=0){f.construction=undefined;upgradeFeedback(s,f.entityIds[0]);operationsLog(s,f.label+' 施工验收完成：整层供电，三个空位可配置。','升级',f.entityIds[0]);}}
 for(const e of Object.values(s.entities)){const build=e.construction;if(!build)continue;if(--build.remaining>0)continue;e.construction=undefined;e.level=build.targetLevel??e.level??1;
  if(e.kind==='room')e.status='available';else{e.capacity+=4;e.quality=Math.min(100,e.quality+5);e.maintenance=100;}
  upgradeFeedback(s,e.id);operationsLog(s,(e.kind==='room'?e.number:e.name)+' 改造竣工，新的空间已开放。','升级',e.id);
 }
}
