/**
 * JuicyAds Configuration
 *
 * Replace these placeholder IDs with your actual JuicyAds zone IDs
 * Get your zone IDs from: https://www.juicyads.com/publishers/zones
 */

export const JUICYADS_CONFIG = {
  // Banner Ads (728x90 - Leaderboard)
  TOP_BANNER: '1234567', // Replace with your zone ID
  BOTTOM_BANNER: '1234568', // Replace with your zone ID

  // Rectangle Ads (300x250 - Medium Rectangle)
  SIDEBAR_RECTANGLE: '1234569', // Replace with your zone ID
  CONTENT_RECTANGLE: '1234570', // Replace with your zone ID

  // Native Ads
  NATIVE_FEED: '1234571', // Replace with your zone ID
  NATIVE_SIDEBAR: '1234572', // Replace with your zone ID

  // Video Ads (Before/After video player)
  VIDEO_PRE_ROLL: '1234573', // Replace with your zone ID
  VIDEO_POST_ROLL: '1234574', // Replace with your zone ID

  // Pop-under (opens new window/tab)
  POP_UNDER: '1234575', // Replace with your zone ID

  // Sticky Footer (mobile)
  STICKY_FOOTER: '1234576', // Replace with your zone ID
};

/**
 * Ad Placement Strategy
 *
 * High Traffic Pages:
 * - Home page: Top banner + Native feed + Sidebar
 * - Video pages: Top banner + Video ads + Sidebar + Bottom banner
 * - Trending: Top banner + Native feed + Sidebar
 *
 * Revenue Optimization:
 * - Video pages generate highest CPM (add more ads here)
 * - Native ads have highest CTR (blend with content)
 * - Pop-unders increase revenue but reduce UX (use sparingly)
 */

export const AD_SIZES = {
  LEADERBOARD: { width: 728, height: 90 }, // Desktop top/bottom
  MEDIUM_RECTANGLE: { width: 300, height: 250 }, // Sidebar
  MOBILE_BANNER: { width: 320, height: 50 }, // Mobile
  WIDE_SKYSCRAPER: { width: 160, height: 600 }, // Tall sidebar
  LARGE_RECTANGLE: { width: 336, height: 280 }, // Content
};

/**
 * 3lx.org Configuration (highperformanceformat.com)
 * Mobile banner ads (320x50)
 */
export const THREELX_CONFIG = {
  // Your 3lx.org ad key
  MOBILE_BANNER_320x50: '33373e81214ae58c1a9fdf6957e0525d',
};

/**
 * Enable/Disable Ad Types
 */
export const AD_SETTINGS = {
  enableBanners: true,
  enableNative: true,
  enablePopUnder: false, // Set to true to enable pop-unders (intrusive)
  enableVideoAds: true,
  enableStickyFooter: true, // Mobile sticky ad at bottom
  enable3lxMobileBanner: true, // 3lx.org mobile banner (320x50)
};
