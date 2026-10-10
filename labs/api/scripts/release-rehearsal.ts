import { fork, type ChildProcess } from 'node:child_process';
import { once } from 'node:events';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export async function rehearseRelease(broken: boolean) {
  const directory = await mkdtemp(join(tmpdir(), 'qe-release-'));
  const children: ChildProcess[] = [];
  async function launch(name: string, corrupt: boolean): Promise<string> {
    const file = join(directory, `${name}.json`);
    const records = [{ id: 'baseline-notebook', ownerId: 'owner-a', title: 'Notebook', version: 1, clientRequestId: 'baseline' }];
    await writeFile(file, corrupt ? 'corrupt synthetic state' : JSON.stringify({ records, creations: records }));
    const child = fork(fileURLToPath(new URL('./release-worker.ts', import.meta.url)), [], { execArgv: ['--import', 'tsx'], env: { ...process.env, REHEARSAL_STATE: file }, stdio: ['ignore', 'ignore', 'pipe', 'ipc'] });
    children.push(child);
    return new Promise((resolveReady, reject) => {
      const timer = setTimeout(() => reject(new Error('Rehearsal startup timeout')), 10000);
      child.once('error', error => { clearTimeout(timer); reject(error); });
      child.once('exit', () => { clearTimeout(timer); reject(new Error('Rehearsal exited before ready')); });
      child.once('message', message => { clearTimeout(timer); resolveReady((message as { baseUrl: string }).baseUrl); });
    });
  }
  try {
    const baselineUrl = await launch('baseline', false);
    const candidateUrl = await launch('candidate', broken);
    const headers = { Authorization: 'Bearer synthetic-release' };
    const candidateHealth = (await fetch(`${candidateUrl}/health`)).status;
    const candidate = await fetch(`${candidateUrl}/resources/baseline-notebook`, { headers });
    const candidateBusiness = candidate.status;
    const candidateBody = await candidate.json();
    const selected = candidateHealth === 200 && candidateBusiness === 200 && candidateBody.title === 'Notebook' ? 'candidate' : 'baseline';
    const baseline = await fetch(`${baselineUrl}/resources/baseline-notebook`, { headers });
    const baselineReadable = baseline.status === 200 && (await baseline.json()).title === 'Notebook';
    if (!baselineReadable) throw new Error('Baseline recovery verification failed');
    return { selected, baselineReadable, baselineUrl, candidateUrl, candidateHealth, candidateBusiness };
  } finally {
    for (const child of children) {
      if (child.exitCode === null && child.signalCode === null) {
        const exited = once(child, 'exit');
        child.kill('SIGTERM');
        const timer = setTimeout(() => child.kill('SIGKILL'), 5000);
        try { await exited; } finally { clearTimeout(timer); }
      }
    }
    await rm(directory, { recursive: true, force: true });
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  for (const broken of [false, true]) {
    const result = await rehearseRelease(broken);
    console.log(JSON.stringify({ scenario: broken ? 'broken-candidate' : 'healthy-candidate', selected: result.selected, candidateHealth: result.candidateHealth, candidateBusiness: result.candidateBusiness, baselineReadable: result.baselineReadable }));
  }
}
