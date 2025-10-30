'use client';

import { useEffect, useState } from 'react';

interface AdsterraPopunderProps {
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
 * Adsterra Popunder Component
 *
 * Popunders are full-page ads that appear in a new tab/window.
 * They don't take up space on your site and can generate high revenue.
 * Adsterra serves 11.8B monthly pop impressions.
 *
 * Important: Use sparingly as they can affect user experience.
 *
 * Usage:
 * <AdsterraPopunder
 *   atOptions={{
 *     key: 'YOUR_POPUNDER_KEY_HERE'
 *   }}
 *   enabled={true}
 * />
 */
export default function AdsterraPopunder({ atOptions, enabled = true }: AdsterraPopunderProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !enabled || scriptLoaded) return;

    // Set atOptions globally for popunder
    (window as any).atOptions = {
      key: atOptions.key,
      format: 'iframe',
      height: 60,
      width: 468,
      params: atOptions.params || {}
    };

    // Create and append the Adsterra popunder script
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

  // Popunder doesn't render visible content
  return null;
}
