export type PortalLaunchContext = {
  embed: 'portal';
  portalOrigin: string;
  courseSlug: string;
  launchToken: string;
};

export type PortalLaunchEnvironment = {
  isEmbedded: boolean;
  referrer: string;
};

const PORTAL_HISTORY_STATE_KEY = 'hrbaPortalContextV1';

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
  const launchToken = getRequiredParam(params, 'launchToken');

  if (!portalOrigin || !courseSlug || !launchToken) {
    return null;
  }

  return {
    embed: 'portal',
    portalOrigin,
    courseSlug,
    launchToken,
  };
}

export function isPortalLaunchEnvironmentValid(
  portalContext: PortalLaunchContext,
  environment: PortalLaunchEnvironment,
) {
  if (!environment.isEmbedded || !environment.referrer) {
    return false;
  }

  try {
    return new URL(environment.referrer).origin === portalContext.portalOrigin;
  } catch {
    return false;
  }
}

export function buildPortalContextRoute(route: string, portalContext: PortalLaunchContext | null) {
  if (!portalContext) {
    return route;
  }

  const params = new URLSearchParams({
    embed: portalContext.embed,
    portalOrigin: portalContext.portalOrigin,
    courseSlug: portalContext.courseSlug,
    launchToken: portalContext.launchToken,
  });

  return `${route}?${params.toString()}`;
}

export function buildPortalHistoryState(portalContext: PortalLaunchContext | null) {
  return portalContext
    ? { [PORTAL_HISTORY_STATE_KEY]: portalContext }
    : null;
}

function getPortalContextFromHistoryState(historyState: unknown) {
  if (!historyState || typeof historyState !== 'object') {
    return null;
  }

  const candidate = (historyState as Record<string, unknown>)[PORTAL_HISTORY_STATE_KEY];
  if (!candidate || typeof candidate !== 'object') {
    return null;
  }

  const values = candidate as Record<string, unknown>;
  if (
    values.embed !== 'portal'
    || typeof values.portalOrigin !== 'string'
    || typeof values.courseSlug !== 'string'
    || typeof values.launchToken !== 'string'
  ) {
    return null;
  }

  return parsePortalLaunchContext(new URLSearchParams({
    embed: values.embed,
    portalOrigin: values.portalOrigin,
    courseSlug: values.courseSlug,
    launchToken: values.launchToken,
  }).toString());
}

function portalContextsMatch(
  first: PortalLaunchContext | null,
  second: PortalLaunchContext | null,
) {
  return Boolean(
    first
    && second
    && first.embed === second.embed
    && first.portalOrigin === second.portalOrigin
    && first.courseSlug === second.courseSlug
    && first.launchToken === second.launchToken,
  );
}

export function getPortalLaunchContextFromWindow() {
  if (typeof window === 'undefined') {
    return null;
  }

  const portalContext = parsePortalLaunchContext(window.location.search);
  if (!portalContext) {
    return null;
  }

  const environment = {
    isEmbedded: window.parent !== window,
    referrer: document.referrer,
  };

  if (isPortalLaunchEnvironmentValid(portalContext, environment)) {
    window.history.replaceState(buildPortalHistoryState(portalContext), '');
    return portalContext;
  }

  const restoredPortalContext = getPortalContextFromHistoryState(window.history.state);
  const isSameOriginRefresh = (() => {
    try {
      return new URL(environment.referrer).origin === window.location.origin;
    } catch {
      return false;
    }
  })();

  return environment.isEmbedded
    && isSameOriginRefresh
    && portalContextsMatch(portalContext, restoredPortalContext)
    ? portalContext
    : null;
}
