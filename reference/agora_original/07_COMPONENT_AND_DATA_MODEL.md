# 07_COMPONENT_AND_DATA_MODEL.md
# Component and Data Model Specification

## Implementation approach

Build a state-driven interactive prototype with reusable components and registered screen/state data. Do not build one long scrolling page or disconnected static images.

## Top-level rendering modes

`AppRoot` renders one of:
- `OuterPlatformShell`
- `CoursePlayerShell`
- `ResourceViewShell`

based on `learningState.currentLayer`.

## Outer platform components

- `OuterPlatformShell`
- `UnicefTopStrip`
- `AgoraHeader`
- `BreadcrumbTrail`
- `DashboardPage`
- `RecentLearningCard`
- `AboutUnicefCard`
- `SpecializedHomePagesSection`
- `RecommendedCoursesCarousel`
- `CourseOverviewPage`
- `CourseHomepagePage`
- `CourseInfoCard`
- `CourseInstructionsCard`
- `ModuleTileGrid`
- `ModuleTile`
- `TableOfContentsPanel`
- `SectionOverviewPage`
- `LaunchWrapperPage`
- `OuterPlatformFooter`

## Internal player components

- `CoursePlayerShell`
- `ProgressStrip`
- `PlayerHeader`
- `PlayerSidebar`
- `SlideRenderer`
- `ModalLayer`
- `StartScreenSlide`
- `WelcomeVideoSlide`
- `ObjectiveSlide`
- `LearningOutcomeCardsSlide`
- `AudienceCardsSlide`
- `CourseStructureRevealSlide`
- `PhotoTextConceptSlide`
- `ExampleCardsSlide`
- `SpeechBubbleQuestionSlide`
- `FrameworkPanelSlide`
- `TimelineInteractionSlide`
- `SingleChoiceKnowledgeCheckSlide`
- `DownloadDiagramSlide`
- `StickyNotesSlide`
- `ProcessDiagramSlide`
- `CaseStudyIntroSlide`
- `CaseStudyQuestionSlide`
- `CaseSummarySlide`
- `QuizIntroSlide`
- `QuizQuestionSlide`
- `QuizResultSlide`
- `TabbedSummarySlide`
- `CompletionSlide`
- `PendingSlide`

## Modal/resource components

- `StandardInfoModal`
- `HelpOverlayModal`
- `FeedbackModal`
- `CaseDescriptionModal`
- `PendingModal`
- `ResourceViewShell`
- `DocumentPage`

## Core data models

### Course
```js
course = {
  id: "child-rights-toolkit",
  title: "Child Rights Toolkit: Integrating Child Rights in International Partnerships",
  subtitle: "Make a reality the realization of international commitments on child rights at country level.",
  provider: "UNICEF",
  language: "English",
  topic: "Peace and Human Rights",
  format: "Online courses, Advanced e-course",
  completion: "There is a short module to be passed"
}
```

### Module
```js
module = {
  id: "module-1",
  title: "Module 1: Overview of Child Rights in International Partnerships",
  playerTitle: "Overview of Child Rights in International Partnerships",
  duration: "30 minutes",
  totalSlides: 26,
  completionState: "not-started" | "in-progress" | "completed"
}
```

### Slide state
```js
slideState = {
  stateId: "M1-S04-base",
  moduleId: "module-1",
  slideNumber: 4,
  totalSlides: 26,
  stateType: "base",
  blockType: "ExampleCardsSlide",
  contentRef: "05_COURSE_CONTENT_SOURCE_OF_TRUTH.md#Slide 4",
  previousStateId: "M1-S03-base",
  nextStateId: "M1-S05-base",
  pending: false
}
```

### Modal
```js
modal = {
  modalId: "M1-S05-modal-child-rights",
  parentStateId: "M1-S05-base",
  type: "standard-info",
  title: "Really? What are child rights?",
  closeTargetStateId: "M1-S05-base",
  pending: false
}
```

### Quiz
```js
quiz = {
  quizId: "M1-module-quiz",
  totalQuestions: 4,
  passingScore: 80,
  isMandatory: false,
  isRecorded: false,
  resultStateId: "M1-S24-result-75"
}
```

## Action functions

Use controlled transitions only:
`goToPlatformState`, `goToPlayerState`, `launchModule`, `startModule`, `nextState`, `previousState`, `openModal`, `closeModal`, `toggleCaptions`, `toggleSound`, `reloadCurrentState`, `selectAnswer`, `submitAnswer`, `continueFromFeedback`, `completeModule`, `exitPlayer`, `openResource`, `closeResource`, `showPendingContent`.

All actions must validate that the destination state exists in the registry.
