---
title: "Can I proxy the script from my own domain?"
description: "Yes. Serve the script and the event endpoint from your own hostname, and point the tag at them with data-api."
category: "installing"
weight: 50
---

Yes, and on a site with a technical audience it's worth doing.

You proxy two things — the script and the endpoint that receives events — through paths on your own domain. Then you tell the tag where they are:

```html
<script defer data-domain="example.com"
        data-api="/stats/api/event"
        src="/stats/js/script.js"></script>
```

`data-api` is used verbatim, and a relative path is fine. Full Caddy and nginx configurations are in the [proxying docs](/docs/proxying/).

**The one thing to get right: your proxy has to forward the visitor's real IP address and user agent.** If it doesn't, every event arrives looking like it came from your server, and you get one country, one visitor and no geography at all. It's the single most common way a proxy setup goes wrong, and the [health panel](/help/why-are-my-events-being-dropped/) watches for exactly that pattern — it tells you which header the address was read from, and warns when it's reading the socket instead. [What that looks like when it happens](/help/why-is-everyone-showing-up-in-one-country/).

Two more:

- **Content Security Policy.** Allow the origin in **both** `script-src` and `connect-src`. Getting one and missing the other means the script loads and then silently can't send anything. There's no `nonce` support.
- **On WordPress, don't do this by hand.** The plugin proxies the script and the endpoint from your own domain automatically, on randomised path segments generated at activation, and forwards the address and agent for you.

What this buys you is [fewer blocked requests](/help/do-ad-blockers-block-feasible/) — and it's a real improvement, not a permanent one. Randomised paths raise the cost of blocking; they don't end it. Anyone selling proxying as a guaranteed escape from blocklists is overselling it.
