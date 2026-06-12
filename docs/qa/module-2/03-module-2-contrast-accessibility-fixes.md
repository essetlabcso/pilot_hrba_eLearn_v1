# Module 2 Contrast and Accessibility Fixes — HRBA E-learning Course

## Purpose of this file

This file defines the focused contrast, readability, and accessibility improvements needed for Module 2.

This should be treated as the first high-priority implementation brief because the QA report identified contrast and accessibility as the most urgent risks.

## Main problem

Some Module 2 UI elements are difficult to read because the text/background contrast is too weak.

The most clearly identified issue is the disabled Continue button pattern, where text and background colors are too close in value. This affects learners with low vision and weakens the perceived quality of the course.

## Affected screens

Known affected screens include:

- M2-S03
- M2-S10
- M2-S16
- M2-S17

The same pattern may also affect other Module 2 screens if they use the same shared button/component styles.

## Fix strategy

Prefer fixing contrast problems at the shared component or design-token level instead of making one-off screen fixes.

This may include:

- shared Button component
- disabled button class
- module screen CTA component
- card component styles
- progress indicator styles
- hotspot label styles
- feedback message styles
- selected/correct/incorrect option styles

## Contrast fixes needed

### 1. Disabled Continue buttons

Problem:

Disabled buttons are readable only with difficulty because the text/background contrast is too low.

Required fix:

- Keep the disabled state visually inactive.
- Increase text/background contrast to meet accessibility expectations.
- Ensure disabled buttons remain clearly distinguishable from active buttons.
- Apply the fix globally wherever the disabled Continue pattern is used in Module 2.

Suggested direction:

- Use darker disabled text.
- Or use a lighter disabled background with stronger text.
- Avoid very pale gray text on pale gray/slate backgrounds.
- Do not make disabled buttons look active.

### 2. Muted helper text

Problem:

Helper text may be too pale, especially on pale mint, white, or gradient backgrounds.

Required fix:

- Strengthen helper text color.
- Keep helper text visually secondary but readable.
- Check line height and font size.

### 3. Progress indicators

Problem:

Progress bars/tracks may have weak contrast between filled and empty states.

Required fix:

- Ensure the progress fill is visibly distinct from the track.
- Ensure progress labels such as “2 of 6 explored” are readable.
- Ensure local progress remains visible near the interaction it refers to.

### 4. Selected, correct, and incorrect states

Problem:

Some interactive states may rely mostly on subtle color differences.

Required fix:

- Add stronger borders, icons, labels, or text cues.
- Ensure states are clear without relying only on color.
- Ensure selected/correct/incorrect states work in light and dark areas.

Affected screen:

- M2-S17 Feedback Loop Repair radio grid

### 5. Hotspot labels

Problem:

Hotspot labels may sit over complex images and become difficult to read.

Required fix:

- Add solid or semi-transparent background containers behind hotspot text.
- Ensure label text has sufficient contrast.
- Add padding and border radius.
- Avoid labels blending into the underlying image.
- Ensure labels are readable on desktop, tablet, and mobile.

Affected screen:

- M2-S18 Power and Exclusion Hotspots

### 6. Text over gradients or pale backgrounds

Problem:

Kickers, subheadings, and labels may fade into gradient backgrounds or pale panels.

Required fix:

- Check all screen kickers, subheadings, labels, and captions.
- Strengthen text color where needed.
- Avoid using very light text on pale mint backgrounds.

## Accessibility fixes needed

### 1. Keyboard navigation

All interactive elements must be reachable and usable with keyboard navigation.

Check:

- Tab order
- Enter/Space activation
- Arrow-key behavior where appropriate
- visible focus styles
- no keyboard trap

Priority screens:

- M2-S03 flip cards
- M2-S06 matching activity
- M2-S17 radio grid
- M2-S18 hotspots
- M2-S22 knowledge check

### 2. Focus states

Focus states must be clear and high contrast.

Required fix:

- Add or strengthen focus rings.
- Ensure focus rings are visible against pale mint, white, dark navy, and image backgrounds.
- Do not remove browser focus outlines unless replacing them with accessible custom focus styles.

### 3. Flip-card accessibility

Affected screen:

- M2-S03 Human Rights as Everyday Claims

Required checks:

- Front and back content should be handled correctly for screen readers.
- Hidden card faces should not be read prematurely.
- Revealed content should become available when the card is activated.
- Buttons/cards should have clear labels.

### 4. Matching activity accessibility

Affected screen:

- M2-S06 Match Rights Characteristics

Required checks:

- Do not rely only on drag-and-drop.
- Provide or confirm non-drag fallback such as dropdown/select or button-based matching.
- Ensure keyboard and mobile learners can complete the activity.
- Ensure instructions clearly explain the available interaction method.

### 5. Radio grid accessibility

Affected screen:

- M2-S17 Feedback Loop Repair

Required checks:

- Radio options must have clear labels.
- Group labels must be meaningful.
- Selected/correct/incorrect states must not rely on color alone.
- Feedback should be associated with the selected option.

### 6. Hotspot accessibility

Affected screen:

- M2-S18 Power and Exclusion Hotspots

Required checks:

- Hotspots must be keyboard accessible.
- Hotspot labels must be meaningful.
- Revealed content should be announced or focus should move logically.
- Important image information must have alt text or adjacent long description.

### 7. Knowledge check feedback

Affected screen:

- M2-S22 Module 2 Knowledge Check

Required checks:

- Feedback and score/results should be announced dynamically.
- Use aria-live or similar accessible pattern where appropriate.
- Correct/incorrect indicators should not rely on color alone.

### 8. Alt text and long descriptions

Learning-critical visuals must not be treated as decorative.

Required for:

- actor maps
- exclusion pathways
- hotspot diagrams
- accountability loop diagrams
- process maps

If a visual contains important learning information, provide either:

- meaningful alt text, or
- adjacent long description/details block, or
- visible text summary near the graphic

## Codex implementation constraints

When asking Codex to implement this file:

- Do not redesign Module 2.
- Do not change learner-facing content unless required for accessibility labels.
- Do not weaken TypeScript settings.
- Do not disable accessibility-related rules.
- Do not use fake fixes such as console logs or unused references.
- Prefer shared components/design tokens over repeated one-off fixes.
- Run `npm run build`.
- Fix all build errors before committing.

## Suggested Codex prompt

```text
Task: Implement Module 2 contrast and accessibility fixes using the brief in docs/qa/module-2/03-module-2-contrast-accessibility-fixes.md.

Focus on shared styles/components where possible.

Do not redesign Module 2. Do not change learner-facing content unless needed for accessibility labels. Do not disable TypeScript or accessibility standards.

Fix disabled Continue button contrast, muted text readability, progress indicator contrast, selected/correct/incorrect state clarity, hotspot label readability, keyboard/focus behavior, and accessibility support for flip cards, matching activity, radio grids, hotspots, and knowledge check feedback.

Run npm run build and fix any errors.

Commit message: Improve Module 2 contrast and accessibility.
```

## Acceptance checklist

Before the task is complete:

- [ ] Disabled Continue buttons are readable.
- [ ] Helper text is readable.
- [ ] Progress indicators have clear contrast.
- [ ] Hotspot labels are readable over visuals.
- [ ] Selected/correct/incorrect states are not color-only.
- [ ] Keyboard focus states are visible.
- [ ] Flip cards are keyboard accessible.
- [ ] Matching activity has keyboard/non-drag support.
- [ ] Radio grids are accessible.
- [ ] Knowledge check feedback is accessible.
- [ ] Learning-critical visuals have alt text or long descriptions.
- [ ] `npm run build` passes.
