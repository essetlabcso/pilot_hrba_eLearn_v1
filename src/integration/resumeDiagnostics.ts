import type { PortalLaunchContext } from './portalContext';

export const EXTERNAL_COURSE_DIAGNOSTIC_MESSAGE =
  'cso-learning-hub:external-course-diagnostic';

export type ResumeDiagnosticStageCode =
  | 'HRBA-1'
  | 'HRBA-2'
  | 'HRBA-3'
  | 'HRBA-4';

export type ResumeDiagnosticCheckpoint = {
  stageCode: ResumeDiagnosticStageCode;
  timestamp: string;
  courseSlug: string;
  currentModuleId: string | null;
  currentScreenId: string | null;
  baseRevision: 'null' | 'present';
  result: 'PASS' | 'FAIL';
  httpStatus?: number;
  errorCategory?: 'ack_invalid' | 'message_invalid';
  correlationId: string;
};

const correlationIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isResumeDiagnosticCorrelationId(value: unknown): value is string {
  return typeof value === 'string' && correlationIdPattern.test(value);
}

export function createResumeDiagnosticCorrelationId() {
  return crypto.randomUUID();
}

export function describeBaseRevision(value: unknown): 'null' | 'present' {
  return value === null || value === undefined ? 'null' : 'present';
}

export function sendResumeDiagnosticCheckpoint(
  portalContext: PortalLaunchContext,
  diagnostic: ResumeDiagnosticCheckpoint,
) {
  if (
    typeof window === 'undefined'
    || window.parent === window
    || !isResumeDiagnosticCorrelationId(diagnostic.correlationId)
  ) {
    return false;
  }

  window.parent.postMessage({
    type: EXTERNAL_COURSE_DIAGNOSTIC_MESSAGE,
    version: 1,
    diagnostic,
  }, portalContext.portalOrigin);
  return true;
}
