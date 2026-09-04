---
title: "How do I add a site?"
description: "Three fields and one script tag. Here's the whole process, including the one field people get wrong."
category: "getting-started"
weight: 10
---

Three fields, then one script tag.

1. Sign in and open **Sites**, then **Add a site**.
2. Enter the domain — `example.com`. No `https://`, no `www.`, no trailing slash.
3. Pick the site's time zone. Every day, week and month in your reports is drawn on that clock, and email reports go out at that site's own midnight. You can change it later.
4. Copy the snippet and paste it into the `<head>` of every page.

{{< snippet domain="example.com" >}}

That's it. There's no verification file to upload and no DNS record to add.

The field people get wrong is the domain. It has to match what the browser is actually on. Register `example.com` and the script can run on `www.example.com`, `app.example.com` or `blog.example.com` — subdomains of the domain you registered are included, and they share visitors. Run it on `example.net` and the events are refused with the reason `unknown_site`, which the [health panel](/help/why-are-my-events-being-dropped/) will say out loud rather than dropping them quietly.

After you save, Feasible sits on an onboarding screen and waits for the first real event. Load your own site in another tab and it should tick over in a few seconds. If it doesn't, start with [why don't I see any data yet](/help/why-dont-i-see-any-data-yet/).

Sites are unlimited on every plan, so add all of them. If you have a lot, put them in folders on the sites list. And if you're wondering whether a second domain needs a second account: [it doesn't](/help/can-i-track-more-than-one-website/).
