---
title: "Analytics that doesn't follow anyone around"
seotitle: "Privacy-friendly analytics with nothing to opt out of"
description: "No cookies, fingerprinting, cross-site tracking, or advertising network. $9.99 a month."
lede: "You get website numbers. Nobody gets followed."
kicker: "PRIVACY"
weight: 10
faq:
  - q: "What is privacy-friendly analytics?"
    a: "Website analytics that counts visits without following people. No cookies, persistent IDs, cross-site profiles, or advertising network."
  - q: "Does Feasible use cookies?"
    a: "No. The tracking script sets no cookie on your visitors, ever. The only cookies in the whole system belong to the Feasible app itself, for your own login session."
  - q: "Do you store IP addresses?"
    a: "No. The address is used in the ingest tier to work out a country and a daily visitor hash, then it's discarded. It never reaches disk."
  - q: "Is Feasible data anonymous?"
    a: "It's pseudonymous, not anonymous. The daily visitor hash can't be reversed, and its key disappears the next day."
  - q: "Is this fingerprinting?"
    a: "No. Fingerprinting builds a stable identifier that survives across sites and across time so a person can be recognized later. Our hash includes the site domain and a key that changes every UTC day, which makes it useless for both."
  - q: "Do you sell or share the data?"
    a: "No. Your numbers are yours. There's no ad network in the loop, no data broker, and no cross-customer pooling."
---

No cookies. No persistent ID. No cross-site profile. No advertising network.

## What we store

One event is about 210 bytes. Here is what it holds.

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

There's no field for a name, email, user ID, phone number, or order number. Do
not send one as a custom property.

## What we never collect

- **No cookie.**
- **No identifier stored on the device.** [See the two non-identifying local
  storage keys](/cookieless-analytics/).
- **No raw IP address on disk.**
- **No cross-site identity.** The site's own domain is baked into the visitor
  hash, so the same person on two of your sites is two different visitors to us.
- **No advertising integration.**
- **No session replay, heatmaps, or visitor timeline.**

## How you count visitors with none of that

When an event arrives, the ingest tier computes a 64-bit SipHash-2-4 of the
user-agent string, the client IP and the site's domain. The key for that hash is
a salt that changes at midnight UTC and is never stored.

**A visitor who comes back tomorrow is new.** Yesterday's key is gone.

**The same person on two sites counts twice.** The domain is part of the hash.

If you need to follow one person across weeks and devices, choose another tool.

## Pseudonymous, not anonymous

The visitor number is **pseudonymous**. It started with personal data, even
though it can't be reversed and its key disappears within a day. We don't call
it anonymous. [See how this affects GDPR](/gdpr-compliant-analytics/).

## What happens to the IP address

The address is used for a rough location and the daily visitor hash, then
discarded. It never reaches disk. Location comes from a local database and stops
at country, region, and city.

{{< shot src="app/locations.png" alt="The locations report, showing a world map shaded by visitor count, with tabs for countries, regions and cities" caption="Country, region and city. Nothing finer, and no network call to get it." >}}

## How this compares

**Google Analytics 4** sets cookies and connects analytics to an advertising
business. Its script measured 148,451 bytes gzipped on September 3, 2026.
Feasible measured 3,377 bytes.

**Other privacy-friendly tools** also avoid cookies and cross-site identity. The
main differences are price and limits. [Compare them](/compare/pricing/).

## Where we're not the best answer

Feasible is a US service. If EU-only hosting is required, self-host it or choose
an EU-hosted product. We also have no SSO, SAML, mobile SDKs, or report that
follows one person over time.

---

The same model, worked through for
[cookieless analytics](/cookieless-analytics/) and for
[GDPR](/gdpr-compliant-analytics/).
