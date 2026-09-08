---
title: "Where do I put the tracking script?"
description: "In the head of every page you want counted. It's deferred, and the position barely matters."
category: "getting-started"
weight: 20
---

In the `<head>`, on every page you want counted.

{{< snippet >}}

The tag carries `defer`, so it doesn't block rendering wherever you put it. Head or end of body both work. Head is the habit worth keeping, because it means the tag is present before a fast clicker can leave.

On most sites there's [one file](/docs/installation/) that wraps every page - a layout, a template, a theme header - and that's where this goes. WordPress, Ghost, Astro, Next.js, Hugo and the rest all have one. Our [integrations](/integrations/) pages name the exact file for each.

Three things to get right:

- **One copy per page.** Two copies means two pageviews for one visit. If you've added it in a theme setting *and* a template, remove one.
- **The snippet is the one for this site.** Each site has its own script filename. Copying another site's snippet across sends the events to that site.
- **Every page, not just the home page.** A tag on the home page only means your top-pages report will have one row in it.

You don't need a tag manager for this, and we'd rather you didn't use one - a manager loads its own container script, which is usually bigger than [ours](/help/how-big-is-the-tracking-script/), to load a tag you could have pasted.

If your site is behind an ad blocker-heavy audience, you can [serve the script from your own domain instead](/help/can-i-proxy-the-script-from-my-own-domain/).
