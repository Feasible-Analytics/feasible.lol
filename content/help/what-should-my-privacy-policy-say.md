---
title: "What should my privacy policy say?"
description: "A paragraph you can paste into your privacy policy, plus what each line of it rests on and when you'd need to change it."
category: "privacy-and-the-law"
weight: 15
updated: 2026-09-06
---

Here's a paragraph you can paste in and adapt.

```text
Analytics

We use Feasible to count visits to this site and see which pages get read.
Feasible sets no cookies and stores nothing on your device. It doesn't record
IP addresses, and it never follows you to other websites. Visitors are counted
using an identifier that's rebuilt from scratch every day, so there's no way to
recognise the same person tomorrow.

What Feasible collects: https://feasible.lol/privacy-friendly-analytics/
```

If your policy is short and you'd rather have one sentence:

```text
We use Feasible (https://feasible.lol/privacy-friendly-analytics/) for website
analytics. It sets no cookies, records no IP addresses, and doesn't track anyone
across sites.
```

## Where each line comes from

Worth knowing what you're signing your name to, so here's the basis for each claim.

**"Sets no cookies and stores nothing on your device."** True of the analytics identifier. The script does write one short-lived key to `localStorage` - a retry queue holding the event currently in flight, deleted as soon as our server acknowledges it. It isn't an identifier and nothing reads it back. There's a second key only if you've told that browser to [ignore you](/help/how-do-i-exclude-my-own-visits/). If you want to be exhaustive, say so; most policies don't itemise a send buffer.

**"Doesn't record IP addresses."** The address is used in memory to work out a rough location and to build the daily hash, then discarded. It never reaches disk. [The detail](/help/do-you-store-ip-addresses/).

**"Rebuilt from scratch every day."** The visitor identifier is a hash whose salt rotates every UTC day, and old salts can't be recovered. It's pseudonymous rather than anonymous, and [we're careful about that word](/help/how-do-you-count-unique-visitors-without-cookies/). If your jurisdiction is strict, that distinction is the one to raise with your lawyer.

**"Never follows you to other websites."** There's no cross-site identifier and no advertising network. [What we don't collect](/help/what-do-you-not-collect/).

## When you'd change it

**You send custom properties.** Feasible carries whatever [custom properties](/docs/custom-properties/) you give it. If you're passing anything that identifies a person, that's personal data you've added yourself, and your policy has to say so. The DPA prohibits it and the docs say don't.

**You track revenue.** Then you're sending order values, and a thorough policy mentions that.

**You self-host.** Then the operator is you, not us. Drop the link, name yourself, and say where the data lives.

**Your visitors are in the EU and you want to be precise.** Our servers are in the United States. [Where your data lives](/help/where-is-my-data-stored/) covers how that's handled, and a careful policy names the transfer basis.

{{< callout title="A word on what this is" >}}
A starting point written by an analytics company, not legal advice from your
lawyer. It describes what Feasible does so you or your counsel can decide what
your policy needs to say. If you're in a regulated sector, or running ads,
session recording or a chat widget alongside us, that's a different conversation
and it's worth having with someone qualified.
{{< /callout >}}

You may not need a consent banner for any of this - [here's why](/help/do-i-need-a-cookie-banner/) - but the disclosure and the banner are separate questions. Even with no banner, your policy should still say what you measure.
