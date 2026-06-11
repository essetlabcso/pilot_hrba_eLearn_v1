# Module 1 Repair Batch 1 Evidence Pack

## Strict Scope Confirmation

This repair batch only redesigns the active Module 1 screens S11-S14:

- M1-S11 / internal ID `M1-S1-08` — From Beneficiaries to Rights-Holders
- M1-S12 / internal ID `M1-S2-01` — Who Has Responsibility?
- M1-S13 / internal ID `M1-S2-02` — Participation Is More Than Attendance
- M1-S14 / internal ID `M1-S2-03` — From Services to Rights, Power, and Accountability

No Module 1 cover routing, course page routing, Module 2 files, active 19-screen order, or M1-S01-S10 / M1-S15-S19 screen implementations were intentionally redesigned.

## Files Changed

- `src/components/course/Module1Renderer.tsx`
- `src/components/player/CoursePlayerShell.tsx`
- `src/styles/global.css`

## Screen-by-Screen Redesign Summary

| Screen | Repair Summary | Interaction Model |
| --- | --- | --- |
| M1-S11 | Rebuilt as a premium comparison lens screen with visual support and a focused decision question. | Two flip/reveal lens cards, then one correct-answer decision question. |
| M1-S12 | Rebuilt as actor-category explorer plus paged matching. The completed state now becomes a synthesis panel instead of a crowded matching grid. | Three actor category tabs, then two examples per matching page. |
| M1-S13 | Repaired participation ladder behavior so levels are not auto-completed. The decision scenario unlocks only after all five levels are explored. | Horizontal participation stepper plus scenario choice. |
| M1-S14 | Rebuilt the shift pathway as a visible icon-node learning object and changed the completed transformation into a clean synthesis panel. | Five clickable shift nodes plus transformation activity. |

## Gating and Completion Rules

| Screen | Completion Rule | Top Next Guard |
| --- | --- | --- |
| M1-S11 | Both lens cards reviewed and answer C selected. | Matches in-screen Continue. |
| M1-S12 | Three actor categories explored and all six matches correct. | Matches in-screen Continue. |
| M1-S13 | Five participation levels explored and scenario answer C selected. | Matches in-screen Continue. |
| M1-S14 | Five shift nodes explored and transformation answer B selected. | Matches in-screen Continue. |

## No-Scroll Verification at 1280x720

Automated browser checks were run at a 1280x720 viewport. Results are saved in `browser-check-results.json`.

| Evidence State | Body Scroll | Main Scroll | Slide Scroll | Broken Images |
| --- | --- | --- | --- | --- |
| S11 base | No | No | No | 0 |
| S11 completed | No | No | No | 0 |
| S12 category | No | No | No | 0 |
| S12 matching page | No | No | No | 0 |
| S12 completed | No | No | No | 0 |
| S13 base | No | No | No | 0 |
| S13 completed | No | No | No | 0 |
| S14 base | No | No | No | 0 |
| S14 completed | No | No | No | 0 |

## Asset Usage Notes

- S11 uses the existing rights-holder shift PNG visual.
- S12 uses the existing responsibility map PNG visual.
- S13 uses the existing participation ladder PNG visual.
- S14 uses the existing HRBA shift pathway PNG plus the five shift-node PNG icons.
- No missing or broken images were detected in the verification run.

## Accessibility Notes

- Interactive cards and options are native buttons.
- Selected and completed states include text/icon indicators and do not rely only on color.
- Meaningful visuals have learner-facing alt text where they are content-bearing.
- Focus-visible styles are defined for the new repair controls.
- No autoplay motion was added; flip-card animation respects reduced-motion preference.

## Build Result

`npm run build` passed.

Known build warnings remain the existing Vite asset/chunk-size warnings. No TypeScript errors were introduced.

## Console Result

The repair browser check recorded no console errors.

## Evidence Files

- `browser-check-results.json`
- `s11-base-state.png`
- `s11-completed-state.png`
- `s12-base-category-state.png`
- `s12-matching-page-state.png`
- `s12-completed-state.png`
- `s13-base-state.png`
- `s13-completed-state.png`
- `s14-base-state-visible-shift-pathway.png`
- `s14-completed-transformation-state.png`
- `module-1-menu-s11-s14-19-screen-order.png`

## Unresolved Issues

- None blocking for this repair batch.
- The S11 and S14 screens still use the established diagonal visual system, which places dark/navy and warm-light regions across the slide. This is intentional and consistent with the previous Module 1 premium style.
