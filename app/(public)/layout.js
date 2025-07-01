import "../globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToastProvider } from "@/components/toast-provider";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import Clarity from "@/components/Clarity";
import { EngagementManager } from "@/components/engagement/engagement-manager";
import MetaPixel from "@/components/meta-pixel";

export const metadata = {
  title: "Beautify Interior | Handcrafted Home Decor & Interior Accents",
  metadataBase: new URL("https://beautifyinterior.com"),
  description:
    "Discover handcrafted home decor, aesthetic lights, and artisan-crafted interior pieces at Beautify Interior. Transform your living space with unique, elegant, and cozy accents that speak your style.",
  keywords: [
    "home decor",
    "aesthetic lights",
    "handcrafted decor",
    "interior design",
    "artisan lights",
    "home accessories",
    "cozy decor",
    "minimalist decor",
    "boho home items",
    "Beautify Interior",
  ],
  authors: [
    { name: "Beautify Interior Team", url: "https://beautifyinterior.com" },
  ],
  creator: "Beautify Interior",
  openGraph: {
    title: "Beautify Interior | Handcrafted Home Decor & Aesthetic Lights",
    description:
      "Shop artisan-crafted interior pieces that elevate your home aesthetic. From minimal lighting to boho accents, Beautify Interior brings warmth to your space.",
    url: "https://beautifyinterior.com",
    siteName: "Beautify Interior",
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Beautify Interior - Handcrafted Home Decor",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beautify Interior | Handcrafted Home Decor & Aesthetic Lighting",
    description:
      "Unique home decor & cozy lighting – perfect for every space. Explore handcrafted designs at Beautify Interior.",
    images: [`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/og-image.png`],
    site: "@BeautifyInterior",
  },
  manifest: "/site.webmanifest",
  icons: [
    { rel: "icon", url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon.ico` },
    { rel: "icon", type: "image/svg+xml", url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon.svg` },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-16x16.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-32x32.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "48x48",
      url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-48x48.png`,
    },
    { rel: "apple-touch-icon", sizes: "180x180", url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/apple-touch-icon.png` },
    {
      rel: "icon",
      type: "image/png",
      sizes: "192x192",
      url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/android-chrome-192x192.png`,
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "512x512",
      url: `${process.env.NEXT_PUBLIC_CDN_URL}/site-data/android-chrome-512x512.png`,
    },
  ],
};

// NEW: Viewport configuration (required for Next.js 14+)
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f1ee" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
  // Optional: Add other viewport properties
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Mobile Viewport Optimization */}
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, viewport-fit=cover"
        />

        {/* PWA Theme Color */}
        <meta
          name="theme-color"
          content="#f6f1ee"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#1a1a1a"
          media="(prefers-color-scheme: dark)"
        />

        {/* Safari Tab Color */}
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        {/* Traditional favicon links for Googlebot */}
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon.ico`} />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-16x16.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-32x32.png`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="48x48"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/favicon-48x48.png`}
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${process.env.NEXT_PUBLIC_CDN_URL}/site-data/apple-touch-icon.png`}
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body className="flex flex-col min-h-screen">
        <GoogleAnalytics />
        <Clarity />
        <MetaPixel />
        <Header />
        <main className="h-full w-full  flex-grow ">{children}</main>
        <ToastProvider />
        {/* <main className="flex-grow container mx-auto px-4 py-4">
          {children}
        </main> */}
        <Footer />
        {/* <EngagementManager /> */}
      </body>
    </html>
  );
}
