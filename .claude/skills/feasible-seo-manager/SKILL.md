---
name: feasible-seo-manager
description: Run one work session on an SEO campaign whose plan lives in a Harbor note. Reads the campaign note to find out what is next, does that work, records actuals and findings back to the note, and reports briefly. Use for any recurring "do the next SEO thing" run, on any campaign, at any cadence.
---

<!--
  Feasible SEO manager skill • v1.0.0
  Created: 2026-09-06
  Copyright (c) 2026 Cloudmanic Labs, LLC. All rights reserved.

  This repository is public. This file carries no campaign IDs, no targets, no
  competitor analysis and no strategy. All of that lives in Harbor. The skill
  discovers what it needs at runtime.
-->

# SEO campaign manager

## What this is

One invocation is **one work session on one campaign**, not a status check.

A campaign is a Harbor note. The note holds the plan, the targets, the running
log, and the actuals. This skill reads the note, works out what is next, does it,
writes the result back, and reports in a few lines.

The note is the source of truth. When this file, a chat, a report or an artifact
disagrees with the note, **the note wins.**

## Prerequisites

Read the `harbor` skill before touching a note. It covers login, the
read-modify-write pattern, and formatting. Two things it teaches that matter
most here:

- `notes update` **replaces the whole body**. Never patch by guessing. Fetch,
  edit, write back.
- Campaign notes are plain Markdown with GFM tables on purpose, so they survive
  round-trips. Keep them that way. Do not introduce coloured HTML.

The OpenSEO MCP tools provide the data. The `keyword-research`,
`keyword-clustering`, `competitor-analysis`, `link-prospecting` and `seo-audit`
skills are available when a run calls for that kind of work; prefer them over
improvising.

---

## Step 1. Resolve the campaign

Campaign notes are found by tag. The convention is a tag ending in `-seo`, one
per product.

```bash
# Was a campaign named in the invocation? Use it. Otherwise discover.
harbor tags list --json --limit 500 | jq -r '.data[] | select(.name|endswith("-seo")) | "\(.id)\t\(.name)"'

# Notes under a campaign tag. NOTE: search results key the note as `note_id`,
# not `id`. `harbor tags notes` returns `id`. Both are used below deliberately.
harbor tags notes "$TAG_ID" --json | jq -r '.data[] | "\(.id)\t\(.title)"'
```

Resolution rules, in order:

1. A campaign named in the invocation wins.
2. Otherwise, prefer the tag matching this repository's product.
3. If exactly one campaign tag has an active note, use it.
4. If several do, **ask which one.** Do not guess, and do not run all of them.

Read the whole note before doing anything:

```bash
harbor notes get "$NOTE_ID" --format markdown --json | jq -r '.content'
```

If no campaign note exists, do not invent one. Say so and ask whether to create
one, offering to draft the plan first.

---

## Step 2. Orient

From the note, establish:

- **Where we are.** Which period of the plan is current, and how far into it.
- **What was already done.** Read the run log. Never repeat completed work, and
  never re-buy research the log says was bought inside its stated freshness
  window.
- **What is in flight.** A PR open, an outreach message sent, a page awaiting
  review.
- **What is blocked.** Anything the note says is waiting on a human. Work around
  it; do not stall on it.
- **What is owed.** Decisions the plan says a human must make by a date.

Also check the OpenSEO project research log before spending, for the same reason.

---

## Step 3. Measure

Two sources, and they answer different questions. Read both.

**Search Console tells you what Google is doing** — impressions, average
position, indexed page count, and which queries are close to breaking through.
It is the leading indicator. It is also the only place to see a query that has
not earned a click yet.

**The analytics platform tells you what actually happened** — real people, real
sessions, real conversions. It is the lagging indicator and the one the target is
written in. A number reported to a stakeholder comes from here.

Never report a Search Console click count as traffic. They disagree, always, and
the analytics number is the one that was measured on the site.

### Reading the analytics

Use `analytics.sh` beside this file rather than hand-writing queries. A six-month
log is only worth keeping if week 3 and week 19 were counted the same way, and
one script is how that stays true.

```bash
export FEASIBLE_SITE=<site>                    # the site id in the platform
export FEASIBLE_API_KEY_REF=<op:// reference>  # named in the campaign note
export FEASIBLE_GOAL=<conversion event>        # optional, the note names it

./analytics.sh weekly 7d      # the full reading, ready to paste into the note
./analytics.sh organic 28d    # the committed metric, with period-over-period change
./analytics.sh channels all   # where everything is coming from
./analytics.sh entry 28d      # which pages organic visitors actually land on
./analytics.sh goals 28d      # conversions, split by channel
./analytics.sh pages 28d      # top pages overall
./analytics.sh raw '<json>'   # anything else the API supports
```

The credential is never written into this repository. The campaign note names
which secret reference to use; the script reads it at call time, keeps it out of
the process list, and suppresses tracing around it.

### Intent is not conversion

This is the easiest number on the page to get wrong, and getting it wrong makes
the whole log dishonest.

An event named after a click — someone pressed the button that goes to the
signup page — measures **intent**. It says a visitor was interested. It does not
say an account exists. The conversion event fires later, from the application,
when the thing actually happened.

Report them as separate numbers, always. Never total them. Never describe an
intent count as signups, trials, or conversions.

`analytics.sh` enforces the split: `FEASIBLE_INTENT_EVENT` and
`FEASIBLE_CONVERSION_EVENT` are different settings. When no conversion event is
configured, the weekly reading prints `NOT_INSTRUMENTED` rather than a zero,
because "nobody converted" and "nothing is measuring conversions" are different
facts and a zero would hide the difference.

If a campaign's target is written in conversions and the conversion event does
not exist yet, **say so on every run** until it does. A target that cannot be
measured is a target that cannot be met.

### Two API behaviours worth knowing

- A period-over-period `change` is **null**, not zero, when the earlier period was
  zero. Report "no prior data", never "0% growth".
- `event:goal` can only be filtered on, never grouped by. Break events down
  across channels instead. `analytics.sh goals` already does this.

### The rest of the free readings, every run

- **Indexing**: did pages published since the last run get indexed? Chase the
  ones that did not.
- **The site itself**: fetch anything you are about to make a claim about.

Take the paid readings on the note's stated measurement cadence, not every run:

- Rank tracker check
- Backlink profile, ours and competitors'
- Site crawl

Then compare against this period's target and write the delta down. If the trend
has broken from plan for two consecutive periods, that is a reportable event, not
a footnote.

### Rank trackers

Create and run trackers freely for terms the campaign is actually working. Use
`estimate_rank_tracker_cost` before adding keywords to a scheduled tracker, keep
scheduled checks aligned to the note's measurement cadence, and record the
tracker id in the note so later runs reuse it instead of creating duplicates.

---

## Step 4. Decide what to do

**One clear deliverable per run.** A run that ships one real thing beats a run
that half-starts four.

Priority order when choosing:

1. **Anything broken.** A page returning an error, a de-indexed page, a
   regression, a wrong published fact. Fix it first, always.
2. **Anything blocking discovery.** If pages are not being indexed, nothing else
   matters yet.
3. **The plan's next item** for the current period.
4. **Behind-plan recovery.** If actuals trail the target, pick the cheapest lever
   that closes the gap rather than the next scheduled item.
5. **Compounding work.** Links and pages that earn links outrank one more article
   when the two compete for the same session.

If the plan's next item is blocked on a human, take the next unblocked item and
note the swap.

---

## Step 5. Do the work

### Writing or editing pages

- Load the repository's private writing skill first, if present. If it is not
  there, **ask rather than guessing at the voice.**
- Obey the repository's `CLAUDE.md` without exception. It governs what may be
  claimed, how competitors may be named, and what is factually forbidden. Those
  rules outrank anything in the plan.
- Verify every claim against the source before publishing it. Prices need a
  source and the date they were read.
- Branch, commit, open a pull request, print the PR URL. Never push to the
  default branch.
- Run the repository's checks before pushing.

### Research

Buy what the decision actually needs. Do not under-buy to protect a credit
balance; a wrong decision costs more than the research. Report the balance in the
run summary, and if it is low enough to constrain the next few runs, **say so and
ask for a top-up** rather than quietly scaling back.

Log what was bought in the OpenSEO project research log so later runs do not
re-buy it.

### Outreach

Find the prospect, find the contact path, draft the message, and record it in the
note with enough detail that a human can send it or that the next run can follow
up. Do not send mail on someone's behalf unless the campaign note explicitly says
that is authorised.

---

## Step 6. Write it back

**Every run leaves a trace.** A run that produced nothing still logs that it ran
and what it found, so the gap is visible later.

Update three things in the note, by read-modify-write:

**1. The actuals table.** Fill in the real number for the current period beside
the target, taken from `analytics.sh`, not from Search Console and not from
memory. Never leave a period blank once it has closed, and never overwrite a
target to make an actual look better.

This table is the whole case for the work. A plan with targets and no actuals is
a wish. Six months of both, honestly filled in, is the only thing that proves the
campaign either worked or did not — so fill it in on the run the period closes,
including the runs where the number is bad.

**2. The run log.** Append one row per run. Keep it to one line unless something
genuinely warrants more:

```markdown
| Date | Did | Found | Next |
|---|---|---|---|
| 2026-09-08 | Rewrote the WordPress page, PR #12 | GSC shows 3 pages indexed, first impressions | Wait for indexing, then expand the cookieless explainer |
```

**3. Waiting on a human.** Keep a short list of open asks with the date each was
raised. Remove items once answered. If an ask has gone unanswered long enough to
put a target at risk, say that plainly in the run summary.

When something changes the plan itself — a target, a decision, a strategy shift —
add a line to the note's revision log saying what changed and why.

---

## Step 7. Report

Short. The reader is not following day to day.

- What shipped this run
- The number, against target
- What was learned that changes anything
- What is next
- Anything needed from a human, or "nothing needed"
- Credit balance, one clause

If nothing needed a human and nothing broke, that report is four lines. Do not
pad it.

---

## Cadence

**Recommended: once per weekday.**

The reason is throughput, not signal. Each run ships a piece of work, so five
runs a week ships five pieces. Ranks and traffic do not move daily on a young
site, but the writing, fixing and outreach queue does.

Measurement is separate from work and stays on the note's stated cadence, which
is usually weekly for anything paid. Reading Search Console is free, so it
happens every run.

Adjust for the campaign's phase. A launch week can take several runs a day. A
quiet consolidation month is fine at two or three runs a week.

---

## Guardrails

- **The note is the source of truth.** Do not carry a target, a date or a
  decision in your head across runs. If it is not in the note, it is not real.
- **Never invent a metric.** If a tool returns nothing, write "no recorded data",
  not a guess. Missing backlink or ranking data means missing, not penalised.
- **Check the results page before committing to a keyword.** Difficulty scores
  and search volume both mislead. Who actually ranks, and what shape their page
  is, decides whether a term is winnable and whether the intent matches the
  product. This has caught real errors; treat it as mandatory for anything you
  are about to build a page around.
- **Never target a term the product cannot honestly serve**, however easy it
  looks.
- **Never publish a competitor number without its source and the date it was
  read.**
- **Do not create issues in the issue tracker.** Fix the thing, or raise it in
  the run summary.
- **Do not publish anything outward-facing** — a public post, an email, a shared
  link — unless the campaign note authorises it. Drafting is always fine.
- **Merge only what the campaign note says you may merge.** Where a standing
  permission exists it is recorded there, with its boundary. Everything outside
  that boundary gets a pull request and a human. Permission to merge content is
  not permission to merge the templates, config or scripts that render it.
- **Report failure plainly.** A missed target gets stated and explained, never
  reframed. Inherited framing from an old note is not evidence; re-check before
  repeating it.

---

## Running several campaigns

Each campaign is one tag, one note, one independent plan. Nothing is shared
between them except this skill.

Run them separately. One invocation works one campaign, so its run log stays
readable and its actuals stay honest. If asked to cover several, do them in
sequence and report separately, never merged into one summary.

Products differ. A tactic that worked on one campaign is a hypothesis on the
next, not a conclusion.
