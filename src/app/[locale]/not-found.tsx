"use client";

import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function NotFoundPage() {
  const locale = useLocale();
  const t = useTranslations("notFound");

  return (
    <main className="mx-auto grid min-h-[60vh] max-w-3xl place-items-center px-4 py-16 text-center">
      <div className="rounded-3xl border border-border bg-card/70 p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{t("title")}</h1>
        <p className="mt-4 text-muted-foreground">{t("description")}</p>
        <Button asChild className="mt-6"><Link href={`/${locale}/guide`}>{t("cta")}</Link></Button>
      </div>
    </main>
  );
}
