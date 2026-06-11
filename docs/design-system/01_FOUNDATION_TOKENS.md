# CSO Learning Hub HRBA Course Design System

## 01 — Foundation Tokens

## 1. Purpose

This document defines the foundational visual design tokens for the CSO Learning Hub HRBA e-learning course.

These tokens are the source of truth for all learner-facing HRBA course screens, reusable course-player components, learning blocks, screen templates, and module-specific implementations.

Coding agents must use these tokens instead of inventing new colors, fonts, shadows, card styles, button styles, image treatments, or spacing patterns.

The goal is to create a premium, consistent, accessible, locally grounded e-learning experience for local and grassroots CSOs.

---

## 2. Design personality

The HRBA course interface should feel:

* premium but not corporate;
* warm but not decorative;
* practical but not plain;
* locally grounded but not stereotyped;
* structured but not rigid;
* interactive but not visually noisy;
* calm, spacious, and confidence-building.

The interface should not feel like:

* a generic LMS;
* a converted PowerPoint;
* a dense PDF/manual;
* an admin dashboard;
* a donor report;
* a random collection of AI-generated screens;
* a card-heavy template repeated without variation.

---

## 3. Core visual principles

### 3.1 One premium learning system

All modules must look like they belong to one coherent CSO Learning Hub HRBA course family.

Individual screens may use different layouts and interactions, but they must share the same:

* color system;
* typography;
* spacing rhythm;
* card treatment;
* button language;
* icon style;
* image treatment;
* interaction feedback style;
* accessibility behavior.

### 3.2 Focused learning canvas

Each learner-facing screen should work as a focused premium learning canvas.

On desktop, the learner should normally be able to see and complete the screen without vertical scrolling.

If content does not fit, do not shrink everything. Instead:

* split the content into another screen;
* convert content into an accordion, tabs, hotspot, process, or flashcard interaction;
* shorten text;
* move supporting detail to a resource drawer or optional reveal;
* reduce or remove decorative visuals;
* simplify the screen.

### 3.3 Visual hierarchy before decoration

Use visual design to guide attention.

Every screen should clearly show:

1. where the learner is;
2. what the screen is about;
3. what the learner should do;
4. what has been completed;
5. what comes next.

Avoid decoration that does not support learning.

---

## 4. Color tokens

### 4.1 Primary brand colors

| Token                  |       Hex | Use                                                                        |
| ---------------------- | --------: | -------------------------------------------------------------------------- |
| `--color-primary-blue` | `#3B99D4` | Primary actions, active states, module accents, links, progress highlights |
| `--color-accent-green` | `#91C852` | Completion, success, certificate, supportive highlights, positive feedback |
| `--color-deep-navy`    | `#0F172A` | Strong headings, hero overlays, footer, high-emphasis text, dark panels    |
| `--color-dark-ink`     | `#111827` | Main body text                                                             |
| `--color-muted-text`   | `#6B7280` | Secondary text, helper text, metadata                                      |
| `--color-soft-muted`   | `#9CA3AF` | Low-emphasis labels only                                                   |

### 4.2 Warm accent colors

| Token                |       Hex | Use                                                         |
| -------------------- | --------: | ----------------------------------------------------------- |
| `--color-warm-gold`  | `#D97706` | Certificate accents, selected highlights, warm emphasis     |
| `--color-terracotta` | `#E45745` | Human warmth, module illustration accents, limited emphasis |
| `--color-soft-peach` | `#F7D8C5` | Soft background accents, subtle decorative shapes           |
| `--color-sand`       | `#F3E7D3` | Warm neutral background accents                             |

Use warm accents sparingly. They should enrich the course, not dominate the interface.

### 4.3 Background and surface colors

| Token                   |       Hex | Use                                                   |
| ----------------------- | --------: | ----------------------------------------------------- |
| `--color-page-bg`       | `#F9FAFB` | Main page background                                  |
| `--color-soft-bg`       | `#F3F7FA` | Soft section background, metadata strips, calm panels |
| `--color-white`         | `#FFFFFF` | Cards, content surfaces, modals                       |
| `--color-light-blue-bg` | `#EEF7FC` | Light instructional panels, subtle blue sections      |
| `--color-warm-bg`       | `#FBF7F2` | Warm learning moments, reflection backgrounds         |

### 4.4 Border colors

| Token                 |       Hex | Use                             |
| --------------------- | --------: | ------------------------------- |
| `--color-border`      | `#E5E7EB` | Standard card and input borders |
| `--color-soft-border` | `#EEF2F7` | Subtle separation               |
| `--color-focus-ring`  | `#2563EB` | Keyboard focus outline          |
| `--color-divider`     | `#E7ECF2` | Dividers and section separators |

### 4.5 Feedback colors

| Token                |       Hex | Use                                       |
| -------------------- | --------: | ----------------------------------------- |
| `--color-success`    | `#16A34A` | Correct answer, completed state           |
| `--color-success-bg` | `#ECFDF3` | Success feedback panel                    |
| `--color-warning`    | `#F97316` | Caution, important learner attention      |
| `--color-warning-bg` | `#FFF7ED` | Warning/caution background                |
| `--color-error`      | `#EF4444` | Error, incorrect answer, validation issue |
| `--color-error-bg`   | `#FEF2F2` | Error feedback panel                      |
| `--color-info-bg`    | `#EFF6FF` | Informational feedback panel              |

### 4.6 Color usage rules

Do:

* use deep navy for strong structure and contrast;
* use DEC blue for primary action and active learning states;
* use soft green for completion and positive progress;
* use warm gold or terracotta as restrained accent colors;
* use light neutral backgrounds to keep screens calm and spacious.

Do not:

* introduce new brand colors without approval;
* use too many accent colors on one screen;
* use red except for errors or critical warnings;
* use purple for learner-facing HRBA course screens unless explicitly approved;
* use gradients randomly;
* use low-contrast text on colored backgrounds.

---

## 5. Typography tokens

### 5.1 Font families

| Token            | Stack                                                                                        | Use                                                    |
| ---------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------ |
| `--font-display` | `Georgia, "Times New Roman", serif`                                                          | Course titles, module titles, major editorial headings |
| `--font-sans`    | `Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif` | Body text, UI labels, navigation, buttons, cards       |
| `--font-mono`    | `"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace`                            | Code-like snippets only, rarely used                   |

### 5.2 Type scale

| Token         |   Size | Line height | Use                           |
| ------------- | -----: | ----------: | ----------------------------- |
| `--text-xs`   | `12px` |      `16px` | Metadata, small labels        |
| `--text-sm`   | `14px` |      `20px` | Helper text, sidebar labels   |
| `--text-base` | `16px` |      `24px` | Main body text                |
| `--text-lg`   | `18px` |      `28px` | Lead text, card emphasis      |
| `--text-xl`   | `20px` |      `30px` | Small section heading         |
| `--text-2xl`  | `24px` |      `32px` | Screen heading                |
| `--text-3xl`  | `30px` |      `38px` | Module section heading        |
| `--text-4xl`  | `36px` |      `44px` | Large screen title            |
| `--text-5xl`  | `48px` |      `56px` | Hero/module title             |
| `--text-6xl`  | `60px` |      `68px` | Major course cover title only |

### 5.3 Font weights

| Token              | Weight | Use                                     |
| ------------------ | -----: | --------------------------------------- |
| `--font-normal`    |  `400` | Body text                               |
| `--font-medium`    |  `500` | Labels, navigation, supporting emphasis |
| `--font-semibold`  |  `600` | Card headings, buttons                  |
| `--font-bold`      |  `700` | Strong headings                         |
| `--font-extrabold` |  `800` | Rare hero emphasis only                 |

### 5.4 Typography rules

Do:

* use short headings;
* keep body text readable at 15–17px minimum;
* use generous line height;
* use display serif for major course/module titles only;
* use sans-serif for all UI and learner instruction text;
* break dense text into cards, reveals, or interactions.

Do not:

* use all caps for long headings;
* use decorative fonts;
* use tiny metadata that becomes unreadable;
* overuse bold text;
* place long text over complex images;
* use multiple display fonts in the same course.

---

## 6. Spacing tokens

### 6.1 Base spacing scale

| Token        |  Value |
| ------------ | -----: |
| `--space-1`  |  `4px` |
| `--space-2`  |  `8px` |
| `--space-3`  | `12px` |
| `--space-4`  | `16px` |
| `--space-5`  | `20px` |
| `--space-6`  | `24px` |
| `--space-8`  | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |

### 6.2 Layout spacing

| Token                    |  Value | Use                              |
| ------------------------ | -----: | -------------------------------- |
| `--page-padding-desktop` | `32px` | Outer desktop page padding       |
| `--page-padding-tablet`  | `24px` | Tablet page padding              |
| `--page-padding-mobile`  | `16px` | Mobile page padding              |
| `--screen-gap`           | `32px` | Gap between major screen regions |
| `--card-gap`             | `16px` | Gap between cards                |
| `--content-gap`          | `24px` | Gap between content blocks       |
| `--section-gap`          | `48px` | Gap between major sections       |
| `--compact-gap`          | `12px` | Dense but readable UI spacing    |

### 6.3 Spacing rules

Do:

* use generous spacing for premium feel;
* maintain consistent spacing across screen templates;
* use tighter spacing only inside compact navigation or metadata areas;
* solve white-space problems through better layout balance, not random resizing.

Do not:

* create large empty white areas with no learning purpose;
* compress cards until text becomes cramped;
* use inconsistent padding across similar cards;
* make desktop layouts look like stretched mobile screens.

---

## 7. Radius tokens

| Token           |   Value | Use                            |
| --------------- | ------: | ------------------------------ |
| `--radius-sm`   |   `8px` | Small chips, labels            |
| `--radius-md`   |  `12px` | Buttons, small cards           |
| `--radius-lg`   |  `16px` | Standard cards                 |
| `--radius-xl`   |  `20px` | Learning block cards           |
| `--radius-2xl`  |  `24px` | Major panels                   |
| `--radius-3xl`  |  `32px` | Hero cards, cover image panels |
| `--radius-full` | `999px` | Pills, chips, avatars          |

### Radius rules

Use rounded corners consistently. Avoid mixing sharp, slightly rounded, and heavily rounded cards on the same screen unless there is a clear hierarchy.

---

## 8. Shadow tokens

| Token            | Value                                | Use                 |
| ---------------- | ------------------------------------ | ------------------- |
| `--shadow-xs`    | `0 1px 2px rgba(15, 23, 42, 0.05)`   | Subtle controls     |
| `--shadow-sm`    | `0 4px 12px rgba(15, 23, 42, 0.06)`  | Standard cards      |
| `--shadow-md`    | `0 10px 24px rgba(15, 23, 42, 0.08)` | Major panels        |
| `--shadow-lg`    | `0 20px 45px rgba(15, 23, 42, 0.12)` | Hero/feature panels |
| `--shadow-focus` | `0 0 0 3px rgba(37, 99, 235, 0.35)`  | Keyboard focus      |

### Shadow rules

Do:

* use soft shadows;
* pair shadows with subtle borders;
* reserve larger shadows for major foreground panels.

Do not:

* use harsh dashboard shadows;
* use multiple competing shadow depths in one screen;
* use shadows as decoration without hierarchy.

---

## 9. Button tokens

### 9.1 Button sizes

| Token         | Height | Padding  | Use                       |
| ------------- | -----: | -------- | ------------------------- |
| `--button-sm` | `36px` | `0 14px` | Secondary compact actions |
| `--button-md` | `44px` | `0 18px` | Standard actions          |
| `--button-lg` | `52px` | `0 24px` | Primary screen actions    |

### 9.2 Button styles

#### Primary button

Use for the main screen action.

* background: `--color-primary-blue`
* text: white
* radius: `--radius-full` or `--radius-md`
* weight: `--font-semibold`
* hover: slightly darker blue
* focus: visible focus ring

#### Secondary button

Use for secondary but useful actions.

* background: white
* text: `--color-deep-navy`
* border: `1px solid --color-border`
* hover: `--color-soft-bg`

#### Ghost button

Use for low-emphasis actions.

* background: transparent
* text: `--color-muted-text`
* hover: soft background

#### Success/completed button

Use for completed states.

* background: `--color-success-bg`
* text: `--color-success`
* icon: check mark where appropriate

### 9.3 Button rules

Do:

* use one clear primary action per screen;
* keep previous/next navigation consistent;
* make buttons large enough for touch interaction;
* preserve focus states.

Do not:

* place several competing primary buttons on one screen;
* use red buttons except for destructive actions;
* hide important actions below scrolling content;
* use button labels that are vague, such as “Click here.”

---

## 10. Card and panel tokens

### 10.1 Standard card

Use for most learning blocks.

```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 20px;
box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
padding: 24px;
```

### 10.2 Premium feature panel

Use for hero, scenario, portfolio, or major interaction screens.

```css
background: #FFFFFF;
border: 1px solid #EEF2F7;
border-radius: 28px;
box-shadow: 0 20px 45px rgba(15, 23, 42, 0.10);
padding: 32px;
```

### 10.3 Soft instructional panel

Use for reflection, support, and low-pressure learning.

```css
background: #F3F7FA;
border: 1px solid #E5E7EB;
border-radius: 24px;
padding: 24px;
```

### 10.4 Warning or safeguarding panel

Use for safety, confidentiality, and do-no-harm reminders.

```css
background: #FFF7ED;
border: 1px solid rgba(249, 115, 22, 0.30);
border-radius: 20px;
padding: 20px;
```

### 10.5 Card rules

Do:

* use cards to organize meaning, not decorate everything;
* keep card content concise;
* vary screen composition so the course does not become repetitive.

Do not:

* use the same three-card layout on every screen;
* overfill cards with long paragraphs;
* use cards inside cards without clear hierarchy;
* use random border colors.

---

## 11. Icon tokens and rules

### 11.1 Icon style

Icons should use:

* clean rounded line-and-soft-fill style;
* consistent stroke width;
* simple shapes;
* premium e-learning UI feel;
* no embedded readable text;
* no logos;
* no flags;
* no political symbols;
* no legal scales or courtroom imagery;
* no stereotypes.

### 11.2 Icon colors

Use:

* deep navy for structure;
* DEC blue for active/primary meaning;
* soft green for completion/support;
* warm gold or terracotta for limited emphasis.

### 11.3 Icon sizes

| Token       |  Value | Use                               |
| ----------- | -----: | --------------------------------- |
| `--icon-xs` | `16px` | Metadata                          |
| `--icon-sm` | `20px` | Buttons, labels                   |
| `--icon-md` | `24px` | Cards, navigation                 |
| `--icon-lg` | `32px` | Feature cards                     |
| `--icon-xl` | `48px` | Learning journey / major concepts |

---

## 12. Image and visual asset rules

### 12.1 Overall image style

Images should feel:

* human-centered;
* Ethiopian or East African in context;
* warm and respectful;
* practical and grounded;
* premium editorial or cinematic;
* relevant to CSO learning, community engagement, project work, dialogue, participation, accountability, or reflection.

### 12.2 Image use by screen type

| Screen type       | Image use                                                 |
| ----------------- | --------------------------------------------------------- |
| Course cover      | Large cinematic image with clean negative space           |
| Module cover      | Distinct module-specific visual metaphor                  |
| Scenario screen   | Contextual scene or illustration supporting the dilemma   |
| Concept screen    | Supporting image or visual metaphor, not decoration       |
| Hotspot screen    | Purpose-built diagram or scene with clear clickable areas |
| Reflection screen | Minimal visual, calm and spacious                         |
| Knowledge check   | Use image only if it supports the scenario                |
| Completion screen | Premium celebratory but restrained visual                 |

### 12.3 Image rules

Do:

* use images with clear composition and enough breathing room;
* apply dark navy overlay when placing white text over images;
* use consistent corner radius and cropping;
* provide alt text for every meaningful image;
* mark decorative images as decorative in code.

Do not:

* use generic corporate stock photos;
* use images with readable text, logos, or sensitive personal information;
* use crowded images behind long text;
* use stereotyped or poverty-framed imagery;
* use unrelated decorative AI images;
* stretch or distort images.

---

## 13. Layout tokens

### 13.1 Maximum widths

| Token                 |    Value | Use                                |
| --------------------- | -------: | ---------------------------------- |
| `--max-width-page`    | `1240px` | Public pages and wide layouts      |
| `--max-width-course`  | `1120px` | Course player main canvas          |
| `--max-width-reading` |  `760px` | Text-heavy reading areas           |
| `--max-width-narrow`  |  `640px` | Focused reflection or quiz content |

### 13.2 Course player dimensions

| Token                 |                 Value | Use                                                |
| --------------------- | --------------------: | -------------------------------------------------- |
| `--sidebar-width`     |               `280px` | Desktop course navigation                          |
| `--topbar-height`     |                `64px` | Course player top bar                              |
| `--bottom-nav-height` |                `72px` | Previous/next navigation                           |
| `--canvas-min-height` | `calc(100vh - 136px)` | Main course area between top and bottom navigation |

### 13.3 Responsive breakpoints

| Token             |    Value |
| ----------------- | -------: |
| `--breakpoint-sm` |  `640px` |
| `--breakpoint-md` |  `768px` |
| `--breakpoint-lg` | `1024px` |
| `--breakpoint-xl` | `1280px` |

### 13.4 Layout rules

Desktop:

* use structured two-column or balanced split layouts where useful;
* avoid long vertical scrolling;
* keep navigation stable;
* balance visual and text areas.

Tablet:

* allow columns to stack where necessary;
* preserve interaction clarity;
* keep buttons large and visible.

Mobile:

* use single-column layout;
* collapse sidebar into drawer;
* keep progress visible;
* convert drag/drop to tap-first alternatives;
* avoid tiny hotspot targets.

---

## 14. Motion and transition tokens

### 14.1 Motion durations

| Token           |   Value | Use                      |
| --------------- | ------: | ------------------------ |
| `--motion-fast` | `120ms` | Button hover, focus      |
| `--motion-base` | `180ms` | Accordions, tab switches |
| `--motion-slow` | `260ms` | Modal/drawer entry       |

### 14.2 Motion easing

| Token               | Value                        |
| ------------------- | ---------------------------- |
| `--ease-standard`   | `cubic-bezier(0.2, 0, 0, 1)` |
| `--ease-emphasized` | `cubic-bezier(0.2, 0, 0, 1)` |

### 14.3 Motion rules

Do:

* use subtle motion to clarify interaction;
* support reduced motion preferences;
* keep transitions fast and calm.

Do not:

* use distracting animations;
* animate large text blocks unnecessarily;
* depend on motion to communicate essential information;
* use parallax or complex effects in learning screens.

---

## 15. Accessibility foundation

All tokens and components must support:

* visible keyboard focus;
* sufficient color contrast;
* semantic HTML structure;
* readable font sizes;
* clear heading order;
* alt text for meaningful images;
* captions/transcripts for video and audio;
* keyboard-accessible interactions;
* screen-reader labels for buttons and interactive controls;
* reduced-motion behavior;
* mobile tap targets of at least 44px where possible.

Color alone must never be the only way to show:

* correct/incorrect answer;
* completion;
* warning;
* active state;
* selected state.

Use icons, labels, text, and state changes together.

---

## 16. HRBA safety foundation

Because this course deals with rights, power, accountability, exclusion, participation, and civic space, the design system must support safe learning.

### 16.1 Safe reflection rule

Reflection prompts should not ask learners to disclose:

* real complaint details;
* names of people or organizations;
* active disputes;
* safeguarding incidents;
* sensitive legal issues;
* political affiliations;
* confidential project information;
* identifiable community stories.

Use safer wording such as:

* “Think of a general pattern you have seen.”
* “Use a fictional or anonymized example.”
* “Do not include names or identifying details.”
* “Focus on what a CSO could do safely and responsibly.”

### 16.2 Safe visual rule

Do not use visuals that expose real people in sensitive situations or imply victimhood, surveillance, political accusation, or legal confrontation.

### 16.3 Safe feedback rule

Feedback should be constructive and practical. Avoid shaming the learner. Use language that helps them improve judgment.

---

## 17. Implementation tokens: CSS starter

Coding agents may translate the foundation into CSS variables using this starter structure:

```css
:root {
  --color-primary-blue: #3B99D4;
  --color-accent-green: #91C852;
  --color-deep-navy: #0F172A;
  --color-dark-ink: #111827;
  --color-muted-text: #6B7280;
  --color-soft-muted: #9CA3AF;

  --color-warm-gold: #D97706;
  --color-terracotta: #E45745;
  --color-soft-peach: #F7D8C5;
  --color-sand: #F3E7D3;

  --color-page-bg: #F9FAFB;
  --color-soft-bg: #F3F7FA;
  --color-white: #FFFFFF;
  --color-light-blue-bg: #EEF7FC;
  --color-warm-bg: #FBF7F2;

  --color-border: #E5E7EB;
  --color-soft-border: #EEF2F7;
  --color-focus-ring: #2563EB;
  --color-divider: #E7ECF2;

  --color-success: #16A34A;
  --color-success-bg: #ECFDF3;
  --color-warning: #F97316;
  --color-warning-bg: #FFF7ED;
  --color-error: #EF4444;
  --color-error-bg: #FEF2F2;
  --color-info-bg: #EFF6FF;

  --font-display: Georgia, "Times New Roman", serif;
  --font-sans: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --font-mono: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;

  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-lg: 18px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 30px;
  --text-4xl: 36px;
  --text-5xl: 48px;
  --text-6xl: 60px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;

  --page-padding-desktop: 32px;
  --page-padding-tablet: 24px;
  --page-padding-mobile: 16px;
  --screen-gap: 32px;
  --card-gap: 16px;
  --content-gap: 24px;
  --section-gap: 48px;
  --compact-gap: 12px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --radius-3xl: 32px;
  --radius-full: 999px;

  --shadow-xs: 0 1px 2px rgba(15, 23, 42, 0.05);
  --shadow-sm: 0 4px 12px rgba(15, 23, 42, 0.06);
  --shadow-md: 0 10px 24px rgba(15, 23, 42, 0.08);
  --shadow-lg: 0 20px 45px rgba(15, 23, 42, 0.12);
  --shadow-focus: 0 0 0 3px rgba(37, 99, 235, 0.35);

  --button-sm: 36px;
  --button-md: 44px;
  --button-lg: 52px;

  --max-width-page: 1240px;
  --max-width-course: 1120px;
  --max-width-reading: 760px;
  --max-width-narrow: 640px;

  --sidebar-width: 280px;
  --topbar-height: 64px;
  --bottom-nav-height: 72px;
  --canvas-min-height: calc(100vh - 136px);

  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;

  --motion-fast: 120ms;
  --motion-base: 180ms;
  --motion-slow: 260ms;
  --ease-standard: cubic-bezier(0.2, 0, 0, 1);
  --ease-emphasized: cubic-bezier(0.2, 0, 0, 1);
}
```

---

## 18. Non-negotiable rules for coding agents

Coding agents must not:

1. introduce unapproved colors;
2. introduce new font families;
3. create new card treatments without approval;
4. create new button styles without approval;
5. use arbitrary spacing values where tokens exist;
6. use random shadows or gradients;
7. stretch images;
8. remove visible focus states;
9. use color alone to show meaning;
10. create dense scroll-heavy screens when content can be staged interactively.

Coding agents must:

1. use the approved tokens;
2. preserve the premium learning canvas;
3. follow accessibility rules;
4. preserve HRBA safety rules;
5. keep the course visually consistent;
6. report any token gaps instead of inventing new styles.

---

## 19. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course
Primary use: Learner-facing course player, learning blocks, module screens, public course pages where relevant
Next file: 02_COURSE_PLAYER_SYSTEM.md