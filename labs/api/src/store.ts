import { readFile, writeFile, rename, mkdir } from 'node:fs/promises';
import { dirname } from 'node:path';

export type Resource = { id: string; ownerId: string; title: string; version: number; clientRequestId: string };
export interface ResourceStore {
  read(): Promise<Resource[]>;
  mutate<Result>(change: (records: Resource[]) => Result): Promise<Result>;
}

export function createStore(filePath: string): ResourceStore {
  let pending: Promise<unknown> = Promise.resolve();
  async function read(): Promise<Resource[]> {
    let text: string;
    try { text = await readFile(filePath, 'utf8'); }
    catch (error) { if ((error as NodeJS.ErrnoException).code === 'ENOENT') return []; throw error; }
    const records: unknown = JSON.parse(text);
    if (!Array.isArray(records) || records.some(record => !record || typeof record.id !== 'string' || typeof record.ownerId !== 'string' || typeof record.title !== 'string' || typeof record.clientRequestId !== 'string' || !Number.isSafeInteger(record.version) || record.version < 1)) throw new Error('Invalid store');
    return records;
  }
  return {
    async read() { await pending; return read(); },
    mutate(change) {
      const operation = pending.then(async () => {
        const records = await read();
        const result = change(records);
        await mkdir(dirname(filePath), { recursive: true });
        await writeFile(`${filePath}.tmp`, JSON.stringify(records), { mode: 0o600 });
        await rename(`${filePath}.tmp`, filePath);
        return result;
      });
      pending = operation.catch(() => undefined);
      return operation;
    },
  };
}
