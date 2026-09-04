---
title: "What is a visit, and when does it end?"
description: "A visit is one sitting. It stays open while somebody's active and closes after 30 minutes of nothing."
category: "reports"
weight: 30
---

A visit is one sitting, and it closes after 30 minutes of inactivity.

Other tools call it a session. Same idea: a run of activity from one visitor with no long gap in it. Somebody who reads three pages, wanders off for an hour, then comes back is one visitor and two visits.

Thirty minutes is also the window behind the live visitors pill in the top bar — "current visitors" is everyone whose visit is still open, which is exactly the same thing.

What keeps a visit open is any event we receive: a pageview, an outbound click, a form submission, an engagement ping. What closes it is silence.

Three consequences that come up:

**Attribution is frozen at the start of the visit.** The source, channel and campaign are decided by how the visit began and never rewritten. Somebody arrives from a newsletter, wanders through your site, and gets bounced through a payment page on the way back — the visit still belongs to the newsletter. That's deliberate, and it's [why Stripe never shows up as your best marketing channel](/help/why-doesnt-stripe-show-up-as-a-source/).

**A visit can straddle midnight.** It's counted in the day it started, on your site's own time zone — the one you picked when you [added the site](/help/how-do-i-add-a-site/).

**Visit duration is measured, not inferred.** Because engagement is sent as its own event, a single-page visit still has a real duration rather than a zero.

Some metrics are counted on the visit — bounce rate, visit duration, views per visit — and some on the individual event, like time on page. That distinction is also what [event scope versus session scope](/help/event-scope-vs-session-scope-for-custom-properties/) is about when you're setting up custom properties.
