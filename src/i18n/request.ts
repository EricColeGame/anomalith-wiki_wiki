import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "./routing";
import en from "@/locales/en.json";
import ja from "@/locales/ja.json";
import ko from "@/locales/ko.json";
import zhTw from "@/locales/zh-tw.json";

type Messages = typeof en;

// 语言包映射表：键名必须与 routing.locales 完全一致。
const messagesMap: Record<Locale, Partial<Messages>> = {
  "en": en,
  "ja": ja,
  "ko": ko,
  "zh-tw": zhTw,
};

function deepMerge<T>(base: T, override: Partial<T>): T {
  if (
    typeof base !== "object" ||
    base === null ||
    typeof override !== "object" ||
    override === null
  ) {
    return (override as T) ?? base;
  }

  if (Array.isArray(base)) {
    return (Array.isArray(override) ? override : base) as T;
  }

  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };

  for (const key of Object.keys(override as Record<string, unknown>)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (overrideValue === undefined) continue;
    result[key] = deepMerge(baseValue as never, overrideValue as never);
  }

  return result as T;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? (requested as Locale)
    : (routing.defaultLocale as Locale);

  // 各语言包已按 en.json 的键结构完整翻译；deepMerge 仍保留英文兜底，
  // 以便某个语言漏翻个别键时回退到英文而不是渲染出空字符串或键名。
  const localeMessages = messagesMap[locale] || {};
  const messages = deepMerge(en, localeMessages);
  return { locale, messages };
});
