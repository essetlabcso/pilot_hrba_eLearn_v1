# CSO Learning Hub Visual Foundations Inventory

## Status

Draft v0.1 - Evidence inventory before token/theme specification

## Purpose

This inventory records observed visual patterns, assets, risks, and reusable visual direction from the old HRBA pilot. It is evidence only. It is not an approved token specification, theme specification, asset approval list, CSS plan, or component implementation plan.

The purpose is to help the CSO Learning Hub decide what visual qualities may be worth preserving and what visual design debt must not be carried into the clean system.

## Relationship to Existing Documents

This inventory supports:

- Visual Foundations Decision Brief;
- Asset Migration Register;
- QA Gates;
- AI Production Contract;
- future token/theme specification.

This document does not approve tokens, themes, assets, CSS, or components. It does not authorize copying old styles, migrating assets, implementing components, or changing course behavior.

## Visual Direction Observed

The old HRBA pilot appears to contain several visual directions that may be useful after review:

- serious rights/accountability tone, visible in course/module naming, HRBA content structure, and dark learning-platform shell styling;
- premium learning-platform feel, visible in course roadmap, module cover imagery, player shell, cards, panels, and progress UI;
- navy/green/teal direction, visible in `src/styles/global.css` variables and repeated blue/green/dark navy usage;
- human-centered CSO/Ethiopia/East Africa visual feel, inferable from HRBA module assets, water-point/community imagery, accountability actor-map assets, and partner/CSO branding assets;
- strong module/course imagery, visible in `public/assets/hrba/modules/` cover files and large HRBA illustration assets;
- useful module journey/progress visual concepts, visible in `CourseRoadmap`, `ProgressStrip`, module journey image files, and course/player structure.

These observations are not approvals. They identify evidence to review before token, theme, component, or asset migration decisions are made.

## Observed Color and Style Evidence

The following values and patterns were observed in current files. They are listed as audit evidence only and are not approved tokens.

| Observed value or pattern | Source file/location | Possible role if inferable | Risk note | Token approval status |
| --- | --- | --- | --- | --- |
| `#3B99D4`, `#0E6F9F`, `#91C852`, `#0F172A` | `src/styles/global.css` root variables | Primary blue, stronger blue, accent green, deep navy direction | Useful direction may exist, but values come from old global CSS and require contrast/system review | Not approved as token |
| `#F9FAFB`, `#FFFFFF`, `#111827`, `#6B7280`, `#E5E7EB` | `src/styles/global.css` root variables | Platform background, surface, text, muted text, border | Common neutral pattern but must be revalidated in a full neutral/background system | Not approved as token |
| `#F97316`, `#EF4444` | `src/styles/global.css` root variables | Warning and danger colors | Semantic color use requires accessibility and state review | Not approved as token |
| `--player-shell-bg`, `--player-header-bg`, `--player-sidebar-bg`, `--player-stage-bg`, `--player-card-bg` | `src/styles/global.css` player variables | Player shell and stage surfaces | Old shell styling may mix platform structure with course-specific design decisions | Not approved as token |
| `--button-primary-bg`, `--button-success-bg`, `--button-danger-*` | `src/styles/global.css` button variables | Button state direction | Button behavior and contrast must be defined through future component rules | Not approved as token |
| `--feedback-success-*`, `--feedback-warning-*`, `--feedback-info-*` | `src/styles/global.css` feedback variables | Feedback panel direction | Feedback colors need systematic semantic rules and contrast testing | Not approved as token |
| `--font-family-body: 'Inter'`, `--font-family-headings: 'Outfit'` | `src/styles/global.css` typography variables | Body and heading family direction | Font direction may be useful but needs licensing, loading, scale, and fallback decisions | Not approved as token |
| `--m5-blue`, `--m5-green`, `--m5-navy`, `--m5-orange` | `src/styles/global.css` Module 5 variables | Module-specific palette duplication | Module-local color systems are design debt if copied directly | Not approved as token |
| Many `--m5-lab-*` variants using blue, green, teal, purple, pink, slate, orange, and yellow values | `src/styles/global.css` Module 5 lab sections | Local screen/theme variants | Indicates uncontrolled local theme variation and possible contrast drift | Not approved as token |
| `linear-gradient(...)` using blue/navy/green/white/light surface combinations | `src/styles/global.css`, `src/styles/module1-visual-supports.css`, `src/styles/module2-qa-upgrades.css` | Hero, card, panel, and module accent treatments | Hard-coded gradients must not migrate directly; overlay and contrast policy is missing | Not approved as token |
| `box-shadow` and `rgba(...)` panel shadows | `src/styles/global.css`, module CSS files | Card/panel elevation | Shadow policy is local and inconsistent until a future elevation system exists | Not approved as token |
| Inline `style={{ ... }}` patterns with colors, gradients, overlays, and dimensions | `src/components/platform/PlatformShell.tsx`, `src/components/player/*.tsx`, `src/components/course/*.tsx` | One-off layout and visual fixes | Inline screen/shell styling is design debt and must not migrate directly | Not approved as token |

## Typography and Spacing Evidence

### Potentially useful direction

- `Inter` and `Outfit` are referenced in `src/styles/global.css`, suggesting a modern learning-platform typography direction.
- Cards, panels, and player surfaces use rounded containers, shadows, borders, and light/dark surface contrast.
- Course/module structure suggests a visual hierarchy with module titles, screen titles, progress elements, cards, feedback panels, and CTAs.
- Some components use reusable visual concepts such as `CourseRoadmap`, `ModuleLaunchCard`, `PlayerSidebar`, `PlayerHeader`, `ProgressStrip`, and modal panels.

### Inconsistent or risky

- `src/styles/global.css` is very large, which makes it hard to reason about visual ownership and cascade effects.
- Module-specific CSS files exist alongside global styling, including `module1-ux-polish.css`, `module1-visual-supports.css`, and `module2-qa-upgrades.css`.
- Multiple renderers and player/platform files contain inline styles, making typography, spacing, and layout behavior hard to govern.
- Repeated local card, button, panel, modal, and progress patterns appear across large renderer files.

### Design debt

- Screen-level layout rules are embedded in large renderer components.
- Module-local visual systems duplicate or override global direction.
- Hard-coded spacing, colors, shadows, dimensions, and gradients appear in CSS and component inline styles.
- Old screen polish appears to have been added through patches instead of a shared design system.

### Unclear

- Some old visual decisions may have been intentional accessibility improvements, but their current locations do not make that clear.
- Some module-specific variations may represent useful learning rhythm, but they need to be remapped into approved templates, blocks, and theme rules before reuse.

## Icon and Visual Asset Evidence

### Asset folders observed

- `public/assets/brand/logos/`
- `public/assets/brand/partners/`
- `public/assets/certificates/templates/`
- `public/assets/hrba/module-1/icons/`
- `public/assets/hrba/module-1/icons/png/`
- `public/assets/hrba/module-1/icons/svg/`
- `public/assets/hrba/module-1/images/`
- `public/assets/hrba/module-1/journey/`
- `public/assets/hrba/module-2/images/`
- `public/assets/hrba/module-2/screen-2-1/`
- `public/assets/hrba/modules/`
- `public/assets/hrba/shared/icons/`
- `public/assets/module1/`
- `src/assets/hrba/module-1/`
- `src/assets/hrba/module-2/visuals/`
- `src/assets/approved/hrba/` scaffold folders.

### Naming evidence

- Some assets use clean lowercase kebab-case, such as `module-2-cover-teamwork.png`.
- Some assets use module/screen prefixes, such as `m2-s04-rights-dimensions-hotspot.png`.
- Some assets use uppercase and mixed naming, such as `M2_S2_1_VIS_01_ScenarioIllustration.png`.
- Some older generic names exist, such as `Image_1.1.png` and `Image_1.2.png`.
- Some folders duplicate icon formats across nearby locations, including `icons/`, `icons/png/`, and `icons/svg/`.

### Possible useful assets after review

- HRBA module cover images in `public/assets/hrba/modules/`.
- Module 1 journey images in `public/assets/hrba/module-1/journey/`.
- Module 1 community, participation, rights-holder, accountability, and pathway assets in `src/assets/hrba/module-1/`.
- Module 2 rights dimensions, actor-map, SDG/LNOB, and power/exclusion visuals in `src/assets/hrba/module-2/visuals/`.
- Brand and partner logos in `public/assets/brand/`, subject to brand governance and size/performance review.

### Icon and asset risks

- Icon assets appear in multiple folders and formats, with large PNG versions and repeated SVG locations.
- Some SVG and PNG icon files are large enough to require optimization review.
- Large illustration and image files appear frequently, including files above 1 MB and some above 3 MB.
- Asset naming is inconsistent across public and source asset folders.
- No asset is approved for migration by this inventory.

## Accessibility and Readability Risks Observed

The following risks are visible or inferable from current files and audit evidence:

- unsafe contrast risk from hard-coded colors and gradients;
- white text on light or image/gradient background risk where overlays are not governed by a policy;
- tiny text inside image/diagram assets risk, especially for large infographic or hotspot images;
- visual meaning carried by icon, color, position, or image alone unless text alternatives are defined;
- possible hidden CTA or blocked navigation risk on mobile due to large screen-level renderers and local layout rules;
- mobile overlap risk from inline dimensions, card/panel layouts, and patched CSS;
- image-heavy/low-bandwidth risk from large PNG assets and module cover imagery;
- accessibility toolbar/modals exist, but visual accessibility behavior still needs system-level rules before reuse.

## Design Debt That Must Not Migrate

These observed patterns must not be copied directly into the clean system:

- large global CSS as the source of future system truth;
- module-specific patch CSS;
- inline styles in platform, player, modal, and screen renderer components;
- hard-coded colors and gradients;
- hard-coded shadows, dimensions, and spacing;
- one-off visual fixes inside screen renderers;
- inconsistent icon systems and duplicated asset locations;
- repeated layout/rendering patterns across large module renderers;
- screen-level style rules embedded in renderers;
- module-local color/theme variants that bypass shared governance;
- old button, card, modal, feedback, and progress styles without component review.

## Candidate Visual Qualities to Preserve

Only the following high-level qualities are candidates for preservation. They must be rebuilt through approved tokens, themes, components, blocks, templates, and asset rules:

- calm, serious, rights/accountability-oriented tone;
- premium learning-platform mood;
- strong course/module cover image direction;
- human-centered CSO and East Africa visual feel;
- dark shell plus light learning stage concept, if approved after contrast and layout review;
- blue/green/navy family direction, if approved after color and accessibility review;
- card and panel clarity, rebuilt through reusable components;
- module journey/progress ideas, rethought through system components;
- practical visual support for scenarios, comparisons, processes, and reflection.

## Candidate Assets and Content for Later Review

These are candidate areas only. They are not approved migrated assets.

| Source path | Type | Why it may be useful | Required review before migration | Asset Migration Register status suggestion |
| --- | --- | --- | --- | --- |
| `public/assets/hrba/modules/` | Module cover images | Strong course/module image direction and pilot identity | Source, naming, file size, alt text, overlay safety, mobile use, visual consistency | Needs review |
| `public/assets/hrba/module-1/journey/` | Journey/progress images | May support module journey or process concepts | Learning purpose, text alternative, file size, whether rebuilt as component instead | Needs review |
| `src/assets/hrba/module-1/screen-05/` | Scenario and HRBA lens images | Contains water-point, participation, actor-map, and accountability-related visual ideas | Safeguarding, accuracy, alt text, optimization, whether image text is readable | Needs review |
| `src/assets/hrba/module-1/screen-08-10/` | Rights, sectors, groups, inclusion visuals | May support comparison, framework, or risk-spotting learning blocks | Icon consistency, inclusion framing, file size, text alternative | Needs review |
| `src/assets/hrba/module-1/screen-14/` | Shift/pathway visuals | May support process or comparison screens | Whether content should become template/block content rather than copied image | Needs review |
| `src/assets/hrba/module-2/visuals/` | Module 2 concept visuals | May support rights dimensions, actor map, SDG/LNOB, and power/exclusion content | Accessibility, low-bandwidth suitability, asset naming, approved screen/template mapping | Needs review |
| `public/assets/hrba/module-1/icons/` and nested `png`/`svg` folders | Icon sets | Contains HRBA concept icons and action/role imagery | Icon family consistency, duplicated formats, file size, semantic meaning, text labels | Needs review |
| `public/assets/brand/` | Brand and partner logos | Needed for platform identity and partner recognition | Brand approval, placement rules, file size, contrast, responsive behavior | Needs separate decision |
| `src/data/module1/` and `src/data/module2/` | Screen sequences, asset prompts, registries, content | May contain useful learning structure and visual prompt evidence | Remap content to approved blocks/templates; avoid copying screen logic | Needs review |

## Decisions Still Needed Before Token/Theme Specification

Human approval is still needed for:

- primary color direction;
- neutral/background system;
- text color hierarchy;
- action and semantic color behavior;
- typography direction;
- spacing scale direction;
- icon style and approved icon family;
- illustration style;
- theme pack priorities;
- high contrast behavior;
- focus-ring behavior;
- image overlay policy;
- chart/data visual style;
- asset optimization and low-bandwidth policy.

## Recommendation

The next step should be to draft a token/theme specification using this inventory and the Visual Foundations Decision Brief, while keeping all observed values as evidence rather than approvals. The evidence is sufficient to identify the main visual direction and the main debt patterns.

A deeper visual asset review should follow before any asset migration, especially for large PNG assets, duplicated icon folders, module cover images, and image-heavy diagrams.

## Final Note

This inventory is evidence for decision-making only. It must not be used as permission to copy old CSS, hard-coded colors, icons, assets, or screen-level styles into the clean system.
