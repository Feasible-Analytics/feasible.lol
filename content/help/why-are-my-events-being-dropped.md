---
title: "Why are my events being dropped?"
description: "Open the health panel. It counts every refused event over the last 24 hours with a named reason, so you don't have to guess."
category: "troubleshooting"
weight: 10
---

Open **Site settings → Health**. It will tell you the reason by name.

The panel covers the last 24 hours and counts accepted events against refused ones - with a specific reason attached to every refusal. Never failing silently is the thing this product is built around, and [the health panel](/features/data-health/) is where that shows up.

Here's what each reason means:

| Reason | What happened |
|---|---|
| `bot` | The user agent matched a known crawler or tool |
| `automation` | The browser carried driver flags - Playwright, Puppeteer, Selenium |
| `datacenter_ip` | The request came from a cloud or hosting range |
| `outdated_browser` | A browser more than 18 major versions behind on an auto-updating OS |
| `referrer_spam` | A known junk referrer domain |
| `unknown_site` | The snippet is for a site you haven't registered |
| `hostname_not_allowed` | Served from a host outside your registered domain |
| `shield_ip` · `shield_country` · `shield_page` | One of [your own rules](/help/how-do-i-exclude-a-country-or-a-page/) |
| `rate_limited` | Too many requests from one address, too fast |
| `invalid_payload` | The request was malformed |
| `no_session_for_engagement` | An engagement ping with no open visit - usually harmless |
| `account_dormant` · `site_deleted` | The account or site isn't collecting |

The first five are [normal bot filtering](/help/how-do-you-handle-bots/) and usually the largest number on the page. That's the system working.

`unknown_site` and `hostname_not_allowed` are the two you can fix in a minute, and rejected hostnames come with a one-click "allow this hostname" button.

The panel also shows **which client address was resolved and from which header**, warns you when a proxy isn't forwarding visitor addresses, and warns when a site is still running an old tracker version.

And there's a **send a test event** button. It posts to the real public endpoint over the network, the way a browser would, rather than calling an internal function that would succeed regardless. If that lands and your site's events don't, the problem is on your page.
