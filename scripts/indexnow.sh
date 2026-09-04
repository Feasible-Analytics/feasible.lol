#!/usr/bin/env bash
#
# indexnow.sh
# Tell Bing and Yandex that the site's pages exist or changed.
#
# IndexNow takes a list of URLs and a key that must also be served from the site
# at /<key>.txt, which is what proves we control the domain. Google does not
# participate — that one needs Search Console.
#
# Usage: ./scripts/indexnow.sh                    # every URL in the live sitemap
#        ./scripts/indexnow.sh /pricing/ /blog/   # just these paths
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
set -euo pipefail

HOST="feasible.lol"
KEY="ee3598a5fa95582eaa766d1a91109bb0"

# The JSON is built in Python rather than with paste and sed. A stray blank line
# out of the sitemap becomes an empty "" entry in a shell-built list, and
# IndexNow answers the whole batch with a 400 that says nothing about which URL
# was wrong.
python3 - "$HOST" "$KEY" "$@" <<'PY'
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET

host, key = sys.argv[1], sys.argv[2]
paths = sys.argv[3:]

if paths:
    urls = [f"https://{host}{p}" for p in paths]
else:
    with urllib.request.urlopen(f"https://{host}/sitemap.xml", timeout=30) as r:
        root = ET.fromstring(r.read())
    ns = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    urls = [loc.text.strip() for loc in root.findall(".//s:loc", ns) if loc.text]

urls = [u for u in urls if u.startswith(f"https://{host}")]
if not urls:
    sys.exit("no URLs to submit")

print(f"Submitting {len(urls)} URLs to IndexNow…")

payload = json.dumps({
    "host": host,
    "key": key,
    "keyLocation": f"https://{host}/{key}.txt",
    "urlList": urls,
}).encode()

req = urllib.request.Request(
    "https://api.indexnow.org/IndexNow",
    data=payload,
    headers={"Content-Type": "application/json; charset=utf-8"},
)

try:
    with urllib.request.urlopen(req, timeout=60) as r:
        print(f"HTTP {r.status} — accepted")
except urllib.error.HTTPError as e:
    print(f"HTTP {e.code} — {e.read().decode(errors='replace')[:400]}")
    sys.exit(1)
PY
