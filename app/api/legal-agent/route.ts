const SESSION_TTL_SECONDS = 60 * 60 * 24 * 30;
const BACKEND_TIMEOUT_MS = 50_000;

type SessionPayload = {
  caseId: string;
  expiresAt: number;
};

type RequestPayload = {
  action?: "chat" | "history";
  message?: string;
  sessionToken?: string;
};

function json(payload: unknown, status = 200): Response {
  return Response.json(payload, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function bytesToBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlToBytes(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function sessionSecret(): string {
  const configured = process.env.LEGAL_AGENT_SESSION_SECRET?.trim();
  if (configured) return configured;
  if (process.env.NODE_ENV !== "production") {
    return "minh-long-local-development-session-secret";
  }
  throw new Error("missing_session_secret");
}

async function signature(payload: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(sessionSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signed = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload),
  );
  return bytesToBase64Url(new Uint8Array(signed));
}

function constantTimeEqual(left: string, right: string): boolean {
  const leftBytes = new TextEncoder().encode(left);
  const rightBytes = new TextEncoder().encode(right);
  const length = Math.max(leftBytes.length, rightBytes.length);
  let difference = leftBytes.length ^ rightBytes.length;
  for (let index = 0; index < length; index += 1) {
    difference |= (leftBytes[index] ?? 0) ^ (rightBytes[index] ?? 0);
  }
  return difference === 0;
}

async function createSessionToken(caseId: string): Promise<string> {
  const payload: SessionPayload = {
    caseId,
    expiresAt: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  };
  const encoded = bytesToBase64Url(
    new TextEncoder().encode(JSON.stringify(payload)),
  );
  return `${encoded}.${await signature(encoded)}`;
}

async function readSessionToken(token?: string): Promise<SessionPayload | null> {
  if (!token) return null;
  const [encoded, suppliedSignature, extra] = token.split(".");
  if (!encoded || !suppliedSignature || extra) return null;
  const expectedSignature = await signature(encoded);
  if (!constantTimeEqual(suppliedSignature, expectedSignature)) return null;

  try {
    const payload = JSON.parse(
      new TextDecoder().decode(base64UrlToBytes(encoded)),
    ) as SessionPayload;
    if (
      typeof payload.caseId !== "string" ||
      !/^case_[a-f0-9]{8,64}$/i.test(payload.caseId) ||
      typeof payload.expiresAt !== "number" ||
      payload.expiresAt <= Math.floor(Date.now() / 1000)
    ) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

function backendUrl(): string {
  const configured = process.env.LEGAL_AGENT_API_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.NODE_ENV !== "production") return "http://127.0.0.1:8000";
  throw new Error("missing_backend_url");
}

async function callBackend(path: string, init: RequestInit): Promise<Response> {
  const headers = new Headers(init.headers);
  headers.set("Content-Type", "application/json");
  const apiKey = process.env.LEGAL_AGENT_API_KEY?.trim();
  if (apiKey) headers.set("X-API-Key", apiKey);

  return fetch(`${backendUrl()}${path}`, {
    ...init,
    headers,
    signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
  });
}

async function backendError(response: Response): Promise<Response> {
  const payload = (await response.json().catch(() => null)) as
    | { detail?: string; retry_after?: number }
    | null;

  if (response.status === 429) {
    return json(
      {
        error: "Trợ lý đang nhận nhiều yêu cầu. Bạn vui lòng thử lại sau một chút.",
        retryAfter: payload?.retry_after,
      },
      429,
    );
  }
  if (response.status === 401 || response.status === 403) {
    return json({ error: "Kết nối tới trợ lý chưa được cấp quyền." }, 503);
  }
  return json(
    {
      error:
        payload?.detail ||
        "Trợ lý tạm thời chưa thể trả lời. Bạn vui lòng thử lại sau.",
    },
    response.status >= 500 ? 503 : response.status,
  );
}

export async function POST(request: Request): Promise<Response> {
  let payload: RequestPayload;
  try {
    payload = (await request.json()) as RequestPayload;
  } catch {
    return json({ error: "Dữ liệu gửi lên không hợp lệ." }, 400);
  }

  try {
    const action = payload.action ?? "chat";
    const session = await readSessionToken(payload.sessionToken);

    if (action === "history") {
      if (!session) return json({ messages: [] });
      const response = await callBackend(
        `/api/v1/cases/${encodeURIComponent(session.caseId)}/messages`,
        { method: "GET" },
      );
      if (!response.ok) {
        if (response.status === 404 || response.status === 403) {
          return json({ messages: [], sessionExpired: true });
        }
        return backendError(response);
      }
      const messages = await response.json();
      return json({ messages });
    }

    const message = String(payload.message ?? "").trim();
    if (!message) return json({ error: "Bạn hãy nhập nội dung cần trao đổi." }, 422);
    if (message.length > 10_000) {
      return json({ error: "Nội dung quá dài. Bạn hãy chia thành nhiều tin nhắn." }, 413);
    }

    const response = await callBackend("/api/v1/chat", {
      method: "POST",
      body: JSON.stringify({
        case_id: session?.caseId ?? null,
        message,
      }),
    });
    if (!response.ok) return backendError(response);

    const result = (await response.json()) as {
      case_id: string;
      status: string;
      answer: string;
      citations?: unknown[];
      suggestions?: string[];
    };
    return json({
      status: result.status,
      answer: result.answer,
      citations: result.citations ?? [],
      suggestions: result.suggestions ?? [],
      sessionToken: await createSessionToken(result.case_id),
    });
  } catch (error) {
    const marker = error instanceof Error ? error.message : "unknown";
    if (marker === "missing_session_secret" || marker === "missing_backend_url") {
      return json({ error: "Website chưa được cấu hình kết nối với trợ lý." }, 503);
    }
    if (error instanceof DOMException && error.name === "TimeoutError") {
      return json({ error: "Trợ lý phản hồi chậm hơn dự kiến. Bạn hãy thử lại." }, 504);
    }
    return json({ error: "Không thể kết nối với trợ lý lúc này." }, 503);
  }
}
