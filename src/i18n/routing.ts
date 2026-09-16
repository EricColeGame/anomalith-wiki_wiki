import { defineRouting } from "next-intl/routing";

// 本站支持的语言列表（supported locales 的唯一真相源 / single source of truth）。
// 语言码统一使用小写形式：全流程校验脚本按小写 ASCII 语言码匹配，
// 且 BCP47 语言标签本身大小写不敏感。
// zh-tw = 繁体中文，对应需求文档 languages.json 中记录的 "zh-TW"（Traditional Chinese）。
export const routing = defineRouting({
  locales: ["en", "ja", "ko", "zh-tw"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
