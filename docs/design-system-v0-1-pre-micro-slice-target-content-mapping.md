# Design System v0.1 Pre-Micro-Slice Target Content Mapping

## 1. Purpose

This document prepares the smallest possible pre-micro-slice content map for a future bounded implementation. It does not approve implementation and does not perform implementation.

The goal is to translate three selected Module 2 learning concepts into safe, static, template-ready screen concepts using existing learner-facing content as source evidence:

- rights-holders as people with rights, voice, and claims;
- duty-bearers and CSO role clarity;
- meaningful participation beyond attendance.

This note is a planning boundary. It selects instructional concepts, maps likely source content, names template slots, and keeps exact route implementation blocked until a future readiness decision confirms target route, wrapper ownership, landmark handling, content adaptation, and no-behavior scope.

## 2. Current Foundation Available

The Design System v0.1 path currently includes these approved assets:

| Asset | Current safe role | Boundary |
| --- | --- | --- |
| `Callout` | Presentational primitive for short emphasis or contextual support. | No behavior ownership, no routing, no completion. |
| `Card` | Presentational primitive for grouped content. | Non-clickable unless future caller behavior is separately approved. |
| `Button` | Behavior-free action primitive. | Excluded from this pre-micro-slice mapping because no Continue/Next or learner action is approved. |
| `LearningBlockFrame` | Presentational structural wrapper for block composition. | Does not define learning behavior, completion, or headings. |
| `ConceptExplanationBlock` | Read-only instructional block for explaining one concept. | Heading-neutral; caller/template owns hierarchy. |
| `KeyMessageBlock` | Read-only instructional block for an important principle or takeaway. | Heading-neutral; no feedback or action state. |
| `ConceptIntroductionTemplate` | Structural, read-only screen template for one core concept. | Behavior-free and Button-free. |
| `FrameworkExplanationTemplate` | Structural, read-only screen template for related parts or a framework. | Behavior-free and Button-free; dynamic exploration remains excluded. |
| `KeyMessageSummaryTemplate` | Structural, read-only screen template for a takeaway or summary. | Behavior-free and Button-free. |

The first three screen templates remain structural, read-only, instructional, behavior-free, and Button-free. They do not own routing, progress, completion, assessment, feedback, learner input, storage, selected/current state, or screen integration.

## 3. Source Evidence Reviewed

This mapping uses read-only evidence from:

- `docs/design-system-v0-1-first-screen-integration-implementation-spec.md`;
- `docs/design-system-v0-1-screen-template-usage-heading-readiness.md`;
- `docs/design-system-v0-1-first-screen-template-implementation-spec.md`;
- `docs/design-system-v0-1-first-screen-template-implementation-qa.md`;
- `docs/design-system-v0-1-first-screen-template-implementation-evaluation.md`;
- `docs/design-system-v0-1-concept-key-message-block-implementation-qa.md`;
- `docs/design-system-v0-1-concept-key-message-block-implementation-evaluation.md`;
- `docs/design-system-v0-1-learning-block-frame-implementation-evaluation.md`;
- `docs/design-system-v0-1-primitive-usage-boundaries.md`;
- `docs/design-system-v0-1-learning-block-template-map.md`;
- `docs/learning-block-register.md`;
- `docs/screen-template-register.md`;
- current Module 2 source files inspected read-only.

The first screen integration specification found useful Module 2 content around the three target concepts, but did not select exact implementation routes because current screens include reveal/card/choice behavior, progress or completion state, route movement, asset dependency, or nested landmark risk.

The heading readiness note selected a future route/screen wrapper-owned `h1`, template `screenTitle` as `h2` after target-route verification, heading-neutral blocks, and explicit landmark handling. This mapping preserves that rule.

The learning block and screen template registers support Concept Explanation and Statement / Key Message blocks as low-risk read-only instructional patterns, while behavior-heavy blocks such as Scenario Decision, Reflection / Portfolio Capture, Knowledge Check, Hotspot / Labeled Graphic, Accordion / Tabs, and Continue / Completion Transition remain gated.

## 4. Source Module 2 Content Discovery

| Source file | Route/screen if identifiable | Content theme | Useful existing learner-facing phrases or ideas | Interaction/state dependencies found | Static reuse? | Risks |
| --- | --- | --- | --- | --- | --- | --- |
| `src/components/course/Module2RightsHoldersMap.tsx` | `M2-S08`, `/module-2/screen-2-8` | Rights-holders inside broad community labels. | The broad label "the community" hides different barriers, responsibilities, voice, risk, and access needs. Naming rights-holders clearly supports fairer outreach, participation, accessibility, information, and accountability. | Screen-level `main`, labelled `h1`, tablist/tabpanel style exploration, viewed-tab state, practice check state, progress/completion state, disabled CTA, `currentScreenId`, route movement, image asset `m2-s08-rights-holders-actor-map.png`. | Yes, as evidence for a static concept introduction after adaptation. | Exact route is not safe; asset/map and tab/hotspot-style dependencies must be deferred or replaced with static text evidence later. |
| `src/components/course/Module2EverydayClaimsResponsibilities.tsx` | `M2-S03`, `/module-2/screen-2-3` | Human rights as practical claims and responsibilities. | Rights show up as practical needs for information, access, voice, inclusion, responsibility, and response. | Flip/card pattern, progress/completion state, practice check state, route movement, inline screen implementation details. | Yes, as supporting evidence for rights, voice, and claims. | Too broad for one static screen unless shortened; behavior-heavy cards cannot be copied. |
| `src/components/course/Module2ActorEcosystemRoles.tsx` | `M2-S10`, `/module-2/screen-2-10` | Rights-holders, duty-bearers, influencing actors, and CSO support role. | Rights-holders are people affected with rights, voice, and claims. Duty-bearers have formal responsibility. Influencing actors shape access. CSOs can facilitate, document patterns safely, strengthen voice, connect actors, adapt practice, and support accountability without promising what they cannot control. | `Module2CompactRevealScreen`, reveal/tab pattern, choice check, selected state, feedback, completion state, route movement. | Yes, as primary evidence for a static framework explanation after adaptation. | Exact route is not safe; four-part actor map plus choice feedback must be shortened and made fully static. |
| `src/components/course/Module2CSORoleEcosystem.tsx` | `M2-S11`, `/module-2/screen-2-11` | CSO role clarity inside a rights-based ecosystem. | CSOs are not the only actor. They strengthen conditions for information, voice, safe engagement, accountability, connections, evidence, and adaptation while staying bounded. | `Module2CompactRevealScreen`, reveal/tab pattern, choice check, selected state, feedback, completion state, route movement. | Yes, as supporting evidence for the CSO role side of the duty-bearer concept. | Exact route is not safe; five CSO roles may overload one static screen and need condensation. |
| `src/components/course/Module2ParticipationAttendance.tsx` | `M2-S14`, `/module-2/screen-2-14` | Participation beyond attendance. | Attendance is a start, but a full room can hide weak information, low voice, closed decisions, or no response pathway. HRBA asks whether people could understand, speak, influence, and seek response. | `Module2CompactRevealScreen`, reveal/tab pattern, choice check, selected state, feedback, progress/completion state, route movement. | Yes, as primary evidence for a static key message summary after adaptation. | Exact route is not safe; four participation levels and choice feedback must become one static takeaway. |
| `src/components/course/Module2CompactRevealScreen.tsx` | Shared Module 2 compact reveal shell | Shared behavior and layout pattern used by several current screens. | Not used as learner-facing content. It provides boundary evidence about current behavior coupling. | Owns `main`, `h1`, reveal controls, progress card, choice state, feedback `aria-live`, disabled CTA, `onChangeState`, `currentScreenId`, `window.history.pushState`. | No, not as content. | Reuse would import behavior, progress, route movement, and nested landmark risk into the v0.1 path. |

## 5. Content Extraction Boundaries

Existing learner-facing content may be used only as evidence for future static planning. This task does not rewrite, improve, migrate, or implement content.

Rules for later adaptation:

- do not invent new examples, cases, learner activities, or visual assets;
- do not copy old screen code into templates;
- do not translate content into implementation files during this task;
- if source content is too long, identify the static core and shorten only in a future content adaptation task;
- if source content is tied to behavior, keep the underlying idea and defer the interaction;
- if instructional improvement is needed, document it as future content adaptation before implementation.

## 6. Pre-Micro-Slice Screen Concept Set

Exactly three static screen concepts are mapped.

### Screen Concept 1: Rights-Holders as People With Rights, Voice, and Claims

| Field | Mapping |
| --- | --- |
| Intended learner purpose | Help learners move from a broad "community" label to specific people who hold rights, have voice, and may have claims. |
| Source content evidence | `Module2RightsHoldersMap.tsx`, `Module2EverydayClaimsResponsibilities.tsx`, `Module2ActorEcosystemRoles.tsx`. |
| Learner should understand | Rights-holders are affected people, not a vague category; barriers to information, access, voice, inclusion, responsibility, and response affect whether claims can be made. |
| Approved template | `ConceptIntroductionTemplate`. |
| Approved blocks | `ConceptExplanationBlock`; optional `KeyMessageBlock` if the future screen needs a short takeaway. |
| Proposed content slots | Wrapper `h1`, template `screenTitle` as `h2`, concept title, short introduction, body/children explaining the static core, optional key message. |
| Heading/wrapper rule | Future route/screen wrapper owns the only primary `h1`; template `screenTitle` remains `h2`; blocks remain heading-neutral. |
| Landmark rule | Do not add nested `main`; preserve or explicitly document the `MainScreenCanvas` relationship and any `aria-labelledby` or landmark label. |
| Excluded behavior | Tabs, hotspots, viewed state, practice check, progress, completion, Continue/Next, route movement, image-map interaction. |
| Readiness | Ready with caution. |

### Screen Concept 2: Duty-Bearers and CSO Role Clarity

| Field | Mapping |
| --- | --- |
| Intended learner purpose | Help learners distinguish formal responsibility from CSO support so CSOs do not blame rights-holders or absorb every obligation themselves. |
| Source content evidence | `Module2ActorEcosystemRoles.tsx`, `Module2CSORoleEcosystem.tsx`. |
| Learner should understand | Duty-bearers have formal responsibilities; influencing actors may shape access; CSOs support voice, evidence, connections, adaptation, and accountability within a bounded role. |
| Approved template | `FrameworkExplanationTemplate`. |
| Approved blocks | Two `ConceptExplanationBlock` instances or equivalent static sections; optional `KeyMessageBlock`. |
| Proposed content slots | Wrapper `h1`, template `screenTitle` as `h2`, framework introduction, static body/children for duty-bearer and CSO role parts, optional key message. |
| Heading/wrapper rule | Future route/screen wrapper owns the only primary `h1`; template `screenTitle` remains `h2`; blocks remain heading-neutral. |
| Landmark rule | Do not add nested `main`; preserve or explicitly document the `MainScreenCanvas` relationship and any `aria-labelledby` or landmark label. |
| Excluded behavior | Compact reveal, tabs, choices, selected state, feedback, progress, completion, Continue/Next, route movement. |
| Readiness | Ready with caution. |

### Screen Concept 3: Meaningful Participation Beyond Attendance

| Field | Mapping |
| --- | --- |
| Intended learner purpose | Help learners recognize that attendance alone does not prove meaningful participation. |
| Source content evidence | `Module2ParticipationAttendance.tsx`, with supporting evidence from `Module2RightsHoldersMap.tsx` and `Module2EverydayClaimsResponsibilities.tsx` for voice and inclusion. |
| Learner should understand | Participation is stronger when people have clear information, safe voice, real influence, and a response pathway. |
| Approved template | `KeyMessageSummaryTemplate`. |
| Approved blocks | `KeyMessageBlock`; optional static explanation content in the template body. |
| Proposed content slots | Wrapper `h1`, template `screenTitle` as `h2`, message title, summary/introduction, key message, body explanation. |
| Heading/wrapper rule | Future route/screen wrapper owns the only primary `h1`; template `screenTitle` remains `h2`; blocks remain heading-neutral. |
| Landmark rule | Do not add nested `main`; preserve or explicitly document the `MainScreenCanvas` relationship and any `aria-labelledby` or landmark label. |
| Excluded behavior | Compact reveal, level-by-level tabs, choice selection, feedback, progress, completion, Continue/Next, route movement. |
| Readiness | Ready with caution. |

## 7. Template Mapping

| Screen concept | Selected template | Wrapper `h1` concept | Template `screenTitle` `h2` concept | Concept or message title | Summary or introduction | Body/children content source | Optional key message or explanation | Adaptation needed later |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Rights-holders as people with rights, voice, and claims | `ConceptIntroductionTemplate` | Rights-Holders as People With Rights, Voice, and Claims | Seeing Rights-Holders Clearly | Rights-holders, not a vague community label | Use source evidence that "the community" contains people with different barriers, voice, risk, and access needs. | Static core from `Module2RightsHoldersMap.tsx` plus information/access/voice/inclusion/responsibility/response ideas from `Module2EverydayClaimsResponsibilities.tsx`. | Optional `KeyMessageBlock`: naming rights-holders clearly supports fairer outreach, participation, accessibility, information, and accountability. | Shorten the six segment examples to one static explanation plus possibly one evidence sentence; defer the actor-map image. |
| Duty-bearers and CSO role clarity | `FrameworkExplanationTemplate` | Duty-Bearers and CSO Role Clarity | Mapping Responsibility and Support | Responsibility, influence, and bounded CSO support | Use source evidence that barriers are rarely caused by one actor and that HRBA asks who has rights, responsibility, influence, and a safe CSO support role. | Static core from `Module2ActorEcosystemRoles.tsx` and `Module2CSORoleEcosystem.tsx`. | Optional `KeyMessageBlock`: role clarity helps CSOs support voice and accountability without taking over duty-bearer responsibilities. | Condense four actor categories and five CSO roles into two or three static sections; remove choice prompt and feedback. |
| Meaningful participation beyond attendance | `KeyMessageSummaryTemplate` | Meaningful Participation Beyond Attendance | Attendance Is Only the Start | Participation means information, voice, influence, and response | Use source evidence that attendance sheets or a full room do not prove understanding, voice, influence, or response. | Static core from `Module2ParticipationAttendance.tsx`; supporting voice/inclusion evidence from `Module2RightsHoldersMap.tsx`. | `KeyMessageBlock`: participation should move beyond presence toward clear information, safe voice, influence over decisions, and a response loop. | Condense four participation levels into one short message and explanation; remove reveal sequence and choice check. |

## 8. Slot Mapping Table

| screen concept | source file(s) | source content idea | selected template | wrapper h1 draft label | template screenTitle h2 draft label | ConceptExplanationBlock title | summary/introduction | body/content slot | KeyMessageBlock title/message if used | content adaptation needed | implementation readiness |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Rights-holders as people with rights, voice, and claims | `Module2RightsHoldersMap.tsx`; `Module2EverydayClaimsResponsibilities.tsx`; `Module2ActorEcosystemRoles.tsx` | Rights-holders are specific affected people with rights, voice, claims, and different barriers hidden by broad labels. | `ConceptIntroductionTemplate` | Rights-Holders as People With Rights, Voice, and Claims | Seeing Rights-Holders Clearly | Rights-holders, not a vague community label | Broad labels can hide differences in access, voice, risk, and responsibility. | Static explanation using the "community" label evidence and rights as information/access/voice/inclusion/responsibility/response. | Naming rights-holders clearly supports fairer outreach and accountability. | Shorten segment list; defer image/map/hotspot; avoid copying card/tab behavior. | Ready with caution. |
| Duty-bearers and CSO role clarity | `Module2ActorEcosystemRoles.tsx`; `Module2CSORoleEcosystem.tsx` | Duty-bearers have formal responsibilities; CSOs support voice, evidence, connections, adaptation, and accountability within a bounded role. | `FrameworkExplanationTemplate` | Duty-Bearers and CSO Role Clarity | Mapping Responsibility and Support | Duty-bearers and CSO support roles | HRBA asks who has rights, who has responsibility, who influences access, and what a CSO can safely do. | Static framework sections for duty-bearers, influencing actors, and bounded CSO support. | Role clarity protects practice by preventing blame-shifting or overpromising. | Condense actor and CSO role lists; remove choice prompt, selected state, and feedback. | Ready with caution. |
| Meaningful participation beyond attendance | `Module2ParticipationAttendance.tsx`; `Module2RightsHoldersMap.tsx`; `Module2EverydayClaimsResponsibilities.tsx` | Attendance does not prove understanding, voice, influence, or response. | `KeyMessageSummaryTemplate` | Meaningful Participation Beyond Attendance | Attendance Is Only the Start | Participation beyond presence | HRBA asks whether people were only present or had information, voice, influence, and response. | Static summary of present, informed, heard, influential, and response pathway ideas. | Participation should move beyond presence toward clear information, safe voice, influence, and response. | Condense four levels; remove reveal sequence and choice feedback. | Ready with caution. |

## 9. Exact Current Route Assessment

| Screen concept | Exact current route safe later without routing/progress/completion changes? | Would require removing behavior-heavy patterns? | Would require heading/landmark refactor? | Would require content rewrite? | Would require CSS/token changes? | Would require asset changes? | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Rights-holders as people with rights, voice, and claims | No. `/module-2/screen-2-8` and `/module-2/screen-2-3` are useful evidence but not safe exact targets. | Yes. Tabs/hotspot-like exploration, flip/cards, viewed state, practice checks, progress, completion, and route movement would need removal. | Yes. Future target must avoid duplicate `h1` and nested `main` risk. | Yes, in the limited sense that long behavior-tied content must be shortened or split before static use. | No CSS/token changes should be required if a future wrapper-only target is created; exact-route conversion might expose legacy CSS coupling. | Yes if the current actor-map image is considered essential; the safer path is to defer that asset. | Defer exact route selection; prefer a future wrapper-only target or a later exact-route decision. |
| Duty-bearers and CSO role clarity | No. `/module-2/screen-2-10` and `/module-2/screen-2-11` are useful evidence but not safe exact targets. | Yes. Compact reveal, choice selection, selected state, feedback, progress, completion, and route movement would need removal. | Yes. `Module2CompactRevealScreen` owns `main` and `h1`; future template use must not nest landmarks or duplicate primary headings. | Yes, in the limited sense that four actor roles plus five CSO roles must be condensed or split. | No CSS/token changes should be required for a wrapper-only static target. | No asset dependency found for the static concept. | Defer exact route selection; prefer a future wrapper-only target or a later exact-route decision. |
| Meaningful participation beyond attendance | No. `/module-2/screen-2-14` is useful evidence but not a safe exact target. | Yes. Compact reveal, choice selection, selected state, feedback, progress, completion, and route movement would need removal. | Yes. `Module2CompactRevealScreen` owns `main` and `h1`; future template use must not nest landmarks or duplicate primary headings. | Yes, in the limited sense that four participation levels must become a short static summary or be split later. | No CSS/token changes should be required for a wrapper-only static target. | No asset dependency found for the static concept. | Defer exact route selection; prefer a future wrapper-only target or a later exact-route decision. |

No exact current route is selected for implementation by this note.

## 10. Wrapper and Heading Plan

For all three future concepts:

- the route/screen wrapper owns the primary `h1`;
- the template `screenTitle` remains `h2` below the confirmed wrapper `h1`;
- `ConceptExplanationBlock` and `KeyMessageBlock` remain heading-neutral;
- no nested `main` landmark is allowed;
- the current `MainScreenCanvas` relationship must be preserved or explicitly documented before implementation;
- any future target must document `aria-labelledby` or landmark label handling if changed;
- future implementation must verify that the screen has one clear primary heading and one appropriate main landmark relationship.

## 11. Behavior Exclusion Plan

All three concepts exclude:

- reveal, tabs, hotspots, and flip cards;
- choice selection;
- correctness feedback;
- learner input;
- state persistence;
- storage;
- scoring;
- retry;
- validation;
- completion markers;
- Continue/Next behavior;
- routing movement;
- progress gating;
- screen locking or unlocking;
- assessment or certificate logic.

## 12. Visual and Content Asset Boundary

No new assets are approved. No asset migration is approved. No visual redesign is approved. No CSS or token changes are approved.

If an existing screen depends on an image, map, hotspot, or visual exploration to explain the concept, the static screen concept must defer that dependency or document a future asset/content adaptation need before implementation. For this mapping, `Module2RightsHoldersMap.tsx` has an actor-map image dependency, so the rights-holder concept is mapped as text-first static content and the image dependency is deferred.

## 13. Readiness Result

Result: **PASS WITH CAUTION**.

Rationale:

- PASS element: the three static screen concepts are mapped to approved v0.1 templates and blocks.
- Caution element: no exact current implementation route is safe yet; route selection, content adaptation, heading/landmark handling, and no-behavior enforcement require a future readiness decision.
- STOP is not selected because the source content is clear enough to map safely as evidence.

## 14. Recommended Next Task

Create a documentation-only pre-micro-slice implementation readiness decision that decides whether to:

- implement one static wrapper-only concept screen first;
- implement three static concept screens later as a tiny vertical preparation slice;
- create a content adaptation note first;
- stop and do a heading/landmark audit or behavior separation first.

Do not recommend implementation until exact targets, content slots, heading plan, and no-behavior boundaries are fully clear. Based on this mapping, a future wrapper-only target appears safer than converting exact current Module 2 routes, but that choice still needs approval.

## 15. QA Requirements for Any Future Implementation

Any future implementation must include:

- `npm run build`;
- `git diff --check`;
- `git diff --cached --check`;
- changed-file scope check;
- heading/landmark check;
- no nested `main` unless explicitly justified;
- template usage check;
- approved block usage check;
- no Button check;
- behavior exclusion check;
- route/progress/completion non-change check;
- visual-drift check;
- token/global CSS non-change check;
- desktop, tablet, and mobile QA;
- keyboard and screen reader smoke check where feasible;
- QA note;
- alignment update;
- independent evaluation afterward.

## 16. Stop Conditions for Future Implementation

Stop if:

- exact screen target requires route, progress, or completion changes;
- target screen requires behavior-heavy interaction;
- target screen requires learner input, feedback, selected state, scoring, retry, validation, storage, or persistence;
- target screen lacks a safe wrapper-owned `h1` strategy;
- integration would create duplicate `h1` or nested `main` landmark problems;
- content must be rewritten before it can fit the approved templates;
- assets must be created, migrated, or redesigned;
- CSS or token changes are required;
- old screen code would need to be copied into templates;
- unrelated screens would be touched;
- build fails and cannot be fixed within approved scope.

## 17. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it map the three selected pre-micro-slice concepts? | Yes. |
| Does it inspect Module 2 source content read-only? | Yes. |
| Does it avoid implementation? | Yes. |
| Does it avoid content migration? | Yes. |
| Does it avoid content rewrite? | Yes. |
| Does it keep exact route implementation blocked if not safe? | Yes. |
| Does it preserve wrapper-owned `h1` and template `h2` rules? | Yes. |
| Are blocks heading-neutral? | Yes. |
| Are templates still read-only and behavior-free? | Yes. |
| Is Button excluded? | Yes. |
| Are behavior-heavy interactions excluded? | Yes. |
| Are routing/progress/completion/assessment/storage/feedback/scoring changes excluded? | Yes. |
| Are learner input, selected state, retry, validation, and persistence excluded? | Yes. |
| Are CSS and token edits excluded? | Yes. |
| Are asset changes excluded? | Yes. |
| Is Phase D CSS still blocked? | Yes. |
| Is Module 2 micro-slice implementation still blocked? | Yes. |
| Is vertical slice implementation still blocked? | Yes. |
| Is full scale-up still blocked? | Yes. |
