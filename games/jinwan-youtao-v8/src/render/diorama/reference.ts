/** Real hotel photographs, never used as scene textures. */
export const ROOM_REFERENCE={
 id:'hyatt-place-shenzhen-dongmen-king',hotel:'Hyatt Place Shenzhen Dongmen',room:'King (No Sofa Bed)',
 official:'https://www.hyatt.com/hyatt-place/en-US/szxzs-hyatt-place-shenzhen-dongmen/rooms',
 officialAsset:'https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2014/09/21/1540/SZXZS-P026-King-Room.jpg/SZXZS-P026-King-Room.16x9.jpg?imwidth=1280',
 viewedPhotos:[
 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/36/59/37/hyatt-place-shenzhen.jpg?h=-1&s=1&w=1200',
 'https://hyatt-place-shenzhen-dongmen.hotelsshenzhen.net/data/Photos/OriginalPhoto/12832/1283293/1283293396.JPEG',
 ],
 adaptation:'Mirrored and compressed to the existing 4.7 × 3.1 game footprint; not a measured architectural replica.',
} as const;


/** Suite-only visual reference. The in-game footprint is normalized for the existing floor plan. */
export const REGENCY_SUITE_REFERENCE={
 id:'hyatt-regency-shenzhen-airport-regency-suite-84sqm',
 hotel:'Hyatt Regency Shenzhen Airport',
 room:'Regency Suite · 84 m²',
 official:'https://www.hyatt.com/hyatt-regency/en-US/szxra-hyatt-regency-shenzhen-airport/rooms/RGSK',
 gallery:'https://www.hyatt.com/hyatt-regency/zh-CN/szxra-hyatt-regency-shenzhen-airport/gallery',
 executiveSuite:'https://www.hyatt.com/hyatt-regency/en-US/szxra-hyatt-regency-shenzhen-airport/rooms/RGXK',
 adaptation:'An interpretive suite diorama inspired by the official 84 m² room page and supplied photos. It stays within the existing gameplay footprint and is not a measured 1:1 architectural plan.',
} as const;
