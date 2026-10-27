'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import './blog.css';
import { BLOG_POSTS, getAllCategories } from '../../lib/blogData';

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // The featured (latest) blog
  const featuredBlog = useMemo(() => {
    return BLOG_POSTS.find((b) => b.featured) || BLOG_POSTS[0];
  }, []);

  const categories = useMemo(() => {
    return getAllCategories(BLOG_POSTS);
  }, []);

  // Filter remaining blogs (or all when searching/filtering)
  const filteredBlogs = useMemo(() => {
    return BLOG_POSTS.filter((post) => {
      // Category filter
      const matchesCategory =
        selectedCategory === 'All' || post.category === selectedCategory;

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.excerpt.toLowerCase().includes(q) ||
        post.category.toLowerCase().includes(q) ||
        (post.tags && post.tags.some((t) => t.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Normal blogs list: if no search/filter active, exclude the featured one from the lower grid to avoid duplication
  const regularBlogs = useMemo(() => {
    if (selectedCategory === 'All' && !searchQuery.trim()) {
      return filteredBlogs.filter((b) => b.id !== featuredBlog.id);
    }
    return filteredBlogs;
  }, [filteredBlogs, selectedCategory, searchQuery, featuredBlog]);

  const handleOpenLead = (service = 'Growth Audit') => {
    if (typeof window !== 'undefined' && window.openGrowthModal) {
      window.openGrowthModal(service);
    }
  };

  return (
    <main className="page-blog">
      {/* Ambient background glows */}
      <div className="blog-ambient" aria-hidden="true" />
      <div className="blog-ambient-secondary" aria-hidden="true" />

      <div className="blog-wrap">
        {/* Hero Header */}
        <header className="blog-hero">
          <div className="blog-eyebrow">
            <span>Growth Intelligence &amp; Playbooks</span>
          </div>
          <h1 className="blog-title">
            Engineered Insights for <span className="gradient-text">Measurable Revenue</span>
          </h1>
          <p className="blog-subtitle">
            Battle-tested frameworks on AI SEO, paid media scaling, creative hook engineering, and full-funnel conversion optimization.
          </p>
        </header>

        {/* Featured / Latest Blog Showcase (Big Hero Card) */}
        {selectedCategory === 'All' && !searchQuery.trim() && featuredBlog && (
          <section className="featured-section" aria-label="Featured Article">
            <Link href={`/blog/${featuredBlog.slug}`} className="featured-card">
              <div className="featured-media">
                <img
                  src={featuredBlog.coverImage}
                  alt={featuredBlog.title}
                  className="featured-img"
                  loading="eager"
                />
                <div className="featured-overlay" />
                <div className="featured-badge-float">
                  <span className="badge-pulse-dot" />
                  <span>Latest Release</span>
                </div>
              </div>

              <div className="featured-content">
                <div className="featured-meta">
                  <span className="cat-pill">{featuredBlog.category}</span>
                  <span className="meta-divider">•</span>
                  <span className="meta-time">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {featuredBlog.readTime}
                  </span>
                  <span className="meta-divider">•</span>
                  <span className="meta-time">{featuredBlog.publishedAt}</span>
                </div>

                <h2 className="featured-heading">{featuredBlog.title}</h2>
                <p className="featured-desc">{featuredBlog.excerpt}</p>

                <div className="featured-footer">
                  <div className="author-block">
                    <div className="author-avatar">
                      {featuredBlog.author.initials}
                    </div>
                    <div className="author-info">
                      <span className="author-name">{featuredBlog.author.name}</span>
                      <span className="author-role">{featuredBlog.author.role}</span>
                    </div>
                  </div>

                  <span className="read-btn">
                    Read Article
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Filter Controls (Category Pills + Search Input) */}
        <section className="blog-controls-section" aria-label="Filter articles">
          <div className="controls-bar">
            <div className="category-tabs" role="tablist">
              {categories.map((cat) => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={selectedCategory === cat}
                  className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="search-box">
              <svg
                className="search-icon"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search articles or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
                aria-label="Search articles"
              />
            </div>
          </div>
        </section>

        {/* Regular Blog Grid */}
        <section className="blog-grid-section" aria-label="Article list">
          {regularBlogs.length > 0 ? (
            <div className="blog-grid">
              {regularBlogs.map((post) => (
                <article key={post.id} className="blog-card">
                  <Link href={`/blog/${post.slug}`}>
                    <div className="blog-card-media">
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="blog-card-img"
                        loading="lazy"
                      />
                      <span className="blog-card-badge">{post.category}</span>
                    </div>
                  </Link>

                  <div className="blog-card-body">
                    <div className="blog-card-meta">
                      <span>{post.publishedAt}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <h3 className="blog-card-title">{post.title}</h3>
                    </Link>

                    <p className="blog-card-excerpt">{post.excerpt}</p>

                    <div className="blog-card-footer">
                      <div className="blog-card-author">
                        <div className="blog-card-avatar">
                          {post.author.initials}
                        </div>
                        <span className="blog-card-author-name">{post.author.name}</span>
                      </div>

                      <Link
                        href={`/blog/${post.slug}`}
                        className="blog-card-arrow"
                        aria-label={`Read article: ${post.title}`}
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
          ) : (
            <div className="no-results">
              <h3>No articles found</h3>
              <p>We couldn't find any articles matching "{searchQuery}". Try searching for another topic or clear filters.</p>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="read-btn"
                style={{ marginTop: '16px' }}
              >
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Bottom CTA Banner */}
        <section className="blog-cta-banner">
          <div className="blog-cta-text">
            <h3>Scale Your Acquisition Engine with GrowthOre</h3>
            <p>
              Get a confidential audit of your current ad spend, tracking architecture, and generative SEO visibility from our senior partners.
            </p>
          </div>
          <div className="blog-cta-actions">
            <button
              type="button"
              className="btn-cta-primary"
              onClick={() => handleOpenLead('Blog CTA Audit')}
            >
              Request Free Growth Audit
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
