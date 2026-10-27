import { BLOG_POSTS } from '@/lib/blogData';

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const canonicalUrl = `https://growthore.co.uk/blog/${post.slug}`;
  const pageTitle = `${post.title} | GrowthOre`;
  const pageDesc = post.excerpt || post.metaDescription || 'Read our latest insights on performance marketing and AI search.';

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: post.title,
      description: pageDesc,
      url: canonicalUrl,
      type: 'article',
      publishedTime: post.date,
      authors: post.author?.name ? [post.author.name] : ['GrowthOre Team'],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: pageDesc,
      images: post.image ? [post.image] : [],
    },
  };
}

export default function BlogDetailLayout({ children }) {
  return children;
}
