---
title: "Feasible vs Umami"
seotitle: "Feasible vs Umami — Price, Event Counting, Licence"
description: "Umami is MIT-licensed and has a free tier — both genuinely better than ours. It also counts every stored event property as an event. Compared, honestly."
lede: "Umami's licence is more permissive than ours and its free tier is real. Its meter counts every stored event property. Both of those are worth knowing."
versus: "Umami"
checked: 2026-09-03
weight: 60
verdict: |
  If you're self-hosting and the licence matters to you, take Umami — MIT is
  more permissive than our AGPL and that isn't a close call. If you want a free
  tier for a hobby site, take Umami. If you're paying, want annual billing, more
  than two years of history, more than ten seats, or a limit that doesn't grow
  every time you attach a property to an event, we're the better deal at $99
  against $240.
---

Start with the two things Umami does better, because they're not small.

**Umami is MIT-licensed.** The whole repository, since 2020. Feasible is
AGPL-3.0-or-later. MIT is more permissive than AGPL — you can modify Umami, run
it as a service for other people and keep your changes to yourself, and our
licence says you can't. If licence permissiveness is what you're optimising for,
this comparison is already over and Umami won it.

**Umami has a free tier.** Hobby is $0, one website, 100,000 events a month, six
months of retention. We have no free plan — a 30-day trial with no card, and
then $9.99. For a personal blog, free beats $99 and we're not going to pretend
otherwise.

Now the rest.

## The price

From [Umami's pricing page](https://umami.is/pricing), read September 3, 2026.

| | Umami | Feasible |
|---|---|---|
| Free | Hobby — 1 site, 100K events/mo, 6 months | 30-day trial, no card |
| Paid | **Pro — $20/mo**, 1M events, 20 sites, 10 seats, 2 years | **$9.99/mo or $99/yr**, unlimited sites and seats, 1M pageviews, 5 years |
| Bigger | Business — $200/mo, 10M events | Talk to us |

**Umami has no annual billing.** Their FAQ: "Billing occurs on a monthly basis
and you can cancel at any time." So Pro is $240 a year against our $99, and
Business is $2,400.

Umami is the closest thing to us on price in this whole comparison — 2.4 times,
not 14 or 20. That's worth saying plainly instead of burying it.

## What counts as an event

Here's the difference that actually moves money, and it's in Umami's own words:

> "Usage is measured by counting pageviews to a website plus any custom events
> or custom event properties stored. Each website pageview counts as one event.
> If you save event properties, **each data property stored counts as one
> event**."

Read that last sentence again, because it's the thing nobody checks before they
sign up.

Say you fire a `purchase` event with five properties on it — plan, currency,
amount, coupon, referrer. That is **six events** against your limit. One for the
event, five for the properties.

Work it through on a real shop. 700,000 pageviews a month. 20,000 purchases,
each carrying those five properties. 30,000 signups carrying two.

| | Umami's meter | Feasible's meter |
|---|---:|---:|
| Pageviews | 700,000 | 700,000 |
| Custom events | 50,000 | 0 |
| Event properties | 160,000 | 0 |
| **Total against the limit** | **910,000** | **700,000** |

Add a sixth property to your purchase event and you're at 930,000. Add a
seventh and you're closer to the Pro ceiling still, on identical traffic.

Feasible counts pageviews. That's it. Custom events, custom properties, goal
conversions and the engagement pings behind scroll depth and time on page are
all outside the limit, on purpose, so describing your business properly in your
analytics never costs more.

## Side by side

| | Feasible | Umami Cloud |
|---|---|---|
| Paid price | $9.99/mo · **$99/yr** | $20/mo · **$240/yr** (no annual discount) |
| Free tier | No | Yes — 1 site, 100K events, 6 months |
| Billing unit | **Pageviews only** | Events — pageviews + custom events + each stored property |
| Sites | Unlimited | 20 on Pro |
| Team members | Unlimited, 5 roles + guests | 10 on Pro |
| Retention | 5 years | 2 years on Pro, 5 on Business |
| API access | Every plan | Pro and up |
| Data import | Every plan | Pro and up |
| Session replay | **No** | Business — 5,000 included, then $0.005 each |
| Heatmaps | **No** | Business and up |
| SSO / SAML | **No** | Enterprise |
| Webhooks | Yes | Not published |
| MCP server | Built in | Not published |
| Dropped-event log with reasons | Yes | No |
| Data location | United States | United States and EU |
| Licence | AGPL-3.0-or-later | **MIT** |
| Self-hosted = hosted build | Yes | No — see below |
| Trial | 30 days, no card | 14 days |

## Self-hosting

Umami self-hosts on Node.js 18.18 or newer plus PostgreSQL 12.14 or newer. Two
containers. Of everyone in this comparison, Umami is the one whose self-hosting
story we respect most — it's light, it's documented, and it works.

Feasible is one Go binary and one SQLite file. No Node, no Postgres, no
container required. 1 core, 512 MB of RAM. One process instead of two isn't a
revolution, and we're not going to dress it up as one.

The difference that does matter is what's in the build. From
[Umami's own FAQ](https://umami.is/pricing):

> "Cloud also includes additional features like email reports and the streaming
> API that are **not available in the self-hosted version**."

Feasible's self-hosted build is the build we host. Every feature, every release,
no licence key, no cut-down edition, and no directory in the repo you're not
allowed to compile. Set `FEASIBLE_APP_HOSTED=false` and everything works —
funnels, custom properties, the API, webhooks, MCP, raw export, teams. See
[open source](/open-source/) for what that does and doesn't promise.

## The script

Measured September 3, 2026 with `gzip -9`: Umami 2,307 bytes, Feasible 3,377.
Theirs is smaller. Both are small enough that it isn't the reason to choose
either one — the number that matters in this category is Google's 148,451.

## Where Umami wins

The MIT licence, plainly. A free tier we don't have. Session replay and heatmaps
on their Business plan, neither of which we offer at any price. A smaller
script. A much bigger GitHub community and more years in the wild.

## Where we'd tell you to pick us

You want annual billing and $99 instead of $240. You want more than two years of
history. You have more than ten people or more than twenty sites. You attach
properties to your events and would rather that didn't inflate your bill. Or you
want the self-hosted build to be identical to the hosted one, with nothing held
back.

More: [the whole price ladder](/compare/pricing/), or
[what's in Feasible](/features/) including what isn't.
