#!/usr/bin/env python3
"""Prevent personal residence and precise routine details from reappearing in public radar assets."""
import json
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

ASSETS = [
    "config.json",
    "data/listings.json",
    "index.html",
    "app.js",
    "README.md",
    "scripts/scrape.py",
    "scripts/scrape_v22.py",
]

# Construct private identifiers at runtime to avoid committing them again.
PRIVATE_MARKERS = [
    "".join(map(chr, [0x57FA, 0x5B89])),  # prior residence name prefix
    "".join(map(chr, [0x7D2B, 0x5B89])),  # alternate user spelling
    "".join(map(chr, [0x4F55, 0x6587, 0x7530])),  # previously published origin
    "".join(map(chr, [0x91D1, 0x949F])),  # privately specified destination
    "06" + ":" + "30",  # privately specified arrival deadline
    "direct_to_" + "admiralty",
    "admiralty_" + "route",
    "shenzhen_" + "note",
]


class PublicPrivacyTests(unittest.TestCase):
    def test_no_sensitive_markers_in_current_public_files(self):
        for name in ASSETS:
            content = (ROOT / name).read_text(encoding="utf-8")
            for phrase in PRIVATE_MARKERS:
                with self.subTest(path=name, marker_length=len(phrase)):
                    self.assertNotIn(phrase, content)

    def test_no_private_baseline_or_arrival_details_in_json(self):
        config = json.loads((ROOT / "config.json").read_text(encoding="utf-8"))
        data = json.loads((ROOT / "data/listings.json").read_text(encoding="utf-8"))
        self.assertNotIn("baseline", config)
        self.assertNotIn("baseline", data)
        self.assertNotIn("work_arrival_station", config["criteria"])
        self.assertNotIn("work_arrival_deadline", config["criteria"])
        self.assertNotIn("commute_target", data["meta"])
        for item in data.get("listings", []):
            self.assertIn(item.get("rail_line"), {"港岛线", "荃湾线", "东铁线", "南港岛线"})
            self.assertTrue(item.get("direct_rail"))
            for key in ("admiralty_route", "shenzhen_note", "direct_to_admiralty"):
                self.assertNotIn(key, item)

    def test_page_is_noindex_and_does_not_send_referrer(self):
        html = (ROOT / "index.html").read_text(encoding="utf-8")
        self.assertIn('name="robots" content="noindex,nofollow,noarchive"', html)
        self.assertIn('name="referrer" content="no-referrer"', html)


if __name__ == "__main__":
    unittest.main()
