import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { ThemeProvider } from "next-themes";
import { JsonLd, SiteFooter, SiteHeader } from "@/components/site";
import { routing } from "@/i18n/routing";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://myseafoodstand.top";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  colorScheme: "dark light",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const image = `${siteUrl}/images/hero.webp`;
  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;
  return {
    metadataBase: new URL(siteUrl),
    manifest: "/manifest.json",
    appleWebApp: { capable: true, title: siteConfig.shortName, statusBarStyle: "black-translucent" },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
        { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    },
    title: { default: "ANOMALITH Wiki", template: "%s" },
    description: "Complete ANOMALITH fan wiki with gameplay guides, weapons and skills, anomaly zone walkthroughs, story and characters, demo and release info.",
    openGraph: { type: "website", locale, url: siteUrl, siteName: siteConfig.name, images: [{ url: image }] },
    twitter: { card: "summary_large_image", images: [image] },
    ...(adsenseId ? { other: { "google-adsense-account": adsenseId } } : {}),
  };
}

export default async function LocaleLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  if (!hasLocale(routing.locales, locale)) notFound();
  const messages = await getMessages({ locale });
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteUrl,
    logo: `${siteUrl}/android-chrome-512x512.png`,
    image: `${siteUrl}/images/hero.webp`,
  };

  const adsenseId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_ID;

  return (
    <html lang={locale} className={`${inter.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans text-foreground antialiased">
        {adsenseId && (
          <Script
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseId}`}
          />
        )}
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={organization} />
            <SiteHeader locale={locale} />
            {children}
            <SiteFooter locale={locale} />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
