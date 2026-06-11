# Module 1 Batch 2A/2B Evidence Pack

Date: 2026-06-09

## Scope Completed

Implemented only Batch 2A/2B:

- Aligned the active Module 1 player flow to the approved 19-screen order.
- Kept the full 46-screen registry in place.
- Updated only M1-S01 through M1-S04 learner-facing screen implementations.
- Added a shared no-scroll desktop foundation scoped to M1-S01 through M1-S04.
- Left M1-S05 through M1-S19 content and layouts unchanged except for shared navigation/order compatibility.

## Files Changed

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/course/ScreenRenderer.tsx`
- `src/components/course/Module1Renderer.tsx`
- `src/data/module1/module_1_screen_sequence.json`
- `src/styles/global.css`
- `docs/refinement/evidence/module-1-batch-2/evidence-pack.md`
- `docs/refinement/evidence/module-1-batch-2/browser-check-results.json`
- `docs/refinement/evidence/module-1-batch-2/m1-s01-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2/m1-s02-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2/m1-s03-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2/m1-s04-1280x720.png`
- `docs/refinement/evidence/module-1-batch-2/module-1-menu-open.png`

## Active 19-Screen Order After Changes

1. M1-S01 - Introduction to HRBA for Local CSOs
2. M1-S02 - What You Will Be Able to Do
3. M1-S03 - Why This Module Matters
4. M1-S04 - Your Learning Journey
5. M1-S05 - Water Project Story
6. M1-S06 - Investigate the HRBA Lens
7. M1-S07 - So, What Is HRBA?
8. M1-S08 - Everyday CSO Work
9. M1-S09 - Who Might Be Invisible?
10. M1-S10 - Rights Are Connected
11. M1-S11 - From Beneficiaries to Rights-Holders
12. M1-S12 - Who Has Responsibility?
13. M1-S13 - Participation Is More Than Attendance
14. M1-S14 - From Services to Rights, Power, and Accountability
15. M1-S15 - Module 1 Knowledge Check
16. M1-S16 - Self-Assessment
17. M1-S17 - Priority and Action Commitment
18. M1-S18 - Key Takeaways and Module 1 Completion Preview
19. M1-S19 - Module 1 Completion Screen

## Internal ID to Approved Screen Mapping

| Approved ID | Internal ID | Approved title |
|---|---|---|
| M1-S01 | `M1-PLAYER-00` | Introduction to HRBA for Local CSOs |
| M1-S02 | `M1-S1-02` | What You Will Be Able to Do |
| M1-S03 | `M1-S1-01` | Why This Module Matters |
| M1-S04 | `M1-S1-03` | Your Learning Journey |
| M1-S05 | `M1-S1-04` | Water Project Story |
| M1-S06 | `M1-S1-05` | Investigate the HRBA Lens |
| M1-S07 | `M1-S1-06` | So, What Is HRBA? |
| M1-S08 | `M1-S1-06A` | Everyday CSO Work |
| M1-S09 | `M1-S1-06B` | Who Might Be Invisible? |
| M1-S10 | `M1-S1-07` | Rights Are Connected |
| M1-S11 | `M1-S1-08` | From Beneficiaries to Rights-Holders |
| M1-S12 | `M1-S2-01` | Who Has Responsibility? |
| M1-S13 | `M1-S2-02` | Participation Is More Than Attendance |
| M1-S14 | `M1-S2-03` | From Services to Rights, Power, and Accountability |
| M1-S15 | `M1-S2-04` | Module 1 Knowledge Check |
| M1-S16 | `M1-S2-05` | Self-Assessment |
| M1-S17 | `M1-S3-01` | Priority and Action Commitment |
| M1-S18 | `M1-S3-02` | Key Takeaways and Module 1 Completion Preview |
| M1-S19 | `M1-PLAYER-COMPLETE` | Module 1 Completion Screen |

## Layout Approach

- `M1-PLAYER-00` now renders through `Module1Renderer` inside the player shell, so header, sidebar tools, progress, and navigation remain visible.
- The active Module 1 flow is now ordered explicitly in `CoursePlayerShell.tsx` instead of relying on the source JSON order.
- M1-S01 uses a compact split opening canvas with the existing Module 1 hero image on the right.
- M1-S02 uses a 2-row, 3-column outcome card grid with the registered six icons.
- M1-S03 uses static premium value cards. Reveal cards were not added in this batch to avoid extra state complexity; the prompt allowed static cards when reveal behavior was risky.
- M1-S04 uses the existing Module 1 journey state with a six-step clickable roadmap and a fixed reveal panel. Continue unlocks after all six steps are explored.
- Batch 2 styles are scoped with `.m1-b2-*` classes.

## No-Scroll Verification at 1280x720

| Screen | Internal ID | Vertical scroll | CTA visible | Header visible | Sidebar tools visible |
|---|---|---:|---:|---:|---:|
| M1-S01 | `M1-PLAYER-00` | No | Yes | Yes | Yes |
| M1-S02 | `M1-S1-02` | No | Yes | Yes | Yes |
| M1-S03 | `M1-S1-01` | No | Yes | Yes | Yes |
| M1-S04 | `M1-S1-03` | No | Yes | Yes | Yes |

Measured values are stored in `browser-check-results.json`. For each screen, `mainScrollHeight` equals `mainClientHeight`, `slideScrollHeight` equals `slideClientHeight`, and document height equals viewport height.

## Interaction Behavior

- M1-S03: static value cards; no reveal state added in Batch 2.
- M1-S04: six step buttons are keyboard-accessible. Each step updates the fixed detail panel and marks explored state. Continue becomes enabled after all six steps are explored. The player Next button follows the same six-step completion threshold.

## Accessibility Notes

- Buttons remain native `button` elements and are keyboard-accessible.
- M1-S04 uses `aria-current="step"` on the active roadmap step and labels explored/not explored state.
- Meaningful images/icons include alt text.
- Focus-visible states are defined for primary buttons and roadmap step buttons.
- Reduced-motion preference is respected for Batch 2 transitions.
- No learner-facing development terms were added to M1-S01 through M1-S04.

## Asset Usage Notes

- M1-S01 uses `/assets/hrba/modules/module-1.png` with `object-fit: cover`.
- M1-S02 uses all six registered `module1RefinementAssets.m1S02` icons. All loaded successfully.
- M1-S03 uses all four registered `module1RefinementAssets.m1S03` icons. All loaded successfully.
- M1-S04 uses code-rendered step numbers/checkmarks; no new visual assets were invented.
- Missing M1-S08 and M1-S10 assets were not touched.

## Build Result

`npm run build` passed after implementation and after the final visual contrast adjustment.

The only build note was the existing Vite chunk-size warning for large bundles/assets. No TypeScript or Vite build errors occurred.

## Console Result

The 1280x720 verification run recorded no console errors or warnings in `browser-check-results.json`.

## Screenshot Evidence

- `m1-s01-1280x720.png`
- `m1-s02-1280x720.png`
- `m1-s03-1280x720.png`
- `m1-s04-1280x720.png`
- `module-1-menu-open.png`

The in-app Browser was attempted first, but its screenshot command timed out. Final screenshots and measurements were captured locally with installed Chrome through the Chrome DevTools Protocol.

## Unresolved Issues

- No Batch 2 functional issues remain.
- The existing bundle-size warning remains outside this batch scope.

## Recommendation for Batch 3

Proceed to the next controlled set of Module 1 screens, starting with M1-S05 onward, using the same no-scroll desktop measurement table and screenshot evidence pattern. Keep missing assets explicit and avoid expanding the active Module 1 flow beyond 19 screens.
