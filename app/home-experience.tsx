"use client";

import { useEffect, useState } from "react";
import ChatClient from "./tro-ly-phap-ly/chat-client";
import styles from "./home.module.css";

const services = [
  {
    number: "01",
    title: "Môi giới bất động sản",
    description: "Hỗ trợ tìm kiếm, giới thiệu, thương lượng và chuẩn bị thông tin cho giao dịch nhà đất.",
    deliverables: ["Xác định nhu cầu", "Sàng lọc thông tin", "Hỗ trợ giao dịch"],
  },
  {
    number: "02",
    title: "Đo đạc hiện trạng",
    description: "Khảo sát và đo vẽ hiện trạng phục vụ hồ sơ, thiết kế hoặc chuẩn bị thi công.",
    deliverables: ["Khảo sát thực địa", "Số liệu hiện trạng", "Bản vẽ đo đạc"],
  },
  {
    number: "03",
    title: "Tư vấn thiết kế",
    description: "Lập phương án công năng và không gian dựa trên khu đất, nhu cầu sử dụng và ngân sách.",
    deliverables: ["Phương án công năng", "Hồ sơ thiết kế", "Dự kiến phạm vi"],
  },
  {
    number: "04",
    title: "Xây dựng",
    description: "Tổ chức các đầu việc thi công theo phạm vi và phương án đã được thống nhất.",
    deliverables: ["Phạm vi công việc", "Kế hoạch triển khai", "Theo dõi tiến độ"],
  },
];

const steps = [
  ["01", "Tiếp nhận nhu cầu", "Khách hàng cung cấp vị trí, hiện trạng và mục tiêu cần giải quyết."],
  ["02", "Kiểm tra thông tin", "Minh Long xác định dữ liệu đã có, dữ liệu còn thiếu và đầu việc liên quan."],
  ["03", "Đề xuất cách làm", "Hai bên thống nhất phạm vi, người phụ trách, thời gian và chi phí dự kiến."],
  ["04", "Triển khai", "Công việc được thực hiện theo từng bước và cập nhật trong quá trình xử lý."],
];

const faqs = [
  [
    "Minh Long phục vụ ở khu vực nào?",
    "Minh Long tập trung tại TP. Hồ Chí Minh và trao đổi thêm với khách hàng ở các khu vực lân cận.",
  ],
  [
    "Chưa biết cần dịch vụ nào thì bắt đầu từ đâu?",
    "Bạn chỉ cần gửi vị trí, hiện trạng và điều đang cần giải quyết. Minh Long sẽ giúp xác định đầu việc phù hợp.",
  ],
  [
    "Ảnh trên website có phải công trình của Minh Long không?",
    "Không. Những ảnh có ghi “Ảnh minh họa” được dùng để trình bày lĩnh vực hoạt động, không phải hồ sơ năng lực hoặc dự án đã thực hiện.",
  ],
  [
    "Legal Agent có thay thế luật sư không?",
    "Không. Công cụ này hỗ trợ trao đổi sơ bộ về pháp luật đất đai. Kết luận quan trọng vẫn cần người có chuyên môn kiểm tra.",
  ],
];

function Brand() {
  return (
    <span className={styles.brandLockup}>
      <img src="/logo-minh-long-brand.png" alt="Minh Long" />
    </span>
  );
}

function ContactIcons() {
  return (
    <div className={styles.contactDock} aria-label="Liên hệ nhanh">
      <a
        className={styles.zaloButton}
        href="https://zalo.me/0985532166"
        target="_blank"
        rel="noreferrer"
        aria-label="Nhắn Zalo cho Minh Long"
        data-label="Zalo 0985 532 166"
      >
        <span aria-hidden="true">Z</span>
      </a>
      <a
        className={styles.messengerButton}
        href="https://m.me/61592556041235"
        target="_blank"
        rel="noreferrer"
        aria-label="Nhắn tin với Minh Long qua Messenger"
        data-label="Messenger Minh Long"
      >
        <span aria-hidden="true" />
      </a>
    </div>
  );
}

export default function HomeExperience() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);

  useEffect(() => {
    if (!agentOpen) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setAgentOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [agentOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={styles.site}>
      <header className={styles.header}>
        <a href="#top" aria-label="Minh Long — về đầu trang"><Brand /></a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#legal-agent">Legal Agent</a>
          <a href="#ve-minh-long">Về Minh Long</a>
        </nav>
        <a className={styles.headerContact} href="#lien-he">Liên hệ</a>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><b>{menuOpen ? "Đóng" : "Menu"}</b>
        </button>
        <div id="mobile-navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
          <a href="#dich-vu" onClick={closeMenu}>Dịch vụ</a>
          <a href="#quy-trinh" onClick={closeMenu}>Quy trình</a>
          <a href="#legal-agent" onClick={closeMenu}>Legal Agent</a>
          <a href="#ve-minh-long" onClick={closeMenu}>Về Minh Long</a>
          <a href="#lien-he" onClick={closeMenu}>Liên hệ</a>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>TP. Hồ Chí Minh và khu vực lân cận</p>
            <h1>Bất động sản, đo đạc, thiết kế và xây dựng.</h1>
            <p className={styles.heroLead}>
              Minh Long tiếp nhận nhu cầu, xác định đầu việc và phối hợp các phần liên quan trong một quy trình thống nhất.
            </p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#dich-vu">Xem dịch vụ</a>
              <a className={styles.secondaryButton} href="https://zalo.me/0985532166" target="_blank" rel="noreferrer">Nhắn Zalo</a>
            </div>
            <dl className={styles.heroFacts}>
              <div><dt>Văn phòng</dt><dd>85 Hưng Nhơn, TP.HCM</dd></div>
              <div><dt>Giờ làm việc</dt><dd>07:00 – 17:00</dd></div>
            </dl>
          </div>
          <figure className={styles.heroMedia}>
            <img src="/images/architecture.jpg" alt="Nhà ở hiện đại — ảnh minh họa" />
            <figcaption>Ảnh minh họa · Kevin Menajang / Pexels</figcaption>
          </figure>
        </section>

        <section className={styles.serviceSection} id="dich-vu">
          <div className={styles.sectionHeading}>
            <p>Dịch vụ</p>
            <h2>Minh Long hỗ trợ những gì?</h2>
            <span>Mỗi dịch vụ được trình bày theo phạm vi công việc, không gộp thành cam kết chung chung.</span>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.number}>
                <span className={styles.serviceNumber}>{service.number}</span>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.deliverables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.workSection} id="quy-trinh">
          <div className={styles.sectionHeadingLight}>
            <p>Quy trình làm việc</p>
            <h2>Bốn bước từ tiếp nhận đến triển khai</h2>
          </div>
          <div className={styles.stepGrid}>
            {steps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.agentSection} id="legal-agent">
          <div className={styles.agentLabel}>Công cụ hỗ trợ</div>
          <div className={styles.agentContent}>
            <div>
              <p>Minh Long Legal Agent</p>
              <h2>Trao đổi sơ bộ về pháp luật đất đai</h2>
            </div>
            <div>
              <p>
                Mô tả tình huống bằng ngôn ngữ tự nhiên. Trợ lý giúp xác định thông tin còn thiếu và đưa ra nguồn để bạn kiểm tra tiếp.
              </p>
              <button type="button" onClick={() => setAgentOpen(true)}>Mở Legal Agent</button>
              <small>Không thay thế luật sư hoặc cơ quan có thẩm quyền.</small>
            </div>
          </div>
        </section>

        <section className={styles.aboutSection} id="ve-minh-long">
          <div className={styles.aboutCopy}>
            <p>Về Minh Long</p>
            <h2>Một đầu mối cho các công việc liên quan đến nhà đất và công trình</h2>
          </div>
          <div className={styles.aboutDetails}>
            <p>
              Công ty Môi giới bất động sản, Tư vấn thiết kế, Xây dựng, Đo đạc Minh Long hoạt động tại TP. Hồ Chí Minh và khu vực lân cận.
            </p>
            <dl>
              <div><dt>Địa chỉ</dt><dd>85 Hưng Nhơn, TP. Hồ Chí Minh</dd></div>
              <div><dt>Phạm vi</dt><dd>TP.HCM và khu vực lân cận</dd></div>
              <div><dt>Tiếp nhận</dt><dd>07:00 – 17:00</dd></div>
            </dl>
            <a href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noreferrer">Xem trên Google Maps</a>
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeading}>
            <p>Câu hỏi thường gặp</p>
            <h2>Thông tin cần biết trước khi liên hệ</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}<span>+</span></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.contactSection} id="lien-he">
          <div>
            <p>Liên hệ Minh Long</p>
            <h2>Gửi nhu cầu và thông tin hiện trạng</h2>
            <span>Minh Long sẽ trao đổi để xác định đầu việc phù hợp.</span>
          </div>
          <div className={styles.contactList}>
            <a href="tel:+84938202102"><span>Điện thoại</span><strong>0938 202 102</strong></a>
            <a href="https://zalo.me/0985532166" target="_blank" rel="noreferrer"><span>Zalo</span><strong>0985 532 166</strong></a>
            <a href="https://m.me/61592556041235" target="_blank" rel="noreferrer"><span>Messenger</span><strong>Minh Long</strong></a>
            <a href="mailto:contact.minhlongcorp@gmail.com"><span>Email</span><strong>contact.minhlongcorp@gmail.com</strong></a>
          </div>
        </section>
      </main>

      <ContactIcons />

      <button className={styles.legalDock} type="button" onClick={() => setAgentOpen(true)} aria-label="Mở Minh Long Legal Agent">
        <span>ML</span><b>Legal Agent</b>
      </button>

      <div className={`${styles.agentOverlay} ${agentOpen ? styles.agentOverlayOpen : ""}`} aria-hidden={!agentOpen}>
        <button className={styles.agentBackdrop} type="button" aria-label="Đóng trợ lý pháp lý" onClick={() => setAgentOpen(false)} />
        <aside className={styles.agentDrawer} role="dialog" aria-modal="true" aria-label="Minh Long Legal Agent">
          <header className={styles.agentDrawerHeader}>
            <Brand />
            <div><span className={styles.agentStatusDot} />Trợ lý pháp luật đất đai</div>
            <button type="button" onClick={() => setAgentOpen(false)} aria-label="Đóng cửa sổ trợ lý">×</button>
          </header>
          <div className={styles.agentDrawerBody}><ChatClient /></div>
        </aside>
      </div>

      <footer className={styles.footer}>
        <Brand />
        <p>Môi giới bất động sản · Tư vấn thiết kế · Xây dựng · Đo đạc</p>
        <div>
          <a href="https://www.facebook.com/profile.php?id=61592556041235" target="_blank" rel="noreferrer">Facebook</a>
          <a href="mailto:contact.minhlongcorp@gmail.com">Email</a>
          <small>© 2026 Minh Long · Ảnh minh họa sử dụng theo giấy phép Pexels</small>
        </div>
      </footer>
    </div>
  );
}
