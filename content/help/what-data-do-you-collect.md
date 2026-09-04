---
title: "What data do you collect?"
description: "A short, complete list: the page, where the visit came from, a rough location, the device, and a hash that expires nightly."
category: "privacy-and-the-law"
weight: 30
---

Here's the whole list. It fits on a screen.

**About the page:** the URL path, the hostname, the page title, and the name of the event if it isn't a pageview.

**About where the visit came from:** the referrer, a source and a channel derived from it, and `utm_source`, `utm_medium`, `utm_campaign`, `utm_content` and `utm_term` if the link carried them.

**About the visitor's setup:** browser and version, operating system and version, device type, screen-size bucket (four buckets, not pixel dimensions), and browser language.

**About where they are:** country, region and city, looked up from a database on our own disk. The lookup is deliberately coarse and there's no network call — no third party learns anything about your visitor.

**About engagement:** time on the page and how far down it was scrolled, both accrued only while the tab is actually visible and focused.

**Anything you send us:** custom event names, custom properties, and a revenue amount and currency if you're tracking that.

**And one identifier:** a 64-bit hash of the user agent, the IP and your domain, keyed to today's salt. Tomorrow it's a different number and yesterday's salt is gone. [How that works](/help/how-do-you-count-unique-visitors-without-cookies/).

That's it. Roughly 210 bytes per event on disk.

The more interesting list is [what we don't collect](/help/what-do-you-not-collect/) — and please don't put an email address, a user ID or anything else that names a person into a custom property. The [DPA](/dpa/) forbids it, and there's no report that would be improved by it.
