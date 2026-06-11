# 10_SCREEN_IMPLEMENTATION_WORKBOOK.md
# Screen Implementation Workbook

## Status labels

Implementation: Not started, In progress, Implemented, Needs repair, Pending source content, Blocked.

QA: Not checked, Pass, Needs repair, Pending source content, Blocked.

## Implementation slices

| Slice | Name | Purpose |
|---|---|---|
| 1 | Foundation Shell | Global styles, shells, modal system, pending pattern, state engine. |
| 2 | Outer Platform Flow | Dashboard, course overview, homepage, launch wrappers, section pages. |
| 3 | Introduction Vertical Slice | Minimal platform-player-platform loop. |
| 4 | Full Introduction Module | All Introduction slides, modals, reveal states, completion. |
| 5 | Module 1 Slides 1–5 | Start, welcome, outcomes, concept links, example cards, child-rights modals. |
| 6 | Module 1 Slides 6–10 | CRC, timeline, SDG, EU obligations, EU Strategy, GMIs, resource view. |
| 7 | Module 1 Analysis and CCA | Pending Slide 11, Slide 12 sticky notes, Slide 13 CCA process. |
| 8 | Module 1 Case Study | Slides 14–18, case modals, question, solution, feedback. |
| 9 | Module 1 Quiz and Completion | Slides 19–26, result, summary, completion, return state. |
| 10 | Full QA and Repair | End-to-end QA and drift repair. |

## Slice 1 tracker

- Global visual design system — Not started / Not checked
- State engine — Not started / Not checked
- Outer platform shell — Not started / Not checked
- Course player shell — Not started / Not checked
- Modal system — Not started / Not checked
- Feedback modal system — Not started / Not checked
- Pending content pattern — Not started / Not checked
- Asset placeholder system — Not started / Not checked

## Slice 2 tracker

- `OP-DASH-01-base`
- `OP-COURSE-01-overview`
- `OP-COURSE-02-homepage`
- `OP-LAUNCH-INTRO-01-failure`
- `OP-INTRO-01-completed`
- `OP-MOD1-01-overview`
- `OP-LAUNCH-MOD1-01-failure`
- `OP-MOD1-02-completed-pending`

## Slice 3 tracker

- `OP-LAUNCH-INTRO-01-failure`
- `INT-START-base`
- `INT-S01-base`
- `INT-S01-help`
- `INT-S06-complete`
- `OP-INTRO-01-completed`

## Slice 4 tracker

- `INT-START-base`
- `INT-S01-base`
- `INT-S01-help`
- `INT-S02-base`
- `INT-S03-base`
- `INT-S04-base`
- `INT-S04-modal-audience-1`
- `INT-S04-modal-audience-2`
- `INT-S05-reveal-initial`
- `INT-S05-reveal-partial`
- `INT-S05-reveal-full`
- `INT-S05-modal-visit-modules-pending`
- `INT-S05-modal-finish-course-pending`
- `INT-S06-complete`

## Slice 5 tracker

- `M1-START-base`
- `M1-S01-base`
- `M1-S01-help`
- `M1-S02-base`
- `M1-S03-base`
- `M1-S03-modal-under18-pending`
- `M1-S03-modal-special-care-pending`
- `M1-S04-base`
- `M1-S04-card1-hover`
- `M1-S04-card1-modal`
- `M1-S04-card2-modal-pending`
- `M1-S04-card3-modal-pending`
- `M1-S04-card4-modal-pending`
- `M1-S04-card5-modal-pending`
- `M1-S05-base`
- `M1-S05-modal-child-rights`
- `M1-S05-modal-rights-for-pending`

## Slice 6 tracker

- `M1-S06-base`
- `M1-S06-resource-basic-keys-pending`
- `M1-S06-resource-ohchr-pending`
- `M1-S07-reveal-initial`
- `M1-S07-reveal-full`
- `M1-S07-node3-selected`
- `M1-S07-node1-pending`, `M1-S07-node2-pending`, `M1-S07-node4-pending`, `M1-S07-node5-pending`, `M1-S07-node6-pending`, `M1-S07-node7-pending`, `M1-S07-node8-pending`
- `M1-S07-modal-sdg`
- `M1-S08-unanswered`, `M1-S08-selected-yes`, `M1-S08-selected-no`, `M1-S08-correct-feedback`, `M1-S08-incorrect-feedback`
- `M1-S09-base`, `M1-S09-modal-thematic-areas-pending`, `M1-S09-resource-europa-pending`
- `M1-S10-base`, `M1-S10-resource-crc-gmis`

## Slice 7 tracker

- `M1-S11-pending`
- `M1-S12-base`
- `M1-S12-note1-pending` through `M1-S12-note6-pending`
- `M1-S13-base`
- `M1-S13-download-steps-pending`
- `M1-S13-data-visualizations-pending`
- `M1-S13-substep1-pending`
- `M1-S13-substep2-pending`
- `M1-S13-substep3-pending`

## Slice 8 tracker

- `M1-S14-base`, `M1-S14-case-modal`
- `M1-S15-unanswered`, selected-option states, `M1-S15-solution`, `M1-S15-correct-feedback`, `M1-S15-case-modal`
- `M1-S16-pending`, `M1-S17-pending`
- `M1-S18-base`, `M1-S18-case-modal`, `M1-S18-national-action-plan-pending`

## Slice 9 tracker

- `M1-S19-base`
- `M1-S20-unanswered`, selected-option states
- `M1-S21-pending`, `M1-S22-pending`, `M1-S23-pending`
- `M1-S24-result-75`, `M1-S24-back-to-start`, `M1-S24-review-pending`
- `M1-S25-summary-child-rights`, `M1-S25-summary-child-discrimination-pending`, `M1-S25-summary-cca-pending`
- `M1-S26-complete`
- `OP-MOD1-02-completed-pending`

## Evidence pack template

After each slice, report: slice name, state IDs implemented, components changed, data/state structures, source documents/sections used, interactions implemented, pending content included, asset placeholders used, QA result, deviations, repairs, risks, and next recommended slice.
