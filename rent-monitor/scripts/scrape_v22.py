#!/usr/bin/env python3
import scrape

# 06:30 Admiralty commute expansion: South Island Line is direct and starts early.
scrape.T2S.update(str.maketrans({'東':'东','島':'岛','園':'园'}))
scrape.DIRECT_LINES['南港岛线']=['金钟','海洋公园','黄竹坑','利东','海怡半岛']

# Ap Lei Chau has older conventional residential stock near Lei Tung MTR that can
# meet the HK$14k / 300 sqft target; village / serviced / shared listings continue
# to be rejected by the base parser before scoring.
scrape.SOURCES.append({
    'district':'鸭脷洲',
    'url':'https://www.28hse.com/rent/apartment?buyRent=rent&locations=%5B%2213%22%2C%2213-45%22%2C%22hk%22%5D&locations_by_text=0&mainType=5&mainType_by_text=0&mobilePageChannel=apartment&page=1&propertyDoSearchVersion=2.0&search_words_thing=default&sortBy=default',
    'shenzhen':'金钟转东铁；去西九龙较远'
})

if __name__=='__main__':
    scrape.main()
