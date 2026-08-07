import type { PortalLaunchContext } from './portalContext';
import {
  EXTERNAL_COURSE_EVENT_MESSAGE,
  isCanonicalOpaque32ByteBase64Url,
  isValidAssessmentResultContract,
} from './portalLearnerState';
import { FINAL_ASSESSMENT_PASS_THRESHOLD } from '../data/finalAssessment';
import {
  FINAL_ASSESSMENT_MODULE_ID,
  REQUIRED_HRBA_MODULE_IDS,
} from '../state/coursePrerequisites';

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
  return isValidAssessmentResultContract(
    assessment,
    FINAL_ASSESSMENT_PASS_THRESHOLD,
  ) && isValidIsoTimestamp(assessment.submittedAt);
}

const allowedModuleIds = new Set([
  ...REQUIRED_HRBA_MODULE_IDS,
  FINAL_ASSESSMENT_MODULE_ID,
]);

function hasValidCompletedModuleIds(completedModuleIds: string[]) {
  const completed = new Set(completedModuleIds);

  return completed.size === completedModuleIds.length
    && completedModuleIds.every((moduleId) => allowedModuleIds.has(moduleId))
    && REQUIRED_HRBA_MODULE_IDS.every((moduleId, index) => (
      !completed.has(moduleId)
      || REQUIRED_HRBA_MODULE_IDS.slice(0, index).every((previousId) => completed.has(previousId))
    ))
    && (
      !completed.has(FINAL_ASSESSMENT_MODULE_ID)
      || REQUIRED_HRBA_MODULE_IDS.every((moduleId) => completed.has(moduleId))
    );
}

function isValidProgressPayload(event: HubProgressEvent, payload: HubProgressPayload) {
  const assessmentRequired = event === 'assessment_completed' || event === 'course_completed';
  const assessment = payload.assessment;

  if (
    !Number.isFinite(payload.progressPercent)
    || payload.progressPercent < 0
    || payload.progressPercent > 100
    || !hasValidCompletedModuleIds(payload.completedModuleIds)
    || (
      payload.currentModuleId !== null
      && !allowedModuleIds.has(payload.currentModuleId)
    )
    || (
      payload.currentScreenId !== null
      && (
        typeof payload.currentScreenId !== 'string'
        || payload.currentScreenId.length === 0
        || payload.currentScreenId.length > 256
      )
    )
    || assessmentRequired !== Boolean(assessment)
    || (assessment && !isValidAssessmentPayload(assessment))
  ) {
    return false;
  }

  if (event === 'course_completed') {
    return Boolean(
      assessment?.passed
      && payload.progressPercent === 100
      && payload.completedModuleIds.includes(FINAL_ASSESSMENT_MODULE_ID)
      && REQUIRED_HRBA_MODULE_IDS.every((moduleId) => payload.completedModuleIds.includes(moduleId)),
    );
  }

  if (event === 'assessment_completed') {
    return assessment?.passed
      ? payload.progressPercent === 100
        && payload.completedModuleIds.includes(FINAL_ASSESSMENT_MODULE_ID)
      : payload.progressPercent < 100
        && !payload.completedModuleIds.includes(FINAL_ASSESSMENT_MODULE_ID);
  }

  return payload.progressPercent < 100
    && !payload.completedModuleIds.includes(FINAL_ASSESSMENT_MODULE_ID);
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
  code: 'launch_context_unavailable' | 'launch_context_invalid',
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
    || !isValidProgressPayload(event, payload)
  ) {
    return false;
  }

  const message: HubEventMessage = {
    type: EXTERNAL_COURSE_EVENT_MESSAGE,
    version: 1,
    courseSlug: portalContext.courseSlug,
    learnerStateKey,
    event,
    progressPercent: Math.round(payload.progressPercent),
    completedModuleIds: [...payload.completedModuleIds].sort(),
    currentModuleId: payload.currentModuleId,
    currentScreenId: payload.currentScreenId,
    ...(payload.assessment ? { assessment: payload.assessment } : {}),
    sentAt: new Date().toISOString(),
  };

  window.parent.postMessage(message, portalContext.portalOrigin);
  return true;
}
