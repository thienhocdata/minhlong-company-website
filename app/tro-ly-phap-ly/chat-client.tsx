"use client";

import { FormEvent, KeyboardEvent, useEffect, useRef, useState } from "react";

const SESSION_KEY = "minh_long_legal_agent_session";

type Citation = {
  title?: string;
  url?: string;
  location?: string;
  version?: string;
};

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  citations?: Citation[];
};

type AgentResponse = {
  answer?: string;
  citations?: Citation[];
  suggestions?: string[];
  sessionToken?: string;
  status?: string;
  messages?: Array<{
    id?: string;
    role: "user" | "assistant";
    content: string;
    citations?: Citation[];
  }>;
  sessionExpired?: boolean;
  error?: string;
};

const initialSuggestions = [
  "Tôi muốn kiểm tra điều kiện chuyển nhượng đất",
  "Giải thích giúp tôi tách thửa là gì",
  "Đất đang thế chấp có mua bán được không?",
];

function statusLabel(status?: string): string {
  const labels: Record<string, string> = {
    conversation: "Sẵn sàng trao đổi",
    intake_in_progress: "Đang làm rõ tình huống",
    ready_for_analysis: "Đang phân tích tình huống",
    analysis_complete: "Đã có phân tích sơ bộ",
    review_required: "Cần chuyên gia kiểm tra",
    needs_expert_review: "Cần chuyên gia kiểm tra",
    handoff_requested: "Đang chờ xác nhận liên hệ",
    handoff_created: "Đã chuyển yêu cầu cho Minh Long",
  };
  return labels[status ?? ""] ?? "Sẵn sàng trao đổi";
}

async function callAgent(payload: Record<string, unknown>): Promise<AgentResponse> {
  const response = await fetch("/api/legal-agent", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = (await response.json().catch(() => ({}))) as AgentResponse;
  if (!response.ok) throw new Error(result.error || "Không thể kết nối với trợ lý.");
  return result;
}

function Sources({ citations = [] }: { citations?: Citation[] }) {
  if (!citations.length) return null;
  return (
    <details className="agent-sources">
      <summary>{citations.length} nguồn pháp lý được sử dụng</summary>
      <div className="agent-source-list">
        {citations.map((citation, index) => (
          <article key={`${citation.title}-${citation.location}-${index}`}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div>
              {citation.url ? (
                <a href={citation.url} target="_blank" rel="noreferrer">
                  {citation.title || "Nguồn pháp lý"}
                </a>
              ) : (
                <strong>{citation.title || "Nguồn pháp lý"}</strong>
              )}
              <small>
                {[citation.location, citation.version].filter(Boolean).join(" · ")}
              </small>
            </div>
          </article>
        ))}
      </div>
    </details>
  );
}

export default function ChatClient() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState(initialSuggestions);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState("Sẵn sàng trao đổi");
  const [restoring, setRestoring] = useState(false);
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const token = window.localStorage.getItem(SESSION_KEY);
    if (!token) {
      return;
    }
    setRestoring(true);
    callAgent({ action: "history", sessionToken: token })
      .then((result) => {
        if (result.sessionExpired) window.localStorage.removeItem(SESSION_KEY);
        if (result.messages?.length) {
          setMessages(
            result.messages.map((message, index) => ({
              id: message.id || `restored-${index}`,
              role: message.role,
              content: message.content,
              citations: message.citations,
            })),
          );
          setSuggestions([]);
          setStatus("Đã khôi phục cuộc trò chuyện");
        }
      })
      .catch(() => window.localStorage.removeItem(SESSION_KEY))
      .finally(() => setRestoring(false));
  }, []);

  useEffect(() => {
    const container = conversationRef.current;
    if (container) container.scrollTop = container.scrollHeight;
  }, [messages, busy]);

  async function send(rawMessage: string) {
    const message = rawMessage.trim();
    if (!message || busy) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: message,
    };
    setMessages((current) => [...current, userMessage]);
    setInput("");
    setSuggestions([]);
    setBusy(true);
    setStatus("Đang đọc và đối chiếu");

    try {
      const sessionToken = window.localStorage.getItem(SESSION_KEY);
      const result = await callAgent({ message, sessionToken });
      if (result.sessionToken) {
        window.localStorage.setItem(SESSION_KEY, result.sessionToken);
      }
      setMessages((current) => [
        ...current,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: result.answer || "Mình chưa nhận được nội dung trả lời.",
          citations: result.citations,
        },
      ]);
      setSuggestions(result.suggestions?.slice(0, 3) ?? []);
      setStatus(statusLabel(result.status));
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          id: `error-${Date.now()}`,
          role: "assistant",
          content:
            error instanceof Error
              ? error.message
              : "Không thể kết nối với trợ lý lúc này.",
        },
      ]);
      setStatus("Tạm thời chưa thể kết nối");
    } finally {
      setBusy(false);
    }
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void send(input);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      event.currentTarget.form?.requestSubmit();
    }
  }

  function newConversation() {
    window.localStorage.removeItem(SESSION_KEY);
    setMessages([]);
    setSuggestions(initialSuggestions);
    setInput("");
    setStatus("Sẵn sàng trao đổi");
  }

  const empty = !messages.length && !restoring;

  return (
    <section className="agent-workspace" aria-label="Trò chuyện với Minh Long Legal Agent">
      <div className="agent-conversation" ref={conversationRef} aria-live="polite">
        {restoring && (
          <div className="agent-restoring">Đang khôi phục cuộc trò chuyện…</div>
        )}

        {empty && (
          <div className="agent-welcome">
            <span className="agent-welcome-mark" aria-hidden="true">
              ML
            </span>
            <p>MINH LONG LEGAL AGENT</p>
            <h1>Bạn cần hỗ trợ gì?</h1>
            <div className="agent-welcome-line" />
            <p className="agent-welcome-copy">
              Hãy kể tình huống như khi đang trò chuyện. Mình sẽ trả lời trực tiếp,
              hỏi thêm khi thiếu dữ kiện và dẫn nguồn nếu có kết luận pháp lý.
            </p>
          </div>
        )}

        <div className="agent-message-list">
          {messages.map((message) => (
            <article className={`agent-message ${message.role}`} key={message.id}>
              {message.role === "assistant" && (
                <span className="agent-message-avatar" aria-hidden="true">
                  ML
                </span>
              )}
              <div className="agent-message-bubble">
                <p>{message.content}</p>
                <Sources citations={message.citations} />
              </div>
            </article>
          ))}
          {busy && (
            <article className="agent-message assistant">
              <span className="agent-message-avatar" aria-hidden="true">
                ML
              </span>
              <div className="agent-typing" aria-label="Trợ lý đang trả lời">
                <i />
                <i />
                <i />
              </div>
            </article>
          )}
        </div>
      </div>

      <div className="agent-composer-zone">
        {suggestions.length > 0 && (
          <div className="agent-suggestions" aria-label="Gợi ý câu hỏi">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => void send(suggestion)}>
                {suggestion}
              </button>
            ))}
          </div>
        )}

        <form className="agent-composer" onSubmit={submit}>
          <textarea
            aria-label="Nội dung cần hỗ trợ"
            placeholder="Hỏi bất kỳ điều gì về tình huống đất đai của bạn…"
            rows={1}
            maxLength={10_000}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            disabled={busy}
          />
          <button type="submit" disabled={busy || !input.trim()} aria-label="Gửi tin nhắn">
            <span aria-hidden="true">↗</span>
          </button>
        </form>

        <div className="agent-composer-meta">
          <button type="button" onClick={newConversation}>
            Cuộc trò chuyện mới
          </button>
          <span>{status}</span>
          <small>AI có thể mắc lỗi. Kết luận quan trọng cần chuyên gia kiểm tra.</small>
        </div>
      </div>
    </section>
  );
}
