---
title: "What are UTM parameters?"
description: "Tags you add to your own links so you can tell which campaign sent the traffic. Five of them, and three that matter."
category: "reports"
weight: 40
---

Tags you bolt onto the end of your own links so a click can identify itself.

```
https://example.com/pricing?utm_source=newsletter&utm_medium=email&utm_campaign=march-launch
```

They're just query parameters. Nothing reads them but analytics tools, and the visitor never notices. The convention is old and universal, which is the good part — a UTM-tagged link works in every tool anyone will ever move to.

Feasible reads five:

- **`utm_source`** — where it came from. `newsletter`, `twitter`, `partner-blog`.
- **`utm_medium`** — what kind of thing it was. `email`, `cpc`, `social`, `referral`.
- **`utm_campaign`** — which push. `march-launch`, `black-friday`.
- **`utm_content`** — which variant, when you're running two versions of the same ad.
- **`utm_term`** — the paid keyword.

The first three each get a tab in the **[Top Sources](/features/dashboard/)** card, under **Campaigns**. Those tabs deliberately exclude untagged traffic, so a campaign report is only ever campaigns — no giant "(none)" row swamping the thing you're trying to read.

Three rules that will save you a mess later:

1. **Lowercase everything.** `Newsletter` and `newsletter` are two rows forever.
2. **Only tag links you control** — your emails, your ads, your QR codes. Never tag an internal link between two of your own pages; you'll restart attribution mid-visit and lose the real source.
3. **Pick a naming scheme once** and write it down, because you can't fix a tag after it's been clicked.

Untagged traffic still gets a [source and a channel](/help/whats-the-difference-between-a-source-and-a-channel/) from the referrer. UTMs just make it exact.
