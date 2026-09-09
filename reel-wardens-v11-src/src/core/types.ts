export type Phase = 'prep' | 'battle' | 'over';
export type Screen = 'menu' | 'game' | 'reward' | 'over';
export type UnitType = 'guard' | 'cavalry' | 'ranger' | 'mage' | 'prism';
export type ReelSymbol = UnitType | 'jester';
export type EnemyType = 'crawler' | 'brute' | 'spitter' | 'seer' | 'boss';
export type StatId = 'atkPct' | 'hpPct' | 'spdPct' | 'critPct' | 'lifesteal' | 'spellPower';
export interface RandomStat { id: StatId; label: string; value: number; suffix: string; }
export interface Imprint { id: string; name: string; desc: string; transfer: 'full'|'partial'|'none'; }
export interface Unit {id:string;type:UnitType;name:string;star:number;level:number;locked:boolean;advanced:boolean;atk:number;hp:number;spd:number;crit:number;lifesteal:number;spellPower:number;randomStats:RandomStat[];imprints:Imprint[];imprint:string;evoProgress:number;evoStage:number;evo?:string;}
export interface Combatant extends Unit {idx:number;maxHp:number;shield:number;cd:number;dead:boolean;invulnTicks?:number;veilSave?:boolean;bossAct?:number;}
export interface Enemy {id:string;type:EnemyType;name:string;idx:number;maxHp:number;hp:number;atk:number;spd:number;cd:number;shield:number;dead:boolean;bossAct?:number;elite?:boolean;}
export interface Payline {id:string;name:string;cells:[number,number,number];pts:string;key?:UnitType;}
export interface AnalyzedLine extends Payline {key:UnitType;}
export interface ItemDef {id:string;name:string;desc:string;tag:string;price:number;kind:string;classId?:UnitType;}
export interface ItemInstance extends ItemDef {instanceId:string;}
export interface CoreDef {id:string;name:string;desc:string;tag:string;price:number;}
export type ShopOffer=(ItemDef|CoreDef)&{offerId:string;offerKind:'item'|'core';sold:boolean;};
export interface AbsorbPreview {same:boolean;gainAtk:number;gainHp:number;gainSpd:number;gainCrit:number;statTransfers:RandomStat[];imprintNames:string[];progress:number;prismRisk:boolean;}
export interface AbsorbState {src:string;tgt:string;preview:AbsorbPreview;}
export interface BattleState {allies:Combatant[];enemies:Enemy[];msg:string;elapsed:number;}
export interface RewardChoice {kind:'item'|'core'|'gold';id:string;rewardId:string;name:string;desc:string;tag:string;}
export interface ReelState {board:ReelSymbol[];target:ReelSymbol[];spinning:boolean;startTime:number;lastScramble:number;stopped:boolean[];stopTimes:number[];tension:number;goldenCell:number|null;nudgeArmed:boolean;pendingCost:number;freeRetry:boolean;}
export interface GameState {screen:Screen;phase:Phase;wave:number;base:number;gold:number;score:number;high:number;spinCount:number;spinCost:number;nudge:number;units:Unit[];selected:string|null;lines:AnalyzedLine[];hitCells:number[];toast:string;battle:BattleState|null;battleSpeed:1|2;jack:boolean;blankStreak:number;items:ItemInstance[];cores:CoreDef[];shopOffers:ShopOffer[];shopWave:number;shopRerolls:number;rewardChoices:RewardChoice[];absorb:AbsorbState|null;formationSelected:number|null;guardNext:boolean;advancedChance:number;retryUsedWave:number;fieldCap:number;serial:number;reel:ReelState;threeEnabled:boolean;pausedForScreenshot:boolean;reducedMotion:boolean;}
export type GameEvent={type:'state:dirty'}|{type:'combat:fx';src:string;tgt:string;kind:string;good:boolean}|{type:'unit:merge';src:string;tgt:string}|{type:'unit:level';id:string;star:number}|{type:'jackpot';lines:number};
