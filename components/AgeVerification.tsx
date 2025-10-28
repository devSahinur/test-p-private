'use client';

import { useState, useEffect } from 'react';

export default function AgeVerification() {
  const [isVerified, setIsVerified] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Mark component as mounted
    setIsMounted(true);

    // Check if user has already verified their age
    const verified = localStorage.getItem('ageVerified');
    if (verified === 'true') {
      setIsVerified(true);
    }
  }, []);

  const handleVerify = () => {
    localStorage.setItem('ageVerified', 'true');
    setIsVerified(true);
  };

  const handleExit = () => {
    window.location.href = 'https://www.google.com';
  };

  // Don't render anything until mounted (prevents hydration mismatch)
  if (!isMounted) {
    return null;
  }

  // Don't render if already verified
  if (isVerified) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl p-8 max-w-md w-full shadow-2xl border border-gray-800">
        {/* Warning Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-orange-500 rounded-full p-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-3xl font-bold text-white text-center mb-4">
          Age Verification Required
        </h2>

        {/* Description */}
        <p className="text-gray-400 text-center mb-8 leading-relaxed">
          This website contains adult content. You must be 18 years or older to enter.
          By entering, you agree to our terms of service and privacy policy.
        </p>

        {/* Warning Message */}
        <div className="bg-orange-500 bg-opacity-10 border border-orange-500 rounded-lg p-4 mb-6">
          <p className="text-orange-300 text-sm text-center">
            If you are under 18 years old, please leave this site immediately.
          </p>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={handleExit}
            className="bg-gray-800 hover:bg-gray-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            I&apos;m Under 18
          </button>
          <button
            onClick={handleVerify}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            I&apos;m 18 or Older
          </button>
        </div>

        {/* Legal Notice */}
        <p className="text-gray-600 text-xs text-center mt-6">
          By clicking &quot;I&apos;m 18 or Older&quot;, you confirm that you are of legal age to view adult content
          in your jurisdiction and accept all responsibility for your access to this site.
        </p>
      </div>
    </div>
  );
}
