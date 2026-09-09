import type { GameState } from '../core/types';
import type { Rng } from '../core/rng';
import { REEL_KEYS } from '../data/gameData';
import { readHigh } from '../core/storage';

export function createState(rng:Rng):GameState{
  const board=Array.from({length:9},()=>REEL_KEYS[Math.floor(rng()*REEL_KEYS.length)]!);
  return{
    screen:'menu',phase:'prep',wave:1,base:24,gold:260,score:0,high:readHigh(),spinCount:0,spinCost:24,nudge:1,
    units:[],selected:null,lines:[],hitCells:[],toast:'Spin 招募单位，再安排阵型迎战。',battle:null,battleSpeed:1,jack:false,blankStreak:0,
    items:[],cores:[],shopOffers:[],shopWave:0,shopRerolls:0,rewardChoices:[],absorb:null,formationSelected:null,guardNext:false,
    advancedChance:.065,retryUsedWave:0,fieldCap:5,serial:0,threeEnabled:true,pausedForScreenshot:false,reducedMotion:false,
    reel:{board,target:[...board],spinning:false,startTime:0,lastScramble:0,stopped:[true,true,true],stopTimes:[0,0,0],tension:0,goldenCell:null,nudgeArmed:false,pendingCost:0,freeRetry:false}
  };
}
