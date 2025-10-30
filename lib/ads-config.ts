/**
 * ========================================
 * 3LX.ORG ADS CONFIGURATION
 * ========================================
 *
 * Complete 3lx.org (highperformanceformat.com) integration
 * All ad keys are configured and ready to use
 */

/**
 * 3lx.org Banner Ad Keys
 * These are your actual ad keys from 3lx.org
 */
export const THREELX_BANNERS = {
  // Desktop Banners
  LEADERBOARD_728x90: '1501ee6b849993ace4f6b4d376044370',        // Top/bottom of pages
  BANNER_468x60: '10f6c552e530e7c767ac9184ee4d08c6',             // Classic banner

  // Rectangle Banners (Most Popular)
  MEDIUM_RECTANGLE_300x250: '0db7e0ab3532c18fbc30e78abd2698e4',  // Sidebar, content

  // Mobile Banners
  MOBILE_BANNER_320x50: '33373e81214ae58c1a9fdf6957e0525d',      // Mobile header/footer

  // Skyscraper Banners (Sidebar)
  WIDE_SKYSCRAPER_160x600: '79f92f467d2df577ef6b82e7a8068ad7',   // Desktop tall sidebar
  SKYSCRAPER_160x300: '8562294229e79df9f0806b8e74564f6e',        // Desktop sidebar
};

/**
 * Standard Ad Sizes Reference
 */
export const AD_SIZES = {
  LEADERBOARD: { width: 728, height: 90 },
  BANNER: { width: 468, height: 60 },
  MEDIUM_RECTANGLE: { width: 300, height: 250 },
  MOBILE_BANNER: { width: 320, height: 50 },
  WIDE_SKYSCRAPER: { width: 160, height: 600 },
  SKYSCRAPER: { width: 160, height: 300 },
};

/**
 * Ad Settings - Enable/Disable ad formats
 */
export const AD_SETTINGS = {
  // Banner Ads
  enableBanners: true,                        // Display banner ads
  enableMobileBanners: true,                  // Mobile-specific banners
  enableSidebarAds: true,                     // Sidebar ads (160x600, 160x300)
};

/**
 * ========================================
 * AD PLACEMENT STRATEGY
 * ========================================
 *
 * HOMEPAGE:
 * - Top: 728x90 Leaderboard (desktop) OR 320x50 Mobile Banner
 * - Sidebar: 300x250 Medium Rectangle OR 160x600 Wide Skyscraper
 * - Between videos: 300x250 Medium Rectangle
 * - Bottom: 728x90 Leaderboard OR 468x60 Banner
 *
 * VIDEO PAGE (Highest Traffic):
 * - Top: 728x90 Leaderboard (desktop) OR 320x50 Mobile
 * - Below Video: 300x250 Medium Rectangle
 * - Sidebar: 300x250 Medium Rectangle + 160x600 Skyscraper
 * - Bottom: 728x90 Leaderboard
 *
 * MOBILE OPTIMIZATION:
 * - Use 320x50 for headers/footers
 * - Use 300x250 for content areas (works on all devices)
 *
 * REVENUE TIPS:
 * 1. 300x250 has highest fill rate - use it everywhere possible
 * 2. Video pages generate more impressions - add more ads there
 * 3. 728x90 works great for desktop top/bottom
 * 4. 160x600 perfect for desktop sidebars
 * 5. 320x50 is standard for mobile
 */

/**
 * Helper function to create ad options for 3lx.org
 */
export function create3lxOptions(
  key: string,
  width: number,
  height: number,
  params: Record<string, any> = {}
) {
  return {
    key,
    format: 'iframe',
    height,
    width,
    params,
  };
}
