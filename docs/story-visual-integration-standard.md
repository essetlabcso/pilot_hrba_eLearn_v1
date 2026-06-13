# CSO Learning Hub Story Visual Integration Standard

## Status

Draft v0.1 - Story visual governance standard before asset migration and implementation

## Purpose

This document defines how story visuals, generated images, case-file visuals, evidence boards, video posters, hotspot bases, and module cover images should be integrated into the clean CSO Learning Hub design system.

Story visuals are not decorative extras.

Story visuals are learning assets.

Every story visual must have a learning purpose, approved use, accessibility metadata, performance plan, and screen-template placement before implementation.

## Why This Standard Is Needed

The HRBA course is becoming strongly story-based. Existing story and visual planning materials already connect stories to modules, learning blocks, interactions, assessment, portfolio tasks, safety rules, and safeguarding levels.

Generated story visuals are a major strength because they can make the course feel human-centered, locally grounded, premium, and emotionally engaging.

Without governance, story visuals could create problems:

- random image use;
- inconsistent visual treatment;
- heavy image loading;
- uncontrolled cropping;
- text placed over busy images;
- inaccessible image-only meaning;
- one-off layouts;
- safeguarding risks;
- drift away from approved screen templates.

This standard exists to preserve the power of story visuals while keeping the clean design system controlled.

## Relationship to Existing System Documents

This standard must follow:

- System Charter;
- AI Production Contract;
- Learning Block Register;
- Screen Template Register;
- QA Gates;
- Asset Migration Register;
- Premium Visual Experience Standard;
- Visual Foundations documents;
- Token and Theme Accessibility Review.

This document does not migrate, optimize, approve, code, or implement assets.

## Core Rule

Story visuals may enter the clean HRBA course only as approved learning assets.

They must be mapped to a story, learning purpose, screen template, learning block, accessibility metadata, performance requirement, and safeguarding review.

Story visuals must support the system.

They must not force the system to create one-off layouts.

## Story Visual Role Taxonomy

| Role | Purpose | Typical screen template | Typical learning block | Accessibility need | Performance need | Avoid when |
| --- | --- | --- | --- | --- | --- | --- |
| Module cover image | Establish module identity and invite entry | Cinematic Module Intro Screen or Orientation / Welcome Screen | Continue / Completion Transition Block or Concept Explanation Block | Alt text; no essential text embedded in image | Desktop, tablet, and mobile variants; optimized hero image | The image is decorative, generic, or cannot crop safely |
| Course hero image | Establish course identity and tone | Orientation / Welcome Screen | Concept Explanation Block or Continue / Completion Transition Block | Alt text; text must be UI-rendered or on approved surface | Responsive optimized hero variants | The image creates a generic NGO/stock-photo feeling |
| Cinematic module intro image | Create immersive transition into a module | Cinematic Module Intro Screen | Continue / Completion Transition Block | Text on controlled surface or approved overlay only | Optimized large image, focal point, low-bandwidth fallback | The screen is content-heavy or interaction-heavy |
| Story anchor scene | Introduce a realistic story or scenario | Split Story Anchor Screen or Case Story Screen | Case Story Block | Alt text and story text in UI | Responsive crop plan and optimized variants | The image carries story meaning that is not also explained in text |
| Video poster image | Represent video or media content before playback | Orientation / Welcome Screen or Case Story Screen | Case Story Block or Concept Explanation Block | Alt text, transcript/caption metadata, media label | Optimized poster and fallback image | The media has no transcript/caption plan |
| Scenario context image | Ground a decision or scenario in a human situation | Scenario Decision Screen | Scenario Decision Block | Alt text; scenario choices rendered in UI | Optional image; optimized if used | The content is simple factual recall |
| Evidence board image | Support analysis of documents, facts, actors, or risks | Case File / Evidence Board Screen | Risk-Spotting Block or Hotspot / Labeled Graphic Block | Text equivalent for every evidence item | Prefer UI-rendered cards where possible | Evidence details become tiny or unreadable |
| Case-file document visual | Represent a document, note, report, or complaint artifact | Case File / Evidence Board Screen | Risk-Spotting Block, Checklist / Action Plan Block, or Chart / Data Insight Block | Accessible document summary and text alternative | Use UI-rendered document cards when possible | The visual includes real data or unreadable embedded text |
| Hotspot base image | Provide spatial or contextual base for labeled exploration | Hotspot / Labeled Graphic Screen | Hotspot / Labeled Graphic Block | Non-visual alternative, labels, keyboard instructions | Optimized base image; avoid oversized composites | The image does not add spatial/contextual learning value |
| Actor map / stakeholder map | Show relationships between rights-holders, duty-bearers, CSOs, and stakeholders | Framework Explanation Screen or Comparison Screen | Hotspot / Labeled Graphic Block, Comparison Block, or Process / Timeline Block | Text-based actor list and relationship description | SVG or UI-rendered map preferred where suitable | Actor relationships can be explained more clearly as text or simple cards |
| Process / timeline visual | Show sequence, project cycle, pathway, or learning journey | Process / Timeline Screen | Process / Timeline Block | Text alternative for each step | SVG or UI-rendered steps preferred | The image includes tiny labels or cannot stack on mobile |
| Reflection support image | Create calm emotional support for reflection | Reflection / Portfolio Capture Screen | Reflection / Portfolio Capture Block | Decorative or meaningful status; alt text if meaningful | Lightweight image; mobile-safe crop | The image makes reflection feel unsafe, sentimental, or overly personal |
| Portfolio/action-plan visual | Support action transfer, portfolio saving, or planning | Action Planning Screen or Reflection / Portfolio Capture Screen | Checklist / Action Plan Block or Reflection / Portfolio Capture Block | Inputs labelled separately; visual not required for task completion | Lightweight visual or icon panel | The visual distracts from learner action |
| Thumbnail / card image | Support selection, navigation, or story/module recognition | Orientation / Welcome Screen, Course roadmap, or module selection card | Continue / Completion Transition Block | Alt text or decorative status depending on use | Small optimized image variant | The thumbnail is the only way to identify the item |
| Decorative atmosphere image | Add mood without carrying instructional meaning | Approved premium template slots only | Supporting visual treatment, not a primary block | Mark decorative when implemented | Lightweight, optimized, optional | The image adds load without learning or emotional value |
| Diagram / instructional visual | Explain a framework, relationship, principle, or decision pathway | Framework Explanation Screen, Process / Timeline Screen, Comparison Screen | Hotspot / Labeled Graphic Block, Comparison Block, or Process / Timeline Block | Long description or text equivalent required | SVG or UI-rendered graphic preferred | It cannot be understood without vision or becomes unreadable on mobile |

## Story-to-Screen Integration Rule

A story visual must be integrated through the course learning architecture, not by visual preference alone.

Each visual should be connected to:

- story ID;
- story title;
- module;
- screen ID or recommended placement;
- screen template;
- learning block;
- learner action;
- assessment or portfolio use where relevant;
- safeguarding level;
- asset role;
- accessibility metadata;
- performance variant plan.

## Approved Template Slots for Story Visuals

### Cinematic Module Intro Screen

- visual slot: large hero/module image;
- text location: controlled dark panel or approved overlay only;
- use for module opening, not dense activities.

### Split Story Anchor Screen

- visual slot: right or left image panel;
- text location: UI-rendered story text;
- use for anchor stories and scenario setup.

### Case File / Evidence Board Screen

- visual slot: evidence cards, document tiles, map/photo/note objects;
- text location: UI-rendered labels and descriptions;
- use for evidence analysis and accountability practice.

### Scenario Decision Screen

- visual slot: optional context image or small scene panel;
- text location: scenario and choices rendered in UI;
- use for judgment and decision-making.

### Hotspot / Labeled Graphic Screen

- visual slot: hotspot base image;
- text location: UI-rendered hotspot labels, tooltips, and alternatives;
- use only when the image adds meaningful spatial/contextual learning value.

### Reflection / Portfolio Screen

- visual slot: calm support image or visual metaphor;
- text location: prompt and input rendered in UI;
- use for reflection and action transfer.

### Module Synthesis Screen

- visual slot: optional recap image or journey graphic;
- text location: UI-rendered summary and CTA;
- use for closure and transition.

## Story Visual Register Fields

Use this table structure for future story visual intake and migration review:

| Visual ID | Story ID | Story title | Module | Screen ID / placement | Asset role | Proposed filename | Source / generation batch | Description | Learning purpose | Screen template | Learning block | Learner action supported | Assessment/portfolio link | Safeguarding level | Sensitivity note | Meaningful or decorative | Required alt text | Long description needed: yes/no | Caption/transcript needed: yes/no | Focal point | Crop guidance | Aspect ratio | Desktop variant needed | Tablet variant needed | Mobile variant needed | Low-bandwidth fallback | File format recommendation | Optimization note | Visual consistency note | Approval status | Reviewer | Date | Follow-up action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |

## Naming Convention

Use the existing naming logic as the basis.

For screen-specific assets:

`hrba-[module]-[screen]-[story-shortname]-[asset-role]-[short-description].[format]`

Examples:

- `hrba-m1-s02-waterlife-anchor-scene.webp`
- `hrba-m1-s02-waterlife-video-poster.webp`
- `hrba-m1-s06-healthpost-evidence-board.svg`
- `hrba-m4-s03-inclusion-hotspot-base.webp`

For reusable story visuals:

`hrba-story-[number]-[asset-role]-[short-description].[format]`

Examples:

- `hrba-story-01-community-meeting-scene.webp`
- `hrba-story-03-coalition-map.svg`

Rules:

- use lowercase kebab-case;
- avoid spaces;
- avoid vague names like final, new, image1, or updated;
- include story/module/screen reference where relevant;
- do not rename actual files until migration is approved.

## Accessibility Metadata Requirements

Every meaningful story visual must include:

- concise alt text;
- long description if the image carries complex information;
- text alternative for diagrams, maps, evidence boards, hotspots, and actor maps;
- explanation of the learner action supported by the visual;
- screen reader instructions where interactive;
- keyboard instructions where interactive;
- caption/transcript metadata for video posters or media-related visuals;
- decorative status if the image does not carry instructional meaning.

Rules:

- image meaning must not depend on color alone;
- text should be rendered in UI, not embedded inside images where possible;
- tiny embedded text is not acceptable;
- hotspots need non-visual alternatives;
- evidence boards need accessible text equivalents;
- actor maps need text-based actor lists or descriptions.

## Safeguarding and Dignity Requirements

Story visuals must:

- show local actors as agents, contributors, leaders, facilitators, and rights-holders;
- avoid charity-poster imagery;
- avoid dramatic suffering imagery;
- avoid real organization names;
- avoid real logos;
- avoid government seals;
- avoid political party symbols;
- avoid identifiable real places when sensitive;
- avoid exposing children, survivors, displaced people, or vulnerable groups in risky ways;
- avoid pity-based disability imagery;
- show persons with disabilities as professionals, leaders, contributors, and rights-holders;
- show women's organizations and CSO actors as ethical facilitators and organizers, not saviors.

Sensitive visuals require extra review when they relate to:

- GBV;
- child protection;
- displacement;
- conflict;
- political accountability;
- safeguarding complaints;
- disability discrimination;
- crisis response;
- public accusations or corruption claims.

## Performance and Low-Bandwidth Requirements

Rules:

- do not remove premium visuals simply because they are heavy;
- optimize them before implementation;
- generate desktop/tablet/mobile variants for hero, module, and story anchor images;
- use WebP/AVIF where supported;
- provide fallback format if required;
- use SVG for diagrams, actor maps, icons, and simple process visuals where suitable;
- define focal point and crop behavior;
- use lazy loading for non-critical story images;
- use lightweight placeholder or blur preview for large visuals;
- avoid heavy composite images where UI-rendered cards can provide the same learning effect;
- avoid embedding long text in images;
- define file-size targets in the future implementation-ready asset plan.

## Visual Consistency Requirements

Rules:

- story visuals must follow the premium HRBA visual direction;
- illustration style should remain coherent across the course;
- framing, radius, shadow, overlay, and caption treatment should come from approved components;
- story visuals must work with approved screen recipes;
- images should have enough negative space where UI overlays are expected;
- visual warmth is encouraged, but sensationalism is not;
- image color mood should support the selected theme pack;
- visuals must not create a separate visual identity outside the design system.

## Image Cropping and Focal Point Rules

Each image should document:

- main focal point;
- safe crop area;
- mobile crop guidance;
- whether the image can be used in wide hero layout;
- whether it can be used in square/card format;
- whether it can support text overlay;
- whether it requires scrim/gradient overlay;
- whether important content is near image edges and may be lost on mobile.

Rules:

- avoid placing essential meaning at extreme edges;
- faces, key actions, and story objects should remain visible in mobile crops;
- text overlays must use approved overlay/surface treatment;
- if crop would harm meaning, use a different template or image variant.

## Story Visual Approval Statuses

- Proposed;
- Needs accessibility metadata;
- Needs performance optimization;
- Needs safeguarding review;
- Needs visual consistency review;
- Approved for migration;
- Approved for use after optimization;
- Approved as reference only;
- Needs redesign/regeneration;
- Reject / do not use.

## Example Mapping Rows

These rows are non-final examples only. They do not approve assets, filenames, placements, or migration.

| Story | Asset role | Possible screen | Possible template | Learning block | Accessibility | Performance | Status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| HRBA-STORY-01 Water is Life | Story anchor scene | M1-S02 | Split Story Anchor Screen | Case Story Block | Alt text and story text required | Desktop/tablet/mobile WebP variants needed | Example only - not approved |
| HRBA-STORY-01 Water is Life | Evidence board | M1-S04 | Case File / Evidence Board Screen | Hotspot / Labeled Graphic Block or Risk-Spotting Block | Text equivalents for each evidence item required | Consider SVG/UI-rendered cards | Example only - not approved |
| HRBA-STORY-02 Locked Health Post | Accountability case scene | M1-S06 | Split Story Anchor Screen or Case Story Screen | Case Story Block | Alt text and contextual description required | Optimized story image variants needed | Example only - not approved |

## What AI May Do With This Standard

AI may:

- map story visuals to story IDs and screen templates;
- draft alt text and long descriptions;
- suggest image roles;
- suggest filename improvements;
- identify performance needs;
- identify safeguarding risks;
- propose crop/focal-point guidance;
- suggest whether SVG, WebP, AVIF, PNG, or UI-rendered cards are more suitable;
- draft asset register entries for human review.

AI must not:

- migrate assets without approval;
- rename files silently;
- approve its own asset decisions;
- force new screen layouts around an image;
- treat story visuals as decorative when they carry meaning;
- place important text directly over images without approved treatment;
- ignore safeguarding risk;
- ignore low-bandwidth performance;
- use visuals outside approved template slots;
- bypass the Asset Migration Register or QA Gates.

## Story Visual QA Checklist

- [ ] Is the visual linked to a story ID?
- [ ] Is the visual linked to a module/screen or reusable story use?
- [ ] Is the asset role clear?
- [ ] Is the learning purpose clear?
- [ ] Is the screen template identified?
- [ ] Is the learning block identified?
- [ ] Does the visual support learner action?
- [ ] Is the visual meaningful or decorative?
- [ ] Is alt text provided?
- [ ] Is a long description needed?
- [ ] Are text alternatives provided for diagrams, maps, hotspots, and evidence boards?
- [ ] Is safeguarding risk assessed?
- [ ] Does the visual avoid stereotypes and charity framing?
- [ ] Is the focal point documented?
- [ ] Is mobile crop behavior defined?
- [ ] Are performance variants needed?
- [ ] Is low-bandwidth fallback considered?
- [ ] Does the visual preserve premium quality?
- [ ] Does the visual fit the approved visual direction?
- [ ] Does it avoid forcing a one-off layout?
- [ ] Is approval status recorded?

## Stop Conditions

Work must stop if:

- the visual has no clear learning purpose;
- the story ID is unclear;
- the asset role is unclear;
- safeguarding risk is unresolved;
- required alt text or text alternative is missing;
- the image requires a new one-off screen layout;
- the image is too heavy and no optimization plan exists;
- the image contains tiny unreadable text;
- the image uses real logos, organization names, political symbols, or identifiable sensitive places;
- the image would require unapproved tokens, themes, components, or CSS;
- the image conflicts with the Premium Visual Experience Standard.

## Relationship to Future Implementation

This standard should guide the future asset migration plan and vertical slice implementation.

No story image should be copied into approved assets folders until it has a register entry and approval status.

No screen should use story visuals outside approved template slots.

Implementation should use this standard together with the Asset Migration Register, Premium Visual Experience Standard, QA Gates, and Screen Template Register.

## Recommended Next Step

After this standard is reviewed, the next safe step should be to create a small Story Visual Intake Register for the first HRBA vertical slice, using only selected Module 1 story visuals as examples. That intake register should be documentation-only first and should not migrate files yet.

## Final Commitment

Story visuals should make the CSO Learning Hub more human, practical, beautiful, and locally grounded. They must strengthen learning without weakening accessibility, performance, safeguarding, or design-system discipline.
