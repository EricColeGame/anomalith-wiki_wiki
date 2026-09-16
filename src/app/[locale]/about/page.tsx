import type { Metadata } from "next";
import { LegalArticle, legalPageMetadata } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return legalPageMetadata("about", locale, "/about");
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalArticle pageKey="about" locale={locale} />;
}
