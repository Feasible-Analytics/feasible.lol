---
title: "How do I turn on two-factor authentication?"
description: "Settings, Security, scan a QR code. Ten recovery codes, and an owner can require it for the whole team."
category: "account-and-billing"
weight: 80
---

Four steps, about two minutes.

1. Go to **Settings → Security**.
2. Click to start two-factor setup. A QR code appears.
3. Scan it with any authenticator app — 1Password, Authy, Google Authenticator, your password manager. It's standard TOTP; nothing proprietary.
4. Type the six-digit code to confirm.

**Save the ten recovery codes.** They're shown once. Each is single-use, and they're the only way back in if you lose the phone. Put them in your password manager, not in an email to yourself.

The codes are valid for a window of about 90 seconds either side of the current one, so a phone whose clock has drifted slightly still works.

Two things beyond the basics:

**An owner can require 2FA for the whole team.** Under **Settings → Team**, turn on the team-wide policy and everyone has to set it up. If you're handling anyone else's analytics, this is worth doing.

**Your 2FA secret is encrypted at rest**, with a key that's generated on first run if you don't supply one — so "encrypted at rest" is true by default rather than a configuration you might have missed.

Some other [security](/security/) bits on the same screens, while you're there:

- **Session list with per-session revoke.** See every signed-in device and kill the ones you don't recognise.
- **New-login email.** You get told when a new sign-in happens.
- **Password-changed email**, the same way.

Lost the phone *and* the recovery codes? [Email us](mailto:help@feasible.lol) from the account's own address. It's a manual process on purpose — an automatic bypass would make the whole thing decorative.

Deleting the account instead? [That's here](/help/how-do-i-delete-my-account/).
