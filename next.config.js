/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/services',
        destination: '/service',
        permanent: true,
      },
      {
        source: '/services/:slug',
        destination: '/service/:slug',
        permanent: true,
      },
      {
        source: '/ai-seo',
        destination: '/service/ai-seo',
        permanent: true,
      },
      {
        source: '/performance-marketing',
        destination: '/service/performance-marketing',
        permanent: true,
      },
      {
        source: '/social-media-marketing',
        destination: '/service/social-media-marketing',
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/imgs/:path*',
        destination: '/images/:path*',
      },
      {
        source: '/lp-performance-marketing',
        destination: '/lp-performance-marketing-agency',
      },
      {
        source: '/lp-performance-landing-page',
        destination: '/lp-performance-marketing-agency',
      },
      {
        source: '/service-sitemap.xml',
        destination: '/service/sitemap.xml',
      },
      {
        source: '/blog-sitemap.xml',
        destination: '/blog/sitemap.xml',
      },
      {
        source: '/pages-sitemap.xml',
        destination: '/sitemap.xml',
      },
    ];
  },
};

module.exports = nextConfig;
