import { BLOG_POSTS } from '@/lib/blogData';

export default async function sitemap() {
  const baseUrl = 'https://growthore.co.uk';

  // Children article routes under /blog
  return BLOG_POSTS.map((post) => {
    let lastMod = new Date();
    if (post.date) {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed;
      }
    }
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });
}
