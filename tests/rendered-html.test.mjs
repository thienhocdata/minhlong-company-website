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
  assert.match(html, /href="#legal-agent"/);
  assert.match(html, /href="#lien-he"/);
  assert.match(html, /Legal Agent có thay thế luật sư không\?/);
  assert.match(html, /hotline và email sẽ được bổ sung/i);
});
