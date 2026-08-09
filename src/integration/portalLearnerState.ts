import type { PortalLaunchContext } from './portalContext';
import type { HrbaResumeState, TrustedAssessmentState } from './resumeState';

export const HRBA_COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
export const EXTERNAL_COURSE_EVENT_MESSAGE = 'cso-learning-hub:external-course-event';
export const EXTERNAL_COURSE_LAUNCH_CONTEXT_MESSAGE =
  'cso-learning-hub:external-course-launch-context';
export const EXTERNAL_COURSE_RESUME_RESULT_MESSAGE =
  'cso-learning-hub:external-course-resume-result';
export const PORTAL_STORAGE_PREFIX = 'hrba-course-progress-v1:portal:sha256:';

const canonicalOpaque32BytePattern = /^[A-Za-z0-9_-]{42}[AEIMQUYcgkosw048]$/;
const evidenceUuidV4Pattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type PortalLearnerStateContext = {
  learnerStateKey: string;
  storageKey: string;
};

export type ExternalCourseLaunchContextMessage = {
  type: typeof EXTERNAL_COURSE_LAUNCH_CONTEXT_MESSAGE;
  version: 1;
  courseSlug: typeof HRBA_COURSE_SLUG;
  learnerStateKey: string;
  resumeRevision: string;
  resumeState: HrbaResumeState | null;
  trustedAssessmentState: TrustedAssessmentState;
};

export type ExternalCourseResumeResultMessage = {
  type: typeof EXTERNAL_COURSE_RESUME_RESULT_MESSAGE;
  version: 1;
  courseSlug: typeof HRBA_COURSE_SLUG;
  status: 'accepted' | 'conflict' | 'rejected';
  resumeRevision: string;
  resumeState: HrbaResumeState | null;
  error?: string;
};

export type AssessmentResultContract = {
  score: number;
  maxScore: number;
  percentage: number;
  passed: boolean;
  attemptNumber: number;
  evidenceId: string;
  submittedAt: string;
};

export function isCanonicalOpaque32ByteBase64Url(value: unknown): value is string {
  return typeof value === 'string' && canonicalOpaque32BytePattern.test(value);
}

export function isValidAssessmentEvidenceId(value: unknown): value is string {
  return typeof value === 'string' && (
    evidenceUuidV4Pattern.test(value)
    || canonicalOpaque32BytePattern.test(value)
  );
}

export function isValidAssessmentResultContract(
  value: unknown,
  passThreshold: number,
): value is AssessmentResultContract {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const assessment = value as Record<string, unknown>;
  const submittedAt = assessment.submittedAt;
  const submittedTimestamp = typeof submittedAt === 'string'
    ? Date.parse(submittedAt)
    : Number.NaN;

  if (
    !Number.isInteger(assessment.attemptNumber)
    || (assessment.attemptNumber as number) <= 0
    || !isValidAssessmentEvidenceId(assessment.evidenceId)
    || !Number.isInteger(assessment.score)
    || !Number.isInteger(assessment.maxScore)
    || (assessment.maxScore as number) <= 0
    || (assessment.score as number) < 0
    || (assessment.score as number) > (assessment.maxScore as number)
    || !Number.isInteger(assessment.percentage)
    || (assessment.percentage as number) < 0
    || (assessment.percentage as number) > 100
    || typeof assessment.passed !== 'boolean'
    || !Number.isFinite(submittedTimestamp)
    || new Date(submittedTimestamp).toISOString() !== submittedAt
  ) {
    return false;
  }

  const expectedPercentage = Math.round(
    ((assessment.score as number) / (assessment.maxScore as number)) * 100,
  );

  return assessment.percentage === expectedPercentage
    && assessment.passed === (expectedPercentage >= passThreshold);
}

export function createAssessmentEvidenceId() {
  if (typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let binary = '';
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary)
    .replaceAll('+', '-')
    .replaceAll('/', '_')
    .replace(/=+$/u, '');
}

export function isExternalCourseLaunchContextMessage(
  value: unknown,
  portalContext: PortalLaunchContext,
): value is ExternalCourseLaunchContextMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    candidate.type === EXTERNAL_COURSE_LAUNCH_CONTEXT_MESSAGE
    && candidate.version === 1
    && candidate.courseSlug === HRBA_COURSE_SLUG
    && candidate.courseSlug === portalContext.courseSlug
    && isCanonicalOpaque32ByteBase64Url(candidate.learnerStateKey)
    && isIsoRevision(candidate.resumeRevision)
    && (candidate.resumeState === null || typeof candidate.resumeState === 'object')
    && (candidate.trustedAssessmentState === null || typeof candidate.trustedAssessmentState === 'object')
  );
}

function isIsoRevision(value: unknown) {
  if (typeof value !== 'string' || value.length > 64) return false;
  const timestamp = Date.parse(value);
  return Number.isFinite(timestamp) && new Date(timestamp).toISOString() === value;
}

export function isExternalCourseResumeResultMessage(
  value: unknown,
  portalContext: PortalLaunchContext,
): value is ExternalCourseResumeResultMessage {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Record<string, unknown>;
  return candidate.type === EXTERNAL_COURSE_RESUME_RESULT_MESSAGE
    && candidate.version === 1
    && candidate.courseSlug === HRBA_COURSE_SLUG
    && candidate.courseSlug === portalContext.courseSlug
    && ['accepted', 'conflict', 'rejected'].includes(String(candidate.status))
    && isIsoRevision(candidate.resumeRevision)
    && (candidate.resumeState === null || typeof candidate.resumeState === 'object')
    && (candidate.error === undefined || typeof candidate.error === 'string');
}

export async function derivePortalStorageKey(learnerStateKey: string) {
  if (!isCanonicalOpaque32ByteBase64Url(learnerStateKey)) {
    throw new Error('Invalid learner-state context.');
  }

  const digest = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(learnerStateKey),
  );
  const digestHex = Array.from(new Uint8Array(digest), (byte) => (
    byte.toString(16).padStart(2, '0')
  )).join('');

  return `${PORTAL_STORAGE_PREFIX}${digestHex}`;
}
