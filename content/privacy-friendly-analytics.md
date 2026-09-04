---
title: "Analytics that doesn't follow anyone around"
seotitle: "Privacy-friendly analytics with nothing to opt out of"
description: "Feasible never identifies anyone. No cookies, no fingerprinting, no cross-site tracking, nothing shared with an ad network. $9.99 a month."
lede: "Every field we store, every field we don't, and the exact way a visitor gets counted when there's no identifier to count with."
kicker: "PRIVACY"
weight: 10
faq:
  - q: "What is privacy-friendly analytics?"
    a: "Website analytics that counts visits without identifying visitors. No cookies, no persistent ID, no profile that follows a person between sites, and no data handed to an advertising network. You get traffic numbers; nobody gets a dossier."
  - q: "Does Feasible use cookies?"
    a: "No. The tracking script sets no cookie on your visitors, ever. The only cookies in the whole system belong to the Feasible app itself, for your own login session."
  - q: "Do you store IP addresses?"
    a: "No. The address is used in the ingest tier to work out a country and a daily visitor hash, then it's discarded. It never reaches disk."
  - q: "Is Feasible data anonymous?"
    a: "It's pseudonymous, not anonymous, and we'd rather say so. The daily visitor hash is derived from data that started out personal. It can't be reversed, and the key it was made with is gone the next day, but calling it anonymous would be overselling it."
  - q: "Is this fingerprinting?"
    a: "No. Fingerprinting builds a stable identifier that survives across sites and across time so a person can be recognized later. Our hash includes the site domain and a key that changes every UTC day, which makes it useless for both."
  - q: "Do you sell or share the data?"
    a: "No. Your numbers are yours. There's no ad network in the loop, no data broker, and no cross-customer pooling."
---

No cookies. No persistent ID. No profile that follows a person from one site to
the next, and nothing handed to an advertising network. You get the numbers.
Nobody gets a dossier.

That's what privacy-friendly analytics means. The rest of this page is ours, in
enough detail that you can hold it up against anyone else's.

## What we actually store

One row per event, about 210 bytes of it. Here's the whole shape.

| What | Where it comes from |
|---|---|
| Page path, hostname, page title | The page URL, capped at 2,000 characters |
| Entry page, exit page | Derived from the visit |
| Referrer, source, channel, utm_source, utm_medium, utm_campaign | The referrer header and the URL's own query string |
| Country, region, city | Looked up from the IP against a database on our disk |
| Device type, screen-size bucket, browser, browser version, OS, OS version | The user-agent string and the viewport width |
| Language | The browser's language header |
| Event name, goal, custom properties | Whatever you choose to send |
| A 64-bit visitor number | Explained below. It changes every day |

That's it. There's no field for a name, an email, a user ID, a phone number or
an order number, because there's nowhere to put one. If you send a direct
identifier as a custom property, you're breaking your own contract with us, not
using a feature.

## What we never collect

- **No cookie.** Not a first-party one, not a session one, not one that expires
  in a year.
- **No stored identifier on the device.** Nothing in `localStorage` that
  identifies anyone. (Two keys exist and neither is an ID —
  [we spell them out on the cookieless page](/cookieless-analytics/).)
- **No raw IP address on disk.** More on that below.
- **No cross-site identity.** The site's own domain is baked into the visitor
  hash, so the same person on two of your sites is two different visitors to us.
- **No advertising integration.** Nothing goes to an ad network, because we
  don't have one and don't sell to one.
- **No session replay, no heatmaps, no individual visitor timeline.** Not
  "coming soon" — deliberately absent. Watching one person move around a page is
  the thing this whole category is supposed to be an alternative to.

## How you count visitors with none of that

This is the part most tools gloss over, so here's the mechanism.

When an event arrives, the ingest tier computes a 64-bit SipHash-2-4 of the
user-agent string, the client IP and the site's domain. The key for that hash is
a salt derived from the current UTC day number — it isn't stored in any database,
and it changes at midnight UTC. Yesterday's salt is held briefly so a visit
that's already open doesn't split in half, then it's gone too.

Two consequences follow, and you should hear them from us rather than discover
them in month three.

**A visitor who comes back tomorrow is a new visitor.** We can't tell it's the
same person, because the key that made yesterday's number no longer exists. That's
the trade. Unique visitors are a daily figure by construction.

**The same person on two of your sites counts twice.** The domain is in the
hash, on purpose. It's the thing that makes cross-site tracking impossible.

If you need to follow one individual across weeks and devices, we're the wrong
product and you should stop reading here. That's a real capability, and choosing
this model means giving it up.

## Pseudonymous, not anonymous

We're going to be pedantic for one paragraph, because the difference matters and
half this industry blurs it.

The visitor number is **pseudonymous**. It was derived from data that started out
personal, it can't be reversed, and the key that made it is unrecoverable within
a day. It isn't **anonymous** in the strict legal sense, and anyone telling you
their daily rotating hash is anonymous is making a claim they'd struggle to
defend. We'd rather be precise and boring here than clever.

What that gets you in practice: a much smaller, much shorter-lived set of data to
account for, and a much easier conversation with whoever asks. Not an exemption
from thinking about it. See [GDPR-friendly analytics](/gdpr-compliant-analytics/)
for how that plays out.

## What happens to the IP address

It never reaches disk. That's a structural decision, not a setting.

The address arrives at the ingest tier, gets used for exactly two things —
looking up a rough location and computing the day's visitor hash — and is
discarded before anything is written. The location lookup uses DB-IP Lite, a
database sitting on our own disk, so there's no per-pageview call out to a
geolocation service. Resolution stops at country, region and city. Commercial VPN
exits get bucketed as an anonymizing service rather than mislabeled with the
data center's country.

Because the IP only exists in that one tier, it's also the only place an IP-based
exclusion rule can be evaluated. That's why our IP shields live there.

{{< shot src="app/locations.png" alt="The locations report showing countries, regions and cities" caption="Country, region and city. Nothing finer, and no network call to get it." >}}

## How this compares

**Against Google Analytics 4.** GA4 sets cookies, needs a consent banner in the
EU and UK, and sends your visitors' behavior to a company whose main business is
advertising. Its script, `gtag.js`, measured 148,451 bytes gzipped on
September 3, 2026 — ours is 3,377 bytes gzipped, about 43× smaller. You can reproduce
both numbers with `curl -H 'Accept-Encoding: identity' <url> | gzip -9 | wc -c`.

**Against the other privacy-friendly tools.** Honestly? On the privacy model
itself, most of them are fine. Plausible, Fathom, Simple Analytics, Umami,
Pirsch and GoatCounter all avoid cookies and all avoid cross-site identity. The
privacy story stopped being a differentiator in this category a while ago, and
pretending otherwise would be a sales pitch rather than an answer.

What still differs is the bill and the limits. At a million pageviews a month,
Plausible's Business plan is $1,390 a year on their published pricing and Matomo
Cloud is $2,040 a year on theirs, both checked September 3, 2026. Feasible is $99.
That's the argument we'd actually make. The
[full ladder is on the pricing page](/pricing/).

## Where we're not the best answer

If your requirement is that no data ever leaves the EU, we're not it. Cloudmanic
Labs is a US company in Newberg, Oregon. International transfers are handled
through the standard contractual clauses in our DPA, which is fine for most
buyers and not fine for some. Fathom publishes an EU-isolation feature on every
plan, Plausible hosts in Germany, and Matomo Cloud hosts in Europe — all checked
September 3, 2026. If that's your hard requirement, take one of them seriously.

The other honest limit: no SSO or SAML, no mobile SDKs, and no report that
follows an individual person over time. The last one isn't a gap. It's the
design.

---

The same model, worked through for
[cookieless analytics](/cookieless-analytics/) and for
[GDPR](/gdpr-compliant-analytics/).
