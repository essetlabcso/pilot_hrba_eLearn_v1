# Source Evidence Index

## Planning-Input Documents Found

| Document | Status | Notes |
| -------- | ------ | ----- |
| `docs/planning/hrba-replan-inputs/Master HRBA Course Improvement Handoff.md` | found | Final master handoff and batch readiness framing. |
| `docs/planning/hrba-replan-inputs/Consolidated List of Issues and Fixes.md` | found | G1-G4 consolidated issues and fixes. |
| `docs/planning/hrba-replan-inputs/Module by Module Consolidated List of Issues and Fixes.md` | found | Module-by-module and screen-level planning source. |
| `docs/planning/hrba-replan-inputs/Implementation Note.md` | found | Implementation-control input and likely sequencing constraints. |

## QA Documents Found

| Document | Status | Use |
| -------- | ------ | --- |
| `docs/qa/batch-0-technical-verification.md` | found | Technical truth report: build, routes, guards, accessibility, storage, final assessment/certificate, mobile, protected-layer status. |
| `docs/qa/batch-1-safe-content-safeguarding-updates.md` | found | Batch 1 implementation scope, safety wording coverage, build results, carried-forward P1 risks. |
| `docs/qa/batch-1-human-review/batch-1-human-review-index.md` | found | Screenshot index and human-review findings for Batch 1. |
| `docs/qa/batch-1b-corrective-pass.md` | found | Batch 1B fixes, screenshot recapture status, build/test results, remaining Module 1 evidence blocker. |
| `docs/qa/module-2/` | found | Earlier Module 2 QA notes on contrast, hotspots, interaction, visual assets, and accessibility. |

## Screenshot/Evidence Folders Found

| Folder | Status | Notes |
| ------ | ------ | ----- |
| `docs/qa/batch-1-human-review/screenshots/` | found | Contains Batch 1 and Batch 1B screenshot evidence, including updated Module 2 and Module 4 files. |

## Documents Missing

No required planning-input or listed QA document was missing at the time of this package. Evidence is still incomplete for some learner states, but the files themselves are present.

## Evidence Limitations

- Consolidated G1-G4 documents are strong planning guides, but they are not a complete live defect inventory.
- Batch 0 was a smoke/technical verification, not a full accessibility audit, full learner flow, or pilot test.
- Batch 1 screenshot evidence originally showed several Module 2 registry/live-rendering gaps; Batch 1B corrected those, but the human-review index still needs closure updating.
- Module 1 `M1-S6-09` and `M1-S7-01` evidence remains blocked because those IDs are not reachable through the current Module 1 active-screen sequence.
- Screenshot evidence is desktop-heavy. Tablet/mobile/high-contrast/enlarged-text evidence is still required before learner testing.
- Video placeholders, final assessment/certificate, LMS/LRS/reporting, and privacy/storage behavior remain incompletely evidenced.

## Known Uncommitted Repo Status

At the start of this task, the working tree already contained modified source files from Batch 1 and Batch 1B, plus untracked QA and planning outputs. This package did not overwrite or edit those source files.

Known modified source files include:

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

## How The Evidence Should Be Used

- Treat confirmed QA findings as implementation controls.
- Treat G1-G4 findings as priority guidance requiring screen/source verification before code changes.
- Treat screenshot evidence as human-review support, not as a full acceptance test.
- Treat design-system and protected-layer items as separate future batches, not as incidental fixes inside content batches.
- Add newly observed issues to the master matrix when they affect learner readiness, even when they are not listed in the original G1-G4 review.
