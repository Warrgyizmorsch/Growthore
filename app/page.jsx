'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Marquee from '../components/Marquee';
import HomeReelsSection from '../components/HomeReelsSection';
import HomeTeamSection from '../components/HomeTeamSection';
import './home.css';

export default function HomePage() {
  const heroRef = useRef(null);
  const carRef = useRef(null);

  useEffect(() => {
    // 1. Hero Spotlight
    const hero = heroRef.current;
    const handleHeroMove = (e) => {
      if (!hero) return;
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    if (hero) {
      hero.addEventListener('pointermove', handleHeroMove);
    }

    // 2. Card Glow Follow
    const glowCards = document.querySelectorAll('[data-glow]');
    const handleGlowMove = (e) => {
      const el = e.currentTarget;
      const r = el.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    };
    glowCards.forEach((el) => el.addEventListener('pointermove', handleGlowMove));

    // 3. Statement scroll light up
    const dim = document.getElementById('dim');
    const st = document.getElementById('statement');
    let sws = [];
    if (dim && !dim.hasAttribute('data-processed')) {
      dim.setAttribute('data-processed', 'true');
      const text = dim.textContent || '';
      dim.innerHTML = text
        .split(' ')
        .map((w) => `<span class="sw" style="display:inline-block;transition:opacity 0.2s;">${w}</span>`)
        .join(' ');
      sws = Array.from(dim.querySelectorAll('.sw'));
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (st && sws.length > 0) {
            const r = st.getBoundingClientRect();
            const k = Math.min(1, Math.max(0, (window.innerHeight * 0.85 - r.top) / (r.height * 0.9)));
            sws.forEach((w, i) => {
              const t = Math.min(1, Math.max(0, k * sws.length - i));
              w.style.opacity = (0.22 + 0.78 * t).toFixed(2);
            });
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // 4. AI typing simulation - direct DOM update to prevent full-page re-renders on scroll
    let isRunning = false;
    const fullPrompt = 'Best energy-saving fan brands in India?';
    const playTyping = () => {
      if (isRunning) return;
      isRunning = true;
      let i = 0;
      const typedNode = document.getElementById('typed');
      const ansNode = document.getElementById('ans');
      if (typedNode) typedNode.textContent = '';
      if (ansNode) ansNode.style.opacity = '0.15';
      const iv = setInterval(() => {
        if (typedNode) {
          typedNode.textContent = fullPrompt.slice(0, ++i);
        } else {
          i++;
        }
        if (i >= fullPrompt.length) {
          clearInterval(iv);
          setTimeout(() => {
            if (ansNode) ansNode.style.opacity = '1';
          }, 350);
          setTimeout(() => {
            isRunning = false;
          }, 7000);
        }
      }, 45);
    };

    const chatEl = document.getElementById('chat');
    let observer;
    if (chatEl && typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) playTyping();
          });
        },
        { threshold: 0.5 }
      );
      observer.observe(chatEl);
    }

    // 5. FAQ accordion: keep only one open
    const faqItems = document.querySelectorAll('.growthore-faq-item');
    const handleToggle = (e) => {
      const target = e.currentTarget;
      if (target.open) {
        faqItems.forEach((other) => {
          if (other !== target) other.open = false;
        });
      }
    };
    faqItems.forEach((item) => item.addEventListener('toggle', handleToggle));

    return () => {
      if (hero) hero.removeEventListener('pointermove', handleHeroMove);
      glowCards.forEach((el) => el.removeEventListener('pointermove', handleGlowMove));
      window.removeEventListener('scroll', handleScroll);
      if (observer && chatEl) observer.unobserve(chatEl);
      faqItems.forEach((item) => item.removeEventListener('toggle', handleToggle));
    };
  }, []);

  const scrollCarousel = (direction) => {
    const car = carRef.current;
    if (!car) return;
    const card = car.querySelector('.tcard');
    const step = card ? card.offsetWidth + 20 : 340;
    if (direction === 'next') {
      if (car.scrollLeft + car.clientWidth >= car.scrollWidth - 4) {
        car.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        car.scrollBy({ left: step, behavior: 'smooth' });
      }
    } else {
      car.scrollBy({ left: -step, behavior: 'smooth' });
    }
  };

  const handleOpenVideo = (id, name) => {
    if (typeof window !== 'undefined' && window.openStoryVideo) {
      window.openStoryVideo(id, name);
    }
  };

  const handleOpenLead = (service = 'Not sure yet') => {
    if (typeof window !== 'undefined' && window.openGrowthModal) {
      window.openGrowthModal(service);
    }
  };

  return (
    <>
      <main id="top" className="page-home">
        {/* HERO SECTION */}
        <section className="hero" id="hero" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            <div className="gridlines" />
            <div className="beam" />
            <div className="spot" />
            <div className="orbit o1">
              <i />
            </div>
            <div className="orbit o2" />
          </div>
          <div className="wrap">
            <div className="hero-c">
              <h1 className="h1">
                <span className="line">
                  <span className="w" style={{ '--i': 0 }}>We</span>{' '}
                  <span className="w" style={{ '--i': 1 }}>don't</span>{' '}
                  <span className="w" style={{ '--i': 2 }}>build</span>{' '}
                  <span className="w" style={{ '--i': 3 }}>ads.</span>
                </span>
                <span className="line">
                  <span className="w" style={{ '--i': 4 }}>We</span>{' '}
                  <span className="w" style={{ '--i': 5 }}>build</span>
                </span>
                <span className="line growth-line">
                  <span className="w outline incoming-word" style={{ '--i': 6 }}>
                    {'growth'.split('').map((c, i) => (
                      <span className="char" key={i} style={{ '--c': i }}>{c}</span>
                    ))}
                  </span>{' '}
                  <span className="w outline incoming-word" style={{ '--i': 7 }}>
                    {'engines.'.split('').map((c, i) => (
                      <span className="char" key={i} style={{ '--c': i + 6 }}>{c}</span>
                    ))}
                  </span>
                </span>
              </h1>
              <p className="hero-sub">
                We combine performance marketing, social media marketing and AI-powered SEO to turn attention into leads,
                clicks into customers and marketing spend into measurable business growth
              </p>
              <div className="ctas">
                <button
                  type="button"
                  className="btn btn-white"
                  data-mag
                  onClick={() => handleOpenLead('Not sure yet')}
                >
                  Book a strategy call{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <a href="#work" className="btn btn-ghost" data-mag>
                  See our work
                </a>
                <a href="#work" className="play">
                  <span>
                    <svg viewBox="0 0 24 24">
                      <path d="M6 4l14 8-14 8z" />
                    </svg>
                  </span>
                  Watch the 60-sec intro
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE TAPE */}
        <div className="marquee" aria-hidden="true">
          <div className="track big-row">
            <span>PERFORMANCE MARKETING</span><span className="star">✦</span>
            <span className="outline">SOCIAL MEDIA</span><span className="star">✦</span>
            <span>AI SEO</span><span className="star">✦</span>
            <span className="outline">META ADS</span><span className="star">✦</span>
            <span>GOOGLE ADS</span><span className="star">✦</span>
            <span>PERFORMANCE MARKETING</span><span className="star">✦</span>
            <span className="outline">SOCIAL MEDIA</span><span className="star">✦</span>
            <span>AI SEO</span><span className="star">✦</span>
            <span className="outline">META ADS</span><span className="star">✦</span>
            <span>GOOGLE ADS</span><span className="star">✦</span>
          </div>
          <div className="tape">
            <div className="track rev">
              <span>BOOK A FREE AUDIT</span><i className="dot"></i>
              <span>REVENUE, NOT REACH</span><i className="dot"></i>
              <span>QUALIFIED LEADS</span><i className="dot"></i>
              <span>WEEKLY CREATIVE TESTS</span><i className="dot"></i>
              <span>ONE GROWTH NUMBER</span><i className="dot"></i>
              <span>BOOK A FREE AUDIT</span><i className="dot"></i>
              <span>REVENUE, NOT REACH</span><i className="dot"></i>
              <span>QUALIFIED LEADS</span><i className="dot"></i>
              <span>WEEKLY CREATIVE TESTS</span><i className="dot"></i>
              <span>ONE GROWTH NUMBER</span><i className="dot"></i>
            </div>
          </div>
        </div>

        {/* LOGO MARQUEE */}
        <Marquee />

        {/* SERVICES SECTION */}
        <section className="sec" id="services">
          <div className="wrap">
            <div className="head rv">
              <div className="head-text">
                <h2>Everything Your Brand Needs.</h2>
                <p>Pick one or run all three. Every channel reports into the same dashboard and the same revenue target.</p>
              </div>
              <Link href="/service" className="btn-line">
                All services{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="svc-list">
              <Link href="/service/performance-marketing" className="svc rv" data-label="Meta + Google campaigns" data-art="a1">
                <span className="n">01</span>
                <h3>Performance Marketing</h3>
                <div className="tags">
                  <span>Meta Ads</span>
                  <span>Google Ads</span>
                  <span>Shopping &amp; PMax</span>
                  <span>CAPI tracking</span>
                </div>
                <span className="arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>

              <Link href="/service/social-media-marketing" className="svc rv" data-label="Reels & creative" data-art="a2">
                <span className="n">02</span>
                <h3>Social Media Marketing</h3>
                <div className="tags">
                  <span>Reels &amp; content</span>
                  <span>Creative direction</span>
                  <span>Community</span>
                  <span>Paid social</span>
                </div>
                <span className="arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>

              <Link href="/service/ai-seo" className="svc rv" data-label="AI search visibility" data-art="a3">
                <span className="n">03</span>
                <h3>AI SEO</h3>
                <div className="tags">
                  <span>Technical SEO</span>
                  <span>AEO · GEO</span>
                  <span>Topical authority</span>
                  <span>Content that converts</span>
                </div>
                <span className="arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* WHY PARTNER SECTION */}
        <section className="sec alt">
          <div className="wrap">
            <div className="head rv">
              <div className="head-text">
                <h2>Not Just an Agency. Your Growth Partner.</h2>
                <p>
                  We don't believe in one-size-fits-all marketing. We combine smart strategies, creative thinking and data-driven
                  decisions to help brands overcome challenges, unlock opportunities and achieve meaningful growth.
                </p>
              </div>
            </div>
            <div className="cards3">
              <article className="wcard rv" data-glow>
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 20V10M18 20V4M6 20v-4" />
                    </svg>
                  </span>
                  <span className="num">01</span>
                </div>
                <h3>Growth Over Guesswork</h3>
                <p>
                  Every strategy starts with a purpose. We use insights, data and measurable goals to make marketing decisions
                  that move your business forward.
                </p>
              </article>

              <article className="wcard rv" data-glow>
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                  </span>
                  <span className="num">02</span>
                </div>
                <h3>The Right Audience. Real Impact.</h3>
                <p>
                  Reaching more people means little without reaching the right ones. We focus on connecting your brand with
                  audiences most likely to engage, trust and convert.
                </p>
              </article>

              <article className="wcard rv" data-glow>
                <div className="top">
                  <span className="ic">
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinejoin="round">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
                    </svg>
                  </span>
                  <span className="num">03</span>
                </div>
                <h3>Creativity Backed by Strategy</h3>
                <p>
                  Great marketing needs more than good-looking creatives. We combine compelling ideas with performance insights
                  to build campaigns that capture attention and inspire action.
                </p>
              </article>
            </div>
          </div>
        </section>

        {/* WORK SECTION */}
        <section className="sec" id="work">
          <div className="wrap">
            <div className="head rv">
              <div className="head-text">
                <h2>Real Brands. Real Results.</h2>
                <p>
                  Every brand has a different challenge. Here's how we have helped businesses across industries turn marketing
                  strategies into measurable growth.
                </p>
              </div>
              <a href="#work" className="btn-line">
                View all work{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>

            <div className="work">
              <div
                className="wk lg rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                <div className="art">
                  <img src="/images/oltao.webp" alt="Oltao" />
                </div>
                <div className="tags">
                  <span>D2C</span>
                  <span>Appliances</span>
                </div>
                <h3>Oltao</h3>
                <p>₹1L → ₹90L+ in six months with Meta and Google Ads for a premium fan and air-purifier brand.</p>
                <div className="metrics">
                  <span>18x ROAS</span>
                  <span>100+ orders / mo</span>
                  <span>15% conversion</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div
                className="wk md rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Social Media')}
              >
                <div className="art">
                  <img src="/images/ironstreet.webp" alt="Iron Street" />
                </div>
                <div className="tags">
                  <span>E-commerce</span>
                  <span>Furniture</span>
                </div>
                <h3>Iron Street</h3>
                <p>SEO, social and paid ads for a furniture brand.</p>
                <div className="metrics">
                  <span className="todo">[+00% revenue]</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div
                className="wk md rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                <div className="art">
                  <img src="/images/wtsvisa.webp" alt="WTS Visa" />
                </div>
                <div className="tags">
                  <span>Lead gen</span>
                  <span>Education</span>
                </div>
                <h3>WTS Visa</h3>
                <p>Student leads for study-abroad admissions.</p>
                <div className="metrics">
                  <span className="todo">[000 leads / mo]</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div
                className="wk sm rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Social Media')}
              >
                <div className="art">
                  <img src="/images/aloenaturals.webp" alt="Aloe Naturals" />
                </div>
                <div className="tags">
                  <span>D2C</span>
                  <span>Personal care</span>
                </div>
                <h3>Aloe Naturals</h3>
                <p>Paid social and creative.</p>
                <div className="metrics">
                  <span className="todo">[Add result]</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div
                className="wk sm rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                <div className="art">
                  <img src="/images/comforttravels.webp" alt="Comfort Transfers" />
                </div>
                <div className="tags">
                  <span>Services</span>
                  <span>Travel</span>
                </div>
                <h3>Comfort Transfers</h3>
                <p>Lead generation campaigns.</p>
                <div className="metrics">
                  <span className="todo">[Add result]</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>

              <div
                className="wk sm rv"
                data-glow
                style={{ cursor: 'pointer' }}
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                <div className="art">
                  <img src="/images/growthore/case-study-images/le-figaro-bg.webp" alt="Yellow Sapphire" />
                </div>
                <div className="tags">
                  <span>D2C</span>
                  <span>Jewellery</span>
                </div>
                <h3>Yellow Sapphire</h3>
                <p>Performance marketing.</p>
                <div className="metrics">
                  <span className="todo">[Add result]</span>
                </div>
                <span className="go">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* STATEMENT SECTION */}
        <section className="statement" id="statement">
          <div className="glow" aria-hidden="true" />
          <div className="wrap">
            <h2>
              <span className="dim" id="dim">
                We don't chase likes.
              </span>
              <br />
              <span className="lit">We chase revenue.</span>
            </h2>
            <p>Every idea ships with a number attached: ROAS, CPL or revenue. That is the whole job.</p>
          </div>
        </section>

        {/* PROCESS SECTION */}
        <section className="sec alt" id="process">
          <div className="wrap">
            <div className="head rv">
              <div className="head-text">
                <h2>From Understanding Your Brand To Making It Grow.</h2>
                <p>
                  Every brand has a different story, audience and ambition. We bring together strategy, creativity and technology
                  to build a digital presence that gets noticed, earns trust and drives meaningful results.
                </p>
              </div>
            </div>
            <div className="tl">
              <div className="rail" aria-hidden="true" />
              <div className="fill" aria-hidden="true" />
              <div className="step">
                <small>Week 1</small>
                <h3>Understand Your Brand</h3>
                <p>We explore your business, audience, competitors and goals to uncover what makes your brand unique and where opportunities exist.</p>
              </div>
              <div className="step">
                <small>Weeks 2–3</small>
                <h3>Build the Right Strategy</h3>
                <p>From search visibility to social engagement and paid campaigns, we create a tailored marketing strategy built around your business objectives.</p>
              </div>
              <div className="step">
                <small>Weeks 4–8</small>
                <h3>Bring Ideas to Life</h3>
                <p>We turn strategy into action through compelling content, creative campaigns and search experiences that connect your brand with the right people.</p>
              </div>
              <div className="step">
                <small>Week 9+</small>
                <h3>Evolve &amp; Grow</h3>
                <p>We analyse performance, refine strategies and adapt to changing trends to keep your brand visible, relevant and moving forward.</p>
              </div>
            </div>
          </div>
        </section>

        {/* AI SEO SECTION */}
        <section className="sec" id="ai">
          <div className="wrap ai">
            <div className="rv">
              <h2>Be the answer AI recommends.</h2>
              <p className="lead">
                Your buyers now ask ChatGPT, Gemini and Google AI Overviews what to buy. We optimise your entities, content and
                citations so AI search names your brand, and Google keeps ranking you.
              </p>
              <ul className="ticks">
                <li>Entity and brand optimisation across the web</li>
                <li>Content built to be quoted, not just ranked</li>
                <li>AI-mention tracking next to Google rankings</li>
              </ul>
              <Link href="/service/ai-seo" className="btn btn-white" data-mag>
                Explore AI SEO{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </div>

            <div className="chat rv" id="chat" aria-label="Example AI answer">
              <div className="q">
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
                <span>
                  <span id="typed">Best energy-saving fan brands in India?</span>
                  <span className="caret" />
                </span>
              </div>
              <div className="ail">
                <b>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinejoin="round">
                    <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
                  </svg>
                </b>
                AI Overview
              </div>
              <p className="ans" id="ans">
                Top picks include <strong>Your Brand</strong>, known for efficient BLDC fans, along with a few established names…
              </p>
              <div className="skel" style={{ width: '100%' }} />
              <div className="skel" style={{ width: '76%' }} />
              <div className="skel" style={{ width: '52%' }} />
              <div className="srcs">
                Sources <span className="me">yourbrand.com</span>
                <span>review site</span>
                <span>news article</span>
              </div>
            </div>
          </div>
        </section>

        {/* REELS SHOWCASE SECTION */}
        <HomeReelsSection />

        {/* TESTIMONIALS SECTION */}
        <section className="sec alt">
          <div className="wrap">
            <div className="head rv">
              <div className="head-text">
                <h2>Great Partnerships. Better Stories.</h2>
                <p>
                  The strongest relationships are built on trust, collaboration and shared ambition. Here's what our clients have
                  to say about working with us.
                </p>
              </div>
              <div className="ctrl">
                <button type="button" id="prev" aria-label="Previous testimonial" onClick={() => scrollCarousel('prev')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M19 12H5M11 6l-6 6 6 6" />
                  </svg>
                </button>
                <button type="button" id="next" className="fwd" aria-label="Next testimonial" onClick={() => scrollCarousel('next')}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="carousel" id="car" ref={carRef} tabIndex={0} aria-label="Testimonials">
              <article className="tcard">
                <div className="qm">“</div>
                <blockquote>
                  “We wanted more than just running ads. The team brought fresh ideas, valuable insights and a consistent focus on
                  improving our marketing performance as the business grew.”
                </blockquote>
                <div
                  className="who-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '18px',
                    width: '100%',
                  }}
                >
                  <div className="who">
                    <span className="av" />
                    <div>
                      <b>Oltao</b>
                      <span>Home Appliances Brand · Oltao</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="video-play-btn"
                    onClick={() => handleOpenVideo('gSJqPSQpJSk', 'Oltao')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>{' '}
                    <span>Watch Story</span>
                  </button>
                </div>
              </article>

              <article className="tcard">
                <div className="qm">“</div>
                <blockquote>
                  “The team understood our brand and focused on what mattered to our business. Their approach to social media, SEO
                  and paid campaigns brought clarity and direction to our marketing.”
                </blockquote>
                <div
                  className="who-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '18px',
                    width: '100%',
                  }}
                >
                  <div className="who">
                    <span className="av" />
                    <div>
                      <b>Iron Street</b>
                      <span>Furniture Brand · Iron Street</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="video-play-btn"
                    onClick={() => handleOpenVideo('7cJduSykrc4', 'Iron Street')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>{' '}
                    <span>Watch Story</span>
                  </button>
                </div>
              </article>

              <article className="tcard">
                <div className="qm">“</div>
                <blockquote>
                  “What stood out was the team's attention to our goals and willingness to refine the strategy. Their
                  communication and structured approach made the entire process easier to manage.”
                </blockquote>
                <div
                  className="who-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '18px',
                    width: '100%',
                  }}
                >
                  <div className="who">
                    <span className="av" />
                    <div>
                      <b>Comfort Transfers</b>
                      <span>Premium Transfers · UK</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="video-play-btn"
                    onClick={() => handleOpenVideo('judGRbDdyeA', 'Comfort Transfers')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>{' '}
                    <span>Watch Story</span>
                  </button>
                </div>
              </article>

              <article className="tcard">
                <div className="qm">“</div>
                <blockquote>
                  “Their team worked closely with us to refine our creative strategy and paid social campaigns. We saw immediate
                  clarity in our acquisition funnel and consistent growth month on month.”
                </blockquote>
                <div
                  className="who-row"
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '12px',
                    marginTop: '18px',
                    width: '100%',
                  }}
                >
                  <div className="who">
                    <span className="av" />
                    <div>
                      <b>Aloe Naturals</b>
                      <span>D2C Wellness Brand</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="video-play-btn"
                    onClick={() => handleOpenVideo('7wATe9LGXB4', 'Aloe Naturals')}
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>{' '}
                    <span>Watch Story</span>
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* TEAM SECTION */}
        <HomeTeamSection />

        {/* GROWTHORE FAQ SECTION */}
        <section className="growthore-faq" id="faq" aria-labelledby="growthore-faq-title">
          <div className="wrap faq-wrap">
            <div className="faq-heading rv">
              <span className="eyebrow">A few things worth knowing</span>
              <h2 id="growthore-faq-title">
                Frequently Asked <span>Questions</span>
              </h2>
            </div>

            <div className="growthore-faq-list">
              <details className="growthore-faq-item" open>
                <summary className="growthore-faq-question">
                  <span>How can Growthore help my business grow?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    Growthore helps your business attract the right audience, build a stronger online presence and turn interest
                    into opportunities. We combine performance marketing, social media marketing and AI SEO to create
                    strategies aligned with your business goals.
                  </p>
                </div>
              </details>

              <details className="growthore-faq-item">
                <summary className="growthore-faq-question">
                  <span>What makes Growthore different from other marketing agencies?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    At Growthore, we focus on understanding your business before creating a strategy. We bring together
                    creativity, technology and data-driven insights to deliver marketing that makes sense for your brand.
                  </p>
                </div>
              </details>

              <details className="growthore-faq-item">
                <summary className="growthore-faq-question">
                  <span>Can Growthore help my brand stand out from competitors?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    Yes. We focus on understanding what makes your business unique and communicating it through engaging
                    content, smart advertising and stronger search visibility to help your brand stand out.
                  </p>
                </div>
              </details>

              <details className="growthore-faq-item">
                <summary className="growthore-faq-question">
                  <span>Can Growthore help generate quality leads for my business?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    Yes. We develop targeted marketing strategies designed to reach people who are genuinely interested in your
                    products or services, helping you attract more relevant enquiries and potential customers.
                  </p>
                </div>
              </details>

              <details className="growthore-faq-item">
                <summary className="growthore-faq-question">
                  <span>Does Growthore work with businesses from different industries?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    Yes. Our strategies are designed around each business's industry, audience and objectives. We adapt our
                    marketing approach to suit different markets and business models.
                  </p>
                </div>
              </details>

              <details className="growthore-faq-item">
                <summary className="growthore-faq-question">
                  <span>How much does it cost to work with Growthore?</span>
                  <span className="growthore-faq-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </span>
                </summary>
                <div className="growthore-faq-answer">
                  <p>
                    Our pricing depends on your marketing goals, required services and scope of work. We recommend a suitable
                    approach based on your business needs and budget.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </section>

        {/* CTA BOTTOM SECTION */}
        <section className="cta" id="talk">
          <div className="halo" aria-hidden="true" />
          <div className="ring" aria-hidden="true" />
          <div className="wrap cta-in">
            <h2>
              Let's talk<br />
              <span className="outline">growth.</span>
            </h2>
            <p>
              Bring your numbers. We'll bring a plan: 30 focused minutes on where your growth is leaking and what to fix first.
            </p>
            <button
              type="button"
              className="btn btn-white"
              data-mag
              onClick={() => handleOpenLead('Not sure yet')}
            >
              Book a free strategy call{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <div className="contact">
              <span>info@warrgyizmorsch.com</span>
              <span>+91 92578 74994</span>
              <span>+44 7789 161193</span>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
