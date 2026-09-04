---
title: "Excluding traffic"
description: "Block traffic by IP, country, page or hostname, and merge URLs that are really one page with path cleaning."
lede: "Blocking what you don't want counted, and merging URLs that are really one page."
weight: 90
---

Two settings decide what gets counted and what it's called. They live at
`/settings/sites/<your domain>/shields` and `/settings/sites/<your domain>/paths`.

If traffic you *do* want is missing rather than traffic you don't, start at
[installation](/docs/installation/#if-nothing-arrives-at-all) instead.

## Shields — traffic you don't want counted

### Blocked addresses

An address or a CIDR block. Checked in the ingestion tier, which is the only place the raw address
still exists — after that it's been discarded and there's nothing left to match on.

The screen shows you the address *this request* resolved to, using exactly the same header precedence
the event endpoint uses, with a one-click **Block my own traffic**.

That's also a free diagnostic. If it shows a private address, your reverse proxy isn't passing the
visitor's address through, every visitor currently resolves to the same one, and a rule built on it
would block everyone. The one-click action hides itself in that state, though the manual rule form
can still add the shared address. Fix the proxy first — see [proxying](/docs/proxying/).

### Blocked countries

Two-letter ISO country codes. Worth it when a country is, for your site, entirely bot traffic.

### Blocked pages

A path, or a path ending in `*` to block everything beneath it. Staging routes, health checks and
preview builds live here.

### Allowed hostnames

This one is an **allow-list, not a block-list**. With no entries everything is accepted; with one or
more entries, anything not named is dropped.

It's the answer to somebody else's site sending events with your tracker id — a copied theme, a
scraper, a staging clone nobody told you about.

### Thirty rules of each kind

Per site, per kind. If you're approaching that on blocked pages, a `/staging*` prefix rule is usually
what you actually wanted.

### What a shield does, and where you see it

It stops the event being counted, and the drop is counted rather than silent. But the two halves
happen in different places, which matters if you're testing a rule with `curl`:

- **Blocked addresses** are decided in the ingestion tier, before the response, so `shield_ip` comes
  straight back in the `x-feasible-dropped` header.
- **Countries, pages and hostnames** are decided at the shard that holds your data, after the request
  has already been answered with its `202`. They're counted as `shield_country`, `shield_page` and
  `hostname_not_allowed`, and they can never appear in that header. A blocked page answers exactly
  like an accepted one; the event simply doesn't arrive in your reports.

Either way, the drop is on the ingestion health panel at `/settings/sites/<your domain>/health`, with
its reason. Every reason is from a closed set — the list is on [the APIs](/docs/api/#why-it-always-answers-202).

A change takes effect within about fifteen seconds, and saving from this screen pushes it
immediately.

{{< callout title="Shields aren't retroactive" >}}
They change what's collected from now on. They don't remove what's already stored.

To fix a report you've already collected, you're either filtering it in the dashboard or resetting
the site's analytics.
{{< /callout >}}

## Path cleaning — URLs that are really one page

`/users/3f2a…/settings` and ten thousand siblings are one route you think in and ten thousand rows on
your report. A path cleaning rule merges them:

| Pattern | Replacement | Result |
|---|---|---|
| `^/users/[^/]+/settings$` | `/users/:id/settings` | one row instead of thousands |
| `^/blog/([^/]+)/comments/.*$` | `/blog/$1/comments` | keeps the post, drops the comment id |

A pattern is a regular expression — a real one, not a glob — and a replacement can refer back to a
capture group with `$1`.

Rules are tried in order and **the first match wins**. They aren't chained, so a path is rewritten
once. Up to 30 rules per site, and a pattern may be up to 500 characters. A pattern that won't
compile is refused when you save it, naming the rule number and the pattern.

### The two things that make it worth using

**It's retroactive.** Reports apply the current mapping at query time, so saving one fixes the
history you already have, and new events use the same mapping immediately. The screen tells you how
many stored paths each rule moves before you save it, and again after.

**New traffic keeps its original.** The original path is stored and reports get a source-to-target
mapping, so deleting every rule brings the originals back. Older versions rewrote paths while rules
were active; an original already lost that way can't be reconstructed, so removing a rule leaves
those legacy cleaned values as they are. Retaining originals for all new writes means the path
dimension still contains every distinct raw path — the rule controls report grouping rather than
erasing source data.

### Trailing slashes

Most sites serve the same page at `/about` and `/about/`, and otherwise the two are permanent
separate rows on every report. There's a one-switch rule for it.

It ships **off** rather than decided for you, because a few sites genuinely serve different content at
each, and silently merging those would be wrong.

### Preview before you save

The preview shows exactly what saving would do and how many stored rows each merge moves. Nothing is
written until you say so.
