import { Html, Head, Main, NextScript } from "next/document";
import { generateMetadataTags, type Metadata } from "@/lib/metadata";

const defaultMetadata: Metadata = {
  title: "PageRouter",
  description: "A Next.js application built with Pages Router featuring posts ",
  keywords: ["nextjs", "react", "pages router", "posts", "blog"],
 
  openGraph: {
    type: "website",
    siteName: "PageRouter",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PageRouter"
      }
    ]
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true
    }
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png"
  },
  manifest: "/site.webmanifest"
};

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {generateMetadataTags(defaultMetadata)}
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
