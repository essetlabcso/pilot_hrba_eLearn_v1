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

The current implementation work has made the player shell more token-driven, but it has not yet completed:

- focus states;
- hover, active, selected, completed, locked, or disabled states;
- modal and accessibility UI;
- hard-coded visual value prevention;
- accessible component library;
- screen-template implementation;
- learning-block implementation;
- vertical slice validation.

## 3. Master Plan to Progress Alignment Table

| Master plan area | Intended purpose | Current evidence | Current status | Gap | Risk level | Validated next action |
| --- | --- | --- | --- | --- | --- | --- |
| System Charter | Define system-first governance and boundaries. | `docs/system-charter.md` exists and was verified. | Complete | Must remain active in future prompts. | Low | Reference in all future implementation prompts. |
| Full platform/course audit | Identify infrastructure, legacy code, candidate migration areas, and design debt. | `docs/token-adoption-audit.md` and earlier repo audit work identify style entry points and risks. | Partial | Audit is visual/token focused; broader component/state inventory remains. | Medium | Run state/modal inventory before more UI migration. |
| Design foundations | Establish visual, premium, accessibility, story visual, and asset rules. | Visual foundations, premium visual standard, story visual standard, and asset register exist. | Partial | Rules exist, but implementation and evidence are incomplete. | Medium | Use these documents to review any future token, asset, or screen work. |
| Token foundation | Create approved token values and implementation-ready spec. | `docs/implementation-ready-token-specification.md`, `src/system/tokens/tokens.ts`, `src/system/tokens/tokens.css`. | Partial | Tokens exist, but not fully adopted and not backed by automated prevention. | Medium | Continue bounded adoption only after state/modal inventory. |
| Player shell token adoption | Bring player shell surfaces, text, icons, and base buttons under token control. | Token aliasing, cascade fix, surface/border adoption, text/icon adoption, button base adoption, and QA notes. | In progress | Focus, state, modal, hover, active, disabled, selected, completed, locked remain legacy. | Medium | Pause broad migration; inventory state and modal selectors next. |
| Interaction state recipes | Define and apply state rules for hover, active, selected, completed, locked, disabled, error, success, loading. | Component state requirements exist in token specification; legacy selectors remain. | Not started | No implementation-ready state inventory or recipe mapping yet. | High | Create documentation-only state/modal inventory. |
| Focus/accessibility states | Ensure visible, tokenized focus and keyboard affordances. | Focus tokens exist in token files and spec. | Partial | Focus styles are not yet adopted in player shell and state selectors. | High | After inventory, implement focus state token adoption as a bounded slice. |
| Modal/accessibility UI | Tokenize and QA modals and accessibility UI without breaking behavior. | `token-adoption-audit.md` identifies modal/accessibility UI as key area. | Not started | Selectors, states, and behavioral risks not inventoried. | High | Inventory modal/accessibility UI before implementation. |
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

## 5. Current Progress Estimate

These estimates are planning controls, not completion claims.

| Scope | Estimated progress | Explanation |
| --- | --- | --- |
| Visual token/player-shell adoption stream | About 45 percent | Token files, CSS wiring, shell aliases, surfaces, text/icons, base buttons, and route QA are done. Focus, interaction states, modals, prevention gates, and broader shell QA remain. |
| Full protected premium visual design system | About 25 percent | Governance, visual foundations, token spec, and partial shell adoption exist. Theme packs, reusable components, state recipes, asset implementation, screen recipes, and automated prevention are not complete. |
| Full AI-assisted CSO Learning Hub product system | About 15 percent | Core governance docs exist, but components, blocks, templates, AI production enforcement, course content migration, vertical slice, accessibility behavior, and scale-up gates are not complete. |

The whole-system percentage is lower because documents and token adoption are only part of the product system. Components, blocks, templates, state recipes, AI enforcement, accessibility behavior, asset governance in implementation, and vertical slice validation remain open.

## 6. Risk Register

| Risk | Description | Severity | Current control | Next control action |
| --- | --- | --- | --- | --- |
| False sense of progress | Narrow token/player-shell progress may be mistaken for whole-system completion. | High | This alignment document separates master plan from stream progress. | Require this file in future prompts and update it after each phase. |
| Token tunnel vision | Work may continue replacing colors while ignoring components, states, templates, and learning design. | High | Token adoption audit recommends bounded migration order. | Run state/modal inventory before another implementation slice. |
| Accessibility states still legacy | Focus, disabled, selected, locked, completed, error, and active states still include legacy styling. | High | Token spec defines state requirements. | Create state inventory, then adopt focus states first. |
| Course-screen governance still weak | Old course screens and screen-level CSS can continue to drive visual decisions. | High | Learning Block and Screen Template Registers exist. | Classify course-screen styles before screen migration. |
| Responsive issues may be systemic | Module 2 S02 CTA issue may be one example of broader container/overflow risk. | Medium | Route-specific triage/fix/QA completed. | Include responsive QA and stop conditions in every slice. |
| Cascade and legacy CSS risk | Large `global.css` and later duplicate definitions can override intended tokens. | High | Cascade fix and QA documented. | Search for duplicate overrides during each scoped migration. |
| AI may reintroduce drift without active control | AI can follow old patterns unless prompts enforce governance. | Medium | AI production contract and agent rules exist. | Future prompts must state master area, stream, scope, and update rule. |
| Hard-coded visual values may continue | Manual review can miss new raw values. | High | Manual diff checks have been used. | Add hard-coded visual value prevention phase. |

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

### Phase B: State and Modal Inventory

| Field | Detail |
| --- | --- |
| Objective | Inventory hover, focus, active, selected, completed, locked, disabled, modal, and accessibility UI selectors before migration. |
| Why it comes next | State and modal styling is the next highest-risk legacy area after base shell colors. |
| Files likely involved | New documentation file in `docs/`; read-only inspection of `src/styles/global.css`, player shell components, accessibility UI, modal-related files. |
| Files that must not be touched | CSS, React, token files, routing, progress, assessment, assets, old course files. |
| Acceptance criteria | Inventory lists selectors, current values, risk, token mapping readiness, missing token/state decisions, and recommended order. |
| Stop conditions | Stop if inventory requires edits, missing tokens, or uncertain behavior. |

### Phase C: Focus State Token Adoption

| Field | Detail |
| --- | --- |
| Objective | Adopt approved focus tokens for bounded player shell focus states. |
| Why it comes next | Keyboard visibility is an accessibility gate and should precede broader state migration. |
| Files likely involved | Likely `src/styles/global.css`, only after Phase B. |
| Files that must not be touched | React components, screens, module CSS, routing, progress, assets, assessment, old course files. |
| Acceptance criteria | Focus rings remain visible on light/dark surfaces; build passes; viewport QA passes; no hover/active/selected migration. |
| Stop conditions | Stop if focus behavior requires new component logic or missing tokens. |

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

Create a documentation-only state/modal inventory.

That inventory should inspect, without editing:

- player header button states;
- sidebar button states;
- active/current/selected states;
- completed and locked states;
- disabled states;
- focus states;
- modal and accessibility UI selectors;
- any legacy danger/success/warning state recipes.

The inventory should recommend the next bounded implementation slice. No CSS, React, token, routing, progress, assessment, accessibility toolbar, asset, or old course file should be changed during that inventory.

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

