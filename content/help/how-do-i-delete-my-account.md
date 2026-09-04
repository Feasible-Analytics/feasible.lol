---
title: "How do I delete my account?"
description: "Settings, Delete account, then a code we email you. It's a real purge, not a flag on a row — export first."
category: "account-and-billing"
weight: 90
---

**Settings → Delete account.** We email you a confirmation code, you type it in, and it's done.

The code step is there because this isn't reversible and a stray click shouldn't do it.

**Export first.** [One ZIP](/help/how-do-i-export-my-data/) with ten roll-up CSVs and the raw events. Once the deletion runs, we can't get any of it back for you — that's the point.

What deletion actually does: your account database and every site in it are removed, your rows in the system database go, and if you had a subscription we ask the payment provider to delete their customer record too, retried until it succeeds. It's a purge, not a `deleted_at` column that keeps everything around forever.

What survives, and why:

- **Invoices.** Tax law requires keeping them. They're financial records, not analytics.
- **Deletion tombstones** — a marker saying an account was deleted, so nothing tries to resurrect it.

If you'd rather remove one site than the whole account, **Site settings → Delete site** does that. There's also a **Reset** option that erases a site's analytics and keeps the site — useful when you've been testing and want a clean start.

Two alternatives worth a moment before you go through with it:

**Just stop paying.** Do nothing and the account winds down on its own: dashboard locks at 30 days, collection stops at 60, deletion at 90, with nine emails on the way. [The full timetable](/help/what-happens-after-the-trial/). That gives you three months to change your mind.

**Tell us why.** Genuinely — [email us](mailto:help@feasible.lol). If we're missing something you needed, we'd rather find out from you than from a churn chart.
