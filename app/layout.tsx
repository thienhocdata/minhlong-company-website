import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const metadataBase = new URL(
    host ? `${protocol}://${host}` : "http://localhost:3000",
  );

  return {
    metadataBase,
    title: "Minh Long | Bất động sản, thiết kế, xây dựng & đo đạc",
    description:
      "Minh Long kết nối dịch vụ bất động sản, tư vấn thiết kế, xây dựng, đo đạc và trợ lý pháp luật đất đai tại TP. Hồ Chí Minh.",
    keywords: [
      "Minh Long",
      "bất động sản TP.HCM",
      "tư vấn thiết kế",
      "xây dựng",
      "đo đạc",
      "pháp luật đất đai",
    ],
    openGraph: {
      type: "website",
      locale: "vi_VN",
      title: "Minh Long — Một đầu mối, nhiều chuyên môn",
      description:
        "Bất động sản, thiết kế, xây dựng, đo đạc và trợ lý pháp luật đất đai tại TP. Hồ Chí Minh.",
      siteName: "Minh Long",
      images: [
        {
          url: new URL("/og.png", metadataBase).toString(),
          width: 1200,
          height: 630,
          alt: "Minh Long — Bất động sản và kỹ thuật công trình",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Minh Long — Một đầu mối, nhiều chuyên môn",
      description:
        "Bất động sản, thiết kế, xây dựng, đo đạc và trợ lý pháp luật đất đai.",
      images: [new URL("/og.png", metadataBase).toString()],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
