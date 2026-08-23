#!/usr/bin/env python3
import json
from pathlib import Path
import scrape

# 06:30 Admiralty commute expansion: South Island Line is direct and starts early.
scrape.T2S.update(str.maketrans({'東':'东','島':'岛','園':'园'}))
scrape.DIRECT_LINES['南港岛线']=['金钟','海洋公园','黄竹坑','利东','海怡半岛']

# Strengthen the whole-unit rule. Some listings are technically under a residential
# estate but are actually one bedroom / roommate ads.
scrape.EXCLUDE_GROUPS['shared'].extend([
    '大房招租','細房招租','细房招租','房間招租','房间招租',
    '單間出租','单间出租','招室友','尋室友','寻室友',
    '只招女生','只租女生','只招男生','只租男生','限女生','限男生'
])

# South Island Line watch zone.
scrape.SOURCES.append({
    'district':'鸭脷洲',
    'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2213%22%2C%2213-45%22%2C%22hk%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default',
    'shenzhen':'金钟转东铁；去西九龙较远'
})

# West Kowloon preference zone from Cheung Sha Wan to Nam Cheong / Tai Kok Tsui.
# The base parser still requires a verified direct-line MTR station, so a listing
# located near Nam Cheong/Olympic alone will not be falsely treated as direct to Admiralty.
scrape.SOURCES.extend([
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

if __name__=='__main__':
    scrape.main()
    data_path=Path(__file__).resolve().parents[1]/'data'/'listings.json'
    doc=json.loads(data_path.read_text(encoding='utf-8'))
    doc.setdefault('meta',{})['algorithm_version']='2.4'
    doc['meta']['commute_target']='06:30 Admiralty; prefer practical leave-home time and missed-train tolerance'
    doc['meta']['budget_policy']='<=15k preferred; <=16k acceptable; 16-17k only exceptional value'
    doc['meta']['preferred_zone']='Cheung Sha Wan / Sham Shui Po / Nam Cheong / Lai Chi Kok / Tai Kok Tsui'
    data_path.write_text(json.dumps(doc,ensure_ascii=False,indent=2),encoding='utf-8')
