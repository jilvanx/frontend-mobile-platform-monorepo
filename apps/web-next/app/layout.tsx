import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f172a",
};

export const metadata: Metadata = {
  title: "Products | Next.js",
  description:
    "Browse products with server-rendered pages. Fast, accessible, and SEO-friendly.",
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    title: "Products | Next.js",
    description:
      "Browse products with server-rendered pages. Fast, accessible, and SEO-friendly.",
    siteName: "Products",
  },
  twitter: {
    card: "summary_large_image",
    title: "Products | Next.js",
    description: "Browse products with server-rendered pages.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded"
        >
          Skip to content
        </a>
        <div id="main-content">{children}</div>
      </body>
    </html>
  );
}
