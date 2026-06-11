# Module 1 Interaction Logic

## Global rules

```text
Module 1 checks are formative only.
Certificate eligibility is not calculated in Module 1.
Certificate eligibility remains linked to the final course test with score >= 80%.

Do not expose:
  screen IDs
  block IDs
  QA notes
  source notes
  internal reviewer notes
  hidden metadata

Do not request:
  real names
  real cases
  complaint records
  safeguarding information
  beneficiary lists
  confidential documents
  political details
  legal disputes
  raw organizational data
  uploads
```

## Required completion logic

```text
Module 1 is complete when:
  safe_learning_agreement_accepted == true
  orientation_check_completed == true
  scenario_completed == true
  sorting_activity_completed == true
  matching_activity_completed == true
  self_assessment_submitted == true
  priority_domains_selected == 2
  self_assessment_summary_saved == true
  module_1_quiz_completed == true
  quiz_feedback_viewed == true
```

## Safe Learning Agreement logic

```text
IF agreement_checkbox != checked:
  disable Accept and continue button

IF agreement_checkbox == checked:
  save safe_learning_agreement_accepted = true
  save accepted_at timestamp
  unlock next screen
```

## Orientation readiness logic

```text
FOR each orientation question:
  learner selects one option
  show option-level feedback
  allow retry

WHEN both questions answered and feedback viewed:
  mark orientation_check_completed = true
  do not save as certificate score
```

## Scenario decision logic

```text
present scenario with four options

IF selected_option == best_response:
  show feedback starting with "That’s right."
ELSE:
  show feedback starting with "Not quite."

allow retry
mark scenario_completed = true after feedback is viewed
```

## Sorting activity logic

```text
categories:
  charity_based
  needs_based
  service_delivery
  rights_based

correct_map:
  example_1 = charity_based
  example_2 = needs_based
  example_3 = service_delivery
  example_4 = rights_based

FOR each item:
  learner selects category
  IF selected category == correct category:
    show "Good choice" feedback
  ELSE:
    show "Not quite" feedback and allow retry

mark sorting_activity_completed = true after all items completed and feedback viewed
provide non-drag keyboard/tap alternative
```

## Matching activity logic

```text
correct_map:
  affected_community_members = rights_holders
  public_office = duty_bearer
  lomi_cso = cso_support_accountability_actor
  local_influencers = stakeholder_or_influencer

FOR each actor:
  learner selects role
  IF selected role == correct role:
    show "That’s right" feedback
  ELSE:
    show "Not quite" feedback and allow retry

mark matching_activity_completed = true after all matches completed and feedback viewed
provide non-drag keyboard/tap alternative
```

## Portfolio setup logic

```text
fields:
  participant_role_area = optional single select
  course_improvement_focus = optional multi-select up to 3
  starting_confidence = optional scale 1-5
  private_learning_goal = optional text

BEFORE optional note:
  show safety helper text

IF learner saves:
  save fields to private portfolio
  mark portfolio_setup_saved = true

IF learner skips:
  mark portfolio_setup_skipped = true
  allow continuation

optional note must never be required
```

## Self-assessment logic

```text
FOR Q1-Q16:
  accepted values = 0, 1, 2, 3, N/A
  all questions must be answered
  N/A is allowed and excluded from numeric score

total_score = sum numeric values
not_sure_count = count N/A

domain_scores:
  participation = Q1 + Q2
  non_discrimination_equality = Q3 + Q4
  accountability = Q5 + Q6
  transparency = Q7 + Q8
  empowerment = Q9 + Q10
  legality_rule_of_law = Q11 + Q12
  human_rights_standards = Q13 + Q14
  capacity_to_integrate_hrba = Q15 + Q16

IF not_sure_count > 4:
  confidence_flag = "low confidence"
ELSE:
  confidence_flag = "standard"

IF total_score <= 15:
  result_band = "Starting point"
ELSE IF total_score <= 27:
  result_band = "Emerging practice"
ELSE IF total_score <= 39:
  result_band = "Progressing"
ELSE:
  result_band = "Embedding HRBA"
```

## Priority selection logic

```text
suggest two lowest-scoring domains
allow learner to choose any two priority domains
require exactly two selections before continuing

save selected_priority_domains to private portfolio
```

## Self-assessment portfolio save logic

```text
save:
  assessment_scope
  role_context_band
  completion_mode
  result_band
  total_score
  domain_scores
  not_sure_count
  confidence_flag
  selected_priority_domains
  optional_private_note
  module_id = M1
  timestamp

do_not_save:
  names
  case details
  complaint records
  safeguarding information
  confidential documents
  uploaded files
  political details
  beneficiary lists
```

## Module 1 quiz logic

```text
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
  mark module_1_quiz_completed = true
  mark quiz_feedback_viewed = true
```
