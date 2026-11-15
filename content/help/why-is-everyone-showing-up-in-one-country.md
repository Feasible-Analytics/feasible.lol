---
title: "Why is everyone showing up in one country?"
description: "Your proxy isn't forwarding the visitor's IP address, so every event looks like it came from your server. The health panel spots it."
category: "troubleshooting"
weight: 20
---

Your proxy isn't passing the visitor's address along, so every event looks like it came from your server.

The symptom is unmistakable: one country with everything in it and a visitor count that collapses to almost nothing. Both come from the same cause. [The IP address is what geolocation and the daily visitor hash are built from](/help/how-do-you-count-unique-visitors-without-cookies/), so if every request carries the same address, every visitor is the same visitor.

If your proxy runs at a hosting provider, as most do, it looks different: traffic from a hosting provider's address is filed as `datacenter_ip`, and reports leave that out by default, so your visitors seem to vanish rather than pile up in one place.

**Check the health panel first.** Under **Site settings → Health**, it shows which client address was resolved for the last request and which header it came from. It also raises an explicit proxy-misconfiguration warning when more than half of at least twenty requests resolved straight off the socket - which is precisely this failure. On the hosted service, that means requests from a hosting provider's address that forward no visitor. A proxy on an ordinary home or office connection won't trip it, so check the address in the panel too.

**The fix** is to make your proxy forward the visitor's real address and user agent. Every reverse proxy has a one-line way to do it: nginx sets `X-Forwarded-For`, Caddy does it by default, and the [proxying docs](/docs/proxying/) have complete configurations for both.

Two other places this happens:

- **A server-side call** to the events endpoint that doesn't carry the visitor's IP and user agent. It looks like a datacenter bot.
- **A serverless function or edge worker** relaying events without forwarding the original request headers.

If a big share of your events are being filed as `datacenter_ip`, that's the same root cause wearing a different hat - [the health panel names it](/help/why-are-my-events-being-dropped/).
