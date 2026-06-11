# 05 — Module 1 UX Polish Plan

## Purpose

Define focused learner experience improvements for Module 1 after the core contrast/accessibility and visual learning support fixes.

## Scope

Module 1 only.

Do not redesign the course.

Do not change unrelated modules.

Do not rewrite learner-facing content unless a short helper instruction is needed for clarity.

---

## UX Polish Priorities

| Priority | Area | Required Improvement | Impact |
|---|---|---|---|
| High | Disabled continue buttons | Make disabled states readable and explain what learners must complete before continuing. | Prevents learner confusion and getting stuck. |
| High | Completion feedback | Make explored/completed states clearer after required interactions. | Builds confidence and reinforces progress. |
| Medium | Sub-progress indicators | Make indicators such as “2 of 4 explored” more visible. | Helps learners know what remains. |
| Medium | Portfolio save feedback | Add clear saved confirmation if portfolio/reflection saving exists. | Builds trust in the system. |
| Medium | Modal placement | Ensure modals do not fully obscure important visuals, especially on smaller screens. | Improves interaction flow. |
| Medium | Responsive behavior | Ensure card grids, surveys, and interactive elements work well on smaller laptops and tablets. | Improves usability. |
| Low | Completion screen CTAs | Visually distinguish “Review Module” and “Return to Course Page.” | Improves end-of-module clarity. |

---

## Detailed UX Checklist

### 1. Disabled / Locked Continue Behavior

Check all Module 1 screens where the learner must complete an action before continuing.

Improve:

- disabled button readability
- helper text explaining what remains
- visual state of incomplete vs complete
- focus behavior around disabled controls

Recommended helper examples:

```text
Explore all clues to continue.
Select one answer to continue.
Complete this reflection to continue.
Review each step before moving forward.
```

Do not over-explain. Keep helper text short.

---

### 2. Interaction Completion Feedback

For interactive screens, ensure learners clearly understand when they have completed the task.

Check:

- clue cards
- ripple nodes
- card explorations
- surveys
- knowledge checks
- portfolio prompts
- modal-based interactions

Improve using:

- completed badges
- checkmarks
- stronger selected borders
- short success text
- progress count
- accessible status announcement where appropriate

Avoid relying only on color.

---

### 3. Sub-Progress Indicators

Make sub-progress more visible but not distracting.

Examples:

```text
2 of 4 clues explored
All perspectives reviewed
Step 3 of 5
Reflection saved
```

Recommended treatment:

- small but readable pill/badge
- high contrast
- placed near the main task instruction or CTA
- consistent across Module 1

---

### 4. Portfolio Save Feedback

If Module 1 includes save-to-portfolio or reflection-saving behavior, ensure the learner receives confirmation.

Recommended feedback options:

- “Saved to portfolio”
- checkmark badge
- brief toast
- inline confirmation state

Requirements:

- visible
- accessible
- does not interrupt flow
- persists long enough to be noticed

---

### 5. Modal and Overlay Experience

Check all Module 1 modal-based interactions.

Improve:

- focus moves into modal when opened
- focus is trapped inside modal while open
- focus returns to trigger element when closed
- close button has visible focus state
- modal text is readable
- modal actions are clear
- modal does not obscure the original learning context unnecessarily

On smaller screens:

- modal should fit viewport
- content should scroll internally if needed
- important background visuals should not be permanently hidden

---

### 6. Responsive Layout

Check smaller laptop/tablet widths.

Focus on:

- six-card grids
- perspective cards
- survey/Likert items
- ripple interaction
- navigation/sidebar
- bottom CTA area
- modal overlays

Required improvements:

- grids collapse gracefully
- text remains readable
- touch targets remain comfortable
- no horizontal scrolling
- CTA remains accessible

---

### 7. Navigation and Completion Flow

Check:

- Back button
- Continue button
- current screen highlight
- completed screen state
- locked/unlocked screen state
- module progress bar
- return to course page
- review module action

Improve:

- visual distinction between primary and secondary CTAs
- completion screen clarity
- progress visibility without clutter

---

## Do Not Do

- Do not redesign Module 1.
- Do not change the module sequence.
- Do not remove required interactions.
- Do not simplify learning content without approval.
- Do not touch unrelated modules.
- Do not add new major visual assets in this phase.

---

## Validation

After implementation, run:

```bash
npm run build
```

Fix any build errors before committing.

Recommended commit message:

```text
Polish Module 1 learner experience
```
