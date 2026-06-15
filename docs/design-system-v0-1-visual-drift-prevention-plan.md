# Design System v0.1 Visual Drift Prevention Plan

Draft v0.1 - Documentation-only prevention plan, not a script implementation

## Purpose

Design System v0.1 needs a minimum prevention approach before component or screen work begins. The goal is to reduce accidental visual drift during the first vertical slice by making risky value patterns visible before they become new local design rules.

This is a plan only. It does not implement scripts, lint checks, CSS changes, token changes, component changes, screen changes, or broad refactoring.

## Visual Drift Risks

Likely drift risks in the current repo include:

- raw hex colors outside token files;
- hard-coded `rgb()` and `rgba()` values;
- hard-coded shadows;
- ad hoc linear and radial gradients;
- local spacing, typography, radius, and border values;
- inline visual styles in React components;
- new CSS selectors outside approved component or vertical-slice areas;
- broad `.is-active` styling or Phase D state styling;
- component-level visual improvisation;
- module-specific palettes and screen-specific selectors;
- old pilot styles copied into new shared components;
- visual patches made to fix one screen without a reusable rule.

## Proposed v0.1 Prevention Approach

### What Should Be Scanned

Future advisory checks should scan implementation files likely to change in v0.1:

- future shared component files;
- future vertical-slice screen files;
- future scoped CSS files if separately approved;
- changed files in `src/components/` and `src/styles/`.

The first check should focus on changed files, not the whole legacy repo, to avoid burying new drift in existing legacy noise.

### What Should Be Allowed

Allowed patterns:

- approved token references such as `var(--cso-...)`;
- existing legacy values in files not touched by the implementation task;
- raw values inside token files;
- documentation examples that are explicitly marked as examples;
- existing inline styles when they are only reported and not refactored by the current task.

### What Should Be Flagged

Flag in changed implementation files:

- new raw hex colors;
- new `rgb()` or `rgba()` values;
- new `box-shadow` values not using approved tokens;
- new gradient values;
- new hard-coded border radius, spacing, or font-size values in shared components;
- new broad `.is-active` selectors;
- new selectors touching Phase D/current/completed/locked/disabled/danger/progress states without an approved task;
- new inline visual style objects in shared components;
- new CSS files or selectors outside the approved scope.

### Advisory First

The v0.1 check should be advisory first.

Reason:

- existing legacy CSS and renderer files contain many hard-coded values;
- false positives are likely until component and screen boundaries are clearer;
- blocking too early could prevent useful vertical-slice validation;
- the first goal is evidence and review, not automated enforcement.

### Later Blocking Criteria

A future check may become blocking only for:

- new shared components after token rules are implemented;
- new vertical-slice files after the first slice plan is approved;
- raw visual values introduced in a task that explicitly requires token compliance;
- broad state selectors introduced without a readiness gate.

## Allowed Exceptions

- Token files may contain raw values.
- Existing legacy code may be reported but not automatically refactored.
- Documentation files are not implementation violations.
- Existing inline styles should be classified before migration.
- Old module CSS can be inventoried as risk evidence but must not be mass-refactored.
- Approved screenshots, assets, and content files are outside the visual-value scan unless a future task defines asset QA.

## Future Check Design

A later bounded task may create a simple visual-drift check. That task should be separately approved and should not be bundled with component or screen implementation.

Possible future command concept, not implemented here:

```text
scan changed src files for raw hex, rgba/rgb, box-shadow, gradient, broad .is-active selectors, and inline style objects; report advisory findings with file and line references
```

Possible future output categories:

- `new-risk`: likely new drift in changed files;
- `legacy-risk`: existing value in untouched legacy files;
- `allowed-token`: token or token-file value;
- `needs-review`: ambiguous value that may be allowed but needs human review.

## Stop Conditions

Stop future script/check work if:

- it creates noisy false positives that make review less useful;
- prevention requires broad repo refactoring;
- the check would block existing legacy code without a migration plan;
- the check touches or rewrites source files;
- it requires token changes not already approved;
- it treats documentation examples as implementation violations;
- it attempts to solve Phase D/current-state CSS without a separate readiness gate.

## Recommendation

Use this prevention plan as a review gate before the first v0.1 component implementation task. Implement a simple advisory check only after the Acceleration Pack is reviewed and only through a separate bounded task.
