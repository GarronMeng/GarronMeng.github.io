import {initOperations,prepareMorning} from './operations';
import {initGuest} from './guestAI';
import {initDevelopment} from './progression';
import type {PreviewState} from '../state/types';
import {newGame} from './game';
export const SAVE_KEY='jinwanyoutao_v8_game_1';
export function loadGame():PreviewState {
 try{const raw=localStorage.getItem(SAVE_KEY);if(!raw)return newGame();const s=JSON.parse(raw) as PreviewState;
 if(s.schemaVersion!==8||s.mode!=='game'||!s.game||!Array.isArray(s.floors)||!Array.isArray(s.guests)||!Array.isArray(s.game.logs)||!Array.isArray(s.game.events)||!Array.isArray(s.game.tasks)||!Array.isArray(s.game.reports)||!s.entities||!s.game.managers||!s.game.memory||!Number.isFinite(s.game.day)||!Number.isFinite(s.game.minute)||!Number.isFinite(s.metrics?.cash))throw Error('存档格式不兼容');
 for(const f of s.floors)for(const id of f.entityIds)if(s.entities[id]?.floorId!==f.id)throw Error('楼层数据不完整');
 initDevelopment(s);initOperations(s);if(s.game.operations!.day!==s.game.day)prepareMorning(s,!s.game.reportOpen);s.guests.forEach(g=>initGuest(s,g));s.selectedId=null;s.focusedFloorId=null;s.game.notice='已恢复上次交班进度。';return s;
 }catch{const s=newGame();s.game!.paused=true;s.game!.notice='存档读取失败。旧数据尚未删除；请先导出备份，再选择新开。';return s;}
}
export function saveGame(s:Readonly<PreviewState>){try{localStorage.setItem(SAVE_KEY,JSON.stringify(s));return true;}catch{return false;}}
