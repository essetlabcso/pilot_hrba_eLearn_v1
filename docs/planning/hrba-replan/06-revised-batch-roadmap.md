# Revised Batch Roadmap

## Batch 1C: Batch 1B Evidence Completion And Closure

- Objective: Close the evidence gap for Batch 1/1B and prepare a clean commit scope.
- Scope: Update human-review index, verify Batch 1B screenshots, decide Module 1 blocked evidence path, confirm no protected files changed.
- Included issue IDs: RPL-002, RPL-003, RPL-004, RPL-005, RPL-017, RPL-024.
- Excluded issues: new content fixes, design-system fixes, routing changes unless explicitly approved as evidence investigation only.
- Allowed files/file types: Markdown QA docs under `docs/qa/`, screenshots under `docs/qa/batch-1-human-review/screenshots/`.
- Forbidden protected areas: source code, routing, player shell, progress, completion, assessment, certificate, CSS, tokens.
- Required inputs: Human decision on whether Module 1 `M1-S6-09` and `M1-S7-01` are expected active screens.
- Human review checkpoint: Confirm Batch 1/1B evidence is sufficient to commit or list blockers.
- QA evidence required: Updated screenshot index and final git diff scope.
- Commit gate: Only after human review accepts source diffs and QA docs.
- Risk level: Medium.
- Recommended owner/reviewer: QA lead + project owner.

## Batch 2A: Worked Examples And Practice Instruction Repairs

- Objective: Add scaffolding before high-load practice screens without changing protected logic.
- Scope: Worked examples, concise practice instructions, role/risk cues, feedback clarity on selected practice clusters.
- Included issue IDs: RPL-008, RPL-018, RPL-019, RPL-021, RPL-023.
- Excluded issues: layout redesign, shared component changes, final assessment, certificate, mobile shell.
- Allowed files/file types: Module renderer/content data files only, plus QA report/screenshots.
- Forbidden protected areas: global CSS, design tokens, shell, routing, progress/completion logic, assessment/certificate logic.
- Required inputs: Worked-example library; HRBA/safeguarding approval for examples.
- Human review checkpoint: Review examples for accuracy, local relevance, and safe generalized wording.
- QA evidence required: Desktop screenshots and at least targeted keyboard smoke for changed screens.
- Commit gate: Build/ts/lint pass and human approval of examples.
- Risk level: Medium-high.
- Recommended owner/reviewer: Instructional designer + HRBA reviewer.

## Batch 2B: Portfolio And Knowledge-Check Density Repairs

- Objective: Reduce density and unsafe-input risk in portfolio, form, and knowledge-check clusters.
- Scope: Shorter instructions, field chunking, safe-input visibility, label/help text improvements where course-layer safe.
- Included issue IDs: RPL-009, RPL-014, RPL-017, RPL-022, RPL-023.
- Excluded issues: scoring logic changes, final assessment, certificate, shell/mobile redesign.
- Allowed files/file types: Module renderer/content files; QA docs/screenshots.
- Forbidden protected areas: shared components, global CSS, routing, progress/completion, final assessment/certificate.
- Required inputs: Portfolio field inventory, safe-input standard, accessibility label acceptance rule.
- Human review checkpoint: Confirm forms ask for specific, non-sensitive, practical outputs.
- QA evidence required: Screenshots before/after, refresh persistence check, keyboard/form-label smoke.
- Commit gate: Build/ts/lint pass; no new unsafe input surfaces.
- Risk level: High because learner input is involved.
- Recommended owner/reviewer: Safeguarding reviewer + accessibility reviewer.

## Batch 3: Common Screen-Family Standardization

- Objective: Standardize repeated course-layer screen families after urgent content scaffolding is stable.
- Scope: Cover, objective, scenario, concept, feedback, portfolio, resource, summary, completion text patterns where source-layer safe.
- Included issue IDs: RPL-010, RPL-020, RPL-021, RPL-022, RPL-024, RPL-027.
- Excluded issues: global CSS/token changes, technical routing/progress logic, final assessment/certificate.
- Allowed files/file types: Course-layer module renderer/content files and docs.
- Forbidden protected areas: design tokens, global CSS, shell, shared components unless a separate approved pattern batch is opened.
- Required inputs: Screen-family standardization plan acceptance.
- Human review checkpoint: Review representative screen family samples before wider edits.
- QA evidence required: Representative screenshots across modules.
- Commit gate: No unrelated redesign; source changes trace to matrix IDs.
- Risk level: Medium.
- Recommended owner/reviewer: Instructional designer + visual/accessibility reviewer.

## Batch 4: Design-System Readability And Content-Safe Surface Fixes

- Objective: Fix repeated readability risks caused by unsafe text surfaces.
- Scope: Content-safe container rule, header surface rule, diagonal/gradient/image/mixed-background text handling.
- Included issue IDs: RPL-006, DS-001, DS-002, DS-017.
- Excluded issues: course content rewrites, assessment/certificate, media replacement.
- Allowed files/file types: Only after approval, design-system/global CSS/tokens/shared patterns as explicitly scoped.
- Forbidden protected areas: anything not in the approved design-system slice.
- Required inputs: Approved content-safe surface rule and affected-screen inventory.
- Human review checkpoint: Approve design-system rule before implementation.
- QA evidence required: Desktop/tablet/mobile/high-contrast/enlarged-text screenshots.
- Commit gate: Contrast/accessibility evidence passes on representative screens.
- Risk level: High.
- Recommended owner/reviewer: Design-system owner + accessibility reviewer.

## Batch 5: Accessibility And Mobile Technical Fixes

- Objective: Resolve protected-layer accessibility and mobile risks.
- Scope: Accessibility modal, high-contrast behavior, mobile shell/layout risks, keyboard/focus defects, form accessibility technical fixes.
- Included issue IDs: RPL-011, RPL-012, RPL-014, RPL-025, RPL-028.
- Excluded issues: content rewrites except labels/help text needed for accessibility.
- Allowed files/file types: Protected shell/component/CSS files only if specifically approved.
- Forbidden protected areas: final assessment/certificate unless included by a separate approval.
- Required inputs: Mobile/accessibility QA protocol and issue reproduction evidence.
- Human review checkpoint: Confirm high-risk technical changes are accepted before implementation.
- QA evidence required: Keyboard, focus, modal, high-contrast, mobile/tablet screenshots.
- Commit gate: No regressions in navigation/progress; build/ts/lint pass.
- Risk level: High.
- Recommended owner/reviewer: Technical lead + accessibility reviewer.

## Batch 6: Media Placeholders And Interim Intro Screens

- Objective: Remove learner-facing video placeholder weakness.
- Scope: Modules 2-5 intro video placeholders, interim before-you-begin screens, transcript/caption placeholders or final video integration if ready.
- Included issue IDs: RPL-007, RPL-010, RPL-025.
- Excluded issues: broad visual asset replacement unrelated to intro/media readiness.
- Allowed files/file types: Module intro screen renderers/content, approved media assets, alt/transcript docs.
- Forbidden protected areas: routing, progress/completion, certificate, unrelated CSS/tokens.
- Required inputs: Final video files/scripts or approved interim copy and transcript/caption plan.
- Human review checkpoint: Approve interim intros or final scripts.
- QA evidence required: Media/placeholder screenshots, no broken paths, transcript/caption evidence.
- Commit gate: No empty video slots before learner testing.
- Risk level: Medium.
- Recommended owner/reviewer: Project owner + media/accessibility reviewer.

## Batch 7: Final Assessment And Certificate Pathway

- Objective: Implement and verify final assessment, scoring, completion, retake, certificate eligibility, and reporting expectations.
- Scope: Final assessment player, pass/fail, retake, completion, certificate placeholder/generation, LMS/LRS if required.
- Included issue IDs: RPL-013, RPL-015, RPL-028.
- Excluded issues: module content cleanup, visual polish outside assessment/certificate.
- Allowed files/file types: Final assessment/certificate files explicitly scoped after requirements approval.
- Forbidden protected areas: unrelated module renderers, unrelated shell/CSS/tokens.
- Required inputs: Assessment blueprint, pass threshold, retake rules, certificate requirements, reporting/LMS/LRS requirements.
- Human review checkpoint: Approve requirements before implementation.
- QA evidence required: Locked/unlocked, score, pass/fail, retake, certificate, reporting/storage evidence.
- Commit gate: End-to-end final pathway passes.
- Risk level: Very high.
- Recommended owner/reviewer: Project owner + technical lead + HRBA assessment reviewer.

## Batch 8: Full QA, Learner-Testing Package, And Readiness Decision

- Objective: Decide whether the course is ready for learner testing or pilot.
- Scope: Full technical QA, accessibility smoke, mobile/tablet, privacy/storage, progress/completion, learner-testing protocol.
- Included issue IDs: RPL-001 through RPL-028 as applicable.
- Excluded issues: New implementation unless blocking defects are found and separately approved.
- Allowed files/file types: QA reports, screenshots, test protocols, readiness decision docs.
- Forbidden protected areas: production source unless a defect-fix batch is opened.
- Required inputs: Stable implementation branch and learner-testing criteria.
- Human review checkpoint: Stop/go learner-testing readiness decision.
- QA evidence required: Full route/progress/storage/accessibility/mobile/final assessment package.
- Commit gate: Final readiness decision recorded.
- Risk level: High.
- Recommended owner/reviewer: QA lead + project owner + HRBA/safeguarding/accessibility reviewers.
