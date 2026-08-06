"use client";

import { useEffect, useState } from "react";
import ChatClient from "./tro-ly-phap-ly/chat-client";
import styles from "./home.module.css";

const services = [
  {
    number: "01",
    title: "Môi giới bất động sản",
    description: "Tiếp nhận nhu cầu, sàng lọc thông tin và hỗ trợ các bước chuẩn bị cho giao dịch nhà đất.",
    deliverables: ["Nhu cầu", "Thông tin", "Giao dịch"],
  },
  {
    number: "02",
    title: "Đo đạc hiện trạng",
    description: "Khảo sát và đo vẽ hiện trạng phục vụ hồ sơ, thiết kế hoặc chuẩn bị thi công.",
    deliverables: ["Khảo sát", "Số liệu", "Bản vẽ"],
  },
  {
    number: "03",
    title: "Tư vấn thiết kế",
    description: "Lập phương án công năng và không gian dựa trên khu đất, nhu cầu sử dụng và ngân sách.",
    deliverables: ["Công năng", "Phương án", "Hồ sơ"],
  },
  {
    number: "04",
    title: "Xây dựng",
    description: "Tổ chức công việc thi công theo phạm vi, kế hoạch và phương án đã thống nhất.",
    deliverables: ["Phạm vi", "Kế hoạch", "Tiến độ"],
  },
];

const steps = [
  ["01", "Tiếp nhận", "Gửi vị trí, hiện trạng và việc cần giải quyết."],
  ["02", "Kiểm tra", "Xác định thông tin đã có và phần còn thiếu."],
  ["03", "Đề xuất", "Thống nhất phạm vi, thời gian và chi phí dự kiến."],
  ["04", "Triển khai", "Thực hiện và cập nhật theo từng đầu việc."],
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
        data-label="0985 532 166"
      >
        <span>Zalo</span>
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
          <a href="#ve-minh-long" onClick={closeMenu}>Về Minh Long</a>
          <a href="#lien-he" onClick={closeMenu}>Liên hệ</a>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Minh Long · TP. Hồ Chí Minh</p>
            <h1>
              <span>Nhà đất</span>
              <em>cần rõ</em>
              <span>trước khi làm.</span>
            </h1>
            <p className={styles.heroLead}>
              Môi giới bất động sản, đo đạc hiện trạng, tư vấn thiết kế và xây dựng.
            </p>
          </div>

          <figure className={styles.heroMedia}>
            <img src="/images/architecture.jpg" alt="Nhà ở hiện đại — ảnh minh họa" />
            <figcaption>Ảnh minh họa · Kevin Menajang / Pexels</figcaption>
          </figure>

          <div className={styles.heroSeal} aria-hidden="true">
            <strong>04</strong>
            <span>lĩnh vực</span>
          </div>

          <dl className={styles.heroFacts}>
            <div><dt>Văn phòng</dt><dd>85 Hưng Nhơn, TP.HCM</dd></div>
            <div><dt>Giờ làm việc</dt><dd>07:00–11:00 · 13:30–17:00</dd></div>
          </dl>
        </section>

        <div className={styles.serviceRail} aria-label="Bốn lĩnh vực dịch vụ">
          {services.map((service) => (
            <a href={`#service-${service.number}`} key={service.number}>
              <span>{service.number}</span>{service.title}
            </a>
          ))}
        </div>

        <section className={styles.serviceSection} id="dich-vu">
          <div className={styles.sectionHeading}>
            <p>Dịch vụ</p>
            <h2>Bốn phần việc.<br />Một nơi tiếp nhận.</h2>
            <span>Từng phần việc được xác định riêng về phạm vi, thông tin cần có và cách triển khai.</span>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} id={`service-${service.number}`} key={service.number}>
                <div className={styles.serviceTopline}>
                  <span>{service.number}</span>
                  <i aria-hidden="true" />
                </div>
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
          <div className={styles.workIntro}>
            <p>Quy trình làm việc</p>
            <h2>Rõ việc trước.<br />Triển khai sau.</h2>
          </div>
          <div className={styles.stepGrid}>
            {steps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.aboutSection} id="ve-minh-long">
          <p>Về Minh Long</p>
          <h2>Làm việc trực tiếp tại TP. Hồ Chí Minh.</h2>
          <dl>
            <div><dt>Địa chỉ</dt><dd>85 Hưng Nhơn, TP. Hồ Chí Minh</dd></div>
            <div><dt>Thời gian</dt><dd>07:00–11:00<br />13:30–17:00</dd></div>
          </dl>
          <a href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noreferrer">
            Xem vị trí trên Google Maps <span>↗</span>
          </a>
        </section>

        <section className={styles.contactSection} id="lien-he">
          <div>
            <p>Liên hệ Minh Long</p>
            <h2>Trao đổi<br />việc cần làm.</h2>
            <span>Gửi vị trí và thông tin hiện trạng để Minh Long tiếp nhận.</span>
          </div>
          <div className={styles.contactList}>
            <a href="tel:+84938202102"><span>Điện thoại</span><strong>0938 202 102</strong><i>↗</i></a>
            <a href="https://zalo.me/0985532166" target="_blank" rel="noreferrer"><span>Zalo</span><strong>0985 532 166</strong><i>↗</i></a>
            <a href="https://m.me/61592556041235" target="_blank" rel="noreferrer"><span>Messenger</span><strong>Minh Long</strong><i>↗</i></a>
            <a href="mailto:contact.minhlongcorp@gmail.com"><span>Email</span><strong>contact.minhlongcorp@gmail.com</strong><i>↗</i></a>
          </div>
        </section>
      </main>

      <ContactIcons />

      <button className={styles.legalDock} type="button" onClick={() => setAgentOpen(true)} aria-label="Mở Minh Long Legal Agent">
        <span>ML</span><b>Hỏi pháp lý</b>
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
