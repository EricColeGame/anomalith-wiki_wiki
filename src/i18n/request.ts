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

  // 非英语语言包暂为空对象，deepMerge 后自动回退到 en 文案。
  const localeMessages = messagesMap[locale] || {};
  const messages = deepMerge(en, localeMessages);
  return { locale, messages };
});
