---
title: "Analytics that makes GDPR simpler"
seotitle: "GDPR-compliant analytics without a consent banner"
description: "No cookies, stored identifiers, or ad network. See what Feasible collects and what GDPR still asks of you."
lede: "No tool makes you compliant. Collecting less makes the work smaller."
kicker: "GDPR"
weight: 30
checked: 2026-09-03
faq:
  - q: "Is Feasible GDPR compliant?"
    a: "We call Feasible GDPR-friendly. Compliance depends on your whole site, configuration, and location. Ask your lawyer."
  - q: "Do I need a cookie banner for Feasible?"
    a: "Most sites won't need one for Feasible. Rules vary by country, and other parts of your site may still need consent."
  - q: "Does Feasible process personal data?"
    a: "Briefly. We use an IP address for a rough location and daily visitor hash, then discard it before writing to disk. The stored hash is pseudonymous."
  - q: "Do you offer a DPA?"
    a: "Yes. It's part of the terms and needs no signature. It includes sub-processors, a 72-hour breach notice, standard contractual clauses, and the UK Addendum."
  - q: "Where is the data stored?"
    a: "The hosted service is in the United States. There's no EU region. Use self-hosting or another vendor if EU-only storage is required."
  - q: "Is Google Analytics GDPR compliant?"
    a: "There's no current EU-wide ban on Google Analytics. The practical drawbacks are consent banners, retention limits, thresholded reports, and possible sampling."
  - q: "What about CCPA and PECR?"
    a: "The same facts help with both. CCPA turns on selling or sharing personal information, and we do neither. PECR turns on storing or accessing information on a device, and since February 2026 UK law carries an express statistical-purposes exception with conditions attached."
---

{{< callout title="Read this first" >}}
This isn't legal advice. Compliance depends on your whole site, configuration,
and location. We can only tell you how Feasible works.
{{< /callout >}}

Feasible sets no cookies, stores no visitor ID on the device, never writes an IP
address to disk, and connects to no advertising network.

## What GDPR-compliant web analytics means

"GDPR-compliant analytics" is a shopping term, not a legal status. A good tool
reduces the data you must account for. It can't make the rest of your site
compliant.

## Why collecting less changes the question

No persistent profile means less data to disclose, export, delete, and secure.
No advertising network means no behavioral data is sent for ads. The remaining
work is smaller, not zero.

## What's processed

**An IP address, briefly.** We use it for a rough location and daily visitor
hash, then discard it before writing to disk.

**Then, a pseudonymous number.** A 64-bit SipHash of the user agent, the IP and
the site domain, keyed with a salt derived from the current UTC day. The salt is
never stored in a database and changes at midnight.

That number is **pseudonymous, not anonymous**. It can't be reversed, and its
key is gone within a day. It still started with personal data.

**Ordinary traffic data.** Page path, page title, referrer, UTM parameters,
country, region, city, device type, screen bucket, browser, OS, language, and any
custom properties you choose to send. About 210 bytes a row.

There's no field for a name, email, or user ID. The DPA forbids sending direct
identifiers.

## What each rule asks for

**GDPR** requires a lawful basis for processing personal data. Audience
measurement often relies on legitimate interest under Article 6(1)(f), with a
balancing test and right to object. The CJEU's *Breyer* judgment explains when a
dynamic IP is personal data ([Court summary](https://curia.europa.eu/jcms/upload/docs/application/pdf/2016-10/cp160112en.pdf)).

**ePrivacy and PECR** separately govern storing information on or reading it from
a device. The rules cover more than cookies.

**CCPA** turns on selling or sharing personal information. We do neither, and
there's no ad network to share with.

## The UK has a real exemption now

Since **February 5, 2026**, UK law carries an express consent exception for
analytics. The Data (Use and Access) Act 2025 inserted a new Schedule A1 into
PECR ([the enacted
text](https://www.legislation.gov.uk/ukpga/2025/18/schedule/12/enacted)). It
permits storage or access where the **sole purpose** is collecting statistics
about how your service is used **with a view to making improvements**, the
information isn't shared onward, and two further conditions hold:

- the visitor gets **clear and comprehensive information** about it, and
- the visitor gets a **simple means of objecting, free of charge**.

The ICO's table includes traffic by page, paths, scroll depth, devices, browsers,
referrers, bounce rates, and city-level location. It excludes visitor recordings,
ad clicks, ad conversion IDs, and advertising
([ICO guidance, updated April 29, 2026](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)).

The disclosure and opt-out are required. PECR also covers `localStorage`, so we
[list the two keys Feasible uses](/cookieless-analytics/).

## In the EU it's a strong position, not a settled one

EDPB Guidelines 2/2023 read Article 5(3) broadly enough to include some hashed
identifiers and browser instructions ([guidelines](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)).
They also say consent must be assessed under each country's rules. Ask your
lawyer about your site.

**In France,** CNIL uses self-assessment rather than product certification. Its
criteria include publisher-only statistics, no cross-site ID, limited referrers,
city-level location at most, and no session replay
([CNIL, July 4, 2025](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience)).

## Why Google Analytics is the hard case

Several European regulators ruled against Google Analytics transfers from 2021
to 2023. The EU-US Data Privacy Framework changed that legal basis in July 2023,
and Google is certified under it. There's no current EU-wide ban.

The practical drawbacks are simpler:

- **It sets cookies and needs a consent banner** in the EU and UK. Everyone who
  declines is missing from your numbers.
- **Retention is capped.** Event-level data can be kept for 2 or 14 months on a
  standard property, and Google notes that a property which becomes "Large" is
  automatically reduced to 2 months, with older event-level data permanently
  deleted ([Google's own
  page](https://support.google.com/analytics/answer/7667196)). Feasible keeps 5
  years on the $99 plan.
- **Reports get thresholded.** Rows disappear when counts are low and
  demographics are in play. Google, verbatim: "Data thresholds are system defined.
  You can't adjust them."
  ([source](https://support.google.com/analytics/answer/9383630))
- **Sampling is possible in standard reports.** Google's own comparison of
  reporting surfaces marks sampling "Possible" for Reports, Insights and
  Explorations together; only the BigQuery export is marked "No"
  ([source](https://support.google.com/analytics/answer/13331292)).
- **Universal Analytics history is gone.** Standard UA properties stopped
  processing hits on July 1, 2023, and Google cut off access to current and
  historical UA data from the week of July 1, 2024
  ([source](https://support.google.com/analytics/answer/11583528)). Anyone who
  didn't export lost it.

## What we store, where, and under what contract

**Where.** The hosted service runs in the United States. There's no EU region.
The DPA uses standard contractual clauses and the UK Addendum.

For EU-only storage, [self-host Feasible](/open-source-web-analytics/) in the EU
or pick an EU-hosted vendor.

**The contract.** The [DPA](/dpa/) needs no signature. It covers the data,
security measures, sub-processors, breach notice, standard clauses, and UK
Addendum.

**Retention.** Five years on the hosted plan. Account records are deleted 90 days
after cancellation, and invoices are kept as long as tax law requires.

---

If you're moving off GA4, the
[step-by-step migration](/migrate/from-google-analytics/) covers the import and
what to do with the banner.
