import type { Metadata } from "next";
import { LegalArticle, legalPageMetadata } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return legalPageMetadata("termsOfService", locale, "/terms-of-service");
}

export default async function TermsOfServicePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalArticle pageKey="termsOfService" locale={locale} />;
}
