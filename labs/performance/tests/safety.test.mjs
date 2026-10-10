import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateLoadConfig } from '../config.mjs';

test('allows bounded loopback workload', () => assert.deepEqual(validateLoadConfig({baseUrl:'http://127.0.0.1:8090',vus:2,durationSeconds:10}), {baseUrl:'http://127.0.0.1:8090',vus:2,durationSeconds:10}));
for (const change of [{baseUrl:'https://example.com'}, {baseUrl:'http://localhost.evil.test'}, {baseUrl:'http://user@localhost'}, {vus:6}, {vus:0}, {durationSeconds:31}, {durationSeconds:NaN}]) {
  test(`rejects unsafe load ${JSON.stringify(change)}`, () => assert.throws(() => validateLoadConfig({baseUrl:'http://127.0.0.1:8090',vus:2,durationSeconds:10,...change})));
}
