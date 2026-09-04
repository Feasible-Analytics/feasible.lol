---
title: "Feasible vs Fathom"
seotitle: "Feasible vs Fathom Analytics — price, limits, features"
description: "Fathom's smallest plan is $150 a year and starts at 100,000 pageviews. Feasible is $99 for ten times that. Prices, limits and where Fathom wins."
lede: "Fathom's smallest plan is bigger than most sites need. Here's what that costs, and the two things they do that we can't."
versus: "Fathom"
checked: 2026-09-03
weight: 30
verdict: |
  If your visitors are in Europe and you want their data to stay there, Fathom's
  EU isolation is free on every plan and we have no equivalent — that alone can
  decide it. If you're a small site paying their 100,000-pageview minimum, or a
  big one paying $600 a year, or you want the source code, we're the cheaper and
  more open answer.
faq:
  - q: "How much does Fathom cost?"
    a: >-
      Their smallest plan is $15 a month, or $150 a year, and it starts at
      100,000 pageviews a month — there's nothing below that. A million
      pageviews is $600 a year. Read from their pricing page on September 3,
      2026.
  - q: "Do custom events count against Fathom's pageview limit?"
    a: >-
      Yes. Their FAQ says custom event and API requests "will be counted as if
      they were pageviews." Ours works the same way — a million pageviews and
      custom events a month, between them. The unit is the same on both sides;
      the price is $600 a year there and $99 here.
  - q: "Is Fathom open source?"
    a: >-
      The hosted product is closed source. "Fathom Lite" on GitHub is
      MIT-licensed and still online, and Fathom says it fixes bugs in it, but it
      has had no code changes since January 2023 and it uses cookies. Feasible
      is AGPL-3.0-or-later, and the build we host is the build you can run.
  - q: "Does Feasible have EU data isolation like Fathom?"
    a: >-
      No. Cloudmanic Labs is in Oregon, and international transfers run on
      standard contractual clauses through our DPA. Fathom routes EU visitors to
      EU servers on every plan at no extra cost. If EU processing is a
      requirement, buy theirs.
---

Fathom has been doing privacy-friendly analytics since 2018 and has the scars to
prove it. Their EU isolation work is real engineering that most of this market
hasn't bothered with. Start there, because it's the reason to buy theirs.

Now the prices.

## The price, at every volume

From [Fathom's pricing page](https://usefathom.com/pricing), read September 3,
2026. Annual is ten times monthly.

| Pageviews / month | Fathom | Feasible |
|---|---:|---:|
| 10,000 | $150 | **$99** |
| 100,000 | $150 | **$99** |
| 500,000 | $450 | **$99** |
| 1,000,000 | $600 | **$99** |
| 5,000,000 | $1,400 | Talk to us |
| 10,000,000 | $2,000 | Talk to us |

Annual USD, list price, before tax.

**Fathom has no plan below 100,000 pageviews a month.** That's the line worth
noticing. A blog doing 5,000 pageviews pays the same $150 a year as a site doing
twenty times its traffic. If you're small, you're buying a plan sized for
somebody else.

At a million pageviews a month it's $600 against $99. Six times.

## The unit is the same. The price isn't.

Fathom is direct about what counts, which we appreciate. From their pricing FAQ:

> "If you decide to use our custom event tracking system on your website or use
> our API, those requests will be counted as if they were pageviews."

We count the same way. A million pageviews and custom events a month, between
them — including the outbound clicks, downloads and form submissions our script
fires on its own. There's no unit argument to make here, and we're not going to
invent one.

So it comes down to the tier you land on. Say you run a SaaS marketing site at
90,000 pageviews a month and you track signups, trial starts, plan changes and
doc searches — 20,000 events. That's 110,000 on both meters. On Fathom it puts
you in the 200,000 tier at $250 a year. On ours it's 110,000 against a million,
and the bill is $99 either way.

Instrument harder and Fathom's number moves up the ladder. Ours doesn't move
until you're ten times busier than that.

## Side by side

| | Feasible | Fathom |
|---|---|---|
| Smallest plan | $99/yr, any traffic | $150/yr, 100k pageviews |
| At 1M pageviews/mo | $99/yr | $600/yr |
| Billing unit | Pageviews + custom events | Pageviews + custom events |
| Sites | Unlimited | 50 included, 75 at the 1M tier |
| Extra sites | n/a | $100/yr per pack of 50 |
| Team members | Unlimited, 5 roles + guests | Not published on the pricing page |
| Retention | 5 years | "Forever," while you're a customer |
| API | Yes, 10,000 req/hr | Yes, 600 req/hr |
| Funnels | Yes | No |
| Custom properties | Yes | No |
| Webhooks | Yes | No |
| MCP server | Built in | No |
| Dropped-event log with reasons | Yes | No |
| Self-hosting | Yes, the same build we run | No |
| Source code | AGPL-3.0-or-later | Closed |
| EU data isolation | **No** | Yes, free on every plan |
| Cookies on visitors | None | None |
| Session replay, heatmaps, A/B tests | No | No |
| SSO | No | Not published |
| Mobile SDKs | No | No |
| Trial | 30 days, no card | 7 days |

## The open-source difference, stated carefully

Fathom's hosted product is closed source. That's a business model, not a flaw —
plenty of good software is closed.

But it does mean there's no version of Fathom you can run yourself if they ever
stop, get acquired, or price you out. "Fathom Lite" on GitHub is MIT-licensed
and still up, and Fathom says they'll keep fixing bugs in it, but it has had **no
code changes since January 2023**, and it uses cookies — the hosted product
doesn't. It isn't the product.

Feasible is AGPL-3.0-or-later, and the build we host is the build you can run.
There's no cut-down edition and no feature held back for the paid plan. One Go
binary, one SQLite file, 512 MB of RAM. If we disappear, you keep running it.
That's the point of it being there — see [open source](/open-source/) for the
whole argument, including what AGPL actually asks of you.

## Where Fathom wins

**EU isolation, free on every plan.** European visitors' pageviews are routed to
EU servers, and Fathom says the IP address is stripped inside the EU and never
reaches their US infrastructure. We don't have this. Cloudmanic Labs is in
Oregon; our transfers run on standard contractual clauses through our DPA. If
your legal team wants EU processing, Fathom answers that and we don't.

**"Forever" retention.** While you're a customer, your full history stays
available. Ours is five years. Theirs is better.

**A longer track record.** Years more production time, a large paying customer
base, and a company that has publicly worked through the compliance questions in
detail. If you want the boring, proven option in this category, that's a real
argument.

**Their script is smaller than ours.** Measured the same day with `gzip -9`:
Fathom 2,092 bytes, Feasible 3,377. They win it.

**Their over-limit policy is good.** They don't switch your analytics off over a
traffic spike. Neither do we — we email you, and nothing stops mid-month. We're
not claiming an edge here; both approaches are humane.

## The thing neither of you can see on a pricing page

Every analytics tool drops traffic. Bots, scrapers, datacenter addresses,
browsers too old to trust, requests from a hostname you never registered. That's
correct behavior — you don't want a crawler in your visitor count.

The question is whether you can find out.

Feasible has a health screen for every site that counts the last 24 hours of
dropped events and gives each one a named reason: `bot`, `datacenter_ip`,
`referrer_spam`, `outdated_browser`, `automation`, `hostname_not_allowed`,
`shield_ip`, `rate_limited`, and a dozen more. It tells you which address it
resolved for your last request and from which header. It warns you if your
reverse proxy isn't forwarding visitor addresses — the failure that quietly
collapses every visitor into one and geolocates them all to your datacenter. And
there's a button that fires a real test event through the public URL, so it
exercises your proxy and headers exactly the way a browser would.

Nobody else in this comparison publishes a counted, reasoned drop log. It's the
difference between "the numbers look low this week" and "347 events were
rejected because `staging.example.com` isn't on your hostname list, here's the
button to allow it."

## Moving over

Feasible imports CSV and ZIP uploads. There's no Fathom-specific importer —
export your data from Fathom and bring it as CSV, and pages, sources, locations,
devices and browsers land on the same charts as your live traffic.

Both scripts are a single tag in your `<head>`, so you can run them side by side
for a week and compare the numbers before you cancel anything. We'd recommend
it. Two tools counting the same traffic will never agree exactly — different bot
filters, different session rules — and it's better to see that gap on your own
site than to read about it.

## Where we'd tell you to pick us

You're small and you don't want to pay a 100,000-pageview minimum. You're large
and $600 a year for counting pageviews looks like a lot. You run more sites than
a pack of 50. You want funnels, custom properties and webhooks. You want the
source.

That's it. It's not a long list, and it's mostly about the bill.

More: [the whole price ladder](/compare/pricing/) across every vendor, or
[what Feasible does](/features/) with the gaps listed.
