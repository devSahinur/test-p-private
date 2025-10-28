import Image from 'next/image';
import Link from 'next/link';
import { Video } from '@/types/video';

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const formatViews = (views: number): string => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  // Get first tag from keywords
  const firstTag = video.keywords.split(',')[0]?.trim() || 'HD';

  const handleClick = () => {
    console.log('Video clicked:', video.id, video.title);
  };

  return (
    <Link
      href={`/video/${video.id}`}
      onClick={handleClick}
      className="group cursor-pointer block transform transition-all duration-300 hover:-translate-y-2"
    >
      <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-800 shadow-lg group-hover:shadow-2xl group-hover:shadow-orange-500/20 transition-shadow duration-300">
        {/* Thumbnail Image */}
        <Image
          src={video.thumbnail}
          alt={video.title}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          unoptimized
        />

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 px-2 py-1 rounded text-xs font-semibold backdrop-blur-sm z-20">
          {video.duration}
        </div>

        {/* HD Badge */}
        <div className="absolute top-2 left-2 bg-orange-500 px-2 py-1 rounded text-xs font-semibold shadow-lg z-20">
          HD
        </div>

        {/* Views Badge (shows on hover) */}
        <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {formatViews(video.views)} views
        </div>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Play Button with pulsing effect */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <div className="relative">
              {/* Pulsing ring */}
              <div className="absolute inset-0 bg-orange-500 rounded-full opacity-75 group-hover:animate-ping" />
              {/* Play button */}
              <div className="relative bg-orange-500 rounded-full p-4 shadow-2xl">
                <svg
                  className="w-8 h-8 text-white ml-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Click to watch indicator */}
        <div className="absolute bottom-2 left-2 bg-white/20 backdrop-blur-sm px-2 py-1 rounded text-xs font-semibold z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Click to watch
        </div>
      </div>

      <div className="mt-3">
        <h3 className="text-white font-medium line-clamp-2 group-hover:text-orange-500 transition-colors">
          {video.title}
        </h3>
        <div className="mt-2 flex items-center justify-between text-sm text-gray-400">
          <span>{formatViews(video.views)} views</span>
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{video.rating.toFixed(1)}</span>
          </div>
        </div>
        <div className="mt-1">
          <span className="inline-block px-2 py-1 text-xs bg-gray-800 text-gray-300 rounded">
            {firstTag}
          </span>
        </div>
      </div>
    </Link>
  );
}
