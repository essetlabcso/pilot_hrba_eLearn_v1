# Module 3 Dirty Worktree Audit

Date: 2026-06-30

Scope: read-only audit of dirty Module 3 files against checkpoint `130da81` (`Recover revised Module 3 learning flow`).

## Executive Verdict

Module 3 is not safe to commit as-is.

The active Module 3 route/data skeleton still appears intact: cover plus `M3-R01` through `M3-R22`, with sequential `screenNumber` values and sequential `nextId` flow through `M3-R22 -> M4-PLAYER-00`.

However, the dirty Module 3 changes are very large and materially alter content, interaction logic, output structures, and styling. They appear related to the revised Module 3 redesign and may be useful enhancement/recovery work, but they need a QA/stabilization pass before staging or committing. The current source also still contains learner-facing scaffold/placeholder language in active fallback/scaffold components, which is a release risk unless those screens are intentionally unfinished.

Recommendation: run full Module 3 QA/stabilization first. Do not stage the dirty Module 3 files as-is.

## Current Git Status Summary

Current branch: `system/hrba-clean-foundation`

Nothing is staged. `git diff --cached --name-status` returned no output.

Dirty Module 3 files found:

- `src/components/course/Module3RevisedRenderer.tsx`
- `src/components/course/module3-revised.css`
- `src/data/module3/module3RevisedScreens.ts`

Unrelated dirty or untracked files outside Module 3:

- `public/assets/certificates/templates/certificate_template.png` deleted
- `src/components/course/module2-final/Module2FinalRenderer.tsx` modified
- `src/components/course/module2-final/module2Final.css` modified
- `src/data/module2-final/module2FinalAssets.ts` modified
- `docs/module-review/latest-active-version-registry.md` untracked
- `docs/prompts/` untracked
- `docs/qa/module2-cover-correction/` untracked
- `docs/qa/phase-3-screen-5-2/` untracked
- `docs/qa/screen-1-3-correction/` untracked
- `docs/qa/visual-fidelity-calibration/` untracked
- `public/assets/certificates/templates/hrba-certificate-template.png` untracked
- `public/assets/hrba/module2/` untracked
- `public/assets/hrba/shared/icons/shared-key-takeaway.svg` untracked
- `public/assets/hrba/shared/icons/shared-listen.svg` untracked
- `public/assets/resources/module-3/` untracked

These unrelated files should not be included in any Module 3 implementation staging set.

## Checkpoint Compared

Known checkpoint:

- `130da81` - `Recover revised Module 3 learning flow`

Checkpoint stat summary:

- Added revised Module 3 renderer, CSS, route data, Jiru Amba narrative, assets, and route integration.
- Introduced `Module3RevisedRenderer.tsx`, `module3-revised.css`, and `module3RevisedScreens.ts`.

Current dirty diff against `HEAD` and against `130da81` for the three Module 3 files is the same in this worktree:

| File | Insertions | Deletions | Audit summary |
|---|---:|---:|---|
| `src/components/course/Module3RevisedRenderer.tsx` | 7,610 | 3,331 | Major content, data model, interaction, template, validation, and screen implementation changes. |
| `src/components/course/module3-revised.css` | 5,910 | 2,672 | Major styling rewrite/addition, including power-studio and other screen-specific systems. |
| `src/data/module3/module3RevisedScreens.ts` | 14 | 14 | Screen metadata text changes only; IDs/order/routes remain stable. |

Total dirty Module 3 diff: 13,534 insertions and 6,017 deletions.

## Active Module 3 Path Confirmation

Result: PASS by source inspection.

The current `src/data/module3/module3RevisedScreens.ts` still contains exactly 22 active revised screens:

- `M3-R01` through `M3-R22`
- sequential `screenNumber` values `1` through `22`
- sequential `nextId` values from `M3-R01 -> M3-R02` through `M3-R21 -> M3-R22`
- final `M3-R22 -> M4-PLAYER-00`

The current active route source still maps:

- `/module-3`
- `/module-3/cover`
- `/module-3/screen-3-1` through `/module-3/screen-3-22`

Important active markers still present:

- `M3-R22`
- `Module 3 Closure`
- `MODULE3_REVISED_SCREENS`
- `module3PlayerSequence`
- `Module3RevisedRenderer`

## Summary By File

### `src/data/module3/module3RevisedScreens.ts`

Nature of change: metadata-only changes.

Observed changes:

- `M3-R05` title changes from `Context and Inequality Analysis` to `Context and Inequality Scan`.
- `M3-R09` title changes from `Power and Influence Analysis` to `Power and Influence Map`.
- Several `continueLabel` strings are revised to be more specific, for example:
  - `Save scan and continue to standards and policy mapping`
  - `Save repaired objective and continue to activity repair`
  - `Save HRBA gap map and continue to section repair`

Risk level: low for routes/order, medium for QA because screenshots and QA docs may reference older titles.

Conclusion: likely intended redesign polish, but QA should confirm expected titles before commit.

### `src/components/course/Module3RevisedRenderer.tsx`

Nature of change: major implementation and content transformation.

Observed intended-looking changes:

- Expands `M3-R05` context and inequality scan with stronger HRBA analysis language.
- Adds typed structures for context-scan categories, quality states, generated outputs, and templates.
- Adds more detailed policy/standards matching logic.
- Adds safer text validation helpers for learner-entered group/actor labels and free-text fields.
- Adds richer "own CSO" draft/output structures for several screens.
- Adds or expands outputs/templates for:
  - context and inequality scan
  - policy and standards map
  - rights-holder and barrier map
  - gender and disability design check
  - participation/accountability
  - risk/do-no-harm
  - objective/activity/intervention logic
  - proposal review/gap/repair screens
- Adds stronger privacy/safety language in several new placeholders and learner text fields.

Risky or uncertain observations:

- Large diff size means this cannot be treated as a simple polish patch.
- Active source still contains visible scaffold/placeholder language, including:
  - `Phase 1 scaffold`
  - `Module path scaffold`
  - `Case narrative placeholder`
  - `Interaction scaffold`
  - `Scaffold feedback ready`
  - `You have completed the revised Module 3 scaffold`
  - `Transcript placeholder: audio coming soon`
- These may be acceptable for an internal scaffold phase, but they are risky for latest active learner release.
- The renderer adds multiple new learner input areas and "own CSO" outputs. These need privacy, storage, reset, resume, and accessibility QA before commit.
- Several screens now have expanded validation and generated-output behavior. They need interaction QA, not only build QA.
- Some scaffold components remain reachable by interaction type fallback, even if the current primary `M3-R01` through `M3-R22` dispatch handles many specific screens.

Conclusion: related to Module 3 redesign, build-safe, but too broad and too scaffold-heavy to stage without stabilization QA.

### `src/components/course/module3-revised.css`

Nature of change: major styling transformation.

Observed intended-looking changes:

- Adds extensive screen-specific styling for transformed Module 3 experiences.
- Adds a new power mapping/studio UI system.
- Adds responsive and control styling for new interaction patterns.

Risky or uncertain observations:

- The CSS diff is very large: 5,910 insertions and 2,672 deletions.
- Early diff shows existing broad base selectors being replaced or moved near new `.m3-power-studio-*` rules. This may be intentional, but it is risky without visual regression screenshots for all active Module 3 screens.
- Because the CSS touches the shared revised Module 3 stylesheet, regressions can affect many screens beyond the screen being enhanced.

Conclusion: likely related to intended Module 3 UI enhancement, but requires visual QA before commit.

## Answers To Audit Questions

Does the current Module 3 active sequence still remain cover + `M3-R01` through `M3-R22`?

Yes, by source inspection. `MODULE3_REVISED_SCREENS` still contains 22 sequential records and `module3PlayerSequence` still prepends the cover screen.

Do the dirty changes alter screen titles, screen order, routes, completion behavior, or only content/styling?

- Screen order: no change found.
- Routes: no canonical route pattern change found.
- Completion behavior: no direct completion-route rewrite found in the audited metadata; `M3-R22` remains the completion screen and `hrbaCourseModules.ts` still uses `completionScreenId: 'M3-R22'`.
- Screen titles: yes, at least `M3-R05` and `M3-R09` titles change.
- Content/styling/interactions: yes, heavily.

Are the dirty changes clearly related to the approved latest Module 3 redesign?

Mostly yes. The changes are concentrated in revised Module 3 files and appear aligned with the `M3-R` redesign: context scan, policy map, rights-holder/barrier map, power map, risk, repair, proposal review, portfolio outputs, and safe learner-input handling.

Are any changes temporary, experimental, duplicated, inconsistent, or unsafe?

Uncertain and risky. The source contains scaffold/placeholder language that appears temporary. It also introduces many new interaction/output structures that have not yet been QA-proven.

Do any dirty changes touch unrelated modules or shared systems?

The audited Module 3 dirty changes are limited to Module 3 files. The worktree also contains unrelated dirty Module 2, certificate, docs, and asset files, but those are separate and should not be staged with Module 3.

Do the changes appear build-safe?

Yes. `npm run build` passed.

Do the changes improve the latest Module 3 active version, or do they risk corrupting it?

Both. The changes appear to improve and deepen the revised Module 3 active version, but their size and scaffold/placeholder content make them risky to commit without QA. They do not appear to corrupt the active route skeleton.

Is Module 3 ready for QA/staging, or does it need a stabilization pass first?

It needs a stabilization/QA pass first.

Are there any files that should definitely not be staged?

Yes. Do not stage unrelated Module 2, certificate, prompt, resource, or unrelated QA files as part of Module 3. Also do not stage the three dirty Module 3 implementation files until QA/stabilization confirms the scaffold/placeholder and interaction risks are acceptable or fixed.

What is the safest next action?

Run a dedicated Module 3 QA/stabilization pass before staging. Focus on active routes, visible scaffold text, screen-title acceptance, mobile/desktop screenshots, keyboard interaction, learner-input privacy, storage/resume behavior, and completion into Module 4.

## Build Result

Command: `npm run build`

Result: PASS.

Warnings:

- Existing Vite chunk-size warning: some chunks larger than 500 kB after minification.

No TypeScript or Vite build error was observed.

## Browser Smoke Result

Result: not completed due browser automation instability.

Attempted checks:

- Standalone Chrome `--dump-dom` against `http://localhost:5174` returned no usable DOM stdout in this environment.
- In-app browser automation timed out during the requested route loop.
- A final single-route in-app probe for `/module-3/screen-3-1` also timed out.

Interpretation:

- Browser automation failure is not evidence that Module 3 is broken.
- Source/build evidence should be used for this audit.
- A future Module 3 QA/stabilization pass should perform route smoke manually or with stable browser automation.

Requested route smoke still needed:

- `/module-3`
- `/module-3/cover`
- `/module-3/screen-3-1`
- `/module-3/screen-3-5`
- `/module-3/screen-3-14`
- `/module-3/screen-3-22`

## Changes That Appear Intended Or Approved

Likely intended Module 3 redesign/enhancement work:

- Stronger HRBA context and inequality scan language.
- More specific and learner-friendly screen titles and continue labels.
- More structured generated outputs and templates.
- More robust privacy/safety validation for learner-entered examples.
- More detailed policy, responsibility, power, risk, and repair interaction logic.
- Expanded CSS for richer active Module 3 experiences.

These should be preserved for review, not casually discarded.

## Changes That Appear Risky, Uncertain, Temporary, Or Experimental

- Visible scaffold/placeholder wording remains in source.
- Many interaction paths changed without current route/click-through evidence.
- New learner-input/output fields need privacy and persistence QA.
- Large CSS rewrite needs visual regression testing across all active Module 3 screens.
- Screen-title changes may require QA evidence and registry updates after approval.

## Files That Should Not Be Staged Now

Do not stage as-is pending Module 3 stabilization QA:

- `src/components/course/Module3RevisedRenderer.tsx`
- `src/components/course/module3-revised.css`
- `src/data/module3/module3RevisedScreens.ts`

Definitely do not stage for Module 3:

- `public/assets/certificates/templates/certificate_template.png`
- `src/components/course/module2-final/Module2FinalRenderer.tsx`
- `src/components/course/module2-final/module2Final.css`
- `src/data/module2-final/module2FinalAssets.ts`
- `docs/prompts/`
- `docs/qa/module2-cover-correction/`
- `docs/qa/phase-3-screen-5-2/`
- `docs/qa/screen-1-3-correction/`
- `docs/qa/visual-fidelity-calibration/`
- `public/assets/certificates/templates/hrba-certificate-template.png`
- `public/assets/hrba/module2/`
- `public/assets/hrba/shared/icons/shared-key-takeaway.svg`
- `public/assets/hrba/shared/icons/shared-listen.svg`
- `public/assets/resources/module-3/`

Note: `docs/module-review/latest-active-version-registry.md` is a documentation artifact from the prior registry task. It should not be swept into a Module 3 implementation commit unless the user intentionally requests a documentation commit.

## Suggested Surgical Staging List If Approved Later

Only after Module 3 QA/stabilization passes:

- `src/components/course/Module3RevisedRenderer.tsx`
- `src/components/course/module3-revised.css`
- `src/data/module3/module3RevisedScreens.ts`
- this audit report, if the user wants the audit committed with the stabilization evidence

No staging is recommended yet.

## Recommended Next Action

Recommended next action: run full QA first, then stabilize specific issues before staging.

Minimum stabilization checklist:

1. Confirm all active routes from `/module-3` through `/module-3/screen-3-22` load.
2. Confirm screen counts and titles match expected latest active titles.
3. Search rendered pages for visible scaffold/placeholder language and decide whether it is acceptable.
4. Capture desktop and mobile screenshots for representative screens, especially `M3-R01`, `M3-R05`, `M3-R09`, `M3-R14`, `M3-R21`, and `M3-R22`.
5. Test keyboard completion for transformed interaction screens.
6. Test learner-input privacy warnings, validation, persistence, reset, and resume behavior.
7. Test `M3-R22` completion and Module 4 transition.
8. Only then stage surgically.

## Git Status After Audit

At the end of the audit, the worktree still contains the same unrelated dirty files plus this new audit report.

No files were staged.

No commit was created.

Nothing was pushed.
