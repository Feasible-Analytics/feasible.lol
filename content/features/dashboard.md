---
title: "The one-page dashboard"
description: "Six numbers, a graph and five reports on one screen. Click any row to filter everything else, and every filter lives in the URL."
lede: "Everything Feasible collects is on one page. Click any row and it filters the rest of it."
weight: 10
shot: "app/dashboard-light.png"
shotAlt: "The Feasible dashboard for northwind.example: six metric tiles reading 19k unique visitors, 20k total visits, 47k total pageviews, 2.34 views per visit, 57% bounce rate and 2m 49s visit duration, a line graph of the last 28 days above Top Sources and Top Pages cards."
note: |
  You can't rearrange it. There's no widget grid, no saved layouts and no
  custom-metric builder — every account sees the same dashboard. Scroll depth,
  time on page, exit rate and the revenue metrics never appear in the tiles or
  the drawer's columns either; they're in the query engine and the API instead.
---

Everything Feasible collects lives on one screen. Six numbers across the top, a
graph under them, five report cards below that.

There's no menu, no report builder and no tab hiding the thing you came for.
Click a row — a country, a page, a browser — and it becomes a filter on
everything else on the page.

## The six numbers

Unique visitors, total visits, total pageviews, views per visit, bounce rate,
visit duration. In that order, always.

Every tile is a button. Click it and the graph redraws on that metric. All six
are graphable, which sounds like table stakes and isn't — plenty of tools graph
one number and print the other five as text.

The graph itself is hand-drawn SVG. No charting library, which is part of why
the dashboard ships two runtime dependencies in total. The bucket still in
progress is drawn dashed, so today never looks like a crash. A period with no
data draws a gap rather than a zero, because a zero is a claim and a gap is the
truth. Press `I` to cycle the bucket between auto, hour, day, week and month.
Minute isn't in the list — that's what realtime is for.

Comparison is on by default and set to the previous period. The other two
choices are year over year and none. Change chips appear on all six tiles, and
when the earlier period had no traffic it says so rather than printing an
infinite percentage.

## Five cards

**Top sources** — channels, sources with favicons, and a campaigns group split
into UTM source, medium and campaign. Each campaign tab excludes untagged
traffic outright, so a campaign report contains only campaigns.

**Top pages** — pages with their titles on a companion line, entry pages, exit
pages.

**Locations** — a map, then countries, regions and cities. The map is an inline
SVG choropleth on a five-step logarithmic scale, and the legend tells you how
many countries were too small to draw rather than quietly leaving them out.
Every country with traffic is keyboard-reachable in traffic order.

**Devices** — browsers and versions, operating systems and versions, device
types and screen sizes, plus languages.

**Behavior** — the full-width card at the bottom, with four tabs:
[goals](/features/goals-and-funnels/),
[custom properties](/features/custom-properties/), funnels, and Explore, the
journey report that shows where people went before and after any page.

Any card's "Details" opens a drawer on the right: 100 rows a page, a search box,
sortable columns for visitors, visits, views, bounce rate and average visit, and
a "break down by" select that splits any row by country, city, device, screen
size, browser, operating system, language, channel or source.

## Filters live in the URL

Six operators: is, is not, contains, does not contain, matches regex, does not
match regex. Repeated filters AND together, several values inside one filter OR.

All of them end up in the address bar as readable parameters —
`?f=is,country,DE&f=is,device,Mobile`. That's the share button. Paste the URL
into Slack and whoever opens it sees the exact view you were looking at. Escape
clears the lot.

The date menu holds 13 ranges, each on one key: `D` today, `W` last 7 days, `F`
last 28, `M` month to date, `Y` year to date, `L` last 12 months, `A` all time.
Last 28 days is the default. Press `?` for the whole list of shortcuts, `0` to
switch sites, `/` to jump to the nearest search box.

Pick Realtime and the tiles are replaced by current visitors over the last five
minutes, then visitors, views and events over 30 minutes, with a pageviews-per-
minute graph read from raw events and refreshed every 30 seconds. A live count
sits in the top bar the rest of the time.

## Why it's fixed

Because a dashboard you have to assemble is a dashboard nobody finishes.

The layout is identical for every site and every account. That means the answer
to "where do I find bounce rate" is the same answer for everybody, forever, and
a screenshot in a help article stays true next year. It means the design budget
went into the drawer, the map and the keyboard instead of a widget palette.

It also lets the numbers be opinionated. Bots are excluded by default with no
toggle to find. Imported history is folded into every non-realtime query without
being asked. Those are decisions made once, in the open, instead of settings you
have to discover after your numbers have already been wrong for a month.

The signed-in dashboard, a [public dashboard](/features/teams-and-sharing/) and
an embedded share link all render the same compiled shell. There's no second,
worse front end to drift.

More in [the docs](/docs/), and the numbers themselves are defined in
[metric definitions](/docs/metrics/).
