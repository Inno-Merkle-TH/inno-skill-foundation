import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { remote } from 'webdriverio';
import { preflight } from '../src/preflight.js';
import { verifyArchive } from '../scripts/verify-app.js';
import { androidCapabilities } from '../wdio.android.conf.js';
import { iosCapabilities } from '../wdio.ios.conf.js';

const platform = process.argv[2];
const app = process.env.MOBILE_APP_PATH ?? '';
const device = (platform === 'ios' ? process.env.IOS_UDID : process.env.ANDROID_UDID) ?? '';
const archive = process.env.MOBILE_ARCHIVE_PATH ?? (platform === 'android' ? app : '');
let toolsAvailable = false;
try {
  const output = platform === 'ios' ? execFileSync('xcrun', ['simctl', 'list', 'devices', 'available'], { encoding: 'utf8', timeout: 15000 }) : execFileSync('adb', ['devices'], { encoding: 'utf8', timeout: 15000 });
  toolsAvailable = Boolean(device) && output.includes(device);
} catch {}
let hashValid = false;
try { hashValid = await verifyArchive(platform, archive); } catch {}
const errors = preflight({ platform, host: process.platform, device, appExists: Boolean(app) && existsSync(app), hashValid, toolsAvailable });
if (errors.length) throw new Error(errors.join('\n'));
const client = await remote({ hostname: '127.0.0.1', port: 4723, path: '/', logLevel: 'error', connectionRetryCount: 0, capabilities: platform === 'ios' ? iosCapabilities(resolve(app), device) : androidCapabilities(resolve(app), device) });
try {
  await (await client.$('~Forms')).click();
  const input = await client.$('~text-input');
  await input.waitForDisplayed({ timeout: 10000 });
  await input.setValue('Synthetic QE');
  await client.waitUntil(async () => (await (await client.$('~input-text-result')).getText()) === 'Synthetic QE', { timeout: 5000 });
  assert.equal(await (await client.$('~input-text-result')).getText(), 'Synthetic QE');
  const toggle = await client.$('~switch');
  await toggle.click();
  assert.match(await (await client.$('~switch-text')).getText(), /OFF/);
  console.log(`${platform}: native form echo and switch verified`);
} finally { await client.deleteSession(); }
