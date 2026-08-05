"use client";

import { useEffect, useState } from "react";
import ChatClient from "./tro-ly-phap-ly/chat-client";
import styles from "./home.module.css";

const services = [
  ["01", "Môi giới bất động sản", "Tiếp nhận nhu cầu, sàng lọc thông tin và hỗ trợ chuẩn bị giao dịch nhà đất."],
  ["02", "Đo đạc hiện trạng", "Khảo sát, đo vẽ hiện trạng phục vụ hồ sơ, thiết kế hoặc chuẩn bị thi công."],
  ["03", "Tư vấn thiết kế", "Lập phương án công năng và không gian phù hợp khu đất, nhu cầu và ngân sách."],
  ["04", "Xây dựng", "Tổ chức công việc thi công theo phạm vi, kế hoạch và phương án đã thống nhất."],
];

const steps = [
  ["01", "Tiếp nhận nhu cầu", "Vị trí, hiện trạng và nội dung cần giải quyết."],
  ["02", "Kiểm tra thông tin", "Xác định dữ liệu đã có và phần còn thiếu."],
  ["03", "Thống nhất phương án", "Phạm vi, thời gian và chi phí dự kiến."],
  ["04", "Triển khai công việc", "Thực hiện và cập nhật theo từng đầu việc."],
];

function Brand() {
  return (
    <span className={styles.brandLockup}>
      <img src="/logo-minh-long-brand.png" alt="Minh Long" />
    </span>
  );
}

function FloatingContact() {
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
        Zalo
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

function ServiceTile({
  className,
  image,
  number,
  title,
  copy,
}: {
  className: string;
  image?: string;
  number: string;
  title: string;
  copy: string;
}) {
  return (
    <article className={`${styles.serviceTile} ${className}`}>
      {image ? <img src={image} alt={`${title} — ảnh minh họa`} /> : <div className={styles.blueprint} aria-hidden="true" />}
      <div className={styles.tileShade} />
      <div className={styles.tileCopy}>
        <span>{number}</span>
        <h3>{title}</h3>
        <p>{copy}</p>
      </div>
      <small>Ảnh minh họa · Pexels</small>
    </article>
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
          <a href="#gioi-thieu">Giới thiệu</a>
          <a href="#dich-vu">Lĩnh vực hoạt động</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#lien-he">Liên hệ</a>
        </nav>
        <div className={styles.headerMeta}>
          <span>TP. HỒ CHÍ MINH</span>
          <i />
        </div>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span />
        </button>
        <div id="mobile-navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
          <a href="#gioi-thieu" onClick={closeMenu}>Giới thiệu</a>
          <a href="#dich-vu" onClick={closeMenu}>Lĩnh vực hoạt động</a>
          <a href="#quy-trinh" onClick={closeMenu}>Quy trình</a>
          <a href="#lien-he" onClick={closeMenu}>Liên hệ</a>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="top">
          <img className={styles.heroImage} src="/images/architecture.jpg" alt="Kiến trúc nhà ở — ảnh minh họa" />
          <div className={styles.heroOverlay} />
          <div className={styles.heroContent}>
            <p>MINH LONG · TP. HỒ CHÍ MINH</p>
            <h1>Giải pháp nhà đất<br />và công trình</h1>
            <span>Môi giới bất động sản · Đo đạc · Thiết kế · Xây dựng</span>
          </div>
          <div className={styles.heroServices}>
            {services.map(([number, title]) => (
              <a href="#dich-vu" key={number}><span>{number}</span>{title}</a>
            ))}
          </div>
          <div className={styles.heroCredit}>Ảnh minh họa · Kevin Menajang / Pexels</div>
        </section>

        <section className={styles.intro} id="gioi-thieu">
          <div className={styles.sectionIndex}>01 / GIỚI THIỆU</div>
          <div className={styles.introMain}>
            <p>MINH LONG</p>
            <h2>Tiếp nhận công việc về nhà đất, đo đạc, thiết kế và xây dựng tại TP. Hồ Chí Minh.</h2>
          </div>
          <dl className={styles.introFacts}>
            <div><dt>Văn phòng</dt><dd>85 Hưng Nhơn, TP.HCM</dd></div>
            <div><dt>Giờ làm việc</dt><dd>07:00–11:00<br />13:30–17:00</dd></div>
          </dl>
        </section>

        <section className={styles.servicesSection} id="dich-vu">
          <header className={styles.sectionHeader}>
            <div className={styles.sectionIndex}>02 / DỊCH VỤ</div>
            <h2>Lĩnh vực hoạt động</h2>
            <p>Thông tin và hình ảnh dưới đây dùng để giới thiệu phạm vi dịch vụ, không phải hồ sơ dự án đã thực hiện.</p>
          </header>
          <div className={styles.serviceMosaic}>
            <ServiceTile
              className={styles.propertyTile}
              number="01"
              title="Môi giới bất động sản"
              copy="Nhu cầu · Thông tin · Giao dịch"
            />
            <ServiceTile
              className={styles.surveyTile}
              image="/images/survey.jpg"
              number="02"
              title="Đo đạc hiện trạng"
              copy="Khảo sát · Số liệu · Bản vẽ"
            />
            <ServiceTile
              className={styles.designTile}
              image="/images/design.jpg"
              number="03"
              title="Tư vấn thiết kế"
              copy="Công năng · Phương án · Hồ sơ"
            />
            <ServiceTile
              className={styles.buildTile}
              image="/images/architecture.jpg"
              number="04"
              title="Xây dựng"
              copy="Phạm vi · Kế hoạch · Tiến độ"
            />
          </div>
        </section>

        <section className={styles.processSection} id="quy-trinh">
          <header className={styles.sectionHeaderDark}>
            <div className={styles.sectionIndex}>03 / QUY TRÌNH</div>
            <h2>Bốn bước làm việc</h2>
          </header>
          <div className={styles.processGrid}>
            {steps.map(([number, title, description]) => (
              <article key={number}>
                <span>{number}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.contactSection} id="lien-he">
          <div className={styles.contactIntro}>
            <div className={styles.sectionIndex}>04 / LIÊN HỆ</div>
            <h2>Trao đổi trực tiếp với Minh Long</h2>
            <p>Gửi vị trí và thông tin hiện trạng để Minh Long tiếp nhận.</p>
            <a href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noreferrer">
              85 Hưng Nhơn, TP. Hồ Chí Minh <span>↗</span>
            </a>
          </div>
          <div className={styles.contactList}>
            <a href="tel:+84938202102"><span>Điện thoại</span><strong>0938 202 102</strong><i>↗</i></a>
            <a href="https://zalo.me/0985532166" target="_blank" rel="noreferrer"><span>Zalo</span><strong>0985 532 166</strong><i>↗</i></a>
            <a href="https://m.me/61592556041235" target="_blank" rel="noreferrer"><span>Messenger</span><strong>Minh Long</strong><i>↗</i></a>
            <a href="mailto:contact.minhlongcorp@gmail.com"><span>Email</span><strong>contact.minhlongcorp@gmail.com</strong><i>↗</i></a>
          </div>
        </section>
      </main>

      <FloatingContact />

      <button className={styles.legalDock} type="button" onClick={() => setAgentOpen(true)} aria-label="Mở Minh Long Legal Agent">
        <span>ML</span><b>Trợ lý pháp lý</b>
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
        <div>
          <strong>MINH LONG</strong>
          <p>Môi giới bất động sản · Tư vấn thiết kế · Xây dựng · Đo đạc</p>
        </div>
        <div className={styles.footerMeta}>
          <a href="https://www.facebook.com/profile.php?id=61592556041235" target="_blank" rel="noreferrer">Facebook</a>
          <a href="mailto:contact.minhlongcorp@gmail.com">Email</a>
          <small>© 2026 Minh Long · Ảnh minh họa sử dụng theo giấy phép Pexels</small>
        </div>
      </footer>
    </div>
  );
}
