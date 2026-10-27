'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import './contact.css';

const HOURS = {
  IN: { tz: 'Asia/Kolkata', start: 10, end: 19 },
  UK: { tz: 'Europe/London', start: 9, end: 18 }
};

export default function ContactPage() {
  const router = useRouter();

  const [services, setServices] = useState([]);
  const [budget, setBudget] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyStatus, setCopyStatus] = useState({});

  const [inTime, setInTime] = useState('--:--');
  const [inOpen, setInOpen] = useState(true);
  const [ukTime, setUkTime] = useState('--:--');
  const [ukOpen, setUkOpen] = useState(true);

  useEffect(() => {
    function getTzParts(tz, d) {
      const o = {};
      new Intl.DateTimeFormat('en-GB', {
        timeZone: tz,
        hour: '2-digit',
        minute: '2-digit',
        weekday: 'short',
        hour12: false
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
        }, 1600);
      });
    }
  };

  const handleServiceChange = (val) => {
    if (val === 'Not sure yet') {
      setServices(['Not sure yet']);
    } else {
      let updated = services.filter((s) => s !== 'Not sure yet');
      if (updated.includes(val)) {
        updated = updated.filter((s) => s !== val);
      } else {
        updated.push(val);
      }
      setServices(updated);
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = 'Please add your name.';
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      errs.email = 'Enter an email like name@company.com.';
    }
    const cleanPhone = formData.phone.replace(/[^\d]/g, '');
    if (cleanPhone.length < 10) {
      errs.phone = 'Enter a phone number with at least 10 digits.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const svcs = services.join(', ') || 'Not specified';
    const cleanPhone = formData.phone.replace(/[^\d]/g, '');

    try {
      await fetch('https://crm.warrgyizmorsch.com/api/v1/ads-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        keepalive: true,
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: cleanPhone,
          company: formData.company.trim(),
          website: formData.website.trim(),
          services: svcs,
          budget: budget || 'Not specified',
          message: formData.message.trim(),
          source: 'GrowthOre Contact Page'
        })
      });
    } catch (err) {
      console.warn('CRM logging error:', err);
    }

    setIsSubmitting(false);
    router.push('/thank-you');
  };

  return (
    <>
      <main id="top" className="page-contact">
        <section className="ch" id="hero">
          <div className="hero-bg" aria-hidden="true">
            <div className="gridlines" />
            <div className="beam" />
            <div className="spot" />
          </div>
          <div className="wrap">
            <nav className="crumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <span style={{ color: '#fff' }}>Contact us</span>
            </nav>
            <span className="ck">
              <span className="live" />
              We reply within one working day
            </span>
            <h1 className="ch1">
              <span className="line">
                <span className="w" style={{ '--i': 0 }}>Let's talk about</span>
              </span>
              <span className="line">
                <span className="w grad-t" style={{ '--i': 1 }}>your growth.</span>
              </span>
            </h1>
            <p className="csub">
              Tell us a little about your business and we'll come back with honest numbers and a tailored scaling plan. Pick
              whichever channel suits you best.
            </p>

            <div className="ways">
              <a
                className="wy feat"
                href="https://calendly.com/warrgyizmorschdigital/30min"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="act">Opens booking</span>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                </span>
                <b>Book a call</b>
                <span className="val">30-minute strategy call</span>
                <small>Pick a time that suits you</small>
              </a>

              <a className="wy" href="#form">
                <span className="act">Below</span>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <b>Send a message</b>
                <span className="val">Short form, 1 minute</span>
                <small>We reply within a working day</small>
              </a>

              <button
                type="button"
                className={`wy ${copyStatus.phone ? 'ok' : ''}`}
                onClick={() => handleCopy('+91 92578 74994', 'phone')}
              >
                <span className="act">{copyStatus.phone ? 'Copied' : 'Tap to copy'}</span>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
                  </svg>
                </span>
                <b>Call or WhatsApp</b>
                <span className="val">India +91 92578 74994</span>
                <small>UK +44 7789 161193</small>
              </button>

              <button
                type="button"
                className={`wy ${copyStatus.email ? 'ok' : ''}`}
                onClick={() => handleCopy('info@warrgyizmorsch.com', 'email')}
              >
                <span className="act">{copyStatus.email ? 'Copied' : 'Tap to copy'}</span>
                <span className="ic">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="4" width="20" height="16" rx="2" />
                    <path d="M22 6l-10 7L2 6" />
                  </svg>
                </span>
                <b>Email us</b>
                <span className="val">info@warrgyizmorsch.com</span>
                <small>For briefs, audits and RFPs</small>
              </button>
            </div>
          </div>
        </section>

        <section className="sec" id="form" style={{ paddingTop: 'clamp(30px,5vw,60px)' }}>
          <div className="wrap cgrid">
            <div className="fbox rv" id="fbox">
              <h2>Tell us about your project</h2>
              <p>Takes about a minute. We review your details before our call.</p>

              <form className="cform" id="cform" noValidate onSubmit={handleSubmit}>
                <fieldset className="fs">
                  <legend>
                    What do you need help with? <em>(pick any)</em>
                  </legend>
                  <div className="opts">
                    {['Performance Marketing', 'Social Media', 'AI SEO', 'Not sure yet'].map((s) => (
                      <label className="opt" key={s}>
                        <input
                          type="checkbox"
                          name="svc"
                          value={s}
                          checked={services.includes(s)}
                          onChange={() => handleServiceChange(s)}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="fs">
                  <legend>
                    Monthly marketing budget <em>(optional)</em>
                  </legend>
                  <div className="opts">
                    {[
                      { val: 'Under ₹50K', label: 'Under ₹50K / £500' },
                      { val: '₹50K – ₹1L', label: '₹50K – ₹1L / £1,000' },
                      { val: '₹1L – ₹3L', label: '₹1L – ₹3L / £3,000' },
                      { val: '₹3L+', label: '₹3L+ / £3,000+' }
                    ].map((b) => (
                      <label className="opt" key={b.val}>
                        <input
                          type="radio"
                          name="bud"
                          value={b.val}
                          checked={budget === b.val}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                        <span>{b.label}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="g2">
                  <div className={`field ${errors.name ? 'bad' : ''}`} id="cf-name">
                    <label htmlFor="cName">Your name</label>
                    <input
                      id="cName"
                      autoComplete="name"
                      placeholder="Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <span className="err">{errors.name}</span>
                  </div>

                  <div className="field" id="cf-co">
                    <label htmlFor="cCo">
                      Company <em>(optional)</em>
                    </label>
                    <input
                      id="cCo"
                      autoComplete="organization"
                      placeholder="Your brand"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    />
                    <span className="err"></span>
                  </div>

                  <div className={`field ${errors.email ? 'bad' : ''}`} id="cf-email">
                    <label htmlFor="cEmail">Email</label>
                    <input
                      id="cEmail"
                      type="email"
                      autoComplete="email"
                      placeholder="priya@yourbrand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <span className="err">{errors.email}</span>
                  </div>

                  <div className={`field ${errors.phone ? 'bad' : ''}`} id="cf-phone">
                    <label htmlFor="cPhone">Phone / WhatsApp</label>
                    <input
                      id="cPhone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <span className="err">{errors.phone}</span>
                  </div>

                  <div className="field" id="cf-web" style={{ gridColumn: '1/-1' }}>
                    <label htmlFor="cWeb">
                      Website <em>(optional)</em>
                    </label>
                    <input
                      id="cWeb"
                      inputMode="url"
                      placeholder="yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                    <span className="err"></span>
                  </div>
                </div>

                <div className="field" id="cf-msg">
                  <label htmlFor="cMsg">
                    What would you like to achieve? <em>(optional)</em>
                  </label>
                  <textarea
                    id="cMsg"
                    maxLength={600}
                    placeholder="e.g. We sell ceiling fans online and want more orders at a better ROAS."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                  <span className="cnt" id="cCnt">
                    {formData.message.length} / 600
                  </span>
                </div>

                <div className="subrow">
                  <p className="fine">We only use your details to reply to you. No spam, no newsletters.</p>
                  <button type="submit" className="btn btn-white" id="cSubmitBtn" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send message'}{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>

            <aside className="side">
              <div className="card2 rv">
                <h3>What happens next</h3>
                <ol className="next">
                  <li>
                    <span>
                      <b>We read your message</b>
                      <span>A real growth specialist replies within one working day.</span>
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>A short call</b>
                      <span>30 minutes to understand your goals and numbers.</span>
                    </span>
                  </li>
                  <li>
                    <span>
                      <b>Your plan</b>
                      <span>An audit and clear plan with costs, within a week.</span>
                    </span>
                  </li>
                </ol>
              </div>

              <div className="card2 rv">
                <h3>Our offices</h3>
                <div className="ofc2" id="oIN">
                  <div className="top">
                    <small>Udaipur · India</small>
                    <span className={`ost ${inOpen ? 'open' : 'closed'}`}>
                      <i />
                      {inOpen ? 'Open now' : 'Closed now'}
                    </span>
                  </div>
                  <address>410, 4th Floor, Ashoka Palace, Shobhagpura, Udaipur, Rajasthan</address>
                  <span className="t">
                    Local time <b>{inTime}</b> · Mon–Fri, 10:00–19:00
                  </span>
                </div>

                <div className="ofc2" id="oUK">
                  <div className="top">
                    <small>London · UK</small>
                    <span className={`ost ${ukOpen ? 'open' : 'closed'}`}>
                      <i />
                      {ukOpen ? 'Open now' : 'Closed now'}
                    </span>
                  </div>
                  <address>312, Pentax House, South Hill Avenue, South Harrow, Middlesex, HA2 0DU</address>
                  <span className="t">
                    Local time <b>{ukTime}</b> · Mon–Fri, 09:00–18:00
                  </span>
                </div>
              </div>

              <div className="card2 rv">
                <div className="trust3">
                  <span>
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Free first call
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    No obligation
                  </span>
                  <span>
                    <svg viewBox="0 0 24 24">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    Reply in 1 working day
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="sec alt" id="faq">
          <div className="wrap">
            <div className="head rv" style={{ justifyContent: 'center', textAlign: 'center' }}>
              <div>
                <span className="eyebrow">Before you write</span>
                <h2 style={{ maxWidth: 'none' }}>Quick answers.</h2>
              </div>
            </div>
            <div className="faq">
              <details open>
                <summary>
                  How fast will you reply?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>Within one working day, usually much sooner during office hours in India or the UK.</p>
              </details>

              <details>
                <summary>
                  Is the first call really free?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>Yes. The 30-minute call and the initial account tear-down are 100% free with no obligation.</p>
              </details>

              <details>
                <summary>
                  Do I need a big budget to talk to you?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  No. We work best with ad budgets of £1,500+ / ₹1L+ a month, but we're happy to advise earlier-stage brands
                  on where to focus first.
                </p>
              </details>

              <details>
                <summary>
                  Can UK businesses work with you?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>
                  Yes. UK brands can contract with WarrgyizMorsch UK Ltd, and our team overlaps with London time every
                  weekday.
                </p>
              </details>

              <details>
                <summary>
                  I'm looking for a job. Who do I contact?
                  <i>
                    <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.4" strokeLinecap="round">
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </i>
                </summary>
                <p>Email your CV and portfolio to info@warrgyizmorsch.com with the role in the subject line.</p>
              </details>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
