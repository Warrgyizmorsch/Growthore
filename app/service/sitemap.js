export default async function sitemap() {
  const baseUrl = 'https://growthore.co.uk';

  // Children sub-routes under /service
  return [
    {
      url: `${baseUrl}/service/performance-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/social-media-marketing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/service/ai-seo`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}
