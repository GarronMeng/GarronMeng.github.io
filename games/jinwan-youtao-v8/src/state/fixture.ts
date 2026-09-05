import type {PreviewState,Floor,Entity,Guest,RoomStatus} from './types';
/** Phase 1 fixture only. Does not read, migrate or overwrite legacy saves. */
export function createVisualFixture(guestFloors=3):PreviewState {
 if (!Number.isInteger(guestFloors)||guestFloors<1||guestFloors>8) throw new Error('Guest floor count must be 1–8');
 const floors:Floor[]=[];const entities:Record<string,Entity>={};
 const facility=(number:number,role:'lobby'|'breakfast'|'club'|'gym'|'rooftop',name:string,capacity:number,usage:number)=>{
  const id='floor-'+role,eid='facility-'+role;
  floors.push({id,number,label:role==='lobby'?'L':role==='rooftop'?'RF':number+'F',name,role,entityIds:[eid]});
  entities[eid]={id:eid,kind:'facility',floorId:id,role,name,capacity,usage,staffing:role==='lobby'?2:1,quality:92,maintenance:96};
 };
 facility(0,'lobby','大堂',12,4);facility(1,'breakfast','早餐厅',18,6);
 const statuses:RoomStatus[]=['available','occupied','cleaning','occupied','reserved','available','occupied','available','occupied'];
 for(let f=2;f<guestFloors+2;f++){
  const floor:Floor={id:'floor-'+f,number:f,label:f+'F',name:'客房',role:'guest',entityIds:[]};
  for(let c=0;c<3;c++){
   const number=String(f*100+c+1),id='room-'+number,status=statuses[((f-2)*3+c)%statuses.length];
   floor.entityIds.push(id);entities[id]={id,kind:'room',floorId:floor.id,number,type:c===2?'suite':c===1?'twin':'king',status,nightsLeft:status==='occupied'?c+2:0};
  }floors.push(floor);
 }
 facility(guestFloors+2,'club','嘉宾轩',12,4);facility(guestFloors+3,'gym','健身房',8,3);facility(guestFloors+4,'rooftop','屋顶花园',16,3);
 const guests:Guest[]=[
  {id:'guest-chen',name:'陈先生',tier:'Globalist',roomId:'room-301',floorId:'floor-3',thought:'明天还住这里',color:0x274255,route:[-6,-3]},
  {id:'guest-lin',name:'林先生',tier:'Explorist',roomId:'room-202',floorId:'floor-2',thought:'这张床不错',color:0x507574,route:[-.6,1.4]},
  {id:'guest-zhou',name:'周先生',tier:'Member',roomId:'room-401',floorId:'floor-4',thought:'窗外真好看',color:0x756054,route:[-6,-3.5]},
  {id:'guest-he',name:'何先生',tier:'Globalist',roomId:'room-403',floorId:'floor-4',thought:'先去酒廊坐坐',color:0x394f65,route:[4,6]},
 ];
 const publicActors:[string,number,number,number,number,string,boolean?][]=[
  ['lobby',-1.8,-1.8,-.1,0x283e50,'欢迎回来',true],['lobby',1.7,1.7,-.1,0x283e50,'为您办理入住',true],
  ['lobby',-2,2.2,1.65,0x264d61,'今晚有套吗？'],['lobby',3,3,1.67,0x6b7260,'等朋友来'],
  ['breakfast',-5.5,-5.5,.6,0x667468,'咖啡真香'],['breakfast',3.85,3.85,.62,0x344d68,'来份热早餐'],['breakfast',-1.7,1.7,.51,0xd4c8b2,'补充新鲜面包',true],
  ['club',-4.4,-2.7,1.21,0x364b68,'日落时分刚刚好'],['club',4.45,4.45,.42,0x817465,'再坐一会'],['club',.4,.4,-.64,0x283e50,'为您调一杯',true],
  ['gym',-3.8,-3.8,.3,0x3d6c78,'再跑十分钟'],['gym',3.8,5,1.2,0x6c7279,'舒展一下'],
  ['rooftop',-1.7,1.3,1.1,0x716752,'这里的风真舒服']
 ];
 publicActors.forEach(([role,start,end,z,color,thought,staff],i)=>guests.push({id:'public-'+i,name:staff?'当班员工':'住客',tier:staff?'Staff':'Member',floorId:'floor-'+role,thought,color,route:[start,end],z,staff:!!staff}));
 for(const e of Object.values(entities))if(e.kind==='facility'){e.usage=guests.filter(g=>g.floorId===e.floorId&&!g.staff).length;e.staffing=guests.filter(g=>g.floorId===e.floorId&&g.staff).length;}
 for(const g of guests){const r=g.roomId?entities[g.roomId]:null;if(r?.kind==='room'&&r.status==='occupied')r.guestId=g.id;}
 return {schemaVersion:8,mode:'visual-slice',brandId:'place',metrics:{cash:28600,reputation:86,owner:82},floors,entities,guests:guests.filter(g=>!g.roomId||!!entities[g.roomId]),selectedId:null,focusedFloorId:null,speed:1,atmosphere:'dusk',visited:[]};
}
