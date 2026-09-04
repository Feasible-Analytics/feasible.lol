---
title: "How does Feasible handle PECR?"
description: "PECR is about storing and reading information on a device. We store no cookie and no identifier — plus the UK's new statutory analytics exemption."
category: "privacy-and-the-law"
weight: 100
---

PECR is about what you put on somebody's device, and we don't put an identifier there.

The UK's Privacy and Electronic Communications Regulations — regulation 6 — govern storing information on, or reading information from, a visitor's terminal equipment. That's why cookie banners exist. It isn't a rule about analytics as a category.

Feasible sets no cookie and stores no identifier. The visitor is recognised for the day by [a hash computed on our server](/help/how-do-you-count-unique-visitors-without-cookies/), never written to the browser. That's the substance of it.

The honest caveat: the script does write one short-lived `localStorage` key, a retry queue holding the event currently in flight, deleted as soon as our server takes it. It isn't an identifier and nothing reads it back, but it is technically storage on the device, and you should know it's there rather than discover it. There's a second key only if you've told that browser to [ignore you](/help/how-do-i-exclude-my-own-visits/).

**Since February 5, 2026 the UK has a real statutory exemption for first-party analytics** — PECR Schedule A1, paragraph 5. It's a genuine change and worth knowing about. It also has conditions: you have to give visitors clear information about the measurement, and a simple, free way to opt out. It isn't a blanket "analytics never needs consent" rule, and anyone telling you it is hasn't read it.

So in practice: most UK sites won't need a banner for Feasible, and if you rely on the exemption, say what you measure on your privacy page and offer the opt-out.

**None of this is legal advice.** If you're running ads, a chat widget or session recording alongside us, your banner question isn't really about us. [The cookie banner answer](/help/do-i-need-a-cookie-banner/) has the wider picture.
