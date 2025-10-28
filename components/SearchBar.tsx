'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    } else {
      router.push(`/?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search videos..."
          className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
        />
        <button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-md transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
}
