# Module 1 Batch 2C Evidence Pack

## Scope Completed

Batch 2C implemented only the requested polish pass:

- Restored Module 1 cover as an external launch screen outside the player shell.
- Kept the approved Module 1 active player flow at 19 screens.
- Warmed the diagonal slide background system for M1-S02, M1-S03, and M1-S04 only.
- Added PNG-first icon rendering with SVG fallback support.
- Enhanced M1-S04 into a two-column learning journey with clickable steps and matching step images.

No Batch 3 work was started. M1-S05 through M1-S19 were not redesigned.

## Files Changed

Source and styling:

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/course/ScreenRenderer.tsx`
- `src/components/course/CourseItemCoverScreen.tsx`
- `src/components/course/Module1Renderer.tsx`
- `src/data/hrbaCourseModules.ts`
- `src/data/module1/module_1_refinement_assets.ts`
- `src/styles/global.css`

Assets:

- `public/assets/hrba/module-1/icons/png/`
- `public/assets/hrba/module-1/icons/svg/`
- `public/assets/hrba/module-1/journey/step_1.png`
- `public/assets/hrba/module-1/journey/step_2.png`
- `public/assets/hrba/module-1/journey/step_3.png`
- `public/assets/hrba/module-1/journey/step_4.png`
- `public/assets/hrba/module-1/journey/step_5.png`
- `public/assets/hrba/module-1/journey/step_6.png`

Evidence:

- `docs/refinement/evidence/module-1-batch-2c/evidence-pack.md`
- `docs/refinement/evidence/module-1-batch-2c/browser-check-results.json`
- `docs/refinement/evidence/module-1-batch-2c/course-page-module-1-cta.png`
- `docs/refinement/evidence/module-1-batch-2c/module-1-cover-launch-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/after-start-module-1-player-m1-s02.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s02-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s03-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/m1-s04-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2c/module-1-menu-open.png`

## Routing Behavior Summary

Verified routing:

1. Course page CTA `Start Module 1` routes to the external Module 1 launch screen.
2. The external launch screen is screen `M1-PLAYER-00` / approved M1-S01.
3. The external launch screen does not show the player sidebar, Learning Tools, Media Controls, player Menu, Glossary, Resources, Help Guide, Accessibility panel, or top player Prev/Next/Exit controls.
4. Launch CTA `Start Module 1` routes into the player shell at `M1-S1-02`, shown to the learner as Screen 2 of 19: `What You Will Be Able to Do`.

## Active 19-Screen Order Confirmation

The opened Module 1 menu shows the approved 19 active titles:

1. Introduction to HRBA for Local CSOs
2. What You Will Be Able to Do
3. Why This Module Matters
4. Your Learning Journey
5. Water Project Story
6. Investigate the HRBA Lens
7. So, What Is HRBA?
8. Everyday CSO Work
9. Who Might Be Invisible?
10. Rights Are Connected
11. From Beneficiaries to Rights-Holders
12. Who Has Responsibility?
13. Participation Is More Than Attendance
14. From Services to Rights, Power, and Accountability
15. Module 1 Knowledge Check
16. Self-Assessment
17. Priority and Action Commitment
18. Key Takeaways and Module 1 Completion Preview
19. Module 1 Completion Screen

Internal routing IDs remain as established in Batch 2:

| Approved screen | Internal ID |
| --- | --- |
| M1-S01 | `M1-PLAYER-00` |
| M1-S02 | `M1-S1-02` |
| M1-S03 | `M1-S1-01` |
| M1-S04 | `M1-S1-03` |

## No-Scroll Verification

Viewport: 1280 x 720.

| View | Result | Notes |
| --- | --- | --- |
| Module 1 external cover | Pass | Document height equals viewport height; CTA visible. |
| M1-S02 | Pass | Main and slide scroll heights equal client heights; Continue visible. |
| M1-S03 | Pass | Main and slide scroll heights equal client heights; Continue visible. |
| M1-S04 | Pass | Main and slide scroll heights equal client heights; Continue visible after exploring all six steps. |

## Icon Asset Strategy

The Module 1 refinement asset registry now supports both PNG and SVG per icon:

- Learner-facing UI prefers PNG paths.
- SVG paths remain registered as source/archive fallback assets.
- Card rendering uses PNG first and swaps to SVG if the PNG fails to load.
- Icons render at 38px with `object-fit: contain`.

## PNG Icons Used

M1-S02:

- `m1_s02_icon_explain_hrba_v1.png`
- `m1_s02_icon_rights_holder_v1.png`
- `m1_s02_icon_notice_exclusion_v1.png`
- `m1_s02_icon_ask_questions_v1.png`
- `m1_s02_icon_safe_reflection_v1.png`
- `m1_s02_icon_action_commitment_v1.png`

M1-S03:

- `m1_s03_icon_exclusion_v1.png`
- `m1_s03_icon_responsibility_v1.png`
- `m1_s03_icon_participation_v1.png`
- `m1_s03_icon_feedback_action_v1.png`

Additional provided PNGs were placed in the Module 1 PNG icon folder and registered where already relevant, but learner-facing changes in this batch were limited to M1-S02, M1-S03, and M1-S04.

## SVG Fallbacks Still Available

Matching SVG fallback files exist for the ten M1-S02 and M1-S03 learner-facing icons:

- `m1_s02_icon_explain_hrba_v1.svg`
- `m1_s02_icon_rights_holder_v1.svg`
- `m1_s02_icon_notice_exclusion_v1.svg`
- `m1_s02_icon_ask_questions_v1.svg`
- `m1_s02_icon_safe_reflection_v1.svg`
- `m1_s02_icon_action_commitment_v1.svg`
- `m1_s03_icon_exclusion_v1.svg`
- `m1_s03_icon_responsibility_v1.svg`
- `m1_s03_icon_participation_v1.svg`
- `m1_s03_icon_feedback_action_v1.svg`

## M1-S04 Image Usage Notes

M1-S04 now uses the uploaded journey images:

- `step_1.png`: CSO practitioners beginning an HRBA learning journey through community dialogue.
- `step_2.png`: CSO team reviewing community feedback and learning evidence.
- `step_3.png`: CSO team mapping local issues and participation barriers.
- `step_4.png`: CSO practitioners discussing a rights-based learning path.
- `step_5.png`: CSO team co-creating plans with local participants.
- `step_6.png`: Community dialogue with rights and accountability icons.

Clicking each journey step updates the fixed detail panel and the right-side image panel. The Continue button remains locked until all six steps are explored, matching the existing state pattern from Batch 2.

## Accessibility Notes

- M1-S04 journey controls are native buttons and keyboard accessible.
- Selected and explored states are communicated through text markers and ARIA state, not color alone.
- Meaningful icons and journey images include descriptive alt text.
- Focus styling continues to use the existing global focus-visible treatment.
- No autoplay motion was introduced.
- The image panel has a polished fallback state if a journey image fails to load; no broken image icon is exposed to learners.

## Build Result

`npm run build` completed successfully.

Observed existing warning:

- Vite reported that some chunks are larger than 500 kB after minification. This is an existing bundle-size warning and was not introduced as a functional error in this batch.

## Console Result

Automated browser console collection reported no new console errors or warnings:

- `consoleIssues: []`

## Browser Check Notes

The in-app browser bridge timed out while interacting with the local media-heavy app, so screenshots and measurements were captured through the installed Chrome DevTools Protocol fallback. Functional measurements and screenshots are stored in `browser-check-results.json`.

The course page is naturally taller than 720px; the Module 1 CTA screenshot was captured after scrolling the Module 1 card into view. The course page CTA click was verified and successfully opened the external Module 1 cover.

## Screenshots

- Course launch point: `course-page-module-1-cta.png`
- Module 1 external cover: `module-1-cover-launch-1280x720.png`
- After Start Module 1: `after-start-module-1-player-m1-s02.png`
- M1-S02: `m1-s02-1280x720.png`
- M1-S03: `m1-s03-1280x720.png`
- M1-S04: `m1-s04-1280x720.png`
- Module 1 menu: `module-1-menu-open.png`

## Unresolved Issues

- The Vite bundle-size warning remains and should be addressed separately if performance optimization becomes a priority.
- The in-app browser automation bridge timed out during this run, but the installed Chrome CDP fallback completed the verification successfully.

## Recommendation for Batch 3

Proceed to the next controlled screen group only after preserving the external cover routing and PNG/SVG asset strategy. Batch 3 should continue with the same 1280 x 720 no-scroll verification standard and avoid changes to unrelated modules.
