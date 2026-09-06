---
title: "Why don't I see any data yet?"
description: "Almost always one of four things. Open the health panel first - it counts every refused event and tells you the reason."
category: "getting-started"
weight: 40
---

Open the health panel before you guess.

It's under **Site settings → Health**, it covers the last 24 hours, and it counts accepted events against refused ones with a named reason for every refusal. That turns "nothing's working" into one word - `unknown_site`, `bot`, `hostname_not_allowed`, `shield_ip` - which is usually the whole answer.

If the panel shows nothing arriving at all, work down this list.

1. **View source on your live site and search for `feasible.lol/js/`.** If it isn't there, the tag didn't deploy. Cache, staging branch, theme setting that silently strips scripts - it happens constantly.
2. **Check the script filename against the one on your setup screen.** Another site's snippet is refused as `unknown_site`, and the health panel will show it.
3. **Turn off your own ad blocker and reload.** Yours is blocking the request, and [some of your visitors' are too](/help/do-ad-blockers-block-feasible/).
4. **Check you're not excluding yourself.** If you've set the browser-level opt-out or an IP shield, you won't count. [Here's how to check](/help/how-do-i-exclude-my-own-visits/).

Still nothing? Use the **send a test event** button on the health panel. It posts to the real public endpoint over the network, the way a browser would, rather than calling an internal function that would pass no matter what. If the test event lands and your site's don't, the problem is on the page. If the test event doesn't land either, [email us](mailto:help@feasible.lol) and say so.

Localhost is excluded on purpose, so a site you're only running on your laptop won't count anything.
