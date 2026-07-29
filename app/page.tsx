const services = [
  {
    index: "01",
    title: "Môi giới bất động sản",
    description:
      "Tiếp nhận nhu cầu, sàng lọc thông tin và đồng hành trong quá trình tìm kiếm, thương lượng, chuẩn bị giao dịch.",
    tags: ["Nhà đất", "Kết nối giao dịch", "Hỗ trợ hồ sơ"],
  },
  {
    index: "02",
    title: "Tư vấn thiết kế",
    description:
      "Phát triển phương án công năng, không gian và hồ sơ thiết kế bám sát hiện trạng, nhu cầu sử dụng và ngân sách.",
    tags: ["Kiến trúc", "Công năng", "Hồ sơ thiết kế"],
  },
  {
    index: "03",
    title: "Xây dựng",
    description:
      "Tổ chức thi công theo từng giai đoạn, phối hợp các đầu việc kỹ thuật và minh bạch phạm vi triển khai.",
    tags: ["Nhà ở", "Cải tạo", "Thi công"],
  },
  {
    index: "04",
    title: "Đo đạc hiện trạng",
    description:
      "Khảo sát, đo vẽ và chuẩn bị dữ liệu hiện trạng phục vụ thiết kế, xây dựng và các bước xử lý hồ sơ.",
    tags: ["Khảo sát", "Đo vẽ", "Hiện trạng"],
  },
];

const process = [
  {
    number: "01",
    title: "Lắng nghe nhu cầu",
    copy: "Xác định mục tiêu, hiện trạng và đầu việc thực sự cần giải quyết.",
  },
  {
    number: "02",
    title: "Kiểm tra thông tin",
    copy: "Rà soát dữ liệu ban đầu, các điểm còn thiếu và rủi ro cần làm rõ.",
  },
  {
    number: "03",
    title: "Đề xuất phương án",
    copy: "Trình bày phạm vi, lộ trình và người phụ trách trước khi triển khai.",
  },
  {
    number: "04",
    title: "Theo sát thực hiện",
    copy: "Cập nhật tiến độ và phối hợp xuyên suốt giữa các nhóm chuyên môn.",
  },
];

const faqs = [
  {
    question: "Minh Long hoạt động ở khu vực nào?",
    answer:
      "Minh Long tập trung phục vụ tại TP. Hồ Chí Minh và có thể trao đổi các nhu cầu ở khu vực lân cận tùy tính chất công việc.",
  },
  {
    question: "Tôi chưa biết mình cần dịch vụ nào thì sao?",
    answer:
      "Bạn chỉ cần mô tả tình huống và mục tiêu. Minh Long sẽ giúp phân loại đầu việc trước khi đề xuất dịch vụ phù hợp.",
  },
  {
    question: "Legal Agent có thay thế luật sư không?",
    answer:
      "Không. Legal Agent hỗ trợ giải thích sơ bộ, nhận diện dữ kiện còn thiếu và truy xuất nguồn để chuẩn bị trao đổi hiệu quả hơn. Kết luận quan trọng vẫn cần người có chuyên môn kiểm tra.",
  },
  {
    question: "Thông tin công trình và hồ sơ được xử lý thế nào?",
    answer:
      "Mỗi yêu cầu cần được xác định rõ phạm vi tiếp nhận, người phụ trách và mục đích sử dụng dữ liệu trước khi triển khai chính thức.",
  },
];

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span>M</span>
      <i />
      <span>L</span>
    </span>
  );
}

export default function Home() {
  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Minh Long — về đầu trang">
          <BrandMark />
          <span className="brand-copy">
            <strong>MINH LONG</strong>
            <small>Bất động sản &amp; kỹ thuật công trình</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          <a href="#dich-vu">Dịch vụ</a>
          <a href="#loi-the">Lợi thế</a>
          <a href="#quy-trinh">Quy trình</a>
          <a href="#legal-agent">Legal Agent</a>
        </nav>

        <a className="header-cta" href="#lien-he">
          Trao đổi nhu cầu <span aria-hidden="true">↗</span>
        </a>

        <details className="mobile-menu">
          <summary aria-label="Mở menu">Menu</summary>
          <div>
            <a href="#dich-vu">Dịch vụ</a>
            <a href="#loi-the">Lợi thế</a>
            <a href="#quy-trinh">Quy trình</a>
            <a href="#legal-agent">Legal Agent</a>
            <a href="#lien-he">Liên hệ</a>
          </div>
        </details>
      </header>

      <main>
        <section className="hero" id="top">
          <div className="hero-copy">
            <p className="eyebrow">
              <span />
              TP. Hồ Chí Minh &amp; khu vực lân cận
            </p>
            <h1>
              Một đầu mối.
              <br />
              <em>Nhiều chuyên môn.</em>
              <br />
              Một phương án rõ ràng.
            </h1>
            <p className="hero-lead">
              Minh Long kết nối các đầu việc bất động sản, thiết kế, xây dựng và
              đo đạc trong một quy trình phối hợp thống nhất — để bạn biết mình
              đang ở đâu và cần làm gì tiếp theo.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#dich-vu">
                Khám phá dịch vụ <span aria-hidden="true">→</span>
              </a>
              <a className="text-link" href="#legal-agent">
                Gặp trợ lý pháp lý <span aria-hidden="true">↗</span>
              </a>
            </div>
            <div className="hero-proof" aria-label="Phạm vi hoạt động">
              <div>
                <strong>04</strong>
                <span>nhóm dịch vụ kết nối</span>
              </div>
              <div>
                <strong>01</strong>
                <span>đầu mối xuyên suốt</span>
              </div>
              <div>
                <strong>HCM</strong>
                <span>địa bàn trọng tâm</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-label="Minh họa bản vẽ công trình">
            <div className="visual-grid" />
            <div className="plan-label">
              <span>ML / 2026</span>
              <span>PHƯƠNG ÁN TỔNG THỂ</span>
            </div>
            <div className="building-form" aria-hidden="true">
              <div className="building-tower tower-one" />
              <div className="building-tower tower-two" />
              <div className="building-base" />
              <div className="measurement-line line-one">
                <span>12.40 M</span>
              </div>
              <div className="measurement-line line-two">
                <span>08.20 M</span>
              </div>
            </div>
            <div className="visual-note note-one">
              <span>01</span>
              <p>Hiện trạng</p>
            </div>
            <div className="visual-note note-two">
              <span>02</span>
              <p>Phương án</p>
            </div>
            <div className="visual-caption">
              <small>Từ dữ liệu ban đầu</small>
              <strong>đến phương án có thể triển khai.</strong>
            </div>
          </div>
        </section>

        <section className="principles" aria-label="Nguyên tắc làm việc">
          <p>Hiểu đúng hiện trạng</p>
          <span>◆</span>
          <p>Rõ phạm vi công việc</p>
          <span>◆</span>
          <p>Phối hợp nhiều chuyên môn</p>
          <span>◆</span>
          <p>Theo sát từng bước</p>
        </section>

        <section className="section services" id="dich-vu">
          <div className="section-heading">
            <div>
              <p className="eyebrow">
                <span />
                Dịch vụ
              </p>
              <h2>Đủ chuyên môn cho một hành trình liền mạch.</h2>
            </div>
            <p>
              Không bắt đầu bằng việc bán một gói dịch vụ. Minh Long bắt đầu
              bằng việc xác định đúng bài toán, sau đó kết nối những đầu việc
              cần thiết.
            </p>
          </div>

          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.index}>
                <div className="service-top">
                  <span className="service-index">{service.index}</span>
                  <span className="service-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <div className="tag-list">
                  {service.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section advantage" id="loi-the">
          <div className="advantage-visual">
            <div className="survey-frame">
              <span className="corner corner-a" />
              <span className="corner corner-b" />
              <span className="corner corner-c" />
              <span className="corner corner-d" />
              <div className="survey-axis axis-x" />
              <div className="survey-axis axis-y" />
              <div className="survey-center">
                <BrandMark />
              </div>
              <p className="coordinate coordinate-a">10°45&apos;N</p>
              <p className="coordinate coordinate-b">106°40&apos;E</p>
            </div>
          </div>
          <div className="advantage-copy">
            <p className="eyebrow light">
              <span />
              Lợi thế Minh Long
            </p>
            <h2>Một bức tranh tổng thể thay vì nhiều đầu việc rời rạc.</h2>
            <p className="advantage-intro">
              Một quyết định bất động sản thường chạm đến hiện trạng, pháp lý,
              thiết kế và khả năng thi công. Khi những phần này được nhìn cùng
              nhau từ đầu, phương án trở nên thực tế hơn.
            </p>
            <ul className="advantage-list">
              <li>
                <strong>Thông tin có cấu trúc</strong>
                <span>Biết dữ kiện nào đã có và phần nào cần kiểm tra thêm.</span>
              </li>
              <li>
                <strong>Phối hợp đúng người</strong>
                <span>Đầu việc được chuyển đến nhóm chuyên môn phù hợp.</span>
              </li>
              <li>
                <strong>Hướng đi có thứ tự</strong>
                <span>Ưu tiên việc quan trọng trước khi phát sinh chi phí lớn.</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="section process" id="quy-trinh">
          <div className="section-heading process-heading">
            <div>
              <p className="eyebrow">
                <span />
                Quy trình
              </p>
              <h2>Rõ bước đi, rõ trách nhiệm.</h2>
            </div>
            <p>
              Mỗi yêu cầu có thể khác nhau, nhưng cách làm việc cần nhất quán:
              hiểu đúng, kiểm tra đủ và chỉ triển khai khi phạm vi đã rõ.
            </p>
          </div>
          <div className="process-grid">
            {process.map((item) => (
              <article key={item.number}>
                <span>{item.number}</span>
                <div className="process-line" />
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section agent-section" id="legal-agent">
          <div className="agent-copy">
            <p className="eyebrow light">
              <span />
              Minh Long Legal Agent
            </p>
            <h2>Hiểu tình huống trước khi bắt đầu thủ tục.</h2>
            <p>
              Trợ lý pháp luật đất đai giúp người dùng diễn đạt tình huống tự
              nhiên, nhận diện dữ kiện còn thiếu và xem căn cứ đã được truy
              xuất. Khi cần, cuộc trao đổi có thể được chuyển thành yêu cầu hỗ
              trợ cho nhân viên Minh Long.
            </p>
            <div className="agent-points">
              <span>Hội thoại tự nhiên</span>
              <span>Nguồn có kiểm soát</span>
              <span>Chuyển tiếp có đồng ý</span>
            </div>
            <a className="button button-light" href="#lien-he">
              Đăng ký trải nghiệm <span aria-hidden="true">→</span>
            </a>
          </div>

          <div className="chat-preview" aria-label="Minh họa Legal Agent">
            <div className="chat-head">
              <BrandMark />
              <div>
                <strong>Minh Long Legal Agent</strong>
                <small>
                  <i /> Đang hoạt động
                </small>
              </div>
            </div>
            <div className="chat-body">
              <div className="chat-message user">
                Tôi muốn kiểm tra điều kiện chuyển nhượng một thửa đất tại
                TP.HCM.
              </div>
              <div className="chat-message assistant">
                <span>ML</span>
                <p>
                  Mình có thể giúp bạn kiểm tra sơ bộ. Trước tiên, thửa đất hiện
                  có Giấy chứng nhận và đang thế chấp hay tranh chấp không?
                </p>
              </div>
              <div className="chat-source">
                <span>✓</span>
                Câu trả lời quan trọng được đối chiếu với nguồn pháp lý.
              </div>
            </div>
            <div className="chat-input">
              <span>Mô tả tình huống của bạn…</span>
              <b>→</b>
            </div>
          </div>
        </section>

        <section className="section locality">
          <div>
            <p className="eyebrow">
              <span />
              Khu vực phục vụ
            </p>
            <h2>Gần công trình. Gần nhu cầu. Dễ phối hợp.</h2>
          </div>
          <div className="locality-card">
            <div className="map-grid" aria-hidden="true">
              <span className="map-road road-a" />
              <span className="map-road road-b" />
              <span className="map-road road-c" />
              <span className="map-pin">
                <i />
              </span>
            </div>
            <div className="address-card">
              <small>Văn phòng Minh Long</small>
              <strong>85 Hưng Nhơn</strong>
              <p>TP. Hồ Chí Minh</p>
              <a
                href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh"
                target="_blank"
                rel="noreferrer"
              >
                Mở bản đồ <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </section>

        <section className="section faq">
          <div className="faq-heading">
            <p className="eyebrow">
              <span />
              Câu hỏi thường gặp
            </p>
            <h2>Trao đổi rõ từ đầu.</h2>
          </div>
          <div className="faq-list">
            {faqs.map((item, index) => (
              <details key={item.question}>
                <summary>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {item.question}
                  <i>+</i>
                </summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="contact" id="lien-he">
          <div className="contact-orbit orbit-one" />
          <div className="contact-orbit orbit-two" />
          <p className="eyebrow light">
            <span />
            Bắt đầu trao đổi
          </p>
          <h2>
            Bạn có một nhu cầu
            <br />
            cần được <em>nhìn tổng thể?</em>
          </h2>
          <p>
            Hãy chuẩn bị mô tả ngắn về bất động sản, hiện trạng hoặc công việc
            bạn đang quan tâm. Minh Long sẽ cùng bạn xác định bước đầu tiên phù
            hợp.
          </p>
          <div className="contact-actions">
            <a
              className="button button-copper"
              href="https://www.google.com/maps/search/?api=1&query=85%20H%C6%B0ng%20Nh%C6%A1n%2C%20H%E1%BB%93%20Ch%C3%AD%20Minh"
              target="_blank"
              rel="noreferrer"
            >
              Đến văn phòng <span aria-hidden="true">↗</span>
            </a>
            <span>Thông tin hotline và email sẽ được bổ sung sau khi Minh Long xác nhận.</span>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <BrandMark />
          <div>
            <strong>MINH LONG</strong>
            <p>Bất động sản · Thiết kế · Xây dựng · Đo đạc</p>
          </div>
        </div>
        <div className="footer-meta">
          <p>85 Hưng Nhơn, TP. Hồ Chí Minh</p>
          <p>© 2026 Minh Long. Bản website thử nghiệm.</p>
        </div>
      </footer>
    </div>
  );
}
