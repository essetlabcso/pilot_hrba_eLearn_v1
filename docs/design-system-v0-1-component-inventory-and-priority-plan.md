# Design System v0.1 Component Inventory And Priority Plan

Draft v0.1 - Documentation-only planning inventory for one protected HRBA vertical slice

## Purpose

This is a Design System v0.1 planning inventory, not component implementation.

The purpose is to identify the smallest practical component set needed to build one HRBA vertical slice without returning to screen-by-screen improvisation. Components are needed because the current course contains useful patterns, but many are embedded inside module renderers, inline styles, and local screen logic. v0.1 should convert only the safest, most reusable patterns into an approved implementation plan after this pack is reviewed.

This document does not approve React, CSS, token, component, block, template, route, progress, assessment, certificate, accessibility toolbar, asset, content, module CSS, or old HRBA implementation.

## Current Component/Source Inventory

### Existing Player Shell Components

| Source | Current role | Reusable signal | Planning note |
| --- | --- | --- | --- |
| `src/components/player/CoursePlayerShell.tsx` | Assembles player frame, modals, transcript, drawer, progress, routing hooks, and screen canvas. | Player shell orchestration and behavior evidence. | Shared behavior is sensitive; do not refactor as part of first v0.1 component work. |
| `src/components/player/PlayerHeader.tsx` | Header, screen metadata, previous/next/exit controls. | Button hierarchy and player navigation affordances. | Good source for action-button naming, but routing/progress behavior must remain separate. |
| `src/components/player/PlayerSidebar.tsx` | Learning tools and media controls. | Accessible launcher patterns, icon+label button structure. | Useful for button state requirements; broad `.is-active` styling remains unsafe. |
| `src/components/player/MainScreenCanvas.tsx` | Main course content landmark and canvas wrapper. | Candidate shell wrapper for vertical slice screens. | Already behavior-sensitive because it supports programmatic focus. |
| `src/components/player/ProgressStrip.tsx` | Simple progress strip with inline values. | Possible progress display pattern. | Defer state styling and progress migration until later. |
| `src/components/player/GlossaryModal.tsx`, `ResourcesModal.tsx`, `AccessibilityModal.tsx` | Modal surfaces with verified focus behavior and launcher ARIA. | Dialog behavior evidence. | Visual styling is inline and should not be generalized until modal styling is separately approved. |
| `src/components/player/HelpOverlay.tsx` | Focus-contained coachmark/tutorial overlay with dialog-like root semantics. | Help behavior and ARIA evidence. | Visual design and dedicated close button work remain out of scope. |
| `src/components/player/useModalFocusContainment.ts` | Shared focus containment utility. | Behavior utility evidence. | Do not expand behavior use without a separate accessibility task. |

### Existing Platform Components

| Source | Current role | Reusable signal | Planning note |
| --- | --- | --- | --- |
| `src/components/platform/PlatformShell.tsx` | Platform shell and layout. | App-level structure. | Not first v0.1 vertical-slice component scope. |
| `src/components/platform/CourseRoadmap.tsx` | Course/module roadmap. | Card/list structure. | Defer because roadmap connects to progress and catalogue behavior. |
| `src/components/platform/ModuleLaunchCard.tsx` | Module launch card. | Card, CTA, status affordance. | Useful as a reference for card/action patterns, but not implementation-ready for learner screens. |

### Existing Course/Screen Patterns

Current module files contain many embedded block-like patterns:

- Module 1 includes local `ScenarioDecisionBlock`, `SortingActivityBlock`, `ActorMatchingBlock`, `SurveyBlock`, and `QuizBlock` functions.
- Module 2 includes local `PrivateReflectionBlock`, `HotspotBlock`, `MatchingBlock`, `WorksheetBlock`, `PortfolioSaveSelectBlock`, `FlashcardsBlock`, `MCQQuickCheckBlock`, `TabsBlock`, `SortingBlock`, `TimelineBlock`, `ChecklistBlock`, `SingleMCQBlock`, `ProcessBlock`, `ScenarioDecisionBlock`, `PortfolioCheckpointBlock`, `QuizBlock`, and `SummaryTabsBlock`.
- Module 3, Module 4, and Module 5 include local button, title, card, quote, accordion, quick-check, and screen-specific patterns.

These are evidence sources only. They should not be copied directly into v0.1 components because they mix content, layout, state, visual styling, and completion behavior.

### Visible Design Debt

The current component tree shows:

- large module renderers with screen-level UI patterns embedded locally;
- repeated primary/secondary button patterns across player and course modules;
- repeated card/content-panel structures;
- repeated scenario, reflection, knowledge-check, checklist, tabs, and feedback patterns;
- inline styles in player modals, HelpOverlay, ProgressStrip, Menu drawer, and many course screens;
- local hex, rgba, shadow, spacing, typography, and radius values;
- behavior-heavy patterns mixed with visual styling;
- no shared `src/components/shared/` component library yet.

No implementation changes are proposed by this inventory.

## MVP Component Priority List For One HRBA Vertical Slice

| Recommended order | Component candidate | Purpose | Likely source/pattern | Accessibility requirements | Token/state requirements | Needed for vertical slice v0.1? | Implementation readiness | Risk level |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Button / action button | Standardize primary, secondary, restart/continue, and inline actions. | `PlayerHeader.tsx`, module `PrimaryButton`/`SecondaryButton` patterns. | Native button, clear accessible name, focus-visible, disabled state only when specified. | Existing color, spacing, border, radius, and focus tokens; avoid Phase D states. | Yes | Ready with caution | Medium |
| 2 | Card / content panel | Provide reusable content surface for concepts, scenarios, and summaries. | `ModuleLaunchCard.tsx`, screen card patterns, player canvas surfaces. | Semantic container with heading relationships where needed. | Surface, border, text, spacing, radius, shadow tokens; no new shadows. | Yes | Ready with caution | Medium |
| 3 | Callout / key message | Highlight one principle or takeaway. | Statement/key message patterns in course renderers. | Text remains readable without color-only meaning; heading or strong text as appropriate. | Existing semantic surface/text/border tokens. | Yes | Ready | Low |
| 4 | Learning block frame | Provide consistent wrapper for block title, instruction, body, and completion affordance. | Screen anatomy standard and repeated renderer sections. | Heading hierarchy, instruction text, optional status region. | Surface, spacing, border, text tokens. | Yes | Ready with caution | Medium |
| 5 | Feedback / completion message | Present response feedback, completion, or next step. | Knowledge check and completion transition patterns. | Feedback must be programmatically associated when interactive; no color-only success/error. | Success/info/warning/danger token rules; danger states not first. | Yes | Ready with caution | Medium |
| 6 | Progress/continue action pattern | Keep next action visible and tied to completion rule. | Player header buttons, Module 2 CTA fixes, completion transition block. | Clear label, visible focus, transparent disabled requirements if disabled. | Button tokens plus state rules; progress logic not changed. | Yes, if vertical slice uses gated screens | Ready with caution | Medium-high |
| 7 | Knowledge check option group | Standardize simple multiple-choice checks. | Module 2 `SingleMCQBlock`, `MCQQuickCheckBlock`, module quiz patterns. | Semantic radio/group or button choices, keyboard operation, selected state, feedback. | Selected/current state strategy needed; no broad `.is-active`. | Yes | Not ready | High |
| 8 | Reflection / portfolio prompt shell | Safe prompt, input area, save/skip/continue affordance. | Module 2 `PrivateReflectionBlock`, `PortfolioCheckpointBlock`, Module 3/4 portfolio screens. | Labeled input, safety note, save state, keyboard support, no sensitive-data prompt. | Form, focus, surface, and state tokens; persistence behavior separate. | Yes | Not ready | High |
| 9 | Scenario / case panel | Present short scenario and decision context. | Module 1/2 scenario decision patterns, case story screens. | Reading order, plain language, no unsafe real identifiers, accessible decision prompt. | Card/callout tokens; choice behavior separate. | Yes | Ready with caution for static panel; Not ready for decisions | Medium-high |

## Minimum Recommended v0.1 Component Candidates

For the first vertical slice, v0.1 should plan around:

- Button / action button;
- Card / content panel;
- Callout / key message;
- Learning block frame;
- Reflection / portfolio prompt shell;
- Knowledge check option group;
- Scenario / case panel;
- Feedback / completion message;
- Progress/continue action pattern, only where the selected vertical slice requires it.

## Deferred Component Candidates

These should wait until after vertical slice validation:

- complex charts or data dashboards;
- full modal/accessibility visual styling;
- advanced image hotspots;
- complex drag/drop interactions;
- complex branching scenarios;
- full theme switching;
- full course navigation rewrites;
- certificate or final assessment components;
- broad progress strip/state migration;
- global/course focus migration;
- full modal close-button redesign;
- broad `.player-sidebar-button.is-active` or current-state component styling.

## Implementation Readiness

After this pack is reviewed, the first low-risk implementation candidates should be:

1. Callout / key message.
2. Card / content panel.
3. Button / action button, if the task excludes routing/progress behavior and starts with visual/semantic variants only.

Behavior-heavy components should remain separate:

- Knowledge check option group;
- Reflection / portfolio prompt shell;
- Scenario decision behavior;
- Progress/continue action pattern with gating;
- any component that changes completion, route, state persistence, or assessment behavior.

No component implementation is approved by this document. Any future component task must define exact files, token rules, accessibility requirements, validation route, QA evidence, and stop conditions.
