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

Every plan has unlimited teammates. Five roles cover the team. Two more cover
guests on one site.

## Who can do what

**Owner** - everything, including deleting the team and transferring ownership.
There's one, always.

**Admin** - sites, settings, members and billing. Everything except ending the
team or handing it on.

**Editor** - sites and site settings, no access to members or money.

**Billing** - the dashboard and the billing screens. For the person who pays the
invoice and shouldn't be able to delete a site.

**Viewer** - the dashboard. Nothing else.

**Guest editor** and **guest viewer** see one site. They can't see the rest of
the team.

Nobody can change the role of someone above them. The last owner can't be
removed. Transferring ownership makes the old owner an admin.

{{< shot src="app/team.png" alt="The team settings screen showing members Ada Reyes as Owner and Jonah Six as Editor, a guests section, two pending invitations expiring in 47 hours, an API keys list, an ownership transfer control, and a single sign-on panel stating SAML 2.0 is not built yet." caption="Invitations expire after 48 hours. An expired one can be resent." >}}

Invitations expire after **48 hours**.

[API keys](/features/api-and-webhooks/) belong to the team. They stop working
when their creator leaves. Viewers and guests can't create them.

## Three ways to show somebody the numbers

**A public dashboard.** Anyone with the URL can read it. No login.

**A shared link.** Send a private URL and revoke it later.

**An embed.** Put any public or shared dashboard in an iframe. Pick a light,
dark, or system theme.

A shared link can use a password. Attempts are rate-limited.

You can also **pin filters** so a client sees one campaign, country, or page.

Password-protected links can't be embedded. Some ad blockers also hide embedded
analytics. Use a normal link when either matters.

## Why seats aren't a product

Per-seat pricing creates shared logins. Shared logins make access harder to
revoke and remove the audit trail. So invite everyone. Give each person the
right role. It costs the same.

Turn on [team-wide two-factor authentication](/security/) while you're there.
