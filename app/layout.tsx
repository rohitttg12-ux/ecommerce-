import type { Metadata } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "STEPX - Premium Men's Casual Shoes",
  description:
    "Discover premium men's casual shoes designed for everyday excellence. Shop STEPX's curated collection of luxury footwear.",
  keywords:
    "men shoes, casual shoes, premium footwear, luxury shoes, STEPX",
  authors: [{ name: "STEPX" }],
  creator: "STEPX",
  publisher: "STEPX",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://stepx.vercel.app",
    title: "STEPX - Premium Men's Casual Shoes",
    description:
      "Discover premium men's casual shoes designed for everyday excellence.",
    siteName: "STEPX",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
