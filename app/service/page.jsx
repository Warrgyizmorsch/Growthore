'use client';

import React from 'react';
import Link from 'next/link';
import './services.css';

export default function ServicesPage() {
  const handleOpenModal = (serviceName) => {
    if (typeof window !== 'undefined' && window.openGrowthModal) {
      window.openGrowthModal(serviceName);
    }
  };

  return (
    <main className="services-page">
      <div className="wrap">
        {/* Hero Section */}
        <div className="svc-hero">
          <div className="badge-pill">
            <span className="dot" />
            Growthore Capabilities · 3 Core Disciplines
          </div>
          <h1>
            Engineered for <span className="grad-text">Revenue Growth</span>, Not Vanity Metrics.
          </h1>
          <p>
            Choose a dedicated growth channel or combine all three into an integrated acquisition engine with unified dashboard tracking and direct ROAS accountability.
          </p>
        </div>

        {/* Services List */}
        <div className="svc-grid">
          {/* Card 1: Performance Marketing */}
          <div className="card-item">
            <div>
              <span className="card-num">Service 01 · Paid Acquisition</span>
              <h2 className="card-title">Performance Marketing</h2>
              <p className="card-desc">
                High-converting Meta Ads, Google Search, Shopping &amp; Performance Max campaigns managed with rigorous creative testing and server-side tracking (CAPI) to unlock scalable ROAS.
              </p>
              <div className="card-tags">
                <span className="card-tag">Meta Ads (FB &amp; IG)</span>
                <span className="card-tag">Google Search &amp; PMax</span>
                <span className="card-tag">Conversion API (CAPI)</span>
                <span className="card-tag">Creative Testing Loops</span>
                <span className="card-tag">Cohort LTV Tracking</span>
              </div>
              <Link href="/service/performance-marketing" className="card-btn">
                Explore Performance Marketing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="card-metric-box">
              <span className="metric-headline">Key Impact &amp; Deliverables</span>
              <div className="metric-value">3.8x — 6.4x</div>
              <ul className="metric-list">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified ROAS benchmarks across consumer &amp; B2B brands
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  10+ creative angle variations launched every sprint
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Clean attribution with Shopify, WooCommerce &amp; CRM sync
                </li>
              </ul>
            </div>
          </div>

          {/* Card 2: Social Media Marketing */}
          <div className="card-item">
            <div>
              <span className="card-num">Service 02 · Attention &amp; Creative</span>
              <h2 className="card-title">Social Media Marketing</h2>
              <p className="card-desc">
                Creative-first social content that commands attention and converts followers into loyal buyers. Short-form vertical video (Reels &amp; Shorts), UGC strategy, and paid amplification.
              </p>
              <div className="card-tags">
                <span className="card-tag">Short-Form Reels &amp; TikTok</span>
                <span className="card-tag">UGC &amp; Creator Direction</span>
                <span className="card-tag">Organic Hook Testing</span>
                <span className="card-tag">Paid Social Amplification</span>
                <span className="card-tag">Founder &amp; Brand Authority</span>
              </div>
              <Link href="/service/social-media-marketing" className="card-btn">
                Explore Social Media Marketing
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="card-metric-box">
              <span className="metric-headline">Key Impact &amp; Deliverables</span>
              <div className="metric-value">12M+ Views</div>
              <ul className="metric-list">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Organic reach generated for retail &amp; D2C clients
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  3-second thumb-stop rates engineered into every frame
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Full production pipeline: scripts, filming, sound design
                </li>
              </ul>
            </div>
          </div>

          {/* Card 3: AI SEO */}
          <div className="card-item">
            <div>
              <span className="card-num">Service 03 · Search Intelligence</span>
              <h2 className="card-title">AI SEO (AEO &amp; GEO)</h2>
              <p className="card-desc">
                Your buyers now ask ChatGPT, Perplexity and Google AI Overviews what to buy. We structure your knowledge graph, entity citations, and technical content so AI search recommends your brand.
              </p>
              <div className="card-tags">
                <span className="card-tag">Generative Engine Optimisation (GEO)</span>
                <span className="card-tag">Answer Engine Optimisation (AEO)</span>
                <span className="card-tag">Entity &amp; Schema Architecture</span>
                <span className="card-tag">AI Answer Citations</span>
                <span className="card-tag">Topical Authority Content</span>
              </div>
              <Link href="/service/ai-seo" className="card-btn">
                Explore AI SEO
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>
            <div className="card-metric-box">
              <span className="metric-headline">Key Impact &amp; Deliverables</span>
              <div className="metric-value">#1 Cited</div>
              <ul className="metric-list">
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Positioned as the primary recommendation in AI answers
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  JSON-LD entity graph mapped across Wikidata &amp; industry hubs
                </li>
                <li>
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Resilient organic traffic immune to algorithmic shifts
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Workflow Section */}
        <div className="workflow-wrap">
          <div className="wf-header">
            <h2>How We Drive Growth</h2>
            <p>Our 4-step framework guarantees clarity, weekly velocity, and measurable revenue.</p>
          </div>
          <div className="wf-grid">
            <div className="wf-step">
              <div className="wf-step-num">01</div>
              <h3>Audit &amp; Baseline</h3>
              <p>Deep-dive into historical ad spend, tracking gaps, search visibility, and competitor positioning.</p>
            </div>
            <div className="wf-step">
              <div className="wf-step-num">02</div>
              <h3>Creative &amp; Schema Sprint</h3>
              <p>Deploy fresh ad creatives, landing page optimizations, and foundational schema markup.</p>
            </div>
            <div className="wf-step">
              <div className="wf-step-num">03</div>
              <h3>Scale Winning Angles</h3>
              <p>Ramp budget aggressively on validated ads and keywords while cutting non-performing spend.</p>
            </div>
            <div className="wf-step">
              <div className="wf-step-num">04</div>
              <h3>Unified Revenue Sync</h3>
              <p>Real-time dashboard reporting connecting every ad dollar to bank account deposits and blended ROAS.</p>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="cta-banner">
          <div className="cta-box">
            <h2>Ready to Scale Your Brand?</h2>
            <p>
              Get a custom growth strategy blueprint tailored to your industry, budget, and revenue goals.
            </p>
            <div className="cta-btns">
              <button
                type="button"
                className="btn btn-white"
                onClick={() => handleOpenModal('Full Service Growth Plan')}
              >
                Book Strategy Call{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <Link href="/contact-us" className="btn btn-line" style={{ background: 'rgba(255,255,255,0.06)' }}>
                View Contact Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
