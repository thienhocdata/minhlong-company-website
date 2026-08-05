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
    title: "Minh Long | Giải pháp nhà đất và công trình",
    description:
      "Dịch vụ môi giới bất động sản, đo đạc hiện trạng, tư vấn thiết kế và xây dựng tại TP. Hồ Chí Minh.",
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
      title: "Minh Long — Giải pháp nhà đất và công trình",
      description:
        "Dịch vụ môi giới bất động sản, đo đạc hiện trạng, tư vấn thiết kế và xây dựng tại TP. Hồ Chí Minh.",
      siteName: "Minh Long",
      images: [
        {
          url: new URL("/og-navy.png", metadataBase).toString(),
          width: 1729,
          height: 910,
          alt: "Công ty Minh Long tại TP. Hồ Chí Minh",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "Minh Long — Giải pháp nhà đất và công trình",
      description:
        "Dịch vụ bất động sản và công trình tại TP. Hồ Chí Minh.",
      images: [new URL("/og-navy.png", metadataBase).toString()],
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
