'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsterraBannerProps {
  atOptions: {
    key: string;
    format: string;
    height: number;
    width: number;
    params?: Record<string, any>;
  };
  className?: string;
}

/**
 * Adsterra Banner Component
 *
 * Supports all Adsterra banner sizes:
 * - 468x60 (Banner)
 * - 300x250 (Medium Rectangle) - Most Popular
 * - 160x300 (Wide Skyscraper)
 * - 160x600 (Wide Skyscraper)
 * - 320x50 (Mobile Banner)
 * - 728x90 (Leaderboard)
 *
 * Usage:
 * <AdsterraBanner
 *   atOptions={{
 *     key: 'YOUR_KEY_HERE',
 *     format: 'iframe',
 *     height: 250,
 *     width: 300,
 *     params: {}
 *   }}
 * />
 */
export default function AdsterraBanner({ atOptions, className = '' }: AdsterraBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !adRef.current || scriptLoadedRef.current) return;

    // Set atOptions globally for the ad script
    (window as any).atOptions = atOptions;

    // Create and append the Adsterra script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.topcreativeformat.com/${atOptions.key}/invoke.js`;
    script.async = true;

    adRef.current.appendChild(script);
    scriptLoadedRef.current = true;

    return () => {
      if (adRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
      scriptLoadedRef.current = false;
    };
  }, [atOptions, isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center my-4 w-full ${className}`}>
      <div
        ref={adRef}
        className="ad-container"
        style={{
          width: '100%',
          maxWidth: `${atOptions.width}px`,
          minHeight: `${atOptions.height}px`,
          overflow: 'hidden',
          margin: '0 auto'
        }}
      >
        {/* Ad will be loaded here by Adsterra script */}
      </div>
    </div>
  );
}
