---
title: "So do you need a cookie banner?"
description: "What ePrivacy Article 5(3) actually says, what the UK's new analytics exemption requires, and exactly what Feasible stores on a visitor's device."
lede: "The rule isn't about cookies, and it never was. Here's what it does say, and what we store."
date: 2026-08-28
checked: 2026-09-03
---

Article 5(3) of the ePrivacy Directive doesn't contain the word "cookie."

That's not a technicality. It's why most of what you've read about consent banners is aimed slightly to the left of the actual rule, and why "we're cookieless, so you don't need a banner" is a weaker sentence than the people saying it think.

We sell an analytics tool, which is a conflict of interest — so everything below is either a quote from the rule or a link to the regulator, and we'll say plainly where our own product doesn't clear a bar.

## What the rule says

Directive 2002/58/EC, Article 5(3), as amended in 2009. This is the sentence everything hangs on:

> "Member States shall ensure that the **storing of information, or the gaining of access to information already stored, in the terminal equipment** of a subscriber or user is only allowed on condition that the subscriber or user concerned has given his or her consent, having been provided with clear and comprehensive information… This shall not prevent any technical storage or access for the sole purpose of carrying out the transmission of a communication over an electronic communications network, or as **strictly necessary** in order for the provider of an information society service **explicitly requested** by the subscriber or user to provide the service."

([legislation.gov.uk](https://www.legislation.gov.uk/eudr/2002/58/article/5), checked September 3, 2026.)

Three things to take from that.

**The trigger is "information," not "personal data."** The rule bites even when nothing you store is personal. A random number counts.

**It's technology-neutral.** Cookies, `localStorage`, `sessionStorage`, IndexedDB, cache tricks — none of them are named, because it's about the act of storing, not the mechanism.

**There are exactly two exemptions:** storage needed to carry the communication, and storage strictly necessary for a service the user explicitly asked for.

## Why "strictly necessary" doesn't cover analytics

Analytics fails the second exemption on the same word every time: *explicitly requested*.

Your visitor asked for the article. They didn't ask to be counted. Measurement is something the site wants, so under the classic EU reading it has never fitted exemption two, no matter how privacy-respecting the tool is. That's the honest starting point, and a vendor telling you otherwise is arguing a position, not reporting a rule.

## The slogan is doing more work than the law allows

"Cookieless means no banner" rests on a claim that Article 5(3) is never engaged at all, because nothing is written to and nothing is read from the device.

The European Data Protection Board tightened that in *Guidelines 2/2023 on the Technical Scope of Article 5(3)*, [version 2.0 adopted October 7, 2024](https://www.edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf). Their reading is broad:

- Storage and access "**do not need to be both present**" — either one engages the rule (§30).
- JavaScript that "instructs the browser of the user to send asynchronous requests with the targeted information" is access, and "clearly falls within the scope" (§33).
- A hashed unique identifier doesn't escape it, because the browser was instructed to send it (§63).
- The storage medium is irrelevant — hard disk, SSD, RAM, even CPU cache (§38).

But the EDPB also says the thing that gets left out of every summary. From §56: "the applicability of this article **does not systematically mean that consent needs to be collected**… in each case it would have to be assessed if a consent is needed or whether an exemption under Article 5(3) ePD could apply."

So the question isn't really *does this tool touch the device*. It's *what is it for, and can anyone be identified with it*. Which is exactly how the UK now writes it down.

## The UK has an actual analytics exemption now

This is the biggest change in this area in years and it's barely been reported.

The Data (Use and Access) Act 2025, section 112 and Schedule 12, inserted a new **Schedule A1** into PECR. It came into force on **February 5, 2026** ([the statute](https://www.legislation.gov.uk/ukpga/2025/18/schedule/12/enacted), [the commencement regulations](https://www.legislation.gov.uk/uksi/2026/82/contents/made)).

Paragraph 5 exempts storage or access where the sole purpose is to "collect information for statistical purposes about how the service is used with a view to making improvements," the information isn't shared, the user gets "clear and comprehensive information" about the purpose, and the user has "a simple means of objecting, free of charge," and doesn't object.

The ICO calls it the analytics exception and draws the boundary in one sentence: "**It is about how your service is used, not about who uses it.**" Their published examples ([ICO guidance on storage and access technologies](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/what-are-the-exceptions/), last updated April 29, 2026):

| Covered | Not covered |
|---|---|
| Visits page by page, traffic, user journeys | Logs or recordings of individual visitors |
| Scroll depth and on-page interactions | Whether someone viewed or clicked an advert |
| Device type, browser and OS versions | Linking a visitor ID to conversions shared with ad partners |
| Referrer, search, campaign source | Tracking or profiling individuals |
| Coarse geolocation at city or region level | Monitoring browsing across different services |
| Load speed, bounce rate, exit pages | Anything for online advertising |

Two conditions vendors skate past, and we won't. The exemption **requires** you to explain the analytics in your privacy notice, and it **requires** a simple free way to object. The ICO says a toggle that's on by default is fine, and that you can't rely on browser settings alone. A site running "exempt" analytics with no disclosure and no opt-out isn't covered by the exemption it's claiming.

Third-party tools are explicitly allowed — but your provider "must be a processor, not a joint controller," must use the data only to improve *your* service, and must not pool it with anything else.

## France: criteria, and no more approved list

CNIL's audience-measurement exemption under Article 82 of the *loi Informatique et Libertés* is narrower. A tracker's purpose must be strictly limited to measuring that one site, for the publisher alone, producing anonymous statistics only — and it must not cross-reference with other processing, pass non-anonymous data to third parties, or let a person be followed across sites or apps ([CNIL, July 4, 2025](https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies-solutions-pour-les-outils-de-mesure-daudience)).

Their self-assessment tool is unusually specific: referrer, if collected, limited to host or domain; no CRM or campaign IDs imported from URLs; browser and OS reduced to major version; if a fingerprint is used at all, the hash must carry a site-specific component *and* a time component, so it can't follow anyone anywhere or for long.

**Nobody can say "CNIL-approved" any more.** CNIL retired its published list of evaluated tools in July 2025 and replaced it with self-assessment, and it explicitly forbids the phrasing — you may not present a solution as *« certifiée »* or *« validée par la CNIL »*. If a vendor tells you they're CNIL-approved, they're describing a programme that no longer exists.

## GDPR doesn't go away either

Two rulebooks. Clearing ePrivacy doesn't clear GDPR.

If a tool processes an IP address, even for a moment, that can be personal data — *Breyer* (C-582/14, October 19, 2016) held a dynamic IP is personal data for a site operator **if** that operator has legal means to identify the visitor using information held by the access provider. Conditional, not blanket. Where it applies you need an Article 6 basis, and legitimate interest under 6(1)(f) is the normal answer, which brings a balancing test and a right to object.

Privacy-friendly analytics doesn't make GDPR stop applying. It makes it apply to a much smaller, shorter-lived pile of data with an easier case to make.

## What Feasible stores, exactly

Here's our side, with no rounding in our favour.

**No cookies.** None, ever, for visitors on a tracked site.

**We do use `localStorage`, for two things.** Every event is written to a small retry queue before the request goes out, so a dropped connection doesn't become a missing pageview; a successful response deletes it. And if you set `feasible_ignore` yourself, we skip you. That's storage on the device, and under Article 5(3) storage is storage. We're not going to pretend it isn't there to get a cleaner sentence.

**No visitor identifier is stored on the device at all.** The visitor hash lives on our side: a daily-rotating SipHash of user agent, IP and domain. The salt changes every UTC day and the old one is unrecoverable, so nobody — us included — can connect Tuesday's visitor to Wednesday's. It's site-scoped, so it can't follow anyone between sites.

**It's pseudonymous, not anonymous.** We won't use the second word. Pseudonymous data is still personal data, and a vendor who upgrades that adjective is telling you something about the rest of their claims.

**The raw IP never reaches disk.** Geolocation and hashing happen in the ingest tier and the address is discarded before anything is written. Geolocation is a local lookup against DB-IP Lite — country, region, city, no network call per pageview, nothing finer.

**Where we don't clear a bar:** we're a US company in Oregon with no EU region, and transfers run on standard contractual clauses through [our DPA](/dpa/). CNIL's own suggested alternative for anyone worried about transfers is a tool that makes none, and that isn't us. If EU-only hosting is your requirement, buy from someone who has it.

## So — do you need one?

**Most sites running Feasible won't need a consent banner.** The UK now has a statutory exemption written for exactly this, and the practices it describes are the practices we implement. Elsewhere in the EU it's a strong case rather than a settled one — stronger for a tool that stores no identifier on the device and can't follow anyone across sites.

Do two things either way, because both are cheap and both are conditions of the UK exemption: put a plain sentence in your privacy policy saying you measure traffic and how, and give people a simple free way to opt out.

If you're somewhere strict, or regulated, or you'd just rather be certain — ask your own lawyer. **We're an analytics company, not your counsel, and nothing here is legal advice.** Every rule above is linked so your lawyer can start from the source instead of from us.

More on the mechanism in [the docs](/docs/), and the rest of what we don't collect is on [the privacy page](/privacy/).
