# Next Codex Batch Briefs

These are short briefs only, not full implementation prompts.

## Batch 1C Evidence Completion / Closure

- Purpose: Close Batch 1/1B evidence and prepare a clean commit-ready decision.
- Scope: Update human-review index, confirm Batch 1B screenshots, document Module 1 blocked evidence decision, summarize commit scope.
- Required inputs: Human decision on whether `M1-S6-09` and `M1-S7-01` should be active/reachable or retired from evidence expectations.
- Likely files involved: `docs/qa/batch-1-human-review/batch-1-human-review-index.md`, `docs/qa/batch-1-human-review/screenshots/`, optional new closure QA doc.
- Protected files to avoid: all source code, routing, shell, progress, completion, assessment, certificate, CSS, tokens, assets.
- Acceptance criteria: Evidence index accurately reflects Batch 1B; Module 1 blocker is clearly classified; nothing is staged/committed; no source files are modified.
- QA evidence needed: Existing screenshots plus any approved recapture; final git status.
- Human review needed: Yes, before commit.
- Reason not to expand scope: Any Module 1 routing/screen-order correction is protected-layer work and could destabilize progress/navigation.

## Batch 2A Worked Examples And Practice Instruction Repairs

- Purpose: Add scaffolding and clearer instructions before complex applied tasks.
- Scope: Course-layer wording only for selected practice clusters in Modules 2-5; no logic/layout/system changes.
- Required inputs: Worked-example library; HRBA/safeguarding approval for examples; target screen list from master matrix.
- Likely files involved: Module renderer/content files for targeted screens, plus a QA report and screenshots.
- Protected files to avoid: global CSS, design tokens, shared components, shell, routing, progress, completion, final assessment, certificate.
- Acceptance criteria: Each selected practice screen has concise worked example or cue; learner task remains intact; no overcrowding; build/ts/lint pass.
- QA evidence needed: Screenshots of changed screens; targeted navigation/interaction smoke.
- Human review needed: HRBA and instructional design review.
- Reason not to expand scope: Worked examples can easily become broad rewriting; keep to high-load practice clusters only.

## Batch 2B Portfolio And Knowledge-Check Density Repairs

- Purpose: Reduce density and strengthen accessibility/safe-input clarity for portfolio and knowledge-check areas.
- Scope: Course-layer chunking, helper text, safe-input placement, form instruction clarity, and evidence checks.
- Required inputs: Portfolio/input inventory; safe-input standard; list of knowledge-check screens to repair.
- Likely files involved: Module renderer files for portfolio/KC screens and QA evidence docs.
- Protected files to avoid: scoring logic, final assessment/certificate, progress/completion logic, global CSS, shell/mobile layout.
- Acceptance criteria: Portfolio and KC screens are less crowded, have clear labels/instructions, preserve safety wording, and show expected feedback/completion behavior.
- QA evidence needed: Screenshots, keyboard/form smoke, refresh persistence where learner input is involved.
- Human review needed: Safeguarding, accessibility, and instructional design review.
- Reason not to expand scope: Portfolio/KC work touches learner input and completion confidence; keep it separate from final assessment and shell/mobile repairs.
