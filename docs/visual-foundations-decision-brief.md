# CSO Learning Hub Visual Foundations Decision Brief

## Status

Draft v0.1 — Decision brief before token and theme implementation

## Purpose

This document defines the visual/design foundation decisions that must be clarified before coding tokens, themes, components, or visual systems.

It exists to support disciplined visual system planning before any implementation work begins.

## Why This Brief Is Needed

The repo audit found useful visual direction in the old HRBA pilot, but also significant design debt, including:

- very large global CSS;
- module-specific patch CSS;
- inline styles;
- hard-coded colors and gradients;
- inconsistent icons;
- repeated renderer patterns;
- inconsistent asset naming and locations;
- screen-level design debt that must not migrate directly.

## Relationship To Existing Documents

This brief must follow:

- System Charter;
- AI Production Contract;
- Learning Block Register;
- Screen Template Register;
- QA Gates;
- Asset Migration Register.

This document does not implement tokens, themes, components, or assets.

## Core Visual Foundation Rule

Visual direction may be inspired by the old HRBA pilot.

Visual decisions must be translated into approved tokens, themes, components, and asset rules.

Old local CSS, inline styles, hard-coded colors, gradients, and inconsistent icons must not be copied directly.

## Visual Direction Worth Preserving From The Old HRBA Pilot

Candidate qualities to preserve after review:

- calm, serious, rights/accountability-oriented tone;
- strong learning-platform identity;
- premium course/module cover image direction;
- human-centered CSO/Ethiopia/East Africa visual feel;
- deep navy/green/teal direction if approved later;
- clean modern cards and panels if rebuilt through components;
- visual warmth without charity-poster styling;
- practical course-progress and module journey feel.

## Visual Problems To Prevent

- white text on light backgrounds;
- unsafe contrast combinations;
- hard-coded gradients;
- local CSS patches;
- inconsistent icon styles;
- too much repeated layout;
- overly large CSS files;
- one-off visual fixes;
- mobile overlap;
- hidden CTAs;
- tiny unreadable text inside images;
- decorative visuals that do not support learning.

## Decisions Needed Before Token Implementation

- [ ] primary brand/color direction;
- [ ] neutral/background/surface system;
- [ ] text color hierarchy;
- [ ] action color system;
- [ ] warning/success/error colors;
- [ ] contrast-safe combinations;
- [ ] typography scale;
- [ ] spacing scale;
- [ ] border radius system;
- [ ] shadow/elevation policy;
- [ ] focus-ring style;
- [ ] motion policy;
- [ ] breakpoint policy;
- [ ] icon style;
- [ ] illustration style;
- [ ] data/chart visual style;
- [ ] image overlay rules;
- [ ] accessibility/high-contrast behavior.

## Future Token Categories To Define

- color tokens;
- typography tokens;
- spacing tokens;
- radius tokens;
- border tokens;
- shadow/elevation tokens;
- motion tokens;
- breakpoint tokens;
- focus tokens;
- z-index/layering tokens if needed.

## Future Theme Packs To Consider

- Rights and Accountability;
- Project Practice;
- Evidence and Learning;
- Community Voice;
- Organizational Strengthening;
- Safety and Trust;
- Advocacy and Influence.

Theme packs must create variation without breaking accessibility, layout, or component behavior.

## Icon And Visual Asset Decision Needs

- approved icon family/style must be selected;
- icons must not carry meaning alone;
- icons must be consistent in stroke/weight/shape;
- old icons must be reviewed before reuse;
- visual assets must follow the Asset Migration Register;
- image-heavy screens must consider low bandwidth;
- all meaningful images need alt text or text alternatives.

## Accessibility And Readability Requirements For Visual Foundations

- contrast-safe text/background pairs;
- high contrast mode compatibility;
- enlarged text must not break layout;
- focus states must be visible;
- no color-only meaning;
- mobile readability;
- low-bandwidth asset consideration;
- reduced motion support.

## What AI May Do At This Stage

AI may:

- summarize visual risks;
- identify decision areas;
- suggest possible visual directions for human review;
- propose token categories;
- propose theme-pack names;
- propose icon/asset review criteria.

AI must not:

- define final token values;
- implement theme files;
- create CSS;
- edit old styling;
- copy old visual code;
- migrate assets;
- approve its own visual decisions.

## Recommended Next Decision After This Brief

After this brief is approved, the next step should be either:

- define the first draft token specification document; or
- run a focused visual/asset inventory review if more evidence is needed.

## Final Commitment

The CSO Learning Hub visual foundation must preserve the strongest qualities of the old HRBA pilot while preventing old visual design debt from entering the clean system.
