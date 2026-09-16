export interface NavigationItem {
  key: string;
  path: `/${string}`;
  icon?: unknown;
  isContentType: boolean;
}

// 导航分类真相源：需求目录 `关键词.json` 的 categories 数组。
// 每个 category slug 必须同时满足三处一致：
//   1. content/<locale>/ 下的文章子目录名（由 Part 5 从 articles/ 复制而来）
//   2. en.json 的 nav 键（导航栏文案）
//   3. content.ts 的 GROUP_TITLES / GROUP_ORDER slug
// 每项必须同时具备 key（翻译键）与 path（URL），两者不可混为一个字段。
export const NAVIGATION_CONFIG = [
  { key: "guide", path: "/guide", isContentType: true },
  { key: "mechanics", path: "/mechanics", isContentType: true },
  { key: "characters", path: "/characters", isContentType: true },
  { key: "release", path: "/release", isContentType: true },
  { key: "media", path: "/media", isContentType: true },
  { key: "community", path: "/community", isContentType: true },
] as const satisfies readonly NavigationItem[];

export const CONTENT_TYPES = NAVIGATION_CONFIG.filter((item) => item.isContentType).map((item) => item.path.replace(/^\//, ""));
