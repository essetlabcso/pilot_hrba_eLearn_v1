# Batch 3 Screen-Family Inventory

Repo: `D:\eLearn_CDP_Lg`
Branch: `system/hrba-clean-foundation`
Baseline commit: `84417d4cb1efaba0da519ad9b3e890843cf84843`
Inventory date: 2026-06-16

## Baseline And Gate Status

Batch 2A has been committed and pushed. Batch 2B was not found, so portfolio implementation and knowledge-check density rollout are excluded from Batch 3. The representative keyboard/focus automation limitation was accepted by the human reviewer for the Prompt 3 gate; no real Batch 5 defect was proven.

`docs/module-review/module-1/` remains untracked, unrelated, and excluded.

## Protected Boundaries

Batch 3 may edit course-layer renderer/content files, course metadata copy, QA docs, and QA screenshots only. It must not change global CSS, design tokens, themes, shell/player, routing, progress/completion logic, assessment, certificate, LMS/LRS/storage, accessibility toolbar, shared components, or assets.

Module 1 blocked IDs `M1-S6-09` and `M1-S7-01` are excluded.

## Inventory Table

| Screen family | Screens / targets | Files | Batch 3 course-layer action taken | Deferred Batch 4/5/6/7/8 risks | Required / recorded evidence |
| --- | --- | --- | --- | --- | --- |
| Module cover screens | M1 `M1-PLAYER-00`; M2 `M2-S01`; M3 `M3-PLAYER-00`; M4 `M4-PLAYER-00`; M5 `M5-PLAYER-00`; final assessment `FINAL-ASSESSMENT-PLAYER-00` | `src/data/hrbaCourseModules.ts` | Metadata descriptions and coverFocus copy tightened for learner expectation and purpose. No thumbnail paths, alt fields, route, CTA, locked-state, start/completion ID, or availability behavior changed. | Batch 4 cover surface readability; Batch 5/8 locked state/progress/route evidence; Batch 7 final assessment behavior. | Desktop cover screenshots for M1, M3, M4, M5, final assessment; desktop/mobile screenshots for M2; source diff confirms metadata-only changes. |
| Learning objective screens | M1 `M1-S1-02`; M2 `M2-S02`; M3 `M3-S1-02`; M4 `M4-S1-02`; M5 `M5-S1-02` | `src/components/course/Module1Renderer.tsx`; `src/components/course/Module2LearningObjectives.tsx`; `src/components/course/Module3Renderer.tsx`; `src/components/course/Module4Renderer.tsx`; `src/components/course/Module5Renderer.tsx` | Objective wording now shows what learners will do, why it matters, and where practice/evidence/action transfer appears. | Batch 4 card/surface readability; Batch 5 focus/large-text/mobile technical defects; Batch 7 assessment mapping. | Desktop screenshots for M1-M5 objectives; mobile screenshots for M5 representative sample; source diff evidence. |
| Opening scenario/problem screens | M1 `M1-S1-01`, `M1-S1-04`; M2 `M2-S03`; M3 `M3-S1-03`, `M3-S1-04`; M4 `M4-S1-03`; M5 `M5-S1-01` | `src/components/course/Module2EverydayClaimsResponsibilities.tsx`; `src/components/course/Module3Renderer.tsx`; `src/components/course/Module4Renderer.tsx` | Selected active screens received concise learner-role, look-for, and HRBA lens cues where course-layer safe. M1/M5 were reviewed but not changed in this pass. | Batch 4 text surface/readability; Batch 6 imagery/media; Batch 8 learner validation. | Existing M4-S1-03 desktop/mobile screenshots; source diff for M2/M3/M4 cue changes; safeguarding review note in QA doc. |
| Concept/reveal screens | M1 concept sequence; M2 `M2-S03`, `M2-S05`, `M2-S07`, `M2-S12`, `M2-S14`, `M2-S16`, `M2-S20`; M3 studio sequence; M4 `M4-S1-04`, `M4-S1-07`; M5 concept canvases | `src/components/course/Module2AccountabilityPowerScreens.tsx`; `src/components/course/Module3Renderer.tsx`; `src/components/course/Module4Renderer.tsx` | M2-S16 core idea is visible before repair interaction. M3 studio intro pattern and M4 implementation lens now expose clearer decision evidence prompts. No reveal/tab/keyboard/ARIA/gating logic changed. | Batch 4 reveal/card surfaces; Batch 5 keyboard/focus/ARIA/visible focus defects; Batch 6 diagram/visual alternatives. | M2-S16 initial/completed desktop/mobile screenshots; keyboard/focus automation limitation accepted; source diff evidence for M3/M4 wording. |
| Story/case screens | M1 stories; M2 `M2-S09`, `M2-S15`, `M2-S17`, `M2-S18`, `M2-S19`; M3 design cases; M4 implementation/accountability cases; M5 MEAL/reporting/capstone cases | Course-layer renderer/component files | Selected case cues added only where needed in M3/M4. No identifiable people, locations, organizations, officials, disputes, survivors, children, or sensitive incidents were introduced. | Batch 6 visual/media replacement; Batch 8 sensitivity review. | Human safeguarding review note; source diff evidence; existing scenario screenshots. |
| Feedback states | M1 feedback; M2 `M2-S06`, `M2-S15`, `M2-S16`, `M2-S17`, `M2-S19`, `M2-S22`; M3/M4/M5 practice and KC feedback | `src/components/course/Module2AccountabilityPowerScreens.tsx` | M2-S16 and M2-S17 feedback wording tightened for clarity, privacy, safe response, adaptation, and next action. No scoring, KC density, aria-live, or state behavior changed. | Batch 5 technical focus/announcement behavior; Batch 7 final assessment feedback/scoring. | M2-S17 feedback desktop/mobile screenshots; M2-S16 completed-state screenshots; non-color-only text review. |
| Portfolio checkpoints | M1 `M1-S3-01`; M2 `M2-S21`; M3 `M3-S1-22`; M4 `M4-S1-10`; M5 `M5-S1-20`, `M5-S1-21`, `M5-S1-22`; blocked M1 `M1-S6-09`, `M1-S7-01` | Not changed for implementation | Documentation only. No portfolio implementation, storage, persistence, form behavior, or checkpoint density work was changed. | Batch 2B dependency; Batch 5/8 labels/storage/privacy/reporting; M1 blocked IDs need protected route/sequence decision. | QA deferral confirmation only. |
| Resource packs / glossary / help | M2 `M2-S20`; M3 `M3-S1-23`; M5 `M5-S1-23`; shell resources/glossary/help protected | `src/components/course/Module3Renderer.tsx`; `src/components/course/Module5Renderer.tsx` | M3 and M5 resource packs now group resources by learner purpose and decision use. No new links, downloads, assets, glossary/help shell behavior, or external resources added. | Batch 5 shell/resource modal behavior; Batch 6 downloads/assets; Batch 8 help/glossary readiness. | M3 desktop/mobile resource screenshots; M5 desktop resource screenshot; source diff evidence. |
| Module summaries | M1 `M1-S3-02`, `M1-S7-04`; M2 `M2-S20`; M3 `M3-S1-25`; M4 `M4-S1-12`; M5 `M5-S1-19` | `src/components/course/Module4Renderer.tsx` | M4-S1-12 summary now names a carry-forward implementation habit and safer documentation takeaway. | Batch 8 full route/progress/completion evidence. | M4-S1-12 desktop/mobile screenshots; CTA route smoke previously passed to `/module-4/screen-4-13`. |
| Completion / transition text | M1 `M1-PLAYER-COMPLETE`; M2 `M2-S23`; M3 `M3-PLAYER-COMPLETE`; M4 `M4-S1-13`; M5 `M5-S1-25`, `M5-PLAYER-COMPLETE`; final assessment placeholder | `src/components/course/Module1Renderer.tsx`; `src/components/course/Module2AccountabilityPowerScreens.tsx` | M1 and M2 completion/transition copy now clarifies saved private reflection/progress and next step. Completion, unlock, route, progress, assessment, and certificate logic were not changed. | Batch 7 final assessment/certificate; Batch 8 progress/storage/refresh/resume/roadmap validation; Batch 5 CTA focus if proven defective. | M2-S23 desktop/mobile screenshots; source diff evidence for M1 completion text; M2-S23 route smoke previously passed to `/module-3`. |

## Changed File Scope

Tracked source files changed:

- `src/components/course/Module1Renderer.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module2EverydayClaimsResponsibilities.tsx`
- `src/components/course/Module2LearningObjectives.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/data/hrbaCourseModules.ts`

QA docs/evidence changed:

- `docs/qa/batch-3-common-screen-family-standardization.md`
- `docs/qa/batch-3-screen-family-inventory.md`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/`

Excluded:

- `docs/module-review/module-1/`

## Evidence Summary

Screenshot evidence folder:

`docs/qa/batch-3-common-screen-family-standardization/screenshots/`

Representative visual evidence exists for:

- M5 objectives desktop/mobile.
- M4 scenario/problem desktop/mobile.
- M2 concept/reveal initial and completed states desktop/mobile.
- M2 feedback desktop/mobile.
- M4 summary desktop/mobile.
- M2 transition desktop/mobile.
- M3 resource pack desktop/mobile.
- M2 cover desktop/mobile.

Supplemental Batch 3 rollout evidence exists for:

- M1, M2, M3, M4 objective screens desktop.
- M1, M3, M4, M5, and final assessment cover screens desktop.
- M5 resource pack desktop after opening the pack.

Soft limitations:

- Human accepted the keyboard/focus automation limitation for Prompt 3.
- Tablet, high-contrast, and enlarged-text evidence were not completed in this pass.
- Manual visible-focus confirmation remains final QA / Batch 5 if a real defect is later found.

## Open Risks

- Portfolio implementation and knowledge-check density rollout remain blocked by missing Batch 2B.
- Final assessment remains outside Batch 3 implementation and belongs to Batch 7.
- Route/progress/completion/storage/privacy/reporting end-to-end proof remains Batch 8.
- Accessibility technical remediation remains Batch 5 if any real defect is later proven.
- Visual/media/transcript/asset work remains Batch 6.
- Readability/surface/layout polish remains Batch 4.

## Stop / Go Recommendation

GO to Batch 3 human review and commit preparation with documented limitations.

The exact scope ready for human acceptance before commit is:

- The eight tracked source files listed above.
- `docs/qa/batch-3-common-screen-family-standardization.md`
- `docs/qa/batch-3-screen-family-inventory.md`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/`

Do not include `docs/module-review/module-1/`, portfolio implementation, knowledge-check density rollout, protected shared layers, or unrelated files.
