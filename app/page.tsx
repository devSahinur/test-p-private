'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import SearchBar from '@/components/SearchBar';
import CategoryFilter from '@/components/CategoryFilter';
import VideoCard from '@/components/VideoCard';
import ScrollToTop from '@/components/ScrollToTop';
import AdBanner from '@/components/ads/AdBanner';
import AdNative from '@/components/ads/AdNative';
import AdPopUnder from '@/components/ads/AdPopUnder';
import { fetchVideos, getCategories } from '@/lib/api';
import { Video } from '@/types/video';
import { SITE_CONFIG } from '@/lib/config';
import { JUICYADS_CONFIG, AD_SIZES, AD_SETTINGS } from '@/lib/ads-config';

function HomeContent() {
  const searchParams = useSearchParams();
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const categories = getCategories();

  // Reset videos when category or search changes
  useEffect(() => {
    setVideos([]);
    setCurrentPage(1);
    setHasMore(true);
    loadVideos(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchQuery]);

  // Infinite scroll detection
  useEffect(() => {
    const handleScroll = () => {
      // Check if user scrolled near bottom
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 800;

      console.log('Scroll check:', {
        scrollPosition,
        threshold,
        loading,
        loadingMore,
        hasMore,
        shouldLoad: scrollPosition >= threshold && !loading && !loadingMore && hasMore
      });

      if (scrollPosition >= threshold && !loading && !loadingMore && hasMore) {
        loadMoreVideos();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, loadingMore, hasMore]);

  const loadVideos = async (page: number = 1, reset: boolean = false) => {
    setLoading(true);
    try {
      // Build query based on selected category and search
      const query = searchQuery || (selectedCategory !== 'all' ? selectedCategory : '');

      const response = await fetchVideos({
        query,
        page,
        perPage: 20,
        order: 'most-popular',
      });

      if (reset) {
        setVideos(response.videos);
      } else {
        setVideos(prev => [...prev, ...response.videos]);
      }

      setHasMore(response.hasMore);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadMoreVideos = async () => {
    if (loadingMore || !hasMore) {
      console.log('Skipping load more:', { loadingMore, hasMore });
      return;
    }

    console.log('Loading more videos, current page:', currentPage);
    setLoadingMore(true);

    try {
      const nextPage = currentPage + 1;
      const query = searchQuery || (selectedCategory !== 'all' ? selectedCategory : '');

      console.log('Fetching page:', nextPage, 'with query:', query);

      const response = await fetchVideos({
        query,
        page: nextPage,
        perPage: 20,
        order: 'most-popular',
      });

      console.log('Received videos:', response.videos.length, 'hasMore:', response.hasMore);

      setVideos(prev => {
        const newVideos = [...prev, ...response.videos];
        console.log('Total videos now:', newVideos.length);
        return newVideos;
      });
      setHasMore(response.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more videos:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  // Structured data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "EpornerHub",
    "url": "http://localhost:3003",
    "description": "Stream millions of free HD adult videos. Browse by category or search by keyword.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "http://localhost:3003/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "EpornerHub",
      "logo": {
        "@type": "ImageObject",
        "url": "http://localhost:3003/logo.png"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Pop-Under Ad (Optional - can be disabled) */}
      {AD_SETTINGS.enablePopUnder && (
        <AdPopUnder adId={JUICYADS_CONFIG.POP_UNDER} enabled={AD_SETTINGS.enablePopUnder} />
      )}

      <Header />
      <ScrollToTop />

      <main className="container mx-auto px-4 py-8">
        {/* Top Banner Ad */}
        {AD_SETTINGS.enableBanners && (
          <AdBanner
            adId={JUICYADS_CONFIG.TOP_BANNER}
            width={AD_SIZES.LEADERBOARD.width}
            height={AD_SIZES.LEADERBOARD.height}
          />
        )}
        {/* Hero Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {SITE_CONFIG.tagline}
          </h1>
          <p className="text-gray-400 text-lg mb-2">
            Powered by Eporner - Stream millions of HD videos
          </p>
          <p className="text-sm text-gray-500 mb-6">
            Search by category or keyword
          </p>
          <div className="flex justify-center">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
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

            {/* Native Ads between video sections */}
            {AD_SETTINGS.enableNative && videos.length > 8 && (
              <div className="my-8">
                <AdNative adId={JUICYADS_CONFIG.NATIVE_FEED} />
              </div>
            )}

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
                  <p className="text-sm">You&apos;ve reached the end!</p>
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
            <p className="text-gray-400 text-lg">No videos found</p>
            <p className="text-gray-600 text-sm mt-2">Try a different search or category</p>
          </div>
        )}

        {/* Bottom Banner Ad */}
        {AD_SETTINGS.enableBanners && videos.length > 0 && (
          <div className="mt-12">
            <AdBanner
              adId={JUICYADS_CONFIG.BOTTOM_BANNER}
              width={AD_SIZES.LEADERBOARD.width}
              height={AD_SIZES.LEADERBOARD.height}
            />
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

            <div className="mt-6 text-xs text-gray-600">
              <p>Monetize with adult ad networks: ExoClick, TrafficJunky, JuicyAds</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-800 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i}>
                  <div className="aspect-video bg-gray-800 rounded-lg"></div>
                  <div className="mt-3 space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-800 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    }>
      <HomeContent />
    </Suspense>
  );
}
