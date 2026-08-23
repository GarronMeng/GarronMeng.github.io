#!/usr/bin/env python3
from __future__ import annotations
import json,time
from pathlib import Path
import scrape

ROOT=Path(__file__).resolve().parents[1]
DATA=ROOT/'data'/'listings.json'

# Extend the shared route verifier with South Island Line stations.
scrape.T2S.update({ord('東'):'东',ord('島'):'岛',ord('黃'):'黄',ord('園'):'园'})
scrape.DIRECT_LINES['南港岛线']=['海怡半岛','利东','黄竹坑','海洋公园','金钟']

SOURCES=[
 {
  'district':'鸭脷洲 / 黄竹坑',
  'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2213%22%2C%22hk%22%5D&locations_by_text=0&mainType=%5B%225%22%5D&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default',
  'shenzhen':'到金钟后转东铁；西九龙高铁一般'
 }
]

def main():
    try:
        doc=json.loads(DATA.read_text(encoding='utf-8'))
    except Exception:
        doc={'meta':{},'baseline':scrape.CFG['baseline'],'listings':[]}
    old={str(x.get('id')):x for x in doc.get('listings',[])}
    merged={str(x.get('id')):x for x in doc.get('listings',[])}
    errors=[]
    for source in SOURCES:
        try:
            for pid,url in scrape.discover(source):
                try:
                    item=scrape.parse_detail(pid,url,source,old)
                    if item and item.get('admiralty_route')=='南港岛线直达金钟':
                        item['score']=min(99,int(item.get('score',0))+4)
                        merged[str(pid)]=item
                except Exception as e:
                    errors.append(f"south detail {pid}: {type(e).__name__}")
                time.sleep(.25)
        except Exception as e:
            errors.append(f"south source: {type(e).__name__}: {str(e)[:100]}")
    listings=sorted(merged.values(),key=lambda x:(-x.get('score',0),x.get('rent',999999)))
    doc['listings']=listings
    meta=doc.setdefault('meta',{})
    meta['source_count']=int(meta.get('source_count',0))+len(SOURCES)
    meta['algorithm_version']='2.2'
    if errors:
        meta.setdefault('errors',[]).extend(errors[:10])
        if listings: meta['status']='partial'
    DATA.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
    print(f"Merged South Island Line candidates; total={len(listings)} errors={len(errors)}")

if __name__=='__main__':main()
