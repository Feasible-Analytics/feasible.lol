---
title: "Cookieless analytics, and what it actually buys you"
seotitle: "Cookieless Analytics — No Cookies, No Banner"
description: "Feasible sets no cookies and no persistent identifiers. For most sites that means no consent banner, and no data lost to the people who decline."
lede: "What cookieless really means, how visitors get counted without one, whether the numbers hold up, and the honest answer on consent banners."
kicker: "COOKIELESS"
weight: 20
checked: 2026-09-03
faq:
  - q: "What is cookieless analytics?"
    a: "Website analytics that measures traffic without storing an identifier in the visitor's browser. No cookie, no persistent ID, nothing that can be read back on a later visit to recognize the same person."
  - q: "How do you count unique visitors without cookies?"
    a: "Each event gets a 64-bit hash of the user agent, the IP address and the site's domain, keyed with a salt derived from the current UTC day. The salt is never stored and changes at midnight, so the number is only good for one day."
  - q: "Are cookieless analytics accurate?"
    a: "For daily and weekly traffic, yes — the counting method is the same one cookies would give you within a single day. Where it differs is anything that needs memory across days: returning visitors, multi-day journeys and lifetime value can't be measured this way."
  - q: "Do I still need a cookie banner?"
    a: "Most sites running Feasible won't need one, because there's no cookie to consent to. That isn't a legal guarantee — consent rules cover more than cookies, and the answer depends on your jurisdiction and what else your site loads. Check with your own lawyer if you're somewhere strict."
  - q: "Is cookieless the same as fingerprinting?"
    a: "No, and the distinction is the whole point. Fingerprinting builds an identifier meant to be stable across sites and across time. Our hash includes the site domain and a key that changes daily, so it can't do either."
  - q: "Does the Feasible script write anything to the browser?"
    a: "Two things, neither an identifier. A short-lived retry queue holding events that haven't been delivered yet, cleared as soon as the server accepts them, and a flag you set yourself if you want to exclude your own visits."
  - q: "Do ad blockers block cookieless analytics?"
    a: "Some do. Blocking rates vary enormously by audience — low single digits on a mainstream consumer site, much higher on a developer audience. Serving the script from your own domain through a proxy cuts most of it."
---

Cookieless analytics is website analytics that measures traffic without storing
an identifier in the visitor's browser. No cookie. No persistent ID. Nothing that
can be read back on a later visit to recognize the same person.

Feasible is cookieless. Not "cookieless if you configure it that way" — there is
no cookie code in the tracker to turn on.

## How you count visitors when nothing is stored

A cookie is just a way of handing the browser a number and asking for it back
later. Take the cookie away and you need the number to come from somewhere else.

Here's ours. When an event arrives, the ingest tier computes a 64-bit SipHash-2-4
over three things: the user-agent string, the client IP address, and the site's
own domain. The key for that hash is a salt derived from the current UTC day
number. It isn't stored in a database anywhere, and it changes at midnight UTC.
Yesterday's is held briefly so an open visit doesn't split in two, then it's gone
as well.

Same browser, same network, same site, same day, same number. Different day,
different number, and no way to connect the two.

The raw IP is used for that calculation and for a coarse location lookup, then
discarded. It never reaches disk.

## Are the numbers any good?

Within a day, yes. Pageviews, visits, bounce rate, top pages, sources, countries,
devices — all of that is counted the way it would be with a cookie, because
within a single day the hash does the same job.

Here's where it's different, and we'd rather tell you now.

**Returning visitors aren't a thing here.** Someone who reads you Monday and
Thursday is two visitors, because Monday's key no longer exists on Thursday. If
"returning vs new" is a number your business runs on, this model can't give it to
you.

**Cross-device is not tracked.** Phone in the morning, laptop at lunch, two
visitors. Every cookieless tool has this property. Most don't say so plainly.

**Two of your own sites count separately.** The domain is inside the hash on
purpose — it's what makes cross-site tracking impossible.

**Shared networks blur a little.** An office behind one IP running the same
browser version collapses toward one visitor. In practice this is small, and it
is the direction we'd rather err in.

Everything else — funnels, goals, custom properties, revenue, scroll depth, time
on page, the journey report — works fine, because none of it needs to remember
anyone past midnight.

## Cookieless is not fingerprinting

This is where the category gets sloppy, so let's be exact.

Fingerprinting means assembling enough signals — fonts, canvas, audio, GPU,
plugins, timezone — to build an identifier that's **stable across sites and
across time**, so a person can be recognized later without ever being handed a
cookie. It's the workaround that made cookie rules feel pointless.

Two design decisions make our hash useless for that:

- **The site's domain is an input.** The same browser on two different sites
  produces two unrelated numbers. There is nothing to join on.
- **The key changes every UTC day and is never stored.** The number is not
  stable across time. Tomorrow's cannot be derived from today's, by us or by
  anyone who took the database.

We also don't read canvas, audio, fonts, GPU, battery or installed plugins. The
inputs are the user agent, the IP and the domain. That's the list.

## Does the script write anything to the device?

Yes, two things, and neither is an identifier. We'd rather you read this from us
than find it in devtools.

The tracker keeps a small **outbox** in `localStorage`. Every event is written
there before the request starts and removed as soon as the server accepts it,
which is how a pageview survives a flaky connection or a tab closing mid-request.
It holds pending events and an idempotency UUID per event. It doesn't hold
anything that persists after delivery.

There's also a **self-exclusion flag** you set yourself, by hand, so your own
visits stop being counted.

That's the honest, complete answer. It matters because some rules — the UK's, for
instance — cover local storage and not just cookies. Anyone claiming their script
"writes nothing at all" is either doing something different or hasn't looked.

## So do you need a consent banner?

**Most sites running Feasible won't need one.** That's the honest version, and
we're going to keep the qualifier.

The reasoning has two steps. There's no cookie and no stored identifier to
consent to, so the classic cookie-consent trigger isn't there. And any personal
data still in play — a transient IP — is a much smaller, much shorter-lived set
than an ad-linked analytics tool creates.

Where it gets more interesting:

**The UK now has a statutory analytics exemption.** The Data (Use and Access) Act
2025 inserted a new Schedule A1 into PECR, in force since 5 February 2026. It
permits storage or access whose sole purpose is collecting statistics about how
your service is used, with a view to making improvements
([the text](https://www.legislation.gov.uk/ukpga/2025/18/schedule/12/enacted)).
It comes with two conditions people skip: you must give clear information about
it, and you must offer a **simple, free way to object**. The ICO's own guidance
frames the boundary as "about how your service is used, not about who uses it"
([ICO, updated 29 April 2026](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)).

**In the EU it's less settled than the marketing suggests.** The EDPB's
Guidelines 2/2023 on the technical scope of Article 5(3), adopted 7 October 2024,
read that article more broadly than "cookies" —
[the guidelines](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf).
The same document also says applicability doesn't automatically mean consent is
required; it has to be assessed case by case, and national audience-measurement
exemptions exist. So: a strong position, not a settled one.

{{< callout title="Not legal advice" >}}
We're an analytics company, not your lawyer, and nothing on this page is legal
advice. Whether your particular site needs a banner depends on where you are, what
else your site loads, and how you've configured things. If you're somewhere
strict, ask someone qualified.
{{< /callout >}}

## What a banner costs you

Two things, and only one of them is measurable.

The first is data. Every visitor who declines, or who closes the tab rather than
deal with the box, is missing from your numbers. We've seen figures thrown around
for how many people decline; none of them trace back to a study we could read, so
we're not going to quote one at you. What we'll say is the direction: a declined
banner is a lost measurement, and you don't get to see how many.

The second is the banner itself — the consent tool, the review, the thing every
visitor has to dismiss before reading a word. There is an entire industry selling
the fix for a problem that mostly arrives with the analytics tool you chose.

## Ad blockers, honestly

Some blocklists catch analytics endpoints, ours included. Blocking rates vary
enormously by audience: low single digits on a mainstream consumer site, much
higher on a developer or tech audience. The most-cited number in this category
comes from a vendor study on a single page that trended on Hacker News, and it
was publicly rebutted; the same author's own site reports
[13% of visitors blocking Google Analytics](https://markosaric.com/google-analytics-blocking/).
Take the range, not the headline.

If it matters to you, serve the script from your own domain. The tracker supports
a `data-api` attribute and a proxied script path, and
[the install docs walk through it](/docs/).

## The script

{{< snippet domain="yourdomain.com" >}}

3,377 bytes gzipped, 7,099 raw. GA4's `gtag.js` measured 148,451 bytes gzipped on
2026-09-03 — about 43× larger — and that's only its first request. Reproduce both
with `curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c`.

---

Next: what this means for [GDPR, CCPA and PECR](/gdpr-compliant-analytics/), or
the field-by-field list on
[privacy-friendly analytics](/privacy-friendly-analytics/). It's $9.99 a month —
[the pricing page has the arithmetic](/pricing/).
