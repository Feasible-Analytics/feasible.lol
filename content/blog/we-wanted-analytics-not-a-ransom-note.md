---
# Created: 2026-09-05
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "We wanted analytics, not a ransom note"
slug: "we-wanted-analytics-not-a-ransom-note"
description: "We loved Plausible. An unexpected traffic increase, a forced upgrade, and a warning that came too late led us to build Feasible. Here's the story."
lede: "We were happy paying for analytics. Then keeping access to the dashboard meant paying more. That's how Feasible started."
date: 2026-09-05
author: "Spicer Matthews"
---

I paid for a year of analytics in March. A few months later, I was told I'd have to pay more to keep using the dashboards.

That's a strange way to thank a paying customer.

It's also how we ended up building an analytics company. Which wasn't on the list of things I wanted to do.

At Cloudmanic Labs, we'd spent years looking for analytics we liked. We started with Google Analytics, where checking a few numbers always seemed to require more work than it should. We moved to <a href="https://clicky.com/" rel="nofollow">Clicky</a> and happily paid for it. It was great for a while, then became less of a fit. After that, we hosted Matomo ourselves.

Self-hosting gave us another piece of software to maintain. We already had enough of those.

Then we found <a href="https://plausible.io/" rel="nofollow">Plausible</a>.

One page. The numbers we wanted. No cookies. A product we could open, understand, and close. I liked it immediately, and I liked paying for it. Someone had made a small, useful thing and resisted turning it into a cockpit.

For the first year or so, we paid about $100 a year. Fine. Later, some features we wanted required a plan around $200 a year. I wasn't thrilled about doubling the bill, but the features were useful and we wanted to support the company.

We paid it.

Then we released [herdr plus](https://herdrplus.com/), an open-source plugin. We put it out into the world and moved on to other work. People liked it. The website got more traffic than we'd expected.

Nice problem to have. Or so I thought.

Between that project and our other small sites, our usage went over our Plausible allowance. The next plan we were asked to buy was about $400 a year.

That was my limit. I'd already stretched what I thought this was worth at $200. I wasn't going to double it again because a free project got some attention.

I understand the argument for charging more as a customer grows. More traffic can mean more business. But this was a collection of small websites and a free plugin. Our analytics count had grown. Our ability to pay hadn't doubled with it.

Other customers will look at that bill and think it's reasonable. Good for them. It wasn't reasonable for us.

The price alone would've been a reason to leave eventually. The way we found out made me want to leave immediately.

Plausible publishes its policy. I want to be fair about that. Its <a href="https://plausible.io/docs/subscription-plans#traffic-spikes-and-overages" rel="nofollow">current documentation</a>, checked September 5, 2026, says one month over the limit is fine. Two consecutive months over triggers an upgrade notice. A week after that notice, dashboards can be locked if you haven't upgraded. Collection continues, and settings remain accessible. Usage returning within the limit can restore dashboards at the next billing cycle.

So yes, there's a grace period. The trouble was that I didn't know we were in it.

I hadn't received an early warning email. I hadn't seen a banner telling me we were over our allowance while there was still time to bring usage down. The email and dashboard notice I got were the ones telling me an upgrade was now required.

We have a bunch of sites. I log in to look at one of them, answer a question, and leave. I don't add up every site's pageviews and custom events in my head. The combined usage number exists in account settings. It wasn't part of my daily routine.

An email after the first month would've done the job: you've gone over, here's what's contributing, and here's the time you have to fix it.

I could've stopped tracking the plugin's website. I didn't particularly care about its analytics. A small adjustment would've put us back where we'd been for years.

By the time I knew there was a problem, reducing future traffic wouldn't immediately undo the upgrade requirement. The offer in front of me was to pay more or lose dashboard access.

It felt like a ransom note.

I'd paid for the year in March. Canceling wouldn't give me back the remaining months of useful dashboard access I thought I'd bought. Paying more would let me keep using it. I was also told I could downgrade again once usage came down and have the difference credited as additional time.

I didn't want additional time. I wanted to use the time I'd already paid for.

I contacted support and explained all of this. I acknowledged that we were probably an edge case. I could remove the extra site from tracking. Our normal usage hadn't suddenly become a different business.

The replies were slow, in my experience, and the answer left me facing the same upgrade. That disappointed me more than it would've from a company I didn't care about. I'd liked supporting a business funded by its customers. I expected more room for a conversation when one of those customers had a small, fixable problem.

A published policy can still treat a customer badly. Being able to point to the rule doesn't make the outcome feel fair.

And this was a small problem. A couple hundred dollars a year. A dashboard. I'm aware of how that sounds. But small problems are also opportunities to make a customer glad they chose you.

Instead, I started looking for the exit.

Plausible has an open-source edition, so I considered running it myself. After looking through the backend and working out what I'd want to rent to run it, I didn't see enough savings to justify taking on the maintenance. For our setup, I was getting uncomfortably close to paying for hosted analytics again.

I'd already done the self-hosted analytics chapter. I didn't want a sequel with more infrastructure.

[Fathom](https://usefathom.com/) looked promising. Its pricing felt more reasonable to me. But it was missing a few things I wanted, and I didn't like the dashboard's appearance. I went far enough to make a [Chrome extension that restyled it](https://github.com/Feasible-Analytics/fathom-plausible-theme).

That's how much I wanted to buy somebody else's product. I was writing a browser extension to make myself comfortable with one.

Eventually, I had to admit how much time I was spending avoiding the obvious next step.

We've been building software at Cloudmanic Labs for twenty years. We've run large systems. Keeping an analytics service online wasn't unfamiliar work. Building software that uses a modest amount of hardware is something we know how to do.

The more I looked at the numbers, the less I could justify the prices to myself. <a href="https://plausible.io/#pricing" rel="nofollow">Plausible Business</a> at a million monthly pageviews is $1,390 a year, checked September 5, 2026. That includes up to ten sites. We weren't doing that volume. I was looking at where the ladder went.

I don't know Plausible's profit margin. A server bill isn't the whole cost of a company. Support, development, backups, and keeping the service available all cost money. We pay those bills too.

But we also know what it takes to [store and count this much traffic](/blog/what-it-costs-to-count-a-million-pageviews/). We believed we could charge a fraction of that price and run a profitable business. So we built one.

Feasible is [$99 a year](/pricing/). Unlimited sites and teammates. A million pageviews and custom events a month, combined. A dashboard you can understand without making an afternoon of it.

And because I know what it feels like to discover a grace period after it's gone, we send usage emails at 70%, 85%, and 100%. If you stay over the allowance, [we ask you to reply](/help/what-happens-if-i-go-over-a-million-pageviews/). Replying stops the lock timer so we can talk through what's happening.

We have limits too. We want you to know about them while you can still do something about them.

The name? Yes, Feasible is a poke at Plausible. The .lol makes it a little less subtle.

I wanted analytics at a price I felt good about paying, from a company I felt good about paying. We couldn't find that combination anymore.

Now it's our job to be that company.

— Spicer Matthews, Cloudmanic Labs
