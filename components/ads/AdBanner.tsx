'use client';

import { useEffect, useRef, useState } from 'react';

interface AdBannerProps {
  adId: string;
  width?: number;
  height?: number;
  className?: string;
}

/**
 * JuicyAds Banner Component
 *
 * Replace the adId with your actual JuicyAds zone ID
 * Get your zone ID from: https://www.juicyads.com
 */
export default function AdBanner({ adId, width = 728, height = 90, className = '' }: AdBannerProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    // Load JuicyAds script dynamically
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://poweredby.jads.co/js/jads.js`;

    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    return () => {
      // Cleanup
      if (adRef.current && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [adId, isMounted]);

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
        {/* JuicyAds Ad Code - Replace with your actual ad code */}
        <ins
          className="juicyads-ad"
          data-zone={adId}
          style={{
            display: 'block',
            width: '100%',
            maxWidth: `${width}px`,
            height: `${height}px`,
            margin: '0 auto'
          }}
        />

        {/* Fallback for when ads don't load */}
        <div className="text-center text-gray-600 text-xs mt-2">
          Advertisement
        </div>
      </div>
    </div>
  );
}
