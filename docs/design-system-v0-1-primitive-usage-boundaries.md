# Design System v0.1 Primitive Usage Boundaries

Draft v0.1 - Documentation-only usage guide for Callout, Card, and Button

## Purpose

This guide defines safe future usage boundaries for the existing Design System v0.1 Callout, Card, and Button primitives.

It prepares later learning block, screen template, and vertical slice specifications. It does not approve screen integration by itself.

This guide does not implement code, CSS, tokens, components, learning blocks, screen templates, screens, scripts, routing, progress, assessment, certificate logic, content, assets, module CSS, old HRBA files, or course behavior.

## Current Primitive Status

| Primitive | Current status | Boundary |
| --- | --- | --- |
| Callout | Presentational primitive; PASS WITH CAUTION after independent re-evaluation. | Highlights short, meaningful messages without owning behavior or course state. |
| Card | Presentational primitive; PASS WITH CAUTION after independent re-evaluation. | Groups related content without choosing page-level heading hierarchy or owning interaction behavior. |
| Button | Native behavior-free primitive; PASS WITH CAUTION after independent evaluation. | Provides native button structure and variants without routing, progress, or application behavior ownership. |

None of these primitives owns routing, progress, completion, assessment, certificate, player, modal, drawer, HelpOverlay, Captions/transcript, platform, course, module, or screen behavior.

No Callout, Card, or Button screen integration has happened yet.

## Cross-Primitive Rules

- Primitives provide structure and visual consistency, not course logic.
- Future screens, templates, and learning blocks must own learning purpose, semantic structure, completion rules, and behavior contracts.
- Primitives must not introduce raw visual values, local ad hoc styling, routing, progress, completion, assessment, certificate logic, storage, or state migration.
- Primitives must not substitute for an approved learning block or screen template.
- Future primitive use must map to a learning purpose, block/template role, and QA evidence.
- Primitive composition must stay shallow and purposeful; do not build unapproved blocks by nesting primitives creatively.
- If usage requires new CSS, token edits, route/progress logic, selected/current state, disabled-state migration, storage, or assessment behavior, stop and create a separate specification first.

## Callout Usage Boundaries

### When To Use Callout

Use Callout for a short, meaningful message that supports nearby learning content:

- key HRBA reminder;
- brief practical takeaway;
- caution about safe practice;
- implementation note in a learning flow;
- short principle that should guide a later activity.

### When Not To Use Callout

Do not use Callout for:

- decoration;
- a generic card replacement;
- a full scenario container;
- a knowledge-check feedback engine;
- a status, progress, completion, selected, current, or locked state;
- a danger, destructive, or error state until separately specified;
- a substitute for screen headings or content hierarchy.

### Variant Guidance

| Variant | Use | Do not use for |
| --- | --- | --- |
| `info` | Neutral guidance, context, reminder, or explanatory note. | Every visually important sentence on a screen. |
| `success` | Positive learning reinforcement or safe practice affirmation. | Completion state, scoring, correctness, or progress success unless separately specified. |
| `warning` | Caution, safe-practice reminder, or common pitfall. | Error, danger, destructive, assessment failure, or urgent alert behavior. |

Visible text must carry the meaning. Color, icon, or border treatment must never be the only signal.

### Title And Icon Guidance

- Use `title` when the Callout needs a short visible label such as `Key HRBA reminder`.
- Do not use `title` as the screen heading.
- Keep the title concise.
- Icons are decorative in the current primitive because they render with `aria-hidden="true"`.
- Do not use icon-only meaning; repeat meaning in visible text.

### Length Limits

- Prefer one short paragraph or a short list.
- Avoid using Callout for dense explanations.
- If the content needs multiple sections, use a block/template specification instead.

### Accessibility Expectations

- Meaning must be available through text, not color alone.
- Reading order must make sense without the visual accent.
- Use `as="aside"` only when the message is truly complementary to the surrounding content.
- Do not use Callout for live regions, alerts, dismissible notices, or focus management.

### Examples

- `info` Callout: `Key HRBA reminder: Participation means people influence decisions, not only attend meetings.`
- `warning` Callout: `Keep examples general and safe. Do not include names, active disputes, or sensitive details.`
- `success` Callout: `Good practice: The plan names both rights-holders and duty-bearers.`

### Non-Examples

- A colored banner at the top of every screen with no instructional purpose.
- A full participation dilemma scenario placed inside Callout.
- A green Callout used to mark a screen complete.
- A warning Callout used as assessment feedback without a feedback specification.

### Stop Conditions

Stop if Callout use requires danger/error semantics, live-region behavior, completion status, scoring feedback, animation, dismissal, new variants, new CSS, token edits, or screen-heading responsibility.

## Card Usage Boundaries

### When To Use Card

Use Card for grouping related content that needs a clear surface:

- content grouping;
- case summary;
- short evidence block;
- principle explanation;
- comparison item;
- resource grouping;
- static scenario or actor summary, if decision behavior is not included.

### When Not To Use Card

Do not use Card as:

- a clickable card;
- a routing container;
- a progress/completion state;
- a modal or dialog replacement;
- a knowledge-check option group;
- a scenario decision engine;
- a reflection input container with storage behavior;
- a substitute for page or screen layout templates.

### Title And Heading Hierarchy

The current Card title renders as neutral text, not a heading element. This is acceptable at primitive level because the primitive should not choose page-level heading depth blindly.

Future screen, template, or block specifications must decide heading hierarchy before using Card title text as part of page structure.

Rules:

- If Card title is only a visual label inside an already structured block, `title` may be acceptable.
- If the title must participate in the page heading outline, the caller, block, or template must provide appropriate heading semantics.
- Do not use a Card title as the only visible screen heading.
- Do not place unrelated heading levels inside Card without a template rule.

### Eyebrow, Footer, And Children

- Use `eyebrow` for a short category label, not for essential instructions.
- Use `children` for the core grouped content.
- Use `footer` only for supporting content or a later approved action area.
- A footer may contain Button only when the action is local, non-routing, non-progress, and behavior ownership is defined outside the primitive.

### Article, Section, And Div

The primitive supports `section`, `article`, and `div`.

- Use `section` when the Card represents a meaningful section and heading semantics are handled by the caller/template.
- Use `article` only for independently meaningful content, such as a standalone case summary.
- Use `div` for visual grouping with no independent semantic section.
- Do not rely on Card's default element choice as a full template decision.

### Accessibility Expectations

- Preserve heading hierarchy intentionally.
- Do not create clickable-card behavior.
- Do not add role inflation.
- Ensure grouped content reads in a sensible order.
- Avoid using Card for selected/current/completed/locked/progress states.

### Examples

- A Card grouping a rights-holder actor summary with a short definition and example.
- A Card grouping a duty-bearer responsibility summary.
- Two Cards used as static comparison items when a Comparison Block specification owns the overall structure.
- A Card grouping optional resources inside a later approved Resource Group block.

### Non-Examples

- A Card that navigates to another route when clicked.
- A Card used as a knowledge-check option with selected state.
- A Card title treated as an `h2` without a heading hierarchy decision.
- Nested Cards used to create a screen layout.
- A Card used as a modal surface.

### Stop Conditions

Stop if Card use requires click handling, routing, selected/current state, completion state, modal/dialog behavior, storage, scoring feedback, new visual variants, nested cards, or unclear heading hierarchy.

## Button Usage Boundaries

### When To Use Button

Use Button only for a native action whose behavior is owned by the caller and separately specified.

Safe future examples include:

- a local non-routing action inside a later controlled block;
- a secondary reset or reveal action where behavior is specified outside Button;
- a form submit action only inside a separately approved form/block specification.

### When Not To Use Button

Do not use Button for:

- React Router `Link` or `NavLink`;
- `href` or navigation links;
- Continue/Next progress movement;
- assessment submit/check-answer behavior;
- certificate actions;
- modal, drawer, or HelpOverlay launchers;
- icon-only buttons;
- toggle or disclosure controls;
- danger/destructive actions;
- loading states;
- selected, current, completed, locked, or progress state migration;
- player shell button replacement;
- routing, progress, or completion ownership.

### Approved Variants And Sizes

Approved variants:

- `primary`;
- `secondary`;
- `ghost`.

Approved sizes:

- `sm`;
- `md`.

No danger, loading, icon-only, link, selected/current, completed, locked, full-width, progress, or player-shell variant is approved.

### Action Hierarchy

- Use one primary action per local decision area unless a later specification justifies otherwise.
- Use secondary actions for alternatives that are still important.
- Use ghost actions for low-emphasis actions.
- Do not use multiple primary Buttons in one local area without documenting the decision.
- Do not use Button hierarchy to imply route/progress priority unless a later progress/navigation specification approves it.

### Button-Versus-Link Decision

- Use Button for actions.
- Use links for navigation.
- Route navigation, LinkButton, ActionLink, and route-aware styling remain deferred.
- Do not style Button to simulate a link.
- Do not add `href`, `Link`, `NavLink`, or route abstraction to Button.

### Native Disabled Usage

Native `disabled` pass-through exists and may be used only when a later specification defines why an action is unavailable.

This does not approve:

- disabled-state token migration;
- locked-state styling;
- completed-state styling;
- selected/current styling;
- progress gating;
- opacity-only state design;
- player navigation disabled logic.

If disabled state explains a requirement, the surrounding block/template must provide visible requirement text.

### onClick Ownership

`onClick` is caller-provided pass-through only.

Button must not compute, import, or own:

- routing;
- progress;
- completion;
- assessment;
- certificate;
- storage;
- modal/drawer/help behavior;
- player behavior;
- course/module/screen behavior.

### Accessibility Expectations

- Button must have a clear accessible name from visible text.
- Button should remain a native `button`.
- Do not add inappropriate ARIA such as `aria-current`, `aria-pressed`, `aria-expanded`, or `aria-controls` without a separate toggle/disclosure/launcher specification.
- Visible focus remains required.
- Do not use icon-only Button until an icon-button specification exists.

### Examples

- A Button that triggers a local reveal in a later approved Concept Explanation block.
- A secondary Button that clears a local draft only after a Reflection behavior specification defines the reset behavior.
- A form submit Button inside a later approved non-assessment form pattern.

### Non-Examples

- Button as Next or Continue.
- Button as a route link to another screen.
- Button as Check Answer without a Knowledge Check specification.
- Button as a modal launcher.
- Button as an icon-only media control.
- Button styled as a selected/current progress step.

### Stop Conditions

Stop if Button use requires link support, route movement, progress/completion logic, assessment logic, certificate actions, launcher ARIA, toggle/disclosure state, icon-only labeling, loading state, danger/destructive behavior, player shell replacement, or broad state migration.

## Primitive Combinations

Safe combinations:

- Card may contain Callout when the Callout supports the card content and is not decorative.
- Card may contain Button only when behavior ownership is clearly outside the primitive and the action is not routing, progress, completion, assessment, certificate, modal, drawer, or help behavior.
- Callout should rarely contain Button; if it does, a later specification must explain why the action belongs inside the message.

Unsafe combinations:

- Do not use Button to simulate links or progress controls.
- Avoid nested Cards unless a later specification explicitly approves the structure.
- Do not combine primitives into a learning block without a Learning Block Frame or block specification.
- Do not create a scenario, reflection, or knowledge-check experience by composing primitives alone.

## Learning Block Preparation Rules

These primitives may support future learning blocks, but they are not learning blocks themselves.

| Future pattern | Likely primitive support | Still blocked |
| --- | --- | --- |
| Learning Block Frame | Card may provide a content surface; Button may appear only in a later approved local action area. | Completion logic, progress, state migration, and implementation. |
| Concept Explanation | Card for concept grouping; Callout for a short key takeaway. | Screen integration and completion rules. |
| Key Message | Callout may carry the short message when the message is meaningful. | Decorative banners and color-only meaning. |
| Comparison | Card may support static comparison items. | Interactive selection, viewed-state completion, and mobile comparison behavior until specified. |
| Scenario / Case Panel | Card may support static scenario context. | Decision behavior, selected state, feedback, and completion. |
| Reflection / Portfolio Capture | Callout may support HRBA safety note; Card may group prompt context. | Input, storage, save/skip behavior, validation, and completion. |
| Knowledge Check | Card may group static question context only after a spec. | Option group, selected state, correctness, feedback, retry, scoring, and assessment adjacency. |
| Completion Transition | Callout or Card may support summary text. | Continue/Next progress movement and completion ownership. |

Primitives do not own completion rules, feedback logic, selected states, scoring, storage, routing, or navigation.

## Screen And Template Preparation Rules

Before any future screen or template uses these primitives, the relevant specification must define:

- learning purpose;
- screen template;
- learning block type;
- heading hierarchy;
- action hierarchy;
- button/link decision;
- completion rule;
- accessibility metadata;
- responsive expectations;
- QA evidence plan.

If any of these are missing, do not integrate primitives into screens.

## HRBA / Local CSO Examples And Non-Examples

### Examples

- Callout for `Key HRBA reminder: Participation must influence decisions, not only attendance.`
- Card for `Rights-holder actor summary`, with a short definition and example.
- Card for `Duty-bearer responsibility summary`, paired with a comparison specification.
- Button for a local non-routing reveal action inside a later controlled Concept Explanation block, with behavior owned by that block.

### Non-Examples

- Button as Next or Continue.
- Card as a clickable route tile.
- Callout as a decorative colored banner.
- Card title used as a page heading without a heading hierarchy decision.
- Button as a modal launcher or assessment submit action.
- Callout used as a green completion status.
- Card used as a selected knowledge-check answer.

## QA Rules For Future Primitive Usage

Future implementation tasks that use these primitives must check:

- build pass;
- changed-file scope;
- no raw visual values;
- no global CSS or token edits unless separately approved;
- no routing, progress, content, module, assessment, certificate, or storage changes unless explicitly in scope;
- heading hierarchy preserved;
- button/link decision documented;
- action hierarchy documented;
- no color-only meaning;
- no behavior ownership drift;
- responsive behavior checked;
- accessibility checked;
- alignment document updated after completion.

## Stop Conditions

Stop future work if:

- a screen tries to use primitives without an approved template or block;
- Button is used for routing, progress, assessment, certificate, modal/drawer/help launchers, or player controls;
- Card is used as a clickable, route, progress, or completion container;
- Callout is used for decoration or color-only meaning;
- heading hierarchy is unclear;
- completion, progress, or assessment behavior is unclear;
- token or global CSS edits become necessary;
- broad `.is-active` or Phase D CSS appears;
- vertical slice work begins before block/template gates pass.

## Recommended Next Task

Create a documentation-only Learning Block Frame implementation specification.

That specification should use this primitive usage boundaries guide as input. It should keep the Learning Block Frame presentational, define structure and slots, and avoid behavior, completion, progress, route movement, storage, assessment, screen integration, token edits, global CSS, and Phase D CSS.

## Self-Evaluation Q&A

| Question | Answer |
| --- | --- |
| Is this guide documentation-only? | PASS. It creates usage guidance only and changes no implementation files. |
| Does it define Callout usage boundaries? | PASS. It defines when to use Callout, when not to use it, variant meaning, non-color-only requirements, examples, non-examples, and stop conditions. |
| Does it define Card usage boundaries? | PASS. It defines acceptable use, heading hierarchy rules, element expectations, examples, non-examples, and stop conditions. |
| Does it define Button usage boundaries? | PASS. It defines approved variants and sizes, action hierarchy, button-versus-link rules, disabled boundaries, `onClick` ownership, examples, non-examples, and stop conditions. |
| Does it prevent Button misuse for routing/progress/control logic? | PASS. It explicitly blocks routing, progress, completion, assessment, certificate, launcher, player, and state-migration ownership. |
| Does it address Card heading hierarchy? | PASS. It requires future screen, template, or block specs to own heading semantics intentionally. |
| Does it address Callout non-color-only meaning? | PASS. It requires visible text to carry meaning and blocks decorative/color-only usage. |
| Does it keep screen integration blocked? | PASS. Primitive screen integration remains blocked until later block/template/screen tasks explicitly approve usage. |
| Does it keep learning block implementation blocked? | PASS. Learning block implementation remains blocked. |
| Does it keep template/vertical slice work blocked? | PASS. Template implementation and vertical slice screens remain blocked. |
| Are CSS and token edits still blocked? | PASS. CSS and token edits remain blocked unless separately approved. |
| Is Phase D CSS still blocked? | PASS. Phase D CSS remains blocked. |
| Is the next recommended task clear? | PASS. The next task is a documentation-only Learning Block Frame implementation specification. |
