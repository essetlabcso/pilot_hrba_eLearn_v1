# Module 2 Interaction Logic

## Global rules

```text
Module 2 checks are formative only.
Certificate eligibility is not calculated in Module 2.
Certificate eligibility remains linked to the final course test with score >= 80%.

Do not expose to learners:
  screen IDs
  block IDs
  source IDs
  QA notes
  reviewer notes
  approval metadata
  implementation metadata

Do not request:
  real names
  real cases
  active complaints
  safeguarding/protection details
  beneficiary lists
  confidential documents
  political/civic-space-sensitive details
  legal claims about real disputes
  raw organizational data
  uploads
```

## Module completion logic

```text
Module 2 is complete when:
  M2-S1-03 safe learning reminder viewed
  M2-S3-03 rights dimension matching completed
  M2-S4-04 rights characteristics check completed
  M2-S5-03 rights type sorting completed
  M2-S6-05 safe standards checklist reviewed
  M2-S6-06 standards safe-use check completed
  M2-S7-05 scenario decision completed
  M2-S7-07 Module 2 quiz completed
  M2-S7-07 quiz feedback viewed
  M2-S7-08 summary viewed

Portfolio screens are recommended/private and should not affect certificate eligibility:
  M2-S2-04
  M2-S3-05
  M2-S5-05
  M2-S7-04
  M2-S7-06

Worksheet screens are strongly encouraged:
  M2-S3-04
  M2-S7-03
No worksheet should require uploads or sensitive examples.
```

## Safe Learning Reminder logic

```text
FOR M2-S1-03:
  show safe learning reminders
  require acknowledgement button only
  save safety_reminder_viewed = true
  do not collect personal data
```

## Portfolio micro-reflection logic

```text
FOR M2-S2-04:
  display prompt: "Human rights are..."
  optional_text_field = enabled
  show safety helper before text field

  IF learner saves:
    save m2_plain_language_rights_explanation to private portfolio
    mark m2_plain_language_explanation_saved = true

  IF learner skips:
    mark m2_plain_language_explanation_skipped = true
    allow continuation

  optional text is never required
  do not grade response
```

## Hotspot logic

```text
FOR M2-S3-02:
  labels:
    information
    participation
    accessibility
    equality
    safety_and_dignity
    accountability

  IF visual hotspot used:
    each label must be keyboard focusable
    each label opens text explanation
    provide full text alternative below or through accessible mode

  mark viewed when all labels opened OR full text alternative viewed
```

## Rights dimension matching logic

```text
FOR M2-S3-03:
  matching_items = 5

  correct_map:
    planning_after_decisions = participation
    language_not_understood = access_to_information
    inaccessible_venue = accessibility_of_services
    feedback_box_no_response = accountability
    excluded_groups_not_attending = equality_non_discrimination

  FOR each item:
    IF selected match == best match:
      show feedback starting with "Good choice."
    ELSE:
      show feedback starting with "Not quite."

  allow retry
  provide non-drag alternative:
    dropdown
    tap buttons
    keyboard-selectable categories

  mark m2_rights_dimension_matching_completed = true after all items completed and feedback viewed
```

## Flashcard logic

```text
FOR M2-S4-02:
  cards:
    universal
    inalienable
    indivisible
    interdependent

  require all cards opened OR full accessible text list visible
```

## Rights characteristics check logic

```text
FOR M2-S4-04:
  questions = 3
  certificate_effect = none

  FOR each response:
    IF best response:
      feedback starts with "That’s right."
    ELSE:
      feedback starts with "Not quite."

  mark m2_rights_characteristics_check_completed = true when all answers submitted and feedback viewed
```

## Rights type tabs logic

```text
FOR M2-S5-02:
  tabs:
    civil_rights
    political_rights
    economic_rights
    social_rights
    cultural_rights
    collective_rights

  require all tabs opened OR accessible list visible
  on mobile, tabs may convert to accordion
```

## Rights type sorting logic

```text
FOR M2-S5-03:
  sorting_items = 6

  correct_map:
    arbitrary_harm_or_unsafe_treatment = civil_rights
    local_decisions_participation = political_rights
    livelihood_opportunities = economic_rights
    quality_education = social_rights
    language_in_information_sessions = cultural_rights
    shared_local_resources = collective_rights

  FOR each item:
    IF selected category == correct category:
      show "Good choice."
    ELSE:
      show "Not quite."

  allow retry
  provide non-drag alternative
  mark m2_rights_type_sorting_completed = true after completion and feedback viewed
```

## Standards timeline logic

```text
FOR M2-S6-02:
  timeline_points:
    international_level
    african_level
    ethiopian_legal_policy_context
    organizational_standards
    community_accountability_practice

  require all points opened OR text alternative viewed
```

## Standards checklist logic

```text
FOR M2-S6-05:
  checklist is review-only
  learner checks items OR clicks "I have reviewed the checklist"
  save m2_standards_checklist_reviewed = true
```

## Standards safe-use check logic

```text
FOR M2-S6-06:
  best response = B

  IF selected == B:
    show feedback starting "That’s right."
  ELSE:
    show feedback starting "Not quite."

  mark m2_standards_safe_use_check_completed = true after feedback viewed

ALWAYS display:
  "This course supports learning and practical reflection. It does not provide legal advice."
```

## Process block logic

```text
FOR M2-S7-01:
  process_steps:
    identify_issue
    identify_rights_dimensions
    identify_affected_groups
    identify_responsible_actors
    identify_cso_contribution
    identify_learning_evidence

  require all steps opened OR accessible text list viewed
```

## Worksheet logic

```text
FOR M2-S3-04 and M2-S7-03:
  provide:
    downloadable accessible PDF
    in-platform field alternative

  no upload required
  no sensitive details requested
  save only if learner chooses to save in platform
  worksheets do not affect certificate
```

## Scenario decision logic

```text
FOR M2-S7-05:
  best response = B

  IF selected == B:
    show feedback starting "That’s right."
  ELSE:
    show feedback starting "Not quite."

  allow retry if platform supports it
  mark m2_scenario_decision_completed = true after feedback viewed
```

## My Everyday Rights Lens logic

```text
FOR M2-S7-06:
  structured fields:
    m2_issue_area
    m2_affected_groups
    m2_rights_dimensions
    m2_exclusion_barriers
    m2_information_gaps
    m2_responsible_actors
    m2_improvement_action
    m2_private_note optional

  IF learner saves:
    save structured fields to private portfolio
    mark m2_everyday_rights_lens_saved = true

  IF learner skips:
    mark m2_everyday_rights_lens_skipped = true
    allow continuation if platform policy allows

  optional note must never be required
```

## Module 2 quiz logic

```text
FOR M2-S7-07:
  quiz_type = formative
  question_count = 5
  certificate_effect = none
  pass_fail_language = prohibited

  FOR each question:
    learner selects one option
    show option-level feedback

  IF option == best_response:
    feedback starts with "That’s right."
  ELSE:
    feedback starts with "Not quite."

  WHEN all questions answered and feedback viewed:
    mark module_2_quiz_completed = true
    mark quiz_feedback_viewed = true
```
