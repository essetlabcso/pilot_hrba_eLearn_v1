# Batch 6 QA - Media Placeholders and Interim Intro Screens

## Scope

Batch 6 converted the learner-facing intro video placeholder screens into polished "Before you begin" screens for:

- M2-S01A
- M3-S1-01
- M4-S1-01
- M5-S1-01

Issue trace:

- RPL-007: intro video placeholders removed from learner-facing intro screens.
- RPL-010: on-screen intro copy now gives a meaningful learner-ready alternative while final media remains unavailable.
- RPL-025: media/accessibility readiness is documented without adding new media architecture.

## Files Changed

- `src/components/course/Module2AccountabilityPowerScreens.tsx`
- `src/components/course/Module3Renderer.tsx`
- `src/components/course/Module4Renderer.tsx`
- `src/components/course/Module5Renderer.tsx`
- `src/data/module2/module2Content.ts`
- `docs/qa/batch-6-media-placeholders-interim-intro-screens.md`
- `docs/qa/batch-6-media-placeholders-interim-intro-screens/screenshots/`

## Implementation Notes

The implementation keeps the existing course-layer screen structure and Continue behavior. It does not add final videos, captions, transcripts, posters, assets, media-player architecture, routing changes, progress changes, completion changes, assessment changes, certificate changes, LMS/LRS/storage changes, shell changes, or accessibility-toolbar behavior changes.

M2-S01A keeps the existing approved poster image already present in source and replaces the learner-facing empty video/transcript language with a poster-supported practice lens.

M3-S1-01, M4-S1-01, and M5-S1-01 use learner-ready intro copy inside the existing course-layer layouts. No new artwork or media assets were added.

The existing video/play-card visual treatment is intentionally retained where it already existed. Final videos are expected in the next media step, so the play-card affordance can remain as part of the near-final screen design as long as the surrounding text does not promise unavailable video.

## Placeholder Language Check

Automated DOM checks on the target screens found no visible occurrences of:

- "video will appear"
- "placeholder"
- "coming soon"
- "TODO"
- "transcript will be added"
- "interim"
- "text-first version"

Each target screen also reported zero iframe elements while no final video URL is configured, confirming there is no empty or broken embedded media frame in the rendered state.

The word "placeholder" remains only in internal implementation identifiers such as class names, IDs, or existing non-target fallback components. Those identifiers are not rendered as learner-facing copy on M2-S01A, M3-S1-01, M4-S1-01, or M5-S1-01.

## Final Polish Pass

Completed on 2026-06-17.

Learner-facing temporary labels were replaced with production-ready labels:

- M2-S01A: "Practice lens" and "Module lens"
- M3-S1-01: "Design prompt"
- M4-S1-01: "Implementation prompt"
- M5-S1-01: "Intro focus" and "MEAL lens"

The visible play-button/video-card treatment remains intentionally retained for the upcoming final video integration step. The card text no longer promises unavailable video, captions, or transcripts.

Desktop and mobile screenshots were refreshed after this polish pass.

## Screenshot Evidence

Screenshots are stored in:

`docs/qa/batch-6-media-placeholders-interim-intro-screens/screenshots/`

Evidence files:

- `m2-s01a-desktop.png`
- `m2-s01a-mobile.png`
- `m3-s1-01-desktop.png`
- `m3-s1-01-mobile.png`
- `m4-s1-01-desktop.png`
- `m4-s1-01-mobile.png`
- `m5-s1-01-desktop.png`
- `m5-s1-01-mobile.png`

## Route Smoke

| Screen | Continue route | Result |
| --- | --- | --- |
| M2-S01A | `/module-2/learning-objectives` | Pass |
| M3-S1-01 | `/module-3/screen-3-2` | Pass |
| M4-S1-01 | `/module-4/screen-4-2` | Pass |
| M5-S1-01 | `/module-5/screen-5-2` | Pass |

M5 route smoke used the existing completed-module query context for Modules 1-4 so the app's prerequisite gate would open Module 5 without changing route or progress logic.

## Accessibility and Media Notes

The polished intro screens do not claim that final captions or transcripts exist. Instead, they provide the essential introduction directly on screen. Final video integration still requires approved video files or URLs, scripts, transcript text, caption files or caption plan, poster metadata, and HRBA/safeguarding review.

## Deferred Follow-Up

Final media integration remains deferred until final video/transcript/caption/poster inputs are approved.

Any broader media-player, transcript-panel, caption-loading, shell, storage, routing, or LMS/LRS behavior remains outside Batch 6 and should be handled only through a separately approved protected-layer task.

## Command Evidence

Final verification completed on 2026-06-17 after the polish pass:

- `npm run build` - Pass. Vite reported the existing large chunk warning.
- `npx tsc -b --pretty false` - Pass.
- `npm run lint` - Pass with 0 errors and 5 existing warnings in `Module1Renderer.tsx` and `CoursePlayerShell.tsx`.

## Recommendation

Batch 6 is ready for human review as a learner-ready intro-screen implementation.
