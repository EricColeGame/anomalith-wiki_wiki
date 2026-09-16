import type { Metadata } from "next";
import { LegalArticle, legalPageMetadata } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return legalPageMetadata("copyright", locale, "/copyright");
}

export default async function CopyrightPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalArticle pageKey="copyright" locale={locale} />;
}
