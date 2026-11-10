'use client';

import React, { useRef, useState } from 'react';

const REELS_DATA = [
  {
    id: 'oltao',
    brand: 'Oltao',
    handle: '@oltao.co',
    initial: 'O',
    logo: '/images/logos/oltao.png',
    logoBg: '#ffffff',
    category: 'Home Tech',
    hook: 'Is your fan eating your power bill?',
    tagline: 'Oltao Fan • Smart Home',
    metrics: '240k views • 18k shares',
    likes: '18.4k',
    comments: '342',
    thumbnail: '/images/growthore/hero-section/oltao-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/DR3-wQLjpMP/',
  },
  {
    id: 'iron-street',
    brand: 'Iron Street',
    handle: '@ironstreet',
    initial: 'I',
    logo: '/images/logos/iron_street.png',
    logoBg: '#ffffff',
    category: 'Interior',
    hook: 'Empty room to dream study in 15 seconds',
    tagline: 'Iron Street Studio • Makeover',
    metrics: '510k views • 42k shares',
    likes: '44.1k',
    comments: '812',
    thumbnail: '/images/growthore/hero-section/iron-street-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/DcOMAhQieju/?hl=en',
  },
  {
    id: 'mewar-hitech',
    brand: 'Mewar Hitech',
    handle: '@mewarhitech',
    initial: 'M',
    logo: '/images/logos/rally.png',
    logoBg: '#000000',
    category: 'Engineering',
    hook: '3 mixer hacks your mom never told you',
    tagline: 'Mewar Hitech • Life Hacks',
    metrics: '1.2M views • 95k saves',
    likes: '98.6k',
    comments: '1.4k',
    thumbnail: '/images/growthore/hero-section/rally-bg.webp',
    instagramUrl: 'https://www.instagram.com/p/De3jQALjIFs/?hl=en',
  },
  {
    id: 'bharat-ceramic',
    brand: 'Bharat Ceramic',
    handle: '@bharat_ceramic',
    initial: 'B',
    logo: '/images/logos/bharat-ceramic.webp',
    logoBg: '#ffffff',
    category: 'Architecture',
    hook: "Textures architects can't stop specifying",
    tagline: 'Bharat Ceramic • Interior Luxe',
    metrics: '380k views • 29k saves',
    likes: '32.8k',
    comments: '520',
    thumbnail: '/images/growthore/case-study-images/bharat-ceramic-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/Dejs2_8T4Oi/?hl=en',
    isActiveDefault: true,
  },
  {
    id: 'oltao-luxury',
    brand: 'Oltao Luxury',
    handle: '@oltao.co',
    initial: 'O',
    logo: '/images/logos/oltao.png',
    logoBg: '#ffffff',
    category: 'Smart Living',
    hook: 'My 60-second morning architectural tour',
    tagline: 'Oltao Luxury • Smart Airflow',
    metrics: '890k views • 67k saves',
    likes: '71.2k',
    comments: '994',
    thumbnail: '/images/growthore/hero-section/aloe-vera-bg.webp',
    instagramUrl: 'https://www.instagram.com/p/Dd_Mq87vUYY/',
  },
  {
    id: 'democracy-asia',
    brand: 'Democracy Asia',
    handle: '@democracyasiaofficial',
    initial: 'D',
    logo: '/images/logos/Democracy Asia.png',
    logoBg: '#ffffff',
    category: 'Media',
    hook: 'Visual storytelling engineered to stop the scroll',
    tagline: 'Democracy Asia • News & Media',
    metrics: '450k views • 38k shares',
    likes: '39.0k',
    comments: '610',
    thumbnail: '/images/growthore/hero-section/truepower-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/DcTPfhpmjfJ/?hl=en',
  },
  {
    id: 'yellow-sapphire',
    brand: 'Yellow Sapphire',
    handle: '@yellowsapphirevisa',
    initial: 'Y',
    logo: '/images/logos/assignment_logo.png',
    logoBg: '#ffffff',
    category: 'Global Study',
    hook: 'Study in the UK: 3 critical mistakes to avoid',
    tagline: 'Yellow Sapphire • Visa & Careers',
    metrics: '310k views • 24k shares',
    likes: '26.4k',
    comments: '418',
    thumbnail: '/images/growthore/case-study-images/wts-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/DRywEP9EzLS/?hl=en',
  },
  {
    id: 'wts-consultancy',
    brand: 'WTS Consultancy',
    handle: '@wts_consultancy',
    initial: 'W',
    logo: '/images/logos/slider-wts.webp',
    logoBg: '#ffffff',
    category: 'Immigration',
    hook: 'UK Student visa secrets you never knew existed',
    tagline: 'WTS Global • Overseas Education',
    metrics: '620k views • 51k shares',
    likes: '53.7k',
    comments: '730',
    thumbnail: '/images/growthore/hero-section/comfort-bg.webp',
    instagramUrl: 'https://www.instagram.com/reel/DcgN65SDw_i/',
  },
];

const FILTERS = ['Instagram Reels', 'YouTube Shorts', 'Facebook Reels', 'Paid social ads'];

const getEmbedUrl = (url) => {
  if (!url) return '';
  const match = url.match(/instagram\.com\/(?:reel|p)\/([^/?#&]+)/i);
  return match ? `https://www.instagram.com/reel/${match[1]}/embed/` : url;
};

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

  return (
    <section className="home-reels-section" id="reels-showcase">
      <div className="home-reels-wrap">
        {/* Header */}
        <div className="home-reels-head">
          <div className="home-reels-head-left">
            <h2 className="home-reels-title">
              Content That Stops<br />
              the Scroll.
            </h2>
            <p className="home-reels-desc">
              Short-form video engineered for algorithmic reach and direct-response conversions across Meta and YouTube.
            </p>
          </div>
        </div>

        {/* Reels Window with Side Navigation Arrows */}
        <div className="home-reels-window">
          <button
            type="button"
            className="home-reels-side-btn prev-btn"
            onClick={scrollLeft}
            aria-label="Previous reel"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <div className="home-reels-slider" ref={sliderRef}>
          {REELS_DATA.map((reel) => {
            const isSelected = activeId === reel.id;

            return (
              <div
                key={reel.id}
                className={`home-reel-card ${isSelected ? 'active' : ''}`}
                onClick={() => setActiveId(reel.id)}
                role="region"
                aria-label={`${reel.brand} Instagram reel`}
              >
                {/* Header Overlay with Creator/Brand Name */}
                <div className="home-reel-header-overlay">
                  <div className="home-reel-brand">
                    <div
                      className="home-reel-avatar"
                      style={{ background: reel.logoBg || '#ffffff' }}
                    >
                      {reel.logo ? (
                        <img
                          src={reel.logo}
                          alt={reel.brand}
                          className="home-reel-avatar-img"
                        />
                      ) : (
                        reel.initial
                      )}
                    </div>
                    <div className="home-reel-brand-info">
                      <span className="home-reel-brand-name">{reel.brand}</span>
                      <span className="home-reel-brand-handle">{reel.handle}</span>
                    </div>
                  </div>
                  <span className="home-reel-pill">{reel.category}</span>
                </div>

                {/* Embed Container with Clipped Iframe */}
                <div className="home-reel-embed-container">
                  <iframe
                    src={getEmbedUrl(reel.instagramUrl)}
                    className="home-reel-embed-frame"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    scrolling="no"
                    loading="lazy"
                    title={`${reel.brand} Instagram reel`}
                  />
                </div>

                {/* Bottom subtle edge overlay */}
                <div className="home-reel-bottom-overlay" />
              </div>
            );
          })}
        </div>

        <button
          type="button"
          className="home-reels-side-btn next-btn"
          onClick={scrollRight}
          aria-label="Next reel"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

       
      </div>
    </section>
  );
}
