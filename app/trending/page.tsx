'use client';

import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import ScrollToTop from '@/components/ScrollToTop';
import { fetchMostPopular } from '@/lib/api';
import { Video } from '@/types/video';
import { SITE_CONFIG } from '@/lib/config';

export default function TrendingPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Initial load
  useEffect(() => {
    loadVideos(1, true);
  }, []);

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800;

      if (scrollPosition >= threshold && !loading && !loadingMore && hasMore) {
        loadMoreVideos();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, loadingMore, hasMore]);

  const loadVideos = async (page: number = 1, reset: boolean = false) => {
    setLoading(true);
    try {
      const response = await fetchMostPopular(page);

      if (reset) {
        setVideos(response.videos);
      } else {
        setVideos(prev => [...prev, ...response.videos]);
      }

      setHasMore(response.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading trending videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);
    try {
      const nextPage = currentPage + 1;
      const response = await fetchMostPopular(nextPage);

      setVideos(prev => [...prev, ...response.videos]);
      setHasMore(response.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more trending videos:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Structured data for trending page SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Trending Videos - EpornerHub",
    "description": "Most popular and trending adult videos right now. Updated daily with the hottest content.",
    "url": "http://localhost:3003/trending",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": videos.slice(0, 10).map((video, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "VideoObject",
          "name": video.title,
          "url": `http://localhost:3003/video/${video.id}`,
          "thumbnailUrl": video.thumbnail,
          "uploadDate": video.added
        }
      }))
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <Header />
      <ScrollToTop />

      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🔥 Trending Videos
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Most Popular Videos Right Now
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Discover what&apos;s hot and trending today
          </p>
        </div>

        {/* Video Grid with Infinite Scroll */}
        {loading && videos.length === 0 ? (
          // Initial loading skeleton
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-gray-800 rounded-lg"></div>
                <div className="mt-3 space-y-2">
                  <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="animate-fadeInUp"
                  style={{
                    animationDelay: `${(index % 20) * 50}ms`,
                  }}
                >
                  <VideoCard video={video} />
                </div>
              ))}
            </div>

            {/* Loading more indicator */}
            {loadingMore && (
              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-video bg-gray-800 rounded-lg"></div>
                    <div className="mt-3 space-y-2">
                      <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                      <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Load More Button (backup for scroll) */}
            {hasMore && !loadingMore && videos.length > 0 && (
              <div className="text-center py-8 mt-8">
                <button
                  onClick={loadMoreVideos}
                  className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  Load More Videos
                </button>
                <p className="text-xs text-gray-500 mt-2">
                  Loaded {videos.length} videos • Page {currentPage}
                </p>
              </div>
            )}

            {/* End of results indicator */}
            {!hasMore && !loadingMore && videos.length > 0 && (
              <div className="text-center py-12 mt-8">
                <div className="inline-flex items-center space-x-2 text-gray-500">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-sm">You&apos;ve seen all trending videos!</p>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Loaded {videos.length} videos
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-400 text-lg">No trending videos found</p>
            <p className="text-gray-600 text-sm mt-2">Try again later</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p className="text-lg font-semibold text-white mb-2">{SITE_CONFIG.name}</p>
            <p className="mb-4">{SITE_CONFIG.description}</p>

            <div className="border-t border-gray-800 pt-6 mt-6">
              <p className="text-sm mb-2">
                <strong className="text-gray-300">Powered by Eporner API</strong>
              </p>
              <p className="text-xs text-gray-500 mb-4">
                All videos are embedded from Eporner.com using their official API.
                We do not host any content. Content is provided by Eporner.
              </p>
              <p className="text-xs text-gray-600">
                &copy; 2024 {SITE_CONFIG.name} • 18+ Only • Not affiliated with Eporner
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
