# Batch 4 Design-System Readability: Content-Safe Surfaces

Date: 2026-06-16

## Implementation Summary

Batch 4 representative sample implemented a reusable content-safe surface rule for learner-facing text that appears near diagonal, gradient, image-backed, or mixed-color backgrounds.

Issue trace: RPL-006, DS-001, DS-002, DS-017.

No routing, progress, completion, assessment, certificate, LMS/LRS/storage, accessibility-toolbar behavior, media/assets, Module 1 visual story implementation, or platform hero implementation was changed.

## Reusable Rules Added

- `.cso-content-safe-surface`
- `.cso-content-safe-surface--inverse`
- `.cso-content-safe-header`
- `.cso-readable-label-chip`
- `.cso-safe-overlay-card`

Token additions:

- `--cso-color-surface-content-safe`
- `--cso-color-surface-content-safe-inverse`
- `--cso-color-surface-readable-label`
- `--cso-border-color-content-safe`
- `--cso-shadow-content-safe`

Token parity was added in `src/system/tokens/tokens.ts`.

## Files Changed

- `src/system/tokens/tokens.css`
- `src/system/tokens/tokens.ts`
- `src/components/design-system/design-system.css`
- `src/styles/global.css`
- `src/components/course/CourseItemCoverScreen.tsx`
- `src/components/course/Module2Renderer.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `docs/qa/batch-4-design-system-readability-content-safe-surfaces.md`
- `docs/qa/batch-4-content-safe-surface-inventory.md`
- `docs/qa/batch-4-design-system-readability-content-safe-surfaces/screenshots/`

## Representative Sample Evidence

| Screen | File changed | Surface risk | Rule applied | Evidence |
|---|---|---|---|---|
| M2-S01 cover/header | `CourseItemCoverScreen.tsx`, `Module2Renderer.tsx` | Cover text sits beside diagonal/image-backed cover treatment. | `cso-content-safe-header`, inverse safe surface. | `screenshots/m2-s01-desktop.png`, `screenshots/m2-s01-tablet.png`, `screenshots/m2-s01-mobile.png` |
| M4-S1-02 objective/header | `Module4Renderer.tsx` | Objective orientation sits inside mixed decorative shell. | `cso-content-safe-header`. | `screenshots/m4-s1-02-desktop.png`, `screenshots/m4-s1-02-tablet.png`, `screenshots/m4-s1-02-mobile.png` |
| M2-S18 hotspot/diagram | `Module2AccountabilityPowerScreens.tsx` | Hotspot labels sit over image-backed diagram. | `cso-readable-label-chip`, `cso-content-safe-header`, `cso-content-safe-surface`. | `screenshots/m2-s18-desktop.png`, `screenshots/m2-s18-tablet.png`, `screenshots/m2-s18-mobile.png` |
| M5-S1-23 resource/visual card | `Module5Renderer.tsx` | Visual-card text labels sit over image/gradient surface. | `cso-readable-label-chip`, `cso-content-safe-header`. | `screenshots/m5-s1-23-desktop.png`, `screenshots/m5-s1-23-tablet.png`, `screenshots/m5-s1-23-mobile.png` |
| M4-S1-12 summary/transition | `Module4Renderer.tsx` | Summary copy sits in decorative summary shell. | `cso-content-safe-header`. | `screenshots/m4-s1-12-desktop.png`, `screenshots/m4-s1-12-tablet.png`, `screenshots/m4-s1-12-mobile.png` |
| M3-S1-07 studio/status visual card | `Module3Renderer.tsx` | Studio status labels sit over image-backed visual card. | `cso-content-safe-header`, `cso-readable-label-chip`. | `screenshots/m3-s1-07-desktop.png`, `screenshots/m3-s1-07-tablet.png`, `screenshots/m3-s1-07-mobile.png` |

## Enlarged Text Evidence

Captured browser zoom evidence for the mobile objective/header sample:

- `screenshots/m4-s1-02-mobile-browser-zoom.png`

Observation: readable safe surface remains present. Existing fixed-player/mobile density can still create cramped labels in compact visual motifs; this is documented as a Batch 5 mobile/layout dependency, not a Batch 4 content-safe surface blocker.

## High-Contrast Status

High-contrast evidence was attempted through the current accessibility UI.

Result: the accessibility panel opens, but no high-contrast control was found, and browser `prefers-contrast: more` reported false. Batch 4 did not change accessibility-toolbar behavior.

Status: high-contrast mode evidence is a Batch 5 dependency.

## Readability Notes

- Approved sample text now has a named content-safe class contract.
- Image-backed M2/M3/M5 labels use stable readable chip/card surfaces.
- M2-S01 cover/header text remains on a stable inverse panel beside the image surface.
- M4-S1-02 and M4-S1-12 now explicitly identify their copy panels as content-safe header surfaces.
- M4 mobile and M2 hotspot density remain constrained by existing fixed player/custom layout behavior; defer technical layout refinement to Batch 5 if desired.

## Command Results

- `npm run build`: passed.
- `npx tsc -b --pretty false`: passed.
- `npm run lint`: passed with 5 pre-existing warnings in untouched files:
  - `src/components/course/Module1Renderer.tsx`
  - `src/components/player/CoursePlayerShell.tsx`

## Protected Boundary Confirmation

Confirmed changed source files are limited to approved Batch 4 design-system/readability files and minimal approved renderer/component class adoption.

No protected behavior files changed.

## Deferred Risks

- Batch 5: high-contrast mode verification/accessibility toolbar behavior.
- Batch 5: fixed-player/mobile density and focus-flow/layout refinements.
- Batch 6: media/asset replacement or richer visual alternatives.
- Batch 7: final assessment/certificate surfaces.
- Batch 8: readiness/progress/storage proof.

## Recommendation

Ready for human review.
