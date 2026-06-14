# Module 2 S02 CTA Fix QA

## Status

Draft v0.1 - Documentation-only post-fix QA for the Module 2 S02 responsive CTA visibility fix.

## Purpose

This note verifies the bounded responsive CTA visibility fix from commit `e52ac5d18dd44d7cccf834efc3b7b282b4b0bb29`.

This QA note does not continue token migration, change CSS, change React components, or approve broader responsive work.

## Route Checked

Route checked:

`http://127.0.0.1:5173/module-2/screen-2-2?completed=module_01_hrba_foundations`

Screen title rendered:

`What you will be able to do`

CTA checked:

`Continue to opening scenario`

## Viewports Checked

| Viewport | Size |
| --- | --- |
| Desktop | `1440 x 900` |
| Tablet | `768 x 900` |
| Mobile | `390 x 844` |

## Build Result

`npm run build` passed.

The existing Vite large-asset/chunk warning was still present. No new build error was observed during this QA pass.

## Scroll Behavior Observed

| Viewport | Intended scroll owner | Observed behavior | Result |
| --- | --- | --- | --- |
| Desktop `1440 x 900` | No content scroll needed for this CTA | CTA was visible in the viewport without scrolling. | Pass |
| Tablet `768 x 900` | `.main-screen-canvas__content` | `.main-screen-canvas__content` reported `overflow-y: auto` and `canScrollY: true`; `.m2-s02-screen` reported visible overflow and no own scroll. | Pass |
| Mobile `390 x 844` | `.main-screen-canvas__content` | `.main-screen-canvas__content` reported `overflow-y: auto` and `canScrollY: true`; `.m2-s02-screen` reported visible overflow and no own scroll. | Pass |

The tablet and mobile checks confirm that the nested-scroll ambiguity from the triage is resolved for this screen: the canvas content owns vertical scrolling, while the Module 2 S02 screen no longer creates a competing scroll container.

## CTA Visibility and Reachability

| Viewport | Initial CTA position | After content scroll | Result |
| --- | --- | --- | --- |
| Desktop `1440 x 900` | Visible at about `y=716`, bottom `748` | Still visible | Pass |
| Tablet `768 x 900` | Below initial viewport at about `y=903`, bottom `947` while disabled | Visible after scrolling `.main-screen-canvas__content`, about `y=746`, bottom `790` | Pass |
| Mobile `390 x 844` | Below initial viewport at about `y=1701`, bottom `1785` while disabled | Visible after scrolling `.main-screen-canvas__content`, about `y=642`, bottom `726` | Pass |

The CTA remains below the initial viewport on tablet and mobile before the learner has interacted with all objective cards. That is acceptable because the CTA is disabled at that point and becomes reachable through the single visible content scroll container.

## Keyboard Focus Result

The six objective cards were marked viewed during QA so the CTA became enabled. Then focus was moved to the CTA.

| Viewport | CTA enabled after card review | Focus result | Result |
| --- | --- | --- | --- |
| Desktop `1440 x 900` | Yes | Focus stayed on the visible CTA. | Pass |
| Tablet `768 x 900` | Yes | Focusing the CTA scrolled `.main-screen-canvas__content` and brought the CTA into view. | Pass |
| Mobile `390 x 844` | Yes | Focusing the CTA scrolled `.main-screen-canvas__content` and brought the CTA into view. | Pass |

Observed active element text after focus:

`Continue to opening scenario`

## Shell and Navigation Checks

| Check | Observation | Result |
| --- | --- | --- |
| Shell-caused horizontal scrolling | No horizontal overflow was observed at desktop, tablet, or mobile sizes. | Pass |
| Header controls | Header controls remained visible in all checked viewports. | Pass |
| Sidebar/navigation controls | Sidebar controls remained visible in all checked viewports. | Pass |
| Unrelated route/screen impact | No unrelated route or screen was intentionally tested or changed in this QA task. | Pass |

## Remaining Risks

- This QA was bounded to `/module-2/screen-2-2`.
- Other Module 2 screens may have separate responsive behavior and should not be assumed fixed by this check.
- The CTA is still below the first tablet/mobile viewport before the learner completes the objective-card interaction, but it is disabled at that stage and is reachable through the intended content scroll area.
- The validation used local QA progress override `completed=module_01_hrba_foundations` to open the Module 2 player route in a fresh profile.

## Recommendation

Proceed.

The scoped responsive fix is behaving as intended for Module 2 S02. The scroll owner is now clear on tablet and mobile, keyboard focus can bring the enabled CTA into view, shell navigation remains usable, and no shell-caused horizontal scrolling was observed.

## Confirmation

- No CSS was edited during this QA task.
- No React components were edited.
- No screens were edited.
- No module CSS was edited.
- No token files were edited.
- No assets, routing, progress logic, locking, assessment logic, certificate logic, accessibility toolbar behavior, or old HRBA course files were changed.
- This QA note is documentation only.
