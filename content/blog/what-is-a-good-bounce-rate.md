---
# Created: 2026-11-19
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "What's a good bounce rate? Ask who counted it first"
seotitle: "What is a good bounce rate? We counted the same visits two ways"
slug: "what-is-a-good-bounce-rate"
description: "We counted 7,368 visits by GA4's bounce rule and by ours. GA4's rule said 49% and 54%. Ours said 65% and 75%. Same visits, so which number is good?"
lede: "Same visits, two rules, a 16 to 21 point gap. A benchmark that doesn't say which rule made it can't tell you much."
date: 2026-11-19
checked: 2026-11-19
image: "/images/og/what-is-a-good-bounce-rate.png"
---

We took 7,368 visits to two of our other sites and worked out their bounce rate twice. Once with the rule Feasible uses, once with the rule Google Analytics 4 uses.

The visitors didn't change. Only the rule did. Our rule said 65% on one site and 75% on the other. GA4's rule said 49% and 54%.

So before anyone can tell you what a good bounce rate is, you need to know who counted it.

## Two rules for the same word

GA4 calls a visit a bounce when it wasn't engaged. [Google's definition](https://support.google.com/analytics/answer/12195621) of an engaged session is one that lasts longer than 10 seconds, has a key event, or has two or more page views. The 10 seconds is a default you [can change](https://support.google.com/analytics/answer/12131703) in the tag settings.

Feasible calls a visit a bounce when it saw one page and did nothing else. An outbound click, a download, a form submission or one of your own events ends a bounce. Time on the page doesn't. That's [in our metrics docs](/docs/metrics/).

The two rules mostly disagree about one kind of visitor: the person who lands on a page, reads it for two minutes, and leaves. GA4 says they were engaged. We say they bounced.

## The same visits, counted both ways

The visits came from two sites we run: the site for a notes app, and the site for a stock-options tool. We took the four weeks to November 19, 2026, pulled the raw events from [Feasible's own export](/help/whats-in-the-export/), and left out the visits it flags as bots, the way the dashboard does.

Our script times a page only while its tab is visible and in focus. That's [what GA4 counts](https://support.google.com/analytics/answer/9234069) as engagement time too, so we applied GA4's 10 seconds to it.

| | Notes app site | Options tool site |
|---|---|---|
| Visits | 4,662 | 2,706 |
| Bounce rate, our rule | 65.0% | 75.0% |
| Bounce rate, GA4's rule | 49.2% | 54.0% |
| Visitors from search, our rule | 54.8% | 76.7% |
| Visitors from search, GA4's rule | 28.1% | 32.2% |

GA4 only counts the events you've marked as key events. We tried it both ways, with none marked and with every custom event marked, and GA4's figure moved by less than 2 points.

The gap is readers. Of the visits we called bounces, 25.6% on the notes app site and 30.5% on the options site had the page in front of them for more than 10 seconds. Half of those stayed past 35 seconds on the first site and past 75 on the second. The ones who came from search stayed longer still: half of them past 48 seconds on the notes app site, and past 93 on the options site. They searched for something, read the answer, and left.

## The order can flip, too

On the options site, by our rule, visitors from search bounced slightly more often than Direct visitors: 76.7% against 74.2%. By GA4's rule they bounced less than half as often: 32.2% against 66.7%.

Same visits. Ask which channel brings the better visitors and you'll get opposite answers depending on the rule.

It doesn't always go GA4's way, either. The options site has a screener page where a lot of people land, click something, and leave within 10 seconds. Our rule counts that click, so the page bounces 13.5% of the time. GA4's rule, with nothing marked as a key event, ignores the click and says 30.4%.

## So what's a good bounce rate?

Most answers to this question give you a range: under 40% is good, retail runs 20% to 45%, and so on. They rarely say which rule produced them, and as you've seen, the rule alone moved our numbers by 16 to 21 points.

Even under one rule, on one site, there isn't one good number. On the notes app site, our rule gives the home page 38.4% and the blog 86.0%. By channel it runs from 50.0% for visitors from social posts to 82.2% for visitors from paid social ads. Neither end is broken. A blog post that answers a question and loses the reader afterwards did its job.

A good bounce rate is one you compare with itself. The same page, the same source, the same tool, this month against last month. If it climbs and nothing else changed, go and look at the page. If you're deciding whether to rewrite a landing page, split its bounce rate by source first, because visitors from some places leave fast whatever the page says.

If you want to know whether people are reading, bounce rate isn't the number. Look at time on the page or [scroll depth](/help/what-is-scroll-depth/) next to it.

## If you're moving off GA4

Expect the number to move on the day you switch. On our two sites the same visits went up 16 and 21 points from the rule alone. A site where people click something in the first few seconds could move the other way.

So compare after with after. Don't put your new tool's bounce rate next to GA4's from last year and decide the site got worse.

In Feasible, you'll see that step in your own chart if you [bring your GA4 history across](/migrate/from-google-analytics/). The import takes GA4's sessions and engaged sessions, so the months before the switch are counted GA4's way and the months after are counted ours. A bounce still has a duration in Feasible, because the script keeps timing the page, so you can see which bounces were people reading.
