import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { once } from 'node:events';
import { createApi } from './app.js';
import { createStore } from './store.js';

export async function startLab() {
  const directory = await mkdtemp(join(tmpdir(), 'qe-journey-'));
  const server = createApi({ store: createStore(join(directory, 'resources.json')), tokens: { 'synthetic-a': 'owner-a', 'synthetic-b': 'owner-b' } });
  server.listen(0, '127.0.0.1'); await once(server, 'listening');
  const address = server.address() as { port: number };
  return { baseUrl: `http://127.0.0.1:${address.port}`, async close() { await new Promise<void>(resolve => server.close(() => resolve())); await rm(directory, { recursive: true, force: true }); } };
}
