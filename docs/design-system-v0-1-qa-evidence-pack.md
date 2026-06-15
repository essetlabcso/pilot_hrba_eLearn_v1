# Design System v0.1 QA Evidence Pack Standard

Draft v0.1 - Documentation-only QA evidence standard for future v0.1 implementation

## Purpose

This document defines the standard QA evidence pack for future Design System v0.1 implementation tasks.

It is intended to make future work faster and safer by giving every implementation task a reusable evidence structure. It does not implement QA automation, scripts, React, CSS, tokens, components, blocks, templates, screens, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files.

## Required Evidence For Every Implementation Task

Every v0.1 implementation QA note should include:

- branch;
- task scope;
- source plan/spec;
- files changed;
- files explicitly not changed;
- build result;
- route or routes checked;
- viewport checks;
- keyboard checks;
- ARIA/focus checks if relevant;
- token/CSS compliance check;
- visual-drift check;
- responsive check;
- HRBA/content safety check if screen/content is touched;
- risks or defects found;
- PASS/STOP result;
- recommended next step.

## Evidence Templates

### Documentation-Only Task

```md
# [Task Name] Documentation QA

## Branch

`system/hrba-clean-foundation`

## Scope

[Document the documentation-only task.]

## Files Changed

- `[path]`

## Files Explicitly Not Changed

- React components
- CSS
- token files
- components, blocks, templates, screens
- routing, progress, assessment, certificate logic
- accessibility toolbar behavior
- assets, content, module CSS, old HRBA files

## Validation

- `git diff --check`: [PASS/STOP]
- Build: not required / [result if run]

## Result

PASS / STOP

## Recommended Next Step

[Next documentation or implementation gate.]
```

### Component Implementation Task

```md
# [Component Name] Implementation QA

## Branch

`system/hrba-clean-foundation`

## Source Plan

`docs/[approved-component-plan].md`

## Scope

[Exact component and variants implemented.]

## Files Changed

- `[path]`

## Files Explicitly Not Changed

- routing, progress, assessment, certificate logic
- course content and assets
- token files unless explicitly approved
- unrelated CSS/selectors

## Build Result

`npm run build`: [PASS/STOP/not run with reason]

## Token/CSS Compliance

- raw values introduced: [none/list]
- token references used: [list]
- visual-drift check: [PASS/STOP/advisory findings]

## Accessibility Checks

- semantic HTML: [PASS/STOP]
- keyboard access: [PASS/STOP]
- visible focus: [PASS/STOP]
- ARIA/state use: [PASS/STOP/not applicable]

## Responsive Checks

- desktop: [PASS/STOP]
- tablet: [PASS/STOP]
- mobile: [PASS/STOP]

## Risks Or Defects

[List or "None found".]

## Result

PASS / STOP

## Recommended Next Step

[Next gate.]
```

### Screen/Template Implementation Task

```md
# [Screen/Template] Implementation QA

## Branch

`system/hrba-clean-foundation`

## Source Plan

`docs/[approved-template-or-slice-plan].md`

## Screen Mapping

| Screen ID | Template | Learning block(s) | Completion rule |
| --- | --- | --- | --- |
| [id] | [template] | [blocks] | [rule] |

## Files Changed

- `[path]`

## Files Explicitly Not Changed

- unrelated modules
- routing/progress unless explicitly approved
- assessment/certificate logic
- assets/content unless explicitly approved

## Build Result

`npm run build`: [PASS/STOP/not run with reason]

## Route And Viewport Checks

| Route | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| `[route]` | [PASS/STOP] | [PASS/STOP] | [PASS/STOP] |

## Keyboard And Accessibility Checks

[Headings, focus order, controls, labels, feedback, reduced motion if relevant.]

## HRBA Safety Check

[Confirm no unsafe request for real names, active disputes, sensitive incidents, or confidential details.]

## Result

PASS / STOP

## Recommended Next Step

[Next gate.]
```

### Visual/CSS/Token Task

```md
# [Visual/CSS/Token Task] QA

## Branch

`system/hrba-clean-foundation`

## Source Plan

`docs/[approved-visual-plan].md`

## Scope

[Exact selector/token/component family.]

## Files Changed

- `[path]`

## Guardrail Checks

- no course-screen drift: [PASS/STOP]
- no broad `.is-active` selector: [PASS/STOP]
- no Phase D/current-state work unless approved: [PASS/STOP]
- no routing/progress/content changes: [PASS/STOP]

## Build Result

`npm run build`: [PASS/STOP/not run with reason]

## Visual Drift Check

[Advisory or blocking result.]

## Result

PASS / STOP

## Recommended Next Step

[Next gate.]
```

### Accessibility Behavior/ARIA Task

```md
# [Accessibility Behavior/ARIA Task] QA

## Branch

`system/hrba-clean-foundation`

## Source Plan

`docs/[approved-accessibility-plan].md`

## Scope

[Exact behavior, launcher, root, or component relationship.]

## Files Changed

- `[path]`

## DOM/ARIA Checks

- stable IDs: [PASS/STOP]
- `aria-expanded`: [PASS/STOP/not applicable]
- conditional `aria-controls`: [PASS/STOP/not applicable]
- label relationship: [PASS/STOP/not applicable]
- `aria-current` absent where excluded: [PASS/STOP/not applicable]

## Keyboard/Focus Checks

- initial focus: [PASS/STOP]
- Tab/Shift+Tab: [PASS/STOP]
- Escape/close paths: [PASS/STOP]
- focus return: [PASS/STOP]

## Regression Guardrails

[Confirm unrelated Menu/modal/Captions/routing/progress/content areas were untouched.]

## Result

PASS / STOP

## Recommended Next Step

[Next gate.]
```

### Vertical Slice QA Task

```md
# Design System v0.1 Vertical Slice QA

## Branch

`system/hrba-clean-foundation`

## Slice

[Module/path/screens.]

## Design-System Mapping

| Screen ID | Template | Blocks | Components | Completion rule |
| --- | --- | --- | --- | --- |
| [id] | [template] | [blocks] | [components] | [rule] |

## Build Result

`npm run build`: [PASS/STOP]

## Routes And Viewports

| Route | 1440x900 | 768x900 | 390x844 |
| --- | --- | --- | --- |
| `[route]` | [PASS/STOP] | [PASS/STOP] | [PASS/STOP] |

## Accessibility Evidence

[Keyboard, focus, headings, labels, feedback, ARIA, reduced motion if relevant.]

## Learning Flow Evidence

[Purpose, sequence, learner actions, feedback, completion.]

## HRBA Safety Evidence

[Safe prompts, no sensitive real-world data request, respectful scenarios.]

## Visual/Token Evidence

[Token use, no random CSS, visual drift check result.]

## Risks Or Defects

[List.]

## Result

PASS / STOP

## Scale-Up Recommendation

[Proceed / do not proceed. Scale-up remains blocked unless PASS.]
```

## PASS/STOP Rules

Return STOP if:

- files outside approved scope changed;
- CSS or token drift is introduced;
- build fails;
- accessibility behavior regresses;
- keyboard or focus behavior fails for an interactive task;
- ARIA references are invalid;
- route, progress, completion, assessment, or certificate behavior changes without approval;
- content or asset drift is introduced;
- HRBA safety rules are violated;
- QA evidence is missing;
- Phase D/current-state CSS appears without a separate approved task;
- full scale-up starts before vertical slice validation.

Return PASS only when the task stayed within scope, required checks passed, and residual risks are documented.

## Alignment Update Rule

Update `docs/design-system-plan-progress-alignment.md` when:

- a v0.1 pack document is created or materially revised;
- a readiness gate changes PASS/STOP status;
- a component, block, template, visual, accessibility, or vertical-slice task completes;
- a risk status changes;
- a next recommended task changes;
- vertical slice validation passes or stops.

Do not update the alignment document for exploratory notes unless they change the roadmap.

## Vertical Slice Evidence Requirements Before Scale-Up

Before any scale-up across modules, collect evidence for:

- design-system compliance;
- component reuse;
- block/template mapping;
- accessibility and keyboard behavior;
- responsive behavior;
- learning flow and completion rules;
- HRBA safety;
- token/CSS compliance and visual drift;
- route/progress stability;
- QA result and independent evaluation if required.

Full scale-up remains blocked until the selected vertical slice passes validation.
