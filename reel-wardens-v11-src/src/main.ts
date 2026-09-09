import './styles.css';
import { Game } from './game/Game';
const root=document.querySelector<HTMLElement>('#app');if(!root)throw new Error('Missing #app');const game=new Game(root);game.start();
const hot=(import.meta as ImportMeta & {hot?:{dispose:(fn:()=>void)=>void}}).hot;if(hot)hot.dispose(()=>game.dispose());
