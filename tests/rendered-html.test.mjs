import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://minhlong.example/", {
      headers: {
        accept: "text/html",
        host: "minhlong.example",
        "x-forwarded-host": "minhlong.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete Minh Long landing page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(
    html,
    /<title>Minh Long \| Bất động sản, thiết kế, xây dựng &amp; đo đạc<\/title>/i,
  );
  assert.match(html, /Một đầu mối\./);
  assert.match(html, /Môi giới bất động sản/);
  assert.match(html, /Tư vấn thiết kế/);
  assert.match(html, /Đo đạc hiện trạng/);
  assert.match(html, /Minh Long Legal Agent/);
  assert.match(html, /85 Hưng Nhơn/);
  assert.match(html, /https:\/\/minhlong\.example\/og\.png/);
  assert.doesNotMatch(html, /react-loading-skeleton|Your site is taking shape/i);
});

test("renders the key navigation and disclosure content", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /href="#dich-vu"/);
  assert.match(html, /href="#quy-trinh"/);
  assert.match(html, /aria-label="Minh Long Legal Agent"/);
  assert.doesNotMatch(html, /href="\/tro-ly-phap-ly"/);
  assert.match(html, /href="#lien-he"/);
  assert.match(html, /Legal Agent có thay thế luật sư không\?/);
  assert.match(html, /0938 202 102/);
  assert.match(html, /0985 532 166/);
  assert.match(html, /contact\.minhlongcorp@gmail\.com/);
  assert.match(html, /07:00 – 17:00/);
  assert.match(html, /https:\/\/www\.facebook\.com\/profile\.php\?id=61592556041235/);
  assert.match(html, /https:\/\/m\.me\/61592556041235/);
});

test("server-renders the dedicated Legal Agent conversation page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("agent", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://minhlong.example/tro-ly-phap-ly", {
      headers: {
        accept: "text/html",
        host: "minhlong.example",
        "x-forwarded-host": "minhlong.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Bạn cần hỗ trợ gì\?/);
  assert.match(html, /MINH LONG LEGAL AGENT/);
  assert.match(html, /Hỏi bất kỳ điều gì về tình huống đất đai/);
  assert.match(html, /Cuộc trò chuyện mới/);
  assert.doesNotMatch(html, /Đăng ký trải nghiệm/);
});

test("Legal Agent gateway does not expose history without a signed session", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("gateway", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("https://minhlong.example/api/legal-agent", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "history" }),
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { messages: [] });
});
