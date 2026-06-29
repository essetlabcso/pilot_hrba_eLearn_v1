import type { PortalLaunchContext } from './portalContext';

export const EXTERNAL_COURSE_PROGRESS_MESSAGE = 'cso-learning-hub:external-course-progress';

export type HubAssessmentPayload = {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  submittedAt: string;
};

export type HubProgressPayload = {
  progressPercent: number;
  completed: boolean;
  completedModuleIds: string[];
  currentModuleId: string | null;
  currentScreenId: string | null;
  assessment?: HubAssessmentPayload;
};

export type HubProgressMessage = HubProgressPayload & {
  type: typeof EXTERNAL_COURSE_PROGRESS_MESSAGE;
  version: 1;
  courseSlug: string;
  userId: string;
  enrollmentId: string;
  courseVersionId: string;
  sentAt: string;
};

export function sendHubProgressMessage(
  portalContext: PortalLaunchContext | null,
  payload: HubProgressPayload,
) {
  if (!portalContext || typeof window === 'undefined' || !window.parent) {
    return false;
  }

  const message: HubProgressMessage = {
    type: EXTERNAL_COURSE_PROGRESS_MESSAGE,
    version: 1,
    courseSlug: portalContext.courseSlug,
    userId: portalContext.userId,
    enrollmentId: portalContext.enrollmentId,
    courseVersionId: portalContext.courseVersionId,
    progressPercent: Math.max(0, Math.min(100, Math.round(payload.progressPercent))),
    completed: payload.completed,
    completedModuleIds: payload.completedModuleIds,
    currentModuleId: payload.currentModuleId,
    currentScreenId: payload.currentScreenId,
    ...(payload.assessment ? { assessment: payload.assessment } : {}),
    sentAt: new Date().toISOString(),
  };

  window.parent.postMessage(message, portalContext.portalOrigin);
  return true;
}
