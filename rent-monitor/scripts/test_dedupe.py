#!/usr/bin/env python3
"""Regression checks for rental-ad deduplication. Run: python -m unittest discover -s rent-monitor/scripts -p 'test_*.py'."""
import unittest
from dedupe import collapse_records


def ad(pid, unit="曉悅 中層 (9-20/30樓) F室", rent=16000, area=316, rooms=1):
    return {
        "id": str(pid), "source": "28Hse", "district": "长沙湾", "estate": "曉悅",
        "unit": unit, "rent": rent, "area": area, "rooms": rooms,
        "lift": True, "score": 75, "listing_updated": "2026-10-11",
        "url": "https://www.28hse.com/rent/apartment/property-" + str(pid),
    }


class DedupeTests(unittest.TestCase):
    def test_identical_ad_specs_collapse_and_preserve_all_links(self):
        records, stats = collapse_records([ad(10), ad(11), ad(12)])
        self.assertEqual(len(records), 1)
        self.assertEqual(stats["raw_ad_count"], 3)
        self.assertEqual(stats["grouped_ad_count"], 2)
        self.assertEqual(records[0]["duplicate_count"], 3)
        self.assertEqual(len(records[0]["alternate_ads"]), 2)
        self.assertEqual({str(records[0]["id"])} | {str(x["id"]) for x in records[0]["alternate_ads"]}, {"10", "11", "12"})

    def test_different_explicit_room_kept_separate(self):
        records, stats = collapse_records([ad(10), ad(11, unit="曉悅 中層 (9-20/30樓) A室")])
        self.assertEqual(len(records), 2)
        self.assertEqual(stats["grouped_ad_count"], 0)

    def test_different_block_or_floor_kept_separate(self):
        records, _ = collapse_records([
            ad(10, unit="1座 中層 (9-20/30樓) F室"),
            ad(11, unit="2座 中層 (9-20/30樓) F室"),
            ad(12, unit="1座 高層 (21-30/30樓) F室")
        ])
        self.assertEqual(len(records), 3)

    def test_different_price_kept_separate(self):
        records, _ = collapse_records([ad(10, rent=16000), ad(11, rent=16200)])
        self.assertEqual(len(records), 2)

    def test_missing_flat_number_groups_as_ambiguous(self):
        records, _ = collapse_records([
            ad(10, unit="曉悅 中層 (9-20/30樓) F室"),
            ad(11, unit="曉悅 中層 (9-20/30樓)")
        ])
        self.assertEqual(len(records), 1)
        self.assertEqual(records[0]["duplicate_confidence"], "similar_spec_unverified")

    def test_same_area_rent_not_enough_to_merge_across_estates(self):
        b = ad(11)
        b["estate"] = "美居中心"
        records, _ = collapse_records([ad(10), b])
        self.assertEqual(len(records), 2)


if __name__ == "__main__":
    unittest.main()
