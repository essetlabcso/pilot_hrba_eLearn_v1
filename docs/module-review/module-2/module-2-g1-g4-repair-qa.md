# Module 2 G1-G4 Targeted Repair QA Evidence

Date: 2026-06-17  
Branch: `system/hrba-clean-foundation`  
Status: Ready for human review. Do not stage, commit, or push from this evidence package.

## Scope Completed

This repair followed `module-2-g1-g4-qa-evaluation.md` and `module-2-g1-g4-implementation-plan.md` as the control documents. It stayed within active Module 2 course-layer files, a contained Module 2 stylesheet, and Module 2 review evidence.

Implemented and verified changes:

- `M2-S01` cover CTA reaches `M2-S01A` before objectives.
- `M2-S03` and `M2-S04` use readable white content surfaces on mobile and desktop where text previously sat over mixed dark/tinted background.
- `M2-S04` now counts only its six active hotspot keys when enabling `Continue to characteristics`; legacy/shared hotspot keys no longer create impossible counts such as `10 of 6 viewed`.
- `M2-S07`, `M2-S08`, `M2-S09`, `M2-S15`, and `M2-S20` tablist interactions support Arrow keys, Home, End, Enter, Space, Tab, and click.
- `M2-S21` portfolio fields have safer accessible labels and generalized, non-identifying input guidance.
- `M2-S21` `Save to My Portfolio and Continue` now saves and advances to `M2-S22` in one click.

No story assets, visual assets, PDFs, PPTs, downloads, resource links, resource UI, media files, or final videos were imported, renamed, optimized, compressed, converted, linked, or created.

## Full Screen-by-Screen Smoke Test

Fresh-server evidence was run against `http://127.0.0.1:5174` to avoid stale Vite state from the already-open `5173` browser tab. Each active Module 2 screen was launched with `completed=module_01_hrba_foundations`, completed through its required interaction, and advanced with its screen CTA.

| Screen | Visual/readability status | Activity completed | Continue/Next enabled | Route/transition result | Issue fixed or remaining | Screenshot evidence |
|---|---|---:|---:|---|---|---|
| `M2-S01` | Pass | Yes | Yes | `M2-S01A` | Start path confirmed | `screenshots/module-2-smoke-final-desktop-m2-s01.png`; `screenshots/module-2-smoke-final-mobile-m2-s01.png` |
| `M2-S01A` | Pass | Yes | Yes | `M2-S02` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s01a.png`; `screenshots/module-2-smoke-final-mobile-m2-s01a.png` |
| `M2-S02` | Pass | Yes, 6 cards | Yes | `M2-S03` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s02.png`; `screenshots/module-2-smoke-final-mobile-m2-s02.png` |
| `M2-S03` | Pass after readability fix | Yes, 6 cards | Yes | `M2-S04` | Text-background contrast fixed | `screenshots/module-2-smoke-final-desktop-m2-s03.png`; `screenshots/module-2-smoke-final-mobile-m2-s03.png` |
| `M2-S04` | Pass after readability and completion fix | Yes, 6 hotspots | Yes | `M2-S05` | Hotspot count/CTA blocker fixed | `screenshots/module-2-smoke-final-desktop-m2-s04.png`; `screenshots/module-2-smoke-final-mobile-m2-s04.png` |
| `M2-S05` | Pass | Yes, 4 cards | Yes | `M2-S06` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s05.png`; `screenshots/module-2-smoke-final-mobile-m2-s05.png` |
| `M2-S06` | Pass | Yes, 6 matches | Yes | `M2-S07` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s06.png`; `screenshots/module-2-smoke-final-mobile-m2-s06.png` |
| `M2-S07` | Pass | Yes, 5 tabs | Yes | `M2-S08` | Keyboard support retained | `screenshots/module-2-smoke-final-desktop-m2-s07.png`; `screenshots/module-2-smoke-final-mobile-m2-s07.png` |
| `M2-S08` | Pass | Yes, 6 tabs | Yes | `M2-S09` | Keyboard support retained | `screenshots/module-2-smoke-final-desktop-m2-s08.png`; `screenshots/module-2-smoke-final-mobile-m2-s08.png` |
| `M2-S09` | Pass | Yes, 4 tabs plus choice | Yes | `M2-S10` | Keyboard support retained | `screenshots/module-2-smoke-final-desktop-m2-s09.png`; `screenshots/module-2-smoke-final-mobile-m2-s09.png` |
| `M2-S10` | Pass | Yes, tabs plus choice | Yes | `M2-S11` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s10.png`; `screenshots/module-2-smoke-final-mobile-m2-s10.png` |
| `M2-S11` | Pass | Yes, tabs plus choice | Yes | `M2-S12` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s11.png`; `screenshots/module-2-smoke-final-mobile-m2-s11.png` |
| `M2-S12` | Pass | Yes, tabs plus choice | Yes | `M2-S13` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s12.png`; `screenshots/module-2-smoke-final-mobile-m2-s12.png` |
| `M2-S13` | Pass | Yes, tabs plus choice | Yes | `M2-S14` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s13.png`; `screenshots/module-2-smoke-final-mobile-m2-s13.png` |
| `M2-S14` | Pass | Yes, tabs plus choice | Yes | `M2-S15` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s14.png`; `screenshots/module-2-smoke-final-mobile-m2-s14.png` |
| `M2-S15` | Pass | Yes, 4 examples rated | Yes | `M2-S16` | Completion confirmed | `screenshots/module-2-smoke-final-desktop-m2-s15.png`; `screenshots/module-2-smoke-final-mobile-m2-s15.png` |
| `M2-S16` | Pass | Yes, 4 loop steps plus repairs | Yes | `M2-S17` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s16.png`; `screenshots/module-2-smoke-final-mobile-m2-s16.png` |
| `M2-S17` | Pass | Yes, 4 cases plus break/fix choices | Yes | `M2-S18` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s17.png`; `screenshots/module-2-smoke-final-mobile-m2-s17.png` |
| `M2-S18` | Pass | Yes, 6 hotspot text alternatives | Yes | `M2-S19` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s18.png`; `screenshots/module-2-smoke-final-mobile-m2-s18.png` |
| `M2-S19` | Pass | Yes, 5 pathway choices | Yes | `M2-S20` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s19.png`; `screenshots/module-2-smoke-final-mobile-m2-s19.png` |
| `M2-S20` | Pass | Yes, 7 lenses | Yes | `M2-S21` | Keyboard support retained | `screenshots/module-2-smoke-final-desktop-m2-s20.png`; `screenshots/module-2-smoke-final-mobile-m2-s20.png` |
| `M2-S21` | Pass | Yes, habit selected and safe text entered | Yes | `M2-S22` | One-click save/continue fixed | `screenshots/module-2-smoke-final-desktop-m2-s21.png`; `screenshots/module-2-smoke-final-mobile-m2-s21.png` |
| `M2-S22` | Pass | Yes, 6 questions and summary | Yes | `M2-S23` | No issue | `screenshots/module-2-smoke-final-desktop-m2-s22.png`; `screenshots/module-2-smoke-final-mobile-m2-s22.png` |
| `M2-S23` | Pass | Yes | Yes | Module 3 | Completion transition confirmed | `screenshots/module-2-smoke-final-desktop-m2-s23.png`; `screenshots/module-2-smoke-final-mobile-m2-s23.png` |

Contact sheets:

- `screenshots/module-2-smoke-final-desktop-contact-sheet.png`
- `screenshots/module-2-smoke-final-mobile-contact-sheet.png`

## Visual and Mobile Readability Evidence

Visual review was performed from the refreshed desktop and mobile contact sheets plus individual high-risk screenshots for `M2-S03`, `M2-S04`, `M2-S06`, `M2-S15`, `M2-S17`, `M2-S18`, `M2-S21`, and `M2-S22`.

Findings:

- `M2-S03` and `M2-S04` mobile text no longer sits directly on the diagonal stage background.
- `M2-S04` starts at `0 of 6 viewed` on the fresh build and no longer displays impossible progress counts.
- `M2-S06`, `M2-S15`, `M2-S17`, `M2-S18`, `M2-S21`, and `M2-S22` remain visually readable in the refreshed evidence.
- Mobile screenshots show the existing player shell and media-control area consuming the top of the viewport before course content. This is a known protected shell/mobile layout concern and was not changed in this Module 2 course-layer repair.

## Route, Progress, Completion, and Transition Evidence

- `M2-S01` cover CTA advanced to `M2-S01A`.
- `M2-S01A` advanced to `M2-S02`.
- Every active screen from `M2-S02` through `M2-S22` completed and advanced to the expected next Module 2 screen.
- `M2-S23` `Start Module 3` advanced to Module 3.
- `M2-S21` saved the portfolio object through existing learning state and advanced to `M2-S22` with one click.

No storage, LMS/LRS, progress architecture, completion architecture, or routing architecture was changed.

## Keyboard and Focus Evidence

Contained fixes were retained for the tablist interaction family:

- `M2-S07` principles tabs.
- `M2-S08` rights-holder map tabs.
- `M2-S09` intersectionality case tabs.
- `M2-S15` participation example tabs.
- `M2-S20` project manager inbox tabs.

Expected behavior after repair:

- Tab reaches the controls.
- Enter and Space activate focused controls.
- Arrow Left, Arrow Right, Arrow Up, Arrow Down, Home, and End move among tab controls.
- No keyboard trap was observed in the interaction smoke.

## DOM Alt and Text-Alternative Audit

Active Module 2 visual/hotspot screens retain text alternatives or accessible labels:

- `M2-S01` cover image has alt text.
- `M2-S01A` intro poster has `role="img"` and poster alt text.
- `M2-S04` hotspot image has alt text, numbered hotspot labels, and a keyboard text list.
- `M2-S08` actor map image has alt text.
- `M2-S13` compact reveal visual uses configured image alt text.
- `M2-S18` hotspot map has an aria label, individual hotspot labels, screen-reader text, and a keyboard text list.
- `M2-S21` textareas have explicit aria labels.
- `M2-S22` knowledge check controls have labels and screen-reader feedback text.

No new alt-text blocker was found in the active Module 2 repair scope.

## M2-S21 Privacy and Storage Observation

`M2-S21` visibly warns learners not to enter names, locations, organizations, cases, or sensitive details. This repair strengthened the summary and field labels to reinforce generalized, non-identifying learning text.

Storage observation:

- `M2-S21` saves through `practiceCheckState.module2_screen222_portfolio_checkpoint_lens` and `practiceCheckState.my_portfolio.module2`.
- The component does not write directly to `localStorage`.
- Global persistence remains handled by the existing learning-state storage layer in `src/state/learningState.ts`.
- No storage, LMS/LRS, analytics, or persistence architecture was changed.

## Command Results

`npm run build`: passed.

Notes:

- Vite emitted existing large asset/chunk warnings.
- No build errors occurred.

`npx tsc -b --pretty false`: passed.

`npm run lint`: passed with warnings only.

Warnings were in already dirty files outside this Module 2 repair:

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`

No lint errors were reported.

## Changed Files for This Module 2 Repair

Source files changed in the Module 2 repair scope:

- `src/components/course/Module2Renderer.tsx`
- `src/components/course/Module2CompactRevealScreen.tsx`
- `src/components/course/Module2WorkingPrinciples.tsx`
- `src/components/course/Module2RightsHoldersMap.tsx`
- `src/components/course/Module2IntersectionalityCase.tsx`
- `src/components/course/Module2ParticipationPractice.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module2RightsDimensionsHotspot.tsx`
- `src/styles/module2-qa-upgrades.css`

Evidence files added or refreshed:

- `docs/module-review/module-2/module-2-g1-g4-repair-qa.md`
- `docs/module-review/module-2/screenshots/`

Pre-existing dirty files from prior Module 1/player work remain in the working tree and are not part of this Module 2 repair:

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/data/module1/module_1_screen_sequence.json`
- `src/styles/global.css`
- `src/styles/module1-ux-polish.css`
- `docs/module-review/module-1/`

## Protected Boundary Confirmation

This Module 2 repair did not change:

- routing architecture
- progress/completion architecture
- LMS/LRS/storage architecture
- assessment or certificate logic
- player shell behavior
- accessibility toolbar behavior
- global CSS or design tokens
- media/assets
- resource-pack UI or downloadable resources
- unrelated Module 1 source files

The working tree still contains pre-existing dirty protected/shared files from earlier work. They remain excluded from this Module 2 repair package.

## Remaining Risks and Human Review Questions

1. Mobile shell/sidebar viewport use remains a protected shell/mobile follow-up, not a Module 2 course-layer blocker.
2. High contrast, text-size, and reduce-motion modes should be spot-checked manually if human review wants toolbar evidence; no toolbar behavior was changed here.
3. Human reviewer should confirm the `M2-S21` portfolio copy feels sufficiently specific without inviting identifiable details.

## Recommendation

Ready for human review. The residual visual/readability issues and interaction blockers found in this pass are fixed in contained Module 2 files, the full Module 2 smoke test now passes from `M2-S01` through `M2-S23`, and build/TypeScript/lint passed.
