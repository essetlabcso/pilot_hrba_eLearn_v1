# 01 — Module 1 QA Summary

## Purpose

Summarize the key findings from the Module 1 QA review and define the practical upgrade direction.

## Scope

Module 1 only.

This file is for implementation guidance. It is not a redesign brief.

---

## Overall Assessment

Module 1 has a strong learning foundation.

The module already provides:

- a clear learning pathway
- practical HRBA framing for local CSOs
- scenario-based learning
- interactive exploration
- reflection and portfolio-oriented learning moments
- knowledge check and completion flow

The module does not need a full redesign.

The required work is a focused quality upgrade.

---

## Main Upgrade Priorities

### 1. Readability and contrast

The most urgent issue is text/background contrast.

Some text is difficult to read because it appears on pale mint, light green, gradient, navy, or muted backgrounds without enough contrast.

This affects:

- selected/active cards
- feedback panels
- helper text
- disabled buttons
- progress indicators
- modal/overlay text
- small labels

This must be fixed first.

### 2. Accessibility and interaction clarity

Module 1 uses interactive patterns such as cards, modals, buttons, surveys, and progress-gated screens.

The key accessibility and interaction issues are:

- modal focus behavior
- focus return after closing modals
- visible focus states
- disabled button clarity
- touch target size
- selected states relying too much on color
- progress indicators being too subtle

These should be fixed during the first implementation phase.

### 3. Visual learning support

A few screens explain abstract HRBA ideas mostly through text.

The priority screens needing stronger visual scaffolding are:

- M1-S2-01 — Who Has Responsibility?
- M1-S2-03 — From Services to Rights
- M1-S1-04 — Water Project Story

These screens should receive targeted visual supports, not decorative visuals.

### 4. Learner experience polish

The module needs small improvements that help learners feel guided and confident.

Priority UX polish areas:

- clearer disabled-button guidance
- clearer completion/explored states
- stronger sub-progress indicators
- portfolio save confirmation
- better modal placement on smaller screens
- clearer completion screen actions

---

## Recommended Implementation Approach

Use a phased approach.

Do not implement everything in one large task.

Recommended sequence:

```text
Phase 1 — Contrast and accessibility fixes
Phase 2 — Visual learning supports
Phase 3 — UX/navigation/progress polish
Phase 4 — Build and deployment check
Phase 5 — Final manual QA review
```

---

## What Not To Do

Do not:

- redesign the full module
- rewrite learner-facing content unnecessarily
- change the module sequence
- remove working interactions
- touch unrelated modules
- weaken TypeScript settings
- disable accessibility or linting rules
- add unnecessary dependencies
- commit secrets or environment files

---

## Expected Quality Outcome

After the upgrade, Module 1 should feel:

- readable
- accessible
- visually polished
- easier to navigate
- less text-heavy in abstract sections
- clearer in learner progress
- consistent with a premium HRBA e-learning experience
