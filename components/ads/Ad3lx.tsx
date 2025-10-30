'use client';

import { useEffect, useRef, useState } from 'react';

interface Ad3lxProps {
  adKey: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * 3lx.org Banner Component (All Sizes)
 *
 * This component loads ads from highperformanceformat.com (3lx.org network)
 * Supports all banner sizes:
 * - 728x90 (Leaderboard)
 * - 468x60 (Banner)
 * - 300x250 (Medium Rectangle) - Most Popular
 * - 320x50 (Mobile Banner)
 * - 160x600 (Wide Skyscraper)
 * - 160x300 (Skyscraper)
 */
export default function Ad3lx({
  adKey,
  width = 320,
  height = 50,
  className = ''
}: Ad3lxProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !adRef.current) return;

    // Clear any existing content
    adRef.current.innerHTML = '';

    // Set atOptions globally for the ad script
    (window as any).atOptions = {
      'key': adKey,
      'format': 'iframe',
      'height': height,
      'width': width,
      'params': {}
    };

    // Load the 3lx.org ad script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = `//www.highperformanceformat.com/${adKey}/invoke.js`;
    script.async = true;

    adRef.current.appendChild(script);

    return () => {
      // Cleanup
      if (adRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adKey, width, height, isMounted]);

  // Don't render anything until client-side to prevent hydration errors
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`flex justify-center items-center my-4 w-full ${className}`}>
      <div
        ref={adRef}
        className="ad-container w-full"
        style={{
          maxWidth: `${width}px`,
          minHeight: height,
          overflow: 'hidden'
        }}
      >
        {/* Ad will be loaded here by the script */}
        <div className="text-center text-gray-600 text-xs mt-2">
          Advertisement
        </div>
      </div>
    </div>
  );
}
