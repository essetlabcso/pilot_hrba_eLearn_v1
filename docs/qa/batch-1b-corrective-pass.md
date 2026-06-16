# Batch 1B Corrective Pass Report

## 1. Summary

- Repo folder: `D:\eLearn_CDP_Lg`
- Date/time: 2026-06-16 13:04:21 +03:00
- Branch: `system/hrba-clean-foundation`
- Commit before edits: `e4eeee6bac11e9590afca2b6dff88fb955e15a29`
- Batch 1B source files changed:
  - `src/components/course/Module2EverydayClaimsResponsibilities.tsx`
  - `src/components/course/Module2ActorEcosystemRoles.tsx`
  - `src/components/course/Module2SafeStandardsUse.tsx`
  - `src/components/course/Module2AccountabilityPowerScreens.tsx`
- QA evidence/report files changed or created:
  - `docs/qa/batch-1-human-review/screenshots/batch1-m1-starting-point-safety.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m1-portfolio-shift.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m4-feedback-response-sequence.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m2-hrba-grounding.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m2-duty-bearers-cso-roles.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m2-safe-standards.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m2-safe-accountability-loop.png`
  - `docs/qa/batch-1-human-review/screenshots/batch1-m2-feedback-loop-repair.png`
  - `docs/qa/batch-1b-corrective-pass.md`
- Confirmation that no protected system files were changed: confirmed. No design tokens, global CSS, themes, course shell, routing, progress logic, completion logic, assessment logic, certificate logic, accessibility toolbar, shared components, visual assets, or responsiveness behavior were edited.
- Confirmation that nothing was staged, committed, or pushed: confirmed. `git diff --cached --name-only` returned no files.
- Screenshot method note: the in-app browser loaded and verified pages, but its screenshot command repeatedly timed out. Screenshots were captured with bundled Playwright using the existing local Chrome executable; no repo dependencies were added.

## 2. Module 2 live-rendering fixes

| Screen | File changed | Issue found | Fix implemented | Wording now visible? |
| ------ | ------------ | ----------- | --------------- | -------------------- |
| M2-S03 Everyday Claims and Responsibilities | `src/components/course/Module2EverydayClaimsResponsibilities.tsx` | Approved HRBA standards grounding existed in registry data but was not visible in the custom live screen. | Added the approved HRBA standards sentence to the visible Everyday Rights Lens callout. | Yes |
| M2-S10 Duty-Bearers, Supporting Actors, and CSO Roles | `src/components/course/Module2ActorEcosystemRoles.tsx` | Approved duty-bearer / bounded CSO wording and local governance examples were not visible in the custom compact reveal screen. | Replaced the duty-bearer reveal body with the approved duty-bearer sentence and placed local governance examples in the wider footer to avoid crowding. | Yes |
| M2-S12 Using Human Rights Standards Safely | `src/components/course/Module2SafeStandardsUse.tsx` | Approved HRBA standards grounding was not visible in the custom compact reveal screen. | Set the screen intro to the approved HRBA standards sentence and retained the safety caution in the side reminder. | Yes |
| M2-S16 Accountability Is More Than a Complaint Box | `src/components/course/Module2AccountabilityPowerScreens.tsx` | Approved safe accountability sequence was not visible on the custom live screen. | Added the approved sequence as a concise header paragraph. | Yes |
| M2-S17 Practice: Repair the Feedback Loop | `src/components/course/Module2AccountabilityPowerScreens.tsx` | Approved safe accountability sequence was not visible on the custom live screen. | Added the approved sequence as a concise header paragraph. | Yes |

## 3. Evidence recapture

| Screen | Screenshot filename | Reason for recapture | Clean evidence captured? |
| ------ | ------------------- | -------------------- | ------------------------ |
| Module 1 M1-S6-09 Save My HRBA Starting Point | `batch1-m1-starting-point-safety.png` | Previous capture did not show the intended target screen. | No. Direct QA URL resolves to the Module 1 cover because `M1-S6-09` is not in the current Module 1 player active-screen list. Source routing was not changed in this task. |
| Module 1 M1-S7-01 Starting HRBA Shift Portfolio | `batch1-m1-portfolio-shift.png` | Previous capture did not show the intended target screen. | No. Direct QA URL resolves to the Module 1 cover because `M1-S7-01` is not in the current Module 1 player active-screen list. Source routing was not changed in this task. |
| Module 4 M4-S1-04 Implementation Lens | `batch1-m4-feedback-response-sequence.png` | Previous capture had a glossary/modal overlay. | Yes. Recaptured without glossary/modal overlay. |
| Module 2 M2-S03 Everyday Claims and Responsibilities | `batch1-m2-hrba-grounding.png` | Corrected Batch 1 wording needed live-screen evidence. | Yes |
| Module 2 M2-S10 Duty-Bearers, Supporting Actors, and CSO Roles | `batch1-m2-duty-bearers-cso-roles.png` | Corrected Batch 1 wording needed live-screen evidence. | Yes |
| Module 2 M2-S12 Using Human Rights Standards Safely | `batch1-m2-safe-standards.png` | Corrected Batch 1 wording needed live-screen evidence. | Yes |
| Module 2 M2-S16 Accountability Is More Than a Complaint Box | `batch1-m2-safe-accountability-loop.png` | Corrected Batch 1 wording needed live-screen evidence. | Yes |
| Module 2 M2-S17 Practice: Repair the Feedback Loop | `batch1-m2-feedback-loop-repair.png` | Corrected Batch 1 wording needed live-screen evidence. | Yes |

Visual note: M2-S10 still has a tight right-side quick-check column at the desktop capture viewport. The approved local governance wording was moved to the wider footer so the Batch 1B wording itself is not crowded. Layout/responsiveness fixes were outside this task.

## 4. Build/test results

- `npm run build`: passed. Vite reported the existing large chunk warning for assets/chunks over 500 kB.
- `npx tsc -b --pretty false`: passed with no output.
- `npm run lint`: passed with 5 warnings and 0 errors. Warnings remain in `src/components/course/Module1Renderer.tsx` and `src/components/player/CoursePlayerShell.tsx`; these were pre-existing hook/ref dependency warnings and were not changed in Batch 1B.

## 5. Git diff summary

Batch 1B source edits were limited to Module 2 course-layer content/rendering files:

- `src/components/course/Module2EverydayClaimsResponsibilities.tsx`
- `src/components/course/Module2ActorEcosystemRoles.tsx`
- `src/components/course/Module2SafeStandardsUse.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`

The working tree also still contains pre-existing Batch 1 source changes outside this corrective pass:

- `src/components/course/Module1Renderer.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/data/hrbaCourseModules.ts`
- `src/data/module2/module2Content.ts`
- `src/data/module2/module_2_asset_registry.ts`
- `src/data/module2/module_2_portfolio_registry.ts`

No protected-layer files were modified by Batch 1B. No files were staged.

## 6. Final Batch 1B decision

Batch 1B partially completed; human review needed.

Rationale: all five Module 2 live-rendering gaps were corrected and recaptured with visible wording. Module 4 was cleanly recaptured without modal overlay. The two requested Module 1 target screenshots remain blocked by the existing Module 1 active-screen/routing mismatch, and correcting that routing is outside the allowed scope for this task.
