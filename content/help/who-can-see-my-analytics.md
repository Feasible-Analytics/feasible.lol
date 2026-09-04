---
title: "Who can see my analytics?"
description: "You, and whoever you invite. Everything public is opt-in, and there's a role for read-only and a role for one site."
category: "privacy-and-the-law"
weight: 120
---

You, and the people you invite. Nobody else, unless you choose to publish it.

Your [dashboards](/features/teams-and-sharing/) are private by default. There is no directory of customer sites, no public index, and no way for someone to guess their way in.

**Inside your team**, access is decided by [role](/help/what-are-the-team-roles/). A viewer reads dashboards and changes nothing. An editor manages site settings. A billing role sees the invoices and not much else. Owner and admin can manage people. If somebody only needs one site — a client, a contractor, a freelancer — give them a [guest role](/help/how-do-guest-roles-work/) and they'll see that site and no trace of the others.

**Outside your team**, there are exactly three ways data leaves, and all three are things you turn on:

- **A public dashboard.** A stable URL anyone can open. Off unless you switch it on.
- **A shared link.** A tokenized URL you can hand to a client. Optionally password-protected, optionally pinned to a segment so the viewer sees one country or one campaign and can't widen it. Revocable whenever you like.
- **An API key.** Whatever you build with it.

**Us.** Cloudmanic Labs runs the servers, so the data sits on our infrastructure — one database file per account, encrypted volumes, and the constraint that [there's no IP address in it](/help/do-you-store-ip-addresses/) to begin with. We don't sell it, share it, or feed it to anyone. [Not ever](/help/do-you-sell-my-data/).

A password-protected shared link deliberately can't be embedded in an iframe. Serving a password form without frame protection is how you get it clickjacked, so we refuse the combination rather than let you set up something that looks safe and isn't.
