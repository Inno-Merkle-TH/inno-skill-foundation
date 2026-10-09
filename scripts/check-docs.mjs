import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL } from 'node:url';

const slug = value => value.toLowerCase().replace(/[^\p{L}\p{N}\p{M}_\-\s]/gu, '').replace(/ /g, '-');

async function markdownFiles(root) {
  const files = [];
  for (const entry of await readdir(root, { withFileTypes: true })) {
    if (entry.name.startsWith('.') || ['node_modules', 'backups', 'test-results', 'dist', 'playwright-report'].includes(entry.name)) continue;
    const file = join(root, entry.name);
    if (entry.isDirectory()) files.push(...await markdownFiles(file));
    else if (entry.name.endsWith('.md')) files.push(file);
  }
  return files;
}

export async function validateDocuments({ root, manifestPath, checkEnglish = false }) {
  const errors = [];
  const manifest = JSON.parse(await readFile(resolve(root, manifestPath), 'utf8'));
  const byId = new Map();
  for (const lesson of manifest) {
    if (byId.has(lesson.id)) errors.push(`Duplicate id ${lesson.id}`);
    byId.set(lesson.id, lesson);
    try {
      const text = await readFile(resolve(root, lesson.path), 'utf8');
      for (const heading of lesson.requiredHeadings) if (!text.split('\n').includes(`## ${heading}`)) errors.push(`${lesson.path}: missing ${heading}`);
    } catch { errors.push(`Missing lesson ${lesson.path}`); }
  }
  const visited = new Set();
  function visit(id, ancestors = new Set()) {
    if (ancestors.has(id)) { errors.push(`Prerequisite cycle ${id}`); return; }
    if (visited.has(id)) return;
    const lesson = byId.get(id);
    if (!lesson) { errors.push(`Unknown prerequisite ${id}`); return; }
    for (const prerequisite of lesson.prerequisites) {
      if (lesson.kind === 'core' && byId.get(prerequisite)?.kind === 'extension') errors.push(`Core ${id} requires extension`);
      visit(prerequisite, new Set([...ancestors, id]));
    }
    visited.add(id);
  }
  for (const id of byId.keys()) visit(id);
  for (const file of await markdownFiles(root)) {
    const text = await readFile(file, 'utf8');
    if (checkEnglish && /[\u0e00-\u0e7f]/u.test(text)) errors.push(`${file}: Thai prose`);
    if ((text.match(/^```/gm) ?? []).length % 2) errors.push(`${file}: unbalanced fences`);
    const prose = text.replace(/^```[^\n]*\n[\s\S]*?^```/gm, '');
    for (const match of prose.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
      if (/^(https?:|mailto:)/.test(match[1])) continue;
      const [relative, anchor] = match[1].split('#');
      const target = relative ? resolve(dirname(file), relative) : file;
      try {
        await access(target);
        if (anchor && target.endsWith('.md')) {
          const headings = [...(await readFile(target, 'utf8')).matchAll(/^#+\s+(.+)$/gm)].map(heading => slug(heading[1]));
          if (!headings.includes(decodeURIComponent(anchor))) errors.push(`${file}: missing anchor ${match[1]}`);
        }
      } catch { errors.push(`${file}: missing link ${match[1]}`); }
    }
  }
  return errors;
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const errors = await validateDocuments({ root: process.cwd(), manifestPath: 'docs/reference/curriculum.json', checkEnglish: process.argv.includes('--english') });
  for (const error of errors) console.error(error);
  console.log(`Documentation validation: ${errors.length} errors`);
  process.exitCode = errors.length ? 1 : 0;
}
