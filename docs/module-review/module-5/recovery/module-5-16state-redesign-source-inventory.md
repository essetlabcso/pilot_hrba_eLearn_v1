# Module 5 16-State Redesign Source Inventory

Date: 2026-06-30

## Executive finding

The exact 16-state Module 5 redesign source snapshot was not found as a complete recoverable source file or clean git commit.

The 16-state target is strongly evidenced by the archived implementation plan, readiness document, Batch 1B through Batch 5 QA reports, final acceptance QA, and QA screenshots. Those sources confirm the intended active path:

`M5-PLAYER-00 -> M5-R01 -> M5-R02 -> M5-R03 -> M5-R04 -> M5-R05 -> M5-R06 -> M5-R07 -> M5-R08 -> M5-R09 -> M5-R10 -> M5-R11 -> M5-R12 -> M5-R13 -> M5-R14 -> M5-PLAYER-COMPLETE`

However, the preserved source-like patch evidence and the current committed recovery are the later 17-state version with `M5-R15` and the inserted orientation screen titled `What You Will Practice in This Module`.

## Evidence locations found

### Strong 16-state evidence

- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\module-5-redesign-implementation-plan.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\module-5-redesign-implementation-readiness.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-1b-scaffold-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-2-screens-1-4-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-2-stabilization-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-3-screens-5-8-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-3-stabilization-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-4-screens-9-12-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-5-final-screens-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-final-acceptance-qa.md`
- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\screenshots\`

Key confirmations:

- Batch 1B QA states the player header reports 16 states only: cover, 14 revised screens, and completion.
- The implementation plan maps `/module-5/screen-5-14` to `M5-R14` with title `90-Day Practice Bridge and Account-Back Commitment`.
- Batch 5 QA verifies `M5-R14` routes to `/module-5/complete`.
- Final acceptance QA confirms the complete revised learner journey is cover, `M5-R01` through `M5-R14`, and `/module-5/complete`, with no old 35-screen path revived.
- Final acceptance QA confirms R01 uses `https://www.youtube-nocookie.com/embed/xSHR5q_i1hU`.

### Later 17-state source evidence, not target

- Current source:
  - `D:\eLearn_CDP_Lg\src\App.tsx`
  - `D:\eLearn_CDP_Lg\src\components\course\Module5Renderer.tsx`
  - `D:\eLearn_CDP_Lg\src\components\course\ScreenRenderer.tsx`
  - `D:\eLearn_CDP_Lg\src\components\player\CoursePlayerShell.tsx`
  - `D:\eLearn_CDP_Lg\src\data\hrbaCourseModules.ts`
  - `D:\eLearn_CDP_Lg\src\styles\global.css`
- Preserved patch evidence:
  - `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\module-5-tracked-changes.patch`
  - `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\remaining-dirty-tracked-changes.patch`

These contain active `M5-R15` and `What You Will Practice in This Module`, so they are not the requested 16-state source.

## Full source found?

No full `Module5Renderer.tsx` source snapshot matching the exact 16-state version was found.

What was found:

- Full current `Module5Renderer.tsx`, but it is the later 17-state version.
- Large archived tracked patches, but they also represent the later 17-state version.
- QA and implementation-plan evidence for the earlier 16-state version.
- Screenshots proving the earlier 16-state route behavior and R14 completion behavior.

## Matching route/support files

| File | Current file found | 16-state source found | Notes |
| --- | --- | --- | --- |
| `src/App.tsx` | Yes | No exact source | Current and archived patch include `M5-R15` and the orientation screen. Plan/QA define the 16-state route map. |
| `src/components/course/ScreenRenderer.tsx` | Yes | No exact source | Current and patch support `M5-R` screens; this is compatible, but not 16-state-specific. |
| `src/components/player/CoursePlayerShell.tsx` | Yes | No exact source | Batch 1B QA describes a Module 5 completion handling fix; current and patch include later 17-state mappings. |
| `src/data/hrbaCourseModules.ts` | Yes | No exact source | Current file exists and module id/completion id are relevant; no 16-state exact snapshot found. |
| `src/styles/global.css` | Yes | No exact source | Current and patch include Module 5 redesign styles; no separate 16-state exact CSS snapshot found. |

## Asset inventory

All 16 normalized Module 5 redesign PNG assets were found in both current and archived asset folders.

Current path:

- `D:\eLearn_CDP_Lg\public\assets\hrba\modules\module-5-redesign\`

Archived path:

- `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\untracked-files\public\assets\hrba\modules\module-5-redesign\`

Files found:

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

The requested QA screenshot markers were also found in the archived QA screenshots folder:

- `m5-b2-r01-intro-desktop.png`
- `m5-b5-r14-90-day-bridge-completed-desktop.png`

## YouTube intro source

The YouTube no-cookie intro URL was found in current source and in archived QA/patch evidence:

- Current source: `D:\eLearn_CDP_Lg\src\components\course\Module5Renderer.tsx`
- Archived 17-state patch: `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\phase-4-dirty-source-preservation\tracked-diffs\module-5-tracked-changes.patch`
- 16-state QA evidence: `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-batch-1b-scaffold-qa.md`
- 16-state final acceptance evidence: `D:\eLearn_CDP_Lg_ARCHIVE\repo_cleanup_2026-06-27\generated-docs\module-review\module-5\redesign\qa\module-5-final-acceptance-qa.md`

The exact 16-state source implementation of the intro screen was not found as a standalone source snapshot, but the current 17-state source contains the same R01 title and embed URL.

## Final R14 completion behavior

The final R14 completion behavior source was not found as exact 16-state source.

Evidence found:

- `module-5-redesign-implementation-plan.md` says `M5-R14` should add `M5-PLAYER-COMPLETE` to progress and add `module_05_hrba_meal` to completed modules when routing to `/module-5/complete`.
- `module-5-batch-1b-scaffold-qa.md` says `M5-R14` can route to `/module-5/complete` and documents a Module 5-only `CoursePlayerShell.tsx` completion fix.
- `module-5-batch-5-final-screens-qa.md` verifies that `M5-R14` routes to `/module-5/complete` and that `M5-R14`, `M5-PLAYER-COMPLETE`, and `module_05_hrba_meal` are complete.
- `module-5-final-acceptance-qa.md` confirms `/module-5/screen-5-14` is `90-Day Practice Bridge and Account-Back Commitment` and routes to completion.

## 16-state versus 17-state determination

Clearly 16-state evidence:

- Implementation plan uses `M5-R01` through `M5-R14`, then `M5-PLAYER-COMPLETE`.
- Batch 1B QA explicitly says 16 states only.
- Batch 5 QA treats `M5-R14` as `90-Day Practice Bridge and Account-Back Commitment` and verifies completion from R14.
- Final acceptance QA confirms cover, `M5-R01` through `M5-R14`, and completion.

Clearly 17-state evidence:

- Current source maps `/module-5/screen-5-15` to `M5-R15`.
- Current source contains active title `What You Will Practice in This Module`.
- Current source has `M5-R14` as `My HRBA MEAL, Accountability, and Learning Repair Note`.
- Current source has `M5-R15` as `90-Day Practice Bridge and Account-Back Commitment`.
- Archived tracked patches contain the same later 17-state markers.
- Git commit `dd1a4be` (`Recover redesigned Module 5 active path`) contains the later 17-state recovery.

No clean git commit, branch, reflog entry, stash, or source snapshot was found that directly represents the exact 16-state version.

## Recommended safest recovery method

Recommended method: manually reconstruct from source and QA evidence, using the current 17-state source as the nearest implementation base and the archived 16-state plan/QA as the authority.

Do not restore the archived tracked patches wholesale, because they contain the later 17-state version.

Likely reconstruction approach for the next restore batch:

- Remove the active inserted orientation screen titled `What You Will Practice in This Module`.
- Remove active `M5-R15`.
- Shift `90-Day Practice Bridge and Account-Back Commitment` back to `M5-R14`.
- Ensure `/module-5/screen-5-1` remains `The Numbers Look Good, But Who Is Missing?` and retains the YouTube no-cookie embed.
- Ensure `/module-5/screen-5-14` is `90-Day Practice Bridge and Account-Back Commitment`.
- Ensure `M5-R14` completes Module 5 and routes to `/module-5/complete`.
- Keep the old `M5-S1-*` sequence inactive.
- Preserve the 16 normalized PNG assets already present.

This is partial reconstruction, not direct exact source recovery.

## Files likely needing changes in the restore batch

- `D:\eLearn_CDP_Lg\src\App.tsx`
- `D:\eLearn_CDP_Lg\src\components\course\Module5Renderer.tsx`
- `D:\eLearn_CDP_Lg\src\components\player\CoursePlayerShell.tsx`

Possibly inspect but likely lower-risk/no change:

- `D:\eLearn_CDP_Lg\src\components\course\ScreenRenderer.tsx`
- `D:\eLearn_CDP_Lg\src\data\hrbaCourseModules.ts`
- `D:\eLearn_CDP_Lg\src\styles\global.css`

## Risks and stop conditions

Risks:

- The exact 16-state implementation source was not found, so reconstruction may differ slightly from the original implementation even if behavior matches.
- Current 17-state R13/R14/R15 code may include later polish that needs careful back-porting or removal.
- Route aliases for legacy `/module-5/screen-5-15` through `/screen-5-25` need an explicit decision: keep them as safe fallbacks to revised screens, or remove inactive aliases. The target says the old 35-screen sequence must not become active.
- Progress state migration must avoid leaving learners stuck on removed `M5-R15`.

Stop conditions:

- Stop if reconstruction would require guessing learner-facing content not covered by the 16-state plan, QA reports, screenshots, or current nearest source.
- Stop if removing `M5-R15` breaks shared player navigation or completion state in a way that cannot be resolved with a narrow Module 5-only change.
- Stop if any restore attempt would revive active `M5-S1-*` learner navigation.
- Stop if `/module-5/screen-5-14` cannot be made to complete the module and route to `/module-5/complete`.

## Git status

Initial git status before creating this report:

```text
## system/hrba-clean-foundation...origin/system/hrba-clean-foundation [ahead 5]
 D public/assets/certificates/templates/certificate_template.png
 M src/components/course/Module3RevisedRenderer.tsx
 M src/components/course/module2-final/Module2FinalRenderer.tsx
 M src/components/course/module2-final/module2Final.css
 M src/components/course/module3-revised.css
 M src/data/module2-final/module2FinalAssets.ts
 M src/data/module3/module3RevisedScreens.ts
?? docs/prompts/
?? docs/qa/module2-cover-correction/
?? docs/qa/phase-3-screen-5-2/
?? docs/qa/screen-1-3-correction/
?? docs/qa/visual-fidelity-calibration/
?? public/assets/certificates/templates/hrba-certificate-template.png
?? public/assets/hrba/module2/
?? public/assets/hrba/shared/icons/shared-key-takeaway.svg
?? public/assets/hrba/shared/icons/shared-listen.svg
?? public/assets/resources/module-3/
```

No stash entries were listed by `git stash list`.

Branches/reflog searched included:

- `system/hrba-clean-foundation`
- `origin/system/hrba-clean-foundation`
- `main`
- `legacy/hrba-pilot-v1`
- `wip/hrba-pilot-uncommitted-snapshot`
- recent reflog entries through the Module 5 recovery commit

`git log --all -S` searches for the target markers found only `dd1a4be`, the later 17-state recovery commit.

## Staging/commit/push confirmation

No source code was edited.

Nothing was staged.

Nothing was committed.

Nothing was pushed.
