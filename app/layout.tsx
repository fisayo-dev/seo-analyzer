import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smeal - SEO Analyzer",
  description: "Analyze and optimize your website's SEO performance with Smeal, the ultimate SEO analyzer tool.",
  icons: {
    icon: "/favicon.ico",
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  metadataBase: new URL('https://smeal.vercel.app'),
  openGraph: {
    title: 'Smeal - SEO Analyzer',
    description: "Analyze and optimize your website's SEO performance with Smeal, the ultimate SEO analyzer tool.",
    url: 'https://smeal.vercel.app',
    siteName: 'Smeal',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Smeal - SEO Analyzer',
      },
    ],
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smeal - SEO Analyzer',
    description: "Analyze and optimize your website's SEO performance with Smeal, the ultimate SEO analyzer tool.",
    images: ['/og-image.png'],
  }, robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
