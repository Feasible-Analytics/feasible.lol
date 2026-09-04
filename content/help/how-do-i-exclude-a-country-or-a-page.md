---
title: "How do I exclude a country or a page?"
description: "Shields. Four rule kinds — IP, country, page and hostname allow-list — 30 of each per site, live within 15 seconds."
category: "installing"
weight: 70
---

With [shields](/features/filters-and-shields/), under **Site settings → Shields**.

There are four kinds of rule:

- **IP** — a single address or a CIDR block. [For your own traffic](/help/how-do-i-exclude-my-own-visits/).
- **Country** — an ISO two-letter code. `RU`, `CN`, `VN`.
- **Page** — a path, or everything beneath it with a trailing `*`. `/admin/*` is the usual first one.
- **Hostname** — an allow-list, for hosts outside the domain you registered.

You get **30 rules of each kind per site**, and a saved rule takes effect within 15 seconds.

The hostname one works backwards from the others and catches people out. Subdomains of your registered domain are allowed automatically. Anything else — a `pages.dev` preview, a staging vanity domain, somebody who scraped your page and left the tag in — is refused with the reason `hostname_not_allowed`, and shows up on the [health panel](/help/why-are-my-events-being-dropped/) with a one-click "allow this hostname" button. So the allow-list is how you *include* a host, not exclude one.

**There's a second way to exclude pages, on the script side.** `data-exclude` takes comma-separated glob patterns, matched against the path and hash:

```html
<script defer data-domain="example.com"
        data-exclude="/admin/**,/preview/*"
        src="https://app.feasible.lol/js/script.js"></script>
```

`*` matches within a path segment, `**` across segments. Use this when you'd rather the event never leave the browser at all. Use a page shield when you want it stopped centrally without a deploy.

A shielded event is refused and counted with its reason, not silently dropped — the health panel shows `shield_ip`, `shield_country` and `shield_page` as separate lines, so you can always see what a rule is actually costing you.

If the problem is one URL splitting into thousands of rows rather than traffic you don't want, you want **path cleaning** instead — regex rules that merge `/users/8f3e…` into `/users/:id`, with a preview before you save.
