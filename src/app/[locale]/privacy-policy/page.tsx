import type { Metadata } from "next";
import { LegalArticle, legalPageMetadata } from "@/components/legal-page";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  return legalPageMetadata("privacyPolicy", locale, "/privacy-policy");
}

export default async function PrivacyPolicyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return <LegalArticle pageKey="privacyPolicy" locale={locale} />;
}
