import type { PortalLaunchContext } from './portalContext';
import {
  EXTERNAL_COURSE_EVENT_MESSAGE,
  isCanonicalOpaque32ByteBase64Url,
  isValidAssessmentEvidenceId,
} from './portalLearnerState';

export type HubAssessmentPayload = {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  evidenceId: string;
  submittedAt: string;
};

export type HubProgressPayload = {
  progressPercent: number;
  completedModuleIds: string[];
  currentModuleId: string | null;
  currentScreenId: string | null;
  assessment?: HubAssessmentPayload;
};

export type HubProgressEvent =
  | 'progress_updated'
  | 'module_completed'
  | 'assessment_completed'
  | 'course_completed';

export type HubEventMessage = HubProgressPayload & {
  type: typeof EXTERNAL_COURSE_EVENT_MESSAGE;
  version: 1;
  courseSlug: string;
  learnerStateKey: string;
  event: HubProgressEvent;
  sentAt: string;
};

function canSendToHub(portalContext: PortalLaunchContext | null) {
  return Boolean(
    portalContext
    && typeof window !== 'undefined'
    && window.parent
    && window.parent !== window,
  );
}

function isValidIsoTimestamp(value: string) {
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

function isValidAssessmentPayload(assessment: HubAssessmentPayload) {
  return (
    Number.isInteger(assessment.attemptNumber)
    && assessment.attemptNumber > 0
    && isValidAssessmentEvidenceId(assessment.evidenceId)
    && Number.isFinite(assessment.score)
    && Number.isFinite(assessment.maxScore)
    && assessment.maxScore > 0
    && assessment.score >= 0
    && assessment.score <= assessment.maxScore
    && Number.isFinite(assessment.percentage)
    && assessment.percentage >= 0
    && assessment.percentage <= 100
    && typeof assessment.passed === 'boolean'
    && isValidIsoTimestamp(assessment.submittedAt)
  );
}

export function sendCourseReadyMessage(portalContext: PortalLaunchContext) {
  if (!canSendToHub(portalContext)) {
    return false;
  }

  window.parent.postMessage({
    type: EXTERNAL_COURSE_EVENT_MESSAGE,
    version: 1,
    courseSlug: portalContext.courseSlug,
    event: 'course_ready',
    sentAt: new Date().toISOString(),
  }, portalContext.portalOrigin);
  return true;
}

export function sendPortalIntegrationError(
  portalContext: PortalLaunchContext,
  code: string,
) {
  if (!canSendToHub(portalContext)) {
    return false;
  }

  window.parent.postMessage({
    type: EXTERNAL_COURSE_EVENT_MESSAGE,
    version: 1,
    courseSlug: portalContext.courseSlug,
    event: 'integration_error',
    sentAt: new Date().toISOString(),
    error: { code },
  }, portalContext.portalOrigin);
  return true;
}

export function sendHubProgressEvent(
  portalContext: PortalLaunchContext | null,
  learnerStateKey: string | null,
  event: HubProgressEvent,
  payload: HubProgressPayload,
) {
  if (
    !portalContext
    || !learnerStateKey
    || !isCanonicalOpaque32ByteBase64Url(learnerStateKey)
    || !canSendToHub(portalContext)
    || (payload.assessment && !isValidAssessmentPayload(payload.assessment))
    || (
      (event === 'assessment_completed' || event === 'course_completed')
      && !payload.assessment
    )
  ) {
    return false;
  }

  const message: HubEventMessage = {
    type: EXTERNAL_COURSE_EVENT_MESSAGE,
    version: 1,
    courseSlug: portalContext.courseSlug,
    learnerStateKey,
    event,
    progressPercent: event === 'course_completed'
      ? 100
      : Math.max(0, Math.min(100, Math.round(payload.progressPercent))),
    completedModuleIds: [...payload.completedModuleIds].sort(),
    currentModuleId: payload.currentModuleId,
    currentScreenId: payload.currentScreenId,
    ...(payload.assessment ? { assessment: payload.assessment } : {}),
    sentAt: new Date().toISOString(),
  };

  window.parent.postMessage(message, portalContext.portalOrigin);
  return true;
}
