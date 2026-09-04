#
# Makefile
# The whole local workflow for feasible.lol.
#
# Created: 2026-09-03
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
#

.DEFAULT_GOAL := help
.PHONY: help install dev build clean check links serve

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

## build: build the production site into public/
build:
	hugo --gc --minify --baseURL "https://feasible.lol/"

## serve: build, then serve public/ on :8899 exactly as it will ship
serve: build
	@echo "http://127.0.0.1:8899/"
	@cd public && python3 -m http.server 8899

## check: build and run every pre-publish check
check: build links
	@echo "All checks passed."

## links: check internal links and anchors in the built site
links:
	@python3 scripts/check-links.py public

## clean: remove build output and caches
clean:
	rm -rf public resources/_gen .hugo_build.lock hugo_stats.json
