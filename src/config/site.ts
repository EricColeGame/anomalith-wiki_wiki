export interface SiteConfig {
  name: string;
  shortName: string;
  logoText: string;
  tagline: string;
  description: string;
  url: string;
  gameUrl?: string;
  heroVideoId?: string;
  social?: {
    discord?: string;
    youtube?: string;
    twitter?: string;
    tiktok?: string;
  };
  locales: readonly string[];
  defaultLocale: string;
}

export const siteConfig: SiteConfig = {
  name: "ANOMALITH Wiki",
  shortName: "ANOMALITH",
  logoText: "A",
  tagline: "Complete Guides, Weapons, Skills & Anomaly Zone Walkthroughs",
  description: "Your ultimate guide to ANOMALITH! Explore gameplay guides, weapons and skills, anomaly zone walkthroughs, story and characters, demo and release information.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://anomalith-wiki.wiki",
  gameUrl: "https://store.steampowered.com/app/4017880/ANOMALITH/",
  heroVideoId: "WU_E-yf4kj0", // ANOMALITH - Announcement Trailer (FURYU official channel)
  social: {
    discord: "https://discord.gg/7PnEy7aKPb",
    youtube: "https://www.youtube.com/@FURYUGAMES",
    twitter: "https://x.com/FURYU_GAMES_EN",
  },
  locales: ["en", "es", "pt", "de", "fr"],
  defaultLocale: "en",
};
