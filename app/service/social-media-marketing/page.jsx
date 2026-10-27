'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Marquee from '@/components/Marquee';
import './social.css';

const REELS = [
  {
    client: 'Rally Appliances',
    handle: 'rallyappliances',
    ini: 'RA',
    art: 'fan',
    hook: 'Fans that <mark>don’t</mark> wake you up',
    caption: 'Silent at night. Tested on camera.',
    audio: 'Original audio',
  },
  {
    client: 'Bharat Ceramic',
    handle: 'bharat_ceramic',
    ini: 'BC',
    art: 'tile',
    hook: '3 tiles architects keep <mark>asking</mark> about',
    caption: 'New large-format range in store.',
    audio: 'Trending audio',
  },
  {
    client: 'Iron Street',
    handle: 'ironstreet',
    ini: 'IS',
    art: 'desk',
    hook: 'POV: your desk finally <mark>makes sense</mark>',
    caption: 'Built to outlast your degree.',
    audio: 'Original audio',
  },
  {
    client: 'Le-Figaro',
    handle: 'lefigaro',
    ini: 'LF',
    art: 'lights',
    hook: 'This Diwali, light it <mark>differently</mark>',
    caption: 'Smart festive lights, now live.',
    audio: 'Festive mix',
  },
  {
    client: 'WTS Visa',
    handle: 'wtsvisa',
    ini: 'WT',
    art: 'globe',
    hook: 'Your UK intake <mark>checklist</mark>',
    caption: 'Save this before you apply.',
    audio: 'Original audio',
  },
  {
    client: 'Oltao',
    handle: 'oltao',
    ini: 'OL',
    art: 'inv',
    hook: 'Your old fan is costing you <mark>this much</mark>',
    caption: 'Swap once, save every month.',
    audio: 'Original audio',
  },
  {
    client: 'Aloe Naturals',
    handle: 'aloenaturals',
    ini: 'AN',
    art: 'aloe',
    hook: 'My <mark>60-second</mark> skin routine',
    caption: 'Real routine, real skin.',
    audio: 'Trending audio',
  },
];

const POSTS = [
  {
    client: 'Rally Appliances',
    ini: 'RA',
    type: 'Reel',
    art: 'fan',
    hook: 'Fans that don’t wake you up',
    title: 'Quiet-fan product reel',
    brief: 'Show that the fan is silent at night, without a single spec sheet.',
    made: [
      'Night-time bedroom shoot',
      'Sound test edited for silent viewing',
      'Caption-first cut for Reels and Shorts',
    ],
  },
  {
    client: 'Bharat Ceramic',
    ini: 'BC',
    type: 'Reel',
    art: 'tile',
    hook: '3 tiles architects keep asking about',
    title: 'Showroom reels for architects',
    brief: 'Get architects and interior designers to book showroom visits.',
    made: [
      'Showroom walkthrough reels',
      'Texture close-ups in natural light',
      'Lead-form ads for project enquiries',
    ],
  },
  {
    client: 'Le-Figaro',
    ini: 'LF',
    type: 'Carousel',
    art: 'lights',
    hook: 'This Diwali, light it differently',
    title: 'Smart Diwali lights launch',
    brief: 'Launch smart festive lights to homeowners before the Diwali rush.',
    made: [
      'Balcony and home styling shoot',
      'Swipe-through product carousel',
      'Countdown stories to the festival',
    ],
  },
  {
    client: 'Iron Street',
    ini: 'IS',
    type: 'Reel',
    art: 'desk',
    hook: 'POV: your desk setup finally makes sense',
    title: 'Home-office furniture reels',
    brief: 'Make metal furniture feel aspirational for home-office buyers.',
    made: ['Room-styling shoot', 'POV-style reels', 'Catalogue-linked posts'],
  },
  {
    client: 'Oltao',
    ini: 'OL',
    type: 'Carousel',
    art: 'inv',
    hook: 'Your old fan is costing you this much',
    title: 'Energy-savings carousel',
    brief: 'Turn energy savings into a reason to upgrade.',
    made: ['Bill comparison carousel', 'Product demo reel', 'Best posts turned into Meta ads'],
  },
  {
    client: 'Democracy Asia',
    ini: 'DA',
    type: 'Reel',
    art: 'news',
    hook: 'The story in 60 seconds',
    title: 'Explainer reels for a news magazine',
    brief: 'Grow reach for an Asia-focused news magazine with short explainers.',
    made: [
      'Headline-led explainer reels',
      'Branded templates for fast turnaround',
      'Monthly review of what held attention',
    ],
  },
  {
    client: 'WTS Visa',
    ini: 'WT',
    type: 'Carousel',
    art: 'globe',
    hook: 'Your UK intake checklist',
    title: 'Study-abroad carousels',
    brief: 'Bring in students ready to apply, not just browse.',
    made: ['Step-by-step checklist carousels', 'Student story reels', 'Lead-form ads with qualifying questions'],
  },
  {
    client: 'Aloe Naturals',
    ini: 'AN',
    type: 'Creator video',
    art: 'aloe',
    hook: 'My 60-second skin routine',
    title: 'Creator-style skincare videos',
    brief: 'Build trust for a personal-care brand with real-feeling videos.',
    made: ['Creator brief and casting', 'Selfie-style routine videos', 'Usage rights for ads'],
  },
];

const IND = {
  fans: { art: 'fan', who: 'rallyappliances', cap: 'Fans that don’t wake you up.' },
  tiles: { art: 'tile', who: 'bharat_ceramic', cap: 'New large-format range in store.' },
  furn: { art: 'desk', who: 'ironstreet', cap: 'Built to outlast your degree.' },
  study: { art: 'globe', who: 'wtsvisa', cap: 'Your UK intake checklist, sorted.' },
  lights: { art: 'lights', who: 'lefigaro', cap: 'This Diwali, light it differently.' },
};

const HK = {
  q: {
    fans: 'Why does your [fan] sound like a helicopter?',
    tiles: 'Why do your [floors] look cheap in photos?',
    furn: 'Why does every [study table] wobble?',
    study: 'Is your [UK application] missing this?',
    lights: 'Why do your [Diwali lights] look dull on camera?',
  },
  bold: {
    fans: 'This fan cut our [power bill] in half.',
    tiles: 'Stop using small tiles in [big rooms].',
    furn: 'The last [study table] you’ll ever buy.',
    study: 'Most UK rejections are [avoidable].',
    lights: 'Fairy lights are [over].',
  },
  pov: {
    fans: 'POV: your bedroom is finally [quiet] at night.',
    tiles: 'POV: your client walks in and says [wow].',
    furn: 'POV: your desk setup finally [makes sense].',
    study: 'POV: you just got your [UK offer letter].',
    lights: 'POV: your balcony on [Diwali night].',
  },
  ba: {
    fans: 'Same room. One fan swap. [Watch.]',
    tiles: 'Same lobby. New tiles. [Watch.]',
    furn: 'Same corner. One metal desk. [Watch.]',
    study: 'Rejected in March. [Accepted in July.]',
    lights: 'Same house. New lights. [Watch.]',
  },
  mis: {
    fans: '3 mistakes people make buying a [ceiling fan]',
    tiles: '3 tile mistakes [architects avoid]',
    furn: '3 mistakes when buying a [study table]',
    study: '3 mistakes in UK [visa applications]',
    lights: '3 mistakes with [festive lighting]',
  },
};

const WHY = {
  q: 'A question opens a loop. The brain wants the answer, so people keep watching.',
  bold: 'A confident claim creates instant tension. Viewers stay to see if you can back it up.',
  pov: 'POV puts the viewer inside the moment, so it feels personal, not like an ad.',
  ba: 'A visible transformation is the most satisfying thing on a feed. People wait for the reveal.',
  mis: 'Fear of getting it wrong is a stronger pull than curiosity. Numbered lists promise a quick payoff.',
};

const CATS = [
  ['Reels', '#2F6BFF'],
  ['Carousels', '#22B8E8'],
  ['Stories', '#7C6CF0'],
  ['Static & graphics', '#9DBBFF'],
  ['Creator & UGC', '#3B5BA8'],
];

const MIX = {
  aw: [45, 20, 20, 10, 5],
  leads: [30, 30, 20, 10, 10],
  sales: [35, 15, 20, 10, 20],
  comm: [30, 20, 35, 5, 10],
};

const CAD = {
  aw: '4–5 posts a week plus daily stories, with one hero reel each week built to be shared.',
  leads: '3–4 posts a week plus stories with lead links, and our best posts boosted as lead-form ads.',
  sales: '4 posts a week plus product stories, creator videos and catalogue-linked posts.',
  comm: '3 posts a week plus daily stories with polls and questions, and replies within the day.',
};

const IDEAS = {
  aw: ['Behind-the-scenes reel', 'Founder story', 'Trend remix', '"Did you know" carousel'],
  leads: ['Problem → fix carousel', 'Free guide offer', 'Client story reel', 'Q&A story'],
  sales: ['Product demo reel', 'Unboxing by a creator', 'Customer review', 'Offer countdown story'],
  comm: ['Weekly poll', 'Customer spotlight', 'Ask-me-anything story', 'Meme in your niche'],
};

const FMT_COLORS = {
  Reel: '#2F6BFF',
  Carousel: '#0E93C4',
  Story: '#6D5BD0',
  Static: '#3B5BA8',
  Short: '#E5484D',
  Post: '#1E3A8A',
};

const CALENDAR_POSTS = [
  [2, 'Instagram', 'Reel', 'Summer fan launch teaser', 'fan', 'Approved'],
  [3, 'Facebook', 'Post', 'Festive offer announcement', 'lights', 'Scheduled'],
  [4, 'Instagram', 'Carousel', '5 ways to cool a room without AC', 'inv', 'Approved'],
  [6, 'Instagram', 'Story', 'Poll: which colour?', 'tile', 'Scheduled'],
  [8, 'LinkedIn', 'Post', 'Factory visit: how we test every motor', 'desk', 'In review'],
  [9, 'Instagram', 'Reel', 'Customer unboxing', 'aloe', 'Approved'],
  [11, 'YouTube', 'Short', 'Noise test: 3 fans compared', 'fan', 'In review'],
  [12, 'Instagram', 'Static', 'Product spotlight: BLDC range', 'fan', 'Approved'],
  [14, 'Facebook', 'Carousel', 'Room makeover before/after', 'desk', 'Scheduled'],
  [16, 'Instagram', 'Reel', 'Behind the scenes at the shoot', 'lights', 'In review'],
  [17, 'LinkedIn', 'Carousel', 'Energy savings explained', 'inv', 'Approved'],
  [19, 'Instagram', 'Story', 'Quiz: guess the wattage', 'fan', 'Scheduled'],
  [20, 'YouTube', 'Short', 'Install in 60 seconds', 'desk', 'Approved'],
  [22, 'Instagram', 'Carousel', 'Buyer’s guide: sweep size', 'tile', 'In review'],
  [23, 'Facebook', 'Post', 'Dealer locator', 'globe', 'Scheduled'],
  [25, 'Instagram', 'Reel', 'Creator review', 'aloe', 'Approved'],
  [26, 'LinkedIn', 'Post', 'Monthly results recap', 'news', 'In review'],
  [27, 'Instagram', 'Static', 'Testimonial card', 'lights', 'Scheduled'],
];

export default function SocialMediaPage() {
  // Hero coverflow index
  const [currentReel, setCurrentReel] = useState(0);

  // Floating notifications
  const [notifIndex, setNotifIndex] = useState(0);

  // Lightbox
  const [activeLightbox, setActiveLightbox] = useState(null);

  // Carousel slide in formats
  const [carSlide, setCarSlide] = useState(0);

  // Poll state
  const [pollVoted, setPollVoted] = useState(false);
  const [pollChoice, setPollChoice] = useState(null);

  // Captions animation word index
  const [captionWordIdx, setCaptionWordIdx] = useState(0);
  const captionWords = 'Three things I wish I knew before buying a ceiling fan'.split(' ');

  // LinkedIn post expansion
  const [isLiOpen, setIsLiOpen] = useState(false);

  // Hook Lab state
  const [selectedInd, setSelectedInd] = useState('fans');
  const [selectedSty, setSelectedSty] = useState('q');

  // Mix builder state
  const [mixGoal, setMixGoal] = useState('aw');
  const [mixAud, setMixAud] = useState('b2c');
  const [mixPl, setMixPl] = useState('Instagram');

  // Calendar
  const [calFilter, setCalFilter] = useState('all');
  const [selectedCalPost, setSelectedCalPost] = useState(0);

  const handleOpenLead = (service = 'Social Media') => {
    if (typeof window !== 'undefined' && window.openLeadModal) {
      window.openLeadModal(service);
    }
  };

  // Coverflow autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReel((prev) => (prev + 1) % REELS.length);
    }, 4800);
    return () => clearInterval(timer);
  }, []);

  // Notifications rotation
  useEffect(() => {
    const timer = setInterval(() => {
      setNotifIndex((prev) => (prev + 1) % 6);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  // Captions interval
  useEffect(() => {
    const timer = setInterval(() => {
      setCaptionWordIdx((prev) => (prev + 1) % (captionWords.length + 3));
    }, 320);
    return () => clearInterval(timer);
  }, [captionWords.length]);

  // Dynamic mix calculation
  const getMixPercentages = () => {
    let m = MIX[mixGoal].slice();
    if (mixAud === 'b2b') {
      m[1] += 10;
      m[0] -= 5;
      m[4] -= 5;
    }
    if (mixPl === 'LinkedIn') {
      m[1] += 10;
      m[3] += 5;
      m[0] -= 10;
      m[2] -= 5;
    }
    if (mixPl === 'YouTube Shorts') {
      m[0] += 20;
      m[1] -= 10;
      m[3] -= 5;
      m[2] -= 5;
    }
    m = m.map((v) => Math.max(0, v));
    const s = m.reduce((x, y) => x + y, 0);
    return m.map((v) => Math.round((v / s) * 100));
  };

  const mixValues = getMixPercentages();

  // Hook render calculation
  const rawHook = HK[selectedSty][selectedInd];
  const hookParts = rawHook.split(/(\[[^\]]+\])/).filter(Boolean);

  const renderPostArt = (artType) => {
    switch (artType) {
      case 'fan':
        return (
          <div className="pa fan">
            <div className="fanx"><div className="bl" /></div>
          </div>
        );
      case 'tile':
        return <div className="pa tile" />;
      case 'desk':
        return (
          <div className="pa desk">
            <svg viewBox="0 0 200 140" fill="none" stroke="#BFD2FF" strokeWidth="4" strokeLinecap="round">
              <path d="M20 60H180M30 60V130M170 60V130M40 60V45H160V60M70 130V95Q70 85 80 85H120Q130 85 130 95V130M70 105H130" />
            </svg>
          </div>
        );
      case 'lights':
        return <div className="pa lights" />;
      case 'globe':
        return (
          <div className="pa globe">
            <svg viewBox="0 0 24 24" fill="#fff">
              <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" />
            </svg>
          </div>
        );
      case 'inv':
        return (
          <div className="pa inv">
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
              <path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2" />
            </svg>
          </div>
        );
      case 'news':
        return (
          <div className="pa news">
            <i style={{ top: '14%', width: '62%' }} />
            <i style={{ top: '26%', width: '78%', opacity: 0.7 }} />
            <i style={{ top: '38%', width: '70%', opacity: 0.5, height: '5%' }} />
            <i style={{ top: '46%', width: '74%', opacity: 0.5, height: '5%' }} />
          </div>
        );
      case 'aloe':
        return (
          <div className="pa aloe">
            <svg viewBox="0 0 100 80" fill="#C9F2B8">
              <path d="M50 80C40 50 20 40 10 10c25 10 35 30 40 70z" />
              <path d="M50 80C60 50 80 40 90 10 65 20 55 40 50 80z" />
              <path d="M50 80C48 50 46 30 50 0c4 30 2 50 0 80z" />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  const calPost = CALENDAR_POSTS[selectedCalPost];

  return (
    <>
      <main id="top" className="page-social">
        {/* HERO */}
        <section className="sh sx" id="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="gridlines" />
            <span className="sblob a" />
            <span className="sblob b" />
            <div className="spot" />
          </div>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#services">Services</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>Social Media Marketing</span>
            </nav>
            <div className="headwrap">
              <span className="soc ig" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r=".6" fill="#fff" />
                </svg>
              </span>
              <span className="soc yt" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M9 7.5l8 4.5-8 4.5z" fill="#fff" /></svg>
              </span>
              <span className="soc ln" aria-hidden="true">
                <svg viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
              </span>
              <span className="soc fb" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" /></svg>
              </span>

              {/* Floating Notifications */}
              <div className="notif n1" aria-hidden="true">
                <i>
                  <svg viewBox="0 0 24 24" fill="#fff">
                    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                  </svg>
                </i>
                <div>
                  <span className="nt">ironstreet</span>
                  <small className="ns">liked your reel</small>
                </div>
              </div>
              <div className="notif n2" aria-hidden="true">
                <i>
                  <svg viewBox="0 0 24 24" fill="#fff">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </i>
                <div>
                  <span className="nt">New comment</span>
                  <small className="ns">&quot;Where can I buy this?&quot;</small>
                </div>
              </div>

              <span className="sk">
                <span className="live" />Social Media Marketing Agency · India &amp; UK
              </span>
              <h1 className="sh1">
                <span className="line"><span className="w" style={{ '--i': 0 }}>Content people</span></span>
                <span className="line">
                  <span className="stk">stop</span>{' '}
                  <span className="w warm-t" style={{ '--i': 2 }}>scrolling for</span>
                </span>
              </h1>
              <p className="shsub">
                We&apos;re a <strong>social media marketing agency</strong> that plans, shoots, edits and posts reels, carousels and stories your buyers actually watch, and then turns the best ones into sales.
              </p>
              <div className="shctas">
                <button
                  type="button"
                  className="btn btn-white"
                  onClick={() => handleOpenLead('Social Media')}
                >
                  Get a free content audit{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
                <a href="#work" className="btn btn-ghost">See our work</a>
              </div>
            </div>

            {/* COVERFLOW 3D REELS */}
            <div className="cf-wrap">
              <div className="cf" id="cf" aria-roledescription="carousel" aria-label="Reels we made">
                {REELS.map((r, k) => {
                  let d = k - currentReel;
                  const n = REELS.length;
                  if (d > n / 2) d -= n;
                  if (d < -n / 2) d += n;
                  const a = Math.abs(d);
                  const isNarrow = typeof window !== 'undefined' && window.innerWidth < 640;
                  const x = d * 260 * (isNarrow ? 0.62 : 0.72);
                  const z = -a * (isNarrow ? 140 : 170);
                  const ry = -d * (isNarrow ? 22 : 26);
                  const sc = a === 0 ? 1 : 0.9;
                  const isVisible = a <= (isNarrow ? 1 : 2);

                  return (
                    <div
                      key={k}
                      className={`rl ${k === currentReel ? 'on' : ''}`}
                      data-k={k}
                      style={{
                        transform: `translateX(${x}px) translateZ(${z}px) rotateY(${ry}deg) scale(${sc})`,
                        zIndex: 10 - a,
                        opacity: isVisible ? 1 : 0,
                        filter: a === 0 ? 'none' : `brightness(${1 - a * 0.28}) saturate(${1 - a * 0.15})`,
                        pointerEvents: isVisible ? 'auto' : 'none',
                      }}
                      onClick={() => setCurrentReel(k)}
                    >
                      <div className="scr">
                        {renderPostArt(r.art)}
                        <div className="shade" />
                        <span className="ph-n" />
                        <div className="rbar"><i /></div>
                        <div className="rtop">
                          <i>{r.ini}</i>
                          {r.handle}
                          <span className="fw">Follow</span>
                        </div>
                        <span className="slot">
                          <svg viewBox="0 0 24 24">
                            <rect x="3" y="3" width="18" height="18" rx="4" />
                            <path d="M10 9l5 3-5 3z" />
                          </svg>
                          Your reel here
                        </span>
                        <p className="rhook" dangerouslySetInnerHTML={{ __html: r.hook }} />
                        <div className="rrail">
                          <svg className="lk" viewBox="0 0 24 24">
                            <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                          </svg>
                          <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                          <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                          <svg viewBox="0 0 24 24"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" /></svg>
                        </div>
                        <div className="rcap">
                          <b>{r.handle}</b>
                          {r.caption}
                          <small>♪ {r.audio}</small>
                        </div>
                        <span className="disc" />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="cf-ui">
                <button
                  type="button"
                  className="ar"
                  aria-label="Previous reel"
                  onClick={() => setCurrentReel((p) => (p - 1 + REELS.length) % REELS.length)}
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <div style={{ display: 'grid', gap: '8px', justifyItems: 'center' }}>
                  <p className="cf-now" aria-live="polite">
                    <b>{REELS[currentReel].client}</b> · {REELS[currentReel].caption}
                  </p>
                  <div className="cf-dots">
                    {REELS.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className={idx === currentReel ? 'on' : ''}
                        onClick={() => setCurrentReel(idx)}
                        aria-label={`Show reel ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  className="ar"
                  aria-label="Next reel"
                  onClick={() => setCurrentReel((p) => (p + 1) % REELS.length)}
                >
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
              <p className="cf-hint">
                <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                Swipe through our reels · tap to select
              </p>
            </div>
          </div>
        </section>

        {/* CONTINUOUS BRAND LOGO MARQUEE */}
        <Marquee />

        {/* MARQUEE TAPE */}
        <div className="marquee" aria-hidden="true" style={{ paddingBlock: '0 15px' }}>
          <div className="tape">
            <div className="track rev">
              <span>REELS</span><i className="dot" /><span>CAROUSELS</span><i className="dot" /><span>STORIES</span><i className="dot" /><span>CREATOR VIDEOS</span><i className="dot" /><span>PRODUCT SHOOTS</span><i className="dot" /><span>COMMUNITY</span><i className="dot" /><span>PAID SOCIAL</span><i className="dot" />
              <span>REELS</span><i className="dot" /><span>CAROUSELS</span><i className="dot" /><span>STORIES</span><i className="dot" /><span>CREATOR VIDEOS</span><i className="dot" /><span>PRODUCT SHOOTS</span><i className="dot" /><span>COMMUNITY</span><i className="dot" /><span>PAID SOCIAL</span><i className="dot" />
            </div>
          </div>
        </div>

        {/* WORK / PROFILE FEED */}
        <section className="sec" id="work">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Our feed</span>
                <h2>Brands we create content for.</h2>
              </div>
              <div className="r">
                <p>Appliances, tiles, furniture, electricals, education and news. Tap any post to see the brief and what we made.</p>
              </div>
            </div>

            <div className="prof rv">
              <div className="ptop">
                <div className="pav">
                  <span>W</span>
                </div>
                <div className="pinfo">
                  <h3>wmdigital.studio <small>Content &amp; social studio</small></h3>
                  <p>Scroll-stopping content for brands that want sales, not just likes. Udaipur, India · London, UK.</p>
                  <div className="pbtns">
                    <button
                      type="button"
                      className="btn btn-white"
                      onClick={() => handleOpenLead('Social Media')}
                    >
                      Work with us
                    </button>
                    <a href="#formats" className="btn btn-ghost">What we make</a>
                  </div>
                </div>
              </div>

              <div className="hls" aria-hidden="true">
                <span className="hl">
                  <i><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="4" /><path d="M10 9l5 3-5 3z" /></svg></i>
                  Reels
                </span>
                <span className="hl">
                  <i><svg viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" /><circle cx="12" cy="13" r="4" /></svg></i>
                  Shoots
                </span>
                <span className="hl">
                  <i><svg viewBox="0 0 24 24"><rect x="2" y="6" width="14" height="12" rx="2" /><path d="M16 10l6-3v10l-6-3" /></svg></i>
                  BTS
                </span>
                <span className="hl">
                  <i><svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" /></svg></i>
                  Clients
                </span>
                <span className="hl">
                  <i><svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg></i>
                  Results
                </span>
              </div>

              <div className="ptabs" aria-hidden="true">
                <span className="on">Posts</span>
                <span>Reels</span>
                <span>Tagged</span>
              </div>

              <div className="pgrid" id="pgrid">
                {POSTS.map((p, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className="pt"
                    data-p={idx}
                    aria-label={`${p.client}: ${p.title}`}
                    onClick={() => setActiveLightbox(idx)}
                  >
                    {renderPostArt(p.art)}
                    <span className="typ">
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="4" />
                        <path d="M10 9l5 3-5 3z" />
                      </svg>
                    </span>
                    <span className="ov">
                      <b>{p.client}</b>
                      <small>{p.title}</small>
                    </span>
                  </button>
                ))}
                <button
                  type="button"
                  className="pt next"
                  onClick={() => handleOpenLead('Social Media')}
                >
                  <span>
                    <i>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </i>
                    <b>Your brand next?</b>
                    <span>Get a free content audit</span>
                  </span>
                </button>
              </div>
              <p className="pnote">Illustrative tiles. Custom shoot and content plan created for your brand.</p>
            </div>
          </div>
        </section>

        {/* LIGHTBOX MODAL */}
        <div className={`lb ${activeLightbox !== null ? 'open' : ''}`} id="lb" aria-hidden={activeLightbox === null}>
          <div className="lb-bg" onClick={() => setActiveLightbox(null)} />
          {activeLightbox !== null && (
            <div className="lb-box" role="dialog" aria-modal="true" aria-labelledby="lbT">
              <button
                className="lb-x"
                type="button"
                onClick={() => setActiveLightbox(null)}
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
              <div className="lb-media">
                {renderPostArt(POSTS[activeLightbox].art)}
              </div>
              <div className="lb-info">
                <span className="tag-demo" style={{ alignSelf: 'flex-start' }}>Illustrative preview</span>
                <small id="lbK">{POSTS[activeLightbox].client} · {POSTS[activeLightbox].type}</small>
                <h3 id="lbT">{POSTS[activeLightbox].title}</h3>
                <p id="lbP">{POSTS[activeLightbox].brief}</p>
                <ul id="lbL">
                  {POSTS[activeLightbox].made.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
                <div className="lb-nav">
                  <button
                    type="button"
                    aria-label="Previous post"
                    onClick={() => setActiveLightbox((p) => (p - 1 + POSTS.length) % POSTS.length)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M15 6l-6 6 6 6" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    aria-label="Next post"
                    onClick={() => setActiveLightbox((p) => (p + 1) % POSTS.length)}
                  >
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M9 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* FORMATS BENTO */}
        <section className="sec alt" id="formats">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">What we make</span>
                <h2>Every format your feed needs. Try them.</h2>
              </div>
              <div className="r">
                <p>Swipe the carousel, vote in the story, expand the post. Each format has its own job in your funnel.</p>
              </div>
            </div>

            <div className="fmt">
              {/* Carousel */}
              <article className="fc w2 rv">
                <small>Carousels</small>
                <h3>Swipe-worthy carousels</h3>
                <div className="stage2">
                  <div className="car" id="car" aria-roledescription="carousel">
                    <div className="car-tr" style={{ transform: `translateX(${-carSlide * 100}%)` }}>
                      <div className="cs" style={{ background: 'linear-gradient(150deg,#2F6BFF,#0E2466)' }}>
                        <span>Slide 1 · Hook</span>
                        <b>3 tile mistakes that make a room look cheap</b>
                        <em>Swipe →</em>
                      </div>
                      <div className="cs" style={{ background: 'linear-gradient(150deg,#5E8DFF,#102A6E)' }}>
                        <span>Slide 2 · Problem</span>
                        <b>Small tiles in a big room shrink it.</b>
                        <em>Go large-format instead.</em>
                      </div>
                      <div className="cs" style={{ background: 'linear-gradient(150deg,#7CC4FF,#13306E)' }}>
                        <span>Slide 3 · Proof</span>
                        <b>Same room. 120×60 tiles. Feels twice the size.</b>
                        <em>Before → after</em>
                      </div>
                      <div className="cs" style={{ background: 'linear-gradient(150deg,#1A3FB0,#0A1640)' }}>
                        <span>Slide 4 · Action</span>
                        <b>Book a showroom visit</b>
                        <em>Link in bio</em>
                      </div>
                    </div>
                    <button
                      className="carr l"
                      type="button"
                      aria-label="Previous slide"
                      onClick={() => setCarSlide((p) => (p - 1 + 4) % 4)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M15 6l-6 6 6 6" />
                      </svg>
                    </button>
                    <button
                      className="carr r"
                      type="button"
                      aria-label="Next slide"
                      onClick={() => setCarSlide((p) => (p + 1) % 4)}
                    >
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M9 6l6 6-6 6" />
                      </svg>
                    </button>
                    <div className="cdots">
                      {[0, 1, 2, 3].map((dot) => (
                        <i
                          key={dot}
                          className={dot === carSlide ? 'on' : ''}
                          onClick={() => setCarSlide(dot)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <p>Teach, compare and persuade. Carousels get saved and shared.</p>
              </article>

              {/* Stories */}
              <article className="fc w2 rv">
                <small>Stories</small>
                <h3>Stories people tap</h3>
                <div className="stage2">
                  <div className="story">
                    <div className="sbars"><i /><i /><i /></div>
                    <div className="who"><i>BC</i>Bharat Ceramic</div>
                    <div className={`poll ${pollVoted ? 'done' : ''}`} id="poll">
                      <p>Which finish for the lobby?</p>
                      <button
                        type="button"
                        className={`pb ${pollChoice === 1 ? 'mine' : ''}`}
                        onClick={() => {
                          setPollVoted(true);
                          setPollChoice(1);
                        }}
                      >
                        <i style={{ width: pollVoted ? '62%' : '0' }} />
                        <span>Glossy marble</span>
                        <em>62%</em>
                      </button>
                      <button
                        type="button"
                        className={`pb ${pollChoice === 2 ? 'mine' : ''}`}
                        onClick={() => {
                          setPollVoted(true);
                          setPollChoice(2);
                        }}
                      >
                        <i style={{ width: pollVoted ? '38%' : '0' }} />
                        <span>Matte stone</span>
                        <em>38%</em>
                      </button>
                    </div>
                  </div>
                </div>
                <p>Polls, quizzes and links that turn followers into conversations. <span style={{ color: '#FFC86B' }}>Tap a vote.</span></p>
              </article>

              {/* Captions */}
              <article className="fc w2 rv">
                <small>Captions</small>
                <h3>Reels that hold attention</h3>
                <div className="stage2">
                  <div className="capv">
                    <span className="rec"><i />REC</span>
                    <div className="face" />
                    <p className="caps" id="caps">
                      {captionWords.map((word, wIdx) => (
                        <span
                          key={wIdx}
                          className={wIdx === captionWordIdx ? 'on' : wIdx < captionWordIdx ? 'past' : ''}
                        >
                          {word}{' '}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>
                <p>Word-by-word captions, tight cuts and a hook in the first second.</p>
              </article>

              {/* Static & graphics */}
              <article className="fc w3 rv">
                <small>Static &amp; graphics</small>
                <h3>A grid that looks like a brand</h3>
                <div className="stage2">
                  <div className="sgrid" aria-hidden="true">
                    <div className="pa fan"><div className="fanx"><div className="bl" /></div></div>
                    <div className="pa tile" />
                    <div className="pa lights" />
                    <div className="pa desk">
                      <svg viewBox="0 0 200 140" fill="none" stroke="#BFD2FF" strokeWidth="4" strokeLinecap="round">
                        <path d="M20 60H180M30 60V130M170 60V130M40 60V45H160V60M70 130V95Q70 85 80 85H120Q130 85 130 95V130M70 105H130" />
                      </svg>
                    </div>
                    <div className="pa inv">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round">
                        <path d="M9.6 4.6A2 2 0 1 1 11 8H2M12.6 19.4A2 2 0 1 0 14 16H2M17.5 8a2.5 2.5 0 1 1 2 4H2" />
                      </svg>
                    </div>
                    <div className="pa aloe">
                      <svg viewBox="0 0 100 80" fill="#C9F2B8">
                        <path d="M50 80C40 50 20 40 10 10c25 10 35 30 40 70z" />
                        <path d="M50 80C60 50 80 40 90 10 65 20 55 40 50 80z" />
                        <path d="M50 80C48 50 46 30 50 0c4 30 2 50 0 80z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p>Consistent colours, type and layouts, so every post is recognisably yours.</p>
              </article>

              {/* LinkedIn & B2B */}
              <article className="fc w3 rv">
                <small>LinkedIn &amp; B2B</small>
                <h3>Posts that win B2B buyers</h3>
                <div className="stage2">
                  <div className={`li ${isLiOpen ? 'open' : ''}`} id="li">
                    <div className="lh">
                      <i>PM</i>
                      <div>
                        <b>Pithal Machines</b>
                        <small>Crushing &amp; screening equipment</small>
                      </div>
                    </div>
                    <p className="lt">
                      We spent 30 days on a quarry site to answer one question: why do crusher plants lose output in summer?
                      <span className="more-t">
                        {' '}Heat, dust and wear on the jaw plates. Here are the 4 maintenance checks our engineers now run every week, and the one that matters most.
                      </span>
                    </p>
                    <button type="button" id="liMore" onClick={() => setIsLiOpen((p) => !p)}>
                      {isLiOpen ? '…see less' : '…see more'}
                    </button>
                    <div className="limg" />
                  </div>
                </div>
                <p>Founder voice, case stories and plant visits for dealers and project buyers.</p>
              </article>
            </div>
          </div>
        </section>

        {/* HOOK LAB */}
        <section className="sec" id="hooks">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Hook lab</span>
                <h2>The first second decides everything.</h2>
              </div>
              <div className="r">
                <p>Pick your industry and a hook style. Watch how we&apos;d open your next reel.</p>
              </div>
            </div>

            <div className="lab">
              <div className="lab-ctrl rv">
                <div>
                  <h4>Your industry</h4>
                  <div className="chipset" id="hkInd">
                    <button
                      type="button"
                      className={`chp ${selectedInd === 'fans' ? 'on' : ''}`}
                      onClick={() => setSelectedInd('fans')}
                    >
                      Fans &amp; appliances
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedInd === 'tiles' ? 'on' : ''}`}
                      onClick={() => setSelectedInd('tiles')}
                    >
                      Tiles &amp; ceramics
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedInd === 'furn' ? 'on' : ''}`}
                      onClick={() => setSelectedInd('furn')}
                    >
                      Metal furniture
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedInd === 'study' ? 'on' : ''}`}
                      onClick={() => setSelectedInd('study')}
                    >
                      Study abroad
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedInd === 'lights' ? 'on' : ''}`}
                      onClick={() => setSelectedInd('lights')}
                    >
                      Lights &amp; electricals
                    </button>
                  </div>
                </div>

                <div>
                  <h4>Hook style</h4>
                  <div className="chipset" id="hkSty">
                    <button
                      type="button"
                      className={`chp ${selectedSty === 'q' ? 'on' : ''}`}
                      onClick={() => setSelectedSty('q')}
                    >
                      Question
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedSty === 'bold' ? 'on' : ''}`}
                      onClick={() => setSelectedSty('bold')}
                    >
                      Bold claim
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedSty === 'pov' ? 'on' : ''}`}
                      onClick={() => setSelectedSty('pov')}
                    >
                      POV
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedSty === 'ba' ? 'on' : ''}`}
                      onClick={() => setSelectedSty('ba')}
                    >
                      Before / after
                    </button>
                    <button
                      type="button"
                      className={`chp ${selectedSty === 'mis' ? 'on' : ''}`}
                      onClick={() => setSelectedSty('mis')}
                    >
                      Mistakes
                    </button>
                  </div>
                </div>

                <div className="why" aria-live="polite">
                  <b id="whyT">Why {selectedSty} hooks work</b>
                  <p id="whyP">{WHY[selectedSty]}</p>
                </div>

                <button
                  type="button"
                  className="btn btn-white"
                  style={{ justifySelf: 'start' }}
                  onClick={() => handleOpenLead('Social Media')}
                >
                  Get hooks for my brand{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>

              <div className="reelp run rv" id="reelp" aria-live="polite">
                <div className="scr">
                  {renderPostArt(IND[selectedInd].art)}
                  <div className="rprog"><i /></div>
                  <p className="hookt" id="hookt">
                    {hookParts.map((part, pIdx) => {
                      if (part.startsWith('[')) {
                        const words = part.slice(1, -1).split(' ');
                        return words.map((w, wIdx) => (
                          <span key={`${pIdx}-${wIdx}`} className="k" style={{ animationDelay: `${(pIdx + wIdx) * 0.1}s` }}>
                            {w}{' '}
                          </span>
                        ));
                      }
                      return part.trim().split(' ').map((w, wIdx) => (
                        <span key={`${pIdx}-${wIdx}`} style={{ animationDelay: `${(pIdx + wIdx) * 0.1}s` }}>
                          {w}{' '}
                        </span>
                      ));
                    })}
                  </p>
                  <div className="rr" aria-hidden="true">
                    <svg viewBox="0 0 24 24"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" /></svg>
                    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                    <svg viewBox="0 0 24 24"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" /></svg>
                  </div>
                  <p className="cap2">
                    <b id="hkWho">{IND[selectedInd].who}</b>
                    <span id="hkCap">{IND[selectedInd].cap}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MIX BUILDER */}
        <section className="sec alt" id="mix">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Content mix builder</span>
                <h2>What should you actually post?</h2>
              </div>
              <div className="r">
                <p>Choose your goal and who you sell to. We&apos;ll show the mix and posting rhythm we&apos;d start you with.</p>
              </div>
            </div>

            <div className="mix rv">
              <div className="mbox">
                <div>
                  <h4>Your main goal</h4>
                  <div className="chipset" id="mxGoal">
                    <button
                      type="button"
                      className={`chp ${mixGoal === 'aw' ? 'on' : ''}`}
                      onClick={() => setMixGoal('aw')}
                    >
                      Get known
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixGoal === 'leads' ? 'on' : ''}`}
                      onClick={() => setMixGoal('leads')}
                    >
                      Get leads
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixGoal === 'sales' ? 'on' : ''}`}
                      onClick={() => setMixGoal('sales')}
                    >
                      Sell online
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixGoal === 'comm' ? 'on' : ''}`}
                      onClick={() => setMixGoal('comm')}
                    >
                      Build a community
                    </button>
                  </div>
                </div>

                <div>
                  <h4>You sell to</h4>
                  <div className="chipset" id="mxAud">
                    <button
                      type="button"
                      className={`chp ${mixAud === 'b2c' ? 'on' : ''}`}
                      onClick={() => setMixAud('b2c')}
                    >
                      Consumers
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixAud === 'b2b' ? 'on' : ''}`}
                      onClick={() => setMixAud('b2b')}
                    >
                      Businesses
                    </button>
                  </div>
                </div>

                <div>
                  <h4>Main platform</h4>
                  <div className="chipset" id="mxPl">
                    <button
                      type="button"
                      className={`chp ${mixPl === 'Instagram' ? 'on' : ''}`}
                      onClick={() => setMixPl('Instagram')}
                    >
                      Instagram
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixPl === 'Facebook' ? 'on' : ''}`}
                      onClick={() => setMixPl('Facebook')}
                    >
                      Facebook
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixPl === 'LinkedIn' ? 'on' : ''}`}
                      onClick={() => setMixPl('LinkedIn')}
                    >
                      LinkedIn
                    </button>
                    <button
                      type="button"
                      className={`chp ${mixPl === 'YouTube Shorts' ? 'on' : ''}`}
                      onClick={() => setMixPl('YouTube Shorts')}
                    >
                      YouTube Shorts
                    </button>
                  </div>
                </div>
              </div>

              <div className="mres" aria-live="polite">
                <div className="donut">
                  <svg viewBox="0 0 200 200" id="dn">
                    {CATS.map((c, i) => {
                      const prevSum = mixValues.slice(0, i).reduce((a, b) => a + b, 0);
                      const currentVal = mixValues[i] || 0;
                      return (
                        <circle
                          key={i}
                          cx="100"
                          cy="100"
                          r="74"
                          pathLength="100"
                          stroke={c[1]}
                          strokeDasharray={`${Math.max(0, currentVal - 0.6)} ${100 - Math.max(0, currentVal - 0.6)}`}
                          strokeDashoffset={-prevSum}
                        />
                      );
                    })}
                  </svg>
                  <div className="ctr">
                    <div>
                      <b id="dnT">
                        {mixGoal === 'aw' && 'Get known'}
                        {mixGoal === 'leads' && 'Get leads'}
                        {mixGoal === 'sales' && 'Sell online'}
                        {mixGoal === 'comm' && 'Build a community'}
                      </b>
                      <small>monthly mix</small>
                    </div>
                  </div>
                </div>

                <div className="leg" id="leg">
                  {CATS.map((c, i) => (
                    <div key={i} className="lg">
                      <i style={{ background: c[1] }} />
                      <span>{c[0]}</span>
                      <b>{mixValues[i]}%</b>
                    </div>
                  ))}
                </div>

                <div className="cad">
                  <p id="cadP">
                    On <b>{mixPl}</b>: {CAD[mixGoal]}
                    {mixAud === 'b2b' && ' More educational carousels and founder-led posts for business buyers.'}
                  </p>
                  <div className="ideas" id="ideas">
                    {IDEAS[mixGoal].map((item, idx) => (
                      <span key={idx} style={{ animationDelay: `${idx * 0.06}s` }}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="mfoot">Our usual starting point. We adjust it every month using your own results.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CALENDAR */}
        <section className="sec" id="calendar">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">How a month runs</span>
                <h2>A calendar you approve. Posts that go out on time.</h2>
              </div>
              <div className="r">
                <p>Every month starts with a plan you can see, tap and approve. Filter by platform and tap any post to preview it.</p>
              </div>
            </div>

            <div className="cal rv">
              <div className="cal-top">
                <b>Content calendar · sample month</b>
                <div className="chipset" id="calF">
                  <button
                    type="button"
                    className={`chp ${calFilter === 'all' ? 'on' : ''}`}
                    onClick={() => setCalFilter('all')}
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className={`chp ${calFilter === 'Instagram' ? 'on' : ''}`}
                    onClick={() => setCalFilter('Instagram')}
                  >
                    Instagram
                  </button>
                  <button
                    type="button"
                    className={`chp ${calFilter === 'Facebook' ? 'on' : ''}`}
                    onClick={() => setCalFilter('Facebook')}
                  >
                    Facebook
                  </button>
                  <button
                    type="button"
                    className={`chp ${calFilter === 'LinkedIn' ? 'on' : ''}`}
                    onClick={() => setCalFilter('LinkedIn')}
                  >
                    LinkedIn
                  </button>
                  <button
                    type="button"
                    className={`chp ${calFilter === 'YouTube' ? 'on' : ''}`}
                    onClick={() => setCalFilter('YouTube')}
                  >
                    YouTube
                  </button>
                </div>
              </div>

              <div className="cal-body">
                <div className="cgrid" id="cgrid">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                    <div key={d} className="dh">{d}</div>
                  ))}
                  {Array.from({ length: 28 }, (_, i) => {
                    const day = i + 1;
                    const matchedPosts = CALENDAR_POSTS.map((p, k) => [p, k]).filter(
                      ([p]) => p[0] === day
                    );

                    return (
                      <div key={day} className={`cd ${matchedPosts.length ? '' : 'empty'}`}>
                        <span>{day}</span>
                        {matchedPosts.map(([p, k]) => {
                          const isDim = calFilter !== 'all' && p[1] !== calFilter;
                          const isSel = k === selectedCalPost;
                          return (
                            <button
                              key={k}
                              type="button"
                              className={`cpost ${isDim ? 'dim' : ''} ${isSel ? 'sel' : ''}`}
                              style={{ '--c': FMT_COLORS[p[2]] }}
                              title={p[3]}
                              onClick={() => setSelectedCalPost(k)}
                            >
                              <i style={{ fontStyle: 'normal', opacity: 0.75 }}>
                                {p[1] === 'Instagram' && 'IG'}
                                {p[1] === 'Facebook' && 'FB'}
                                {p[1] === 'LinkedIn' && 'IN'}
                                {p[1] === 'YouTube' && 'YT'}
                              </i>{' '}
                              {p[2]}
                            </button>
                          );
                        })}
                      </div>
                    );
                  })}
                </div>

                <div className="cprev" id="cprev" aria-live="polite">
                  {renderPostArt(calPost[4])}
                  <h5>{calPost[3]}</h5>
                  <div className="cmeta">
                    <span>Day {calPost[0]}</span>
                    <span>{calPost[1]}</span>
                    <span>{calPost[2]}</span>
                    <span
                      className={
                        calPost[5] === 'Approved'
                          ? 'st-ok'
                          : calPost[5] === 'In review'
                          ? 'st-rv'
                          : 'st-sc'
                      }
                    >
                      {calPost[5]}
                    </span>
                  </div>
                  <p>Caption, creative and hashtags ready for your review. Tap any other post to preview it.</p>
                </div>
              </div>
            </div>

            <div className="month">
              <div className="mw rv">
                <small>Week 1</small>
                <b>Strategy call</b>
                <p>Goals, offers and the month&apos;s themes agreed with you.</p>
              </div>
              <div className="mw rv">
                <small>Week 1–2</small>
                <b>Shoot day</b>
                <p>Product, people and places, shot vertical-first.</p>
              </div>
              <div className="mw rv">
                <small>Week 2</small>
                <b>Calendar approved</b>
                <p>You review captions and creative before anything goes live.</p>
              </div>
              <div className="mw rv">
                <small>Month end</small>
                <b>Report &amp; learn</b>
                <p>What got saved, shared and clicked, and what we&apos;ll do next.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec alt" id="faq">
          <div className="wrap">
            <div className="head rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <span className="eyebrow">FAQ</span>
                <h2 style={{ maxWidth: 'none' }}>Questions brands ask us.</h2>
              </div>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  Which platforms do you manage?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Instagram, Facebook, LinkedIn and YouTube Shorts. We pick the ones where your buyers spend time rather than posting everywhere.
                </p>
              </details>
              <details>
                <summary>
                  Do you shoot the content yourselves?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. Our team plans, shoots and edits in-house, in our studio or at your location.
                </p>
              </details>
              <details>
                <summary>
                  How many posts will we get each month?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  It depends on your goal and package. Use the content mix builder above for our usual starting rhythm.
                </p>
              </details>
              <details>
                <summary>
                  Do we approve content before it goes live?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Always. You see the full calendar, captions and creative before anything is published.
                </p>
              </details>
              <details>
                <summary>
                  Can you also run ads with this content?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. Our performance team turns your best organic posts into Meta ads, so content that already works gets more reach and sales.
                </p>
              </details>
              <details>
                <summary>
                  Do you work with UK brands?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. You can contract with WarrgyizMorsch UK Ltd, and the work is delivered by our team in Udaipur, India.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="fcta" id="audit">
          <div className="halo" aria-hidden="true" />
          <div className="halo b" aria-hidden="true" />
          <div className="wrap in">
            <span className="eyebrow">Free content audit</span>
            <h2>
              Make your feed<br />
              <span className="outline">impossible to skip.</span>
            </h2>
            <p>
              We&apos;ll review your last 30 posts, show you what&apos;s working and what isn&apos;t, and share three content ideas you can use straight away. Free, with no obligation.
            </p>
            <button
              type="button"
              className="btn btn-white"
              onClick={() => handleOpenLead('Social Media')}
            >
              Get my free audit{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}
