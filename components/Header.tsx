import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/config';

export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-orange-500 hover:text-orange-400 transition-colors">
              {SITE_CONFIG.name}
            </span>
            <span className="hidden sm:inline-block px-2 py-1 text-xs bg-orange-500 text-white rounded font-semibold">
              18+
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-300 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/trending" className="text-gray-300 hover:text-white transition-colors">
              🔥 Trending
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center text-xs text-gray-500 px-3 py-1 bg-gray-800 rounded">
              <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Powered by Eporner
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
