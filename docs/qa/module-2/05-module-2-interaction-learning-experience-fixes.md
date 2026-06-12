# Module 2 Interaction and Learning Experience Fixes

## Purpose

This file translates the Module 2 QA review findings into focused interaction and learning experience improvements for implementation.

Module 2 is conceptually strong and uses effective case studies, practice screens, hotspot diagrams, flip cards, and accountability repair activities. The main learning experience issue is not lack of interaction. The issue is that several screens rely on similar “open all to continue” or “click-to-reveal” mechanics, which can create interaction fatigue.

## Key QA finding

The QA review identifies repeated forced exploration patterns across many Module 2 screens, including:

- M2-S02
- M2-S03
- M2-S04
- M2-S05
- M2-S07
- M2-S08
- M2-S16
- M2-S18

The concern is that learners may become frustrated if they are repeatedly required to open every card, tab, hotspot, or reveal item before continuing.

## Core improvement principle

Do not remove interaction from Module 2. Instead, improve the learning value of interaction.

Each screen should answer this question:

> Does this interaction help the learner think, decide, compare, apply, or reflect — or is it only making them click?

## Recommended interaction strategy

### Keep strict gating where learning evidence matters

Keep completion gating on screens where learners need to demonstrate understanding or make a decision.

Recommended examples:

- matching activities
- scenario choices
- repair diagnosis activities
- knowledge checks
- portfolio/reflection saves

### Reduce strict gating on exploratory screens

For lower-stakes concept reveal screens, consider allowing learners to continue after a meaningful minimum has been explored.

Possible patterns:

- allow continue after 3 of 5 cards are explored
- allow continue after one required example and one optional example
- allow continue after a short “quick check”
- mark remaining items as optional enrichment
- keep “Explore all” visible but not required

### Vary interaction types

Avoid repeating the same reveal pattern too many times in sequence.

Possible alternatives:

- scenario-first question
- compare two options
- choose the strongest HRBA response
- diagnose the missing rights dimension
- short reflection
- progressive diagram reveal
- accordion with optional deeper reading
- quick role check
- “repair this indicator” micro-task

## Screen-specific recommendations

### M2-S03 — Human Rights as Everyday Claims

Current risk:
- Flip cards may feel useful once, but should not become a forced clicking exercise.
- Accessibility risk if hidden back-face text is read by screen readers before the card is opened.

Recommended improvement:
- Keep the flip-card interaction.
- Ensure learners can proceed after all core cards or after a meaningful minimum if the screen is not assessment-like.
- Add clear progress text such as “2 of 4 examples explored.”
- Ensure keyboard and screen-reader behavior is correct.

Priority: High for accessibility, Medium for learning experience.

---

### M2-S04 — Rights Dimensions Hotspot

Current risk:
- Hotspot screens can be engaging, but forced opening of every hotspot can become repetitive.
- Hotspot labels may be difficult to read if placed over a complex visual.

Recommended improvement:
- Keep the hotspot interaction because it supports visual diagnosis.
- Add clear hotspot progress.
- Consider allowing continuation after key hotspots are opened, while leaving the remaining hotspots as optional.
- Ensure the visual remains readable and labels have strong contrast.

Priority: High.

---

### M2-S06 — Match Rights Characteristics

Current risk:
- Matching activities can be difficult for keyboard and mobile users if implemented only as drag-and-drop.

Recommended improvement:
- Provide a clear non-drag alternative.
- Ensure Tab and Arrow key navigation works.
- Make selected states visible without relying only on color.
- Keep this screen gated because it checks understanding.

Priority: High.

---

### M2-S10 — Actor Ecosystem Roles

Current risk:
- A compact reveal screen with many actor definitions and a role check can become vertically dense.
- Learners may scroll down to the quiz and lose sight of definitions.

Recommended improvement:
- Keep actor definitions easy to reference.
- Consider a sticky summary, side anchor, or compact role legend.
- Ensure the role check feedback appears close to the learner’s selection.

Priority: Medium.

---

### M2-S14 and M2-S15 — Participation Spectrum and Practice

Current strength:
- The sequence from explanation to practice is strong.
- The practice screen reinforces learning effectively.

Recommended improvement:
- Ensure feedback appears immediately after selection.
- Keep the practice screen focused and not overcomplicated.

Priority: Low to Medium.

---

### M2-S16 — Accountability Loop

Current risk:
- The horizontal accountability loop may break awkwardly on smaller screens.
- Learners may need clearer progress or step state.

Recommended improvement:
- Make the loop responsive.
- Use a stacked or vertical version on smaller screens.
- Keep progress visible and readable.
- Avoid forcing too many repetitive reveals unless each step adds meaningful learning.

Priority: Medium.

---

### M2-S17 — Feedback Loop Repair

Current strength:
- The diagnose break → choose repair structure is effective and should be preserved.

Current risk:
- Radio grids can become visually complex.
- Correct/incorrect/selected states may rely too much on subtle color changes.

Recommended improvement:
- Strengthen selected, correct, and incorrect states with icons, border thickness, and text labels.
- Keep this screen gated because it is an applied practice screen.
- Ensure keyboard navigation and screen-reader support.

Priority: High.

---

### M2-S18 — Power and Exclusion Hotspots

Current risk:
- Hotspot text may blend into the background image.
- Learners may be required to open many hotspots after already experiencing similar reveal patterns earlier in the module.

Recommended improvement:
- Improve hotspot label containers.
- Make hotspot content visually distinct.
- Consider a guided sequence or grouped hotspot categories instead of forcing all hotspots as equal.
- Add a custom visual showing power dynamics clearly.

Priority: High.

---

### M2-S22 — Knowledge Check

Current risk:
- Standard MCQ accessibility issues may apply.
- Score/results should be announced dynamically.

Recommended improvement:
- Use `aria-live` or equivalent feedback announcement.
- Make correct/incorrect states visually and textually clear.
- Ensure keyboard flow is smooth.

Priority: Medium.

## Implementation guidance for Codex

Ask Codex to make interaction improvements in a focused pass.

Do not ask for broad redesign.

Suggested instruction:

> Improve Module 2 interaction experience by reducing repetitive forced reveal patterns where appropriate, while preserving required learning checks and portfolio tasks. Keep strict gating for assessment/practice screens, but allow partial exploration or optional enrichment on lower-stakes reveal screens. Improve progress messaging, feedback placement, and learner clarity. Do not remove learner-facing content. Do not redesign unrelated screens.

## Acceptance criteria

- Repetitive “open all to continue” behavior is reduced where appropriate.
- Required practice and knowledge check screens remain gated.
- Learners always know what they need to do next.
- Feedback appears close to the learner action.
- Progress messaging is clear.
- Interaction patterns feel more varied across Module 2.
- Keyboard navigation remains functional.
- `npm run build` passes.
