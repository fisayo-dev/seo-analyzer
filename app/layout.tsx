import type { Metadata } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBIC_BASE_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  title: "Scanzie - SEO Analyzer",
  description: "Analyze and optimize your website's SEO performance with Scanzie, the ultimate SEO analyzer tool.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  keywords: ['SEO', 'website optimization', 'SEO analysis tool', 'search engine optimization', 'website audit', 'SEO analyzer'],
  openGraph: {
      title: "Scanzie - SEO Analyzer",
      description: "Analyze and optimize your website's SEO performance with Scanzie, the ultimate SEO analyzer tool.",
      type: 'website',
      siteName: 'Scanzie',
      locale: 'en_US',
      images: [
      {
        url: `${siteUrl}/favicon.svg`, // Put your image in /public folder
        width: 1200,
        height: 630,
        alt: "The Fullstack Creators SEO Image",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
