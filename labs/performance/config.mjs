export function validateLoadConfig({ baseUrl, vus, durationSeconds }) {
  if (typeof baseUrl !== 'string' || !/^http:\/\/(127\.0\.0\.1|localhost|\[::1\])(?::[1-9]\d{0,4})?$/.test(baseUrl)) throw new Error('Only an explicit loopback HTTP origin is allowed');
  const port = baseUrl.match(/:(\d+)$/)?.[1];
  if (port && Number(port) > 65535) throw new Error('Invalid port');
  if (!Number.isInteger(vus) || vus < 1 || vus > 5) throw new Error('VUS must be 1–5');
  if (!Number.isInteger(durationSeconds) || durationSeconds < 1 || durationSeconds > 30) throw new Error('Duration must be 1–30 seconds');
  return { baseUrl, vus, durationSeconds };
}
