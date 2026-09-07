---
title: "How do you count unique visitors without cookies?"
seotitle: "Cookieless tracking: how it works, and what it costs"
description: "How cookieless tracking works, which methods are worse than the cookie they replaced, and what a daily-rotating hash gives up in exchange."
category: "privacy-and-the-law"
weight: 60
updated: 2026-09-06
---

With a hash that expires every night. The [technical privacy doc](/docs/privacy/) has the derivation in full.

That's the short answer. The longer one is worth reading, because "cookieless" has become a word vendors use to mean "trust us", and some cookieless tracking is more invasive than the cookie it replaced.

## What cookieless tracking actually means

A cookie is a small file a site asks your browser to keep. It survives between visits, which is what makes it useful for counting returning people, and it's also what makes it something the law has an opinion about. Consent rules like the ePrivacy Directive and PECR are written about **storing or reading information on someone's device**, not about analytics as a category.

Cookieless tracking means recognising a returning browser without storing anything on it. Every method has to answer the same question: if you keep nothing on the device, what do you compare?

There are three answers in common use, and they are not equally good.

## The three approaches

**Fingerprinting.** Read enough about the browser - fonts, screen size, canvas rendering, audio stack, timezone, extensions - to build a signature that's unique to one machine. It works well, it needs nothing stored, and it is **worse for the visitor than a cookie was.** A cookie can be deleted. A fingerprint can't, because it's made of things you can't change. It also follows the person across every site using the same technique. If a tool calls itself cookieless and won't say how it identifies people, this is usually why.

**Server-side identifiers.** Move the tracking to your own back end and issue an ID there. Nothing lands in the browser, which is technically true and legally uninteresting: you've still got a durable identifier, it just lives in your database instead. Fine for your own product analytics. Not a privacy improvement by itself.

**Rotating hashes.** Derive an identifier from what the request already carries, and change the recipe often enough that it can't be used to follow anyone. This is what we do, and the rest of this page is how.

## How ours works

When an event arrives we compute a SipHash of the visitor's user agent, their IP address and your domain, keyed by a salt derived from today's UTC date. The result is a 64-bit number. Two hits from the same browser on the same day produce the same number, which is what makes "unique visitors" mean anything. That's the whole mechanism.

Three properties fall out of it:

- **It expires.** Tomorrow the salt is different, so the same person is a different number. Old salts aren't stored anywhere and can't be reconstructed. Nobody can join Tuesday's visitors to Monday's - not you, not us, not somebody holding our database.
- **It doesn't cross sites.** Your domain is an input, so the same person visiting two customers of ours produces two unrelated numbers.
- **It never lands on the visitor's device.** No cookie, no localStorage identifier, nothing to consent to. [Which is why most sites don't need a banner](/help/do-i-need-a-cookie-banner/).

The IP address is used in memory to compute that hash and a rough location, then discarded. [It never reaches disk](/help/do-you-store-ip-addresses/).

## We call it pseudonymous, not anonymous

The distinction is deliberate.

Somebody holding both the current salt and the stored hashes could test candidate user-agent-and-IP combinations against them. That's a real, if narrow, attack, and it means the data is pseudonymous personal data under GDPR rather than truly anonymous.

Plenty of vendors write "anonymous" here. We won't, because it isn't true, and a privacy claim that doesn't survive scrutiny is worse than none. If you're writing your own policy, [we've drafted the paragraph](/help/what-should-my-privacy-policy-say/) with that wording already right.

## What it costs you

Every approach trades something, and honest ones say what.

**You can't follow anyone across days.** No returning-visitor rate, no cohort retention, no "people who read the pricing page last week came back and bought". If your business depends on that, a rotating hash is the wrong tool and you should know it now rather than three months in.

**Visitors don't add up.** [Seven daily figures summed will always beat the week's number](/help/whats-the-difference-between-visitors-visits-and-pageviews/) on the tile, because someone who visited Monday and Thursday is two dailies and one weekly. That's arithmetic, not a bug.

**Shared addresses merge people.** An office behind one NAT gateway, on the same browser version, can collapse into fewer visitors than there were. It's the reason [everyone sometimes shows up in one country](/help/why-is-everyone-showing-up-in-one-country/).

**The numbers won't match Google Analytics.** They measure different things with different identifiers and different bot filtering. [Neither figure is the true one](/help/my-numbers-dont-match-another-tool/).

We think that's a good trade for most sites. It is not a free one, and anybody telling you cookieless costs nothing is selling something.
