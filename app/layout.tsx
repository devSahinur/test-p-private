import type { Metadata } from "next";
import "./globals.css";
import AgeVerification from "@/components/AgeVerification";

export const metadata: Metadata = {
  title: {
    default: "EpornerHub - Free HD Adult Videos | Stream Premium Content",
    template: "%s | EpornerHub"
  },
  description: "Stream millions of free HD adult videos powered by Eporner. Browse by category, search by keyword, and watch premium content. Updated daily with trending videos.",
  keywords: ["free adult videos", "hd porn", "eporner", "adult entertainment", "18+", "free streaming", "adult videos", "xxx videos", "porn hub alternative"],
  authors: [{ name: "EpornerHub" }],
  creator: "EpornerHub",
  publisher: "EpornerHub",
  robots: {
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://localhost:3003',
    siteName: 'EpornerHub',
    title: 'EpornerHub - Free HD Adult Videos',
    description: 'Stream millions of free HD adult videos. Browse trending content, search by keyword, and enjoy premium quality streaming.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EpornerHub - Free HD Adult Videos',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'EpornerHub - Free HD Adult Videos',
    description: 'Stream millions of free HD adult videos. Browse trending content and enjoy premium quality.',
    images: ['/og-image.jpg'],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  verification: {
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  category: 'adult entertainment',
  other: {
    'rating': 'adult',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <AgeVerification />
        {children}
      </body>
    </html>
  );
}
