# HRBA Course Re-Planning Package

## Purpose

This package organizes the next HRBA course implementation plan after Batch 0 technical verification, Batch 1 safe content/safeguarding updates, Batch 1B corrective work, and placement of the four planning-input documents. It is a planning and implementation-control package only. It does not implement new course fixes.

## Documents Created

- `00-source-evidence-index.md`
- `01-master-implementation-status-matrix.md`
- `02-design-system-issue-register.md`
- `03-screen-family-standardization-plan.md`
- `04-input-readiness-register.md`
- `05-visual-asset-readiness-register.md`
- `06-revised-batch-roadmap.md`
- `07-batch-1-closure-and-next-decision.md`
- `08-next-codex-batch-briefs.md`

## Source Documents Used

- `docs/planning/hrba-replan-inputs/Master HRBA Course Improvement Handoff.md`
- `docs/planning/hrba-replan-inputs/Consolidated List of Issues and Fixes.md`
- `docs/planning/hrba-replan-inputs/Module by Module Consolidated List of Issues and Fixes.md`
- `docs/planning/hrba-replan-inputs/Implementation Note.md`
- `docs/qa/batch-0-technical-verification.md`
- `docs/qa/batch-1-safe-content-safeguarding-updates.md`
- `docs/qa/batch-1-human-review/batch-1-human-review-index.md`
- `docs/qa/batch-1b-corrective-pass.md`
- `docs/qa/batch-1-human-review/screenshots/`
- `docs/qa/module-2/`

## Repo Context

- Repo folder: `D:\eLearn_CDP_Lg`
- Branch: `system/hrba-clean-foundation`
- Current commit when package was created: `e4eeee6bac11e9590afca2b6dff88fb955e15a29`
- Known working tree context: existing Batch 1 and Batch 1B source changes remain uncommitted, along with QA/planning docs.

## Key Planning Conclusions

- Batch 0, Batch 1, and Batch 1B are legitimate implementation evidence, not side notes. They should be treated as part of the course truth.
- Batch 1 safety and safeguarding wording is substantially implemented, but evidence closure is not complete because Module 1 target screenshots remain blocked by the active-screen/order issue.
- Module 2 live-rendering gaps identified in Batch 1 human review were corrected in Batch 1B and have updated screenshot evidence.
- The diagonal, gradient, image, and mixed-background readability problem is a design-system issue, not a single-screen patch.
- The course is still not ready for learner testing until P1 technical, accessibility, mobile, final assessment/certificate, and evidence gaps are resolved or explicitly accepted by the project owner.

## Already Done

- Batch 0 technical verification completed.
- Batch 1 safe content/safeguarding updates completed and reported.
- Batch 1 human-review evidence package created.
- Batch 1B corrected five Module 2 live-rendering gaps and recaptured Module 4 evidence.
- Four planning-input Markdown files were placed under `docs/planning/hrba-replan-inputs/`.

## Still Open

- Module 1 evidence and active-screen/order mismatch.
- Accessibility modal/high-contrast behavior.
- Mobile player layout and dense screen responsiveness.
- Final assessment, certificate, and completion pathway implementation.
- Full alt text/text-alternative verification across visual-heavy screens.
- Video placeholders in Modules 2-5.
- Worked examples before complex practice clusters.
- Portfolio and knowledge-check density.
- Privacy/storage/reporting mode confirmation before learner testing.

## Must Not Be Implemented Yet

- No broad redesign.
- No design-token, global CSS, routing, progress, completion, assessment, certificate, accessibility toolbar, or shared component edits without a dedicated approved batch.
- No final assessment or certificate implementation until requirements and pass/fail/certificate rules are approved.
- No visual asset replacement until asset briefs and alt/text-alternative requirements are approved.

## Immediate Recommended Next Action

Run Batch 1C as an evidence-only closure pass: decide how to handle the Module 1 blocked evidence, verify the updated Batch 1B screenshots, update the human-review index, and prepare a clean commit scope for Batch 1/1B without adding new course fixes.

## Boundary Confirmation

This re-planning task created Markdown planning documents only under `docs/planning/hrba-replan/`. It did not modify production source code, course content, components, CSS, design tokens, themes, routing, progress logic, assessment logic, certificate logic, or visual assets.
