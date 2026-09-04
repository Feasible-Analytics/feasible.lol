---
title: "How do you handle bots?"
description: "Five checks, in order, and none of them delete anything. A filtered event is stored with the reason and counted where you can see it."
category: "reports"
weight: 70
---

Five checks, in order — and the filtered events are labeled, not deleted.

1. **User agent.** About seventy tokens covering crawlers, headless browsers, HTTP libraries, uptime monitors, SEO tools, social unfurlers, search engines, AI crawlers and scanners. An *empty* user agent is explicitly not treated as a bot.
2. **Automation signals from the browser** — the flags a driven browser leaves behind. Checked before the IP, because that's what catches a scraper running on somebody's home connection.
3. **Datacenter address.** A binary search over 11,842 CIDR ranges from the big clouds and hosts. Cloudflare, Fastly and Akamai are deliberately left out: their ranges carry WARP and iCloud Private Relay, and those are real people.
4. **Outdated browser.** A narrow rule that only fires when a browser is more than eighteen major versions behind on an operating system that updates itself. It's aimed at spoofed agents, not at your one visitor who won't restart Chrome.
5. **[Referrer spam](/help/im-seeing-spam-referrers/)** against a list of known junk domains.

Here's the part that matters. **A classified event is still stored, with its reason attached.** It's excluded from your reports by default, and it's counted — with that reason — on the [health panel](/help/why-are-my-events-being-dropped/). So "we filtered 4,100 events yesterday: 3,800 `bot`, 240 `datacenter_ip`, 60 `referrer_spam`" is a thing you can read, rather than a silent difference between two numbers you can never reconcile.

That's most of the answer to [why your traffic looks lower here than in another tool](/help/why-is-my-traffic-lower-than-google-analytics/).

The lists ship inside the binary. If you [self-host](/help/can-i-run-feasible-myself/) you can replace them with your own files on disk without rebuilding anything. They don't update themselves at runtime — we'd rather say that plainly than imply a refresh that isn't happening.
