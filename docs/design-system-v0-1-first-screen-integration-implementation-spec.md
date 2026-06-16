# Design System v0.1 First Screen Integration Implementation Specification

## 1. Purpose

This document specifies a future first screen integration implementation slice for Design System v0.1. It does not approve or perform implementation.

The goal is to identify the smallest safe screen integration target set, or, if current target selection is not yet safe, to define a pre-micro-slice integration plan that can prepare exact targets without changing code.

This specification is documentation-only. It does not integrate templates into course screens, migrate content, change routes, change progress, change completion logic, edit CSS, edit tokens, implement Module 2 micro-slice work, implement vertical slice screens, add behavior-heavy blocks, or scale the design system.

## 2. Current Foundation Available

The approved Design System v0.1 foundation currently includes:

- `Callout`
- `Card`
- `Button`
- `LearningBlockFrame`
- `ConceptExplanationBlock`
- `KeyMessageBlock`
- `ConceptIntroductionTemplate`
- `FrameworkExplanationTemplate`
- `KeyMessageSummaryTemplate`

The first three templates are structural, read-only, instructional, and behavior-free. They compose approved blocks and primitives, exclude `Button`, and do not own routing, progress, completion, assessment, storage, feedback state, learner input, selected/current state, or screen integration.

## 3. Source Evidence Reviewed

This specification reviewed:

- `docs/design-system-v0-1-screen-template-usage-heading-readiness.md`
- `docs/design-system-v0-1-first-screen-template-implementation-evaluation.md`
- `docs/design-system-v0-1-first-screen-template-implementation-qa.md`
- `docs/design-system-v0-1-first-screen-template-implementation-spec.md`
- `docs/design-system-v0-1-concept-key-message-block-implementation-evaluation.md`
- `docs/design-system-v0-1-concept-key-message-block-implementation-qa.md`
- `docs/design-system-v0-1-learning-block-frame-implementation-evaluation.md`
- `docs/design-system-v0-1-primitive-usage-boundaries.md`
- `docs/design-system-v0-1-learning-block-template-map.md`
- `docs/screen-template-register.md`
- `docs/learning-block-register.md`
- `docs/design-system-v0-1-qa-evidence-pack.md`
- `docs/design-system-plan-progress-alignment.md`
- Read-only inspection of current Module 2 and player screen patterns.

Key findings:

- The heading readiness note records `PASS WITH CAUTION`.
- `PlayerHeader` renders module title as `h2` and screen title as non-heading text.
- `MainScreenCanvas` provides a generic `main` landmark with `aria-label="Course screen content"`.
- Many current course screens own their own `h1` inside screen content.
- Some current course screens render nested `main` landmarks under `MainScreenCanvas`.
- The safe future heading path is wrapper-owned `h1`, template `screenTitle` as `h2`, and heading-neutral blocks.
- The learning block/template map recommends a later Module 2 micro-slice around rights-holders, duty-bearers, and participation, but does not approve implementation.

## 4. Read-Only Target Screen Discovery

Read-only discovery focused on candidate screens that could plausibly use the first three templates:

- Read-only/instructional screens.
- Concept introduction, framework explanation, or key message/summary screens.
- No behavior-heavy interaction.
- No reflection capture.
- No knowledge check.
- No scenario decision.
- No assessment or certificate behavior.
- No progress-gated or Continue/Next dependency.
- No learner input or storage.
- No unstable custom visual asset dependency.
- Low heading/landmark risk.

The strongest content themes remain Module 2 rights-holders, duty-bearers, role clarity, and participation. However, the current exact Module 2 implementation surfaces for those themes are not clean read-only candidates. They commonly include one or more of:

- card flipping;
- tab or reveal interaction;
- selected/choice state;
- progress completion state;
- Continue gating;
- direct `window.history.pushState`;
- `currentScreenId` mutation;
- visual asset dependency;
- modal or dialog behavior;
- inline visual styles or module-specific CSS.

Because exact target screens are not yet safe enough, this specification selects a pre-micro-slice integration plan instead of a future implementation-ready exact target set.

## 5. Candidate Target Screen Assessment Table

| Candidate screen / route / file path | Current heading pattern | Current landmark pattern | Current content purpose | Likely approved template | Allowed approved blocks | Why it is low-risk or not low-risk | Risks | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| M2-S03 / `/module-2/screen-2-3` / `src/components/course/Module2EverydayClaimsResponsibilities.tsx` | Screen content has an `h1` for "Human Rights as Everyday Claims and Responsibilities"; read-only inspection did not find a stable wrapper-owned `h1` separate from the screen body. | Renders a screen-level `main`; this may be nested under `MainScreenCanvas`'s `main`. | Introduces everyday rights claims and responsibilities through six dimension cards. | `FrameworkExplanationTemplate` if reduced to one or two concepts; otherwise not a fit yet. | `ConceptExplanationBlock`, optional `KeyMessageBlock`. | Content is concept/framework-adjacent, but current implementation uses flip cards, progress, completion state, Continue gating, state persistence, inline visual styling, and route movement. | Behavior-heavy, progress-gated, route/progress state risk, content too broad for current two-concept framework template. | Defer. |
| M2-S07 / `/module-2/screen-2-7` / `src/components/course/Module2WorkingPrinciples.tsx` | `main` labelled by `h1` for "The Five HRBA Working Principles in Everyday CSO Work". | Renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Explains five HRBA working principles. | Not currently supported by the first three templates because `FrameworkExplanationTemplate` allows one or two concept blocks, not five. | None for first integration without changing template scope. | Content is instructional, but current screen uses tablist/reveal interaction, progress state, completion, and route movement. | Behavior-heavy and template capacity mismatch. | Defer. |
| M2-S08 / `/module-2/screen-2-8` / `src/components/course/Module2RightsHoldersMap.tsx` | `main` labelled by `h1` for "Rights-Holders: Moving Beyond 'The Community'". | Renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Introduces rights-holder diversity and barriers through a map/hotspot-like actor ecosystem. | `ConceptIntroductionTemplate` only if reduced to a single read-only concept; otherwise not yet safe. | `ConceptExplanationBlock`, optional `KeyMessageBlock`. | Theme is strong for the micro-slice, but the current file uses an actor-map image, opened hotspot state, progress, completion state, and route movement. | Asset dependency, behavior-heavy hotspot/reveal pattern, progress/routing state risk. | Defer. |
| M2-S10 / `/module-2/screen-2-10` / `src/components/course/Module2ActorEcosystemRoles.tsx` | Uses `Module2CompactRevealScreen`, which renders a screen-level `main` and `h1`. | `Module2CompactRevealScreen` renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Explains rights-holders, duty-bearers, influencing actors, and the CSO role. | `FrameworkExplanationTemplate` for a future two-part relationship explanation, or a later expanded template. | `ConceptExplanationBlock`, optional `KeyMessageBlock`. | Excellent content match, but current screen is compact reveal plus choice check. | Tablist/reveal behavior, selected radio-like choice state, feedback, completion gating, route movement. | Defer; use as content evidence for a pre-micro-slice mapping note. |
| M2-S11 / `/module-2/screen-2-11` / `src/components/course/Module2CSORoleEcosystem.tsx` | Uses `Module2CompactRevealScreen`, which renders a screen-level `main` and `h1`. | `Module2CompactRevealScreen` renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Explains the bounded CSO role in the rights-based ecosystem. | `ConceptIntroductionTemplate` or `FrameworkExplanationTemplate` only after content reduction. | `ConceptExplanationBlock`, optional `KeyMessageBlock`. | Content is relevant, but current implementation is reveal/choice/progress driven. | Behavior-heavy, selected state, feedback, completion, routing. | Defer. |
| M2-S12 / `/module-2/screen-2-12` / `src/components/course/Module2SafeStandardsUse.tsx` | Uses `Module2CompactRevealScreen`, which renders a screen-level `main` and `h1`. | `Module2CompactRevealScreen` renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Explains safe use of human rights standards. | `FrameworkExplanationTemplate` only if reduced to one or two safe-use concepts. | `ConceptExplanationBlock`, optional `KeyMessageBlock`. | Instructional content is promising, but not in the rights-holder/duty-bearer/participation first path and still behavior-heavy. | Reveal/choice/progress/routing behavior. | Defer. |
| M2-S14 / `/module-2/screen-2-14` / `src/components/course/Module2ParticipationAttendance.tsx` | Uses `Module2CompactRevealScreen`, which renders a screen-level `main` and `h1`. | `Module2CompactRevealScreen` renders a screen-level `main`; current player already provides `MainScreenCanvas` main. | Explains meaningful participation beyond attendance. | `KeyMessageSummaryTemplate` for a later summary, or `ConceptIntroductionTemplate` for a static concept introduction. | `ConceptExplanationBlock`, `KeyMessageBlock`. | Strong content match, but current screen includes reveal interaction, choice check, selected state, feedback, completion gating, and route movement. | Behavior-heavy and progress-gated. | Defer; use as content evidence for a pre-micro-slice mapping note. |

## 6. Selected Tiny Target Set

Selected outcome: **Outcome B - pre-micro-slice integration plan**.

Readiness result: **PASS WITH CAUTION**.

No exact implementation target set is selected in this specification. Current candidate screens contain strong content evidence, but they are not safe first implementation targets because their current code mixes explanation with reveal, choice, progress, completion, route movement, state persistence, visual asset, and landmark concerns.

The selected pre-micro-slice plan is a documentation-only target selection/content mapping note for three static screen concepts:

1. Rights-holders as people with rights, voice, and claims.
2. Duty-bearers and CSO role clarity.
3. Meaningful participation beyond attendance.

That future note must decide whether these concepts map to existing routes, new wrapper-only target screens, or a later micro-slice plan. It must not implement screens.

## 7. Route Wrapper And Heading Strategy

Any future implementation must use this route wrapper and heading strategy:

- The route/screen wrapper owns the primary `h1`.
- Templates keep `screenTitle` as `h2` only after wrapper-owned `h1` is confirmed.
- Blocks remain heading-neutral.
- No duplicate `h1`.
- No skipped heading levels without a documented reason.
- No nested `main` landmark unless explicitly justified.
- The main content landmark remains meaningful.
- Target screen integration must document `aria-labelledby` or accessible landmark naming if changed.

If the selected target route cannot confirm wrapper-owned `h1`, the future implementation must stop.

For the current codebase, a direct integration into current Module 2 screen files would likely remove or replace screen-level `main`/`h1` structures and behavior. That is not approved here and needs a later specification if selected.

## 8. Template-To-Target Mapping

Because this specification selects a pre-micro-slice plan, the following mappings are screen concepts rather than implementation targets.

| Pre-micro-slice concept | Learning purpose | Selected template | Allowed blocks | Content slots | Heading ownership | Main landmark handling | What must not change |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rights-holders as people with rights, voice, and claims | Introduce rights-holder language before comparison or actor mapping. | `ConceptIntroductionTemplate` | `ConceptExplanationBlock`, optional `KeyMessageBlock` | Eyebrow, wrapper `h1`, template `screenTitle` `h2`, concept title, concise explanation, practical CSO example, optional key message. | Wrapper owns `h1`; template owns only `h2`; blocks neutral. | Do not add a nested `main`; wrapper/route must document existing `MainScreenCanvas` relationship. | No content migration, no old layout copy, no asset dependency, no progress/completion/routing change. |
| Duty-bearers and CSO role clarity | Explain how responsibility, support, and CSO boundaries relate. | `FrameworkExplanationTemplate` | One or two `ConceptExplanationBlock` instances, optional `KeyMessageBlock` | Eyebrow, wrapper `h1`, template `screenTitle` `h2`, introduction, concept 1 duty-bearer responsibility, concept 2 bounded CSO support, optional key message. | Wrapper owns `h1`; template owns only `h2`; concept blocks do not own hierarchy. | Do not add a nested `main`; use labelled wrapper/section only if needed. | No choice check, no feedback, no state, no route movement, no new framework template capacity. |
| Meaningful participation beyond attendance | Summarize the takeaway that attendance alone does not prove participation. | `KeyMessageSummaryTemplate` | `KeyMessageBlock` only, optional explanation | Eyebrow, wrapper `h1`, template `screenTitle` `h2`, message title, message, short explanation. | Wrapper owns `h1`; template owns only `h2`; key message is not alert/live. | Do not add a nested `main`; preserve meaningful main content relationship. | No reveal interaction, no selected state, no feedback, no progress/completion/routing change. |

## 9. Content Mapping Rules

Future integration must use existing learner-facing content only unless a separate content rewrite task is approved.

Future integration must not:

- Rewrite HRBA content during integration.
- Invent new examples, cases, interactions, or assets.
- Migrate Module 2 micro-slice content under this specification.
- Copy old screen code directly into templates.

If existing content is too long, too interactive, too asset-dependent, or does not fit the approved templates, stop and document the content adaptation need.

The next documentation-only mapping note may quote or paraphrase current content sources for slot planning, but it must not migrate content into implementation files.

## 10. Completion/Progress/Routing Boundary

This specification approves no completion logic, no progress movement, no lock/unlock behavior, no `currentScreenId` behavior changes, and no route changes.

Future implementation must not add:

- Continue/Next behavior.
- Assessment, scoring, retry, validation, feedback, storage, or certificate behavior.
- Learner input or persistence.
- Progress gating.
- Screen completion markers.

Integration must preserve existing course/player routing behavior unless a later implementation task explicitly lists and approves a route/progress boundary.

## 11. Visual/CSS/Token Boundary

This specification approves:

- No token edits.
- No global CSS edits.
- No template CSS edits unless a future implementation task explicitly approves scoped design-system CSS changes.
- No raw colors.
- No gradients.
- No shadows.
- No broad `.is-active`.
- No Phase D/current-state selectors.
- No module-specific selectors.
- No inline visual style objects.

Future integration should use existing approved component/template CSS only. If new styling is required, stop and create a separate CSS/token readiness note.

## 12. Accessibility Requirements For Future Implementation

Future implementation must satisfy:

- One clear primary `h1` in the target screen route/wrapper.
- Template `screenTitle` as `h2` only below confirmed `h1`.
- Heading-neutral blocks.
- No duplicate primary headings.
- No nested `main` landmark unless explicitly justified.
- Logical reading order.
- No alert/live-region behavior for `KeyMessageBlock`.
- No focus management by templates.
- No keyboard traps.
- No color-only meaning.
- Desktop/tablet/mobile usability for selected target route(s).
- No HelpOverlay changes. If screen help metadata is needed, document it separately.

## 13. File Architecture For Future Implementation

Likely future implementation file options, if a later task approves implementation:

- One selected course screen file, only after exact route/screen target is documented.
- Possibly a small route/screen wrapper file if needed to own `h1` and prevent nested `main`.
- A QA note file for the implementation.
- `docs/design-system-plan-progress-alignment.md` update after implementation.

Files that should not be edited in the first implementation slice unless a defect is found and separately approved:

- `src/components/design-system/templates/*`
- `src/components/design-system/blocks/*`
- `src/components/design-system/design-system.css`
- token files
- global CSS
- route/progress files

If future implementation requires changing route/progress files, mark that as STOP or create a separate readiness gate.

## 14. Future Bounded Implementation Slice

This specification does not recommend implementation as the immediate next task.

If the future documentation-only mapping note later selects exact safe targets, the smallest possible implementation slice should be:

- Integrate approved template(s) into only the selected 1-3 read-only target screen(s).
- Use existing content only.
- Use route/screen wrapper-owned `h1`.
- Keep template `screenTitle` as `h2` below wrapper `h1`.
- Use only `ConceptExplanationBlock` and/or `KeyMessageBlock`.
- Exclude `Button`.
- Make no progress, completion, routing, current-screen, storage, assessment, feedback, or learner-input changes.
- Make no CSS or token edits.
- Use no behavior-heavy components.
- Create a QA note.
- Require independent evaluation afterward.

## 15. QA Plan For Future Implementation

Any future implementation task must run or record:

- `npm run build`.
- `git diff --check`.
- `git diff --cached --check`.
- Changed-file scope check.
- Route/headings/landmarks check.
- Template usage check.
- Approved block usage check.
- Import purity check.
- Visual drift check.
- Token/global CSS non-change check.
- Route/progress/completion non-change check.
- Desktop/tablet/mobile QA for selected target route(s).
- Screen reader/keyboard smoke check where feasible.
- QA note path.
- Alignment update.
- Independent evaluation afterward.

## 16. Stop Conditions For Future Implementation

Stop if:

- Selected target screen lacks a safe `h1`/wrapper strategy.
- Integration would create duplicate `h1` or nested `main` landmark problems.
- Integration requires route, progress, or completion changes.
- Integration requires Continue/Next behavior.
- Integration requires learner input, feedback, scoring, selected state, storage, validation, or retry.
- Integration requires behavior-heavy blocks.
- Integration requires token edits or global CSS.
- Integration requires new visual styling beyond existing approved template/component CSS.
- Integration requires rewriting HRBA content.
- Integration requires copying old screen code into templates.
- Integration touches unrelated screens.
- Build fails and cannot be fixed within the approved scope.

## 17. Readiness Result

Readiness result: **PASS WITH CAUTION**.

The first screen integration path is plausible, but no exact current screen is safe enough for immediate implementation. The next safe step is documentation-only target selection and content mapping for a pre-micro-slice plan.

## 18. Recommended Next Task

Create a documentation-only pre-micro-slice target selection/content mapping note for the three static concepts selected here:

- rights-holders as people with rights, voice, and claims;
- duty-bearers and CSO role clarity;
- meaningful participation beyond attendance.

The note should decide whether any exact current route can be safely selected for a later bounded implementation. It should also document source content, slot mapping, wrapper/heading plan, landmark handling, and stop conditions.

Do not recommend full vertical slice implementation yet. Do not recommend Module 2 micro-slice implementation yet. Do not recommend screen integration implementation until the mapping note selects exact target screens and all implementation boundaries are clear.

## 19. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it identify a tiny target set or pre-micro-slice integration plan? | Yes. It selects a pre-micro-slice integration plan. |
| Does it keep implementation blocked until review? | Yes. |
| Does it preserve wrapper-owned `h1` and template `h2` rules? | Yes. |
| Are blocks heading-neutral? | Yes. |
| Are templates still read-only and behavior-free? | Yes. |
| Is `Button` excluded? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes excluded? | Yes. |
| Are learner input, selected state, retry, validation, and persistence excluded? | Yes. |
| Are CSS and token edits excluded? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Is Module 2 micro-slice implementation still blocked? | Yes. |
| Is vertical slice implementation still blocked? | Yes. |
| Are behavior-heavy blocks still blocked? | Yes. |
| Is full scale-up still blocked? | Yes. |
