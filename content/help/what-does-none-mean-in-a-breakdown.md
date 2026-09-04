---
title: "What does (none) mean in a breakdown?"
description: "It's the honest bucket: everything that didn't carry the thing you're breaking down by. It's shown rather than dropped, on purpose."
category: "reports"
weight: 60
---

It's everything that didn't carry the property you're breaking down by.

Break your events down by a custom property called `plan` and you'll get rows for `free`, `pro` and `team` — plus a row for every event that had no `plan` on it at all. That's `(none)`.

Showing it is a deliberate choice. The alternative is to drop those events, which makes the report add up to less than your traffic and quietly overstates the share of every named row. If 60% of your events have no `plan` and you hide them, `pro` looks twice as popular as it is. We'd rather the number be awkward and true.

So `(none)` is a useful signal, not noise. A big `(none)` usually means one of three things:

1. **You added the property later.** Everything before that day has no value for it, and it never will — data isn't backfilled.
2. **One code path forgot it.** The signup flow sends `plan`, the checkout flow doesn't. This is the most common one, and finding it is exactly what the bucket is for.
3. **The property is genuinely scoped to some events only** — a `search_term` on a search event and nowhere else. In which case a huge `(none)` is correct and you should filter it out rather than worry about it.

If it's number three, [session scope may be what you wanted](/help/event-scope-vs-session-scope-for-custom-properties/) — a session-scoped property attaches to the whole visit rather than one hit, which changes both the report and the conversion-rate denominator.

The same idea shows up under other labels elsewhere: blank device and browser values render as **(not set)**, and a blank source row reads **[Direct / None](/help/whats-the-difference-between-a-source-and-a-channel/)**. Different words, same principle — say what you don't know rather than hiding it.
