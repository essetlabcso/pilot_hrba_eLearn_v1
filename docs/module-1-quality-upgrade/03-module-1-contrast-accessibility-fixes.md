# 03 — Module 1 Contrast and Accessibility Fixes

## Purpose

Define the focused Phase 1 implementation checklist for fixing Module 1 readability, contrast, and accessibility issues.

## Scope

Module 1 only.

This phase must fix core readability and accessibility issues before visual upgrades or UX polish.

---

## Primary Goal

Make Module 1 readable, accessible, and comfortable to use across all screens, interaction states, and common viewport sizes.

---

## Critical Contrast Fixes

### 1. Text on pale mint / green / light backgrounds

Fix any case where light text appears on pale mint, soft green, gradient, or light card backgrounds.

Required direction:

- use deep navy or another strong dark text color
- keep body text highly readable
- avoid pale gray text on pale backgrounds
- ensure helper text is still readable

Pay special attention to:

```text
M1-S1-05 — selected/active clue cards
M1-S1-03 — active/visited journey steps
M1-S1-06B — perspective cards and hover/focus states
M1-S1-07 — ripple nodes and active states
```

---

### 2. Text on dark navy / dark feedback panels

Fix any case where muted text appears on dark navy or colored feedback panels.

Required direction:

- use white or near-white text on dark panels
- avoid dark gray text on navy
- ensure feedback rationale text is readable
- ensure links/buttons inside feedback panels remain visible

Pay special attention to:

```text
M1-S1-06 — feedback panel
Global help/overlay panels
Modal text on dark or semi-dark surfaces
```

---

### 3. Disabled button contrast

Disabled buttons should look inactive but remain readable.

Required direction:

- avoid very pale grey text on grey/white backgrounds
- ensure disabled text has acceptable contrast
- add helper text explaining why the button is disabled where needed
- do not make disabled buttons look like primary active buttons

Pay special attention to:

```text
M1-S2-02 — Participation ladder continue button
Any “Continue” button gated by required interaction
```

---

### 4. Small helper text and labels

Fix small pale helper text that becomes hard to read.

Required direction:

- increase contrast
- use slightly stronger font weight where needed
- avoid overly small text in cards, surveys, overlays, and badges
- keep line height comfortable

Pay special attention to:

```text
survey screens
priority/checklist screens
progress indicators
modal helper text
card captions
```

---

## Accessibility Fixes

### 1. Modal focus behavior

Check all Module 1 screens using modal or overlay behavior.

Required behavior:

- focus moves into the modal when it opens
- focus is trapped inside the modal while open
- Escape key closes the modal if existing design supports it
- close button is keyboard reachable
- focus returns to the exact triggering button/card after close
- modal has appropriate role/aria attributes
- modal title/description is announced clearly

Pay special attention to:

```text
M1-S1-05
M1-S1-06
M1-S1-06A
M1-S1-07
```

---

### 2. Visible focus states

All interactive elements need clear focus states.

Check:

- cards
- clue buttons
- ripple nodes
- modal close buttons
- CTA buttons
- radio buttons
- checkboxes
- navigation buttons
- sidebar links
- survey options

Required direction:

- visible outline or ring
- high contrast
- not hidden by shadows or background gradients
- consistent across Module 1

---

### 3. Selected states must not rely only on color

Where learners select or complete an item, use more than color.

Acceptable indicators:

- checkmark
- stronger border
- icon
- label such as “Selected” or “Completed”
- structural change in the card
- progress count update

Apply to:

```text
selected clue cards
completed exploration cards
survey/radio choices
knowledge check selections
ripple nodes
```

---

### 4. Touch target size

Interactive controls should be comfortable to use.

Improve:

- radio buttons
- checkboxes
- Likert items
- small icon buttons
- ripple nodes
- card buttons

Recommended minimum:

```text
44px x 44px
```

---

### 5. Informational images and diagrams

For existing informational visuals:

- provide meaningful alt text or visually hidden description
- do not use empty alt text for meaningful diagrams
- use empty alt text only for decorative images

Pay special attention to:

```text
connected rights/ripple visual
future actor map
future services-to-rights pathway
```

---

## Progress and Completion Readability

Improve progress indicators without making the UI noisy.

Check:

- module progress
- screen progress
- “x of y explored”
- completed badges
- locked/unlocked states
- current screen state

Required direction:

- make progress indicators readable
- use clear text contrast
- use consistent badge/pill styling
- ensure progress is not communicated by color only

---

## Screen-Specific Checklist

### M1-S1-05 — Investigate the HRBA Lens

Fix:

- active clue card contrast
- selected/completed visual state
- clue modal focus behavior
- modal action button contrast
- helper text readability
- progress count visibility

### M1-S1-06 — So, What Is HRBA?

Fix:

- feedback panel text contrast
- answer state contrast
- confirm/continue button contrast
- feedback focus/announcement if feasible
- rationale readability

### M1-S1-07 — Rights Are Connected

Fix:

- node contrast
- selected node state
- modal placement/readability
- accessible description of connected rights visual
- focus state for nodes

### M1-S2-02 — Participation Is More Than Attendance

Fix:

- disabled continue button readability
- helper instruction for required steps
- active/current ladder step contrast
- completed step state

### Survey / priority screens

Fix:

- label readability
- radio/checkbox touch target size
- selected state beyond color
- helper text contrast
- spacing for smaller screens

### Global Module 1 overlays

Fix:

- overlay text size
- overlay text contrast
- close button focus state
- keyboard behavior
- focus return

---

## Do Not Do In This Phase

Do not:

- add the new actor map
- add the services-to-rights pathway
- add the water story visual
- redesign Module 1
- change Module 1 sequence
- rewrite learner-facing content
- touch unrelated modules
- disable TypeScript or accessibility checks
- add unnecessary dependencies

---

## Validation

After implementation, run:

```bash
npm run build
```

Fix all errors before committing.

Recommended commit message:

```text
Improve Module 1 contrast and accessibility
```

---

## Final Codex Summary Required

At the end of the task, summarize:

- files changed
- screens affected
- contrast fixes made
- accessibility fixes made
- build result
- whether changes were pushed
