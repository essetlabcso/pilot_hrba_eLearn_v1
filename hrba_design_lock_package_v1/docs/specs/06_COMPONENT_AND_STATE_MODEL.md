# 06 Component and State Model

## Top-Level Shell Logic
The application should route between layers using a top-level state model.

```text
AppRoot
├── PublicPlatformShell
├── EnrolledCoursePlatformShell
├── CoursePlayerShell
└── ResourceViewShell
```

## Platform Components
Recommended platform components:

- PublicShell
- PublicHeader
- PublicFooter
- CourseCataloguePage
- CourseSearchBar
- CourseFilterSidebar
- FeaturedCourseSection
- CourseCard
- CourseOverviewPage
- CourseHero
- CourseMetadataCard
- CourseStructureAccordion
- EnrolledCourseHomePage
- ModuleTileGrid
- TableOfContentsPanel
- CourseProgressSummary
- ModuleLaunchPage
- LaunchWrapperPage
- CertificatePathwayCard

## Player Components
Recommended player components:

- CoursePlayerShell
- ProgressStrip
- PlayerHeader
- PlayerSidebar
- ScreenRenderer
- ModuleCoverScreen
- HelpOverlayModal
- AccessibilityModal
- GlossaryDrawer
- ResourcesDrawer
- TranscriptPanel
- VideoScreen
- LearningObjectivesScreen
- ConceptScreen
- CardGridBlock
- StandardInfoModal
- ScenarioBlock
- BranchingScenarioBlock
- ToolActivityBlock
- KnowledgeCheckBlock
- FeedbackModal
- QuizResultScreen
- SummaryTabsScreen
- CompletionScreen

## State Objects
Recommended state categories:

```text
learningState.currentLayer
learningState.currentCourseId
learningState.currentModuleId
learningState.currentScreenId
learningState.currentSubState
learningState.activeModal
learningState.completedModules
learningState.screenProgress
learningState.quizAttempts
learningState.practiceCheckState
learningState.transcriptVisible
learningState.soundState
learningState.captionState
learningState.resourceView
```

## Routing Rule
Platform flow and player flow should be controlled by explicit state transitions, not arbitrary links.

## Progress Rule
Progress updates after defined completion events, not merely after page load.

## Module Completion Rule
A module is complete when required screens/interactions are completed and the completion screen is reached or confirmed.
