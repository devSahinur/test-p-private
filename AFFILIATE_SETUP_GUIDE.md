# Adult Content Affiliate Platform - Setup Guide

## Overview

Your platform has been transformed into a **legitimate affiliate-based adult content discovery site**. This model is 100% legal and how many successful adult traffic sites operate.

### How It Works

1. **You curate** popular videos from major adult platforms
2. **Users browse** your collection
3. **They click** to watch on the original platform
4. **You earn** commission on clicks/signups through affiliate programs

### What Changed

- ✅ **Removed** all content scraping
- ✅ **Added** official affiliate link system
- ✅ **Implemented** age verification
- ✅ **Created** platform badges and tracking
- ✅ **Added** affiliate disclosures (required by law)

---

## Step 1: Sign Up for Affiliate Programs

### Pornhub Network (Recommended)
**Best for beginners - includes Pornhub, RedTube, YouPorn**

1. Visit: https://www.pornhub.com/webmasters
2. Click "Sign Up" for the webmaster program
3. Fill out application (requires tax info, payment details)
4. Once approved, you'll get your **affiliate ID** (called "pkey")
5. Copy your affiliate ID

**Commission Structure:**
- Pay-per-signup (PPS): $1-$50 per signup
- Revenue share: 50-70% recurring
- Pay-per-view: $0.01-$0.05 per view

### xHamster Webmasters
1. Visit: https://xhamster.com/info/webmasters
2. Register for affiliate program
3. Get your affiliate ID
4. Choose your monetization model

### Other Options
- **CrakRevenue** - Adult affiliate network (aggregates multiple sites)
- **AWEmpire** - High-paying adult CPA network
- **TrafficJunky** - Adult advertising platform

---

## Step 2: Configure Your Affiliate IDs

Open `lib/config.ts` and add your affiliate IDs:

```typescript
export const AFFILIATE_CONFIG = {
  pornhub: {
    affiliateId: 'YOUR_ACTUAL_ID_HERE', // Replace this!
    trackingParam: 'pkey',
  },
  redtube: {
    affiliateId: 'YOUR_ACTUAL_ID_HERE',
    trackingParam: 'pkey',
  },
  youporn: {
    affiliateId: 'YOUR_ACTUAL_ID_HERE',
    trackingParam: 'pkey',
  },
  xhamster: {
    affiliateId: 'YOUR_ACTUAL_ID_HERE',
    trackingParam: 'affid',
  },
};
```

**Example with real ID:**
```typescript
pornhub: {
  affiliateId: 'ab123xyz', // Your actual affiliate ID
  trackingParam: 'pkey',
},
```

---

## Step 3: Curate Content

### Manual Curation (Recommended to start)

1. **Browse platforms** (Pornhub, RedTube, etc.)
2. **Find popular videos** in different categories
3. **Copy video details:**
   - Video ID/URL path
   - Title
   - Thumbnail URL (screenshot or provided)
   - Views, rating, duration
   - Category and tags

4. **Add to** `lib/api.ts` in the `SAMPLE_VIDEOS` array:

```typescript
{
  id: 'ph-trending-1',
  title: 'Actual Video Title',
  thumbnail: 'https://path-to-thumbnail.jpg',
  duration: '12:34',
  views: 1250000,
  rating: 4.7,
  category: 'Featured',
  platform: 'pornhub',
  videoUrl: generateAffiliateLink('pornhub', '/view_video.php?viewkey=ACTUAL_VIDEO_ID'),
  uploadDate: '2024-10-20',
  tags: ['amateur', 'couple'],
}
```

### Scaling Up (Future)

1. **Build a database** (PostgreSQL, MongoDB)
2. **Create admin panel** to add/manage videos
3. **Automate tracking** of trending content
4. **Update regularly** (daily/weekly)

---

## Step 4: Run Your Site

```bash
# Install dependencies (if not already done)
npm install

# Run development server
npm run dev

# Visit http://localhost:3000
```

### Test Affiliate Links

1. Click on any video
2. Click "Watch on [Platform]"
3. Check the URL - it should include your affiliate ID:
   - `https://www.pornhub.com/view_video.php?viewkey=xxx&pkey=YOUR_AFFILIATE_ID`

---

## Step 5: Deploy & Promote

### Deployment Options

**Vercel (Recommended for Next.js)**
```bash
npm install -g vercel
vercel
```

**Other Options:**
- Netlify
- DigitalOcean App Platform
- AWS Amplify
- Your own VPS

### Domain & Hosting Tips

1. **Buy a domain** - Use Namecheap, GoDaddy
2. **Adult-friendly hosting** required:
   - Vercel ✅ (generally okay)
   - AWS ✅
   - DigitalOcean ✅
   - Avoid: Some shared hosting blocks adult sites

### Legal Requirements

✅ **Age verification** - Already implemented
✅ **Affiliate disclosure** - Already added
✅ **Privacy policy** - Create one (required)
✅ **Terms of service** - Create one (required)
✅ **DMCA policy** - Recommended (though you don't host content)

### SEO & Traffic

1. **SEO Optimization**
   - Add more metadata
   - Create category pages
   - Blog content about adult entertainment
   - Build backlinks

2. **Traffic Sources**
   - Adult ad networks (TrafficJunky, ExoClick)
   - Social media (Twitter/X is adult-friendly)
   - Adult forums and communities
   - Tube site comments (where allowed)

3. **Monetization Stack**
   - Primary: Affiliate commissions
   - Secondary: Display ads (ExoClick, JuicyAds)
   - Tertiary: Premium memberships (future)

---

## Step 6: Track Performance

### Built-in Tracking
- All affiliate links include your ID
- Platforms provide dashboards showing:
  - Clicks
  - Signups
  - Revenue
  - Best-performing content

### Additional Analytics

**Add Google Analytics:**
```typescript
// In app/layout.tsx, add to <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA-XXXXX"
  strategy="afterInteractive"
/>
```

**Add Click Tracking:**
```typescript
// Track when users click affiliate links
const handleVideoClick = (videoId: string, platform: string) => {
  // Log to your analytics
  gtag('event', 'affiliate_click', {
    video_id: videoId,
    platform: platform
  });
};
```

---

## Revenue Optimization Tips

### 1. Content Strategy
- **Update regularly** - Fresh content = more visits
- **Mix platforms** - Diversify your income
- **Test categories** - Find what converts best
- **Seasonal trends** - Holiday-themed content performs well

### 2. User Experience
- **Fast loading** - Optimize images
- **Mobile-friendly** - Most adult traffic is mobile
- **Easy navigation** - Simple categories
- **Search functionality** - Help users find content

### 3. Conversion Optimization
- **Clear CTAs** - "Watch Now" buttons
- **Quality thumbnails** - Higher click rates
- **Accurate titles** - Match user intent
- **Preview text** - Build anticipation

---

## Legal & Compliance

### Required Disclosures

✅ **18+ Age Gate** - Implemented
✅ **Affiliate Links Notice** - Implemented
⚠️ **Privacy Policy** - You need to create
⚠️ **Terms of Service** - You need to create

### Content Guidelines

- ❌ Don't host any videos yourself
- ❌ Don't scrape or copy content
- ✅ Only link to legitimate platforms
- ✅ Respect copyright (use provided thumbnails)
- ✅ Follow affiliate program rules

### Payment & Taxes

- Set up business entity (LLC recommended)
- Track all income for tax purposes
- Most programs pay via wire transfer, Paxum, or crypto
- Minimum payouts typically $50-$100

---

## Troubleshooting

### Affiliate Links Not Working?
- Check you've added your actual affiliate ID in `lib/config.ts`
- Verify the format matches platform requirements
- Test with browser dev tools (Network tab)

### Videos Not Showing?
- Check `lib/api.ts` - ensure video data is properly formatted
- Verify image URLs are accessible
- Check console for errors

### Age Verification Not Appearing?
- Clear localStorage
- Disable cache
- Check `components/AgeVerification.tsx`

---

## Next Steps

### Immediate (Week 1)
1. ✅ Sign up for affiliate programs
2. ✅ Add your affiliate IDs
3. ✅ Curate 20-50 videos
4. ✅ Test all links
5. ✅ Deploy to production

### Short-term (Month 1)
1. Create privacy policy & TOS
2. Set up analytics
3. Add more content (100+ videos)
4. Start basic SEO
5. Join adult webmaster forums

### Long-term (Month 2+)
1. Build database system
2. Create admin panel
3. Add user accounts/favorites
4. Implement advanced tracking
5. Scale to 1000+ videos
6. Add premium features
7. Diversify traffic sources

---

## Resources

### Communities
- **GFY (Go Fuck Yourself)** - https://gfy.com - #1 Adult webmaster forum
- **WHT** - WebHostingTalk adult section
- **r/AdultWebmasters** - Reddit community

### Tools
- **SimilarWeb** - Competitor research
- **Ahrefs** - SEO analysis
- **TrafficJunky** - Ad buying
- **Paxum** - Adult-friendly payment processor

### Learning
- Affiliate marketing basics
- Adult industry compliance
- SEO for adult sites
- Traffic arbitrage

---

## Support

This platform is now set up for legitimate affiliate marketing. You:
- ✅ Drive traffic to the original platforms
- ✅ Don't violate any copyrights
- ✅ Earn commission legally
- ✅ Follow all platform rules

**Questions?** Review the code comments in:
- `lib/config.ts` - Affiliate configuration
- `lib/api.ts` - Setup instructions
- This guide

---

## Summary

You now have a **legal, scalable affiliate platform** for adult content discovery. Follow this guide to:

1. Get affiliate IDs
2. Configure the platform
3. Curate content
4. Deploy and promote
5. Earn commission

This is the same model used by successful adult traffic sites. Focus on quality curation, user experience, and consistent traffic generation.

Good luck! 🚀
