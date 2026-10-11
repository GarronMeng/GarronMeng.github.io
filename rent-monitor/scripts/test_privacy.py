#!/usr/bin/env python3
"""Public-market data checks; never embed real personal details as test fixtures."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ["config.json", "data/listings.json", "index.html", "app.js",
          "README.md", "scripts/scrape.py", "scripts/scrape_v22.py"]
DISALLOWED_FIELDS = [
    "baseline", "work_arrival", "commute_target", "admiralty_route",
    "direct_to_admiralty", "shenzhen_note", "current_home",
    "home_address", "personal_address",
]


class PublicPrivacyTests(unittest.TestCase):
    def test_no_personal_profile_fields_in_public_assets(self):
        for name in ASSETS:
            content = (ROOT / name).read_text(encoding="utf-8")
            for marker in DISALLOWED_FIELDS:
                with self.subTest(path=name, field=marker):
                    self.assertNotIn(marker, content)

    def test_public_listings_use_market_rail_metadata(self):
        cfg = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
        doc = json.loads((ROOT / "data/listings.json").read_text(encoding="utf-8"))
        self.assertNotIn("baseline", cfg)
        self.assertNotIn("baseline", doc)
        self.assertNotIn("work_arrival_station", cfg["criteria"])
        self.assertNotIn("work_arrival_deadline", cfg["criteria"])
        for listing in doc["listings"]:
            self.assertIn(listing.get("rail_line"),
                          {"港岛线", "荃湾线", "东铁线", "南港岛线"})
            self.assertTrue(listing.get("direct_rail"))
            self.assertNotIn("shenzhen_note", listing)

    def test_page_requests_no_search_index_or_referrer(self):
        page = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('name="robots" content="noindex,nofollow,noarchive"', page)
        self.assertIn('name="referrer" content="no-referrer"', page)


if __name__ == "__main__":
    unittest.main()
