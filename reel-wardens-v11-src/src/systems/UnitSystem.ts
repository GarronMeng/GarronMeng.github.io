import type { AbsorbPreview, GameState, Imprint, RandomStat, Unit, UnitType } from '../core/types';
import type { Rng } from '../core/rng';
import { chance, pick, shuffle } from '../core/rng';
import { ADVANCED, EVOLUTION, IMPRINTS, MAX_UNITS, STAT_POOL, UNIT_TYPES } from '../data/gameData';
import type { EventBus } from '../core/EventBus';

export class UnitSystem {
  constructor(private state:GameState, private rng:()=>Rng, private bus:EventBus){}
  private nextId(){ return `u${++this.state.serial}`; }
  private rollStats(count:number):RandomStat[]{ return shuffle(this.rng(),STAT_POOL).slice(0,count).map(s=>({id:s.id,label:s.label,value:Math.round(s.min+this.rng()()*(s.max-s.min)),suffix:s.suffix})); }
  private statMap(stats:RandomStat[]){const out:Record<string,number>={};for(const s of stats)out[s.id]=(out[s.id]||0)+s.value;return out;}
  private rollImprint(type:UnitType):Imprint { return {...pick(this.rng(),IMPRINTS[type])}; }
  create(type:UnitType,{advanced=false,rarityUp=false}:{advanced?:boolean;rarityUp?:boolean}={}):Unit{
    const def=UNIT_TYPES[type], stats=this.rollStats(type==='prism'?4:3), map=this.statMap(stats);
    const u:Unit={id:this.nextId(),type,name:def.name,star:type==='prism'?3:1,level:1,locked:false,advanced:false,atk:Math.max(1,Math.round(def.atk*(1+(map.atkPct||0)/100))),hp:Math.max(1,Math.round(def.hp*(1+(map.hpPct||0)/100))),spd:+(def.spd*(1+(map.spdPct||0)/100)).toFixed(2),crit:+(def.crit+(map.critPct||0)/100).toFixed(3),lifesteal:(map.lifesteal||0)/100,spellPower:(map.spellPower||0)/100,randomStats:stats,imprints:[this.rollImprint(type)],imprint:'',evoProgress:0,evoStage:0};
    u.imprint=u.imprints[0]?.name||'';
    if(type!=='prism'&&(advanced||rarityUp))this.promoteRarity(u);
    return u;
  }
  recruit(type:UnitType,rarityUp=false){
    if(this.state.units.length>=MAX_UNITS){this.state.toast='Roster 已满：先吸收/整理单位再 Spin。';return null;}
    const advanced=type!=='prism'&&chance(this.rng(),this.state.advancedChance);
    const u=this.create(type,{advanced,rarityUp});this.state.units.push(u);
    this.state.toast=`招募 ${u.name} · LV.${u.level} · ${u.imprint}`;return u;
  }
  recruitPrism(){ if(this.state.units.length>=MAX_UNITS)return null;const u=this.create('prism');this.state.units.push(u);this.state.toast='PRISM 降临。';return u; }
  promoteRarity(u:Unit){
    if(u.type==='prism')return;
    if(!u.advanced){const a=ADVANCED[u.type];if(a){u.advanced=true;u.star=Math.max(2,u.star);u.name=a.name;u.atk=Math.round(u.atk*a.atk);u.hp=Math.round(u.hp*a.hp);u.spd=+(u.spd*a.spd).toFixed(2);u.crit=+(u.crit+a.crit).toFixed(3);u.level=Math.max(3,u.level)}}
    else{u.star=Math.min(3,u.star+1);u.atk=Math.round(u.atk*1.16);u.hp=Math.round(u.hp*1.16);u.level=Math.max(5,u.level)}
  }
  toggleLock(id:string){const u=this.state.units.find(x=>x.id===id);if(!u||this.state.phase!=='prep')return;u.locked=!u.locked;if(this.state.selected===id)this.state.selected=null;this.state.toast=`${u.name} ${u.locked?'已 LOCK，不会被作为素材':'已解锁'}`;}
  select(id:string){
    if(this.state.phase!=='prep')return;const u=this.state.units.find(x=>x.id===id);if(!u)return;
    if(!this.state.selected){if(u.locked){this.state.toast=`${u.name} 已 LOCK，不能作为吸收素材。`;return}this.state.selected=id;this.state.toast=`素材：${u.name}。再点目标查看吸收预览。`;return}
    if(this.state.selected===id){this.state.selected=null;this.state.toast='已取消素材选择。';return}
    const source=this.state.units.find(x=>x.id===this.state.selected),target=u;if(!source)return;this.state.absorb={src:source.id,tgt:target.id,preview:this.previewAbsorb(source,target)};this.state.selected=null;
  }
  previewAbsorb(source:Unit,target:Unit):AbsorbPreview{
    const same=source.type===target.type, ratio=same?.62:.30, statRatio=same?.55:.28;
    const statTransfers=source.randomStats.map(s=>({...s,value:+(s.value*statRatio).toFixed(1)})).filter(s=>s.value>0);
    const imprintNames=source.imprints.filter(im=>im.transfer!=='none'&&(same||im.transfer==='partial')).map(im=>im.transfer==='full'&&same?im.name:`${im.name} Echo`);
    return{same,gainAtk:Math.max(1,Math.round(source.atk*ratio*.44)),gainHp:Math.max(1,Math.round(source.hp*ratio*.30)),gainSpd:+(source.spd*(same?.035:.012)).toFixed(2),gainCrit:+(source.crit*(same?.10:.04)).toFixed(3),statTransfers,imprintNames,progress:source.type==='prism'?3:(same?2:1),prismRisk:source.type==='prism'};
  }
  cancelAbsorb(){this.state.absorb=null;this.state.selected=null;this.state.toast='已取消吸收。';}
  confirmAbsorb(){const a=this.state.absorb;if(!a)return;const source=this.state.units.find(x=>x.id===a.src),target=this.state.units.find(x=>x.id===a.tgt);if(!source||!target){this.state.absorb=null;return}this.bus.emit({type:'unit:merge',src:source.id,tgt:target.id});this.applyAbsorb(source,target,a.preview);this.state.units=this.state.units.filter(x=>x.id!==source.id);this.state.absorb=null;this.state.toast=`${target.name} 吸收完成 · LV.${target.level}`;}
  private applyAbsorb(source:Unit,target:Unit,p:AbsorbPreview){target.atk+=p.gainAtk;target.hp+=p.gainHp;target.spd=+(target.spd+p.gainSpd).toFixed(2);target.crit=+(target.crit+p.gainCrit).toFixed(3);target.level+=Math.max(1,Math.round(source.level*.55));for(const s of p.statTransfers)this.mergeStat(target,s);this.transferImprints(source,target,p.same);this.advanceEvolution(target,p.progress);const m=this.statMap(target.randomStats);target.lifesteal=(m.lifesteal||0)/100;target.spellPower=(m.spellPower||0)/100;}
  private mergeStat(target:Unit,gain:RandomStat){let s=target.randomStats.find(x=>x.id===gain.id);if(!s){s={...gain,value:0};target.randomStats.push(s)}s.value=+(s.value+gain.value).toFixed(1);}
  private transferImprints(source:Unit,target:Unit,same:boolean){for(const im of source.imprints){if(im.transfer==='none')continue;if(im.transfer==='full'&&same&&!target.imprints.some(x=>x.id===im.id))target.imprints.push({...im});else if(im.transfer==='partial'){const id=`${im.id}_echo`;if(!target.imprints.some(x=>x.id===id))target.imprints.push({...im,id,name:`${im.name} Echo`,desc:`继承：${im.desc}`})}}target.imprint=target.imprints[0]?.name||target.imprint;}
  private advanceEvolution(u:Unit,gain:number){u.evoProgress+=gain;const path=EVOLUTION[u.type];if(!path){const before=u.star;u.star=u.evoProgress>=10?3:u.evoProgress>=4?2:1;if(u.star>before)this.bus.emit({type:'unit:level',id:u.id,star:u.star});return}let next=u.evoStage;for(let i=path.length-1;i>=0;i--)if(u.evoProgress>=path[i]!.progress){next=i;break}if(next>u.evoStage){for(let i=u.evoStage+1;i<=next;i++){const stage=path[i]!;u.atk=Math.round(u.atk*stage.atk);u.hp=Math.round(u.hp*stage.hp);u.spd=+(u.spd*stage.spd).toFixed(2);u.crit=+(u.crit+stage.crit).toFixed(3);u.name=stage.name;u.star=stage.star;u.evoStage=i;u.evo=stage.name.toLowerCase().replace(/\s+/g,'_');this.bus.emit({type:'unit:level',id:u.id,star:u.star})}}}
  hasImprint(u:{imprints:Imprint[]},id:string){return u.imprints.some(x=>x.id===id||x.id===`${id}_echo`)}
}
