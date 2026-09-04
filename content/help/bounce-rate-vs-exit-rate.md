---
title: "What's the difference between bounce rate and exit rate?"
description: "Bounce rate is about visits that went nowhere. Exit rate is about the page people left from. Same-looking numbers, different denominators."
category: "reports"
weight: 20
---

Bounce rate counts visits. Exit rate counts page views. The denominators are different, and that's the whole difference.

**[Bounce rate](/help/what-is-bounce-rate/)**: of the visits that *started* on this page, how many ended there without a second pageview.

**Exit rate**: of everyone who *viewed* this page at any point in their visit, how many left the site from it.

A worked example. Ten people land on `/pricing` directly; four leave immediately. Another twenty reach `/pricing` from somewhere else on the site, and six of those leave from it.

- Bounce rate for `/pricing` is 4 ÷ 10 = **40%**. Only the visits that began there count.
- Exit rate for `/pricing` is 10 ÷ 30 = **33%**. Everyone who saw the page counts.

Every bounce is also an exit. Not every exit is a bounce.

Which one you want depends on the question. Use bounce rate to judge a landing page or a campaign — did the traffic you bought stick around. Use exit rate to find the leak in a flow — which step of the checkout is where people give up.

Neither is a verdict on its own. The last page of a five-step signup should have a huge exit rate; that's people finishing. A [funnel](/help/what-is-a-funnel-and-how-many-steps-can-it-have/) tells you far more about a sequence than either number does.

In Feasible, bounce rate is one of the six top tiles and appears as a column when you open a report in the drawer. Exit rate lives in the query engine and the API rather than on a tile — the **Exit Pages** tab under Top Pages is where you'd start on the dashboard.
