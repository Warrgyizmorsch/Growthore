"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import "./meta-ads.css";

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
const money = (a, b) => "₹" + rng(a, b);
const calcBudget = (v) => {
  const b = 25000 * Math.pow(40, v / 100);
  return b < 1e5 ? Math.round(b / 5000) * 5000 : Math.round(b / 10000) * 10000;
};

// Data Structures
const HERO_HOOKS = [
  [
    "Your geyser shouldn't take 15 minutes.",
    "Hot water in 3 minutes, not 15. See how it works.",
    "Shop now",
  ],
  [
    "3 mistakes students make before applying to the UK.",
    "Free 15-minute call with a counsellor this week.",
    "Learn more",
  ],
  [
    "We built this study table for 8-hour days.",
    "Steel frame, 5-year warranty. Delivered in 4 days.",
    "Shop now",
  ],
];

const HERO_NOTES = [
  [
    ["New lead", "Study abroad · Instant form"],
    ["New lead", "Home appliances · WhatsApp"],
    ["New lead", "Furniture · Instant form"],
  ],
  [
    ["Order placed · ₹2,499", "From a Reel ad"],
    ["Order placed · ₹8,990", "From a catalogue ad"],
    ["Order placed · ₹1,199", "From a Story ad"],
  ],
  [
    ["WhatsApp chat", '"Is this available in black?"'],
    ["WhatsApp chat", '"Do you deliver to Jaipur?"'],
    ["WhatsApp chat", '"What\'s the price for 2?"'],
  ],
  [
    ["Winning ad found", "Hook B beat Hook A"],
    ["Budget moved", "To your best Reel"],
    ["Retargeting live", "Cart viewers, last 7 days"],
  ],
];

const LAB_DATA = {
  hook: {
    q: {
      s: 58,
      t: "Why does your back hurt after two hours of study?",
      why: "Questions work when they name a pain the viewer feels right now. Too general, and people scroll past.",
    },
    claim: {
      s: 64,
      t: "The last study table you will ever buy.",
      why: "Bold claims grab attention, but they need proof in the next few seconds or trust drops.",
    },
    ba: {
      s: 79,
      t: "Same room. 10 minutes later.",
      why: "Before-and-after is one of the fastest ways to show a result. The eye catches the change before the brain decides to scroll.",
    },
    face: {
      s: 74,
      t: "I tested five study tables so you don't have to.",
      why: "A real face talking to camera feels like content, not an ad, so people give it a few more seconds.",
    },
  },
  f: {
    reel: { s: 12, why: "Reels get full-screen attention.", label: "Reel" },
    carousel: {
      s: 5,
      why: "Carousels earn swipes, and each swipe is a signal of interest.",
      label: "Carousel",
    },
    static: {
      s: 0,
      why: "Single images are quick to make, but have to win in one glance.",
      label: "Single image",
    },
  },
  cta: {
    shop: { s: 0, t: "Shop now" },
    wa: { s: 4, t: "Send WhatsApp message" },
    quote: { s: -2, t: "Get quote" },
  },
};

const FUNNEL_DATA = [
  {
    temp: "Cold",
    bars: [true, false, false],
    h: "Never heard of you",
    sub: "New people who match your best buyers.",
    badge: "Big audience",
    crowdCount: 34,
    hotCount: 2,
    who: "Broad and Advantage+ audiences, interests and lookalikes of your past buyers.",
    ads: "Reels with a strong hook, creator-style videos, problem-and-solution ads.",
    judge: "Hook rate, cost per landing-page view and new people reached.",
    share: 60,
  },
  {
    temp: "Warm",
    bars: [true, true, false],
    h: "Watched or visited",
    sub: "They've seen an ad, liked a post or opened your site.",
    badge: "Smaller, keener",
    crowdCount: 16,
    hotCount: 4,
    who: "Video viewers, profile and page engagers, and site visitors from the last 30 days.",
    ads: "Carousels, reviews, demos, comparisons and answers to common objections.",
    judge: "Click-through rate, form starts, add-to-carts and cost per lead.",
    share: 25,
  },
  {
    temp: "Hot",
    bars: [true, true, true],
    h: "Almost bought",
    sub: "Added to cart, started a form or messaged you.",
    badge: "Ready to buy",
    crowdCount: 7,
    hotCount: 5,
    who: "Cart abandoners, people who opened a form, and WhatsApp chats that didn't buy.",
    ads: "Catalogue ads for the exact product, offers, guarantees and delivery info.",
    judge: "Cost per purchase and return on ad spend.",
    share: 15,
  },
];

const INDUSTRIES = {
  edu: {
    n: "Study abroad & education",
    goal: "leads",
    cpm: [180, 260],
    ctr: [0.8, 1.3],
    cvr: [5, 10],
  },
  app: {
    n: "Home & appliances",
    goal: "sales",
    cpm: [90, 180],
    ctr: [1, 1.8],
    cvr: [1, 2],
    aov: 2500,
  },
  fur: {
    n: "Furniture",
    goal: "sales",
    cpm: [110, 220],
    ctr: [0.8, 1.4],
    cvr: [0.6, 1.4],
    aov: 9000,
  },
  d2c: {
    n: "Fashion & D2C",
    goal: "sales",
    cpm: [80, 160],
    ctr: [1, 1.8],
    cvr: [1.2, 2.5],
    aov: 1500,
  },
  re: {
    n: "Real estate",
    goal: "leads",
    cpm: [140, 280],
    ctr: [0.7, 1.2],
    cvr: [6, 12],
  },
  b2b: {
    n: "B2B services",
    goal: "leads",
    cpm: [180, 350],
    ctr: [0.6, 1.1],
    cvr: [5, 10],
  },
};

// Fixed positions for crowd dots so hydration matches perfectly
const PRESET_DOTS = [
  [
    { left: "12%", top: "18%", d: "5.2s", dl: "-1.2s", dx: "6px", dy: "-8px" },
    { left: "25%", top: "35%", d: "4.8s", dl: "-2.4s", dx: "-7px", dy: "5px" },
    { left: "42%", top: "22%", d: "6.1s", dl: "-0.5s", dx: "8px", dy: "-6px" },
    { left: "60%", top: "48%", d: "5.5s", dl: "-3.1s", dx: "-5px", dy: "7px" },
    { left: "78%", top: "25%", d: "4.5s", dl: "-1.8s", dx: "7px", dy: "-5px" },
    { left: "88%", top: "65%", d: "6.4s", dl: "-2.9s", dx: "-6px", dy: "8px" },
    { left: "16%", top: "72%", d: "5.0s", dl: "-0.8s", dx: "5px", dy: "-7px" },
    { left: "32%", top: "80%", d: "5.8s", dl: "-3.5s", dx: "-8px", dy: "6px" },
    { left: "50%", top: "70%", d: "4.9s", dl: "-1.4s", dx: "6px", dy: "-6px" },
    { left: "68%", top: "82%", d: "6.2s", dl: "-2.2s", dx: "-7px", dy: "5px" },
    { left: "10%", top: "45%", d: "5.4s", dl: "-0.9s", dx: "7px", dy: "-8px" },
    { left: "28%", top: "55%", d: "4.6s", dl: "-2.7s", dx: "-6px", dy: "6px" },
    { left: "46%", top: "42%", d: "6.0s", dl: "-1.5s", dx: "8px", dy: "-5px" },
    { left: "72%", top: "58%", d: "5.3s", dl: "-3.3s", dx: "-5px", dy: "7px" },
    { left: "84%", top: "40%", d: "4.7s", dl: "-0.4s", dx: "6px", dy: "-6px" },
    { left: "92%", top: "15%", d: "6.5s", dl: "-2.1s", dx: "-7px", dy: "8px" },
    { left: "20%", top: "12%", d: "5.1s", dl: "-1.9s", dx: "5px", dy: "-5px" },
    { left: "38%", top: "68%", d: "5.7s", dl: "-3.0s", dx: "-8px", dy: "7px" },
    { left: "54%", top: "15%", d: "4.4s", dl: "-0.7s", dx: "7px", dy: "-6px" },
    { left: "64%", top: "30%", d: "6.3s", dl: "-2.5s", dx: "-6px", dy: "5px" },
    { left: "74%", top: "75%", d: "5.6s", dl: "-1.1s", dx: "8px", dy: "-7px" },
    { left: "86%", top: "85%", d: "4.8s", dl: "-3.4s", dx: "-5px", dy: "6px" },
    { left: "8%", top: "85%", d: "6.0s", dl: "-0.6s", dx: "6px", dy: "-8px" },
    { left: "22%", top: "60%", d: "5.2s", dl: "-2.8s", dx: "-7px", dy: "5px" },
    { left: "35%", top: "32%", d: "4.9s", dl: "-1.6s", dx: "8px", dy: "-6px" },
    { left: "58%", top: "62%", d: "6.1s", dl: "-3.2s", dx: "-6px", dy: "7px" },
    { left: "80%", top: "10%", d: "5.5s", dl: "-0.3s", dx: "7px", dy: "-5px" },
    { left: "94%", top: "50%", d: "4.6s", dl: "-2.0s", dx: "-5px", dy: "8px" },
    { left: "14%", top: "30%", d: "6.2s", dl: "-1.7s", dx: "6px", dy: "-7px" },
    { left: "40%", top: "85%", d: "5.3s", dl: "-3.6s", dx: "-8px", dy: "6px" },
    { left: "62%", top: "12%", d: "4.7s", dl: "-0.5s", dx: "7px", dy: "-6px" },
    { left: "76%", top: "45%", d: "6.4s", dl: "-2.3s", dx: "-6px", dy: "5px" },
    { left: "48%", top: "55%", d: "5.1s", dl: "-1.3s", dx: "8px", dy: "-7px" },
    { left: "30%", top: "15%", d: "5.9s", dl: "-2.6s", dx: "-7px", dy: "6px" },
  ],
  [
    { left: "15%", top: "25%", d: "5.2s", dl: "-1.0s", dx: "6px", dy: "-8px" },
    { left: "32%", top: "40%", d: "4.8s", dl: "-2.2s", dx: "-7px", dy: "5px" },
    { left: "55%", top: "20%", d: "6.1s", dl: "-0.5s", dx: "8px", dy: "-6px" },
    { left: "72%", top: "50%", d: "5.5s", dl: "-3.0s", dx: "-5px", dy: "7px" },
    { left: "85%", top: "30%", d: "4.5s", dl: "-1.5s", dx: "7px", dy: "-5px" },
    { left: "20%", top: "70%", d: "6.4s", dl: "-2.8s", dx: "-6px", dy: "8px" },
    { left: "45%", top: "75%", d: "5.0s", dl: "-0.8s", dx: "5px", dy: "-7px" },
    { left: "68%", top: "78%", d: "5.8s", dl: "-3.2s", dx: "-8px", dy: "6px" },
    { left: "25%", top: "50%", d: "4.9s", dl: "-1.3s", dx: "6px", dy: "-6px" },
    { left: "60%", top: "65%", d: "6.2s", dl: "-2.0s", dx: "-7px", dy: "5px" },
    { left: "38%", top: "22%", d: "5.4s", dl: "-0.9s", dx: "7px", dy: "-8px" },
    { left: "80%", top: "65%", d: "4.6s", dl: "-2.5s", dx: "-6px", dy: "6px" },
    { left: "10%", top: "40%", d: "6.0s", dl: "-1.6s", dx: "8px", dy: "-5px" },
    { left: "50%", top: "45%", d: "5.3s", dl: "-3.4s", dx: "-5px", dy: "7px" },
    { left: "90%", top: "20%", d: "4.7s", dl: "-0.4s", dx: "6px", dy: "-6px" },
    { left: "35%", top: "60%", d: "6.3s", dl: "-2.1s", dx: "-7px", dy: "8px" },
  ],
  [
    { left: "20%", top: "30%", d: "5.0s", dl: "-1.0s", dx: "6px", dy: "-7px" },
    { left: "45%", top: "25%", d: "4.5s", dl: "-2.0s", dx: "-6px", dy: "6px" },
    { left: "70%", top: "35%", d: "6.0s", dl: "-0.5s", dx: "7px", dy: "-5px" },
    { left: "28%", top: "65%", d: "5.5s", dl: "-3.0s", dx: "-7px", dy: "7px" },
    { left: "55%", top: "70%", d: "4.8s", dl: "-1.5s", dx: "8px", dy: "-6px" },
    { left: "80%", top: "60%", d: "6.2s", dl: "-2.5s", dx: "-5px", dy: "8px" },
    { left: "50%", top: "50%", d: "5.2s", dl: "-0.8s", dx: "6px", dy: "-6px" },
  ],
];

export default function MetaAdsPage() {
  const heroRef = useRef(null);
  const pipeRef = useRef(null);
  const fmtsRef = useRef(null);

  // Hero rotations
  const [heroHookIdx, setHeroHookIdx] = useState(0);
  const [heroLikes, setHeroLikes] = useState(2184);
  const [noteIndices, setNoteIndices] = useState([0, 0, 0, 0]);
  const [swappedNotes, setSwappedNotes] = useState([
    false,
    false,
    false,
    false,
  ]);

  // Creative Lab State
  const [labHook, setLabHook] = useState("ba");
  const [labFormat, setLabFormat] = useState("reel");
  const [labCta, setLabCta] = useState("wa");
  const [labScoreDisplay, setLabScoreDisplay] = useState(95);
  const [isFlashing, setIsFlashing] = useState(false);
  const prevScoreRef = useRef(95);

  // Funnel State
  const [activeFunnel, setActiveFunnel] = useState(0);
  const funnelStopRef = useRef(false);

  // Tracking pipe simulation
  const [trackingMode, setTrackingMode] = useState("px"); // 'px' | 'capi'
  const trackingModeRef = useRef("px");
  trackingModeRef.current = trackingMode;

  // Budget planner state
  const [indKey, setIndKey] = useState("edu");
  const [budSlider, setBudSlider] = useState(45);

  // Open Lead Modal helper
  const handleOpenLead = (channel = "Performance Marketing") => {
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

  // 2. Hero Tickers: Hooks, Notifications, Likes
  useEffect(() => {
    // Rotating Reel Hooks
    const hookTimer = setInterval(() => {
      setHeroHookIdx((prev) => (prev + 1) % HERO_HOOKS.length);
    }, 4000);

    // Likes counter increment
    const likesTimer = setInterval(() => {
      setHeroLikes((prev) => prev + Math.floor(Math.random() * 4) + 1);
    }, 1500);

    // 4 Floating Notifications rotation with smooth fade
    const noteTimers = [0, 1, 2, 3].map((k) => {
      let timeoutId;
      const initialDelay = k * 1100;
      timeoutId = setTimeout(() => {
        const intervalId = setInterval(() => {
          setSwappedNotes((prev) => {
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
            setSwappedNotes((prev) => {
              const next = [...prev];
              next[k] = false;
              return next;
            });
          }, 350);
        }, 4400);
        return () => clearInterval(intervalId);
      }, initialDelay);
      return () => clearTimeout(timeoutId);
    });

    return () => {
      clearInterval(hookTimer);
      clearInterval(likesTimer);
      noteTimers.forEach((cleanup) => cleanup && cleanup());
    };
  }, []);

  // 3. Creative Lab Score Animation
  const selectedHook = LAB_DATA.hook[labHook];
  const selectedFmt = LAB_DATA.f[labFormat];
  const selectedCta = LAB_DATA.cta[labCta];
  const targetScore = Math.max(
    20,
    Math.min(96, selectedHook.s + selectedFmt.s + selectedCta.s),
  );

  useEffect(() => {
    const from = prevScoreRef.current;
    const to = targetScore;
    prevScoreRef.current = to;
    setIsFlashing(true);
    const flashTimer = setTimeout(() => setIsFlashing(false), 500);

    const startTime = performance.now();
    const duration = 600;
    let animId;

    const tick = (now) => {
      const elapsed = now - startTime;
      const k = Math.min(1, elapsed / duration);
      const current = Math.round(from + (to - from) * (1 - Math.pow(1 - k, 3)));
      setLabScoreDisplay(current);
      if (k < 1) {
        animId = requestAnimationFrame(tick);
      }
    };
    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(flashTimer);
    };
  }, [targetScore]);

  const altHookKey =
    Object.keys(LAB_DATA.hook).find((k) => k !== labHook) || "face";
  const altHookLabel =
    altHookKey === "ba"
      ? "before-and-after"
      : altHookKey === "face"
        ? "face-to-camera"
        : altHookKey === "claim"
          ? "bold-claim"
          : "question";

  // 4. Funnel Auto-Rotation
  useEffect(() => {
    const timer = setInterval(() => {
      if (!funnelStopRef.current) {
        setActiveFunnel((prev) => (prev + 1) % 3);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // 5. Tracking Pipeline Live Packet Animation (Web Animations API)
  useEffect(() => {
    const pipe = pipeRef.current;
    if (!pipe) return;

    const EV = [
      "Purchase",
      "Lead",
      "AddToCart",
      "ViewContent",
      "InitiateCheckout",
      "Purchase",
      "Lead",
    ];
    let pk = 0;

    const createPacket = () => {
      if (!pipe || !pipe.clientWidth) return;
      const W = pipe.clientWidth;
      const H = pipe.clientHeight;
      const el = document.createElement("span");
      el.className = "pk";
      el.textContent = EV[pk++ % EV.length];
      pipe.appendChild(el);

      const ew = el.offsetWidth || 70;
      const eh = el.offsetHeight || 24;
      const pad = W < 520 ? (W < 380 ? 44 : 64) : 100;
      const x0 = pad;
      const x1 = Math.max(x0 + 40, W - pad - ew);
      const yT = H * 0.34 - eh / 2;
      const yB = H * 0.7 - eh / 2;
      const wx = Math.max(x0 + 20, W * 0.58 - ew - 4);
      const isBlocked = Math.random() < 0.4;
      const currentMode = trackingModeRef.current;

      const fin = () => {
        if (el && el.parentNode) {
          el.parentNode.removeChild(el);
        }
      };

      if (!isBlocked) {
        el.animate(
          [
            { transform: `translate(${x0}px, ${yT}px)`, opacity: 0 },
            { opacity: 1, offset: 0.1 },
            {
              transform: `translate(${x1}px, ${yT}px)`,
              opacity: 1,
              offset: 0.92,
            },
            { transform: `translate(${x1 + 20}px, ${yT}px)`, opacity: 0 },
          ],
          { duration: 3000, easing: "linear" },
        ).onfinish = fin;
        return;
      }

      if (currentMode === "px") {
        el.classList.add("lost-pre");
        const anim = el.animate(
          [
            { transform: `translate(${x0}px, ${yT}px)`, opacity: 0 },
            { opacity: 1, offset: 0.15 },
            {
              transform: `translate(${wx}px, ${yT}px)`,
              opacity: 1,
              offset: 0.75,
            },
            { transform: `translate(${wx}px, ${yT + 18}px)`, opacity: 0 },
          ],
          { duration: 2400, easing: "linear" },
        );
        setTimeout(() => el.classList.add("lost"), 1700);
        anim.onfinish = fin;
        return;
      }

      // Server CAPI bypasses wall on bottom lane
      el.classList.add("srv");
      el.animate(
        [
          { transform: `translate(${x0}px, ${yB}px)`, opacity: 0 },
          { opacity: 1, offset: 0.1 },
          {
            transform: `translate(${x1}px, ${yB}px)`,
            opacity: 1,
            offset: 0.92,
          },
          { transform: `translate(${x1 + 20}px, ${yB}px)`, opacity: 0 },
        ],
        { duration: 3000, easing: "linear" },
      ).onfinish = fin;
    };

    const intervalTime = pipe.clientWidth < 500 ? 1100 : 700;
    const packetInterval = setInterval(createPacket, intervalTime);
    createPacket();

    return () => clearInterval(packetInterval);
  }, []);

  // 6. Formats Carousel Scroll & Drag
  const scrollFormats = (dir) => {
    if (fmtsRef.current) {
      const step = 318;
      fmtsRef.current.scrollBy({ left: dir * step, behavior: "smooth" });
    }
  };

  useEffect(() => {
    const fm = fmtsRef.current;
    if (!fm) return;

    let down = false;
    let dx0 = 0;
    let sl0 = 0;

    const onPointerDown = (e) => {
      if (e.pointerType !== "mouse") return;
      down = true;
      dx0 = e.clientX;
      sl0 = fm.scrollLeft;
    };

    const onPointerMove = (e) => {
      if (!down) return;
      const d = e.clientX - dx0;
      if (Math.abs(d) > 5) {
        fm.classList.add("drag");
      }
      fm.scrollLeft = sl0 - d;
    };

    const onPointerUp = () => {
      if (!down) return;
      down = false;
      fm.classList.remove("drag");
    };

    fm.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      fm.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, []);

  // 7. Budget Planner calculations
  const I = INDUSTRIES[indKey];
  const B = calcBudget(budSlider);
  const midVal = (a) => (a[0] + a[1]) / 2;
  const lo = 0.75;
  const hi = 1.3;
  const imp = (B / midVal(I.cpm)) * 1000;
  const clk = (imp * midVal(I.ctr)) / 100;
  const res = (clk * midVal(I.cvr)) / 100;
  const reachLo = (imp / 2.6) * lo;
  const reachHi = (imp / 2.6) * hi;
  const clkLo = clk * lo;
  const clkHi = clk * hi;
  const resLo = res * lo;
  const resHi = res * hi;
  const isSales = I.goal === "sales";

  return (
    <main
      id="top"
      className="page-meta-ads"
      style={{
        minHeight: "100vh",
        background: "var(--bg)",
        color: "var(--fg)",
      }}
    >
      {/* =========================================================================
          HERO SECTION (Exact structure from WM_Digital_Meta_Ads)
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
                Stop
              </span>
              <span className="w" style={{ "--i": 1 }}>
                the
              </span>
              <span className="pills" aria-hidden="true">
                <span className="pl fb">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 8h3V4h-3c-2.8 0-4.5 1.8-4.5 4.6V11H7v4h2.5v8h4.2v-8H17l.6-4h-3.9V9c0-.6.4-1 1-1z" />
                  </svg>
                </span>
                <span className="pl ig">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5.5" />
                    <circle cx="12" cy="12" r="4.2" />
                    <circle
                      cx="17.4"
                      cy="6.6"
                      r="1.1"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </span>
                <span className="pl wa">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinejoin="round"
                  >
                    <path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3.5 20.5l1.3-4.1a8.6 8.6 0 1 1 15.7-4.8z" />
                    <path
                      d="M9 8.6c.2 2.9 2.6 5.6 6 6.3l1.2-1.5-2-1.1-1 .7a4.6 4.6 0 0 1-2.4-2.4l.7-1-1.1-2z"
                      fill="currentColor"
                      stroke="none"
                    />
                  </svg>
                </span>
              </span>
              <span className="w" style={{ "--i": 2 }}>
                scroll.
              </span>
            </span>
            <span className="bl">
              <span className="w outline" style={{ "--i": 3 }}>
                Start
              </span>
              <span className="w" style={{ "--i": 4 }}>
                the sales.
              </span>
            </span>
          </h1>

          <p className="ma-sub">
            We plan, make and run{" "}
            <strong>
              Facebook and Instagram ads that people actually stop for
            </strong>
            , then track every lead and sale back to the ad that brought it in.
          </p>

          <div className="ma-ctas">
            <button
              type="button"
              className="btn btn-white"
              onClick={() => handleOpenLead("Performance Marketing")}
            >
              Get a free Meta ads audit{" "}
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
            <a href="#lab" className="btn btn-ghost">
              Try the creative lab
            </a>
          </div>

          {/* 3 PHONES HERO STAGE */}
          <div
            className="stage3"
            aria-label="Demo of a Story ad, a Reel ad and a Feed ad"
          >
            <div className="ring b" aria-hidden="true"></div>
            <div className="ring a" aria-hidden="true"></div>
            <div className="glowc" aria-hidden="true"></div>

            {/* LEFT PHONE: STORY MOCKUP */}
            <div className="mph pl3" aria-hidden="true">
              <div className="sc">
                <div className="st-bg"></div>
                <div className="st-bars">
                  <i>
                    <b></b>
                  </i>
                  <i>
                    <b></b>
                  </i>
                  <i>
                    <b></b>
                  </i>
                </div>
                <div className="st-head sp">
                  <span className="av">YB</span>
                  <span>
                    yourbrand<small>Sponsored</small>
                  </span>
                </div>
                <div className="prod"></div>
                <div className="sticker">
                  <small>FESTIVE DROP</small>30% OFF
                </div>
                <div className="st-cta">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                  >
                    <path d="M6 14l6-6 6 6" />
                  </svg>
                  <span>Shop now</span>
                </div>
              </div>
              <span className="lbl">Story</span>
            </div>

            {/* CENTER PHONE: REEL MOCKUP */}
            <div className="mph pc" aria-hidden="true">
              <div className="sc">
                <div className="rl-bg">
                  <span className="blob b1"></span>
                  <span className="blob b2"></span>
                </div>
                <div className="creator">
                  <i></i>
                  <b></b>
                </div>
                <div className="rl-top">
                  <span>Reels</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                  >
                    <rect x="3" y="6" width="18" height="13" rx="3" />
                    <circle cx="12" cy="12.5" r="3" />
                  </svg>
                </div>
                <p className="hook in" key={`hook-${heroHookIdx}`} id="hook">
                  <span>{HERO_HOOKS[heroHookIdx][0]}</span>
                </p>
                <div className="rail">
                  <span className="hrt">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20s-7-4.4-9-9.1C1.6 7.4 4 4 7.4 4c2 0 3.6 1.2 4.6 2.8C13 5.2 14.6 4 16.6 4 20 4 22.4 7.4 21 10.9 19 15.6 12 20 12 20z" />
                    </svg>
                    12.4K
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24">
                      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
                    </svg>
                    318
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24">
                      <path d="M22 3L11 13M22 3l-7 19-4-9-9-4z" />
                    </svg>
                    Share
                  </span>
                </div>
                <div className="rl-foot">
                  <div className="sp">
                    <span className="av">YB</span>
                    <span>
                      yourbrand<small>Sponsored</small>
                    </span>
                  </div>
                  <p id="hookCap">{HERO_HOOKS[heroHookIdx][1]}</p>
                  <div
                    className="rcta go"
                    key={`rcta-${heroHookIdx}`}
                    id="rcta"
                  >
                    <span>{HERO_HOOKS[heroHookIdx][2]}</span>
                    <span>›</span>
                  </div>
                </div>
                <div className="rprog">
                  <i className="go" key={`prog-${heroHookIdx}`} id="rprog"></i>
                </div>
              </div>
              <span className="lbl">Reel</span>
            </div>

            {/* RIGHT PHONE: FEED MOCKUP */}
            <div className="mph pr3" aria-hidden="true">
              <div className="sc">
                <div className="fd-top">
                  Feed
                  <span>
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20s-7-4.4-9-9.1C1.6 7.4 4 4 7.4 4c2 0 3.6 1.2 4.6 2.8C13 5.2 14.6 4 16.6 4 20 4 22.4 7.4 21 10.9 19 15.6 12 20 12 20z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M22 3L11 13M22 3l-7 19-4-9-9-4z" />
                    </svg>
                  </span>
                </div>
                <div className="fd-post">
                  <div className="sp">
                    <span className="av">YB</span>
                    <span>
                      yourbrand<small>Sponsored</small>
                    </span>
                  </div>
                  <div className="fd-media">
                    <div className="fd-track">
                      <div className="fd-slide">
                        <div className="prod"></div>
                        <em>Classic</em>
                      </div>
                      <div className="fd-slide">
                        <div className="prod"></div>
                        <em>Compact</em>
                      </div>
                      <div className="fd-slide">
                        <div className="prod"></div>
                        <em>Pro</em>
                      </div>
                    </div>
                    <span className="fd-dots">1/3</span>
                  </div>
                  <div className="fcta2">
                    <span>
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#fff"
                        strokeWidth="2.2"
                        strokeLinejoin="round"
                      >
                        <path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3.5 20.5l1.3-4.1a8.6 8.6 0 1 1 15.7-4.8z" />
                      </svg>
                      Send WhatsApp message
                    </span>
                    <span>›</span>
                  </div>
                  <div className="fd-act">
                    <svg viewBox="0 0 24 24">
                      <path d="M12 20s-7-4.4-9-9.1C1.6 7.4 4 4 7.4 4c2 0 3.6 1.2 4.6 2.8C13 5.2 14.6 4 16.6 4 20 4 22.4 7.4 21 10.9 19 15.6 12 20 12 20z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M21 12a8.5 8.5 0 0 1-12.6 7.4L3 21l1.6-5.2A8.5 8.5 0 1 1 21 12z" />
                    </svg>
                    <svg viewBox="0 0 24 24">
                      <path d="M22 3L11 13M22 3l-7 19-4-9-9-4z" />
                    </svg>
                  </div>
                  <div className="fd-meta">
                    <b id="likes">{heroLikes.toLocaleString("en-IN")}</b> likes
                    <i></i>
                    <i></i>
                  </div>
                </div>
              </div>
              <span className="lbl">Feed</span>
            </div>

            {/* 4 FLOATING NOTIFICATION PILLS */}
            <div className={`nt n1 ${swappedNotes[0] ? "sw" : ""}`}>
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
                <b>{HERO_NOTES[0][noteIndices[0]][0]}</b>
                <small>{HERO_NOTES[0][noteIndices[0]][1]}</small>
              </span>
            </div>

            <div className={`nt n2 ${swappedNotes[1] ? "sw" : ""}`}>
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
                <b>{HERO_NOTES[1][noteIndices[1]][0]}</b>
                <small>{HERO_NOTES[1][noteIndices[1]][1]}</small>
              </span>
            </div>

            <div className={`nt n3 ${swappedNotes[2] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinejoin="round"
                >
                  <path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3.5 20.5l1.3-4.1a8.6 8.6 0 1 1 15.7-4.8z" />
                </svg>
              </span>
              <span className="tx">
                <b>{HERO_NOTES[2][noteIndices[2]][0]}</b>
                <small>{HERO_NOTES[2][noteIndices[2]][1]}</small>
              </span>
            </div>

            <div className={`nt n4 ${swappedNotes[3] ? "sw" : ""}`}>
              <span className="ic">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 17l6-6 4 4 8-8" />
                  <path d="M15 7h6v6" />
                </svg>
              </span>
              <span className="tx">
                <b>{HERO_NOTES[3][noteIndices[3]][0]}</b>
                <small>{HERO_NOTES[3][noteIndices[3]][1]}</small>
              </span>
            </div>

            <span className="tag-demo">Demo ads · your creatives go here</span>
          </div>
        </div>
      </section>

      {/* =========================================================================
          MARQUEE TAPE: PLACEMENTS (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <div className="tape-wrap" aria-hidden="true">
        <div className="tape">
          <div className="track">
            <span>Facebook Feed</span>
            <span className="dot"></span>
            <span>Instagram Reels</span>
            <span className="dot"></span>
            <span>Stories</span>
            <span className="dot"></span>
            <span>Explore</span>
            <span className="dot"></span>
            <span>Messenger</span>
            <span className="dot"></span>
            <span>Click-to-WhatsApp</span>
            <span className="dot"></span>
            <span>Marketplace</span>
            <span className="dot"></span>
            <span>Instant forms</span>
            <span className="dot"></span>
            <span>Catalogue ads</span>
            <span className="dot"></span>
            <span>Facebook Feed</span>
            <span className="dot"></span>
            <span>Instagram Reels</span>
            <span className="dot"></span>
            <span>Stories</span>
            <span className="dot"></span>
            <span>Explore</span>
            <span className="dot"></span>
            <span>Messenger</span>
            <span className="dot"></span>
            <span>Click-to-WhatsApp</span>
            <span className="dot"></span>
            <span>Marketplace</span>
            <span className="dot"></span>
            <span>Instant forms</span>
            <span className="dot"></span>
            <span>Catalogue ads</span>
            <span className="dot"></span>
          </div>
        </div>
      </div>

      {/* =========================================================================
          CREATIVE LAB SECTION (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="lab">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Creative lab</span>
              <h2>Build an ad. See if it stops the thumb.</h2>
            </div>
            <div className="r">
              <p>
                On Meta, the creative does most of the targeting. Mix a hook, a
                format and a call to action, and see how we&apos;d rate it
                before spending a rupee.
              </p>
            </div>
          </div>

          <div className="lab rv">
            {/* Left Controls */}
            <div className="lab-ctl">
              <div className="lgrp">
                <b>
                  <i>1</i>Hook <small>the first three seconds</small>
                </b>
                <div className="chips">
                  {[
                    { id: "q", label: "Question" },
                    { id: "claim", label: "Bold claim" },
                    { id: "ba", label: "Before & after" },
                    { id: "face", label: "Face to camera" },
                  ].map((h) => (
                    <button
                      key={h.id}
                      type="button"
                      aria-pressed={labHook === h.id}
                      onClick={() => setLabHook(h.id)}
                    >
                      {h.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lgrp">
                <b>
                  <i>2</i>Format
                </b>
                <div className="chips">
                  {[
                    { id: "reel", label: "Reel" },
                    { id: "carousel", label: "Carousel" },
                    { id: "static", label: "Single image" },
                  ].map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      aria-pressed={labFormat === f.id}
                      onClick={() => setLabFormat(f.id)}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="lgrp">
                <b>
                  <i>3</i>Call to action
                </b>
                <div className="chips">
                  {[
                    { id: "shop", label: "Shop now" },
                    { id: "wa", label: "Send WhatsApp message" },
                    { id: "quote", label: "Get quote" },
                  ].map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      aria-pressed={labCta === c.id}
                      onClick={() => setLabCta(c.id)}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Output */}
            <div
              className={`lab-out ${isFlashing ? "flash" : ""}`}
              data-f={labFormat}
            >
              <span className="tag-demo">Illustrative</span>
              <div className="lph" aria-hidden="true">
                <div className="sc">
                  <div className="lv">
                    <div className="sp">
                      <span className="av">YB</span>
                      <span>
                        yourbrand<small>Sponsored</small>
                      </span>
                    </div>

                    <div className="lmedia">
                      {labHook === "ba" ? (
                        <div className="lscene ba">
                          <div className="half b4">
                            <div className="mess"></div>
                            <em>BEFORE</em>
                          </div>
                          <div
                            className="half lscene"
                            style={{ position: "relative" }}
                          >
                            <div className="desk"></div>
                            <div className="lamp"></div>
                            <div className="glowL"></div>
                            <em
                              style={{
                                position: "absolute",
                                left: 8,
                                top: 8,
                                fontStyle: "normal",
                                fontSize: 10,
                                fontWeight: 800,
                                padding: "3px 7px",
                                borderRadius: 5,
                                background: "rgba(0,0,0,.5)",
                              }}
                            >
                              AFTER
                            </em>
                          </div>
                        </div>
                      ) : labHook === "face" ? (
                        <div className="lscene">
                          <div className="face">
                            <i></i>
                            <b></b>
                          </div>
                        </div>
                      ) : (
                        <div className="lscene">
                          <div className="desk"></div>
                          <div className="lamp"></div>
                          <div className="glowL"></div>
                        </div>
                      )}
                      <span className="ldots">1/4</span>
                    </div>

                    <p className="lhook">
                      <span>{selectedHook.t}</span>
                    </p>

                    <div className="lcta">
                      <span>{selectedCta.t}</span>
                      <span>›</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Score Meter */}
              <div className="lscore" aria-live="polite">
                <small>Thumb-stop score</small>
                <strong>
                  <span>{labScoreDisplay}</span>
                  <em> / 100</em>
                </strong>
                <div className="meter">
                  <i style={{ width: `${targetScore}%` }}></i>
                </div>
                <p>
                  {selectedHook.why} {selectedFmt.why}
                </p>
                <p className="next">
                  <b>What we&apos;d test against it:</b> the same ad with a{" "}
                  {altHookLabel} hook
                  {labFormat !== "reel" ? ", cut as a Reel" : ""}. Meta then
                  shows more of whichever wins.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FUNNEL SECTION (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="funnel">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">How we structure your account</span>
              <h2>One account. Three temperatures.</h2>
            </div>
            <div className="r">
              <p>
                Strangers, browsers and almost-buyers need different ads. We run
                all three at once, so every rupee does the job it&apos;s best
                at.
              </p>
            </div>
          </div>

          <div className="fun rv" role="tablist" aria-label="Funnel stages">
            {FUNNEL_DATA.map((stg, idx) => (
              <button
                key={stg.temp}
                className="fstage"
                role="tab"
                aria-selected={activeFunnel === idx}
                onClick={() => {
                  setActiveFunnel(idx);
                  funnelStopRef.current = true;
                }}
              >
                <span className="temp">
                  {stg.temp}
                  <span>
                    {stg.bars.map((on, bIdx) => (
                      <i key={bIdx} className={on ? "on" : ""}></i>
                    ))}
                  </span>
                </span>
                <h3>{stg.h}</h3>
                <p>{stg.sub}</p>
                <div className="crowd">
                  {PRESET_DOTS[idx].map((dot, dotIdx) => (
                    <i
                      key={dotIdx}
                      className={dotIdx < stg.hotCount ? "hot" : ""}
                      style={{
                        left: dot.left,
                        top: dot.top,
                        "--d": dot.d,
                        "--dl": dot.dl,
                        "--dx": dot.dx,
                        "--dy": dot.dy,
                      }}
                    ></i>
                  ))}
                  <span className="cnt">{stg.badge}</span>
                </div>
              </button>
            ))}
            <span className="arrow a1" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
            <span className="arrow a2" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
              >
                <path d="M9 6l6 6-6 6" />
              </svg>
            </span>
          </div>

          {/* Details breakdown */}
          <div className="fdet rv" aria-live="polite">
            <div>
              <small>Who we target</small>
              <p>{FUNNEL_DATA[activeFunnel].who}</p>
            </div>
            <div>
              <small>Ads we show</small>
              <p>{FUNNEL_DATA[activeFunnel].ads}</p>
            </div>
            <div>
              <small>How we judge it</small>
              <p>{FUNNEL_DATA[activeFunnel].judge}</p>
            </div>
            <div className="share">
              <small>Typical budget share</small>
              <strong>{FUNNEL_DATA[activeFunnel].share}%</strong>
              <div className="meter">
                <i style={{ width: `${FUNNEL_DATA[activeFunnel].share}%` }}></i>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FORMATS SCROLLER (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section
        className="sec section-py py-6 md:py-8"
        id="formats"
        style={{ overflow: "hidden" }}
      >
        <div className="wrap">
          <div className="head rv fmt-head" style={{ alignItems: "flex-end" }}>
            <div>
              <span className="eyebrow">Ad formats</span>
              <h2>Six ways we get you in front of buyers.</h2>
            </div>
            <div className="fnav">
              <button
                type="button"
                onClick={() => scrollFormats(-1)}
                aria-label="Previous formats"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => scrollFormats(1)}
                aria-label="More formats"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="fmts rv" ref={fmtsRef}>
          {/* Format 1: Reels */}
          <article className="fm">
            <div className="fvis">
              <div className="mini m-reel">
                <div className="sc">
                  <div className="cap">
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                  <span className="play"></span>
                  <span className="bar"></span>
                </div>
              </div>
            </div>
            <div className="fb2">
              <h3>Reels ads</h3>
              <p>
                Short vertical videos with a hook in the first second and
                captions for sound-off viewing.
              </p>
              <span className="best">Best for reaching new buyers</span>
            </div>
          </article>

          {/* Format 2: Carousels */}
          <article className="fm">
            <div className="fvis">
              <div className="m-car">
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
            <div className="fb2">
              <h3>Carousels</h3>
              <p>
                Up to ten swipeable cards to show a range, a process or a
                before-and-after.
              </p>
              <span className="best">Best for ranges and comparisons</span>
            </div>
          </article>

          {/* Format 3: Catalogue */}
          <article className="fm">
            <div className="fvis">
              <div className="m-cat">
                <i data-p="₹1,299"></i>
                <i data-p="₹899"></i>
                <i data-p="₹2,499"></i>
                <i data-p="₹649"></i>
              </div>
            </div>
            <div className="fb2">
              <h3>Catalogue ads</h3>
              <p>
                Your product feed turned into ads that show each person the
                items they viewed.
              </p>
              <span className="best">Best for online stores</span>
            </div>
          </article>

          {/* Format 4: Instant forms */}
          <article className="fm">
            <div className="fvis">
              <div className="m-form">
                <b>Get your free counselling call</b>
                <span style={{ "--dl": "0s" }}>Rahul Sharma</span>
                <span style={{ "--dl": ".4s" }}>+91 98765 43210</span>
                <span style={{ "--dl": ".8s" }}>UK · September intake</span>
                <em>Submit</em>
              </div>
            </div>
            <div className="fb2">
              <h3>Instant lead forms</h3>
              <p>
                A form that opens inside Facebook or Instagram, with qualifying
                questions to filter out time-wasters.
              </p>
              <span className="best">Best for services and education</span>
            </div>
          </article>

          {/* Format 5: Click to WhatsApp */}
          <article className="fm">
            <div className="fvis">
              <div className="m-wa">
                <i className="them">Hi! Is the 3-seater available in grey?</i>
                <i className="me">Yes! Ships in 4 days. Want photos?</i>
                <i className="them">Yes please 🙌</i>
                <i className="me">Sending now. Delivery to Udaipur is free.</i>
              </div>
            </div>
            <div className="fb2">
              <h3>Click-to-WhatsApp</h3>
              <p>
                The ad opens a WhatsApp chat with your team, so buyers ask their
                question and you close the sale in chat.
              </p>
              <span className="best">Best for high-trust purchases</span>
            </div>
          </article>

          {/* Format 6: Stories */}
          <article className="fm">
            <div className="fvis">
              <div className="mini m-sto">
                <div className="sc">
                  <div className="sb">
                    <i style={{ "--dl": "0s" }}></i>
                    <i style={{ "--dl": "-2s" }}></i>
                    <i style={{ "--dl": "-4s" }}></i>
                  </div>
                  <div className="prod"></div>
                  <span className="up">Shop now</span>
                </div>
              </div>
            </div>
            <div className="fb2">
              <h3>Stories</h3>
              <p>
                Full-screen ads between friends&apos; stories. Quick, bold and
                perfect for offers.
              </p>
              <span className="best">Best for launches and sales</span>
            </div>
          </article>
        </div>
      </section>

      {/* =========================================================================
          PROOF BAND (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="proof section-py py-6 md:py-8" id="results">
        <div className="wrap">
          <div className="proof-in rv">
            <div className="pcell big">
              <small>Client result · Oltao.in</small>
              <strong>₹1L → ₹90L+</strong>
              <span>Revenue growth in six months with Meta + Google Ads</span>
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
          TRACKING / CONVERSIONS API PIPE (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="tracking">
        <div className="wrap sig">
          <div className="rv">
            <span className="eyebrow">Tracking</span>
            <h2>Meta can only learn from what it can see.</h2>
            <p className="lead">
              Ad blockers, iPhone privacy settings and cookie banners hide a
              share of your sales from Meta. Fewer signals means slower learning
              and pricier results. We fix that before we spend.
            </p>
            <div className="seg" role="group" aria-label="Tracking setup">
              <button
                type="button"
                aria-pressed={trackingMode === "px"}
                onClick={() => setTrackingMode("px")}
              >
                Pixel only
              </button>
              <button
                type="button"
                aria-pressed={trackingMode === "capi"}
                onClick={() => setTrackingMode("capi")}
              >
                Pixel + Conversions API
              </button>
            </div>
            <p className="sig-note">
              {trackingMode === "px"
                ? "With only the browser pixel, roughly a third or more of conversions can go missing, so Meta optimises on partial data."
                : "Conversions API sends the same events from your server, so blocked ones still reach Meta. We also send back qualified leads and sales from your CRM."}
            </p>
          </div>

          <div
            className={`pipe rv ${trackingMode === "capi" ? "capi" : ""}`}
            ref={pipeRef}
            aria-hidden="true"
          >
            <span className="tag-demo">Illustrative</span>
            <div className="node site">
              <svg viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="14" rx="2" />
                <path d="M3 8h18M8 21h8" />
              </svg>
              Your site
            </div>
            <div className="node meta">
              <svg viewBox="0 0 24 24">
                <path d="M3 15c0-5 2.5-8 4.8-8 3 0 5.4 10 8.4 10 1.8 0 3.8-1.5 3.8-5s-1.8-5-3.6-5C13.5 7 11 17 7.6 17 5 17 3 16 3 15z" />
              </svg>
              Meta
            </div>
            <span className="lane top"></span>
            <span className="lname t">Browser pixel</span>
            <span className="lane bot"></span>
            <span className="lname b">Server · Conversions API</span>
            <span className="wall"></span>
            <span className="wtag">
              Ad blockers · iOS privacy
              <br />· cookie consent
            </span>

            <div className="seen">
              <span>Sales Meta sees</span>
              <div className="meter">
                <i
                  style={{ width: trackingMode === "capi" ? "92%" : "60%" }}
                ></i>
              </div>
              <strong>
                {trackingMode === "capi" ? "~9 in 10" : "~6 in 10"}
              </strong>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          BUDGET PLANNER (Exact from WM_Digital_Meta_Ads)
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
                Pick your industry and move the slider. You&apos;ll get rough
                ranges for a first month, the same way we sketch a plan on a
                call.
              </p>
            </div>
          </div>

          <div className="plan rv">
            <div className="pbox">
              <div>
                <h3>Your industry</h3>
                <div className="chips">
                  {Object.entries(INDUSTRIES).map(([k, item]) => (
                    <button
                      key={k}
                      type="button"
                      aria-pressed={indKey === k}
                      onClick={() => setIndKey(k)}
                    >
                      {item.n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3>Monthly ad spend</h3>
                <div className="bud">
                  <strong>{inr(B)}</strong>
                  <span>a month on Meta</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={budSlider}
                  onChange={(e) => setBudSlider(Number(e.target.value))}
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
              <span className="goal">
                Goal: {isSales ? "online sales" : "leads"} · {I.n}
              </span>
              <div className="pgrid">
                <div className="pcard big">
                  <span>{isSales ? "Sales a month" : "Leads a month"}</span>
                  <strong>{rng(resLo, resHi)}</strong>
                </div>
                <div className="pcard">
                  <span>People reached</span>
                  <strong>{rng(reachLo, reachHi)}</strong>
                </div>
                <div className="pcard">
                  <span>Link clicks</span>
                  <strong>{rng(clkLo, clkHi)}</strong>
                </div>
                <div className="pcard">
                  <span>{isSales ? "Cost per sale" : "Cost per lead"}</span>
                  <strong>{money(B / resHi, B / resLo)}</strong>
                </div>
                <div className="pcard">
                  <span>
                    {isSales
                      ? `Revenue at ₹${I.aov.toLocaleString("en-IN")} order`
                      : "Typical CPM"}
                  </span>
                  <strong>
                    {isSales
                      ? money(resLo * I.aov, resHi * I.aov)
                      : money(I.cpm[0], I.cpm[1])}
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
                    <i style={{ background: "#fff" }}></i>60% cold
                  </span>
                  <span>
                    <i style={{ background: "#9DBBFF" }}></i>25% warm
                  </span>
                  <span>
                    <i style={{ background: "#4F7FFF" }}></i>15% hot
                  </span>
                </div>
              </div>
              <p className="fine">
                Rough planning ranges, not a quote or a promise. Your real
                numbers depend on your offer, creative and website, and become
                clear after the first 30 days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FIRST 30 DAYS (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="plan">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">Your first 30 days</span>
              <h2>From audit to winning ads in a month.</h2>
            </div>
            <div className="r">
              <p>
                No six-month &quot;learning period&quot;. You&apos;ll know
                what&apos;s working, and what we&apos;re changing, by the end of
                week four.
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
                We go through your account, pixel and Conversions API, then
                route leads to WhatsApp or your CRM.
              </p>
            </div>
            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M10 9l5 3-5 3z" />
                </svg>
              </span>
              <small>Days 6–12</small>
              <h3>Creative sprint</h3>
              <p>
                We write and make a first batch of ads: several hooks across
                Reels, carousels and statics.
              </p>
            </div>
            <div className="day rv">
              <span className="dn">
                <svg viewBox="0 0 24 24">
                  <path d="M5 19l14-14M9 5h10v10" />
                </svg>
              </span>
              <small>Days 13–21</small>
              <h3>Launch &amp; learn</h3>
              <p>
                Cold, warm and hot campaigns go live. We check them daily and
                let Meta&apos;s learning phase settle.
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
              <h3>Cut &amp; scale</h3>
              <p>
                Losing ads switch off, budget moves to winners, and you get a
                plain-language report with next month&apos;s tests.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          WHAT'S INCLUDED (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec section-py py-6 md:py-8" id="included">
        <div className="wrap">
          <div className="head rv">
            <div>
              <span className="eyebrow">What&apos;s included</span>
              <h2>Everything a Meta account needs.</h2>
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
              <b>Account &amp; Business Manager setup</b>
              <p>Set up properly, or cleaned up if it already exists.</p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M4 12h4l3-8 4 16 3-8h2" />
                </svg>
              </i>
              <b>Pixel + Conversions API</b>
              <p>Purchases and leads tracked from browser and server.</p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="5" width="18" height="14" rx="2" />
                  <path d="M10 9l5 3-5 3z" />
                </svg>
              </i>
              <b>Fresh creatives every month</b>
              <p>Reels, carousels and statics from our in-house studio.</p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <circle cx="9" cy="8" r="3.5" />
                  <path d="M3 20c0-3.5 2.7-6 6-6s6 2.5 6 6M16 4.5a3.5 3.5 0 0 1 0 7M21 20c0-2.8-1.5-4.9-4-5.7" />
                </svg>
              </i>
              <b>Audiences &amp; retargeting</b>
              <p>
                Cold, warm and hot audiences, plus lookalikes of your buyers.
              </p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M20.5 11.6a8.6 8.6 0 0 1-12.7 7.6L3.5 20.5l1.3-4.1a8.6 8.6 0 1 1 15.7-4.8z" />
                </svg>
              </i>
              <b>Lead routing</b>
              <p>
                New leads sent to WhatsApp, email or your CRM within minutes.
              </p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <path d="M12 3l8 4v5c0 4.5-3.4 8.3-8 9-4.6-.7-8-4.5-8-9V7z" />
                </svg>
              </i>
              <b>Policy &amp; account health</b>
              <p>Ads checked against Meta&apos;s rules before they go live.</p>
            </div>
            <div>
              <i>
                <svg viewBox="0 0 24 24">
                  <rect x="3" y="4" width="18" height="17" rx="2" />
                  <path d="M3 9h18M8 2v4M16 2v4" />
                </svg>
              </i>
              <b>Weekly check-in</b>
              <p>What ran, what won and what we&apos;re testing next.</p>
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
          FAQ ACCORDION (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="sec alt section-py py-6 md:py-8" id="faq">
        <div className="wrap">
          <div
            className="head rv"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <div>
              <span className="eyebrow">FAQ</span>
              <h2 style={{ maxWidth: "none" }}>Questions about Meta ads.</h2>
            </div>
          </div>
          <div className="faq">
            <details open>
              <summary>
                How much should I spend on Meta ads?
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
                Meta can work on a smaller budget than most channels. For a
                first test we suggest at least <em>₹50,000 / £1,000</em> a month
                in ad spend, so each ad gets enough data to judge it fairly. Our
                management fee is separate from your ad spend.
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
                You&apos;ll usually see the first useful signal in two to three
                weeks. Meta&apos;s delivery settles once an ad set gets around
                50 results in a week, so we set up campaigns to reach that as
                quickly as your budget allows.
              </p>
            </details>
            <details>
              <summary>
                Do you make the ads, or do I send them?
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
                Both work. Our studio team writes, shoots and edits Reels,
                carousels and statics. If you already have photos or videos,
                we&apos;ll cut them into ad versions and test them too.
              </p>
            </details>
            <details>
              <summary>
                Instant-form leads are often junk. How do you fix that?
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
                We add qualifying questions, use Meta&apos;s &quot;higher
                intent&quot; form type when it fits, and send every lead to
                WhatsApp or your CRM within minutes, so your team calls while
                the person still remembers you.
              </p>
            </details>
            <details>
              <summary>
                My ad account is restricted, or my ads keep getting rejected.
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
                We&apos;ll review what went wrong, fix the ads against
                Meta&apos;s advertising standards and help you request a review.
                We can&apos;t promise an account will be restored, because that
                decision is Meta&apos;s.
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
                You own all your ad accounts, pixels, catalogues and data
                completely. We are added only as a partner agency to execute and
                optimise your campaigns.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FINAL CTA BANNER (Exact from WM_Digital_Meta_Ads)
          ========================================================================= */}
      <section className="fcta section-py py-6 md:py-8" id="audit">
        <div className="halo" aria-hidden="true"></div>
        <div className="wrap in">
          <span className="eyebrow">Free Meta ads audit</span>
          <h2>
            Make your next ad
            <br />
            <span className="outline">the one they stop for.</span>
          </h2>
          <p>
            We review your Meta account, creatives and tracking, then walk you
            through the three biggest fixes on a 30-minute call. Free, with no
            obligation.
          </p>
          <button
            type="button"
            className="btn btn-white"
            onClick={() => handleOpenLead("Performance Marketing")}
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
