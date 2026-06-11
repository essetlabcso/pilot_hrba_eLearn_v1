# 03_INTERNAL_COURSE_PLAYER_SPEC.md
# Internal Course Player Specification

## Purpose

Defines the UNICEF/EU SCORM-style course player launched from the outer platform.

## Player layout

Persistent areas:
1. thin yellow progress strip at top;
2. dark blue top header;
3. fixed left vertical toolbar;
4. main slide content area.

Approximate proportions: progress strip 3–5px, header 70–85px, toolbar 95–115px wide.

## Player header

Dark blue background. Left: UNICEF logo/placeholder and EU flag/placeholder, thin divider. Center: module/section title and slide subtitle. Right: slide counter and circular previous/next arrows.

Examples: **Slide 1 of 6**, **Slide 15 of 26**, **Slide 26 of 26**.

Final slides show no Next arrow.

## Toolbar

Default order:
1. **Menu**
2. **Glossary**
3. **Resources**
4. **Help**
5. **Captions**
6. **Pause**
7. **Mute**
8. **Reload**
9. **Exit**

Alternate state: **Captions** becomes **Hide captions**; **Mute** becomes **Sound on**.

Help opens Help overlay. Glossary/resources show pending content if exact content unavailable. Reload resets current slide state. Exit returns to outer platform.

## Help overlay

Dark translucent overlay over the current slide. White arrows and labels explain controls. Includes **OK** and **Accessibility**. OK closes the overlay.

Required labels include Menu, Glossary, Resources, Help, Captions, Play/Pause, Mute, Reload, Exit, Progress, Prev, Next, and **Click Ok to exit Help screen.**

## Start screens

Split-screen layout: left dark teal panel, right full-height photo/placeholder, lower-right branding block. Shared title:

**Child Rights Toolkit:**  
**Integrating Child**  
**Rights in International**  
**Partnerships**

Button: **Start**. Helper: **Click Start to begin** / **the course.**

Introduction duration: **Duration: 9 minutes**. Module 1 duration: **Duration: 30 minutes**.

## Modal system

Information modals: dark overlay, centered white rounded panel, dark-blue title, body text, X close. Feedback modals: green/red header, icon, heading **Correct!** or **Incorrect**, white body, **Continue** button.

## Quiz behavior

Questions use radio options. Submit/check triggers feedback, solution, or next quiz state according to registry. Do not invent feedback for missing quiz states.

## Completion screens

Dark blue overlay over blurred desk/office background, **Congratulations!**, exact completion text, instructions, large **Exit** button. Exit returns to platform. Final slides show no Next arrow.
