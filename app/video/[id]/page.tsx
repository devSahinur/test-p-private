'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/Header';
import VideoCard from '@/components/VideoCard';
import AdBanner from '@/components/ads/AdBanner';
import AdNative from '@/components/ads/AdNative';
import AdPopUnder from '@/components/ads/AdPopUnder';
import { fetchVideoById, getRelatedVideos } from '@/lib/api';
import { Video } from '@/types/video';
import { SITE_CONFIG } from '@/lib/config';
import { JUICYADS_CONFIG, AD_SIZES, AD_SETTINGS } from '@/lib/ads-config';

export default function VideoPage() {
  const params = useParams();
  const videoId = params.id as string;
  const [video, setVideo] = useState<Video | null>(null);
  const [relatedVideos, setRelatedVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadVideoData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId]);

  // Update page title and meta tags dynamically
  useEffect(() => {
    if (video) {
      // Update page title
      document.title = `${video.title} | ${SITE_CONFIG.name}`;

      // Update meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', `Watch ${video.title}. ${formatViews(video.views)} views. Rating: ${video.rating}/5. Duration: ${video.duration}. Free HD adult video streaming.`);
      } else {
        const meta = document.createElement('meta');
        meta.name = 'description';
        meta.content = `Watch ${video.title}. ${formatViews(video.views)} views. Rating: ${video.rating}/5. Duration: ${video.duration}. Free HD adult video streaming.`;
        document.head.appendChild(meta);
      }

      // Update Open Graph tags for Facebook, LinkedIn, WhatsApp, etc.
      updateMetaTag('property', 'og:title', video.title);
      updateMetaTag('property', 'og:description', `Watch ${video.title}. ${formatViews(video.views)} views. Free HD streaming on ${SITE_CONFIG.name}`);
      updateMetaTag('property', 'og:image', video.thumbnail);
      updateMetaTag('property', 'og:image:secure_url', video.thumbnail);
      updateMetaTag('property', 'og:image:type', 'image/jpeg');
      updateMetaTag('property', 'og:image:width', '1280');
      updateMetaTag('property', 'og:image:height', '720');
      updateMetaTag('property', 'og:image:alt', video.title);
      updateMetaTag('property', 'og:url', `${SITE_CONFIG.url}/video/${videoId}`);
      updateMetaTag('property', 'og:type', 'video.other');
      updateMetaTag('property', 'og:video', video.embed);
      updateMetaTag('property', 'og:video:url', video.embed);
      updateMetaTag('property', 'og:video:secure_url', video.embed);
      updateMetaTag('property', 'og:video:type', 'text/html');
      updateMetaTag('property', 'og:video:width', '1280');
      updateMetaTag('property', 'og:video:height', '720');
      updateMetaTag('property', 'og:site_name', SITE_CONFIG.name);

      // Update Twitter Card tags
      updateMetaTag('name', 'twitter:card', 'player');
      updateMetaTag('name', 'twitter:site', '@' + SITE_CONFIG.name);
      updateMetaTag('name', 'twitter:title', video.title);
      updateMetaTag('name', 'twitter:description', `Watch ${video.title}. ${formatViews(video.views)} views.`);
      updateMetaTag('name', 'twitter:image', video.thumbnail);
      updateMetaTag('name', 'twitter:image:alt', video.title);
      updateMetaTag('name', 'twitter:player', video.embed);
      updateMetaTag('name', 'twitter:player:width', '1280');
      updateMetaTag('name', 'twitter:player:height', '720');

      // Update canonical link
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', `${SITE_CONFIG.url}/video/${videoId}`);
      } else {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        canonical.setAttribute('href', `${SITE_CONFIG.url}/video/${videoId}`);
        document.head.appendChild(canonical);
      }
    }
  }, [video, videoId]);

  const loadVideoData = async () => {
    setLoading(true);
    try {
      const videoData = await fetchVideoById(videoId);
      setVideo(videoData);

      if (videoData) {
        const related = await getRelatedVideos(videoData, 6);
        setRelatedVideos(related);
      }
    } catch (error) {
      console.error('Error loading video:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Helper function to update or create meta tags
  const updateMetaTag = (attribute: string, key: string, content: string) => {
    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (element) {
      element.setAttribute('content', content);
    } else {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      element.setAttribute('content', content);
      document.head.appendChild(element);
    }
  };

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = video?.title || 'Check out this video';

    // Try using Web Share API (mobile devices)
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          url: shareUrl,
        });
      } catch (error) {
        // User cancelled or error occurred
        console.log('Share cancelled or error:', error);
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
      } catch (error) {
        // Final fallback: Show prompt with URL
        prompt('Copy this link:', shareUrl);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="aspect-video bg-gray-800 rounded-lg mb-6"></div>
            <div className="h-8 bg-gray-800 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-800 rounded w-1/2"></div>
          </div>
        </main>
      </div>
    );
  }

  if (!video) {
    return (
      <div className="min-h-screen bg-gray-950">
        <Header />
        <main className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl text-white mb-4">Video not found</h1>
          <Link href="/" className="text-orange-500 hover:text-orange-400">
            Return to homepage
          </Link>
        </main>
      </div>
    );
  }

  // Structured data for video SEO
  const videoStructuredData = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": video.title,
    "description": video.title,
    "thumbnailUrl": video.thumbnail,
    "uploadDate": video.added,
    "duration": video.duration,
    "contentUrl": video.url,
    "embedUrl": video.embed,
    "interactionStatistic": {
      "@type": "InteractionCounter",
      "interactionType": { "@type": "WatchAction" },
      "userInteractionCount": video.views
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": video.rating,
      "bestRating": 5,
      "ratingCount": Math.floor(video.views / 100)
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
        {/* Structured Data for Video SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(videoStructuredData) }}
        />

        {/* Pop-Under Ad (Video pages have highest CPM) */}
        {AD_SETTINGS.enablePopUnder && (
          <AdPopUnder adId={JUICYADS_CONFIG.POP_UNDER} enabled={AD_SETTINGS.enablePopUnder} />
        )}

        <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Top Banner Ad */}
        {AD_SETTINGS.enableBanners && (
          <AdBanner
            adId={JUICYADS_CONFIG.TOP_BANNER}
            width={AD_SIZES.LEADERBOARD.width}
            height={AD_SIZES.LEADERBOARD.height}
          />
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Video Section */}
          <div className="lg:col-span-2">
            {/* Eporner Video Player Embed */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-6">
              <iframe
                src={video.embed}
                className="w-full h-full"
                frameBorder="0"
                scrolling="no"
                allowFullScreen
                allow="autoplay; fullscreen; picture-in-picture"
                title={video.title}
              />
            </div>

            {/* Watch on Eporner Button */}
            <div className="mb-6">
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                <span>View on Eporner.com</span>
              </a>
            </div>

            {/* Video Info */}
            <div className="bg-gray-900 rounded-lg p-6">
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {video.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-4 text-gray-400">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <span>{formatViews(video.views)} views</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span>{video.rating}/5</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{video.added}</span>
                </div>

                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>{video.duration}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {video.keywords.split(',').slice(0, 10).map((tag, index) => (
                  <Link
                    key={index}
                    href={`/?q=${encodeURIComponent(tag.trim())}`}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm hover:bg-orange-500 hover:text-white transition-colors cursor-pointer"
                  >
                    {tag.trim()}
                  </Link>
                ))}
              </div>

              <div className="flex gap-4">
                <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                  <span>Like</span>
                </button>

                <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Save</span>
                </button>

                <button
                  onClick={handleShare}
                  className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  <span>Share</span>
                </button>
              </div>
            </div>

            {/* Native Ad below video */}
            {AD_SETTINGS.enableNative && (
              <div className="mt-6">
                <AdNative adId={JUICYADS_CONFIG.CONTENT_RECTANGLE} />
              </div>
            )}
          </div>

          {/* Related Videos Sidebar */}
          <div className="lg:col-span-1">
            {/* Sidebar Rectangle Ad */}
            {AD_SETTINGS.enableBanners && (
              <div className="mb-6">
                <AdBanner
                  adId={JUICYADS_CONFIG.SIDEBAR_RECTANGLE}
                  width={AD_SIZES.MEDIUM_RECTANGLE.width}
                  height={AD_SIZES.MEDIUM_RECTANGLE.height}
                />
              </div>
            )}
            <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
            <div className="space-y-4">
              {relatedVideos.map((relatedVideo) => (
                <VideoCard key={relatedVideo.id} video={relatedVideo} />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner Ad */}
        {AD_SETTINGS.enableBanners && (
          <div className="mt-12">
            <AdBanner
              adId={JUICYADS_CONFIG.BOTTOM_BANNER}
              width={AD_SIZES.LEADERBOARD.width}
              height={AD_SIZES.LEADERBOARD.height}
            />
          </div>
        )}
      </main>
    </div>
  );
}
