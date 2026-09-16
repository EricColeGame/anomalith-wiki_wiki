import type { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import en from "@/locales/en.json";

type Messages = typeof en;

/** en.json 的 legalPages 下已定义的页面键；缺键时 TypeScript 直接报错。 */
export type LegalPageKey = keyof Messages["legalPages"];

export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-border bg-card/70 p-6 sm:p-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-foreground">{title}</h1>
        <div className="mt-8 space-y-5 leading-8 text-muted-foreground">{children}</div>
      </article>
    </main>
  );
}

/**
 * 静态法务页共用的本地化元数据：标题、描述与各语言 hreflang 备选链接。
 * pathname 为不带语言前缀的路径，例如 "/privacy-policy"。
 */
export async function legalPageMetadata(pageKey: LegalPageKey, locale: string, pathname: string): Promise<Metadata> {
  const messages = (await getMessages({ locale })) as Messages;
  const page = messages.legalPages[pageKey];
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: {
      canonical: `/${locale}${pathname}`,
      languages: Object.fromEntries(routing.locales.map((loc) => [loc, `/${loc}${pathname}`])),
    },
  };
}

/** 按当前语言渲染法务页正文，标题与段落均取自对应语言包。 */
export async function LegalArticle({ pageKey, locale }: { pageKey: LegalPageKey; locale: string }) {
  const messages = (await getMessages({ locale })) as Messages;
  const page = messages.legalPages[pageKey];
  return (
    <LegalPage title={page.title}>
      {page.paragraphs.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
    </LegalPage>
  );
}
