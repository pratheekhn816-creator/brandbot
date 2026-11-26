# Branding Bots: 10 SEO Blog Posts, Developer Handoff

Site: https://brandingbots.in/ (static HTML site: index.html, blog.html, etc.)
Audience: startup founders and growing D2C/product businesses in India (Bangalore focus)
Goal: organic traffic from founder-intent searches, then conversion to /contact.html

## Files
Each `.md` file has YAML front matter (SEO fields) followed by the article body in Markdown. Convert to HTML to match the site template.

| # | File | Primary keyword | Intent |
|---|------|-----------------|--------|
| 1 | 01-branding-for-startups-india.md | branding for startups | Pillar guide |
| 2 | 02-startup-branding-cost-india.md | branding cost for startups India | Commercial |
| 3 | 03-brand-identity-checklist-for-founders.md | brand identity checklist | Informational |
| 4 | 04-how-to-choose-branding-agency-bangalore.md | branding agency in Bangalore | Commercial / local |
| 5 | 05-startup-website-checklist.md | startup website design | Informational |
| 6 | 06-amazon-india-seller-branding-guide.md | Amazon listing optimization India | Informational / commercial |
| 7 | 07-packaging-design-for-startups.md | packaging design for startups | Informational / commercial |
| 8 | 08-brand-video-for-startups.md | brand video production for startups | Informational / commercial |
| 9 | 09-seo-for-startups-india.md | SEO for startups India | Informational |
| 10 | 10-brand-positioning-for-startups.md | brand positioning for startups | Informational / commercial |

## Suggested publishing schedule
Publish #1 first (pillar), then 2 posts per week. Posts 2 to 10 link back to the pillar.
Week 1: #1, #4 | Week 2: #2, #3 | Week 3: #5, #9 | Week 4: #6, #7 | Week 5: #8, #10

## Per-post implementation checklist
1. URL: `/blog/{slug}.html` (match the existing site's URL pattern; the internal links in the posts assume `/blog/{slug}.html`).
2. `<title>` = `meta_title`; `<meta name="description">` = `meta_description`.
3. One `<h1>` only (the `title` field). Body uses H2/H3.
4. Canonical tag pointing to the post's own URL.
5. Open Graph + Twitter tags (og:title, og:description, og:image, og:type=article).
6. Featured image: generate from `featured_image_prompt`, export as WebP, 1200x630 minimum, under 150 KB, file name = `featured_image_filename`, alt = `featured_image_alt`. Add `loading="lazy"` to all images except the featured one.
7. Add the post to `blog.html` listing and to `sitemap.xml`. Submit sitemap in Google Search Console.
8. Add `Article` and `FAQPage` JSON-LD schema (template below). FAQ questions are the H3s under "Frequently asked questions" in each post.
9. Add breadcrumb: Home > Blog > Post title.
10. Show author (e.g., Sujith Kumar, Founder & Creative Lead, or the "Branding Bots Team") and publish/updated dates.
11. Add a sticky or end-of-post CTA button linking to `/contact.html`.
12. Make sure pages are mobile-first and pass Core Web Vitals (PageSpeed Insights).

## IMPORTANT: verify internal link paths
The homepage navigation shows these pages: index, about, team, faq, service, portfolio, blog, contact (all `.html`). The service sub-pages were described as creative-consulting, brand-identity, website-design, video-production, digital-marketing and ecommerce-solutions, but the exact file names/paths were not confirmed. Before publishing, find and replace if needed:

- /creative-consulting.html
- /brand-identity.html
- /website-design.html
- /video-production.html
- /digital-marketing.html
- /ecommerce-solutions.html

Also confirm /blog/{slug}.html is the intended blog URL structure; adjust links across all 10 posts if it differs.

## Article schema template (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "{title}",
  "description": "{meta_description}",
  "image": "https://brandingbots.in/images/blog/{featured_image_filename}",
  "author": { "@type": "Organization", "name": "Branding Bots" },
  "publisher": {
    "@type": "Organization",
    "name": "Branding Bots",
    "logo": { "@type": "ImageObject", "url": "https://brandingbots.in/images/logo.png" }
  },
  "datePublished": "YYYY-MM-DD",
  "dateModified": "YYYY-MM-DD",
  "mainEntityOfPage": "https://brandingbots.in/blog/{slug}.html"
}
```

## FAQ schema template (build from each post's FAQ section)
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "{question}",
      "acceptedAnswer": { "@type": "Answer", "text": "{answer}" }
    }
  ]
}
```

## Site-wide SEO notes for the developer
- The homepage had no visible blog posts, so make sure blog.html is crawlable, linked in the main nav and footer, and lists posts with title, excerpt, date and image.
- Add `LocalBusiness`/`Organization` schema on the homepage (Bangalore, India; connect@brandingbots.in).
- Add "Related posts" (2 to 3) at the end of each article.
- Add a short newsletter or WhatsApp CTA at the end of each post if desired.
- Track conversions in GA4: contact form submits, WhatsApp clicks and "Book a consultation" button clicks.

## Content notes for the client
- No invented statistics or client results are used. If you want to add real numbers (for example results from Love Kaapi, Deco or Nisargalaya), add them to the relevant posts with permission, since specific proof improves both rankings and conversions.
- Amazon Brand Registry and food/cosmetic labelling rules change. Re-check them before publishing posts 6 and 7.
- Refresh each post every 6 to 12 months and update `dateModified`.
