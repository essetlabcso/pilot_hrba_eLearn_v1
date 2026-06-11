# Module 2 Design and Visual Interaction Specification

## Module title

**Module 2: Human Rights in Everyday CSO Work**

## Design purpose

Module 2 should feel practical, grounded, calm, and confidence-building. It should help participants see that human rights are not distant legal language but practical standards for understanding dignity, exclusion, participation, responsibility, and accountability in everyday CSO work.

The visual experience should not feel like a legal manual, static PDF, generic LMS, or compliance checklist. It should feel like a guided premium learning journey for local and grassroots CSO practitioners.

## Visual identity

| Use | Color |
|---|---|
| Primary action / active progress | `#3B99D4` |
| Positive accent / completion / growth | `#91C852` |
| Deep heading / navigation text | `#0F172A` |
| Main text | `#111827` |
| Secondary text | `#6B7280` |
| Background | `#F9FAFB` |
| Card background | `#FFFFFF` |
| Border | `#E5E7EB` |
| Warning / safety accent | `#F97316` |
| Critical safety warning only | `#EF4444` |

## General treatment

Use:

- light page background;
- white cards;
- generous spacing;
- soft shadows;
- rounded corners;
- clear headings;
- short content blocks;
- accessible contrast;
- locally grounded illustrations or neutral CSO practice visuals;
- no crowded legal-document aesthetic.

Avoid:

- dark, heavy, legalistic design;
- generic corporate stock imagery;
- crowded text walls;
- decorative interactions with no learning purpose;
- color-only meaning;
- unreadable text embedded in images;
- risky or identifiable community images.

## Course-player layout

Desktop:

- top app bar with course title and progress;
- left sidebar with module and section navigation;
- centered main learning canvas;
- optional right drawer for glossary/resources/notes/portfolio tracker;
- clear Continue button;
- progress indicator showing current Module 2 section.

Mobile:

- single-column layout;
- nav collapses to drawer or progress menu;
- tabs become accordion;
- timeline becomes vertical steps;
- hotspot labels become numbered reveal cards;
- sorting/matching use tap or dropdown alternatives;
- large touch targets.

## Section design rules

| Section | Visual / interaction treatment |
|---|---|
| Section 1 — Start Module 2 | Warm bridge cards, objective/output preview, safety note |
| Section 2 — What Are Human Rights? | Micro-lesson cards, statement block, private portfolio panel |
| Section 3 — Human Rights in Everyday Life | Scenario card, labeled graphic/hotspot, matching activity, worksheet card |
| Section 4 — Characteristics of Human Rights | Flashcards, mini-scenario, quick check |
| Section 5 — Types of Rights | Tabs, sorting activity, relevance note |
| Section 6 — Human Rights Systems and Standards | Timeline, non-legal-advice callout, fictional case, safe-use checklist |
| Section 7 — Connecting Human Rights to CSO Practice | Process block, scenario, tool worksheet, portfolio checkpoint, final quiz |

## Block-type design patterns

### Hero / bridge card

Use for `M2-S1-01`.

- large heading;
- one short paragraph;
- local CSO visual;
- key message chip;
- primary CTA.

### Micro-lesson card

Use for definition and explainer screens.

- white card;
- short paragraphs;
- bullets;
- key message;
- Continue button.

### Statement / key message card

Use light blue tint, green accent line, bold key statement.

### Hotspot / labeled graphic

Use for `M2-S3-02`.

- fictional community scene;
- six accessible labels;
- click/tap label opens explanation;
- full text alternative below;
- no hover-only behavior.

### Flashcards

Use for `M2-S4-02`.

- four cards in two-by-two desktop grid;
- stacked on mobile;
- each opens/flips;
- accessible list fallback.

### Tabs / accordion

Use for `M2-S5-02`.

- tabs on desktop;
- accordion on mobile;
- clear active state;
- keyboard accessible.

### Timeline

Use for `M2-S6-02`.

- horizontal timeline desktop;
- vertical timeline mobile;
- each point opens short explanation;
- text alternative below.

### Matching and sorting

Use for `M2-S3-03` and `M2-S5-03`.

- card-based options;
- category chips;
- visible feedback;
- retry option;
- non-drag alternative required.

### Scenario decision

Use for `M2-S7-05`.

- scenario card on top;
- question below;
- answer options as large selectable cards;
- feedback panel below selected answer;
- no pass/fail.

### Tool activity / worksheet

Use for `M2-S3-04` and `M2-S7-03`.

- tool purpose card;
- worksheet fields preview;
- two actions: Download worksheet / Complete in platform;
- privacy/safety note;
- optional save to portfolio where supported.

### Portfolio panel

Use for `M2-S2-04`, `M2-S3-05`, `M2-S5-05`, `M2-S7-04`, and `M2-S7-06`.

- private portfolio badge;
- private-by-default note;
- structured fields first;
- optional note last;
- safety helper before text field;
- Save and Skip options;
- confirmation card after save.

### Quiz card

Use for `M2-S4-04`, `M2-S6-06`, and `M2-S7-07`.

- one question per card or short stacked list;
- answer options as accessible buttons/radio choices;
- feedback after answer/submission;
- no red failure state;
- no pass/fail.

## Interaction states

| State | Design rule |
|---|---|
| Default | White card, readable text, clear CTA |
| Selected | Blue border, selected label, no color-only indicator |
| Best-response feedback | Green accent; starts with “That’s right.” or “Good choice.” |
| Weaker-response feedback | Neutral or soft amber accent; starts with “Not quite.” |
| Saved portfolio | Green accent confirmation; “Saved privately to your HRBA Learning Portfolio.” |
| Safety state | Orange accent; calm protective tone |

## Design no-drift rules

The coding agent must not:

- turn Module 2 into a static article;
- remove the portfolio checkpoint;
- hide safety reminders;
- make worksheets download-only;
- require real examples;
- require uploads;
- use pass/fail language;
- use “Incorrect” feedback;
- imply Module 2 quiz affects certificate;
- invent asset filenames;
- expose screen IDs or block IDs to learners;
- use inaccessible drag-only interactions;
- rely on images without alt text;
- create legal-advice language;
- add public sharing of portfolio content.

The coding agent must:

- preserve the approved seven-section sequence;
- implement all 36 screens/blocks;
- keep all checks formative;
- keep the final quiz to five MCQs;
- use private-by-default portfolio behavior;
- include downloadable and in-platform worksheet options;
- implement text alternatives for visuals;
- use DEC/CSO Learning Hub visual identity;
- keep tone practical, locally grounded, and non-legalistic.
