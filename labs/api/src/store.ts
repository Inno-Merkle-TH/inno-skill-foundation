import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export type Resource = { id: string; ownerId: string; title: string; version: number; clientRequestId: string };
export interface ResourceStore {
  read(): Promise<Resource[]>;
  mutate<Result>(change: (records: Resource[], creations: Resource[]) => Result): Promise<Result>;
}

export function createStore(filePath: string): ResourceStore {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<{ records: Resource[]; creations: Resource[] }> {
    let text: string;
    try { text = await readFile(filePath, 'utf8'); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return { records: [], creations: [] }; throw error; }
    const state = JSON.parse(text);
    if (!state || Array.isArray(state)) throw new Error('Invalid store');
    for (const records of [state.records, state.creations]) {
      if (!Array.isArray(records) || records.some(record => !record || typeof record.id !== 'string' || typeof record.ownerId !== 'string' || typeof record.title !== 'string' || typeof record.clientRequestId !== 'string' || !Number.isSafeInteger(record.version) || record.version < 1)) throw new Error('Invalid store');
    }
    return state;
  }
  return {
    async read() { await pending; return (await read()).records; },
    mutate(change) {
      const operation = pending.then(async () => {
        const state = await read();
        const result = change(state.records, state.creations);
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(`${filePath}.tmp`, JSON.stringify(state), { mode: 0o600 });
        await rename(`${filePath}.tmp`, filePath);
        return result;
      });
      pending = operation.catch(() => undefined);
      return operation;
    },
  };
}
