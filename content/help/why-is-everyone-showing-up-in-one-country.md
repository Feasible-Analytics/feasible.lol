---
title: "Why is everyone showing up in one country?"
description: "Your proxy isn't forwarding the visitor's IP address, so every event looks like it came from your server. The health panel spots it."
category: "troubleshooting"
weight: 20
---

Your proxy isn't passing the visitor's address along, so every event looks like it came from your server.

The symptom is unmistakable: one country with everything in it, usually where your hosting provider's datacenter is, and a visitor count that collapses to almost nothing. Both come from the same cause. [The IP address is what geolocation and the daily visitor hash are built from](/help/how-do-you-count-unique-visitors-without-cookies/), so if every request carries the same address, every visitor is the same visitor.

**Check the health panel first.** Under **Site settings → Health**, it shows which client address was resolved for the last request and which header it came from. It also raises an explicit proxy-misconfiguration warning when more than half of at least twenty requests resolved straight off the socket - which is precisely this failure.

**The fix** is to make your proxy forward the visitor's real address and user agent. Every reverse proxy has a one-line way to do it: nginx sets `X-Forwarded-For`, Caddy does it by default, and the [proxying docs](/docs/proxying/) have complete configurations for both.

Three other places this happens:

- **A server-side SDK.** The IP and user agent are required arguments in every one of ours, deliberately, and each ships a helper to lift them off the incoming request. A call missing them looks like a datacenter bot.
- **A serverless function or edge worker** relaying events without forwarding the original request headers.
- **The WordPress plugin** does all of this for you, so if you're on WordPress and seeing this, something else is in the path.

If a big share of your events are also being refused as `datacenter_ip`, that's the same root cause wearing a different hat - [the health panel names it](/help/why-are-my-events-being-dropped/).
