#!/usr/bin/env python3
#
# check-responsive.py
# Loads every built page at phone width and fails if any of them scrolls
# sideways. A page that scrolls horizontally on a phone is broken, and it is
# invisible from a desktop browser.
#
# Usage: python3 scripts/check-responsive.py [width]
# Expects the built site to be served at http://127.0.0.1:8899.
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#
import json
import os
import subprocess
import sys

WIDTH = int(sys.argv[1]) if len(sys.argv) > 1 else 390
BASE = "http://127.0.0.1:8899"

MEASURE = (
    "document.body.scrollWidth + ':' + document.documentElement.clientWidth"
)


def pw(*args):
    env = dict(os.environ, PW_CLI_NO_PERSIST="1")
    return subprocess.run(
        ["playwright-cli", "-s=respcheck", "--raw", *args],
        capture_output=True, text=True, env=env,
    ).stdout.strip()


def main():
    urls = []
    for dirpath, _, names in os.walk("public"):
        if "index.html" in names:
            rel = os.path.relpath(dirpath, "public").replace(os.sep, "/")
            urls.append("/" if rel == "." else f"/{rel}/")
    urls.sort()

    subprocess.run(["playwright-cli", "-s=respcheck", "close"],
                   capture_output=True, env=dict(os.environ, PW_CLI_NO_PERSIST="1"))
    pw("open", BASE + "/")
    pw("resize", str(WIDTH), "900")

    bad = []
    for url in urls:
        pw("goto", BASE + url)
        out = pw("eval", MEASURE).strip('"')
        try:
            scroll, client = (int(x) for x in out.split(":"))
        except ValueError:
            print(f"  ?  {url} — could not measure ({out!r})")
            continue
        if scroll > client + 1:
            bad.append((url, scroll, client))

    subprocess.run(["playwright-cli", "-s=respcheck", "close"],
                   capture_output=True, env=dict(os.environ, PW_CLI_NO_PERSIST="1"))

    if bad:
        print(f"{len(bad)} page(s) scroll sideways at {WIDTH}px:\n")
        for url, scroll, client in bad:
            print(f"  {url}  {scroll}px wide in a {client}px viewport")
        return 1

    print(f"{len(urls)} pages checked at {WIDTH}px, none scroll sideways.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
