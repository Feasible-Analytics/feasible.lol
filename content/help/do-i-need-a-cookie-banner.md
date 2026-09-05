---
title: "Do I need a cookie banner?"
description: "Most sites won't need one for Feasible. We set no cookies and store no identifier on the visitor's device."
category: "privacy-and-the-law"
weight: 10
updated: 2026-09-03
---

Most sites won't need a consent banner for Feasible.

We don't set a cookie. Not a first-party one, not a third-party one, not a "functional" one. There's no identifier stored on your visitor's device that persists between visits, so there's nothing for a banner to ask about on our behalf. [How we count people without one](/help/how-do-you-count-unique-visitors-without-cookies/) is a daily hash that's thrown away every night.

The consent rules - Article 5(3) of the ePrivacy Directive in the EU, PECR in the UK - are about **storing or reading information on someone's device**, not about analytics as a category. The GDPR is a separate rulebook, and clearing one doesn't clear the other. That's why [cookieless analytics](/cookieless-analytics/) usually falls outside them.

Two qualifications, because this is the part vendors skip.

The script does write one short-lived key to `localStorage`: a retry queue holding the event that's currently in flight, deleted the moment our server acknowledges it. It's not an identifier, it doesn't survive being sent, and nothing reads it back. There's a second key only if you've explicitly told that browser to [ignore you](/help/how-do-i-exclude-my-own-visits/).

The EDPB's Guidelines 2/2023, adopted in October 2024, read the technical scope of Article 5(3) more broadly than the usual "no cookies, no banner" slogan, so it's worth knowing that key exists rather than finding out later.

The UK now has a real statutory exemption for first-party analytics - PECR Schedule A1, paragraph 5, in force since February 5, 2026. It's genuine, and it has conditions: you have to give visitors clear information about the measurement and a simple, free way to opt out.

**None of this is legal advice.** We're an analytics company, not your lawyer. If you're in a strict jurisdiction, in a regulated sector, or running other trackers alongside us - ads, session recording, a chat widget - check with somebody who is. And if you still keep a banner, [our consent gate](/docs/script-options/) will hold events until you say go.
