'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
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
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/#services">Services</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>Performance Marketing</span>
            </nav>
            <h1 className="bh1">
              <span className="kicker">
                <span className="live" />
                Performance Marketing Agency · Meta &amp; Google Ads
              </span>
              <br />
              <span className="bl">
                <span className="w" style={{ '--i': 0 }}>Ad spend</span>
                <span className="pills" aria-hidden="true">
                  <span className="pl">
                    <svg viewBox="0 0 24 24">
                      <rect className="gb" x="3" y="10" width="4.5" height="11" rx="1.5" fill="#2F6BFF" />
                      <rect className="gb" x="9.75" y="6" width="4.5" height="15" rx="1.5" fill="#5E8DFF" />
                      <rect className="gb" x="16.5" y="2" width="4.5" height="19" rx="1.5" fill="#2F6BFF" />
                    </svg>
                  </span>
                  <span className="pl">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
                      <g className="globe">
                        <circle cx="12" cy="12" r="9.5" />
                        <path d="M2.5 12h19M12 2.5c3 3 3 16 0 19M12 2.5c-3 3-3 16 0 19" />
                      </g>
                    </svg>
                  </span>
                  <span className="pl">
                    <i className="rip" />
                    <svg viewBox="0 0 24 24">
                      <path
                        className="cur"
                        d="M5 3l14 7-6 1.6L10.5 18z"
                        fill="#9DBBFF"
                        stroke="#fff"
                        strokeWidth="1.2"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </span>
                <span className="w" style={{ '--i': 1 }}>that</span>
              </span>
              <span className="bl">
                <span className="w" style={{ '--i': 2 }}>pays for</span>
                <span className="w outline" style={{ '--i': 3 }}>itself</span>
              </span>
            </h1>
            <p className="bh-sub">
              We&apos;re a <strong>performance marketing agency</strong> for brands that measure success in revenue. Meta and
              Google Ads planned, run and optimised around one number: profitable growth.
            </p>
            <div className="bh-ctas">
              <button
                type="button"
                className="btn btn-white"
                onClick={() => handleOpenLead('Performance Marketing')}
              >
                Get a free ad account audit{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
              <a href="#ads" className="btn btn-ghost">
                See ads in action{' '}
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
              For brands investing ₹1L+/month in ads, in India and the UK
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
        <section className="sec alt" id="live">
          <div className="wrap live-grid">
            <div className="rv">
              <span className="eyebrow">Inside a campaign</span>
              <h2>Watch spend turn into revenue.</h2>
              <p className="muted" style={{ fontSize: 'var(--step-1)' }}>
                This is what we watch every day: every rupee of spend, every order it brings back, and the ROAS in between.
                When a channel slips, we see it the same day.
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
        <section className="proof">
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
        <section className="sec" id="niches">
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
              <div>
                <span className="eyebrow">Industries we grow</span>
                <h2>We know what sells in your category.</h2>
              </div>
              <div className="r">
                <p>Every niche buys differently. These are the playbooks we&apos;ve built running real budgets for real brands.</p>
              </div>
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
        <section className="sec" id="ads">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Ads in action</span>
                <h2>Built to stop the scroll. Tuned to sell.</h2>
              </div>
              <div className="r">
                <p>Every format has one job. Pick one to watch how it moves a buyer from first look to order or lead.</p>
              </div>
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
        <section className="sec alt" id="leaks">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Where the money goes</span>
                <h2>Most ad accounts leak money in three places.</h2>
              </div>
              <div className="r">
                <p>Drag the handle to compare a typical account with the way we rebuild it.</p>
              </div>
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
        <section className="sec" id="calc">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">ROAS calculator</span>
                <h2>What would a better ROAS be worth to you?</h2>
              </div>
              <div className="r">
                <p>Move the sliders to your own numbers. Revenue is simply ad spend multiplied by ROAS.</p>
              </div>
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
        <section className="sec alt" id="framework">
          <div className="wrap fw">
            <div className="fw-stick">
              <span className="eyebrow">The growth engine</span>
              <h2>Four steps. Repeated every month.</h2>
              <p className="muted">
                The same system that took Oltao from ₹1L to ₹90L+, applied to your account, your margins and your buyers.
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
        <section className="sec" id="channels" style={{ overflow: 'hidden' }}>
          <div className="wrap orb-grid">
            <div className="rv">
              <span className="eyebrow">One team, every channel</span>
              <h2>Every channel your buyers use. Run by one team.</h2>
              <p className="muted" style={{ fontSize: 'var(--step-1)' }}>
                We pick channels by where your buyers are and what your margins allow, then run them together so every rupee reports into the same number.
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
                Plan my channel mix{' '}
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

        {/* OLTAO STORY */}
        <section className="sec alt" id="case">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Case study · Oltao</span>
                <h2>Six months, one growth engine.</h2>
              </div>
              <div className="r">
                <p>A premium fan and air-purifier brand with a strong product and flat online sales. Here&apos;s what we changed.</p>
                <button
                  type="button"
                  className="btn-line"
                  onClick={() => handleOpenLead('Performance Marketing')}
                >
                  Get the same audit{' '}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
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
        <section className="sec" id="trust">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Why brands trust us</span>
                <h2>Your budget, handled like our own.</h2>
              </div>
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
        <section className="sec alt" id="fit">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Is this a fit?</span>
                <h2>Are we a fit? Find out in ten seconds.</h2>
              </div>
              <div className="r">
                <p>We do our best work with established brands ready to scale. Being upfront saves us both a call.</p>
              </div>
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
        <section className="sec" id="faq">
          <div className="wrap">
            <div className="head rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <span className="eyebrow">FAQ</span>
                <h2 style={{ maxWidth: 'none' }}>Questions founders ask us.</h2>
              </div>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  What ad budget do I need to work with you?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  We work best with brands spending ₹1L or more a month on ads, or ready to get there. Below that, tests take too long to give reliable answers, so we&apos;ll tell you honestly if it&apos;s too early.
                </p>
              </details>
              <details>
                <summary>
                  How soon will we see results?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Most accounts show a clear signal within 30 to 45 days, once tracking is fixed and the first creative tests have run. Scaling usually starts in month two or three.
                </p>
              </details>
              <details>
                <summary>
                  Do you work with brands in the UK?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. You can contract with WarrgyizMorsch UK Ltd, and your campaigns are run by our team in Udaipur, India.
                </p>
              </details>
              <details>
                <summary>
                  Who owns the ad accounts and the data?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  <em>[Add your policy here. Most brands expect to own their ad accounts, pixels and data, with the agency given partner access.]</em>
                </p>
              </details>
              <details>
                <summary>
                  How do you report on performance?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  A weekly optimisation call and a monthly revenue report covering spend, ROAS or CPL, revenue, and what we&apos;re testing next.
                </p>
              </details>
              <details>
                <summary>
                  Is there a minimum contract length?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  <em>[Add your contract terms here.]</em>
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="fcta" id="audit">
          <div className="halo" aria-hidden="true" />
          <div className="wrap in">
            <span className="eyebrow">Free ad account audit</span>
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
