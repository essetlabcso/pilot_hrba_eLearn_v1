# 02_OUTER_AGORA_PLATFORM_SPEC.md
# Outer Agora Platform Specification

## Purpose

Defines the learner-facing Agora-style platform layer outside the internal course player.

## Global outer platform shell

### UNICEF top strip
Full-width turquoise strip, approximately 30–36px high. Left text/logo: **unicef | for every child**. Logged-in pages may show right-side icons and user name **Kidane Degu**.

### Agora header
White horizontal header below UNICEF strip. Left: hamburger icon, **Menu**, orange **AGORA** logo. Right: rounded search field with placeholder **Search all activities** and search icon.

### Breadcrumbs
Pale-green breadcrumb tabs starting with green home icon. Use exact labels such as **My activities**, **Child-Rights-Toolkit**, **Introduction**, and **Module 1: Overview of Child Rights in International Partnerships**.

## Outer platform states

### OP-DASH-01-base — Dashboard
Includes Recent Learning, About UNICEF, Specialized home pages, Recommended courses, carousel arrows/dots, and floating back-to-top button. Clicking the Child Rights Toolkit course opens `OP-COURSE-01-overview`.

### OP-COURSE-01-overview — Course overview
Shows course thumbnail, title, subtitle, metadata, partnership statement, course aim, objectives, audience, length, methodology, structure, enrollment box, and **Continue learning** button. Missing objectives/audience/methodology/footer contact details remain pending.

### OP-COURSE-02-homepage — Course homepage / module tile grid
Shows large course title, left course info and instructions cards, module tile grid, right table of contents. Introduction is available; Module 1 and later modules are locked before Introduction completion. Preserve the outer certificate warning: **85% or higher**.

### OP-LAUNCH-INTRO-01-failure and OP-LAUNCH-MOD1-01-failure — Launch wrappers
Show **Exit component**, **Course homepage**, and launch message:

**Your content did not launch.**

**Make sure popups are enabled for this site and try again.**

**Click to Launch Manually**

Manual launch opens the correct player start screen.

### OP-INTRO-01-completed — Introduction completed page
Shows Introduction learning objectives, length 9 minutes, component link, green completion check, **Next >**, and Module 1 available in the table of contents.

### OP-MOD1-01-overview — Module 1 overview
Shows Module 1 learning objectives, length 30 minutes, launch instruction, component link, grey incomplete indicator, **< Previous**, and active Module 1 TOC item.

### OP-MOD1-02-completed-pending — Post-Module-1 return
Exact source page unavailable. Preserve outer shell, mark Module 1 completed, display **Pending source content**, and do not invent Module 2 behavior.

## Locked/unlocked logic

Before Introduction completion: Introduction available; Module 1 and later modules locked. After Introduction completion: Introduction complete; Module 1 available. After Module 1 completion: Module 1 completed; next state pending.
