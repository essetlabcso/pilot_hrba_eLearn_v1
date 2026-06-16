# Design System v0.1 Rights-Holders Wrapper-Only Implementation Specification

## 1. Purpose

This document specifies a future one-screen wrapper-only implementation slice for the Rights-Holders static concept screen.

This specification does not approve implementation and does not perform implementation. If separately approved later, the future implementation must be limited to one static, read-only, wrapper-only concept screen and must not convert an exact current Module 2 route.

The future implementation must not add routing, progress, completion, assessment, storage, feedback, learner input, assets, CSS, tokens, course behavior, or vertical slice screens.

## 2. Current Decision Basis

The documentation-only pre-micro-slice implementation readiness decision recorded **PASS WITH CAUTION**.

It selected:

- one-screen wrapper-only path;
- Rights-Holders static concept screen as the safest first candidate;
- no exact current route conversion;
- no immediate screen integration implementation until this specification is reviewed;
- no Module 2 micro-slice implementation;
- no vertical slice implementation.

This specification narrows that decision into a future file model, slot map, boundary set, QA plan, and stop conditions.

## 3. Candidate Screen Concept

Future screen concept: **Rights-holders as people with rights, voice, and claims**.

Learning purpose:

- help learners move from a broad "community" label to specific people who hold rights;
- show that rights-holders may have different barriers, voice, risks, access needs, and claims;
- support more careful outreach, participation, accessibility, information sharing, and accountability.

This concept is intentionally static and introductory. It should prepare later learning about actor roles and participation, but it should not include actor-map exploration, hotspots, flip cards, choices, feedback, or progress gating.

## 4. Source Evidence

| Source file inspected read-only | Useful learner-facing content ideas | Behavior dependencies found | Asset dependencies found | Route/progress/completion dependencies found | Static screen use? | Must be deferred |
| --- | --- | --- | --- | --- | --- | --- |
| `src/components/course/Module2RightsHoldersMap.tsx` | Broad labels like "the community" can hide different barriers, responsibilities, voice, risks, and ways of being reached. Naming rights-holders clearly supports fairer outreach, participation, accessibility, information, and accountability. | Tablist/tabpanel-style group exploration, opened hotspot state, active hotspot state, disabled Continue button. | Imports `m2-s08-rights-holders-actor-map.png`; map image and hotspot-like actor ecosystem. | Uses `SCREEN_ID` `M2-S08`, `NEXT_ROUTE`, `screenProgress`, `practiceCheckState`, `currentScreenId`, `window.history.pushState`, completion status. | Yes, as source evidence for a text-first static concept screen. | Exact route conversion, map image, tab/hotspot interaction, progress card, Continue behavior, route movement, completion state. |
| `src/components/course/Module2EverydayClaimsResponsibilities.tsx` | Rights appear in everyday CSO work as information, access, voice, inclusion, responsibility, and response. Inclusion content reinforces that broad labels may hide less visible or less connected people. | Flip cards, local `useState`, card buttons, inline style objects, progress indicator, disabled Continue button. | No central concept asset, but includes inline icon/emoticon card cues. | Uses `SCREEN_ID` `M2-S03`, `NEXT_ROUTE`, `screenProgress`, `practiceCheckState`, `currentScreenId`, `window.history.pushState`, completion status. | Yes, as supporting evidence for rights, voice, claims, and inclusion language. | Flip-card behavior, six-card framework, inline visual styles, progress/completion/route behavior, broad multi-dimension scope. |
| `src/components/course/Module2ActorEcosystemRoles.tsx` | Rights-holders are people affected by the issue and have rights, voice, and claims. Some people may hear late, be unable to attend, or feel a group is not for them. | Uses `Module2CompactRevealScreen`, reveal items, choice check, selected state, feedback. | No asset dependency in this source file. | Passes `SCREEN_ID` `M2-S10`, `NEXT_ROUTE`, module ID, state key, progress and route data through `Module2CompactRevealScreen`. | Yes, as supporting evidence for the concise rights-holder definition. | Duty-bearer/CSO role framework, reveal behavior, choice behavior, feedback, progress/completion/route behavior. |
| `src/components/course/Module2CompactRevealScreen.tsx` | Not a content source for this screen. It documents current behavior risk. | Owns `main`, `h1`, tablist, tabpanel, buttons, choice radiogroup, selected state, feedback `aria-live`, Continue button. | Optional `visualAsset` support. | Mutates `screenProgress`, `practiceCheckState`, `currentScreenId`, completion status, and uses `window.history.pushState`. | No. It must not be reused for the static wrapper-only screen. | Shared reveal shell, route movement, progress/completion logic, feedback, nested landmark risk. |

No content is migrated into code by this specification.

## 5. Future Implementation Target Model Options

| Option | Classification | Decision notes |
| --- | --- | --- |
| Option A - New wrapper-only static screen component, not wired to route yet | Ready with caution | Selected. This creates one new static course-owned component using approved v0.1 template/block composition without routing, progress, course navigation, completion, or current route conversion. Visual QA in the live app is limited because it is not routed, but build and static review can run safely. |
| Option B - New wrapper-only screen integrated into a temporary or existing safe route | Ready with caution, deferred | Potentially useful later, but route-level changes increase risk. Requires a separate route readiness gate if route/progress files or navigation behavior are touched. |
| Option C - Convert exact current Module 2 route such as `/module-2/screen-2-8` | Not ready | Current screens are behavior-heavy and coupled to tabs/hotspots, progress/completion, route movement, assets, or landmarks. |
| Option D - Documentation-only content adaptation first | Ready with caution, deferred | Useful if final copy expands beyond the mapped static core, but not required before specifying a one-screen static component. |
| Option E - STOP | Not selected | A safe future model exists if it stays non-routed and wrapper-only. |

## 6. Selected Future Implementation Model

Selected model: **Option A - new wrapper-only static screen component, not wired to route yet**.

The future task may create one new static screen/component file. It must not wire the component into routing or progress. It must not edit existing route files. It must not edit route/progress/currentScreenId files.

Future implementation model details:

- New wrapper-only static screen component: yes.
- Routed: no.
- Existing route file touched: no.
- Route/progress files touched: no.
- Visual QA possible: limited. Because the component is not routed, live route QA is not expected in the first implementation. Build, source inspection, and optional isolated render/screenshot only if an approved non-route harness already exists may be used. Do not create a route only for visual QA.
- Stop if visual QA requires routing, progress wiring, temporary route registration, or CSS/token edits.

If route/progress changes become required, stop and create a separate route integration readiness note before implementation.

## 7. Approved Future Template and Block Composition

Future composition:

- route/screen wrapper owns `h1`;
- `ConceptIntroductionTemplate` provides `screenTitle` as `h2`;
- `ConceptExplanationBlock` explains the core concept through the template;
- optional `KeyMessageBlock` may provide a short takeaway through the template;
- blocks remain heading-neutral;
- `Button` is excluded;
- no learner input;
- no behavior-heavy blocks;
- no reveal, tabs, hotspots, flip cards;
- no choice, check, or feedback behavior.

The future implementation must not edit `ConceptIntroductionTemplate`, `ConceptExplanationBlock`, `KeyMessageBlock`, `LearningBlockFrame`, `Callout`, `Card`, `Button`, design-system CSS, or token files unless a defect is discovered and separately approved.

## 8. Draft Slot Map

| Slot | Draft planning value | Source evidence |
| --- | --- | --- |
| Wrapper `h1` draft label | Rights-Holders as People With Rights, Voice, and Claims | Mapped concept and `Module2ActorEcosystemRoles.tsx` rights-holder definition. |
| Template `screenTitle` `h2` draft label | Seeing Rights-Holders Clearly | `Module2RightsHoldersMap.tsx` theme of moving beyond a broad community label. |
| Eyebrow if used | Module 2 - Rights-holders | Current Module 2 source kicker pattern; use only if static and non-interactive. |
| `conceptTitle` | Rights-holders, not a vague community label | `Module2RightsHoldersMap.tsx` broad-label concept. |
| `summary` | Broad labels can hide differences in access, voice, risk, responsibilities, and ways of being reached. | `Module2RightsHoldersMap.tsx` intro and segment evidence. |
| Body/children content source notes | Use the static core that rights-holders are affected people with rights, voice, and claims; rights may involve information, access, voice, inclusion, responsibility, and response. | `Module2ActorEcosystemRoles.tsx`, `Module2EverydayClaimsResponsibilities.tsx`, `Module2RightsHoldersMap.tsx`. |
| Optional `keyMessageTitle` | Practice takeaway | Planning label only; may be omitted if too editorial. |
| Optional `keyMessage` | Naming rights-holders clearly supports fairer outreach, participation, accessibility, information, and accountability. | `Module2RightsHoldersMap.tsx` footer. |
| Support text if needed | None selected for first implementation. | Keep first slice small. |
| Deferred content | Six rights-holder segment details, actor-map image, tab/hotspot labels, practice questions, progress card, Continue button. | `Module2RightsHoldersMap.tsx`; `Module2EverydayClaimsResponsibilities.tsx`. |

Use draft labels and source-evidence notes only. Do not invent new examples or cases.

## 9. Content Adaptation Check

Content readiness: **Ready with caution**.

What can be used as-is or near-source:

- broad labels like "the community" can hide differences;
- rights-holders are people affected by the issue with rights, voice, and claims;
- rights-holder specificity supports outreach, participation, accessibility, information, and accountability.

What must be shortened:

- six rights-holder segments from `Module2RightsHoldersMap.tsx`;
- six everyday rights dimensions from `Module2EverydayClaimsResponsibilities.tsx`.

What must be deferred:

- actor-map image;
- hotspot/tab exploration;
- flip-card exploration;
- practice questions as an activity;
- progress/Continue gating;
- route movement.

What must not be used because it is tied to behavior:

- opened hotspot state;
- active segment state;
- flipped card state;
- choice/feedback state;
- progress counter language such as "open each group to continue";
- Continue button labels.

Actor-map asset dependency: defer. The first static screen must be understandable without the current image/map asset.

Stop if future implementation requires new copy beyond the mapped static core, new examples, or asset-dependent explanation.

## 10. Heading and Landmark Specification

Future requirements:

- wrapper owns the only primary `h1`;
- template `screenTitle` remains `h2` below that `h1`;
- blocks remain heading-neutral;
- no duplicate `h1`;
- no nested `main`;
- preserve `MainScreenCanvas` relationship or document it explicitly;
- future implementation must check current main landmark behavior;
- if `aria-labelledby` or landmark labeling changes are needed, document them before implementation;
- future implementation must stop if it cannot avoid duplicate `h1` or nested `main` landmark problems.

For Option A, the new static component should not render a `main` element. It should render a wrapper `section` or equivalent neutral container with a wrapper-owned `h1`, then the `ConceptIntroductionTemplate` below it.

## 11. File Architecture for Future Implementation

Proposed future file architecture:

| File area | Recommendation | Rationale |
| --- | --- | --- |
| New static screen/component file | Create one course-owned file, likely `src/components/course/Module2RightsHoldersStaticConceptScreen.tsx`. | The content is course-specific and should not enter the generic design-system package. |
| Location | `src/components/course/` | Keeps HRBA/Module 2 content out of `src/components/design-system/`. |
| Index/export file | Not required for a non-routed first implementation unless an existing local convention requires it. If needed, one export file may be allowed only with explicit justification. | Avoid unnecessary integration surface. |
| Route registration file | Do not edit. | Route integration remains blocked. |
| Progress/currentScreenId file | Do not edit. | Progress/currentScreenId changes remain blocked. |
| Design-system template/block/component files | Do not edit. | Existing v0.1 components should be used as-is. |
| CSS/token files | Do not edit. | Use existing approved component/template CSS only. |

If route/progress/currentScreenId edits are unavoidable, require a separate route readiness gate before implementation.

Do not edit existing behavior-heavy Module 2 screens.

## 12. Future Implementation Allowed Files

Allowed likely, if separately approved:

- one new static screen/component file;
- one QA note;
- `docs/design-system-plan-progress-alignment.md`.

Possibly allowed only if explicitly justified:

- one export file;
- one safe wrapper or route file, only if no progress/routing behavior changes are required and a separate route readiness gate approves it.

Blocked:

- existing behavior-heavy Module 2 screens;
- `Module2CompactRevealScreen`;
- route/progress/currentScreenId files unless separately approved;
- CSS files;
- token files;
- assessment/certificate files;
- accessibility toolbar files;
- assets;
- module CSS;
- old HRBA files;
- design-system primitive/block/template files unless a defect is discovered.

## 13. Completion/Progress/Routing Boundary

No progress movement is approved.

No completion logic is approved.

No lock/unlock behavior is approved.

No `currentScreenId` behavior changes are approved.

No Continue/Next behavior is approved.

No assessment, scoring, retry, feedback, storage, or certificate behavior is approved.

Future implementation must preserve existing course/player routing behavior unless a separate route readiness task approves otherwise.

If implementation needs route changes, stop and create a route integration readiness note.

## 14. Visual/CSS/Token Boundary

No token edits are approved.

No global CSS edits are approved.

No module CSS edits are approved.

No template CSS edits are approved.

Future implementation must use:

- no raw colors;
- no gradients;
- no shadows;
- no broad `.is-active`;
- no Phase D/current-state selectors;
- no inline visual style objects;
- existing approved component/template CSS only.

If new styling is required, stop and create a separate CSS/token readiness note.

## 15. Asset Boundary

No new asset creation is approved.

No asset migration is approved.

No actor-map image dependency is approved for the first static screen.

No hotspot/map interaction is approved.

If the concept cannot be understood without the current image/map asset, stop and create a content/asset adaptation note.

## 16. Accessibility Requirements for Future Implementation

Future implementation must verify:

- one clear `h1`;
- template `h2` below `h1`;
- no duplicate page headings;
- no nested `main` landmark;
- logical reading order;
- no alert/live-region behavior;
- no focus management by this static screen;
- no keyboard trap;
- no `Button`;
- no color-only meaning;
- desktop/tablet/mobile QA;
- keyboard smoke check;
- screen reader smoke check where feasible.

## 17. Future Implementation QA Plan

Future QA note must include:

- `npm run build`;
- `git diff --check`;
- `git diff --cached --check`;
- changed-file scope check;
- no route/progress/completion behavior change check;
- heading and landmark check;
- no nested `main` check;
- template usage check;
- approved block usage check;
- no `Button` check;
- no behavior-heavy interaction check;
- visual-drift check;
- token/global CSS non-change check;
- asset non-change check;
- desktop/tablet/mobile QA;
- keyboard/screen reader smoke check where feasible;
- alignment update;
- independent evaluation afterward.

Because Option A is not routed, any visual QA limitation must be recorded honestly in the QA note.

## 18. Stop Conditions for Future Implementation

Stop if:

- exact current route conversion is required;
- implementation touches `Module2RightsHoldersMap.tsx` or other behavior-heavy Module 2 screens;
- implementation needs route/progress/completion/currentScreenId changes;
- implementation creates duplicate `h1`;
- implementation creates nested `main` landmark problems;
- implementation needs CSS/token edits;
- implementation needs an asset or hotspot/map interaction;
- implementation needs `Button`, learner input, choice/check/feedback, selected state, validation, retry, storage, or persistence;
- implementation requires rewriting content beyond the mapped static core;
- unrelated files are touched;
- build fails and cannot be fixed within the approved scope.

## 19. Readiness Result

Readiness result: **PASS WITH CAUTION**.

PASS element: the future one-screen implementation can be bounded to one non-routed static component file plus QA/alignment documentation.

Caution element: future implementation may proceed only after review, with heading/landmark, file-scope, content-slot, visual-QA, and no-route cautions. Exact current route conversion remains blocked.

STOP is not selected because Option A is safe enough as a non-routed wrapper-only implementation model.

## 20. Recommended Next Task

Implement the bounded one-screen wrapper-only Rights-Holders static concept screen only, using this specification, with no exact current route conversion, no behavior, no `Button`, no progress/completion/routing changes, no CSS/token edits, no asset migration, a QA note, alignment update, and independent evaluation afterward.

## 21. Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this document documentation-only? | Yes. |
| Does it specify one screen only? | Yes. |
| Does it keep implementation blocked until review? | Yes. |
| Does it avoid exact current route conversion? | Yes. |
| Does it preserve wrapper-owned `h1` and template `h2` rules? | Yes. |
| Are blocks heading-neutral? | Yes. |
| Is `ConceptIntroductionTemplate` the selected template? | Yes. |
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
| Is the recommended next task clear and bounded? | Yes. |
