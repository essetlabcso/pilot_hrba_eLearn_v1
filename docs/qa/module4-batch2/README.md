# Module 4 Batch 2 QA handoff

Date: 2026-07-25

Branch: `feature/hrba-full-course-update-20260725`

Accepted parent: `7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`

Approved Batch 1: `656ec6d8619fe762ca455a42224c9f2dafdee17c`

Approved Screen 4 UI follow-up: `9bd57d1c2be80639a22920661b3df6b293696436`

## Implemented scope

- Screen 6 (`M4-S1-05`): Fair Access — Evidence, Action and Follow-Up.
- Screen 7 (`M4-S1-06`): Participation with Real Influence.
- Screen 8 (`M4-S1-07`): Accountable Concern, Response and Follow-Up.
- Screens 9–15 were not changed or started.

## State, carry-forward and completion behavior

Batch 2 adds a typed, hydrated `batch2` slice to the existing
`module4Enhanced` state. Screen 5's selected workstream is carried into every
scenario, option and concern through a typed five-workstream profile. Screen 6
writes evidence and unresolved-question fields; Screen 7 writes participation
decisions; Screen 8 writes account-back and actor-responsibility fields. Each
write records provenance and dependency revisions.

Changing the upstream workstream preserves learner-authored text and selections
but marks dependent Screen 6–8 fields for review. A visible review-required
banner asks the learner to reconfirm the workflow. Existing Batch 1 states
hydrate additively with Batch 2 defaults and the migration remains idempotent.
Screen progress is written only from each screen's final Continue gate.

## Interaction and accessibility architecture

- Staged pathways expose completed, active, available-next and locked states.
- Native radios and checkboxes replace no workflow with dropdowns.
- Validation provides corrective feedback, revision controls and final
  completion feedback.
- Screen 8 image hotspots have equivalent numbered HTML buttons and visible
  semantic detail cards.
- Essential labels and instructions are HTML; images are supplemental.
- Focus-visible, reduced-motion and forced-colors support are inherited from the
  scoped enhanced foundation and extended to Batch 2 controls.
- Desktop viewport: 1440 × 1000.
- Mobile viewport: 390 × 844.
- 200% desktop-equivalent reflow: 720 CSS px.

## Fidelity notes and justified deviations

The authoritative mockups illustrate the Market Improvement workstream. The
approved carry-forward rule requires the learner's Screen 5 selection to govern
Screens 6–8, so the HTML scenario wording adapts to all five approved
workstreams while the clean approved images remain supplemental illustrations.

Screen 7's workable-measures mockup instructs learners to select three while
showing four valid accessible measures. The implementation accepts any three or
more valid measures and rejects the two explicitly weak shortcuts. This retains
the intended judgment task without making one valid combination artificially
incorrect.

The Screen 8 learner-facing title follows the approved Batch 2 instruction:
“Accountable Concern, Response and Follow-Up.” The underlying mockup's
“Close the Feedback and Response Loop” remains reflected in the staged activity.

## Test evidence

- `npm test`: 63 tests passed.
- `npm run build`: passed.
- `npm run lint`: passed with five pre-existing warnings outside Batch 2.
- Refresh hydration, keyboard focus order, mobile width, and 200% reflow were
  checked in Chromium.

## Screenshots

Desktop:

- `screenshots/screen-6-desktop-complete.png`
- `screenshots/screen-7-desktop-complete.png`
- `screenshots/screen-8-desktop-complete.png`

Mobile:

- `screenshots/screen-6-mobile-complete.png`
- `screenshots/screen-7-mobile-complete.png`
- `screenshots/screen-8-mobile-complete.png`

## Release boundary

No merge or Vercel/Production deployment was performed. The active pilot
deployment remains unchanged.
