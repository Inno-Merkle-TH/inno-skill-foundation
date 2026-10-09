import { createHmac } from 'node:crypto';
import { expect, test } from 'vitest';
import { verifyLineSignature } from '../src/line/signature.js';

const body = Buffer.from('{"events":[]}');
const secret = 'synthetic-secret';
const signature = createHmac('sha256', secret).update(body).digest('base64');
test('accepts valid HMAC over exact raw request bytes', () => {
  expect(verifyLineSignature(body, signature, secret)).toBe(true);
});
test('rejects changed bytes, wrong secret and malformed signature', () => {
  expect(verifyLineSignature(Buffer.from('{ "events": [] }'), signature, secret)).toBe(false);
  expect(verifyLineSignature(body, signature, 'wrong')).toBe(false);
  expect(verifyLineSignature(body, 'invalid', secret)).toBe(false);
  expect(verifyLineSignature(body, signature, '')).toBe(false);
});
