'use client';

import { useEffect, useState } from 'react';

interface AdsterraSocialBarProps {
  atOptions: {
    key: string;
    format?: string;
    height?: number;
    width?: number;
    params?: Record<string, any>;
  };
  enabled?: boolean;
}

/**
 * Adsterra Social Bar Component
 *
 * Social Bar is Adsterra's advanced In-Page Push format.
 * It's a combo of In-Page Push, Interstitials, and display ads.
 * Can outperform traditional web push by up to 30% in CTR and conversions.
 *
 * Features:
 * - Non-intrusive, appears at bottom/corner of screen
 * - 20+ template visuals
 * - High engagement rates
 * - Perfect for mobile and desktop
 *
 * Usage:
 * <AdsterraSocialBar
 *   atOptions={{
 *     key: 'YOUR_SOCIAL_BAR_KEY_HERE'
 *   }}
 *   enabled={true}
 * />
 */
export default function AdsterraSocialBar({ atOptions, enabled = true }: AdsterraSocialBarProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !enabled || scriptLoaded) return;

    // Set atOptions globally for social bar
    (window as any).atOptions = {
      key: atOptions.key,
      format: 'iframe',
      height: 90,
      width: 728,
      params: atOptions.params || {}
    };

    // Create and append the Adsterra social bar script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;
    script.async = true;

    document.body.appendChild(script);
    setScriptLoaded(true);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [atOptions, enabled, isMounted, scriptLoaded]);

  // Social bar renders itself at fixed position
  return null;
}
