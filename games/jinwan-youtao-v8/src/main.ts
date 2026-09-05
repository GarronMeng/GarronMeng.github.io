import './ui/style.css';
import {createStore} from './state/store';
import {mountShell} from './ui/shell';
import {HotelWorld} from './render/HotelWorld';
import {loadGame,saveGame,SAVE_KEY} from './core/save';
const store=createStore(loadGame());const shell=mountShell(document.querySelector('#app')!,store);
let resetting=false,saveBlocked=store.getState().game!.notice.startsWith('存档读取失败');
const save=()=>{if(!resetting&&!saveBlocked&&!saveGame(store.getState())){saveBlocked=true;alert('存档未能写入，请在运营面板导出备份，避免关闭页面后丢失进度。');}};
setInterval(()=>{if(!document.hidden&&!document.querySelector('dialog[open]'))store.advance(4*store.getState().speed);},1000);
setInterval(save,5000);document.addEventListener('visibilitychange',save);window.addEventListener('pagehide',save);
document.addEventListener('new-game',()=>{if(!confirm('新开会清除本浏览器的 v8 经营进度，旧版存档不受影响。继续吗？'))return;resetting=true;try{localStorage.removeItem(SAVE_KEY);store.reset();saveBlocked=false;saveGame(store.getState());location.reload();}catch{alert('无法重置存档。');}finally{resetting=false;}});
function syncViewport(){const viewport=window.visualViewport;document.documentElement.style.setProperty('--viewport-height',(viewport?.height??innerHeight)+'px');document.documentElement.style.setProperty('--viewport-top',(viewport?.offsetTop??0)+'px');}
syncViewport();window.visualViewport?.addEventListener('resize',syncViewport);window.visualViewport?.addEventListener('scroll',syncViewport);window.addEventListener('resize',syncViewport);
try{const world=new HotelWorld(shell.stage,store);shell.setFocusHandler(id=>world.focusFloor(id));shell.stage.addEventListener('world-error',e=>shell.showError((e as CustomEvent<string>).detail));window.addEventListener('pagehide',e=>{if(!e.persisted)world.dispose()});}catch(error){console.error(error);shell.showError('浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。');}
