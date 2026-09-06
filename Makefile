#
# Makefile
# The whole local workflow for feasible.lol.
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#

.DEFAULT_GOAL := help
.PHONY: help install dev tailscale build clean check links seo xml responsive indexnow serve

# The port `make tailscale` binds. High and arbitrary so it never collides with
# another project's dev server.
TS_PORT := 41317

# On macOS the `tailscale` command is usually a shell alias into the app
# bundle, and Make's shell never sees an alias. Fall back to the bundle path.
TS_BIN := $(shell command -v tailscale 2>/dev/null || echo /Applications/Tailscale.app/Contents/MacOS/Tailscale)

# Resolved at run time rather than hardcoded, so this works on any machine on
# the tailnet. Hugo needs the MagicDNS name for its baseURL: live reload and
# every absolute URL on the page are written against it, so a wrong value here
# sends other devices back to localhost.
TS_HOST := $(shell $(TS_BIN) status --json 2>/dev/null | python3 -c "import json,sys; print(json.load(sys.stdin)['Self']['DNSName'].rstrip('.'))" 2>/dev/null)

## help: list the targets
help:
	@echo "feasible.lol"
	@echo
	@grep -E '^## ' $(MAKEFILE_LIST) | sed 's/## /  make /'

## install: install the Tailwind CLI Hugo shells out to
install:
	npm install

## dev: run the live-reloading dev server on :1313
dev:
	hugo server --buildDrafts --buildFuture --disableFastRender

## tailscale: run the dev server on the tailnet so other devices can load it
tailscale:
	@test -n "$(TS_HOST)" || { echo "Tailscale is not running, or this machine is not on a tailnet."; exit 1; }
	@echo "http://$(TS_HOST):$(TS_PORT)/"
	@hugo server --buildDrafts --buildFuture --disableFastRender \
		--bind 0.0.0.0 --port $(TS_PORT) \
		--baseURL "http://$(TS_HOST):$(TS_PORT)/" --appendPort=false

## build: build the production site into public/
build:
	hugo --gc --minify --baseURL "https://feasible.lol/"

## serve: build, then serve public/ on :8899 exactly as it will ship
serve: build
	@echo "http://127.0.0.1:8899/"
	@cd public && python3 -m http.server 8899

## check: build and run every pre-publish check
check: build links seo xml
	@echo "All checks passed."

## links: check internal links and anchors in the built site
links:
	@python3 scripts/check-links.py public

## seo: check titles, descriptions, headings and orphan pages
seo:
	@python3 scripts/check-seo.py public

## responsive: load every page at 390px and fail on any that scrolls sideways
##             (needs `make serve` running in another shell — CI has no browser)
responsive:
	@python3 scripts/check-responsive.py 390

## indexnow: tell Bing and Yandex the live pages exist or changed
indexnow:
	@./scripts/indexnow.sh

## xml: check the sitemap and feeds are well-formed
xml:
	@python3 scripts/check-xml.py public

## clean: remove build output and caches
clean:
	rm -rf public resources/_gen .hugo_build.lock hugo_stats.json
