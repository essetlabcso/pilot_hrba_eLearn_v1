# Module 4 Enhanced Replacement — Batch 0 Architecture

Date: 2026-07-25

Branch: `feature/hrba-full-course-update-20260725`

Accepted parent: `7f6bad961b3d94c4ded5fa9ad1f066a73a6dfae3`

## Batch boundary

Batch 0 establishes typed state, migration, assets, accessible component
foundations, and behavioral tests. It does not import the enhanced components
from the active Module 4 renderer and does not change any learner-facing
Module 4 route.

## Source authority

The approved hierarchy is:

1. approved Module 4 implementation-readiness report and authority decisions;
2. `Comparative assessment of Module 4 enhancement.docx`;
3. the four segmented enhanced PDFs in `enhance m4`;
4. the 60 individual mockups in `m4_screen_mockup` for Screens 2–13;
5. approved visual assets and clean variants, subject to semantic HTML/SVG;
6. accepted identifiers, routes, state isolation, Hub, completion, and
   certificate contracts in the application;
7. current `m4_screen_*.pdf` files for comparison only.

The `idea` folder is superseded.

The comparative DOCX is retained at
`D:\Resources_CSO_CAPACITY\00 Current HRBA\Module 4\enhance m4\Comparative
assessment of Module 4 enhancement.docx` (SHA-256
`075D73468905F6C03C40C824C5535AAF1FB8B9DEE0C0CE16553558B1C12FDB6F`).
It was read in full (525 paragraphs and five tables) and visually verified
through a 24-page native Word/PDF render.

Its governing conclusions are reflected here:

- Screens 2–13 are a major, versioned rebuild rather than a cosmetic revision;
- existing Module 4 progress must not be blindly mapped;
- provenance, selective review-required invalidation, and learner-text
  protection are required for portfolio integrity;
- runtime images require WebP optimization, alt text, and no essential
  image-embedded text;
- responsive, keyboard, screen-reader, cognitive-load, and image-weight
  validation are required;
- the supplied enhanced sources do not establish Screens 14–15, so they need
  separate approval before implementation.

## Canonical identifiers

Batch 0 preserves:

- module ID `module_04_implementation`;
- cover ID `M4-PLAYER-00`;
- screen IDs `M4-S1-01` through `M4-S1-14`;
- `/module-4/cover`;
- `/module-4/screen-4-1` through `/module-4/screen-4-14`;
- completion ID `M4-S1-14`.

## State location

The one active enhanced namespace is:

`practiceCheckState.module4Enhanced`

It contains:

- `schemaVersion`;
- `contentRevision`;
- an idempotent migration marker;
- historical-completion and synthetic-reset metadata;
- an optional read-only legacy-note snapshot;
- typed carry-forward fields;
- per-field provenance and revisions;
- dependency revision markers;
- learner-edited and review-required flags;
- per-screen final-gate state;
- enhanced completion state.

No legacy answer is translated into enhanced completion.

## Dependency policy

Changing an upstream field:

- changes only that field;
- increments its revision;
- records the revision on affected downstream fields;
- preserves downstream values;
- preserves learner-edited status;
- marks a populated dependent field for review;
- never silently regenerates the Implementation Decision and Follow-Up Note.

The dependency graph runs from workstream selection through evidence,
participation, accountability, roles, support diagnosis, response pathway,
minimum information, and the final note.

## Progress policy

`recordModule4EnhancedScreenCompletion` is the only Batch 0 foundation that
writes enhanced screen progress. It returns the existing state unchanged
until the screen's final gate is satisfied.

Draft choices, validation checks, feedback views, and intermediate stage
changes must not write to `screenProgress`.

## Migration policy

Default migration:

- adds the versioned marker;
- creates empty enhanced state;
- preserves all module progress and completion;
- preserves historical completion evidence;
- captures an available generic legacy note as a read-only snapshot;
- does not count the snapshot toward enhanced completion.

Explicit synthetic internal-test reset:

- removes obsolete `module4*` practice keys other than `module4Enhanced`;
- clears only Module 4 screen progress;
- removes only Module 4 completion;
- preserves unrelated module state and progress.

The migration is idempotent.

## Asset policy

The normalized runtime folder is:

`public/assets/hrba/modules/module-4-enhanced`

It contains 39 selected WebPs. Eight approved PNG variants were converted to
optimized WebP. Existing approved WebPs were copied under normalized runtime
names. ZIPs, source PNG duplicates, superseded idea files, the text-heavy
Screen 4 diagrams, and the text-heavy Screen 10 progress image are excluded.

Screen 4's Everyday Rights Lens and Screen 10's progress summary are explicitly
reserved for accessible SVG/HTML implementation.

The manifest records dimensions, alt text, intended role, mobile treatment,
focal point, incidental-text status, and semantic-overlay requirements.

## Accessibility foundation

The `.m4-enhanced-*` foundation provides:

- a single logical reading order;
- semantic main/header/aside/section regions;
- an ordered stage list with `aria-current`;
- polite status announcements;
- visible focus;
- 44 CSS-pixel minimum controls;
- desktop-to-single-column reflow;
- 390 px and 320 px-safe action stacking;
- reduced-motion handling;
- forced-colour handling;
- no horizontal-scrolling dependency.

It is not yet reachable by learners.
