'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Marquee from '../../components/Marquee';
import './about.css';

const TEAM = [
  { name: 'Aayush Sharma', role: 'Performance Marketing Lead', dept: 'Ads', photo: '', linkedin: '' },
  { name: 'Pooja Verma', role: 'Meta & Google Ads Specialist', dept: 'Ads', photo: '', linkedin: '' },
  { name: 'Karan Joshi', role: 'Tracking & Analytics Specialist', dept: 'Ads', photo: '', linkedin: '' },
  { name: 'Simran Kaur', role: 'Content Strategist', dept: 'Creative', photo: '', linkedin: '' },
  { name: 'Rohit Mehta', role: 'Creative Director & Video Editor', dept: 'Creative', photo: '', linkedin: '' },
  { name: 'Neha Chawla', role: 'Graphic & UI Designer', dept: 'Creative', photo: '', linkedin: '' },
  { name: 'Deepak Suthar', role: 'AI SEO & Search Lead', dept: 'SEO', photo: '', linkedin: '' },
  { name: 'Ananya Sen', role: 'Growth Copywriter', dept: 'SEO', photo: '', linkedin: '' },
  { name: 'Vikram Rao', role: 'Full-Stack Web Developer', dept: 'Tech', photo: '', linkedin: '' },
  { name: 'Rhea Kapoor', role: 'Account Director', dept: 'Clients', photo: '', linkedin: '' },
  { name: 'Oliver Smith', role: 'Client Success Director (UK)', dept: 'Clients', photo: '', linkedin: '' },
];

const COLS = [
  ['#2F6BFF', '#0E2466'],
  ['#5E8DFF', '#13307E'],
  ['#7CC4FF', '#1B48D8'],
  ['#9DBBFF', '#22346E'],
];

const HOURS = {
  IN: { tz: 'Asia/Kolkata', start: 10, end: 19 },
  UK: { tz: 'Europe/London', start: 9, end: 18 },
};

function getInitials(name) {
  const parts = name.replace(/[\[\]]/g, '').trim().split(/\s+/);
  return ((parts[0] || '')[0] || '') + ((parts[1] || '')[0] || '');
}

export default function AboutPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [inTime, setInTime] = useState('--:--');
  const [inOpen, setInOpen] = useState(true);
  const [ukTime, setUkTime] = useState('--:--');
  const [ukOpen, setUkOpen] = useState(true);
  const [copyStatus, setCopyStatus] = useState({});

  useEffect(() => {
    function getTzParts(tz, d) {
      const o = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
        hour12: false,
      })
        .formatToParts(d)
        .forEach((p) => (o[p.type] = p.value));
      return o;
    }

    function updateClocks() {
      const now = new Date();

      const oIn = getTzParts(HOURS.IN.tz, now);
      const hIn = (+oIn.hour % 24) + +oIn.minute / 60;
      const isOpenIn = !['Sat', 'Sun'].includes(oIn.weekday) && hIn >= HOURS.IN.start && hIn < HOURS.IN.end;
      setInTime(`${oIn.hour}:${oIn.minute}`);
      setInOpen(isOpenIn);

      const oUk = getTzParts(HOURS.UK.tz, now);
      const hUk = (+oUk.hour % 24) + +oUk.minute / 60;
      const isOpenUk = !['Sat', 'Sun'].includes(oUk.weekday) && hUk >= HOURS.UK.start && hUk < HOURS.UK.end;
      setUkTime(`${oUk.hour}:${oUk.minute}`);
      setUkOpen(isOpenUk);
    }

    updateClocks();
    const interval = setInterval(updateClocks, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (text, key) => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setCopyStatus({ ...copyStatus, [key]: true });
        setTimeout(() => {
          setCopyStatus((prev) => ({ ...prev, [key]: false }));
        }, 1500);
      });
    }
  };

  const handleOpenLead = (service = 'Not sure yet') => {
    if (typeof window !== 'undefined' && window.openGrowthModal) {
      window.openGrowthModal(service);
    }
  };

  const departments = ['All', ...new Set(TEAM.map((t) => t.dept))];
  const filteredTeam = selectedDept === 'All' ? TEAM : TEAM.filter((t) => t.dept === selectedDept);

  return (
    <>
      <main id="top" className="page-about">
        {/* HERO */}
        <section className="ah" id="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="gridlines" />
            <div className="beam" />
            <div className="spot" />
          </div>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>About us</span>
            </nav>
            <span className="ak">
              <span className="live" />
              About GrowthOre
            </span>
            <h1 className="ah1">
              <span className="line">
                <span className="w" style={{ '--i': 0 }}>The team behind</span>
              </span>
              <span className="line">
                <span className="w grad-t" style={{ '--i': 1 }}>your growth.</span>
              </span>
            </h1>
            <p className="asub">
              We're a dedicated growth team from <strong>Udaipur, India</strong> with an office in <strong>London, UK</strong>.
              You get senior practitioners, honest numbers and one unified team for performance ads, creative and AI SEO.
            </p>
            <div className="actas">
              <a href="#team" className="btn btn-white" data-mag>
                Meet the team{' '}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </a>
              <button
                type="button"
                className="btn btn-ghost"
                data-mag
                onClick={() => handleOpenLead('Not sure yet')}
              >
                Book a free call
              </button>
            </div>
            <div className="facts rv">
              <div className="fact">
                <strong>India &amp; UK</strong>
                <span>Offices in Udaipur and London</span>
              </div>
              <div className="fact">
                <strong data-count="18" data-suffix="x">18x</strong>
                <span>Best ROAS delivered</span>
              </div>
              <div className="fact">
                <strong data-count="16" data-suffix="+">16+</strong>
                <span>Brands scaled profitably</span>
              </div>
              <div className="fact">
                <strong>2026</strong>
                <span>Driving Modern Revenue</span>
              </div>
            </div>
          </div>
        </section>

        {/* WHO WE ARE */}
        <section className="sec" id="about">
          <div className="wrap who">
            <div className="rv">
              <span className="eyebrow">Who we are</span>
              <h2>A growth team, not a vendor.</h2>
              <p className="lead">
                GrowthOre is the dedicated performance marketing and growth agency of Warrgyizmorsch. We combine deep commercial
                strategy with high-converting creative, full-funnel paid media and next-generation AI SEO for ambitious brands
                across India and the UK.
              </p>
              <p className="lead">
                Our job is simple: more sales, higher ROAS and better leads for your business, reported in revenue numbers you can
                verify.
              </p>
            </div>
            <div className="prom">
              <div className="pm rv">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 20V10M18 20V4M6 20v-4" />
                  </svg>
                </span>
                <b>You see the numbers</b>
                <p>Monthly reports lead with revenue, ROAS and cost per acquisition, not vanity reach.</p>
              </div>
              <div className="pm rv">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="4" />
                    <path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" />
                  </svg>
                </span>
                <b>One point of contact</b>
                <p>A senior account manager who knows your margins and answers your calls.</p>
              </div>
              <div className="pm rv">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 2l9 5-9 5-9-5z" />
                    <path d="M3 12l9 5 9-5M3 17l9 5 9-5" />
                  </svg>
                </span>
                <b>Everything under one roof</b>
                <p>Paid media, CRO, creative testing, analytics and AI search under one team.</p>
              </div>
              <div className="pm rv">
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </span>
                <b>Honest advice</b>
                <p>If paid media isn't right for your current stage, we'll tell you honestly.</p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className="sec alt" id="how">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Working with us</span>
                <h2>What happens after you get in touch.</h2>
              </div>
              <div className="r">
                <p>No lengthy sales pitch. Here's exactly what to expect from day one.</p>
              </div>
            </div>
            <div className="steps">
              <div className="sp rv">
                <span className="n">1</span>
                <small>Day 1</small>
                <b>Free call</b>
                <p>30 minutes to understand your unit economics, targets and current challenges.</p>
              </div>
              <div className="sp rv">
                <span className="n">2</span>
                <small>Within a week</small>
                <b>Audit &amp; plan</b>
                <p>We tear down your ad accounts, landing page funnels and send a custom 90-day plan.</p>
              </div>
              <div className="sp rv">
                <span className="n">3</span>
                <small>First month</small>
                <b>Setup &amp; launch</b>
                <p>Full tracking fixes, winning ad creative batches, and new funnels go live.</p>
              </div>
              <div className="sp rv">
                <span className="n">4</span>
                <small>Every month</small>
                <b>Scale &amp; improve</b>
                <p>Weekly creative iterations, transparent reporting and scaling winning ad sets.</p>
              </div>
            </div>
          </div>
        </section>

        {/* TEAM */}
        <section className="sec" id="team">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Our team</span>
                <h2>The people who'll work on your brand.</h2>
              </div>
              <div className="r">
                <p>Founders who stay involved, backed by channel specialists.</p>
              </div>
            </div>
            <div className="founders">
              <article className="fd rv">
                <span className="pic" style={{ '--a': '#2F6BFF', '--b': '#0E2466' }}>
                  MR
                </span>
                <div>
                  <small>Co-founder &amp; CEO</small>
                  <h3>Mahipal Singh Rathore</h3>
                  <p>Leads growth strategy, paid media architectures, and commercial scaling models.</p>
                  <a className="lnk" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                </div>
              </article>

              <article className="fd rv">
                <span className="pic" style={{ '--a': '#5E8DFF', '--b': '#13307E' }}>
                  YR
                </span>
                <div>
                  <small>Co-founder &amp; COO</small>
                  <h3>Yashpal Singh Rathore</h3>
                  <p>Oversees technical delivery, operations, analytics architectures and client success.</p>
                  <a className="lnk" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                    LinkedIn →
                  </a>
                </div>
              </article>
            </div>

            <div className="tfil" id="tfil" role="group" aria-label="Filter team">
              {departments.map((d) => (
                <button
                  type="button"
                  key={d}
                  className={`tf ${selectedDept === d ? 'on' : ''}`}
                  onClick={() => setSelectedDept(d)}
                  aria-pressed={selectedDept === d}
                >
                  {d}
                  <em>{d === 'All' ? TEAM.length : TEAM.filter((t) => t.dept === d).length}</em>
                </button>
              ))}
            </div>

            <div className="tgrid" id="tgrid" aria-live="polite">
              {filteredTeam.map((member, k) => {
                const color = COLS[k % COLS.length];
                return (
                  <article className="tm" key={member.name} style={{ animationDelay: `${k * 0.04}s` }}>
                    <span className="pic" style={{ '--a': color[0], '--b': color[1] }}>
                      {getInitials(member.name)}
                    </span>
                    <b>{member.name}</b>
                    <span className="role">{member.role}</span>
                    <span className="dept">{member.dept}</span>
                  </article>
                );
              })}
              <article className="tm hire" style={{ animationDelay: `${filteredTeam.length * 0.04}s` }}>
                <span className="pic">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 5v14M5 12h14" />
                  </svg>
                </span>
                <b>Join us</b>
                <span className="role">We're always looking for ambitious talent.</span>
                <span className="dept" style={{ userSelect: 'all' }}>
                  info@warrgyizmorsch.com
                </span>
              </article>
            </div>
          </div>
        </section>

        {/* OFFICES */}
        <section className="sec alt" id="offices">
          <div className="wrap">
            <div className="head rv">
              <div>
                <span className="eyebrow">Our offices</span>
                <h2>Visit, call or write to us.</h2>
              </div>
              <div className="r">
                <p>UK brands can contract with our UK company. Work is delivered by our team in India.</p>
              </div>
            </div>
            <div className="offs">
              <div className="ofc rv" id="oIN">
                <div className="top">
                  <small>India · Head office</small>
                  <span className={`ost ${inOpen ? 'open' : 'closed'}`}>
                    <i />
                    {inOpen ? 'Open now' : 'Closed now'}
                  </span>
                </div>
                <h3>Udaipur, Rajasthan</h3>
                <address>
                  GrowthOre Digital<br />
                  410, 4th Floor, Ashoka Palace<br />
                  Shobhagpura, Udaipur, Rajasthan
                </address>
                <p className="tm2">
                  Local time <b>{inTime}</b>
                </p>
                <div className="row">
                  <button
                    type="button"
                    className={`cp ${copyStatus.inPhone ? 'ok' : ''}`}
                    onClick={() => handleCopy('+91 92578 74994', 'inPhone')}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                    <span>{copyStatus.inPhone ? 'Copied' : '+91 92578 74994'}</span>
                  </button>
                  <button
                    type="button"
                    className={`cp ${copyStatus.inEmail ? 'ok' : ''}`}
                    onClick={() => handleCopy('info@warrgyizmorsch.com', 'inEmail')}
                  >
                    <svg viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <span>{copyStatus.inEmail ? 'Copied' : 'info@warrgyizmorsch.com'}</span>
                  </button>
                </div>
              </div>

              <div className="ofc rv" id="oUK">
                <div className="top">
                  <small>United Kingdom</small>
                  <span className={`ost ${ukOpen ? 'open' : 'closed'}`}>
                    <i />
                    {ukOpen ? 'Open now' : 'Closed now'}
                  </span>
                </div>
                <h3>London, UK</h3>
                <address>
                  GrowthOre (WarrgyizMorsch UK Ltd)<br />
                  312, Pentax House, South Hill Avenue<br />
                  South Harrow, Middlesex, HA2 0DU
                </address>
                <p className="tm2">
                  Local time <b>{ukTime}</b>
                </p>
                <div className="row">
                  <button
                    type="button"
                    className={`cp ${copyStatus.ukPhone ? 'ok' : ''}`}
                    onClick={() => handleCopy('+44 7789 161193', 'ukPhone')}
                  >
                    <svg viewBox="0 0 24 24">
                      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                    </svg>
                    <span>{copyStatus.ukPhone ? 'Copied' : '+44 7789 161193'}</span>
                  </button>
                  <button
                    type="button"
                    className={`cp ${copyStatus.ukEmail ? 'ok' : ''}`}
                    onClick={() => handleCopy('info@warrgyizmorsch.com', 'ukEmail')}
                  >
                    <svg viewBox="0 0 24 24">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 6l-10 7L2 6" />
                    </svg>
                    <span>{copyStatus.ukEmail ? 'Copied' : 'info@warrgyizmorsch.com'}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CLIENTS MARQUEE */}
        <Marquee />

        {/* FAQ */}
        <section className="sec" id="faq">
          <div className="wrap">
            <div className="head rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <span className="eyebrow">Common questions</span>
                <h2 style={{ maxWidth: 'none' }}>Before you get in touch.</h2>
              </div>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  Who will I actually work with?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  One dedicated account manager is your day-to-day point of contact, supported by channel experts for paid ads,
                  creative testing and SEO. Founders review strategy on every account.
                </p>
              </details>

              <details>
                <summary>
                  Do you work with brands outside India?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. UK brands can contract with WarrgyizMorsch UK Ltd, and our working hours overlap with the UK every
                  weekday.
                </p>
              </details>

              <details>
                <summary>
                  What size of business do you work with?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Mostly established eCommerce and lead-generation brands with product-market fit. For performance ads, we
                  deliver the strongest results with monthly ad spends of £1,500+ / ₹1L+.
                </p>
              </details>

              <details>
                <summary>
                  How do I get started?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Book a free 30-minute growth call. We'll understand your unit economics, then provide a 90-day scaling roadmap
                  within a week.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="fcta" id="audit">
          <div className="halo" aria-hidden="true" />
          <div className="wrap in">
            <h2>
              Let's talk about <span className="grad-t">your growth.</span>
            </h2>
            <p>
              A free 30-minute call with our strategy team. No pitch deck, just an honest teardown of where your growth is
              leaking and how to scale.
            </p>
            <button
              type="button"
              className="btn btn-white"
              data-mag
              onClick={() => handleOpenLead('Not sure yet')}
            >
              Book a free call{' '}
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
