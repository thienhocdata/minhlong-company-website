import type { Metadata } from "next";
import Link from "next/link";
import ChatClient from "./chat-client";

export const metadata: Metadata = {
  title: "Trợ lý pháp lý đất đai | Minh Long",
  description:
    "Trao đổi trực tiếp với Minh Long Legal Agent để làm rõ tình huống, dữ kiện còn thiếu và căn cứ pháp luật đất đai liên quan.",
};

export default function LegalAgentPage() {
  return (
    <main className="agent-app-shell">
      <header className="agent-app-header">
        <Link className="agent-app-brand" href="/" aria-label="Về trang chủ Minh Long">
          <span className="agent-app-mark" aria-hidden="true">
            ML
          </span>
          <span>
            <strong>MINH LONG</strong>
            <small>Legal Agent</small>
          </span>
        </Link>

        <div className="agent-app-context">
          <span className="agent-online-dot" aria-hidden="true" />
          Pháp luật đất đai · TP. Hồ Chí Minh
        </div>

        <Link className="agent-home-link" href="/">
          Về website
        </Link>
      </header>

      <ChatClient />
    </main>
  );
}
