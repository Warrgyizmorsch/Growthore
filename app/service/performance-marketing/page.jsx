'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Check, Search, ArrowUpRight, ArrowRight } from 'lucide-react';
import Marquee from '@/components/Marquee';
import './performance.css';

const AD_DATA = {
  feed: {
    fmt: 'Meta feed ads',
    h: 'Stop the scroll. Send buyers straight to product.',
    b: [
      'A first frame built to stop the thumb',
      'Catalogue ads and dynamic retargeting',
      'Every new ad tested against a control',
    ],
    o: ['CTR', 'CPA', 'ROAS'],
  },
  reels: {
    fmt: 'Reels & Stories ads',
    h: 'Hook in the first second. Product by the third.',
    b: [
      'UGC-style and studio creative',
      'Captions-on cuts that work without sound',
      'Product stickers that open the shop',
    ],
    o: ['Hook rate', 'Hold rate', 'ROAS'],
  },
  search: {
    fmt: 'Google Search ads',
    h: 'Show up at the exact moment buyers are looking.',
    b: [
      'High-intent keywords with tight negatives',
      'Landing pages that match the search',
      'Offline conversions fed back to Google',
    ],
    o: ['Impression share', 'CPC', 'CPA'],
  },
  shop: {
    fmt: 'Shopping & Performance Max',
    h: 'Win the product slots that actually convert.',
    b: [
      'Merchant Center feed optimisation',
      'Titles and images built for the slot',
      'Budget weighted to your best margins',
    ],
    o: ['ROAS', 'Conversion value'],
  },
  lead: {
    fmt: 'Lead-gen forms',
    h: 'Fewer junk leads. More real buyers.',
    b: [
      'Pre-qualifying questions inside the form',
      'Instant CRM and WhatsApp follow-up',
      'Lead quality fed back to Meta via CAPI',
    ],
    o: ['CPL', 'Qualified-lead rate'],
  },
};

const ORDER = ['feed', 'reels', 'search', 'shop', 'lead'];

const CAMPAIGNS_DATA = [
  {
    category: 'Ecommerce',
    tagBg: '#1b2c1d',
    image: '/images/campaigns/ecommerce-lumiere.png',
    alt: 'Beauty Brand Scale-Up — LUMIÈRE Skincare',
    title: 'Beauty Brand Scale-Up',
    description: 'A full-funnel performance marketing strategy to scale sales across the UK eCommerce market.',
    metrics: [
      { val: '3.6x', label: 'ROAS' },
      { val: '210%', label: 'Revenue Growth' },
      { val: '42%', label: 'Lower CPA' },
    ],
  },
  {
    category: 'Education',
    tagBg: '#2a1e16',
    image: '/images/campaigns/education-study-abroad.jpg',
    alt: 'Study Abroad Enquiries — UK Universities',
    title: 'Study Abroad Enquiries',
    description: 'Generated high-quality student enquiries for UK universities through multi-channel campaigns.',
    metrics: [
      { val: '4.2x', label: 'ROAS' },
      { val: '320%', label: 'Qualified Leads' },
      { val: '35%', label: 'Lower CPL' },
    ],
  },
  {
    category: 'SaaS',
    tagBg: '#09152b',
    image: '/images/campaigns/saas-user-acquisition.png',
    alt: 'SaaS User Acquisition — B2B SaaS Dashboard',
    title: 'SaaS User Acquisition',
    description: 'A data-driven paid media strategy to acquire and activate high-value users for a B2B SaaS platform.',
    badge: {
      stat: '150%',
      label: 'User Sign-ups',
    },
    metrics: [
      { val: '150%', label: 'User Sign-ups' },
      { val: '60%', label: 'Lower CAC' },
      { val: '2.8x', label: 'ROI' },
    ],
  },
  {
    category: 'Healthcare',
    tagBg: '#221a14',
    image: '/images/campaigns/healthcare-wellcare.png',
    alt: 'Local Clinic Growth — Wellcare Clinic Reception',
    title: 'Local Clinic Growth',
    description: 'Increased appointment bookings through targeted local campaigns across Google and Meta.',
    metrics: [
      { val: '250%', label: 'Appointments' },
      { val: '45%', label: 'Lower CPA' },
      { val: '5x', label: 'ROI' },
    ],
  },
];

function inr(n) {
  n = Math.max(0, n);
  if (n >= 1e7) return '₹' + (n / 1e7).toFixed(n >= 1e8 ? 1 : 2) + ' Cr';
  if (n >= 1e5) {
    const l = n / 1e5;
    return '₹' + (l >= 100 ? l.toFixed(0) : l >= 10 ? l.toFixed(1).replace(/\.0$/, '') : l.toFixed(2).replace(/0$/, '')) + 'L';
  }
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

export default function PerformanceMarketingPage() {
  // Hero spotlight
  const heroRef = useRef(null);

  // Live order ticker on hero phone
  const [ordText, setOrdText] = useState('New order · ₹4,299');

  // Control Room State
  const canvasRef = useRef(null);
  const [kSpend, setKSpend] = useState('₹2.40L');
  const [kRev, setKRev] = useState('₹21.6L');
  const [kRoas, setKRoas] = useState('9.0x');
  const [kOrd, setKOrd] = useState('612');
  const [feedEvents, setFeedEvents] = useState([
    { id: 1, v: '₹4,890', src: 'Meta · Reels ad', col: '#9DBBFF' },
    { id: 2, v: '₹2,450', src: 'Google · Shopping', col: '#46E39A' },
    { id: 3, v: '₹6,120', src: 'Performance Max', col: '#FFC86B' },
  ]);

  // Ads in action
  const [activeAd, setActiveAd] = useState('feed');
  const [searchTyped, setSearchTyped] = useState('');

  // Leak slider
  const [leakCut, setLeakCut] = useState(50);
  const [leakAfterMobile, setLeakAfterMobile] = useState(true);
  const leakRef = useRef(null);
  const isDraggingLeak = useRef(false);

  // Calculator
  const [cSpendVal, setCSpendVal] = useState(38);
  const [cNowVal, setCNowVal] = useState(25);
  const [cTgtVal, setCTgtVal] = useState(50);

  // Niches
  const [activeNiche, setActiveNiche] = useState(0);

  // Framework active step
  const [fwStep, setFwStep] = useState('01');

  // Quiz
  const [quizAnswers, setQuizAnswers] = useState({ qb: null, qp: null, qg: null });

  // Handle open lead modal
  const handleOpenLead = (service = 'Performance Marketing') => {
    if (typeof window !== 'undefined' && window.openLeadModal) {
      window.openLeadModal(service);
    }
  };

  // Campaign slider ref & scroll helper
  const campaignSliderRef = useRef(null);
  const scrollCampaigns = (dir) => {
    if (campaignSliderRef.current) {
      const cardWidth = campaignSliderRef.current.firstElementChild?.offsetWidth || 300;
      campaignSliderRef.current.scrollBy({ left: dir * (cardWidth + 20), behavior: 'smooth' });
    }
  };

  // Hero mouse spotlight
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty('--mx', `${e.clientX - r.left}px`);
      hero.style.setProperty('--my', `${e.clientY - r.top}px`);
    };
    hero.addEventListener('pointermove', handleMove);
    return () => hero.removeEventListener('pointermove', handleMove);
  }, []);

  // Hero ticker
  useEffect(() => {
    const ordSrc = ['Meta Reels', 'Google Shopping', 'Meta retargeting', 'Google Search', 'Performance Max'];
    const timer = setInterval(() => {
      const v = Math.round((1800 + Math.random() * 6500) / 10) * 10;
      const src = ordSrc[Math.floor(Math.random() * ordSrc.length)];
      setOrdText(`New order · ₹${v.toLocaleString('en-IN')}`);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  // Control room simulated canvas & events
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const N = 48;
    let rev = [];
    let sp = [];
    let base = 1;
    for (let i = 0; i < N; i++) {
      base *= 1.035 + Math.random() * 0.02;
      sp.push(4 + i * 0.06 + Math.random() * 0.4);
      rev.push(Math.min(sp[i] * (2 + i * 0.15), 200) * (0.9 + Math.random() * 0.15));
    }

    let S = 240000;
    let R = 2160000;
    let O = 612;

    const srcs = [
      ['Meta · Reels ad', '#9DBBFF'],
      ['Google · Shopping', '#46E39A'],
      ['Meta · Retargeting', '#9DBBFF'],
      ['Google · Search', '#46E39A'],
      ['Performance Max', '#FFC86B'],
    ];

    function draw() {
      if (!cv) return;
      const w = cv.clientWidth;
      const h = cv.clientHeight;
      const d = window.devicePixelRatio || 1;
      if (cv.width !== w * d) {
        cv.width = w * d;
        cv.height = h * d;
      }
      ctx.setTransform(d, 0, 0, d, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const max = Math.max(...rev) * 1.15;
      const pad = 34;
      const X = (i) => (i / (N - 1)) * w;
      const Y = (v) => h - 8 - (v / max) * (h - pad - 8);

      ctx.strokeStyle = 'rgba(150,182,255,.08)';
      ctx.lineWidth = 1;
      for (let g = 1; g < 4; g++) {
        const y = pad + ((h - pad) * g) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const grd = ctx.createLinearGradient(0, pad, 0, h);
      grd.addColorStop(0, 'rgba(47,107,255,.45)');
      grd.addColorStop(1, 'rgba(47,107,255,0)');

      ctx.beginPath();
      rev.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
      ctx.lineTo(w, h);
      ctx.lineTo(0, h);
      ctx.fillStyle = grd;
      ctx.fill();

      ctx.beginPath();
      rev.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
      ctx.strokeStyle = '#9DBBFF';
      ctx.lineWidth = 2.2;
      ctx.shadowColor = '#2F6BFF';
      ctx.shadowBlur = 10;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.beginPath();
      sp.forEach((v, i) => (i ? ctx.lineTo(X(i), Y(v)) : ctx.moveTo(X(i), Y(v))));
      ctx.strokeStyle = '#FFC86B';
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);
      ctx.stroke();
      ctx.setLineDash([]);

      const lx = X(N - 1);
      const ly = Y(rev[N - 1]);
      ctx.beginPath();
      ctx.arc(lx - 4, ly, 4.5, 0, 7);
      ctx.fillStyle = '#fff';
      ctx.shadowColor = '#9DBBFF';
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    draw();
    window.addEventListener('resize', draw);

    const intv = setInterval(() => {
      if (typeof document !== 'undefined' && document.visibilityState !== 'visible') return;
      const v = Math.round((1800 + Math.random() * 6500) / 10) * 10;
      const src = srcs[Math.floor(Math.random() * srcs.length)];

      setFeedEvents((prev) => [
        { id: Date.now(), v: '₹' + v.toLocaleString('en-IN'), src: src[0], col: src[1] },
        ...prev.slice(0, 3),
      ]);

      S += Math.round(v / (7 + Math.random() * 4));
      R += v;
      O += 1;

      setKSpend(inr(S));
      setKRev(inr(R));
      setKRoas((R / S).toFixed(1) + 'x');
      setKOrd(O.toLocaleString('en-IN'));

      rev.shift();
      sp.shift();
      const last = rev[rev.length - 1];
      rev.push(Math.max(10, last * (0.97 + Math.random() * 0.08) + 0.6));
      sp.push(sp[sp.length - 1] * (0.99 + Math.random() * 0.03));
      draw();
    }, 2200);

    return () => {
      window.removeEventListener('resize', draw);
      clearInterval(intv);
    };
  }, []);

  // Ads in action rotation & search query typing
  useEffect(() => {
    if (activeAd === 'search') {
      const q = 'study in uk for indian students';
      let c = 0;
      setSearchTyped('');
      const t = setInterval(() => {
        setSearchTyped(q.slice(0, ++c));
        if (c >= q.length) clearInterval(t);
      }, 45);
      return () => clearInterval(t);
    }
  }, [activeAd]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAd((prev) => {
        const nextIdx = (ORDER.indexOf(prev) + 1) % ORDER.length;
        return ORDER[nextIdx];
      });
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Leak slider pointer drag
  const handlePointerDown = (e) => {
    if (window.innerWidth <= 760) return;
    isDraggingLeak.current = true;
    updateLeakCut(e);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingLeak.current) return;
    updateLeakCut(e);
  };

  const handlePointerUp = () => {
    isDraggingLeak.current = false;
  };

  const updateLeakCut = (e) => {
    if (!leakRef.current) return;
    const r = leakRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100));
    setLeakCut(p);
  };

  // Calculator calculation
  const spendOf = (v) => {
    const x = 50000 * Math.pow(100, v / 100);
    const step = x < 200000 ? 10000 : x < 1e6 ? 50000 : 100000;
    return Math.round(x / step) * step;
  };

  const currentSpend = spendOf(cSpendVal);
  const nowRoas = cNowVal / 10;
  const tgtRoas = Math.max(nowRoas, cTgtVal / 10);
  const vNow = currentSpend * nowRoas;
  const vTgt = currentSpend * tgtRoas;
  const rExtra = vTgt - vNow;

  // Quiz evaluation
  const doneCount = Object.values(quizAnswers).filter((x) => x !== null).length;
  const score = Object.values(quizAnswers).reduce((a, b) => a + (b || 0), 0);
  const isNoFit = quizAnswers.qg === 0;

  return (
    <>
      <main id="top" className="page-performance">
        {/* HERO */}
        <section className="pm-hero bh" id="hero" ref={heroRef}>
          <div className="hero-bg" aria-hidden="true">
            <div className="gridlines" />
            <div className="beam" />
            <div className="spot" />
          </div>
          <div className="wrap">
            <h1 className="bh1">
              <span className="bl">
                <span className="w" style={{ '--i': 0 }}>Performance Marketing</span>
                <span className="w" style={{ '--i': 1 }}>Agency UK.</span>
              </span>
              <span className="bl">
                <span className="w" style={{ '--i': 2 }}>Turning Ad Spend</span>
                <span className="w outline" style={{ '--i': 3 }}>Into Growth.</span>
              </span>
            </h1>
            <p className="bh-sub">
              Make every pound of your advertising budget work harder. We combine Google Ads, Meta Ads, precise audience targeting and continuous optimisation to help businesses generate qualified leads, increase conversions and achieve measurable growth.
            </p>
            <div className="bh-ctas">
              <button
                type="button"
                className="btn btn-white"
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                Get Your Free Ads Audit{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a href="#case" className="btn btn-ghost">
                Explore Our Results{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
            </div>
            <p className="bh-q">
              <i>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </i>
              Helping UK businesses make smarter advertising decisions and get more value from their marketing budgets.
            </p>

            <div className="bento">
              <article className="bc b-left">
                <h3>Creative that stops the scroll</h3>
                <div className="stage" aria-hidden="true">
                  <div className="glowc" />
                  <div className="rings" />
                  <div className="adc a1">
                    <div className="h">
                      <i />Iron Street
                    </div>
                    <div className="im" style={{ background: 'linear-gradient(160deg,#C9A27A,#5B4330)' }} />
                    <div className="cb">Shop now<span>›</span></div>
                  </div>
                  <div className="adc a2">
                    <div className="h">
                      <i />WTS Visa
                    </div>
                    <div className="im" style={{ background: 'linear-gradient(160deg,#5E8DFF,#0E2466)' }} />
                    <div className="cb">Apply<span>›</span></div>
                  </div>
                  <div className="adc a3">
                    <div className="h">
                      <i />Oltao
                    </div>
                    <div className="im">
                      <div className="fan">
                        <div className="blades" />
                      </div>
                    </div>
                    <div className="cb">Shop now<span>›</span></div>
                  </div>
                  <span className="react r1">
                    <svg viewBox="0 0 24 24" fill="#2F6BFF">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                  </span>
                  <span className="react r2">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                      <path d="M3 6h18" />
                    </svg>
                  </span>
                  <span className="react r3">
                    <svg viewBox="0 0 24 24" fill="#2F6BFF">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                </div>
                <p>Hooks in the first second, product by the third. New creative tested every week, so your ads never go stale.</p>
                <a href="#ads" className="btn btn-white">
                  See the formats{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </a>
              </article>

              <article className="bc b-mid" aria-label="Example reel ad with campaign signals">
                <div className="rings2" aria-hidden="true" />
                <div className="fl f-grow" aria-hidden="true">
                  <i>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#0A1640" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                    </svg>
                  </i>
                  Let&apos;s grow!
                </div>
                <div className="fl f-seg" aria-hidden="true">
                  <span className="t">
                    <i>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="#2F6BFF">
                        <rect x="3" y="10" width="4" height="11" />
                        <rect x="10" y="6" width="4" height="15" />
                        <rect x="17" y="2" width="4" height="19" />
                      </svg>
                    </i>
                    ROAS by week
                  </span>
                  <div className="segc">
                    <b /><b /><b /><b />
                    <svg viewBox="0 0 100 72" preserveAspectRatio="none">
                      <path d="M4 60 C 25 52, 40 46, 55 38 S 85 14, 96 6" />
                    </svg>
                  </div>
                </div>
                <div className="mphone" aria-hidden="true">
                  <div className="scr on" id="heroReel">
                    <div className="reel-bg" />
                    <div className="rprog"><i /></div>
                    <div className="fan">
                      <div className="blades" />
                    </div>
                    <p className="hook">
                      <span>Summer&apos;s here.</span>
                      <span>Your room deserves</span>
                      <span><mark>a better fan.</mark></span>
                    </p>
                    <div className="rrail">
                      <svg className="lk" viewBox="0 0 24 24">
                        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <svg viewBox="0 0 24 24">
                        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                      </svg>
                    </div>
                    <div className="sticker">
                      <span className="pi" />
                      <div>
                        Oltao BLDC fan<small>Sponsored</small>
                      </div>
                      <span className="b">Shop</span>
                    </div>
                  </div>
                </div>
                <div className="fl f-g" aria-hidden="true">
                  <div className="row">
                    <span className="gi">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2F6BFF" strokeWidth="2.4">
                        <circle cx="11" cy="11" r="7" />
                        <path d="M21 21l-4.6-4.6" />
                      </svg>
                    </span>
                    <span className="ok">
                      <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#0A7A45" strokeWidth="4" strokeLinecap="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Tracked
                    </span>
                  </div>
                  <b>Google Ads</b>
                  <small>Search · Shopping · PMax</small>
                </div>
                <div className="fl f-ord" aria-hidden="true">
                  <span className="ar">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </span>
                  <div className="tx">
                    <span id="ordTxt">{ordText}</span>
                    <span className="mini"><i /><i /></span>
                  </div>
                </div>
                <span className="tag-demo">Illustrative</span>
              </article>

              <div className="b-right">
                <article className="bc">
                  <h3>Revenue scaled for Oltao</h3>
                  <div className="bigstat">
                    <span className="hi">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#9DBBFF" strokeWidth="2.4" strokeLinecap="round">
                        <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                      </svg>
                    </span>
                    <strong>₹90L+</strong>
                    <span className="avs" aria-label="Clients">
                      <i>OL</i><i>IS</i><i>WT</i>
                    </span>
                  </div>
                  <p>From ₹1L in six months, with an 18x return on ad spend and 100+ orders a month.</p>
                </article>
                <article className="bc">
                  <h3>Built for India &amp; UK brands</h3>
                  <p>Contract with WarrgyizMorsch UK Ltd. Your campaigns run with our senior team in Udaipur.</p>
                  <button
                    type="button"
                    className="contract"
                    onClick={() => handleOpenLead('Performance Marketing')}
                  >
                    <span className="bar" />
                    <span style={{ minWidth: 0 }}>
                      <b>Free ad account audit</b>
                      <small>30-minute call · no obligation</small>
                    </span>
                    <span className="avs">
                      <i>IN</i><i>UK</i>
                    </span>
                    <span className="chev">›</span>
                  </button>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* BRANDS MARQUEE */}
        <Marquee />

        {/* LIVE VIEW */}
        <section className="sec alt section-py py-6 md:py-8" id="live">
          <div className="wrap live-grid">
            <div className="rv">

              <h2>
                Every Pound. Every Click.<br />
                Every Measurable Result.
              </h2>
              <p className="muted" style={{ fontSize: 'var(--step-1)' }}>
                Know exactly where your advertising budget goes and what it delivers with ROAS tracking.<br />
                We use real campaign data to identify opportunities and make every pound work harder.
              </p>
            </div>
            <div className="room" aria-label="Simulated campaign dashboard">
              <div className="room-top">
                <b><i />Campaign control room</b>
                <span className="tag-demo">Demo · simulated data</span>
              </div>
              <div className="kpis">
                <div className="kpi">
                  <span>Ad spend</span>
                  <strong id="kSpend">{kSpend}</strong>
                </div>
                <div className="kpi">
                  <span>Revenue</span>
                  <strong id="kRev">{kRev}</strong>
                </div>
                <div className="kpi hot">
                  <span>ROAS</span>
                  <strong id="kRoas">{kRoas}</strong>
                </div>
                <div className="kpi">
                  <span>Orders</span>
                  <strong id="kOrd">{kOrd}</strong>
                </div>
              </div>
              <div className="chart-wrap">
                <canvas id="roomChart" ref={canvasRef} aria-hidden="true" />
                <div className="legend">
                  <span><i style={{ background: '#9DBBFF' }} />Revenue</span>
                  <span><i style={{ background: '#FFC86B' }} />Ad spend</span>
                </div>
              </div>
              <div className="feed" aria-hidden="true">
                <div className="feed-in" id="feedIn">
                  {feedEvents.map((ev) => (
                    <div key={ev.id} className="ev">
                      <span className="dot" style={{ background: ev.col, boxShadow: `0 0 8px ${ev.col}` }} />
                      New order <b>{ev.v}</b>
                      <em>{ev.src}</em>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* MARQUEE TAPE */}
        <div className="marquee" aria-hidden="true" style={{ paddingBlock: '10px 15px' }}>
          <div className="tape">
            <div className="track rev">
              <span>META ADS</span><i className="dot" /><span>GOOGLE SEARCH</span><i className="dot" /><span>PERFORMANCE MAX</span><i className="dot" /><span>SHOPPING</span><i className="dot" /><span>INSTAGRAM REELS</span><i className="dot" /><span>LEAD FORMS</span><i className="dot" /><span>CONVERSIONS API</span><i className="dot" />
              <span>META ADS</span><i className="dot" /><span>GOOGLE SEARCH</span><i className="dot" /><span>PERFORMANCE MAX</span><i className="dot" /><span>SHOPPING</span><i className="dot" /><span>INSTAGRAM REELS</span><i className="dot" /><span>LEAD FORMS</span><i className="dot" /><span>CONVERSIONS API</span><i className="dot" />
            </div>
          </div>
        </div>

        {/* PROOF */}
        <section className="proof section-py py-6 md:py-8">
          <div className="wrap">
            <div className="proof-in rv">
              <div className="pcell big">
                <small>Oltao · premium appliances · 6 months</small>
                <strong>₹1L → ₹90L+</strong>
                <span>Revenue scaled with Meta and Google Ads</span>
              </div>
              <div className="pcell">
                <strong>18x</strong>
                <span>Return on ad spend</span>
              </div>
              <div className="pcell">
                <strong>100+</strong>
                <span>Orders every month</span>
              </div>
              <div className="pcell">
                <strong>15%</strong>
                <span>Conversion rate</span>
              </div>
            </div>
          </div>
        </section>

        {/* NICHES */}
        <section className="sec section-py py-6 md:py-8" id="niches">
          <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
            <defs>
              <linearGradient id="metal" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0" stopColor="#EAF0FF" />
                <stop offset=".5" stopColor="#8FB2FF" />
                <stop offset="1" stopColor="#C9D5F5" />
              </linearGradient>
            </defs>
          </svg>
          <div className="wrap">
            <div className="head rv">
              <h2>
                Different Industries.<br />
                Different Growth Strategies.
              </h2>
              <p>
                Every industry has unique customers, market challenges and distinct buying behaviours.<br />
                We develop tailored performance marketing strategies that reach the right audience and boost returns.
              </p>
            </div>
            <div className="niches" id="niches-row">
              {/* Niche 1 */}
              <div
                className={`nc ${activeNiche === 0 ? 'on' : ''}`}
                tabIndex={0}
                role="button"
                aria-expanded={activeNiche === 0}
                onClick={() => setActiveNiche(0)}
                onMouseEnter={() => setActiveNiche(0)}
              >
                <div className="nvis" aria-hidden="true">
                  <svg className="art" viewBox="0 0 320 200">
                    <path className="draw" d="M40 40 V180 M130 40 V180 M40 40 H130 M40 85 H130 M40 130 H130 M40 175 H130" />
                    <path className="draw d2" d="M58 70 h14 v15 M90 62 h18 v23 M60 112 h26 v18 M100 110 h14 v20" />
                    <path className="draw d3" d="M170 110 H300 M180 110 V182 M290 110 V182 M188 110 V100 H282 V110" />
                    <path className="draw d4" d="M205 182 V150 Q205 135 220 135 H240 Q255 135 255 150 V182 M205 158 H255 M230 135 V105" />
                  </svg>
                  <span className="ntag" style={{ left: '8%', top: '14%' }}>
                    Solid metal frames<small>Built to last</small>
                  </span>
                  <span className="ntag" style={{ right: '7%', bottom: '12%', animationDelay: '-2s' }}>
                    Shop the study range
                  </span>
                </div>
                <div className="nbody">
                  <small>Niche 01</small>
                  <h3>Metal furniture</h3>
                  <div className="clients">
                    <span>Iron Street</span>
                  </div>
                  <div className="nmore">
                    <p>Furniture is a considered buy. People need to picture it in their room before they pay, so creative and retargeting do the heavy lifting.</p>
                    <ul>
                      <li>Room-styled reels and carousels that show the piece in real spaces</li>
                      <li>Catalogue ads with dynamic retargeting for browsers who didn&apos;t buy</li>
                      <li>Google Shopping for high-intent searches like &quot;metal study table&quot;</li>
                    </ul>
                    <div className="nres todo">
                      <strong>[Add Iron Street result]</strong>
                    </div>
                  </div>
                  <span className="nhint">Tap to open →</span>
                </div>
              </div>

              {/* Niche 2 */}
              <div
                className={`nc ${activeNiche === 1 ? 'on' : ''}`}
                tabIndex={0}
                role="button"
                aria-expanded={activeNiche === 1}
                onClick={() => setActiveNiche(1)}
                onMouseEnter={() => setActiveNiche(1)}
              >
                <div className="nvis" aria-hidden="true">
                  <div className="fan big">
                    <div className="blades" />
                  </div>
                  <span className="bulb" style={{ left: '16%', top: '22%' }} />
                  <span className="bolt" style={{ right: '16%', top: '18%' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff">
                      <path d="M13 2L3 14h9l-1 8 10-12h-9z" />
                    </svg>
                  </span>
                  <span className="ntag" style={{ left: '8%', bottom: '12%', animationDelay: '-1.5s' }}>
                    Summer push<small>Fans · coolers</small>
                  </span>
                  <span className="ntag" style={{ right: '6%', bottom: '22%', animationDelay: '-3s' }}>
                    18x ROAS
                  </span>
                </div>
                <div className="nbody">
                  <small>Niche 02</small>
                  <h3>Electrical appliances</h3>
                  <div className="clients">
                    <span>Oltao</span>
                    <span>Rally Appliances</span>
                  </div>
                  <div className="nmore">
                    <p>Appliance buyers compare specs and prices. Demo creative that shows the benefit, plus a clean product feed, wins the comparison.</p>
                    <ul>
                      <li>Product demo reels that show the benefit in seconds</li>
                      <li>Shopping and Performance Max on an optimised Merchant Center feed</li>
                      <li>Seasonal pushes timed to demand, like summer for fans</li>
                    </ul>
                    <div className="nres">
                      <strong>₹1L → ₹90L+</strong>
                      <span>Oltao in 6 months<br />18x ROAS</span>
                    </div>
                  </div>
                  <span className="nhint">Tap to open →</span>
                </div>
              </div>

              {/* Niche 3 */}
              <div
                className={`nc ${activeNiche === 2 ? 'on' : ''}`}
                tabIndex={0}
                role="button"
                aria-expanded={activeNiche === 2}
                onClick={() => setActiveNiche(2)}
                onMouseEnter={() => setActiveNiche(2)}
              >
                <div className="nvis" aria-hidden="true">
                  <div className="globe-w">
                    <svg viewBox="0 0 320 180" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible' }}>
                      <ellipse cx="160" cy="150" rx="150" ry="26" fill="none" stroke="rgba(190,210,255,.25)" />
                      <path d="M30 120 C 90 20, 230 20, 290 110" fill="none" stroke="#6C9BFF" strokeWidth="2" strokeDasharray="5 7">
                        <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1s" repeatCount="indefinite" />
                      </path>
                    </svg>
                    <span className="pin" style={{ left: '12px', top: '112px' }}>
                      <i />IN
                    </span>
                    <span className="pin" style={{ left: '278px', top: '102px' }}>
                      <i />UK
                    </span>
                    <svg className="plane" width="30" height="30" viewBox="0 0 24 24" fill="#fff">
                      <path d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" />
                    </svg>
                  </div>
                  <span className="ntag" style={{ left: '6%', top: '12%', animationDelay: '-2.2s' }}>
                    New lead · UK, Sept intake<small>Qualified · sent to WhatsApp</small>
                  </span>
                </div>
                <div className="nbody">
                  <small>Niche 03</small>
                  <h3>Study abroad consultants</h3>
                  <div className="clients">
                    <span>WTS Visa</span>
                    <span>Global Opportunities</span>
                  </div>
                  <div className="nmore">
                    <p>Counsellors&apos; time is the real cost. We filter for country, intake and eligibility before a lead ever reaches your team.</p>
                    <ul>
                      <li>Lead forms with qualifying questions on country, intake and eligibility</li>
                      <li>Instant WhatsApp follow-up so counsellors call warm leads</li>
                      <li>Search ads for high-intent country and course queries</li>
                    </ul>
                    <div className="nres todo">
                      <strong>[Add WTS Visa lead numbers]</strong>
                    </div>
                  </div>
                  <span className="nhint">Tap to open →</span>
                </div>
              </div>
            </div>

            <div className="also rv">
              <b>Also growing brands in</b>
              <span><i />Tiles &amp; ceramics</span>
              <span><i />Industrial machinery</span>
              <span><i />Inverters &amp; solar</span>
              <span><i />Kitchen sinks &amp; faucets</span>
              <span><i />Mutual funds &amp; SIPs</span>
              <span><i />Personal care</span>
              <span><i />Jewellery</span>
              <span><i />Travel &amp; transfers</span>
            </div>
          </div>
        </section>

        {/* ADS IN ACTION */}
        <section className="sec section-py py-6 md:py-8" id="ads">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Built to Stop the Scroll.<br />
                Tuned to Convert &amp; Sell.
              </h2>
              <p>
                Every format has one purpose: driving engaged buyers from first impression to verified enquiry.<br />
                Select an ad format below to explore how our creatives convert attention into scalable revenue.
              </p>
            </div>
            <div className="tabs" role="tablist" aria-label="Ad formats" id="adTabs">
              {ORDER.map((item) => (
                <button
                  key={item}
                  className={`tab ${activeAd === item ? 'on' : ''}`}
                  role="tab"
                  aria-selected={activeAd === item}
                  onClick={() => setActiveAd(item)}
                >
                  {item === 'feed' && 'Meta feed'}
                  {item === 'reels' && 'Reels & Stories'}
                  {item === 'search' && 'Google Search'}
                  {item === 'shop' && 'Shopping & PMax'}
                  {item === 'lead' && 'Lead forms'}
                  <i className="tp" />
                </button>
              ))}
            </div>

            <div className="ads">
              <div className="phone" aria-hidden="true">
                {/* feed */}
                <div className={`scr ${activeAd === 'feed' ? 'on' : ''}`} data-s="feed">
                  <div className="sbar">
                    <span>9:41</span>
                    <span>●●● 5G</span>
                  </div>
                  <div className="appbar">
                    <span>Feed</span>
                    <span>♡ ✉</span>
                  </div>
                  <div className="ftrack">
                    <div className="post-h">
                      <span className="av">IS</span>
                      <div>
                        Iron Street<small>Sponsored</small>
                      </div>
                    </div>
                    <div className="post-img">
                      <div className="room-art" />
                      <div className="desk" />
                      <div className="lamp" />
                      <div className="chair" />
                    </div>
                    <div className="cta-bar">
                      Shop the study range<span>Shop now</span>
                    </div>
                    <div className="post-c">
                      <b>Iron Street</b> Your study, upgraded in one weekend. Solid-wood desks built to last.
                    </div>
                    <div className="ghost" />
                  </div>
                  <span className="tap t-feed" />
                  <div className="toast t-feed">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </i>
                    Added to cart · tracked by CAPI
                  </div>
                </div>

                {/* reels */}
                <div className={`scr ${activeAd === 'reels' ? 'on' : ''}`} data-s="reels">
                  <div className="reel-bg" />
                  <div className="sbar">
                    <span>9:41</span>
                    <span>●●● 5G</span>
                  </div>
                  <div className="rprog"><i /></div>
                  <div className="fan">
                    <div className="blades" />
                  </div>
                  <p className="hook">
                    <span>Summer&apos;s here.</span>
                    <span>Your room deserves</span>
                    <span><mark>a better fan.</mark></span>
                  </p>
                  <div className="rrail">
                    <svg className="lk" viewBox="0 0 24 24">
                      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4z" />
                    </svg>
                  </div>
                  <div className="sticker">
                    <span className="pi" />
                    <div>
                      Oltao BLDC fan<small>Sponsored</small>
                    </div>
                    <span className="b">Shop</span>
                  </div>
                  <span className="tap t-reel" />
                </div>

                {/* search */}
                <div className={`scr ${activeAd === 'search' ? 'on' : ''}`} data-s="search">
                  <div className="sbar">
                    <span>9:41</span>
                    <span>●●● 5G</span>
                  </div>
                  <div className="gs">
                    <div className="gbar">
                      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                      <span>
                        <span id="gq">{searchTyped}</span>
                        <span className="caret" />
                      </span>
                    </div>
                    <div className="gtabs">
                      <b>All</b>
                      <span>Images</span>
                      <span>News</span>
                      <span>Maps</span>
                    </div>
                    <div className="gad">
                      <small><b>Sponsored</b> · wtsvisa.com</small>
                      <h5>Study in the UK | Book a free counselling call</h5>
                      <p>Shortlist universities, check eligibility and plan your intake with an expert.</p>
                      <div className="chips">
                        <span>UK universities</span>
                        <span>Scholarships</span>
                        <span>Visa help</span>
                      </div>
                    </div>
                    <div className="gorg">
                      <i style={{ width: '60%' }} /><i /><i style={{ width: '85%' }} /><i style={{ width: '40%', marginTop: '10px' }} /><i /><i style={{ width: '70%' }} />
                    </div>
                  </div>
                  <span className="tap t-search" />
                </div>

                {/* shopping */}
                <div className={`scr ${activeAd === 'shop' ? 'on' : ''}`} data-s="shop">
                  <div className="sbar">
                    <span>9:41</span>
                    <span>●●● 5G</span>
                  </div>
                  <div className="appbar">
                    <span>Shopping</span>
                    <span>☰</span>
                  </div>
                  <div className="shop">
                    <h6>Sponsored · ceiling fans</h6>
                    <div className="pgrid">
                      <div className="pc us">
                        <div className="img">
                          <div className="fan">
                            <div className="blades" />
                          </div>
                        </div>
                        <p>Oltao BLDC ceiling fan</p>
                        <small>oltao.in</small>
                        <span className="badge-s">Top pick</span>
                      </div>
                      <div className="pc">
                        <div className="img" /><div className="ln" /><div className="ln" style={{ width: '60%' }} />
                      </div>
                      <div className="pc">
                        <div className="img" /><div className="ln" /><div className="ln" style={{ width: '50%' }} />
                      </div>
                      <div className="pc">
                        <div className="img" /><div className="ln" /><div className="ln" style={{ width: '70%' }} />
                      </div>
                    </div>
                  </div>
                  <span className="tap t-shop" />
                  <div className="toast t-shop">
                    <i>
                      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </i>
                    Product page opened · purchase tracked
                  </div>
                </div>

                {/* lead */}
                <div className={`scr ${activeAd === 'lead' ? 'on' : ''}`} data-s="lead">
                  <div className="sbar" style={{ color: '#0A1640' }}>
                    <span>9:41</span>
                    <span>●●● 5G</span>
                  </div>
                  <div className="lf">
                    <div className="lf-h">
                      <span className="av">WT</span>
                      <div>
                        WTS Visa<small>Instant form · Study abroad</small>
                      </div>
                    </div>
                    <h6>Plan your study abroad</h6>
                    <p className="q q1">Which country?</p>
                    <div className="ops o1">
                      <span className="pick">United Kingdom</span>
                      <span>Canada</span>
                      <span>Ireland</span>
                    </div>
                    <p className="q q2">When do you want to start?</p>
                    <div className="ops o2">
                      <span>This year</span>
                      <span className="pick">Next intake</span>
                      <span>Just exploring</span>
                    </div>
                    <p className="q q3">Have you finished graduation?</p>
                    <div className="ops o3">
                      <span className="pick">Yes</span>
                      <span>Final year</span>
                    </div>
                    <div className="qualified">
                      <i>
                        <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="#0A1640" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </i>
                      <div>
                        Qualified lead · sent to CRM<small>WhatsApp follow-up in seconds</small>
                      </div>
                    </div>
                    <div className="sub">Submit</div>
                  </div>
                  <span className="tap t-lead" />
                </div>
              </div>

              {/* Dynamic Info */}
              <div className="adinfo" id="adInfo" aria-live="polite">
                <div className="ad-swap" style={{ display: 'grid', gap: '20px' }}>
                  <span className="fmt">{AD_DATA[activeAd].fmt}</span>
                  <h3>{AD_DATA[activeAd].h}</h3>
                  <ul>
                    {AD_DATA[activeAd].b.map((x, idx) => (
                      <li key={idx}>{x}</li>
                    ))}
                  </ul>
                  <div className="opt-row">
                    What we optimise for{' '}
                    {AD_DATA[activeAd].o.map((x, idx) => (
                      <span key={idx}>{x}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="mock-note">
              Mock-ups for illustration, shown with client brands. Live campaigns use each client&apos;s own creative.
            </p>
          </div>
        </section>

        {/* LEAKS */}
        <section className="sec alt section-py py-6 md:py-8" id="leaks">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Stop Wasting Budget.<br />
                Start Improving Results.
              </h2>
              <p>
                Poor targeting, inaccurate tracking and ineffective creatives silently drain your advertising budget.<br />
                Slide below to discover how we pinpoint wasted spend and optimise campaigns for higher performance.
              </p>
            </div>
            <div className="ltoggle" role="group" aria-label="Compare">
              <button
                type="button"
                id="tBefore"
                className={!leakAfterMobile ? 'on' : ''}
                onClick={() => setLeakAfterMobile(false)}
              >
                Typical account
              </button>
              <button
                type="button"
                id="tAfter"
                className={leakAfterMobile ? 'on' : ''}
                onClick={() => setLeakAfterMobile(true)}
              >
                After WM Digital
              </button>
            </div>
            <div
              className="leak rv"
              id="leak"
              ref={leakRef}
              style={{ '--cut': `${leakCut}%` }}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            >
              <div className="lside before">
                <div className="lcol">
                  <small>Targeting</small>
                  <span className="state bad"><i />Leaking</span>
                  <h4>Broad audiences and auto-expansion</h4>
                  <p>Low-budget, non-decision-maker leads fill the pipeline and your sales team burns hours on them.</p>
                </div>
                <div className="lcol">
                  <small>Tracking</small>
                  <span className="state bad"><i />Leaking</span>
                  <h4>Pixel only, events missing</h4>
                  <p>Meta and Google optimise for clicks because they never see the real sales.</p>
                </div>
                <div className="lcol">
                  <small>Creative</small>
                  <span className="state bad"><i />Leaking</span>
                  <h4>The same ads for months</h4>
                  <p>No testing system, so costs creep up every week while the audience tunes out.</p>
                </div>
              </div>
              <div
                className="lside after"
                aria-hidden="false"
                style={typeof window !== 'undefined' && window.innerWidth <= 760 ? { clipPath: leakAfterMobile ? 'inset(0 0 0 0)' : 'inset(0 0 0 100%)' } : {}}
              >
                <div className="lcol">
                  <small>Targeting</small>
                  <span className="state good"><i />Fixed</span>
                  <h4>Layered intent and qualifying forms</h4>
                  <p>Interest, behaviour and page-admin signals stacked together, plus questions that filter out low budgets.</p>
                </div>
                <div className="lcol">
                  <small>Tracking</small>
                  <span className="state good"><i />Fixed</span>
                  <h4>Conversions API, GA4, clean events</h4>
                  <p>Every sale and qualified lead flows back to the platforms, so they learn from buyers.</p>
                </div>
                <div className="lcol">
                  <small>Creative</small>
                  <span className="state good"><i />Fixed</span>
                  <h4>New creative tested every week</h4>
                  <p>Winners get budget within days. Losers get cut before they cost you a month.</p>
                </div>
              </div>
              <div className="lhandle" style={{ left: `${leakCut}%` }}>
                <button
                  type="button"
                  id="leakBtn"
                  role="slider"
                  aria-label="Compare before and after"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(leakCut)}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowLeft') setLeakCut((p) => Math.max(0, p - 5));
                    if (e.key === 'ArrowRight') setLeakCut((p) => Math.min(100, p + 5));
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 6l-6 6 6 6M15 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="llabels">
              <span>← <b>Typical account</b></span>
              <span><b>After WM Digital</b> →</span>
            </div>
          </div>
        </section>

        {/* CALCULATOR */}
        <section className="sec section-py py-6 md:py-8" id="calc">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Ad Performance Calculator.<br />
                Explore Your Potential Returns.
              </h2>
              <p>
                See how improving your return on ad spend increases revenue without raising your advertising budget.<br />
                Adjust the interactive sliders below to explore your potential growth and projected campaign returns.
              </p>
            </div>
            <div className="calc rv">
              <div className="ctrlg">
                <div className="rng">
                  <label htmlFor="cSpend">
                    Monthly ad spend <output id="oSpend">{inr(currentSpend)}</output>
                  </label>
                  <input
                    type="range"
                    id="cSpend"
                    min="0"
                    max="100"
                    value={cSpendVal}
                    style={{ '--fill': `${cSpendVal}%` }}
                    onChange={(e) => setCSpendVal(+e.target.value)}
                  />
                  <small>₹50K to ₹50L a month</small>
                </div>
                <div className="rng">
                  <label htmlFor="cNow">
                    Your ROAS today <output id="oNow">{nowRoas.toFixed(1)}x</output>
                  </label>
                  <input
                    type="range"
                    id="cNow"
                    min="5"
                    max="100"
                    value={cNowVal}
                    style={{ '--fill': `${((cNowVal - 5) / 95) * 100}%` }}
                    onChange={(e) => {
                      const v = +e.target.value;
                      setCNowVal(v);
                      if (cTgtVal < v) setCTgtVal(v);
                    }}
                  />
                  <small>Revenue ÷ ad spend. Not sure? 2–3x is common for accounts that haven&apos;t been rebuilt.</small>
                </div>
                <div className="rng">
                  <label htmlFor="cTgt">
                    ROAS you&apos;d like <output id="oTgt">{tgtRoas.toFixed(1)}x</output>
                  </label>
                  <input
                    type="range"
                    id="cTgt"
                    min="5"
                    max="200"
                    value={cTgtVal}
                    style={{ '--fill': `${((cTgtVal - 5) / 195) * 100}%` }}
                    onChange={(e) => setCTgtVal(Math.max(cNowVal, +e.target.value))}
                  />
                  <small>For reference, Oltao reached 18x.</small>
                </div>
              </div>
              <div className="res" aria-live="polite">
                <div className="res-big">
                  <span>Extra revenue every month</span>
                  <strong id="rExtra">{inr(rExtra)}</strong>
                  <em id="rYear">{inr(rExtra * 12)} a year from the same budget</em>
                </div>
                <div className="bars">
                  <div className="bar-row">
                    <span>Today</span>
                    <span className="tr">
                      <i id="bNow" style={{ background: 'rgba(140,175,255,.45)', width: `${Math.max(3, (vNow / vTgt) * 100)}%` }} />
                    </span>
                    <b id="vNow">{inr(vNow)}</b>
                  </div>
                  <div className="bar-row">
                    <span>At target</span>
                    <span className="tr">
                      <i id="bTgt" style={{ background: 'linear-gradient(90deg,#2F6BFF,#9DBBFF)', boxShadow: '0 0 14px #2F6BFF', width: '100%' }} />
                    </span>
                    <b id="vTgt">{inr(vTgt)}</b>
                  </div>
                </div>
                <p className="disclaim">
                  An illustration of the maths, not a forecast. Your real numbers depend on product, margins and market.
                </p>
                <button
                  type="button"
                  className="btn btn-white"
                  style={{ justifySelf: 'start' }}
                  onClick={() => handleOpenLead('Performance Marketing')}
                >
                  See what&apos;s realistic for you{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FRAMEWORK */}
        <section className="sec alt section-py py-6 md:py-8" id="framework">
          <div className="wrap fw">
            <div className="fw-stick">
                    
              <h2>
                A Smarter Process.<br />
                Better Campaigns &amp; Stronger Growth.
              </h2>
              <p className="muted">
                From audience research to campaign optimisation, our four-step approach reduces ad waste.<br />
                We help UK businesses generate qualified leads and achieve sustainable, measurable returns.
              </p>
              <div className="fw-num" id="fwNum" aria-hidden="true">
                {fwStep}
              </div>
            </div>
            <div className="fw-cards">
              <article
                className={`fwc ${fwStep === '01' ? 'on' : ''}`}
                data-n="01"
                onMouseEnter={() => setFwStep('01')}
              >
                <div className="fvis" aria-hidden="true">
                  <svg viewBox="0 0 140 110">
                    <path className="flow" d="M28 30 L70 55 L112 30 M70 55 L70 92" />
                    <circle className="node" cx="28" cy="30" r="9" />
                    <circle className="node" cx="112" cy="30" r="9" />
                    <circle className="node" cx="70" cy="92" r="9" />
                    <circle cx="70" cy="55" r="13" fill="#2F6BFF" />
                    <circle className="pulse" cx="70" cy="55" r="5" />
                  </svg>
                </div>
                <small>Step 01</small>
                <h3>Fix the tracking</h3>
                <p>Conversions API, GA4 and clean purchase or lead events. Every rupee is attributed before we spend more.</p>
                <div className="chips2">
                  <span>Conversions API</span><span>GA4</span><span>Server events</span>
                </div>
              </article>
              <article
                className={`fwc ${fwStep === '02' ? 'on' : ''}`}
                data-n="02"
                onMouseEnter={() => setFwStep('02')}
              >
                <div className="fvis" aria-hidden="true">
                  <svg viewBox="0 0 140 110">
                    <circle cx="70" cy="55" r="40" fill="none" stroke="rgba(150,182,255,.25)" />
                    <circle cx="70" cy="55" r="25" fill="none" stroke="rgba(150,182,255,.45)" />
                    <circle cx="70" cy="55" r="10" fill="#2F6BFF" />
                    <circle className="dotp" cx="70" cy="55" r="4" style={{ '--fx': '-55px', '--fy': '-35px' }} />
                    <circle className="dotp" cx="70" cy="55" r="4" style={{ '--fx': '55px', '--fy': '-30px', animationDelay: '.7s' }} />
                    <circle className="dotp" cx="70" cy="55" r="4" style={{ '--fx': '-50px', '--fy': '38px', animationDelay: '1.4s' }} />
                    <circle className="dotp" cx="70" cy="55" r="4" style={{ '--fx': '52px', '--fy': '36px', animationDelay: '2.1s' }} />
                  </svg>
                </div>
                <small>Step 02</small>
                <h3>Qualify the audience</h3>
                <p>Layered intent targeting, smart exclusions and lead forms that ask the right questions, so low-budget leads stay out.</p>
                <div className="chips2">
                  <span>Intent stacking</span><span>Lookalikes from real buyers</span><span>Qualifying forms</span>
                </div>
              </article>
              <article
                className={`fwc ${fwStep === '03' ? 'on' : ''}`}
                data-n="03"
                onMouseEnter={() => setFwStep('03')}
              >
                <div className="fvis" aria-hidden="true">
                  <svg viewBox="0 0 140 110">
                    <rect className="mcard" x="14" y="24" width="32" height="56" rx="6" fill="#1A2B66" stroke="#6C9BFF" />
                    <rect className="mcard" x="54" y="24" width="32" height="56" rx="6" fill="#2F6BFF" stroke="#9DBBFF" />
                    <rect className="mcard" x="94" y="24" width="32" height="56" rx="6" fill="#1A2B66" stroke="#6C9BFF" />
                    <g className="win">
                      <circle cx="70" cy="22" r="11" fill="#46E39A" />
                      <path d="M65 22l3.5 3.5L75 18" fill="none" stroke="#0A1640" strokeWidth="2.6" strokeLinecap="round" />
                    </g>
                  </svg>
                </div>
                <small>Step 03</small>
                <h3>Test creative weekly</h3>
                <p>New hooks, formats and offers every week. Winners get budget, losers get cut within days.</p>
                <div className="chips2">
                  <span>Hooks</span><span>UGC &amp; studio</span><span>Offer tests</span>
                </div>
              </article>
              <article
                className={`fwc ${fwStep === '04' ? 'on' : ''}`}
                data-n="04"
                onMouseEnter={() => setFwStep('04')}
              >
                <div className="fvis" aria-hidden="true">
                  <svg viewBox="0 0 140 110">
                    <rect className="gbar" x="18" y="70" width="18" height="26" rx="4" fill="#3A5BC9" />
                    <rect className="gbar" x="45" y="55" width="18" height="41" rx="4" fill="#4A70E8" />
                    <rect className="gbar" x="72" y="38" width="18" height="58" rx="4" fill="#5E8DFF" />
                    <rect className="gbar" x="99" y="16" width="18" height="80" rx="4" fill="#9DBBFF" />
                    <path d="M14 60 L60 40 L82 46 L124 12" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 5" />
                  </svg>
                </div>
                <small>Step 04</small>
                <h3>Scale with guardrails</h3>
                <p>Spend goes up only where ROAS and CPL hold, channel by channel and campaign by campaign.</p>
                <div className="chips2">
                  <span>Budget rules</span><span>ROAS floors</span><span>Weekly review</span>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* CHANNELS / ORBIT */}
        <section className="sec section-py py-6 md:py-8" id="channels" style={{ overflow: 'hidden' }}>
          <div className="wrap orb-grid">
            <div className="rv">
             
              <h2>
                The Right Channels &amp; Audience.<br />
                One Unified Growth Strategy.
              </h2>
              <p className="muted" style={{ fontSize: 'var(--step-1)' }}>
                Your customers use multiple online platforms before making an enquiry or final decision.<br />
                We connect Google Ads and Meta Ads into one joined-up strategy that makes every pound count.
              </p>
              <div className="chlist">
                <span>
                  <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>Meta Ads
                </span>
                <span>
                  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>Google Search
                </span>
                <span>
                  <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /></svg>Shopping &amp; PMax
                </span>
                <span>
                  <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M10 9l5 3-5 3z" /></svg>YouTube
                </span>
                <span>
                  <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>Lead forms + WhatsApp
                </span>
                <span>
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>Conversions API
                </span>
              </div>
              <button
                type="button"
                className="btn btn-white"
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                Plan My Advertising Strategy{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
            <div className="orbit-wrap" aria-label="Channels and clients orbiting one team">
              <div className="ring r1" /><div className="ring r2" /><div className="ring r3" />
              <div className="ocenter">
                <strong>18x</strong>
                <span>Best ROAS delivered</span>
              </div>
              <div className="spinner" style={{ '--d': '46s' }}>
                <div className="oi" style={{ '--a': '20deg', '--r': 'calc(var(--R)*.23)' }}>
                  <span className="sq">
                    <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /></svg>
                  </span>
                </div>
                <div className="oi" style={{ '--a': '140deg', '--r': 'calc(var(--R)*.23)' }}>
                  <span className="sq pink">
                    <svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="3" /><path d="M10 9l5 3-5 3z" /></svg>
                  </span>
                </div>
                <div className="oi" style={{ '--a': '260deg', '--r': 'calc(var(--R)*.23)' }}>
                  <span className="sq">
                    <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                  </span>
                </div>
              </div>
              <div className="spinner rev" style={{ '--d': '70s' }}>
                <div className="oi" style={{ '--a': '60deg', '--r': 'calc(var(--R)*.36)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#2F6BFF,#1A3A9A)' }}>OL</span>
                </div>
                <div className="oi" style={{ '--a': '120deg', '--r': 'calc(var(--R)*.36)' }}>
                  <span className="sq">
                    <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
                  </span>
                </div>
                <div className="oi" style={{ '--a': '200deg', '--r': 'calc(var(--R)*.36)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#C9A27A,#6B4A2E)' }}>IS</span>
                </div>
                <div className="oi" style={{ '--a': '300deg', '--r': 'calc(var(--R)*.36)' }}>
                  <span className="sq pink">
                    <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18M16 10a4 4 0 0 1-8 0" /></svg>
                  </span>
                </div>
              </div>
              <div className="spinner" style={{ '--d': '95s' }}>
                <div className="oi" style={{ '--a': '10deg', '--r': 'calc(var(--R)*.49)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#7CC4FF,#1B48D8)' }}>WT</span>
                </div>
                <div className="oi" style={{ '--a': '95deg', '--r': 'calc(var(--R)*.49)' }}>
                  <span className="sq">
                    <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                  </span>
                </div>
                <div className="oi" style={{ '--a': '165deg', '--r': 'calc(var(--R)*.49)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#9D8BFF,#2A2F9E)' }}>RA</span>
                </div>
                <div className="oi" style={{ '--a': '250deg', '--r': 'calc(var(--R)*.49)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#B4CCFF,#123A8C)' }}>BC</span>
                </div>
                <div className="oi" style={{ '--a': '320deg', '--r': 'calc(var(--R)*.49)' }}>
                  <span className="cav" style={{ background: 'linear-gradient(135deg,#5AA9FF,#0E2466)' }}>AN</span>
                </div>
              </div>
              <span className="mcur c1" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 3l16 7-7 2-2 7z" fill="#7B6CFF" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                <b>Media buyer</b>
              </span>
              <span className="mcur c2" aria-hidden="true">
                <svg viewBox="0 0 24 24"><path d="M4 3l16 7-7 2-2 7z" fill="#2F6BFF" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" /></svg>
                <b>Creative lead</b>
              </span>
            </div>
          </div>
        </section>


{/* PAID MEDIA SERVICES */}
               <section className="sec alt paid-media-sec section-py py-6 md:py-8" id="paid-media">
                 {/* Decorative sweeping waves and arcs */}
                 <svg className="paid-media-arcs" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none" aria-hidden="true">
                   <path d="M 0 175 C 180 165, 310 85, 435 0 L 0 0 Z" fill="#02050c" fillOpacity="0.7" />
                   <path d="M 1110 -10 Q 1240 165 1450 205" stroke="#2F6BFF" strokeOpacity="0.45" strokeWidth="1.4" fill="none" />
                   <path d="M -20 790 Q 95 835 165 910" stroke="#6C9BFF" strokeOpacity="0.35" strokeWidth="1.3" fill="none" />
                 </svg>
       
                 <div className="wrap paid-media-wrap">
                   {/* Top Centered Header (2 lines H2, 2 lines description, no eyebrow) */}
                   <div className="head rv">
                     <h2>
                       Turn the Right Platforms into<br />
                       Real Business <span className="paid-media-title-accent">Opportunities.</span>
                     </h2>
                     <p>
                       We plan, create and manage high-performing ad campaigns across multiple platforms<br className="d-none d-sm-inline" />
                       to help you reach the right audience, generate qualified leads and grow your business.
                     </p>
                   </div>
       
                   {/* 4-COLUMN PLATFORM CARDS GRID */}
                   <div className="paid-media-grid">
       
                     {/* CARD 1: GOOGLE ADS */}
                     <article className="platform-card rv">
                       <div>
                         <div className="platform-card-top">
                           <div className="pm-logo-box">
                             <svg className="pm-logo-icon" viewBox="0 0 48 48" fill="none">
                               <path d="M8.5 36.2L21.8 13.2C23.5 10.3 27.2 9.3 30.1 11L16.8 34C15.1 36.9 11.4 37.9 8.5 36.2Z" fill="#FBBC04" />
                               <path d="M39.5 36.2L26.2 13.2C24.5 10.3 20.8 9.3 17.9 11L31.2 34C32.9 36.9 36.6 37.9 39.5 36.2Z" fill="#4285F4" />
                               <circle cx="12.5" cy="34.2" r="5.8" fill="#34A853" />
                             </svg>
                           </div>
                           <span className="platform-tag-pill">Search. Display. YouTube.</span>
                         </div>
       
                         <h3 className="platform-card-title">Google Ads</h3>
                         <p className="platform-card-desc">Capture high-intent customers with targeted search and display campaigns.</p>
       
                         <ul className="platform-bullets">
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Search &amp; Shopping Ads</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Display &amp; Remarketing</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>YouTube Video Ads</span>
                           </li>
                         </ul>
                       </div>
       
                       <div>
                         <div className="platform-mockup-area">
                           {/* White Browser Search Card */}
                           <div className="google-search-mockup">
                             <div className="google-search-bar">
                               <div className="google-logo-text">
                                 <span style={{ color: '#4285F4' }}>G</span><span style={{ color: '#EA4335' }}>o</span><span style={{ color: '#FBBC05' }}>o</span><span style={{ color: '#4285F4' }}>g</span><span style={{ color: '#34A853' }}>l</span><span style={{ color: '#EA4335' }}>e</span>
                               </div>
                               <div className="google-search-input">
                                 <Search size={9} strokeWidth={2.5} className="google-search-icon" />
                                 <Search size={8} strokeWidth={2.5} className="google-search-icon" />
                               </div>
                             </div>
                             <div className="google-ad-lines">
                               <div className="google-ad-line-first">
                                 <span className="google-ad-badge">Ad</span>
                                 <span className="google-ad-headline" />
                               </div>
                               <div className="google-subline l1" />
                               <div className="google-subline l2" />
                               <div className="google-subline l3" />
                             </div>
                           </div>
       
                           {/* Overlapping Floating KPI Card ("Leads +120%") */}
                           <div className="platform-kpi-card">
                             <div className="platform-kpi-label">Leads</div>
                             <div className="platform-kpi-stat-row">
                               <span className="platform-kpi-val">+120%</span>
                               <span className="platform-kpi-arrow">
                                 <ArrowUpRight size={13} strokeWidth={2.7} />
                               </span>
                             </div>
                             <div className="platform-kpi-bars">
                               <span style={{ height: '8px' }} />
                               <span style={{ height: '13px' }} />
                               <span style={{ height: '18px' }} />
                             </div>
                           </div>
                         </div>
       
                         <button
                           type="button"
                           className="platform-cta-btn"
                           onClick={() => handleOpenLead('Google Ads')}
                         >
                           <span>Generate Leads</span>
                           <ArrowRight size={14} strokeWidth={2.2} className="platform-btn-arrow" />
                         </button>
                       </div>
                     </article>
       
                     {/* CARD 2: META ADS */}
                     <article className="platform-card rv">
                       <div>
                         <div className="platform-card-top">
                           <div className="pm-logo-box">
                             <svg className="pm-logo-icon" viewBox="0 0 48 48" fill="none">
                               <path
                                 d="M14.2 15C9.5 15 6 19.2 6 24.5C6 29.5 9.2 33 13.5 33C16.8 33 19.5 30.6 22.8 25.5L25.2 21.8C27.8 17.8 30.2 15 34.2 15C38.8 15 42 18.8 42 24.2C42 29.5 38.5 33 34.2 33C30.8 33 28.4 30.8 26 27"
                                 stroke="#0081FB"
                                 strokeWidth="4.4"
                                 strokeLinecap="round"
                               />
                               <path
                                 d="M13.5 33C16.8 33 19.5 30.6 22.8 25.5L25.2 21.8C22.6 17.5 19.2 15 14.2 15"
                                 stroke="#0064E0"
                                 strokeWidth="4.4"
                                 strokeLinecap="round"
                               />
                             </svg>
                           </div>
                           <span className="platform-tag-pill">Facebook. Instagram. Reels.</span>
                         </div>
       
                         <h3 className="platform-card-title">Meta Ads</h3>
                         <p className="platform-card-desc">Build brand awareness and generate high-quality leads with engaging social media campaigns.</p>
       
                         <ul className="platform-bullets">
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Facebook &amp; Instagram Ads</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Reels &amp; Stories Campaigns</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Audience Retargeting</span>
                           </li>
                         </ul>
                       </div>
       
                       <div>
                         <div className="platform-mockup-area">
                           <div className="meta-ad-mockup">
                             <div className="meta-ad-left-strip">
                               <div className="meta-app-badge ig" aria-label="Instagram">
                                 <svg viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
                                   <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                   <circle cx="12" cy="12" r="4.2" />
                                   <circle cx="17.5" cy="6.5" r="1" fill="#ffffff" stroke="none" />
                                 </svg>
                               </div>
                               <div className="meta-app-badge fb" aria-label="Facebook">
                                 <svg viewBox="0 0 24 24" fill="#ffffff" width="11" height="11">
                                   <path d="M9.198 21.5h4v-8.01h2.604l.39-3.024h-2.994V8.535c0-.875.243-1.472 1.498-1.472H16.3V4.356c-.28-.037-1.242-.12-2.362-.12-2.337 0-3.937 1.427-3.937 4.047v2.261H7.404v3.024h2.596v8.01z" />
                                 </svg>
                               </div>
                               <span className="meta-ad-badge-tag">Ad</span>
                             </div>
                             <div className="meta-ad-right-content">
                               <div className="meta-ad-top-line">
                                 <span className="meta-bar-sm" />
                                 <span className="meta-ad-label">Ad</span>
                               </div>
                               <div className="meta-ad-img-box">
                                 <img
                                   src="/images/paid-media/meta-sneaker.png"
                                   alt="Sneaker Ad Preview"
                                   loading="lazy"
                                   className="pm-mockup-img"
                                 />
                               </div>
                               <span className="meta-bar-sub" />
                             </div>
                           </div>
       
                           {/* Floating KPI Card ("Qualified Leads +85%") */}
                           <div className="platform-kpi-card">
                             <div className="platform-kpi-label">Qualified Leads</div>
                             <div className="platform-kpi-stat-row">
                               <span className="platform-kpi-val">+85%</span>
                               <span className="platform-kpi-arrow">
                                 <ArrowUpRight size={13} strokeWidth={2.7} />
                               </span>
                             </div>
                             <div className="platform-kpi-bars">
                               <span style={{ height: '7px' }} />
                               <span style={{ height: '12px' }} />
                               <span style={{ height: '18px' }} />
                             </div>
                           </div>
                         </div>
       
                         <button
                           type="button"
                           className="platform-cta-btn"
                           onClick={() => handleOpenLead('Meta Ads')}
                         >
                           <span>Generate Leads</span>
                           <ArrowRight size={14} strokeWidth={2.2} className="platform-btn-arrow" />
                         </button>
                       </div>
                     </article>
       
                     {/* CARD 3: LINKEDIN ADS */}
                     <article className="platform-card rv">
                       <div>
                         <div className="platform-card-top">
                           <div className="pm-linkedin-badge" aria-label="LinkedIn">
                             <svg viewBox="0 0 24 24" fill="#ffffff" width="22" height="22">
                               <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                             </svg>
                           </div>
                           <span className="platform-tag-pill">B2B Lead Generation</span>
                         </div>
       
                         <h3 className="platform-card-title">LinkedIn Ads</h3>
                         <p className="platform-card-desc">Reach business decision-makers with targeted B2B advertising campaigns.</p>
       
                         <ul className="platform-bullets">
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Sponsored Content</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Message Ads</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Lead Generation Forms</span>
                           </li>
                         </ul>
                       </div>
       
                       <div>
                         <div className="platform-mockup-area">
                           <div className="linkedin-post-mockup">
                             <div className="linkedin-mockup-head">
                               <div className="linkedin-mockup-profile">
                                 <span className="linkedin-tiny-in" aria-label="LinkedIn">
                                   <svg viewBox="0 0 24 24" fill="#ffffff" width="9" height="9">
                                     <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                                   </svg>
                                 </span>
                                 <div className="linkedin-mockup-lines">
                                   <span className="linkedin-bar-1" />
                                   <span className="linkedin-bar-2" />
                                 </div>
                               </div>
                               <span className="linkedin-ad-tag">Ad</span>
                             </div>
                             <div className="linkedin-img-wrap">
                               <span className="linkedin-corner-tag">Ad</span>
                               <img
                                 src="/images/paid-media/linkedin-corporate.jpg"
                                 alt="Corporate Office Towers Ad Preview"
                                 loading="lazy"
                                 className="pm-mockup-img"
                               />
                             </div>
                           </div>
       
                           {/* Floating KPI Card ("B2B Leads +200%") */}
                           <div className="platform-kpi-card">
                             <div className="platform-kpi-label">B2B Leads</div>
                             <div className="platform-kpi-stat-row">
                               <span className="platform-kpi-val">+200%</span>
                               <span className="platform-kpi-arrow">
                                 <ArrowUpRight size={13} strokeWidth={2.7} />
                               </span>
                             </div>
                             <div className="platform-kpi-bars">
                               <span style={{ height: '7px' }} />
                               <span style={{ height: '12px' }} />
                               <span style={{ height: '18px' }} />
                             </div>
                           </div>
                         </div>
       
                         <button
                           type="button"
                           className="platform-cta-btn"
                           onClick={() => handleOpenLead('LinkedIn Ads')}
                         >
                           <span>Generate Leads</span>
                           <ArrowRight size={14} strokeWidth={2.2} className="platform-btn-arrow" />
                         </button>
                       </div>
                     </article>
       
                     {/* CARD 4: OTHER PLATFORMS */}
                     <article className="platform-card rv">
                       <div>
                         <div className="platform-card-top">
                           <div className="pm-multi-icons">
                             <div className="pm-app-icon tiktok" title="TikTok" aria-label="TikTok">
                               <svg viewBox="0 0 24 24" fill="#ffffff" width="13" height="13">
                                 <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 3.77.92V6.69z" />
                               </svg>
                             </div>
                             <div className="pm-app-icon pinterest" title="Pinterest" aria-label="Pinterest">
                               <svg viewBox="0 0 24 24" fill="#ffffff" width="13" height="13">
                                 <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                               </svg>
                             </div>
                             <div className="pm-app-icon snapchat" title="Snapchat" aria-label="Snapchat">
                               <svg viewBox="0 0 24 24" fill="#000000" width="13" height="13">
                                 <path d="M12.012 2c-3.541 0-5.992 2.656-5.992 5.568 0 .86.233 1.83.473 2.518.156.447.168.618-.088.948-.228.293-.668.651-1.196.791-.497.132-.828.461-.836.877-.008.43.332.748.868.805.51.055.932-.086 1.258.106.28.165.253.513.203.951-.106.924-.712 1.545-1.523 1.564-.326.008-.604.148-.686.377-.101.282.029.566.365.789.702.464 1.727.669 2.593.744.136.012.222.067.247.151.107.362-.647 1.777-2.658 2.146-.372.068-.544.303-.497.527.054.262.385.452.887.452.809 0 1.696-.282 2.627-.833.272-.161.49-.126.685.067.555.55 1.536 1.054 3.264 1.054 1.737 0 2.723-.51 3.282-1.066.195-.194.414-.226.685-.065.93.551 1.818.833 2.627.833.502 0 .833-.19.887-.452.047-.224-.125-.459-.497-.527-2.011-.369-2.765-1.784-2.658-2.146.025-.084.111-.139.247-.151.866-.075 1.891-.28 2.593-.744.336-.223.466-.507.365-.789-.082-.229-.36-.369-.686-.377-.811-.019-1.417-.64-1.523-1.564-.05-.438-.077-.786.203-.951.326-.192.748-.051 1.258-.106.536-.057.876-.375.868-.805-.008-.416-.339-.745-.836-.877-.528-.14-.968-.498-1.196-.791-.256-.33-.244-.501-.088-.948.24-.688.473-1.658.473-2.518C18.004 4.656 15.553 2 12.012 2z" />
                               </svg>
                             </div>
                             <div className="pm-app-icon reddit" title="Reddit" aria-label="Reddit">
                               <svg viewBox="0 0 24 24" fill="#ffffff" width="13" height="13">
                                 <path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-1.309 3.055a.6.6 0 0 0 .783.783l3.055-1.309C8.213 23.473 10.046 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.545 13.5a2.045 2.045 0 0 1-2.045 2.045c-.247 0-.48-.046-.697-.127-1.042.723-2.457 1.182-4.024 1.223l.685-3.226 2.235.476a1.5 1.5 0 1 1 .273 1.252c.007-.066.012-.132.012-.2 0-.828-.672-1.5-1.5-1.5a1.493 1.493 0 0 0-1.464 1.19l-2.493-.531a.3.3 0 0 0-.356.233l-.841 3.963c-1.53-.05-2.91-.502-3.931-1.214a2.039 2.039 0 0 1-.689.123 2.045 2.045 0 1 1 1.428-3.513c.026-.372.105-.733.232-1.077.568-1.542 1.874-2.736 3.585-3.236C8.895 9.066 9.44 9 10 9c.56 0 1.105.066 1.625.19 1.711.5 3.017 1.694 3.585 3.236.127.344.206.705.232 1.077.808.318 1.403 1.037 1.403 1.997zm-8.045-.5a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm5 0a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm-4.444 3.333a2.915 2.915 0 0 0 3.888 0 .3.3 0 0 0-.424-.424 2.315 2.315 0 0 1-3.04 0 .3.3 0 0 0-.424.424z" />
                               </svg>
                             </div>
                           </div>
                           <span className="platform-tag-pill">Multi-Channel</span>
                         </div>
       
                         <h3 className="platform-card-title">Other Platforms</h3>
                         <p className="platform-card-desc">We also run campaigns on TikTok, Pinterest, Snapchat, Reddit and more, tailored to your audience.</p>
       
                         <ul className="platform-bullets">
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Platform-specific strategy</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Creative ad production</span>
                           </li>
                           <li className="platform-bullet-item">
                             <span className="platform-check-icon">
                               <Check size={11} strokeWidth={3.5} />
                             </span>
                             <span>Ongoing optimisation</span>
                           </li>
                         </ul>
                       </div>
       
                       <div>
                         <div className="platform-mockup-area">
                           <div className="multi-ad-mockup">
                             {/* Left Fanned Pinterest Card */}
                             <div className="multi-fanned-card">
                               <span className="multi-pin-icon" aria-label="Pinterest">
                                 <svg viewBox="0 0 24 24" fill="#ffffff" width="10" height="10">
                                   <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                                 </svg>
                               </span>
                             </div>
                             {/* Main TikTok Ad Card */}
                             <div className="multi-main-card">
                               <div className="multi-main-top">
                                 <span className="multi-tiktok-icon" aria-label="TikTok">
                                   <svg viewBox="0 0 24 24" fill="#ffffff" width="10" height="10">
                                     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.42a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.75a8.16 8.16 0 0 0 3.77.92V6.69z" />
                                   </svg>
                                 </span>
                                 <span className="multi-ad-tag">Ad</span>
                               </div>
                               <div className="multi-img-box">
                                 <img
                                   src="/images/paid-media/tiktok-skincare.jpg"
                                   alt="TikTok Skincare Ad Preview"
                                   loading="lazy"
                                   className="pm-mockup-img"
                                 />
                               </div>
                               <div className="multi-lines">
                                 <span className="multi-bar-1" />
                                 <span className="multi-bar-2" />
                               </div>
                             </div>
                           </div>
       
                           {/* Floating KPI Card ("Engagement +75%") */}
                           <div className="platform-kpi-card">
                             <div className="platform-kpi-label">Engagement</div>
                             <div className="platform-kpi-stat-row">
                               <span className="platform-kpi-val">+75%</span>
                               <span className="platform-kpi-arrow">
                                 <ArrowUpRight size={13} strokeWidth={2.7} />
                               </span>
                             </div>
                             <div className="platform-kpi-bars">
                               <span style={{ height: '7px' }} />
                               <span style={{ height: '12px' }} />
                               <span style={{ height: '18px' }} />
                             </div>
                           </div>
                         </div>
       
                         <button
                           type="button"
                           className="platform-cta-btn"
                           onClick={() => handleOpenLead('Other Platforms')}
                         >
                           <span>Generate Leads</span>
                           <ArrowRight size={14} strokeWidth={2.2} className="platform-btn-arrow" />
                         </button>
                       </div>
                     </article>
       
                   </div>
                 </div>
               </section>

        {/* OUR BEST CAMPAIGNS */}
        <section className="sec campaigns-sec section-py py-6 md:py-8" id="campaigns">
          {/* Bottom Decorative Glowing Curved Arcs */}
          <svg className="campaigns-bottom-arcs" viewBox="0 0 1440 210" fill="none" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="campaignArcLeft" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2F6BFF" stopOpacity="0.08" />
                <stop offset="65%" stopColor="#2F6BFF" stopOpacity="0.65" />
                <stop offset="100%" stopColor="#6C9BFF" stopOpacity="0.95" />
              </linearGradient>
              <linearGradient id="campaignArcRight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.2" />
                <stop offset="60%" stopColor="#2F6BFF" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#6C9BFF" stopOpacity="0.85" />
              </linearGradient>
            </defs>
            <path d="M -60 215 Q 240 -25 535 215" stroke="url(#campaignArcLeft)" strokeWidth="1.6" fill="none" />
            <path d="M 905 215 Q 1190 -30 1490 215" stroke="url(#campaignArcRight)" strokeWidth="1.5" fill="none" />
          </svg>

          <div className="wrap campaigns-wrap">
            {/* TOP HEADER + NAVIGATION ARROWS */}
            <div className="campaigns-head-row">
              <div className="head rv campaigns-head-center">
               
                <h2>
                  Real Campaigns.<br />
                  Measurable <span className="campaigns-title-accent">Results.</span>
                </h2>
                <p>
                  From scaling eCommerce brands to generating high-intent leads, our performance<br className="d-none d-sm-inline" />
                  marketing campaigns are built to deliver real business growth.
                </p>
              </div>

              {/* Prev / Next Circular Navigation Arrows */}
              <div className="campaigns-nav-btns" aria-label="Campaign navigation">
                <button
                  type="button"
                  className="campaigns-nav-btn prev"
                  onClick={() => scrollCampaigns(-1)}
                  aria-label="Previous campaigns"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5m0 0l5-5m-5 5l5 5" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="campaigns-nav-btn next"
                  onClick={() => scrollCampaigns(1)}
                  aria-label="Next campaigns"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14m0 0l-5-5m5 5l-5 5" />
                  </svg>
                </button>
              </div>
            </div>

            {/* 4-COLUMN CAMPAIGN CARDS GRID */}
            <div className="campaigns-grid" ref={campaignSliderRef}>
              {CAMPAIGNS_DATA.map((c, i) => (
                <article key={i} className="campaign-card rv">
                  {/* Top Image Area */}
                  <div className="campaign-card-media" style={{ background: c.tagBg }}>
                    <span className="campaign-category-pill">{c.category}</span>
                    {c.badge && (
                      <div className="campaign-saas-callout">
                        <div className="campaign-saas-arrow">↑</div>
                        <div className="campaign-saas-texts">
                          <span className="campaign-saas-stat">{c.badge.stat}</span>
                          <span className="campaign-saas-label">{c.badge.label}</span>
                        </div>
                      </div>
                    )}
                    <img
                      src={c.image}
                      alt={c.alt}
                      loading="lazy"
                      className="campaign-card-img"
                    />
                  </div>

                  {/* Card Content */}
                  <div className="campaign-card-body">
                    <div>
                      <h3 className="campaign-card-title">{c.title}</h3>
                      <p className="campaign-card-desc">{c.description}</p>
                    </div>

                    <div>
                      {/* 3 Metrics Row */}
                      <div className="campaign-metrics-row">
                        {c.metrics.map((m, mi) => (
                          <div key={mi} className={`campaign-metric-col ${mi === 0 ? 'col-first' : mi === 1 ? 'col-mid' : 'col-last'}`}>
                            <div className="campaign-metric-val">{m.val}</div>
                            <div className="campaign-metric-label">{m.label}</div>
                          </div>
                        ))}
                      </div>

                      {/* View Case Study Link */}
                      <button
                        type="button"
                        onClick={() => handleOpenLead(`Case Study: ${c.title}`)}
                        className="campaign-card-action"
                      >
                        <span>View case study</span>
                        <svg className="campaign-action-arrow" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m0 0l-4-4m4 4l-4 4" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* BOTTOM CTA PILL: "View all case studies →" */}
            <div className="campaigns-bottom-cta">
              <a href="#case" className="campaigns-view-all-pill">
                <span>View all case studies</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14m0 0l-4-4m4 4l-4 4" />
                </svg>
              </a>
            </div>
          </div>
        </section>
        

        {/* OLTAO STORY */}
        <section className="sec alt section-py py-6 md:py-8" id="case">
          <div className="wrap">
            <div className="head rv">
              <h2>
                From Strategy to Sales.<br />
                A Six-Month Growth Story.
              </h2>
              <p>
                Discover how we helped Oltao, a premium home tech brand, transform its advertising performance.<br />
                Through smarter targeting and continuous campaign optimisation, we scaled conversions while lowering CPA.
              </p>
            </div>
            <div className="story">
              <div className="rail" aria-hidden="true" />
              <div className="rfill" aria-hidden="true" />
              <div className="ph rv">
                <span className="pi2">
                  <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                </span>
                <small>Phase 1</small>
                <h4>Tracking rebuilt</h4>
                <p>Conversions API and clean purchase events, so every order was attributed.</p>
              </div>
              <div className="ph rv">
                <span className="pi2">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="5" /></svg>
                </span>
                <small>Phase 2</small>
                <h4>Campaigns restructured</h4>
                <p>Meta and Google rebuilt around high-intent buyers instead of broad reach.</p>
              </div>
              <div className="ph rv">
                <span className="pi2">
                  <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /></svg>
                </span>
                <small>Phase 3</small>
                <h4>Feed optimised</h4>
                <p>Merchant Center titles, images and attributes tuned to win shopping slots.</p>
              </div>
              <div className="ph rv">
                <span className="pi2">
                  <svg viewBox="0 0 24 24"><path d="M13 2L3 14h9l-1 8 10-12h-9z" /></svg>
                </span>
                <small>Phase 4</small>
                <h4>Weekly creative tests</h4>
                <p>New hooks every week until the winners were obvious, then scaled.</p>
              </div>
              <div className="ph result rv">
                <span className="pi2">
                  <svg viewBox="0 0 24 24"><path d="M3 17l6-6 4 4 8-8M15 7h6v6" /></svg>
                </span>
                <small>Result</small>
                <strong>₹90L+</strong>
                <p>Revenue in six months · 18x ROAS · 100+ orders a month · 15% conversion</p>
              </div>
            </div>
          </div>
        </section>

        {/* TRUST */}
        <section className="sec section-py py-6 md:py-8" id="trust">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Your Advertising Budget,<br />
                Handled Like Our Own.
              </h2>
              <p>
                We treat every client&apos;s advertising spend with absolute transparency, strict accountability and zero waste.<br />
                Weekly performance reviews and real-time dashboard reporting ensure you always stay in complete control.
              </p>
            </div>
            <div className="trust">
              <div className="tr4 rv">
                <span className="ic3">
                  <svg viewBox="0 0 24 24"><path d="M12 20V10M18 20V4M6 20v-4" /></svg>
                </span>
                <b>Results shown in full</b>
                <p>Real client numbers with the client&apos;s name on them. No vague &quot;up to&quot; claims.</p>
              </div>
              <div className="tr4 rv">
                <span className="ic3">
                  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M3 10h18M8 2v4M16 2v4" /></svg>
                </span>
                <b>Weekly calls, monthly reports</b>
                <p>Spend, ROAS or CPL, revenue, and what we&apos;re testing next. In plain language.</p>
              </div>
              <div className="tr4 rv">
                <span className="ic3">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
                </span>
                <b>UK entity, India delivery</b>
                <p>Contract with WarrgyizMorsch UK Ltd. Your campaigns run with our senior team in Udaipur.</p>
              </div>
              <div className="tr4 rv">
                <span className="ic3">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>
                </span>
                <b>Qualified leads, not vanity numbers</b>
                <p>We report on buyers and revenue, not impressions and likes.</p>
              </div>
            </div>
            <div className="badges" aria-label="Certification placeholders">
              <span>[Meta Business Partner badge, if certified]</span>
              <span>[Google Partner badge, if certified]</span>
              <span>[Review rating, e.g. Google or Clutch]</span>
            </div>
            <div className="quotes">
              <figure className="qt rv" style={{ margin: 0 }}>
                <blockquote>“[Add a real client quote about results and working with the team.]”</blockquote>
                <figcaption className="who">
                  <span className="av">OL</span>
                  <div><b>[Client name]</b><br /><span>[Role] · Oltao</span></div>
                </figcaption>
              </figure>
              <figure className="qt rv" style={{ margin: 0 }}>
                <blockquote>“[Add a real client quote about lead quality or reporting.]”</blockquote>
                <figcaption className="who">
                  <span className="av">IS</span>
                  <div><b>[Client name]</b><br /><span>[Role] · Iron Street</span></div>
                </figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* FIT QUIZ */}
        <section className="sec alt section-py py-6 md:py-8" id="fit">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Are We the Right Growth Partner?<br />
                Find Out in Ten Seconds.
              </h2>
              <p>
                We work best with ambitious UK businesses ready to scale with predictable unit economics and quality leads.<br />
                Answer three quick questions below to discover how our tailored marketing approach fits your goals.
              </p>
            </div>
            <div className="quiz rv">
              <form className="qbox" id="quiz" onSubmit={(e) => e.preventDefault()}>
                <fieldset className="qq">
                  <legend><i>1</i>Monthly ad budget?</legend>
                  <div className="opts">
                    <label className="opt">
                      <input
                        type="radio"
                        name="qb"
                        checked={quizAnswers.qb === 0}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qb: 0 }))}
                      />
                      <span>Under ₹50K</span>
                    </label>
                    <label className="opt">
                      <input
                        type="radio"
                        name="qb"
                        checked={quizAnswers.qb === 1}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qb: 1 }))}
                      />
                      <span>₹50K – ₹1L</span>
                    </label>
                    <label className="opt">
                      <input
                        type="radio"
                        name="qb"
                        checked={quizAnswers.qb === 2}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qb: 2 }))}
                      />
                      <span>₹1L or more</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="qq">
                  <legend><i>2</i>Is the product already selling?</legend>
                  <div className="opts">
                    <label className="opt">
                      <input
                        type="radio"
                        name="qp"
                        checked={quizAnswers.qp === 2}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qp: 2 }))}
                      />
                      <span>Yes, steady sales</span>
                    </label>
                    <label className="opt">
                      <input
                        type="radio"
                        name="qp"
                        checked={quizAnswers.qp === 1}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qp: 1 }))}
                      />
                      <span>Some sales</span>
                    </label>
                    <label className="opt">
                      <input
                        type="radio"
                        name="qp"
                        checked={quizAnswers.qp === 0}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qp: 0 }))}
                      />
                      <span>Still testing the idea</span>
                    </label>
                  </div>
                </fieldset>
                <fieldset className="qq">
                  <legend><i>3</i>What do you want to grow?</legend>
                  <div className="opts">
                    <label className="opt">
                      <input
                        type="radio"
                        name="qg"
                        checked={quizAnswers.qg === 2}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qg: 2 }))}
                      />
                      <span>Revenue or qualified leads</span>
                    </label>
                    <label className="opt">
                      <input
                        type="radio"
                        name="qg"
                        checked={quizAnswers.qg === 0}
                        onChange={() => setQuizAnswers((p) => ({ ...p, qg: 0 }))}
                      />
                      <span>Likes and followers</span>
                    </label>
                  </div>
                </fieldset>
              </form>

              <div
                className={`qres ${doneCount === 3 && score >= 3 && !isNoFit ? 'good' : ''}`}
                id="qres"
                aria-live="polite"
              >
                <span className="big-ic">
                  <svg viewBox="0 0 24 24" id="qIcon">
                    {doneCount < 3 && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16h.01" />
                      </>
                    )}
                    {doneCount === 3 && isNoFit && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16h.01" />
                      </>
                    )}
                    {doneCount === 3 && !isNoFit && score >= 5 && (
                      <polyline points="20 6 9 17 4 12" />
                    )}
                    {doneCount === 3 && !isNoFit && score >= 3 && score < 5 && (
                      <path d="M3 17l6-6 4 4 8-8M15 7h6v6" />
                    )}
                    {doneCount === 3 && !isNoFit && score < 3 && (
                      <>
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 8v5M12 16h.01" />
                      </>
                    )}
                  </svg>
                </span>
                <div className="meter">
                  <i
                    id="qMeter"
                    style={{
                      width: doneCount === 3 ? `${Math.round((score / 6) * 100)}%` : `${doneCount * 12}%`,
                    }}
                  />
                </div>
                <h3 id="qTitle">
                  {doneCount < 3
                    ? `${3 - doneCount} more to go`
                    : isNoFit
                    ? 'Probably not us, for now'
                    : score >= 5
                    ? 'Strong fit. Let’s talk.'
                    : score >= 3
                    ? 'Possible fit'
                    : 'A little early'}
                </h3>
                <p id="qText">
                  {doneCount < 3
                    ? 'Keep going. Your answer appears here.'
                    : isNoFit
                    ? 'We report on revenue and qualified leads, not likes. If followers are the main goal, a social-first agency will serve you better.'
                    : score >= 5
                    ? 'You sound like the brands we grow fastest. Book a free audit and we’ll show you the three biggest fixes in your account.'
                    : score >= 3
                    ? 'Worth a conversation. We’ll review your numbers and tell you honestly whether to start now or build up first.'
                    : 'Most brands we work with spend ₹1L+ a month with a product that already sells. Book a call anyway and we’ll suggest the best place to start.'}
                </p>
                {doneCount === 3 && !isNoFit && (
                  <button
                    type="button"
                    className="btn btn-white"
                    id="qBtn"
                    onClick={() => handleOpenLead('Performance Marketing')}
                  >
                    Book my free audit{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            <div className="two" style={{ marginTop: '20px' }}>
              <div className="fitc rv" style={{ gridColumn: '1/-1' }}>
                <h3>Included in every retainer</h3>
                <ul style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', columnGap: '28px' }}>
                  <li>Full account audit and growth strategy</li>
                  <li>Campaign build and restructuring</li>
                  <li>Conversions API, GA4 and event setup</li>
                  <li>Weekly creative testing (static and video)</li>
                  <li>Landing page and CRO recommendations</li>
                  <li>Lead-form qualification and CRM sync</li>
                  <li>Weekly optimisation call</li>
                  <li>Monthly revenue report</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="sec section-py py-6 md:py-8" id="faq">
          <div className="wrap">
            <div className="head rv">
              <h2>
                Frequently Asked<br />
                Questions.
              </h2>
              <p>
                Everything you need to know about our performance marketing services, reporting and campaign management.<br />
                Have more questions or need a tailored strategy? Contact our UK performance marketing team today.
              </p>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  What is performance marketing, and how does it work?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Performance marketing is a results-focused approach to digital advertising where campaigns are measured against specific goals, such as leads, sales or conversions. It uses platforms like Google Ads and Meta Ads to reach potential customers, track performance and continuously optimise advertising spend for better returns.
                </p>
              </details>
              <details>
                <summary>
                  Why should I hire a performance marketing agency in the UK?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Working with a performance marketing agency in the UK gives your business access to specialist advertising expertise, strategic campaign management and performance tracking. Growthore helps businesses improve Google and Meta Ads campaigns, reduce wasted spend and focus their marketing budget on measurable business objectives.
                </p>
              </details>
              <details>
                <summary>
                  How much does performance marketing cost in the UK?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Performance marketing costs vary depending on your industry, competition, advertising budget and campaign objectives. Businesses typically pay for advertising spend alongside agency management fees. At Growthore, we focus on recommending an advertising approach that matches your business goals and available budget.
                </p>
              </details>
              <details>
                <summary>
                  Which is better for my business: Google Ads or Meta Ads?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Google Ads helps you reach people actively searching for products or services, while Meta Ads can build awareness and generate interest through Facebook and Instagram. The right platform depends on your audience and business goals. Many businesses benefit from combining both within one advertising strategy.
                </p>
              </details>
              <details>
                <summary>
                  What does a performance marketing consultant do?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  A performance marketing consultant reviews your advertising strategy, identifies opportunities and recommends ways to improve campaign results. This may include audience targeting, budget allocation, conversion tracking and creative testing. Growthore combines strategic guidance with hands-on campaign management to support your business goals.
                </p>
              </details>
              <details>
                <summary>
                  How does Growthore measure performance marketing success?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  We measure campaign performance using relevant metrics such as cost per lead, conversion rate, customer acquisition cost and return on ad spend (ROAS). Our focus is on understanding which campaigns contribute to your business goals and using those insights to improve advertising decisions.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="fcta section-py py-6 md:py-8" id="audit">
          <div className="halo" aria-hidden="true" />
          <div className="wrap in">
           
            <h2>
              Find the money your<br />
              <span className="outline">ads are leaving.</span>
            </h2>
            <p>
              We review your Meta and Google accounts, tracking and funnel, then walk you through the biggest fixes on a 30-minute call. Free, with no obligation.
            </p>
            <button
              type="button"
              className="btn btn-white"
              onClick={() => handleOpenLead('Performance Marketing')}
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
