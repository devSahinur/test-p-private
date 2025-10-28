# Adult Video Streaming Website

A modern adult video streaming platform built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**. This project is fully integrated with the **Lustpress API** to provide real adult video content from multiple platforms including xHamster, PornHub, XVideos, XNXX, RedTube, and YouPorn.

## Features

- **Real Adult Content**: Integrated with Lustpress API for live content
- **Multiple Platforms**: Switch between xHamster, PornHub, XVideos, XNXX, RedTube, YouPorn
- **Modern UI/UX**: Clean, responsive design optimized for adult content
- **Video Grid Layout**: Browse videos in an organized grid layout
- **Video Player**: Dedicated video player pages with full metadata
- **Search Functionality**: Search videos by title and tags across platforms
- **Category Filtering**: Filter videos by categories (Featured, Trending, Popular)
- **Related Videos**: Show related content based on category
- **Responsive Design**: Mobile-first design that works on all devices
- **Type Safety**: Full TypeScript implementation
- **SEO Optimized**: Built with Next.js App Router for optimal SEO

## Tech Stack

- **Next.js 15** (Latest version with App Router)
- **React 19**
- **TypeScript 5.6**
- **Tailwind CSS 3.4**
- **ESLint** for code quality

## Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager

### Installation

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
new-web/
├── app/
│   ├── video/
│   │   └── [id]/
│   │       └── page.tsx      # Video player page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── CategoryFilter.tsx     # Category filter component
│   ├── Header.tsx             # Header navigation
│   ├── SearchBar.tsx          # Search functionality
│   └── VideoCard.tsx          # Video card component
├── lib/
│   └── api.ts                 # API utilities and mock data
├── types/
│   └── video.ts               # TypeScript interfaces
└── package.json
```

## API Integration (Already Configured!)

This project is **already integrated** with real adult video content using the **Lustpress API**.

### Current Setup

The app uses **Lustpress** - a free, public RESTful API that aggregates adult content from multiple platforms:

- ✅ **xHamster** (default)
- ✅ **PornHub**
- ✅ **XVideos**
- ✅ **XNXX**
- ✅ **RedTube**
- ✅ **YouPorn**

### Switching Platforms

To change the video source platform, edit `lib/config.ts`:

```typescript
export const API_CONFIG = {
  platform: 'xhamster', // Change to: pornhub, xvideos, xnxx, redtube, youporn
  baseUrl: 'https://lust.scathach.id',
  fallbackUrl: 'https://lust.merahputih.moe',
};
```

### How It Works

The app fetches real video data from the Lustpress API:

- **Search**: `GET /{platform}/search?key={query}&page={page}&sort={sort}`
- **Get Video**: `GET /{platform}/get?id={video_id}`
- **Related Videos**: `GET /{platform}/related?id={video_id}`

All API calls are handled in `lib/api.ts` with proper error handling and data mapping.

### Using a Different API

If you want to use a different API service:

1. Update `lib/api.ts` with your API endpoints
2. Map the API response to match the `Video` interface in `types/video.ts`
3. Update `lib/config.ts` with your API configuration

Example for custom API:

```typescript
export async function fetchVideos(params: SearchParams = {}): Promise<ApiResponse> {
  const response = await fetch(`https://your-api.com/videos`, {
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch videos');
  }

  const data = await response.json();

  // Map API response to your Video interface
  return {
    videos: data.videos.map((item: any) => ({
      id: item.id,
      title: item.title,
      thumbnail: item.thumb,
      duration: item.duration,
      views: item.views,
      rating: item.rating,
      category: item.category,
      videoUrl: item.url,
      uploadDate: item.publish_date,
      tags: item.tags || [],
    })),
    total: data.total,
    page: data.page,
    hasMore: data.hasMore,
  };
}
```

### Step 3: Environment Variables

Create a `.env.local` file for your API credentials:

```env
NEXT_PUBLIC_API_KEY=your_api_key_here
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Step 4: Update Type Definitions

If your API returns different data structures, update the interfaces in `types/video.ts` to match your API response.

## Important Legal Considerations

If you're building an adult content website, ensure you:

1. **Age Verification**: Implement proper age verification systems
2. **Content Compliance**: Ensure all content complies with local laws
3. **Terms of Service**: Create comprehensive terms of service
4. **Privacy Policy**: Implement proper data handling and privacy policies
5. **Content Moderation**: Have systems in place for content review
6. **DMCA Compliance**: Implement takedown procedures
7. **2257 Compliance**: If applicable in your jurisdiction
8. **Payment Processing**: Use compliant payment processors if monetizing

## Customization

### Changing Colors

Edit `tailwind.config.ts` to customize the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      primary: '#ff5722',  // Change primary color
      secondary: '#212121', // Change secondary color
    },
  },
},
```

### Adding More Features

Some features you might want to add:

- **User Authentication**: Firebase, Auth0, or custom auth
- **User Profiles**: Allow users to create accounts
- **Favorites/Playlists**: Save videos to watch later
- **Comments**: Add comment sections to videos
- **Upload Functionality**: Allow users to upload content
- **Payment Integration**: Stripe, PayPal for premium content
- **Analytics**: Track user engagement with tools like Google Analytics

## Building for Production

```bash
npm run build
npm start
```

## Deployment

Deploy to platforms like:

- **Vercel** (recommended for Next.js)
- **Netlify**
- **AWS**
- **Digital Ocean**
- **Custom VPS**

For Vercel deployment:

```bash
npm install -g vercel
vercel
```

## Performance Optimization

- Images are optimized using Next.js Image component
- Videos can be lazy-loaded
- Consider using a CDN for video content
- Implement pagination or infinite scroll for better UX

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is open source and available under the MIT License.

## Disclaimer

This is a template project for educational purposes. Ensure you comply with all applicable laws and regulations when deploying a production website, especially when dealing with adult content.

## Support

For issues and questions, please open an issue in the repository.

---

Built with Next.js 15 and Tailwind CSS
# test-p-private
