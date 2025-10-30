'use client';

import { useEffect, useRef, useState } from 'react';

interface AdsterraNativeProps {
  atOptions: {
    key: string;
    format: string;
    height?: number;
    width?: number;
    params?: Record<string, any>;
  };
  className?: string;
}

/**
 * Adsterra Native Banner Component
 *
 * Native ads blend seamlessly with your content and have high CTR.
 * They appear as blocks of images with catchy descriptions.
 *
 * Usage:
 * <AdsterraNative
 *   atOptions={{
 *     key: 'YOUR_NATIVE_KEY_HERE',
 *     format: 'iframe',
 *     height: 250,
 *     width: 300,
 *     params: {}
 *   }}
 * />
 */
export default function AdsterraNative({ atOptions, className = '' }: AdsterraNativeProps) {
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
        className="ad-container native-ad-container"
        style={{
          width: '100%',
          maxWidth: atOptions.width ? `${atOptions.width}px` : '100%',
          minHeight: atOptions.height ? `${atOptions.height}px` : 'auto',
          overflow: 'hidden',
          margin: '0 auto'
        }}
      >
        {/* Native ad will be loaded here by Adsterra script */}
      </div>
    </div>
  );
}
