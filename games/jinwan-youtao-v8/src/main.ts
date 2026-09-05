import './ui/style.css';
import {createStore} from './state/store';
import {mountShell} from './ui/shell';
import {HotelWorld} from './render/HotelWorld';
const store=createStore();const shell=mountShell(document.querySelector('#app')!,store);
function syncViewport(){const viewport=window.visualViewport;document.documentElement.style.setProperty('--viewport-height',(viewport?.height??innerHeight)+'px');document.documentElement.style.setProperty('--viewport-top',(viewport?.offsetTop??0)+'px');}
syncViewport();window.visualViewport?.addEventListener('resize',syncViewport);window.visualViewport?.addEventListener('scroll',syncViewport);window.addEventListener('resize',syncViewport);
try{const world=new HotelWorld(shell.stage,store);shell.setFocusHandler(id=>world.focusFloor(id));shell.stage.addEventListener('world-error',e=>shell.showError((e as CustomEvent<string>).detail));window.addEventListener('pagehide',e=>{if(!e.persisted)world.dispose()});}catch(error){console.error(error);shell.showError('浏览器未能启动 3D 画面。请确认 WebGL 可用后重新载入。');}
