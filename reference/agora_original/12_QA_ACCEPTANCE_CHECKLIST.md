# 12_QA_ACCEPTANCE_CHECKLIST.md
# QA Acceptance Checklist

## QA result statuses

Use: **Pass**, **Needs repair**, **Pending source content**, **Not applicable**, **Blocked**.

## Global QA

- Exact text fidelity against `05_COURSE_CONTENT_SOURCE_OF_TRUTH.md`.
- Every implemented screen maps to a registered state.
- Every modal/reveal/quiz/feedback/summary/completion state is distinct.
- State transitions follow `15_FUNCTIONAL_STATE_MACHINE.md` and `06_NAVIGATION_AND_STATE_FLOW.md`.
- Missing items follow `16_MISSING_CONTENT_REGISTER.md`.
- Assets follow `11_ASSET_INVENTORY_AND_SUBSTITUTION_RULES.md`.
- No anti-drift violations.

## Outer platform QA

Check UNICEF strip, Agora header, breadcrumbs, Dashboard, Course Overview, Course Homepage, Launch Wrapper, Introduction Completed Page, Module 1 Overview, and Post-Module-1 pending state.

Critical checks:
- Search placeholder exactly **Search all activities**.
- Course title exact.
- Course instructions preserve **85% or higher**.
- Launch wrapper message exact.
- Introduction completion unlocks Module 1.
- Post-Module-1 state remains pending.

## Internal player QA

Check player header, progress strip, toolbar order/state changes, help overlay, slide counters, previous/next visibility, start screens, modals, feedback, quiz states, summary tabs, completion screens.

Critical checks:
- Toolbar order exact.
- Final completion slides have no Next arrow.
- Modals close back to parent state.
- Pending slides show **Pending source content**.

## Introduction QA

Verify states `INT-START-base` through `INT-S06-complete`, including Slide 4 modals and Slide 5 reveal states.

## Module 1 QA

Verify all states from `M1-START-base` through `M1-S26-complete`, including pending states, case modal reuse, quiz result 75%, and exact final completion text.

## Accessibility QA

Keyboard access, visible focus, modal focus trap, radio groups, button/link semantics, icons plus text for feedback, accessible slide counters, nonblank pending states.

## Evidence pack required after every slice

Include slice name, state IDs, components changed, data/state structures, source sections, interactions, pending content, asset placeholders, QA result, deviations, repairs, risks, and next recommended slice.
