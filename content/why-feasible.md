---
title: "Why we built Feasible"
seotitle: "Why we built Feasible — the arithmetic behind $99 a year"
description: "Counting pageviews costs about 210 bytes each. The industry charges hundreds of dollars a month for it. Here's the arithmetic, and what we did instead."
lede: "A pageview costs about 210 bytes to keep. Here's how that turned into a $1,390 invoice, and what we did about it."
checked: 2026-09-03
---

A pageview costs about 210 bytes to store. That's the whole record — which page,
where they came from, which country, which browser, what size screen, and the moment
it happened.

A million pageviews a month, kept for a full year, is about 3.5 GB. One file.

We measured the rest of it too, because we wanted to know. One process accepts around
6,000 events a second and takes about 13 microseconds to decide on one. The minimum
server is a single CPU core with 512 MB of RAM and a gigabyte of disk. None of that
is a clever engineering result. It's what you get when the job is "add one to a
number" and nobody has built a cluster to do it.

Counting pageviews is cheap. It has always been cheap, and it got cheaper every year
for twenty years.

## What that costs to buy

Here's what a million pageviews a month costs, per year, on the vendors' own
published pricing pages, checked September 3, 2026:

| Plan | A year |
|---|---|
| [Umami Cloud — Pro](https://umami.is/pricing) | $240 |
| [Pirsch — Standard](https://pirsch.io/pricing) | $540 |
| [Fathom](https://usefathom.com/pricing) | $600 |
| [Simple Analytics](https://www.simpleanalytics.com/pricing) | $600 |
| [Plausible — Business](https://plausible.io/#pricing) | $1,390 |
| [Matomo Cloud](https://matomo.org/pricing/) | $2,040 |

Plausible has cheaper plans; Business is the first one that includes custom
properties, funnels and the Stats API, which is why it's the row that compares. The
[full ladder is here](/compare/pricing/), with every figure linked to the page it
came from.

So: a 3.5 GB file, on a server that rents for about $6 a month, and a sticker price
that runs from $240 to $2,040 a year. The hardware got cheaper every year for two
decades. The invoice went the other way.

## The part where we're fair

Not all of that gap is nothing. Some of it is real work, and pretending otherwise
would make this page as dishonest as the thing it's complaining about.

Writing a pageview is cheap. *Reading* a year of them quickly is not — that's why
every serious tool in this category, ours included, keeps pre-built roll-ups instead
of scanning raw rows. Support costs money. So does somebody being awake when the
ingest tier stops accepting events at two in the morning. Bot filtering is a
never-finished job. Bandwidth, email, card processing, tax in forty jurisdictions —
all real.

And the privacy-friendly analytics companies did the hard, unglamorous thing first.
They demonstrated that you can measure a website without following anyone around
the internet, and they made that argument in public, to regulators, while the rest of
the industry shipped another consent banner. They were right. We build the same way
because of it, and we'd rather say so plainly than pretend we arrived at cookieless
analytics alone.

None of that is fourteen times.

## About the name

We bought a `.lol` domain because the joke was already being told. We just wrote it
on the door.

It isn't a joke at anyone's product and it isn't a joke at your expense. It's about a
bill that stopped having any relationship to what the thing costs to run — and about
how normal that became, so gradually that a slider on a pricing page now feels like
an explanation. Put a number next to it and the punchline writes itself. That's why
this page leads with arithmetic instead of adjectives: the number has to do the work,
or the domain is just attitude.

The other reason the joke is in the name is that it points back at us. If Feasible
ever drifts into the same shape — a starter tier that can't do the thing you bought
it for, a price that climbs while the hardware gets cheaper — the URL will still be
sitting there, telling on us.

## We were customers first

Cloudmanic Labs has been building and running software for more than twenty years. We
run our own products, including [Harbor](https://harbor.my), a notes app. We're
also, unavoidably, our own customers: every one of those sites needs to know whether
anybody read the thing we shipped.

That's where this started. We run more than one site — and on nearly every published
ladder in this category, a second site is a different plan, a per-site fee, or both.
Add a teammate and it moves again. Want to know which of your custom events converted
and read the answer back through an API? That's usually the top tier.

At some point the question stopped being "which tool is best" and became "why is the
line for counting visits bigger than the line for serving the pages." We couldn't
answer it. So we went and measured what it actually costs, and the numbers at the top
of this page are what came back.

## What we did instead

**One plan.** $9.99 a month, or $99 a year. There's no starter tier that can't do
funnels, no growth tier that adds three seats, no business tier that finally hands
over the API. [Everything is in the one price](/pricing/).

**Two things counted.** Pageviews and custom events, a million a month between them.
Custom properties never count, however many you attach, and neither do the engagement
pings, sites, seats, goals or funnels. That's deliberate: the number you're billed on
shouldn't depend on how carefully you described a purchase.

**Nothing held back.** The API, raw event export, webhooks, the MCP server, funnels,
teams — the same build whether we host it or you do. There's no enterprise directory
in the repository that you aren't allowed to compile, because
[there's no directory like that at all](/open-source/).

**It tells you when it's broken.** Every event we drop gets counted and given a
reason you can read: bot, datacenter address, a shield you set, a hostname you
haven't allowed yet. Analytics that quietly loses a third of your traffic is worse
than no analytics, because you'll trust it.

**A limit that emails you instead of switching off.** Go over the million and
we send a note. One month over costs nothing. Nothing is ever throttled, sampled away
or deleted, and there's no overage charge, because that code doesn't exist.

## The honest catch

We're small, we launched recently, and we don't have a decade of uptime to point at.
If what you need is an account manager and a signed availability number, we're not
that yet, and [we'd rather say so on this page](/about/) than in a support reply
three months from now.

What we can offer instead is the source code, an export button that works in every
state your account can be in, and a price that doesn't require a spreadsheet.

Counting pageviews was always cheap. We priced it like it.
