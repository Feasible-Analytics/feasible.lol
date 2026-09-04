---
title: "How big is the tracking script?"
description: "3,377 bytes gzipped. 7,099 raw. That's the whole thing — there's no second file it pulls in afterwards."
category: "installing"
weight: 10
---

**3,377 bytes gzipped.** 7,099 bytes raw.

That's the complete script, not a loader that fetches the real one afterwards. One request, and it's over.

For scale: it's about 43× smaller than Google Analytics' tag on the wire. On a slow connection that's the difference between a measurable delay and nothing you could detect with a stopwatch.

The size is enforced rather than aspired to. The build has a byte budget baked in, and a build that exceeds it exits with an error — in the bundler *and* again in the Go server that serves it. It can't drift upward quietly between releases, because a release that made it bigger wouldn't compile.

There's one optional extra: a Web Vitals module at 3,946 bytes gzipped, loaded only if you turn it on with `data-vitals`. Leave it off and it's never requested.

What's in those 3,377 bytes is more than you'd guess: pageviews, single-page-app route changes, bfcache restores, outbound link clicks, file downloads, form submissions, scroll depth, focus-aware time on page, custom events and properties, revenue, a consent gate, Do Not Track, self-exclusion, and a retry queue that replays failed events on the next pageview so a flaky connection doesn't lose the data.

The script is served with a one-hour cache header and an ETag, so returning visitors mostly get a 304 and no body at all.

Related: [does it slow my site down](/help/does-feasible-slow-my-site-down/), and [what happens with ad blockers](/help/do-ad-blockers-block-feasible/).
