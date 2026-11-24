---
# Created: 2026-11-24
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "Half the pageviews on our site last month weren't people"
seotitle: "How much website traffic is bots? We counted ours for 28 days"
slug: "how-much-website-traffic-is-bots"
description: "For 28 days we kept every pageview our filter marked as automated. 428 of 833 weren't people, and most of those claimed to be ordinary browsers."
lede: "428 of 833 pageviews were automated. The bots that say so are the easy part."
date: 2026-11-24
checked: 2026-11-24
image: "/images/og/how-much-website-traffic-is-bots.png"
---

In the 28 days to November 23, the tracking script on feasible.lol sent us 833 pageviews. 428 of them weren't people.

We can give you the exact number because Feasible doesn't throw away what it filters. Every pageview it decides is automated gets stored with the reason and left out of the reports. So for once we can show the part of a site's traffic that analytics tools usually hide.

## Most bots never get this far

A tracking script only counts things that run it. Most crawlers and link previews fetch the HTML and leave without running any JavaScript, so the script never sees them. Your server logs do.

That's why someone on Reddit asked this week why one Cloudflare screen said 12,000 pageviews and another said 480. The first counted every page the server handed out. The second counted browsers that ran a script.

Everything below got past that first cut. It ran our script, or at least sent what our script sends. Here's how the 833 split.

| What it was | Pageviews | Share |
|---|---|---|
| People | 405 | 49% |
| Something that named itself a bot | 198 | 24% |
| Something on a hosting provider's address | 206 | 25% |
| A browser too old to be real | 12 | 1% |
| Pages nobody read | 12 | 1% |

This is one site in one month, and yours will split differently. The shape is the useful part. The bots that announced themselves were less than half of the ones that got through.

## The ones that said so

198 pageviews came from something with a crawler's name in its user agent. 185 of those came from addresses that place them in Mountain View, California, or The Dalles, Oregon, and 169 of them said they were Chrome on Android.

That's Google. Its smartphone crawler [introduces itself](https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers) as Chrome on an Android phone, with Googlebot added to the end. Google [renders pages in a headless Chromium and runs their JavaScript](https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics), so every page it renders fires your tracking script the way a visitor would.

Not all of Google says so, and we found that out this month. Every time we asked Search Console to index a page, two "visitors" from Mountain View turned up on that page within the hour. Google's URL Inspection tool, Read Aloud and about a dozen other Google fetchers don't put "bot" in their user agents. Google also publishes their addresses in separate files from Google Cloud's, and we hadn't added those files. We fixed both on November 20.

So the table flatters people a little. 31 of the 405 pageviews we counted as people came from Mountain View, every one of them before the fix and none after. If those were Google too, the automated share was about 55%.

This group is the easy part. Any tool worth using drops a bot that gives its name. Google Analytics 4 does it automatically, with Google's own research and the IAB's list of known bots. [Google's help page](https://support.google.com/analytics/answer/9888366) on it ends with one more line: "At this time, you cannot disable known bot traffic exclusion or see how much known bot traffic was excluded."

## The ones that didn't

206 pageviews came from addresses that belong to hosting companies: AWS, Google Cloud, Azure, DigitalOcean, Hetzner, OVH and others. Not one of them called itself a bot. Here's what their user agents said instead:

- **Chrome on Windows:** 99
- **Chrome on a Mac:** 53
- **Safari on an iPhone:** 23
- **Nothing at all:** 29
- **Something else:** 2

They looked like 187 new people, and at least 170 of their 188 visits were a single page. 199 of the 206 pageviews came with no referrer and no tag. A tool that only checks names counts every one of them, and files them under [Direct](/blog/what-is-direct-traffic/).

We can't tell you what they were. Something in a data center loaded our pages and ran the script. It could have been a scraper, an SEO tool, a screenshot service, or an AI agent reading a page for somebody. For counting, it doesn't matter which.

The address check has one weak spot. Some VPNs rent their exits in the same data centers, so a few of these may have been people. We keep Cloudflare, Fastly and Akamai off the list on purpose, because iCloud Private Relay and Cloudflare's WARP run through them, and that's a lot of ordinary people on iPhones and Macs.

## Twelve browsers nobody runs anymore

12 pageviews claimed to be Chrome 107 to 133 on Windows. The most common versions among people on our site that month were 154, 156 and 157. That's 21 to 50 releases behind.

Chrome ships a new version every four weeks and updates itself. A copy dozens of releases old, on a system that keeps getting those updates, is almost always a script wearing an old user agent.

We drew that line from our own data. The scraper farm that made us build the check claimed versions 20 to 50 releases old. The oldest real visitor we'd seen was 13 behind. We set the cutoff at 18, so somebody who hasn't restarted Chrome in a while still counts.

## And twelve pages nobody read

The last 12 were the quietest. Nine came from two visits that loaded page after page and never once reported reading or scrolling. Our script sends the reading time as you leave each page, so a page with a person looking at it always reports something.

The other three were one crawler. Three visits from the same browser, screen size and city, all within two minutes, with no referrer, each on a different page. That's a crawler walking the site from a new address each time, so every page arrived as a new visitor.

## Check your own numbers

You can look for this in whatever you use now.

- **Break Direct down by landing page and visit length.** A run of one-page, zero-second Direct visits to pages nobody links to is the usual sign.
- **Look at browser versions.** On Windows or Android, anything a year or more behind the current release deserves a second look.
- **Look at cities.** Mountain View, The Dalles and Ashburn, Virginia, are where a lot of servers live. A burst from one of them is rarely a crowd.

Feasible keeps every one of these with its reason. The [health panel](/features/data-health/) counts the last 24 hours by reason, and the [stats API](/docs/api/) returns the rest when you ask for bots, which is where these numbers came from. [How we decide what's a bot](/help/how-do-you-handle-bots/) lists every check.

A filter you can check beats one you have to trust.
