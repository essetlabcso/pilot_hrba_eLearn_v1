# HRBA Learner State and Identifier Inventory

Date: 2026-07-25

Inventory source: HRBA candidate
`7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3` and Hub contract commit
`39dfa68866a9fad81ff6f89c20b2420b8928fc07`.

These identifiers are compatibility contracts. Do not rename, reuse, or
remove them without a tested migration and, where applicable, a coordinated
Hub change.

## Course, module, and completion identifiers

Local course state uses `currentCourseId: "hrba_course"`. The public Hub
course slug and Hub database identifiers are recorded in
`HRBA_HUB_INTEGRATION_GUARDRAILS.md`.

| Work item | Module ID | Start ID | Completion ID |
| --- | --- | --- | --- |
| Module 1 | `module_01_hrba_foundations` | `M1-PLAYER-00` | `M1-PLAYER-COMPLETE` |
| Module 2 | `module_02_everyday_cso_work` | `M2-00` | `M2-Close` |
| Module 3 | `module_03_project_design` | `M3-PLAYER-00` | `M3-R22` |
| Module 4 | `module_04_implementation` | `M4-PLAYER-00` | `M4-S1-14` |
| Module 5 | `module_05_hrba_meal` | `M5-PLAYER-00` | `M5-PLAYER-COMPLETE` |
| Final Assessment | `final_assessment` | `FINAL-ASSESSMENT-PLAYER-00` | `FINAL-ASSESSMENT-COMPLETE` |

The module list and start/completion IDs are authoritative in
`src/data/hrbaCourseModules.ts`. Sequential prerequisites and stale
Final Assessment cleanup are authoritative in
`src/state/coursePrerequisites.ts`.

## Screen and route identifiers

- Module 1: platform/shell IDs `M1-LMS-00`, `M1-PLAYER-00`,
  `M1-PLAYER-HELP`, `M1-PLAYER-A11Y`; learner screens `M1-S1-01` through
  `M1-S1-06`, `M1-S1-06A`, `M1-S1-06B`; completion/return
  `M1-PLAYER-COMPLETE`, `M1-LMS-RETURN`. Preserve the sequence and saved
  `practiceCheckState` keys in
  `src/data/module1/module_1_screen_sequence.json`.
- Module 2: current course data uses `M2-S01` through `M2-S23`, with
  `M2-00`/cover and `M2-Close` shell boundaries. Preserve current aliases,
  routes, interaction registry numeric IDs, and portfolio keys in
  `src/data/module2/`, `src/components/course/Module2Renderer.tsx`, and
  `src/components/course/module2-final/Module2FinalRenderer.tsx`.
- Module 3: `M3-PLAYER-00`, `M3-R01` through `M3-R22`, with routes
  `/module-3/cover`, `/module-3/screen-3-1` through
  `/module-3/screen-3-22`. The canonical mapping is
  `MODULE3_REVISED_SCREENS` and `module3RevisedScreenRoutes` in
  `src/data/module3/module3RevisedScreens.ts`.
- Module 4: `M4-PLAYER-00`, `M4-S1-01` through `M4-S1-14`, with routes
  `/module-4/cover` and `/module-4/screen-4-1` through
  `/module-4/screen-4-14`. The renderer dispatch table and route table in
  `src/components/course/Module4Renderer.tsx` are authoritative.
- Module 5: canonical `M5-R01` through `M5-R14` plus
  `M5-PLAYER-COMPLETE`; routes `/module-5/cover`,
  `/module-5/screen-5-1` through `/module-5/screen-5-14`, and
  `/module-5/complete`. Preserve every `M5-S1-*` legacy alias and
  `MODULE5_STATE_MIGRATION_MAP` in
  `src/data/module5/module5EnhancedModel.ts`.
- Final Assessment: `FINAL-ASSESSMENT-PLAYER-00`,
  `FINAL-ASSESSMENT-QUESTIONS`, `FINAL-ASSESSMENT-COMPLETE`; routes
  `/final-assessment/cover`, `/final-assessment/questions`, and
  `/final-assessment/result`.

## Interaction and assessment identifiers

The full persisted schema is the `LearningState` interface and
`initialLearningState` in `src/state/learningState.ts`. Protected interaction
namespaces include:

- `screenProgress[moduleId]` arrays of completed screen IDs;
- `practiceCheckState` (including Module 1, Module 3, Module 4, and migrated
  Module 5 structured activity payloads);
- `quizAttempts`, `quizAnswers`, `quizCompleted`, `quizScore`;
- Module 1 `orientation*`, `survey*`, `sorting*`, `matching*`,
  `scenario*`, `m1*`, `selfAssessment*`, `screen17ActionCommitment`,
  `screen18Completion`, and `module1Completion`;
- Module 2 `m2*` fields and `m2FinalPortfolio`;
- Final Assessment `finalAssessmentAnswers`, `finalAssessmentResult`, and
  `finalAssessmentAttemptNumber`.

Module-specific registries are part of the ID contract:

- Module 1:
  `src/data/module1/module_1_interaction_state_registry.json`;
- Module 2:
  `src/data/module2/module_2_interaction_registry.ts` and
  `src/data/module2/module_2_portfolio_registry.ts`;
- Module 3: stable nested object keys saved by each `M3-R*` screen in
  `practiceCheckState`;
- Module 4: `module4*` keys in `practiceCheckState`;
- Module 5: `MODULE5_CANONICAL_SCREEN_IDS`, `MODULE5_LEGACY_ID_MAP`,
  `MODULE5_STATE_MIGRATION_MAP`, and `module5EnhancedPractice`.

Final Assessment question IDs are:

`q1_hrba_shift`, `q2_actor_roles`, `q3_participation`, `q4_inclusion`,
`q5_accountability`, `q6_power_barriers`, `q7_safe_evidence`,
`q8_design_repair`, `q9_adaptation`, and `q10_meal_reporting`.

Each answer uses option IDs `a`–`d`. The pass threshold is `80`. A submitted
attempt persists `evidenceId`, `score`, `maxScore`, `percentage`, `passed`,
original `submittedAt`, and `attemptNumber`.

## Browser storage and Hub progress records

| Record | Identifier / rule |
| --- | --- |
| State schema/version | `hrba-course-progress-v1` |
| Standalone key | `hrba-course-progress-v1` |
| Removed legacy standalone key | `hrba_course_learning_state` |
| Portal key prefix | `hrba-course-progress-v1:portal:sha256:` |
| Portal history-state key | `hrbaPortalContextV1` |
| Launch-state key | 43-character canonical unpadded base64url value |
| Launch token | Opaque, short-lived, URL-only authorization value |
| Progress event type/version | `cso-learning-hub:external-course-event`, `1` |
| Completion events | `module_completed`, `assessment_completed`, `course_completed` |
| Progress fields | sorted `completedModuleIds`, `currentModuleId`, `currentScreenId`, integer `progressPercent`, ISO `sentAt` |
| Assessment idempotency | stable valid `evidenceId` and original `submittedAt` for the same attempt |

Portal storage is derived from SHA-256 of the learner state key. The raw key
must not appear in the storage key. Standalone/legacy state is ignored in
portal mode. Saved state validation rejects invalid module dependencies,
invalid progress maps, or invalid assessment evidence.

## Downloaded learner-output identifiers

Existing download names are user-visible compatibility identifiers. Preserve
at least these names and filename stems:

- `everyday-rights-lens-offline-card.txt`;
- `context-and-inequality-scan-template-pack.pdf`;
- `context-and-inequality-scan-template.md`;
- `context-and-inequality-scan-blank-worksheet.md`;
- `context-and-inequality-scan-template.docx`;
- `policy-and-standards-map-template.md` / `.docx`;
- `rights-holder-and-barrier-map-template.md` / `.docx`;
- `duty-bearer-actor-responsibility-map-template.md` / `.docx`;
- `gender-disability-design-check-template.*`;
- `participation-accountability-pathway-template.*`;
- `risk-do-no-harm-board-template.*`;
- `hrba-intervention-logic-mini-matrix-template.*`;
- `draft-plan-review-note-template.*`, `draft-plan-review-note.*`;
- `hrba-gap-map-template.*`, `plan-section-repair-template.*`;
- `hrba-project-design-improvement-snapshot.*`;
- `root-cause-capacity-gap-map-template.*`.

Generated Module 5 outputs and any future outputs must retain their existing
filename constants and saved source fields. Download files are learner copies;
they are not Hub completion or certificate evidence.

## Certificate evidence identifiers

HRBA does not generate the governed certificate. It supplies the immutable
passed assessment object and `course_completed` event. The Hub binds that
evidence to the authenticated learner, enrollment, course, course version,
completion quiz, learner-state-key hash, and iframe origin, then creates or
returns one idempotent certificate. Certificate code, PDF generation,
download, and public verification remain Hub-owned.

## Risks recorded for review

| Severity | Finding | Required response |
| --- | --- | --- |
| P0 release gate | The live production asset is the accepted `22f9448` build, while per-learner state isolation exists only in unapproved Draft PR #4 head `7f6bad9`. | Do not call `7f6bad9` deployed/accepted. Complete independent review and matched Hub/HRBA Preview acceptance before selecting it as the update baseline. |
| P0 integration gate | Hub contract `39dfa688` and HRBA `7f6bad9` are a coordinated pair; production currently serves an older HRBA contract. | Run authenticated two-learner same-browser, refresh/resume, assessment resend, completion, and certificate tests against matched Previews. |
| P0 Hub acceptance gate | Hub contract `39dfa688` is in open Draft Hub PR #2 and is not in Hub `main`. | Obtain coordinated independent acceptance of Hub PR #2 and HRBA PR #4 before treating the pair as a release baseline. |
| P1 baseline drift | `origin/release/hrba-pilot-final` is `859c1a3`, three commits behind `7f6bad9` and ahead of deployed `22f9448`. | Resolve and record the accepted commit before any Module 1 content edit or remote feature-branch push. |
| P1 workspace safety | The release worktree `D:/eLearn_CDP_Lg` is locally behind its remote and contains many user changes; several verification worktrees also contain screenshots or notes. | Do not clean, reset, merge, or reuse those worktrees. Continue only in the isolated assessment-fix worktree. |
| P1 event coverage | `module_completed` is defined in the contract, but the current App reporting path visibly emits progress, assessment, and course-completion events; module completion is represented in `completedModuleIds`. | Confirm whether Hub requires discrete `module_completed` emission before changing reporting behavior. |
| P2 migration risk | Invalid saved state is removed by validation, and the standalone legacy key is removed. | Any schema change must be additive and tested with retained real-shaped legacy fixtures; never rename IDs or reset progress as a migration. |
| P2 output risk | Several legacy `.docx` exports are HTML/Word-compatible content rather than OOXML. | Record as existing backlog; do not change formats or names in this branch-preparation pass. |
