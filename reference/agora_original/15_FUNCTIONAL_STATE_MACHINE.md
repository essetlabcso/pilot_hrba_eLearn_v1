# 15_FUNCTIONAL_STATE_MACHINE.md
# Functional State Machine

## Purpose

Defines how the prototype behaves as a state-based learning experience.

## Global learning state

```js
learningState = {
  currentLayer: "outer-platform" | "course-player" | "resource-view",
  currentPlatformStateId: string | null,
  currentCourseId: "child-rights-toolkit",
  currentModuleId: "introduction" | "module-1" | null,
  currentPlayerStateId: string | null,
  currentSlideNumber: number | null,
  totalSlides: number | null,
  activeModalId: string | null,
  activeRevealStateId: string | null,
  selectedAnswer: { questionId: string | null, optionId: string | null, isCorrect: boolean | null },
  quizState: { activeQuizId: string | null, currentQuestionIndex: number | null, totalQuestions: number | null, answers: [], scorePercent: number | null, completed: boolean },
  completionState: { introductionCompleted: boolean, module1Completed: boolean },
  unlockState: { introductionUnlocked: boolean, module1Unlocked: boolean, module2Unlocked: boolean | "pending" },
  toolbarState: { captionsOn: boolean, soundOn: boolean, paused: boolean },
  pendingContent: { currentPendingId: string | null, reason: string | null }
}
```

Initial state: `currentLayer = outer-platform`, `currentPlatformStateId = OP-DASH-01-base`, Introduction unlocked, Module 1 locked, Module 2 pending.

## Layer rules

Outer platform mode renders the Agora shell only. Course-player mode renders the internal player shell only. Resource-view mode renders a document/resource view and preserves the parent slide in memory.

## Core transitions

- Dashboard course link → `OP-COURSE-01-overview`
- **Continue learning** → `OP-COURSE-02-homepage`
- Introduction tile → `OP-LAUNCH-INTRO-01-failure`
- Introduction manual launch → `INT-START-base`
- Introduction Start → `INT-S01-base`
- Introduction completion Exit → `OP-INTRO-01-completed`, `introductionCompleted = true`, `module1Unlocked = true`
- **Next >** → `OP-MOD1-01-overview`
- Module 1 link → `OP-LAUNCH-MOD1-01-failure`
- Module 1 manual launch → `M1-START-base`
- Module 1 Start → `M1-S01-base`
- Module 1 completion Exit → `OP-MOD1-02-completed-pending`, `module1Completed = true`, `module2Unlocked = pending`

## Modal rules

Open modal: set `activeModalId` and render modal over parent slide. Close modal: clear `activeModalId` and return to parent state. Pending modals display **Pending source content**.

## Toolbar rules

Captions toggles label between **Captions** and **Hide captions**. Sound toggles between **Mute** and **Sound on**. Reload closes modals and resets current slide to its base/initial reveal state. Exit before completion returns to the relevant outer platform page without marking completion.

## Quiz rules

Slide 8 correct option: Yes. Slide 15 correct option: option 4, **Child labour in cotton production in Egypt**. Slide 20 correct option: option 2, **optimization of resources for children**. Quiz result is fixed from source as **Your score: 75%**. Do not invent feedback for missing quiz questions.

## Progress strip

`progressPercent = currentSlideNumber / totalSlides`. Reveal and modal states retain the parent slide number.

## Final rule

Every action must lead to a registered state. If the destination lacks source content, show **Pending source content**.
