import type { PortalLaunchContext } from './portalContext';

export const HRBA_COURSE_SLUG = 'applying-human-rights-based-approach-in-cso-practice';
export const EXTERNAL_COURSE_EVENT_MESSAGE = 'cso-learning-hub:external-course-event';
export const EXTERNAL_COURSE_LAUNCH_CONTEXT_MESSAGE =
  'cso-learning-hub:external-course-launch-context';
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
  );
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
