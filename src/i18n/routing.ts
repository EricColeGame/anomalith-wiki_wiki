import { defineRouting } from "next-intl/routing";

// 本站支持的语言列表（supported locales 的唯一真相源 / single source of truth）。
// 语言码必须与需求文档 languages.json 逐字一致（校验脚本按原样拼 src/locales/<code>.json
// 与 content/<code>/ 路径，大小写不匹配会直接判缺失）。
// zh-TW = 繁体中文（Traditional Chinese），同时也是 hreflang 推荐的标准 BCP47 大小写形式。
export const routing = defineRouting({
  locales: ["en", "ja", "ko", "zh-TW"],
  defaultLocale: "en",
  localePrefix: "always",
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
