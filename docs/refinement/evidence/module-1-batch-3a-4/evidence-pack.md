# Module 1 Batch 3A + Batch 4 Evidence Pack

Date: 2026-06-09

## Scope Confirmation

Implemented only the requested Module 1 Batch 3A interaction correction and Batch 4 screens:

- Corrected M1-S04, M1-S06, and M1-S07 interactions to use focused modal pop-ups.
- Implemented/updated M1-S08, M1-S09, and M1-S10 using modal-based interactions.
- Did not change Module 1 external cover routing.
- Did not redesign M1-S02, M1-S03, M1-S05, or M1-S11 to M1-S19.
- Did not modify Module 2 or any other module.

Shared player/state edits were limited to unlock rules and legacy state normalization needed for the scoped screens.

## Files Changed

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/state/learningState.ts`
- `src/styles/global.css`
- `docs/refinement/evidence/module-1-batch-3a-4/evidence-pack.md`
- `docs/refinement/evidence/module-1-batch-3a-4/browser-check-results.json`
- `docs/refinement/evidence/module-1-batch-3a-4/*.png`

## Interaction Pattern Correction

Future Module 1 interaction standard:

- Do not use subtle in-screen content replacement as the primary feedback pattern.
- Use focused modal pop-ups for detailed feedback/explanation when learners click small cards, clue cards, quiz answers, or hotspot items.
- Use flip cards when the interaction is a compact front/back learning card.
- Use in-screen update panels only when the change is visually obvious, close to the trigger, and supported by clear animation/state change.

Applied now:

- M1-S04 journey steps open modals and mark steps explored from the modal action.
- M1-S06 clue cards open modals and mark clues explored from the modal action.
- M1-S07 answer choices open feedback modals. Incorrect answers close with Try another answer; the correct answer unlocks only after correct feedback is confirmed.
- M1-S08 work-area cards open modals and unlock after all six work areas.
- M1-S09 perspective cards open modals and unlock after all six perspectives.
- M1-S10 connected-rights nodes open modals and unlock after all six rights connections.

## Active 19-Screen Order

1. M1-S01 - Introduction to HRBA for Local CSOs
2. M1-S02 - What You Will Be Able to Do
3. M1-S03 - Why This Module Matters
4. M1-S04 - Your Learning Journey
5. M1-S05 - Water Project Story
6. M1-S06 - Investigate the HRBA Lens
7. M1-S07 - So, What Is HRBA?
8. M1-S08 - Everyday CSO Work
9. M1-S09 - Who Might Be Invisible?
10. M1-S10 - Rights Are Connected
11. M1-S11 - From Beneficiaries to Rights-Holders
12. M1-S12 - Who Has Responsibility?
13. M1-S13 - Participation Is More Than Attendance
14. M1-S14 - From Services to Rights, Power, and Accountability
15. M1-S15 - Module 1 Knowledge Check
16. M1-S16 - Self-Assessment
17. M1-S17 - Priority and Action Commitment
18. M1-S18 - Key Takeaways and Module 1 Completion Preview
19. M1-S19 - Module 1 Completion Screen

## Internal ID Mapping

The working app preserves existing internal IDs:

| Approved screen | Internal ID |
|---|---|
| M1-S01 - Introduction to HRBA for Local CSOs | `M1-PLAYER-00` |
| M1-S02 - What You Will Be Able to Do | `M1-S1-02` |
| M1-S03 - Why This Module Matters | `M1-S1-01` |
| M1-S04 - Your Learning Journey | `M1-S1-03` |
| M1-S05 - Water Project Story | `M1-S1-04` |
| M1-S06 - Investigate the HRBA Lens | `M1-S1-05` |
| M1-S07 - So, What Is HRBA? | `M1-S1-06` |
| M1-S08 - Everyday CSO Work | `M1-S1-06A` |
| M1-S09 - Who Might Be Invisible? | `M1-S1-06B` |
| M1-S10 - Rights Are Connected | `M1-S1-07` |
| M1-S11 - From Beneficiaries to Rights-Holders | `M1-S1-08` |
| M1-S12 - Who Has Responsibility? | `M1-S2-01` |
| M1-S13 - Participation Is More Than Attendance | `M1-S2-02` |
| M1-S14 - From Services to Rights, Power, and Accountability | `M1-S2-03` |
| M1-S15 - Module 1 Knowledge Check | `M1-S2-04` |
| M1-S16 - Self-Assessment | `M1-S2-05` |
| M1-S17 - Priority and Action Commitment | `M1-S3-01` |
| M1-S18 - Key Takeaways and Module 1 Completion Preview | `M1-S3-02` |
| M1-S19 - Module 1 Completion Screen | `M1-PLAYER-COMPLETE` |

## No-Scroll Verification

Browser check: Chrome DevTools Protocol, 1280x720 viewport, `http://127.0.0.1:5173/`.

| Screen | Result | Page height | Section height | Continue state at base |
|---|---:|---:|---:|---|
| M1-S04 | Pass | 720 / 720 | 618 / 618 | Locked |
| M1-S06 | Pass | 720 / 720 | 618 / 618 | Locked |
| M1-S07 | Pass | 720 / 720 | 618 / 618 | Locked |
| M1-S08 | Pass | 720 / 720 | 620 / 620 | Locked |
| M1-S09 | Pass | 720 / 720 | 620 / 620 | Locked |
| M1-S10 | Pass | 720 / 720 | 620 / 620 | Locked |

## Modal Accessibility Verification

- Modals use `role="dialog"` and `aria-modal="true"`.
- Focus is moved into the modal on open.
- Tab focus is trapped inside the modal.
- Escape closes the modal.
- Close button is available with accessible label.
- Focus returns to the triggering control when the modal closes.
- Progress states are visible as text.
- Explored/completed state uses checkmarks plus text/progress, not color alone.
- CTA lock/unlock logic was verified in browser automation.

## Batch 4 Interaction Behavior

- M1-S08: six work-area cards open modals; Continue unlocks after all six are marked explored.
- M1-S09: six perspective cards open modals; Continue unlocks after all six are marked explored.
- M1-S10: six connected-rights nodes open modals; Continue unlocks after all six are marked explored.

## Asset Usage Notes

- M1-S04 uses registered journey step images from `module1RefinementAssets.m1S04`.
- M1-S06 and M1-S07 use the registered water-point image and HRBA lens icon.
- M1-S08 uses PNG-first registered work-area icons with SVG fallback support.
- M1-S09 uses PNG-first registered perspective icons with SVG fallback support.
- M1-S10 uses the existing connected-rights ripple visual and code-rendered six-node interaction; no missing S10 node assets were invented.
- Browser verification found no broken images.

## Routing Verification

- Course page CTA opens the external full-page Module 1 cover.
- The cover does not show player sidebar, learning tools, media controls, menu, glossary, resources, help, accessibility panel, or top Prev/Next/Exit controls.
- Start Module 1 enters the player at Screen 2 of 19: What You Will Be Able to Do.
- Module 1 menu order remains visible and correct.

## Build Result

Command: `npm run build`

Result: Pass.

Notes: Vite reported existing production bundle-size warnings after successful build. No TypeScript errors.

## Console Result

Browser console result: no errors or warnings. Only normal Vite dev-server and React DevTools informational messages appeared.

## Screenshots

- `m1-s04-base-1280x720.png`
- `m1-s04-modal-open.png`
- `m1-s06-base-1280x720.png`
- `m1-s06-modal-open.png`
- `m1-s07-base-1280x720.png`
- `m1-s07-feedback-modal-open.png`
- `m1-s08-base-1280x720.png`
- `m1-s08-modal-open.png`
- `m1-s09-base-1280x720.png`
- `m1-s09-modal-open.png`
- `m1-s10-base-1280x720.png`
- `m1-s10-modal-open.png`
- `module-1-menu-open.png`

## Unresolved Issues

- None for this batch.

## Recommendation For Next Batch

Proceed to the next controlled batch only after approval. Continue using modal pop-ups or flip cards for learner-facing interactions where detailed feedback/explanation is needed.
