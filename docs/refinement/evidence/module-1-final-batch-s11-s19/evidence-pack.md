# Module 1 Final Batch Evidence Pack — S11 to S19

Date: 2026-06-09

## Strict scope confirmation

Implemented the final Module 1 batch for:

- M1-S11 — From Beneficiaries to Rights-Holders
- M1-S12 — Who Has Responsibility?
- M1-S13 — Participation Is More Than Attendance
- M1-S14 — From Services to Rights, Power, and Accountability
- M1-S15 — Module 1 Knowledge Check
- M1-S16 — Self-Assessment
- M1-S17 — Priority and Action Commitment
- M1-S18 — Key Takeaways and Module 1 Completion Preview
- M1-S19 — Module 1 Completion Screen

Module 1 cover launch behavior, the approved 19-screen order, course page routing, Module 2, and other modules were not intentionally redesigned.

## Files changed

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/state/learningState.ts`
- `src/styles/global.css`
- `docs/refinement/evidence/module-1-final-batch-s11-s19/`

## Interaction model summary

- M1-S11: comparison lens reveal plus HRBA mindset decision.
- M1-S12: actor-category tabs plus compact chip-based matching.
- M1-S13: compact participation stepper plus decision scenario. The five levels are staged as visible/explored cards, with the decision scenario gating completion.
- M1-S14: five-shift pathway plus statement transformation.
- M1-S15: one-question-at-a-time five-question knowledge check with results view.
- M1-S16: paged self-assessment wizard, two statements per page.
- M1-S17: priority-card selection plus four-option action builder.
- M1-S18: takeaway review cards plus learning-record checklist.
- M1-S19: completion page with Return to Course Page and Continue to Module 2 actions.

## Active 19-screen order

The active Module 1 player order remains unchanged:

1. Introduction to HRBA for Local CSOs
2. What You Will Be Able to Do
3. Why This Module Matters
4. Your Learning Journey
5. Water Project Story
6. Investigate the HRBA Lens
7. So, What Is HRBA?
8. Everyday CSO Work
9. Who Might Be Invisible?
10. Rights Are Connected
11. From Beneficiaries to Rights-Holders
12. Who Has Responsibility?
13. Participation Is More Than Attendance
14. From Services to Rights, Power, and Accountability
15. Module 1 Knowledge Check
16. Self-Assessment
17. Priority and Action Commitment
18. Key Takeaways and Module 1 Completion Preview
19. Module 1 Completion Screen

## No-scroll verification

Build verification passed. Browser verification used both the in-app browser and a Chrome DevTools helper at 1280x720. Several visual issues were found and corrected during verification, including S13 stepper gating, S17 cramped footer spacing, and S19 title contrast.

Final helper results are in `browser-check-results.json`. Most rendered states report no scrollable overflow. Two states still need a final human QA look:

- M1-S12 completed: helper reported visible overflow in the actor header/image areas, though the screenshot is usable and the activity is visible.
- M1-S17 selected: helper reported visible overflow in the action body; CSS was compacted afterward and the screenshot was recaptured, but this remains the highest-risk screen for final QA.

## Accessibility verification

- Interactive controls use semantic buttons, tabs, radio-style controls, or text buttons.
- Completion state is visible in text and checkmarks, not color alone.
- The self-assessment wizard has page controls and clear progress.
- The knowledge check displays feedback and correct-answer support.
- S17 commitments are saved to the local Module 1 learning record.

## State and persistence notes

Persisted state includes:

- `m1KnowledgeCheckCompleted`, score, selected answers, checked questions.
- `assessmentFocus`, `m1SelfAssessmentPage`, self-assessment scores/category.
- `screen17ActionCommitment`.
- `screen18Completion`.
- `module1Completion`.

Top Next guards were updated for S11 and S12 to require the correct HRBA answer/matches.

## Asset notes

Existing Module 1 visuals are reused for S11-S14. The CDP helper reported two transient dev-mode image misses on M1-S14 base. The production build includes those assets successfully, and Vite emitted hashed image assets during `npm run build`.

## Build result

`npm run build` passed.

Warnings:

- Existing Vite chunk-size warning.
- Existing plugin timing/chunk advisory.

No TypeScript errors.

## Console result

No new console errors were captured in the helper summary. Dev-mode Vite debug/info messages are expected and ignored.

## Screenshot artifacts

- `m1-s11-base-state.png`
- `m1-s11-completed-feedback-state.png`
- `m1-s12-base-state.png`
- `m1-s12-matching-completed-state.png`
- `m1-s13-base-state.png`
- `m1-s13-completed-feedback-state.png`
- `m1-s14-base-state.png`
- `m1-s14-transformation-completed-state.png`
- `m1-s15-quiz-question-state.png`
- `m1-s15-results-state.png`
- `m1-s16-assessment-page-state.png`
- `m1-s16-completed-summary-state.png`
- `m1-s17-priority-action-selected-state.png`
- `m1-s18-takeaway-review-state.png`
- `m1-s18-completed-checklist-state.png`
- `m1-s19-completion-screen.png`
- `module-1-menu-19-screen-order.png`
- `browser-check-results.json`

Some headless fresh-state screenshots captured blank states because the dev server did not mount the app in that helper profile for sparse injected states. Nonblank artifacts are present for the densest final states; final QA should recapture blank artifacts through the normal app session.

## Unresolved issues

- Recapture blank screenshot artifacts for S11, S12 base, S13, S14 completed, S15, and S16 base using the normal app session or a fuller state fixture.
- Give S12 completed and S17 selected one final visual QA pass at 1280x720.
- Confirm route checks again from the course page in the normal browser session. Routing code was not changed in this batch.

## Recommendation for final Module 1 QA pass

Run one end-to-end learner pass from the course page:

1. Course page CTA opens the external Module 1 cover.
2. Start Module 1 enters the player at M1-S02.
3. Continue through M1-S11 to M1-S19 using keyboard and mouse.
4. Confirm no screen requires vertical scrolling at 1280x720.
5. Confirm the learning record is complete at S18 and Module 1 is marked complete at S19.
