# 06_NAVIGATION_AND_STATE_FLOW.md
# Navigation and State Flow Map

## Purpose

Maps the complete learner flow across the outer platform, internal player, modals, reveals, quiz states, and completion states.

## Do not skip transition screens

The learner must not jump directly from the course homepage to Slide 1. The required path is:

Course Homepage → Launch Wrapper → Click to Launch Manually → Start Screen → Slide 1.

## Outer platform flow

`OP-DASH-01-base` → `OP-COURSE-01-overview` → `OP-COURSE-02-homepage` → `OP-LAUNCH-INTRO-01-failure` → `INT-START-base`.

After Introduction completion:

`INT-S06-complete` → Exit → `OP-INTRO-01-completed` → **Next >** → `OP-MOD1-01-overview` → `OP-LAUNCH-MOD1-01-failure` → `M1-START-base`.

After Module 1 completion:

`M1-S26-complete` → Exit → `OP-MOD1-02-completed-pending`.

## Introduction player flow

`INT-START-base` → `INT-S01-base` → `INT-S02-base` → `INT-S03-base` → `INT-S04-base` → `INT-S05-reveal-initial` → `INT-S05-reveal-partial` → `INT-S05-reveal-full` → `INT-S06-complete`.

Slide 4 plus buttons open audience modals and close back to Slide 4. Slide 5 buttons open pending modals and close back to full reveal state.

## Module 1 player flow

`M1-START-base` → `M1-S01-base` → `M1-S02-base` → `M1-S03-base` → `M1-S04-base` → `M1-S05-base` → `M1-S06-base` → `M1-S07-reveal-initial` → `M1-S07-reveal-full` → `M1-S08-unanswered` → feedback → `M1-S09-base` → `M1-S10-base` → `M1-S11-pending` → `M1-S12-base` → `M1-S13-base` → `M1-S14-base` → `M1-S15-unanswered` → solution/feedback → `M1-S16-pending` → `M1-S17-pending` → `M1-S18-base` → `M1-S19-base` → `M1-S20-unanswered` → `M1-S21-pending` → `M1-S22-pending` → `M1-S23-pending` → `M1-S24-result-75` → `M1-S25-summary-child-rights` → `M1-S26-complete`.

## Modal rule

Modals do not change slide number. They dim the parent slide and close back to the exact parent state.

## Reveal rule

Reveal states remain on the same slide number. Do not convert reveal states into separate slides unless the source shows a new slide number.

## Quiz result flow

`M1-S24-result-75`: **Back to start** returns to `M1-S20-unanswered`; **Review the quiz** opens `M1-S24-review-pending`; Next goes to `M1-S25-summary-child-rights`.

## Summary tab flow

Slide 25 opens with **Child rights** active. **Child discrimination** and **Common Country Analysis (CCA)** tabs show pending content.

## Locked/unlocked rules

Before Introduction completion: Module 1 locked. After Introduction completion: Module 1 available. After Module 1 completion: next platform state pending; do not invent Module 2 behavior.
