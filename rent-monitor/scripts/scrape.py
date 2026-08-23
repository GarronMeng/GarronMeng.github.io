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
UA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/140 Safari/537.36 HKRentalRadar/1.0'
S=requests.Session();S.headers.update({'User-Agent':UA,'Accept-Language':'zh-HK,zh;q=0.9,en;q=0.7'})

SOURCES=[
 {'district':'深水埗','url':'https://www.28hse.com/rent/apartment/a2/dg26/di26-62','station':'深水埗','line':'荃湾线','shenzhen':'西九龙高铁较方便'},
 {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106','station':'长沙湾','line':'荃湾线','shenzhen':'西九龙高铁较方便'},
 {'district':'佐敦','url':'https://www.28hse.com/rent/apartment/a2/dg120/c73','station':'佐敦','line':'荃湾线','shenzhen':'西九龙高铁很方便'},
 {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8','station':'鰂鱼涌','line':'港岛线','shenzhen':'金钟转东铁'},
 {'district':'西湾河','url':'https://www.28hse.com/rent/apartment/a1/dg10/c38/page-1','station':'西湾河','line':'港岛线','shenzhen':'金钟转东铁'},
 {'district':'粉岭','url':'https://www.28hse.com/rent/apartment/a3/dg46/c104','station':'粉岭','line':'东铁线','shenzhen':'罗湖 / 落马洲很方便'},
 {'district':'上水','url':'https://www.28hse.com/rent/apartment?buyRent=rent&cat_ids=105&locations=%5B%22112%22%2C%22nt%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=cat_ids&sortBy=default','station':'上水','line':'东铁线','shenzhen':'罗湖 / 落马洲最方便'},
 {'district':'美孚','url':'https://www.28hse.com/rent/apartment/a2/dg107','station':'美孚','line':'荃湾线','shenzhen':'屯马线接西九龙高铁方便'}
]

BAD=['找不到樓盤','找不到楼盘','樓盤可能已被下架','楼盘可能已被下架','此樓盤已下架','此楼盘已下架']
SHARED=['分間單位','分间单位','分租','劏房','合租','單房出租','单房出租']
SPLIT=['分體冷氣','分体冷气','分體式冷氣','分体式冷气','split type','掛牆式冷氣','挂墙式冷气']
AC=['冷氣機','冷气机','冷氣','冷气','air conditioner']
WETDRY=['乾濕分離','干湿分离','乾濕分隔','干湿分隔','獨立淋浴間','独立淋浴间','玻璃淋浴']
LIFT=['平地電梯','平地电梯','有電梯','有电梯','升降機','升降机']

def get(url,timeout=22):
    r=S.get(url,timeout=timeout,allow_redirects=True)
    r.raise_for_status();return r

def clean_text(s):return re.sub(r'\s+',' ',htmlmod.unescape(s or '')).strip()
def num(s):return int(re.sub(r'[^0-9]','',s)) if s and re.search(r'\d',s) else None

def parse_card_text(text):
    text=clean_text(text)
    am=re.search(r'實用面積\s*[:：]?\s*([\d,]+)\s*(?:呎|平方呎)|实用面积\s*[:：]?\s*([\d,]+)\s*(?:尺|平方尺)',text,re.I)
    rm=re.search(r'租\s*\$\s*([\d,]+)\s*元?',text,re.I)
    area=num(next((g for g in (am.groups() if am else []) if g),None)) if am else None
    rent=num(rm.group(1)) if rm else None
    return area,rent

def discover(source):
    r=get(source['url']);soup=BeautifulSoup(r.text,'html.parser')
    found={}
    for a in soup.find_all('a',href=True):
        href=urljoin(r.url,a['href'])
        m=re.search(r'https?://(?:www\.)?28hse\.com/(?:[^/]+/)?rent/(?:apartment|residential)/property-(\d+)',href)
        if not m: continue
        pid=m.group(1); area=rent=None
        node=a
        for _ in range(6):
            if not node: break
            area,rent=parse_card_text(node.get_text(' ',strip=True))
            if area and rent: break
            node=node.parent
        if area and rent and (area<CRIT['collect_min_area'] or rent>CRIT['collect_max_rent']): continue
        found[pid]=href.split('?')[0]
    return list(found.items())[:45]

def rx(text,patterns):
    for pat in patterns:
        m=re.search(pat,text,re.I)
        if m:return m
    return None

def parse_detail(pid,url,source,old):
    r=get(url); final=r.url
    if not re.search(r'property-'+re.escape(pid)+r'(?:\D|$)',final): return None
    soup=BeautifulSoup(r.text,'html.parser');text=clean_text(soup.get_text(' ',strip=True))
    if any(x in text for x in BAD): return None
    area_m=rx(text,[r'實用面積\s*\|?\s*([\d,]+)\s*平方呎',r'實用面積\s*[:：]?\s*([\d,]+)\s*呎',r'实用面积\s*\|?\s*([\d,]+)\s*平方尺',r'实用面积\s*[:：]?\s*([\d,]+)\s*尺'])
    rent_m=rx(text,[r'每月租金\s*\|?\s*租\s*\$\s*([\d,]+)',r'租\s*\$\s*([\d,]+)\s*元'])
    if not area_m or not rent_m:return None
    area=num(area_m.group(1));rent=num(rent_m.group(1))
    if area<CRIT['collect_min_area'] or rent>CRIT['collect_max_rent']:return None
    shared=any(x in text for x in SHARED)
    if shared:return None
    title=(soup.title.get_text(' ',strip=True) if soup.title else '')
    estate=clean_text(re.split(r'[#|｜]',title)[0]).replace('租盤樓盤詳細資料','').replace('租盘楼盘详细资料','').strip(' -')
    if not estate:
        hm=soup.find(['h1','h2']);estate=clean_text(hm.get_text(' ',strip=True) if hm else f'房源 {pid}')
    room_m=rx(text,[r'(\d+)\s*房(?:\s*[,，]?\s*(\d+)\s*(?:浴室|廁|厕))?'])
    age_m=rx(text,[r'屋苑樓齡\s*[:：]\s*(\d+)\s*年',r'屋苑楼龄\s*[:：]\s*(\d+)\s*年'])
    unit_m=rx(text,[r'座數及單位\s*[:：]\s*([^|]{1,60}?)(?:屋苑樓齡|入伙日期)',r'座数及单位\s*[:：]\s*([^|]{1,60}?)(?:屋苑楼龄|入伙日期)'])
    upd=rx(text,[r'更新\s*[:：]\s*(\d{4}-\d{2}-\d{2})'])
    split=any(k.lower() in text.lower() for k in SPLIT);ac=split or any(k.lower() in text.lower() for k in AC)
    wet=any(k in text for k in WETDRY)
    if any(k in text for k in LIFT):lift=True
    elif '唐樓' in text or '唐楼' in text:lift=False
    else:lift=None
    mtr_m=rx(text,[r'(\d{1,2})\s*分鐘(?:到|至)?(?:港鐵|地鐵|MTR)',r'(?:港鐵|地鐵|MTR)[^。；,，]{0,12}?(\d{1,2})\s*分鐘'])
    walk=int(mtr_m.group(1)) if mtr_m else None
    oldx=old.get(pid,{})
    first=oldx.get('first_seen') or NOW.isoformat(timespec='seconds')
    prev=oldx.get('rent');drop=max(0,(prev-rent)) if isinstance(prev,(int,float)) else 0
    is_new=(NOW-datetime.fromisoformat(first)).total_seconds()<36*3600 if first else True
    score=50
    score+=max(0,min(18,(area-224)//10));score+=max(-10,min(10,(14000-rent)//250))
    score+=8 if split else (2 if ac else 0);score+=4 if wet else 0;score+=3 if lift is True else (-8 if lift is False else 0)
    score+=7; score+=5 if source['district'] in ('上水','粉岭','佐敦') else 2
    score=max(0,min(99,int(score)))
    return {
      'id':pid,'source':'28Hse','title':estate,'estate':estate,'district':source['district'],'unit':clean_text(unit_m.group(1)) if unit_m else None,
      'rent':rent,'area':area,'rooms':int(room_m.group(1)) if room_m else None,'baths':int(room_m.group(2)) if room_m and room_m.group(2) else None,
      'age_years':int(age_m.group(1)) if age_m else None,'mtr_station':source['station'],'mtr_walk_min':walk,
      'direct_to_admiralty':True,'admiralty_route':f"{source['line']}直达金钟",'shenzhen_note':source['shenzhen'],
      'lift':lift,'ac_present':ac,'split_ac':split,'wet_dry':wet if wet else None,'shared':False,
      'url':final.split('?')[0],'listing_updated':upd.group(1) if upd else None,'first_seen':first,'last_seen':NOW.isoformat(timespec='seconds'),
      'price_drop':drop,'is_new':is_new,'score':score
    }

def load_old():
    try:return json.loads(DATA.read_text(encoding='utf-8'))
    except Exception:return {'listings':[]}

def main():
    olddoc=load_old();old={str(x.get('id')):x for x in olddoc.get('listings',[])}
    results={};errors=[]
    for source in SOURCES:
        try:
            ids=discover(source)
            for pid,url in ids:
                if pid in results:continue
                try:
                    item=parse_detail(pid,url,source,old)
                    if item:results[pid]=item
                except Exception as e: errors.append(f"{source['district']} detail {pid}: {type(e).__name__}")
                time.sleep(.35)
        except Exception as e:errors.append(f"{source['district']}: {type(e).__name__}: {str(e)[:100]}")
        time.sleep(.6)
    listings=sorted(results.values(),key=lambda x:(-x['score'],x['rent']))
    doc={'meta':{'updated_at':NOW.isoformat(timespec='seconds'),'status':'ok' if not errors else ('partial' if listings else 'error'),'source_count':len(SOURCES),'errors':errors[:30]},'baseline':CFG['baseline'],'listings':listings}
    DATA.parent.mkdir(parents=True,exist_ok=True);DATA.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f"Saved {len(listings)} live candidates; errors={len(errors)}")
if __name__=='__main__':main()
