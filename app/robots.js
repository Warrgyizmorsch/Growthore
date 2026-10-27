export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/thank-you', '/api/'],
      },
    ],
    sitemap: [
      'https://growthore.co.uk/sitemap.xml',
      'https://growthore.co.uk/service/sitemap.xml',
      'https://growthore.co.uk/blog/sitemap.xml',
    ],
    host: 'https://growthore.co.uk',
  };
}
