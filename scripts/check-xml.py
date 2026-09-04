#!/usr/bin/env python3
#
# check-xml.py
# Every XML file the site publishes must parse, and its declaration must be the
# very first byte. A single stray newline in front of `<?xml` makes the document
# malformed, and a malformed sitemap is silently ignored by the crawlers it
# exists to talk to.
#
# Usage: python3 scripts/check-xml.py public
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
import glob
import os
import sys
import xml.etree.ElementTree as ET


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "public"
    files = sorted(glob.glob(os.path.join(root, "**", "*.xml"), recursive=True))
    if not files:
        print("no XML files found — did the build run?")
        return 1

    problems = []
    for f in files:
        raw = open(f, "rb").read()
        if not raw.startswith(b"<?xml"):
            problems.append(f"{f}: does not start with the XML declaration ({raw[:20]!r})")
            continue
        try:
            ET.fromstring(raw)
        except ET.ParseError as e:
            problems.append(f"{f}: {e}")

    if problems:
        print(f"{len(problems)} malformed XML file(s):\n")
        for p in problems:
            print("  " + p)
        return 1

    print(f"{len(files)} XML files parse, each starting at byte zero.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
