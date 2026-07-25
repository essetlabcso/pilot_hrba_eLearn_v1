export type Module4EnhancedAsset = {
  id: string;
  screenNumber: number;
  src: string;
  sourceFile: string;
  width: number;
  height: number;
  alt: string;
  usage: 'content' | 'supporting' | 'decorative-background';
  mobileTreatment: 'contain' | 'cover-with-focal-point' | 'stack-before-controls';
  focalPoint: string;
  semanticOverlayRequired: boolean;
  containsIncidentalText: boolean;
};

const ASSET_ROOT = '/assets/hrba/modules/module-4-enhanced';

function asset(
  value: Omit<Module4EnhancedAsset, 'src'> & { file: string },
): Module4EnhancedAsset {
  const { file, ...metadata } = value;
  return { ...metadata, src: `${ASSET_ROOT}/${file}` };
}

export const MODULE4_ENHANCED_ASSETS: readonly Module4EnhancedAsset[] = Object.freeze([
  asset({ id: 'm4-s05-map-default', screenNumber: 5, file: 'm4-s05-jiru-amba-map-default.webp', sourceFile: '5.1 of m4.png', width: 1022, height: 592, alt: 'Jiru Amba overview showing the market, water service, youth livelihoods, health post, and consultation and feedback workstreams.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s05-workstream-open', screenNumber: 5, file: 'm4-s05-jiru-amba-workstream-open.webp', sourceFile: '5.2 of m4.png', width: 852, height: 550, alt: 'Jiru Amba workstream map with one workstream ready for review.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s05-exploration-progress', screenNumber: 5, file: 'm4-s05-jiru-amba-exploration-progress.webp', sourceFile: '5.3 of m4.png', width: 936, height: 691, alt: 'Jiru Amba map showing progress across the five implementation workstreams.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s05-workstream-selected', screenNumber: 5, file: 'm4-s05-jiru-amba-workstream-selected.webp', sourceFile: '5.4 of m4.png', width: 880, height: 625, alt: 'Jiru Amba map with all workstreams explored and one workstream selected for the practice journey.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),

  asset({ id: 'm4-s06-context', screenNumber: 6, file: 'm4-s06-fair-access-context.webp', sourceFile: '6.1 of m4.webp', width: 476, height: 157, alt: 'Awra staff and community members reviewing a fair-access concern.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s06-evidence', screenNumber: 6, file: 'm4-s06-fair-access-evidence.webp', sourceFile: '6.2 of m4.webp', width: 611, height: 162, alt: 'Women vendors and Awra staff comparing evidence about access to a livelihood support list.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s06-community-review', screenNumber: 6, file: 'm4-s06-fair-access-community-review.webp', sourceFile: '6.3 of m4.webp', width: 271, height: 150, alt: 'A facilitator reviewing agreed criteria with community members.', usage: 'supporting', mobileTreatment: 'stack-before-controls', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s06-follow-up', screenNumber: 6, file: 'm4-s06-fair-access-follow-up.webp', sourceFile: '6.4 of m4.webp', width: 253, height: 166, alt: 'Community members discussing follow-up action in a small group.', usage: 'supporting', mobileTreatment: 'stack-before-controls', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s06-signal', screenNumber: 6, file: 'm4-s06-fair-access-signal.webp', sourceFile: '6.5 of m4.webp', width: 144, height: 141, alt: 'Awra staff listening to women affected by the implementation decision.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),

  asset({ id: 'm4-s07-market-overview', screenNumber: 7, file: 'm4-s07-participation-market-overview.webp', sourceFile: '7.1 of m4.webp', width: 700, height: 281, alt: 'Awra and market committee staff reviewing a proposed market layout in a busy accessible market.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s07-layout-review', screenNumber: 7, file: 'm4-s07-participation-layout-review.webp', sourceFile: '7.2 of m4.webp', width: 584, height: 272, alt: 'Community representatives comparing two market layout options.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s07-actor-review', screenNumber: 7, file: 'm4-s07-participation-actor-review.webp', sourceFile: '7.3 of m4.webp', width: 629, height: 275, alt: 'Awra and a responsible actor reviewing a market layout with vendors nearby.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s07-community-decision', screenNumber: 7, file: 'm4-s07-participation-community-decision.webp', sourceFile: '7.4 of m4.webp', width: 725, height: 295, alt: 'An Awra facilitator discussing the market layout with a vendor.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s07-agreement', screenNumber: 7, file: 'm4-s07-participation-agreement.webp', sourceFile: '7.5 of m4.webp', width: 705, height: 253, alt: 'Awra and market committee representatives agreeing how participation will influence the market decision.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),

  asset({ id: 'm4-s08-concern-hotspots', screenNumber: 8, file: 'm4-s08-feedback-concern-hotspots.webp', sourceFile: '8.1 of m4.png', width: 724, height: 452, alt: 'A Jiru Amba market meeting with three concern areas to explore.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s08-concern-reviewed', screenNumber: 8, file: 'm4-s08-feedback-concern-reviewed.webp', sourceFile: '8.2 of m4.png', width: 540, height: 263, alt: 'Community members reviewing a market concern with an Awra facilitator.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s08-responsibility', screenNumber: 8, file: 'm4-s08-feedback-responsibility.webp', sourceFile: '8.3 of m4.webp', width: 494, height: 340, alt: 'A facilitator recording who owns a response to a community concern.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s08-response', screenNumber: 8, file: 'm4-s08-feedback-response.webp', sourceFile: '8.4 of m4.png', width: 489, height: 308, alt: 'A community meeting where the response to a concern is explained.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),
  asset({ id: 'm4-s08-account-back-loop', screenNumber: 8, file: 'm4-s08-feedback-account-back-loop.webp', sourceFile: '8.6 of m4.png', width: 812, height: 589, alt: 'Community meeting illustrating the receive, assign, respond, account-back, and follow-up cycle.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: true, containsIncidentalText: true }),

  asset({ id: 'm4-s09-water-service-actors', screenNumber: 9, file: 'm4-s09-roles-water-service-actors.webp', sourceFile: '9.1 of m4.webp', width: 675, height: 279, alt: 'Rights-holders, Awra staff, and water-service staff meeting beside a community water point.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s09-community-dialogue', screenNumber: 9, file: 'm4-s09-roles-community-dialogue.webp', sourceFile: '9.2 of m4.webp', width: 272, height: 415, alt: 'Awra staff facilitating dialogue with community members at a water point.', usage: 'supporting', mobileTreatment: 'stack-before-controls', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s09-water-point-gap', screenNumber: 9, file: 'm4-s09-roles-water-point-gap.webp', sourceFile: '9.3 of m4.webp', width: 301, height: 654, alt: 'A broken community water pump representing an unresolved service responsibility.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s09-water-point-context', screenNumber: 9, file: 'm4-s09-roles-water-point-context.webp', sourceFile: '9.4 of m4.webp', width: 337, height: 250, alt: 'A community hand pump and water containers in Jiru Amba.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s09-service-context', screenNumber: 9, file: 'm4-s09-roles-service-context.webp', sourceFile: '9.5 of m4.webp', width: 259, height: 517, alt: 'A community water point with a water tower and service building in the background.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),

  asset({ id: 'm4-s10-training-session', screenNumber: 10, file: 'm4-s10-support-training-session.webp', sourceFile: '10.1 of m4.webp', width: 681, height: 337, alt: 'A facilitator and participants reviewing a youth livelihood training session.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s10-business-training', screenNumber: 10, file: 'm4-s10-support-business-training.webp', sourceFile: '10.2 of m4.webp', width: 438, height: 259, alt: 'Young adults taking part in outdoor business-skills training.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s10-schedule-review', screenNumber: 10, file: 'm4-s10-support-schedule-review.webp', sourceFile: '10.3 of m4.webp', width: 497, height: 338, alt: 'A facilitator explaining an adjusted training schedule and participation conditions.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s10-orientation', screenNumber: 10, file: 'm4-s10-support-orientation.webp', sourceFile: '10.4 of m4.webp', width: 312, height: 558, alt: 'A community training orientation held outdoors in Jiru Amba.', usage: 'supporting', mobileTreatment: 'stack-before-controls', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),

  asset({ id: 'm4-s11-adjust-meeting-time', screenNumber: 11, file: 'm4-s11-pathway-adjust-meeting-time.webp', sourceFile: '11.1 of m4 1_meeting_time.webp', width: 198, height: 112, alt: 'A market vendor explaining that the meeting time creates a participation barrier.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s11-engage-accessibility', screenNumber: 11, file: 'm4-s11-pathway-engage-accessibility.webp', sourceFile: '11.1 of m4 -2_accessability.webp', width: 199, height: 123, alt: 'An accessible health facility entrance with a ramp.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s11-protect-retaliation', screenNumber: 11, file: 'm4-s11-pathway-protect-retaliation.webp', sourceFile: '11.1 of m4 - 3_feer of retaliation.webp', width: 197, height: 123, alt: 'A private conversation illustrating concern about retaliation.', usage: 'content', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),

  asset({ id: 'm4-s12-feedback-record', screenNumber: 12, file: 'm4-s12-information-feedback-record.webp', sourceFile: '12.1 of m4.webp', width: 615, height: 421, alt: 'An Awra feedback desk using a suggestion box, feedback notebook, and response log.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s12-consultation', screenNumber: 12, file: 'm4-s12-information-consultation.webp', sourceFile: '12.2 of m4.webp', width: 512, height: 198, alt: 'Community representatives discussing what information is needed for a decision.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s12-community-check', screenNumber: 12, file: 'm4-s12-information-community-check.webp', sourceFile: '12.3 of m4.webp', width: 348, height: 288, alt: 'A facilitator checking evidence with community members in a shaded outdoor meeting.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s12-facilitated-review', screenNumber: 12, file: 'm4-s12-information-facilitated-review.webp', sourceFile: '12.4 of m4.webp', width: 376, height: 258, alt: 'A Jiru Amba consultation where a facilitator records only information needed for follow-up.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s12-evidence-review', screenNumber: 12, file: 'm4-s12-information-evidence-review.webp', sourceFile: '12.5 of m4.webp', width: 426, height: 184, alt: 'A facilitator reviewing a document with community representatives.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),

  asset({ id: 'm4-s13-health-post-consultation', screenNumber: 13, file: 'm4-s13-note-health-post-consultation.webp', sourceFile: '13.1 of m4.webp', width: 495, height: 272, alt: 'An accessible Jiru Amba health-post consultation with community members and Awra staff.', usage: 'content', mobileTreatment: 'cover-with-focal-point', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
  asset({ id: 'm4-s13-accessibility-detail', screenNumber: 13, file: 'm4-s13-note-accessibility-detail.webp', sourceFile: '13.3 of m4.webp', width: 307, height: 162, alt: 'An accessible building entrance with steps, a ramp, and an accessibility sign.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: false }),
  asset({ id: 'm4-s13-community-confirmation', screenNumber: 13, file: 'm4-s13-note-community-confirmation.webp', sourceFile: '13.7 of m4.webp', width: 310, height: 217, alt: 'A CSO facilitator confirming an implementation decision with community members.', usage: 'supporting', mobileTreatment: 'contain', focalPoint: 'center', semanticOverlayRequired: false, containsIncidentalText: true }),
]);

export const MODULE4_CODE_RENDERED_VISUALS = Object.freeze([
  {
    id: 'm4-s04-everyday-rights-lens',
    screenNumber: 4,
    implementation: 'accessible-svg-and-html',
    reason: 'The source diagrams contain essential labels and interaction states that must reflow and remain operable.',
  },
  {
    id: 'm4-s10-support-progress',
    screenNumber: 10,
    implementation: 'semantic-html-progress-summary',
    reason: 'The source progress image contains essential learner-facing text.',
  },
]);
