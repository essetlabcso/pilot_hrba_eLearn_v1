# Batch 1 Closure And Next Decision

## What Batch 1 Fixed

- Added safe content and safeguarding wording across Modules 1-5.
- Added portfolio privacy and non-sensitive input reminders.
- Reinforced duty-bearer and bounded CSO role language.
- Added or strengthened safe standards-use and safe accountability wording.
- Strengthened Module 5 ethical MEAL wording around minimum necessary data, anonymization, small-cell risks, consent/refusal, responsible reporting, and safe action planning.
- Improved selected module card and Module 2 asset alt text.

## What Batch 1B Fixed

- Corrected Module 2 live-rendering gaps where registry text did not appear in custom components:
  - M2-S03
  - M2-S10
  - M2-S12
  - M2-S16
  - M2-S17
- Recaptured corrected Module 2 screenshot evidence.
- Recaptured clean Module 4 M4-S1-04 evidence without the glossary/modal overlay.
- Confirmed build, TypeScript, and lint still pass, with existing warnings only.

## Evidence Still Missing

- Clean target evidence for Module 1 M1-S6-09 and M1-S7-01.
- Updated Batch 1 human-review index reflecting Batch 1B corrections.
- Human acceptance of M2-S10 layout after wording placement.
- Mobile/tablet/high-contrast/enlarged-text evidence for Batch 1/1B wording changes.

## Module 1 Evidence/Sequence Issue Status

Status: blocked.

Batch 1B found that direct QA URLs for `M1-S6-09` and `M1-S7-01` resolve to the Module 1 cover because those IDs are not in the current Module 1 player active-screen list. This should not be fixed inside a content or evidence task. It needs a human decision: either these IDs are legacy/non-active screens and the evidence requirement should be retired, or the active player sequence/routing requires a protected-layer correction.

## Module 2 Correction Status

Status: ready for human review.

The five corrected Module 2 screens have live-rendered wording and updated screenshots. M2-S10 has a noted visual tightness concern in the right quick-check area; the approved local governance examples were moved to the wider footer to avoid overcrowding.

## Module 4 Evidence Status

Status: ready for human review.

Batch 1B recaptured `batch1-m4-feedback-response-sequence.png` without the glossary/modal overlay.

## Are Current Changes Ready To Commit?

Not yet. The source changes may be close to commit-ready, but the evidence package should be closed first.

## What Must Happen Before Commit

- Run Batch 1C evidence closure.
- Update the Batch 1 human-review index to reflect Batch 1B corrections and remaining Module 1 blocker.
- Confirm which files belong in the Batch 1/1B commit scope.
- Confirm whether docs/planning inputs and this re-plan should be committed with the same commit or separate planning commit.
- Confirm no unrelated `docs/module-review/` or older QA/module-2 notes are accidentally included unless intentionally scoped.

## Recommended Commit Scope

Suggested source scope if human-approved:

- `src/components/course/Module1Renderer.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module2ActorEcosystemRoles.tsx`
- `src/components/course/Module2EverydayClaimsResponsibilities.tsx`
- `src/components/course/Module2SafeStandardsUse.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/data/hrbaCourseModules.ts`
- `src/data/module2/module2Content.ts`
- `src/data/module2/module_2_asset_registry.ts`
- `src/data/module2/module_2_portfolio_registry.ts`

Suggested QA/planning scope if human-approved:

- `docs/qa/batch-0-technical-verification.md`
- `docs/qa/batch-1-safe-content-safeguarding-updates.md`
- `docs/qa/batch-1-human-review/`
- `docs/qa/batch-1b-corrective-pass.md`
- `docs/planning/hrba-replan-inputs/`
- `docs/planning/hrba-replan/`

## Files That Should Not Accidentally Be Committed

- Any source files unrelated to Batch 1/1B safe content and Module 2 corrective work.
- `docs/module-review/` unless the owner explicitly wants it in scope.
- Any temporary test scripts, temporary build folders, or generated artifacts outside approved QA evidence.
- `dist/`, `.tmp/`, local browser/cache artifacts, or dependency folders.

## Is Batch 1C Recommended?

Yes. Batch 1C should be evidence-only and closure-focused. It should not implement course fixes. Its job is to update evidence, decide the Module 1 blocker path, and prepare a clean commit-ready scope.

## Decision

Batch 1 and Batch 1B should remain open until Batch 1C evidence closure is complete.
