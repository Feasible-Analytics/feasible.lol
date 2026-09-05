---
title: "Cookieless analytics, and what it buys you"
seotitle: "Cookieless analytics: no cookies, no banner"
description: "Feasible sets no cookies and no persistent identifiers. For most sites that means no consent banner, and no data lost to the people who decline."
lede: "No cookie. No persistent ID. Here is what you gain and give up."
kicker: "COOKIELESS"
weight: 20
checked: 2026-09-03
faq:
  - q: "What is cookieless analytics?"
    a: "Website analytics that measures traffic without storing an identifier in the visitor's browser. Cookieless tracking means no cookie, no persistent ID, and nothing that can be read back on a later visit to recognize the same person."
  - q: "How do you count unique visitors without cookies?"
    a: "Each event gets a 64-bit hash of the user agent, the IP address and the site's domain, keyed with a salt derived from the current UTC day. The salt is never stored and changes at midnight, so the number is only good for one day."
  - q: "Are cookieless analytics accurate?"
    a: "For daily and weekly traffic, yes - the counting method is the same one cookies would give you within a single day. Where it differs is anything that needs memory across days: returning visitors, multi-day journeys and lifetime value can't be measured this way."
  - q: "Do I still need a cookie banner?"
    a: "Most sites running Feasible won't need one, because there's no cookie to consent to. That isn't a legal guarantee - consent rules cover more than cookies, and the answer depends on your jurisdiction and what else your site loads. Check with your own lawyer if you're somewhere strict."
  - q: "Is cookieless the same as fingerprinting?"
    a: "No, and the distinction is the whole point. Fingerprinting builds an identifier meant to be stable across sites and across time. Our hash includes the site domain and a key that changes daily, so it can't do either."
  - q: "Does the Feasible script write anything to the browser?"
    a: "Two things, neither an identifier. A short-lived retry queue holding events that haven't been delivered yet, cleared as soon as the server accepts them, and a flag you set yourself if you want to exclude your own visits."
  - q: "Do ad blockers block cookieless analytics?"
    a: "Some do. Blocking rates vary enormously by audience - under 10% on a mainstream consumer site, much higher on a developer audience. Serving the script from your own domain through a proxy cuts most of it."
---

Feasible sets no cookie. There's no cookie code to turn on.

## How you count visitors when nothing is stored

When an event arrives, Feasible makes a 64-bit hash from the user agent, client
IP address, and site domain. Its key changes at midnight UTC and is never stored.

Same browser, same network, same site, same day, same number. Different day,
different number, and no way to connect the two.

The raw IP is also used for a rough location, then discarded. It never reaches
disk.

## Cookieless tracking, and what it can still tell you

Daily pageviews, visits, bounce rate, pages, sources, countries, and devices work
as expected. Here is what changes.

**No returning visitors.** Someone who visits Monday and Thursday counts twice.

**No cross-device tracking.** A phone and laptop count as two visitors.

**Sites stay separate.** The same person on two sites counts twice.

**Shared networks can blur.** People on one IP with the same browser may collapse
into one visitor.

Funnels, goals, properties, revenue, scroll depth, and time on page still work.

## Cookieless isn't fingerprinting

Fingerprinting makes an identifier that stays stable across sites and time.

Two design decisions make our hash useless for that:

- **The site's domain is an input.** The same browser on two different sites
  produces two unrelated numbers. There's nothing to join on.
- **The key changes every UTC day and is never stored.** The number isn't
  stable across time. Tomorrow's can't be derived from today's, by us or by
  anyone who took the database.

Feasible doesn't read canvas, audio, fonts, GPU, battery, or installed plugins.

## Does the script write anything to the device?

Yes. An **outbox** holds undelivered events in `localStorage` and clears them
after delivery. A **self-exclusion flag** lets you stop counting your own visits.
Neither identifies a visitor.

## So do you need a consent banner?

**Most sites running Feasible won't need one for analytics.** There's no
cookie or persistent identifier to accept. The answer still depends on your
country and everything else your site loads. [Read the legal details and
sources](/gdpr-compliant-analytics/).

{{< callout title="Not legal advice" >}}
We're an analytics company, not your lawyer, and nothing on this page is legal
advice. Whether your particular site needs a banner depends on where you are, what
else your site loads, and how you've configured things. If you're somewhere
strict, ask someone qualified.
{{< /callout >}}

## What a banner costs you

A declined banner means a missing visitor. The banner also costs money and gets
between people and your site. Removing it improves the data and the page.

## Ad blockers
Some blocklists catch Feasible. Technical audiences block more than mainstream
audiences. If it matters, [serve the script from your own domain](/docs/proxying/).

## The script

{{< snippet domain="yourdomain.com" >}}

3,377 bytes gzipped. It sets no cookie and loads no second script.

---

What this means for [GDPR, CCPA and PECR](/gdpr-compliant-analytics/) is its own
page, and the field-by-field list of what we store is on
[privacy-friendly analytics](/privacy-friendly-analytics/).
