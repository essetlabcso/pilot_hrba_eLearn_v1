# Design System v0.1 Learning Block Template Map

Draft v0.1 - Documentation-only vertical-slice planning map

## Purpose

Learning blocks and screen templates prevent blank-prompt screen production. They make each screen start from a learning purpose, approved learner action, accessibility requirement, mobile behavior, and completion rule instead of a one-off layout idea.

This v0.1 map covers only what is needed to plan one HRBA vertical slice. It does not implement learning blocks, screen templates, screens, components, CSS, tokens, routing, progress, assessment, certificate logic, accessibility toolbar behavior, assets, content, module CSS, or old HRBA files.

## HRBA Vertical Slice Candidate

Recommended candidate: **Module 2 micro-slice - Rights-holders, duty-bearers, and participation in everyday CSO work**.

Why this slice:

- it is practical for local CSOs;
- it exercises concept explanation, comparison, scenario judgment, reflection, knowledge check, and completion evidence;
- it can use existing Module 2 content patterns as read-only evidence without copying old screen code;
- it is small enough for v0.1 validation, about 7 screens;
- it can prove the design system without touching full course scale-up.

## Proposed Vertical Slice Flow

| Screen | Learning purpose | Proposed screen template | Proposed learning block(s) | Expected learner action | Accessibility considerations | Completion/progress risk | Visual/component needs | Content/asset dependency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Orient learners to the micro-slice and why rights language matters in everyday CSO work. | Orientation / Welcome | Statement / Key Message; Continue / Completion Transition | Read purpose and start. | Clear heading, concise CTA, no hidden mobile CTA. | Low if completion is CTA-only. | Button, callout, completion transition. | Short approved intro copy; no asset required. |
| 2 | Explain rights-holder and duty-bearer in plain language. | Concept Introduction | Concept Explanation; Key Message | Read and connect concept to a familiar CSO example. | Semantic heading, readable text, meaningful example. | Low if complete on view/continue. | Card/content panel, callout. | Approved concept copy. |
| 3 | Compare rights-holder, beneficiary, duty-bearer, and service provider language. | Comparison | Comparison Block | Compare terms and identify why wording changes practice. | Repeated labels on mobile; no color-only distinction. | Medium if comparison requires all items viewed. | Card/panel, comparison layout, continue action. | Approved term definitions. |
| 4 | Apply the concepts to a short participation dilemma. | Decision Scenario | Scenario Decision | Choose a response and review feedback. | Keyboard-selectable options, visible selected state, feedback association. | High because selected/feedback/completion state must be specified. | Scenario panel, option group, feedback message. | Approved scenario and feedback. |
| 5 | Reflect safely on one participation habit the learner's CSO could strengthen. | Reflection / Portfolio Capture | Reflection / Portfolio Capture | Write, select, or intentionally skip a safe reflection. | Labeled input, HRBA safety note, save/skip clarity. | High because persistence/skip/complete behavior must be specified. | Reflection shell, safety callout, action button. | Safe prompt copy; no real sensitive examples. |
| 6 | Check understanding of responsibility and participation. | Knowledge Check | Knowledge Check | Answer and review feedback. | Semantic choices, keyboard operation, feedback reading order. | High because scoring/retry/completion must be specified. | Option group, feedback message. | Approved question, choices, feedback. |
| 7 | Summarize the slice and confirm readiness for next learning. | Completion Transition | Continue / Completion Transition; optional Key Message | Review takeaway and continue. | CTA visible on mobile; completion requirements clear. | Medium if tied to previous completion state. | Completion message, button/action pattern. | Approved summary copy. |

## Minimum Learning Block Set

| Learning block | v0.1 use | Readiness |
| --- | --- | --- |
| Concept Explanation Block | Explain rights-holder/duty-bearer language. | Ready for implementation planning. |
| Key Message / Statement Block | Emphasize the principle that language changes practice. | Ready for implementation planning. |
| Comparison Block | Distinguish actors and terms. | Ready with caution; mobile structure and completion rule must be specified. |
| Scenario Decision Block | Apply judgment to a participation dilemma. | Not ready for implementation until choice, feedback, selected state, and completion behavior are specified. |
| Reflection / Portfolio Capture Block | Capture safe CSO practice reflection. | Not ready for implementation until input, save/skip, persistence, and HRBA safety behavior are specified. |
| Knowledge Check Block | Confirm understanding. | Not ready for implementation until selected state, feedback, retry, and completion rules are specified. |
| Continue / Completion Transition Block | Start and close the slice. | Ready with caution; must not alter route/progress logic without approval. |

## Minimum Screen Template Set

| Screen template | v0.1 use | Readiness |
| --- | --- | --- |
| Orientation / Welcome | Start micro-slice and establish purpose. | Ready for implementation planning. |
| Concept Introduction | Introduce key concepts. | Ready for implementation planning. |
| Framework Explanation | Optional only if the slice adds a framework screen. | Defer for this first slice unless evidence shows need. |
| Comparison | Compare terms and roles. | Ready with caution. |
| Decision Scenario | Apply judgment. | Not ready until interaction behavior spec exists. |
| Reflection / Portfolio Capture | Safe practice reflection. | Not ready until input/persistence behavior spec exists. |
| Knowledge Check | Check understanding. | Not ready until choice/feedback/completion behavior spec exists. |
| Completion Transition | Close the slice. | Ready with caution. |

## Block/Template Gap Analysis

| Gap | Affected area | Readiness impact | Recommendation |
| --- | --- | --- | --- |
| Shared component primitives are not implemented. | All block/template implementation. | Blocks can be planned but not implemented cleanly. | Review component inventory, then implement 2-3 low-risk primitives first. |
| Choice selected/current state strategy remains blocked. | Scenario Decision, Knowledge Check, Comparison if interactive. | Behavior-heavy blocks are not implementation-ready. | Create a narrow selected-state/readiness spec before option-group implementation. |
| Completion/progress contracts are not specified for the slice. | Scenario, Reflection, Knowledge Check, Completion Transition. | Route/progress risk remains high. | Define per-screen completion rules before screen implementation. |
| Reflection save/skip behavior is not standardized. | Reflection / Portfolio Capture. | Persistence risk remains high. | Create a reflection behavior specification before implementation. |
| Visual drift prevention is advisory only. | All component/screen work. | Hard-coded values could return during implementation. | Use the visual-drift prevention plan before coding. |
| Asset needs are not selected. | Any visual/case/story screen. | Asset drift or placeholder risk remains. | Prefer no-asset or text-first slice unless assets are approved. |

## Readiness Summary

Ready for implementation planning after pack review:

- Orientation / Welcome with Key Message and Continue;
- Concept Introduction with Concept Explanation;
- simple Key Message / Statement Block;
- static Card/Callout surfaces.

Ready with caution:

- Comparison;
- Completion Transition;
- Progress/continue action pattern.

Not ready for implementation without separate specs:

- Scenario Decision behavior;
- Reflection / Portfolio Capture behavior;
- Knowledge Check option/feedback behavior;
- selected/current state CSS;
- route/progress/completion changes.

No block or screen template implementation is approved by this document.
