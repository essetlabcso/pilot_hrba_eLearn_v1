# M2-S02 Design Specification  
## Learning Objectives: What You Will Be Able to Do

## 1. Screen identity

| Field | Specification |
|---|---|
| Course | Applying a Human Rights-Based Approach in Local CSO Practice |
| Module | Module 2 — Foundations of HRBA: Rights, Actors, Principles, and Power<br>Practical focus: Rights in Everyday CSO Work |
| Screen ID | M2-S02 |
| Screen title | What you will be able to do |
| Screen type | Learning objectives / module orientation |
| Position in module | Immediately after Module 2 cover screen and before the opening scenario |
| Previous screen | M2-S01 — Module Cover: Foundations of HRBA: Rights, Actors, Principles, and Power<br>Practical focus: Rights in Everyday CSO Work |
| Next screen | M2-S03 — Opening Scenario: When a Service Problem Is Also a Rights Issue |
| Design status | Draft v1 for clean implementation |

---

## 2. Purpose of the screen

This screen tells learners what they will be able to do by the end of Module 2.

It should create clarity, motivation, and direction before learners enter the opening scenario.

The screen must not feel like a static bullet list. It should feel like a premium module-orientation screen with clear learning outcomes and a practical output promise.

---

## 3. Approved design-system references

Use and follow:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
docs/design-system/02_COURSE_PLAYER_SYSTEM.md
docs/design-system/03_BLOCK_TEMPLATE_LIBRARY.md
docs/design-system/04_SCREEN_TEMPLATE_LIBRARY.md
docs/design-system/05_INTERACTION_LOGIC_PATTERNS.md
docs/design-system/06_ACCESSIBILITY_AND_SAFETY_RULES.md
docs/design-system/07_VISUAL_ASSET_RULES.md
docs/design-system/08_AGENT_IMPLEMENTATION_RULES.md
docs/design-system/09_QA_AND_EVIDENCE_PACK_STANDARD.md
```

---

## 4. Approved screen template

Use:

```text
screen-learning-journey
```

Variant:

```text
journey-practice-path
```

This screen functions as a compact module learning-objectives path.

---

## 5. Approved block types

Use approved blocks only:

| Block           | Variant                    | Purpose                                          |
| --------------- | -------------------------- | ------------------------------------------------ |
| ScreenHeader    | Standard                   | Eyebrow, title, short instruction                |
| FlashcardGrid   | flashcard-principle-action | Each objective reveals what it means in practice |
| StatementBlock  | statement-bridge           | Connect objectives to the opening scenario       |
| CompletionState | Standard                   | Confirm all objectives viewed                    |

Do not create a new custom block type unless necessary. If an `ObjectiveOverviewCards` component already exists, it may be used only if it follows the FlashcardGrid / card reveal behavior and design-system rules.

---

## 6. Fit status

```text
fit-required
```

The screen must fit the desktop course canvas without vertical scrolling.

If it does not fit, reduce spacing, tighten card text, or use a two-row card layout. Do not make it a long scroll page.

---

## 7. Learner-facing content

### Eyebrow

```text
MODULE 2 · LEARNING OBJECTIVES
```

### Title

```text
What you will be able to do
```

### Short instruction

```text
Explore the objectives. Each one shows how this module will help you use human rights as a practical lens in everyday CSO work.
```

### Intro text

```text
In this module, human rights will move from distant legal language into practical CSO decisions: who is included, who is heard, who has responsibility, and how people can seek answers.
```

---

## 8. Objective cards

Use six objective cards.

Each card should show a short front label and reveal a practical meaning when selected.

### Objective 1

Front:

```text
Explain human rights simply
```

Reveal:

```text
Describe human rights in plain language connected to dignity, equality, safety, voice, opportunity, and accountability.
```

### Objective 2

Front:

```text
Recognize rights issues
```

Reveal:

```text
Notice when an everyday service or project problem may also involve exclusion, discrimination, lack of participation, or unmet responsibility.
```

### Objective 3

Front:

```text
Identify rights dimensions
```

Reveal:

```text
Connect everyday CSO issues to rights dimensions such as access to services, participation, safety, equality, information, and public responsibility.
```

### Objective 4

Front:

```text
Map actors and barriers
```

Reveal:

```text
Distinguish rights-holders, duty-bearers, supporting actors, and the barriers that prevent some groups from enjoying their rights.
```

### Objective 5

Front:

```text
Use standards safely
```

Reveal:

```text
Refer to human rights standards as practical guidance for CSO decisions without becoming overly legalistic or unsafe.
```

### Objective 6

Front:

```text
Apply an everyday rights lens
```

Reveal:

```text
Use a simple rights-mapping worksheet to analyze one CSO project issue and identify a safer, more rights-based improvement.
```

---

## 9. Practical output promise

Show this as a small bridge statement or output chip near the bottom of the screen:

```text
By the end of this module, you will produce an Everyday Rights Mapping Worksheet that helps connect one CSO issue to rights, responsibilities, participation, and accountability.
```

---

## 10. Interaction logic

Use click/tap-to-reveal objective cards.

Required behavior:

1. Display six objective cards.
2. Each card starts with the short front label.
3. Learner clicks/taps or focuses and activates a card.
4. The card reveals the practical meaning.
5. Mark each revealed card as viewed.
6. Continue remains disabled until all six objective cards are viewed.
7. After all cards are viewed, show a completion cue:

```text
You have reviewed the module objectives. Continue to the opening scenario.
```

8. Continue button becomes enabled.

Completion rule:

```text
all-cards-flipped
```

---

## 11. Accessibility requirements

The objective cards must be accessible.

Required behavior:

* Each card must be keyboard operable.
* Enter or Space reveals a focused card.
* Card state must be communicated as viewed/revealed.
* Front and reveal text must be available to screen readers.
* Focus state must be visible.
* On mobile, cards should stack or use a two-column responsive layout only if readable.
* Do not use hover-only behavior.
* Do not rely on color alone to show viewed state.

---

## 12. HRBA safety requirements

This screen does not ask learners to enter personal or organizational information.

Safety level:

```text
Low
```

Do not add reflection fields or learner input to this screen.

Do not ask learners to provide real examples, complaints, names, sensitive cases, or confidential organizational information.

---

## 13. Visual design direction

The screen should feel calm, premium, and structured.

Recommended layout:

Desktop:

```text
Top: Screen eyebrow, title, short instruction
Middle: Six reveal cards in a balanced 3 × 2 grid
Bottom: Practical output promise + completion cue
```

Alternative desktop layout if stronger:

```text
Left: Title, intro, output promise
Right: Six compact reveal cards in 2 × 3 grid
```

Mobile:

```text
Title
Intro
Stacked objective cards
Output promise
Completion cue
```

Visual style:

* white or soft-blue premium card surface;
* rounded cards;
* subtle shadow;
* DEC blue for active/revealed state;
* soft green check marker for viewed cards;
* warm gold used sparingly for output promise;
* no heavy illustration required;
* optional subtle abstract background shape only if already part of the course system.

Do not use a large image unless the existing module cover visual can be reused subtly without overwhelming the objective cards.

---

## 14. Asset requirements

No new visual asset is required for this screen.

If a decorative visual is used, it must be subtle and must not distract from the learning objectives.

Asset status:

```text
No required asset.
```

Alt text:

```text
No meaningful image required.
```

---

## 15. Navigation behavior

Previous:

```text
Back to Module 2 cover
```

Continue:

```text
Continue to opening scenario
```

Continue should remain disabled until all six objective cards are viewed.

Disabled Continue helper text:

```text
Review each objective to continue.
```

---

## 16. Acceptance criteria

The screen is accepted only if:

* It uses the approved course player shell.
* It appears after M2-S01 and before M2-S03.
* It uses the approved design-system tokens.
* It does not introduce new colors, fonts, shadows, or card styles.
* It uses approved reveal-card / flashcard behavior.
* All six objectives are visible and readable.
* Each card reveals practical meaning when clicked/tapped/keyboard activated.
* Continue remains disabled until all six cards are viewed.
* Completion cue appears after all cards are viewed.
* Desktop layout fits without vertical scrolling.
* Mobile layout is readable and usable.
* Keyboard interaction works.
* Focus states are visible.
* Screen-reader labels and states are meaningful.
* No sensitive learner input is requested.
* No console or runtime errors occur after implementation.

---

## 17. Evidence required after implementation

When this screen is later implemented, return an evidence pack including:

* changed files;
* screen/component affected;
* desktop screenshot or visual verification;
* mobile screenshot or visual verification;
* keyboard interaction notes;
* accessibility notes;
* confirmation that no learner input or sensitive disclosure is requested;
* completion-rule verification;
* known issues;
* acceptance checklist.
