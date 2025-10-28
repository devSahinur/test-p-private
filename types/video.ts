/**
 * Video interface matching Eporner API response
 */
export interface Video {
  id: string;
  title: string;
  thumbnail: string;
  duration: string; // Formatted as MM:SS or HH:MM:SS
  views: number;
  rating: number; // 0-5 scale
  embed: string; // Eporner embed URL
  added: string; // Date added
  keywords: string; // Comma-separated tags
  url: string; // Link to original Eporner page
}

/**
 * API response from our fetch functions
 */
export interface ApiResponse {
  videos: Video[];
  total: number;
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}

/**
 * Search parameters for video queries
 */
export interface SearchParams {
  query?: string;
  page?: number;
  perPage?: number;
  gay?: 'straight' | 'gay'; // Eporner supports filtering
  lq?: '0' | '1'; // Low quality filter (0 = HD only)
  order?: 'top-rated' | 'most-popular' | 'longest' | 'most-recent';
}

/**
 * Raw Eporner API video response
 */
export interface EpornerVideo {
  id: string;
  title: string;
  keywords: string;
  views: number;
  rate: number; // 0-100 scale
  url: string;
  added: string;
  length_sec: number;
  length_min: string;
  embed: string;
  default_thumb: {
    src: string;
    width: number;
    height: number;
  };
  thumb: string;
}

/**
 * Raw Eporner API search response
 */
export interface EpornerSearchResponse {
  videos: EpornerVideo[];
  count: number;
  total_count: number;
  current_page: number;
  per_page: number;
  total_pages: number;
}
