---
title: "Do you store IP addresses?"
description: "No. The raw address is used in memory for the country lookup and the daily hash, then discarded. The stored event has no field for one."
category: "privacy-and-the-law"
weight: 50
---

No. The raw IP address never reaches disk.

Here's the actual path it takes. A request arrives at our ingest tier. In memory, three things happen with the address:

1. It's looked up against a geolocation database sitting on our own disk, producing a country, a region and a city. No network call, so nothing outside our servers ever sees it.
2. It goes into the [daily visitor hash](/help/how-do-you-count-unique-visitors-without-cookies/) along with the user agent and your domain.
3. It's checked against any [IP shields](/help/how-do-i-exclude-my-own-visits/) you've set.

Then the derived event is written and the address is gone. The event record we store has no column for an IP, which is a stronger guarantee than a policy — there is nowhere to put one even by accident.

That ordering is why IP-based exclusions have to be configured in Feasible rather than filtered later. The ingest tier is the only place in the system where the address exists at all.

Two consequences worth knowing.

**Rate limiting is per address and keeps nothing.** The counter lives in memory, sweeps every minute, and never writes an address down.

**A proxy that doesn't forward the visitor's address breaks geolocation.** If you put Feasible behind your own server and it doesn't pass the real address on, every visitor arrives looking like your server — one country, one visitor. The health panel warns you when it sees that pattern. [What to do about it](/help/why-is-everyone-showing-up-in-one-country/).
