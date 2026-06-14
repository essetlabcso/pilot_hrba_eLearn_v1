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

The current implementation work has made the player shell more token-driven. It has completed bounded non-danger player shell hover-on-dark CSS implementation only for the approved selector families, the bounded Slice 1 modal focus return/containment behavior for Glossary, Resources, and Accessibility, and the bounded Slice 2 stable modal root ID plus launcher ARIA implementation for those same three modals.

It has not yet completed:

- broader focus states;
- hover beyond the bounded non-danger player shell slice;
- active/current, selected/current, disabled, locked, or completed states;
- danger-on-dark states;
- modal and accessibility UI beyond the bounded Glossary, Resources, and Accessibility focus return/containment and launcher ARIA slices;
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
| Full platform/course audit | Identify infrastructure, legacy code, candidate migration areas, and design debt. | `docs/token-adoption-audit.md`, `docs/player-shell-state-modal-token-inventory.md`, `docs/player-shell-state-recipe-decision.md`, `docs/player-shell-interaction-state-recipe-specification.md`, `docs/player-shell-hover-on-dark-token-alias-decision.md`, `docs/player-shell-hover-on-dark-token-category-specification.md`, `docs/player-shell-hover-on-dark-token-value-proposal.md`, `docs/player-shell-hover-on-dark-token-file-qa.md`, `docs/player-shell-hover-on-dark-css-implementation-qa.md`, `docs/player-shell-navigation-state-implementation-readiness.md`, `docs/player-shell-current-on-inverse-token-category-decision.md`, `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md`, `docs/player-shell-current-on-inverse-token-value-proposal.md`, `docs/player-shell-current-on-inverse-token-file-qa.md`, `docs/player-shell-active-current-sidebar-react-accessibility-implementation-spec.md`, `docs/player-shell-captions-transcript-accessibility-qa.md`, `docs/player-shell-modal-drawer-behavior-review.md`, `docs/player-shell-modal-accessibility-behavior-specification.md`, `docs/player-shell-modal-drawer-behavior-implementation-spec.md`, `docs/player-shell-modal-focus-return-containment-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-readiness.md`, `docs/player-shell-modal-root-id-launcher-aria-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`, `docs/player-shell-menu-drawer-behavior-implementation-spec.md`, `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md`, and earlier repo audit work identify style entry points and risks. | Partial | Audit is still visual/token focused; broader component inventory remains. | Medium | Use the Phase D readiness, current-on-inverse decision, sidebar semantics review, current value proposal, token-file QA, React/accessibility spec, Captions/transcript QA, modal/drawer behavior review, modal behavior specification, modal/drawer implementation spec, modal Slice 1 QA, Slice 2 readiness note, Slice 2 QA, independent Slice 2 evaluation, Menu drawer behavior specification, and Menu close/focus decision before any active/current/selected/completed/locked/disabled CSS migration. |
| Design foundations | Establish visual, premium, accessibility, story visual, and asset rules. | Visual foundations, premium visual standard, story visual standard, and asset register exist. | Partial | Rules exist, but implementation and evidence are incomplete. | Medium | Use these documents to review any future token, asset, or screen work. |
| Token foundation | Create approved token values and implementation-ready spec. | `docs/implementation-ready-token-specification.md`, `src/system/tokens/tokens.ts`, `src/system/tokens/tokens.css`, `docs/player-shell-hover-on-dark-token-alias-decision.md`, `docs/player-shell-hover-on-dark-token-category-specification.md`, `docs/player-shell-hover-on-dark-token-value-proposal.md`, `docs/player-shell-hover-on-dark-token-file-qa.md`, `docs/player-shell-hover-on-dark-css-implementation-qa.md`, `docs/player-shell-current-on-inverse-token-category-decision.md`, `docs/player-shell-current-on-inverse-token-value-proposal.md`, and `docs/player-shell-current-on-inverse-token-file-qa.md`. | Partial | Hover-on-dark token variables are implemented, QA passed, and bounded non-danger player shell CSS usage is complete. Current-on-inverse token variables are implemented in token files and QA passed, but no selector usage exists yet. Tokens are still not fully adopted across the app and automated prevention is not in place. | Medium | Do not implement current-state CSS yet; first complete a documentation-only modal/drawer behavior review or token/CSS readiness check. |
| Player shell token adoption | Bring player shell surfaces, text, icons, base buttons, and bounded focus into token control. | Token aliasing, cascade fix, surface/border adoption, text/icon adoption, button base adoption, state/modal inventory, focus-visible adoption, state recipe decision, interaction-state recipe specification, hover-on-dark token/alias decision, hover-on-dark token category specification, hover-on-dark token value proposal, hover-on-dark token-file implementation, token-file QA, bounded non-danger hover CSS implementation, hover CSS QA, Phase D navigation-state readiness, current-on-inverse token/category decision, active/current sidebar accessibility semantics review, current-on-inverse token value proposal, current-on-inverse token-file implementation and QA, React/accessibility implementation specification, Captions/transcript React/accessibility implementation and QA, modal/drawer behavior review, modal accessibility behavior specification, modal/drawer behavior implementation specification, modal focus return/containment implementation and QA, modal root ID/launcher ARIA readiness note, modal root ID/launcher ARIA implementation and QA, independent modal root ID/launcher ARIA evaluation, Menu drawer behavior implementation specification, Menu drawer close affordance and focus destination decision, and earlier QA notes. | In progress | Bounded non-danger hover-on-dark CSS implementation is complete for the approved selector families. Current-on-inverse token files are implemented, but no selector usage exists yet. Captions/transcript React/accessibility semantics are implemented and QA passed. Glossary, Resources, and Accessibility now have bounded focus return, focus containment, stable modal root IDs, launcher ARIA, and independent PASS evaluation. Menu drawer close/focus decision records PASS WITH CAUTION for a future behavior-only slice that excludes the dedicated close button unless separately approved. HelpOverlay behavior, Menu launcher ARIA, Phase D CSS, and broader state migration remain blocked. | Medium | Next safe step may be a bounded Menu drawer behavior implementation only if it excludes close-button styling, Menu launcher ARIA, CSS, tokens, HelpOverlay, modal dialogs, Captions/transcript, routing, progress, and Phase D CSS. |
| Interaction state recipes | Define and apply state rules for hover, active, selected, completed, locked, disabled, error, success, loading. | Component state requirements exist in token specification; `docs/player-shell-state-modal-token-inventory.md` identifies state groups; `docs/player-shell-state-recipe-decision.md` pauses implementation; `docs/player-shell-interaction-state-recipe-specification.md` defines draft player shell state recipes and gaps; `docs/player-shell-hover-on-dark-token-alias-decision.md` rejects hover aliases; `docs/player-shell-hover-on-dark-token-category-specification.md` defines semantic hover categories; `docs/player-shell-hover-on-dark-token-value-proposal.md` proposes values; `docs/player-shell-hover-on-dark-token-file-qa.md` verifies token files; `docs/player-shell-hover-on-dark-css-implementation-qa.md` verifies the bounded non-danger CSS slice; `docs/player-shell-navigation-state-implementation-readiness.md` documents Phase D readiness; `docs/player-shell-current-on-inverse-token-category-decision.md` defines current-on-inverse categories and blockers; `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md` reviews active/current ARIA patterns; `docs/player-shell-current-on-inverse-token-value-proposal.md` proposes current values; `docs/player-shell-current-on-inverse-token-file-qa.md` verifies token-file implementation; `docs/player-shell-active-current-sidebar-react-accessibility-implementation-spec.md` specifies React/accessibility work; `docs/player-shell-captions-transcript-accessibility-qa.md` verifies the first bounded Captions/transcript semantics implementation; `docs/player-shell-modal-drawer-behavior-review.md` reviews modal/drawer readiness; `docs/player-shell-modal-accessibility-behavior-specification.md` specifies expected modal/drawer accessibility behavior; `docs/player-shell-modal-drawer-behavior-implementation-spec.md` defines bounded future implementation slices; `docs/player-shell-modal-focus-return-containment-qa.md` verifies Slice 1 modal behavior; `docs/player-shell-modal-root-id-launcher-aria-readiness.md` prepares Slice 2; `docs/player-shell-modal-root-id-launcher-aria-qa.md` verifies Slice 2; `docs/player-shell-modal-root-id-launcher-aria-evaluation.md` independently evaluates Slice 2; `docs/player-shell-menu-drawer-behavior-implementation-spec.md` specifies Menu drawer behavior readiness; `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` resolves close/focus readiness. | Partial | Bounded non-danger player shell hover is implemented and QA passed, but Phase D navigation-state CSS is not ready. Slice 1 modal focus return/containment and Slice 2 stable root ID/launcher ARIA are implemented, QA passed, and independently evaluated as PASS for Glossary, Resources, and Accessibility. Menu drawer close/focus readiness is PASS WITH CAUTION for a future behavior-only slice that excludes a dedicated close button unless separately approved. HelpOverlay behavior, current-state CSS, and broader state recipes remain incomplete. | High | Do not implement Phase D CSS. A future bounded Menu drawer behavior slice may proceed only within the close/focus decision guardrails; broader state migration remains blocked. |
| Focus/accessibility states | Ensure visible, tokenized focus and keyboard affordances. | Focus tokens exist in token files and spec; bounded player shell focus-visible adoption and QA are complete in `docs/player-shell-focus-visible-token-adoption-qa.md`; Captions/transcript disclosure semantics are implemented and verified in `docs/player-shell-captions-transcript-accessibility-qa.md`; modal/drawer behavior readiness is reviewed in `docs/player-shell-modal-drawer-behavior-review.md`; modal/drawer behavior expectations are specified in `docs/player-shell-modal-accessibility-behavior-specification.md`; modal/drawer behavior implementation slices are specified in `docs/player-shell-modal-drawer-behavior-implementation-spec.md`; modal focus return/containment QA is documented in `docs/player-shell-modal-focus-return-containment-qa.md`; Slice 2 readiness is documented in `docs/player-shell-modal-root-id-launcher-aria-readiness.md`; Slice 2 implementation QA is documented in `docs/player-shell-modal-root-id-launcher-aria-qa.md`; independent Slice 2 evaluation is documented in `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`; Menu drawer behavior specification is documented in `docs/player-shell-menu-drawer-behavior-implementation-spec.md`; Menu close/focus decision is documented in `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md`. | Partial with player shell focus, Captions/transcript semantics, scoped modal focus behavior, scoped modal launcher ARIA, independent Slice 2 PASS evaluation, and Menu close/focus decision complete | Global focus, course-screen focus, Menu drawer ARIA, HelpOverlay ARIA, disabled/current/completed/locked states, and other interaction states remain unimplemented. Menu drawer behavior is PASS WITH CAUTION only for a narrow future behavior slice that focuses the drawer and then the existing main content landmark after screen selection. | Medium-high | Do not start CSS or broader state migration; any Menu drawer behavior task must exclude Menu launcher ARIA, CSS, tokens, HelpOverlay, modal dialogs, Captions/transcript, routing, progress, and Phase D CSS. |
| Modal/accessibility UI | Tokenize and QA modals and accessibility UI without breaking behavior. | `token-adoption-audit.md`, `docs/player-shell-state-modal-token-inventory.md`, `docs/player-shell-modal-drawer-behavior-review.md`, `docs/player-shell-modal-accessibility-behavior-specification.md`, `docs/player-shell-modal-drawer-behavior-implementation-spec.md`, `docs/player-shell-modal-focus-return-containment-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-readiness.md`, `docs/player-shell-modal-root-id-launcher-aria-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`, `docs/player-shell-menu-drawer-behavior-implementation-spec.md`, and `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` identify modal/accessibility UI, inline style clusters, partial dialog semantics, behavior models, expected focus/close requirements, completed Slice 1 behavior evidence, completed Slice 2 root ID/launcher ARIA evidence, independent Slice 2 PASS evaluation, Menu drawer STOP readiness, and Menu close/focus PASS WITH CAUTION readiness. | Partial with Slice 1 behavior and scoped Slice 2 launcher ARIA complete / styling not implemented | Glossary, Resources, and Accessibility now have scoped focus return, focus containment, stable modal root IDs, launcher ARIA, and independent evaluation. Menu drawer focus destination is decided, but dedicated close button remains blocked pending design/CSS approval. HelpOverlay behavior and modal/accessibility UI token styling remain separate. | High | Do not implement drawer ARIA, modal styling, CSS, or broader state migration. A future Menu behavior slice may proceed only without a dedicated close button unless a separate close-affordance decision approves it. |
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
| Player shell active/current React/accessibility implementation specification | Created `docs/player-shell-active-current-sidebar-react-accessibility-implementation-spec.md`. | Specifies future ARIA patterns and stable controlled-region ID requirements for sidebar active/current controls. Recommends Captions/transcript semantics as the smallest first implementation slice using `aria-expanded`, `aria-controls`, and a stable transcript panel ID. | Does not implement React, ARIA attributes, CSS, tokens, modal behavior, routing, progress, accessibility toolbar behavior, assets, content, or old HRBA files. Modal launchers, menu drawer, and Phase D CSS remain blocked pending behavior review and separate approved tasks. | Accessibility states, interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell Captions/transcript React/accessibility implementation and QA | Added `aria-expanded={transcriptVisible}` and conditional `aria-controls={transcriptVisible ? 'player-transcript-panel' : undefined}` to the Captions button in `src/components/player/PlayerSidebar.tsx`; added `id="player-transcript-panel"` to the transcript panel container in `src/components/player/CoursePlayerShell.tsx`; QA documented in `docs/player-shell-captions-transcript-accessibility-qa.md`. | Verifies `npm run build` passed with only the existing Vite large-chunk warning; route QA passed at `1440x900`, `768x900`, and `390x844`; keyboard navigation reached the Captions button; hidden state uses `aria-expanded="false"` with `aria-controls` omitted because the panel is unmounted; visible state uses `aria-expanded="true"` with `aria-controls="player-transcript-panel"` and matching panel ID. | Does not implement CSS, edit token files, change modal launcher ARIA, change menu drawer ARIA, change modal behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or broader Phase D states. Phase D CSS remains blocked. | Accessibility states, interaction state recipes, player shell token adoption, and QA evidence |
| Player shell modal/drawer behavior review | Created `docs/player-shell-modal-drawer-behavior-review.md`. | Reviews Menu, Glossary, Resources, Help Guide, and Accessibility controls before modal launcher ARIA or current-state CSS. It initially found Glossary, Resources, and Accessibility had partial dialog semantics but needed focus return and focus containment; that gap is now addressed by `docs/player-shell-modal-focus-return-containment-qa.md`. Menu still needs drawer behavior specification; Help still needs overlay/coachmark behavior classification. | Does not implement React, ARIA, CSS, tokens, modal behavior, menu drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or broader Phase D states. Phase D CSS remains blocked. | Accessibility states, interaction state recipes, modal/accessibility UI readiness, player shell token adoption, and visual-token stream |
| Player shell modal accessibility behavior specification | Created `docs/player-shell-modal-accessibility-behavior-specification.md`. | Specifies expected future behavior models: Glossary, Resources, and Accessibility as modal dialogs; Menu as a navigation drawer; Help as a deferred coachmark/instructional overlay decision. It defines expected accessible structure, focus movement, focus return, focus containment, close behavior, launcher ARIA readiness, Menu drawer rules, HelpOverlay rules, future implementation order, QA requirements, and stop conditions. | Does not implement React, ARIA, CSS, tokens, focus behavior, modal behavior, menu drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or broader Phase D states. Phase D CSS remains blocked. | Accessibility states, modal/accessibility UI readiness, interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell modal/drawer behavior implementation specification | Created `docs/player-shell-modal-drawer-behavior-implementation-spec.md`. | Defines future implementation slices: Slice 1 shared modal focus return and focus containment for Glossary, Resources, and Accessibility; Slice 2 stable modal root IDs and launcher ARIA preparation; Slice 3 Menu drawer behavior readiness; Slice 4 launcher ARIA implementation; later current-state CSS readiness. Recommends Slice 1 as the first future implementation candidate. | Does not implement React, ARIA, CSS, tokens, focus behavior, modal behavior, drawer behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or Phase D CSS. Menu remains separate and HelpOverlay remains deferred. | Accessibility states, modal/accessibility UI readiness, interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell modal focus return and containment implementation and QA | Added a shared player-scoped focus containment hook and wired it to Glossary, Resources, and Accessibility modals; QA documented in `docs/player-shell-modal-focus-return-containment-qa.md`. | Verifies `npm run build` passed with only the existing Vite large-chunk warning; route QA passed at `1440x900`, `768x900`, and `390x844`; focus moves into each modal on open; `Tab`/`Shift+Tab` stay inside the active modal; Escape, close icon, footer close, and outside-click close remain available; focus returns to the launching sidebar button; Resources placeholder download behavior remains unchanged by source review. | Does not add launcher ARIA, stable modal root IDs, CSS, tokens, Menu drawer behavior, HelpOverlay behavior, Captions/transcript changes, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or Phase D CSS. | Accessibility states, modal/accessibility UI behavior, player shell token adoption, and QA evidence |
| Player shell modal root ID and launcher ARIA readiness | Created `docs/player-shell-modal-root-id-launcher-aria-readiness.md`. | Prepares Slice 2 for Glossary, Resources, and Accessibility by proposing stable modal root IDs, conditional `aria-controls`, `aria-expanded`, `aria-haspopup="dialog"`, and future dynamic label patterns. It recommends `player-glossary-modal`, `player-resources-modal`, and `player-accessibility-modal` while preserving `glossary-modal-title`, `resources-modal-title`, and `a11y-modal-title`. | Does not implement React, ARIA, CSS, tokens, root IDs, focus behavior, modal behavior, Menu drawer behavior, HelpOverlay behavior, Captions/transcript changes, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or Phase D CSS. | Accessibility states, modal/accessibility UI readiness, interaction state recipes, player shell token adoption, and visual-token stream |
| Player shell modal root ID and launcher ARIA implementation and QA | Added stable modal root IDs to Glossary, Resources, and Accessibility; added bounded launcher `aria-expanded`, conditional `aria-controls`, `aria-haspopup="dialog"`, and dynamic open/close accessible labels for those three sidebar buttons; QA documented in `docs/player-shell-modal-root-id-launcher-aria-qa.md`. | Verifies `npm run build` passed with only the existing Vite large-chunk warning; route QA passed at `1440x900`, `768x900`, and `390x844`; closed launchers omit `aria-controls`; open launchers point to matching mounted modal root IDs; existing dialog/title semantics remain; Slice 1 focus containment and focus return still pass for Escape, close icon, footer close, and outside-click close. | Does not implement CSS, edit token files, change Menu drawer, HelpOverlay, Captions/transcript, Resources placeholder download behavior, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, Phase D CSS, or broader state migration. | Accessibility states, modal/accessibility UI behavior, interaction state recipes, player shell token adoption, and QA evidence |
| Independent Slice 2 modal root ID and launcher ARIA evaluation | Created `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`. | Independently evaluates implementation commit `87c146bed247a0d5e163148eceb55ab729447df8` and QA note `docs/player-shell-modal-root-id-launcher-aria-qa.md`; records PASS for bounded file scope, stable unique root IDs, preserved title IDs and dialog semantics, conditional valid `aria-controls`, scoped `aria-haspopup="dialog"`, accurate dynamic labels, absent `aria-current`, intact Slice 1 focus behavior, and unchanged CSS/token/Menu/Help/Captions/routing/progress/content areas. | Does not implement React, ARIA, CSS, tokens, focus behavior, modal behavior, Menu drawer behavior, HelpOverlay behavior, Captions/transcript changes, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, or Phase D CSS. | Accessibility states, modal/accessibility UI behavior, interaction state recipes, player shell token adoption, and QA evidence |
| Menu drawer behavior implementation specification | Created `docs/player-shell-menu-drawer-behavior-implementation-spec.md`. | Documents current Menu drawer behavior from read-only inspection: inline rendering in `CoursePlayerShell.tsx`, opening through the sidebar Menu launcher, outside-click close, screen-selection close, no Escape close found, no dedicated close button, no focus movement, no focus containment, and no explicit focus return. It classifies Menu as a navigation drawer, not a modal dialog or route-current control, and records STOP readiness because close-button/no-CSS path and screen-selection focus destination are unclear. | Does not implement React, ARIA, CSS, tokens, drawer behavior, Menu launcher ARIA, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, HelpOverlay, modal dialogs, Captions/transcript, or Phase D CSS. | Accessibility states, modal/accessibility UI readiness, interaction state recipes, player shell token adoption, and visual-token stream |
| Menu drawer close affordance and focus destination decision | Created `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md`. | Resolves the Menu behavior blockers enough to record PASS WITH CAUTION. It decides the dedicated close button is not ready without a separate drawer header/design/CSS decision, and identifies the existing `main.player-main-content` course content landmark as the safest future post-screen-selection focus destination after making it programmatically focusable. | Does not implement React, ARIA, CSS, tokens, focus movement, focus return, drawer behavior, close button, Menu launcher ARIA, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, HelpOverlay, modal dialogs, Captions/transcript, or Phase D CSS. | Accessibility states, modal/accessibility UI readiness, interaction state recipes, player shell token adoption, and visual-token stream |

## 5. Current Progress Estimate

These estimates are planning controls, not completion claims.

| Scope | Estimated progress | Explanation |
| --- | --- | --- |
| Visual token/player-shell adoption stream | About 67 percent | Token files, CSS wiring, shell aliases, surfaces, text/icons, base buttons, Phase B state/modal inventory, bounded player shell focus-visible adoption, interaction-state recipe specification, hover-on-dark token/alias decision, hover-on-dark token category specification, hover-on-dark token value proposal, hover-on-dark token-file implementation, token-file QA, bounded non-danger hover CSS implementation, route QA, Phase D readiness documentation, current-on-inverse token/category decision, active/current sidebar accessibility semantics review, current-on-inverse token value proposal, current-on-inverse token-file QA, React/accessibility implementation spec, Captions/transcript React/accessibility QA, modal/drawer behavior review, modal accessibility behavior specification, modal/drawer implementation specification, scoped modal focus return/containment implementation and QA, modal root ID/launcher ARIA readiness, bounded modal root ID/launcher ARIA implementation and QA, independent Slice 2 evaluation, Menu drawer behavior implementation specification, and Menu drawer close/focus decision are done. Implementation remains paused for Phase D CSS, hover beyond this slice, Menu launcher ARIA, HelpOverlay behavior, prevention gates, global/course focus, and broader shell QA. |
| Full protected premium visual design system | About 26 percent | Governance, visual foundations, token spec, and partial shell adoption exist. Theme packs, reusable components, full state recipes, asset implementation, screen recipes, and automated prevention are not complete. |
| Full AI-assisted CSO Learning Hub product system | About 15 percent | Core governance docs exist, but components, blocks, templates, AI production enforcement, course content migration, vertical slice, accessibility behavior, and scale-up gates are not complete. |

The whole-system percentage is lower because documents and token adoption are only part of the product system. Components, blocks, templates, state recipes, AI enforcement, accessibility behavior, asset governance in implementation, and vertical slice validation remain open.

## 6. Risk Register

| Risk | Description | Severity | Current control | Next control action |
| --- | --- | --- | --- | --- |
| False sense of progress | Narrow token/player-shell progress may be mistaken for whole-system completion. | High | This alignment document separates master plan from stream progress. | Require this file in future prompts and update it after each phase. |
| Token tunnel vision | Work may continue replacing colors while ignoring components, states, templates, and learning design. | High | Token adoption audit, Phase B/Phase C evidence, state recipe decision, interaction-state recipe specification, hover-on-dark token/alias decision, hover category specification, token-file QA, and bounded hover CSS QA recommend bounded migration order. | Keep broader implementation paused and require a separate decision/scope before any next state area. |
| Hover/state scope containment | Bounded non-danger player shell hover, Captions/transcript semantics, scoped modal focus return/containment, and scoped modal root ID/launcher ARIA are complete and independently evaluated for Slice 2, but hover beyond this slice, broader state migration, Menu launcher ARIA, HelpOverlay behavior, and high-contrast state application remain open. | Medium | `docs/player-shell-hover-on-dark-css-implementation-qa.md` verifies exact selector scope, token usage, build pass, route QA, unchanged focus-visible behavior, unchanged danger samples, and no scoped high-contrast selector changes because none existed for this bounded hover area. `docs/player-shell-navigation-state-implementation-readiness.md` documents Phase D state boundaries before CSS. `docs/player-shell-current-on-inverse-token-category-decision.md` defines current-state categories. `docs/player-shell-active-current-sidebar-accessibility-semantics-review.md` documents semantics findings. `docs/player-shell-current-on-inverse-token-value-proposal.md` proposes values. `docs/player-shell-current-on-inverse-token-file-qa.md` verifies token-file implementation and no selector usage. `docs/player-shell-active-current-sidebar-react-accessibility-implementation-spec.md` defines the React/accessibility slice. `docs/player-shell-captions-transcript-accessibility-qa.md` verifies that slice. `docs/player-shell-modal-drawer-behavior-review.md`, `docs/player-shell-modal-accessibility-behavior-specification.md`, `docs/player-shell-modal-drawer-behavior-implementation-spec.md`, `docs/player-shell-modal-focus-return-containment-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-readiness.md`, `docs/player-shell-modal-root-id-launcher-aria-qa.md`, `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`, `docs/player-shell-menu-drawer-behavior-implementation-spec.md`, and `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` define, verify, or classify scoped modal/drawer behavior before broader work. | Keep Phase D CSS blocked. A future Menu drawer behavior slice may proceed only within the PASS WITH CAUTION guardrails; HelpOverlay and broader state work remain blocked. |
| Accessibility states still legacy | Player shell focus-visible, Captions/transcript disclosure semantics, Glossary/Resources/Accessibility focus return/containment, and scoped Glossary/Resources/Accessibility launcher ARIA/root IDs passed QA and Slice 2 independent evaluation. Menu drawer close/focus readiness is PASS WITH CAUTION, but Menu launcher ARIA and broader states remain legacy. Global focus, course-screen focus, Menu drawer ARIA, HelpOverlay ARIA, disabled, selected/current, locked, completed, active, danger, and other state styles still include legacy styling. | Medium-high | Token spec defines state requirements; Phase C QA confirms the bounded player shell focus slice; interaction-state recipe specification, Phase D readiness note, current-on-inverse category decision, active/current sidebar semantics review, current value proposal, current token-file QA, React/accessibility implementation spec, Captions/transcript QA, modal/drawer behavior review, modal behavior specification, modal/drawer implementation spec, modal focus return/containment QA, Slice 2 readiness note, Slice 2 QA, Slice 2 evaluation, Menu drawer behavior specification, and Menu close/focus decision document remaining state gaps. | Keep broader accessibility state risk open until Menu behavior QA, Menu launcher ARIA decision/implementation, active/current selector implementation, disabled/completed/locked decisions, HelpOverlay decisions, and QA pass. |
| Modal/accessibility UI inline style clusters | Player modal/accessibility UI includes inline style clusters and behavior-sensitive dialog/focus patterns. Focus return, focus containment, stable root IDs, launcher ARIA, and independent Slice 2 evaluation are now complete for Glossary, Resources, and Accessibility. Menu drawer close/focus readiness is PASS WITH CAUTION, but dedicated close button styling, Menu launcher ARIA, HelpOverlay behavior, and modal/accessibility styling remain unresolved. | High | Phase B inventory documents the affected modal/accessibility files and values; `docs/player-shell-modal-drawer-behavior-review.md` confirms partial dialog semantics and unclear Menu/Help behavior classification; `docs/player-shell-modal-accessibility-behavior-specification.md` defines expected behavior models and requirements; `docs/player-shell-modal-drawer-behavior-implementation-spec.md` recommends bounded implementation slices; `docs/player-shell-modal-focus-return-containment-qa.md` verifies Slice 1 behavior; `docs/player-shell-modal-root-id-launcher-aria-readiness.md` prepares Slice 2; `docs/player-shell-modal-root-id-launcher-aria-qa.md` verifies Slice 2; `docs/player-shell-modal-root-id-launcher-aria-evaluation.md` independently evaluates Slice 2 as PASS; `docs/player-shell-menu-drawer-behavior-implementation-spec.md` records Menu STOP readiness; `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` records PASS WITH CAUTION after resolving the focus destination and blocking dedicated close button work pending design/CSS approval. | Do not treat modal/accessibility UI as CSS-only migration. A future Menu behavior slice may proceed only without dedicated close button work unless separately approved; Menu launcher ARIA and HelpOverlay remain separate. |
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

Create a bounded Menu drawer behavior implementation task only if it follows `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` and excludes the dedicated close button, Menu launcher ARIA, CSS, tokens, HelpOverlay, modal dialogs, Captions/transcript, routing, progress, assessment, certificate logic, accessibility toolbar behavior, course screens, module CSS, assets, content, old HRBA files, and Phase D CSS.

The bounded non-danger player shell hover-on-dark CSS slice is complete and documented in `docs/player-shell-hover-on-dark-css-implementation-qa.md`.

The current-on-inverse token-file implementation is complete and verified in `docs/player-shell-current-on-inverse-token-file-qa.md`, but no CSS selector usage exists yet.

The Captions/transcript React/accessibility semantics slice is complete and verified in `docs/player-shell-captions-transcript-accessibility-qa.md`.

The modal focus return and focus containment Slice 1 is complete and verified in `docs/player-shell-modal-focus-return-containment-qa.md`.

The Slice 2 root ID and launcher ARIA readiness note is complete in `docs/player-shell-modal-root-id-launcher-aria-readiness.md`, the implementation/QA note is complete in `docs/player-shell-modal-root-id-launcher-aria-qa.md`, and the independent evaluation is complete in `docs/player-shell-modal-root-id-launcher-aria-evaluation.md`.

Slice 2 verifies and independently evaluates:

- modal root IDs: `player-glossary-modal`, `player-resources-modal`, and `player-accessibility-modal`;
- preserved existing title IDs: `glossary-modal-title`, `resources-modal-title`, and `a11y-modal-title`;
- `aria-expanded` for the three scoped launchers;
- conditional `aria-controls` only while each conditionally rendered modal is mounted;
- `aria-haspopup="dialog"` for those three scoped modal launchers;
- dynamic open/close accessible labels for Glossary, Resources, and Accessibility;
- build pass with only the existing Vite large-chunk warning;
- route QA at `1440x900`, `768x900`, and `390x844`;
- Slice 1 focus containment and focus return still pass;
- Menu drawer, HelpOverlay, Captions/transcript, CSS, token work, routing, progress, assessment, certificate logic, accessibility toolbar behavior, content, assets, course screens, module CSS, and old HRBA files stayed out of scope.
- PASS result for independent evaluation of implementation commit `87c146bed247a0d5e163148eceb55ab729447df8`.

The Captions/transcript QA confirms:

- `aria-expanded={transcriptVisible}` is implemented on the Captions button;
- `aria-controls` is conditional while hidden because the transcript panel is unmounted;
- the visible state links `aria-controls="player-transcript-panel"` to `id="player-transcript-panel"`;
- keyboard navigation reaches the Captions button at desktop, tablet, and mobile viewports;
- no CSS, token files, modal launcher ARIA, menu drawer ARIA, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, or old HRBA files changed.

The modal/drawer behavior review exists at `docs/player-shell-modal-drawer-behavior-review.md`.

It finds:

- Glossary, Resources, and Accessibility originally had partial dialog semantics, Escape close, outside-click close, close controls, and initial focus movement; Slice 1 now adds focus return and focus containment for those three dialogs and is verified in `docs/player-shell-modal-focus-return-containment-qa.md`;
- Menu behaves like a drawer inside a fixed overlay and needs drawer behavior specification before ARIA;
- Help Guide is a mixed full-screen overlay/coachmark and needs behavior classification before ARIA;
- broad `.player-sidebar-button.is-active` current-state CSS remains unsafe because `.is-active` mixes modal-open, drawer-open, and disclosure-open meanings.

The modal accessibility behavior specification exists at `docs/player-shell-modal-accessibility-behavior-specification.md`.

It specifies:

- Glossary, Resources, and Accessibility should be treated as modal dialogs;
- Menu should be treated as a navigation drawer, not a route-current control;
- Help Guide should remain deferred until its coachmark/instructional overlay model is decided;
- future modal work must define focus movement, focus containment, focus return, close behavior, stable root IDs, and launcher ARIA readiness before implementation;
- `.player-sidebar-button.is-active` current-state CSS remains unsafe because `.is-active` still mixes modal-open, drawer-open, and disclosure-open meanings.

Phase D CSS remains blocked. Menu drawer ARIA and HelpOverlay ARIA remain blocked pending separate behavior classification, implementation readiness, and separately approved implementation tasks.

The modal/drawer behavior implementation specification exists at `docs/player-shell-modal-drawer-behavior-implementation-spec.md`.

It defines future implementation slices. The first two scoped slices are now complete:

- Slice 1: shared modal focus return and focus containment for Glossary, Resources, and Accessibility only - complete and QA passed;
- Slice 2: stable modal root IDs and launcher ARIA for those three modals - implementation complete and QA passed;
- Slice 3: Menu drawer behavior specification and implementation readiness;
- Slice 4: launcher ARIA implementation only after behavior slices pass;
- later: current-state CSS readiness check.

Menu drawer implementation remains separate. HelpOverlay remains deferred until its coachmark/instructional overlay model is resolved.

Phase D CSS remains blocked. Launcher ARIA beyond Glossary, Resources, and Accessibility remains blocked until separate readiness and implementation tasks are approved.

The Menu drawer behavior implementation specification is complete in `docs/player-shell-menu-drawer-behavior-implementation-spec.md` and records STOP readiness.

It finds:

- Menu is a navigation drawer, not a modal dialog and not a route-current control;
- `aria-current` must not be used on the sidebar Menu button;
- current close paths are outside-click, screen selection, and toggling the Menu launcher;
- no Menu-specific Escape close, dedicated close button, focus movement, focus containment, or explicit focus return was found;
- ordinary close should return focus to the Menu launcher;
- screen selection currently updates `currentScreenId` and closes the drawer;
- the focus destination after screen selection is unclear;
- adding a dedicated close button may require CSS/layout decisions;
- no React, ARIA, CSS, token, routing, progress, or behavior implementation was done.

The Menu drawer close affordance and focus destination decision is complete in `docs/player-shell-menu-drawer-close-affordance-focus-destination-decision.md` and records PASS WITH CAUTION.

It decides:

- a dedicated close button is not ready without a separate drawer header/design/CSS decision;
- the future close button label and accessible name should be `Close menu` if later approved;
- ordinary close should return focus to the Menu launcher;
- after screen selection, focus should move to the existing `main.player-main-content` course content landmark after a narrow future task makes it programmatically focusable;
- this focus destination can be implemented without routing, progress, assessment, certificate, screen completion, or `currentScreenId` logic changes;
- no React, ARIA, CSS, token, focus, routing, progress, or behavior implementation was done.

Recommended next task: create a bounded Menu drawer behavior implementation task that excludes the dedicated close button unless separately approved. Menu launcher ARIA remains separate. HelpOverlay remains deferred. Phase D CSS remains blocked.

Any future current-state CSS implementation task must identify one state area, one selector family, one validation route, and one QA note. It must not treat the completed hover slice, readiness note, category decision, semantics review, value proposal, token-file QA, React/accessibility spec, or Captions/transcript implementation as approval for broader state migration.

Explicitly keep these out of scope for the next step:

- CSS active/current implementation;
- modal launcher React/accessibility implementation beyond Glossary, Resources, and Accessibility;
- menu drawer React/accessibility implementation;
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

No CSS, token files, routing, progress, assessment, accessibility toolbar behavior, asset, content, or old course file should be changed during the next bounded Menu drawer behavior task. The task must also avoid Menu launcher ARIA and dedicated close button work unless separately approved.

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
