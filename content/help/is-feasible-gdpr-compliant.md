---
title: "Is Feasible GDPR compliant?"
description: "Feasible cuts the GDPR workload: no cookies, no raw IP on disk, and a DPA in the terms. No tool can hand you compliance."
category: "privacy-and-the-law"
weight: 20
updated: 2026-09-03
---

Nobody can sell you compliance, and we won't pretend to.

Compliance is a property of your whole site - your forms, your ads, your chat widget, your CRM, your lawful basis - not of one script on it. What we can tell you is what Feasible does, so you or your lawyer can decide.

Feasible is GDPR-**friendly** by construction:

- **No cookies** and no persistent identifier on the visitor's device.
- **The raw IP address never reaches disk.** It's used in memory for geolocation and the daily visitor hash, then discarded. [More on that](/help/do-you-store-ip-addresses/).
- The visitor identifier is a **daily-rotating hash**. The salt changes every UTC day and old ones can't be recovered. It's pseudonymous, not anonymous - [we're careful about that word](/help/how-do-you-count-unique-visitors-without-cookies/).
- **Geolocation is coarse and local**: country, region, city, from a database on our own disk. No lookup service ever sees your visitor.
- **A data processing addendum is already part of the terms.** [Nothing to sign](/help/can-i-sign-a-dpa/).
- **We don't sell, share or broker any of it.** [Not to anyone](/help/do-you-sell-my-data/).

Two things worth knowing before you decide. Our servers are in the United States, not the EU - [where your data lives](/help/where-is-my-data-stored/) covers how transfers are handled. And Feasible can carry custom properties you send it, so if you push an email address into one, you've put personal data in yourself. The DPA prohibits it and the docs say don't.

That's the picture. **It isn't legal advice.** Read [the privacy policy](/privacy/) and [the DPA](/dpa/), and if your risk is real, ask a lawyer who knows your jurisdiction.
