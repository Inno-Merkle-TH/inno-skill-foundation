import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { writeManifest, verifyManifest } from '../scripts/snapshot-integrity.mjs';

test('snapshot manifest rejects modified or mixed archives before restore', () => {
  const directory = mkdtempSync(join(tmpdir(), 'qe-snapshot-'));
  try {
    for (const file of ['commerce.sql.gz', 'wp-content.tar.gz', 'orders-summary.txt', 'options-count.txt']) writeFileSync(join(directory, file), `synthetic-${file}`);
    writeManifest(directory);
    assert.equal(verifyManifest(directory), true);
    writeFileSync(join(directory, 'commerce.sql.gz'), 'archive-from-another-snapshot');
    assert.throws(() => verifyManifest(directory), /Snapshot integrity/);
  } finally {
    rmSync(directory, { recursive: true });
  }
});
