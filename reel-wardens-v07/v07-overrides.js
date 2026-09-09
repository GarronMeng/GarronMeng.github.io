/* v0.7 VFX & Alignment Pass: no gameplay rule changes */
const __v07RenderGame=renderGame;
renderGame=function(){return __v07RenderGame().replace('v0.6 FEEL','v0.7 VFX')};
const __v07RenderMenu=renderMenu;
renderMenu=function(){return __v07RenderMenu().replace('V0.3 FEEL BUILD','V0.7 VFX BUILD').replace('Combat & Jackpot Feel','VFX & Alignment')};
const __v07RecalcStar=recalcStar;
recalcStar=function(u){const before=u.star;__v07RecalcStar(u);if(u.star>before){try{window.dispatchEvent(new CustomEvent('rwlevel',{detail:{id:u.id,star:u.star}}))}catch(e){}}};
