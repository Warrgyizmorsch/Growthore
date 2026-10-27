'use client';

import Link from 'next/link';
import './thank-you.css';

export default function ThankYouPage() {
  return (
    <main className="thankyou-wrapper">
      <div className="glow-orb-1" aria-hidden="true"></div>
      <div className="glow-orb-2" aria-hidden="true"></div>

      <div className="thankyou-content">
        {/* Success Icon */}
        <div className="icon-box">
          <div className="icon-glow-ring"></div>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" width="48" height="48" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
          </div>
        </div>

        {/* Status Pill */}
        <div>
          <div className="status-pill">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
            Request Received Successfully
          </div>
        </div>

        {/* Title */}
        <h1 className="thankyou-title">
          Thank <span>You</span>!
        </h1>

        {/* Subtitle */}
        <h2 className="thankyou-subtitle">
          Thank you for reaching out to GrowthOre.
        </h2>

        {/* Description */}
        <p className="thankyou-desc">
          Our team has received your details and will get in touch with you shortly to understand your requirements and discuss how we can help your business grow with performance marketing, social media and AI SEO.
        </p>

        <p className="thankyou-subdesc">
          In the meantime, explore more about GrowthOre and our growth solutions.
        </p>

        {/* Explore Button */}
        <div>
          <Link href="/" className="btn-explore">
            <span>Explore GrowthOre</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>

        {/* What Happens Next Section */}
        <section className="next-section">
          <div className="next-header">
            <h3>What Happens Next?</h3>
            <div className="next-divider"></div>
          </div>

          <div className="next-grid">
            {/* Step 1 */}
            <article className="step-card">
              <div className="step-icon-wrap">
                <div className="step-icon-box" style={{ background: 'linear-gradient(135deg, #3b82f6, #06b6d4)' }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                  </svg>
                </div>
              </div>
              <div className="step-num">Step 01</div>
              <h4>Deep Review</h4>
              <p>We carefully analyze your submission and website to understand your unique market position and growth potential.</p>
            </article>

            {/* Step 2 */}
            <article className="step-card">
              <div className="step-icon-wrap">
                <div className="step-icon-box" style={{ background: 'linear-gradient(135deg, #a855f7, #6366f1)' }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
              </div>
              <div className="step-num">Step 02</div>
              <h4>Strategy Call</h4>
              <p>A quick discovery meeting to align on your specific goals, address challenges, and map out a growth timeline.</p>
            </article>

            {/* Step 3 */}
            <article className="step-card">
              <div className="step-icon-wrap">
                <div className="step-icon-box" style={{ background: 'linear-gradient(135deg, #f97316, #ec4899)' }}>
                  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path>
                    <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path>
                    <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path>
                    <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path>
                  </svg>
                </div>
              </div>
              <div className="step-num">Step 03</div>
              <h4>Custom Action Plan</h4>
              <p>We deliver a tailored, data-driven roadmap designed specifically to scale your revenue and maximize ROI.</p>
            </article>
          </div>
        </section>
      </div>
    </main>
  );
}
