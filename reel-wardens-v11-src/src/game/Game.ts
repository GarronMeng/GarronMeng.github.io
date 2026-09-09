import { EventBus } from '../core/EventBus';
import { Loop } from '../core/Loop';
import { createSeededRandom, type Rng } from '../core/rng';
import type { GameState } from '../core/types';
import { createState } from './createState';
import { UnitSystem } from '../systems/UnitSystem';
import { ReelSystem } from '../systems/ReelSystem';
import { ShopSystem } from '../systems/ShopSystem';
import { CombatSystem } from '../systems/CombatSystem';
import { UiRenderer } from '../ui/UiRenderer';
import { ThreeBattlefield } from '../render/ThreeBattlefield';

export class Game {
  private state:GameState; private rng:Rng=createSeededRandom(1); private bus=new EventBus();
  private units:UnitSystem; private shop:ShopSystem; private reel:ReelSystem; private combat:CombatSystem; private ui:UiRenderer; private three:ThreeBattlefield;
  private loop:Loop; private frame=0; private uiElapsed=0; private dirty=true;
  constructor(private root:HTMLElement){
    this.state=createState(this.rng);
    const rng=()=>this.rng;
    this.units=new UnitSystem(this.state,rng,this.bus);this.shop=new ShopSystem(this.state,rng);this.reel=new ReelSystem(this.state,rng,this.units,this.bus);this.combat=new CombatSystem(this.state,rng,this.units,this.shop,this.bus);
    this.ui=new UiRenderer(root,(a,d)=>this.action(a,d),o=>this.shop.price(o));this.three=new ThreeBattlefield(()=>this.state,this.bus);this.loop=new Loop((dt,e)=>this.update(dt,e),()=>this.renderFrame());
    this.bus.on(()=>{this.dirty=true});this.installTestHooks();this.shop.roll(true);this.renderUi();
  }
  start(){this.loop.start()}
  dispose(){this.loop.stop();document.body.classList.remove('rw-three-active');this.three.dispose();this.bus.clear();window.__THREE_GAME_TEST_HOOKS__=undefined;window.__THREE_GAME_DIAGNOSTICS__=undefined}
  private update(dt:number,elapsed:number){this.frame++;if(this.state.pausedForScreenshot){this.publishDiagnostics();return}const now=performance.now();this.reel.update(now);this.combat.update(dt);this.uiElapsed+=dt;if((this.state.reel.spinning||this.state.phase==='battle')&&this.uiElapsed>=.08){this.uiElapsed=0;this.dirty=true}this.three.update(this.state.reducedMotion?0:dt,this.state.reducedMotion?0:elapsed);this.publishDiagnostics();}
  private renderFrame(){if(this.dirty){this.renderUi();this.dirty=false}}
  private renderUi(){document.body.classList.toggle('rw-three-active',this.state.threeEnabled);const diag=window.__THREE_GAME_DIAGNOSTICS__;this.ui.render(this.state,diag?`calls ${diag.renderer.calls} · tri ${diag.renderer.triangles}`:undefined);queueMicrotask(()=>this.three.mount())}
  private action(action:string,data:DOMStringMap){
    if(action==='start'){this.state.screen='game';this.shop.roll();}
    else if(action==='spin')this.reel.begin(performance.now());
    else if(action==='nudge')this.reel.armNudge();
    else if(action==='battle')this.combat.start();
    else if(action==='speed')this.state.battleSpeed=this.state.battleSpeed===2?1:2;
    else if(action==='three')this.state.threeEnabled=!this.state.threeEnabled;
    else if(action==='unit'&&data.id)this.units.select(data.id);
    else if(action==='lock'&&data.id)this.units.toggleLock(data.id);
    else if(action==='absorb-confirm')this.units.confirmAbsorb();
    else if(action==='absorb-cancel')this.units.cancelAbsorb();
    else if(action==='buy'&&data.id)this.shop.buy(data.id);
    else if(action==='reroll')this.shop.reroll();
    else if(action==='item'&&data.id)this.shop.use(data.id);
    else if(action==='formation'&&data.index!=null)this.swapFormation(Number(data.index));
    else if(action==='reward'&&data.id)this.shop.chooseReward(data.id);
    else if(action==='restart')this.restart();
    this.dirty=true;
  }
  private swapFormation(i:number){if(this.state.phase!=='prep'||i<0||i>=this.state.units.length)return;if(this.state.formationSelected==null){this.state.formationSelected=i;this.state.toast=`已选阵位 ${i+1}，再点另一阵位交换。`;return}if(this.state.formationSelected===i){this.state.formationSelected=null;return}const a=this.state.formationSelected;[this.state.units[a],this.state.units[i]]=[this.state.units[i]!,this.state.units[a]!];this.state.formationSelected=null;this.state.toast='阵型已调整。';}
  private restart(){const next=createState(this.rng);for(const k of Object.keys(this.state) as (keyof GameState)[])delete (this.state as any)[k];Object.assign(this.state,next);this.shop.roll(true);this.state.screen='game';this.dirty=true;}
  private seed(value:number){this.rng=createSeededRandom(value);this.restart();this.state.screen='menu';this.dirty=true;}
  private installTestHooks(){window.__THREE_GAME_TEST_HOOKS__={seed:(v:number)=>this.seed(v),setState:(name:string)=>{if(name==='menu'){this.restart();this.state.screen='menu'}else if(name==='active-play'){this.restart();this.state.screen='game';this.units.recruit('guard');this.units.recruit('mage');this.units.recruit('ranger')}else if(name==='battle'){this.restart();this.state.screen='game';this.units.recruit('guard');this.units.recruit('mage');this.units.recruit('ranger');this.combat.start()}else throw new Error(`Unknown state ${name}`);this.dirty=true;this.renderUi();return{name}},setPausedForScreenshot:(v:boolean)=>{this.state.pausedForScreenshot=v;if(v){this.three.update(0,0);this.publishDiagnostics()}},setReducedMotion:(v:boolean)=>{this.state.reducedMotion=v;if(v){this.three.update(0,0);this.publishDiagnostics()}},hideDebugUi:(v:boolean)=>this.ui.setDebugHidden(v),action:(a:string,p:Record<string,string>={})=>{this.action(a,p as DOMStringMap);this.renderUi()},snapshot:()=>structuredClone(this.state)};}
  private publishDiagnostics(){const rd=this.three.diagnostics();window.__THREE_GAME_DIAGNOSTICS__={frame:this.frame,wave:this.state.wave,phase:this.state.phase,screen:this.state.screen,gold:this.state.gold,heart:this.state.base,units:this.state.units.length,spinCount:this.state.spinCount,reelSpinning:this.state.reel.spinning,battle:!!this.state.battle,renderer:rd,canvas:{width:this.root.clientWidth,height:this.root.clientHeight,dpr:Math.min(devicePixelRatio||1,innerWidth<520?1.35:1.5)}};}
}
