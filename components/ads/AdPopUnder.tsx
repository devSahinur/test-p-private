'use client';

import { useEffect, useState } from 'react';

interface AdPopUnderProps {
  adId: string;
  enabled?: boolean;
}

/**
 * JuicyAds Pop-Under Component
 *
 * WARNING: Pop-unders can be intrusive to users
 * Use sparingly and consider disabling for returning visitors
 *
 * Replace adId with your JuicyAds pop-under zone ID
 */
export default function AdPopUnder({ adId, enabled = true }: AdPopUnderProps) {
  const [isMounted, setIsMounted] = useState(false);

  // Only run on client side to avoid hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || !enabled) return;

    // Check if user has already seen pop-under in this session
    const hasSeenPopUnder = sessionStorage.getItem('popunder_shown');

    if (hasSeenPopUnder) {
      return; // Don't show again this session
    }

    // Delay pop-under to avoid immediate disruption
    const timer = setTimeout(() => {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.setAttribute('data-admpid', adId);
      script.src = `https://poweredby.jads.co/js/jads.js`;

      document.body.appendChild(script);

      // Mark as shown for this session
      sessionStorage.setItem('popunder_shown', 'true');

      return () => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      };
    }, 3000); // Wait 3 seconds before triggering

    return () => clearTimeout(timer);
  }, [adId, enabled, isMounted]);

  return null; // Pop-under has no visible component
}
