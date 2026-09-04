---
title: "How do I export my data?"
description: "One button. You get a ZIP with ten roll-up CSVs and the raw events, and it works in every account state."
category: "importing-and-exporting"
weight: 30
---

One button, under **Site settings → Imports and exports**.

1. Click **Create export**.
2. It runs as a background job — for a big site, go and do something else.
3. Download the ZIP. The link is good for 24 hours; make another whenever you want.

**[Raw events](/features/import-and-export/) are in it.** Not a summary, not a sample, not a paid add-on — the actual rows, alongside ten roll-up CSVs. [Here's what's in the file](/help/whats-in-the-export/).

That's the part that matters, and it's worth saying why. An analytics tool that only exports aggregates has made leaving impossible even while claiming you own your data. Roll-ups can't be re-aggregated a different way and can't be re-imported anywhere useful. Raw rows can.

**Export works in every account state.** Trial, paid, over the pageview limit, dashboard locked, payment lapsed, dormant, the day before deletion. There is no phase where the export button is off. It's the one route we deliberately keep open no matter what else is closed, because portability that depends on a payment isn't portability.

Two more ways out, if a ZIP isn't the shape you want:

- **The [API](/docs/api/)** reads any report programmatically, on one bearer key, in every plan. There's no plan check in it.
- **The MCP server** is built in, so you can point an assistant at your own numbers over HTTP or stdio with the same key.

Coming back the other way — restoring, or moving a site between accounts — the export's CSVs [import file-for-file](/help/can-i-import-a-csv/).

Deleting your account? [Export first.](/help/how-do-i-delete-my-account/) After the purge there's nothing to recover.
