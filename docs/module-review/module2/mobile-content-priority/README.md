# Module 2 mobile content-priority evidence

- Branch: `feature/hrba-full-course-update-20260725`
- Starting commit: `e1f46b133cdd7bf7c60a6aa8f25990a1574fd391`
- Capture date: 2026-07-27
- Local URL: `http://127.0.0.1:4174`
- Mobile viewports: 390 × 900 and 320 × 900
- Desktop viewport: 1440 × 900

## Root cause and correction

The shared player-shell rule at widths up to 640 pixels placed the complete Learning Tools and Media Controls sidebar before the main course content. This affected Modules 1–5 and put ten sidebar controls before the first learner interaction in keyboard order. No collapsed all-tools mobile pattern existed.

The shared sidebar now starts collapsed on mobile behind one accessible disclosure button. The same single sidebar remains available when expanded, `aria-expanded` exposes its state, Escape closes it and restores focus to the disclosure, and desktop presentation is unchanged.

## Retained evidence

- `screen-02-initial-390.png` — initial Screen 2 viewport with the heading and introduction immediately after the mobile tools disclosure.
- `screen-02-initial-320.png` — equivalent initial state at 320 pixels.
- `screen-02-tools-expanded-390.png` — the complete shared tools panel expanded.
- `screen-02-desktop-no-regression.png` — unchanged desktop sidebar and learning-content composition.

Browser checks across representative screens from Modules 1–5 found no horizontal overflow, footer overlap, or console errors. The active pilot and Production were not changed.
