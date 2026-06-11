# 06 — Module 1 Implementation Sequence

## Purpose

Provide a clean, staged implementation sequence for upgrading Module 1 quality without creating a risky large-change task.

## Core Rule

Do not implement everything in one Codex task.

Use short, phase-based prompts.

Each phase should:

1. use one reference markdown file
2. focus on one type of improvement
3. affect Module 1 only
4. run build
5. commit and push separately

---

## Recommended Sequence

```text
Phase 0 — Prepare documentation workspace
Phase 1 — Contrast and accessibility fixes
Phase 2 — Visual learning supports
Phase 3 — UX/navigation/progress polish
Phase 4 — Local build verification
Phase 5 — GitHub push
Phase 6 — Vercel deployment check
Phase 7 — Final manual QA review
```

---

## Phase 0 — Prepare Documentation Workspace

**Goal:**  
Create the implementation reference files.

**Files:**

```text
docs/module-1-quality-upgrade/04-module-1-visual-assets-plan.md
docs/module-1-quality-upgrade/05-module-1-ux-polish-plan.md
docs/module-1-quality-upgrade/06-module-1-implementation-sequence.md
```

**Code changes:**  
None.

**Commit optional:**  
Yes, if documentation is stored in repo.

---

## Phase 1 — Contrast and Accessibility Fixes

**Goal:**  
Fix the most urgent readability and accessibility issues.

**Reference file:**

```text
docs/module-1-quality-upgrade/03-module-1-contrast-accessibility-fixes.md
```

**Focus:**

- text/background contrast
- selected/active states
- feedback panel readability
- disabled button readability
- focus rings
- modal focus return
- keyboard accessibility
- touch target sizes
- progress readability

**Do not:**

- add visual assets
- redesign screens
- touch other modules

**Validation:**

```bash
npm run build
```

**Commit message:**

```text
Improve Module 1 contrast and accessibility
```

---

## Phase 2 — Visual Learning Supports

**Goal:**  
Add priority visuals that improve understanding of abstract HRBA concepts.

**Reference file:**

```text
docs/module-1-quality-upgrade/04-module-1-visual-assets-plan.md
```

**Focus screens:**

```text
M1-S2-01 — Who Has Responsibility?
M1-S2-03 — From Services to Rights
M1-S1-04 — Water Project Story
```

**Required visual supports:**

1. Accountability actor map
2. Services-to-rights shift pathway
3. Water project story visual placeholder or image slot

**Do not:**

- redesign the module
- add large image dependencies
- change unrelated modules

**Validation:**

```bash
npm run build
```

**Commit message:**

```text
Add Module 1 visual learning supports
```

---

## Phase 3 — UX / Navigation / Progress Polish

**Goal:**  
Improve learner clarity, flow, and screen-to-screen experience.

**Reference file:**

```text
docs/module-1-quality-upgrade/05-module-1-ux-polish-plan.md
```

**Focus:**

- disabled-button guidance
- explored/completed states
- sub-progress indicators
- portfolio save confirmation
- modal placement
- responsive layout
- completion screen CTA clarity

**Do not:**

- redesign the module
- add new major visuals
- change unrelated modules

**Validation:**

```bash
npm run build
```

**Commit message:**

```text
Polish Module 1 learner experience
```

---

## Phase 4 — Local Build Verification

Run:

```bash
npm run build
```

If build fails:

1. fix errors
2. rerun build
3. do not push until build passes

Optional local preview:

```bash
npm run dev
```

or:

```bash
npm run preview
```

---

## Phase 5 — GitHub Push

After each phase:

```bash
git status
git add .
git commit -m "[phase commit message]"
git push
```

Do not force push.

Do not commit secrets or `.env` files.

---

## Phase 6 — Vercel Deployment Check

After push:

1. open Vercel dashboard
2. check deployment status
3. review build logs if failed
4. open deployed course URL if passed
5. verify Module 1 still loads correctly

---

## Phase 7 — Final Manual QA Review

Check Module 1 manually after deployment.

Minimum review checklist:

- all Module 1 screens load
- text is readable
- selected states are visible
- disabled states are understandable
- modals open and close correctly
- keyboard tab order is logical
- progress tracking works
- final screen works
- no unrelated modules are broken

---

## Short Codex Prompt Pattern

Use this pattern for each phase:

```text
Implement Phase [number] only.

Use this file for details:
docs/module-1-quality-upgrade/[file-name].md

Scope: Module 1 only.

Do not redesign the module.
Do not touch unrelated modules.
Do not weaken TypeScript or accessibility settings.

Run npm run build.
Fix errors.
Commit and push with the specified commit message.
Summarize files changed, screens affected, and build result.
```

---

## Recommended Order of Codex Prompts

```text
Prompt 1: Implement Phase 1 only — contrast and accessibility.
Prompt 2: Implement Phase 2 only — visual learning supports.
Prompt 3: Implement Phase 3 only — learner experience polish.
Prompt 4: Verify deployed Vercel build and report remaining issues.
```

---

## Stop Conditions

Codex should stop and report before continuing if:

- build errors are unclear
- changes would affect multiple modules
- visual asset implementation requires a missing image file
- a fix requires redesigning the module
- a force push is suggested
- secrets or `.env` files appear in staging
