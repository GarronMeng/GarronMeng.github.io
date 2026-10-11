#!/usr/bin/env python3
import json
from pathlib import Path
import scrape
import dedupe

# Add South Island Line stations for first-service accessibility scoring.
scrape.T2S.update(str.maketrans({'東':'东','島':'岛','園':'园','堅':'坚','營':'营'}))
scrape.DIRECT_LINES['南港岛线']=['海洋公园','黄竹坑','利东','海怡半岛']

# Strengthen the whole-unit rule. These remain hard exclusions even after relaxing
# price/area/age requirements: roommate rooms, dorms, village houses and non-residential.
scrape.EXCLUDE_GROUPS['shared'].extend([
    '大房招租','細房招租','细房招租','房間招租','房间招租',
    '單間出租','单间出租','招室友','尋室友','寻室友',
    '只招女生','只租女生','只招男生','只租男生','限女生','限男生'
])

# Per-source rent ceilings let the normal market scan stay focused while named
# premium estates can be watched for abnormal discounts.
_base_discover=scrape.discover
_base_parse_detail=scrape.parse_detail

def _source_caps(source):
    return {
        'collect_max_rent': int(source.get('collect_max_rent', scrape.CFG['criteria']['collect_max_rent'])),
        'collect_min_area': int(source.get('collect_min_area', scrape.CFG['criteria']['collect_min_area'])),
        'max_details_per_source': int(source.get('max_details_per_source', scrape.CFG['criteria']['max_details_per_source'])),
    }

def _with_source_caps(source, action):
    caps=_source_caps(source)
    old={key:scrape.CRIT.get(key) for key in caps}
    try:
        scrape.CRIT.update(caps)
        return action()
    finally:
        for key,value in old.items():
            if value is None:
                scrape.CRIT.pop(key, None)
            else:
                scrape.CRIT[key]=value

def discover_with_source_cap(source):
    return _with_source_caps(source, lambda:_base_discover(source))

def parse_detail_with_source_cap(pid,url,source,old_doc):
    return _with_source_caps(source,lambda:_base_parse_detail(pid,url,source,old_doc))

scrape.discover=discover_with_source_cap
scrape.parse_detail=parse_detail_with_source_cap

# Additional single-line-journey corridors. These are intentionally kept even when
# they trade space or rent for a materially better early-morning commute.
scrape.SOURCES.extend([
    {
      'district':'鸭脷洲',
      'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2213%22%2C%2213-45%22%2C%22hk%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default'
    },
    {
      'district':'坚尼地城',
      'url':'https://www.28hse.com/rent/apartment/a1/dg121'
    },
    {
      'district':'西营盘',
      'url':'https://www.28hse.com/rent/apartment/a1/dg1'
    },
    {
      'district':'湾仔',
      'url':'https://www.28hse.com/rent/a1/dg4/di4-22'
    },
    {
      'district':'天后/大坑',
      'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%226%22%2C%226-28%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=%5B%22default%22%5D&sortBy_by_text=0'
    },
    {
      'district':'南昌',
      'url':'https://www.28hse.com/rent/apartment/a2/dg26/di26-26333'
    },
    {
      'district':'大角咀',
      'url':'https://www.28hse.com/rent/apartment/a2/dg28/di28-67'
    }
])

# Named-estate watchlist. Broad district scans can miss a target estate when the
# page is crowded, so the most relevant estates get dedicated discovery sources.
scrape.SOURCES.extend([
    {'district':'大围','url':'https://www.28hse.com/rent/apartment/a3/dg44/c23520','collect_max_rent':22000,'watch_estate':'柏傲莊'},
    {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106/c8531','collect_max_rent':20000,'watch_estate':'曉悅'},
    {'district':'长沙湾','url':'https://www.28hse.com/cn/rent/a2/dg106/c23218','collect_max_rent':22000,'watch_estate':'睿峰'},
    {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106/c2455','collect_max_rent':18000,'watch_estate':'美居中心'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c5405','collect_max_rent':20000,'watch_estate':'惠利大廈'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c6196','collect_max_rent':20000,'watch_estate':'金海大廈'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c5682','collect_max_rent':20000,'watch_estate':'中興大廈'},
    {'district':'北角','url':'https://www.28hse.com/rent/apartment/a1/dg7/c1147','collect_max_rent':20000,'watch_estate':'東發大廈'}
])

# Lower-cost compact estate and neighborhood feeds. The main feed still
# prefers larger units; these dedicated scans also cover 170-249 sq ft.
compact_base=[
    ('长沙湾','https://www.28hse.com/rent/apartment/a2/dg106/c22419','悅雅'),
    ('长沙湾','https://www.28hse.com/rent/apartment/a2/dg106',None),
    ('北角','https://www.28hse.com/rent/apartment/a1/dg7',None),
    ('鰂鱼涌','https://www.28hse.com/rent/apartment/a1/dg8',None),
    ('西湾河','https://www.28hse.com/rent/apartment/a1/dg10/c38/page-1',None),
    ('红磡','https://www.28hse.com/rent/apartment/a2/dg31',None),
    ('鸭脷洲','https://www.28hse.com/rent/apartment/a1/dg13',None),
]
for district,url,estate_name in compact_base:
    source={'district':district,'url':url,'collect_min_area':170,'collect_max_rent':15000,'max_details_per_source':20}
    if estate_name:source['watch_estate']=estate_name
    scrape.SOURCES.append(source)

if __name__=='__main__':
    scrape.main()
    data_path=Path(__file__).resolve().parents[1]/'data'/'listings.json'
    doc=json.loads(data_path.read_text(encoding='utf-8'))
    examples_path=data_path.parent/'market_examples.json'
    if examples_path.exists():
        market=json.loads(examples_path.read_text(encoding='utf-8'))
        known_ids={str(x.get('id')) for x in doc.get('listings',[])}
        for item in market.get('listings',[]):
            if str(item.get('id')) not in known_ids:
                doc.setdefault('listings',[]).append(item)
                known_ids.add(str(item.get('id')))
    doc=dedupe.collapse_document(doc)
    doc.setdefault('meta',{})['algorithm_version']='3.3'
    doc['meta']['budget_policy']='market filters: preferred <=15k; tradeoff <=18k; opportunistic <=22k'
    doc['meta']['selection_policy']='hard-exclude invalid/shared/dorm/village/non-residential; soft-score area, rent, age, AC, walk and layout'
    doc['meta']['watchlist_estates']=scrape.CFG['criteria'].get('watchlist_estates',[])
    doc['meta']['premium_watchlist_estates']=scrape.CFG['criteria'].get('premium_watchlist_estates',[])
    data_path.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
