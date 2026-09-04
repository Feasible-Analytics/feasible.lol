---
title: "Teams, roles and shared dashboards"
description: "Unlimited team members on every plan, five roles plus two per-site guest roles, and shared links you can password-protect, pin to a segment or embed."
lede: "Invite everyone. There's no per-seat price, so nobody has to share a login."
weight: 60
shot: "app/sharing.png"
shotAlt: "The Sharing settings screen for northwind.example, showing a public dashboard URL with a 'Make it private' button, two shared links named Board pack and Agency client with password and embeddable columns, and an embedding section with an iframe snippet."
note: |
  There's no SSO and no SAML. It isn't built, and the team settings page says so
  on screen rather than in a footnote. When it lands it'll be in the one plan
  like everything else, but today, if your company requires SAML to approve a
  tool, Feasible won't pass that review.
---

Every plan has unlimited team members. Not ten, not "contact us" — unlimited,
because the number is zero in the code and there's nowhere to put a cap.

Five team roles, plus two guest roles scoped to a single site.

## Who can do what

**Owner** — everything, including deleting the team and transferring ownership.
There's exactly one, always.

**Admin** — sites, settings, members and billing. Everything except ending the
team or handing it on.

**Editor** — sites and site settings, no access to members or money.

**Billing** — the dashboard and the billing screens. For the person who pays the
invoice and shouldn't be able to delete a site.

**Viewer** — the dashboard. Nothing else.

Then **guest editor** and **guest viewer**, invited to one site and seeing
nothing else about the team — not the other sites, not the member list. That's
the role for a client or a contractor.

Guests sit deliberately outside the ranking the other roles use, so an internal
check for "at least an admin" can never accidentally let one through. An
unrecognized role fails closed.

A few rules the interface enforces so you don't have to think about them: nobody
can change the role of somebody who outranks them, the last owner can't be
removed or demoted, and handing over ownership promotes the other person and
demotes you to admin in the same move. Two people who can each delete the
account and neither of whom can stop the other isn't a state anyone can reason
about.

{{< shot src="app/team.png" alt="The team settings screen showing members Ada Reyes as Owner and Jonah Six as Editor, a guests section, two pending invitations expiring in 47 hours, an API keys list, an ownership transfer control, and a single sign-on panel stating SAML 2.0 is not built yet." caption="Invitations expire after 48 hours. An expired one can be resent." >}}

Invitations go to any address, whether or not it already has an account here,
and expire **48 hours** after they're sent. That's short on purpose — an
invitation link is a credential sitting in an inbox, and most of them are
accepted within the hour.

[API keys](/features/api-and-webhooks/) belong to the team they were created
against, not to the person. A key reads that team's sites and no others even if
its creator belongs to five teams, and it stops working the moment they leave.
Viewers and guests can't create keys at all.

## Three ways to show somebody the numbers

**A public dashboard.** Flip it on and the site's traffic is readable by anyone
with the URL — no token, no login, at an address that still works next year.
Good for an open startup, a nonprofit, or anyone who's decided their numbers
aren't a secret.

**A shared link.** A 128-bit token in a URL, revocable from the settings screen.
Give it to someone once and take it back later without touching anybody's
account.

**An embed.** Any shared or public link takes `embed=true`, a `theme` of light,
dark or system, and a `background` color, and drops into an iframe on your own
page. The signed-in dashboard refuses to be framed at all — an authenticated
dashboard inside somebody else's iframe is how you click a delete button you
never saw.

A shared link can carry a password, hashed with PBKDF2-SHA256 at 200,000
iterations, with two brute-force budgets: six attempts from one source and sixty
across all sources per link, over fifteen minutes.

It can also be **pinned to a segment**. The filters are baked into the link and
the viewer can't remove them, so an agency client sees their campaign and only
their campaign — not the whole account with a filter they could clear by
pressing Escape.

Two honest limits on embedding. A password-protected link can't be embedded, and
that isn't a setting we forgot: serving a password form that any site may frame
is a form an attacker can hide under a button on their own page. Make a second
link without a password. And some ad-blocker filter lists block embedded
analytics dashboards, so a visitor running one may see an empty space where the
iframe should be. If that matters, link to the dashboard instead of embedding it.

## Why seats aren't a product

Because per-seat pricing doesn't reduce the number of people looking at your
analytics. It reduces the number of *accounts*.

What actually happens is one login in a password manager, shared by six people,
which nobody revokes when one of them leaves. The pricing model that was meant
to capture more value quietly deleted your audit trail and your ability to
remove access. Charging for seats on a tool whose entire job is to be looked at
is a tax on the thing you want to encourage.

So: invite the whole company, give the designer a viewer role, give the
contractor a guest role on one site, and revoke it when they're done. It costs
the same. Turn on the [team-wide two-factor policy](/security/) while you're there.
Details in [the docs](/docs/), and the price is on [one page](/pricing/).
