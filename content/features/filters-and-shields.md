---
title: "Filtering, shields and path cleaning"
description: "Six filter operators that live in the URL, shields that stop counting traffic you don't want, and path cleaning that merges a thousand URLs into one."
lede: "Narrow the report you're reading, stop counting what you never wanted, and merge the URLs that are really one page."
weight: 90
note: |
  There are no saved segments. A filter set lives in the URL and nowhere else —
  no naming it, no picking it from a list. And a shield only applies to events
  that arrive after it's live; it never removes traffic you already counted.
---

Three different tools that get confused with each other. Filters change the
report you're looking at. Shields stop traffic being counted at all. Path
cleaning changes how URLs are grouped before either of those runs.

## Filters

Six operators, and that's the complete list: is, is not, contains, does not
contain, matches regex, does not match regex.

Repeated filters AND together. Several values inside one filter OR. You get up
to 32 filters at once, 1,000 values in any one of them, and five dimensions in a
single query — limits nobody has ever hit by clicking, and which exist so
[the API](/features/api-and-webhooks/) can't be handed something that takes a
minute to answer.

The value editor autocompletes up to 25 values from the period you're looking
at, and takes free text for anything else. Filter by page, entry page, exit
page, hostname, title, channel, source, referrer, the three UTM fields, country,
region, city, browser, browser version, operating system, system version, device
type, screen size, language, event name, or any
[custom property](/features/custom-properties/) you've enabled.

Every filter ends up in the address bar, readable:

```
?f=is,country,DE&f=contains,page,/blog
```

That's deliberate, and it's why there's no "save segment" button. The URL *is*
the saved segment. Bookmark it, paste it into Slack, put it in a runbook — it'll
still resolve next year, it works for somebody with no account through a
[shared link](/features/teams-and-sharing/), and there's no saved-object schema
to migrate the next time we change something.

The honest cost: if you apply the same six filters every morning, you'll be
keeping a bookmark, and you won't get a tidy dropdown of named views. We think
the trade is worth it. You may not.

## Shields

A shield stops an event being counted. Four kinds, 30 rules each per site:

**IP** — a single address or a CIDR block. This is how you stop counting your
own office.

**Country** — an ISO country code.

**Page** — a path, or everything beneath it with a trailing `*`.

**Hostname** — an allow-list. Leave it empty and every hostname is accepted,
which is what nearly every site wants. Add one and only listed hostnames count,
so a staging copy running your snippet stops polluting production.

Rules take effect within 15 seconds. A shielded event isn't erased quietly — it
shows up on [the health panel](/features/data-health/) as a drop with reason
`shield_ip`, `shield_country` or `shield_page`, so you can prove your rule is
working instead of hoping.

IP shields can only be evaluated in the ingest tier, because that's the only
place the address exists — it's discarded before anything is written to disk.
That's a consequence of the [privacy design](/features/privacy/), and it's also
why no shield is retroactive. There's nothing stored to go back and match
against.

For your own visits there's something simpler than a rule: set
`feasible_ignore` in your browser's local storage and that browser stops being
counted. No IP to maintain, works on your laptop at a coffee shop, and it's per
browser rather than per network.

## Path cleaning

Some URLs are one page. `/users/8f14e45f-ce8a-4d29-9c17-2c4b3a1e7f90` and ten
thousand siblings are the profile page, and a top-pages report that lists all
ten thousand of them separately is a report with nothing at the top.

Path cleaning is a regex and a replacement:

```
^/users/[0-9a-f-]{36}   →   /users/:id
```

There's also a trailing-slash normalizer, because `/pricing` and `/pricing/`
being two rows is nobody's idea of a finding.

The part worth calling out is the preview. Before you save, Feasible shows you
which real paths the rule would merge, up to 50 of them. A regex that quietly
collapses your entire site into `/` is a two-character mistake, and finding out
from a preview is better than finding out from a week of missing data.

## What's already excluded

Before any of this, Feasible drops known crawlers, datacenter ranges, automated
browsers and referrer-spam domains — around seventy bot signatures and 11,842
merged datacenter ranges, with Cloudflare, Fastly and Akamai deliberately left
out because their address space carries real people using WARP and iCloud
Private Relay.

You can also exclude paths at the script with `data-exclude`, which takes
comma-separated globs and never sends the event in the first place.

Between the four, the order to reach for them is: path cleaning to group,
filters to look, shields to stop counting, `data-exclude` to never send. Full
reference in [the docs](/docs/shields/).
