---
title: "Does Feasible slow my site down?"
description: "No measurable amount. One deferred 3,377-byte request, no render blocking, no polling timer, no third-party chain."
category: "installing"
weight: 20
---

Not by any amount you could measure.

Four reasons, all [structural](/features/speed/) rather than promises.

**The tag is deferred.** It never blocks parsing or rendering, wherever you put it. Nothing on your page waits for us.

**It's one request of [3,377 bytes gzipped](/help/how-big-is-the-tracking-script/)**, cached for an hour with an ETag, so most loads are a 304 with no body. There's no second file, no config fetch, no vendor chain pulling in three more domains.

**There's no polling timer.** Time on page and scroll depth accrue from browser events, not from something waking up every second to check. A tab sitting open costs nothing.

**Sends are fire-and-forget.** Events go out with `fetch` and `keepalive`, so nothing waits on a response and a slow network never holds up navigation.

Two things it does that help the numbers:

It **defers everything until the page is visible**, so a prerendered page or a tab opened in the background doesn't do tracking work while you're trying to hit a Largest Contentful Paint target. And it never calls `preventDefault` on an outbound link or a form submit - some analytics scripts delay the navigation to squeeze a request in, which is a real, felt slowdown. This one uses a hold-open fallback instead and gets out of the way.

If you want to put a number on it, load your site with the tag and without it in a lab tool and look at the diff. It'll be inside the noise.

The one thing that *can* cost you is a tag manager. A container script is usually several times the size of this one, and it's loading a tag you could have pasted directly. [Paste the tag](/help/where-do-i-put-the-tracking-script/).
