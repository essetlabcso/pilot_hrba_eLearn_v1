# CSO Learning Hub Implementation-Ready Token Specification

## Status

Draft v0.1 — Implementation-ready token specification for human review before coding

## Purpose

This document resolves the token/theme accessibility decisions needed before creating actual token files or theme files. It is documentation-only and does not implement code.

This document prepares tokens for implementation.

It does not create code.

It does not create CSS.

It does not migrate assets.

It does not approve old HRBA styles.

It translates reviewed visual direction into a structured specification for later implementation.

All values in this document are implementation-ready specifications for review, not coded tokens.

## Relationship to Existing Documents

This specification follows:

- Token and Theme Specification Proposal;
- Token and Theme Accessibility Review;
- Premium Visual Experience Standard;
- Visual Foundations Decision Brief;
- Visual Foundations Inventory;
- QA Gates;
- Asset Migration Register;
- Story Visual Integration Standard;
- AI Production Contract.

If any implementation conflicts with these documents, work must stop.

## Core Token Principle

The token system must protect three things at the same time:

1. premium visual beauty;
2. accessibility and readability;
3. reusable system consistency.

No token should be chosen only because it looks attractive.

No token should be chosen only because it is safe but visually flat.

Every token must support a premium, accessible, reusable learning system.

## Decision Summary

| Decision area | Decision | Reason | Implementation status |
| --- | --- | --- | --- |
| Primary dark shell | Retain dark navy direction for shell/header/sidebar. | Preserves premium learning-platform identity and strong inverse text contrast. | Implementation-ready specification for review |
| Light page/card surfaces | Retain light page, stage, and card surfaces. | Supports sustained reading, learning content, and clean card/panel hierarchy. | Implementation-ready specification for review |
| Soft semantic surfaces | Retain soft info/success/warning surfaces only with dark text and semantic labels/icons. | Soft surfaces can preserve warmth and vibrancy without sacrificing text contrast. | Implementation-ready specification for review |
| Muted text | Revise normal secondary text darker; restrict old muted value. | Old muted text barely clears normal contrast and is risky for small or essential text. | Implementation-ready specification for review |
| Lighter blue `#3B99D4` | Reject for white normal-size button text. | Candidate contrast with white text is about 3.14:1, below normal text target. | Implementation-ready specification for review |
| Red `#EF4444` | Reject for white normal-size danger button text. | Candidate contrast with white text is about 3.76:1, below normal text target. | Implementation-ready specification for review |
| Focus tokens | Define explicit light, dark, and image-surface focus tokens. | Focus visibility cannot be patched later and must work across all surfaces. | Implementation-ready specification for review |
| Image overlays | Tokenize scrim and overlay behavior. | Story images need premium treatment without text over uncontrolled image areas. | Implementation-ready specification for review |
| High contrast mode | Plan high contrast token set from the start. | High contrast mode must not be a late override or visual afterthought. | Implementation-ready specification for review |
| Typography | Use premium display hierarchy and readable body system. | Learning content needs sustained readability and stakeholder-impressive hierarchy. | Implementation-ready specification for review |
| Theme packs | Allow accent variation only inside contrast-safe boundaries. | Variation should create freshness without local CSS drift or accessibility risk. | Implementation-ready specification for review |

## Contrast Calculation Method

Use WCAG contrast ratio logic.

- Normal text target: minimum 4.5:1.
- Large text target: minimum 3:1.
- UI component/focus indicator target: minimum 3:1 against adjacent surfaces.
- Prefer stronger ratios for small text, muted text, metadata, locked states, mobile, and low-quality displays.
- Token choices should aim for comfortable margins, not barely passing values.

Contrast calculations in this document are planning evidence and should be re-tested during implementation.

## Approved Foundation Color Tokens for First Implementation

All values below are implementation-ready specifications for review, not coded tokens.

| Token name | Role | Value | Contrast/use notes | Decision status |
| --- | --- | --- | --- | --- |
| `color.background.page` | Main page background | `#F9FAFB` | Strong contrast with primary and secondary text candidates. | Implementation-ready specification for review |
| `color.background.stage` | Learning stage background | `#F9FAFB` | Supports light learning stage and premium cards/panels. | Implementation-ready specification for review |
| `color.surface.primary` | Primary cards/panels | `#FFFFFF` | Strong contrast with primary and secondary text candidates. | Implementation-ready specification for review |
| `color.surface.softInfo` | Soft info/callout surface | `#EEF7FC` | Use dark text; do not rely on blue tint alone for meaning. | Implementation-ready specification for review |
| `color.surface.softSuccess` | Soft success/positive surface | `#F4FAEC` | Use dark text plus semantic label/icon support. | Implementation-ready specification for review |
| `color.surface.softWarning` | Soft warning/reflection surface | `#FFF4E8` | Use dark text plus warning label/icon support. | Implementation-ready specification for review |
| `color.surface.softDanger` | Soft danger/error surface | `#FEF2F2` | Pair with dark danger text; avoid white-on-red for message body. | Implementation-ready specification for review |
| `color.surface.inverse` | Dark header/shell/sidebar surface | `#0F172A` | Strong contrast with inverse text and amber focus. | Implementation-ready specification for review |
| `color.surface.inverseRaised` | Secondary dark navigation/panel surface | `#1E293B` | Strong contrast with inverse text; test active/current states. | Implementation-ready specification for review |
| `color.surface.inverseBorder` | Dark subtle border/separator | `#334155` | Use as structure only; never as sole state indicator. | Implementation-ready specification for review |
| `color.text.primary` | Primary text on light surfaces | `#111827` | Very strong contrast on page and card surfaces. | Implementation-ready specification for review |
| `color.text.strong` | Strongest navy text / headings | `#0F172A` | Strong heading and on-accent text candidate. | Implementation-ready specification for review |
| `color.text.secondary` | Secondary text on light surfaces | `#4B5563` | Safer than old muted value for normal secondary text. | Implementation-ready specification for review |
| `color.text.muted` | Nonessential muted text only | `#6B7280` | Restricted to nonessential metadata at adequate size. | Implementation-ready specification for review |
| `color.text.inverse` | Primary text on dark surfaces | `#F9FAFB` | Strong contrast on dark shell and raised dark surfaces. | Implementation-ready specification for review |
| `color.text.inverseMuted` | Secondary text on dark surfaces | `#CBD5E1` | Requires implementation re-test on dark surfaces and states. | Implementation-ready specification for review |
| `color.text.danger` | Danger text on soft danger surface | `#7F1D1D` | Strong candidate on soft danger surfaces. | Implementation-ready specification for review |
| `color.action.primary` | Primary CTA background | `#0E6F9F` | Passes with white text; preserves observed blue direction safely. | Implementation-ready specification for review |
| `color.action.primaryText` | Primary CTA text | `#FFFFFF` | Use only on approved action backgrounds with tested contrast. | Implementation-ready specification for review |
| `color.action.primaryHover` | Primary CTA hover | `#075985` | Darker hover direction; re-test against white during implementation. | Implementation-ready specification for review |
| `color.action.secondaryText` | Secondary action text | `#0E6F9F` | Use with underline/border/focus support where needed. | Implementation-ready specification for review |
| `color.accent.success` | Success accent | `#91C852` | Works with dark text; do not use green alone for success. | Implementation-ready specification for review |
| `color.accent.warning` | Warning accent | `#F97316` | Works with dark text; pair with label/icon for warning meaning. | Implementation-ready specification for review |
| `color.accent.danger` | Danger accent/border | `#B91C1C` | Safer danger background if white text is needed. | Implementation-ready specification for review |
| `color.accent.info` | Info accent | `#0E6F9F` | Safer info/action blue than lighter observed blue for text-bearing UI. | Implementation-ready specification for review |
| `color.accent.warm` | Warm decorative accent | `#F59E0B` | Use for nonessential warmth; test if carrying meaning or text. | Implementation-ready specification for review |
| `color.focus.lightSurface` | Focus ring on light surfaces | `#2563EB` | Visible against white/light surfaces. | Implementation-ready specification for review |
| `color.focus.darkSurface` | Focus ring on dark surfaces | `#FBBF24` | Visible against dark shell/sidebar. | Implementation-ready specification for review |
| `color.focus.imageSurface` | Focus ring on image/overlay surfaces | `#FBBF24` | Pair with halo/support where image complexity requires it. | Implementation-ready specification for review |
| `color.focus.halo` | Focus halo/outer support | `#0F172A` | Supports focus visibility on complex or light image areas. | Implementation-ready specification for review |
| `color.overlay.scrimDark` | Image readability scrim | `rgba(15, 23, 42, 0.72)` | Use for text/image readability; test against actual images. | Implementation-ready specification for review |
| `color.overlay.scrimSoft` | Soft image overlay | `rgba(15, 23, 42, 0.48)` | Use only where text remains contrast-safe. | Implementation-ready specification for review |
| `color.overlay.modal` | Modal backdrop | `rgba(15, 23, 42, 0.72)` | Must not hide focus or trap inaccessible content. | Implementation-ready specification for review |
| `color.highContrast.background` | High contrast background | `#000000` | High contrast mode only. | Implementation-ready specification for review |
| `color.highContrast.surface` | High contrast surface | `#111111` | High contrast mode only. | Implementation-ready specification for review |
| `color.highContrast.text` | High contrast text | `#FFFFFF` | High contrast mode only. | Implementation-ready specification for review |
| `color.highContrast.focus` | High contrast focus | `#FFD60A` | High contrast mode focus candidate. | Implementation-ready specification for review |
| `color.highContrast.link` | High contrast link/action | `#7DD3FC` | High contrast mode link/action candidate. | Implementation-ready specification for review |

## Required Contrast Evidence Table

| Pair | Expected ratio if already known | Status | Decision |
| --- | --- | --- | --- |
| `#111827` on `#F9FAFB` | about 16.98:1 | Pass | Use for primary text on page background. |
| `#111827` on `#FFFFFF` | about 17.74:1 | Pass | Use for primary text on cards/panels. |
| `#0F172A` on `#EEF7FC` | about 16.45:1 | Pass | Use dark text on soft info surface. |
| `#0F172A` on `#F4FAEC` | about 16.77:1 | Pass | Use dark text on soft success surface. |
| `#0F172A` on `#FFF4E8` | about 16.46:1 | Pass | Use dark text on soft warning surface. |
| `#F9FAFB` on `#0F172A` | about 17.08:1 | Pass | Use inverse text on dark shell. |
| `#F9FAFB` on `#1E293B` | about 14.00:1 | Pass | Use inverse text on raised dark surfaces. |
| `#6B7280` on `#F9FAFB` | about 4.63:1 | Restrict | Not for small essential text. |
| `#6B7280` on `#FFFFFF` | about 4.83:1 | Restrict | Not for small essential text. |
| `#4B5563` on `#F9FAFB` | about 7.23:1 | Pass | Use for normal secondary text. |
| `#4B5563` on `#FFFFFF` | about 7.56:1 | Pass | Use for normal secondary text. |
| `#FFFFFF` on `#0E6F9F` | about 5.54:1 | Pass | Use for primary CTA text. |
| `#FFFFFF` on `#3B99D4` | about 3.14:1 | Fail | Reject for button background with white normal text. |
| `#0F172A` on `#91C852` | about 9.00:1 | Pass | Use dark text on success/accent green where needed. |
| `#FFFFFF` on `#EF4444` | about 3.76:1 | Fail | Reject for danger button text. |
| `#FFFFFF` on `#B91C1C` | about 6.47:1 | Pass | Use for danger button if needed. |
| `#7F1D1D` on `#FEF2F2` | about 9.16:1 | Pass | Use for danger text on soft danger surface; verify in implementation. |
| `#7F1D1D` on `#FEE2E2` | about 8.20:1 | Pass | Strong alternate soft danger pairing; verify in implementation. |
| `#0F172A` on `#F97316` | about 6.37:1 | Pass | Use dark text if warning accent carries text. |
| `#2563EB` against `#FFFFFF` | about 5.17:1 | Pass | Use for visible focus on white surfaces. |
| `#2563EB` against `#F9FAFB` | about 4.95:1 | Pass | Use for visible focus on page surfaces. |
| `#FBBF24` against `#0F172A` | about 10.69:1 | Pass | Use for focus on dark shell. |
| `#FBBF24` against `#1E293B` | about 8.76:1 | Pass | Use for focus on raised dark surfaces. |

## Resolved Accessibility Decisions

### A. Muted Text Decision

- Use `#4B5563` for normal secondary text.
- Restrict `#6B7280` to nonessential metadata at adequate size.
- Do not use muted text for instructions, errors, warnings, locked states, completion rules, or small essential labels.

### B. Light Blue Decision

- Do not use `#3B99D4` with white normal-size text.
- Use `#3B99D4` only as non-text accent, illustration accent, border, icon accent where contrast is not carrying meaning, or after separate testing.
- Use `#0E6F9F` or another approved darker action color for primary CTA backgrounds.

### C. Danger/Error Decision

- Do not use `#EF4444` with white normal-size text.
- Use `#B91C1C` for danger button/background when white text is needed.
- Prefer soft danger surface `#FEF2F2` with dark danger text `#7F1D1D` for error messages and warnings.
- Error meaning must include text and/or icon, not red alone.

### D. Focus Decision

- Use separate focus tokens for light and dark surfaces.
- Light surfaces: `#2563EB`.
- Dark/image surfaces: `#FBBF24`.
- Image-backed focus should include halo/support where needed.
- Focus style must be visible, elegant, and not disruptive.

### E. Overlay Decision

- Important text should preferably be outside images.
- If text must sit over image, use approved dark scrim tokens.
- No white text directly on pale or busy image areas.
- Image-backed text must be tested during vertical slice.
- High contrast mode must provide alternate non-image or stronger surface treatment.

### F. High Contrast Decision

- High contrast mode is not a late override.
- It must have its own token set and component states.
- High contrast mode may be simpler, but default mode must remain premium.

## Typography Tokens

Do not import new font files in this step. These values are implementation-ready specifications for review.

| Token name | Value | Notes |
| --- | --- | --- |
| `font.family.ui` | `Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Use for UI and learning body text if Inter is available. |
| `font.family.display` | `Outfit, Inter, system-ui, sans-serif` | Use only if Outfit is already available; otherwise fall back to `Inter, system-ui, sans-serif`. |
| `font.family.mono` | `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace` | Use only for technical or structured examples if needed. |
| `font.size.xs` | `0.75rem` | Avoid for essential instructions unless contrast/size are safe. |
| `font.size.sm` | `0.875rem` | Use for supporting UI text with safe color. |
| `font.size.base` | `1rem` | Default body text. |
| `font.size.lg` | `1.125rem` | Emphasized body or intro text. |
| `font.size.xl` | `1.25rem` | Small heading or prominent body. |
| `font.size.2xl` | `1.5rem` | Section heading. |
| `font.size.3xl` | `1.875rem` | Screen heading. |
| `font.size.4xl` | `2.25rem` | Module title or major screen title. |
| `font.size.5xl` | `3rem` | Cinematic title where responsive space allows. |
| `lineHeight.tight` | `1.15` | Large display headings only. |
| `lineHeight.heading` | `1.2` | Headings. |
| `lineHeight.body` | `1.6` | Learning body text. |
| `lineHeight.relaxed` | `1.75` | Long story, reflection, or reading-heavy text. |
| `font.weight.regular` | `400` | Body text. |
| `font.weight.medium` | `500` | UI emphasis. |
| `font.weight.semibold` | `600` | Section headings and controls. |
| `font.weight.bold` | `700` | Strong headings. |
| `font.weight.black` | `800` | Display titles only. |

Rules:

- Large titles may use expressive scale.
- Body text must remain readable.
- Small text must never carry essential instructions alone.
- Text enlargement must be tested in the vertical slice.

## Spacing Tokens

Use an 8px-based spacing system. These values are implementation-ready specifications for review.

| Token name | Value |
| --- | --- |
| `space.0` | `0` |
| `space.1` | `0.25rem` |
| `space.2` | `0.5rem` |
| `space.3` | `0.75rem` |
| `space.4` | `1rem` |
| `space.5` | `1.25rem` |
| `space.6` | `1.5rem` |
| `space.8` | `2rem` |
| `space.10` | `2.5rem` |
| `space.12` | `3rem` |
| `space.16` | `4rem` |
| `space.20` | `5rem` |

Rules:

- Use generous spacing for premium feel.
- Avoid dense screens unless template requires it.
- Touch targets must remain usable.
- Mobile stacking must preserve CTA visibility.

## Radius, Border, and Elevation Tokens

### Radius

| Token name | Value |
| --- | --- |
| `radius.sm` | `0.375rem` |
| `radius.md` | `0.5rem` |
| `radius.lg` | `0.75rem` |
| `radius.xl` | `1rem` |
| `radius.2xl` | `1.5rem` |
| `radius.full` | `9999px` |

### Border

| Token name | Value |
| --- | --- |
| `border.width.hairline` | `1px` |
| `border.width.strong` | `2px` |
| `border.color.default` | `#E5E7EB` |
| `border.color.soft` | `#DDE2E9` |
| `border.color.inverse` | `#334155` |

### Elevation

- `shadow.card`: subtle card depth;
- `shadow.panel`: slightly stronger panel depth;
- `shadow.modal`: modal depth;
- `shadow.focus`: focus support, not decoration.

Exact shadow values may be implemented in the first token file, but they must remain subtle and controlled.

## Motion Tokens

| Token name | Value |
| --- | --- |
| `motion.duration.fast` | `120ms` |
| `motion.duration.normal` | `180ms` |
| `motion.duration.slow` | `240ms` |
| `motion.easing.standard` | `ease-out` |
| `motion.reduce` | respect `prefers-reduced-motion` |

Rules:

- Motion is for feedback and orientation only.
- No decorative motion required for understanding.
- Micro-interactions must be disabled or simplified under reduced motion.

## Breakpoint and Layout Tokens

### Breakpoints

| Token name | Value |
| --- | --- |
| `breakpoint.sm` | `640px` |
| `breakpoint.md` | `768px` |
| `breakpoint.lg` | `1024px` |
| `breakpoint.xl` | `1280px` |
| `breakpoint.2xl` | `1536px` |

### Layout Tokens

| Token name | Value |
| --- | --- |
| `layout.content.maxWidth` | `72rem` |
| `layout.reading.maxWidth` | `46rem` |
| `layout.hero.maxWidth` | `80rem` |
| `layout.sidebar.width` | `18rem` |
| `layout.mobile.safePadding` | `1rem` |

Rules:

- Mobile-first stacking.
- No hidden CTA.
- No horizontal scroll unless approved.
- Image-heavy hero layouts must define mobile crop behavior.

## Theme Pack Boundaries

| Theme pack | Primary mood | Allowed variation | Not allowed | Accessibility boundary |
| --- | --- | --- | --- | --- |
| Rights and Accountability | Serious, grounded, accountable | Deep navy/institutional shell, teal/green accents, warm support accents, premium story images | Random module-level colors, untested gradients, local CSS | Must pass contrast for shell, cards, CTAs, feedback, focus, and image overlays |
| Project Practice | Practical, active, operational | Approved tool/practice accents, clear action panels, repair-lab markers | Dense uncontrolled tool UI or one-off practice styling | Touch targets, spacing, and mobile stacking must remain safe |
| Evidence and Learning | Analytical, calm, precise | Chart/data accents, evidence board surfaces, info states | Color-only data meaning or tiny chart labels | Data visuals need labels, text alternatives, and contrast-safe series |
| Community Voice | Warm, human-centered, respectful | Story accents, quote/case treatments, participation visuals | Charity-poster styling, sentimental visual shortcuts, stereotypes | Images and stories require dignity, safeguarding, and readability review |
| Organizational Strengthening | Stable, capable, structured | Governance/roles accents, structured cards, capacity-building panels | Generic corporate dashboard drift | Hierarchy, keyboard navigation, and spacing must stay clear |
| Safety and Trust | Careful, calm, protective | Soft warning/danger surfaces, safeguarding markers, calm visual support | Alarmist red/orange-only meaning or punitive visual tone | Risk states must use text/icons and accessible semantic treatment |
| Advocacy and Influence | Confident, constructive, energetic | Approved active accents and CTA emphasis | Aggressive visual language or uncontrolled bright gradients | CTA contrast, focus, and motion requirements must pass |

For the HRBA first pilot, select `Rights and Accountability` as the first pilot theme.

Use deep navy/institutional shell, teal/green accents, warm support accents, and premium story images.

Do not use random module-level colors or untested gradients.

Do not allow theme variation to change core typography, spacing, accessibility behavior, or component structure.

## Image Overlay Token Policy

- Text should not sit directly on images unless an approved scrim/surface is used.
- Prefer UI-rendered text panels beside images.
- For cinematic screens, use dark structural panel or approved overlay.
- Overlay strength must be tested against the actual image.
- Image overlay text must have text alternative and high contrast mode fallback.
- Story images must follow the Story Visual Integration Standard.

## Component State Token Requirements

Future implementation must define state token categories for:

- default;
- hover;
- active;
- focus;
- disabled;
- selected/current;
- completed;
- locked;
- error;
- success;
- warning;
- loading.

Rules:

- no state may rely on color alone;
- every state needs text, icon, shape, border, or label support;
- locked/completed/current states must be visible on light and dark surfaces.

## Implementation Order Recommendation

1. Create token files only after this document is reviewed.
2. Implement color/typography/spacing/radius/border/motion tokens.
3. Implement high contrast token layer.
4. Implement base component shell using tokens.
5. Implement focus and state behavior.
6. Implement one vertical slice.
7. Run QA gates before scaling.

## Open Items Before Coding

- confirm whether Inter/Outfit are already loaded or should use system fallback;
- confirm exact shadow values;
- confirm sidebar width token;
- confirm high contrast token behavior in components;
- confirm final overlay opacity through vertical slice testing;
- confirm whether Tailwind config, CSS variables, TypeScript tokens, or a combination will be used.

## Implementation Readiness Closure

This section closes the main implementation-readiness questions for first review. These decisions are documentation-only and must still be accepted before token files, theme files, CSS, components, or screens are created.

### Recommended Implementation Format

Use CSS variables plus a TypeScript token object as the first implementation format.

- CSS variables should be the runtime source for visual styling and high contrast overrides.
- A TypeScript token object should mirror the token names for typed references, documentation checks, and future tooling.
- Tailwind mapping should be added only if the project adopts Tailwind for implementation or if mapping tokens into utility classes prevents local CSS drift.
- Component code must consume named tokens, not raw hex, rgba, spacing, radius, or shadow values.

### Sidebar Width Token

Use `layout.sidebar.width: 18rem` as the first proposed desktop sidebar width.

Acceptance criteria:

- the sidebar must leave enough horizontal space for the learning stage at `breakpoint.lg` and above;
- navigation labels must not wrap awkwardly at common desktop widths;
- the sidebar must collapse, overlay, or stack on smaller viewports rather than force horizontal scrolling;
- text enlargement must not hide required navigation or progress controls;
- the value must be re-tested in the first vertical slice before scaling.

### Shadow Token Candidates

Use these shadow candidates for first implementation review:

| Token name | Candidate value | Use rule |
| --- | --- | --- |
| `shadow.card` | `0 10px 24px rgba(15, 23, 42, 0.08)` | Subtle card depth for ordinary learning blocks. |
| `shadow.panel` | `0 16px 40px rgba(15, 23, 42, 0.12)` | Stronger depth for prominent panels, story surfaces, and premium screen regions. |
| `shadow.modal` | `0 24px 70px rgba(15, 23, 42, 0.22)` | Modal and overlay depth only. |
| `shadow.focus` | `0 0 0 4px rgba(37, 99, 235, 0.22)` | Support halo for focus on light surfaces; dark/image surfaces may need amber halo variant. |

Rules:

- shadows must be tokenized and must not be added locally;
- shadows must support hierarchy, not decoration;
- high contrast mode may reduce or remove shadow reliance and replace depth with borders/surface contrast;
- shadow values must be checked on low-quality displays and mobile viewports.

### High Contrast Token Mapping

High contrast tokens should map to component states, not only page background and text.

Required state mapping:

- default surfaces use `color.highContrast.background` and `color.highContrast.surface`;
- primary text, secondary text, labels, and metadata use `color.highContrast.text` unless a tested high contrast secondary token is added later;
- links and text actions use `color.highContrast.link` plus underline or another non-color cue;
- focus states use `color.highContrast.focus`;
- selected/current states use visible border, label, or icon treatment in addition to color;
- completed states use text label plus icon or shape cue;
- locked/disabled states use clear text labels and sufficient contrast, not opacity alone;
- error, warning, success, and info states use text labels and icon/shape support, not color alone.

### Image Overlay Validation

Overlay opacity must be validated during the first vertical slice against the actual story images used.

Validation requirements:

- test `color.overlay.scrimDark` and `color.overlay.scrimSoft` against desktop, tablet, and mobile crops;
- confirm white/inverse text remains readable over the darkest and lightest relevant image regions;
- prefer UI-rendered dark panels beside images when overlay readability is uncertain;
- provide a high contrast fallback that removes image-backed text or places text on a solid surface;
- document any image that cannot safely support overlay text and assign it to a non-overlay template slot.

### Hard-Coded Color and Local CSS Drift Prevention

Token usage must prevent old HRBA hard-coded color drift from re-entering the clean system.

Rules:

- no random hex values in components;
- no local rgba shadow, overlay, or border values in components;
- no local CSS patch files for visual fixes;
- no old HRBA CSS values copied without mapping to approved tokens;
- any new value required during implementation must stop work and be added to the token specification or a reviewed follow-up document first;
- implementation review should search for hard-coded visual values before commit.

## First Implementation Acceptance Criteria

- [ ] All token values are centralized in the approved implementation format.
- [ ] No random hex values appear in components.
- [ ] No local CSS visual patches are introduced.
- [ ] CTA states are tested for default, hover, active, focus, disabled, and loading behavior.
- [ ] Muted text usage is tested and does not carry essential instructions.
- [ ] Danger/error states use approved dark danger text or approved danger background pairings.
- [ ] Focus states are visible on light, dark, image-backed, and high contrast surfaces.
- [ ] Locked, completed, selected/current, and disabled states have non-color cues.
- [ ] High contrast mode has equivalent states for every component state used in the vertical slice.
- [ ] Image-backed text uses approved overlay, approved structural surface, or an alternative non-image treatment.
- [ ] Mobile layout preserves CTA visibility and avoids horizontal scrolling.
- [ ] Token usage is verified before commit with a hard-coded visual value search.

## Do Not Implement Yet Unless

- [ ] This document has been reviewed and accepted as the first implementation source of truth.
- [ ] The CSS variables plus TypeScript token object format has been accepted.
- [ ] The `layout.sidebar.width: 18rem` proposal has been accepted or revised.
- [ ] The shadow token candidates have been accepted or revised.
- [ ] High contrast state mapping has been accepted for the first vertical slice.
- [ ] Overlay validation requirements have been accepted for story-image screens.
- [ ] The implementation team agrees to stop when a missing token or untested state appears.
- [ ] The first implementation task explicitly limits files and confirms no old HRBA CSS is copied.

## Stop Conditions

Work must stop before implementation if:

- contrast pair is unknown for a token state;
- token value would create a failed text/background pair;
- focus ring is not visible on a surface;
- high contrast equivalent is undefined;
- token requires a new unapproved theme behavior;
- token encourages local CSS override;
- token weakens premium visual experience;
- token conflicts with QA Gates or Premium Visual Experience Standard.

## Final Commitment

This token specification must allow the CSO Learning Hub to look premium, vibrant, and human-centered while remaining accessible, readable, responsive, and reusable. The first implementation should translate these tokens into code only after review, without copying old HRBA CSS or reintroducing screen-level design drift.
