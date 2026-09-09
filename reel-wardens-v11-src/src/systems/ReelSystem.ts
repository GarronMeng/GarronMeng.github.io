import type { AnalyzedLine, GameState, UnitType } from '../core/types';
import type { Rng } from '../core/rng';
import { chance, int, pick } from '../core/rng';
import { LINES, REEL_KEYS } from '../data/gameData';
import type { UnitSystem } from './UnitSystem';
import type { EventBus } from '../core/EventBus';

export class ReelSystem {
  private freeRetryQueued=false;
  constructor(private state:GameState, private rng:()=>Rng, private units:UnitSystem, private bus:EventBus){}
  spinCost(count=this.state.spinCount){return 24+Math.max(0,count)*10;}
  hasCore(id:string){return this.state.cores.some(c=>c.id===id);}
  armNudge(){if(this.state.phase!=='prep'||this.state.nudge<=0||this.state.reel.nudgeArmed)return;this.state.reel.nudgeArmed=true;this.state.nudge--;this.state.toast='NUDGE 已准备：下一次 Spin 保证至少一条有效线。';}
  weightedKey():UnitType{
    const weights:Record<UnitType,number>={guard:28,cavalry:24,ranger:24,mage:24,prism:0};
    if(this.hasCore('warrior_bias'))weights.guard+=16;if(this.hasCore('mage_bias'))weights.mage+=16;if(this.hasCore('archer_bias'))weights.ranger+=16;
    const bias=(this.state as any).itemBias as {type:UnitType;spins:number}|undefined;if(bias&&bias.spins>0)weights[bias.type]+=30;
    let total=REEL_KEYS.reduce((n,k)=>n+weights[k],0),r=this.rng()()*total;for(const k of REEL_KEYS){r-=weights[k];if(r<=0)return k}return'guard';
  }
  analyze(board:UnitType[]):{lines:AnalyzedLine[];cells:number[]} {
    const lines:AnalyzedLine[]=[], cells=new Set<number>();
    for(const l of LINES){const values=l.cells.map(i=>board[i]!), nonWild=values.filter(v=>v!=='prism' && v!=='jester' as UnitType);let key:UnitType|undefined;
      if(nonWild.length===3 && nonWild[0]===nonWild[1]&&nonWild[1]===nonWild[2])key=nonWild[0];
      if(key){lines.push({...l,key});l.cells.forEach(i=>cells.add(i));}
    }
    return{lines,cells:[...cells]};
  }
  private makeBoard(force:boolean){const a=Array.from({length:9},()=>this.weightedKey());if(force){const l=pick(this.rng(),LINES),k=this.weightedKey();l.cells.forEach(i=>a[i]=k)}return a;}
  begin(now:number,free=false){
    if(this.state.phase!=='prep'||this.state.reel.spinning)return false;if(this.state.units.length>=6){this.state.toast='Roster 已满：先吸收/整理单位再 Spin。';return false;}
    const cost=free?0:this.state.spinCost;if(this.state.gold<cost){this.state.toast='Gold 不足。';return false}
    this.state.gold-=cost;if(!free)this.state.spinCount++;this.state.spinCost=this.spinCost(this.state.spinCount);const force=this.state.reel.nudgeArmed;this.state.reel.nudgeArmed=false;
    const target=this.makeBoard(force);if(this.hasCore('jester_hat')&&chance(this.rng(),.44)){const i=int(this.rng(),9);(target as any)[i]='jester';}
    this.state.reel.goldenCell=this.hasCore('golden_relic')?int(this.rng(),9):null;const tension=this.anticipation(target as any);
    this.state.reel={...this.state.reel,target:target as any,spinning:true,startTime:now,lastScramble:now,stopped:[false,false,false],stopTimes:tension?[.39,.61,1.12+(tension>1?.18:0)]:[.39,.59,.79],tension,pendingCost:cost,freeRetry:free};
    this.state.lines=[];this.state.hitCells=[];this.state.jack=false;this.state.toast=free?'SECOND CHANCE · 免费重投':'Reels spinning…';return true;
  }
  update(now:number){const r=this.state.reel;if(!r.spinning){if(this.freeRetryQueued){this.freeRetryQueued=false;this.begin(now,true)}return}const elapsed=(now-r.startTime)/1000;if(now-r.lastScramble>70){r.lastScramble=now;for(let c=0;c<3;c++)if(!r.stopped[c])for(let row=0;row<3;row++)r.board[row*3+c]=this.weightedKey() as any;}
    for(let c=0;c<3;c++)if(!r.stopped[c]&&elapsed>=r.stopTimes[c]!){r.stopped[c]=true;for(let row=0;row<3;row++)r.board[row*3+c]=r.target[row*3+c]!;}
    if(r.stopped.every(Boolean))this.resolve(now);
  }
  private resolve(now:number){const r=this.state.reel;r.spinning=false;const {lines,cells}=this.analyzeWithJester(r.board as any);this.state.lines=lines;this.state.hitCells=cells;
    if(!lines.length){this.state.blankStreak++;if(this.hasCore('first_spin_retry')&&this.state.spinCount===1&&this.state.retryUsedWave!==this.state.wave&&!r.freeRetry){this.state.retryUsedWave=this.state.wave;this.state.gold+=r.pendingCost;this.state.spinCount=0;this.state.spinCost=this.spinCost(0);this.state.toast='SECOND CHANCE · 首次空振，免费重投';this.freeRetryQueued=true;return}const refund=this.hasCore('echo')?Math.min(60,16+this.state.blankStreak*7):0;this.state.gold+=refund;this.state.toast=refund?`空振 · Core 返还 ${refund} Gold`:`空振 · -${r.pendingCost} Gold`;return}
    this.state.blankStreak=0;let summoned=0;for(const l of lines){const rarityUp=this.hasCore('golden_relic')&&r.goldenCell!=null&&l.cells.includes(r.goldenCell);if(this.units.recruit(l.key,rarityUp))summoned++;}
    this.state.jack=lines.length>=2;if(lines.length>=5)this.units.recruitPrism();this.state.toast=lines.length>=5?`PRISM JACKPOT · ${lines.length} LINES`:this.state.jack?`JACKPOT · ${lines.length} LINES · ${summoned} recruits`:`${lines[0]!.name} · recruit ${lines[0]!.key}`;if(this.state.jack)this.bus.emit({type:'jackpot',lines:lines.length});
  }
  private analyzeWithJester(board:(UnitType|'jester')[]){const lines:AnalyzedLine[]=[],cells=new Set<number>();for(const l of LINES){const vals=l.cells.map(i=>board[i]!),real=vals.filter(v=>v!=='jester') as UnitType[];let key:UnitType|undefined;if(real.length===0)key=this.weightedKey();else if(real.every(v=>v===real[0]))key=real[0];if(key){lines.push({...l,key});l.cells.forEach(i=>cells.add(i));}}return{lines,cells:[...cells]};}
  private anticipation(board:(UnitType|'jester')[]){let score=0;for(const l of LINES){const first=l.cells.slice(0,2).map(i=>board[i]!),real=first.filter(v=>v!=='jester');if(real.length<=1||real[0]===real[1])score++;}return Math.min(2,score);}
}
