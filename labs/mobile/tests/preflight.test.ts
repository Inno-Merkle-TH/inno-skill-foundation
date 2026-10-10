import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preflight } from '../src/preflight.js';

const valid = { platform: 'android', host: 'darwin', device: 'emulator-5554', appExists: true, hashValid: true, toolsAvailable: true };
test('accepts a configured device but does not claim a runtime pass', () => assert.deepEqual(preflight(valid), []));
for (const [name, change] of Object.entries({ missingDevice: {device:''}, missingApp: {appExists:false}, wrongHash:{hashValid:false}, missingTools:{toolsAvailable:false}, iosOnLinux:{platform:'ios',host:'linux'}, wrongPlatform:{platform:'unknown'} })) {
  test(name, () => assert.ok(preflight({...valid,...change}).length));
}
