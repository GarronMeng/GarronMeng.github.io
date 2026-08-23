#!/usr/bin/env python3
import json
from pathlib import Path
import scrape

# 06:30 Admiralty commute expansion: South Island Line is direct and starts early.
scrape.T2S.update(str.maketrans({'東':'东','島':'岛','園':'园','堅':'坚','營':'营'}))
scrape.DIRECT_LINES['南港岛线']=['金钟','海洋公园','黄竹坑','利东','海怡半岛']

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

def _source_cap(source):
    return int(source.get('collect_max_rent', scrape.CFG['criteria']['collect_max_rent']))

def discover_with_source_cap(source):
    old=scrape.CRIT['collect_max_rent']
    scrape.CRIT['collect_max_rent']=_source_cap(source)
    try:
        return _base_discover(source)
    finally:
        scrape.CRIT['collect_max_rent']=old

def parse_detail_with_source_cap(pid,url,source,old_doc):
    old=scrape.CRIT['collect_max_rent']
    scrape.CRIT['collect_max_rent']=_source_cap(source)
    try:
        return _base_parse_detail(pid,url,source,old_doc)
    finally:
        scrape.CRIT['collect_max_rent']=old

scrape.discover=discover_with_source_cap
scrape.parse_detail=parse_detail_with_source_cap

# Additional direct-to-Admiralty corridors. These are intentionally kept even when
# they trade space or rent for a materially better early-morning commute.
scrape.SOURCES.extend([
    {
      'district':'鸭脷洲',
      'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2213%22%2C%2213-45%22%2C%22hk%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default',
      'shenzhen':'金钟转东铁；去西九龙较远'
    },
    {
      'district':'坚尼地城',
      'url':'https://www.28hse.com/rent/apartment/a1/dg121',
      'shenzhen':'港岛线到金钟后转东铁；西九龙一般'
    },
    {
      'district':'西营盘',
      'url':'https://www.28hse.com/rent/apartment/a1/dg1',
      'shenzhen':'港岛线到金钟后转东铁；西九龙一般'
    },
    {
      'district':'湾仔',
      'url':'https://www.28hse.com/rent/a1/dg4/di4-22',
      'shenzhen':'金钟转东铁；通勤极优'
    },
    {
      'district':'天后/大坑',
      'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%226%22%2C%226-28%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=%5B%22default%22%5D&sortBy_by_text=0',
      'shenzhen':'金钟转东铁；通勤很好'
    },
    {
      'district':'南昌',
      'url':'https://www.28hse.com/rent/apartment/a2/dg26/di26-26333',
      'shenzhen':'西九龙高铁很方便'
    },
    {
      'district':'大角咀',
      'url':'https://www.28hse.com/rent/apartment/a2/dg28/di28-67',
      'shenzhen':'西九龙高铁很方便'
    }
])

# Named-estate watchlist. Broad district scans can miss a target estate when the
# page is crowded, so the most relevant estates get dedicated discovery sources.
scrape.SOURCES.extend([
    {'district':'大围','url':'https://www.28hse.com/rent/apartment/a3/dg44/c23520','shenzhen':'罗湖 / 落马洲方便','collect_max_rent':22000,'watch_estate':'柏傲莊'},
    {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106/c8531','shenzhen':'西九龙高铁较方便','collect_max_rent':20000,'watch_estate':'曉悅'},
    {'district':'长沙湾','url':'https://www.28hse.com/cn/rent/a2/dg106/c23218','shenzhen':'西九龙高铁较方便','collect_max_rent':22000,'watch_estate':'睿峰'},
    {'district':'长沙湾','url':'https://www.28hse.com/rent/apartment/a2/dg106/c2455','shenzhen':'西九龙高铁较方便','collect_max_rent':18000,'watch_estate':'美居中心'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c5405','shenzhen':'金钟转东铁','collect_max_rent':20000,'watch_estate':'惠利大廈'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c6196','shenzhen':'金钟转东铁','collect_max_rent':20000,'watch_estate':'金海大廈'},
    {'district':'鰂鱼涌','url':'https://www.28hse.com/rent/apartment/a1/dg8/c5682','shenzhen':'金钟转东铁','collect_max_rent':20000,'watch_estate':'中興大廈'},
    {'district':'北角','url':'https://www.28hse.com/rent/apartment/a1/dg7/c1147','shenzhen':'金钟转东铁','collect_max_rent':20000,'watch_estate':'東發大廈'}
])

if __name__=='__main__':
    scrape.main()
    data_path=Path(__file__).resolve().parents[1]/'data'/'listings.json'
    doc=json.loads(data_path.read_text(encoding='utf-8'))
    doc.setdefault('meta',{})['algorithm_version']='3.0'
    doc['meta']['commute_target']='06:30 Admiralty; rank practical leave-home time and missed-train tolerance'
    doc['meta']['budget_policy']='core <=15k; tradeoff <=18k; opportunity <=20-22k when commute/space/quality compensates'
    doc['meta']['selection_policy']='hard-exclude invalid/shared/dorm/village/non-residential; soft-score area, rent, age, AC, walk and layout'
    doc['meta']['preferred_zone']='North Point / Quarry Bay / Sai Wan Ho / Cheung Sha Wan / Ap Lei Chau / Tai Wai / Sha Tin / Hung Hom / Kennedy Town / Wan Chai / Fanling'
    doc['meta']['watchlist_estates']=scrape.CFG['criteria'].get('watchlist_estates',[])
    doc['meta']['premium_watchlist_estates']=scrape.CFG['criteria'].get('premium_watchlist_estates',[])
    data_path.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
