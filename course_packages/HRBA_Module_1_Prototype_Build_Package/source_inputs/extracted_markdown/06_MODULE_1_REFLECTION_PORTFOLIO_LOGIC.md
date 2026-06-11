# Module 1 Reflection and HRBA Learning Portfolio Logic

## Portfolio principle

Use the learner-facing language **“Add to my HRBA Learning Portfolio”** instead of vague “reflection” language.

The portfolio is private by default, not graded, not certificate-linked, and not used to rank participants or CSOs.

## Module 1 portfolio moments

| Placement | Screen | Purpose |
|---|---|---|
| Section 1 | M1-S1-06A — Build Your HRBA Learning Portfolio | Introduce value and privacy |
| Section 1 | M1-S1-06B — Meet Ayele: How the Portfolio Helps | Demonstrate safe use |
| Section 2 | M1-S2-05 — Set Up My HRBA Learning Portfolio | Capture broad learning focus |
| Section 6 | M1-S6-09 — Save My HRBA Starting Point | Save survey summary privately |
| Section 7 | M1-S7-01 — Add to My HRBA Learning Portfolio | Save Module 1 HRBA shift checkpoint |

## Portfolio setup fields

| Field | Type | Question | Required? | Saved? | Visibility |
|---|---|---|---:|---:|---|
| participant_role_area | Single select | Which area best describes your role in CSO work? | No | Yes if selected | Private |
| course_improvement_focus | Multi-select up to 3 | What do you want this course to help you improve? | No | Yes if selected | Private |
| starting_confidence | Scale 1–5 | How confident do you currently feel applying HRBA in everyday CSO work? | No | Yes if selected | Private |
| private_learning_goal | Optional text | Write one broad learning goal for this course. | No | Yes if entered | Private only |

## Portfolio setup options

### Role area options

- Project or program work
- MEAL, accountability, or learning
- Advocacy or community engagement
- CSO leadership or management
- Safeguarding, protection, or feedback systems
- Volunteer or field/community-facing work
- Other CSO role
- I prefer not to say

### Improvement focus options

- Participation
- Inclusion
- Accountability
- Feedback loops
- Safer evidence use
- Project design
- Implementation
- Advocacy
- Internal CSO practice
- I am still exploring

### Confidence scale

1. I am just beginning
2. I have basic awareness
3. I can apply some ideas
4. I can apply HRBA in several parts of my work
5. I can support others to apply HRBA

## Self-assessment portfolio save

Save:

- assessment scope;
- role/context band;
- completion mode;
- result band;
- total score;
- domain scores;
- Not sure count;
- confidence flag;
- selected priority domains;
- optional safe private note;
- timestamp;
- module ID.

Do not save:

- names;
- real cases;
- complaint records;
- safeguarding information;
- beneficiary lists;
- confidential documents;
- political details;
- uploaded files.

## Module 1 checkpoint fields

| Field | Type | Question | Required? | Saved? | Visibility |
|---|---|---|---:|---:|---|
| biggest_shift | Single select | Which HRBA shift stood out most for you? | Recommended | Yes if selected | Private |
| where_shift_matters | Multi-select | Where could this shift matter in your CSO’s work? | Recommended | Yes if selected | Private |
| starting_practice_note | Optional text | Write one safe, broad note about where your CSO could apply this shift. | No | Yes if entered | Private only |

### Biggest shift options

- From beneficiaries to rights-holders
- From activities to meaningful change
- From service delivery alone to empowerment and accountability
- From general participation to meaningful and inclusive participation
- From needs-only thinking to rights-aware practice
- I am still reflecting on this

### Where shift matters options

- Project planning or design
- Community engagement
- Service delivery
- MEAL, feedback, or learning
- Advocacy or dialogue
- Accountability and complaint handling
- Internal CSO practice
- Partnerships or coordination
- Volunteer or field practice

## Safe optional note helper text

Do not include names, real cases, complaints, safeguarding details, legal disputes, political details, confidential documents, or raw data.

## Deterministic portfolio synthesis rules

| Rule ID | Input | Output |
|---|---|---|
| M1_SYN_01 | biggest_shift | Add selected shift to “My practice shifts” |
| M1_SYN_02 | where_shift_matters | Add selected areas to “Where I can apply HRBA” |
| M1_SYN_03 | self-assessment priority domains | Add to “My HRBA starting-point priorities” |
| M1_SYN_04 | improvement focus tags | Count toward “Strongest HRBA learning themes” |
| M1_SYN_05 | optional notes | Include only in private portfolio export, never in safe share summary |
| M1_SYN_06 | skipped checkpoint | Show “Not saved yet — you can return later,” without penalty |

## Example deterministic synthesis

If the participant selects:

- biggest shift: From beneficiaries to rights-holders
- where shift matters: Project planning or design

Generate:

> One early shift in my HRBA learning was moving from seeing communities only as beneficiaries toward recognizing people as rights-holders. I want to apply this especially in project planning and design.

## Visibility rules

| User type | Can see Module 1 portfolio content? |
|---|---|
| Participant | Yes, their own private portfolio only |
| Course facilitator | No by default |
| CSO focal person | No by default |
| Peer participant | No |
| Donor or external partner | No |
| Admin dashboard | Aggregate tags only, no private notes |
| AI service | No raw reflections or proof |
