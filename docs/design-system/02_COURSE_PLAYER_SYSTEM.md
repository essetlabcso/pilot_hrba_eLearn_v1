# CSO Learning Hub HRBA Course Design System

## 02 — Course Player System

## 1. Purpose

This document defines the learner-facing course player system for the CSO Learning Hub HRBA e-learning course.

The course player is the structured environment where learners move through modules, screens, interactions, reflections, knowledge checks, portfolio activities, and completion moments.

This file is the source of truth for the course player shell. Coding agents must use this system instead of inventing new navigation layouts, progress bars, screen wrappers, bottom navigation patterns, or course-player behaviors.

This file builds on:

```text
docs/design-system/01_FOUNDATION_TOKENS.md
```

---

## 2. Product definition

The HRBA course player is not:

* a generic LMS page;
* a document reader;
* a long scrolling article;
* a slide deck viewer;
* an admin dashboard;
* a freeform webpage;
* a random collection of custom-coded screens.

The HRBA course player is:

**A premium, structured, interactive learning environment where local CSO learners move through focused HRBA learning screens, practice decisions, reflect safely, complete checks, and build practical outputs.**

---

## 3. Core experience principles

### 3.1 One focused screen at a time

The course player should present one primary learner-facing screen at a time.

Each screen should have:

1. a clear title or learning focus;
2. a visible learner action;
3. a defined completion behavior;
4. a clear next step.

The learner should never feel lost inside a long content page.

### 3.2 Desktop no-scroll standard

On desktop, each screen should normally fit within the visible course canvas.

Vertical scrolling should be avoided for standard learning screens.

If content does not fit, the screen should be redesigned by:

* shortening the text;
* splitting the content into multiple screens;
* using accordions, tabs, hotspots, cards, or reveal interactions;
* moving secondary details into the right drawer, resource panel, or optional reveal;
* reducing unnecessary visuals;
* resizing or simplifying the visual composition.

Scrolling may be allowed only for:

* long resource pages;
* downloadable tool instructions;
* policy/reference reading screens;
* final review summaries;
* accessibility alternatives;
* screens explicitly marked as scroll-permitted.

### 3.3 Guided learning flow

The course player must support a clear flow:

```text
Course homepage
→ Module overview
→ Focused learning screens
→ Practice interactions
→ Knowledge checks
→ Reflection / portfolio activity
→ Module completion
→ Final assessment
→ Certificate / next steps
```

### 3.4 Practical HRBA learning

The player should support HRBA learning through:

* noticing exclusion;
* identifying rights-holders;
* identifying duty-bearers;
* recognizing power and barriers;
* making safe participation decisions;
* choosing accountable responses;
* reflecting without exposing sensitive details;
* building practical CSO tools and action commitments.

---

## 4. Course player architecture

The course player uses a four-zone architecture.

```text
┌─────────────────────────────────────────────────────────────┐
│ Top App Bar                                                 │
├───────────────┬─────────────────────────────────────────────┤
│ Left Sidebar  │ Main Learning Canvas                        │
│ Navigation    │                                             │
│               │ Focused screen content                      │
│               │ Interaction / reflection / quiz / portfolio │
│               │                                             │
├───────────────┴─────────────────────────────────────────────┤
│ Bottom Navigation                                           │
└─────────────────────────────────────────────────────────────┘
```

Optional right-side drawer may be added for glossary, resources, notes, or portfolio tracker where needed.

```text
┌─────────────────────────────────────────────────────────────┐
│ Top App Bar                                                 │
├───────────────┬──────────────────────────────┬──────────────┤
│ Left Sidebar  │ Main Learning Canvas         │ Right Drawer │
│ Navigation    │                              │ Optional     │
├───────────────┴──────────────────────────────┴──────────────┤
│ Bottom Navigation                                           │
└─────────────────────────────────────────────────────────────┘
```

---

## 5. Main layout zones

## 5.1 Top App Bar

### Purpose

The top app bar provides course identity, orientation, support access, and learner-level utilities.

### Required elements

| Element               | Requirement                                                 |
| --------------------- | ----------------------------------------------------------- |
| Platform identity     | CSO Learning Hub / DEC identity                             |
| Course title shortcut | Short course name or abbreviation                           |
| Module label          | Current module number/title where space allows              |
| Language selector     | English initially; future-ready for Amharic/local languages |
| Support/help          | Link or button to help/support                              |
| Learner/profile area  | User status, initials, or account menu where implemented    |

### Visual treatment

Use:

* height: `--topbar-height`;
* background: white or very light surface;
* subtle bottom border: `--color-border`;
* text: `--color-dark-ink`;
* active accents: `--color-primary-blue`;
* compact spacing;
* no heavy shadows.

### Top app bar rules

Do:

* keep the top bar stable across all course screens;
* keep labels short;
* preserve accessible focus states;
* use the same utility positions across modules.

Do not:

* redesign the top bar per module;
* place major learning content inside the top bar;
* add decorative gradients;
* overcrowd with internal admin links;
* show Build Studio, Review, Monitoring, or Creator links to learners.

---

## 5.2 Left Sidebar Navigation

### Purpose

The left sidebar helps learners understand where they are, what they have completed, and what remains.

### Required elements

| Element                  | Requirement                                   |
| ------------------------ | --------------------------------------------- |
| Course progress summary  | Overall percentage or completed screens count |
| Module list              | Modules in the course                         |
| Current module expanded  | Shows current screens/lessons                 |
| Screen list              | Screen titles or short labels                 |
| Current screen indicator | Clear active state                            |
| Completion state         | Complete, current, locked, not started        |
| Module completion state  | Completed module marker                       |

### Recommended sidebar width

```text
--sidebar-width: 280px
```

### Sidebar states

| State       | Visual treatment                                                |
| ----------- | --------------------------------------------------------------- |
| Not started | Neutral text, empty circle or subtle marker                     |
| Current     | Blue accent, bold/semibold label, active background             |
| Completed   | Green check or success marker                                   |
| Locked      | Muted text, lock icon, inaccessible until prerequisite complete |
| Optional    | Small “optional” chip or lighter treatment                      |

### Sidebar behavior

Desktop:

* sidebar remains visible;
* current module is expanded;
* other modules may collapse;
* screen list should remain compact;
* progress should remain visible.

Tablet:

* sidebar may collapse into a drawer or narrow rail.

Mobile:

* sidebar must collapse into a menu/drawer;
* learner should access it through a clear “Course menu” button.

### Sidebar rules

Do:

* use short screen titles;
* show progress clearly;
* preserve completion states;
* make active screen unmistakable;
* ensure all navigation is keyboard accessible.

Do not:

* use long paragraph titles;
* show internal route names;
* show developer/admin states;
* allow sidebar to visually dominate the learning canvas;
* create different sidebar styles per module.

---

## 5.3 Main Learning Canvas

### Purpose

The main learning canvas is the core learner-facing area where each focused screen appears.

### Required behavior

The main canvas must:

* display one primary screen at a time;
* use approved screen templates;
* respect foundation tokens;
* support interactions;
* support completion rules;
* support accessibility requirements;
* preserve a premium, spacious layout.

### Canvas dimensions

Use:

```text
--max-width-course: 1120px
--canvas-min-height: calc(100vh - 136px)
```

The canvas should sit between the top app bar and bottom navigation.

### Standard canvas structure

Each screen should follow this general structure:

```text
Screen wrapper
→ Screen eyebrow / module marker
→ Screen title
→ Short instruction or setup
→ Main learning area
→ Interaction / visual / cards / scenario / reflection / quiz
→ Feedback or completion state
```

Not every screen needs all elements, but every screen needs clear orientation and learner action.

### Standard canvas layout types

| Layout type       | Use when                                                      |
| ----------------- | ------------------------------------------------------------- |
| Centered focus    | One short concept, reflection, or knowledge check             |
| Two-column split  | Concept + visual, scenario + choices, explanation + practice  |
| Diagonal split    | Premium presentation-like screen with strong visual hierarchy |
| Card grid         | Small set of comparable ideas; use sparingly                  |
| Hotspot canvas    | Visual exploration or HRBA lens activity                      |
| Scenario panel    | Case setup, decision choices, feedback                        |
| Process layout    | Step-by-step HRBA method                                      |
| Portfolio layout  | Guided learner output or action commitment                    |
| Completion layout | Module wrap-up, progress, next step                           |

### Main canvas rules

Do:

* use approved screen templates;
* keep one clear learning focus per screen;
* maintain strong visual hierarchy;
* balance text and visual space;
* convert dense content into interaction;
* preserve no-scroll desktop standard.

Do not:

* create full-page text dumps;
* use repeated static card grids across many screens;
* introduce custom layouts without approval;
* stretch the canvas to fill space randomly;
* allow large visuals to create layout imbalance;
* hide required interaction below the fold.

---

## 5.4 Optional Right Drawer

### Purpose

The right drawer provides secondary support without overcrowding the main screen.

It may be used for:

* glossary;
* resources;
* notes;
* portfolio tracker;
* downloadable tools;
* help/support;
* transcript;
* accessibility alternative;
* “why this matters” optional detail.

### Drawer behavior

Desktop:

* drawer may open from the right;
* drawer should not permanently reduce canvas width unless designed for that screen;
* drawer content should be secondary.

Tablet/mobile:

* drawer opens as full-screen or bottom sheet;
* must be dismissible;
* must trap focus when open;
* must return focus to trigger when closed.

### Drawer rules

Do:

* use the drawer for supporting content;
* keep drawer content concise;
* provide clear close button;
* ensure keyboard accessibility.

Do not:

* place required screen completion content only in the drawer;
* use the drawer as a dumping ground for long unstructured text;
* hide essential instructions inside the drawer.

---

## 5.5 Bottom Navigation

### Purpose

The bottom navigation controls learner movement between screens and reinforces completion.

### Required elements

| Element              | Requirement                                              |
| -------------------- | -------------------------------------------------------- |
| Previous button      | Moves to previous screen                                 |
| Next/Continue button | Moves forward                                            |
| Completion state     | Indicates when current screen is complete where relevant |
| Screen position      | Optional: “Screen 4 of 19”                               |
| Save status          | Optional for reflection/portfolio screens                |

### Bottom nav visual treatment

Use:

* height: `--bottom-nav-height`;
* white or very light background;
* top border: `--color-border`;
* primary next button;
* secondary previous button;
* stable placement.

### Button behavior

| Screen state                    | Next button behavior                                     |
| ------------------------------- | -------------------------------------------------------- |
| Passive/info screen             | Continue enabled                                         |
| Required interaction incomplete | Continue disabled or shows completion requirement        |
| Required interaction complete   | Continue enabled                                         |
| Optional reflection empty       | Continue enabled with safe skip option where appropriate |
| Knowledge check unanswered      | Submit/check button appears before Continue              |
| Knowledge check completed       | Continue enabled after feedback                          |
| Portfolio screen unsaved        | Save/continue behavior clearly shown                     |

### Bottom nav rules

Do:

* keep previous/next placement consistent;
* use clear labels such as “Continue,” “Next,” “Back,” “Try again,” “Check answer”;
* provide clear disabled-state explanation;
* ensure keyboard access.

Do not:

* change navigation style from screen to screen;
* hide the next button inside the main content;
* use vague labels like “Click here”;
* allow learners to miss required actions without explanation.

---

## 6. Course progress system

### 6.1 Progress levels

Progress should be tracked at four levels:

| Level                  | Example                                                            |
| ---------------------- | ------------------------------------------------------------------ |
| Course progress        | 35% complete                                                       |
| Module progress        | Module 2: 8 of 25 screens complete                                 |
| Screen completion      | Current screen completed                                           |
| Interaction completion | All required hotspots viewed / answer submitted / reflection saved |

### 6.2 Completion states

| State            | Meaning                                                      |
| ---------------- | ------------------------------------------------------------ |
| Not started      | Learner has not opened the screen                            |
| In progress      | Learner opened but has not completed required action         |
| Completed        | Learner completed required action or viewed required content |
| Optional skipped | Learner intentionally skipped optional activity              |
| Locked           | Learner cannot access yet                                    |
| Needs retry      | Learner needs to retry an assessment or activity             |

### 6.3 Completion rules by screen type

| Screen type       | Completion rule                           |
| ----------------- | ----------------------------------------- |
| Cover / intro     | Viewed or Continue clicked                |
| Concept screen    | Continue clicked after minimum view       |
| Accordion         | Required panels opened where specified    |
| Tabs              | Required tabs viewed where specified      |
| Hotspot           | Required hotspots viewed                  |
| Scenario decision | Choice selected and feedback viewed       |
| Sorting activity  | Submitted and feedback viewed             |
| Knowledge check   | Answer submitted and feedback viewed      |
| Reflection        | Response saved or optional skip selected  |
| Portfolio         | Required fields completed or draft saved  |
| Completion screen | Continue to next module or finish clicked |

### 6.4 Progress rules

Do:

* show progress clearly but not aggressively;
* support learning without making the course feel punitive;
* allow optional reflection skipping only when safe and instructionally acceptable;
* distinguish completion from correctness where needed.

Do not:

* mark an interaction complete before learner sees feedback;
* require sensitive personal disclosure for completion;
* lock learners unnecessarily;
* use progress tracking that feels like surveillance.

---

## 7. Screen state and learner data

### 7.1 State types

The player may store:

| Data type         | Examples                                              |
| ----------------- | ----------------------------------------------------- |
| Navigation state  | Current module and screen                             |
| Completion state  | Completed screens and modules                         |
| Interaction state | Selected choice, opened panels, viewed hotspots       |
| Assessment state  | Answers, attempts, feedback viewed                    |
| Reflection state  | Learner notes, action commitments                     |
| Portfolio state   | Draft worksheets, saved outputs                       |
| Preference state  | Language, reduced motion, text size where implemented |

### 7.2 HRBA data safety rule

The course must not require learners to enter sensitive real-world details.

Reflection and portfolio data should use safe prompts and encourage fictionalized, generalized, or anonymized examples.

### 7.3 State rules

Do:

* save meaningful progress;
* show save status where learners write text;
* allow learners to edit reflection/portfolio responses where appropriate;
* protect learner privacy.

Do not:

* store sensitive identifiable community stories;
* ask for names of people, organizations, complaints, or active disputes;
* make certificate completion dependent on unsafe disclosure.

---

## 8. Standard screen anatomy

A standard HRBA learning screen should use the following anatomy.

```text
ScreenShell
├─ ScreenHeader
│  ├─ Eyebrow / module marker
│  ├─ Title
│  └─ Short instruction
├─ ScreenBody
│  ├─ Main visual / interaction / content
│  └─ Supporting explanation or feedback
└─ ScreenFooterState
   ├─ Completion status
   └─ Optional save/feedback message
```

### Required header elements

| Element     | Requirement                              |
| ----------- | ---------------------------------------- |
| Eyebrow     | Optional but recommended for orientation |
| Title       | Required                                 |
| Instruction | Required when learner action is expected |

### Screen title rules

Do:

* use short, action-oriented titles;
* keep titles learner-facing;
* avoid academic or legalistic headings where possible.

Do not:

* use long workbook-style titles;
* use internal IDs as visible titles;
* repeat the same title pattern across many screens.

---

## 9. Standard learner instruction patterns

Use clear instruction text.

Examples:

```text
Explore each card to see what may be hidden in the situation.
```

```text
Choose the response that best reflects an HRBA lens.
```

```text
Sort each example into the category where it best fits.
```

```text
Write one small, safe action your CSO could take. Do not include names or sensitive details.
```

```text
Review the feedback, then continue.
```

Avoid:

```text
Click here.
```

```text
Read the below information.
```

```text
Provide a real example from your organization.
```

```text
Explain confidential community concerns.
```

---

## 10. Learner feedback system

### 10.1 Feedback types

| Type                | Use                                                       |
| ------------------- | --------------------------------------------------------- |
| Correct             | Learner selected a strong answer                          |
| Partly correct      | Learner noticed something but missed a key HRBA dimension |
| Try again           | Learner needs another attempt                             |
| Reflection feedback | Encouraging, non-judgmental reinforcement                 |
| Safety feedback     | Reminds learner not to disclose sensitive information     |
| Completion feedback | Confirms progress and next step                           |

### 10.2 Feedback visual treatment

Use:

* success background for correct/completed;
* warning background for caution;
* info background for explanatory feedback;
* error background only for clear incorrect/error states;
* icons plus text, never color alone.

### 10.3 Feedback rules

Do:

* explain why an answer is strong or weak;
* connect feedback to HRBA practice;
* keep tone supportive;
* give practical next step.

Do not:

* shame learners;
* use legalistic or accusatory wording;
* show only “Correct” or “Incorrect” without explanation;
* rely only on color.

---

## 11. Course player responsive behavior

## 11.1 Desktop

Desktop layout should use:

```text
Top app bar
Left sidebar
Main canvas
Bottom nav
Optional right drawer
```

Desktop rules:

* left sidebar visible;
* main canvas centered and spacious;
* bottom nav fixed or sticky at bottom of player area;
* no-scroll standard applies;
* interactions should be fully visible where possible.

## 11.2 Tablet

Tablet layout may use:

```text
Top app bar
Collapsible sidebar or compact rail
Main canvas
Bottom nav
Optional drawer
```

Tablet rules:

* preserve readability;
* stack columns when needed;
* maintain tap-friendly controls;
* avoid cramped two-column layouts.

## 11.3 Mobile

Mobile layout should use:

```text
Top app bar
Course menu button
Progress indicator
Single-column main canvas
Bottom nav
Drawer/bottom sheet for menu/resources
```

Mobile rules:

* sidebar collapses;
* main content becomes single-column;
* buttons become full-width where useful;
* drag/drop must have tap-based alternatives;
* hotspots must have accessible list alternatives;
* text remains readable;
* progress remains visible but compact.

---

## 12. Accessibility behavior

The course player must support:

* semantic landmarks;
* keyboard navigation;
* visible focus states;
* skip-to-content where feasible;
* logical tab order;
* screen-reader labels for navigation controls;
* aria-current for current screen where appropriate;
* alt text for meaningful images;
* captions/transcripts for media;
* reduced motion;
* no color-only meaning;
* clear disabled button explanations;
* minimum 44px tap targets where possible.

### Required focus behavior

When a learner moves to a new screen:

* focus should move to the screen title or main content heading;
* screen readers should receive meaningful page/screen change context;
* focus must not jump unpredictably.

When a drawer or modal opens:

* focus moves into the drawer/modal;
* keyboard focus is trapped inside while open;
* Escape closes the drawer/modal where appropriate;
* focus returns to the trigger after closing.

---

## 13. HRBA safety behavior inside the player

Because HRBA topics can involve rights, power, exclusion, complaints, accountability, and civic space, the course player must include safe learning behavior.

### Safety note placement

Use safety reminders in:

| Screen type                | Safety reminder needed?       |
| -------------------------- | ----------------------------- |
| Reflection                 | Yes, when asking for examples |
| Portfolio                  | Yes                           |
| Scenario                   | Sometimes                     |
| Accountability/complaints  | Yes                           |
| Civic space/power analysis | Yes                           |
| General concept screen     | Usually no                    |

### Standard safety note text

Use this pattern:

```text
Use a fictional, general, or anonymized example. Do not include names, complaint details, active disputes, or sensitive information.
```

### Safety rules

Do:

* make safety reminders visible before text entry;
* allow fictional/anonymized examples;
* avoid storing sensitive real-world details;
* frame accountability as safe, responsible practice.

Do not:

* ask learners to name people, organizations, officials, complaints, or conflict situations;
* ask for politically sensitive details;
* ask learners to upload confidential documents;
* suggest that CSOs should replace duty-bearers.

---

## 14. Required course player components

The course player implementation should use the following reusable components.

```text
src/components/course-player/CourseShell.tsx
src/components/course-player/CourseTopBar.tsx
src/components/course-player/CourseSidebar.tsx
src/components/course-player/CourseBottomNav.tsx
src/components/course-player/CourseProgress.tsx
src/components/course-player/CourseMenuDrawer.tsx
src/components/course-player/ResourceDrawer.tsx
src/components/course-player/ScreenShell.tsx
src/components/course-player/ScreenHeader.tsx
src/components/course-player/CompletionState.tsx
```

### Component responsibilities

| Component          | Responsibility                                 |
| ------------------ | ---------------------------------------------- |
| `CourseShell`      | Overall player layout and responsive structure |
| `CourseTopBar`     | Top app bar identity and utilities             |
| `CourseSidebar`    | Desktop navigation and progress                |
| `CourseBottomNav`  | Previous/next and completion navigation        |
| `CourseProgress`   | Course/module/screen progress display          |
| `CourseMenuDrawer` | Mobile course navigation                       |
| `ResourceDrawer`   | Optional glossary/resources/notes              |
| `ScreenShell`      | Standard wrapper for each screen               |
| `ScreenHeader`     | Eyebrow, title, instruction                    |
| `CompletionState`  | Screen completion message/status               |

---

## 15. Course player data model

The course player should expect a structured course object.

Example structure:

```ts
type Course = {
  id: string;
  title: string;
  shortTitle: string;
  modules: CourseModule[];
};

type CourseModule = {
  id: string;
  title: string;
  shortTitle: string;
  description?: string;
  screens: CourseScreen[];
};

type CourseScreen = {
  id: string;
  title: string;
  shortTitle?: string;
  template: string;
  type:
    | "cover"
    | "concept"
    | "scenario"
    | "interaction"
    | "knowledge-check"
    | "reflection"
    | "portfolio"
    | "summary"
    | "completion";
  estimatedMinutes?: number;
  required: boolean;
  scrollPermitted?: boolean;
  completionRule: string;
};
```

### Data model rules

Do:

* use stable screen IDs;
* keep learner-facing titles separate from internal IDs;
* define template type explicitly;
* define completion rule explicitly.

Do not:

* hard-code navigation based on screen order only;
* use visible internal route names;
* leave completion rules ambiguous.

---

## 16. Locked learner-facing navigation labels

Use these standard labels unless a screen specification requires otherwise.

| Action                   | Label             |
| ------------------------ | ----------------- |
| Go forward               | Continue          |
| Go to next screen        | Next              |
| Go back                  | Back              |
| Submit answer            | Check answer      |
| Retry activity           | Try again         |
| Save reflection          | Save reflection   |
| Skip optional reflection | Skip for now      |
| Open course navigation   | Course menu       |
| Open resources           | Resources         |
| Open glossary            | Glossary          |
| Open portfolio           | My portfolio      |
| Finish module            | Finish module     |
| Start next module        | Start next module |
| Complete course          | Finish course     |

Do not use:

* “Click here”;
* “Proceed” unless required;
* “Submit” for non-assessment reflection;
* “Done” without context;
* internal labels such as “route,” “screenId,” or “component.”

---

## 17. Visual composition rules for course screens

### 17.1 Approved visual compositions

| Composition       | Description                                                 |
| ----------------- | ----------------------------------------------------------- |
| Hero split        | Large title and visual for module start                     |
| Diagonal split    | Premium presentation-like layout with strong visual balance |
| Scenario card     | Case context with decision area                             |
| Interaction stage | Centered activity area with feedback                        |
| Visual hotspot    | Image/diagram with clickable points                         |
| Guided process    | Horizontal or vertical step path                            |
| Reflection panel  | Calm writing area with safety reminder                      |
| Portfolio builder | Structured practical output form                            |
| Completion moment | Celebratory but restrained module close                     |

### 17.2 Avoided compositions

Avoid:

* long scrolling article pages;
* repeated three-card grids;
* generic dashboard panels;
* heavy tables inside main learning screens;
* full-screen image backgrounds with long text;
* dense bullet lists;
* inconsistent slide-like layouts;
* unbalanced screens with large empty white space.

---

## 18. Screen fit rule

Every screen specification must mark one of the following:

| Fit status             | Meaning                                                    |
| ---------------------- | ---------------------------------------------------------- |
| `fit-required`         | Must fit desktop canvas without vertical scroll            |
| `scroll-permitted`     | Scroll is allowed for this screen type                     |
| `split-required`       | Content must be split before implementation                |
| `interaction-required` | Content must be converted into reveal/practice interaction |

Default status:

```text
fit-required
```

Coding agents must not implement a screen as scroll-heavy unless the screen specification explicitly says:

```text
scroll-permitted: true
```

---

## 19. Player implementation rules for coding agents

Coding agents must:

1. use `01_FOUNDATION_TOKENS.md`;
2. use this course player system;
3. implement reusable course shell components;
4. preserve stable navigation;
5. use approved screen templates only;
6. preserve no-scroll desktop standard unless explicitly overridden;
7. ensure responsive mobile behavior;
8. ensure keyboard accessibility;
9. report any missing design decision instead of inventing one;
10. return evidence after implementation.

Coding agents must not:

1. redesign the player shell per module;
2. introduce new navigation patterns;
3. add admin links to learner screens;
4. create arbitrary progress styles;
5. hide key actions below scroll;
6. remove focus states;
7. use unapproved colors, fonts, shadows, or spacing;
8. store sensitive HRBA reflection details without safety rules;
9. implement custom one-off screen wrappers unless approved.

---

## 20. QA checklist for the course player

Before approving the course player shell, check:

| QA item                                     | Required result |
| ------------------------------------------- | --------------- |
| Top app bar appears consistently            | Pass            |
| Sidebar navigation works                    | Pass            |
| Active screen state is clear                | Pass            |
| Completion states are visible               | Pass            |
| Bottom navigation is stable                 | Pass            |
| Main canvas respects no-scroll standard     | Pass            |
| Mobile menu works                           | Pass            |
| Right drawer behavior works if implemented  | Pass            |
| Keyboard navigation works                   | Pass            |
| Focus state is visible                      | Pass            |
| Screen transition focus is logical          | Pass            |
| No learner-facing admin links appear        | Pass            |
| Colors and typography match tokens          | Pass            |
| Progress is accurate                        | Pass            |
| Disabled buttons explain requirement        | Pass            |
| No console errors                           | Pass            |
| No layout overflow on desktop/tablet/mobile | Pass            |

---

## 21. Approval status

Status: Draft v1
Applies to: CSO Learning Hub HRBA course player
Depends on: `01_FOUNDATION_TOKENS.md`
Next file: `03_BLOCK_TEMPLATE_LIBRARY.md`
