# Design System v0.1 Boundary Note

Draft v0.1 - Documentation-only boundary note for the fast-but-safe acceleration path

## Purpose

Design System v0.1 is not the full CSO Learning Hub design system.

Design System v0.1 is the minimum protected system needed to safely build one HRBA vertical slice without waiting for the full component library, full learning-block implementation, full screen-template implementation, full course rebuild, or scale-up governance to be complete.

This is a speed strategy. It accelerates by grouping low-risk planning, reusing completed evidence, and deferring non-critical implementation. It does not accelerate by rushing risky CSS, token, behavior, routing, progress, assessment, content, or accessibility changes.

This note opens the Design System v0.1 acceleration stream as documentation-only governance. It does not implement React, CSS, tokens, components, learning blocks, screen templates, scripts, screens, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files.

## Current Completed Foundation

The v0.1 acceleration stream starts after a bounded player-shell accessibility loop has established a safer baseline.

Completed evidence includes:

- player shell tokens and token wiring for foundation variables, shell aliases, surfaces, borders, text, icons, base buttons, and current-on-inverse token files;
- bounded non-danger hover-on-dark CSS for approved player shell selector families only;
- bounded player shell focus-visible token adoption;
- Captions/transcript disclosure semantics with `aria-expanded`, conditional `aria-controls`, and stable transcript panel ID;
- Glossary, Resources, and Accessibility modal focus behavior, focus return, focus containment, stable modal root IDs, launcher ARIA, QA, and independent evaluation;
- Menu drawer behavior, focus handling, stable drawer root ID, launcher ARIA, QA, and independent evaluation;
- HelpOverlay focus/close behavior, stable root/title IDs, dialog-like root semantics, launcher ARIA, QA, and independent evaluation;
- alignment-control discipline in `docs/design-system-plan-progress-alignment.md`;
- repeatable QA/evaluation pattern using PASS, PASS WITH CAUTION, STOP, explicit file scope, and stop conditions.

This foundation is enough to begin planning one protected vertical slice. It is not enough to scale across the whole HRBA course.

## What v0.1 Includes

Design System v0.1 includes the minimum controls needed to prepare one HRBA vertical slice.

### Player Shell Accessibility Baseline

v0.1 treats the current player shell accessibility baseline as protected evidence:

- Captions/transcript semantics remain in place;
- Glossary, Resources, and Accessibility modal behavior and launcher ARIA remain in place;
- Menu drawer behavior and launcher ARIA remain in place;
- HelpOverlay behavior and launcher ARIA/root semantics remain in place;
- no new player shell behavior changes are assumed by v0.1 without a separate bounded implementation task.

### Token Usage Rules

v0.1 uses the approved token documents and existing token-file evidence as the rule source.

Minimum rule:

- future implementation must use existing approved tokens where available;
- missing tokens must be documented before implementation;
- token files must not be edited during v0.1 documentation tasks;
- current-on-inverse tokens remain implemented but selector usage remains blocked until a separate readiness and implementation task.

### No-Random-CSS Rule

v0.1 rejects local visual improvisation.

Minimum rule:

- no new hard-coded colors, shadows, radii, spacing, or typography values in implementation without approval;
- no broad `.player-sidebar-button.is-active` CSS;
- no Phase D CSS by implication;
- no modal/accessibility visual styling by implication;
- no course-screen style cleanup bundled into vertical slice planning.

### Minimum Hard-Coded Visual Value Prevention Approach

v0.1 includes a prevention plan, not a prevention script by default.

Minimum approach:

- document existing hard-coded value risk categories;
- define which directories and value patterns a future check should scan;
- decide whether the first check is advisory or blocking;
- run no script implementation unless a later task explicitly approves it.

### MVP Component Inventory And Priority List

v0.1 includes a documentation-only component inventory and priority plan before component implementation.

Minimum priority candidates:

- course-player shell primitives already present in `src/components/player/`;
- basic callout/card surface;
- primary and secondary action button patterns;
- accessible disclosure/accordion;
- tabs or segmented choice only if required by the selected vertical slice;
- knowledge check option group;
- reflection or portfolio input shell with HRBA safety note;
- completion transition pattern.

This list is a planning starting point, not component approval.

### Minimum Learning Block Set For One HRBA Vertical Slice

v0.1 includes only the learning blocks needed for one selected vertical slice.

Likely minimum set:

- Concept Explanation Block;
- Statement / Key Message Block;
- Comparison Block;
- Scenario Decision Block;
- Reflection / Portfolio Capture Block;
- Knowledge Check Block;
- Continue / Completion Transition Block.

Additional blocks, such as Hotspot, Risk-Spotting, Repair Lab, Process/Timeline, Chart/Data Insight, or Module Synthesis, require evidence that the selected vertical slice needs them.

### Minimum Screen Template Set For One HRBA Vertical Slice

v0.1 includes only the screen templates needed for one selected vertical slice.

Likely minimum set:

- Orientation / Welcome Screen if the slice starts at a module entry;
- Concept Introduction Screen;
- Framework Explanation Screen;
- Comparison Screen;
- Decision Scenario Screen;
- Reflection / Portfolio Capture Screen;
- Knowledge Check Screen;
- Completion Transition Screen.

The selected vertical slice must map every screen to an approved template before implementation.

### Vertical Slice Selection

v0.1 requires one HRBA vertical slice to be selected before implementation.

The slice should be small enough to validate:

- player shell behavior;
- token use;
- component reuse;
- block/template mapping;
- mobile behavior;
- accessibility;
- HRBA safety;
- QA evidence pack workflow.

The vertical slice is a validation path, not the start of full HRBA course rebuild.

### QA Evidence Pack Template

v0.1 includes a standard evidence pack for any later implementation.

Minimum evidence:

- changed files;
- screen IDs and template IDs;
- components or blocks used;
- token and CSS rule compliance;
- desktop and mobile checks;
- keyboard and screen-reader state checks where applicable;
- HRBA safety notes;
- build/test result;
- known risks;
- PASS/STOP recommendation.

### Codex Prompt And Production Rules For v0.1

v0.1 uses the system charter, AI production contract, and agent implementation rules as prompt controls.

Future prompts must name:

- branch;
- master plan area;
- implementation stream;
- allowed files;
- read-only files;
- out-of-scope areas;
- stop conditions;
- validation;
- whether `docs/design-system-plan-progress-alignment.md` must be updated.

## What v0.1 Explicitly Excludes

Design System v0.1 excludes:

- full theme packs;
- full component library;
- full learning block implementation;
- full screen template implementation;
- full HRBA course rebuild;
- full Phase D state migration;
- broad `.player-sidebar-button.is-active` CSS;
- dedicated Menu drawer close button;
- full modal/accessibility visual styling;
- global/course focus migration;
- completed, locked, disabled, danger, and progress state migration;
- broad course-screen style cleanup;
- scale-up across modules;
- asset migration implementation;
- hard-coded value prevention script implementation unless separately approved;
- vertical slice screen implementation until the Acceleration Pack is reviewed.

## Fast-But-Safe Work Lanes

### Lane A - Bounded Implementation Only

Lane A is for later implementation tasks only after documentation gates approve exact scope.

Possible Lane A tasks:

- current-state CSS readiness and then a narrow implementation only if separately approved;
- small hard-coded value prevention script or check only if separately approved;
- first MVP components only after the component inventory and priority plan is approved;
- one vertical slice implementation only after the vertical slice plan, component plan, block/template map, and QA evidence pack are approved.

Lane A must always identify exact files, exact selector/component scope, validation route, QA note, and stop conditions.

### Lane B - Grouped Documentation/Read-Only Acceleration

Lane B is the immediate acceleration path.

Lane B may group:

- component inventory;
- block/template mapping;
- hard-coded value prevention planning;
- QA evidence pack definition;
- HRBA vertical slice planning;
- Codex production contract reinforcement.

Lane B must not implement code, CSS, tokens, components, blocks, templates, scripts, routes, screens, assets, or content.

## Immediate Next Grouped Task

The next grouped documentation/read-only task should be:

**Design System v0.1 Acceleration Pack**

It should produce:

- `docs/design-system-v0-1-component-inventory-and-priority-plan.md`
- `docs/design-system-v0-1-learning-block-template-map.md`
- `docs/design-system-v0-1-visual-drift-prevention-plan.md`
- `docs/design-system-v0-1-qa-evidence-pack.md`

No code implementation should be done in that grouped task.

## Risk Decision

The grouped documentation task is safe because it:

- changes no React components;
- changes no CSS;
- changes no token files;
- changes no routing, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA behavior;
- does not implement components, blocks, templates, scripts, or screens;
- accelerates planning without touching high-risk behavior;
- creates clearer implementation gates before any vertical slice work begins.

## Stop Conditions

Stop if a future v0.1 task:

- starts implementing components, blocks, templates, screens, CSS, tokens, route changes, progress changes, content changes, or scripts without explicit approval;
- describes v0.1 as the full design system;
- recommends full HRBA course rebuild before vertical slice validation;
- proposes broad current-state CSS or broad `.is-active` styling;
- removes the need for QA/evaluation gates;
- treats completed player-shell accessibility work as approval for unrelated CSS or visual migration;
- touches existing untracked `docs/module-review/` work.

## Recommended Next Task

The next task should be the documentation-only **Design System v0.1 Acceleration Pack**.

Implementation remains blocked until that pack is reviewed.

Phase D CSS remains blocked.

Full scale-up remains blocked until vertical slice validation passes.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Does v0.1 avoid pretending to be the full design system? | PASS. It is defined as the minimum protected system for one HRBA vertical slice, not the full system. |
| Does v0.1 define what is enough to start one vertical slice? | PASS. It defines the player shell baseline, token rules, no-random-CSS rule, prevention planning, MVP component inventory, minimum block/template set, vertical slice selection, QA evidence pack, and Codex production rules. |
| Does v0.1 exclude non-critical work safely? | PASS. Full themes, full component library, full block/template implementation, full HRBA rebuild, Phase D migration, modal/accessibility styling, broad state cleanup, and scale-up are excluded. |
| Does v0.1 keep risky CSS/behavior work gated? | PASS. CSS, behavior, token edits, scripts, and implementation work require separate bounded tasks. |
| Does v0.1 identify the next grouped documentation task? | PASS. The next task is the documentation-only Design System v0.1 Acceleration Pack. |
| Are CSS, tokens, React, course screens, routing, progress, and content untouched? | PASS. This note is documentation-only and changes none of those files or behaviors. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is scale-up still blocked until vertical slice validation? | PASS. Full scale-up remains blocked until vertical slice validation passes. |
