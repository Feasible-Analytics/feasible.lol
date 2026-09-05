---
title: "One page, no menus, on purpose"
slug: "one-page-no-menus-on-purpose"
description: "Fifteen metrics, six tiles, one screen and no report builder. What we left out of the dashboard, and why leaving it out was the hard part."
lede: "The dashboard is one screen because we decided it would be, and then spent the rest of the time defending that."
date: 2026-08-31
checked: 2026-09-03
---

The Feasible dashboard is one screen. Six numbers across the top, one graph, four report cards, one wide card underneath. No menu. No report list. No place to go.

You've either got what you came for by then or the product has failed, and we'd rather find that out than hide it behind navigation.

## Fifteen metrics

There are fifteen metrics in the entire product: visitors, visits, pageviews, events, bounce rate, visit duration, views per visit, time on page, scroll depth, exit rate, conversion rate, group conversion rate, total revenue, average revenue, revenue per visitor.

That's it. There's no sixteenth waiting behind a menu.

Six of them are on screen the moment the page loads - unique visitors, total visits, total pageviews, views per visit, bounce rate, visit duration - and each tile is a button that redraws the graph with that metric. The other nine live where they mean something: time on page and scroll depth on pages, conversion rate on goals, revenue on revenue goals.

A metric list is a product decision disguised as a feature list. Every number you add is a number somebody has to rule out before they trust the one they wanted. Fifteen is already more than most people use.

The graph under the tiles is hand-drawn SVG. The whole dashboard has two runtime dependencies - React and React DOM. No chart library, no map library, no router, no state library. The map is generated country outlines and the flags are Unicode characters, so opening your stats page makes no request to anyone but us.

## Filters stay on the page

The other way products get big is by growing a second screen for narrowing things down. A segment builder. A saved-view list. A modal with three dropdowns.

We put filters on the page as a row of pills, and you build them by clicking things.

Click a country on the map and you're filtered to that country. Click a page row and you're filtered to that page. Click a browser and a channel and now you're looking at Firefox users from organic search on one URL, still on the same screen, still with the same six tiles at the top comparing against the previous period.

Six operators, no more: is, is not, contains, does not contain, matches regex, does not match regex. Repeated filters combine with AND, multiple values inside one filter combine with OR. Escape clears the lot.

And the filters live in the URL as readable parameters, which is the part that turns out to matter most in practice. `?f=is,country,DE&f=is,device,Mobile` is a link. You can paste it into Slack and the person who opens it sees what you saw. That's the feature that replaced saved segments, and we think it's the better one - but you should know we don't have saved segments, because some people want them.

There are thirteen date-range presets and every one has a single-key shortcut. `W` is last 7 days. `F` is last 28. `L` is last 12 months. `X` toggles comparison. `?` lists them all. A keyboard shortcut is the cheapest speed you can give somebody, and nobody has to discover it for the product to work.

## Scope changes the conversion rate

Here's the specific, unglamorous thing we care most about getting right.

Custom properties in Feasible are declared as **event-scoped** or **session-scoped**, and you pick when you create them. Event scope means the property describes one hit - the plan name on a checkout event, the file name on a download. Session scope means it describes the whole visit - the logged-in plan tier, the A/B variant, the country of the account.

That choice sets the denominator on every conversion rate you'll ever read off that property.

Say you fire `signup` with a property `source=email`, and you want the conversion rate for email traffic. If the property is event-scoped, the only events carrying `source=email` are the signups themselves - so your denominator is signups, and your conversion rate is 100%. It's a true number and it's useless, and worse, it looks fine. If the property is session-scoped, it's attached to the visit, so the denominator is everyone who arrived from email and the rate is the one you wanted.

Same data. Same query. Two very different numbers, and only one of them is the question you asked.

Most tools let you attach a property and figure this out later, usually in a meeting, usually loudly. We make you say which one it is at creation time and we show the scope next to the property name in the report, because a conversion rate with an unexamined denominator isn't a metric, it's a rumor.

The same instinct shows up elsewhere. Ask for bounce rate broken down by page and Feasible refuses the query rather than answering it - bounce is a property of a visit, not of a page, and a number that quietly redefines itself to fit your breakdown is worse than an error message. And events that didn't carry a property land in a labeled `(none)` row instead of silently vanishing from the total, so the column adds up to what you think it adds up to.

## What you give up

Plainly, because you'll find out anyway. Every argument for [simple web analytics](/simple-web-analytics/) has a bill attached, and this is ours.

**You can't build an arbitrary custom report.** There's no report builder, no drag-and-drop dimension canvas, no saving a view and naming it. If your job is to answer a question nobody has asked before, in a shape nobody has used before, this is the wrong screen.

**There's no saved segment list, no session replay, no heatmaps, no cohort or retention report, and no A/B testing.** Referrer is a filter, not its own report card. There's no search-terms report either - you can connect a Search Console account, but nothing pulls the data across and nothing would read it back if it did.

Some of those are missing because we haven't built them. Some are missing because we don't think they belong in a tool this size, and session replay is the clearest case: a recording of one person's session is a different product with a different privacy story, and the UK's own analytics exemption draws the line in that place.

The escape hatch is that we didn't lock the door. The [Stats API](/features/) is in every plan and every build - there's no plan check in that code at all - and raw event export is a button that produces a ZIP with the roll-up CSVs and the raw rows. So when you do need the arbitrary report, you take your data and build it somewhere designed for arbitrary reports. That's a better answer than us growing a worse version of that product inside this one.

## Who shouldn't use this

If you're an analyst who lives in explorations, you'll be bored in an hour. If you need session recordings or heatmaps to do your job, we don't have them and won't pretend otherwise. If you have a genuine attribution modeling problem across paid channels, that's a different category of tool and you should buy it.

If you run a site, and once a week you want to know which pages people read, where they came from, and whether the thing you changed worked - that's the whole design brief, and it fits on one screen.

The trade was never "fewer features, cheaper price." It was that every feature we add is a feature somebody has to walk past on the way to their answer. We just decided to count that as a cost.

[See what's in it](/features/), or [what it costs](/pricing/).
