export type PortalLaunchContext = {
  embed: 'portal';
  portalOrigin: string;
  courseSlug: string;
  userId: string;
  enrollmentId: string;
  courseVersionId: string;
};

function getRequiredParam(params: URLSearchParams, key: string) {
  const value = params.get(key)?.trim() || '';
  return value.length > 0 ? value : null;
}

function parseOrigin(value: string | null) {
  if (!value) return null;

  try {
    const parsed = new URL(value);
    const normalizedValue = value.endsWith('/') ? value.slice(0, -1) : value;
    return parsed.origin === normalizedValue ? parsed.origin : null;
  } catch {
    return null;
  }
}

export function parsePortalLaunchContext(search: string): PortalLaunchContext | null {
  const params = new URLSearchParams(search);
  const embed = params.get('embed')?.trim();

  if (embed !== 'portal') {
    return null;
  }

  const portalOrigin = parseOrigin(params.get('portalOrigin')?.trim() || null);
  const courseSlug = getRequiredParam(params, 'courseSlug');
  const userId = getRequiredParam(params, 'userId');
  const enrollmentId = getRequiredParam(params, 'enrollmentId');
  const courseVersionId = getRequiredParam(params, 'courseVersionId');

  if (!portalOrigin || !courseSlug || !userId || !enrollmentId || !courseVersionId) {
    return null;
  }

  return {
    embed: 'portal',
    portalOrigin,
    courseSlug,
    userId,
    enrollmentId,
    courseVersionId,
  };
}

export function getPortalLaunchContextFromWindow() {
  if (typeof window === 'undefined') {
    return null;
  }

  return parsePortalLaunchContext(window.location.search);
}
