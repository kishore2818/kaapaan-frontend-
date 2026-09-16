const trimTrailingSlash = (value = "") => value.replace(/\/+$/, "");
export const API_BASE_URL = trimTrailingSlash("/api");
export const WS_BASE_URL = trimTrailingSlash("ws://98.94.85.231/ws");
export const CRIMINAL_API_BASE_URL = trimTrailingSlash("/api");

export const apiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${API_BASE_URL}${normalizedPath}`;
};

export const wsUrl = (path = "") => {
  const normalizedPath = path ? (path.startsWith("/") ? path : `/${path}`) : "";
  return `${WS_BASE_URL}${normalizedPath}`;
};

export const criminalApiUrl = (path) => {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${CRIMINAL_API_BASE_URL}${normalizedPath}`;
};

export const normalizeAssetUrl = (value, baseUrl = API_BASE_URL) => {
  if (!value) {
    return value;
  }

  const origin = baseUrl;

  if (/^https?:\/\//i.test(value)) {
    if (origin) {
      return value.replace(/^https?:\/\/(localhost|127\.0\.0\.1):\d+/i, origin);
    }

    return value;
  }

  if (value.startsWith("//")) {
    return `http:${value}`;
  }

  const normalizedPath = value.startsWith("/") ? value : `/${value}`;
  return `${origin}${normalizedPath}`;
};

export const normalizeViolation = (violation) => ({
  ...violation,
  _id: violation._id || violation.id,
  id: violation.id || violation._id,
  withoutHelmet: violation.withoutHelmet || violation.noHelmet || 0,
  triples: violation.triples || violation.tripling || 0,
  imageUrl: normalizeAssetUrl(violation.imageUrl, API_BASE_URL),
  plateImageUrl: normalizeAssetUrl(violation.plateImageUrl, API_BASE_URL),
});
