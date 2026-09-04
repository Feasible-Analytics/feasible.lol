---
title: "How do I exclude my own visits?"
description: "Two ways: a per-browser opt-out that takes one line in the console, or an IP shield that covers everyone in the office."
category: "installing"
weight: 60
---

Two ways. Pick based on whether you're excluding a browser or a building.

**Per browser — one line in the console.** Open your site, open the developer console, and run:

```js
localStorage.setItem('feasible_ignore', 'true')
```

That browser stops counting immediately. It's the fastest option and the right one for your laptop. The catch: it's per browser and per device, so you'll be doing it again in Firefox, on your phone, and after you clear site data.

**Per address — an IP shield.** Go to **Site settings → Shields** and add your address or a CIDR block. This covers everyone behind it, which is what you want for an office, a VPN or a QA runner. Shield rules take effect within 15 seconds, and you get 30 rules of each kind per site.

IP shields are evaluated in the ingest tier, because [that's the only place the address exists](/help/do-you-store-ip-addresses/) — it never reaches disk, so the exclusion can't be applied later.

A few things that are already handled:

- **Localhost is excluded automatically.** `localhost`, `127.0.0.1`, `::1` and `file:` URLs don't count. Add `data-capture-on-localhost="true"` if you actually want them.
- **Do Not Track is honored**, and re-read on every send.
- **Automated browsers are refused** — the driver flags Playwright, Puppeteer, Selenium and Cypress leave behind are checked before anything else.

One that isn't: **LAN addresses count normally.** `192.168.x.x` and `10.x.x.x` aren't treated as local, so a staging box on your network is real traffic until you shield it.

Excluding a country or a set of pages [works the same way](/help/how-do-i-exclude-a-country-or-a-page/).
