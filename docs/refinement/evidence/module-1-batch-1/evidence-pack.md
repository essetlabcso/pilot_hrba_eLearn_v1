# Module 1 Batch 1 Evidence Pack

Date: 2026-06-09

## Files Changed

- `docs/refinement/global-accessibility-and-safety-rules.md`
- `docs/refinement/global-screen-standard.md`
- `docs/refinement/module-1-asset-register.md`
- `docs/refinement/module-1-content-spec.md`
- `docs/refinement/module-1-design-spec.md`
- `docs/refinement/module-1-implementation-plan.md`
- `public/assets/hrba/module-1/icons/*.svg`
- `public/assets/hrba/shared/icons/m1_shared_hrba_lens_icon_v1.svg`
- `public/assets/hrba/module-1/images/m1_s05_water_point_scenario_v1.png`
- `src/data/module1/module_1_refinement_assets.ts`
- `docs/refinement/evidence/module-1-batch-1/module-1-cover.png`
- `docs/refinement/evidence/module-1-batch-1/module-1-menu-open.png`
- `docs/refinement/evidence/module-1-batch-1/module-1-svg-render-test.png`
- `docs/refinement/evidence/module-1-batch-1/evidence-pack.md`

## Placement

Refinement docs were placed in `docs/refinement/`.

Module 1 SVG icons were placed in `public/assets/hrba/module-1/icons/`.

The shared HRBA lens SVG was placed in `public/assets/hrba/shared/icons/`.

The Module 1 water-point scenario PNG was placed in `public/assets/hrba/module-1/images/`.

## Module 1 Implementation Files Discovered

- `src/App.tsx`: route/query state setup, module sequence selection.
- `src/data/hrbaCourseModules.ts`: module card/start-screen metadata.
- `src/data/module1/module_1_screen_sequence.json`: full Module 1 screen registry.
- `src/components/player/CoursePlayerShell.tsx`: active Module 1 screen filtering, player menu, navigation, tool modals.
- `src/components/player/PlayerSidebar.tsx`: learning tools/menu controls.
- `src/components/player/PlayerHeader.tsx`: prev/next/exit controls.
- `src/components/course/ScreenRenderer.tsx`: module dispatch.
- `src/components/course/Module1Renderer.tsx`: Module 1 screen rendering and interaction state wiring.
- `src/state/learningState.ts`: persisted Module 1 interaction state.

## Screen Count and Active Menu Titles

The full Module 1 Layer 2 player registry contains 46 screens. The current player shell filters Module 1 down to 19 active player screens. The content spec also defines 19 screens.

Current active menu titles:

1. `M1-PLAYER-00` - Introduction to HRBA for Local CSOs
2. `M1-S1-01` - Why this module matters
3. `M1-S1-02` - What you will be able to do
4. `M1-S1-03` - Your learning journey
5. `M1-S1-04` - Water project story
6. `M1-S1-05` - Investigate the HRBA lens
7. `M1-S1-06` - So, what is HRBA?
8. `M1-S1-06A` - Everyday CSO work
9. `M1-S1-06B` - Who might be invisible?
10. `M1-S1-07` - Rights are connected
11. `M1-S1-08` - From beneficiaries to rights-holders
12. `M1-S2-01` - Who has responsibility?
13. `M1-S2-02` - Participation is more than attendance
14. `M1-S2-03` - From services to rights, power, and accountability
15. `M1-S2-04` - Module 1 knowledge check
16. `M1-S2-05` - Self-Assessment
17. `M1-S3-01` - Priority and action commitment
18. `M1-S3-02` - Key takeaways and Module 1 completion
19. `M1-PLAYER-COMPLETE` - Module 1 Completion Screen

Note: the content spec places "What You Will Be Able to Do" before "Why This Module Matters"; the current active menu has those two screens reversed. The content spec also names screen 18 "Key Takeaways and Module 1 Completion Preview"; the active menu currently says "Key takeaways and Module 1 completion".

## Desktop Scroll/Layout Findings

Measured at `1280 x 720`, using the active Module 1 player scroll container. These screens require internal vertical scrolling:

- `M1-S1-01`
- `M1-S1-02`
- `M1-S1-03`
- `M1-S1-06A`
- `M1-S1-06B`
- `M1-S1-08`
- `M1-S2-01`
- `M1-S2-02`
- `M1-S2-03`
- `M1-S2-04`
- `M1-S2-05`
- `M1-S3-01`
- `M1-S3-02`

No document-level horizontal overflow was observed during this pass.

## Missing Assets

Missing or still-to-confirm assets from `module-1-asset-register.md`, excluding the already-implemented Module 1 cover hero image:

- `m1_s08_icon_water_v1.svg`
- `m1_s10_connected_rights_center_water_v1.svg`
- `m1_s10_connected_rights_node_health_v1.svg`
- `m1_s10_connected_rights_node_education_v1.svg`
- `m1_s10_connected_rights_node_dignity_v1.svg`
- `m1_s10_connected_rights_node_participation_v1.svg`
- `m1_s10_connected_rights_node_accountability_v1.svg`

Placeholder/import slots were added as `null` entries in `src/data/module1/module_1_refinement_assets.ts`.

## Broken or Placeholder Block Types

No active Module 1 screen is missing a renderer case. The full Layer 2 player registry also has renderer cases for all listed screen IDs in `Module1Renderer.tsx`.

The renderer still has a generic fallback that displays "Pending source content" for unknown screen IDs, but no current Module 1 registry screen resolves to it.

## Verification

- `npm run build` passes.
- Module 1 opens from the local app.
- Player menu opens and displays 19 screen titles.
- Prev, Next, and Exit controls are present on a non-cover Module 1 screen.
- Learning tools menu remains visible, including Menu, Glossary, Resources, Help Guide, and Accessibility.
- Browser console check returned no warnings or errors after Module 1 load.
- Public asset HTTP checks:
  - `/assets/hrba/module-1/icons/m1_s02_icon_action_commitment_v1.svg` -> 200
  - `/assets/hrba/shared/icons/m1_shared_hrba_lens_icon_v1.svg` -> 200
  - `/assets/hrba/module-1/images/m1_s05_water_point_scenario_v1.png` -> 200

## Screenshots

![Module 1 cover](D:/eLearn_CDP_Lg/docs/refinement/evidence/module-1-batch-1/module-1-cover.png)

![Module 1 menu open](D:/eLearn_CDP_Lg/docs/refinement/evidence/module-1-batch-1/module-1-menu-open.png)

![Module 1 SVG render test](D:/eLearn_CDP_Lg/docs/refinement/evidence/module-1-batch-1/module-1-svg-render-test.png)

## Batch 2 Recommendation

Start Batch 2 by aligning the active 19-screen Module 1 menu with `module-1-content-spec.md` before visual redesign work: specifically normalize the screen-title/order mapping, then address the desktop no-scroll issues in the screens listed above. Use `module_1_refinement_assets.ts` for wiring uploaded SVG/PNG assets, and keep the missing M1-S08 water icon and M1-S10 connected-rights nodes as explicit placeholders until approved assets are provided.
