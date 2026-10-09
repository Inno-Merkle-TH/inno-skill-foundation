import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { basename, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const files = ['commerce.sql.gz', 'wp-content.tar.gz', 'orders-summary.txt', 'options-count.txt'];
const digest = path => createHash('sha256').update(readFileSync(path)).digest('hex');

export function writeManifest(directory) {
  const manifest = { snapshotId: basename(directory), createdAt: new Date().toISOString(), files: Object.fromEntries(files.map(file => [file, digest(join(directory, file))])) };
  writeFileSync(join(directory, 'manifest.json'), JSON.stringify(manifest, null, 2));
}

export function verifyManifest(directory) {
  const manifest = JSON.parse(readFileSync(join(directory, 'manifest.json'), 'utf8'));
  if (manifest.snapshotId !== basename(directory) || files.some(file => manifest.files[file] !== digest(join(directory, file)))) throw new Error('Snapshot integrity mismatch');
  return true;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const [action, directory] = process.argv.slice(2);
  if (!directory || !['write', 'verify'].includes(action)) throw new Error('Use write|verify snapshot-directory');
  if (action === 'write') writeManifest(directory);
  else verifyManifest(directory);
}
