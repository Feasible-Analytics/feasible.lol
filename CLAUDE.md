# feasible.lol

The marketing website for Feasible — simple, privacy-friendly website analytics.
Hugo, Tailwind CSS v4, deployed to GitHub Pages on every push to `main`.

The product lives in a separate repo:
[app.feasible.lol](https://github.com/Feasible-Analytics/app.feasible.lol).
This repo has no application code in it.

## This repository is public

Everything committed here is a permanent public statement from Cloudmanic Labs.
Two rules follow, and they outrank every other instruction in this file.

**Never write that Feasible copies, clones, or reimplements anyone.** Not in a
page, a heading, a joke, an HTML comment, or a commit message. Not "a drop-in
alternative to X", not "X-compatible", not "everything X does for a tenth of the
price". Feasible is its own product. Describe what it is.

**Name a competitor only for a factual, sourced, dated comparison.** A published
price, a documented limit, a public behaviour — with a link and the date it was
checked. Never characterise a competitor's motives, team, or code quality. Never
publish a competitor's security vulnerability, even a real one.

Google Analytics is the one product whose *experience* we criticise, and even
there, name the specific thing rather than the adjective.

## Commands

```bash
make install   # install the Tailwind CLI that Hugo shells out to
make dev       # live-reloading dev server on :1313
make build     # production build into public/
make check     # build, then verify every internal link and anchor
make links     # just the link check
```

`make check` must pass before anything is pushed.

## How it's put together

| Path | What's in it |
|---|---|
| `content/` | Every page, Markdown with YAML front matter |
| `layouts/baseof.html` | The shell every page renders into |
| `layouts/_partials/` | Shared pieces: head, header, footer, schema, screenshots, CTA |
| `layouts/_shortcodes/` | `shot`, `callout`, `snippet` — used inside content |
| `layouts/<section>/` | Per-section list and single templates |
| `assets/css/main.css` | The whole design system: `@theme` tokens plus component classes |
| `assets/images/app/` | Product screenshots, resized to WebP srcsets at build time |
| `data/` | Copy blocks and the competitor pricing table |
| `static/` | Copied through untouched: fonts, favicon, CNAME, OG image |
| `scripts/check-links.py` | The link and anchor checker |

There is no `tailwind.config.js` and no separate CSS build step. Tailwind v4 is
configured in CSS: `@theme` in `assets/css/main.css` defines the tokens, and
`@source "hugo_stats.json"` lets it tree-shake against the classes the site
actually renders. `hugo.toml` mounts `hugo_stats.json` into `assets/notwatching/`
so a layout edit rebuilds the stylesheet.

The stylesheet is built inside `templates.Defer` in `_partials/head.html`. That
is load-bearing: without the defer, the first build produces CSS missing half
its classes.

## Design

Swiss modernist. Warm grey paper (`--color-paper`), near-black ink, one red
(`--color-flag`, `#ec3013`) that only ever means "act on this". Zero rounded
corners. Structure comes from 2px rules, never shadows. Archivo carries both
display and body, self-hosted — we sell people a way to stop leaking their
visitors to an ad company, so the site does not fetch its font from one.

Design tokens live in `assets/css/main.css` under `@theme`. Change them there,
not in a template.

Every page must work at 320px. The reading column caps at `max-w-[44rem]`; wide
tables scroll inside their own box rather than pushing the page sideways.

## Writing

Load the `feasible-writing` skill before writing or editing any prose. It is
gitignored (private tooling, not part of the open-source site) and lives at
`.claude/skills/feasible-writing/`. If it isn't there, ask — don't guess at the
voice.

The short version: write like you talk, contractions always, short sentences of
varied length, answer first, say the number instead of the adjective, take a
position, and stop rather than summarising.

## Facts that must stay right

Prices live in `hugo.toml` under `[params.pricing]`. Competitor prices live in
`data/competitors.yaml`, each with its source URL and the date it was read. A
static site cannot read live Stripe prices, so when the real price changes it has
to be changed here too — the in-app pricing page and Stripe are the source of
truth for what a card is actually charged.

Never publish a competitor number without a source and a date. An out-of-date
comparison is worse than no comparison.

### Claims that are false — never make them

These were each verified as wrong. They are easy to reach for and they would
make a page factually incorrect.

- **We do not have a more permissive license than Plausible.** Both are
  AGPL-3.0-or-later. The honest argument is "nothing is held back": no cut-down
  Community Edition, no feature gated to the paid plan, raw export and the full
  API in every copy.
- **Our tracking script is not smaller than Plausible's** — it is roughly 2.7×
  bigger on the wire. Ours is 3,377 bytes gzipped. The one true, reproducible
  comparison is "about 43× smaller than Google Analytics".
- **Google Analytics is not illegal in the EU.** The 2022 rulings were real, but
  the EU–US Data Privacy Framework adequacy decision of 2023-07-10 removed the
  transfer ground they rested on.
- **SQLite is not more storage-efficient** than a column store. Our true claim is
  operational: one file, one process, nothing to tune, 512 MB of RAM.
- **Matomo is GPL-3.0**, not AGPL. **Umami is MIT**, which is genuinely more
  permissive than ours — say so when it comes up.

### Never claim a feature we don't have

No SSO or SAML. No Search Console *report* (the data imports, nothing reads it
back). No saved segments. No standalone referrers card. No mobile SDKs. No
retention or cohort report, no session replay, no heatmaps, no A/B testing. No
live demo dashboard — `app.feasible.lol/demo` is a 404 and must never be linked.

We are GDPR-, CCPA- and PECR-**friendly**. We never tell anyone they are
compliant, and we never give legal advice.

## Legal pages

`/privacy/`, `/terms/` and `/dpa/` exist here **and** inside the app binary at
`internal/pages/docs/`, because a self-hosted install has a different operator
and substitutes its own identity. Each markdown file carries an HTML comment
saying so. **Change both copies together.**
