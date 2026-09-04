---
title: "Do ad blockers block Feasible?"
description: "Some do. Being privacy-friendly doesn't exempt a script from a blocklist, and we'd rather say so than pretend."
category: "installing"
weight: 40
---

Some do, yes. We're not going to pretend otherwise.

Blocklists mostly work by hostname, not by behaviour. A list that blocks anything requesting a third-party analytics domain will block us too — it isn't reading our privacy policy first. Being cookieless earns you nothing at the blocklist level.

How much traffic that costs you depends enormously on your audience. Somewhere around 13% of visitors run something that blocks trackers, but that average is close to useless on its own. A developer-tools blog and a recipe site are not the same population, and neither is a mobile-heavy one. Measure yours instead of trusting anyone's headline number, including that one.

**The fix that works is serving the script from your own domain.** Same-origin requests to a path on your own hostname aren't a third-party analytics domain, so most blocklists have nothing to match on. [Here's how to proxy it](/help/can-i-proxy-the-script-from-my-own-domain/), with Caddy and nginx configs in the [docs](/docs/). On WordPress the plugin does it for you, on randomised paths generated at activation.

**And here's the honest limit.** Proxying raises the cost of blocking you; it does not end the game. A determined list can still match on request shape or on paths that get reported. Our own source says this outright, because a vendor telling you they've permanently beaten ad blockers is telling you something that has never been true of anybody.

Two smaller things that help at the margins. There's a `<noscript>` pixel fallback for visitors with JavaScript off — it can't measure time on page or scroll depth, but it counts the pageview. And the script honours Do Not Track and a per-browser opt-out, so the people who've explicitly asked not to be counted aren't.

Whatever your gap turns out to be, it's stable. Trends stay honest even when the absolute number is low.
