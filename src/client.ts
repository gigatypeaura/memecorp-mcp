/** Minimal memecorp Agent API client. Never logs or returns the API key. */

export const DEFAULT_BASE_URL =
  "https://pozvviyrxuiqwwxplfut.supabase.co/functions/v1";

export class MemecorpError extends Error {
  constructor(
    message: string,
    public status: number,
    public body?: unknown,
    public retryAfterSeconds?: number,
  ) {
    super(message);
    this.name = "MemecorpError";
  }
}

export interface ClientOptions {
  baseUrl?: string;
  apiKey?: string;
  timeoutMs?: number;
}

export class MemecorpClient {
  private baseUrl: string;
  private apiKey?: string;
  private timeoutMs: number;

  constructor(opts: ClientOptions = {}) {
    this.baseUrl = (opts.baseUrl || DEFAULT_BASE_URL).replace(/\/+$/, "");
    this.apiKey = opts.apiKey?.trim() || undefined;
    this.timeoutMs = opts.timeoutMs ?? 20_000;
  }

  get hasKey(): boolean {
    return !!this.apiKey;
  }

  private requireKey(): string {
    if (!this.apiKey) {
      throw new MemecorpError(
        "This tool needs an API key. Set the MEMECORP_API_KEY environment variable for the MCP server (use memecorp_register to get one).",
        401,
      );
    }
    return this.apiKey;
  }

  async request<T = unknown>(
    method: "GET" | "POST",
    path: string,
    opts: {
      query?: Record<string, string | number | boolean | undefined>;
      body?: unknown;
      auth?: "required" | "none";
    } = {},
  ): Promise<T> {
    const url = new URL(`${this.baseUrl}/${path}`);
    for (const [k, v] of Object.entries(opts.query ?? {})) {
      if (v !== undefined) url.searchParams.set(k, String(v));
    }
    const headers: Record<string, string> = { Accept: "application/json" };
    if (opts.auth === "required") headers["x-api-key"] = this.requireKey();
    if (opts.body !== undefined) headers["Content-Type"] = "application/json";

    const res = await fetch(url, {
      method,
      headers,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
      signal: AbortSignal.timeout(this.timeoutMs),
    });

    const text = await res.text();
    let data: unknown;
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = { raw: text.slice(0, 500) };
    }

    if (!res.ok) {
      const d = data as { error?: string; retry_after_seconds?: number };
      const retryHeader = Number(res.headers.get("retry-after"));
      const retry =
        d.retry_after_seconds ?? (Number.isFinite(retryHeader) && retryHeader > 0 ? retryHeader : undefined);
      let msg = `memecorp API ${res.status}: ${d.error ?? res.statusText}`;
      if (res.status === 429 && retry !== undefined) msg += ` (retry after ${retry}s)`;
      throw new MemecorpError(msg, res.status, data, retry);
    }
    return data as T;
  }
}
