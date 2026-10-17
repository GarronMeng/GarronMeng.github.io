import type {Room} from '../../state/types';
import {roomBed,roomTier} from '../../content/roomTypes';
/** Game upgrade tiers are art adaptations, NOT official Hyatt room classifications. */
export function roomVisualPlan(room:Room){
 const category=roomTier(room),bed=roomBed(room),level=Math.max(1,Math.min(5,Math.floor(room.level??1))),suite=category==='suite'||category==='premium',premium=category==='premium';
 return {category,bed,level,suite,premium,windowWidth:category==='standard'?1.8:2.3,
  features:['photo-led-base',...(suite?['regency-suite-84m2','separate-bathroom','entry-wardrobe','suite-zoning']:[]),bed==='twin'?'twin-beds':'king-bed',category==='standard'?'window-chaise':'wide-view-window',...(suite?['suite-sofa','coffee-table','slatted-divider']:[]),...(premium?['premium-stonework','reading-lamp']:[]),
   ...(level>=2?['tailored-bedding','stitched-headboard']:[]),...(level>=3?['reading-lamp','layered-upholstery','carpet-border']:[]),...(level>=4?['stone-vanity','backlit-mirror']:[]),...(level>=5?['ceiling-cove','gallery-pair','fluted-casework']:[])],
 };
}
export function roomTemplateKey(room:Room){const p=roomVisualPlan(room);return [p.category,p.bed,p.level,room.status==='dirty'?'dirty':'ready'].join(':');}
