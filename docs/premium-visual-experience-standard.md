# CSO Learning Hub Premium Visual Experience Standard

## Status

Draft v0.1 - Premium visual quality standard before token/theme/component implementation

## Purpose

This document protects the premium visual quality of the CSO Learning Hub before implementation begins. It exists because accessibility, consistency, performance, and low-bandwidth design must not result in a flat, dull, generic, or visually weakened course experience.

The CSO Learning Hub must be accessible and beautiful at the same time.

Accessibility must not mean austerity.

Performance optimization must not mean removing visual identity.

Premium visual quality must be built into the system, not added later as decoration.

## Why This Standard Is Needed

The old HRBA pilot had strong visual qualities worth preserving: immersive module intro screens, dark premium panels, bold typography, rich image use, strong course identity, and a polished learning-platform feel.

The old pilot also had design debt that must not migrate directly: heavy images, hard-coded styles, local CSS patches, inconsistent icon treatment, contrast risks, repeated layouts, and screen-by-screen visual fixes.

This standard exists to preserve the visual strengths while preventing the old design debt.

## Relationship to Existing System Documents

This standard must follow:

- System Charter;
- AI Production Contract;
- Learning Block Register;
- Screen Template Register;
- QA Gates;
- Asset Migration Register;
- Visual Foundations Decision Brief;
- Visual Foundations Inventory;
- Token and Theme Specification Proposal;
- Token and Theme Accessibility Review.

This document does not implement tokens, themes, CSS, components, or assets.

## Core Principle: Accessibility Without Austerity

Accessibility without austerity means the platform must remain visually rich, premium, vibrant, and emotionally engaging while meeting accessibility, readability, keyboard, screen reader, mobile, and low-bandwidth requirements.

Accessibility must be achieved through better design, not visual reduction.

Contrast must be solved through approved color pairings and surface recipes, not by making everything plain black and white.

Performance must be solved through responsive image handling and optimization, not by removing story visuals.

Readability must be protected while preserving visual hierarchy, accent color, depth, imagery, and atmosphere.

## Premium Visual Character

The CSO Learning Hub visual character should be:

- premium but not elitist;
- modern but not generic;
- serious but not cold;
- vibrant but not noisy;
- locally grounded but not stereotyped;
- human-centered but not charity-poster style;
- polished but not over-decorated;
- warm, credible, practical, and rights/accountability-oriented.

Every course should feel like a high-quality learning product, not a basic slide deck, not a plain document viewer, and not a generic NGO website.

## Visual Qualities to Preserve From the Old HRBA Pilot

The following qualities may inspire the clean system as high-level direction, not code:

- dark premium structural panels;
- bold, confident module titles;
- cinematic image areas;
- strong split composition between text and image;
- deep navy / green / teal atmosphere where approved;
- polished CTA placement;
- immersive course-entry feeling;
- clear learning journey and progress feeling;
- warm, dignified, locally grounded story visuals;
- strong module identity.

These qualities may inspire the clean system, but old CSS, inline styles, hard-coded colors, gradients, and layout code must not be copied directly.

## Premium Visual Techniques Approved for Future System Design

Future tokens, components, and templates may use these techniques after approval:

- deep navy structural surfaces;
- pale mint, warm off-white, and soft neutral backgrounds;
- soft teal, green, blue, and muted warm accents;
- accent borders and side strips;
- color-coded chips and badges;
- elegant dividers and progress indicators;
- subtle patterned or dotted background textures;
- rounded cards and panels;
- soft layered depth;
- controlled shadows/elevation;
- cinematic image panels;
- gradient overlays for image readability;
- split hero layouts;
- case-file/evidence-board compositions;
- warm illustration panels;
- icon badges with consistent style;
- premium CTA treatments.

These techniques must be implemented through approved tokens, themes, components, and templates only.

## Vibrancy Rules

To keep screens colorful without sacrificing readability:

- use color for borders, accents, icons, chips, progress markers, dividers, callout strips, and section identity;
- do not rely on low-contrast colored text over pale or busy backgrounds;
- body text should remain on approved readable surfaces;
- accent colors should support hierarchy and meaning, not decorate randomly;
- each screen may have a controlled accent color, but not uncontrolled local styling;
- theme variation should create freshness across modules without breaking brand coherence;
- different screens may feel distinct through approved template recipes, asset placement, accent treatment, and content density.

## Premium Screen Recipes

These are conceptual recipes only, not code.

### Cinematic Module Intro Screen

Purpose: module opening, course/module transition.

Visual structure: dark structural text panel, bold title hierarchy, large image panel, strong CTA.

Suitable learning use: module start, course orientation, major section opening.

Accessibility requirement: text must sit on controlled dark surface or approved overlay, not uncontrolled image area.

Performance note: hero image must have responsive optimized versions.

Avoid when: screen is content-heavy or interaction-heavy.

### Split Story Anchor Screen

Purpose: introduce a realistic story or scenario.

Visual structure: one side story context, one side approved story visual.

Suitable learning use: anchor story, narrated vignette, scenario setup.

Accessibility requirement: story meaning must also exist in text, not image only.

Performance note: image must support mobile crop and low-bandwidth fallback.

Avoid when: image is decorative only or story is sensitive and needs lower visual intensity.

### Case File / Evidence Board Screen

Purpose: evidence analysis, accountability practice, case simulation.

Visual structure: document cards, evidence tiles, map/photo/note elements, structured board layout.

Suitable learning use: evidence selection, accountability pathway, case-file simulation.

Accessibility requirement: all visual evidence must have text equivalents.

Performance note: avoid heavy composite images where UI-rendered cards can work better.

Avoid when: evidence details become tiny or unreadable.

### Light Card-on-Tinted-Surface Screen

Purpose: concept explanation, comparison, checklist, reflection.

Visual structure: pale mint or warm-neutral background, white/soft cards, colored accents.

Suitable learning use: reading, comparison, reflection, low-cognitive-load screens.

Accessibility requirement: text/background pairs must be contrast-safe.

Performance note: lightweight and suitable for low bandwidth.

Avoid when: screen needs strong dramatic entry.

### Scenario Decision Screen

Purpose: learner judgment and decision-making.

Visual structure: scenario context panel, choices panel, feedback area, optional supporting image.

Suitable learning use: participation dilemmas, safeguarding choices, advocacy tactics.

Accessibility requirement: choices must be real buttons/radios and keyboard usable.

Performance note: image optional; do not overload with unnecessary visuals.

Avoid when: content is simple factual recall.

### Reflection / Portfolio Screen

Purpose: personal or organizational reflection and action transfer.

Visual structure: calm warm panel, guiding prompt, optional visual support, response area.

Suitable learning use: portfolio capture, action planning, commitment screens.

Accessibility requirement: inputs must have labels and clear instructions.

Performance note: image should be light and supportive.

Avoid when: reflection may become unsafe or overly personal.

### Module Synthesis Screen

Purpose: summarize learning and prepare transition.

Visual structure: strong recap panel, key takeaways, progress marker, next-step CTA.

Suitable learning use: end of module, readiness check, transition.

Accessibility requirement: summary must be plain language and readable.

Performance note: avoid unnecessary hero media.

Avoid when: learner has not completed required actions.

## Premium Image Treatment Standard

Images should be used with these standards:

- images should be high-quality, locally grounded, respectful, and learning-purpose driven;
- images should be used as story assets, module identity assets, scenario support, evidence visuals, or emotional anchors;
- images should not be used as uncontrolled backgrounds behind important text;
- important text should preferably be rendered in UI, not embedded inside images;
- image overlays must use approved gradient/scrim rules;
- images should have consistent radius, framing, and placement depending on template;
- focal point should be documented for responsive cropping;
- images should support desktop, tablet, and mobile layouts;
- heavy images must be optimized before implementation;
- visual richness should be preserved through compression, responsive sizing, and layout treatment, not removed.

## Story Visual Standard

Story visuals are a major strength of the HRBA course and should be integrated carefully.

Rules:

- story visuals must be linked to a story ID;
- story visuals must be linked to a module/screen or reusable story use;
- story visuals must have a defined role: hero image, anchor scene, video poster, evidence board, hotspot base, thumbnail, scenario image, reflection image, or module cover;
- story visuals must be inserted into approved screen template slots;
- story visuals must not force new one-off layouts;
- story visuals must not carry meaning without text support;
- sensitive story visuals must follow safeguarding and dignity rules;
- visuals should show local actors as agents, not helpless beneficiaries;
- visuals should avoid real logos, real organization names, real government seals, political symbols, and identifiable real places.

## Performance-with-Beauty Standard

Rules:

- do not remove premium visuals simply because they are heavy;
- optimize them;
- use WebP/AVIF where supported;
- provide PNG/JPG fallback if needed;
- generate desktop/tablet/mobile versions for hero and story images;
- use lazy loading for non-critical images;
- use lightweight placeholders or blur previews for large visuals;
- define file size targets before implementation;
- avoid embedding large images where CSS/vector/UI-rendered shapes can provide the same effect;
- use SVG for diagrams, maps, icons, and simple illustrations where appropriate;
- avoid image text that becomes unreadable on mobile;
- provide text alternatives for meaningful visuals.

## Beauty-Preserving Accessibility Rules

Rules:

- do not solve accessibility by making the interface visually plain;
- do not remove accent colors unless they create contrast failure;
- do not replace rich surfaces with pure black/white unless it is the high contrast mode;
- high contrast mode may be visually simpler, but default mode should remain premium;
- focus rings must be visible and elegant, not visually disruptive;
- text size increase must preserve layout dignity;
- reduced motion should remove unnecessary animation, not visual depth;
- captions/transcripts should be integrated elegantly, not as an afterthought;
- screen reader support must coexist with premium visual design;
- accessibility tools must not look like technical clutter.

## Premium CTA and Interaction Standard

Primary CTAs should be visually confident and easy to find.

Secondary CTAs should be clear but less dominant.

Disabled/locked/completed states must be visually distinct and accessible.

Buttons should not use random colors.

Interaction states should use approved color, border, icon, and text combinations.

Feedback should feel polished, not like browser-default alerts.

Micro-interactions should be subtle, fast, and disabled under reduced motion.

Learners should always understand what to do next.

## Premium Typography and Hierarchy Standard

Titles should feel confident and editorial.

Body text should feel readable and calm.

Screen hierarchy should be clear at a glance.

Large titles may be expressive, but body text must prioritize readability.

Small text must be used sparingly.

Line length should remain comfortable.

Mobile typography must preserve hierarchy without crowding.

Typography should support a premium learning product feel, not a generic document page.

## Anti-Patterns: What Must Not Happen

- plain black-and-white default screens as the main visual style;
- accessibility fixes that make screens dull or visually broken;
- hard-coded visual patches;
- random gradients;
- white text on pale or busy image areas;
- low-contrast muted text;
- tiny text embedded inside images;
- inconsistent icon styles;
- generic stock-photo feeling;
- charity-poster imagery;
- repeated card layouts without visual rhythm;
- heavy unoptimized hero images;
- image-only meaning;
- uncontrolled local CSS;
- one-off screen design outside approved templates;
- visual clutter that competes with learning purpose.

## Premium Visual QA Checklist

- [ ] Does the screen feel like a premium learning product?
- [ ] Does it preserve visual richness without harming readability?
- [ ] Is the visual hierarchy clear?
- [ ] Is the main CTA obvious and polished?
- [ ] Are colors used intentionally and consistently?
- [ ] Are text/background combinations readable?
- [ ] Is accent color used to add richness without creating contrast risk?
- [ ] Is the image treatment consistent with approved recipes?
- [ ] Is the image optimized or planned for optimization?
- [ ] Does the screen avoid generic/plain document feeling?
- [ ] Does it avoid charity-poster or stereotype risk?
- [ ] Does it work on mobile without losing beauty?
- [ ] Does accessibility support improve the experience without visually degrading it?
- [ ] Does this screen use an approved template/recipe rather than a one-off layout?

## What AI May Do With This Standard

AI may:

- recommend premium screen recipes;
- select approved visual techniques;
- draft visual QA notes;
- suggest image treatment;
- suggest performance variants;
- flag visual beauty risks;
- flag accessibility/aesthetic tradeoff risks;
- propose refinements for human review.

AI must not:

- reduce the interface to plain black-and-white unless explicitly working on high contrast mode;
- invent local CSS to make a screen look premium;
- copy old HRBA visual code directly;
- use unapproved colors, gradients, shadows, or icon styles;
- place text over images without approved overlay treatment;
- migrate heavy assets without review;
- treat premium as permission to ignore accessibility;
- treat accessibility as permission to remove visual richness.

## Relationship to Future Token/Theme Implementation

This document should guide the implementation-ready token specification.

The token system must include enough visual richness to support premium layouts.

The theme system must support controlled variation without visual drift.

The component system must make premium visual treatment reusable.

The accessibility system must protect usability without weakening the default visual experience.

## Recommended Next Step

After this standard is reviewed, the next safe step should be to create a Story Visual Integration Standard, so generated story images and visual assets can be registered, optimized, assigned to template slots, and integrated without causing design drift.

## Final Commitment

The CSO Learning Hub must not choose between beauty and accessibility. It must deliver both. Premium visual quality is a system requirement, not decoration. Accessibility, performance, and consistency must strengthen the visual experience rather than flatten it.
