# CSO Learning Hub Token Adoption Audit

## Status

Draft v0.1 - Documentation-only audit before token migration

## Purpose

This audit identifies where the CSO Learning Hub foundation tokens should be adopted first without changing any current visual implementation. It documents current style entry points, hard-coded visual value patterns, risky areas, and a recommended first migration slice.

This document does not apply tokens, refactor CSS, change components, edit screens, or alter course behavior.

## Current Style Entry Points

The current app style entry point is `src/main.tsx`.

Current imports:

- `src/system/tokens/tokens.css`
- `src/styles/global.css`

The token CSS variables are imported before the existing global stylesheet:

```ts
import './system/tokens/tokens.css';
import './styles/global.css';
```

This makes `--cso-*` variables available globally, but the existing app styles still mostly use legacy variables, hard-coded values, inline styles, and module-specific CSS.

Additional module-specific style imports are present:

- `src/components/course/Module1Renderer.tsx` imports `src/styles/module1-visual-supports.css`
- `src/components/course/Module1Renderer.tsx` imports `src/styles/module1-ux-polish.css`
- `src/components/course/Module2Renderer.tsx` imports `src/styles/module2-qa-upgrades.css`

## Current Styling Structure

### Global CSS

- `src/styles/global.css` is the dominant visual stylesheet.
- It is very large and contains platform, player, course, module, screen, and patch-level styles.
- It defines legacy custom properties such as `--color-primary`, `--player-shell-bg`, `--button-primary-bg`, `--feedback-success-bg`, and many module-specific variables.
- It also contains many hard-coded colors, gradients, shadows, radius values, and screen-specific selectors.

### Module Patch CSS

- `src/styles/module1-ux-polish.css`
- `src/styles/module1-visual-supports.css`
- `src/styles/module2-qa-upgrades.css`

These should not be migrated or refactored first. They are old pilot styling layers and should remain legacy reference until a screen/template migration plan exists.

### Token CSS

- `src/system/tokens/tokens.css` is imported and currently defines only `:root` CSS variables.
- It does not contain component selectors, resets, or applied styles.
- It is available for future migration but has not yet been applied to existing components.

## Key Files Controlling Visual UI

### Platform Shell and Course Catalogue

- `src/components/platform/PlatformShell.tsx`
- `src/components/platform/CourseRoadmap.tsx`
- `src/components/platform/ModuleLaunchCard.tsx`
- `src/styles/global.css` sections for `.platform-header`, `.platform-course-hero`, `.course-progress-panel`, `.course-roadmap`, and `.module-launch-card`

These files control the catalogue shell, course hero, progress prompt, module cards, CTA states, and roadmap layout.

### Player Shell and Navigation

- `src/components/player/CoursePlayerShell.tsx`
- `src/components/player/PlayerHeader.tsx`
- `src/components/player/PlayerSidebar.tsx`
- `src/components/player/ProgressStrip.tsx`
- `src/components/player/MainScreenCanvas.tsx`
- `src/styles/global.css` sections for `.player-container`, `.player-header`, `.player-sidebar-aside`, `.player-main-content`, and related player layout classes

These files control the course player frame, header, sidebar, progress strip, main content frame, modal toggles, and transcript panel.

### Modal and Accessibility UI

- `src/components/player/AccessibilityModal.tsx`
- `src/components/player/GlossaryModal.tsx`
- `src/components/player/ResourcesModal.tsx`
- `src/components/player/HelpOverlay.tsx`
- `src/components/player/CoursePlayerShell.tsx`

These files include many inline visual values for dark modal surfaces, overlays, text colors, spacing, keyboard hints, and shadows. They should be treated carefully because they overlap with accessibility behavior.

### Course and Screen Renderers

- `src/components/course/Module1Renderer.tsx`
- `src/components/course/Module2Renderer.tsx`
- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- related Module 2 subcomponents

These are old pilot renderer surfaces. They contain extensive screen-level visual logic and should not be the first token migration target.

## Major Hard-Coded Visual Value Categories Found

The audit found these visual value categories across current styles/components:

- hard-coded hex colors in global CSS and inline component styles;
- legacy CSS variables separate from the new `--cso-*` token variables;
- rgba overlays and modal scrims;
- linear and radial gradients;
- box-shadow values;
- border radius values;
- borders and separators;
- spacing values in CSS and inline styles;
- font-size, font-family, font-weight, and line-height values;
- inline React style objects in platform, player, modal, and course components;
- module-specific palettes such as Module 5 local variables;
- screen-specific selectors using `:has(...)` and module/screen class names;
- icon-like text controls and mixed visual affordances in player tools and module cards.

The highest-risk patterns are hard-coded values in large renderer files, module patch CSS, and modal/player inline styles that combine visual styling with behavior.

## Areas That Should Not Be Touched Yet

Do not migrate tokens into these areas in the first implementation slice:

- course screen renderers;
- Module 1, Module 2, Module 3, Module 4, or Module 5 screen styles;
- module-specific patch CSS files;
- final assessment screens or scoring behavior;
- progress, locking, completion, or routing logic;
- certificate behavior;
- accessibility toolbar behavior;
- old HRBA asset usage;
- story visual placement or migration;
- local CSS patches created only to make one screen look better.

These areas should wait until templates, blocks, and vertical-slice scope are confirmed.

## Safest First Token Migration Target

The safest first token migration target is the player shell/base layout visual layer, not course screens.

Recommended first slice:

- `src/styles/global.css` rules for the player shell foundation only;
- specifically the legacy root/player variables and shell selectors around:
  - `--player-shell-bg`
  - `--player-header-bg`
  - `--player-sidebar-bg`
  - `--player-sidebar-border`
  - `--player-stage-bg`
  - `--player-card-bg`
  - `.player-container`
  - `.player-header`
  - `.player-sidebar-aside`
  - `.player-main-content`
  - `.main-screen-canvas`

This is safer than migrating course screens because the shell is shared, bounded, and already conceptually aligned with foundation tokens such as `color.surface.inverse`, `color.surface.inverseRaised`, `color.background.stage`, `layout.sidebar.width`, border tokens, and focus tokens.

## Recommended First Implementation Slice

Recommended first implementation slice: player shell token aliasing only.

Scope for a future implementation task:

- add or adjust only legacy shell CSS variable aliases in `src/styles/global.css` so they point to `--cso-*` variables;
- do not change selectors;
- do not change layout behavior;
- do not touch renderers;
- do not touch modal behavior;
- do not change course progress, navigation, assessment, or routing logic;
- run visual review and build after the aliasing.

Example concept for later implementation, not to apply in this audit:

- `--player-shell-bg` could map to `var(--cso-color-surface-inverse)`
- `--player-sidebar-bg` could map to `var(--cso-color-surface-inverse-raised)`
- `--player-sidebar-border` could map to `var(--cso-color-surface-inverse-border)`
- `--player-stage-bg` could map to `var(--cso-color-background-stage)`
- `--player-card-bg` could map to `var(--cso-color-surface-primary)`

This approach should make the shell depend on the new token layer without refactoring screens or changing component markup.

## Recommended Migration Order

1. Player shell variable aliasing only.
2. Player header/sidebar base surfaces and borders.
3. Player header buttons and focus states.
4. Platform shell/catalogue shared surfaces and CTAs.
5. Modal visual surfaces after accessibility behavior review.
6. Shared card and button recipes.
7. Module/course screen templates only after vertical-slice screens are selected.
8. Individual course screens only through approved templates and learning blocks.

## Risks

- The current `global.css` is very large, so broad find/replace token migration could change screens unintentionally.
- Inline styles in player modals and shell components mix visual values with behavior and accessibility interactions.
- Module-specific patch CSS may contain fixes that are fragile or screen-specific.
- Existing legacy variables resemble the new token set but are not governed by the new specification.
- Course renderers contain screen-level design debt and should not be migrated one screen at a time.
- Token adoption can create false confidence if old local CSS remains dominant underneath.

## Stop Conditions

Stop before token migration if:

- migration would touch course screen renderers;
- migration would change routing, progress, locking, assessment, or certificate behavior;
- migration would require a new token not in the implementation-ready token specification;
- migration would introduce new raw hex, rgba, shadow, spacing, or gradient values;
- migration would copy old HRBA CSS into a new location;
- migration would create a local CSS patch;
- migration would change accessibility toolbar behavior;
- migration would affect story visuals or assets;
- the visual result cannot be verified with a small bounded shell slice.

## Final Recommendation

Do the first token migration as a small player shell variable-aliasing slice only.

Do not migrate course screens yet.

Do not migrate module-specific CSS yet.

Do not refactor components yet.

Use the first slice to prove that new `--cso-*` foundation tokens can safely drive a bounded shared shell layer before applying tokens to platform cards, modals, or course templates.
