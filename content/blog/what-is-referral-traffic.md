---
# Created: 2026-11-26
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "What's in referral traffic? We sorted 1,321 visits by hand"
seotitle: "What is referral traffic? We sorted 1,321 visits by hand"
slug: "what-is-referral-traffic"
description: "Referral is whatever's left after search, social, email and ads. We sorted 91 days of ours by hand: one launch, our own links, and 13% everyone else."
lede: "One launch, our own links, and 13% everyone else. That 13% is the part worth watching."
date: 2026-11-26
checked: 2026-11-26
image: "/images/og/what-is-referral-traffic.png"
---

Someone on Indie Hackers asked this week why the people who signed up with Google said they came from accounts.google.com. That's referral traffic doing what it does. It isn't a list of sites that recommend you. It's whatever's left once search, social, email, AI and ads have been taken out.

So we took two of our other sites, the one for a notes app and the one for a stock-options tool, and sorted every visit filed under Referral in the 91 days to November 26, 2026. There were 1,321. Over half came from one launch. More than a quarter came from links we put out ourselves. Every other website put together sent 13%.

## How a visit ends up in Referral

Analytics tools sort visits into channels by working down a list of rules: search engines, social networks, email, AI assistants, ads. Referral comes near the end. In Feasible it's the last rule there is: anything with a source that didn't match an earlier rule is a referral.

A source can come from the referrer the browser sent, or from a tag in the link. That second part matters more than it sounds. A link tagged with a `utm_source` name the tool doesn't recognize, and no medium, arrives with a source, matches no other rule, and lands in Referral. It doesn't need a referrer to get there.

GA4 is stricter. [Its rules](https://support.google.com/analytics/answer/9756891) only call a visit Referral when the medium is `referral`, `app` or `link`. A tag with a source and no medium doesn't match that, so unless Google recognizes the source name, the visit ends up in Unassigned. Different bin, same problem.

## What was in ours

The notes app site had 1,253 referral visits. We left out the visits Feasible flags as bots, the way the dashboard does.

| What it was | Visits | Share |
|---|---|---|
| One Product Hunt launch | 708 | 56.5% |
| Links we put out ourselves | 332 | 26.5% |
| Other people's websites | 162 | 12.9% |
| Apps: chat, bookmarks, a start page, RSS | 42 | 3.4% |
| AI chats our list didn't know | 5 | 0.4% |
| Machines that got past the bot filter | 4 | 0.3% |

**The launch.** 549 of Product Hunt's 708 visits came on two days, September 20 and 21. Since the end of September it has sent about nine a week. Product Hunt adds `ref=producthunt` to the links it shows, and 476 visits arrived with that tag and no referrer at all. Without the tag, they'd be Direct.

**Us.** A sponsorship we ran sent 154. Another of our products sent 80. Our company's site and the founder's personal site sent 80 more. Links from the app itself sent 15, and our own posts on X sent 3. That's all real traffic. None of it says anyone else thought the app was worth a link.

**Everyone else.** 162 visits from more than 40 sites, most of which sent one or two. The one that matters most is a software directory, AlternativeTo. It sent 51 visits, and it sent some every week since the end of August. A genealogy directory listed the app and sent 22, half of them in one week. A forum thread sent 15, all in one week.

**The rest.** Links clicked in a chat app, a personal start page, a bookmark manager, an RSS reader and an email service's click tracker. Five visits from Gemini and Duck.ai, which belong under AI Assistants. And four machines, one of which read 329 pages in a single visit.

Across all 1,253, 706 visits arrived with no referrer. They're in Referral only because the link carried a tag.

## The smaller site was mostly us

The stock-options tool site had 68 referral visits in the same 91 days.

Our own sites sent 24. Our own email sequence sent 11, because its links had a source tag and no medium, so they never reached the Email channel. Three of those even came through the Gmail app. 11 came from AI chats our list didn't know. 8 came from `localhost`, a copy of the site running on somebody's own computer, almost certainly ours. One came from a search engine.

That leaves 13 from other websites: 3 from Product Hunt, and 9 from one site that never got past the first page.

## Where our own rules got it wrong

Feasible believed a tag over the referrer, because someone set the tag on purpose. Usually that's right. When the tag was a name it didn't know, it threw away the better answer the referrer already had.

Twelve visits across the two sites were tagged `utm_source=gemini`, three of them with `gemini.google.com` as the referrer. Feasible knew `chatgpt`, `claude` and `perplexity` as tags, but not `gemini`, so all twelve went to Referral instead of AI Assistants. The three visits from our posts on X arrived with X's `t.co` referrer and a tag we'd made up, so they missed Organic Social. Three visits from our email sequence came through the Gmail app and still missed Email.

The referrer is still stored with each visit, so filtering by it under Acquisition finds them. But the channel report got them wrong.

**Fixed in v0.0.78, on November 26.** A tag Feasible doesn't know still names the source, but a referrer it does know now decides the channel. A `t.co` click with a made-up tag lands in Organic Social, and a Gmail app click lands in Email. `utm_source=gemini` counts as AI Assistants, and so do links from Duck.ai, Meta AI, Grok and DeepSeek. The fix applies to visits from that day on. Older visits, including every one in this sample, keep the channel they were given.

## How to read yours

**Take yourself out first.** Filter out your own domains and the tags you set. On the notes app site that's a quarter of the bin. On the options site it's more than half.

**Read it by week, not by total.** A launch buries everything. 708 visits from Product Hunt make 51 from a directory look like nothing, until you see the directory sent people every week and the launch now sends about nine a week.

**Give every tag a medium.** `utm_source=newsletter&utm_medium=email` lands in Email in Feasible and in GA4. A source name the tool doesn't know, with no medium, lands in Unassigned in GA4. In Feasible it lands in Referral, unless the referrer is a site Feasible knows. There's more on [UTM parameters](/help/what-are-utm-parameters/) if you haven't used them.

**Check the sign-up path.** If sign-ups say they came from accounts.google.com or your payment provider, a redirect in the middle of the visit is taking the credit. Feasible keeps the source a visit started with, so [that round trip doesn't count](/help/why-doesnt-stripe-show-up-as-a-source/). In GA4, add those domains to [List unwanted referrals](https://support.google.com/analytics/answer/10327750).

What's left after that is short. On the notes app site, it was one directory that sent somebody every week for three months. That's the row we watch.
