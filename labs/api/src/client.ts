export class ApiClient {
  constructor(readonly baseUrl: string, readonly token: string) {}
  async request(method: string, path: string, body?: unknown): Promise<{ status: number; body: unknown }> {
    if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Use an API-relative path');
    const url = new URL(path, this.baseUrl);
    if (url.origin !== new URL(this.baseUrl).origin) throw new Error('Cross-origin requests are not allowed');
    const response = await fetch(url, { method, headers: { Authorization: `Bearer ${this.token}`, 'Content-Type': 'application/json' }, body: body === undefined ? undefined : JSON.stringify(body), redirect: 'error', signal: AbortSignal.timeout(5000) });
    return { status: response.status, body: response.status === 204 ? null : await response.json() };
  }
}
