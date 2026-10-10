import http from 'k6/http';
import { check, sleep } from 'k6';
import { validateLoadConfig } from './config.mjs';

const config = validateLoadConfig({ baseUrl: __ENV.BASE_URL || 'http://127.0.0.1:8090', vus: Number(__ENV.VUS || 2), durationSeconds: Number(__ENV.DURATION_SECONDS || 10) });
if (!__ENV.LAB_TOKEN_A) throw new Error('Set a synthetic LAB_TOKEN_A');
export const options = { vus: config.vus, duration: `${config.durationSeconds}s`, maxRedirects: 0, thresholds: { http_req_failed: ['rate<0.01'], http_req_duration: [__ENV.FORCE_THRESHOLD_FAILURE === '1' ? 'p(95)<0' : 'p(95)<500'], checks: ['rate==1'] } };

export default function () {
  const response = http.get(`${config.baseUrl}/resources?limit=10`, { headers: { Authorization: `Bearer ${__ENV.LAB_TOKEN_A}` }, timeout: '2s', redirects: 0 });
  check(response, { 'authenticated list has a valid shape': result => result.status === 200 && Array.isArray(result.json('items')) && Number.isInteger(result.json('total')) });
  sleep(0.5);
}
