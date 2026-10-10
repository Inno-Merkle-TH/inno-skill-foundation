import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

export async function verifyArchive(platform: string, archive: string): Promise<boolean> {
  const manifest = JSON.parse(await readFile(new URL('../apps-manifest.json', import.meta.url), 'utf8'));
  if (!['android', 'ios'].includes(platform) || !archive) return false;
  return createHash('sha256').update(await readFile(archive)).digest('hex') === manifest[platform].sha256;
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  if (!await verifyArchive(process.argv[2], process.argv[3])) throw new Error('Archive checksum mismatch');
  console.log('Pinned release archive checksum verified; not a device test');
}
