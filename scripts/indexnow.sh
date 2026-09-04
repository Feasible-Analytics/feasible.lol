#!/usr/bin/env bash
#
# indexnow.sh
# Tell Bing and Yandex that the site's pages exist or changed.
#
# IndexNow takes a list of URLs and a key that must also be served from the site
# at /<key>.txt, which proves we control the domain. Google does not participate.
#
# Usage: ./scripts/indexnow.sh          # submit every URL in the sitemap
#        ./scripts/indexnow.sh /pricing/ /blog/   # submit specific paths
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
set -euo pipefail

HOST="feasible.lol"
KEY="ee3598a5fa95582eaa766d1a91109bb0"

if [ $# -gt 0 ]; then
  urls=$(printf '"https://%s%s"\n' "$HOST" "$@" | paste -sd, -)
else
  urls=$(curl -fsS "https://$HOST/sitemap.xml" \
    | grep -o '<loc>[^<]*</loc>' | sed 's|</\?loc>||g' \
    | sed 's/.*/"&"/' | paste -sd, -)
fi

count=$(printf '%s' "$urls" | tr -cd ',' | wc -c | tr -d ' ')
echo "Submitting $((count + 1)) URLs to IndexNow…"

curl -fsS -X POST "https://api.indexnow.org/IndexNow" \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":[$urls]}" \
  -w 'HTTP %{http_code}\n'
