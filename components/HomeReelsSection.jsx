'use client';

import React, { useRef, useState } from 'react';

const REELS_DATA = [
  {
    id: 'oltao',
    brand: 'Oltao',
    initial: 'O',
    category: 'Home Tech',
    hook: 'Is your fan eating your power bill?',
    tagline: 'Oltao Fan • Smart Home',
    metrics: '240k views • 18k shares',
    likes: '18.4k',
    comments: '342',
    videoId: 'oltao-reel',
  },
  {
    id: 'iron-street',
    brand: 'Iron Street',
    initial: 'I',
    category: 'Interior',
    hook: 'Empty room to dream study in 15 seconds',
    tagline: 'Iron Street Studio • Makeover',
    metrics: '510k views • 42k shares',
    likes: '44.1k',
    comments: '812',
    videoId: 'ironstreet-reel',
  },
  {
    id: 'rally',
    brand: 'Rally',
    initial: 'R',
    category: 'Appliances',
    hook: '3 mixer hacks your mom never told you',
    tagline: 'Rally Appliances • Life Hacks',
    metrics: '1.2M views • 95k saves',
    likes: '98.6k',
    comments: '1.4k',
    videoId: 'rally-reel',
  },
  {
    id: 'bharat-ceramic',
    brand: 'Bharat Ceramic',
    initial: 'B',
    category: 'Architecture',
    hook: "Textures architects can't stop specifying",
    tagline: 'Bharat Ceramic • Interior Luxe',
    metrics: '380k views • 29k saves',
    likes: '32.8k',
    comments: '520',
    videoId: 'bharat-reel',
    isActiveDefault: true,
  },
  {
    id: 'aloe-naturals',
    brand: 'Aloe Naturals',
    initial: 'A',
    category: 'Skincare',
    hook: 'My 60-second morning skin routine',
    tagline: 'Aloe Naturals • Organic Glow',
    metrics: '890k views • 67k saves',
    likes: '71.2k',
    comments: '994',
    videoId: 'aloe-reel',
  },
  {
    id: 'wts-visa',
    brand: 'WTS Visa',
    initial: 'W',
    category: 'Immigration',
    hook: 'Study in the UK: 3 mistakes to avoid',
    tagline: 'WTS Global • Student Visa',
    metrics: '450k views • 38k shares',
    likes: '39.0k',
    comments: '610',
    videoId: 'wts-reel',
  },
];

const FILTERS = ['Instagram Reels', 'YouTube Shorts', 'Facebook Reels', 'Paid social ads'];

export default function HomeReelsSection() {
  const sliderRef = useRef(null);
  const [activeId, setActiveId] = useState('bharat-ceramic');
  const [activeFilter, setActiveFilter] = useState('Instagram Reels');

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  const handleOpenReel = (reel) => {
    setActiveId(reel.id);
    if (typeof window !== 'undefined' && typeof window.openStoryVideo === 'function') {
      window.openStoryVideo(reel.videoId, reel.brand);
    }
  };

  return (
    <section className="home-reels-section" id="reels-showcase">
      <div className="home-reels-wrap">
        {/* Header */}
        <div className="home-reels-head">
          <div className="home-reels-head-left">
            <div className="home-reels-eyebrow">
              <span>—</span> REELS WE'VE MADE
            </div>
            <h2 className="home-reels-title">Content that stops the scroll.</h2>
          </div>

          <div className="home-reels-head-right">
            <p className="home-reels-desc">
              Short-form video engineered for algorithmic reach and direct-response conversions across Meta and YouTube.
            </p>
            <div className="home-reels-nav-btns">
              <button
                type="button"
                className="home-reels-btn"
                onClick={scrollLeft}
                aria-label="Previous reel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="home-reels-btn home-reels-btn-primary"
                onClick={scrollRight}
                aria-label="Next reel"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Slider */}
        <div className="home-reels-slider" ref={sliderRef}>
          {REELS_DATA.map((reel) => {
            const isSelected = activeId === reel.id;
            return (
              <div
                key={reel.id}
                className={`home-reel-card ${isSelected ? 'active' : ''}`}
                onClick={() => handleOpenReel(reel)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenReel(reel);
                  }
                }}
              >
                {/* Top bar */}
                <div className="home-reel-top">
                  <div className="home-reel-brand">
                    <div className="home-reel-avatar">{reel.initial}</div>
                    <span className="home-reel-brand-name">{reel.brand}</span>
                  </div>
                  <span className="home-reel-pill">{reel.category}</span>
                </div>

                {/* Center art / play */}
                <div className="home-reel-center">
                  <div className="home-reel-bg-art" />
                  <div className="home-reel-play-btn" aria-hidden="true">
                    <svg viewBox="0 0 24 24">
                      <polygon points="6 3 20 12 6 21 6 3" />
                    </svg>
                  </div>
                </div>

                {/* Right rail action counters */}
                <div className="home-reel-rail" aria-hidden="true">
                  <div className="home-reel-action">
                    <svg viewBox="0 0 24 24">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                    <span>{reel.likes}</span>
                  </div>
                  <div className="home-reel-action">
                    <svg viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <span>{reel.comments}</span>
                  </div>
                  <div className="home-reel-action">
                    <svg viewBox="0 0 24 24">
                      <circle cx="18" cy="5" r="3" />
                      <circle cx="6" cy="12" r="3" />
                      <circle cx="18" cy="19" r="3" />
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                    </svg>
                  </div>
                </div>

                {/* Bottom Hook & details */}
                <div className="home-reel-bottom">
                  <h3 className="home-reel-hook">{reel.hook}</h3>
                  <div className="home-reel-tagline">{reel.tagline}</div>
                  <div className="home-reel-metrics">{reel.metrics}</div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer controls & hints */}
        <div className="home-reels-footer">
          <div className="home-reels-filters">
            {FILTERS.map((filter) => (
              <button
                key={filter}
                type="button"
                className={`home-reels-filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="home-reels-drag-hint">
            Drag or tap a reel to play it
          </div>
        </div>
      </div>
    </section>
  );
}
