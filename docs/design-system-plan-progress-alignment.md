# CSO Learning Hub Design-System Plan Progress Alignment

## 1. Purpose of This Alignment Control Document

This document is the progress-control source of truth for aligning the full CSO Learning Hub design-system master plan with the implementation work completed so far.

It exists to prevent:

- phase confusion;
- token tunnel vision;
- uncontrolled screen-by-screen production;
- false confidence from narrow implementation slices;
- AI or human drift away from approved system rules;
- CSS, component, accessibility, or course-screen changes that outrun governance.

This file should be referenced before any further implementation task. It does not implement code, migrate assets, define new tokens, change CSS, or change course behavior.

## 2. Correct Framing of Current Work

There are three different levels of work that must not be confused.

### Overall CSO Learning Hub Design-System Master Plan

The full master plan covers governance, visual foundations, tokens, themes, accessible components, learning blocks, screen templates, AI production rules, state recipes, responsive QA, asset migration, vertical slice validation, and scale-up governance.

This whole plan is not complete.

### Visual System Stream: Token Foundation and Player Shell Adoption

The current implementation stream is narrower. It covers:

- foundation tokens;
- CSS variable wiring;
- player shell variable aliasing;
- player shell surface, border, text, icon, and base button token adoption;
- QA evidence for the player shell route;
- bounded responsive correction for Module 2 S02 CTA visibility.

This stream is active and partially complete.

### Current Implementation Status Inside That Stream

The completed work is not Phase 10 of the whole design-system plan. It is the current phase sequence inside the visual-token/player-shell stream.

The current implementation work has made the player shell more token-driven. It has completed bounded non-danger player shell hover-on-dark CSS implementation only for the approved selector families.

It has not yet completed:

- broader focus states;
- hover beyond the bounded non-danger player shell slice;
- active/current, selected/current, disabled, locked, or completed states;
- danger-on-dark states;
- modal and accessibility UI;
- progress strip states;
- shell shadow/depth states;
- global focus states;
- course-screen states;
- module-specific states;
- hard-coded visual value prevention;
- accessible component library;
- screen-template implementation;
- learning-block implementation;
- vertical slice validation.

## 3. Master Plan to Progress Alignment Table

| Master plan area | Intended purpose | Current evidence | Current status | Gap | Risk level | Validated next action |
| --- | --- | --- | --- | --- | --- | --- |
| System Charter | Define system-first governance and boundaries. | `docs/system-charter.md` exists and was verified. | Complete | Must remain active in future prompts. | Low | Reference in all future implementation prompts. |
| Full platform/course audit | Identify infrastructure, legacy code, candidate migration areas, and design debt. | `docs/token-adoption-audit.md`, `docs/player-shell-state-modal-token-inventory.md`, `docs/player-shell-state-recipe-decision.md`, `docs/player-shell-interaction-state-recipe-specification.md`, `docs/player-shell-hover-on-dark-token-alias-decision.md`, `docs/player-shell-hover-on-dark-token-category-specification.md`, `docs/player-shell-hover-on-dark-token-value-proposal.md`, `docs/player-shell-hover-on-dark-token-file-qa.md`, `docs/player-shell-hover-on-dark-css-implementation-qa.md`, `docs/player-shell-navigation-state-implementation-readiness.md`, `docs/player-shell-current-on-inverse-token-category-decision.md`, `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`, `docs/player-shell-current-on-inverse-token-value-proposal.md`, `docs/player-shell-current-on-inverse-token-file-qa.md`, and earlier repo audit work identify style entry points and risks. | Partial | Audit is still visual/token focused; broader component inventory remains. | Medium | Use the Phase D readiness, current-on-inverse decision, sidebar semantics review, current value proposal, and token-file QA before any active/current/selected/completed/locked/disabled CSS migration. |
| Design foundations | Establish visual, premium, accessibility, story visual, and asset rules. | Visual foundations, premium visual standard, story visual standard, and asset register exist. | Partial | Rules exist, but implementation and evidence are incomplete. | Medium | Use these documents to review any future token, asset, or screen work. |
| Token foundation | Create approved token values and implementation-ready spec. | `docs/implementation-ready-token-specification.md`, `src/system/tokens/tokens.ts`, `src/system/tokens/tokens.css`, `docs/player-shell-hover-on-dark-token-alias-decision.md`, `docs/player-shell-hover-on-dark-token-category-specification.md`, `docs/player-shell-hover-on-dark-token-value-proposal.md`, `docs/player-shell-hover-on-dark-token-file-qa.md`, `docs/player-shell-hover-on-dark-css-implementation-qa.md`, `docs/player-shell-current-on-inverse-token-category-decision.md`, `docs/player-shell-current-on-inverse-token-value-proposal.md`, and `docs/player-shell-current-on-inverse-token-file-qa.md`. | Partial | Hover-on-dark token variables are implemented, QA passed, and bounded non-danger player shell CSS usage is complete. Current-on-inverse token variables are implemented in token files and QA passed, but no selector usage exists yet. Tokens are still not fully adopted across the app and automated prevention is not in place. | Medium | Do not implement CSS yet; create a documentation-only React/accessibility implementation specification for sidebar active/current controls. |
| Player shell token adoption | Bring player shell surfaces, text, icons, base buttons, and bounded focus into token control. | Token aliasing, cascade fix, surface/border adoption, text/icon adoption, button base adoption, state/modal inventory, focus-visible adoption, state recipe decision, interaction-state recipe specification, hover-on-dark token/alias decision, hover-on-dark token category specification, hover-on-dark token value proposal, hover-on-dark token-file implementation, token-file QA, bounded non-danger hover CSS implementation, hover CSS QA, Phase D navigation-state readiness, current-on-inverse token/category decision, active/current sidebar accessibility semantics review, current-on-inverse token value proposal, current-on-inverse token-file implementation and QA, and earlier QA notes. | In progress | Bounded non-danger hover-on-dark CSS implementation is complete for the approved selector families. Current-on-inverse token files are implemented, but no selector usage exists yet. Phase D CSS remains blocked until a React/accessibility implementation specification and required modal behavior review are complete. | Medium | Create a documentation-only React/accessibility implementation specification for sidebar active/current controls; do not implement CSS. |
| Interaction state recipes | Define and apply state rules for hover, active, selected, completed, locked, disabled, error, success, loading. | Component state requirements exist in token specification; `docs/player-shell-state-modal-token-inventory.md` identifies state groups; `docs/player-shell-state-recipe-decision.md` pauses implementation; `docs/player-shell-interaction-state-recipe-specification.md` defines draft player shell state recipes and gaps; `docs/player-shell-hover-on-dark-token-alias-decision.md` rejects hover aliases; `docs/player-shell-hover-on-dark-token-category-specification.md` defines semantic hover categories; `docs/player-shell-hover-on-dark-token-value-proposal.md` proposes values; `docs/player-shell-hover-on-dark-token-file-qa.md` verifies token files; `docs/player-shell-hover-on-dark-css-implementation-qa.md` verifies the bounded non-danger CSS slice; `docs/player-shell-navigation-state-implementation-readiness.md` documents Phase D readiness; `docs/player-shell-current-on-inverse-token-category-decision.md` defines current-on-inverse categories and blockers; `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md` reviews active/current ARIA patterns; `docs/player-shell-current-on-inverse-token-value-proposal.md` proposes current values; `docs/player-shell-current-on-inverse-token-file-qa.md` verifies token-file implementation. | Partial | Bounded non-danger player shell hover is implemented and QA passed, but Phase D navigation-state CSS is not ready. Active/current sidebar state has semantic category guidance, accessibility review, and token-file implementation, but React/accessibility semantics are not specified or implemented. | High | Do not implement Phase D CSS yet; next safe step is a documentation-only React/accessibility implementation specification. |
| Focus/accessibility states | Ensure visible, tokenized focus and keyboard affordances. | Focus tokens exist in token files and spec; bounded player shell focus-visible adoption and QA are complete in `docs/player-shell-focus-visible-token-adoption-qa.md`. | Partial with player shell focus slice complete | Global focus, course-screen focus, modal focus, and other interaction states remain legacy or undecided. | Medium-high | Do not broaden focus migration without a separate recipe and QA scope. |
| Modal/accessibility UI | Tokenize and QA modals and accessibility UI without breaking behavior. | `token-adoption-audit.md` and `docs/player-shell-state-modal-token-inventory.md` identify modal/accessibility UI and inline style clusters. | Not started | Modal/accessibility UI requires behavior review before migration; inline styles and focus behavior remain. | High | Defer modal/accessibility UI migration until behavior review and a separate approved slice. |
| Accessible component library | Build reusable components from tokens, states, accessibility rules, and templates. | Component/state model docs and design-system docs exist. | Not started | No clean component implementation or adoption plan yet. | High | Create component inventory and component plan after state/modal work. |
| Theme packs | Provide controlled visual variation without drift. | Theme pack boundaries in token spec and visual docs. | Partial | No theme implementation or QA evidence yet. | Medium | Defer until state and base shell behavior are stable. |
| Learning Block Register | Define reusable learning block taxonomy. | `docs/learning-block-register.md` exists. | Complete as governance / not implemented | Blocks are not implemented as reusable components. | Medium | Use as input to component and vertical-slice planning. |
| Screen Template Register | Define approved screen-level templates. | `docs/screen-template-register.md` exists. | Complete as governance / not implemented | Templates are not implemented as reusable screen components. | Medium | Use as input to vertical-slice planning; do not build screens from blank prompts. |
| AI/Codex production contract | Keep AI work inside boundaries. | `docs/ai-production-contract.md` and design-system agent rules exist. | Complete as governance | Needs active prompt enforcement and alignment-file update rule. | Medium | Require future prompts to reference this alignment file and stream status. |
| Responsive QA system | Verify desktop, tablet, mobile behavior with evidence. | Multiple route-specific QA notes exist for shell and Module 2 S02. | Partial | QA is manual and route-specific; no reusable QA evidence pack flow is enforced. | Medium | Keep viewport QA in every implementation slice; later formalize evidence pack. |
| Hard-coded visual value prevention | Stop new raw colors, gradients, shadows, spacing, and local CSS drift. | Token spec includes prevention acceptance criteria; manual diff scans were used. | Partial | No automated lint/search gate is in place. | High | Add hard-coded visual value prevention phase after state/modal work. |
| Vertical slice validation | Prove the clean system can support a real learning flow before scaling. | Module 2 S02 has route-specific QA; Module 1 story visual intake exists. | Not started | No complete clean-system vertical slice exists. | High | Build only after components, state recipes, and template decisions are ready. |
| Scale-up governance | Control expansion across HRBA and future CSO courses. | QA gates, AI contract, asset register, and this alignment document support governance. | Partial | Scale-up is not allowed until vertical slice passes. | High | Keep scale-up blocked until gates pass. |

## 4. Completed Implementation Evidence Log

| Item | What was done | Why it matters | What it does not cover | Belongs to |
| --- | --- | --- | --- | --- |
| Implementation-ready token specification | Created and refined `docs/implementation-ready-token-specification.md`. | Converts visual foundation decisions into a reviewable token implementation source. | Does not implement components, templates, states, modals, or screens. | Master plan and visual-token stream |
| Token files created | Added `src/system/tokens/tokens.ts` and `src/system/tokens/tokens.css`. | Establishes the first foundation token layer. | Does not apply tokens across the app by itself. | Visual-token stream |
| Token CSS wired into app entry point | Imported `src/system/tokens/tokens.css` from `src/main.tsx`. | Makes token variables available at runtime. | Does not change component or screen styling by itself. | Visual-token stream |
| Token adoption audit | Created `docs/token-adoption-audit.md`. | Identifies style entry points and recommends safe migration order. | Does not implement migration or fully inventory states/modals. | Master plan and visual-token stream |
| Player shell variable aliasing | Aliased player shell variables to CSO tokens. | Makes shell-level variables depend on the foundation token layer. | Did not replace all selector-level legacy values. | Visual-token stream |
| Cascade fix and QA | Updated later course-shell `:root` aliases and documented QA in `docs/player-shell-cascade-fix-qa.md`. | Ensured later CSS did not override the intended shell token aliases. | Found CTA visibility issue and paused broader migration. | Visual-token stream and responsive QA |
| Module 2 S02 CTA triage/fix/QA | Created triage, implemented bounded CSS fix, and documented QA. | Resolved a route-specific responsive reachability issue before continuing token adoption. | Does not solve systemic responsive issues or other screens. | Responsive QA and route-specific repair |
| Player shell surface/border adoption and QA | Adopted tokens for shell surfaces and borders; created `docs/player-shell-surface-border-token-adoption-qa.md`. | Stabilizes shell/header/sidebar/stage/card visual surfaces with tokens. | Does not migrate text, buttons, states, focus, modals, or screens. | Visual-token stream |
| Header/sidebar text/icon adoption and QA | Adopted inverse text tokens for shell text/icons; created QA note. | Improves readable token use on dark shell surfaces. | Does not migrate buttons or state styling. | Visual-token stream |
| Header/sidebar button base adoption and QA | Adopted token values for base shell button text, borders, primary background, and danger border; created QA note. | Moves base shell button colors toward token governance. | Does not migrate hover, focus, active, selected, completed, locked, disabled, modal, or full danger recipes. | Visual-token stream |
| Player shell state/modal inventory | Created `docs/player-shell-state-modal-token-inventory.md`. | Completes Phase B by identifying player shell focus, hover, active, disabled, modal/accessibility UI, and hard-coded state risks before migration. | Does not implement focus adoption, state recipes, modal migration, behavior changes, or code fixes. | Master plan and visual-token stream |
| Player shell focus-visible adoption and QA | Adopted `--cso-color-focus-dark-surface` for bounded player shell focus-visible selectors and documented QA in `docs/player-shell-focus-visible-token-adoption-qa.md`. | Completes the Phase C bounded player shell focus slice and confirms keyboard focus visibility on desktop, tablet, and mobile for the checked route. | Does not migrate global/course focus, hover, active, selected/current, completed, locked, disabled, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, or module-specific styles. | Focus/accessibility states and visual-token stream |
| Player shell state recipe decision | Created `docs/player-shell-state-recipe-decision.md`. | Records the decision to pause implementation because no remaining interaction-state area is ready for safe CSS migration without an approved recipe/specification. | Does not approve or implement hover, active/current, selected/current icon, disabled-on-dark, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, global focus, or course-screen states. | Interaction state recipes and visual-token stream |
| Player shell interaction-state recipe specification | Created `docs/player-shell-interaction-state-recipe-specification.md`. | Defines player shell state semantics, selector boundaries, token category mapping, accessibility rules, QA checks, and stop conditions for future state work. | Did not approve implementation by itself. It created the decision path that led to later hover category, value, token-file, and bounded CSS tasks. | Interaction state recipes and visual-token stream |
| Player shell hover-on-dark token/alias decision | Created `docs/player-shell-hover-on-dark-token-alias-decision.md`. | Records that existing inverse surface/border tokens must not be reused as hover aliases because they are structural/base tokens and may be invisible or too subtle on dark sidebar surfaces. | Did not implement hover. It required semantic hover-on-dark surface/border categories and high-contrast mapping before later token and CSS work. | Interaction state recipes, token foundation, and visual-token stream |
| Player shell hover-on-dark token category specification | Created `docs/player-shell-hover-on-dark-token-category-specification.md`. | Defines semantic categories for player shell hover-on-dark surface, border, optional text/icon, and high-contrast hover surface/border mapping. | Did not assign values, create token variables, edit token files, or approve CSS implementation by itself. Later value, token-file, and bounded CSS tasks handled the approved first slice. | Token foundation, interaction state recipes, and visual-token stream |
| Player shell hover-on-dark token value proposal | Created `docs/player-shell-hover-on-dark-token-value-proposal.md`. | Recommends conservative candidate values for review: `--cso-color-state-hover-on-inverse-surface: #253449`, `--cso-color-state-hover-on-inverse-border: #64748B`, `--cso-color-high-contrast-hover-surface: #1A1A1A`, and `--cso-color-high-contrast-hover-border: #7DD3FC`. It also recommends no separate hover text/icon token for the first slice. | Did not edit token files, create token variables, or implement CSS by itself. Later token-file and bounded CSS tasks handled the approved first slice. | Token foundation, interaction state recipes, and visual-token stream |
| Player shell hover-on-dark token-file implementation and QA | Implemented hover-on-dark token variables in `src/system/tokens/tokens.css` and matching entries in `src/system/tokens/tokens.ts`; QA documented in `docs/player-shell-hover-on-dark-token-file-qa.md`. | Verifies implementation commit `7679dca5e8be70b212d5c6c3277c0ddd09887f20`, QA commit `5768e37a313fb9f044c063a445bd7631b974388f`, exact CSS variables, matching TypeScript entries, `npm run build` pass with only the existing Vite large-chunk warning, and unchanged `src/styles/global.css` at that stage. | Did not implement CSS hover selectors, apply tokens to UI, change React behavior, or migrate active/current, disabled, danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, or module-specific states. The later bounded CSS hover slice is documented separately. | Token foundation, interaction state recipes, visual-token stream, and QA evidence |
| Player shell hover-on-dark CSS implementation and QA | Applied approved hover-on-dark tokens to `.player-header-button:hover:not(:disabled):not(.player-header-button--exit)` and `.player-sidebar-button:hover:not(.is-active)` in `src/styles/global.css`; QA documented in `docs/player-shell-hover-on-dark-css-implementation-qa.md`. | Verifies implementation commit `92d7b9c6a04d70d3bb9b4cdf8ab3c86f5bfdb794`; selectors changed: `.player-header-button:hover:not(:disabled):not(.player-header-button--exit)` and `.player-sidebar-button:hover:not(.is-active)`; tokens used: `var(--cso-color-state-hover-on-inverse-surface)` and `var(--cso-color-state-hover-on-inverse-border)`; `npm run build` passed with only the existing Vite large-chunk warning; route QA passed at `1440x900`, `768x900`, and `390x844`; focus-visible behavior remained unchanged; high-contrast hover selector behavior was left unchanged because no scoped high-contrast hover selectors existed. | Does not migrate hover beyond this bounded non-danger slice, active/current, selected/current icon, disabled, locked, completed, danger-on-dark, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, module-specific styles, React behavior, token files, routing, progress, assessment, certificate logic, assets, or old HRBA files. Broader state migration remains blocked. | Interaction state recipes, token foundation, visual-token stream, and QA evidence |
| Player shell navigation-state implementation readiness | Created `docs/player-shell-navigation-state-implementation-readiness.md`. | Defines Phase D scope for active/current, selected/current, completed, locked, and disabled navigation states; inventories player header, sidebar, menu drawer, roadmap, and progress strip boundaries; classifies token readiness; documents accessibility blockers; and recommends the smallest future implementation path. | Does not implement CSS or code. Finds that Phase D CSS is not ready: active/current sidebar tool state needs semantic current-state tokens and accessibility review first; disabled, completed, locked, menu drawer, roadmap, danger, modal/accessibility UI, progress strip, shell shadow, global focus, course-screen, and module-specific states remain blocked. | Interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell current-on-inverse token category decision | Created `docs/player-shell-current-on-inverse-token-category-decision.md`. | Defines semantic current-on-inverse categories for future active/current player sidebar tool state, including current surface, current border, optional text/icon, current icon treatment, and high-contrast mapping categories. It confirms hover and focus tokens must not be reused for persistent current state. | Does not assign token values, edit token files, implement CSS, edit React behavior, or approve Phase D migration. It finds that active sidebar tool accessibility semantics need documentation-only behavior review before token value proposal or CSS implementation. | Interaction state recipes, token foundation, player shell token adoption, and visual-token stream |
| Player shell active/current sidebar accessibility semantics review | Created `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`. | Reviews each sidebar control that can receive `.is-active`; finds modal/drawer buttons are not route-current controls, Captions is a disclosure/toggle-like panel control, `aria-current` is not appropriate for sidebar tool buttons, and `aria-expanded`/`aria-controls` plus possible `aria-haspopup="dialog"` require separate React/accessibility planning. | Does not implement React, ARIA attributes, CSS, token values, modal behavior, accessibility toolbar behavior, routing, progress logic, assets, content, or old HRBA files. It recommends a documentation-only current-on-inverse token value proposal can proceed next, while Phase D CSS remains blocked until a separate React/accessibility implementation specification and any required modal behavior review are complete. | Interaction state recipes, accessibility states, player shell token adoption, and visual-token stream |
| Player shell current-on-inverse token value proposal | Created `docs/player-shell-current-on-inverse-token-value-proposal.md`. | Proposes review-only candidate values for current-on-inverse surface, border, icon surface/foreground, and high-contrast mappings: `#064E5F`, `#38BDF8`, `#0F172A`, `#002B36`, `#A7F3D0`, and `#000000` in the documented token roles. Includes planning contrast evidence and confirms no separate current text token is proposed for the first slice. | Does not edit token files, create token variables, implement CSS, edit React behavior, or approve Phase D CSS. It keeps token-file implementation blocked until human review/approval and keeps Phase D CSS blocked until token files, React/accessibility specification, and any required modal behavior review are complete. | Token foundation, interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell current-on-inverse token-file implementation and QA | Implemented approved current-on-inverse token variables in `src/system/tokens/tokens.css` and matching entries in `src/system/tokens/tokens.ts`; QA documented in `docs/player-shell-current-on-inverse-token-file-qa.md`. | Verifies all eight approved current-on-inverse CSS variables and matching TypeScript entries, `npm run build` pass with only the existing Vite large-chunk warning and plugin timing notice, unchanged `src/styles/global.css`, and no selector usage of the new tokens. | Does not implement CSS selectors, React behavior, ARIA attributes, modal behavior, accessibility toolbar behavior, routing, progress, assessment, certificate logic, assets, content, old HRBA files, or broader Phase D states. Phase D CSS remains blocked. | Token foundation, interaction state recipes, player shell token adoption, and QA evidence |

## 5. Current Progress Estimate

These estimates are planning controls, not completion claims.

| Scope | Estimated progress | Explanation |
| --- | --- | --- |
| Visual token/player-shell adoption stream | About 58 percent | Token files, CSS wiring, shell aliases, surfaces, text/icons, base buttons, Phase B state/modal inventory, bounded player shell focus-visible adoption, interaction-state recipe specification, hover-on-dark token/alias decision, hover-on-dark token category specification, hover-on-dark token value proposal, hover-on-dark token-file implementation, token-file QA, bounded non-danger hover CSS implementation, route QA, Phase D readiness documentation, current-on-inverse token/category decision, active/current sidebar accessibility semantics review, current-on-inverse token value proposal, and current-on-inverse token-file QA are done. Implementation remains paused for Phase D CSS, hover beyond this slice, modals, prevention gates, global/course focus, and broader shell QA. |
| Full protected premium visual design system | About 25 percent | Governance, visual foundations, token spec, and partial shell adoption exist. Theme packs, reusable components, state recipes, asset implementation, screen recipes, and automated prevention are not complete. |
| Full AI-assisted CSO Learning Hub product system | About 15 percent | Core governance docs exist, but components, blocks, templates, AI production enforcement, course content migration, vertical slice, accessibility behavior, and scale-up gates are not complete. |

The whole-system percentage is lower because documents and token adoption are only part of the product system. Components, blocks, templates, state recipes, AI enforcement, accessibility behavior, asset governance in implementation, and vertical slice validation remain open.

## 6. Risk Register

| Risk | Description | Severity | Current control | Next control action |
| --- | --- | --- | --- | --- |
| False sense of progress | Narrow token/player-shell progress may be mistaken for whole-system completion. | High | This alignment document separates master plan from stream progress. | Require this file in future prompts and update it after each phase. |
| Token tunnel vision | Work may continue replacing colors while ignoring components, states, templates, and learning design. | High | Token adoption audit, Phase B/Phase C evidence, state recipe decision, interaction-state recipe specification, hover-on-dark token/alias decision, hover category specification, token-file QA, and bounded hover CSS QA recommend bounded migration order. | Keep broader implementation paused and require a separate decision/scope before any next state area. |
| Hover/state scope containment | Bounded non-danger player shell hover is implemented and QA passed, but hover beyond this slice, broader state migration, and high-contrast state application remain open. | Medium | `docs/player-shell-hover-on-dark-css-implementation-qa.md` verifies exact selector scope, token usage, build pass, route QA, unchanged focus-visible behavior, unchanged danger samples, and no scoped high-contrast selector changes because none existed for this bounded hover area. `docs/player-shell-navigation-state-implementation-readiness.md` documents Phase D state boundaries before CSS. `docs/player-shell-current-on-inverse-token-category-decision.md` defines current-state categories. `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md` documents semantics findings. `docs/player-shell-current-on-inverse-token-value-proposal.md` proposes values. `docs/player-shell-current-on-inverse-token-file-qa.md` verifies token-file implementation and no selector usage. | Create a documentation-only React/accessibility implementation specification for sidebar active/current controls. Do not implement CSS yet. |
| Accessibility states still legacy | Player shell focus-visible passed QA, but global focus, course-screen focus, modal focus, disabled, selected/current, locked, completed, active, danger, and other state styles still include legacy styling. | Medium-high | Token spec defines state requirements; Phase C QA confirms the bounded player shell focus slice; interaction-state recipe specification, Phase D readiness note, current-on-inverse category decision, active/current sidebar semantics review, current value proposal, and current token-file QA document remaining state gaps. | Keep broader accessibility state risk open until React/accessibility semantics, active/current selector implementation, disabled/completed/locked decisions, implementation slices, and QA pass. |
| Modal/accessibility UI inline style clusters | Player modal/accessibility UI includes inline style clusters and behavior-sensitive dialog/focus patterns. | High | Phase B inventory documents the affected modal/accessibility files and values. | Do not treat modal/accessibility UI as CSS-only migration; require behavior review before any implementation. |
| Course-screen governance still weak | Old course screens and screen-level CSS can continue to drive visual decisions. | High | Learning Block and Screen Template Registers exist. | Classify course-screen styles before screen migration. |
| Responsive issues may be systemic | Module 2 S02 CTA issue may be one example of broader container/overflow risk. | Medium | Route-specific triage/fix/QA completed. | Include responsive QA and stop conditions in every slice. |
| Cascade and legacy CSS risk | Large `global.css` and later duplicate definitions can override intended tokens. | High | Cascade fix and QA documented. | Search for duplicate overrides during each scoped migration. |
| AI may reintroduce drift without active control | AI can follow old patterns unless prompts enforce governance. | Medium | AI production contract and agent rules exist. | Future prompts must state master area, stream, scope, and update rule. |
| Hard-coded visual values may continue | Manual review can miss new raw values. | High | Manual diff checks have been used; hover token-file QA confirmed no selector usage was added, hover CSS QA confirmed the bounded CSS slice used approved tokens without new raw visual values, and current token-file QA confirmed no selector usage was added. | Add hard-coded visual value prevention phase; this remains unresolved. |

## 7. Validated Replanned Next Phases

### Phase A: Alignment Control Document Created and Used

| Field | Detail |
| --- | --- |
| Objective | Create this source-of-truth alignment document and require it before further implementation. |
| Why it comes next | The project needs phase clarity before another token or UI slice. |
| Files likely involved | `docs/design-system-plan-progress-alignment.md` only. |
| Files that must not be touched | CSS, React components, screens, module CSS, token files, routing, state, assets, old HRBA course files. |
| Acceptance criteria | This document exists, maps master plan to actual progress, names risks, and defines next phases. |
| Stop conditions | Stop if the task requires implementation or changes outside this file. |

### Phase B: State and Modal Inventory - Complete

| Field | Detail |
| --- | --- |
| Objective | Inventory hover, focus, active, selected, completed, locked, disabled, modal, and accessibility UI selectors before migration. |
| Why it comes next | State and modal styling is the next highest-risk legacy area after base shell colors. |
| Files likely involved | New documentation file in `docs/`; read-only inspection of `src/styles/global.css`, player shell components, accessibility UI, modal-related files. |
| Files that must not be touched | CSS, React, token files, routing, progress, assessment, assets, old course files. |
| Acceptance criteria | Complete: `docs/player-shell-state-modal-token-inventory.md` lists selectors, current values, risk, token mapping readiness, missing token/state decisions, and recommended order. |
| Stop conditions | Satisfied: no CSS, React, token, routing, progress, assessment, accessibility toolbar, asset, or old course file changes were made. |

### Phase C: Focus State Token Adoption - Complete for Bounded Player Shell Slice

| Field | Detail |
| --- | --- |
| Objective | Adopt approved focus tokens for bounded player shell focus states. |
| Why it comes next | Keyboard visibility is an accessibility gate and should precede broader state migration. |
| Files likely involved | Completed in `src/styles/global.css` for `.player-header-button:focus-visible`, `.player-sidebar-button:focus-visible`, and `.player-sidebar-return:focus-visible`; QA documented in `docs/player-shell-focus-visible-token-adoption-qa.md`. |
| Files that must not be touched | React components, screens, module CSS, routing, progress, assets, assessment, old course files. |
| Acceptance criteria | Complete for bounded player shell slice: focus outline used `--cso-color-focus-dark-surface`, build passed, route QA passed at desktop/tablet/mobile, and no hover/active/selected migration was done. |
| Stop conditions | Satisfied for this slice: no component logic, missing token, or behavior change was required. |

### Phase D: Navigation State Adoption: Active/Current/Selected/Completed/Locked/Disabled

| Field | Detail |
| --- | --- |
| Objective | Tokenize navigation state visuals without changing logic. |
| Why it comes next | Learners need clear state feedback, but these states can affect progress perception. |
| Files likely involved | Likely `src/styles/global.css` after inventory. |
| Files that must not be touched | Progress logic, locking logic, routing, screen renderers, assessment, old course files. |
| Acceptance criteria | State visuals are readable, non-color-only where possible, and do not alter behavior. |
| Stop conditions | Stop if visual state change requires logic changes or unapproved semantics. |

### Phase E: Modal and Accessibility UI Token Adoption

| Field | Detail |
| --- | --- |
| Objective | Bring modal and accessibility UI surfaces/text/borders into the token system. |
| Why it comes next | Accessibility UI must remain usable and visually coherent before vertical slice. |
| Files likely involved | Modal/accessibility selectors or components identified by Phase B. |
| Files that must not be touched | Course screens, assessment, progress, certificate, assets, unrelated components. |
| Acceptance criteria | Modal/accessibility UI remains keyboard usable, readable, and behaviorally unchanged. |
| Stop conditions | Stop if behavior, focus trapping, screen reader behavior, or toolbar logic must change. |

### Phase F: Hard-Coded Visual Value Prevention

| Field | Detail |
| --- | --- |
| Objective | Add a controlled prevention/check approach for new raw colors, gradients, shadows, and local CSS drift. |
| Why it comes next | Manual diff checks are helpful but not enough for scale-up. |
| Files likely involved | Documentation first; then package/script/lint config only if separately approved. |
| Files that must not be touched | App behavior, screens, routing, assessment, assets. |
| Acceptance criteria | Prevention approach identifies allowed token files and flags new raw visual values elsewhere. |
| Stop conditions | Stop if the prevention method creates noisy false positives or requires broad repo refactors. |

### Phase G: Course-Screen Style Classification

| Field | Detail |
| --- | --- |
| Objective | Classify old screen styles as legacy reference, candidate migration idea, design debt, or template candidate. |
| Why it comes next | Course screens must not be migrated one by one without template governance. |
| Files likely involved | Documentation only at first; read-only inspection of screen selectors and renderers. |
| Files that must not be touched | CSS, React, content, routing, assets. |
| Acceptance criteria | Screen-style risks and reusable patterns are documented without edits. |
| Stop conditions | Stop if classification drifts into refactoring or visual fixes. |

### Phase H: Accessible Component Inventory and Component Plan

| Field | Detail |
| --- | --- |
| Objective | Identify reusable components needed for shell, buttons, cards, modals, blocks, and templates. |
| Why it comes next | Components should be planned before coding blocks/templates or screens. |
| Files likely involved | Documentation; read-only component inspection. |
| Files that must not be touched | Component code until the component plan is approved. |
| Acceptance criteria | Component list includes purpose, states, tokens, accessibility requirements, and implementation order. |
| Stop conditions | Stop if component implementation begins before approval. |

### Phase I: Learning Block Register

| Field | Detail |
| --- | --- |
| Objective | Confirm the existing Learning Block Register remains active as the instructional source for future implementation. |
| Why it comes next | Components and vertical slice screens must map to learning purpose. |
| Files likely involved | `docs/learning-block-register.md` for reference; possible documentation-only alignment update if needed. |
| Files that must not be touched | Block code, screen code, course logic. |
| Acceptance criteria | Future block implementation references approved block types and completion rules. |
| Stop conditions | Stop if a needed block is missing or would be invented in code. |

### Phase J: Screen Template Register

| Field | Detail |
| --- | --- |
| Objective | Confirm screen templates are the required structure before any clean vertical slice screen work. |
| Why it comes next | It prevents blank-prompt screen production. |
| Files likely involved | `docs/screen-template-register.md` for reference; possible documentation-only alignment update if needed. |
| Files that must not be touched | Screen implementation, routing, course renderers. |
| Acceptance criteria | Every future screen task identifies an approved template and block combination. |
| Stop conditions | Stop if a screen needs a missing template. |

### Phase K: Codex Production Contract

| Field | Detail |
| --- | --- |
| Objective | Confirm future Codex prompts follow the AI production contract and this alignment file. |
| Why it comes next | AI can reintroduce drift unless every task includes source, scope, stop conditions, and validation. |
| Files likely involved | `docs/ai-production-contract.md`, `docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md`, this file. |
| Files that must not be touched | Any code unless a separate implementation task is approved. |
| Acceptance criteria | Future prompts name master plan area, stream, exact scope, out-of-scope areas, validation, and update rule. |
| Stop conditions | Stop if a prompt lacks branch/scope/safety constraints for implementation work. |

### Phase L: Vertical Slice Validation

| Field | Detail |
| --- | --- |
| Objective | Validate one complete, accessible, token-driven learning path before scaling. |
| Why it comes next | The system must prove it can produce quality before more screens are rebuilt. |
| Files likely involved | Approved components, tokens, templates, selected Module 1/Module 2 route docs, QA evidence. |
| Files that must not be touched | Broad course screens, final assessment, certificate logic, unrelated modules unless explicitly scoped. |
| Acceptance criteria | One route/slice passes build, responsive QA, accessibility checks, state checks, and design-system evidence. |
| Stop conditions | Stop if QA exposes unresolved focus, state, content, asset, or responsive risks. |

### Phase M: Scale-Up Only After Gates Pass

| Field | Detail |
| --- | --- |
| Objective | Expand the clean system only after vertical slice gates pass. |
| Why it comes next | Scaling before proof would recreate old pilot design drift. |
| Files likely involved | Module implementation plans, QA gates, component library, block/template docs. |
| Files that must not be touched | Any broad screen set before acceptance gates pass. |
| Acceptance criteria | Reusable system components/templates are proven and documented. |
| Stop conditions | Stop if implementation starts screen-by-screen without approved templates/components. |

## 8. Next Immediate Action Recommendation

Recommended next Codex step after this document is reviewed and accepted:

Create a documentation-only React/accessibility implementation specification for sidebar active/current controls.

The bounded non-danger player shell hover-on-dark CSS slice is complete and documented in `docs/player-shell-hover-on-dark-css-implementation-qa.md`.

CSS hover is no longer blocked for that bounded non-danger slice only.

The Phase D readiness note exists at `docs/player-shell-navigation-state-implementation-readiness.md`.

It finds that Phase D CSS implementation is not ready yet. The smallest likely future implementation slice remains bounded active/current sidebar tool state, but only after semantic current-state tokens and accessibility questions are resolved.

The current-on-inverse decision exists at `docs/player-shell-current-on-inverse-token-category-decision.md`.

It defines semantic categories for:

- current-on-inverse surface;
- current-on-inverse border;
- optional current-on-inverse text/icon;
- current icon surface and optional foreground;
- high-contrast current-state mapping.

The active/current sidebar accessibility semantics review exists at `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`.

It finds that:

- sidebar tool buttons that open modals/drawers should not use `aria-current`;
- `aria-expanded` and `aria-controls` are likely candidates for controlled panels/drawers where stable IDs exist;
- `aria-haspopup="dialog"` may be appropriate for true modal/dialog launchers after modal semantics review;
- Captions is a disclosure/toggle-like transcript panel control;
- a documentation-only current-on-inverse token value proposal could proceed next and has now been created;
- Phase D CSS remains blocked until a separate React/accessibility implementation specification and any required modal behavior review are complete.

The current-on-inverse token value proposal exists at `docs/player-shell-current-on-inverse-token-value-proposal.md`.

It proposed these values, which are now implemented in token files and verified by `docs/player-shell-current-on-inverse-token-file-qa.md`:

- `--cso-color-state-current-on-inverse-surface: #064E5F`;
- `--cso-color-state-current-on-inverse-border: #38BDF8`;
- `--cso-color-state-current-icon-on-inverse-surface: #38BDF8`;
- `--cso-color-state-current-icon-on-inverse-foreground: #0F172A`;
- `--cso-color-high-contrast-current-on-inverse-surface: #002B36`;
- `--cso-color-high-contrast-current-on-inverse-border: #A7F3D0`;
- `--cso-color-high-contrast-current-icon-on-inverse-surface: #A7F3D0`;
- `--cso-color-high-contrast-current-icon-on-inverse-foreground: #000000`.

The token-file implementation added the approved values to `src/system/tokens/tokens.css` and `src/system/tokens/tokens.ts`.

`docs/player-shell-current-on-inverse-token-file-qa.md` confirms:

- `npm run build` passed with only the existing Vite large-chunk warning and plugin timing notice;
- `src/styles/global.css` was not changed;
- no CSS selector usage of the new current-on-inverse tokens exists yet;
- no React or behavior implementation was done;
- Phase D CSS remains blocked.

Any future CSS implementation task after token files, React/accessibility implementation specification, and any required modal behavior review must identify one state area, one selector family, one validation route, and one QA note. It must not treat the completed hover slice, readiness note, category decision, semantics review, value proposal, or token-file QA as approval for broader state migration.

Explicitly keep these out of scope for the next step:

- active/current implementation;
- selected/current icon implementation;
- completed implementation;
- locked implementation;
- disabled-on-dark implementation;
- danger-on-dark implementation;
- modal/accessibility UI migration;
- progress strip migration;
- shell shadow/depth migration;
- global focus migration;
- course-screen states;
- module-specific states.

No React, routing, progress, assessment, accessibility toolbar, modal behavior, asset, or old course file should be changed during any future state migration task unless that task is separately approved and explicitly scoped.

## 9. Operating Rule for Future Codex Prompts

Every future Codex prompt should reference:

- the relevant master plan area;
- the implementation stream;
- the current alignment status from this file;
- exact files allowed to edit;
- exact files not allowed to edit;
- out-of-scope areas;
- validation required;
- stop conditions;
- whether `docs/design-system-plan-progress-alignment.md` must be updated after the task.

Prompts that continue implementation without this context should be treated as risky.

## 10. Update Rule

This file must be updated whenever:

- a new phase is completed;
- a QA note changes a recommendation;
- a defect interrupts the roadmap;
- a new implementation stream begins;
- a risk status changes;
- a completed task changes the current progress estimates;
- a master plan area moves from not started to partial, in progress, or complete.

Updates should remain documentation-only unless a separate implementation task explicitly authorizes code changes.
