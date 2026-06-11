# 03 Architecture and Player Model

## Layer 1 — CSO Learning Hub Platform / LMS Layer

### Responsibilities
- Course catalogue
- Course detail / overview
- Enrolled course homepage
- Course roadmap
- Module list
- Table of contents
- Progress indicators
- Module launch links
- Launch fallback support
- Completion checkmarks
- Next/previous module navigation
- Final assessment and certificate pathway
- Support and accessibility links

### Key Pages
- Public Course Catalogue
- Public Course Overview
- Enrolled Course Homepage / Roadmap
- Module Launch Page
- Launch Wrapper / Popup Fallback Page
- Course Completion / Certificate Page

### Required Platform Behaviors
- Learner can discover the HRBA course.
- Learner can open the HRBA course overview.
- Learner can start or resume the course.
- Learner can see module progress.
- Learner can launch one module at a time.
- Learner can return from the player and see progress saved.
- Learner can continue to the next module.
- Learner can access final assessment and certificate pathway when eligible.

## Layer 2 — Focused HRBA Course Player

### Responsibilities
- Display one focused screen or block sequence at a time.
- Maintain fixed header, toolbar, progress, and navigation.
- Support videos, transcripts, modals, resources, glossary, help, accessibility, scenarios, quizzes, and summaries.
- Mark module completion and return learner to platform.

### Player Shell

```text
┌─────────────────────────────────────────────────────────────┐
│ Progress strip                                               │
├─────────────────────────────────────────────────────────────┤
│ Logo | Module title | Screen title | Screen X of Y | Prev/Next│
├─────────────┬───────────────────────────────────────────────┤
│ Sidebar     │ Main focused learning canvas                   │
│ Menu        │                                               │
│ Glossary    │ Screen / block / sub-screen content            │
│ Resources   │                                               │
│ Help        │                                               │
│ Transcript  │                                               │
│ Pause       │                                               │
│ Sound       │                                               │
│ Replay      │                                               │
│ Exit        │                                               │
└─────────────┴───────────────────────────────────────────────┘
```

### Standard Player Elements
- ProgressStrip
- PlayerHeader
- PlayerSidebar
- ScreenRenderer
- HelpOverlayModal
- AccessibilityModal
- GlossaryModal/Drawer
- ResourcesModal/Drawer
- StandardInfoModal
- FeedbackModal
- QuizResultModal
- CompletionScreen

## Resource View Layer
A resource view may be used for PDF/worksheet previews or downloads. It should not break course progress logic.

## Player Design Rule
Inside the player, do not create long scrolling lessons. Use focused screens, sub-screens, overlays, tabs, or step reveals.
