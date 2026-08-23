#!/usr/bin/env python3
from __future__ import annotations
import json,re,time,html as htmlmod
from datetime import datetime,timezone,timedelta
from pathlib import Path
from urllib.parse import urljoin
import requests
from bs4 import BeautifulSoup

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'/'listings.json'
CFG=json.loads((ROOT/'config.json').read_text(encoding='utf-8'))
CRIT=CFG['criteria']
HKT=timezone(timedelta(hours=8))
NOW=datetime.now(HKT)
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36 HKRentalRadar/2.1'
S=requests.Session();S.headers.update({'User-Agent':UA,'Accept-Language':'zh-HK,zh;q=0.9,en;q=0.7'})

SOURCES=[
 {'district':'荃湾','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2249%22%2C%2249-113%22%2C%22nt%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'西九龙高铁一般'},
 {'district':'葵芳','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2250%22%2C%2250-132%22%2C%22nt%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'西九龙高铁较方便'},
 {'district':'美孚','url':'https://www.28hse.com/rent/apartment/a2/dg107','shenzhen':'屯马线接西九龙高铁方便'},
 {'district':'荔枝角','url':'https://www.28hse.com/rent/apartment/a2/dg27','shenzhen':'西九龙高铁较方便'},
 {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106','shenzhen':'西九龙高铁较方便'},
 {'district':'深水埗','url':'https://www.28hse.com/rent/apartment/a2/dg26/di26-62','shenzhen':'西九龙高铁较方便'},
 {'district':'太子','url':'https://www.28hse.com/rent/apartment/a2/dg29','shenzhen':'西九龙高铁方便'},
 {'district':'旺角','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%22110%22%2C%22kw%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'西九龙高铁很方便'},
 {'district':'油麻地','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%22111%22%2C%22kw%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'西九龙高铁很方便'},
 {'district':'佐敦','url':'https://www.28hse.com/rent/apartment/a2/dg120/c73','shenzhen':'西九龙高铁很方便'},
 {'district':'北角','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%227%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default','shenzhen':'金钟转东铁'},
 {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8','shenzhen':'金钟转东铁'},
 {'district':'西湾河','url':'https://www.28hse.com/rent/apartment/a1/dg10/c38/page-1','shenzhen':'金钟转东铁'},
 {'district':'筲箕湾','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2211%22%2C%2211-34%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'金钟转东铁'},
 {'district':'柴湾','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2212%22%2C%2212-36%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'金钟转东铁'},
 {'district':'红磡','url':'https://www.28hse.com/rent/apartment/a2/dg31','shenzhen':'罗湖 / 落马洲方便'},
 {'district':'大围','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2244%22%2C%2244-124%22%2C%22nt%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'罗湖 / 落马洲方便'},
 {'district':'沙田','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2244%22%2C%2244-102%22%2C%22nt%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default','shenzhen':'罗湖 / 落马洲方便'},
 {'district':'火炭','url':'https://www.28hse.com/rent/apartment/a3/dg44/di44-126','shenzhen':'罗湖 / 落马洲方便'},
 {'district':'大埔','url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2245%22%2C%2245-103%22%2C%22nt%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default','shenzhen':'罗湖 / 落马洲方便'},
 {'district':'太和','url':'https://www.28hse.com/rent/apartment/a3/dg45/di45-130','shenzhen':'罗湖 / 落马洲很方便'},
 {'district':'粉岭','url':'https://www.28hse.com/rent/apartment/a3/dg46/c104','shenzhen':'罗湖 / 落马洲很方便'},
 {'district':'上水','url':'https://www.28hse.com/rent/apartment?buyRent=rent&cat_ids=105&locations=%5B%22112%22%2C%22nt%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=cat_ids&sortBy=default','shenzhen':'罗湖 / 落马洲最方便'}
]

DIRECT_LINES={
 '荃湾线':['荃湾','大窝口','葵兴','葵芳','荔景','美孚','荔枝角','长沙湾','深水埗','太子','旺角','油麻地','佐敦','尖沙咀','金钟','中环'],
 '港岛线':['坚尼地城','香港大学','西营盘','上环','中环','金钟','湾仔','铜锣湾','天后','炮台山','北角','鰂鱼涌','太古','西湾河','筲箕湾','杏花邨','柴湾'],
 '东铁线':['金钟','会展','红磡','旺角东','九龙塘','大围','沙田','火炭','马场','大学','大埔墟','太和','粉岭','上水']
}
T2S=str.maketrans({'灣':'湾','窩':'窝','興':'兴','麗':'丽','長':'长','鐘':'钟','環':'环','堅':'坚','營':'营','鑼':'锣','魚':'鱼','會':'会','紅':'红','龍':'龙','圍':'围','學':'学','嶺':'岭','鐵':'铁','車':'车'})
def simp(s):return (s or '').translate(T2S)

BAD=['找不到樓盤','找不到楼盘','樓盤可能已被下架','楼盘可能已被下架','此樓盤已下架','此楼盘已下架']
SPLIT=['分體冷氣','分体冷气','分體式冷氣','分体式冷气','split type','split-type','掛牆式冷氣','挂墙式冷气','掛牆冷氣','挂墙冷气']
WINDOW_AC=['窗口式冷氣','窗口式冷气','窗口冷氣','窗口冷气','窗式冷氣','窗式冷气','window type']
AC=['冷氣機','冷气机','冷氣','冷气','air conditioner']
WETDRY=['乾濕分離','干湿分离','乾濕分隔','干湿分隔','獨立淋浴間','独立淋浴间','玻璃淋浴','淋浴屏']
LIFT=['平地電梯','平地电梯','有電梯','有电梯','升降機','升降机','電梯大堂','电梯大堂']
NO_LIFT=['唐樓','唐楼','步梯','行樓梯','行楼梯','無電梯','无电梯']
EXCLUDE_GROUPS={
 'village':['村屋','丁屋','新界村屋','圍村','围村'],
 'student_housing':['學生宿舍','学生宿舍','學生公寓','学生公寓','學生專享','学生专享','共居生活','co-living','coliving','床位出租','床位租'],
 'staff_housing':['員工宿舍','员工宿舍','勞工宿舍','劳工宿舍','外勞宿舍','外劳宿舍'],
 'shared':['分間單位','分间单位','分租','劏房','㓥房','合租','單房出租','单房出租','房間出租','房间出租'],
 'serviced':['服務式住宅','服务式住宅','服務式公寓','服务式公寓','酒店式公寓','月租酒店'],
 'non_residential':['工商大廈','工商大厦','工業大廈','工业大厦','工廠大廈','工厂大厦','寫字樓','写字楼','辦公室','办公室','商廈','商厦','店舖','店铺','貨倉','货仓','工作室出租'],
 'short_term':['日租','短租','時租','时租']
}
RESIDENTIAL_MARKERS=['住宅','私人屋苑','洋樓','洋楼','單幢式大廈','单幢式大厦','居屋','公屋','屋苑']

def get(url,timeout=22):
    r=S.get(url,timeout=timeout,allow_redirects=True);r.raise_for_status();return r

def clean_text(s):return re.sub(r'\s+',' ',htmlmod.unescape(s or '')).strip()
def num(s):return int(re.sub(r'[^0-9]','',s)) if s and re.search(r'\d',s) else None

def listing_section(full_text):
    starts=[full_text.find(x) for x in ('樓盤編號#','楼盘编号#') if full_text.find(x)>=0]
    start=min(starts) if starts else 0
    ends=[full_text.find(x,start) for x in ('地產代理公司資料','地产代理公司资料','放盤聯絡人','放盘联络人') if full_text.find(x,start)>=0]
    end=min(ends) if ends else len(full_text)
    return full_text[start:end]

def exclusion_reason(text,title=''):
    hay=(title+' '+text).lower()
    for group,words in EXCLUDE_GROUPS.items():
        if any(w.lower() in hay for w in words):return group
    student=('學生' in text or '学生' in text)
    if student and (('年付' in text and any(k in text for k in ('共居','宿舍','床位'))) or any(k in text for k in ('水電押金全年','水电押金全年'))):return 'student_housing'
    return None

def parse_card_text(text):
    text=clean_text(text)
    am=re.search(r'實用面積\s*[:：]?\s*([\d,]+)\s*(?:呎|平方呎)|实用面积\s*[:：]?\s*([\d,]+)\s*(?:尺|平方尺)',text,re.I)
    rm=re.search(r'租\s*\$\s*([\d,]+)\s*元?',text,re.I)
    area=num(next((g for g in (am.groups() if am else []) if g),None)) if am else None
    rent=num(rm.group(1)) if rm else None
    return area,rent

def discover(source):
    r=get(source['url']);soup=BeautifulSoup(r.text,'html.parser');found={}
    for a in soup.find_all('a',href=True):
        href=urljoin(r.url,a['href'])
        m=re.search(r'https?://(?:www\.)?28hse\.com/(?:[^/]+/)?rent/(?:apartment|residential)/property-(\d+)',href)
        if not m:continue
        pid=m.group(1);area=rent=None;node=a
        for _ in range(6):
            if not node:break
            card=clean_text(node.get_text(' ',strip=True))
            if exclusion_reason(card):area=rent=None;break
            area,rent=parse_card_text(card)
            if area and rent:break
            node=node.parent
        if area and rent and (area<CRIT['collect_min_area'] or rent>CRIT['collect_max_rent']):continue
        found[pid]=href.split('?')[0]
    return list(found.items())[:CRIT.get('max_details_per_source',30)]

def rx(text,patterns):
    for pat in patterns:
        m=re.search(pat,text,re.I)
        if m:return m
    return None

def aliases(station):
    vals={station,simp(station)}
    extras={'鰂鱼涌':['鰂魚涌','鲗鱼涌'],'大窝口':['大窩口'],'香港大学':['香港大學'],'西营盘':['西營盤'],'铜锣湾':['銅鑼灣'],'红磡':['紅磡'],'旺角东':['旺角東'],'九龙塘':['九龍塘'],'大围':['大圍'],'大学':['大學'],'粉岭':['粉嶺']}
    vals.update(extras.get(station,[]));return sorted(vals,key=len,reverse=True)

def detect_mtr(text):
    hay=simp(clean_text(text));candidates=[]
    for line,stations in DIRECT_LINES.items():
        for station in stations:
            for alias in aliases(station):
                a=simp(alias)
                if a not in hay:continue
                pos=hay.find(a);after=hay[pos+len(a):pos+len(a)+1]
                if station=='荃湾' and after=='西':continue
                esc=re.escape(a);marker=r'(?:港铁|地铁|MTR|火车)?(?:站)?'
                patterns=[
                    rf'{esc}{marker}[^。；,，]{{0,28}}?(\d{{1,2}})\s*分钟\s*步行',
                    rf'(\d{{1,2}})\s*分钟\s*步行[^。；,，]{{0,28}}?{esc}{marker}',
                    rf'步行\s*(\d{{1,2}})\s*分钟[^。；,，]{{0,28}}?{esc}{marker}',
                    rf'{esc}{marker}[^。；,，]{{0,20}}?步行\s*(\d{{1,2}})\s*分钟',
                    rf'(\d{{1,2}})\s*分钟(?:到|至)[^。；,，]{{0,12}}?{esc}{marker}',
                    rf'{esc}{marker}[^。；,，]{{0,12}}?(\d{{1,2}})\s*分钟'
                ]
                m=rx(hay,patterns)
                if m:candidates.append((int(m.group(1)),station,line,'explicit'))
                near=[rf'{esc}{marker}[^。；,，]{{0,12}}?(?:上盖|楼下)',rf'(?:上盖|楼下)[^。；,，]{{0,12}}?{esc}{marker}']
                if rx(hay,near):candidates.append((1,station,line,'station_top'))
    if not candidates:return None
    candidates.sort(key=lambda x:(x[0],-len(x[1])))
    walk,station,line,evidence=candidates[0]
    return {'station':station,'line':line,'walk':walk,'evidence':evidence}

def parse_detail(pid,url,source,old):
    r=get(url);final=r.url
    if not re.search(r'property-'+re.escape(pid)+r'(?:\D|$)',final):return None
    soup=BeautifulSoup(r.text,'html.parser');full=clean_text(soup.get_text(' ',strip=True))
    if any(x in full for x in BAD):return None
    text=listing_section(full);title=(soup.title.get_text(' ',strip=True) if soup.title else '')
    if exclusion_reason(text,title):return None
    if not any(k in text for k in RESIDENTIAL_MARKERS):return None

    area_m=rx(text,[r'實用面積\s*\|?\s*([\d,]+)\s*平方呎',r'實用面積\s*[:：]?\s*([\d,]+)\s*呎',r'实用面积\s*\|?\s*([\d,]+)\s*平方尺',r'实用面积\s*[:：]?\s*([\d,]+)\s*尺'])
    rent_m=rx(text,[r'每月租金\s*\|?\s*租\s*\$\s*([\d,]+)',r'租\s*\$\s*([\d,]+)\s*元'])
    if not area_m or not rent_m:return None
    area=num(area_m.group(1));rent=num(rent_m.group(1))
    if area<CRIT['collect_min_area'] or rent>CRIT['collect_max_rent']:return None
    psf=round(rent/area,1) if area else None
    if psf is not None and psf<CRIT.get('min_rent_psf',20):return None

    route=detect_mtr(text)
    if not route or route['walk']>CRIT.get('collect_max_mtr_walk_min',10):return None

    split=any(k.lower() in text.lower() for k in SPLIT);window=any(k.lower() in text.lower() for k in WINDOW_AC)
    if window:return None
    ac=split or any(k.lower() in text.lower() for k in AC);wet=any(k in text for k in WETDRY)
    if any(k in text for k in NO_LIFT):return None
    if any(k in text for k in LIFT):lift=True
    else:
        floor_m=rx(text,[r'\((?:\d+)-(\d+)\/(\d+)樓\)',r'\((?:\d+)-(\d+)\/(\d+)楼\)',r'\/(\d+)\s*樓',r'\/(\d+)\s*楼'])
        vals=[num(g) for g in floor_m.groups() if g] if floor_m else []
        lift=True if vals and max(vals)>=10 else None

    estate=clean_text(re.split(r'[#|｜]',title)[0]).replace('租盤樓盤詳細資料','').replace('租盘楼盘详细资料','').strip(' -')
    if not estate:
        hm=soup.find(['h1','h2']);estate=clean_text(hm.get_text(' ',strip=True) if hm else f'房源 {pid}')
    room_m=rx(text,[r'房間及浴室\s*\|\s*(\d+)\+?\s*房(?:\s*(\d+)\s*浴室)?',r'房间及浴室\s*\|\s*(\d+)\+?\s*房(?:\s*(\d+)\s*浴室)?',r'(\d+)\s*房(?:\s*[,，]?\s*(\d+)\s*(?:浴室|廁|厕))?'])
    age_m=rx(text,[r'屋苑樓齡\s*[:：]\s*(\d+)\s*年',r'屋苑楼龄\s*[:：]\s*(\d+)\s*年'])
    unit_m=rx(text,[r'座數及單位\s*[:：]\s*([^|]{1,60}?)(?:屋苑樓齡|入伙日期)',r'座数及单位\s*[:：]\s*([^|]{1,60}?)(?:屋苑楼龄|入伙日期)'])
    upd=rx(text,[r'更新\s*[:：]\s*(\d{4}-\d{2}-\d{2})'])
    oldx=old.get(pid,{});first=oldx.get('first_seen') or NOW.isoformat(timespec='seconds')
    prev=oldx.get('rent');drop=max(0,prev-rent) if isinstance(prev,(int,float)) else 0
    try:is_new=(NOW-datetime.fromisoformat(first)).total_seconds()<36*3600
    except Exception:is_new=True

    rooms=int(room_m.group(1)) if room_m else None;area_gain=max(0,area-CFG['baseline']['area']);extra_rent=max(0,rent-CFG['baseline']['rent'])
    score=45+min(16,max(0,(area-280)//15))+min(12,max(-6,(CRIT['target_max_rent']-rent)//250))
    score+=12 if split else (0 if ac else -3);score+=6 if wet else 0;score+=7 if lift is True else -3;score+=max(-8,8-(route['walk']*2))
    if rooms==1:score+=5
    elif rooms==2:score+=3
    elif rooms==0:score+=2
    if route['line']=='东铁线':score+=4
    elif source['district']=='佐敦':score+=3
    if drop>0:score+=min(5,drop//500)
    if area_gain>=75 and extra_rent<=2000:score+=5
    score=max(0,min(99,int(score)))

    return {'id':pid,'source':'28Hse','title':estate,'estate':estate,'district':source['district'],'unit':clean_text(unit_m.group(1)) if unit_m else None,'rent':rent,'area':area,'rent_psf':psf,'rooms':rooms,'baths':int(room_m.group(2)) if room_m and room_m.group(2) else None,'age_years':int(age_m.group(1)) if age_m else None,'mtr_station':route['station'],'mtr_walk_min':route['walk'],'mtr_verified':True,'mtr_evidence':route['evidence'],'direct_to_admiralty':True,'admiralty_route':f"{route['line']}直达金钟",'shenzhen_note':source['shenzhen'],'property_class':'conventional_residential','type_verified':True,'lift':lift,'ac_present':ac,'split_ac':split,'window_ac':False,'wet_dry':wet if wet else None,'shared':False,'url':final.split('?')[0],'listing_updated':upd.group(1) if upd else None,'first_seen':first,'last_seen':NOW.isoformat(timespec='seconds'),'price_drop':drop,'is_new':is_new,'score':score}

def load_old():
    try:return json.loads(DATA.read_text(encoding='utf-8'))
    except Exception:return {'listings':[]}

def main():
    olddoc=load_old();old={str(x.get('id')):x for x in olddoc.get('listings',[])};results={};errors=[]
    for source in SOURCES:
        try:
            for pid,url in discover(source):
                if pid in results:continue
                try:
                    item=parse_detail(pid,url,source,old)
                    if item:results[pid]=item
                except Exception as e:errors.append(f"{source['district']} detail {pid}: {type(e).__name__}")
                time.sleep(.25)
        except Exception as e:errors.append(f"{source['district']}: {type(e).__name__}: {str(e)[:100]}")
        time.sleep(.4)
    listings=sorted(results.values(),key=lambda x:(-x['score'],x['rent']))
    doc={'meta':{'updated_at':NOW.isoformat(timespec='seconds'),'status':'ok' if not errors else ('partial' if listings else 'error'),'source_count':len(SOURCES),'errors':errors[:30],'algorithm_version':'2.1','excluded_types':['village','student_housing','staff_housing','shared','serviced','non_residential','short_term']},'baseline':CFG['baseline'],'listings':listings}
    DATA.parent.mkdir(parents=True,exist_ok=True);DATA.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f"Saved {len(listings)} route-verified residential candidates; errors={len(errors)}")
if __name__=='__main__':main()
