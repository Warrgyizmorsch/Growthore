'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import './ai-seo.css';
import Marquee from '@/components/Marquee';

const SAMPLE_QUESTIONS = [
  {
    q: 'Which ceiling fan uses the least electricity?',
    a: 'For the lowest power use, choose a BLDC ceiling fan with a 5-star energy rating. {B} is one of the brands most often recommended here, praised for quiet motors, real energy savings and clear specs.',
    s: ["review site", "buyer's guide"]
  },
  {
    q: 'Who is the best study abroad consultant for UK admissions?',
    a: 'Choose a consultant with direct UK university partnerships and visa support. {B} is frequently mentioned for honest eligibility checks, scholarship guidance and a clear step-by-step process.',
    s: ['student forum', 'education news']
  },
  {
    q: 'Which metal study table brands are the most durable?',
    a: 'Look for powder-coated steel frames and a solid top. {B} comes up often for sturdy builds, clean designs and strong customer reviews.',
    s: ['home decor blog', 'review site']
  },
  {
    q: 'Who are reliable crusher plant manufacturers in India?',
    a: 'Established manufacturers offer jaw, cone and impact crushers with on-site support. {B} is often cited for complete crushing and screening plants and dependable after-sales service.',
    s: ['industry directory', 'trade portal']
  },
  {
    q: 'Where do architects buy premium tiles in Udaipur?',
    a: 'Architects usually shortlist showrooms with large-format and designer ranges. {B} is frequently recommended for its curated collection, sample library and support for project orders.',
    s: ['architecture forum', 'local listings']
  }
];

const SIGNALS = [
  {
    t: 'Entity & schema',
    d: 'AI needs to know exactly who you are. We make your brand facts consistent everywhere they appear.',
    l: [
      'Organization, product and FAQ schema',
      'Matching details across your site, Google Business Profile and directories',
      'A clear About page and brand facts AI can lift'
    ]
  },
  {
    t: 'Topical authority',
    d: 'Brands that cover their category end to end get treated as the expert.',
    l: [
      'Topic clusters around every buyer question',
      'Internal links that connect related pages',
      'Category and comparison pages that answer intent'
    ]
  },
  {
    t: 'Quotable content',
    d: 'AI lifts short, clear, factual passages. We write pages it can quote.',
    l: [
      'Direct answers in the first lines',
      'Specs, comparisons and tables',
      'FAQs written the way buyers ask'
    ]
  },
  {
    t: 'Mentions & citations',
    d: 'AI trusts what other trusted sites say about you.',
    l: [
      'Coverage on review sites and industry lists',
      'Digital PR and expert quotes',
      'Forum and community presence where buyers ask'
    ]
  },
  {
    t: 'Technical SEO',
    d: 'If a page can’t be crawled, it can’t be cited.',
    l: [
      'Fast, mobile-friendly, indexable pages',
      'Clean site structure and canonical URLs',
      'Crawler access settings, including AI crawlers you choose to allow'
    ]
  },
  {
    t: 'Reviews & reputation',
    d: 'Ratings and real customer voices shape what AI says about your brand.',
    l: [
      'Review generation on the platforms that matter',
      'Responses that show you care',
      'Customer stories on your own site'
    ]
  }
];

const READINESS_ITEMS = [
  { id: 'sc-schema', p: 15, title: 'Your site has schema markup', sub: 'Organization, product or FAQ structured data', fix: 'Add Organization, Product and FAQ schema to key pages' },
  { id: 'sc-nap', p: 10, title: 'Your brand details match everywhere', sub: 'Name, address and phone on site, Google and directories', fix: 'Make your name, address and phone identical across the web' },
  { id: 'sc-answers', p: 15, title: 'You have pages that answer buyer questions', sub: 'FAQs, buying guides, comparisons', fix: 'Publish answer-first guides for your top buyer questions' },
  { id: 'sc-reviews', p: 10, title: 'You have 50+ recent Google reviews', sub: 'Ratings buyers and AI can see', fix: 'Start a steady review request flow after every sale' },
  { id: 'sc-lists', p: 15, title: 'Review sites or industry lists mention you', sub: 'Round-ups, directories, "best of" articles', fix: 'Get listed in the top round-ups for your category' },
  { id: 'sc-forums', p: 10, title: 'People talk about you on forums or social', sub: 'Reddit, Quora, community groups', fix: 'Seed honest customer stories in the communities buyers use' },
  { id: 'sc-tech', p: 15, title: 'Your site is fast and fully indexed', sub: 'Key pages load quickly and show in Google', fix: 'Fix speed and indexing on your money pages' },
  { id: 'sc-fresh', p: 10, title: 'You publish expert content every month', sub: 'New articles, data or updates', fix: 'Ship one expert piece a month that others will cite' }
];

export default function AiSeoPage() {
  const [brandInput, setBrandInput] = useState('Your Brand');
  const [queryInput, setQueryInput] = useState('');
  const [activeChip, setActiveChip] = useState(0);
  const [askedEcho, setAskedEcho] = useState('Which ceiling fan uses the least electricity?');
  const [streamText, setStreamText] = useState(
    'For the lowest power use, choose a BLDC ceiling fan with a 5-star energy rating. {B} is one of the brands most often recommended here, praised for quiet motors, real energy savings and clear specs.'
  );
  const [streamSources, setStreamSources] = useState(["review site", "buyer's guide"]);
  const [isTyping, setIsTyping] = useState(false);

  // Shift Before/After Toggle
  const [withAiSeo, setWithAiSeo] = useState(false);

  // Source Tracing
  const [activeTrace, setActiveTrace] = useState(0);
  const traceRef = useRef(null);
  const [traceCoords, setTraceCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0, d: '', col: '#6C9BFF' });

  // 6 Signals
  const [activeSignal, setActiveSignal] = useState(0);

  // Readiness Score
  const [checkedItems, setCheckedItems] = useState({});

  // Checker form
  const [checkerBrand, setCheckerBrand] = useState('');
  const [checkerCat, setCheckerCat] = useState('');
  const [checkerMkt, setCheckerMkt] = useState('India');
  const [checkerSubmitted, setCheckerSubmitted] = useState(false);
  const [engineReady, setEngineReady] = useState(false);

  const canvasRef = useRef(null);
  const heroRef = useRef(null);
  const orbRef = useRef(null);

  const handleOpenLead = (service = 'AI SEO') => {
    if (typeof window !== 'undefined' && window.openLeadModal) {
      window.openLeadModal(service);
    }
  };

  // Particle flow into Orb
  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = heroRef.current;
    const orb = orbRef.current;
    if (!canvas || !hero || !orb) return;

    const ctx = canvas.getContext('2d');
    const WORDS = ['reviews','specs','price','FAQ','forum','news','ratings','guide','compare','schema','best','near me','warranty','yourbrand.com','Reddit','lists','how to','vs','trusted','service'];
    const COLS = ['108,155,255', '108,155,255', '124,196,255', '157,187,255'];
    let W = 0, H = 0, ox = 0, oy = 0, parts = [], running = true, animId;

    function resize() {
      const d = Math.min(window.devicePixelRatio || 1, 2);
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * d;
      canvas.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);

      const hr = hero.getBoundingClientRect();
      const r = orb.getBoundingClientRect();
      ox = r.left - hr.left + r.width / 2;
      oy = r.top - hr.top + r.height / 2;

      const n = Math.round(Math.min(60, Math.max(22, W / 20)));
      parts = Array.from({ length: n }, () => mk(Math.random()));
    }

    function mk(t) {
      const side = Math.floor(Math.random() * 4);
      let sx, sy;
      if (side === 0) { sx = Math.random() * W; sy = -20; }
      else if (side === 1) { sx = W + 20; sy = Math.random() * H * 0.8; }
      else if (side === 2) { sx = Math.random() * W; sy = H * 0.9; }
      else { sx = -20; sy = Math.random() * H * 0.8; }

      const mx = (sx + ox) / 2, my = (sy + oy) / 2, dx = oy - sy, dy = sx - ox, k = (Math.random() - 0.5) * 0.6;
      return {
        sx, sy, c1x: mx + dx * k, c1y: my + dy * k,
        t: t || 0,
        v: 0.0016 + Math.random() * 0.0022,
        w: Math.random() < 0.45 ? WORDS[Math.floor(Math.random() * WORDS.length)] : null,
        col: COLS[Math.floor(Math.random() * COLS.length)],
        s: 1 + Math.random() * 1.6
      };
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      for (const p of parts) {
        p.t += p.v;
        if (p.t >= 1) {
          Object.assign(p, mk(0));
          continue;
        }
        const t = p.t, u = 1 - t;
        const x = u * u * p.sx + 2 * u * t * p.c1x + t * t * ox;
        const y = u * u * p.sy + 2 * u * t * p.c1y + t * t * oy;
        const a = Math.min(1, t * 4) * Math.min(1, (1 - t) * 3.2) * 0.75;

        if (p.w) {
          ctx.font = `600 ${Math.round(11 + 4 * (1 - t))}px "Plus Jakarta Sans", system-ui, sans-serif`;
          ctx.fillStyle = `rgba(${p.col},${a})`;
          ctx.fillText(p.w, x, y);
        } else {
          ctx.beginPath();
          ctx.arc(x, y, p.s * (1 - t * 0.6), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${p.col},${a})`;
          ctx.shadowColor = `rgba(${p.col},1)`;
          ctx.shadowBlur = 8;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      }
      if (running) animId = requestAnimationFrame(frame);
    }

    resize();
    window.addEventListener('resize', resize);
    animId = requestAnimationFrame(frame);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Update dynamic trace connector
  useEffect(() => {
    function updateTrace() {
      if (typeof window === 'undefined' || window.innerWidth < 900) {
        setTraceCoords(prev => ({ ...prev, d: '' }));
        return;
      }
      const container = traceRef.current;
      if (!container) return;

      const seg = container.querySelector(`.seg[data-s="${activeTrace}"]`);
      const src = container.querySelector(`.src[data-s="${activeTrace}"]`);
      const tcard = container.querySelector('.tcard');
      if (!seg || !src || !tcard) return;

      const cr = container.getBoundingClientRect();
      const cardRect = tcard.getBoundingClientRect();
      const segRects = seg.getClientRects();
      const lastSeg = segRects[segRects.length - 1] || seg.getBoundingClientRect();
      const srcRect = src.getBoundingClientRect();

      const x1 = cardRect.right - cr.left;
      const y1 = lastSeg.top + lastSeg.height / 2 - cr.top;
      const x2 = srcRect.left - cr.left - 6;
      const y2 = srcRect.top + srcRect.height / 2 - cr.top;
      const mx = (x1 + x2) / 2;
      const col = window.getComputedStyle(seg).getPropertyValue('--c').trim() || '#6C9BFF';

      setTraceCoords({
        x1, y1, x2, y2,
        d: `M${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`,
        col
      });
    }

    updateTrace();
    window.addEventListener('resize', updateTrace);
    return () => window.removeEventListener('resize', updateTrace);
  }, [activeTrace]);

  // Score calculation
  const totalScore = READINESS_ITEMS.reduce((sum, item) => {
    return sum + (checkedItems[item.id] ? item.p : 0);
  }, 0);

  const missingFixes = READINESS_ITEMS.filter(item => !checkedItems[item.id])
    .sort((a, b) => b.p - a.p)
    .slice(0, 3);

  const scoreLevel = totalScore < 40 ? 0 : totalScore < 75 ? 1 : 2;
  const scoreLabels = ['Mostly invisible to AI', 'Partly visible to AI', 'AI-ready'];

  // Handle Query Chip Click
  const handleSelectChip = (idx) => {
    setActiveChip(idx);
    const item = SAMPLE_QUESTIONS[idx];
    setAskedEcho(item.q);
    setQueryInput(item.q);
    setStreamText(item.a);
    setStreamSources(item.s);
  };

  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (!queryInput.trim()) return;
    setAskedEcho(queryInput);
    setStreamText(
      `Based on reviews, product details and expert guides, {B} is one of the names that comes up most for this. Buyers mention clear information, strong reviews and dependable quality.`
    );
    setStreamSources(['review site', "buyer's guide"]);
  };

  const handleCheckerSubmit = (e) => {
    e.preventDefault();
    if (!checkerBrand.trim() || !checkerCat.trim()) return;
    setCheckerSubmitted(true);
    setTimeout(() => {
      setEngineReady(true);
    }, 1200);
  };

  const currentBrand = brandInput.trim() || 'Your Brand';
  const brandSlug = (currentBrand.toLowerCase().replace(/[^a-z0-9]+/g, '') || 'yourbrand') + '.com';

  return (
    <div className="ai-seo-page">
      {/* HERO SECTION */}
      <section className="hx" id="hero" ref={heroRef}>
        <div className="hero-bg" aria-hidden="true">
          <div className="gridlines"></div>
          <span className="blob b1"></span>
          <span className="blob b2"></span>
        </div>
        <canvas id="flow" ref={canvasRef} aria-hidden="true"></canvas>
        <div className="orb" id="orb" ref={orbRef} aria-hidden="true"></div>

        <div className="wrap">
          <nav className="crumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/#services">Services</Link>
            <span>/</span>
            <span style={{ color: '#fff' }}>AI SEO</span>
          </nav>

          <span className="bx-kick">
            <span className="live"></span>AI SEO Agency · GEO &amp; AEO
          </span>

          <h1 className="bx1">
            <span className="line"><span className="w">Be the brand</span></span>
            <span className="line">
              <span className="w outline red">AI</span>{' '}
              <span className="w grad-t">recommends</span>
            </span>
          </h1>

          <p className="bx-sub">
            ChatGPT, Gemini, Perplexity and Google&apos;s AI Overviews read the whole web and give your buyer{' '}
            <strong>one answer</strong>. As an AI SEO agency, we make sure your brand is in it.
          </p>

          {/* Ask Form Interactive Simulation */}
          <form className="ask" id="askForm" role="search" aria-label="Try an AI answer" onSubmit={handleAskSubmit}>
            <span className="bf">
              <small>Brand</small>
              <input
                id="hb"
                value={brandInput}
                onChange={(e) => setBrandInput(e.target.value)}
                maxLength={30}
                aria-label="Your brand name"
                autoComplete="organization"
              />
            </span>
            <input
              id="hq"
              value={queryInput}
              onChange={(e) => setQueryInput(e.target.value)}
              placeholder="Ask what your buyer would ask…"
              maxLength={120}
              aria-label="Buyer question"
            />
            <button className="go" type="submit" aria-label="Ask">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>

          {/* Sample Questions Chips */}
          <div className="qchips" id="qchips" role="group" aria-label="Sample questions">
            {SAMPLE_QUESTIONS.map((item, idx) => (
              <button
                key={idx}
                type="button"
                className={`qc ${activeChip === idx ? 'on' : ''}`}
                onClick={() => handleSelectChip(idx)}
              >
                {item.q}
              </button>
            ))}
          </div>

          {/* Interactive Answer Box */}
          <div className="hans" aria-live="polite">
            <div className="hans-top">
              <div className="eps" id="eps">
                <span className="ep on"><i className="eng-dot e1"></i>ChatGPT</span>
                <span className="ep on"><i className="eng-dot e3"></i>Gemini</span>
                <span className="ep on"><i className="eng-dot e5"></i>Perplexity</span>
                <span className="ep on"><i className="eng-dot e4"></i>AI Overviews</span>
              </div>
              <span className="tag-demo">Simulated preview of the goal</span>
            </div>
            <p className="hq-echo" id="hecho">
              Asked: <b>{askedEcho}</b>
            </p>
            <p className="stream" id="hstream">
              {streamText.split('{B}').map((chunk, i, arr) => (
                <span key={i}>
                  {chunk}
                  {i < arr.length - 1 && <mark>{currentBrand}</mark>}
                </span>
              ))}
            </p>
            <div className="hsrc" id="hsrc">
              Sources <span className="me">{brandSlug}</span>
              {streamSources.map((s, idx) => (
                <span key={idx}>{s}</span>
              ))}
            </div>
          </div>

          <div className="hx-ctas">
            <button
              onClick={() => handleOpenLead('AI SEO')}
              className="btn btn-white"
            >
              Get a free AI visibility check{' '}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#score" className="btn btn-ghost">Score my AI readiness</a>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <Marquee />

      {/* PROMPTS MARQUEE */}
      <section className="prompts" aria-label="Questions buyers ask AI">
        <p className="lbl"><span className="eyebrow">What your buyers are asking AI right now</span></p>
        <div className="mask">
          <div className="prow" aria-hidden="true">
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Most energy-efficient ceiling fan in India?</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Best metal study table for a home office</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Study abroad consultant for UK admissions near me</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Which inverter battery lasts longest?</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Crusher plant manufacturers in Rajasthan</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Most energy-efficient ceiling fan in India?</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Best metal study table for a home office</span>
          </div>
          <div className="prow rev" aria-hidden="true">
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Kitchen sink brands that don&apos;t rust</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Tile showrooms for architects in Udaipur</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>How to start a SIP as a beginner</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Best assignment help service in the UK</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Smart LED lights for Diwali decoration</span>
            <span className="pp"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>Kitchen sink brands that don&apos;t rust</span>
          </div>
        </div>
      </section>

      {/* SHIFT: BEFORE / AFTER */}
      <section className="sec alt" id="shift">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">What&apos;s changed</span>
              <h2>Search used to be ten links. Now it&apos;s one answer.</h2>
            </div>
            <div className="r">
              <p>When AI writes the answer, there&apos;s no page two. You&apos;re either named in it or you&apos;re invisible.</p>
            </div>
          </div>

          <div className="shift">
            <div className="panel">
              <small>Then · classic search</small>
              <h3>Ten blue links</h3>
              <div className="serp" aria-hidden="true">
                <div className="sr"><i></i><i style={{ width: '92%' }}></i></div>
                <div className="sr"><i></i><i style={{ width: '80%' }}></i></div>
                <div className="sr you"><span>{brandSlug} · position 3</span><i style={{ width: '86%' }}></i></div>
                <div className="sr"><i></i><i style={{ width: '75%' }}></i></div>
                <div className="sr"><i></i><i style={{ width: '88%' }}></i></div>
              </div>
              <p className="muted" style={{ fontSize: '14.5px' }}>Rank on page one and you got a fair share of clicks.</p>
            </div>

            <span className="arrowmid" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </span>

            <div className={`panel now ${withAiSeo ? 'good' : 'bad'}`} id="now">
              <small>Now · AI answers</small>
              <h3>One answer</h3>
              <div className="toggle" role="group" aria-label="Compare">
                <button
                  type="button"
                  className={`r ${!withAiSeo ? 'on' : ''}`}
                  onClick={() => setWithAiSeo(false)}
                >
                  Without AI SEO
                </button>
                <button
                  type="button"
                  className={`b ${withAiSeo ? 'on' : ''}`}
                  onClick={() => setWithAiSeo(true)}
                >
                  With AI SEO
                </button>
              </div>

              <div className="abox" aria-live="polite">
                {!withAiSeo ? (
                  <div className="st b">
                    The top choices are <b>Competitor A</b> and <b>Competitor B</b>, both known for strong reviews and clear product information.
                    <div className="chips3" style={{ marginTop: '10px' }}>
                      <span>competitor-a.com</span>
                      <span>competitor-b.com</span>
                      <span>review site</span>
                    </div>
                  </div>
                ) : (
                  <div className="st g">
                    <b>{currentBrand}</b> is a top choice, known for strong reviews and clear product information, along with Competitor A.
                    <div className="chips3" style={{ marginTop: '10px' }}>
                      <span className="me">{brandSlug}</span>
                      <span>competitor-a.com</span>
                      <span>review site</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="verdict">
                <i>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
                    {withAiSeo ? (
                      <path d="M20 6L9 17l-5-5" />
                    ) : (
                      <path d="M18 6L6 18M6 6l12 12" />
                    )}
                  </svg>
                </i>
                <span>
                  {withAiSeo
                    ? 'Your brand is named and cited as a source.'
                    : "Your brand isn't mentioned. Buyers never see you."}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SOURCE TRACING */}
      <section className="sec" id="sources">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">Where AI gets its answer</span>
              <h2>Every line of an AI answer comes from somewhere.</h2>
            </div>
            <div className="r">
              <p>Hover or tap any part of the answer to see the source behind it. Each source is a signal we can strengthen for you.</p>
            </div>
          </div>

          <div className="trace" id="trace" ref={traceRef}>
            <svg className="tline" aria-hidden="true">
              {traceCoords.d && <path d={traceCoords.d} style={{ stroke: traceCoords.col }} />}
              {traceCoords.d && <circle cx={traceCoords.x1} cy={traceCoords.y1} r="5" style={{ fill: traceCoords.col }} />}
              {traceCoords.d && <circle cx={traceCoords.x2} cy={traceCoords.y2} r="5" style={{ fill: traceCoords.col }} />}
            </svg>

            <div className="tcard">
              <div className="q-row">Which ceiling fan uses the least electricity?</div>
              <div className="a-head">
                <b>
                  <svg viewBox="0 0 24 24" fill="#fff">
                    <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z"/>
                  </svg>
                </b>
                <span>AI answer</span>
                <span className="tag-demo" style={{ marginLeft: 'auto' }}>Illustrative</span>
              </div>
              <p className="tans">
                <span
                  className={`seg ${activeTrace === 0 ? 'on' : ''}`}
                  tabIndex={0}
                  data-s="0"
                  style={{ '--c': '#6C9BFF' }}
                  onClick={() => setActiveTrace(0)}
                  onMouseEnter={() => setActiveTrace(0)}
                >
                  {currentBrand} makes BLDC ceiling fans rated for very low power use,
                </span>{' '}
                <span
                  className={`seg ${activeTrace === 1 ? 'on' : ''}`}
                  tabIndex={0}
                  data-s="1"
                  style={{ '--c': '#6C9BFF' }}
                  onClick={() => setActiveTrace(1)}
                  onMouseEnter={() => setActiveTrace(1)}
                >
                  and buyers rate them highly for quiet running.
                </span>{' '}
                <span
                  className={`seg ${activeTrace === 2 ? 'on' : ''}`}
                  tabIndex={0}
                  data-s="2"
                  style={{ '--c': '#7CC4FF' }}
                  onClick={() => setActiveTrace(2)}
                  onMouseEnter={() => setActiveTrace(2)}
                >
                  Many owners say their electricity bill dropped after switching,
                </span>{' '}
                <span
                  className={`seg ${activeTrace === 3 ? 'on' : ''}`}
                  tabIndex={0}
                  data-s="3"
                  style={{ '--c': '#FFC86B' }}
                  onClick={() => setActiveTrace(3)}
                  onMouseEnter={() => setActiveTrace(3)}
                >
                  and the brand often appears in lists of the best energy-saving fans.
                </span>{' '}
                <span
                  className={`seg ${activeTrace === 4 ? 'on' : ''}`}
                  tabIndex={0}
                  data-s="4"
                  style={{ '--c': '#46E39A' }}
                  onClick={() => setActiveTrace(4)}
                  onMouseEnter={() => setActiveTrace(4)}
                >
                  Service centres are available across India.
                </span>
              </p>
              <p className="thint">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9DBBFF" strokeWidth="2" strokeLinecap="round">
                  <path d="M9 11V6a2 2 0 0 1 4 0v5M13 10a2 2 0 0 1 4 0v4a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-3l-2-3a2 2 0 0 1 3-2l2 2"/>
                </svg>
                Hover or tap a highlighted line
              </p>
            </div>

            <div className="tsrc">
              <button
                type="button"
                className={`src ${activeTrace === 0 ? 'on' : ''}`}
                data-s="0"
                style={{ '--c': '#6C9BFF' }}
                onClick={() => setActiveTrace(0)}
                onMouseEnter={() => setActiveTrace(0)}
              >
                <span className="si">
                  <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18"/></svg>
                </span>
                <span>
                  <b>Your website</b>
                  <small>Product pages, specs and schema</small>
                  <em>We add product schema, clear specs and answer-first copy.</em>
                </span>
              </button>

              <button
                type="button"
                className={`src ${activeTrace === 1 ? 'on' : ''}`}
                data-s="1"
                style={{ '--c': '#6C9BFF' }}
                onClick={() => setActiveTrace(1)}
                onMouseEnter={() => setActiveTrace(1)}
              >
                <span className="si">
                  <svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>
                </span>
                <span>
                  <b>Review sites</b>
                  <small>Ratings and written reviews</small>
                  <em>We build a steady flow of genuine reviews where buyers look.</em>
                </span>
              </button>

              <button
                type="button"
                className={`src ${activeTrace === 2 ? 'on' : ''}`}
                data-s="2"
                style={{ '--c': '#7CC4FF' }}
                onClick={() => setActiveTrace(2)}
                onMouseEnter={() => setActiveTrace(2)}
              >
                <span className="si">
                  <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                </span>
                <span>
                  <b>Forums &amp; communities</b>
                  <small>Reddit, Quora, social threads</small>
                  <em>We help real customers share their experience where questions get asked.</em>
                </span>
              </button>

              <button
                type="button"
                className={`src ${activeTrace === 3 ? 'on' : ''}`}
                data-s="3"
                style={{ '--c': '#FFC86B' }}
                onClick={() => setActiveTrace(3)}
                onMouseEnter={() => setActiveTrace(3)}
              >
                <span className="si">
                  <svg viewBox="0 0 24 24"><path d="M4 4h16v16H4z"/><path d="M8 8h8M8 12h8M8 16h5"/></svg>
                </span>
                <span>
                  <b>News &amp; &quot;best of&quot; lists</b>
                  <small>Articles, round-ups, comparisons</small>
                  <em>We pitch your brand into the lists and articles AI trusts.</em>
                </span>
              </button>

              <button
                type="button"
                className={`src ${activeTrace === 4 ? 'on' : ''}`}
                data-s="4"
                style={{ '--c': '#46E39A' }}
                onClick={() => setActiveTrace(4)}
                onMouseEnter={() => setActiveTrace(4)}
              >
                <span className="si">
                  <svg viewBox="0 0 24 24"><path d="M12 22s7-6 7-12a7 7 0 0 0-14 0c0 6 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>
                </span>
                <span>
                  <b>Business listings</b>
                  <small>Google Business Profile, directories</small>
                  <em>We make your locations and details consistent everywhere.</em>
                </span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SIX SIGNALS / KNOWLEDGE GRAPH */}
      <section className="sec" id="pillars">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">What we optimise</span>
              <h2>Six signals AI uses to decide who to recommend.</h2>
            </div>
            <div className="r">
              <p>AI engines build a picture of your brand from everywhere it appears. We strengthen every signal that feeds that picture. Tap a signal to see what we do.</p>
            </div>
          </div>

          <div className="graph-wrap">
            <div className="graph" id="graph">
              <svg viewBox="0 0 640 440" aria-hidden="true">
                <path className={`gl ${activeSignal === 0 ? 'on' : ''}`} d="M110 80 L320 220"/>
                <path className={`gl ${activeSignal === 1 ? 'on' : ''}`} d="M320 40 L320 220"/>
                <path className={`gl ${activeSignal === 2 ? 'on' : ''}`} d="M530 80 L320 220"/>
                <path className={`gl ${activeSignal === 3 ? 'on' : ''}`} d="M530 360 L320 220"/>
                <path className={`gl ${activeSignal === 4 ? 'on' : ''}`} d="M320 400 L320 220"/>
                <path className={`gl ${activeSignal === 5 ? 'on' : ''}`} d="M110 360 L320 220"/>

                <circle r="4" fill="#9DBBFF"><animateMotion dur="2.6s" repeatCount="indefinite" path="M110 80 L320 220"/></circle>
                <circle r="4" fill="#9DBBFF"><animateMotion dur="2.2s" begin=".4s" repeatCount="indefinite" path="M320 40 L320 220"/></circle>
                <circle r="4" fill="#6C9BFF"><animateMotion dur="2.8s" begin=".8s" repeatCount="indefinite" path="M530 80 L320 220"/></circle>
                <circle r="4" fill="#9DBBFF"><animateMotion dur="2.4s" begin="1.2s" repeatCount="indefinite" path="M530 360 L320 220"/></circle>
                <circle r="4" fill="#9DBBFF"><animateMotion dur="2.2s" begin="1.6s" repeatCount="indefinite" path="M320 400 L320 220"/></circle>
                <circle r="4" fill="#6C9BFF"><animateMotion dur="2.7s" begin="2s" repeatCount="indefinite" path="M110 360 L320 220"/></circle>
              </svg>

              <div className="gcore">
                <div><b>{currentBrand}</b><small>as AI sees it</small></div>
              </div>

              <button className={`gn ${activeSignal === 0 ? 'on' : ''}`} style={{ left: '17.2%', top: '18.2%' }} onClick={() => setActiveSignal(0)}>
                <i><svg viewBox="0 0 24 24"><path d="M4 7V4h16v3M9 20h6M12 4v16"/></svg></i>
                <span>Entity &amp; schema</span>
              </button>
              <button className={`gn ${activeSignal === 1 ? 'on' : ''}`} style={{ left: '50%', top: '9.1%' }} onClick={() => setActiveSignal(1)}>
                <i><svg viewBox="0 0 24 24"><path d="M12 2l9 5-9 5-9-5z"/><path d="M3 12l9 5 9-5M3 17l9 5 9-5"/></svg></i>
                <span>Topical authority</span>
              </button>
              <button className={`gn ${activeSignal === 2 ? 'on' : ''}`} style={{ left: '82.8%', top: '18.2%' }} onClick={() => setActiveSignal(2)}>
                <i><svg viewBox="0 0 24 24"><path d="M7 8h10M7 12h10M7 16h6"/><rect x="3" y="3" width="18" height="18" rx="3"/></svg></i>
                <span>Quotable content</span>
              </button>
              <button className={`gn ${activeSignal === 3 ? 'on' : ''}`} style={{ left: '82.8%', top: '81.8%' }} onClick={() => setActiveSignal(3)}>
                <i><svg viewBox="0 0 24 24"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg></i>
                <span>Mentions &amp; citations</span>
              </button>
              <button className={`gn ${activeSignal === 4 ? 'on' : ''}`} style={{ left: '50%', top: '90.9%' }} onClick={() => setActiveSignal(4)}>
                <i><svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z"/></svg></i>
                <span>Technical SEO</span>
              </button>
              <button className={`gn ${activeSignal === 5 ? 'on' : ''}`} style={{ left: '17.2%', top: '81.8%' }} onClick={() => setActiveSignal(5)}>
                <i><svg viewBox="0 0 24 24"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg></i>
                <span>Reviews &amp; reputation</span>
              </button>
            </div>

            <div className="gpanel" aria-live="polite">
              <div style={{ display: 'grid', gap: '14px' }}>
                <small>Signal {activeSignal + 1} of 6</small>
                <h3>{SIGNALS[activeSignal].t}</h3>
                <p>{SIGNALS[activeSignal].d}</p>
                <ul>
                  {SIGNALS[activeSignal].l.map((text, idx) => (
                    <li key={idx}>{text}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AI READINESS SCORE */}
      <section className="sec alt" id="score">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">AI readiness score</span>
              <h2>How ready is your brand for AI search?</h2>
            </div>
            <div className="r">
              <p>Switch on everything that&apos;s true today. Your score and your top three fixes update as you go.</p>
            </div>
          </div>

          <div className="score">
            <div className="tgs" id="tgs">
              {READINESS_ITEMS.map((item) => (
                <label key={item.id} className="tg">
                  <input
                    type="checkbox"
                    id={item.id}
                    checked={!!checkedItems[item.id]}
                    onChange={(e) =>
                      setCheckedItems(prev => ({ ...prev, [item.id]: e.target.checked }))
                    }
                  />
                  <span className="trk"></span>
                  <span className="tx">
                    {item.title}
                    <small>{item.sub}</small>
                  </span>
                  <span className="pts">+{item.p}</span>
                </label>
              ))}
            </div>

            <div className="gcard" aria-live="polite">
              <svg className="gauge" viewBox="0 0 240 140" aria-hidden="true">
                <defs>
                  <linearGradient id="gg" x1="0" x2="1">
                    <stop offset="0" stopColor="#FFB08A" />
                    <stop offset=".45" stopColor="#6C9BFF" />
                    <stop offset="1" stopColor="#2F6BFF" />
                  </linearGradient>
                </defs>
                <path className="bg" d="M20 124 A100 100 0 0 1 220 124" fill="none" strokeWidth="18" strokeLinecap="round" />
                <path
                  className="fg"
                  id="gfg"
                  d="M20 124 A100 100 0 0 1 220 124"
                  fill="none"
                  stroke="url(#gg)"
                  strokeWidth="18"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  strokeDashoffset={100 - totalScore}
                />
                <g className="needle" id="gneedle" style={{ transform: `rotate(${-90 + totalScore * 1.8}deg)` }}>
                  <line x1="120" y1="124" x2="120" y2="52" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="120" cy="124" r="8" fill="#fff" />
                </g>
              </svg>

              <div className="gnum">
                <span>{totalScore}</span>
                <small>/100</small>
              </div>

              <span className={`glabel l${scoreLevel}`}>{scoreLabels[scoreLevel]}</span>

              <div className="recs">
                {missingFixes.length > 0 ? (
                  <>
                    <h5>Your top fixes</h5>
                    {missingFixes.map((item, idx) => (
                      <li key={idx}>
                        <b>+{item.p}</b>
                        {item.fix}
                      </li>
                    ))}
                  </>
                ) : (
                  <>
                    <h5>Great shape</h5>
                    <li>
                      <b style={{ background: '#2F6BFF' }}>✓</b>
                      You have the foundations. We can track your AI mentions and keep you ahead.
                    </li>
                  </>
                )}
              </div>

              <button
                onClick={() => handleOpenLead('AI SEO')}
                className="btn btn-white"
                id="gcta"
              >
                Close my gaps{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TAPE MARQUEE */}
      <div className="tape" aria-hidden="true">
        <div className="track">
          <span>CHATGPT</span><i className="dot"></i>
          <span>GEMINI</span><i className="dot"></i>
          <span>PERPLEXITY</span><i className="dot"></i>
          <span>GOOGLE AI OVERVIEWS</span><i className="dot"></i>
          <span>GOOGLE SEARCH</span><i className="dot"></i>
          <span>ENTITY SEO</span><i className="dot"></i>
          <span>CHATGPT</span><i className="dot"></i>
          <span>GEMINI</span><i className="dot"></i>
          <span>PERPLEXITY</span><i className="dot"></i>
          <span>GOOGLE AI OVERVIEWS</span><i className="dot"></i>
          <span>GOOGLE SEARCH</span><i className="dot"></i>
          <span>ENTITY SEO</span><i className="dot"></i>
        </div>
      </div>

      {/* FREE CHECKER */}
      <section className="sec" id="check">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">Free AI visibility check</span>
              <h2>Does AI know your brand exists?</h2>
            </div>
            <div className="r">
              <p>Tell us your brand and category. We&apos;ll show you the kind of questions we test, then run the full check for you.</p>
            </div>
          </div>

          <div className="checker">
            <form className="cbox" id="checkForm" onSubmit={handleCheckerSubmit}>
              <h3>Your brand</h3>
              <div className="field">
                <label htmlFor="cBrand">Brand name</label>
                <input
                  id="cBrand"
                  value={checkerBrand}
                  onChange={(e) => setCheckerBrand(e.target.value)}
                  placeholder="e.g. Iron Street"
                  required
                />
              </div>
              <div className="field">
                <label htmlFor="cCat">What do you sell?</label>
                <input
                  id="cCat"
                  value={checkerCat}
                  onChange={(e) => setCheckerCat(e.target.value)}
                  placeholder="e.g. metal furniture"
                  required
                />
              </div>
              <fieldset className="fg">
                <legend style={{ fontSize: '13px', fontWeight: 600, color: 'var(--silver)', marginBottom: '8px' }}>
                  Main market
                </legend>
                <div className="opts" style={{ display: 'flex', gap: '8px' }}>
                  <label className="opt">
                    <input
                      type="radio"
                      name="cMkt"
                      checked={checkerMkt === 'India'}
                      onChange={() => setCheckerMkt('India')}
                    />
                    <span>India</span>
                  </label>
                  <label className="opt">
                    <input
                      type="radio"
                      name="cMkt"
                      checked={checkerMkt === 'the UK'}
                      onChange={() => setCheckerMkt('the UK')}
                    />
                    <span>United Kingdom</span>
                  </label>
                </div>
              </fieldset>

              <button type="submit" className="btn btn-white" style={{ justifySelf: 'start' }}>
                Show my test prompts{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6"/>
                </svg>
              </button>
            </form>

            <div className="cres" aria-live="polite">
              {!checkerSubmitted ? (
                <div className="idle">
                  <div className="radar"><i></i></div>
                  <p>Your test prompts will appear here.</p>
                </div>
              ) : (
                <>
                  <p className="cnote">
                    Preparing a check for <b>{checkerBrand}</b>…
                  </p>
                  <div className="eng-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="eng-dot e1"></i>ChatGPT
                    </span>
                    <span className="tr"><i style={{ width: engineReady ? '100%' : '20%', transition: 'width 1s ease' }}></i></span>
                    <em>{engineReady ? 'ready' : 'queued'}</em>
                  </div>
                  <div className="eng-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="eng-dot e3"></i>Gemini
                    </span>
                    <span className="tr"><i style={{ width: engineReady ? '100%' : '15%', transition: 'width 1s ease' }}></i></span>
                    <em>{engineReady ? 'ready' : 'queued'}</em>
                  </div>
                  <div className="eng-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="eng-dot e5"></i>Perplexity
                    </span>
                    <span className="tr"><i style={{ width: engineReady ? '100%' : '10%', transition: 'width 1s ease' }}></i></span>
                    <em>{engineReady ? 'ready' : 'queued'}</em>
                  </div>
                  <div className="eng-row">
                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <i className="eng-dot e4"></i>AI Overviews
                    </span>
                    <span className="tr"><i style={{ width: engineReady ? '100%' : '5%', transition: 'width 1s ease' }}></i></span>
                    <em>{engineReady ? 'ready' : 'queued'}</em>
                  </div>

                  {engineReady && (
                    <>
                      <p className="cnote" style={{ marginTop: '8px' }}>
                        We&apos;ll ask questions like these on each engine:
                      </p>
                      <ul className="plist">
                        <li>
                          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                          <span>Best {checkerCat} brands in {checkerMkt}</span>
                        </li>
                        <li>
                          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                          <span>Is {checkerBrand} a good {checkerCat} brand?</span>
                        </li>
                        <li>
                          <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
                          <span>{checkerBrand} vs other {checkerCat} brands</span>
                        </li>
                      </ul>
                      <p className="cnote">
                        Then we&apos;ll send you where <b>{checkerBrand}</b> is named, which competitors are named instead, and what to fix first.
                      </p>
                      <button
                        onClick={() => handleOpenLead('AI SEO')}
                        className="btn btn-white"
                        style={{ justifySelf: 'start' }}
                      >
                        Run my full check, free{' '}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                          <path d="M5 12h14M13 6l6 6-6 6"/>
                        </svg>
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="sec alt" id="process">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">How we work</span>
              <h2>From invisible to recommended.</h2>
            </div>
            <div className="r">
              <p>Classic SEO and AI SEO run as one plan, so every fix helps you rank on Google and get named in AI answers.</p>
            </div>
          </div>

          <div className="proc">
            <div className="rail" aria-hidden="true"></div>
            <div className="rfill" aria-hidden="true"></div>

            <article className="pc4">
              <small>Step 01</small>
              <div className="pv" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <rect x="70" y="14" width="112" height="22" rx="11" fill="rgba(140,175,255,.25)"/>
                  <rect x="18" y="44" width="130" height="22" rx="11" fill="#2F6BFF"/>
                  <rect x="60" y="74" width="122" height="22" rx="11" fill="rgba(47,107,255,.55)"/>
                </svg>
              </div>
              <h3>Prompt audit</h3>
              <p>We find the questions your buyers ask AI and check who gets named, across every major engine.</p>
            </article>

            <article className="pc4">
              <small>Step 02</small>
              <div className="pv" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <g fill="none" strokeWidth="3" strokeLinecap="round">
                    <rect x="24" y="16" width="18" height="18" rx="5" stroke="rgba(150,182,255,.5)"/>
                    <rect x="24" y="46" width="18" height="18" rx="5" stroke="rgba(150,182,255,.5)"/>
                    <rect x="24" y="76" width="18" height="18" rx="5" stroke="rgba(150,182,255,.5)"/>
                    <path d="M28 25l4 4 7-8" stroke="#9DBBFF"/>
                    <path d="M28 55l4 4 7-8" stroke="#6C9BFF"/>
                    <path d="M28 85l4 4 7-8" stroke="#9DBBFF"/>
                  </g>
                  <g fill="rgba(150,182,255,.22)">
                    <rect x="54" y="20" width="120" height="10" rx="5"/>
                    <rect x="54" y="50" width="96" height="10" rx="5"/>
                    <rect x="54" y="80" width="110" height="10" rx="5"/>
                  </g>
                </svg>
              </div>
              <h3>Entity &amp; technical fixes</h3>
              <p>Schema, consistent brand facts, crawlability and speed, so search engines and AI read you correctly.</p>
            </article>

            <article className="pc4">
              <small>Step 03</small>
              <div className="pv" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <g fill="rgba(150,182,255,.22)">
                    <rect x="24" y="18" width="150" height="9" rx="4"/>
                    <rect x="24" y="36" width="130" height="9" rx="4"/>
                    <rect x="24" y="54" width="146" height="9" rx="4"/>
                    <rect x="24" y="72" width="100" height="9" rx="4"/>
                  </g>
                  <rect x="24" y="33" width="60" height="15" rx="4" fill="rgba(108,155,255,.55)"/>
                </svg>
              </div>
              <h3>Quotable content &amp; authority</h3>
              <p>Pages with clear answers, comparisons and specs, plus mentions on sites AI trusts.</p>
            </article>

            <article className="pc4">
              <small>Step 04</small>
              <div className="pv" aria-hidden="true">
                <svg viewBox="0 0 200 110">
                  <path d="M16 94H186" stroke="rgba(150,182,255,.2)"/>
                  <path d="M16 88 C 50 84, 70 70, 96 62 S 150 30, 184 18" fill="none" stroke="#6C9BFF" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3>Track &amp; report</h3>
              <p>Every month: which prompts name you, which name competitors, and your Google rankings and traffic.</p>
            </article>
          </div>
        </div>
      </section>

      {/* SAMPLE VISIBILITY REPORT */}
      <section className="sec" id="report">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">What you get every month</span>
              <h2>See exactly where AI mentions you.</h2>
            </div>
            <div className="r">
              <p>A report you can read in five minutes: your share of AI answers, prompt by prompt, and the fixes we&apos;re making next.</p>
            </div>
          </div>

          <div className="report" id="reportCard">
            <div className="rhead">
              <b>AI visibility report</b>
              <span className="tag-demo">Sample · illustrative data</span>
            </div>
            <div className="rbody">
              <div className="rcol">
                <h4>Share of AI answers</h4>
                <div className="sov">
                  <div className="sv comp"><span>Competitor A</span><span className="tr"><i style={{ width: '83%' }}></i></span><b>38%</b></div>
                  <div className="sv comp"><span>Competitor B</span><span className="tr"><i style={{ width: '59%' }}></i></span><b>27%</b></div>
                  <div className="sv you"><span>{currentBrand}</span><span className="tr"><i style={{ width: '20%' }}></i></span><b>9%</b></div>
                  <div className="sv comp"><span>Others</span><span className="tr"><i style={{ width: '57%' }}></i></span><b>26%</b></div>
                </div>

                <h4 style={{ marginTop: '16px' }}>Top fixes this month</h4>
                <div className="fixes">
                  <div className="fx"><b>High</b>Add product and FAQ schema to category pages</div>
                  <div className="fx"><b className="m">Med</b>Publish a comparison guide for your top buyer question</div>
                  <div className="fx"><b className="l">Next</b>Earn mentions on two trusted review sites</div>
                </div>
              </div>

              <div className="rcol">
                <h4>Are you named? Prompt by prompt</h4>
                <div className="grid5">
                  <table id="ptable">
                    <thead>
                      <tr>
                        <th>Prompt</th>
                        <th>ChatGPT</th>
                        <th>Gemini</th>
                        <th>Perplexity</th>
                        <th>AI Overviews</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Best brand for your category</td>
                        <td><span className="cell n"><svg viewBox="0 0 24 24" fill="none" stroke="#FFB08A" strokeWidth="3.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span></td>
                        <td><span className="cell n"><svg viewBox="0 0 24 24" fill="none" stroke="#FFB08A" strokeWidth="3.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span></td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell n"><svg viewBox="0 0 24 24" fill="none" stroke="#FFB08A" strokeWidth="3.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span></td>
                      </tr>
                      <tr>
                        <td>Your brand vs Competitor A</td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell n"><svg viewBox="0 0 24 24" fill="none" stroke="#FFB08A" strokeWidth="3.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span></td>
                      </tr>
                      <tr>
                        <td>Is your brand worth it?</td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell n"><svg viewBox="0 0 24 24" fill="none" stroke="#FFB08A" strokeWidth="3.2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg></span></td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                        <td><span className="cell y"><svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg></span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="muted" style={{ fontSize: '13px', display: 'flex', gap: '16px', flexWrap: 'wrap', marginTop: '12px' }}>
                  <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                    <i className="cell y" style={{ width: '16px', height: '16px' }}></i>Named
                  </span>
                  <span style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                    <i className="cell n" style={{ width: '16px', height: '16px' }}></i>Not named
                  </span>
                </p>
              </div>
            </div>
            <div className="rfoot">
              Sample report with illustrative numbers. Yours uses your real prompts, engines and competitors, alongside Google Search Console data.
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="sec alt" id="trust">
        <div className="wrap">
          <div className="head">
            <div>
              <span className="eyebrow">Why us</span>
              <h2>SEO people first. Honest about AI.</h2>
            </div>
          </div>

          <div className="tr3">
            <div className="t3">
              <span className="ic3">
                <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
              </span>
              <b>Built on hands-on SEO</b>
              <p>AI SEO starts with solid SEO. Our team does the technical, content and authority work itself, not just the strategy deck.</p>
            </div>
            <div className="t3">
              <span className="ic3">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              </span>
              <b>No fake guarantees</b>
              <p>Nobody controls what ChatGPT says. We improve the signals AI relies on and show you, prompt by prompt, what changes.</p>
            </div>
            <div className="t3">
              <span className="ic3">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20"/></svg>
              </span>
              <b>UK entity, India delivery</b>
              <p>Contract with WarrgyizMorsch UK Ltd. Your work is done by our senior team in Udaipur.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="sec" id="faq">
        <div className="wrap">
          <div className="head" style={{ justifyContent: 'center', textAlign: 'center' }}>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 style={{ maxWidth: 'none' }}>AI SEO, answered.</h2>
            </div>
          </div>

          <div className="faq">
            <details open>
              <summary>
                What is AI SEO, and is it the same as GEO or AEO?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>Yes, they&apos;re different names for the same goal. GEO (generative engine optimisation) and AEO (answer engine optimisation) both mean getting your brand mentioned and cited in AI answers from tools like ChatGPT, Gemini, Perplexity and Google&apos;s AI Overviews. We call it AI SEO because it&apos;s built on the same foundations as classic SEO.</p>
            </details>

            <details>
              <summary>
                Does classic Google SEO still matter?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>Yes. Many people still click through from Google, and AI answers often draw on pages that search engines already trust. That&apos;s why we run both as one plan.</p>
            </details>

            <details>
              <summary>
                Can you guarantee ChatGPT will recommend my brand?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>No, and be wary of anyone who says they can. AI engines decide their own answers. What we can do is strengthen the signals they rely on, then track your mentions every month so you can see the change.</p>
            </details>

            <details>
              <summary>
                How long does it take?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>Technical and entity fixes usually go live in the first month. Content and mentions build over the following months, and AI answers tend to reflect them gradually rather than overnight.</p>
            </details>

            <details>
              <summary>
                How do you measure AI visibility?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>We run a fixed set of buyer prompts across each AI engine every month and record who gets named and cited. We report that alongside your Google rankings, clicks and leads.</p>
            </details>

            <details>
              <summary>
                Do you work with UK brands?
                <i>
                  <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                    <path d="M12 5v14M5 12h14"/>
                  </svg>
                </i>
              </summary>
              <p>Yes. You can contract with WarrgyizMorsch UK Ltd, and the work is delivered by our team in Udaipur, India.</p>
            </details>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="fcta" id="audit">
        <div className="halo" aria-hidden="true"></div>
        <div className="halo r" aria-hidden="true"></div>
        <div className="wrap in">
          <span className="eyebrow">Free AI visibility check</span>
          <h2>Be the answer,<br /><span className="outline red">not the also-ran.</span></h2>
          <p>We&apos;ll test the questions your buyers ask AI, show you who gets named instead of you, and walk you through what to fix first. Free, with no obligation.</p>
          <button
            onClick={() => handleOpenLead('AI SEO')}
            className="btn btn-white"
          >
            Get my free AI check{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
}
