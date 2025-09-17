import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scanzie - SEO Analyzer",
  description: "Analyze and optimize your website's SEO performance with Scanzie, the ultimate SEO analyzer tool.",
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
