# 🎯 Adsterra Ads Integration Guide

Complete guide to integrating Adsterra ads on your adult content video platform.

## 📋 Table of Contents
- [What is Adsterra?](#what-is-adsterra)
- [Why Adsterra for Adult Content?](#why-adsterra-for-adult-content)
- [Ad Formats Available](#ad-formats-available)
- [Getting Started](#getting-started)
- [Configuration Steps](#configuration-steps)
- [Ad Placement Strategy](#ad-placement-strategy)
- [Revenue Optimization Tips](#revenue-optimization-tips)

---

## 🌟 What is Adsterra?

Adsterra is a leading ad network that specializes in high-paying ad formats and accepts adult content websites. They serve 11.8 billion monthly impressions and offer premium CPM rates for adult traffic.

**Key Benefits:**
- ✅ Accepts adult content (unlike Google AdSense)
- ✅ High CPM rates for adult niches
- ✅ Multiple ad formats (banners, native, popunders, social bar)
- ✅ Fast payments (Net-15, minimum $100)
- ✅ Dedicated account manager support
- ✅ Advanced targeting and optimization

---

## 🎬 Why Adsterra for Adult Content?

| Feature | Adsterra | Google AdSense |
|---------|----------|----------------|
| Adult Content | ✅ Allowed | ❌ Not Allowed |
| CPM Rates | High | N/A |
| Payment Terms | Net-15 | Net-30 |
| Minimum Payout | $100 | $100 |
| Ad Formats | 5+ Formats | Limited |
| Adult Niches | Premium Rates | N/A |

---

## 🎨 Ad Formats Available

### 1. **Banner Ads** 💰
Static display ads for desktop and mobile.

**Sizes Available:**
- 728x90 (Leaderboard) - Desktop top/bottom
- 300x250 (Medium Rectangle) - **Most Popular**
- 320x50 (Mobile Banner) - Mobile header/footer
- 160x600 (Wide Skyscraper) - Desktop sidebar
- 468x60 (Banner) - Classic banner
- 336x280 (Large Rectangle) - Content area

**Best For:** Header, footer, sidebar placements

---

### 2. **Native Ads** 🎯
Ads that blend with your content - highest CTR.

**Best For:** Between video grids, within content

**Advantages:**
- Highest click-through rates
- Non-intrusive
- Matches your site design
- Works great on mobile

---

### 3. **Popunder Ads** 💸
Full-page ads that open in new tab/window.

**Revenue:** Highest revenue per impression
**Note:** Can affect user experience, use strategically

**Best For:** Video page loads (highest CPM pages)

---

### 4. **Social Bar** 🚀
Advanced In-Page Push format (Adsterra exclusive).

**Features:**
- 30% higher CTR than traditional web push
- Non-intrusive (appears at bottom/corner)
- 20+ visual templates
- Mobile and desktop friendly

**Best For:** All pages, site-wide implementation

---

## 🚀 Getting Started

### Step 1: Sign Up for Adsterra

1. Visit [https://publishers.adsterra.com/](https://publishers.adsterra.com/)
2. Click "Sign Up" or "Join as Publisher"
3. Fill in your details:
   - Email
   - Password
   - Website URL
   - Traffic details
4. Verify your email
5. Wait for account approval (usually 24-48 hours)

---

### Step 2: Add Your Website

Once approved:

1. Login to your Adsterra dashboard
2. Go to "Websites" → "Add Website"
3. Enter your website details:
   - Website URL: `https://yoursite.com`
   - Category: Adult Content
   - Traffic: Monthly visitors
   - Traffic sources: Direct, Social, SEO, etc.
4. Submit for review
5. Wait for website approval (24 hours)

---

### Step 3: Create Ad Placements

For each ad format, create a placement:

#### **Banner Ads:**

1. Go to "Ad Units" → "Create New"
2. Select "Banner"
3. Choose size (e.g., 728x90)
4. Name it (e.g., "Homepage Top Banner 728x90")
5. Click "Create"
6. **Copy the KEY** from the code (looks like: `abcd1234efgh5678`)

**Repeat for all banner sizes you need:**
- 728x90 (Desktop leaderboard)
- 300x250 (Medium rectangle)
- 320x50 (Mobile banner)
- 160x600 (Sidebar)

#### **Native Ads:**

1. Create new ad unit
2. Select "Native Banner"
3. Name it (e.g., "Feed Native Ads")
4. **Copy the KEY**

#### **Popunder:**

1. Create new ad unit
2. Select "Popunder"
3. Name it (e.g., "Video Page Popunder")
4. **Copy the KEY**

#### **Social Bar:**

1. Create new ad unit
2. Select "Social Bar"
3. Name it (e.g., "Site-wide Social Bar")
4. **Copy the KEY**

---

## ⚙️ Configuration Steps

### Step 4: Update Your Config File

Open `lib/ads-config.ts` and replace all `'YOUR_KEY_HERE'` with your actual Adsterra keys:

```typescript
// Example of what your keys look like
export const ADSTERRA_BANNERS = {
  LEADERBOARD_728x90: 'abcd1234efgh5678',        // ← Paste your key here
  MEDIUM_RECTANGLE_300x250: 'ijkl9012mnop3456',  // ← Paste your key here
  MOBILE_BANNER_320x50: 'qrst5678uvwx9012',      // ← Paste your key here
  // ... etc
};
```

**Where to find the KEY:**

When you create an ad placement, Adsterra gives you code like:

```javascript
<script type="text/javascript">
    atOptions = {
        'key' : 'abcd1234efgh5678',  // ← THIS IS YOUR KEY!
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
    };
</script>
<script type="text/javascript" src="//www.topcreativeformat.com/abcd1234efgh5678/invoke.js"></script>
```

Copy the `key` value and paste it in your config.

---

### Step 5: Enable/Disable Ad Formats

In `lib/ads-config.ts`, configure which ads to show:

```typescript
export const AD_SETTINGS = {
  enableBanners: true,           // Show banner ads
  enableMobileBanners: true,     // Show mobile-specific banners
  enableNative: true,            // Show native ads (recommended)
  enablePopunder: true,          // Show popunders (high revenue)
  enableSocialBar: true,         // Show social bar (recommended)
};
```

---

## 📍 Ad Placement Strategy

### Homepage Layout:

```
┌─────────────────────────────────────┐
│  Header / Navigation                │
├─────────────────────────────────────┤
│  [728x90 Banner - Desktop]          │
│  [320x50 Banner - Mobile]           │
├─────────────────────────────────────┤
│  Hero Section / Search              │
├─────────────────────────────────────┤
│  Category Filter                    │
├─────────────────────────────────────┤
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │  Videos  │
│  └───┘ └───┘ └───┘ └───┘          │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐          │
│  │ 5 │ │ 6 │ │ 7 │ │ 8 │          │
│  └───┘ └───┘ └───┘ └───┘          │
├─────────────────────────────────────┤
│  [Native Ad 300x250]                │
├─────────────────────────────────────┤
│  More videos...                     │
├─────────────────────────────────────┤
│  [728x90 Banner - Desktop]          │
│  [320x50 Banner - Mobile]           │
└─────────────────────────────────────┘
[Social Bar at bottom] 💬
```

### Video Page Layout (Highest Revenue):

```
┌─────────────────────────────────────┬─────────┐
│  [728x90 Banner - Desktop]          │         │
│  [320x50 Banner - Mobile]           │         │
├─────────────────────────────────────┤  Sidebar│
│  ┌───────────────────────────────┐  │         │
│  │                               │  │ [300x  │
│  │      Video Player             │  │  250]  │
│  │                               │  │         │
│  └───────────────────────────────┘  │ Related│
│  Video Title & Info                 │ Videos │
│  [Native Ad 300x250]                │  ┌─┐   │
├─────────────────────────────────────┤  │1│   │
│  [728x90 Banner - Desktop]          │  └─┘   │
│  [320x50 Banner - Mobile]           │  ┌─┐   │
└─────────────────────────────────────┴──│2│───┘
[Social Bar at bottom] 💬               └─┘
[Popunder on page load] 🪟
```

---

## 💰 Revenue Optimization Tips

### 1. **Focus on Video Pages**
Video pages generate 2-3x higher CPM than homepage.

**Strategy:**
- Add more ads on video pages
- Enable popunders on video pages
- Use 300x250 banners (highest fill rate)

---

### 2. **Use Native Ads**
Native ads have the highest CTR.

**Placement:**
- Between video grids (every 8-12 videos)
- Below video player
- Within content sections

---

### 3. **Strategic Popunders**
High revenue but use carefully.

**Best Practice:**
- Only on video pages (highest value)
- Limit to once per session
- Don't use on homepage (affects bounce rate)

---

### 4. **Social Bar is Gold**
30% higher performance than traditional push.

**Benefits:**
- Non-intrusive
- Works on all devices
- Doesn't affect layout
- High engagement

**Enable site-wide!**

---

### 5. **Mobile Optimization**
50%+ traffic is mobile.

**Strategy:**
- Use 320x50 for mobile headers/footers
- Use 300x250 for content (works on all devices)
- Native ads perform great on mobile
- Social bar is mobile-friendly

---

### 6. **A/B Testing**
Test different placements and track revenue.

**What to Test:**
- Banner sizes (300x250 vs 728x90)
- Native ad positions
- Popunder frequency
- Number of ads per page

---

### 7. **Traffic Quality Matters**
Adult content gets premium CPM rates.

**Focus on:**
- SEO for adult keywords
- Social media traffic (Twitter, Reddit)
- Direct traffic (brand building)
- Geo-targeting (US, UK, CA = highest CPM)

---

## 📊 Expected Revenue

### Typical CPM Rates (Adult Content):

| Ad Format | Desktop CPM | Mobile CPM |
|-----------|-------------|------------|
| Banner 728x90 | $1.50 - $4.00 | N/A |
| Banner 300x250 | $2.00 - $5.00 | $1.50 - $3.50 |
| Banner 320x50 | N/A | $1.00 - $2.50 |
| Native Ads | $2.50 - $6.00 | $2.00 - $5.00 |
| Popunder | $3.00 - $8.00 | $2.50 - $7.00 |
| Social Bar | $2.00 - $5.00 | $1.80 - $4.50 |

**Example Revenue (10,000 daily visitors):**
- Banner impressions: 30,000/day × $2 CPM = $60/day
- Native impressions: 10,000/day × $4 CPM = $40/day
- Popunders: 3,000/day × $5 CPM = $15/day
- Social Bar: 10,000/day × $3 CPM = $30/day

**Total: $145/day = $4,350/month**

*Rates vary by traffic quality, geo, and niche*

---

## 🔧 Testing Your Integration

### Step 1: Check Console Errors

Open browser console (F12) and look for:
- ✅ No errors loading Adsterra scripts
- ✅ Scripts loading from `topcreativeformat.com`
- ❌ Check for blocked requests (ad blockers)

### Step 2: Verify Ad Display

1. Disable ad blocker
2. Reload page
3. Verify ads appear in:
   - Top banner
   - Between videos (native)
   - Bottom banner
   - Video page sidebar
   - Social bar (bottom corner)

### Step 3: Test Popunder

- Should open new tab on first page load
- Should NOT open again in same session
- Check Adsterra dashboard for popunder impressions

---

## 📈 Monitoring Performance

### Adsterra Dashboard:

1. Login to [https://publishers.adsterra.com/](https://publishers.adsterra.com/)
2. Check metrics:
   - **Impressions**: Total ad views
   - **Clicks**: Total clicks
   - **CTR**: Click-through rate
   - **Revenue**: Earnings
   - **eCPM**: Effective CPM

### Key Metrics to Watch:

- **Impressions per page**: Should be 3-5+
- **CTR**: 0.5% - 2% is normal
- **eCPM**: $2-$6 for adult content
- **Fill Rate**: Should be 95%+

---

## 🆘 Troubleshooting

### Ads Not Showing?

**Check:**
1. ✅ Keys are correct in `lib/ads-config.ts`
2. ✅ Ad blockers are disabled
3. ✅ Website is approved in Adsterra
4. ✅ Ad units are active (not paused)
5. ✅ Browser console for errors
6. ✅ Clear browser cache

### Low Revenue?

**Optimize:**
1. Add more ad placements
2. Enable popunders on video pages
3. Use 300x250 banners (highest fill)
4. Enable social bar site-wide
5. Improve traffic quality (SEO, social)
6. Target high-CPM geos (US, UK, CA)

### Social Bar Not Appearing?

- Should appear at bottom corner after 5-10 seconds
- Check if `enableSocialBar: true` in config
- Verify key is correct
- Clear cache and reload

---

## 📞 Support

### Adsterra Support:
- **Email**: support@adsterra.com
- **Live Chat**: Available in dashboard
- **Skype**: adsterrasupport
- **Telegram**: @AdsterraSupport

### Account Manager:
Once you reach $500/month, you'll get a dedicated account manager for optimization help.

---

## ✅ Quick Checklist

Before going live:

- [ ] Adsterra account created and approved
- [ ] Website added and approved
- [ ] Ad placements created for all formats
- [ ] Keys copied to `lib/ads-config.ts`
- [ ] Ad settings configured in config
- [ ] Tested on desktop and mobile
- [ ] Verified ads load without errors
- [ ] Checked Adsterra dashboard for impressions
- [ ] Disabled test mode (if applicable)
- [ ] Monitoring revenue daily

---

## 🎉 Next Steps

1. **Create Adsterra Account**: [Sign up here](https://publishers.adsterra.com/)
2. **Get Your Keys**: Create ad placements
3. **Update Config**: Paste keys in `lib/ads-config.ts`
4. **Test Thoroughly**: Desktop and mobile
5. **Monitor Performance**: Check dashboard daily
6. **Optimize**: Test different placements
7. **Scale Up**: Add more traffic sources

---

**Good luck with your monetization! 🚀💰**

For questions, check the Adsterra knowledge base or contact their support team.
