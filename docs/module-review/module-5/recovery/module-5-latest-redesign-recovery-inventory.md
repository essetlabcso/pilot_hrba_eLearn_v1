# Module 5 Latest Redesign Recovery Inventory

Date: 2026-06-28

Task mode: discovery and recovery inventory. Source code was not edited, staged, committed, pushed, restored, copied, moved, renamed, or deleted.

## 1. Executive Verdict

Latest Module 5 status: partially found.

The current repo active Module 5 implementation is not the latest compact redesigned path. Current source still wires the old `M5-S1-*` learner path in `src/App.tsx`, `src/components/course/Module5Renderer.tsx`, and `src/components/player/CoursePlayerShell.tsx`.

The latest 15-screen redesigned path was found in the preserved dirty-work archive, mainly in:

- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\module-5-tracked-changes.patch`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\mixed-route-state-tracked-changes.patch`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\remaining-dirty-tracked-changes.patch`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\untracked-files\public\assets\hrba\modules\module-5-redesign\`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\`

Recommended recovery action: recover from archive patches and archived untracked assets, then regenerate or copy QA docs/screenshots as a separate evidence-only step. Do not recover from Git history; the visible Git branches and `git log -S` searches did not contain the latest `M5-R15` or `What You Will Practice in This Module` strings.

## 2. Current Repo Active State

Current branch inspected: `system/hrba-clean-foundation`.

Initial `git status --short`: clean.

Visible branches:

- `legacy/hrba-pilot-v1`
- `main`
- `system/hrba-clean-foundation`
- `wip/hrba-pilot-uncommitted-snapshot`
- matching `origin/*` branches

Git-history searches:

- `git grep -n "M5-R15"` in current repo: no match.
- `git grep -n "What You Will Practice in This Module"` in current repo: no match.
- `git grep -n "90-Day Practice Bridge and Account-Back Commitment"` in current repo: no match.
- `git log --all -S"M5-R15"`: no matching commit found.
- `git log --all -S"What You Will Practice in This Module"`: no matching commit found.

## 3. Current Active Screen Count Found

Current active route table in `src/App.tsx` contains:

- `/module-5` and `/module-5/cover`, both mapped to `M5-PLAYER-00`.
- 33 old learner-facing `M5-S1-*` routes, including lettered old routes such as `M5-S1-07A`, `M5-S1-09D`, and `M5-S1-15A`.
- `/module-5/complete`, mapped to `M5-PLAYER-COMPLETE`.

Counting cover once, the current active learner path is effectively:

- 1 cover state
- 33 old learner-facing states
- 1 completion state
- 35 active route states total

This is the old long Module 5 path, not the intended 17-state redesigned path.

## 4. Current Active Route Sequence Found

| Route | Current screen ID | Current title |
|---|---|---|
| `/module-5`, `/module-5/cover` | `M5-PLAYER-00` | Module 5 Cover Screen |
| `/module-5/screen-5-1` | `M5-S1-01` | Module 5 Intro Video: From Good Numbers to Rights-Based Learning |
| `/module-5/screen-5-2` | `M5-S1-02` | Learning Objectives |
| `/module-5/screen-5-3` | `M5-S1-03` | The HRBA MEAL Lens |
| `/module-5/screen-5-4` | `M5-S1-04` | From Counting Activities to Learning About Change |
| `/module-5/screen-5-5` | `M5-S1-05` | Practice: Classify the Evidence |
| `/module-5/screen-5-6` | `M5-S1-06` | Indicator Repair Lab: From Output Indicator to HRBA Indicator |
| `/module-5/screen-5-7` | `M5-S1-07` | Practice: Strengthen the Indicator Set |
| `/module-5/screen-5-7a` | `M5-S1-07A` | Gender-Sensitive Evidence and Indicators |
| `/module-5/screen-5-7b` | `M5-S1-07B` | Gender Marker Readiness in Plain Language |
| `/module-5/screen-5-7c` | `M5-S1-07C` | Practice: Repair a Gender-Blind Indicator Set |
| `/module-5/screen-5-8` | `M5-S1-08` | The Danger of Too Much Detail |
| `/module-5/screen-5-9` | `M5-S1-09` | Practice: Choose Safer Disaggregation |
| `/module-5/screen-5-9a` | `M5-S1-09A` | Disability Inclusion in HRBA MEAL |
| `/module-5/screen-5-9b` | `M5-S1-09B` | Disability Marker Readiness in Plain Language |
| `/module-5/screen-5-9c` | `M5-S1-09C` | Disability Data Is Not Diagnosis |
| `/module-5/screen-5-9d` | `M5-S1-09D` | Practice: Choose Safe Disability Data Options |
| `/module-5/screen-5-10` | `M5-S1-10` | Feedback Data Is Evidence Too |
| `/module-5/screen-5-11` | `M5-S1-11` | Practice: Turn Feedback into an Action Decision |
| `/module-5/screen-5-12` | `M5-S1-12` | Ethical Storytelling and Qualitative Evidence |
| `/module-5/screen-5-13` | `M5-S1-13` | Practice: Respond to a Risky Donor Story Request |
| `/module-5/screen-5-14` | `M5-S1-14` | Reading the Signals: When Evidence Says the Plan Should Change |
| `/module-5/screen-5-15` | `M5-S1-15` | Practice: Adapt Based on Evidence |
| `/module-5/screen-5-15a` | `M5-S1-15A` | Light HRBA Logframe Review: Does the Evidence Match the Logic? |
| `/module-5/screen-5-16` | `M5-S1-16` | Responsible Reporting: Tell the Truth Safely |
| `/module-5/screen-5-17` | `M5-S1-17` | Practice: Spot Risky Reporting Claims |
| `/module-5/screen-5-18` | `M5-S1-18` | Capstone Evidence Simulator |
| `/module-5/screen-5-19` | `M5-S1-19` | Module 5 Synthesis: What HRBA MEAL Adds |
| `/module-5/screen-5-20` | `M5-S1-20` | Portfolio Checkpoint: HRBA MEAL Improvement Plan |
| `/module-5/screen-5-21` | `M5-S1-21` | Final Course Portfolio Synthesis |
| `/module-5/screen-5-22` | `M5-S1-22` | 90-Day HRBA MEAL Action Plan |
| `/module-5/screen-5-23` | `M5-S1-23` | Module 5 Resource Pack |
| `/module-5/screen-5-24` | `M5-S1-24` | Peer Exchange and Practice Clinics |
| `/module-5/screen-5-25` | `M5-S1-25` | Final Completion Bridge: From Course to Practice |
| `/module-5/complete` | `M5-PLAYER-COMPLETE` | Module 5 Complete |

## 5. Latest Intended Screen-Title Table Found in Archive

The latest intended sequence is documented in the polish Batch A-D QA docs and preserved patches.

| Active order | Latest screen ID | Route | Latest title |
|---:|---|---|---|
| 1 | `M5-PLAYER-00` | `/module-5/cover` | Module 5 Cover Screen |
| 2 | `M5-R01` | `/module-5/screen-5-1` | The Numbers Look Good, But Who Is Missing? |
| 3 | `M5-R02` | `/module-5/screen-5-2` | What You Will Practice in This Module |
| 4 | `M5-R03` | `/module-5/screen-5-3` | What Is Missing from the Report? |
| 5 | `M5-R04` | `/module-5/screen-5-4` | The HRBA MEAL Lens |
| 6 | `M5-R05` | `/module-5/screen-5-5` | From Counting to Learning About Change |
| 7 | `M5-R06` | `/module-5/screen-5-6` | Indicator Repair Lab |
| 8 | `M5-R07` | `/module-5/screen-5-7` | Safe and Inclusive Evidence |
| 9 | `M5-R08` | `/module-5/screen-5-8` | Feedback, Complaints, and Trust |
| 10 | `M5-R09` | `/module-5/screen-5-9` | Ethical Stories and Responsible Data |
| 11 | `M5-R10` | `/module-5/screen-5-10` | Interpreting Evidence with Rights-Holders |
| 12 | `M5-R11` | `/module-5/screen-5-11` | Reading the Signals: When the Plan Should Change |
| 13 | `M5-R12` | `/module-5/screen-5-12` | Reporting Without Losing the Rights Lens |
| 14 | `M5-R13` | `/module-5/screen-5-13` | Capstone: Evidence-to-Action Simulator |
| 15 | `M5-R14` | `/module-5/screen-5-14` | My HRBA MEAL, Accountability, and Learning Repair Note |
| 16 | `M5-R15` | `/module-5/screen-5-15` | 90-Day Practice Bridge and Account-Back Commitment |
| 17 | `M5-PLAYER-COMPLETE` | `/module-5/complete` | Module 5 Complete |

## 6. Key Latest Source Checks

| Check | Current repo | Archive evidence | Finding |
|---|---|---|---|
| `M5-R02` orientation exists | Not found | Found in `module-5-tracked-changes.patch` and Batch A/B QA | Latest orientation exists only in archive evidence. |
| `M5-R15` final practice bridge exists | Not found | Found in `module-5-tracked-changes.patch`, route patch, and Batch A-D QA | Latest final bridge exists only in archive evidence. |
| Completion tied to `M5-R15` | Current completion tied to old `M5-S1-25` | Patch adds `nextId: 'M5-PLAYER-COMPLETE'` to `M5-R15`; Batch A confirms completion state includes `M5-R15` and `M5-PLAYER-COMPLETE` | Recover from patch. |
| Old `M5-S1-*` path active | Yes | Archive redesign QA says old `M5-S1-*` content remained source bank only | Current repo regressed to old path. |
| Fallback `/screen-5-7a` | Active old `M5-S1-07A` | Patch maps to `M5-R07`; Batch A/C/D say safe fallback | Needs route recovery. |
| Fallback `/screen-5-15a` | Active old `M5-S1-15A` | Patch maps to `M5-R11`; Batch A/C/D say safe fallback | Needs route recovery. |
| Fallback `/screen-5-25` | Active old `M5-S1-25` | Patch maps to `M5-R15`; Batch A/B/C/D say safe fallback | Needs route recovery. |

Source-content evidence in `module-5-tracked-changes.patch` includes:

- `M5-R02` title `What You Will Practice in This Module`.
- `M5-R06` indicator repair language with minimum-necessary data reminders.
- `M5-R07` safe and inclusive evidence, small-cell risk, aggregation/suppression guidance.
- `M5-R08` feedback accountability wording.
- `M5-R09` responsible story/data wording.
- `M5-R10` participation/public-review boundaries.
- `M5-R11` evidence signal to responsible action logic.
- `M5-R12` truthful reporting and safe report repair wording.
- `M5-R13` capstone synthesis bridge.
- `M5-R14` structured repair note.
- `M5-R15` 90-day practice bridge and complete behavior.

## 7. Old `M5-S1-*` Classification

| Material | Current classification | Latest intended classification |
|---|---|---|
| `M5-S1-01` through `M5-S1-25`, including `07A`, `09D`, `15A` | Active learner path in current repo | Preserved source bank only after recovery |
| Old routes `/module-5/screen-5-7a`, `/screen-5-7b`, `/screen-5-7c` | Active old learner screens | Safe fallbacks to `M5-R07` |
| Old route `/module-5/screen-5-15a` | Active old learner screen | Safe fallback to `M5-R11` |
| Old route `/module-5/screen-5-25` | Active old learner screen | Safe fallback to `M5-R15` |
| Archive current-state screenshots | Archive evidence of old state | Archive evidence, not latest active path |

## 8. QA Docs Found

Archive QA root:

`D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\`

| QA doc | Supports 15-screen latest path? | R02 orientation timing | Key finding |
|---|---|---|---|
| `module-5-cross-module-polish-batch-a-sequence-qa.md` | Yes | Post-R02 insertion | Confirms `M5-R02` inserted, active sequence is cover -> `M5-R01` ... `M5-R15` -> completion, fallback routes passed, completion happens from `M5-R15`, build passed. |
| `module-5-cross-module-polish-batch-b-orientation-qa.md` | Yes | Post-R02 insertion | Polishes `M5-R02` orientation; confirms route scaffold unchanged as `M5-R01` through `M5-R15`, no old 35-screen revival, build passed. |
| `module-5-cross-module-polish-batch-c-practice-clinics-qa.md` | Yes | Post-R02 insertion | Polishes `M5-R06` through `M5-R09`; confirms active sequence still `M5-R01` through `M5-R15`, fallback routes safe, build passed. |
| `module-5-cross-module-polish-batch-d-synthesis-capstone-qa.md` | Yes | Post-R02 insertion | Polishes `M5-R10` through `M5-R13`; confirms route and continue flow through `M5-R15` and completion, no old path revived, build passed. |
| `module-5-final-acceptance-qa.md` | Partially | Predates R02 insertion | Confirms earlier compact 14-screen redesign, safe fallbacks, completion, no old path revival. Useful but superseded by Batch A-D. |
| `module-5-batch-5-final-screens-qa.md` | Partially | Predates R02 insertion | Confirms earlier final screens `M5-R13`/`M5-R14` and completion before later R02 insertion shifted final bridge to `M5-R15`. |
| `module-5-redesign-implementation-plan.md` | Partially | Predates R02 insertion | Planning doc for compact redesign; uses earlier 14-screen target. Superseded by Batch A sequence QA. |
| `module-5-redesign-implementation-readiness.md` | Partially | Predates R02 insertion | Readiness/mapping evidence from old source bank to shorter redesign. Superseded by implementation patches and Batch A-D QA. |
| `module-5-final-acceptance-after-polish-qa.md` | Not found | Unknown | No file with this exact name found in repo or archive searches. |

## 9. Screenshot Evidence Found

Current repo:

- No `docs/module-review/module-5/` tree exists in the current repo.
- No expected `m5-polish-a-*` or `m5-final-*` Module 5 redesign screenshot targets were found in current repo files.

Archive screenshot root:

`D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\screenshots\`

Requested latest route-recovery screenshots found:

- `m5-polish-a-r01-intro-desktop.png`
- `m5-polish-a-r02-orientation-desktop.png`
- `m5-polish-a-r03-report-diagnosis-desktop.png`
- `m5-polish-a-r14-repair-note-desktop.png`
- `m5-polish-a-r15-90-day-bridge-desktop.png`
- `m5-polish-a-completion-desktop.png`
- `m5-polish-a-r02-orientation-mobile.png`
- `m5-polish-a-r15-90-day-bridge-mobile.png`
- `m5-polish-a-completion-mobile.png`

Additional final-acceptance screenshot evidence found:

- `m5-final-qa-cover-desktop.png`
- `m5-final-qa-early-screen-desktop.png`
- `m5-final-qa-r09-completed-desktop.png`
- `m5-final-qa-r10-completed-desktop.png`
- `m5-final-qa-r11-completed-desktop.png`
- `m5-final-qa-r12-completed-desktop.png`
- `m5-final-qa-r13-completed-desktop.png`
- `m5-final-qa-r14-completed-desktop.png`
- `m5-final-qa-completion-desktop.png`
- `m5-final-qa-r13-mobile.png`
- `m5-final-qa-r14-mobile.png`
- `m5-final-qa-completion-mobile.png`

Missing exact final screenshot targets from the request:

- `m5-final-cover-desktop.png`
- `m5-final-r01-intro-desktop.png`
- `m5-final-r02-orientation-desktop.png`
- `m5-final-r05-evidence-ladder-desktop.png`
- `m5-final-r06-indicator-repair-completed-desktop.png`
- `m5-final-r07-safe-evidence-mobile.png`
- `m5-final-r15-90-day-bridge-mobile.png`
- and the other exact `m5-final-*` names listed in the prompt.

Interpretation: screenshot evidence is incomplete by exact filename, but this should not be treated as redesign absence. The archive QA docs explicitly report Batch B-D screenshot capture limitations, while route/browser/build QA passed.

## 10. Preserved Assets Found

Archive asset source:

`D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\untracked-files\public\assets\hrba\modules\module-5-redesign\`

Found assets:

- `m5-90day-action-journey.png`
- `m5-adaptation-decision-tree.png`
- `m5-capstone-evidence-simulator-board.png`
- `m5-complaint-box-scene.png`
- `m5-donor-story-request-inbox.png`
- `m5-evidence-ladder.png`
- `m5-feedback-complaints-loop.png`
- `m5-hrba-meal-lens-map.png`
- `m5-indicator-repair-cards.png`
- `m5-intro-good-numbers-poster.png`
- `m5-learning-review-case-board.png`
- `m5-participatory-review-scene.png`
- `m5-repair-note-worksheet.png`
- `m5-report-repair-cards.png`
- `m5-safe-inclusive-data-tree.png`
- `m5-small-cell-risk-table.png`

Original visual-asset folder also exists:

`D:\m5_visual_assets\`

It contains corresponding `.svg.png` and `.webp.png` source filenames, while the preserved app-ready archive assets use clean `.png` filenames. The QA docs say runtime code should use the clean `.png` filenames.

## 11. Source Files Containing Latest Implementation Evidence

Current repo source containing old active implementation:

- `src/App.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/data/hrbaCourseModules.ts`

Archive patch evidence containing latest implementation:

- `module-5-tracked-changes.patch`
  - Main Module 5 renderer redesign: `M5-R01` through `M5-R15`, assets, interactions, completion from `M5-R15`.
- `mixed-route-state-tracked-changes.patch`
  - Route and sequence wiring for `src/App.tsx`.
  - Player shell updates for `M5-R*` navigation/progress.
  - Metadata updates in `src/data/hrbaCourseModules.ts`.
  - Also includes non-Module-5 diffs; use surgically.
- `remaining-dirty-tracked-changes.patch`
  - Larger combined dirty patch containing Module 5 and unrelated work; use only as cross-check, not as a broad apply target.

## 12. Branches, Commits, and Archive Locations

Relevant branches checked:

- `system/hrba-clean-foundation`
- `main`
- `legacy/hrba-pilot-v1`
- `wip/hrba-pilot-uncommitted-snapshot`
- corresponding `origin/*` branches

Relevant Git commit search result:

- No visible branch commit contains `M5-R15`, `What You Will Practice in This Module`, or `90-Day Practice Bridge and Account-Back Commitment`.

Relevant archive location:

- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\`

Most relevant archive subfolders:

- `generated-docs\module-review\module-5\redesign\`
- `generated-docs\module-review\module-5\redesign\qa\`
- `generated-docs\module-review\module-5\redesign\qa\screenshots\`
- `phase-4-dirty-source-preservation\tracked-diffs\`
- `phase-4-dirty-source-preservation\untracked-files\public\assets\hrba\modules\module-5-redesign\`

## 13. Risks and Uncertainties

- The current repo has moved forward since the preserved dirty patches. Applying full patches later could reintroduce unrelated old route/state work, especially from `mixed-route-state-tracked-changes.patch` or `remaining-dirty-tracked-changes.patch`.
- `mixed-route-state-tracked-changes.patch` includes changes outside Module 5, including `CourseItemCoverScreen.tsx`, `ScreenRenderer.tsx`, `CoursePlayerShell.tsx`, `hrbaCourseModules.ts`, and `learningState.ts`. These must be inspected hunk by hunk before any implementation.
- `module-5-tracked-changes.patch` appears to be the best source for the redesigned renderer, but it was captured against an older base. It should be ported manually or applied in a temporary comparison worktree only, not blindly applied to the current branch.
- The exact final `m5-final-*` screenshot filenames requested are mostly missing; however, Batch A polish screenshots and `m5-final-qa-*` screenshots are present.
- Batch B, C, and D docs report screenshot-capture limitations, so missing PNGs are not a reliable absence signal.
- Current repo lacks `docs/module-review/module-5/`, so any recovery should decide whether to restore docs/screenshots as evidence after source recovery or keep them as archive references only.
- The old `M5-S1-*` content may still be useful as source-bank content inside `Module5Renderer.tsx`, but it must not remain active in route sequence after recovery.

## 14. Recommended Next Action

Recommended action: recover from archive.

Implementation should be a separate, explicit task with surgical scope:

1. Restore or port only the Module 5 redesign implementation from `module-5-tracked-changes.patch` into `src/components/course/Module5Renderer.tsx`.
2. Restore the app-ready assets from archived `untracked-files\public\assets\hrba\modules\module-5-redesign\` to `public/assets/hrba/modules/module-5-redesign/`.
3. Port only Module 5 route and sequence hunks from `mixed-route-state-tracked-changes.patch` into:
   - `src/App.tsx`
   - `src/components/player/CoursePlayerShell.tsx`
   - `src/data/hrbaCourseModules.ts`
4. Avoid broad application of `remaining-dirty-tracked-changes.patch`.
5. Do not touch final Module 1, Module 2, Module 3, unrelated design-system files, or global source unless a Module 5 hunk is proven necessary and reviewed.
6. After implementation, run Module 5-only acceptance QA:
   - `/module-5`
   - `/module-5/cover`
   - `/module-5/screen-5-1` through `/module-5/screen-5-15`
   - `/module-5/complete`
   - fallback routes `/screen-5-7a`, `/screen-5-7b`, `/screen-5-7c`, `/screen-5-15a`, `/screen-5-25`
   - `/module-1`, `/module-2`, `/module-3` smoke checks to confirm no regressions.

No recovery is recommended from current source alone because the current source is the old long path. No recovery is recommended from visible Git history because the latest revised strings were not found there.
