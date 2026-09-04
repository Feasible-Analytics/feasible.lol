---
title: "How do you count unique visitors without cookies?"
description: "A daily-rotating hash of user agent, IP and domain. It's pseudonymous, not anonymous, and we won't call it anonymous."
category: "privacy-and-the-law"
weight: 60
---

With a hash that expires every night.

When an event arrives, we compute a SipHash of the visitor's user agent, their IP address and your domain, keyed by a salt derived from today's UTC date. The result is a 64-bit number. Two hits from the same browser on the same day produce the same number, which is what makes "unique visitors" mean anything. That's the whole mechanism.

Three properties fall out of it:

- **It expires.** Tomorrow the salt is different, so the same person is a different number. Old salts aren't stored anywhere and can't be reconstructed. Nobody can join Tuesday's visitors to Monday's — not you, not us, not somebody with our database.
- **It doesn't cross sites.** Your domain is an input, so the same person visiting two customers of ours produces two unrelated numbers.
- **It never lands on the visitor's device.** No cookie, no localStorage identifier, nothing to consent to. [Which is why most sites don't need a banner](/help/do-i-need-a-cookie-banner/).

**We call this pseudonymous, not anonymous, and the distinction is deliberate.** Somebody holding both the current salt and the stored hashes could test candidate user-agent-and-IP combinations against them. That's a real, if narrow, attack, and it means the data is pseudonymous personal data under GDPR rather than truly anonymous. Plenty of vendors write "anonymous" here. We won't, because it isn't true, and a privacy claim that doesn't survive scrutiny is worse than none.

The practical consequence for your reports: [visitors don't add up across days](/help/whats-the-difference-between-visitors-visits-and-pageviews/). Seven daily figures summed will always beat the week's number on the tile.
