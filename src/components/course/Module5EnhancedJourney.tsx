import { useEffect, useMemo, useRef, useState } from 'react';
import type { LearningState } from '../../state/learningState';
import {
  MODULE5_ID,
  MODULE5_SCREEN_ROUTES,
  buildModule5DownloadText,
  containsPotentiallySensitiveModule5Text,
  isModule5OutputReady,
} from '../../data/module5/module5EnhancedModel';
import './module5-enhanced.css';

type ChangeState = (updater: (previous: LearningState) => LearningState) => void;
type Props = { screenId: string; state: LearningState; onChangeState: ChangeState };
type Choice = { id: string; label: string; feedback: string; strong?: boolean };
type Task = { id: string; prompt: string; choices: Choice[]; multiple?: boolean; required?: number };
type ScreenSpec = {
  number: number;
  id: string;
  key: string;
  next: string;
  stage: string;
  title: string;
  explanation: string;
  example: string;
  learn: Array<[string, string]>;
  evidence?: Array<[string, string]>;
  tasks: Task[];
  output: string;
  safety: string;
};

const safeEntry = 'Use only fictional Jiru Amba information or generalized CSO practice. Do not enter real names, exact locations, medical or disability details, survivor information, identifiable complaints, political accusations, contact details, or confidential records.';
const choice = (id: string, label: string, feedback: string, strong = false): Choice => ({ id, label, feedback, strong });

const specs: Record<string, ScreenSpec> = {
  'M5-R01': {
    number: 2, id: 'M5-R01', key: 'm5_s02', next: 'M5-R02', stage: 'Recognise the evidence gap',
    title: 'Why HRBA Matters in MEAL',
    explanation: 'Activity totals are useful, but they cannot show by themselves who was excluded, whether participation influenced a decision, or whether feedback received a response.',
    example: 'Jiru Amba reports six meetings, 240 attendances, one feedback box and four positive stories. The figures show delivery, not equal access, influence, safety or accountability.',
    learn: [['Look beyond totals', 'Ask who participated, who was missing, and which barriers shaped access.'], ['Connect evidence to action', 'Collect evidence because it can inform a responsible decision, referral, adaptation or account-back.']],
    evidence: [['Jiru Amba Early Progress Report', '6 consultation meetings completed; 240 attendances recorded; 1 feedback box installed; 4 positive stories collected; monthly report submitted on time.'], ['What HRBA adds to MEAL', 'Look beyond completed activities to access, participation, influence, safety, responsibility, change and response.']],
    tasks: [{ id: 'gap', prompt: 'Choose the three questions that most affect whether Awra can call the work successful.', multiple: true, required: 3, choices: [
      choice('missing', 'Who was missing, and what barriers affected access?', 'Strong: totals cannot reveal exclusion or barriers.', true),
      choice('influence', 'Did people’s views influence a decision?', 'Strong: meaningful participation includes influence.', true),
      choice('response', 'What happened after feedback was received?', 'Strong: accountability requires response, referral or explanation.', true),
      choice('stories', 'Should Awra collect more positive stories?', 'More stories do not resolve missing evidence about exclusion or response.'),
      choice('wording', 'Should the report use stronger success language?', 'Stronger language cannot replace evidence.'),
      choice('target', 'Should Awra increase the total attendance target?', 'A higher total still cannot show who was excluded, whether people influenced decisions or whether feedback received a response.'),
    ] }],
    output: 'Evidence-gap statement', safety: safeEntry,
  },
  'M5-R02': {
    number: 3, id: 'M5-R02', key: 'm5_s03', next: 'M5-R03', stage: 'Choose a safe route',
    title: 'Learning Objectives and MEAL Roadmap',
    explanation: 'The journey moves through planning, monitoring, safe evidence, interpretation, accountability, learning and adaptation. At every stage, use four moves: see, protect, act and account.',
    example: 'You may stay with the fictional Jiru Amba case or apply the same questions to a generalized CSO activity. Both routes avoid personal or confidential information.',
    learn: [['See', 'Notice who is reached, excluded or influential.'], ['Protect', 'Minimize data and prevent exposure, retaliation and harm.'], ['Act', 'Match evidence to realistic responsibility.'], ['Account', 'Explain what was heard, decided and done.']],
    evidence: [['Six-stage MEAL roadmap', 'Plan the MEAL approach → monitor progress and participation → collect and manage evidence safely → analyse and evaluate change → respond and remain accountable → learn, adapt and report.'], ['What you will build', 'An HRBA MEAL Framework and Safe Data Plan; and an Evidence-to-Action Dashboard with a 90-Day Learning and Account-Back Plan.']],
    tasks: [{ id: 'route', prompt: 'Choose your practice route.', choices: [
      choice('jiru', 'Jiru Amba fictional case', 'Recommended: all examples are fictional and safe for practice.', true),
      choice('general', 'My generalized CSO activity', 'Suitable when you use no names, precise locations or sensitive details.', true),
    ] }],
    output: 'Safe practice route', safety: safeEntry,
  },
  'M5-R03': {
    number: 4, id: 'M5-R03', key: 'm5_s04', next: 'M5-R04', stage: 'Apply the HRBA lens',
    title: 'The MEAL Cycle Through an HRBA Lens',
    explanation: 'HRBA strengthens familiar MEAL practice: monitoring sees access and barriers; evaluation examines change and difference; accountability makes response visible; learning turns evidence into adaptation.',
    example: 'A participation barrier is monitored, interpreted with affected people, addressed through a timing change, and explained back through an accessible route.',
    learn: [['Monitoring', 'Track progress, participation, barriers and emerging risk.'], ['Evaluation', 'Examine what changed, for whom and why.'], ['Accountability', 'Receive, respond, refer and account back.'], ['Learning', 'Continue, adapt, consult, refer or pause.']],
    tasks: [
      { id: 'track', prompt: 'Track who could not reach a consultation.', choices: [choice('monitoring', 'Monitoring', 'Correct: this tracks access during implementation.', true), choice('evaluation', 'Evaluation', 'Evaluation may use it later, but routine tracking comes first.')] },
      { id: 'sustain', prompt: 'Examine whether improved water access lasted.', choices: [choice('evaluation', 'Evaluation', 'Correct: this examines sustained change.', true), choice('accountability', 'Accountability', 'Accountability concerns response and explanation.')] },
      { id: 'respond', prompt: 'Record whether feedback received a response.', choices: [choice('accountability', 'Accountability', 'Correct: this tracks responsibility, response and account-back.', true), choice('evaluation', 'Evaluation only', 'Evaluation may review the pattern, but closing the response loop is accountability.')] },
      { id: 'adapt', prompt: 'Change meeting timing after reviewing barriers.', choices: [choice('learning', 'Learning and adaptation', 'Correct: evidence is changing practice.', true), choice('monitoring', 'Monitoring only', 'Monitoring found the barrier; adaptation is the next step.')] },
    ],
    output: 'HRBA MEAL cycle decisions', safety: 'If evidence suggests harm, retaliation or safeguarding risk, do not investigate through a learning exercise. Pause, protect confidentiality and use the approved specialist pathway.',
  },
  'M5-R04': {
    number: 5, id: 'M5-R04', key: 'm5_s05', next: 'M5-R05', stage: 'Plan what matters',
    title: 'Planning MEAL: Define Results, Success and Learning Questions',
    explanation: 'Begin with the change that matters, whose rights are involved, and the decision the evidence should support. A coherent chain links result, success signs and a usable MEAL question.',
    example: 'Result: people facing barriers participate and influence follow-up. Success signs include accessible information, participation, influence and response.',
    learn: [['Result', 'Describe the meaningful change, not only delivery.'], ['Success signs', 'Include what rights-holders and responsible actors would notice.'], ['Learning question', 'Ask a question that can guide a decision.']],
    tasks: [
      { id: 'result', prompt: 'Choose the strongest priority result.', choices: [choice('meaningful', 'People facing barriers can participate and influence follow-up decisions.', 'Strong: this joins access and influence.', true), choice('meetings', 'All planned meetings take place.', 'This is an output, not yet a rights-sensitive result.')] },
      { id: 'success', prompt: 'Choose three rights-holder success signs.', multiple: true, required: 3, choices: [choice('information', 'Information arrives early enough and in accessible forms.', 'Strong: this makes access visible.', true), choice('barriers', 'People facing barriers can participate.', 'Strong: this tests non-discrimination in practice.', true), choice('response', 'People receive a response or account-back update.', 'Strong: this connects participation to accountability.', true), choice('schedule', 'Meetings take place as scheduled.', 'Useful project performance evidence, but insufficient as a rights-holder success sign.')] },
      { id: 'question', prompt: 'Choose the strongest MEAL question.', choices: [choice('groups', 'Which broad groups participated, what barriers remained, and how did input influence follow-up?', 'Strong: it examines difference and decision use.', true), choice('count', 'How many attendances were recorded?', 'This cannot explain unequal access or influence.')] },
    ],
    output: 'Priority result and learning question', safety: safeEntry,
  },
  'M5-R05': {
    number: 6, id: 'M5-R05', key: 'm5_s06', next: 'M5-R06', stage: 'Build decision-useful indicators',
    title: 'Monitoring: Build Rights-Based Indicators',
    explanation: 'A useful indicator connects a decision, rights question, measure, safe source and action trigger. Combine output, process and outcome evidence where it improves the decision.',
    example: 'Instead of attendance alone: number and percentage of participants using broad voluntary access categories who say their views influenced a decision, using an anonymous pulse question and decision record.',
    learn: [['Output', 'What was delivered.'], ['Process', 'How access, participation and accountability were supported.'], ['Outcome', 'What changed for people, practices or institutions.']],
    tasks: [
      { id: 'indicator', prompt: 'Choose the safer, stronger indicator.', choices: [choice('influence', 'Percentage in broad voluntary access categories reporting influence on a follow-up decision.', 'Strong: it combines reach, difference and influence.', true), choice('names', 'Named list with diagnoses and complaint histories.', 'Unsafe and unnecessary: do not collect this.'), choice('total', 'Total attendance only.', 'Useful output evidence, but insufficient alone.')] },
      { id: 'trigger', prompt: 'Choose an action trigger.', choices: [choice('adapt', 'If access or influence is lower, adapt timing, communication, support or facilitation.', 'Strong: the evidence leads to a realistic action.', true), choice('hide', 'Remove low results from the dashboard.', 'Hiding results undermines learning and accountability.')] },
      { id: 'typeOutput', prompt: '“Number of consultation meetings held” is which indicator type?', choices: [choice('output', 'Activity or output', 'Correct: it shows what was delivered.', true), choice('outcome', 'Outcome or change', 'It does not yet show what changed.')] },
      { id: 'typeProcess', prompt: '“Percentage of consultations using accessible information and more than one participation route” is which type?', choices: [choice('process', 'Process', 'Correct: it shows how the work was carried out.', true), choice('output', 'Activity or output only', 'It goes beyond delivery to process quality.')] },
      { id: 'typeOutcome', prompt: '“Percentage reporting that their views influenced a decision” is which type?', choices: [choice('outcome', 'Outcome or change', 'Correct: it examines influence and change.', true), choice('process', 'Process only', 'The measure concerns a reported result of participation.')] },
    ],
    output: 'Rights-based indicator and action trigger', safety: 'Gender- and disability-related information must be voluntary, broadly described, necessary for a decision and possible to protect. Never request a diagnosis or intimate detail here.',
  },
  'M5-R06': {
    number: 7, id: 'M5-R06', key: 'm5_s07', next: 'M5-R07', stage: 'Choose a proportionate evidence mix',
    title: 'Data Collection: Choose the Right Methods',
    explanation: 'Choose methods for the question, people, context and decision. Balance access, burden, literacy, language, confidentiality, facilitation capacity and analysis.',
    example: 'A monitoring log can compare information routes; a short anonymous pulse question adds participant experience. Neither requires names.',
    learn: [['Fit', 'Match method to question and decision.'], ['Access', 'Offer realistic language, format and participation adaptations.'], ['Burden', 'Collect only what will be used and can be protected.']],
    tasks: [
      { id: 'routes', prompt: 'How should Awra check information routes and timeliness?', multiple: true, required: 2, choices: [choice('log', 'General monitoring log', 'Strong for comparable route and timing records.', true), choice('pulse', 'Anonymous short pulse question', 'Strong for participant experience.', true), choice('story', 'One positive story only', 'A story cannot provide comparable reach evidence.')] },
      { id: 'access', prompt: 'How should Awra understand why service access remained difficult?', multiple: true, required: 2, choices: [choice('observe', 'Accessibility observation checklist', 'Strong for physical and practical conditions.', true), choice('discussion', 'Accessible facilitated discussion', 'Strong for reasons and experience when safely facilitated.', true), choice('attendance', 'Attendance record only', 'Attendance cannot explain why access was difficult.')] },
      { id: 'scorecard', prompt: 'How should community and service actors assess accessibility and quality together?', multiple: true, required: 2, choices: [choice('scorecard', 'Community Scorecard', 'Strong for comparing perspectives and agreeing corrective action.', true), choice('observation', 'Observation checklist', 'Strong for checking service and access conditions.', true), choice('story', 'One positive story only', 'A single story cannot compare perspectives or conditions.')] },
    ],
    output: 'Proportionate mixed-method evidence plan', safety: safeEntry,
  },
  'M5-R07': {
    number: 8, id: 'M5-R07', key: 'm5_s08', next: 'M5-R08', stage: 'Protect people and minimize data',
    title: 'Safe Disaggregation and Ethical Data Collection',
    explanation: 'Disaggregate only when the category is necessary, voluntary, understood, broad enough to protect people and linked to action. Small groups and combined categories can make people identifiable.',
    example: 'Awra uses optional broad age, gender and access-requirement categories, suppresses very small cells, limits access and deletes raw data on schedule.',
    learn: [['Data minimization', 'Collect the least detail needed for the decision.'], ['Informed participation', 'Explain purpose, choice, use, access and limits.'], ['Protection', 'Use aggregation, restricted access, retention limits and safe referral.']],
    tasks: [
      { id: 'category', prompt: 'Choose the safest useful disaggregation decision.', choices: [choice('broad', 'Optional broad categories, only where an action is possible.', 'Strong: proportionate and decision-linked.', true), choice('diagnosis', 'Exact diagnoses linked to names.', 'Unsafe and unnecessary for this task.')] },
      { id: 'small', prompt: 'A table has a cell with one person. What should Awra do?', choices: [choice('suppress', 'Suppress or combine the cell and explain the limitation.', 'Strong: reduces re-identification risk.', true), choice('publish', 'Publish it because no name appears.', 'A person may still be identifiable from context.')] },
      { id: 'quote', prompt: 'A donor asks for a named quote and photograph.', choices: [choice('protect', 'Use a generalized theme unless freely informed publication consent and safety checks exist.', 'Strong: participation consent is not automatic publication consent.', true), choice('publish', 'Publish because the person already participated.', 'Participation does not remove exposure risk.')] },
      { id: 'complaint', prompt: 'Detailed complaint information appears in a monitoring spreadsheet.', choices: [choice('refer', 'Remove it from ordinary MEAL data and use the approved protected pathway.', 'Strong: complaint and safeguarding records require restricted handling.', true), choice('dashboard', 'Keep it for the learning dashboard.', 'This could expose the person and the concern.')] },
      { id: 'contact', prompt: 'A contact list identifies people who did not attend.', choices: [choice('doNotCollect', 'Do not collect it for this learning purpose; use a generalized barrier question instead.', 'Strong: non-attendance does not justify an identifying list.', true), choice('collect', 'Collect names and contact details for follow-up.', 'This is unnecessary and may create risk.')] },
      { id: 'pulse', prompt: 'An anonymous accessibility pulse question is proposed.', choices: [choice('collect', 'Collect only the necessary voluntary response and explain its use.', 'Strong: this is proportionate when linked to an access decision.', true), choice('identify', 'Add names so each answer can be verified.', 'Verification does not justify unnecessary identification.')] },
    ],
    output: 'Safe disaggregation and data-minimization rules', safety: 'Do not record sensitive incidents, identifiable complaints or safeguarding disclosures in this learning activity. Follow the approved confidential pathway and need-to-know access rules.',
  },
  'M5-R08': {
    number: 9, id: 'M5-R08', key: 'm5_s09', next: 'M5-R09', stage: 'Organize, clean and protect',
    title: 'Data Management: Organize, Clean and Protect Evidence',
    explanation: 'Evidence must be organized before it can be interpreted. Cleaning data does not mean changing people’s answers. It means checking errors, documenting uncertainty and protecting information that should not be exposed.',
    example: 'Awra reviews a small fictional participation table. It contains a duplicate, a missing response, inconsistent category labels, a risky small category, an unnecessary identifier and a feedback item that belongs in a protected pathway.',
    learn: [['Transparent cleaning', 'Document duplicate and category rules; never invent missing information.'], ['Safe data flow', 'Separate identifiers, complaints and safeguarding information from ordinary learning data.'], ['Honest limitations', 'A cleaned table can still contain bias and cannot represent people who did not attend.']],
    evidence: [
      ['Record 03 and Record 07', 'The participation route, meeting and barrier fields are identical: flag the duplicate and retain one record under a documented rule.'],
      ['Remote / Remote area', 'Standardize these as one broad category and record the change.'],
      ['Missing influence response', 'Keep the value as missing; do not infer yes or no.'],
      ['Name, phone and sensitive feedback', 'Remove the identifier and isolate the feedback item in the approved restricted pathway.'],
      ['One-person access category', 'Suppress or combine the result before reporting.'],
    ],
    tasks: [
      { id: 'duplicate', prompt: 'How should Awra handle the duplicate?', choices: [choice('flag', 'Flag it, apply a documented rule and retain one record.', 'Strong: duplicate removal needs a transparent rule.', true), choice('both', 'Keep both because two records look more complete.', 'This would inflate the evidence.')] },
      { id: 'category', prompt: 'How should “Remote” and “Remote area” be handled?', choices: [choice('standardize', 'Standardize them as one broad category and document the change.', 'Strong: categories become comparable without rewriting experience.', true), choice('separate', 'Treat them as different groups without checking.', 'This creates a false difference.')] },
      { id: 'missing', prompt: 'What should happen to the missing influence response?', choices: [choice('retain', 'Mark it as missing and state the limitation.', 'Strong: missing data must not be invented.', true), choice('guess', 'Infer the most likely answer.', 'Guessing creates false certainty.')] },
      { id: 'identifier', prompt: 'What should happen to the unnecessary name or phone number?', choices: [choice('remove', 'Remove it from the learning table and keep any operational record only in an approved restricted system.', 'Strong: ordinary analysis does not need the identifier.', true), choice('keep', 'Keep it in case a reviewer wants to contact the person.', 'This creates unnecessary exposure.')] },
      { id: 'smallCell', prompt: 'How should the one-person category be reported?', choices: [choice('suppress', 'Suppress or combine it and explain the limitation.', 'Strong: this reduces re-identification risk.', true), choice('publish', 'Publish it because no name is shown.', 'Context may still identify the person.')] },
      { id: 'access', prompt: 'Who needs access to the cleaned learning table?', choices: [choice('need', 'Only roles that need it for the agreed analysis and decision.', 'Strong: access follows purpose and need to know.', true), choice('all', 'Everyone working on the project.', 'Broad access is not necessary.')] },
      { id: 'storage', prompt: 'Where should protected information be kept?', choices: [choice('restricted', 'In the approved restricted system, separate from the learning dataset.', 'Strong: sensitive pathways stay separate.', true), choice('dashboard', 'In the dashboard so the whole team can monitor it.', 'Dashboards must not expose protected information.')] },
      { id: 'retention', prompt: 'When should the working file be reviewed or deleted?', choices: [choice('schedule', 'At the agreed retention review point, keeping only what remains necessary.', 'Strong: retention must be purposeful and time-bound.', true), choice('forever', 'Keep every version indefinitely.', 'Indefinite retention increases risk.')] },
      { id: 'limitation', prompt: 'Choose the accurate evidence limitation.', choices: [choice('participants', 'The table describes people who participated. It cannot show the experience of everyone who did not attend.', 'Strong: the limitation is visible and specific.', true), choice('everyone', 'The cleaned table represents the whole community.', 'Cleaning does not remove participation bias.')] },
    ],
    output: 'Evidence ownership, access, storage, retention and limitation rules', safety: 'Do not retain names, phone numbers, identifiable complaints or safeguarding information in an ordinary learning table. Isolate protected records and follow approved access and retention rules.',
  },
  'M5-R09': {
    number: 10, id: 'M5-R09', key: 'm5_s10', next: 'M5-R10', stage: 'Combine numbers, feedback and stories',
    title: 'Analysis: Combine Numbers, Feedback and Stories',
    explanation: 'Numbers show patterns. Comments and stories can help explain why those patterns exist. Strong analysis uses both without treating one person’s experience as proof for everyone.',
    example: 'Awra compares participation and feedback-response summaries with six fictional comments, groups controlled tags into themes, retains contradiction and writes one bounded mixed-evidence statement.',
    learn: [['Tag and group', 'Assign one or two short tags, then group related tags into a broader theme.'], ['Compare perspectives', 'Check whether groups describe an issue differently and retain unusual or contradictory evidence.'], ['Interpret safely', 'Use a non-identifying summary and invite affected people to review it through accessible, low-risk routes.']],
    evidence: [
      ['Participation summary', 'Attendance increased and timing changed, but influence and missing perspectives remain uncertain.'],
      ['Feedback-response summary', 'Some items were answered or referred; other items remain open or overdue.'],
      ['Fictional comments', 'Information arrived late; the new day helped market vendors; a path remains difficult; decision influence is unclear; one feedback item received no response; an audio notice improved access.'],
    ],
    tasks: [
      { id: 'comment1', prompt: '“I heard about the meeting after it had already taken place.” Choose the strongest tag.', choices: [choice('information', 'Information', 'Strong: the comment concerns timely access to information.', true), choice('respect', 'Respect', 'Respect may matter, but it is not the clearest tag here.')] },
      { id: 'comment2', prompt: '“The new day was easier for market vendors.” Choose the strongest tag.', choices: [choice('timing', 'Timing', 'Strong: the changed timing improved practical access.', true), choice('distance', 'Distance', 'The comment does not describe distance.')] },
      { id: 'comment3', prompt: '“The water point is working, but the path remains difficult for me.” Choose the strongest tag.', choices: [choice('access', 'Disability access', 'Strong: service reliability improved while physical accessibility remains unequal.', true), choice('reliable', 'Service reliability only', 'This misses the contradictory access evidence.')] },
      { id: 'comment4', prompt: '“We spoke, but we do not know whether the committee changed anything.” Choose the strongest tag.', choices: [choice('influence', 'Influence', 'Strong: participation occurred, but decision influence is unclear.', true), choice('attendance', 'Attendance', 'Attendance does not address whether views mattered.')] },
      { id: 'comment5', prompt: '“I left feedback but did not receive a response.” Choose the strongest tag.', choices: [choice('response', 'Feedback response', 'Strong: the accountability loop remains open.', true), choice('information', 'Information', 'The main issue is response, not receipt of information.')] },
      { id: 'comment6', prompt: '“The audio notice helped me know the meeting date.” Choose the strongest tag.', choices: [choice('accessibleInfo', 'Access to information', 'Strong: an accessible route improved information access.', true), choice('service', 'Service reliability', 'The comment concerns communication, not service function.')] },
      { id: 'mixed', prompt: 'Choose the strongest mixed-evidence statement.', choices: [choice('bounded', 'Meeting access improved for some participants after timing and communication changes. Evidence of influence and feedback response remains mixed, and the data does not represent people who did not attend.', 'Strong: it combines sources, preserves contradiction and states the limitation.', true), choice('universal', 'The changes solved participation and accountability for everyone.', 'This overgeneralizes and ignores contradictory and missing evidence.')] },
      { id: 'sensemaking', prompt: 'Whose perspective should Awra invite before finalizing the interpretation?', choices: [choice('balanced', 'A balanced group including people facing different access barriers, with accessible separate or mixed review routes and safe disagreement.', 'Strong: interpretation includes missing perspectives without forcing public disclosure.', true), choice('team', 'Only the project team because it collected the data.', 'This excludes rights-holder interpretation and may preserve bias.')] },
    ],
    output: 'Synthesis method, themes, contradictory finding and evidence limitation', safety: 'Use fictional, generalized comments only. Do not retain attribution, assume silence means satisfaction or treat one story as proof of prevalence.',
  },
  'M5-R10': {
    number: 11, id: 'M5-R10', key: 'm5_s11', next: 'M5-R11', stage: 'Understand change, equity and contribution',
    title: 'Evaluation: Understand Change, Equity and Contribution',
    explanation: 'Evaluation asks more than whether activities were completed. It examines what changed, who experienced the change, how the process was carried out and what else may have influenced the result.',
    example: 'The repaired water point functions more often and use increased nearby, but distance and mobility barriers remain. A woreda service team completed the repair; Awra supported consultation, accessible communication and follow-up.',
    learn: [['Availability', 'Is the service or opportunity present and functioning?'], ['Accessibility', 'Can different groups reach, afford and use it?'], ['Acceptability', 'Is it respectful, appropriate and responsive?'], ['Quality', 'Does it meet the expected standard and work reliably?']],
    evidence: [
      ['Five evaluation questions', 'What changed? For whom—and who may not have benefited? Were HRBA principles respected? What else influenced change? What can Awra reasonably claim it contributed?'],
      ['AAAQ is optional', 'Use Availability, Accessibility, Acceptability and Quality for relevant service reviews; it is not compulsory for every project.'],
      ['Credible contribution', 'Separate the public actor’s responsibility and action from Awra’s consultation, communication and follow-up contribution.'],
    ],
    tasks: [
      { id: 'change', prompt: 'Choose one confirmed change.', choices: [choice('function', 'Water availability improved after the repair, and use increased among nearby households.', 'Strong: this is supported and bounded.', true), choice('all', 'Every household now has equal water access.', 'The evidence does not support this universal claim.')] },
      { id: 'equity', prompt: 'Choose the equity gap.', choices: [choice('barriers', 'Access remains unequal for some remote residents and people facing mobility barriers.', 'Strong: the evaluation keeps unequal experience visible.', true), choice('none', 'There is no equity gap because total use increased.', 'Totals can conceal continuing barriers.')] },
      { id: 'process', prompt: 'Choose the HRBA-process observation.', choices: [choice('consult', 'Consultation and accessible communication supported participation and follow-up, while missing perspectives still need review.', 'Strong: this assesses process and its limits.', true), choice('activity', 'Meetings were completed on schedule.', 'Completion alone does not assess HRBA process quality.')] },
      { id: 'influence', prompt: 'Choose the relevant alternative influence.', choices: [choice('woreda', 'The woreda service team completed the repair and wider conditions may also have affected use.', 'Strong: other actors and influences are acknowledged.', true), choice('awraOnly', 'Awra alone caused the change.', 'This ignores the service team and overclaims causation.')] },
      { id: 'contribution', prompt: 'Choose the credible contribution claim.', choices: [choice('bounded', 'Awra contributed through consultation, accessible communication and follow-up; the evidence does not show that Awra alone caused the improvement.', 'Strong: the claim distinguishes contribution from sole causation.', true), choice('caused', 'Awra delivered the improvement for all residents.', 'This exceeds Awra’s role and the evidence.')] },
      { id: 'scorecard', prompt: 'When may a Community Scorecard help?', choices: [choice('views', 'When community and service-provider views should be compared and joint corrective action agreed.', 'Correct: it supports dialogue and action.', true), choice('prevalence', 'To estimate population prevalence from a few participants.', 'A scorecard is not a prevalence survey.')] },
      { id: 'msc', prompt: 'When may Most Significant Change help?', choices: [choice('meaning', 'When the team needs to explore why a change mattered and what was unexpected.', 'Correct: it supports qualitative learning, not prevalence claims.', true), choice('count', 'When the only question is how many people attended.', 'Routine records fit that question better.')] },
      { id: 'harvesting', prompt: 'When may Outcome Harvesting help?', choices: [choice('outcomes', 'When outcomes emerged in complex work and the team needs to work backward to assess contribution.', 'Correct: it can examine contribution in complex settings.', true), choice('diagnosis', 'To collect personal medical diagnoses.', 'That is neither the purpose nor safe practice.')] },
    ],
    output: 'Balanced evaluation statement, contribution limitation and responsibility pathway', safety: 'Use AAAQ only when relevant and keep claims bounded. Do not name individuals, expose access needs or claim sole causation where other actors contributed.',
  },
  'M5-R11': {
    number: 12, id: 'M5-R11', key: 'm5_s12', next: 'M5-R12', stage: 'Close the feedback loop',
    title: 'Accountability: Feedback, Response and Community Scorecards',
    explanation: 'A channel is not a mechanism until people know how to use it, can access it safely, receive acknowledgement, see responsibility and escalation, and hear what happened.',
    example: 'Awra offers verbal, written and supported routes; separates ordinary feedback from confidential safeguarding referrals; records only necessary status data; and publishes generalized response updates.',
    learn: [['Accessible entry', 'Offer multiple safe routes and assistance.'], ['Response pathway', 'Acknowledge, assess, assign, respond, refer or escalate.'], ['Account-back', 'Explain themes, decisions, actions and limits without exposing people.']],
    evidence: [
      ['Eight-step feedback loop', 'Inform people → receive through accessible options → record the minimum → review and assign → respond, refer or explain → adapt → account back → track completion.'],
      ['Response tracker', 'Feedback theme, assigned role, status, response or referral, action taken and account-back completion make responsibility visible.'],
      ['Light Community Scorecard', 'Community and service-actor views on reliability, physical accessibility, waiting time, respectful treatment and repair information are compared for dialogue—not averaged into a leaderboard.'],
    ],
    tasks: [
      { id: 'pathway', prompt: 'Choose the complete feedback loop.', choices: [choice('loop', 'Receive → acknowledge → assess risk → assign or refer → respond → account back → learn.', 'Strong: the loop includes safety, responsibility and closure.', true), choice('box', 'Install a box and count submissions.', 'A box alone has no visible response or closure.')] },
      { id: 'overdue', prompt: 'A response is overdue. What should happen?', choices: [choice('escalate', 'Notify the responsible role, use the escalation rule and update the person safely.', 'Strong: delay becomes an accountable action.', true), choice('delete', 'Delete the record to protect privacy.', 'Retention must follow policy; deletion cannot hide an unresolved obligation.')] },
      { id: 'scorecardIssue', prompt: 'Choose one issue for the scorecard interface discussion.', choices: [choice('path', 'The water point works more reliably, but the access path remains difficult for some users.', 'Strong: it retains agreement and the unresolved difference.', true), choice('average', 'Average all scores and discuss only the total.', 'Averaging can hide why community and service-actor views differ.')] },
      { id: 'jointAction', prompt: 'Choose the strongest joint corrective action.', choices: [choice('review', 'Review the access path and realistic support options with affected users through safe accessible routes.', 'Strong: it connects the issue to a proportionate joint action.', true), choice('meeting', 'Hold another public meeting for every concern.', 'A public meeting is not safe or accessible for every concern.')] },
      { id: 'responsibleActor', prompt: 'Who should own the service-side action?', choices: [choice('service', 'The responsible service team, with Awra facilitating follow-up and communication.', 'Strong: responsibility and contribution remain distinct.', true), choice('representatives', 'Community representatives alone.', 'Representatives do not own the public service response or automatically represent every group.')] },
      { id: 'reviewDate', prompt: 'How should the review timing be recorded?', choices: [choice('dated', 'Set a specific review date linked to the responsible role and action.', 'Strong: a dated review point makes follow-up testable.', true), choice('soon', 'Review the issue soon.', 'Without a date and owner, the action can remain open indefinitely.')] },
      { id: 'accountBack', prompt: 'Choose the safest account-back approach.', choices: [choice('accessible', 'Share the generalized action and next update through the meeting notice and audio message; keep individual concerns confidential.', 'Strong: this is accessible and does not expose protected information.', true), choice('publicNames', 'Read every complaint and name at the next public meeting.', 'This could expose people and deter future feedback.')] },
    ],
    output: 'Accessible feedback and account-back pathway', safety: 'Do not copy identifiable complaints into dashboards, downloads or portfolio outputs. Store operational complaint records only in approved restricted systems.',
  },
  'M5-R12': {
    number: 13, id: 'M5-R12', key: 'm5_s13', next: 'M5-R13', stage: 'Learn and adapt',
    title: 'Learning and Adaptation: Dashboard, Decisions and Account-Back',
    explanation: 'Learning is complete only when evidence changes a decision, role, resource, communication or follow-up question. Document why a change was made and how its effect will be checked.',
    example: 'After under-representation and delayed responses, Awra changes meeting timing, assigns a response owner, explains the change and reviews access and closure rates after two cycles.',
    learn: [['Decide', 'Continue, adapt, consult, engage, refer, narrow or pause.'], ['Document', 'Record rationale, responsibility and time frame.'], ['Follow up', 'Check intended and unintended effects and account back.']],
    evidence: [
      ['Reach and access', 'Show participation totals, broad safe categories and perspectives that may be missing.'],
      ['Quality, experience and influence', 'Combine observation or scorecard findings with participation, reported influence and decisions changed or followed up.'],
      ['Feedback, themes and limits', 'Show received, responded, referred and overdue items alongside qualitative themes, contradiction and what the evidence cannot show.'],
    ],
    tasks: [
      { id: 'underrepresented', prompt: 'Participation increased, but one access group remains underrepresented. Choose the strongest first action and role.', choices: [choice('consult', 'Consult safely to understand the barrier, then adapt what Awra controls; the MEAL lead coordinates.', 'Strong: it investigates the gap without collecting identifying details.', true), choice('success', 'Declare success because total participation increased.', 'Totals do not resolve under-representation.')] },
      { id: 'timing', prompt: 'Meeting timing is repeatedly identified as a barrier. Choose the strongest first action and role.', choices: [choice('adapt', 'Adapt the CSO-controlled schedule and communication; the activity lead owns the change.', 'Strong: Awra acts on what it controls.', true), choice('survey', 'Collect names and employers before changing the schedule.', 'More identifying data is unnecessary for this decision.')] },
      { id: 'overdueSignal', prompt: 'Feedback response is overdue. Choose the strongest first action and role.', choices: [choice('escalate', 'Escalate to the assigned response owner, give a safe status update and set a review date.', 'Strong: responsibility and account-back remain visible.', true), choice('close', 'Close the item because no further evidence was received.', 'Delay is not resolution.')] },
      { id: 'sensitiveRecord', prompt: 'A sensitive concern appears in an ordinary monitoring record. Choose the strongest first action and role.', choices: [choice('refer', 'Restrict access, remove it from ordinary MEAL data and use the approved safeguarding or confidential referral role.', 'Strong: the sensitive record moves to the protected pathway.', true), choice('dashboard', 'Add it to the dashboard so leaders can monitor the case.', 'The dashboard must not expose sensitive incidents or identifiable complaints.')] },
      { id: 'publicActor', prompt: 'A service-quality issue belongs to a public actor. Choose the strongest first action and role.', choices: [choice('engage', 'Engage the responsible public or service actor with bounded evidence; Awra facilitates follow-up and account-back.', 'Strong: duty-bearer responsibility and Awra contribution remain distinct.', true), choice('promise', 'Promise that Awra will fix the public service directly.', 'This overstates Awra’s authority and obscures the responsible actor.')] },
      { id: 'mixedClaim', prompt: 'Evidence is mixed and cannot support a universal success claim. Choose the strongest first action and role.', choices: [choice('narrow', 'Narrow the claim, state the limitation and ask the MEAL lead to plan the next safe review.', 'Strong: the report remains honest and decision-useful.', true), choice('positive', 'Publish only the positive evidence.', 'Selective reporting undermines learning and accountability.')] },
      { id: 'heard', prompt: 'Choose the strongest opening for the account-back message.', choices: [choice('finding', 'We heard that access improved for some people, while timing, path access and response delays remain unresolved.', 'Strong: it states the mixed finding without identifying anyone.', true), choice('solved', 'We solved access for the whole community.', 'The evidence cannot support this claim.')] },
      { id: 'change', prompt: 'Choose the strongest action statement.', choices: [choice('actions', 'We will change the meeting schedule, escalate overdue responses and engage the service team about the path.', 'Strong: it distinguishes CSO action, escalation and duty-bearer engagement.', true), choice('collect', 'We will collect more personal details from everyone.', 'The proposed collection is not necessary for these actions.')] },
      { id: 'limit', prompt: 'Choose the strongest limitation statement.', choices: [choice('cannot', 'We cannot yet conclude that everyone can participate equally or that every concern has been resolved.', 'Strong: uncertainty remains visible.', true), choice('omit', 'Do not mention unresolved evidence.', 'Account-back must include relevant limits.')] },
      { id: 'nextUpdate', prompt: 'Choose the strongest next-update commitment.', choices: [choice('routes', 'We will provide the next generalized update after the dated review through accessible written and audio routes.', 'Strong: timing, route and confidentiality are clear.', true), choice('names', 'We will publish names and individual cases at the next meeting.', 'This creates exposure and may increase retaliation risk.')] },
    ],
    output: 'Adaptation and follow-up record', safety: safeEntry,
  },
  'M5-R13': {
    number: 14, id: 'M5-R13', key: 'm5_s14', next: 'M5-R14', stage: 'Check evidence-to-action decisions',
    title: 'Knowledge Check: From Evidence to Action',
    explanation: 'Apply the full chain: meaningful result, rights-sensitive question, proportionate indicator, safe evidence, participatory interpretation, responsible action and account-back.',
    example: 'The best answer is not always “collect more data.” It may be minimize, consult, adapt, refer, narrow a claim or pause.',
    learn: [['Evidence quality', 'Use enough evidence for the decision and state limitations.'], ['Protection', 'Minimize, aggregate, restrict and refer safely.'], ['Accountability', 'Connect evidence to response and account-back.']],
    tasks: [
      { id: 'q1', prompt: 'A participation total meets target, but an access category is missing. Best response?', choices: [choice('investigate', 'Check the barrier safely, adapt access and follow up.', 'Correct.', true), choice('complete', 'Mark success because the total was met.', 'Totals can hide exclusion.')] },
      { id: 'q2', prompt: 'A tiny disaggregated cell could identify someone. Best response?', choices: [choice('suppress', 'Suppress or combine it and explain the limitation.', 'Correct.', true), choice('publish', 'Publish without a name.', 'Context can still identify someone.')] },
      { id: 'q3', prompt: 'A complaint suggests safeguarding risk. Best response?', choices: [choice('refer', 'Use the approved confidential safeguarding pathway.', 'Correct.', true), choice('dashboard', 'Add details to the learning dashboard.', 'Never expose the complaint in a learning output.')] },
      { id: 'q4', prompt: 'Evidence is mixed. Best reporting choice?', choices: [choice('limit', 'State uncertainty and narrow the claim.', 'Correct.', true), choice('certain', 'Choose the most positive interpretation.', 'That overstates evidence.')] },
      { id: 'q5', prompt: 'What closes an accountability loop?', choices: [choice('account', 'Response or referral, explanation back, and learning.', 'Correct.', true), choice('receive', 'Receiving feedback only.', 'Receipt alone is not closure.')] },
      { id: 'q6', prompt: 'When should a new data field be collected?', choices: [choice('needed', 'Only when necessary, voluntary, protectable and linked to action.', 'Correct.', true), choice('possible', 'Whenever the tool allows it.', 'Technical possibility is not a purpose.')] },
      { id: 'q7', prompt: 'Which method combination fits a service-access question?', choices: [choice('mixed', 'Observation plus an accessible facilitated discussion or short qualitative interview.', 'Correct: the combination examines conditions and experience.', true), choice('storyOnly', 'One positive story only.', 'One story cannot show the pattern or represent everyone.')] },
      { id: 'q8', prompt: 'Which action and account-back message fit mixed evidence?', choices: [choice('boundedAction', 'Adapt what the CSO controls, engage the responsible actor, state the limitation and explain the next review.', 'Correct: action, responsibility, uncertainty and account-back remain connected.', true), choice('successClaim', 'Declare universal success and share only the positive result.', 'This overclaims and hides unresolved evidence.')] },
    ],
    output: 'Checked evidence-to-action decisions', safety: safeEntry,
  },
};

function addProgress(state: LearningState, screenId: string) {
  const current = state.screenProgress[MODULE5_ID] || [];
  return current.includes(screenId) ? current : [...current, screenId];
}

function navigate(screenId: string) {
  const route = MODULE5_SCREEN_ROUTES[screenId];
  if (route) window.history.pushState(window.history.state, '', route);
}

function GeneralScreen({ spec, state, onChangeState }: { spec: ScreenSpec; state: LearningState; onChangeState: ChangeState }) {
  const stored = (state.practiceCheckState[spec.key] || {}) as {
    schemaVersion?: number; answers?: Record<string, string[]>; reviewed?: string[];
    status?: string; migration?: { sourceKey?: string; recoveredText?: string };
  };
  const [answers, setAnswers] = useState<Record<string, string[]>>(stored.answers || {});
  const [reviewed, setReviewed] = useState<string[]>(stored.reviewed || []);
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, [spec.id]);

  const taskComplete = spec.tasks.every((task) => (answers[task.id] || []).length === (task.required || 1));
  const allReviewed = spec.tasks.every((task) => reviewed.includes(task.id));
  const previouslyCompleted = stored.schemaVersion === 2 && stored.status === 'completed';
  const moduleCompleted = state.completedModules.includes(MODULE5_ID);
  const canContinue = taskComplete && allReviewed || previouslyCompleted || moduleCompleted;

  const persist = (nextAnswers: Record<string, string[]>, nextReviewed: string[], status = 'in_progress') => {
    onChangeState((previous) => ({
      ...previous,
      practiceCheckState: {
        ...previous.practiceCheckState,
        [spec.key]: { ...previous.practiceCheckState[spec.key], schemaVersion: 2, answers: nextAnswers, reviewed: nextReviewed, status, updatedAt: new Date().toISOString() },
      },
    }));
  };

  const select = (task: Task, id: string) => {
    const current = answers[task.id] || [];
    const limit = task.required || 1;
    const nextValues = task.multiple
      ? current.includes(id) ? current.filter((item) => item !== id) : [...current, id].slice(-limit)
      : [id];
    const next = { ...answers, [task.id]: nextValues };
    const nextReviewed = reviewed.filter((taskId) => taskId !== task.id);
    setAnswers(next); setReviewed(nextReviewed); setMessage('');
    persist(next, nextReviewed);
  };

  const check = (task: Task) => {
    if ((answers[task.id] || []).length !== (task.required || 1)) {
      setMessage('Choose ' + (task.required || 1) + ' response' + ((task.required || 1) === 1 ? '' : 's') + ' before checking.');
      return;
    }
    const nextReviewed = reviewed.includes(task.id) ? reviewed : [...reviewed, task.id];
    setReviewed(nextReviewed); setMessage('');
    persist(answers, nextReviewed);
  };

  const continueJourney = () => {
    if (!canContinue) { setMessage('Complete and check each required activity before continuing. Your current work remains saved on this device.'); return; }
    onChangeState((previous) => ({
      ...previous,
      currentScreenId: spec.next,
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, spec.id) },
      practiceCheckState: { ...previous.practiceCheckState, [spec.key]: { ...previous.practiceCheckState[spec.key], schemaVersion: 2, answers, reviewed, status: 'completed', updatedAt: new Date().toISOString() } },
    }));
    navigate(spec.next);
  };

  return (
    <main className="m5e-screen" aria-labelledby={'m5e-title-' + spec.number}>
      <article className="m5e-shell">
        <header className="m5e-hero">
          <p className="m5e-kicker">MODULE 5 · SCREEN {spec.number} OF 16</p>
          <span className="m5e-stage">{spec.stage}</span>
          <h1 id={'m5e-title-' + spec.number} ref={titleRef} tabIndex={-1}>{spec.title}</h1>
          <p>{spec.explanation}</p>
        </header>
        {stored.migration && (
          <aside className="m5e-notice m5e-notice--info" role="note">
            <strong>Previous Module 5 work recovered for review</strong>
            <span>Earlier progress was preserved, but old choices were not treated as answers to this revised activity. Review the current task before continuing.{stored.migration.recoveredText ? ' A generalized earlier note is available in the final review.' : ''}</span>
          </aside>
        )}
        <section className="m5e-example" aria-labelledby={'m5e-example-' + spec.number}>
          <p className="m5e-kicker">Worked example</p><h2 id={'m5e-example-' + spec.number}>Jiru Amba practice</h2><p>{spec.example}</p>
        </section>
        <section aria-labelledby={'m5e-learn-' + spec.number}>
          <h2 id={'m5e-learn-' + spec.number}>What to notice</h2>
          <div className="m5e-grid">{spec.learn.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div>
        </section>
        {spec.evidence && <section className="m5e-evidence" aria-labelledby={'m5e-evidence-' + spec.number}><h2 id={'m5e-evidence-' + spec.number}>Evidence workspace</h2><div className="m5e-grid">{spec.evidence.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>}
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Safe practice reminder</strong><span>{spec.safety}</span></aside>
        <section className="m5e-practice" aria-labelledby={'m5e-practice-' + spec.number}>
          <h2 id={'m5e-practice-' + spec.number}>Practice and check</h2>
          {spec.tasks.map((task) => {
            const selected = answers[task.id] || [];
            const checked = reviewed.includes(task.id);
            return (
              <fieldset key={task.id}>
                <legend>{task.prompt}{task.multiple ? ' Choose ' + task.required + '.' : ''}</legend>
                <div className="m5e-choices">{task.choices.map((item) => (
                  <label key={item.id}>
                    <input type={task.multiple ? 'checkbox' : 'radio'} name={spec.id + '-' + task.id} checked={selected.includes(item.id)} onChange={() => select(task, item.id)} />
                    <span>{item.label}</span>
                  </label>
                ))}</div>
                <button type="button" className="m5e-secondary" onClick={() => check(task)}>Check response</button>
                {checked && <div className="m5e-feedback" role="status" aria-live="polite">{task.choices.map((item) => <p key={item.id}><strong>{selected.includes(item.id) ? item.strong ? 'Good evidence decision: ' : 'Review this choice: ' : 'Other option: '}</strong>{item.feedback}</p>)}</div>}
              </fieldset>
            );
          })}
        </section>
        {message && <p className="m5e-alert" role="alert">{message}</p>}
        <section className="m5e-saved" role="status" aria-live="polite"><strong>Saved output</strong><span>{spec.output}: {canContinue ? 'ready to carry forward' : 'in progress'}. Work is saved locally in this browser.</span></section>
        <footer className="m5e-actions"><div><h2>Continue the evidence-to-action journey</h2><p>Complete and check each activity to unlock the next screen.</p></div><button type="button" className="m5e-primary" disabled={!canContinue} onClick={continueJourney}>Continue</button></footer>
      </article>
    </main>
  );
}

const canvasFields = [
  ['project', 'Project or activity', 'M5-R02', 'route', true, 'Name the project or activity in general terms.'],
  ['decision', 'Decision to inform', 'M5-R04', 'result', true, 'What real decision should this evidence help your organisation make?'],
  ['question', 'Rights-sensitive learning question', 'M5-R04', 'question', true, 'What do you need to understand about unequal experience, agency, influence or responsibility?'],
  ['groups', 'Rights-holder groups', 'M5-R01', 'gap', true, 'Which groups’ different experiences must be visible? Use broad, safe group descriptions.'],
  ['dutyBearer', 'Duty-bearer responsibility', 'M5-R10', 'contribution', true, 'Which role or institution has a responsibility to act?'],
  ['existingEvidence', 'Evidence already available', 'M5-R06', 'routes', true, 'Select what you already have: routine records, observation, interviews, group discussion, survey, feedback or documents.'],
  ['evidenceLayers', 'Evidence layers', 'M5-R05', 'indicator', true, 'Use at least two: reach and delivery; experience, agency and influence; responsibility and systemic change.'],
  ['methodMix', 'Selected method mix', 'M5-R06', 'access', true, 'Choose the smallest credible mix that fits the decision, resources and risk.'],
  ['disaggregation', 'Relevant disaggregation', 'M5-R07', 'category', true, 'Record only characteristics that are necessary, safe, actionable and possible to protect.'],
  ['participatoryRole', 'Participatory role', 'M5-R09', 'sensemaking', true, 'How will affected people help define, contribute, interpret, decide or receive a response?'],
  ['safetyEthics', 'Safety and ethics', 'M5-R08', 'storage', true, 'What will you not collect, who may access the evidence, where will it be kept and when will it be deleted?'],
  ['synthesis', 'Synthesis and triangulation approach', 'M5-R09', 'mixed', true, 'How will you group qualitative findings and compare sources, perspectives, agreement and contradiction?'],
  ['finding', 'What the evidence shows', 'M5-R10', 'change', true, 'Write one bounded finding supported by the combined evidence.'],
  ['uncertainty', 'What remains uncertain', 'M5-R10', 'equity', true, 'State what the evidence cannot show or what still needs verification.'],
  ['responsibleActor', 'Responsible actor', 'M5-R10', 'contribution', true, 'Name a role or institution responsible for the response.'],
  ['closure', 'Feedback-loop closure', 'M5-R11', 'pathway', true, 'How will you assign, respond, communicate back and track resolution?'],
  ['adaptation', 'Adaptation action', 'M5-R12', 'timing', true, 'What will change, continue or stop because of the finding?'],
  ['followup', 'Follow-up evidence', 'M5-R12', 'nextUpdate', true, 'What will show whether the adaptation worked, and when will it be reviewed?'],
  ['learning', 'Organisational learning note', 'M5-R14', 'learning', true, 'What method was used, why, what worked, what did not and what changed?'],
  ['peerQuestion', 'Optional peer-learning question', 'M5-R14', 'peerQuestion', false, 'What could another CSO help you think through? Do not include confidential details.'],
] as const;

function selectedLabels(state: LearningState, screenId: string, taskId: string) {
  const spec = specs[screenId];
  if (!spec) return '';
  const entry = state.practiceCheckState[spec.key] as { answers?: Record<string, string[]> } | undefined;
  const selected = entry?.answers?.[taskId] || [];
  const task = spec.tasks.find((candidate) => candidate.id === taskId);
  return selected.map((id) => task?.choices.find((item) => item.id === id)?.label || '').filter(Boolean).join('; ');
}

function deriveModule5Canvas(state: LearningState) {
  return Object.fromEntries(canvasFields.map(([id, , screenId, taskId]) => [id, screenId === 'M5-R14' ? '' : selectedLabels(state, screenId, taskId)]));
}

function CanvasScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const key = 'm5_s15';
  const stored = (state.practiceCheckState[key] || {}) as { fields?: Record<string, string>; confirmedSafe?: boolean; previewReviewed?: boolean; status?: string };
  const projected = useMemo(() => deriveModule5Canvas(state), [state]);
  const [fields, setFields] = useState<Record<string, string>>({ ...projected, ...(stored.fields || {}) });
  const [editing, setEditing] = useState<string | null>('learning');
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe));
  const [previewReviewed, setPreviewReviewed] = useState(Boolean(stored.previewReviewed));
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);

  const requiredCanvasKeys = canvasFields.filter(([, , , , required]) => required !== false).map(([id]) => id);
  const gaps = canvasFields.filter(([id, , , , required]) => required !== false && !String(fields[id] || '').trim());
  const risky = canvasFields.filter(([id]) => containsPotentiallySensitiveModule5Text(String(fields[id] || '')));
  const alreadyCompleted = state.completedModules.includes(MODULE5_ID) || stored.status === 'completed';
  const ready = isModule5OutputReady(fields, requiredCanvasKeys, [confirmedSafe, previewReviewed]);
  const persist = (nextFields = fields, safe = confirmedSafe, reviewed = previewReviewed) => onChangeState((previous) => ({
    ...previous,
    practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, fields: nextFields, confirmedSafe: safe, previewReviewed: reviewed, status: 'in_progress', updatedAt: new Date().toISOString() } },
  }));
  const update = (id: string, value: string) => {
    const next = { ...fields, [id]: value };
    setFields(next); setConfirmedSafe(false); setPreviewReviewed(false); setMessage('Changes saved locally. Review the preview and safety confirmation again.');
    persist(next, false, false);
  };
  const continueJourney = () => {
    if (!ready) {
      setMessage(risky.length ? 'Remove possible identifying or sensitive detail from the highlighted field. This prompt is a precaution and cannot guarantee confidentiality.' : gaps.length ? 'Complete the fields marked “Not yet completed”. Use the source link to review earlier work or add a short generalized entry.' : 'Review the readable preview and confirm the final safety check.');
      return;
    }
    onChangeState((previous) => ({
      ...previous,
      currentScreenId: 'M5-PLAYER-COMPLETE',
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, 'M5-R14') },
      practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, fields, confirmedSafe: true, previewReviewed: true, status: 'completed', updatedAt: new Date().toISOString() } },
    }));
    navigate('M5-PLAYER-COMPLETE');
  };

  return (
    <main className="m5e-screen" aria-labelledby="m5e-canvas-title">
      <article className="m5e-shell">
        <header className="m5e-hero"><p className="m5e-kicker">MODULE 5 · SCREEN 15 OF 16</p><span className="m5e-stage">Apply and save</span><h1 id="m5e-canvas-title" ref={titleRef} tabIndex={-1}>Build your HRBA MEAL, Accountability and Adaptation Canvas</h1><p>Your work is already here. Review the evidence and decisions you saved, correct anything that no longer fits, and complete only the gaps. Use short, generalized wording.</p></header>
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Before editing</strong><span>{safeEntry} The automatic check is only a prompt; you remain responsible for safe wording.</span></aside>
        <section aria-labelledby="m5e-canvas-fields"><h2 id="m5e-canvas-fields">Connected portfolio fields</h2><p>Missing work is shown honestly and never replaced by a sample answer.</p>
          <div className="m5e-canvas-list">{canvasFields.map(([id, label, screenId, , , prompt], index) => {
            const value = fields[id] || '';
              const isRisky = containsPotentiallySensitiveModule5Text(value);
            return <article key={id} className={!value || isRisky ? 'm5e-canvas-card m5e-canvas-card--attention' : 'm5e-canvas-card'}>
              <div><p className="m5e-kicker">{index + 1} · Source: Screen {specs[screenId]?.number || 15}</p><h3>{label}</h3><p>{prompt}</p><p><strong>Saved value:</strong> {value || 'Not yet completed'}</p><a href={MODULE5_SCREEN_ROUTES[screenId]} onClick={(event) => { event.preventDefault(); onChangeState((previous) => ({ ...previous, currentScreenId: screenId })); navigate(screenId); }}>Review source activity</a></div>
              <button type="button" className="m5e-secondary" aria-expanded={editing === id} onClick={() => setEditing(editing === id ? null : id)}>{editing === id ? 'Close editor' : 'Edit this field'}</button>
              {editing === id && <label><span className="sr-only">Edit {label}</span><textarea rows={3} maxLength={320} value={value} onChange={(event) => update(id, event.target.value)} /><small>{isRisky ? 'Remove possible identifying or sensitive detail.' : 'Use short, generalized, non-identifying wording.'}</small></label>}
            </article>;
          })}</div>
        </section>
        <section className="m5e-preview" aria-labelledby="m5e-preview-title"><h2 id="m5e-preview-title">Readable canvas preview</h2><dl>{canvasFields.map(([id, label]) => <div key={id}><dt>{label}</dt><dd>{fields[id] || 'Not yet completed'}</dd></div>)}</dl></section>
        <label className="m5e-confirm"><input type="checkbox" checked={previewReviewed} onChange={(event) => { setPreviewReviewed(event.target.checked); persist(fields, confirmedSafe, event.target.checked); }} /><span>I reviewed the canvas, including missing fields and evidence limitations.</span></label>
        <label className="m5e-confirm"><input type="checkbox" checked={confirmedSafe} onChange={(event) => { setConfirmedSafe(event.target.checked); persist(fields, event.target.checked, previewReviewed); }} /><span>I confirm this contains only fictional or generalized information and no identifying or confidential details.</span></label>
        {message && <p className={ready ? 'm5e-status' : 'm5e-alert'} role={ready ? 'status' : 'alert'}>{message}</p>}
        <section className="m5e-saved" role="status"><strong>Portfolio status</strong><span>{ready ? 'Canvas ready for final review.' : gaps.length + ' required field(s) not yet completed; ' + risky.length + ' field(s) need a safety review.'}{alreadyCompleted && !ready ? ' Your earlier module completion remains preserved while this revised output needs review.' : ''}</span></section>
        <footer className="m5e-actions"><div><h2>Review and complete</h2><p>The final screen converts this canvas into a practical 90-day learning and account-back plan.</p></div><button type="button" className="m5e-primary" disabled={!ready} onClick={continueJourney}>Review portfolio and plan</button></footer>
      </article>
    </main>
  );
}

function CompletionScreen({ state, onChangeState }: Omit<Props, 'screenId'>) {
  const key = 'm5_s16';
  const stored = (state.practiceCheckState[key] || {}) as { plan?: Record<string, string>; confirmedSafe?: boolean; dashboardReviewed?: boolean; carryReviewed?: boolean; status?: string };
  const canvas = ((state.practiceCheckState.m5_s15 || {}) as { fields?: Record<string, string> }).fields || deriveModule5Canvas(state);
  const initialPlan = {
    days30: canvas.decision || '',
    days60: canvas.synthesis || '',
    days90: canvas.adaptation || '',
    participation: canvas.participatoryRole || '',
    trigger: canvas.adaptation || '',
    communication: canvas.closure || '',
    referral: canvas.responsibleActor || '',
    stopCondition: '',
    reviewDate: '',
    learningNote: canvas.learning || '',
  };
  const [plan, setPlan] = useState<Record<string, string>>({ ...initialPlan, ...(stored.plan || {}) });
  const [dashboardReviewed, setDashboardReviewed] = useState(Boolean(stored.dashboardReviewed));
  const [carryReviewed, setCarryReviewed] = useState(Boolean(stored.carryReviewed));
  const [confirmedSafe, setConfirmedSafe] = useState(Boolean(stored.confirmedSafe));
  const [message, setMessage] = useState('');
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => { titleRef.current?.focus(); }, []);
  const alreadyCompleted = state.completedModules.includes(MODULE5_ID);
  const risky = Object.values(plan).some(containsPotentiallySensitiveModule5Text);
  const requiredPlanKeys = ['days30', 'days60', 'days90', 'participation', 'trigger', 'communication', 'referral', 'stopCondition', 'reviewDate', 'learningNote'];
  const ready = isModule5OutputReady(plan, requiredPlanKeys, [dashboardReviewed, carryReviewed, confirmedSafe]);
  const planFields: Array<[string, string, string]> = [
    ['days30', 'Days 1–30 — Prepare', 'Confirm the decision and learning question; agree roles and safe-evidence rules; prepare the minimum tools.'],
    ['days60', 'Days 31–60 — Test and interpret', 'Collect only necessary evidence; synthesize numbers and qualitative findings; involve affected people safely.'],
    ['days90', 'Days 61–90 — Act and account back', 'Assign and implement an adaptation; communicate what was heard and decided; collect follow-up evidence.'],
    ['participation', 'Rights-holder participation method', 'How will affected people participate safely in review and interpretation?'],
    ['trigger', 'Decision trigger', 'What finding will require action?'],
    ['communication', 'Accessible or low-bandwidth communication route', 'How will the account-back update reach people?'],
    ['referral', 'Responsible-actor or referral route', 'Use a role or institution, not a person’s name.'],
    ['stopCondition', 'Risk or stop condition', 'What risk would require pause, protection or specialist referral?'],
    ['reviewDate', 'General review date', 'Use a general period, not a person or exact case location.'],
    ['learningNote', 'Learning note', 'What will your organisation carry into the next project or share with another CSO?'],
  ];
  const persist = (next = plan, dashboard = dashboardReviewed, carry = carryReviewed, safe = confirmedSafe) => onChangeState((previous) => ({
    ...previous,
    practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, plan: next, dashboardReviewed: dashboard, carryReviewed: carry, confirmedSafe: safe, status: 'in_progress', updatedAt: new Date().toISOString() } },
  }));
  const downloadFields = canvasFields.map(([id, label, screenId]) => ({
    label,
    value: canvas[id] || '',
    sourceLabel: 'Module 5 Screen ' + (specs[screenId]?.number || 15),
  }));
  const outputText = buildModule5DownloadText(downloadFields, {
    ...plan,
  });
  const downloadHref = 'data:text/plain;charset=utf-8,' + encodeURIComponent(outputText);
  const copy = async () => {
    try { await navigator.clipboard.writeText(outputText); setMessage('Output copied. Store it only in an approved, access-controlled location.'); }
    catch {
      const box = document.createElement('textarea'); box.value = outputText; box.setAttribute('readonly', ''); box.style.position = 'fixed'; box.style.opacity = '0'; document.body.appendChild(box); box.select();
      const copied = document.execCommand('copy'); document.body.removeChild(box);
      setMessage(copied ? 'Output copied using the browser fallback.' : 'Copy did not complete. Select the readable summary and copy it manually. Completion is not blocked.');
    }
  };
  const complete = () => {
    if (!ready) { setMessage(risky ? 'Remove possible identifying or sensitive detail before completion.' : 'Complete the 90-day plan, review both summaries and confirm the current safety check.'); return; }
    onChangeState((previous) => ({
      ...previous,
      completedModules: previous.completedModules.includes(MODULE5_ID) ? previous.completedModules : [...previous.completedModules, MODULE5_ID],
      screenProgress: { ...previous.screenProgress, [MODULE5_ID]: addProgress(previous, 'M5-PLAYER-COMPLETE') },
      practiceCheckState: { ...previous.practiceCheckState, [key]: { ...previous.practiceCheckState[key], schemaVersion: 2, plan, dashboardReviewed: true, carryReviewed: true, confirmedSafe: true, status: 'completed', completedAt: new Date().toISOString() } },
    }));
    setMessage('Module 5 complete. Your canvas shows how evidence will support a real decision, make unequal experience and responsibility visible, close the accountability loop and test an adaptation.');
  };

  const dashboard = [
    ['Priority and MEAL question', (canvas.decision || 'Not yet completed') + ' — ' + (canvas.question || 'Not yet completed')],
    ['Reach and access evidence', (canvas.groups || 'Not yet completed') + ' — ' + (canvas.disaggregation || 'Not yet completed')],
    ['Participation and influence', canvas.participatoryRole || 'Not yet completed'],
    ['Quality or service experience', canvas.finding || 'Not yet completed'],
    ['Feedback-response status', canvas.closure || 'Not yet completed'],
    ['Qualitative themes', canvas.synthesis || 'Not yet completed'],
    ['Evidence limitations', canvas.uncertainty || 'Not yet completed'],
    ['Decision and responsible actor', (canvas.adaptation || 'Not yet completed') + ' — ' + (canvas.responsibleActor || 'Not yet completed')],
    ['Account-back commitment', canvas.followup || 'Not yet completed'],
  ];

  return (
    <main className="m5e-screen" aria-labelledby="m5e-complete-title">
      <article className="m5e-shell">
        <header className="m5e-hero"><p className="m5e-kicker">MODULE 5 · SCREEN 16 OF 16</p><span className="m5e-stage">Review, plan and confirm</span><h1 id="m5e-complete-title" ref={titleRef} tabIndex={-1}>Portfolio Review and Module Closure</h1><p>Review how the evidence will be displayed and used, complete a realistic 90-day learning and account-back plan, and explicitly confirm completion.</p></header>
        {alreadyCompleted && <aside className="m5e-notice m5e-notice--info" role="status"><strong>Earlier completion preserved</strong><span>This module remains complete. You may review or improve the revised portfolio without losing completion.</span></aside>}
        <section aria-labelledby="m5e-dashboard-title"><h2 id="m5e-dashboard-title">Evidence-to-Action Dashboard</h2><p>This is a readable generalized summary, not a data upload.</p><div className="m5e-grid">{dashboard.map(([title, body]) => <article key={title}><h3>{title}</h3><p>{body}</p></article>)}</div></section>
        <label className="m5e-confirm"><input type="checkbox" checked={dashboardReviewed} onChange={(event) => { setDashboardReviewed(event.target.checked); persist(plan, event.target.checked, carryReviewed, confirmedSafe); }} /><span>I reviewed the dashboard, including limitations and responsibility.</span></label>
        <section className="m5e-plan" aria-labelledby="m5e-plan-title"><h2 id="m5e-plan-title">90-Day Learning and Account-Back Plan</h2>{planFields.map(([id, label, help]) => { const fieldRisky = containsPotentiallySensitiveModule5Text(plan[id] || ''); const errorId = 'm5e-plan-error-' + id; return <label key={id}><span><strong>{label}</strong><small>{help}</small></span><textarea rows={3} maxLength={320} value={plan[id] || ''} aria-invalid={fieldRisky || undefined} aria-describedby={fieldRisky ? errorId : undefined} onChange={(event) => { const next = { ...plan, [id]: event.target.value }; setPlan(next); setConfirmedSafe(false); setMessage(containsPotentiallySensitiveModule5Text(event.target.value) ? 'Remove possible identifying or sensitive detail from the highlighted field. This prompt is a precaution and cannot guarantee confidentiality.' : 'Changes saved locally. Review the safety confirmation again.'); persist(next, dashboardReviewed, carryReviewed, false); }} />{fieldRisky && <small id={errorId} className="m5e-field-error">Remove possible identifying or sensitive detail.</small>}</label>; })}</section>
        <aside className="m5e-notice m5e-notice--safety" role="note"><strong>Final privacy and do-no-harm check</strong><span>Carry forward only generalized results, questions, evidence decisions, limitations, responsibilities and account-back commitments. Do not include identifiable complaints, sensitive incidents or personal information.</span></aside>
        <label className="m5e-confirm"><input type="checkbox" checked={carryReviewed} onChange={(event) => { setCarryReviewed(event.target.checked); persist(plan, dashboardReviewed, event.target.checked, confirmedSafe); }} /><span>I reviewed what will carry forward to the portfolio.</span></label>
        <label className="m5e-confirm"><input type="checkbox" checked={confirmedSafe} onChange={(event) => { setConfirmedSafe(event.target.checked); persist(plan, dashboardReviewed, carryReviewed, event.target.checked); }} /><span>I removed identifying and confidential information and understand the automatic check is not a guarantee.</span></label>
        {message && <p className={ready ? 'm5e-status' : 'm5e-alert'} role={ready ? 'status' : 'alert'} aria-live="polite">{message}</p>}
        <section className="m5e-download" aria-labelledby="m5e-download-title"><div><h2 id="m5e-download-title">Portable, low-bandwidth output</h2><p>Copy or download a plain-text version, or print this page. The file can be completed away from the course and entered later; the course itself must already be loaded and is not an offline application. Downloads never gate completion.</p></div><div><button type="button" className="m5e-secondary" onClick={copy}>Copy output</button><a className="m5e-secondary" href={downloadHref} download="module-5-hrba-meal-portfolio.txt" onClick={() => setMessage('Text download started. If it does not appear, use Copy output or print this page.')}>Download text</a></div></section>
        <details className="m5e-readable"><summary>Read the complete downloadable text</summary><pre>{outputText}</pre></details>
        <footer className="m5e-actions"><div><h2>{ready ? 'Ready for explicit confirmation' : 'Complete the remaining review checks'}</h2><p>{alreadyCompleted ? 'Your historical completion remains recorded; saving revised output still requires the current review and safety checks.' : 'Completion records the module; it does not claim every real-world issue is solved.'}</p></div><button type="button" className="m5e-primary" disabled={!ready} onClick={complete}>{alreadyCompleted ? 'Save reviewed Module 5 output' : 'Confirm and complete Module 5'}</button></footer>
      </article>
    </main>
  );
}

export default function Module5EnhancedJourney(props: Props) {
  if (props.screenId === 'M5-R14') return <CanvasScreen state={props.state} onChangeState={props.onChangeState} />;
  if (props.screenId === 'M5-PLAYER-COMPLETE') return <CompletionScreen state={props.state} onChangeState={props.onChangeState} />;
  const spec = specs[props.screenId];
  return spec ? <GeneralScreen key={spec.id} spec={spec} state={props.state} onChangeState={props.onChangeState} /> : null;
}
