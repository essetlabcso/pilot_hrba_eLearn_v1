# Module 2 Hotspot and Diagram Upgrade Brief — HRBA E-learning Course

## Purpose of this file

This file defines the visual, responsive, and accessibility improvements needed for Module 2 hotspot and diagram screens.

It should guide Codex, designers, or visual asset creators when upgrading the most visual-heavy Module 2 screens.

## Priority screens

The priority hotspot/diagram screens are:

1. M2-S04 — Rights Dimensions Hotspot
2. M2-S08 — Rights-Holders / Actor Map
3. M2-S18 — Power and Exclusion Hotspots

These screens contain learning-critical visual information. They must be readable, accessible, responsive, and visually aligned with the premium HRBA course design system.

## Overall design requirements

All upgraded visuals should follow the HRBA course visual direction:

- clean premium e-learning interface
- deep navy, pale mint, white, soft teal, and warm muted accent
- high contrast text
- modern flat or semi-flat visual style
- respectful East Africa / Ethiopia-informed learning context where relevant
- no stereotypes
- no charity-poster feeling
- no dramatic humanitarian imagery
- clear instructional visual hierarchy
- scalable diagrams and readable labels
- accessible color choices

## Technical requirements

Prefer:

- SVG for diagrams, maps, and process visuals
- PNG/WebP only for rich illustrated scene backgrounds
- responsive layout behavior
- clear alt text or adjacent long descriptions
- reusable visual components where possible

Avoid:

- low-resolution raster graphics for complex diagrams
- tiny text embedded directly in PNG/JPG images
- labels that shrink until unreadable
- hotspot text placed directly over busy images without background containers
- visual meaning communicated only through color

## Screen-specific briefs

---

# M2-S04 — Rights Dimensions Hotspot

## Current issue

The screen depends on a hotspot diagram to help learners identify rights dimensions. If the visual is raster-based or labels shrink on smaller screens, the learning purpose may be weakened.

## Improvement goal

Create or improve a scalable hotspot diagram that clearly represents the rights dimensions in a practical project/activity situation.

## Dimensions to represent

The visual should support these hotspot areas:

1. Information
2. Access
3. Voice
4. Inclusion
5. Responsibility
6. Accountability / response

## Recommended visual approach

Use a clean instructional diagram, not a realistic illustration.

Possible layout:

- central scenario card or activity space
- six dimension nodes around it
- simple connectors/arrows
- each hotspot area clearly separated
- short labels with strong contrast
- optional icon for each dimension

## Asset recommendation

Preferred file:

```text
m2-s04-rights-dimensions-hotspot.svg
```

Alternative:

```text
m2-s04-rights-dimensions-hotspot.png
```

if SVG is not possible.

## Format

- SVG preferred
- responsive width
- readable at desktop and tablet size
- no small embedded text that becomes unreadable
- labels can be rendered as HTML overlays if better for accessibility

## Accessibility requirements

Add:

- meaningful alt text
- adjacent long description if the diagram contains key learning information
- keyboard-accessible hotspots
- visible focus state for each hotspot
- readable label containers

## Suggested alt/long description direction

Describe that the diagram shows a project or activity situation where rights dimensions can be examined through information, access, voice, inclusion, responsibility, and accountability/response.

---

# M2-S08 — Rights-Holders / Actor Map

## Current issue

Actor maps can become visually crowded and difficult to read. The map contains learning-critical information and should not be treated as decorative.

## Improvement goal

Create a clear actor ecosystem map showing relationships between rights-holders, duty-bearers, influencers, and CSOs.

## Concepts to represent

The map should include:

- rights-holders
- duty-bearers
- influencers
- CSO role
- responsibility links
- accountability links
- support/facilitation role of CSOs
- community-facing direction of accountability

## Recommended visual approach

Use a clean map-style diagram.

Possible structure:

- rights-holders positioned centrally or on the left
- duty-bearers positioned opposite or above
- CSOs shown as facilitators/support actors, not as the center of accountability
- influencers shown around the ecosystem
- arrows showing relationship and accountability flow
- clear legend if multiple arrow types are used

## Asset recommendation

Preferred file:

```text
m2-s08-rights-holders-actor-map.svg
```

## Format

- SVG preferred
- clean vector diagram
- high contrast text
- responsive labels
- avoid overcrowding

## Accessibility requirements

Add:

- meaningful alt text
- adjacent long description or details block
- labels rendered in accessible text where possible
- avoid relying only on arrow color to communicate meaning

## Suggested long description direction

Describe how rights-holders, duty-bearers, influencers, and CSOs relate to each other, with CSOs supporting participation, communication, and accountability rather than replacing duty-bearer responsibility.

---

# M2-S18 — Power and Exclusion Hotspots

## Current issue

Hotspot text overlaid on complex image areas may become hard to read. The current visual may also need a stronger custom illustration to make power dynamics more visible.

## Improvement goal

Create or integrate a strong 16:9 hotspot background showing how power shapes participation, voice, credibility, and influence in a community or cooperative decision process.

## Hotspot areas to support

The visual should support these hotspot concepts:

1. Information — who heard early and came prepared
2. Entry — who can enter the discussion space and feels welcome
3. Understanding — who understands terms, rules, or criteria
4. Voice — who can speak safely or disagree
5. Credibility — whose ideas are believed or taken seriously
6. Influence — who shapes the final decision

## Recommended visual approach

Use a respectful, professional illustrated scene.

Scene idea:

A cooperative or community decision-making meeting before a final choice is made. Everyone is invited, but the visual quietly shows that participation is unequal.

Possible visual cues:

- some people seated near decision-makers
- some people at the back or edge of the room
- a notice board or information sheet visible to some but not all
- technical terms or criteria shown on a board
- one or two people speaking confidently
- others listening silently or hesitating
- a facilitator or CSO actor observing/supporting inclusion
- no dramatic humanitarian imagery
- no stereotypes

## Asset recommendation

Preferred file for rich illustration:

```text
m2-s18-power-exclusion-hotspot-bg.png
```

or

```text
m2-s18-power-exclusion-hotspot-bg.webp
```

If simplified instructional style is used:

```text
m2-s18-power-exclusion-hotspot-bg.svg
```

## Format

- 16:9
- high resolution
- should work under hotspot overlays
- avoid putting critical text inside the image
- leave visual space for hotspot markers
- balanced contrast, not too busy

## Hotspot label requirements

Each hotspot label should have:

- solid or semi-transparent background
- strong text contrast
- sufficient padding
- rounded corners
- optional icon
- visible focus state
- responsive placement
- no overlap with critical scene details

## Accessibility requirements

Add:

- meaningful image alt text
- adjacent long description explaining the power dynamics shown
- keyboard-accessible hotspot buttons
- revealed content announced or focus moved appropriately
- hotspot meaning should not rely only on marker color

## Suggested long description direction

Describe a community/cooperative meeting where people face different levels of information, access, understanding, voice, credibility, and influence before a decision is made.

---

## Cross-screen hotspot requirements

For all hotspot screens:

- hotspot markers must be keyboard accessible
- markers must have meaningful aria-labels
- selected/open hotspot state must be visually clear
- marker placement must remain stable on responsive layouts
- labels must not overlap each other on smaller screens
- revealed text must be easy to read
- learners must understand how many hotspots remain
- local progress indicator should be visible and readable

## Responsive behavior requirements

Check at:

- desktop width
- laptop width
- tablet width
- mobile width if supported by the course

Required behavior:

- diagram does not become unreadable
- hotspot labels do not overlap
- important visual content remains visible
- no horizontal scrolling unless intentionally designed
- labels or details can stack below image on small screens if needed

## Recommended asset folder

Suggested repo location:

```text
src/assets/images/module-2/
```

or, if existing repo conventions differ:

```text
src/assets/images/hotspots/
src/assets/illustrations/module-2/
```

Suggested files:

```text
m2-s04-rights-dimensions-hotspot.svg
m2-s08-rights-holders-actor-map.svg
m2-s18-power-exclusion-hotspot-bg.png
```

## Suggested Codex prompt

```text
Task: Improve Module 2 hotspot and diagram clarity using the brief in docs/qa/module-2/04-module-2-hotspot-diagram-upgrade-brief.md.

Scope:
- M2-S04 Rights Dimensions Hotspot
- M2-S08 Rights-Holders / Actor Map
- M2-S18 Power and Exclusion Hotspots
- shared hotspot/diagram components used by these screens

First improve readability, responsiveness, overlays, hotspot labels, focus states, and alt/long descriptions. Do not replace visuals unless improved assets already exist in the repo.

Ensure hotspot labels are readable, diagrams scale cleanly, hotspot positions remain responsive, and learning-critical visuals have meaningful alt text or adjacent long descriptions.

Do not redesign unrelated screens. Do not change learner-facing content unless needed for accessibility support.

Run npm run build and fix all errors.

Commit message: Improve Module 2 hotspot and diagram clarity.
```

## Acceptance checklist

- [ ] M2-S04 hotspot diagram is readable.
- [ ] M2-S04 hotspots remain responsive.
- [ ] M2-S08 actor map is readable.
- [ ] M2-S08 has meaningful alt text or long description.
- [ ] M2-S18 hotspot labels have readable containers.
- [ ] M2-S18 hotspot labels do not blend into the image.
- [ ] Hotspots are keyboard accessible.
- [ ] Hotspot focus states are visible.
- [ ] Learning-critical visual information is available in text.
- [ ] Diagrams remain usable on smaller screens.
- [ ] `npm run build` passes.
