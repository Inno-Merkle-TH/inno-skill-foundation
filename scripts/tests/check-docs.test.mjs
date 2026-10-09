import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { validateDocuments } from '../check-docs.mjs';

async function fixture(body, entries) {
  const root = await mkdtemp(join(tmpdir(), 'qe-docs-'));
  await writeFile(join(root, 'lesson.md'), body);
  await writeFile(join(root, 'manifest.json'), JSON.stringify(entries ?? [{ id: '01', path: 'lesson.md', prerequisites: [], kind: 'core', requiredHeadings: ['Lab'] }]));
  return { root, manifestPath: 'manifest.json', checkEnglish: true };
}
for (const [name, body, entries, expected] of [
  ['accepts complete lesson', '# Example\n## Lab\n', undefined, false],
  ['rejects broken links', '## Lab\n[broken](missing.md)', undefined, true],
  ['rejects broken anchors', '## Lab\n[broken](#absent)', undefined, true],
  ['rejects missing sections', '# Example', undefined, true],
  ['rejects Thai prose', '## Lab\nภาษาไทย', undefined, true],
  ['rejects cycles', '## Lab', [{ id: '01', path: 'lesson.md', prerequisites: ['01'], kind: 'core', requiredHeadings: ['Lab'] }], true],
  ['rejects duplicate ids', '## Lab', [{ id: '01', path: 'lesson.md', prerequisites: [], kind: 'core', requiredHeadings: ['Lab'] }, { id: '01', path: 'lesson.md', prerequisites: [], kind: 'core', requiredHeadings: ['Lab'] }], true],
]) {
  test(name, async () => {
    const options = await fixture(body, entries);
    try { assert.equal((await validateDocuments(options)).length > 0, expected); }
    finally { await rm(options.root, { recursive: true, force: true }); }
  });
}
