# Module 2 Priority Backlog — HRBA E-learning Course

## Purpose of this file

This backlog converts the Module 2 QA findings into a clear implementation sequence for Codex or a development team.

The aim is to improve Module 2 quality without unnecessary redesign or broad uncontrolled changes.

## Priority definitions

| Priority | Meaning |
|---|---|
| High | Must be addressed before final deployment or serious learner testing |
| Medium | Important quality improvement; should be addressed after high-priority fixes |
| Low | Polish item or optional enhancement |

## Priority backlog

| Priority | Screen | Area | Issue | Recommended improvement | Impact | Effort |
|---|---|---|---|---|---|---|
| High | Global / M2-S03, M2-S10, M2-S16, M2-S17 | Contrast | Disabled Continue buttons have weak text/background contrast | Update shared disabled button styling to meet WCAG AA contrast while still appearing inactive | High | Small |
| High | Global | Readability | Muted text, helper text, labels, badges, and progress text may be too pale on pale mint or gradient backgrounds | Audit and strengthen text color tokens and UI state styles used in Module 2 | High | Small |
| High | M2-S04 | Hotspot/diagram clarity | Rights Dimensions Hotspot may become difficult to read on smaller screens | Improve responsive hotspot layout, label containers, and diagram scaling | High | Medium |
| High | M2-S08 | Diagram accessibility | Actor/rights-holder map contains learning-critical information and may not have sufficient alt text or long description | Add meaningful alt text or adjacent long text description; improve scalable layout | High | Medium |
| High | M2-S18 | Hotspot readability | Hotspot labels over complex image may blend into background | Add solid or semi-transparent label containers; ensure hotspot text remains readable | High | Small/Medium |
| High | M2-S06 | Accessibility | Matching interaction may be difficult for keyboard or mobile users if drag-and-drop is required | Ensure clear non-drag alternative and keyboard-accessible matching behavior | High | Medium |
| High | M2-S03 | Accessibility | Flip cards may expose hidden back-face content to screen readers or lack clear focus behavior | Improve flip-card aria behavior, focus state, and screen reader handling | High | Medium |
| Medium | M2-S17 | Interaction states | Radio selection/correct/incorrect states may rely too much on subtle color changes | Add stronger border, icon, label, or text cue so feedback does not rely on color alone | Medium/High | Small |
| Medium | M2-S16 | Responsive layout | Accountability loop strip may wrap awkwardly on smaller screens | Improve responsive layout: stacked/mobile version or SVG/component-based responsive loop | Medium | Medium |
| Medium | Global / M2-S02, M2-S03, M2-S04, M2-S05, M2-S07, M2-S08, M2-S16, M2-S18 | Learning experience | Repeated “open all to continue” mechanics may create interaction fatigue | Vary completion logic; use partial exploration or optional enrichment for lower-stakes screens | Medium/High | Medium |
| Medium | M2-S10 | Layout | Dense content plus quick role check may cause long vertical scrolling | Improve visual anchoring, spacing, or sticky local progress/instruction support | Medium | Small/Medium |
| Medium | M2-S13 | Visual learning | SDG/LNOB linkages may be too text-heavy | Add linkage infographic showing overlap between SDGs, LNOB, and HRBA principles | Medium | Medium |
| Medium | M2-S22 | Accessibility | Knowledge check feedback/results may not be announced dynamically | Add aria-live or equivalent accessible feedback handling | Medium | Small |
| Medium | Global | Navigation/progress | Intra-screen progress such as “2 of 6 explored” may not remain visible enough | Ensure local progress indicators are clear, readable, and visible near interaction area | Medium | Small |
| Low | M2-S01A | Visual asset | Intro video placeholder may feel empty without a poster/thumbnail | Add professional video poster image or placeholder thumbnail | Medium | Small |
| Low/Medium | M2-S23 | Completion/transition | Start Module 3 CTA should be visually prominent and conclusive | Strengthen CTA hierarchy and completion visual emphasis | Medium | Small |
| Low | M2-S22 | Visual polish | Knowledge check could benefit from consistent icon set | Add lightweight icons for correct, retry, feedback, and completion states | Low/Medium | Small |

## Recommended implementation sequence

### Phase 1 — Global contrast/readability

Start here because it is high impact and low effort.

Actions:

1. Fix disabled Continue button styling.
2. Improve muted text and helper text contrast.
3. Strengthen progress indicator contrast.
4. Improve selected/disabled/completed state visibility.
5. Run build and commit.

### Phase 2 — Accessibility of interactions

Actions:

1. Review flip cards.
2. Review matching activity.
3. Review radio grids.
4. Review hotspots.
5. Review knowledge check feedback announcements.
6. Add keyboard/focus/aria improvements.
7. Run build and commit.

### Phase 3 — Hotspot and diagram clarity

Actions:

1. Improve hotspot label containers.
2. Improve responsive scaling.
3. Add meaningful alt text or long descriptions.
4. Improve M2-S04, M2-S08, and M2-S18.
5. Run build and commit.

### Phase 4 — Interaction fatigue reduction

Actions:

1. Identify all reveal-all gated screens.
2. Keep strict gating only where it supports essential learning.
3. Allow partial exploration or quick-check completion on lower-stakes screens.
4. Improve local progress messaging.
5. Run build and commit.

### Phase 5 — Visual asset integration

Actions:

1. Add M2-S01A video poster.
2. Add or prepare M2-S13 linkage infographic.
3. Integrate improved M2-S04 and M2-S18 visuals if available.
4. Improve M2-S16 accountability loop if needed.
5. Run build and commit.

### Phase 6 — Final QA and deployment readiness

Actions:

1. Run `npm run build`.
2. Check all Module 2 screens.
3. Check navigation and progress.
4. Check responsive layout.
5. Check console/build errors.
6. Push to GitHub.
7. Confirm Vercel deployment succeeds.

## Best Codex use strategy

Use one focused prompt per phase. Do not ask Codex to fix all issues at once.

Each Codex prompt should include:

- scope
- target screens
- exact issue type
- constraints
- required build command
- commit message

## Recommended first Codex prompt

Use a focused contrast/readability prompt first.

Suggested commit message:

```text
Improve Module 2 contrast and readability
```

## Do not do

Do not ask Codex to:

- redesign Module 2 broadly
- change learning content unnecessarily
- disable TypeScript or accessibility rules
- remove interactions without checking learning purpose
- replace all visuals at once
- make large unrelated refactors
