---
title: "Can I track a subdomain?"
description: "Yes, and it's already included. Subdomains of a registered domain count against the same site and share visitors."
category: "getting-started"
weight: 50
---

Yes — and you don't have to do anything.

Register `example.com` and the same snippet works on `www.example.com`, `blog.example.com`, `app.example.com` and `docs.example.com`. All of it lands in one site. Keep `data-domain="example.com"` on every page; don't change it per subdomain.

Visitors are shared across them, deliberately. Somebody who reads your blog and then signs up in your app is one visitor and one visit, not two of each, because the visitor identifier is built from the registrable domain rather than the host. That's the whole point — otherwise every marketing-site-to-app journey would look like two strangers.

To see the split, use the **Hostname** filter. It's in the filter menu under **Page**, and it breaks the same site apart by host whenever you want them apart.

Two cases where you'd want something different:

- **You want the app and the marketing site kept separate.** Register them as two sites — `example.com` and `app.example.com` — and give each its own snippet. Sites are unlimited, so this costs nothing. You lose the shared visitor, which is the trade.
- **You're serving on a host outside the registered domain**, like a `pages.dev` preview or a vanity domain. That's [refused by default](/help/why-are-my-events-being-dropped/) with the reason `hostname_not_allowed`. Add it under **Site settings → Health** with the one-click allow, or in the shields hostname allow-list.

Tracking genuinely different domains is [a separate question](/help/can-i-track-more-than-one-website/), with a different answer.
