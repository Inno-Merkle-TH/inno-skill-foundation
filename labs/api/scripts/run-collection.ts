import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { startLab } from '../src/lab.js';

export async function runCollection(wrongStatus?: number): Promise<number> {
  const lab = await startLab();
  try {
    const collection = JSON.parse(await readFile(new URL('../postman/collection.json', import.meta.url), 'utf8'));
    const variables: Record<string, string> = { baseUrl: lab.baseUrl, tokenA: 'synthetic-a', tokenB: 'synthetic-b', resourceId: '', runId: randomUUID() };
    const substitute = (value: string) => value.replace(/\{\{(\w+)\}\}/g, (_match, key: string) => { assert.ok(Object.hasOwn(variables, key), `Unknown variable ${key}`); return variables[key]; });
    let count = 0;
    for (const item of collection.item) {
      const url = new URL(substitute(item.request.url));
      assert.equal(url.origin, lab.baseUrl, 'Only the isolated local fixture may be called');
      const headers = Object.fromEntries(item.request.header.map((header: { key: string; value: string }) => [header.key, substitute(header.value)]));
      const response = await fetch(url, { method: item.request.method, headers, body: item.request.body ? substitute(item.request.body.raw) : undefined, redirect: 'error' });
      assert.equal(response.status, wrongStatus ?? item['x-qe-expected'].status, item.name);
      const kind = item['x-qe-expected'].kind;
      if (kind) {
        const body = await response.json();
        if (kind === 'capture') { assert.equal(body.title, 'Notebook'); assert.equal(body.version, 1); assert.equal(typeof body.id, 'string'); variables.resourceId = body.id; }
        else if (kind === 'empty') assert.deepEqual(body, { items: [], total: 0 });
        else if (kind === 'version') assert.equal(body.version, 2);
        else throw new Error(`Unsupported assertion ${kind}`);
      }
      count++;
    }
    return count;
  } finally { await lab.close(); }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) console.log(`Local declarative collection: ${await runCollection()} requests passed (Postman scripts are not evaluated)`);
