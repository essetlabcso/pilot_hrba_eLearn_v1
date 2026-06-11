# Module 2 Reflection and Portfolio Logic

## Portfolio principle

Module 2 should contribute one coherent portfolio output:

# My Everyday Rights Lens

This checkpoint helps the learner safely apply an everyday rights lens to one broad CSO issue or work area.

The portfolio is private by default, not graded, not certificate-linked, and not used to rank participants or CSOs.

## Module 2 portfolio moments

| Placement | Screen | Portfolio function | Required? | Privacy |
|---|---|---|---:|---|
| Section 2 | M2-S2-04 — Say It in Your Own Words | Save a plain-language explanation of human rights | Optional | Private |
| Section 3 | M2-S3-04 — Tool Activity: Everyday Rights Mapping | Complete safe rights mapping worksheet | Strongly encouraged | Private |
| Section 3 | M2-S3-05 — Add to My Portfolio: One Everyday Rights Issue | Save one broad issue and first rights dimension | Optional / encouraged | Private |
| Section 5 | M2-S5-05 — Add to My Portfolio: Rights Type Relevance | Save one rights type relevant to learner’s CSO work | Optional | Private |
| Section 6 | M2-S6-05 — Safe Use of Standards Checklist | Save safe-use review status if platform supports it | Optional | Private/system |
| Section 7 | M2-S7-03 — Rights Relevance Worksheet | Apply rights lens to one broad project/work area | Strongly encouraged | Private |
| Section 7 | M2-S7-06 — Add to My Portfolio: My Everyday Rights Lens | Final Module 2 portfolio checkpoint | Recommended; not certificate-linked | Private |

## Final checkpoint fields

| Field ID | Field label | Field type | Required? | Saved? | Notes |
|---|---|---|---:|---:|---|
| `m2_issue_area` | Broad CSO issue or work area | Single select + other broad area | Yes if saved | Yes | No names or cases |
| `m2_affected_groups` | Who may be affected? | Multi-select broad categories | Yes if saved | Yes | General groups only |
| `m2_rights_dimensions` | What rights dimensions may be involved? | Multi-select | Yes if saved | Yes | Plain-language rights dimensions |
| `m2_exclusion_barriers` | Who may be excluded or facing barriers? | Multi-select | Yes if saved | Yes | No identifying details |
| `m2_information_gaps` | What information is missing? | Multi-select | Yes if saved | Yes | Safe evidence focus |
| `m2_responsible_actors` | Who may have responsibility to respond? | Multi-select broad actor categories | Yes if saved | Yes | Do not name officials or institutions |
| `m2_improvement_action` | One safe improvement action | Single select | Yes if saved | Yes | Action-oriented |
| `m2_private_note` | Optional private note | Textarea | No | Yes, if entered | Private only; safety helper required |

## Field options

### Broad CSO issue or work area

- Access to services
- Community participation
- Feedback or complaint handling
- Inclusion of excluded groups
- Disability access
- Youth participation
- Women’s participation
- Information sharing
- Community dialogue
- Project planning or design
- MEAL, evidence, or learning
- Advocacy or public engagement
- Internal CSO practice
- Other broad area
- I am still reflecting

### Affected groups

- Community members using a service
- Women or girls
- Young people
- Persons with disabilities
- Older persons
- Displaced or mobile groups
- People in remote areas
- People facing language or information barriers
- Community volunteers
- CSO members or partners
- Other broad group
- Not sure yet

### Rights dimensions

- Dignity
- Equality and non-discrimination
- Participation
- Access to information
- Safety
- Accountability
- Access to services
- Voice in decisions
- Availability of support or services
- Accessibility of support or services
- Acceptability of support or services
- Quality of support or services
- Not sure yet

### Exclusion or barriers

- Physical access barriers
- Language barriers
- Information barriers
- Timing or transport barriers
- Cost barriers
- Disability-related barriers
- Gender-related barriers
- Age-related barriers
- Social norms or stigma
- Fear of speaking
- Low trust in feedback systems
- Lack of safe participation space
- Not sure yet

### Information gaps

- Who is affected?
- Who is not participating?
- Why are some groups excluded?
- What information do people already have?
- What do people understand or not understand?
- What feedback has been received?
- What responsible actors are involved?
- What services or decisions are affected?
- What risks need to be considered?
- Not sure yet

### Responsible actor categories

- Local public office
- Service provider
- School or health facility
- Local administration
- Community structure
- CSO or implementing partner
- Donor or funding partner
- Coordination platform
- Traditional or informal community actor
- Other responsible actor
- Not sure yet

### Safe improvement action

- Ask who is missing before planning the activity
- Improve accessibility of information
- Adjust meeting time, location, or format
- Create safer ways to give feedback
- Use simpler language when explaining decisions
- Check whether different groups experience the activity differently
- Map responsible actors before proposing solutions
- Add one rights-related question to project planning
- Review one service or activity using availability, accessibility, acceptability, and quality
- Discuss the issue internally using anonymized examples only
- I am still deciding

## Safety helper text

Use this before any optional text field:

> Keep this safe and general. Do not include names, real cases, active complaints, safeguarding details, legal disputes, political details, confidential documents, beneficiary lists, or raw organizational data.

## Save behavior

When the learner clicks **Save to my portfolio**, save:

- broad issue/work area;
- affected group categories;
- rights dimensions;
- exclusion/barrier categories;
- information gaps;
- responsible actor categories;
- selected improvement action;
- optional private note, if entered;
- module ID: `M02`;
- checkpoint title: `My Everyday Rights Lens`;
- timestamp.

Do not save:

- names;
- real case details;
- active complaints;
- safeguarding/protection details;
- confidential documents;
- beneficiary lists;
- political details;
- raw organizational data;
- uploaded files.

## Confirmation message

> Your Module 2 portfolio checkpoint has been saved privately. You can return to it later when you learn about HRBA principles, rights-holders, duty-bearers, project design, MEAL, and action planning.

## Deterministic synthesis logic

| Rule ID | Input | Output |
|---|---|---|
| `M2_SYN_01` | `m2_issue_area` | Add to “My everyday rights issue” |
| `M2_SYN_02` | `m2_rights_dimensions` | Add to “Rights dimensions I noticed” |
| `M2_SYN_03` | `m2_exclusion_barriers` | Add to “Possible barriers or exclusion risks” |
| `M2_SYN_04` | `m2_information_gaps` | Add to “What I still need to understand” |
| `M2_SYN_05` | `m2_responsible_actors` | Add to “Actors who may have responsibility” |
| `M2_SYN_06` | `m2_improvement_action` | Add to “One safe next improvement action” |
| `M2_SYN_07` | `m2_private_note` | Include only in private export; never in safe-share summary |
| `M2_SYN_08` | skipped fields | Show “Not saved yet — you can return later,” without penalty |

## Example generated portfolio summary

If the learner selects:

- issue area: community participation;
- rights dimensions: participation, access to information, accountability;
- barriers: language barriers, fear of speaking, timing barriers;
- information gaps: who is not participating, why some groups are excluded;
- improvement action: adjust meeting time, location, or format;

generate:

> In Module 2, I applied an everyday rights lens to community participation. I noticed that participation, access to information, and accountability may be involved. Possible barriers include language, fear of speaking, and meeting timing. I need to better understand who is not participating and why. One safe improvement action is to adjust the meeting time, location, or format.

## Carry-forward logic

| Later module | How Module 2 portfolio data is reused |
|---|---|
| Module 3 — HRBA Principles in Practice | Use selected rights dimensions and barriers when applying participation, inclusion, accountability, transparency, empowerment, and legality. |
| Module 4 — Rights-Holders, Duty-Bearers, Power, and Exclusion | Use affected group categories, barriers, and responsible actor categories to deepen rights-holder/duty-bearer analysis. |
| Module 5 — Applying HRBA in Project Design | Use issue area, information gaps, and improvement action as starting points for problem analysis and objective design. |
| Module 7 — HRBA in MEAL and Evidence Use | Use information gaps to design safer, more rights-aware evidence questions. |
| Module 9 — Course Closing and 90-Day Action Plan | Use selected improvement action as one possible 90-day HRBA action-plan input. |

## Visibility rules

| User type | Can see Module 2 portfolio content? |
|---|---|
| Participant | Yes, their own private portfolio |
| Course facilitator | No by default; only safe aggregate or consent-based summary if enabled |
| CSO focal person | No individual notes by default |
| Peer participant | No |
| Donor or external partner | No |
| Admin dashboard | Aggregate tags only, no private notes |
| AI service | No raw reflections, worksheet entries, or private notes |
