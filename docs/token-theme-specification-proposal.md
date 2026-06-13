# CSO Learning Hub Token and Theme Specification Proposal

## Status

Draft v0.1 - Proposal for human review before implementation

## Purpose

This document proposes the first visual token and theme direction for the CSO Learning Hub, based on the Visual Foundations Decision Brief, Visual Foundations Inventory, QA Gates, and Asset Migration Register.

It is not an implementation file. It does not create tokens, themes, CSS, components, accessibility logic, assets, or course screens in code. Any candidate value included here is a draft proposal for review, not a final approved token.

## Relationship to Existing Documents

This proposal must follow:

- System Charter;
- AI Production Contract;
- Learning Block Register;
- Screen Template Register;
- QA Gates;
- Asset Migration Register;
- Visual Foundations Decision Brief;
- Visual Foundations Inventory.

If this proposal conflicts with the governance documents, the governance documents take priority until the conflict is reviewed and resolved.

## Core Rule

Token and theme decisions must create consistency without sameness.

Theme variation must come from approved tokens and theme packs, not local CSS, inline styles, hard-coded colors, or screen-level visual fixes.

## Evidence Summary From the Visual Inventory

The Visual Foundations Inventory found useful visual direction in the old HRBA pilot:

- a serious rights/accountability tone;
- a premium learning-platform feel;
- a navy/green/teal visual direction;
- human-centered CSO and East Africa visual references;
- strong course and module image direction;
- useful module journey and progress concepts.

The same inventory also found design debt that must not migrate directly:

- very large global CSS;
- module-specific patch CSS;
- inline styles in platform, player, modal, and course renderer files;
- hard-coded colors and gradients;
- one-off shadows, spacing, and layout fixes;
- repeated renderer patterns;
- inconsistent icon and asset locations;
- large image assets needing review.

Old values and patterns may inform decisions, but they are not automatically approved. Observed colors such as navy, blue, green, warm orange, neutrals, and feedback colors require contrast validation, semantic naming, high contrast planning, and implementation review before they can become real tokens.

Accessibility and readability risks must guide the token system from the start, especially:

- unsafe text/background combinations;
- white text on light or image backgrounds;
- hidden CTAs on mobile;
- image-heavy screens;
- tiny visual text inside images;
- color-only or icon-only meaning;
- inconsistent focus and interaction states.

## Proposed Token Categories

The following token categories should be implemented later, after human review and approval:

- color;
- typography;
- spacing;
- radius;
- border;
- shadow/elevation;
- motion;
- breakpoint;
- focus;
- z-index/layering if needed.

## Proposed Color Token System

The token names below describe a proposed semantic structure. Candidate values are draft proposals for review only. They are not implemented and not final.

### Background and Surface Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.background.page` | Main app/page background | `#F9FAFB` | Observed as platform background in old CSS | Must support readable primary text and high contrast alternatives | Draft proposal for review |
| `color.background.stage` | Learning stage background | `#F9FAFB` or a reviewed soft neutral | Old player stage used light surfaces | Must avoid low contrast with cards and CTAs | Draft proposal for review |
| `color.surface.primary` | Main card/panel surface | `#FFFFFF` | Observed as platform/card surface | Must be paired with approved text and border tokens | Draft proposal for review |
| `color.surface.soft` | Soft callout or gentle panel surface | `#EEF7FC` or reviewed soft blue | Observed as player soft stage/info surface | Must not reduce text contrast or signal meaning by color alone | Draft proposal for review |
| `color.surface.successSoft` | Soft success/positive feedback surface | `#F4FAEC` or reviewed soft green | Observed in old feedback/player variables | Requires text/border contrast validation | Draft proposal for review |
| `color.surface.warningSoft` | Soft warning/reflection surface | `#FFF4E8` or reviewed warm surface | Observed in old feedback/player variables | Must remain readable and not look like disabled UI | Draft proposal for review |
| `color.surface.inverse` | Dark shell/header/sidebar surface | `#0F172A` | Observed deep navy/shell direction | Must support readable inverse text and focus states | Draft proposal for review |
| `color.surface.sidebar` | Secondary dark navigation surface | `#1E293B` | Observed old player sidebar surface | Requires contrast validation for text, icons, and active states | Draft proposal for review |

### Text Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.text.primary` | Primary body text on light surfaces | `#111827` | Observed platform/main text | Must pass contrast on all approved light surfaces | Draft proposal for review |
| `color.text.secondary` | Supporting text on light surfaces | `#6B7280` or darker if needed | Observed secondary/muted text | Must be validated because muted text often fails contrast | Draft proposal for review |
| `color.text.inverse` | Text on dark shell/surfaces | `#F9FAFB` | Observed text-on-dark direction | Must pass contrast on dark navy/sidebar surfaces | Draft proposal for review |
| `color.text.onAccent` | Text on green/accent surfaces | `#0F172A` | Observed text-on-green direction | Must be tested for every accent background | Draft proposal for review |
| `color.text.link` | Links and inline navigation actions | reviewed blue based on `#0E6F9F` or `#3B99D4` | Old CSS used blue direction | Must pass contrast and support underline/focus behavior | Draft proposal for review |

### Border Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.border.subtle` | Light card/panel borders | `#E5E7EB` | Observed platform/card border | Must remain visible enough without overpowering content | Draft proposal for review |
| `color.border.strong` | Stronger separator or active boundary | reviewed slate/blue | Old player sidebar border used `#334155` | Must not rely on border alone to communicate state | Draft proposal for review |
| `color.border.inverse` | Borders on dark surfaces | reviewed dark-surface border | Old sidebar used dark slate border | Must be visible in dark shell and high contrast mode | Draft proposal for review |

### Action Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.action.primary.background` | Primary CTA background | reviewed blue based on `#0E6F9F` | Observed primary button background | Must pass contrast with action text and focus ring | Draft proposal for review |
| `color.action.primary.text` | Text on primary CTA | `#FFFFFF` | Observed primary button text | Must pass contrast on approved primary action background | Draft proposal for review |
| `color.action.secondary.background` | Secondary CTA or supporting action | transparent or approved surface | Old UI used mixed button treatments | Must include border/focus/hover rules, not color alone | Draft proposal for review |
| `color.action.success.background` | Positive completion action | reviewed green based on `#91C852` | Observed success button/accent green | Must pass contrast with text and not be used for all progress states | Draft proposal for review |
| `color.action.disabled.background` | Disabled/unavailable action | reviewed neutral | Not clearly governed in old evidence | Must include disabled semantics and readable labels | Draft proposal for review |

### Semantic State Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.state.success.background` | Success feedback surface | reviewed soft green based on `#F4FAEC` | Observed feedback success background | Needs text, icon, and border support | Draft proposal for review |
| `color.state.success.border` | Success feedback border | reviewed green based on `#91C852` | Observed feedback success border | Must not communicate success by color alone | Draft proposal for review |
| `color.state.warning.background` | Warning/reflection feedback surface | reviewed soft warm based on `#FFF4E8` | Observed warning background | Must support readable text and clear label | Draft proposal for review |
| `color.state.warning.border` | Warning/reflection border | reviewed orange based on `#F97316` | Observed warning border | Must be validated against adjacent surfaces | Draft proposal for review |
| `color.state.danger.background` | Error/danger feedback surface | reviewed red-tinted surface | Old danger token observed as `#EF4444` | Must avoid alarming use unless semantically correct | Draft proposal for review |
| `color.state.danger.border` | Error/danger border | reviewed red based on `#EF4444` | Observed danger token | Requires contrast and meaning validation | Draft proposal for review |
| `color.state.info.background` | Informational feedback surface | reviewed soft blue based on `#EEF7FC` | Observed feedback info background | Must remain distinct from action states | Draft proposal for review |
| `color.state.info.border` | Informational feedback border | reviewed blue based on `#3B99D4` | Observed feedback info border | Must not rely on color alone | Draft proposal for review |

### Focus Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.focus.ring` | Visible keyboard focus ring | reviewed high-contrast blue or amber | Accessibility need; old evidence does not define a final focus system | Must be visible on light, dark, and image-backed surfaces | Draft proposal for review |
| `color.focus.ringInverse` | Focus ring on dark surfaces | reviewed light/high-contrast color | Needed for player shell/sidebar | Must remain visible in high contrast mode | Draft proposal for review |

### Overlay Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.overlay.scrim` | Modal/image overlay scrim | reviewed dark translucent value | Old modals and hero treatments use overlays/gradients | Must preserve readable text and not hide focus | Draft proposal for review |
| `color.overlay.imageText` | Text overlay on images | reviewed contrast-safe overlay | Inventory found image/gradient contrast risk | Must pass contrast on approved image treatments | Draft proposal for review |

### High Contrast Tokens

| Token name | Intended role | Draft candidate value | Source/evidence note | Accessibility note | Status |
| --- | --- | --- | --- | --- | --- |
| `color.highContrast.background` | High contrast page/surface background | human-reviewed high contrast value | Required by QA Gates | Must be planned before implementation, not patched later | Draft proposal for review |
| `color.highContrast.text` | High contrast text | human-reviewed high contrast value | Required by QA Gates | Must pass required contrast on high contrast surfaces | Draft proposal for review |
| `color.highContrast.focus` | High contrast focus indicator | human-reviewed focus value | Required by QA Gates | Must be unmistakable and keyboard visible | Draft proposal for review |
| `color.highContrast.action` | High contrast action surface | human-reviewed action value | Required by QA Gates | Must include text/icon/label support | Draft proposal for review |

## Proposed Typography Token System

### Font family direction

The old CSS evidence references `Inter` for body text and `Outfit` for headings. These may be considered as a draft typography direction, but they require final approval, loading/fallback review, licensing/availability checks, and mobile readability testing before implementation.

Proposed typography roles for later implementation:

- heading family;
- body family;
- UI/control family if different from body;
- monospace family only if needed for technical examples.

### Heading levels

Future heading tokens should define:

- course title;
- module title;
- screen title;
- section heading;
- card heading;
- compact panel heading.

Heading levels must support semantic HTML order, not just visual size.

### Body text

Future body tokens should define:

- default body text;
- comfortable reading text for learning content;
- compact UI text;
- feedback text;
- learner instruction text.

Body text must stay readable on mobile and under text enlargement.

### Small and supporting text

Small text should be used sparingly for metadata, labels, and supporting notes. Muted text must pass contrast checks. Supporting text must not carry essential instructions unless it remains fully readable.

### Line-height principles

Line-height should support sustained learning, not dense dashboard reading alone. Long-form explanatory text, scenario text, feedback, and reflection prompts need comfortable line-height and predictable spacing.

### Font-weight principles

Font weight should clarify hierarchy and action, not create visual noise. Strong weights should be reserved for headings, key labels, and emphasis that has instructional value.

### Mobile readability principles

Typography must avoid tiny labels, cramped buttons, hidden instructions, and image text that becomes unreadable on small screens. Text enlargement must not break card, panel, button, or navigation layout.

## Proposed Spacing and Layout Token System

The future spacing system should define a predictable scale for learning screens, player shell layout, cards, panels, CTAs, feedback, and mobile stacking.

Proposed spacing concepts for later implementation:

- base spacing scale for consistent gaps;
- compact spacing for dense UI controls;
- comfortable spacing for learning content;
- section spacing for screen rhythm;
- card spacing for repeated learning blocks;
- button spacing for touch-friendly actions;
- panel spacing for modals, help, glossary, feedback, and resources;
- mobile stacking spacing for readable single-column layouts;
- maximum content width for learning screens;
- grid and gap principles for comparison, framework, and dashboard-like layouts.

No spacing values are implemented by this proposal. Any future values must be reviewed against mobile readability, content density, and accessibility requirements.

## Proposed Radius, Border, and Elevation System

The future radius, border, and elevation system should create hierarchy without uncontrolled decoration.

Proposed direction for later implementation:

- small radius for inputs, compact controls, and small interactive elements;
- card radius for learning blocks and panels;
- pill/badge radius only where a status label or compact tag truly needs it;
- consistent border thickness for cards, panels, inputs, and active states;
- subtle elevation for major surfaces only;
- no uncontrolled shadows;
- no screen-specific shadow hacks;
- elevation must support hierarchy, not decoration.

Borders and shadows must remain accessible in high contrast mode and should not be the only way active, disabled, locked, or completed states are communicated.

## Proposed Motion and Focus System

The future motion and focus system should support clarity and keyboard access.

Proposed direction for later implementation:

- respect reduced-motion settings;
- use limited transitions only;
- avoid decorative motion that distracts learners;
- avoid motion that is required to understand content;
- define a visible focus ring for light, dark, and image-backed surfaces;
- ensure focus order follows the learning task;
- ensure focus states remain visible in modals, sidebars, accordions, hotspots, knowledge checks, and player controls.

## Proposed Breakpoint and Mobile Behavior Principles

Future breakpoint and responsive behavior must be defined before screen implementation.

Proposed principles:

- mobile-first stacking;
- no hidden CTA;
- no blocked navigation;
- no overlapping cards, buttons, or text;
- no horizontal scroll unless explicitly approved;
- touch-friendly buttons and controls;
- readable headings and body text on small screens;
- image-heavy screens require optimized assets and text alternatives;
- text enlargement must not break layout;
- sidebars, modals, and toolbars must remain keyboard usable and visible on mobile.

## Proposed Theme Pack Structure

Theme packs should create controlled variation without changing component behavior, accessibility behavior, or layout rules.

| Theme pack | Purpose | Tone | Possible use cases | Token variation allowed | Token variation not allowed | Accessibility constraint |
| --- | --- | --- | --- | --- | --- | --- |
| Rights and Accountability | Support rights, duties, participation, dignity, and trust | Serious, grounded, accountable | HRBA foundations, participation, duty-bearer/right-holder content, accountability reflection | Approved accent, surface, illustration, and state emphasis within semantic limits | No local CSS, no new button behavior, no untested contrast combinations | Must pass contrast across dark shell, light stage, CTAs, feedback, and overlays |
| Project Practice | Support practical planning and implementation | Clear, active, operational | Project design, implementation tools, action plans, repair labs | Approved practical accent and panel emphasis | No ad hoc tool UI or one-off interaction styling | Must remain usable on mobile and under text enlargement |
| Evidence and Learning | Support data, monitoring, analysis, and adaptation | Analytical, calm, precise | MEAL, evidence interpretation, charts, reflection from data | Approved chart/data emphasis and info surfaces | No chart colors that rely on color alone | Charts need text alternatives and contrast-safe series |
| Community Voice | Support participation, listening, and local relevance | Human-centered, respectful, warm | Participation scenarios, community feedback, inclusion checks | Approved warm accent and story/quote treatments | No charity-poster styling or sentimental visual shortcuts | Must avoid stereotype reinforcement and support readable story content |
| Organizational Strengthening | Support systems, teams, capacity, and governance | Stable, capable, structured | CSO capacity, internal accountability, roles, policies | Approved organizational accent and structure markers | No overly corporate dashboard styling that weakens learning clarity | Must support clear hierarchy and keyboard navigation |
| Safety and Trust | Support safeguarding, dignity, risk, and sensitive scenarios | Careful, calm, protective | Safeguarding notes, sensitive scenarios, risk spotting, referral guidance | Approved caution/support state emphasis | No alarming or punitive visual language unless semantically required | Must not use color alone for risk/safety meaning |
| Advocacy and Influence | Support voice, action, and public accountability | Confident, constructive, energetic | Advocacy planning, stakeholder influence, campaign judgment | Approved active accent and call-to-action emphasis | No aggressive visual treatment or uncontrolled gradients | CTAs and emphasis must pass contrast and remain accessible |

## First Recommended Pilot Theme

The first recommended pilot theme for HRBA is Rights and Accountability.

This theme fits the HRBA course tone because it supports seriousness, accountability, participation, dignity, and trust. It can preserve the strongest old HRBA visual qualities, including the navy/green/teal direction and premium learning-platform feel, without copying old CSS, inline styles, gradients, or local screen-level visual fixes.

This recommendation is a draft proposal for review. It does not approve implementation.

## High Contrast and Accessibility Requirements

The token and theme system must meet these requirements before implementation:

- all text/background pairs must pass contrast checks before implementation;
- high contrast mode must be planned from the start;
- no color-only meaning;
- focus states must be visible;
- enlarged text must not break layout;
- images and overlays must remain readable;
- semantic states must include text/icon support, not color alone;
- disabled, active, completed, locked, warning, error, and success states must be accessible;
- image-heavy and low-bandwidth experiences must include text alternatives.

## What AI May Do With This Proposal

AI may:

- use this proposal to draft future token files after human approval;
- check consistency against the proposal;
- suggest refinements;
- flag missing decisions;
- prepare contrast-check tasks.

AI must not:

- implement token files before approval;
- implement theme files before approval;
- create CSS;
- copy old values blindly;
- treat draft values as final;
- override QA Gates;
- create local styles.

## Open Decisions Requiring Human Review

The following decisions require human review before coding:

- approve or revise draft color direction;
- approve or revise typography direction;
- approve first HRBA pilot theme;
- approve icon style direction;
- approve illustration style direction;
- approve high contrast behavior;
- decide whether token values require automated contrast testing before coding;
- decide whether to implement tokens in TypeScript, CSS variables, Tailwind config, or a combination.

## Recommended Next Step After Approval

After this proposal is reviewed, the next safe step should be one of the following:

- revise this proposal based on human feedback;
- create the first implementation-ready token specification document;
- run a contrast-testing preparation step before coding.

## Final Commitment

The token and theme system must make the CSO Learning Hub visually coherent, accessible, reusable, and flexible without allowing old HRBA visual design debt to enter the clean system.
