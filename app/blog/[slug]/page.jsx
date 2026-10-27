'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import './blog-detail.css';
import { BLOG_POSTS, getRelatedBlogs } from '../../../lib/blogData';

export default function BlogDetailPage({ params }) {
  // Resolve params for Next.js 15+
  const resolvedParams = params instanceof Promise ? use(params) : params;
  const slug = resolvedParams?.slug;

  const [scrollProgress, setScrollProgress] = useState(0);
  const [copied, setCopied] = useState(false);

  // Find post by slug
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  // If post not found
  if (!post) {
    notFound();
  }

  // Related posts
  const relatedPosts = getRelatedBlogs(post.slug, post.category, 3);

  // Reading progress tracker
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCopyLink = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Reading "${post.title}" via @growthore`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  const handleOpenLead = (service = 'Growth Audit') => {
    if (typeof window !== 'undefined' && window.openGrowthModal) {
      window.openGrowthModal(service);
    }
  };

  return (
    <main className="page-blog-detail">
      {/* Reading Progress Indicator */}
      <div
        className="reading-progress-bar"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />

      {/* Ambient Glows */}
      <div className="detail-ambient" aria-hidden="true" />

      <div className="detail-wrap">
        {/* Breadcrumb Navigation */}
        <nav className="blog-breadcrumbs" aria-label="Breadcrumbs">
          <Link href="/">Home</Link>
          <span className="breadcrumb-sep">/</span>
          <Link href="/blog">Blog</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{post.category}</span>
        </nav>

        {/* Article Header */}
        <header className="detail-header">
          <div className="detail-meta-top">
            <span className="detail-cat-pill">{post.category}</span>
            <span className="meta-divider">•</span>
            <span className="detail-read-time">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              {post.readTime}
            </span>
            <span className="meta-divider">•</span>
            <span className="detail-read-time">{post.publishedAt}</span>
          </div>

          <h1 className="detail-title">{post.title}</h1>
          <p className="detail-excerpt">{post.excerpt}</p>

          {/* Author & Share Bar */}
          <div className="detail-author-share-bar">
            <div className="detail-author-box">
              <div className="detail-author-avatar">
                {post.author.initials}
              </div>
              <div>
                <div className="detail-author-name">{post.author.name}</div>
                <div className="detail-author-sub">{post.author.role}</div>
              </div>
            </div>

            <div className="detail-share-actions">
              <button
                type="button"
                className="share-btn"
                onClick={handleCopyLink}
                title="Copy Article Link"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                {copied ? 'Copied!' : 'Copy Link'}
              </button>

              <button
                type="button"
                className="share-btn"
                onClick={handleShareLinkedIn}
                title="Share on LinkedIn"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                LinkedIn
              </button>

              <button
                type="button"
                className="share-btn"
                onClick={handleShareTwitter}
                title="Share on X"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Post
              </button>
            </div>
          </div>
        </header>

        {/* Featured Cover Media */}
        <div className="detail-cover-wrapper">
          <img
            src={post.coverImage}
            alt={post.title}
            className="detail-cover-img"
          />
        </div>

        {/* 2-Column Content + Sticky Sidebar Layout */}
        <div className="detail-layout">
          {/* Main Article Body */}
          <article className="detail-main">
            <div
              className="detail-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="detail-tags-section">
                <span className="detail-tag-label">Tags:</span>
                {post.tags.map((t) => (
                  <span key={t} className="detail-tag">
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Author Bio Card */}
            <div className="author-bio-card">
              <div className="author-bio-avatar">
                {post.author.initials}
              </div>
              <div className="author-bio-info">
                <h4>Written by {post.author.name}</h4>
                <div className="author-bio-role">{post.author.role} at GrowthOre</div>
                <p className="author-bio-desc">
                  Leading strategic client campaigns across Google Ads, Meta, generative search, and revenue attribution across global markets.
                </p>
              </div>
            </div>
          </article>

          {/* Sticky Sidebar */}
          <aside className="detail-sidebar">
            {/* Quick Navigation Link */}
            <div className="sidebar-widget">
              <Link href="/blog" className="sidebar-back-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
                Back to All Articles
              </Link>
            </div>

            {/* Growth Audit CTA Widget */}
            <div className="sidebar-widget sidebar-cta-card">
              <div className="sidebar-cta-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4>Want Results Like This?</h4>
              <p>
                Get a tailored audit of your ad accounts, landing page funnels, and generative SEO visibility.
              </p>
              <button
                type="button"
                className="sidebar-cta-btn"
                onClick={() => handleOpenLead('Blog Sidebar Audit')}
              >
                Claim Free Growth Audit
              </button>
            </div>

            {/* Summary / Category Info */}
            <div className="sidebar-widget">
              <h4 className="sidebar-widget-title">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
                About GrowthOre
              </h4>
              <p style={{ fontSize: '13.5px', color: 'var(--silver, #C9D5F5)', margin: 0, lineHeight: 1.6 }}>
                GrowthOre is the performance marketing and AI SEO arm of Warrgyizmorsch UK Ltd, scaling high-growth businesses across UK, US, and India.
              </p>
            </div>
          </aside>
        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="related-section" aria-label="Related Articles">
            <div className="related-header">
              <h2 className="related-title">Related Insights</h2>
              <Link href="/blog" className="read-btn">
                View All
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="related-grid">
              {relatedPosts.map((item) => (
                <article key={item.id} className="blog-card">
                  <Link href={`/blog/${item.slug}`}>
                    <div className="blog-card-media" style={{ height: '180px' }}>
                      <img
                        src={item.coverImage}
                        alt={item.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                      <span className="blog-card-badge">{item.category}</span>
                    </div>
                  </Link>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{item.publishedAt}</span>
                      <span>•</span>
                      <span>{item.readTime}</span>
                    </div>

                    <Link href={`/blog/${item.slug}`}>
                      <h3 className="blog-card-title">{item.title}</h3>
                    </Link>

                    <p className="blog-card-excerpt">{item.excerpt}</p>

                    <div className="blog-card-footer">
                      <div className="blog-card-author">
                        <div className="blog-card-avatar" style={{ width: '26px', height: '26px', fontSize: '10px' }}>
                          {item.author.initials}
                        </div>
                        <span className="blog-card-author-name">{item.author.name}</span>
                      </div>

                      <Link
                        href={`/blog/${item.slug}`}
                        className="blog-card-arrow"
                        aria-label={`Read article: ${item.title}`}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
