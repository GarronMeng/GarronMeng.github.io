#!/usr/bin/env python3
"""Conservative grouping of overlapping rental ads.

A 28Hse property ID identifies an advertisement, not a physical flat.
Same-estate/same-price/same-size/same-floor-range ads are shown as one
comparison card with ALL source URLs retained. This is not proof of
identical actual units; ranges such as '9-20/F' are not exact floors.
"""
import re
import unicodedata
from collections import defaultdict


def norm(value):
    return re.sub(r"\s+", "", unicodedata.normalize("NFKC", str(value or "")).lower())


def unit_parts(item):
    raw = unicodedata.normalize("NFKC", str(item.get("unit") or ""))
    building = re.search(r"(?:第?\d+[A-Z]?座|[A-Z]座|第?[一二三四五六七八九十]+期)", raw, re.I)
    band = re.search(r"(?:低層|中層|高層)\s*\(\d+\s*-\s*\d+\s*/\s*\d+\s*樓\)", raw)
    flat = re.search(r"([A-Z]\d{0,2}|\d{1,3})\s*室", raw, re.I)
    return norm(building.group(0)) if building else "", norm(band.group(0)) if band else "", norm(flat.group(1)) if flat else ""


def group_key(item):
    building, floor_band, _ = unit_parts(item)
    return (
        norm(item.get("district")), norm(item.get("estate") or item.get("title")),
        item.get("area"), item.get("rent"), item.get("rooms"),
        building, floor_band
    )


def collapse_records(items):
    buckets = defaultdict(list)
    for item in items:
        buckets[group_key(item)].append(item)

    groups = []
    for bucket in buckets.values():
        flats = {unit_parts(item)[2] for item in bucket if unit_parts(item)[2]}
        if len(flats) <= 1:
            groups.append(bucket)
            continue
        # Conflicting explicit flat letters/numbers must NEVER be merged.
        by_flat = defaultdict(list)
        for item in bucket:
            by_flat[unit_parts(item)[2] or "unspecified"].append(item)
        groups.extend(by_flat.values())

    collapsed = []
    grouped_ads = 0
    for group in groups:
        # Prefer the advertisement with a specified flat, then more useful
        # verified details and a newer listing update; preserve all alternatives.
        def rank(item):
            return (
                bool(unit_parts(item)[2]),
                item.get("lift") is True,
                item.get("split_ac") is True,
                item.get("wet_dry") is True,
                bool(item.get("listing_updated")),
                str(item.get("listing_updated") or ""),
                int(item.get("score") or 0),
            )
        representative = dict(max(group, key=rank))
        if len(group) > 1:
            grouped_ads += len(group) - 1
            other = [item for item in group if str(item.get("id")) != str(representative.get("id"))]
            representative["duplicate_count"] = len(group)
            representative["duplicate_basis"] = "同屋苑、座数、楼层范围、面积、租金及房数；实际楼层未证实"
            representative["duplicate_confidence"] = "similar_spec_unverified"
            representative["alternate_ads"] = [
                {"id": item.get("id"), "url": item.get("url"),
                 "unit": item.get("unit"), "listing_updated": item.get("listing_updated"),
                 "rent": item.get("rent"), "area": item.get("area")}
                for item in other
            ]
        collapsed.append(representative)

    collapsed.sort(key=lambda item: (-int(item.get("score") or 0), int(item.get("rent") or 0)))
    return collapsed, {
        "raw_ad_count": len(items),
        "display_group_count": len(collapsed),
        "grouped_ad_count": grouped_ads,
        "multi_ad_group_count": sum(item.get("duplicate_count", 1) > 1 for item in collapsed),
        "dedupe_method": "same_estate_building_floor_band_area_rent_rooms; distinct explicit room numbers separated",
        "dedupe_caveat": "Matching advertisements may represent different flats on different floors. All ad URLs retained."
    }


def collapse_document(doc):
    cleaned, stats = collapse_records(doc.get("listings", []))
    doc["listings"] = cleaned
    doc.setdefault("meta", {}).update(stats)
    return doc
