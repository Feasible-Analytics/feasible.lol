#!/usr/bin/env python3
#
# check-links.py
# Walk the built site and prove every internal link resolves — including the
# fragment. A 404 on your own site is the cheapest kind of bug to catch and the
# most embarrassing kind to ship.
#
# Usage: python3 scripts/check-links.py public
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#

import os
import re
import sys
from collections import defaultdict
from html.parser import HTMLParser
from urllib.parse import unquote, urldefrag

# Links we deliberately never follow. Mail and telephone links have no target to
# check, and the app lives on another host that this script cannot see.
SKIP_SCHEMES = ("mailto:", "tel:", "javascript:", "data:", "#")


class Collector(HTMLParser):
    """Pulls hrefs, img srcs and the id/name anchors out of one page."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.assets = []
        self.anchors = set()

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)

        if "id" in a:
            self.anchors.add(a["id"])
        # A bare <a name="..."> still counts as a target.
        if tag == "a" and "name" in a:
            self.anchors.add(a["name"])

        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        elif tag in ("img", "script") and a.get("src"):
            self.assets.append(a["src"])
        elif tag == "link" and a.get("href") and "stylesheet" in (a.get("rel") or ""):
            self.assets.append(a["href"])


def page_url(root, path):
    """Turn a file path into the URL a browser would use to reach it."""
    rel = os.path.relpath(path, root).replace(os.sep, "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel


def resolve(root, url):
    """Find the file a site-absolute URL maps to, or None."""
    path = unquote(url.split("?")[0]).lstrip("/")
    candidates = [
        os.path.join(root, path),
        os.path.join(root, path, "index.html"),
        os.path.join(root, path + ".html"),
    ]
    for c in candidates:
        if os.path.isfile(c):
            return c
    return None


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "public"
    if not os.path.isdir(root):
        print(f"error: {root} is not a directory. Run `make build` first.")
        return 1

    pages = {}
    for dirpath, _, filenames in os.walk(root):
        for name in filenames:
            if name.endswith(".html"):
                path = os.path.join(dirpath, name)
                c = Collector()
                with open(path, encoding="utf-8", errors="replace") as fh:
                    c.feed(fh.read())
                pages[path] = c

    # Anchor sets keyed by the URL of the page that owns them, so a link to
    # /pricing/#enterprise can be checked against the pricing page's ids.
    anchors_by_url = {page_url(root, p): c.anchors for p, c in pages.items()}

    problems = defaultdict(list)

    for path, collected in pages.items():
        src = page_url(root, path)

        for raw in collected.links + collected.assets:
            href = raw.strip()
            if not href or href.startswith(SKIP_SCHEMES):
                continue
            if re.match(r"^[a-zA-Z][a-zA-Z0-9+.-]*:", href):
                continue  # absolute, another host — not ours to verify

            target, frag = urldefrag(href)

            if not target:
                # Same-page fragment.
                if frag and frag not in collected.anchors:
                    problems[src].append(f"#{frag} — no element with that id")
                continue

            if not target.startswith("/"):
                base = os.path.dirname(src.rstrip("/")) or "/"
                target = os.path.normpath(os.path.join(base, target))

            if not resolve(root, target):
                problems[src].append(f"{href} — no such page")
                continue

            if frag:
                target_url = target if target.endswith("/") else target + "/"
                known = anchors_by_url.get(target_url)
                if known is not None and frag not in known:
                    problems[src].append(f"{href} — page exists, #{frag} does not")

    if problems:
        total = sum(len(v) for v in problems.values())
        print(f"{total} broken link(s) across {len(problems)} page(s):\n")
        for src in sorted(problems):
            print(f"  {src}")
            for issue in sorted(set(problems[src])):
                print(f"      {issue}")
        return 1

    print(f"{len(pages)} pages checked, every internal link and anchor resolves.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
