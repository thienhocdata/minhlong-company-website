"use client";

import { useEffect, useRef, useState } from "react";
import ChatClient from "./tro-ly-phap-ly/chat-client";
import styles from "./home.module.css";

const services = [
  {
    number: "01",
    short: "Môi giới",
    title: "Môi giới bất động sản",
    copy: "Tiếp nhận nhu cầu, sàng lọc thông tin và đồng hành trong quá trình tìm kiếm, thương lượng, chuẩn bị giao dịch.",
    note: "Giao dịch bắt đầu bằng thông tin rõ ràng.",
    image: "/images/architecture.jpg",
    credit: "Kevin Menajang / Pexels",
  },
  {
    number: "02",
    short: "Đo đạc",
    title: "Đo đạc hiện trạng",
    copy: "Khảo sát, đo vẽ và chuẩn bị dữ liệu hiện trạng phục vụ thiết kế, xây dựng cùng các bước xử lý hồ sơ.",
    note: "Biết đúng hiện trạng trước khi đưa ra phương án.",
    image: "/images/survey.jpg",
    credit: "Nelson Axigoth / Pexels",
  },
  {
    number: "03",
    short: "Thiết kế",
    title: "Tư vấn thiết kế",
    copy: "Phát triển phương án công năng và không gian bám sát khu đất, nhu cầu sử dụng cùng ngân sách dự kiến.",
    note: "Biến dữ liệu thành một phương án có thể trao đổi.",
    image: "/images/design.jpg",
    credit: "Ron Lach / Pexels",
  },
  {
    number: "04",
    short: "Xây dựng",
    title: "Xây dựng",
    copy: "Tổ chức triển khai theo từng giai đoạn, phối hợp đầu việc kỹ thuật và làm rõ phạm vi trước khi thi công.",
    note: "Đưa phương án từ bản vẽ ra công trình.",
    image: "/images/architecture.jpg",
    credit: "Kevin Menajang / Pexels",
  },
];

const steps = [
  ["01", "Nhìn hiện trạng", "Làm rõ khu đất, hồ sơ đang có và mục tiêu thực tế."],
  ["02", "Nối chuyên môn", "Xác định đầu việc nào cần môi giới, đo đạc, thiết kế hoặc xây dựng."],
  ["03", "Chốt phương án", "Thống nhất phạm vi, thứ tự thực hiện và các điểm cần kiểm tra thêm."],
  ["04", "Theo sát triển khai", "Duy trì một đầu mối để các phần việc không bị rời rạc."],
];

const faqs = [
  [
    "Minh Long hoạt động ở khu vực nào?",
    "Minh Long tập trung phục vụ tại TP. Hồ Chí Minh và trao đổi các nhu cầu ở khu vực lân cận tùy tính chất công việc.",
  ],
  [
    "Tôi chưa biết mình cần dịch vụ nào thì sao?",
    "Bạn chỉ cần mô tả hiện trạng và mục tiêu. Minh Long sẽ giúp phân loại đầu việc trước khi đề xuất bước phù hợp.",
  ],
  [
    "Legal Agent có thay thế luật sư không?",
    "Không. Legal Agent hỗ trợ giải thích sơ bộ, nhận diện dữ kiện còn thiếu và truy xuất nguồn. Kết luận quan trọng vẫn cần người có chuyên môn kiểm tra.",
  ],
];

function Brand() {
  return (
    <span className={styles.brandLockup}>
      <img src="/logo-minh-long-brand.png" alt="Minh Long" />
    </span>
  );
}

export default function HomeExperience() {
  const [activeService, setActiveService] = useState(0);
  const [headerCompact, setHeaderCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [agentOpen, setAgentOpen] = useState(false);
  const heroVisualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;
    const updateScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
        document.documentElement.style.setProperty("--ml-progress", `${window.scrollY / max}`);
        setHeaderCompact(window.scrollY > 24);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add(styles.visible);
        });
      },
      { threshold: 0.14 },
    );

    document.querySelectorAll(`.${styles.reveal}`).forEach((element) => observer.observe(element));
    window.addEventListener("scroll", updateScroll, { passive: true });
    updateScroll();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
    };
  }, []);

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

  const moveHero = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!heroVisualRef.current) return;
    const rect = heroVisualRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroVisualRef.current.style.setProperty("--move-x", `${x * 14}px`);
    heroVisualRef.current.style.setProperty("--move-y", `${y * 10}px`);
  };

  const resetHero = () => {
    heroVisualRef.current?.style.setProperty("--move-x", "0px");
    heroVisualRef.current?.style.setProperty("--move-y", "0px");
  };

  return (
    <div className={styles.site}>
      <div className={styles.progress} aria-hidden="true" />
      <header className={`${styles.header} ${headerCompact ? styles.headerCompact : ""}`}>
        <a href="#top" aria-label="Minh Long — về đầu trang"><Brand /></a>
        <nav className={styles.nav} aria-label="Điều hướng chính">
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#nang-luc">Năng lực</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#ve-minh-long">Về Minh Long</a>
        </nav>
        <div className={styles.headerActions}>
          <button className={styles.agentLink} type="button" onClick={() => setAgentOpen(true)}>Legal Agent</button>
          <a className={styles.primaryHeaderLink} href="#lien-he">Trao đổi nhu cầu</a>
        </div>
        <button
          className={styles.menuButton}
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /> <span />
          <b>{menuOpen ? "Đóng" : "Menu"}</b>
        </button>
        <div id="mobile-navigation" className={`${styles.mobileNav} ${menuOpen ? styles.mobileNavOpen : ""}`}>
          {[["Dịch vụ", "#dich-vu"], ["Năng lực", "#nang-luc"], ["Quy trình", "#quy-trinh"], ["Về Minh Long", "#ve-minh-long"], ["Liên hệ", "#lien-he"]].map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button type="button" onClick={() => { setMenuOpen(false); setAgentOpen(true); }}>Legal Agent</button>
        </div>
      </header>

      <main>
        <section className={styles.hero} id="top">
          <div className={styles.heroBlueprint} aria-hidden="true">
            <span className={styles.blueprintAxisX} />
            <span className={styles.blueprintAxisY} />
            <span className={styles.blueprintRoomA} />
            <span className={styles.blueprintRoomB} />
            <small>RANH THAM CHIẾU · 85 HƯNG NHƠN</small>
          </div>
          <div className={styles.heroCopy}>
            <p className={styles.kicker}>TP. HỒ CHÍ MINH · 85 HƯNG NHƠN</p>
            <h1>
              <span>Từ ranh đất</span>
              <span>đến <em>mái nhà.</em></span>
            </h1>
            <p className={styles.heroLead}>Một đầu mối. Bốn chuyên môn xuyên suốt cho môi giới, đo đạc, thiết kế và xây dựng.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#lien-he">Bắt đầu từ hiện trạng <span>↗</span></a>
              <a className={styles.textButton} href="#quy-trinh">Xem cách Minh Long làm việc <span>↓</span></a>
            </div>
          </div>

          <div
            className={styles.heroVisual}
            ref={heroVisualRef}
            onPointerMove={moveHero}
            onPointerLeave={resetHero}
          >
            <div className={styles.parcelBorder} aria-hidden="true" />
            <div className={styles.parcelImage}>
              <img src="/images/architecture.jpg" alt="Kiến trúc nhà ở nhiệt đới hiện đại — ảnh minh họa" />
              <span>Ảnh minh họa · Kevin Menajang / Pexels</span>
            </div>
            <div className={styles.measurePointA} aria-hidden="true" />
            <div className={styles.measurePointB} aria-hidden="true" />
            <div className={styles.measureCaption} aria-hidden="true">
              <b>ML–01</b><span>HIỆN TRẠNG → PHƯƠNG ÁN</span>
            </div>
          </div>

          <div className={styles.journeyRail} id="dich-vu">
            <div className={styles.journeyLine}><span style={{ width: `${(activeService / 3) * 100}%` }} /></div>
            {services.map((service, index) => (
              <button
                key={service.number}
                type="button"
                className={activeService === index ? styles.journeyActive : ""}
                onMouseEnter={() => setActiveService(index)}
                onFocus={() => setActiveService(index)}
                onClick={() => setActiveService(index)}
                aria-pressed={activeService === index}
              >
                <span>{service.number}</span>
                <b>{service.short}</b>
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.serviceStory} ${styles.reveal}`} id="nang-luc">
          <div className={styles.sectionIndex}>
            <span>01</span><b>NĂNG LỰC KẾT NỐI</b>
          </div>
          <div className={styles.statement}>
            <h2>Một khu đất.<br />Bốn góc nhìn.<br /><em>Một phương án thống nhất.</em></h2>
            <p>Không bắt đầu bằng việc bán một gói dịch vụ. Minh Long bắt đầu bằng cách nhìn toàn bộ bài toán để biết việc gì cần làm trước.</p>
          </div>

          <div className={styles.serviceInteractive}>
            <div className={styles.servicePhoto}>
              {services.map((service, index) => (
                <img
                  key={service.number}
                  className={activeService === index ? styles.servicePhotoActive : ""}
                  src={service.image}
                  alt={`${service.title} — ảnh minh họa`}
                />
              ))}
              <span>{services[activeService].credit} · Ảnh minh họa</span>
            </div>
            <div className={styles.serviceDetails} aria-live="polite">
              <span className={styles.serviceNumber}>{services[activeService].number}</span>
              <p className={styles.serviceNote}>{services[activeService].note}</p>
              <h3>{services[activeService].title}</h3>
              <p>{services[activeService].copy}</p>
              <div className={styles.serviceTabs}>
                {services.map((service, index) => (
                  <button
                    type="button"
                    key={service.number}
                    className={activeService === index ? styles.serviceTabActive : ""}
                    onClick={() => setActiveService(index)}
                    aria-label={`Xem ${service.title}`}
                  >{service.number}</button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`${styles.process} ${styles.reveal}`} id="quy-trinh">
          <div className={styles.sectionIndexLight}>
            <span>02</span><b>QUY TRÌNH</b>
          </div>
          <div className={styles.processIntro}>
            <p>ĐƯỜNG ĐI CỦA MỘT YÊU CẦU</p>
            <h2>Rõ từng bước.<br />Không rời từng phần.</h2>
          </div>
          <div className={styles.processSteps}>
            {steps.map(([number, title, copy]) => (
              <article key={number}>
                <span>{number}</span>
                <div />
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className={styles.processTrace} aria-hidden="true"><span /><i /><b /></div>
        </section>

        <section className={`${styles.agentSection} ${styles.reveal}`}>
          <div className={styles.sectionIndex}>
            <span>03</span><b>CÔNG CỤ HỖ TRỢ</b>
          </div>
          <div className={styles.agentMark} aria-hidden="true">ML<span>AI</span></div>
          <div className={styles.agentCopy}>
            <p>Minh Long Legal Agent</p>
            <h2>Hỏi trước.<br />Hiểu rõ hơn.<br />Rồi mới quyết định.</h2>
            <p>Trợ lý hỗ trợ giải thích sơ bộ vấn đề pháp luật đất đai, nhận diện dữ kiện còn thiếu và dẫn nguồn để bạn chuẩn bị cuộc trao đổi hiệu quả hơn.</p>
            <button type="button" onClick={() => setAgentOpen(true)}>Bắt đầu cuộc trò chuyện <span>↗</span></button>
            <small>Không thay thế luật sư hoặc cơ quan có thẩm quyền.</small>
          </div>
        </section>

        <section className={`${styles.about} ${styles.reveal}`} id="ve-minh-long">
          <div className={styles.aboutGrid} aria-hidden="true"><span /><span /><span /><span /></div>
          <div className={styles.aboutCopy}>
            <p>VỀ MINH LONG</p>
            <h2>Gần hiện trạng.<br />Gần người làm.<br />Gần quyết định.</h2>
          </div>
          <div className={styles.aboutText}>
            <p>Minh Long hoạt động tại TP. Hồ Chí Minh và khu vực lân cận, kết nối các đầu việc bất động sản cùng kỹ thuật công trình trong một quy trình phối hợp.</p>
            <div>
              <span>Văn phòng</span>
              <strong>85 Hưng Nhơn<br />TP. Hồ Chí Minh</strong>
              <a href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noreferrer">Mở bản đồ ↗</a>
            </div>
          </div>
        </section>

        <section className={`${styles.faq} ${styles.reveal}`}>
          <div>
            <p>CÂU HỎI THƯỜNG GẶP</p>
            <h2>Trao đổi rõ<br />từ đầu.</h2>
          </div>
          <div className={styles.faqList}>
            {faqs.map(([question, answer], index) => (
              <details key={question}>
                <summary><span>{String(index + 1).padStart(2, "0")}</span>{question}<b>+</b></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className={styles.contact} id="lien-he">
          <div className={styles.contactLine} aria-hidden="true"><span /><i /><b /></div>
          <p>BẮT ĐẦU TỪ HIỆN TRẠNG</p>
          <h2>Bạn có một khu đất<br />hoặc một quyết định<br /><em>cần nhìn cho rõ?</em></h2>
          <div className={styles.contactFooter}>
            <p>Hãy mô tả ngắn nhu cầu của bạn. Minh Long sẽ cùng xác định bước đầu tiên phù hợp.</p>
            <a href="tel:+84938202102">Gọi 0938 202 102 <span>↗</span></a>
            <div className={styles.contactChannels}>
              <a href="https://zalo.me/0985532166" target="_blank" rel="noreferrer"><span>Zalo</span><strong>0985 532 166</strong></a>
              <a href="https://www.facebook.com/profile.php?id=61592556041235" target="_blank" rel="noreferrer"><span>Facebook</span><strong>Minh Long</strong></a>
              <a href="https://m.me/61592556041235" target="_blank" rel="noreferrer"><span>Messenger</span><strong>Nhắn tin trực tiếp</strong></a>
              <a href="mailto:contact.minhlongcorp@gmail.com"><span>Email</span><strong>contact.minhlongcorp@gmail.com</strong></a>
              <a href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh" target="_blank" rel="noreferrer"><span>Văn phòng</span><strong>85 Hưng Nhơn, TP.HCM</strong></a>
              <div><span>Giờ làm việc</span><strong>07:00 – 17:00</strong></div>
            </div>
          </div>
        </section>
      </main>

      <div className={styles.quickContact} aria-label="Liên hệ nhanh">
        <a href="tel:+84938202102"><span>Gọi</span><b>0938 202 102</b></a>
        <a href="https://zalo.me/0985532166" target="_blank" rel="noreferrer"><span>Zalo</span><b>0985 532 166</b></a>
      </div>

      <a
        className={styles.messengerDock}
        href="https://m.me/61592556041235"
        target="_blank"
        rel="noreferrer"
        aria-label="Nhắn tin với Minh Long qua Messenger"
      >
        <span className={styles.messengerIcon} aria-hidden="true" />
        <span className={styles.messengerCopy}><strong>Messenger</strong><small>Nhắn tin với Minh Long</small></span>
      </a>

      <button className={styles.legalDock} type="button" onClick={() => setAgentOpen(true)}><span>ML</span><b>Hỏi pháp lý</b><i>↗</i></button>

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
        <p>Cty môi giới bất động sản, tư vấn thiết kế, xây dựng, đo đạc Minh Long</p>
        <div className={styles.footerContact}>
          <a href="tel:+84938202102">0938 202 102</a>
          <a href="mailto:contact.minhlongcorp@gmail.com">contact.minhlongcorp@gmail.com</a>
          <small>© 2026 Minh Long · Ảnh minh họa: Pexels</small>
        </div>
      </footer>
    </div>
  );
}
