# CSO Learning Hub Token and Theme Accessibility Review

## Status

Draft v0.1 - Accessibility and contrast review before token/theme implementation

## Purpose

This document reviews the proposed token/theme direction for accessibility, contrast, readability, mobile usability, high contrast readiness, and implementation risk before any token or theme code is created.

It reviews draft candidate values and visual directions only. It does not create tokens, themes, CSS, components, accessibility logic, assets, or course screens.

## Relationship to Existing Documents

This review supports:

- Token and Theme Specification Proposal;
- Visual Foundations Inventory;
- Visual Foundations Decision Brief;
- QA Gates;
- Asset Migration Register;
- future token/theme implementation.

This document does not approve implementation by itself. It identifies what can proceed to contrast testing, what needs revision, and what remains unclear before any coding begins.

## Core Accessibility Review Rule

No proposed color, typography, theme, or visual treatment should move into implementation until it is checked for readability, contrast, high contrast behavior, mobile usability, and non-color-only meaning.

## Proposed Token Value Review

The Token and Theme Specification Proposal lists draft candidate values from old HRBA pilot evidence. The values below are reviewed as candidates only, not as final implementation values.

### Page and Background Surfaces

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#F9FAFB` | Main page/app background and learning stage background | Low risk with dark primary text, but needs validation with muted text, disabled labels, card borders, and high contrast mode | Yes | Proceed to contrast test |
| `#FFFFFF` | Primary card/panel surface | Low risk with dark primary text, but risks appear with pale borders, muted labels, and disabled states | Yes | Proceed to contrast test |

Review note: preliminary candidate checks show `#111827` on `#F9FAFB` at about 16.98:1 and `#111827` on `#FFFFFF` at about 17.74:1. These are strong candidate pairings, but they are not final approvals.

### Soft Blue, Green, and Warning Surfaces

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#EEF7FC` | Soft info/callout surface | Low risk with dark text, but visual distinction from page background may be subtle | Yes | Proceed to contrast test |
| `#F4FAEC` | Soft success/positive feedback surface | Low risk with dark text, but success cannot rely on green alone | Yes | Proceed to contrast test |
| `#FFF4E8` | Soft warning/reflection surface | Low risk with dark text, but warning semantics may be too gentle without label/icon/text support | Yes | Proceed to contrast test |

Review note: preliminary candidate checks show dark navy text `#0F172A` on these soft surfaces above 16:1. The main risk is not text contrast; it is semantic clarity, non-color-only meaning, and enough visible distinction from surrounding surfaces.

### Dark Inverse Shell and Sidebar Surfaces

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#0F172A` | Dark shell/header/sidebar surface | Strong candidate with light text, but focus rings, active states, icons, borders, and disabled states require separate testing | Yes | Proceed to contrast test |
| `#1E293B` | Secondary dark navigation/sidebar surface | Strong candidate with light text, but nested panels and hover/active states need validation | Yes | Proceed to contrast test |
| `#334155` | Dark border/separator evidence | May be too subtle on dark surfaces if used for state or structure | Yes | Unclear until tested |

Review note: preliminary candidate checks show `#F9FAFB` on `#0F172A` at about 17.08:1 and `#F9FAFB` on `#1E293B` at about 14.00:1. Text contrast appears strong, but dark shell usability depends on focus, active, hover, completed, locked, and sidebar state design.

### Text Colors

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#111827` | Primary text on light surfaces | Strong candidate against page and card surfaces | Yes | Proceed to contrast test |
| `#6B7280` | Secondary/muted text | Marginal for normal text and risky for small text, disabled labels, metadata, and low-quality displays | Yes | Revise or restrict use |
| `#F9FAFB` | Inverse text on dark surfaces | Strong candidate against dark shell/sidebar, but must be tested against all dark variants and overlays | Yes | Proceed to contrast test |
| `#0F172A` | Text on accent/green/soft surfaces | Strong candidate on observed green and soft surfaces | Yes | Proceed to contrast test |

Review note: preliminary candidate checks show `#6B7280` on `#F9FAFB` at about 4.63:1 and on `#FFFFFF` at about 4.83:1. This barely clears normal text contrast and should not be used for small text unless revised darker or limited to nonessential metadata with adequate size.

### Action and Button Colors

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#0E6F9F` with `#FFFFFF` text | Primary CTA | Candidate contrast appears acceptable, but focus, hover, disabled, and pressed states are not defined | Yes | Proceed to contrast test |
| `#3B99D4` with `#FFFFFF` text | Lighter blue action/info candidate | Likely fails normal text contrast with white text | Yes | Revise before implementation |
| `#91C852` with `#0F172A` text | Success or positive action | Candidate contrast appears strong, but green should not be the only completion signal | Yes | Proceed to contrast test |
| transparent/neutral secondary actions | Secondary CTA | Risk of low affordance and unclear focus/hover states | Yes | Unclear until component states are specified |

Review note: preliminary candidate checks show white text on `#0E6F9F` at about 5.54:1, but white text on `#3B99D4` at about 3.14:1. The lighter observed blue should not be used as a button background with white normal-size text without revision.

### Success, Warning, Danger, and Info Colors

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| `#F4FAEC`, `#91C852`, `#0F172A` | Success feedback | Text contrast appears promising, but success must include text/icon support and not rely on green alone | Yes | Proceed to contrast test |
| `#FFF4E8`, `#F97316`, `#0F172A` | Warning/reflection feedback | Warning border/accent needs validation; soft warning surface may be too subtle | Yes | Proceed to contrast test |
| `#EF4444` | Danger/error accent or border | White text on this red candidate appears below normal text contrast; use requires revision or darker pairing | Yes | Revise before implementation |
| `#EEF7FC`, `#3B99D4`, `#0F172A` | Info feedback | Soft info surface with dark text appears promising; lighter blue with white text is risky | Yes | Proceed to contrast test with restrictions |

Review note: preliminary candidate checks show white text on `#EF4444` at about 3.76:1. This is not safe for normal-size button text. Danger/error treatment should likely use dark text on a soft surface, a darker danger background, or a revised pairing after formal testing.

### Focus Colors

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| reviewed high-contrast blue or amber | Focus ring on light surfaces | No actual value proposed yet, so visibility cannot be confirmed | Yes | Unclear; define and test before coding |
| reviewed light/high-contrast color | Focus ring on dark surfaces | No actual value proposed yet, so dark shell focus cannot be confirmed | Yes | Unclear; define and test before coding |

Focus color is a blocking accessibility decision. It must be visible on light cards, dark shell/sidebar surfaces, image-backed sections, modals, toolbar controls, and high contrast mode.

### Overlay and Image Treatment Colors

| Candidate values found | Intended use | Likely accessibility risk | Contrast testing required before implementation | Recommendation |
| --- | --- | --- | --- | --- |
| reviewed dark translucent overlay | Modal/image overlay scrim | Opacity and underlying image variation can make text unreadable if not tested | Yes | Unclear; define strict overlay rules |
| reviewed contrast-safe image text overlay | Text on image-backed surfaces | White text on pale or busy images is a known risk from the visual inventory | Yes | Revise into explicit overlay policy before implementation |

Overlay treatment should not proceed until a policy defines when text may sit on images, what overlay strength is required, and when text must be moved outside the image.

## Required Contrast Pair Checks Before Implementation

Before any token or theme code is written, these pairs must be tested:

- [ ] primary text on page background;
- [ ] primary text on card surface;
- [ ] muted text on page background;
- [ ] muted text on card surface;
- [ ] inverse text on dark shell/sidebar;
- [ ] button text on primary action color;
- [ ] button text on success/warning/danger colors;
- [ ] feedback text on success/warning/danger/info soft surfaces;
- [ ] focus ring against light surface;
- [ ] focus ring against dark surface;
- [ ] text over image overlays;
- [ ] disabled labels against their backgrounds;
- [ ] locked labels against their backgrounds;
- [ ] completed labels against their backgrounds;
- [ ] active/current labels against their backgrounds;
- [ ] icon foreground against light and dark surfaces;
- [ ] chart/data series colors against chart backgrounds.

## Typography Accessibility Review

### Heading readability

The proposal defines heading roles but does not yet define sizes, weights, or line heights. This is appropriate before implementation, but the future token specification must ensure that course titles, module titles, screen titles, section headings, and card headings remain readable on mobile and maintain semantic heading order.

### Body text readability

The proposed body text direction supports learning content, feedback, instructions, and scenarios. Future values must support sustained reading, not only dense UI display.

### Small text risk

Small/supporting text is a risk area. The proposed muted text candidate is marginal for normal text and should not be used for small essential instructions, progress labels, errors, warnings, locked states, or completion requirements unless it is revised and tested.

### Line height

The proposal correctly calls for comfortable line height for long-form explanations, scenario text, feedback, and reflection prompts. Future line-height tokens must also support enlarged text and mixed content blocks.

### Mobile readability

Future typography tokens must prevent tiny labels, crowded buttons, clipped headings, and hidden instructions. Text enlargement must be tested in cards, modals, sidebars, accordions, knowledge checks, and feedback panels.

### Font loading and fallback risk

`Inter` and `Outfit` were observed in old CSS evidence and mentioned as a possible direction. They require final approval, licensing/availability review, loading strategy, fallback stack review, and performance review before implementation.

## Spacing/Layout Accessibility Review

### Touch target needs

Button, toolbar, modal, accordion, hotspot, and knowledge-check controls will need touch-friendly minimum sizing. The proposal does not define values yet, so this must become a specific implementation requirement before components are built.

### Cards, buttons, and panels

Spacing must support comprehension and clear interaction targets. Dense cards and nested panels should be avoided unless a future template explicitly permits them and verifies mobile behavior.

### Mobile stacking

The proposal correctly requires mobile-first stacking. Future layout tokens and templates must define how comparison blocks, framework screens, image/text layouts, sidebars, modals, and player controls stack without overlap.

### Text enlargement behavior

Text enlargement must not break CTA visibility, card boundaries, modal scrolling, sidebar navigation, or feedback states. This should be part of the first vertical slice QA evidence.

### Hidden CTA and overlap risk

The old pilot had large screen renderers, image-heavy layouts, and local CSS patches. The clean system must explicitly test for hidden CTAs, overlapping text, fixed-height content traps, and horizontal scroll.

### Dense screen risk

Theme and spacing choices must support cognitive load management. Dense screens should be avoided unless the screen template defines why the density is necessary and how the learner action remains clear.

## Theme Pack Accessibility Review

| Theme pack | Likely accessibility risk | Color/visual caution | Required safeguards | Can proceed to token design after contrast testing? |
| --- | --- | --- | --- | --- |
| Rights and Accountability | Dark shell, navy/green direction, and serious tone could create low-contrast active/focus states if not tested | Avoid copying old navy/green/teal values blindly | Validate dark/light text pairs, focus rings, CTA contrast, feedback states, and image overlays | Yes, after contrast testing |
| Project Practice | Operational screens may become dense or tool-like | Avoid cramped panels, small labels, and local tool styling | Define touch targets, panel spacing, button states, and mobile stacking | Yes, after contrast testing and layout rules |
| Evidence and Learning | Data visuals may rely on color alone | Avoid chart series that are indistinguishable or low contrast | Add labels, patterns/text alternatives, chart contrast tests, and plain-language summaries | Yes, after chart/data safeguards |
| Community Voice | Warm visuals could drift into low contrast, sentimental styling, or stereotype risk | Avoid pale warm surfaces with muted text and charity-poster imagery | Review imagery, safeguard language, text contrast, and story readability | Yes, after accessibility and inclusion review |
| Organizational Strengthening | Structured layouts may become too dashboard-like or dense | Avoid tiny metadata and overnested cards | Require clear hierarchy, keyboard navigation, spacing, and responsive behavior | Yes, after layout and contrast testing |
| Safety and Trust | Risk, safety, and safeguarding states may rely on color or alarming visuals | Avoid red/orange-only meaning and harsh visual treatment | Use clear labels, calm warning states, dignity review, and accessible error/warning patterns | Yes, after semantic state validation |
| Advocacy and Influence | Energetic action treatment could introduce uncontrolled accent colors or aggressive contrast | Avoid untested gradients and action colors | Validate CTA contrast, focus states, motion, and readable emphasis | Yes, after contrast and motion review |

## High Contrast Mode Requirements

High contrast mode must guarantee:

- readable text on all surfaces;
- visible focus state;
- clear active/current/completed/locked states;
- no color-only meaning;
- strong button readability;
- usable cards and panels;
- readable feedback states;
- no invisible icons/text;
- readable disabled labels and unavailable actions;
- meaningful borders or separators where structure is needed;
- visible modal, toolbar, and sidebar controls.

High contrast mode must not be treated as a late visual override. It should be planned with token structure and component states from the start.

## Image Overlay and Visual Asset Requirements

The visual inventory and Asset Migration Register show that image-heavy HRBA assets may be useful, but they require strict accessibility review.

Requirements:

- no white text directly on pale or busy images;
- overlays must be tested;
- important text should preferably be outside images;
- images with embedded text require review;
- diagrams need text alternatives;
- icons must not carry meaning alone;
- asset migration must follow the Asset Migration Register;
- low-bandwidth and mobile readability must be considered;
- large images need optimization review before migration;
- image overlays must support high contrast mode or provide an alternate layout.

## Risks That Must Be Resolved Before Coding Tokens/Themes

Risks found in this review:

- draft colors are not fully contrast-tested;
- old observed values may not be safe;
- soft surfaces may reduce visible distinction even when text contrast is high;
- dark sidebar/shell requires inverse text, focus, active, completed, locked, and hover validation;
- muted text may fail for small text or essential labels;
- white text on lighter observed blue appears unsafe for normal-size text;
- white text on observed danger red appears unsafe for normal-size text;
- warning/success surfaces need semantic consistency and non-color-only support;
- overlay treatment needs strict rules before image-backed screens are implemented;
- focus token values are not yet defined;
- typography fallback/loading needs a decision;
- high contrast behavior is not yet specified as actual token behavior;
- theme packs need contrast-safe variation boundaries before implementation.

## Recommended Pre-Implementation Decision

The next step should be to run a focused contrast calculation task before creating token files or theme files.

Based on this review, the overall visual direction can continue toward implementation planning, but not directly into code. The contrast task should test all candidate text/background/action/state pairs, identify failed combinations, and produce an implementation-ready token specification or a revised Token and Theme Specification Proposal.

## Final Commitment

The CSO Learning Hub token and theme system must be accessibility-safe before implementation. Visual consistency is not enough; every theme must protect readability, keyboard visibility, mobile usability, and inclusive learning access.
