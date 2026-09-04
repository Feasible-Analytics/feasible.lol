#!/usr/bin/env python3
#
# check-seo.py
# The mechanical SEO checks worth failing a build over: a missing or overlong
# title, a missing or overlong description, a missing or duplicated H1, and a
# page nothing on the site links to.
#
# The page is parsed rather than regexed, because minified HTML drops the quotes
# around attribute names and the copy is full of apostrophes.
#
# Usage: python3 scripts/check-seo.py public
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#

import os
import sys
from collections import defaultdict
from html.parser import HTMLParser

TITLE_MAX = 65
DESC_MIN, DESC_MAX = 70, 160


class Page(HTMLParser):
    """Pulls the handful of things worth checking out of one built page."""

    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.title = ""
        self.description = None
        self.h1s = []
        self.links = []
        self.redirect = False
        self._in = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)

        if tag == "title":
            self._in = "title"
        elif tag == "h1":
            self._in = "h1"
            self.h1s.append("")
        elif tag == "meta" and (a.get("name") or "").lower() == "description":
            self.description = a.get("content", "")
        elif tag == "meta" and (a.get("http-equiv") or "").lower() == "refresh":
            # A Hugo alias renders a meta-refresh stub. It has no content by
            # design, so none of the content checks apply to it.
            self.redirect = True
        elif tag == "a" and a.get("href"):
            self.links.append(a["href"])

    def handle_endtag(self, tag):
        if tag in ("title", "h1"):
            self._in = None

    def handle_data(self, data):
        if self._in == "title":
            self.title += data
        elif self._in == "h1" and self.h1s:
            self.h1s[-1] += data


def page_url(root, path):
    rel = os.path.relpath(path, root).replace(os.sep, "/")
    if rel.endswith("index.html"):
        rel = rel[: -len("index.html")]
    return "/" + rel


def main():
    root = sys.argv[1] if len(sys.argv) > 1 else "public"
    if not os.path.isdir(root):
        print(f"error: {root} is not a directory. Run `make build` first.")
        return 1

    pages = {}
    linked = set()

    for dirpath, _, names in os.walk(root):
        for name in names:
            if not name.endswith(".html"):
                continue
            path = os.path.join(dirpath, name)
            p = Page()
            with open(path, encoding="utf-8", errors="replace") as fh:
                p.feed(fh.read())
            pages[page_url(root, path)] = p
            for href in p.links:
                if href.startswith("/"):
                    href = href.split("#")[0].split("?")[0]
                    linked.add(href if href.endswith("/") else href + "/")

    problems = defaultdict(list)

    for url, p in pages.items():
        if url == "/404.html" or p.redirect:
            continue

        title = p.title.strip()
        if not title:
            problems[url].append("no <title>")
        elif len(title) > TITLE_MAX:
            problems[url].append(f"title is {len(title)} chars (max {TITLE_MAX}) — {title}")

        desc = (p.description or "").strip()
        if not desc:
            problems[url].append("no meta description")
        elif len(desc) > DESC_MAX:
            problems[url].append(f"description is {len(desc)} chars (max {DESC_MAX})")
        elif len(desc) < DESC_MIN:
            problems[url].append(f"description is only {len(desc)} chars (min {DESC_MIN})")

        if not p.h1s:
            problems[url].append("no <h1>")
        elif len(p.h1s) > 1:
            problems[url].append(f"{len(p.h1s)} <h1> elements")

        # Orphans. The home page and the 404 are reachable without a link.
        if url not in ("/", "/404.html") and url not in linked:
            problems[url].append("orphan — nothing on the site links here")

    if problems:
        total = sum(len(v) for v in problems.values())
        print(f"{total} issue(s) across {len(problems)} page(s):\n")
        for url in sorted(problems):
            print(f"  {url}")
            for issue in problems[url]:
                print(f"      {issue}")
        return 1

    print(f"{len(pages)} pages checked; titles, descriptions, headings and linking all clean.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
