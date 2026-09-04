---
title: "Analytics that makes GDPR simpler"
seotitle: "GDPR-Compliant Analytics Without a Consent Banner"
description: "Feasible is GDPR-friendly by design: no cookies, no stored identifiers, no ad network. Most sites won't need a banner. Not legal advice — here's why."
lede: "We won't tell you you're compliant. What we'll do is show you exactly what gets collected, what the rules actually ask for, and where the hard cases are."
kicker: "GDPR"
weight: 30
checked: 2026-09-03
faq:
  - q: "Is Feasible GDPR compliant?"
    a: "We describe Feasible as GDPR-friendly, not GDPR-compliant, because compliance is a property of how *you* run your site, not of a tool you installed. What we can tell you is exactly what Feasible collects, what it never collects, and what contracts we offer. The rest is your call, with your own lawyer."
  - q: "Do I need a cookie banner for Feasible?"
    a: "Most sites won't. Feasible sets no cookies and stores no identifier in the browser, so the classic cookie-consent trigger isn't there. It isn't a guarantee — the rules cover more than cookies and vary by country, and the rest of your site may need one anyway."
  - q: "Does Feasible process personal data?"
    a: "Briefly. An IP address reaches the ingest tier, gets used for a coarse location lookup and a daily visitor hash, and is discarded before anything is written to disk. The stored visitor number is pseudonymous, not anonymous, and we won't pretend otherwise."
  - q: "Do you offer a DPA?"
    a: "Yes, and no signature is needed. It forms part of the terms, names Cloudmanic Labs as processor and you as controller, covers 72-hour breach notice and sub-processors, and incorporates the standard contractual clauses plus the UK Addendum."
  - q: "Where is the data stored?"
    a: "On the hosted service, in the United States. Cloudmanic Labs is an Oregon company and there is no EU-region option today. Transfers are handled by the standard contractual clauses in the DPA. If EU-only storage is a hard requirement, self-host it or pick a vendor that hosts in the EU."
  - q: "Is Google Analytics GDPR compliant?"
    a: "That question got a lot of attention in 2022, when regulators in Austria, France, Italy, Denmark and the Nordics ruled against EU-to-US transfers of Google Analytics data. The ground under those decisions changed on 10 July 2023, when the European Commission adopted the EU-US Data Privacy Framework and Google certified under it. The durable objections to GA4 are about the product — consent banners, data retention limits, thresholded reports — not about a live ban."
  - q: "What about CCPA and PECR?"
    a: "The same facts help with both. CCPA turns on selling or sharing personal information, and we do neither. PECR turns on storing or accessing information on a device, and since February 2026 UK law carries an express statistical-purposes exception with conditions attached."
---

{{< callout title="Read this first" >}}
We never tell anyone they're compliant, and nothing here is legal advice.
Compliance depends on how you configure and use any tool, what else your site
loads, and where you and your visitors are. What we can do is describe Feasible
precisely enough that you or your lawyer can make the call.
{{< /callout >}}

Feasible is **GDPR-friendly**. It sets no cookies, stores no identifier on the
visitor's device, never writes an IP address to disk, and has no advertising
network anywhere in the loop. That doesn't make you compliant. It makes the
question a great deal smaller.

## Why collecting less changes the question

Most of the work in a GDPR conversation about analytics comes from one place:
the tool built a persistent record of an identifiable person and then sent it
somewhere.

Take those two things away and most of the paperwork goes with them. There's no
profile to give someone access to. There's no cross-site identity to explain.
There's no third country receiving behavioral data for advertising, because there
is no advertising.

What's left is small, and we'd rather describe it accurately than round it down
to zero.

## What's actually processed

**Briefly, an IP address.** It reaches the ingest tier, gets used for exactly two
things — a coarse location lookup against a database on our own disk, and the
day's visitor hash — and is discarded before anything is written. It never
reaches storage.

**Then, a pseudonymous number.** A 64-bit SipHash of the user agent, the IP and
the site domain, keyed with a salt derived from the current UTC day. The salt is
never stored in a database and changes at midnight.

That number is **pseudonymous, not anonymous**. It came from data that started
out personal. It can't be reversed, and the key that made it is gone within a
day, but calling it anonymous would be a claim we couldn't defend — and several
tools in this category make it anyway.

**Then, the ordinary stuff.** Page path, page title, referrer, UTM parameters,
country, region, city, device type, screen bucket, browser, OS, language, and any
custom properties you choose to send. About 210 bytes a row.

There is no field for a name, an email or a user ID, because we didn't build one.
Our DPA says explicitly that you must not send direct identifiers.

## What each rule actually asks for

**GDPR** governs processing of personal data and wants a lawful basis under
Article 6. If IPs or IP-derived hashes are processed even briefly, that's
processing, and legitimate interest under Article 6(1)(f) is the standard answer
for audience measurement — with a documented balancing test and a right to object.
The CJEU's *Breyer* judgment (Case C-582/14, 19 October 2016) is the reason this
is careful rather than obvious: it held a dynamic IP is personal data to a site
operator *if* that operator has legal means to identify the visitor with the
ISP's help ([the Court's press
release](https://curia.europa.eu/jcms/upload/docs/application/pdf/2016-10/cp160112en.pdf)).
Conditional, not blanket.

**ePrivacy / PECR** is a separate stack, and escaping one doesn't end the other.
It governs storing information on, or reading information from, a device.
Article 5(3) of Directive 2002/58/EC says "information", not "personal data", and
never says the word "cookie" — so it's technology-neutral by design.

**CCPA** turns on selling or sharing personal information. We do neither, and
there's no ad network to share with.

## The UK has a real exemption now

This is the biggest change in the area and most pages haven't caught up.

Since **5 February 2026**, UK law carries an express consent exception for
analytics. The Data (Use and Access) Act 2025 inserted a new Schedule A1 into
PECR ([the enacted
text](https://www.legislation.gov.uk/ukpga/2025/18/schedule/12/enacted)). It
permits storage or access where the **sole purpose** is collecting statistics
about how your service is used **with a view to making improvements**, the
information isn't shared onward, and two further conditions hold:

- the visitor gets **clear and comprehensive information** about it, and
- the visitor gets a **simple means of objecting, free of charge**.

The ICO calls it the "statistical purposes" or "analytics" exception, and draws
the line precisely: it's "about how your service is used, not about who uses it."
Traffic by page, journeys, scroll depth, device and browser mix, referrers,
bounce rates and city-level geolocation are all on the exempt side of the ICO's
own table. Recordings of individual visitors, ad clicks, linking a visitor ID to
conversions shared with ad partners, and anything for advertising are not
([ICO guidance, updated 29 April
2026](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/)).

Two things vendors skip. The exception is conditional on that disclosure and that
opt-out — running "exempt" analytics with neither doesn't clear the bar. And the
ICO says PECR covers `localStorage` too, not only cookies, which is why we
[spell out the two keys our script uses](/cookieless-analytics/) rather than
claiming it writes nothing.

## In the EU it's a strong position, not a settled one

The EDPB adopted Guidelines 2/2023 on the technical scope of Article 5(3) on
**7 October 2024**, and they read that article more broadly than the industry
slogan does — including instructing a browser to send information, and hashed
identifiers ([the
guidelines](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf)).
The same document also says applicability doesn't automatically mean consent is
needed, and that exemptions have to be assessed case by case against each member
state's transposition.

So the honest framing is this. A tool that stores no identifier and reads nothing
back has a much stronger case that Article 5(3) isn't engaged, and a much stronger
case that a national audience-measurement exemption applies. Whether your
particular site clears the bar is a question for your lawyer, not for our
marketing page.

**On France specifically:** CNIL replaced its published list of approved
audience-measurement tools with a self-assessment tool in July 2025, and
explicitly forbids anyone describing a product as "certified" or "validated by
the CNIL". So nobody in this category can honestly claim that badge, us included —
and if you see a vendor claiming it, that tells you something. CNIL's criteria are
demanding and worth reading: statistics for the publisher's sole account, no
cross-site identifier, referrer limited to the domain, city-level geolocation at
most, no session replay
([CNIL, 4 July
2025](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience)).

## Why Google Analytics is the hard case — and the part most pages get wrong

In 2022 the regulators in Austria, France, Italy, Denmark, Finland, Norway and
Sweden all ruled against EU-to-US transfers of Google Analytics data. Those
decisions were real, and mostly ended in warnings and orders rather than fines.

**They are not a live prohibition today, and we're not going to pretend they
are.** Every one of them turned on transfers after *Schrems II*, and the ground
under them changed on **10 July 2023**, when the European Commission adopted the
EU-US Data Privacy Framework adequacy decision. Google LLC is certified under it.
The General Court dismissed the challenge to the framework on 3 September 2025;
an appeal is pending at the CJEU and undecided.

Anyone still telling you Google Analytics is illegal in the EU is running a stale
page.

The durable objections to GA4 have nothing to do with transfers, which is exactly
why they're the better argument:

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
  processing hits on 1 July 2023, and Google cut off access to current and
  historical UA data from the week of 1 July 2024
  ([source](https://support.google.com/analytics/answer/11583528)). Anyone who
  didn't export lost it.

## What we store, where, and under what contract

**Where.** The hosted service runs in the United States. Cloudmanic Labs, LLC is
at 901 Brutscher Street, D112, Newberg, OR 97132, and Oregon law governs. There is
no EU region today and we're not going to imply there is. International transfers
are handled by the standard contractual clauses incorporated in our DPA, together
with the UK Addendum.

If EU-only storage is a hard requirement for you, there are two honest answers:
[run it yourself](/open-source-web-analytics/) on a box in the EU, where every
feature is free and unrestricted — or pick a vendor that hosts there. Plausible
hosts in Falkenstein, Germany. Matomo Cloud hosts in Europe. Fathom offers EU
isolation on every plan. All checked 2026-09-03. That's a real advantage and it
would be silly to pretend otherwise.

**The contract.** The [DPA](/dpa/) forms part of the terms and needs no
signature. Ten numbered sections: subject matter and duration, categories of data
subject and personal data, an explicit prohibition on sending direct identifiers,
72-hour breach notice, sub-processors by general authorization to a public list,
SCCs module two plus the UK Addendum, and a security-measures list. If you
self-host, the DPA says plainly that your own providers aren't our sub-processors.

**Retention.** Five years on the hosted plan. Account records are deleted 90 days
after cancellation, and invoices are kept as long as tax law requires.

---

If you're moving off GA4, the
[step-by-step migration](/migrate/from-google-analytics/) covers the import and
what to do with the banner. Thirty days, no card:
[start a trial](https://app.feasible.lol/register).
