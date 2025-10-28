'use client';

import { useEffect, useRef, useState } from 'react';

interface AdNativeProps {
  adId: string;
  className?: string;
}

/**
 * JuicyAds Native Ad Component
 *
 * Native ads blend in with your content for higher CTR
 * Replace adId with your JuicyAds native zone ID
 */
export default function AdNative({ adId, className = '' }: AdNativeProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Only render on client side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = `https://poweredby.jads.co/js/jads.js`;

    if (adRef.current) {
      adRef.current.appendChild(script);
    }

    return () => {
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
    <div className={`my-4 ${className}`}>
      <div ref={adRef} className="native-ad-container">
        <ins
          className="juicyads-ad"
          data-zone={adId}
          style={{
            display: 'block',
          }}
        />
        <div className="text-center text-gray-600 text-xs mt-2">
          Sponsored Content
        </div>
      </div>
    </div>
  );
}
