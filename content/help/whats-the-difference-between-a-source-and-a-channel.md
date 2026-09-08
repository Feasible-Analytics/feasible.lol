---
title: "What's the difference between a source and a channel?"
description: "A source is the specific site. A channel is the bucket it belongs to. Same traffic, two zoom levels."
category: "reports"
weight: 50
---

A source is the specific place. A channel is the category it belongs to.

`google` is a source. `duckduckgo` is a source. Both sit inside the **Organic Search** channel. `twitter.com` and `reddit.com` are sources inside a social channel. Same traffic, two zoom levels.

Both are tabs on the **Sources** card, and they're the first two.

**Use channels for the weekly question** - is search up, is social carrying us, did the email do anything. Five or six rows make last month quick to compare.

**Use sources for the specific one** - which newsletter, which forum thread, which partner. Dozens of rows, and the one that jumped is usually the interesting thing.

Where each comes from: the source is derived from the referrer, or taken straight from `utm_source` if the link carried one, which is [the reason to tag your own links](/help/what-are-utm-parameters/). The channel is derived from the source and the medium together. Type the address by hand or arrive with no referrer at all and you're Direct.

Two things people trip on.

**Attribution is frozen when the visit starts.** Whatever brought someone in owns the whole visit, even if they bounce through a payment page in the middle of it. [That's why Stripe never appears as a source](/help/why-doesnt-stripe-show-up-as-a-source/).

**A blank source row reads "Direct / None".** It's not a bug and it's not one website called None - it's everyone who arrived without a referrer. Bookmarks, typed addresses, apps that strip the header, and a fair amount of traffic that came from an email client. Related: [what "(none)" means in a breakdown](/help/what-does-none-mean-in-a-breakdown/).

There's no standalone Referrers card, by the way. Referrer is a filter - pick it from the filter menu under **Acquisition** when you need the raw URL rather than the tidied-up source.
