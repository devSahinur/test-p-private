import { Video, ApiResponse, SearchParams, EpornerSearchResponse, EpornerVideo } from '@/types/video';
import { EPORNER_API, CATEGORIES } from './config';

/**
 * Eporner API Integration
 *
 * This uses Eporner's OFFICIAL and FREE API to embed their content.
 * Eporner explicitly allows and provides this API for embedding.
 *
 * API Documentation: https://www.eporner.com/api/v2/
 *
 * This is 100% LEGAL because:
 * - Eporner officially provides the API
 * - They explicitly allow embedding
 * - It's documented and authorized
 * - Similar to YouTube embeds
 */

/**
 * Helper: Format duration from seconds to HH:MM:SS or MM:SS
 */
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  if (hours > 0) {
    return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Helper: Convert Eporner video to our Video format
 */
function mapEpornerVideo(epornerVideo: EpornerVideo): Video {
  return {
    id: epornerVideo.id,
    title: epornerVideo.title,
    thumbnail: epornerVideo.default_thumb?.src || epornerVideo.thumb,
    duration: formatDuration(epornerVideo.length_sec),
    views: epornerVideo.views,
    rating: epornerVideo.rate / 20, // Convert 0-100 to 0-5
    embed: epornerVideo.embed,
    added: epornerVideo.added,
    keywords: epornerVideo.keywords,
    url: epornerVideo.url,
  };
}

/**
 * Fetch videos from Eporner API
 *
 * @param params - Search parameters
 * @returns Promise with videos and pagination info
 */
export async function fetchVideos(params: SearchParams = {}): Promise<ApiResponse> {
  try {
    const {
      query = '',
      page = 1,
      perPage = EPORNER_API.perPage,
      gay = 'straight',
      lq = '0', // 0 = HD only, 1 = include low quality
      order = 'most-recent',
    } = params;

    // Build API URL
    const url = new URL(`${EPORNER_API.baseUrl}${EPORNER_API.searchEndpoint}`);

    // Add query parameters
    if (query && query !== 'all') {
      url.searchParams.set('query', query);
    }
    url.searchParams.set('per_page', perPage.toString());
    url.searchParams.set('page', page.toString());
    url.searchParams.set('gay', gay === 'gay' ? '1' : '0');
    url.searchParams.set('lq', lq);
    url.searchParams.set('order', order);
    url.searchParams.set('format', EPORNER_API.format);

    console.log('Fetching from Eporner:', url.toString());

    // Fetch from Eporner API
    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      // Add cache for better performance
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`Eporner API error: ${response.status}`);
    }

    const data: EpornerSearchResponse = await response.json();

    console.log('Eporner API Response:', {
      videosCount: data.videos?.length,
      currentPage: data.current_page,
      totalPages: data.total_pages,
      totalCount: data.total_count,
      perPage: data.per_page,
      fullResponse: data,
    });

    // Map Eporner videos to our format
    const videos = data.videos?.map(mapEpornerVideo) || [];

    // Eporner has millions of videos - if we got full page (20 videos), there's likely more
    // Only stop if we get 0 videos or less than requested amount
    const gotFullPage = videos.length >= (perPage - 1); // Allow for 19+ videos
    const apiSaysMore = data.total_pages && data.current_page < data.total_pages;
    const hasMore = videos.length > 0 && (apiSaysMore || gotFullPage);

    console.log('hasMore calculation:', {
      videosLength: videos.length,
      gotFullPage,
      apiSaysMore,
      finalHasMore: hasMore,
    });

    return {
      videos,
      total: data.total_count || 999999,
      currentPage: data.current_page || page,
      totalPages: data.total_pages || 9999,
      hasMore,
    };
  } catch (error) {
    console.error('Error fetching videos from Eporner:', error);

    // Return empty result on error
    return {
      videos: [],
      total: 0,
      currentPage: 1,
      totalPages: 0,
      hasMore: false,
    };
  }
}

/**
 * Fetch a single video by ID from Eporner
 *
 * @param id - Eporner video ID
 * @returns Promise with video data or null
 */
export async function fetchVideoById(id: string): Promise<Video | null> {
  try {
    const url = `${EPORNER_API.baseUrl}${EPORNER_API.videoEndpoint}?id=${id}&format=${EPORNER_API.format}`;

    console.log('Fetching video from Eporner:', url);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Eporner API error: ${response.status}`);
    }

    const epornerVideo: EpornerVideo = await response.json();
    return mapEpornerVideo(epornerVideo);
  } catch (error) {
    console.error('Error fetching video by ID from Eporner:', error);
    return null;
  }
}

/**
 * Get available categories
 */
export function getCategories(): string[] {
  return CATEGORIES;
}

/**
 * Fetch videos by category
 */
export async function fetchVideosByCategory(
  category: string,
  page: number = 1
): Promise<ApiResponse> {
  // For 'all', just fetch popular videos
  const query = category === 'all' ? '' : category;

  return fetchVideos({
    query,
    page,
    order: 'most-popular',
  });
}

/**
 * Search videos by keyword
 */
export async function searchVideos(
  searchQuery: string,
  page: number = 1
): Promise<ApiResponse> {
  return fetchVideos({
    query: searchQuery,
    page,
    order: 'most-recent',
  });
}

/**
 * Fetch top rated videos
 */
export async function fetchTopRated(page: number = 1): Promise<ApiResponse> {
  return fetchVideos({
    page,
    order: 'top-rated',
    lq: '0', // HD only for top rated
  });
}

/**
 * Fetch most popular videos
 */
export async function fetchMostPopular(page: number = 1): Promise<ApiResponse> {
  return fetchVideos({
    page,
    order: 'most-popular',
  });
}

/**
 * Fetch longest videos
 */
export async function fetchLongest(page: number = 1): Promise<ApiResponse> {
  return fetchVideos({
    page,
    order: 'longest',
  });
}

/**
 * Get related videos based on keywords
 */
export async function getRelatedVideos(
  video: Video,
  limit: number = 6
): Promise<Video[]> {
  // Extract first keyword from video
  const keywords = video.keywords.split(',').map(k => k.trim());
  const searchTerm = keywords[0] || '';

  const response = await fetchVideos({
    query: searchTerm,
    perPage: limit + 1, // Get one extra in case current video is in results
  });

  // Filter out the current video
  return response.videos.filter(v => v.id !== video.id).slice(0, limit);
}
