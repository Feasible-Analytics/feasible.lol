---
# Created: 2026-09-05
# Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.
title: "We wanted analytics, not a ransom note"
slug: "we-wanted-analytics-not-a-ransom-note"
description: "We loved Plausible. An unexpected traffic increase, a forced upgrade, and a warning that came too late led us to build Feasible. Here's the story."
lede: "We were happy paying for analytics. Then keeping access to the dashboard meant paying more. That's how Feasible started."
date: 2026-09-05
checked: 2026-09-05
author: "Spicer Matthews"
---

I paid for a year of analytics in March. By summer, the dashboards I'd already bought were behind a bigger number.

That's a strange way to thank a paying customer.

It's also how we accidentally started an analytics company. Which, I want to be clear, was nowhere on my list.

## Twenty years of not finding it

At [Cloudmanic Labs](https://cloudmanic.com?utm_source=feasible.lol) we'd been shopping for analytics we actually liked for most of two decades. It went about how you'd expect.

| What we used | How it ended |
|---|---|
| Google Analytics | Checking three numbers took a scavenger hunt |
| <a href="https://clicky.com/" rel="nofollow">Clicky</a> | Genuinely good for years. We drifted apart |
| Self-hosted <a href="https://matomo.org/" rel="nofollow">Matomo</a> | Congratulations, you now maintain a database |

That last one deserves a note. Self-hosting didn't save us money so much as convert money into chores. We already had plenty of chores.

Then we found <a href="https://plausible.io/" rel="nofollow">Plausible</a>.

One page. The numbers we wanted. No cookies. A product you could open, understand, and close. Somebody had built a small useful thing and resisted the urge to turn it into a cockpit, and I respected that enormously. I liked it immediately. I liked paying for it more.

I want that on the record before anything else, because everything after this is going to sound like a complaint.

## The ladder

Here's the part where a story about analytics becomes a story about arithmetic.

| When | What we paid | Why |
|---|---|---|
| Year one | ~$100/year | The plan we signed up for |
| Later | ~$200/year | Features we wanted moved up a tier |
| Then | ~$400/year | A free plugin got popular |

The jump to $200 stung a little. I paid it anyway, partly because the features were useful and partly because I wanted the company to exist. Voting with your wallet, and all that.

Then we released [herdr plus](https://herdrplus.com/), an open-source plugin. We put it out into the world and went back to work.

People liked it. The site got traffic.

Nice problem to have.

> Our pageview count doubled. Our revenue from those pageviews stayed exactly zero.

Between the plugin's site and our other small ones, we sailed past the allowance. The next rung on the ladder was about $400 a year.

That was my limit. I'd already stretched what I thought this was worth at $200. I wasn't going to double it again because we gave something away for free and it worked.

I understand the argument for charging more as customers grow. More traffic often means more business. It's a reasonable model and I'm not going to pretend otherwise.

It just didn't describe us. Our traffic doubled. Our bank account did not get the memo.

Plenty of customers look at that bill and find it perfectly fair. Good for them, sincerely. It wasn't fair for us.

## The part that actually made me leave

The price alone would have moved us eventually. The way I found out moved us immediately.

To be completely fair: Plausible publishes the policy. It's right there. Its <a href="https://plausible.io/docs/subscription-plans#traffic-spikes-and-overages" rel="nofollow">current documentation</a>, checked September 5, 2026, says one month over the limit is fine. Two consecutive months over triggers an upgrade notice. A week after that notice, dashboards can be locked if you haven't upgraded. Collection keeps running, settings stay accessible, and usage coming back under the limit can restore dashboards at the next billing cycle.

So there's a grace period. A generous one, honestly.

I just didn't know I was standing in it.

I hadn't gotten an early warning email. I hadn't seen a banner telling me we were over while there was still time to do something. The first message I received was the one telling me the upgrade was now required.

Which is a bit like being handed a speeding ticket by a cop who's been following you silently for two months.

We run a bunch of sites. I log in, look at one number, answer the question I came in with, and leave. I do not sit there mentally adding up pageviews and custom events across every property like a man doing his taxes for fun. The combined usage total exists in account settings. It was not part of my Tuesday.

An email after month one would have solved this entire post out of existence:

> You've gone over. Here's what's driving it. Here's how long you have.

That's it. That's the whole fix. I could have untracked the plugin's website in about ninety seconds. I didn't care about its analytics. I cared about the four sites I'd been happily paying for since forever.

By the time I knew there was a problem, dialing traffic back down wouldn't undo the upgrade requirement in front of me. The choice on the table was: pay more, or lose the dashboards.

## The word for that

I'd already paid for the year. In March. Up front.

Canceling wouldn't hand back the months of dashboard access I thought I'd bought. Paying more would let me keep using the thing I'd already paid for. I was also told I could downgrade later once usage dropped, and the difference would be credited as extra time.

I didn't want extra time. I wanted the time I'd already bought.

There is a word for "pay us more or you don't get your stuff back," and it's the title of this post.

I wrote to support and laid it all out. I said we were probably an edge case. I offered to pull the extra site off tracking. Our actual business hadn't changed, and one free side project had briefly made us look like a bigger customer than we are.

The replies were slow, in my experience, and the answer left me facing the same upgrade.

That landed harder than it would have from a company I didn't care about. I'd liked supporting a business funded by customers instead of investors. I'd assumed that meant there was a human on the other end with room to say "yeah, that's silly, let's sort it out."

> A published policy can still treat a customer badly. Being able to point at the rule doesn't make the outcome feel fair.

And look, I know the size of this. A couple hundred dollars. A dashboard. Nobody's house burned down. I'm aware of exactly how this sounds.

But small problems are cheap opportunities to make a customer glad they picked you. This one got resolved by the rulebook instead, and the rulebook lost you a customer who was writing you checks and telling his friends.

## Everything I tried instead of building this

I want to be honest about how badly I did not want to be here.

**Self-host the open-source edition.** Plausible ships one, so I read through the backend and priced out what I'd need to rent to run it properly. The savings weren't there. For our setup I was getting uncomfortably close to just paying for hosted analytics again, except now I'd also be the on-call engineer.

I'd already lived the self-hosted analytics chapter. I did not want a sequel with a bigger cast.

**Switch to [Fathom](https://usefathom.com/).** Pricing felt more reasonable to me. It was missing a few things I wanted, and I didn't love how the dashboard looked.

So I wrote a [Chrome extension to restyle it](https://github.com/Feasible-Analytics/fathom-plausible-theme).

Read that again. I built and shipped a browser extension so that I could be comfortable giving somebody else money. That is how much I wanted this to be anyone's problem but mine.

Eventually a friend had to point out that I'd spent more effort avoiding the obvious next step than the obvious next step would take.

## So we built it

We've been building software at Cloudmanic Labs for twenty years. We've run big systems. Keeping an analytics service online is not exotic work for us, and building software that runs on a modest amount of hardware is a thing we're genuinely good at.

The more I stared at the pricing, the less I could talk myself into it. <a href="https://plausible.io/#pricing" rel="nofollow">Plausible Business</a> at a million monthly pageviews is $1,390 a year, checked September 5, 2026, and includes up to ten sites. We weren't anywhere near that volume. I was looking at where the ladder went.

I don't know anybody's profit margin, and a server bill isn't the whole cost of running a company. Support costs money. Development costs money. Backups, uptime, and answering emails at 11pm all cost money. We pay those bills too, so I'm not going to stand here and pretend the number should be zero.

But we also know exactly [what it costs to store and count this much traffic](/blog/what-it-costs-to-count-a-million-pageviews/), because we wrote it all down. We ran the math on charging a fraction of that price and still having a business at the end of it.

The math worked. So here we are.

[Feasible is $99 a year](/pricing/). Unlimited sites. Unlimited teammates. A million pageviews and custom events a month, combined. A dashboard that fits on one page and doesn't require an afternoon.

{{< callout title="The part I care about most" >}}
Because I know precisely what it feels like to discover a grace period after it's over, we send usage emails at **70%**, **85%**, and **100%**. If you stay over, [we ask you to reply](/help/what-happens-if-i-go-over-a-million-pageviews/). Replying stops the lock timer so an actual person can talk it through with you.

We have limits too. We'd just like you to hear about ours while you can still do something about them.
{{< /callout >}}

Yes, "Feasible" is a poke at "Plausible." The `.lol` is us not being subtle about it.

I wanted analytics at a price I felt good about paying, from a company I felt good about paying. I couldn't find both in the same place anymore.

Now that's our job.
