import type {Department} from '../state/types';
import {portrait} from './portraits';
export const esc=(v:unknown)=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]!));
export const money=(n:number)=>'¥'+Math.round(n).toLocaleString('en-US');
export const btn=(label:string,type:string,id='',value='',extra='')=>`<button class="game-action" data-action="${type}" data-id="${esc(id)}" data-value="${esc(value)}" ${extra}>${label}</button>`;
export const go=(label:string,target:string)=>`<button class="game-action" data-open="${target}">${label}</button>`;
export const choose=(label:string,key:string,value:string,active=false)=>`<button data-focus-key="${key}" data-focus-value="${esc(value)}" aria-pressed="${active}">${label}</button>`;
export const tabs=(body:string)=>`<div class="focus-tabs">${body}</div>`;
export const metrics=(values:[string,string][])=>`<div class="focus-metrics">${values.map(([k,v])=>`<div><small>${k}</small><strong>${v}</strong></div>`).join('')}</div>`;
export const head=(dept:Department,title:string,text:string)=>`<div class="focus-person">${portrait(dept)}<div><strong>${esc(title)}</strong><p>${esc(text)}</p></div></div>`;
export const frame=(title:string,body:string,actions:string)=>`<section class="focus-screen"><h2>${title}</h2><div class="focus-main">${body}</div></section><div class="focus-footer">${actions}</div>`;
export interface Chip {k:string;v:number|string;money?:boolean;tone?:'good'|'bad'|'warn'}
export interface Choice {label:string;action:string;id:string;value:string;effects:Chip[];note?:string;disabled?:string;recommended?:boolean}
export const chip=(e:Chip)=>{const n=typeof e.v==='number'?e.v:null,tone=e.tone??(n===null?'':n>0?'good':n<0?'bad':'');return `<i class="${tone}">${esc(e.k)} ${n===null?esc(e.v):(n>0?'+':n<0?'−':'')+(e.money?money(Math.abs(n)):Math.abs(n))}</i>`;};
/** Every decision reads the same way: situation → advice → options with their trade-offs → act. */
export const decisionCard=(o:{kicker:string;who:string;title:string;situation:string;advice?:string;options:Choice[];fallback?:string})=>`<article class="decision-card"><small class="dc-kicker">${esc(o.kicker)}</small><div class="focus-person">${o.who}<div><strong>${esc(o.title)}</strong><p>${esc(o.situation)}</p></div></div>${o.advice?`<p class="dc-advice"><b>建议</b>${esc(o.advice)}</p>`:''}<div class="dc-options">${o.options.map(c=>`<button class="dc-option${c.recommended?' recommended':''}" data-action="${c.action}" data-id="${esc(c.id)}" data-value="${esc(c.value)}"${c.disabled?` disabled title="${esc(c.disabled)}"`:''}><strong>${esc(c.label)}${c.recommended?'<em>建议</em>':''}</strong><span class="dc-effects">${c.effects.map(chip).join('')}</span><small>${esc(c.disabled??c.note??'')}</small></button>`).join('')}</div>${o.fallback?`<small class="dc-fallback">${esc(o.fallback)}</small>`:''}</article>`;
export const pager=(key:string,index:number,total:number)=>`<div class="focus-pager">${choose('‹ 上一项',key,String(Math.max(0,index-1)))}<span>${total?index+1:0} / ${total}</span>${choose('下一项 ›',key,String(Math.min(Math.max(0,total-1),index+1)))}</div>`;
