/**
 * Eporner API Configuration
 *
 * Eporner officially provides a free API for embedding their content.
 * This is completely legal and authorized by Eporner.
 *
 * API Documentation: https://www.eporner.com/api/v2/
 */

export const EPORNER_API = {
  baseUrl: 'https://www.eporner.com/api/v2',
  searchEndpoint: '/video/search/',
  videoEndpoint: '/video/id/',
  format: 'json',
  perPage: 20, // Videos per page
};

export const SITE_CONFIG = {
  name: '3xl',
  description: 'Stream HD adult videos powered by Eporner',
  tagline: 'Free HD Adult Videos',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3002',
  ageVerificationRequired: true,

  // Monetization: You'll need to add adult ad networks
  // Recommended networks: ExoClick, TrafficJunky, JuicyAds
  adNetworks: {
    exoclick: '', // Add your ExoClick zone ID
    trafficJunky: '', // Add your TrafficJunky widget ID
  }
};

// Available search categories
export const CATEGORIES = [
  'all',
  'amateur',
  'anal',
  'asian',
  'bbw',
  'big-tits',
  'blonde',
  'blowjob',
  'brunette',
  'creampie',
  'cumshot',
  'ebony',
  'hardcore',
  'interracial',
  'latina',
  'lesbian',
  'milf',
  'pov',
  'redhead',
  'teen',
  'threesome',
];
