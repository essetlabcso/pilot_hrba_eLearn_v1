# Cross-Module Latest Active Version Registry

Date: 2026-07-01

Scope: Module 1, Module 3, and Module 5 only.

Purpose: protect the latest active learner paths from being confused with source-bank screens, archive evidence, older screenshots, temporary recovery versions, or wrong recovery branches.

## Executive Summary

| Module | Latest active version found | Active learner states | Canonical route count | Latest known checkpoint | Recovery status | Source confidence |
|---|---|---:|---:|---|---|---|
| Module 1 | Approved short Module 1 orientation flow | 10 | 2 direct entry routes | `cdfbf8a` - `Recover approved short Module 1 orientation flow` | Recovered and committed | Confirmed from committed source |
| Module 3 | Revised Module 3 learning flow, `M3-R01` through `M3-R22` | 23 | 24 direct routes | `616dcb8` - `Protect Module 3 latest active version` | Recovered and committed | Confirmed from committed source and QA evidence |
| Module 5 | 16-state redesign sequence | 16 | 17 canonical routes | `9ee725443df281879ae7369037b3161fc752b90f` - `Restore Module 5 16-state redesign sequence` | Recovered and committed | Confirmed from committed source and QA/source |

Route-count note: Module 1 currently exposes `/module-1` and `/module-1/cover` as direct entry routes, then advances through player state. Module 3 exposes `/module-3`, `/module-3/cover`, and `/module-3/screen-3-1` through `/module-3/screen-3-22`. Module 5 exposes `/module-5`, `/module-5/cover`, `/module-5/screen-5-1` through `/module-5/screen-5-14`, and `/module-5/complete`; old compatibility aliases are not counted as canonical active routes.

## Module 1 Registry

Latest active version: approved short Module 1 orientation flow.

Checkpoint: `cdfbf8a` - `Recover approved short Module 1 orientation flow`.

Recovery status: recovered and committed.

Source confidence: confirmed from committed source.

Authority:

- Active player-state filter: `src/components/player/CoursePlayerShell.tsx`
- Screen content renderer: `src/components/course/Module1Renderer.tsx`
- Sequence/source-bank data: `src/data/module1/module_1_screen_sequence.json`
- Entry routes: `src/App.tsx`
- Module metadata: `src/data/hrbaCourseModules.ts`

| Order | Active screen ID | Canonical route | Exact screen title | Implementation/source location | Evidence | Notes |
|---:|---|---|---|---|---|---|
| 1 | `M1-PLAYER-00` | `/module-1`, `/module-1/cover` | Module 1 Cover | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `docs/refinement/evidence/module-1-batch-2c/module-1-cover-launch-1280x720.png`; `docs/qa/batch-3-common-screen-family-standardization/screenshots/batch3-cover-family-m1-m1-player-00-after-desktop.png` | Renderer cover copy uses "Starting the HRBA Learning Journey"; this is the active cover state. |
| 2 | `M1-S1-01` | Player state, no canonical direct route | Why This Course, Why Now? | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s01-why-this-course-video-poster.png` | Start of the revised short orientation content. |
| 3 | `M1-S1-02` | Player state, no canonical direct route | About This Course | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s02-about-course-four-cards.png` | Active short-flow screen; not the older long-course objective screen. |
| 4 | `M1-S1-03` | Player state, no canonical direct route | HRBA in One Practical Lens | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s03-hrba-five-question-lens.png` | Practical HRBA lens, not old source-bank scenario content. |
| 5 | `M1-S1-04` | Player state, no canonical direct route | Your Learning Journey | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s04-five-module-learning-roadmap.png` | Five-module roadmap screen in the short orientation. |
| 6 | `M1-S1-05` | Player state, no canonical direct route | How You Will Learn | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s05-learning-methodology-cycle.png` | Methodology cycle screen in the short orientation. |
| 7 | `M1-S1-06` | Player state, no canonical direct route | Your Portfolio and Safe Peer Learning | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s06-safe-portfolio-peer-learning.png` | Safe portfolio guidance; protect privacy-safe wording. |
| 8 | `M1-S1-06A` | Player state, no canonical direct route | Starting Point Self-Assessment | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s07-starting-point-confidence-scale.png` | Short-flow self-assessment, not the old longer `M1-S2-*`/`M1-S3-*` assessment flow. |
| 9 | `M1-S1-06B` | Player state, no canonical direct route | Your First Learning Commitment | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a`; `public/assets/hrba/modules/module-1/m1-s08-learning-commitment-completion.png` | Final active practice screen before completion. |
| 10 | `M1-PLAYER-COMPLETE` | Player state, no canonical direct route | Module 1 Complete | `Module1Renderer.tsx`; sequence JSON | Commit `cdfbf8a` | Completion state for `module_01_hrba_foundations`. |

Inactive / do-not-confuse notes:

- `Module1Renderer.tsx` still contains older cases such as `M1-S1-07`, `M1-S1-08`, `M1-S2-*`, `M1-S3-*`, `M1-S4-*`, `M1-S5-*`, `M1-S6-*`, and `M1-S7-*`. Do not treat those as the active Module 1 learner path unless a future committed route/player sequence explicitly restores them.
- `src/data/module1/module_1_screen_sequence.json` includes platform/help/accessibility/source-bank items in addition to active player screens. The active runtime is filtered by `CoursePlayerShell.tsx`.
- Archive QA `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-1\module-1-g1-g4-qa-evaluation.md` documents an older 19-screen active path and should be treated as historical QA evidence, not the latest active registry.
- Preserve the active route pattern: `/module-1` and `/module-1/cover` enter the short player flow; screen advancement is player-state driven.

Recovery classification: recovered and committed.

Open Module 1 caveats:

- Current registry did not perform a new end-to-end Module 1 click-through.
- Older QA identified accessibility/interaction-density concerns in the previous long path; those findings may still be useful for content review but are not proof of the latest short-flow state.
- If further Module 1 work is pending elsewhere, commit or document it before replacing this registry entry.

## Module 3 Registry

Latest active version: revised Module 3 learning flow, cover plus `M3-R01` through `M3-R22`.

Checkpoint: `616dcb8` - `Protect Module 3 latest active version`.

Recovery status: recovered and committed.

Source confidence: confirmed from committed source and QA evidence.

Authority:

- Active sequence and direct routes: `src/data/module3/module3RevisedScreens.ts`
- Screen renderer: `src/components/course/Module3RevisedRenderer.tsx`
- Styling: `src/components/course/module3-revised.css`
- App route integration: `src/App.tsx`
- Screen dispatch: `src/components/course/ScreenRenderer.tsx`
- Module metadata: `src/data/hrbaCourseModules.ts`

QA and recovery evidence:

- `docs/module-review/module-3/recovery/module-3-dirty-worktree-audit.md`
- `docs/module-review/module-3/recovery/module-3-qa1-stabilization-report.md`
- `docs/module-review/module-3/recovery/module-3-qa2-browser-verification-report.md`
- QA2 confirmed the R05 quick-check blocker was fixed, the representative route sweep passed, active placeholder/scaffold markers were absent on swept routes, R21 privacy guidance was present, and R22 handoff controls were enabled.

| Order | Active screen ID | Canonical route | Exact screen title | Implementation/source location | Evidence | Notes |
|---:|---|---|---|---|---|---|
| 1 | `M3-PLAYER-00` | `/module-3`, `/module-3/cover` | Module 3 Cover Screen | `module3PlayerSequence` in `module3RevisedScreens.ts`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-cover-desktop.png` | Cover is active before `M3-R01`. |
| 2 | `M3-R01` | `/module-3/screen-3-1` | Applying HRBA in Project Design | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r01-desktop.png`; QA2 route sweep | Revised `M3-R` path replaces older `M3-S1-*` route set. |
| 3 | `M3-R02` | `/module-3/screen-3-2` | What This Module Is About | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Learning-roadmap orientation. |
| 4 | `M3-R03` | `/module-3/screen-3-3` | Meet the Jiru Amba Futures Plan | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `public/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-intro-poster.png`; `public/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-reader-cover.png` | Case anchor. |
| 5 | `M3-R04` | `/module-3/screen-3-4` | Your HRBA Project Design Improvement Snapshot | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Snapshot preview. |
| 6 | `M3-R05` | `/module-3/screen-3-5` | Context and Inequality Scan | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r05-context-scan-desktop.png`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r05-mobile.png`; QA2 R05 browser verification | QA2 fixed and verified the quick-check radio progression blocker. |
| 7 | `M3-R06` | `/module-3/screen-3-6` | Policy and Standards Map | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r06-policy-map-desktop.png`; QA2 route sweep | Standards/policy mapping. |
| 8 | `M3-R07` | `/module-3/screen-3-7` | Rights-Holders and Barriers | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Rights-holder/barrier analysis. |
| 9 | `M3-R08` | `/module-3/screen-3-8` | Duty-Bearers, Supporting Actors, and CSO Roles | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Actor/responsibility mapping. |
| 10 | `M3-R09` | `/module-3/screen-3-9` | Power and Influence Map | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r09-power-map-desktop.png`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r09-mobile.png`; QA2 route sweep | Power/influence analysis. |
| 11 | `M3-R10` | `/module-3/screen-3-10` | Root Causes and Capacity Gaps | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Root-cause/capacity-gap work. |
| 12 | `M3-R11` | `/module-3/screen-3-11` | Gender and Disability Design Check | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Inclusion design check. |
| 13 | `M3-R12` | `/module-3/screen-3-12` | Participation and Accountability Pathway | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Participation/accountability pathway. |
| 14 | `M3-R13` | `/module-3/screen-3-13` | Risk and Do-No-Harm in Project Design | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Risk/design safety. |
| 15 | `M3-R14` | `/module-3/screen-3-14` | Repair the Objective | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r14-objective-repair-desktop.png`; QA2 route sweep | Objective repair. |
| 16 | `M3-R15` | `/module-3/screen-3-15` | Repair the Activity Package | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Activity repair. |
| 17 | `M3-R16` | `/module-3/screen-3-16` | Intervention Logic and Indicators | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r16-intervention-logic-desktop.png`; QA2 route sweep | Intervention logic/indicators. |
| 18 | `M3-R17` | `/module-3/screen-3-17` | Open the Draft Plan | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Proposal review studio begins. |
| 19 | `M3-R18` | `/module-3/screen-3-18` | Find the HRBA Gaps Across the Plan | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Proposal gap map. |
| 20 | `M3-R19` | `/module-3/screen-3-19` | Repair One Plan Section | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Plan-section repair. |
| 21 | `M3-R20` | `/module-3/screen-3-20` | Module 3 Applied Knowledge Check | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; QA1/QA2 source verification | Applied knowledge check. |
| 22 | `M3-R21` | `/module-3/screen-3-21` | My HRBA Project Design Improvement Snapshot | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx` | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r21-portfolio-snapshot-desktop.png`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r21-mobile.png`; QA2 privacy check | Portfolio snapshot; QA2 confirmed privacy/safe-use guidance. |
| 23 | `M3-R22` | `/module-3/screen-3-22` | Module 3 Closure | `MODULE3_REVISED_SCREENS`; `Module3RevisedRenderer.tsx`; `hrbaCourseModules.ts` completion ID | Commit `616dcb8`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r22-closure-desktop.png`; `docs/module-review/module-3/recovery/screenshots/m3-qa1-r22-mobile.png`; QA2 handoff check | Completion screen for `module_03_project_design`; no separate revised `M3-PLAYER-COMPLETE` route is canonical in current revised route data. |

Inactive / do-not-confuse notes:

- Older `M3-S1-*` screens and QA routes from archive docs are not the latest revised active path.
- `src/components/course/Module3Renderer.tsx` exists as the older Module 3 renderer; the latest active revised path uses `Module3RevisedRenderer.tsx` and `MODULE3_REVISED_SCREENS`.
- Archive QA `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-3\module-3-g1-g4-qa-evaluation.md` documents the older `M3-S1-*` path and should be treated as historical QA evidence.
- Existing screenshots under `docs/qa/batch-*` with `m3-s1-*` names are useful visual/design evidence but not proof of the latest `M3-R*` active route sequence.
- Preserve the active route pattern: `/module-3`, `/module-3/cover`, and `/module-3/screen-3-1` through `/module-3/screen-3-22`.

Recovery classification: recovered and committed.

Open Module 3 caveats:

- QA2 performed focused browser verification and representative route checks, but a later full manual learner click-through from cover through `M3-R22` is still recommended before final release.
- Inactive fallback scaffold components still exist in `Module3RevisedRenderer.tsx`; they are not active for `M3-R01` through `M3-R22`, but should not be allowed to become active in future routing changes.
- Older `M3-S1-*` screenshots/source-bank material must not be confused with the latest active `M3-R*` flow.

## Module 5 Registry

Latest active version: 16-state Module 5 redesign sequence.

Authoritative checkpoint: `9ee725443df281879ae7369037b3161fc752b90f` - `Restore Module 5 16-state redesign sequence`.

Recovery status: recovered and committed.

Source confidence: confirmed from committed source and QA/source.

Authority:

- Active sequence: `src/App.tsx`
- Screen renderer: `src/components/course/Module5Renderer.tsx`
- Player route map/completion handling: `src/components/player/CoursePlayerShell.tsx`
- Recovery inventory: `docs/module-review/module-5/recovery/module-5-16state-redesign-source-inventory.md`
- Final QA: `docs/module-review/module-5/recovery/module-5-16state-reconstruction-final-qa.md`

| Order | Active screen ID | Canonical route | Exact screen title | Implementation/source location | Evidence | Notes |
|---:|---|---|---|---|---|---|
| 1 | `M5-PLAYER-00` | `/module-5`, `/module-5/cover` | Module 5 Cover Screen | `App.tsx`; `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | Commit `9ee7254`; `docs/module-review/module-5/recovery/screenshots/m5-r4c-cover-desktop.png` | Cover state. |
| 2 | `M5-R01` | `/module-5/screen-5-1` | The Numbers Look Good, But Who Is Missing? | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | `m5-r4c-r01-intro-desktop.png`; `m5-r4c-r01-mobile.png`; final QA | Includes `https://www.youtube-nocookie.com/embed/xSHR5q_i1hU`. |
| 3 | `M5-R02` | `/module-5/screen-5-2` | What Is Missing from the Report? | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | `m5-r4c-r02-gap-diagnosis-desktop.png`; final QA | Gap diagnosis screen. |
| 4 | `M5-R03` | `/module-5/screen-5-3` | The HRBA MEAL Lens | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | `m5-r4c-r03-lens-desktop.png`; final QA | HRBA MEAL lens screen. |
| 5 | `M5-R04` | `/module-5/screen-5-4` | From Counting to Learning About Change | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Evidence ladder/change learning. |
| 6 | `M5-R05` | `/module-5/screen-5-5` | Indicator Repair Lab | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Indicator repair. |
| 7 | `M5-R06` | `/module-5/screen-5-6` | Safe and Inclusive Evidence | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Safe/inclusive data. |
| 8 | `M5-R07` | `/module-5/screen-5-7` | Feedback, Complaints, and Trust | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Feedback/accountability loop. |
| 9 | `M5-R08` | `/module-5/screen-5-8` | Ethical Stories and Responsible Data | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Ethical stories/data. |
| 10 | `M5-R09` | `/module-5/screen-5-9` | Interpreting Evidence with Rights-Holders | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Participatory interpretation. |
| 11 | `M5-R10` | `/module-5/screen-5-10` | Reading the Signals: When the Plan Should Change | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Adaptation signals. |
| 12 | `M5-R11` | `/module-5/screen-5-11` | Reporting Without Losing the Rights Lens | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Rights-based reporting. |
| 13 | `M5-R12` | `/module-5/screen-5-12` | Capstone: Evidence-to-Action Simulator | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | final QA | Capstone simulator. |
| 14 | `M5-R13` | `/module-5/screen-5-13` | My HRBA MEAL, Accountability, and Learning Repair Note | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | `m5-r4c-r13-repair-note-desktop.png`; final QA | Repair-note output. |
| 15 | `M5-R14` | `/module-5/screen-5-14` | 90-Day Practice Bridge and Account-Back Commitment | `Module5Renderer.tsx`; `CoursePlayerShell.tsx` | `m5-r4c-r14-90-day-bridge-desktop.png`; `m5-r4c-r14-mobile.png`; final QA | Final active practice screen; routes to completion. |
| 16 | `M5-PLAYER-COMPLETE` | `/module-5/complete` | Module 5 Complete | `Module5Renderer.tsx`; `CoursePlayerShell.tsx`; `hrbaCourseModules.ts` completion ID | `m5-r4c-completion-desktop.png`; final QA | Completion state for `module_05_hrba_meal`. |

Inactive / do-not-confuse notes:

- Do not treat the later 17-state version as authoritative.
- Do not recover active `M5-R15`.
- Do not recover the inserted active screen titled `What You Will Practice in This Module`.
- Do not revive the old 35-screen `M5-S1-*` learner path.
- Old `M5-S1-*` content may exist only as inactive source-bank or compatibility fallback material.
- Older `m5-r2-*` screenshots in `docs/module-review/module-5/recovery/screenshots/` document the wrong/later 17-state recovery and must not be used as latest evidence.

Recovery classification: recovered and committed.

Open Module 5 caveat:

- R14 live click-through should receive one hands-on confirmation before final release if browser automation becomes stable.

## Screenshot Evidence Map

### Module 1

Useful latest/near-latest evidence folders:

- `docs/refinement/evidence/module-1-batch-2c/`
- `docs/refinement/evidence/module-1-batch-3/`
- `docs/refinement/evidence/module-1-batch-3a-4/`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/`
- `public/assets/hrba/modules/module-1/`

Important filenames:

- `docs/refinement/evidence/module-1-batch-2c/module-1-cover-launch-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s02-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s03-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s04-1280x720.png`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/batch3-cover-family-m1-m1-player-00-after-desktop.png`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/batch3-objective-family-m1-m1-s1-02-after-desktop.png`
- `public/assets/hrba/modules/module-1/m1-s01-why-this-course-video-poster.png`
- `public/assets/hrba/modules/module-1/m1-s08-learning-commitment-completion.png`

Warning: many `docs/refinement/evidence/module-1-final-batch-s11-s19/` screenshots belong to the older 19-screen path and should not override the latest short-flow source.

### Module 3

Useful evidence folders:

- `docs/module-review/module-3/recovery/`
- `docs/module-review/module-3/recovery/screenshots/`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/`
- `docs/qa/batch-4-design-system-readability-content-safe-surfaces/screenshots/`
- `docs/qa/batch-6-media-placeholders-interim-intro-screens/screenshots/`
- `.tmp/`
- `public/assets/hrba/modules/module-3/`

Important filenames:

- `docs/module-review/module-3/recovery/module-3-dirty-worktree-audit.md`
- `docs/module-review/module-3/recovery/module-3-qa1-stabilization-report.md`
- `docs/module-review/module-3/recovery/module-3-qa2-browser-verification-report.md`
- `docs/module-review/module-3/recovery/screenshots/m3-qa1-cover-desktop.png`
- `docs/module-review/module-3/recovery/screenshots/m3-qa1-r05-context-scan-desktop.png`
- `docs/module-review/module-3/recovery/screenshots/m3-qa1-r09-power-map-desktop.png`
- `docs/module-review/module-3/recovery/screenshots/m3-qa1-r21-portfolio-snapshot-desktop.png`
- `docs/module-review/module-3/recovery/screenshots/m3-qa1-r22-closure-desktop.png`
- `.tmp/m3-r01-polish-desktop.png`
- `.tmp/m3-r01-polish-mobile.png`
- `.tmp/m3-r01-edge-desktop.png`
- `docs/qa/batch-3-common-screen-family-standardization/screenshots/batch3-cover-family-m3-m3-player-00-after-desktop.png`
- `docs/qa/batch-4-design-system-readability-content-safe-surfaces/screenshots/m3-s1-07-desktop.png`
- `docs/qa/batch-4-design-system-readability-content-safe-surfaces/screenshots/m3-s1-07-mobile.png`
- `docs/qa/batch-6-media-placeholders-interim-intro-screens/screenshots/m3-s1-01-desktop.png`
- `public/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-intro-poster.png`
- `public/assets/hrba/modules/module-3/m3-s03-jiru-amba-case-reader-cover.png`

Warning: `m3-s1-*` screenshots are older or transitional evidence unless paired with current `M3-R*` source verification.

### Module 5

Latest R4C evidence screenshots:

- `docs/module-review/module-5/recovery/screenshots/m5-r4c-cover-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r01-intro-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r02-gap-diagnosis-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r03-lens-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r13-repair-note-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r14-90-day-bridge-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-completion-desktop.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r01-mobile.png`
- `docs/module-review/module-5/recovery/screenshots/m5-r4c-r14-mobile.png`

Warning: avoid `m5-r2-*` screenshots for latest-version evidence; they belong to the later 17-state recovery pass.

## Open Issues And Release Caveats

- Module 1: latest short-flow source is committed, but this task did not run a fresh live route/click-through test.
- Module 1: older long-path source-bank cases still exist in `Module1Renderer.tsx`; they should remain inactive unless deliberately restored.
- Module 3: latest revised source/data/style changes are protected in commit `616dcb8`.
- Module 3: QA2 completed focused browser verification and representative route checks, but a later full manual learner click-through is still recommended before final release.
- Module 5: R14 live click-through should still receive one hands-on confirmation before final release if browser automation becomes stable.
- Dirty worktree: unrelated Module 2/3/certificate/prompt/resource files are currently dirty and should not be swept into cleanup or recovery commits without separate review.

## Recommended Next Actions

1. Run a cross-module route smoke test for Module 1, Module 3, and Module 5 using clean prerequisite-completion state.
2. Complete a later full manual learner click-through for Module 3 before final release.
3. Generate or refresh latest screenshots for Module 1 if needed; Module 3 now has QA1 recovery screenshots and QA2 browser verification.
4. Keep Module 5 as the committed 16-state checkpoint unless a future task explicitly supersedes `9ee7254`.
5. Avoid broad cleanup, broad staging, or archive restoration that could mix unrelated dirty files into protected module-version commits.

## Verification Notes

This registry update is documentation only. No implementation files were edited for this task. Module 3 is now recorded as protected by commit `616dcb8`. No push was performed as part of this registry update.
