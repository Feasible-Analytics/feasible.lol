---
title: "What is an annotation?"
description: "A dated note on the chart. Six months later it's the difference between a mystery spike and 'oh right, the podcast'."
category: "reports"
weight: 120
---

A dated note pinned to the chart.

You ship a redesign on the 14th. Traffic drops 20% and takes three weeks to come back. In February, staring at that dip, nobody remembers what happened - that's the problem annotations solve. One line of text, one date, and the chart explains itself forever.

They show up as small markers on the x-axis of the main graph. Hover or focus one to read it. Press `K` to jump to the first note in view.

Things worth annotating:

- Deploys and redesigns
- Campaign starts and ends
- Price changes
- Press, a podcast, a post that took off
- Outages - yours or a provider's
- The day you changed the tracking setup

That last one matters more than it sounds. A note saying "added the script to the app subdomain" is the answer to a question somebody will definitely ask later.

Annotations are created in site settings or through the [API](/docs/api/), not from the dashboard itself - the markers on the chart are read-only. Each one is keyed to a date, and the body can run to 8 KB, so there's room for a sentence of context rather than just a label.

If you'd rather be told about a change than discover it, set up [alerts](/features/email-reports/) instead. Spike and drop alerts are evaluated every ten minutes and go to email or a Slack webhook, capped at two per site per day so an alert never becomes noise. A drop alert is really a "has my tracking stopped" alarm, and it's the one most people should have on.
