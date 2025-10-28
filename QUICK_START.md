# Quick Start Guide - Adult Video Streaming Website

## 🎉 Your Website is Ready!

You now have a fully functional adult video streaming website built with **Next.js 15**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Getting Started

### 1. Start the Development Server

```bash
npm run dev
```

The site will be available at: **http://localhost:3000** (or the next available port)

### 2. Open in Your Browser

Navigate to **http://localhost:3000** to see your website in action!

## ✨ What's Included

### Features:
- ✅ **Real Adult Content Integration** (via Lustpress API)
- ✅ **Fallback System** (works with sample data if API is down)
- ✅ **Video Grid Layout** (responsive design)
- ✅ **Search Functionality** (search by title and tags)
- ✅ **Category Filtering** (Featured, Trending, Popular)
- ✅ **Video Player Pages** (with video details)
- ✅ **Related Videos** (based on category)
- ✅ **Fully Responsive** (mobile, tablet, desktop)

### Technology Stack:
- **Next.js 15** - Latest version with App Router
- **React 19** - Modern React features
- **TypeScript** - Type-safe code
- **Tailwind CSS** - Beautiful styling
- **Lustpress API** - Real adult video content

## 🔧 Configuration

### Change Video Platform

Edit `lib/config.ts` to switch between platforms:

```typescript
export const API_CONFIG = {
  platform: 'xhamster', // Options: xhamster, pornhub, xvideos, xnxx, redtube, youporn
  baseUrl: 'https://lust.scathach.id',
  fallbackUrl: 'https://lust.merahputih.moe',
};
```

### Customize Branding

Edit `lib/config.ts` to change the site name:

```typescript
export const SITE_CONFIG = {
  name: 'Your Site Name',  // Change this
  description: 'Your description',
  platformDisplayName: PLATFORM_NAMES[API_CONFIG.platform],
};
```

### Update Header

Edit `components/Header.tsx` to customize navigation and branding.

### Change Colors

Edit `tailwind.config.ts` and `app/globals.css` to customize colors and theme.

## 📁 Project Structure

```
new-web/
├── app/
│   ├── video/[id]/page.tsx    # Video player page
│   ├── page.tsx                # Homepage
│   ├── layout.tsx              # Root layout
│   └── globals.css             # Global styles
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── VideoCard.tsx           # Video thumbnail cards
│   ├── SearchBar.tsx           # Search component
│   └── CategoryFilter.tsx      # Category buttons
├── lib/
│   ├── api.ts                  # API integration + fallback
│   └── config.ts               # Configuration settings
└── types/
    └── video.ts                # TypeScript interfaces
```

## 🌐 API Integration

### Current Setup:
The website uses the **Lustpress API** which provides free access to adult content from multiple platforms.

**API Status:**
- If the API is available, real content will be fetched
- If the API is down, fallback sample data is used automatically
- No configuration required - it works out of the box!

### API Endpoints Used:
- Search: `/{platform}/search?key={query}&page={page}&sort={sort}`
- Get Video: `/{platform}/get?id={video_id}`

## 🎨 Customization Ideas

### Add More Features:
1. **User Authentication** - Add login/signup with Firebase or Auth0
2. **Favorites** - Let users save their favorite videos
3. **Comments** - Add comment sections to videos
4. **Upload** - Allow users to upload content
5. **Premium Content** - Add payment integration
6. **Analytics** - Track views and user behavior

### Improve Design:
1. Add dark/light mode toggle
2. Customize fonts and typography
3. Add animations and transitions
4. Create custom video player controls

## 🚀 Deployment

### Deploy to Vercel (Recommended):

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

### Deploy to Other Platforms:
- **Netlify**
- **AWS Amplify**
- **Digital Ocean**
- **Custom VPS**

## ⚠️ Important Notes

### Legal Considerations:
- Ensure compliance with local laws
- Implement age verification (required for adult sites)
- Add proper terms of service and privacy policy
- Consider DMCA compliance
- Use appropriate content warnings

### Performance:
- The website is optimized for performance
- Images are lazy-loaded
- API calls have timeout protection
- Fallback data ensures the site always works

### Security:
- Always use HTTPS in production
- Implement proper content security policies
- Add rate limiting to prevent abuse
- Secure user data if adding authentication

## 📚 Learn More

### Documentation:
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

### Need Help?
- Check the main README.md for detailed information
- Review the code comments for implementation details
- Inspect the components to understand the structure

## 🎯 Next Steps

1. **Run the development server** - `npm run dev`
2. **Open the website** - http://localhost:3000
3. **Explore the features** - Search, filter, browse videos
4. **Customize the design** - Make it your own!
5. **Add new features** - Build on top of this foundation
6. **Deploy to production** - Share with the world!

## 💡 Tips

- The API may take a few seconds to respond on first load
- If you see sample data, the external API might be temporarily unavailable
- Clear your browser cache if you see outdated content
- Check the browser console for any errors or warnings

---

**Happy Building! 🎬**

Your adult video streaming website is ready to use. Customize it, add features, and make it your own!
