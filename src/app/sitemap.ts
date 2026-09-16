import type { MetadataRoute } from "next";
import { getAllContentPaths } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { CONTENT_TYPES } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = siteConfig.url;

  // Content-type listing pages: the main navigation hubs.
  const contentTypePaths = CONTENT_TYPES.map((contentType) => `/${contentType}`);

  // Legal / boilerplate pages: they must exist but should never outrank content.
  const legalPaths = ["/privacy-policy", "/terms-of-service", "/copyright", "/about"];

  const staticPaths = ["/", ...contentTypePaths, ...legalPaths];

  // Dynamic paths: scan actual MDX content files
  const contentPaths = await getAllContentPaths("en");
  const dynamicPaths = contentPaths.map((item) => `/${[item.contentType, ...item.slug].join("/")}`);

  const paths = [...staticPaths, ...dynamicPaths];
  const isContentTypePage = new Set(contentTypePaths);
  const isLegalPage = new Set(legalPaths);

  return routing.locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${siteUrl}/${locale}${path === "/" ? "" : path}`,
      lastModified: new Date(),
      changeFrequency: path === "/" ? ("daily" as const) : ("weekly" as const),
      // 首页 1.0 > 分类入口 0.8 > 内容文章 0.6 > 法务/样板页 0.3
      priority: path === "/" ? 1 : isContentTypePage.has(path) ? 0.8 : isLegalPage.has(path) ? 0.3 : 0.6,
    })),
  );
}
