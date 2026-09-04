---
title: "What don't you collect?"
description: "No cookies, no IP on disk, no cross-site tracking, no profiles, no recordings, no fingerprint that survives the night."
category: "privacy-and-the-law"
weight: 40
---

The list that matters more than the other one.

**No cookies.** None. Not for measurement, not for "functionality".

**No IP address on disk.** The address is used in memory for the country lookup and the daily hash, then dropped. The stored event has nowhere to put one — [there's no field for it](/help/do-you-store-ip-addresses/).

**No identifier that survives the day.** The visitor hash is rebuilt from a new salt every UTC day, and the old salt is unrecoverable. Nobody can join Tuesday's visitors to Monday's, including us.

**No cross-site tracking.** Your domain is part of the hash input, so the same person on two customers' sites is two unrelated numbers. There is no network, no shared audience, no lookalike anything.

**No user profiles and no user-level reports.** There's no screen anywhere that shows you one person's path through the site as a person. Reports are counts.

**No session replay, no heatmaps, no scroll recordings, no mouse tracking.** Not a roadmap item — a decision.

**No fingerprinting beyond that daily hash.** No canvas, no fonts, no audio context, no device enumeration.

**No third-party requests from the script.** It talks to one endpoint. Even the little source icons in the dashboard are proxied through our own origin, so the site that referred your visitor never hears about it.

**No advertising anything.** We don't sell it, share it, or hand it to a data broker. [Ever](/help/do-you-sell-my-data/).

The one thing we can't promise not to collect is what you send us yourself. If you put a customer's email into a [custom property](/help/event-scope-vs-session-scope-for-custom-properties/), it lands in the database. Don't.
