"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./google-ads.css";

// Currency & Range Formatting Helpers
const inr = (n) => {
  n = Math.max(0, n);
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(n >= 1e8 ? 1 : 2) + " Cr";
  if (n >= 1e5) {
    const l = n / 1e5;
    return (
      "₹" +
      (l >= 100
        ? l.toFixed(0)
        : l >= 10
          ? l.toFixed(1).replace(/\.0$/, "")
          : l.toFixed(2).replace(/0$/, "")) +
      "L"
    );
  }
  return "₹" + Math.round(n).toLocaleString("en-IN");
};

const fmt = (n) =>
  n >= 1e7
    ? (n / 1e7).toFixed(1) + " Cr"
    : n >= 1e5
      ? (n / 1e5).toFixed(n >= 1e6 ? 0 : 1).replace(/\.0$/, "") + "L"
      : n >= 1e3
        ? (n / 1e3).toFixed(n >= 1e4 ? 0 : 1).replace(/\.0$/, "") + "K"
        : Math.round(n) + "";

const rng = (a, b) => (fmt(a) === fmt(b) ? fmt(a) : fmt(a) + "–" + fmt(b));

const calcBudget = (v) => {
  const b = 25000 * Math.pow(40, v / 100);
  return b < 1e5 ? Math.round(b / 5000) * 5000 : Math.round(b / 10000) * 10000;
};

// Data Structures
const QS = [
  {
    q: "steel study table online",
    h: "Steel Study Tables | Delivered in 4 Days | 5-Year Warranty",
    d: "Powder-coated steel, built for long study hours. Free delivery across Rajasthan.",
    s: ["Study tables", "Office desks", "Bulk orders"],
    p: ["₹6,499", "₹8,990", "₹4,299", "₹11,500"],
  },
  {
    q: "study abroad consultant udaipur",
    h: "UK & Canada Admissions | Free Counselling | Udaipur Office",
    d: "University shortlists, SOP help and visa support. Book a free 15-minute call today.",
    s: ["Study in UK", "Study in Canada"],
    p: null,
  },
  {
    q: "1kva inverter for home price",
    h: "1 kVA Home Inverters | Up to 6 Hrs Backup | Free Installation",
    d: "Pure sine-wave inverters with 2-year warranty. Compare models and order online.",
    s: ["Inverters", "Batteries", "Solar combos"],
    p: ["₹5,890", "₹7,250", "₹12,400", "₹9,990"],
  },
];

const NOTES = [
  [
    ["Phone call · 2m 41s", "From a search ad"],
    ["Phone call · 4m 05s", "From a Maps ad"],
    ["Phone call · 1m 52s", "From a call ad"],
  ],
  [
    ["Purchase · ₹8,990", "From a Shopping ad"],
    ["Purchase · ₹6,499", "From a search ad"],
    ["Purchase · ₹12,400", "From Performance Max"],
  ],
  [
    ["Negative keyword added", '"free" searches blocked'],
    ["Negative keyword added", '"jobs" searches blocked'],
    ["Negative keyword added", '"DIY" searches blocked'],
  ],
  [
    ["New lead", '"Bulk order for 40 tables"'],
    ["New lead", '"UK intake in September"'],
    ["New lead", '"Need 2 inverters for shop"'],
  ],
];

const TERMS = [
  {
    t: "buy steel study table online",
    c: 1840,
    cl: 46,
    k: 0,
    r: "Clear buying words. Its own ad group, higher bid.",
  },
  {
    t: "study table diy plans",
    c: 1120,
    cl: 31,
    k: 2,
    r: "Wants to build one, not buy one. Blocked.",
  },
  {
    t: "study table size for kids",
    c: 940,
    cl: 29,
    k: 1,
    r: "Early research. Cheaper bid, guide-style ad.",
  },
  {
    t: "study table with drawer price",
    c: 1260,
    cl: 34,
    k: 0,
    r: "Comparing prices. Show price in the ad.",
  },
  {
    t: "free study table",
    c: 530,
    cl: 18,
    k: 2,
    r: 'Looking for free. Blocked with "free".',
  },
  {
    t: "best study table material",
    c: 780,
    cl: 24,
    k: 1,
    r: "Researching. Send to a comparison page.",
  },
  {
    t: "study table drawing",
    c: 670,
    cl: 22,
    k: 2,
    r: "School homework. Blocked.",
  },
  {
    t: "study table home delivery udaipur",
    c: 620,
    cl: 15,
    k: 0,
    r: "Local and ready. Add a call extension.",
  },
  {
    t: "study table vs desk",
    c: 410,
    cl: 13,
    k: 1,
    r: "Undecided. Remarketing follows up.",
  },
  {
    t: "study table job vacancy",
    c: 290,
    cl: 9,
    k: 2,
    r: 'Job seekers. Blocked with "job".',
  },
];

const KT = ["Bid up", "Nurture", "Negative"];

const RIV = [
  { n: "Competitor A", b: 45, q: 5 },
  { n: "Competitor B", b: 30, q: 8 },
  { n: "Competitor C", b: 60, q: 3 },
];

const CT = [
  {
    k: "search",
    n: "Search",
    h: "Search ads",
    p: "Text ads at the top of Google when someone searches for what you sell.",
    l: [
      "Keywords grouped by buying intent",
      "Sitelinks, callouts and call buttons",
      "Search terms checked and cleaned every week",
    ],
    b: "Best for: catching people ready to buy",
  },
  {
    k: "shopping",
    n: "Shopping",
    h: "Shopping ads",
    p: "Your products with photo, price and store name, right in the search results.",
    l: [
      "Product feed fixed in Merchant Center",
      "Bids split by best sellers and margins",
      "Price and promotion tests",
    ],
    b: "Best for: online stores",
  },
  {
    k: "pmax",
    n: "Performance Max",
    h: "Performance Max",
    p: "One campaign that uses your ads and feed across Search, YouTube, Display, Gmail, Maps and Discover.",
    l: [
      "Asset groups built per product line",
      "Brand exclusions so it finds new buyers",
      "Placement and search-term checks",
    ],
    b: "Best for: stores with a good product feed",
  },
  {
    k: "youtube",
    n: "YouTube",
    h: "YouTube ads",
    p: "Short video ads before and during videos, aimed at people searching or watching around your topic.",
    l: [
      "Hook in the first five seconds",
      "Audiences built from your searches and customers",
      "Retargeting your site visitors",
    ],
    b: "Best for: explaining a product people need to see",
  },
  {
    k: "demand",
    n: "Demand Gen",
    h: "Demand Gen",
    p: "Image and video ads in YouTube Shorts, Discover and Gmail that look like content.",
    l: [
      "Lookalikes of your best customers",
      "Carousel and video formats",
      "Good for warming up cold audiences",
    ],
    b: "Best for: creating demand before the search",
  },
  {
    k: "local",
    n: "Local & Maps",
    h: "Local & Maps",
    p: "Your shop pinned at the top of Google Maps, with Call and Directions buttons.",
    l: [
      "Google Business Profile linked",
      "Radius targeting around your store",
      "Calls and direction requests tracked",
    ],
    b: "Best for: showrooms and local services",
  },
];

const LOOP = [
  {
    n: "Search",
    d: "Someone searches for what you sell.",
    ic: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="M20 20l-4.8-4.8" />
      </>
    ),
  },
  {
    n: "Click",
    d: "They click your ad. Google notes the click ID.",
    ic: <path d="M5 3l14 8-6 1.5L10 19z" />,
  },
  {
    n: "Landing page",
    d: "A fast, clear page that answers their question.",
    ic: (
      <>
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
      </>
    ),
  },
  {
    n: "Lead or call",
    d: "They fill a form, call or buy. Tracked with enhanced conversions.",
    ic: (
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
    ),
  },
  {
    n: "Qualified",
    d: "Your team marks the lead as real, or the sale closes, in your CRM.",
    ic: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M8 12l3 3 5-6" />
      </>
    ),
  },
  {
    n: "Back to Google",
    d: "We send the result back, so bidding looks for more buyers like them.",
    ic: <path d="M20 12a8 8 0 1 1-2.3-5.7M20 4v4h-4" />,
  },
];

const IND = {
  edu: {
    n: "Study abroad & education",
    goal: "leads",
    cpc: [25, 60],
    cvr: [4, 9],
    mid: "YouTube",
  },
  app: {
    n: "Home & appliances",
    goal: "sales",
    cpc: [8, 20],
    cvr: [1.5, 3],
    aov: 2500,
    mid: "Shopping & PMax",
  },
  fur: {
    n: "Furniture",
    goal: "sales",
    cpc: [12, 30],
    cvr: [0.8, 1.8],
    aov: 9000,
    mid: "Shopping & PMax",
  },
  d2c: {
    n: "Fashion & D2C",
    goal: "sales",
    cpc: [6, 15],
    cvr: [1.5, 3],
    aov: 1500,
    mid: "Shopping & PMax",
  },
  re: {
    n: "Real estate",
    goal: "leads",
    cpc: [30, 80],
    cvr: [3, 7],
    mid: "YouTube & Demand Gen",
  },
  b2b: {
    n: "B2B services",
    goal: "leads",
    cpc: [40, 120],
    cvr: [3, 6],
    mid: "Demand Gen",
  },
};

export default function GoogleAdsPage() {
  const heroRef = useRef(null);

  // Hero live search typing simulator state
  const [qIdx, setQIdx] = useState(0);
  const [typedQuery, setTypedQuery] = useState(QS[0].q);
  const [isWait, setIsWait] = useState(false);
  const [isGo, setIsGo] = useState(true);

  // YouTube skip counter
  const [ytSkip, setYtSkip] = useState(5);

  // Floating notifications state (4 toasts)
  const [noteIndices, setNoteIndices] = useState([0, 0, 0, 0]);
  const [noteSwitch, setNoteSwitch] = useState([false, false, false, false]);

  // Search terms waste sorter state
  const [termsSorted, setTermsSorted] = useState(false);

  // Ad auction simulator state
  const [bid, setBid] = useState(30);
  const [qs, setQs] = useState(7);

  // Campaign types explorer state
  const [campaignIdx, setCampaignIdx] = useState(0);
  const [campaignPaused, setCampaignPaused] = useState(false);

  // Closed loop circular radar tracking state
  const [loopStep, setLoopStep] = useState(0);

  // Budget planner state
  const [indKey, setIndKey] = useState("edu");
  const [budSlider, setBudSlider] = useState(45);

  // Open Lead Modal helper
  const handleOpenLead = (channel = "Google Ads") => {
    if (typeof window !== "undefined") {
      if (window.openGrowthModal) {
        window.openGrowthModal(channel);
      } else if (window.openLeadModal) {
        window.openLeadModal(channel);
      }
    }
  };

  // 1. Hero Spotlight Mouse Move
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const handleMove = (e) => {
      const r = hero.getBoundingClientRect();
      hero.style.setProperty("--mx", `${e.clientX - r.left}px`);
      hero.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    hero.addEventListener("pointermove", handleMove);
    return () => hero.removeEventListener("pointermove", handleMove);
  }, []);

  // 2. Hero Search Bar Typing Simulator
  useEffect(() => {
    let typeInterval = null;
    let cycleTimeout = null;

    const startTyping = (idx) => {
      const target = QS[idx];
      setQIdx(idx);
      setIsWait(true);
      setIsGo(false);
      setTypedQuery("");

      let c = 0;
      typeInterval = setInterval(() => {
        c++;
        setTypedQuery(target.q.slice(0, c));
        if (c >= target.q.length) {
          clearInterval(typeInterval);
          setTimeout(() => {
            setIsWait(false);
            setIsGo(true);
          }, 250);
        }
      }, 55);
    };

    const cycleTimer = setInterval(() => {
      setQIdx((prev) => {
        const next = (prev + 1) % QS.length;
        startTyping(next);
        return next;
      });
    }, 7200);

    return () => {
      clearInterval(typeInterval);
      clearInterval(cycleTimer);
      clearTimeout(cycleTimeout);
    };
  }, []);

  // 3. YouTube skip countdown & notification toasts
  useEffect(() => {
    const ytTimer = setInterval(() => {
      setYtSkip((prev) => (prev <= 0 ? 5 : prev - 1));
    }, 1000);

    const noteTimers = [0, 1, 2, 3].map((k) => {
      const timer = setInterval(() => {
        setNoteSwitch((prev) => {
          const next = [...prev];
          next[k] = true;
          return next;
        });

        setTimeout(() => {
          setNoteIndices((prev) => {
            const next = [...prev];
            next[k] = (next[k] + 1) % 3;
            return next;
          });
          setNoteSwitch((prev) => {
            const next = [...prev];
            next[k] = false;
            return next;
          });
        }, 350);
      }, 4400 + k * 800);

      return timer;
    });

    return () => {
      clearInterval(ytTimer);
      noteTimers.forEach(clearInterval);
    };
  }, []);

  // 4. Closed Loop radar step rotation (cycle every 2s)
  useEffect(() => {
    const loopTimer = setInterval(() => {
      setLoopStep((prev) => (prev + 1) % LOOP.length);
    }, 2000);
    return () => clearInterval(loopTimer);
  }, []);

  // 5. Campaign types auto-rotation (6s)
  useEffect(() => {
    if (campaignPaused) return;
    const campTimer = setInterval(() => {
      setCampaignIdx((prev) => (prev + 1) % CT.length);
    }, 6000);
    return () => clearInterval(campTimer);
  }, [campaignPaused]);

  // Search terms totals calculation
  const totalSpend = TERMS.reduce((acc, t) => acc + t.c, 0);
  const wastedSpend = TERMS.filter((t) => t.k === 2).reduce((acc, t) => acc + t.c, 0);
  const wastePercent = Math.round((wastedSpend / totalSpend) * 100);

  // Auction rankings calculation
  const allBidders = [
    { n: "You", b: bid, q: qs, i: 0 },
    ...RIV.map((r, k) => ({ ...r, i: k + 1 })),
  ].map((x) => ({ ...x, r: x.b * x.q }));

  const sortedBidders = [...allBidders].sort((a, b) => b.r - a.r);
  const maxRank = sortedBidders[0].r || 1;
  const youPos = sortedBidders.findIndex((x) => x.i === 0);
  const slots = 3;
  const nextCompetitor = sortedBidders[youPos + 1];
  const estCpc = nextCompetitor
    ? Math.min(bid, Math.ceil(nextCompetitor.r / qs) + 1)
    : Math.min(bid, 5);
  const higherBidders = sortedBidders.filter((x, k) => k > youPos && x.b > bid);

  let auctionMessage = "";
  if (youPos >= slots) {
    auctionMessage =
      "Your ad doesn't show. Raising quality is usually cheaper than raising your bid.";
  } else if (higherBidders.length > 0) {
    auctionMessage = `You beat ${higherBidders.map((x) => x.n).join(" and ")} while bidding less, because your ad is more relevant.`;
  } else if (youPos === 0) {
    auctionMessage = `Top spot. You pay just enough to beat the next ad, not your full ₹${bid} bid.`;
  } else {
    auctionMessage = "Raise quality to climb without paying more per click.";
  }

  // Budget calculations
  const currentBudget = calcBudget(budSlider);
  const currInd = IND[indKey];
  const midCpc = (currInd.cpc[0] + currInd.cpc[1]) / 2;
  const midCvr = (currInd.cvr[0] + currInd.cvr[1]) / 2;
  const lo = 0.75;
  const hi = 1.3;
  const estClicks = currentBudget / midCpc;
  const estResults = (estClicks * midCvr) / 100;
  const isSales = currInd.goal === "sales";

  const currQ = QS[qIdx];

  return (
    <main
      id="top"
      className="page-google-ads"
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      <div className="grain" aria-hidden="true"></div>

      {/* =========================================================================
          HERO SECTION (Exact structure from WM_Digital_Google_Ads)
          ========================================================================= */}
      <section
        className="ma-hero section-py py-6 md:py-8"
        id="hero"
        ref={heroRef}
      >
        <div className="hero-bg" aria-hidden="true">
          <div className="gridlines"></div>
          <div className="spot"></div>
          <div className="beam"></div>
        </div>

        <div className="wrap ma-c">
          <h1 className="ma-h1">
            <span className="bl">
              <span className="w" style={{ "--i": 0 }}>
                Show up
              </span>
              <span className="pills" aria-hidden="true">
                <span className="pl s1">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  >
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M20 20l-4.8-4.8" />
                  </svg>
                </span>
                <span className="pl s2">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  >
                    <rect x="2.5" y="5" width="19" height="14" rx="4" />
                    <path d="M10 9l5 3-5 3z" fill="currentColor" />
                  </svg>
                </span>
                <span className="pl s3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  >
                    <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                    <circle cx="12" cy="9.5" r="2.5" />
                  </svg>
                </span>
              </span>
              <span className="w" style={{ "--i": 1 }}>
                first.
              </span>
            </span>
            <span className="bl">
              <span className="w outline" style={{ "--i": 2 }}>
                When
              </span>
              <span className="w" style={{ "--i": 3 }}>
                they search.
              </span>
            </span>
          </h1>

          <p className="ma-sub">
            People on Google already want what you sell. We put you{" "}
            <strong>at the top when they search</strong>, cut the clicks that never
            buy, and track every call, lead and sale.
          </p>

          <div className="ma-ctas">
            <button
              type="button"
              className="btn btn-white"
              onClick={() => handleOpenLead("Google Ads")}
            >
              Get a free Google Ads audit{" "}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
            <a href="#terms" className="btn btn-ghost">
              See where ad money leaks
            </a>
          </div>

          {/* Interactive Search Window Hero Stage */}
          <div
            className="stage3 gstage"
            aria-label="Demo of a search ad, a video ad and a maps ad"
          >
            <div className="ring b" aria-hidden="true"></div>
            <div className="ring a" aria-hidden="true"></div>
            <div className="glowc" aria-hidden="true"></div>

            {/* Left Phone: YouTube in-stream Ad */}
            <div className="mph pl3 yt" aria-hidden="true">
              <div className="sc">
                <div className="vid">
                  <div className="creator">
                    <i></i>
                    <b></b>
                  </div>
                  <span className="adl">Ad</span>
                  <span className="skip" id="ytSkip">
                    {ytSkip > 0 ? `Skip in ${ytSkip}` : "Skip ad ›"}
                  </span>
                  <span className="vbar"></span>
                </div>
                <div className="vmeta">
                  <b>Steel study tables built for long study hours</b>
                  <small>yourbrand.com · Sponsored</small>
                  <span>Shop now</span>
                  <i></i>
                  <i></i>
                </div>
              </div>
              <span className="lbl">Video</span>
            </div>

            {/* Center Browser: Live Google Search Ad & Shopping */}
            <div
              className={`gb ${isWait ? "wait" : ""} ${isGo ? "go" : ""} ${!currQ.p ? "svc" : ""}`}
              id="gb"
              aria-hidden="true"
            >
              <div className="gb-top">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="gb-q">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#55638C"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="M20 20l-4.8-4.8" />
                </svg>
                <span className="qt" id="gq">
                  {typedQuery}
                </span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2F6BFF"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <rect x="9" y="3" width="6" height="11" rx="3" />
                  <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
                </svg>
              </div>
              <div className="gb-tabs">
                <span>All</span>
                <span>Shopping</span>
                <span>Maps</span>
                <span>Videos</span>
              </div>
              <div className="gb-res">
                <div className="gad">
                  <div className="spn">Sponsored</div>
                  <div className="site">
                    <i>YB</i>yourbrand.com
                  </div>
                  <h4 id="gH">{currQ.h}</h4>
                  <p id="gD">{currQ.d}</p>
                  <div className="sl" id="gS">
                    {currQ.s.map((chip, idx) => (
                      <span key={idx}>{chip}</span>
                    ))}
                    <span className="call">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                      </svg>
                      Call
                    </span>
                  </div>
                  <span className="rip"></span>
                  <svg className="gcur" viewBox="0 0 24 24">
                    <path
                      d="M5 3l14 8-6 1.5L10 19z"
                      fill="#fff"
                      stroke="#0A1640"
                      strokeWidth="1.4"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {currQ.p && (
                  <div className="gshop">
                    <div className="lb">Sponsored · Products</div>
                    <div className="row" id="gP">
                      {currQ.p.map((price, idx) => (
                        <div className="pc" key={idx}>
                          <div className="im">
                            <div className="prod"></div>
                          </div>
                          <b>{price}</b>
                          <small>{idx === 0 ? "yourbrand" : `Store ${idx}`}</small>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="gorg">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
              </div>
            </div>

            {/* Right Phone: Google Maps Local Store Ad */}
            <div className="mph pr3" aria-hidden="true">
              <div className="sc">
                <div className="mapv"></div>
                <span className="mpulse"></span>
                <span className="mpin"></span>
                <div className="msheet">
                  <span className="ad">SPONSORED</span>
                  <b>Your Store, Udaipur</b>
                  <small>Furniture store · Open until 8 pm</small>
                  <div className="btns">
                    <span>Call</span>
                    <span>Directions</span>
                  </div>
                </div>
              </div>
              <span className="lbl">Maps</span>
            </div>

            {/* 4 Floating Notifications */}
            <div className={`nt n1 ${noteSwitch[0] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                </svg>
              </span>
              <span className="tx">
                <b>{NOTES[0][noteIndices[0]][0]}</b>
                <small>{NOTES[0][noteIndices[0]][1]}</small>
              </span>
            </div>

            <div className={`nt n2 ${noteSwitch[1] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 7h12l-1 13H7z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </span>
              <span className="tx">
                <b>{NOTES[1][noteIndices[1]][0]}</b>
                <small>{NOTES[1][noteIndices[1]][1]}</small>
              </span>
            </div>

            <div className={`nt n3 ${noteSwitch[2] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M6 6l12 12" />
                </svg>
              </span>
              <span className="tx">
                <b>{NOTES[2][noteIndices[2]][0]}</b>
                <small>{NOTES[2][noteIndices[2]][1]}</small>
              </span>
            </div>

            <div className={`nt n4 ${noteSwitch[3] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16v12H8l-4 4z" />
                </svg>
              </span>
              <span className="tx">
                <b>{NOTES[3][noteIndices[3]][0]}</b>
                <small>{NOTES[3][noteIndices[3]][1]}</small>
              </span>
            </div>

            <span className="tag-demo">Demo ads · your ads go here</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          TILTED MARQUEE TAPE
          ========================================================================= */}
      <div className="tape-wrap" aria-hidden="true">
        <div className="tape">
          <div className="track">
            <span>Search ads</span>
            <span className="dot"></span>
            <span>Shopping</span>
            <span className="dot"></span>
            <span>Performance Max</span>
            <span className="dot"></span>
            <span>YouTube</span>
            <span className="dot"></span>
            <span>Demand Gen</span>
            <span className="dot"></span>
            <span>Maps &amp; local</span>
            <span className="dot"></span>
            <span>Call ads</span>
            <span className="dot"></span>
            <span>Remarketing</span>
            <span className="dot"></span>
            <span>Display</span>
            <span className="dot"></span>
            <span>Search ads</span>
            <span className="dot"></span>
            <span>Shopping</span>
            <span className="dot"></span>
            <span>Performance Max</span>
            <span className="dot"></span>
            <span>YouTube</span>
            <span className="dot"></span>
            <span>Demand Gen</span>
            <span className="dot"></span>
            <span>Maps &amp; local</span>
            <span className="dot"></span>
            <span>Call ads</span>
            <span className="dot"></span>
            <span>Remarketing</span>
            <span className="dot"></span>
            <span>Display</span>
            <span className="dot"></span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SEARCH TERMS WASTE SORTER
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="terms">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Where the money leaks</span>
              <h2>You pay for searches you&apos;d never choose.</h2>
            </div>
            <div className="r">
              <p>
                This is a search terms report: what people actually typed before
                clicking an ad. Most accounts we audit pay for clicks like these
                every day.
              </p>
            </div>
          </div>

          <div
            className={`stb-wrap rv ${termsSorted ? "sorted" : ""}`}
            id="stbWrap"
          >
            <div className="stb-bar">
              <div className="stb-sum">
                <span>
                  Spend reviewed <b>₹{totalSpend.toLocaleString("en-IN")}</b>
                </span>
                <span className="w">
                  Wasted <b>₹{wastedSpend.toLocaleString("en-IN")} ({wastePercent}%)</b>
                </span>
              </div>
              <button
                type="button"
                className="btn btn-white"
                onClick={() => setTermsSorted((prev) => !prev)}
              >
                {termsSorted ? "Show it unsorted" : "Sort it like we do"}{" "}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className={`stb ${termsSorted ? "sorted" : ""}`} id="stb">
              {termsSorted ? (
                <div className="stb-sorted-grid">
                  {/* Category 1: Ready to buy */}
                  <div className="stb-cat-col">
                    <div className="ch">
                      <i style={{ background: "#2F6BFF", boxShadow: "0 0 10px #2F6BFF" }}></i>
                      Ready to buy <small>bid up</small>
                    </div>
                    <div className="stb-col-items">
                      {TERMS.filter((t) => t.k === 0).map((item, idx) => (
                        <div key={idx} className="trow k0">
                          <div className="t">
                            <b>{item.t}</b>
                            <em>₹{item.c.toLocaleString("en-IN")}</em>
                          </div>
                          <span className="tag">{KT[0]}</span>
                          <small>
                            {item.cl} clicks · {item.r}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 2: Researching */}
                  <div className="stb-cat-col">
                    <div className="ch">
                      <i style={{ background: "#9DBBFF" }}></i>
                      Researching <small>separate &amp; nurture</small>
                    </div>
                    <div className="stb-col-items">
                      {TERMS.filter((t) => t.k === 1).map((item, idx) => (
                        <div key={idx} className="trow k1">
                          <div className="t">
                            <b>{item.t}</b>
                            <em>₹{item.c.toLocaleString("en-IN")}</em>
                          </div>
                          <span className="tag">{KT[1]}</span>
                          <small>
                            {item.cl} clicks · {item.r}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Category 3: Never buying */}
                  <div className="stb-cat-col">
                    <div className="ch">
                      <i style={{ background: "#FF8F8F" }}></i>
                      Never buying <small>block</small>
                    </div>
                    <div className="stb-col-items">
                      {TERMS.filter((t) => t.k === 2).map((item, idx) => (
                        <div key={idx} className="trow k2">
                          <div className="t">
                            <b>{item.t}</b>
                            <em>₹{item.c.toLocaleString("en-IN")}</em>
                          </div>
                          <span className="tag">{KT[2]}</span>
                          <small>
                            {item.cl} clicks · {item.r}
                          </small>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="stb-unsorted-grid">
                  {TERMS.map((item, idx) => (
                    <div key={idx} className="trow" data-i={idx}>
                      <div className="t">
                        <b>{item.t}</b>
                        <em>₹{item.c.toLocaleString("en-IN")}</em>
                      </div>
                      <small style={{ display: "block" }}>
                        {item.cl} clicks · {item.r}
                      </small>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          AUCTION SIMULATOR
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="auction">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">How the auction works</span>
              <h2>The best ad wins, not the biggest bid.</h2>
            </div>
            <div className="r">
              <p>
                Google ranks ads by bid and quality together. A relevant ad with a
                good landing page can sit above a bigger spender and pay less per click.
              </p>
            </div>
          </div>

          <div className="auc rv">
            <div className="abox">
              <div>
                <div className="sl-h">
                  <b>
                    Your max bid<small>per click</small>
                  </b>
                  <strong id="bidV">₹{bid}</strong>
                </div>
                <input
                  type="range"
                  id="bidR"
                  min="10"
                  max="80"
                  value={bid}
                  onChange={(e) => setBid(+e.target.value)}
                  style={{ "--p": `${((bid - 10) / 70) * 100}%` }}
                  aria-label="Your max bid per click"
                />
              </div>

              <div>
                <div className="sl-h">
                  <b>
                    Your quality
                    <small>ad relevance, expected CTR, landing page</small>
                  </b>
                  <strong id="qsV">{qs}/10</strong>
                </div>
                <input
                  type="range"
                  id="qsR"
                  min="1"
                  max="10"
                  value={qs}
                  onChange={(e) => setQs(+e.target.value)}
                  style={{ "--p": `${((qs - 1) / 9) * 100}%` }}
                  aria-label="Your quality score"
                />
              </div>

              <p className="fine">
                Try lowering your bid and raising quality. Quality is what we work
                on: tighter keywords, sharper ads and faster, clearer landing pages.
              </p>
            </div>

            <div className="aboard">
              <span className="tag-demo">Simplified</span>
              <div className="alist" id="alist">
                {allBidders.map((b) => {
                  const p = sortedBidders.findIndex((x) => x.i === b.i);
                  const isYou = b.i === 0;
                  const isOut = p >= slots;
                  const rankPercent = (b.r / maxRank) * 100;

                  return (
                    <div
                      key={b.i}
                      className={`arow ${isYou ? "you" : ""} ${isOut ? "out" : ""}`}
                      style={{ top: `${p * 74}px` }}
                    >
                      <span className="pos">{p < slots ? `#${p + 1}` : "—"}</span>
                      <div>
                        <div className="nm">
                          <b>{b.n}</b>
                          <span>
                            ₹{b.b} bid × {b.q} quality
                          </span>
                        </div>
                        <div className="bar">
                          <i style={{ width: `${rankPercent}%` }}></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="aout">
                <div>
                  <span>Your position</span>
                  <strong id="aPos">
                    {youPos < slots ? `#${youPos + 1}` : "Not shown"}
                  </strong>
                </div>
                <div>
                  <span>You pay about</span>
                  <strong id="aCpc">
                    {youPos < slots ? `₹${estCpc} / click` : "–"}
                  </strong>
                </div>
              </div>

              <p className="amsg" id="aMsg">
                {auctionMessage}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CAMPAIGN TYPES EXPLORER
          ========================================================================= */}
      <section
        className={`sec camps section-py py-6 md:py-8 ${campaignPaused ? "paused" : ""}`}
        id="campaigns"
      >
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Campaign types</span>
              <h2>Every place your buyers look on Google.</h2>
            </div>
            <div className="r">
              <p>
                We pick campaign types by what you sell and how people search for it,
                not by what&apos;s new.
              </p>
            </div>
          </div>

          <div className="ctabs rv" role="tablist" aria-label="Campaign types">
            {CT.map((c, i) => (
              <button
                key={c.k}
                className="ctab"
                role="tab"
                aria-selected={campaignIdx === i}
                onClick={() => {
                  setCampaignPaused(true);
                  setCampaignIdx(i);
                }}
              >
                {c.n}
                <span className="tp"></span>
              </button>
            ))}
          </div>

          <div
            className="cpanel rv"
            onMouseEnter={() => setCampaignPaused(true)}
            onMouseLeave={() => setCampaignPaused(false)}
          >
            {/* Visual Canvas Mockup for Active Campaign */}
            <div className="cvis" aria-hidden="true">
              {/* 1. Search */}
              <div
                className={`cm ${CT[campaignIdx].k === "search" ? "on" : ""}`}
                data-t="search"
              >
                <div className="gad">
                  <div className="spn">Sponsored</div>
                  <div className="site">
                    <i>YB</i>yourbrand.com
                  </div>
                  <h4>Steel Study Tables | Delivered in 4 Days | 5-Year Warranty</h4>
                  <p>
                    Powder-coated steel, built for long study hours. Free delivery
                    across Rajasthan.
                  </p>
                  <div className="sl">
                    <span>Study tables</span>
                    <span>Office desks</span>
                    <span className="call">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                      >
                        <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                      </svg>
                      Call
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Shopping */}
              <div
                className={`cm ${CT[campaignIdx].k === "shopping" ? "on" : ""}`}
                data-t="shopping"
              >
                <div className="cm-shop">
                  <div className="pc">
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>₹6,499</b>
                    <small>Study table · yourbrand</small>
                    <em>Free delivery</em>
                  </div>
                  <div className="pc">
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>₹8,990</b>
                    <small>Desk with drawer · yourbrand</small>
                    <em>In stock</em>
                  </div>
                  <div className="pc">
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>₹4,299</b>
                    <small>Compact table · yourbrand</small>
                    <em>Free delivery</em>
                  </div>
                </div>
              </div>

              {/* 3. Performance Max */}
              <div
                className={`cm ${CT[campaignIdx].k === "pmax" ? "on" : ""}`}
                data-t="pmax"
              >
                <div className="hub">
                  <svg className="lines" viewBox="0 0 300 300">
                    <line x1="150" y1="150" x2="150" y2="22" />
                    <line x1="150" y1="150" x2="261" y2="86" />
                    <line x1="150" y1="150" x2="261" y2="214" />
                    <line x1="150" y1="150" x2="150" y2="278" />
                    <line x1="150" y1="150" x2="39" y2="214" />
                    <line x1="150" y1="150" x2="39" y2="86" />
                  </svg>
                  <div className="core">
                    Your headlines, images, videos &amp; product feed
                  </div>
                  <span className="sat" style={{ "--a": "-90deg", "--dl": "0s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <circle cx="10.5" cy="10.5" r="6.5" />
                        <path d="M20 20l-4.8-4.8" />
                      </svg>
                    </i>
                    Search
                  </span>
                  <span className="sat" style={{ "--a": "-30deg", "--dl": "0.5s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <rect x="2.5" y="5" width="19" height="14" rx="4" />
                        <path d="M10 9l5 3-5 3z" />
                      </svg>
                    </i>
                    YouTube
                  </span>
                  <span className="sat" style={{ "--a": "30deg", "--dl": "1s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="4" width="18" height="14" rx="2" />
                        <path d="M3 14l5-4 4 3 3-2 6 4" />
                      </svg>
                    </i>
                    Display
                  </span>
                  <span className="sat" style={{ "--a": "90deg", "--dl": "1.5s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <rect x="3" y="5" width="18" height="14" rx="2" />
                        <path d="M3 7l9 6 9-6" />
                      </svg>
                    </i>
                    Gmail
                  </span>
                  <span className="sat" style={{ "--a": "150deg", "--dl": "2s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                        <circle cx="12" cy="9.5" r="2.5" />
                      </svg>
                    </i>
                    Maps
                  </span>
                  <span className="sat" style={{ "--a": "210deg", "--dl": "2.5s" }}>
                    <i>
                      <svg viewBox="0 0 24 24">
                        <rect x="4" y="3" width="16" height="18" rx="3" />
                        <path d="M8 8h8M8 12h8M8 16h5" />
                      </svg>
                    </i>
                    Discover
                  </span>
                </div>
              </div>

              {/* 4. YouTube */}
              <div
                className={`cm ${CT[campaignIdx].k === "youtube" ? "on" : ""}`}
                data-t="youtube"
              >
                <div className="cm-yt">
                  <div className="vid2">
                    <div className="creator">
                      <i></i>
                      <b></b>
                    </div>
                    <span className="adl2">Ad · 0:15</span>
                    <span className="skip2"></span>
                    <span className="vb"></span>
                  </div>
                  <div className="cta">
                    yourbrand.com<span>Shop now</span>
                  </div>
                </div>
              </div>

              {/* 5. Demand Gen */}
              <div
                className={`cm ${CT[campaignIdx].k === "demand" ? "on" : ""}`}
                data-t="demand"
              >
                <div className="cm-dg">
                  <div>
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>The study table built for 8-hour days</b>
                    <small>Sponsored</small>
                  </div>
                  <div>
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>Why steel beats engineered wood</b>
                    <small>Sponsored</small>
                  </div>
                  <div>
                    <div className="im">
                      <div className="prod"></div>
                    </div>
                    <b>Delivered in 4 days</b>
                    <small>Sponsored</small>
                  </div>
                </div>
              </div>

              {/* 6. Local & Maps */}
              <div
                className={`cm cm-loc ${CT[campaignIdx].k === "local" ? "on" : ""}`}
                data-t="local"
              >
                <div className="mapv"></div>
                <span className="mpulse"></span>
                <span className="mpin"></span>
                <div className="msheet">
                  <span className="ad">SPONSORED</span>
                  <b>Your Store, Udaipur</b>
                  <small>Furniture store · Open until 8 pm</small>
                  <div className="btns">
                    <span>Call</span>
                    <span>Directions</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Details */}
            <div className="ctxt sw" key={campaignIdx} aria-live="polite">
              <h3>{CT[campaignIdx].h}</h3>
              <p>{CT[campaignIdx].p}</p>
              <ul>
                {CT[campaignIdx].l.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
              <span className="best">{CT[campaignIdx].b}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROOF BAND
          ========================================================================= */}
      <section className="proof section-py py-6 md:py-8" id="results">
        <div className="wrap">
          <div className="proof-in rv">
            <div className="pcell big">
              <small>Client result · Oltao.in</small>
              <strong>₹1L → ₹90L+</strong>
              <span>Revenue growth in six months with Google + Meta Ads</span>
            </div>
            <div className="pcell">
              <strong>18x</strong>
              <span>Return on ad spend</span>
            </div>
            <div className="pcell">
              <strong>100+</strong>
              <span>Orders a month</span>
            </div>
            <div className="pcell">
              <strong>15%</strong>
              <span>Conversion rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CLOSED LOOP TRACKING
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="loop">
        <div className="wrap loopw">
          <div className="rv">
            <span className="eyebrow">Tracking</span>
            <h2>We tell Google which clicks became customers.</h2>
            <p className="lead">
              Most accounts only report form fills, so Google hunts for more form
              fills, junk included. We send back the leads and sales that were real,
              so bidding learns to find more of them.
            </p>
            <div className="tchips">
              <span>
                <i></i>Enhanced conversions
              </span>
              <span>
                <i></i>Call tracking
              </span>
              <span>
                <i></i>GA4 linked
              </span>
              <span>
                <i></i>Offline conversion import from your CRM
              </span>
            </div>
          </div>

          <div className="ring6 rv" id="ring6">
            <div className="rtrack"></div>
            <div className="orb2">
              <i></i>
            </div>

            {LOOP.map((node, i) => (
              <div
                key={i}
                className={`lnode ${loopStep === i ? "on" : ""}`}
                style={{ "--a": `${i * 60}deg` }}
                onClick={() => setLoopStep(i)}
                style={{ cursor: "pointer", "--a": `${i * 60}deg` }}
              >
                <i>
                  <svg viewBox="0 0 24 24">{node.ic}</svg>
                </i>
                {node.n}
              </div>
            ))}

            <div className="lcore sw" key={loopStep} aria-live="polite">
              <small>Step {loopStep + 1} of 6</small>
              <b>{LOOP[loopStep].n}</b>
              <p>{LOOP[loopStep].d}</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BUDGET PLANNER
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="planner">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Budget planner</span>
              <h2>What could your budget buy?</h2>
            </div>
            <div className="r">
              <p>
                Pick your industry and move the slider. You&apos;ll get rough ranges
                for a first month, the same way we sketch a plan on a call.
              </p>
            </div>
          </div>

          <div className="plan rv">
            <div className="pbox">
              <div>
                <h3>Your industry</h3>
                <div className="chips" id="ind">
                  {Object.entries(IND).map(([key, item]) => (
                    <button
                      key={key}
                      type="button"
                      aria-pressed={indKey === key}
                      onClick={() => setIndKey(key)}
                    >
                      {item.n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3>Monthly ad spend</h3>
                <div className="bud">
                  <strong id="budV">{inr(currentBudget)}</strong>
                  <span>a month on Google</span>
                </div>
                <input
                  type="range"
                  id="budR"
                  min="0"
                  max="100"
                  value={budSlider}
                  onChange={(e) => setBudSlider(+e.target.value)}
                  style={{ "--p": `${budSlider}%` }}
                  aria-label="Monthly ad spend"
                />
                <div className="rticks">
                  <span>₹25K</span>
                  <span>₹10L</span>
                </div>
              </div>
            </div>

            <div className="pres" aria-live="polite">
              <span className="goal" id="pGoal">
                Goal: {isSales ? "online sales" : "leads"} · {currInd.n}
              </span>
              <div className="pgrid">
                <div className="pcard big">
                  <span id="pMainL">
                    {isSales ? "Sales a month" : "Leads a month"}
                  </span>
                  <strong id="pMain">
                    {rng(estResults * lo, estResults * hi)}
                  </strong>
                </div>

                <div className="pcard">
                  <span>Clicks</span>
                  <strong id="pClicks">
                    {rng(estClicks * lo, estClicks * hi)}
                  </strong>
                </div>

                <div className="pcard">
                  <span>Average cost per click</span>
                  <strong id="pCpc">
                    ₹{currInd.cpc[0]}–₹{currInd.cpc[1]}
                  </strong>
                </div>

                <div className="pcard">
                  <span id="pCostL">
                    {isSales ? "Cost per sale" : "Cost per lead"}
                  </span>
                  <strong id="pCost">
                    ₹{rng(currentBudget / (estResults * hi), currentBudget / (estResults * lo))}
                  </strong>
                </div>

                <div className="pcard">
                  <span id="pExtraL">
                    {isSales
                      ? `Revenue at ₹${currInd.aov.toLocaleString("en-IN")} order`
                      : "Click-to-lead rate"}
                  </span>
                  <strong id="pExtra">
                    {isSales
                      ? `₹${rng(estResults * lo * currInd.aov, estResults * hi * currInd.aov)}`
                      : `${currInd.cvr[0]}–${currInd.cvr[1]}%`}
                  </strong>
                </div>
              </div>

              <div className="split">
                <span className="goal">How we&apos;d split it</span>
                <div className="bar">
                  <i></i>
                  <i></i>
                  <i></i>
                </div>
                <div className="lg">
                  <span>
                    <i style={{ background: "#fff" }}></i>60% search
                  </span>
                  <span>
                    <i style={{ background: "#9DBBFF" }}></i>25% {currInd.mid}
                  </span>
                  <span>
                    <i style={{ background: "#4F7FFF" }}></i>15% remarketing &amp; video
                  </span>
                </div>
              </div>

              <p className="fine">
                Rough planning ranges, not a quote or a promise. Your real numbers
                depend on your keywords, competition, offer and website, and become
                clear after the first 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FIRST 30 DAYS ROADMAP
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="plan">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Your first 30 days</span>
              <h2>From audit to clean, profitable traffic.</h2>
            </div>
            <div className="r">
              <p>
                By the end of week four you&apos;ll know which searches make you
                money, which ones we&apos;ve blocked, and where budget goes next.
              </p>
            </div>
          </div>

          <div className="days">
            <span className="prog" aria-hidden="true"></span>

            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-5-5" />
                </svg>
              </span>
              <small>Days 1–5</small>
              <h3>Audit &amp; tracking</h3>
              <p>
                We check every campaign and conversion action, set up enhanced
                conversions and call tracking, and link GA4.
              </p>
            </div>

            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <path d="M4 6h16M4 12h10M4 18h6" />
                </svg>
              </span>
              <small>Days 6–12</small>
              <h3>Keywords &amp; build</h3>
              <p>
                Keywords grouped by intent, a starting negative list, fresh ads and
                sitelinks, and your product feed cleaned for Shopping.
              </p>
            </div>

            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <path d="M5 19l14-14M9 5h10v10" />
                </svg>
              </span>
              <small>Days 13–21</small>
              <h3>Launch &amp; clean up</h3>
              <p>
                Campaigns go live. We read the search terms daily and block wasted
                searches while bidding learns.
              </p>
            </div>

            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 7h6v6" />
                </svg>
              </span>
              <small>Days 22–30</small>
              <h3>Shift &amp; scale</h3>
              <p>
                Budget moves to the keywords and products that sell, and you get a
                plain-language report with next month&apos;s plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT'S INCLUDED
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="included">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">What&apos;s included</span>
              <h2>Everything a Google Ads account needs.</h2>
            </div>
          </div>

          <div className="inc rv">
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M8 12l3 3 5-6" />
                </svg>
              </i>
              <b>Full account audit</b>
              <p>Structure, keywords, bids, ads and tracking, reviewed line by line.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M4 12h4l3-8 4 16 3-8h2" />
                </svg>
              </i>
              <b>Conversion tracking</b>
              <p>Enhanced conversions, call tracking and GA4, set up and tested.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="M20 20l-4.8-4.8" />
                </svg>
              </i>
              <b>Keyword research</b>
              <p>Grouped by intent, with match types chosen for each group.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="9" />
                  <path d="M6 6l12 12" />
                </svg>
              </i>
              <b>Weekly negative keywords</b>
              <p>Search terms reviewed and wasted searches blocked every week.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M7 9h10M7 13h6" />
                </svg>
              </i>
              <b>Ad copy &amp; extensions</b>
              <p>Responsive ads, sitelinks, callouts and call extensions, tested.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M6 7h12l-1 13H7z" />
                  <path d="M9 7a3 3 0 0 1 6 0" />
                </svg>
              </i>
              <b>Shopping feed care</b>
              <p>Titles, images and errors fixed in Merchant Center.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </i>
              <b>Weekly check-in</b>
              <p>What ran, what won and what we&apos;re changing next.</p>
            </div>

            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
                </svg>
              </i>
              <b>Monthly report</b>
              <p>Spend, cost per result and revenue, in plain language.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FAQ ACCORDION
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="faq">
        <div className="wrap">
          <div className="head rv" style={{ justifyContent: "center", textAlign: "center" }}>
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 style={{ maxWidth: "none" }}>Questions about Google Ads.</h2>
            </div>
          </div>

          <div className="faq">
            <details open>
              <summary>
                How much should I spend on Google Ads?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                It depends on how much a click costs in your industry. As a rule,
                your budget should buy at least 15 to 20 clicks a day on your main
                keywords. For most of our clients that means at least{" "}
                <em>[£1,000 / ₹50,000]</em> a month in ad spend. Our management fee
                is separate.
              </p>
            </details>

            <details>
              <summary>
                Google Ads or Meta Ads: which should I start with?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                Google catches people who are already searching for what you sell,
                so it usually brings the quickest sales. Meta creates new demand
                among people who weren&apos;t looking yet. Most brands start with
                Google search and add Meta once the basics are profitable.
              </p>
            </details>

            <details>
              <summary>
                How soon will I see results?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                Search campaigns can bring clicks and calls from day one. Expect two
                to four weeks before bidding settles and we&apos;ve cleaned the
                search terms, and longer for Performance Max and video.
              </p>
            </details>

            <details>
              <summary>
                Do you use Performance Max?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                Yes, when it fits, usually for online stores with a good product
                feed. We run it with guardrails: brand exclusions, separate asset
                groups and regular checks of where spend goes, so it doesn&apos;t
                just take credit for sales you&apos;d have made anyway.
              </p>
            </details>

            <details>
              <summary>
                Can you fix my landing pages too?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                Yes. A slow or unclear page wastes good clicks and lowers your quality
                score. We suggest fixes, and our design and development team can
                build new high-converting landing pages if you need them.
              </p>
            </details>

            <details>
              <summary>
                Who owns the ad account and the data?
                <i>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                  >
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </i>
              </summary>
              <p>
                You 100% own your Google Ads account, data and conversion tags. We
                are granted manager access, so you retain full ownership, billing
                control and historical data at all times.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA
          ========================================================================= */}
      <section className="fcta section-py py-6 md:py-8" id="audit">
        <div className="halo" aria-hidden="true"></div>
        <div className="wrap in">
          <span className="eyebrow">Free Google Ads audit</span>
          <h2>
            Stop paying for<br />
            <span className="outline">the wrong clicks.</span>
          </h2>
          <p>
            We review your Google Ads account, search terms and tracking, then walk
            you through the three biggest fixes on a 30-minute call. Free, with no
            obligation.
          </p>
          <button
            type="button"
            className="btn btn-white"
            onClick={() => handleOpenLead("Google Ads")}
          >
            Get my free audit{" "}
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            >
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>
    </main>
  );
}

