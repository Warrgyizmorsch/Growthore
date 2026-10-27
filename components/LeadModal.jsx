'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import './lead-modal.css';

export default function LeadModal() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [services, setServices] = useState([]);
  const [budget, setBudget] = useState('');
  const [market, setMarket] = useState('India');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const modalBoxRef = useRef(null);

  const canContinueStep1 = services.length > 0 && !!budget;

  const openModal = (service = '') => {
    if (service) {
      const lower = service.toLowerCase();
      let matched = [];
      if (lower.includes('performance')) matched.push('Performance Marketing');
      else if (lower.includes('social')) matched.push('Social Media');
      else if (lower.includes('ai') || lower.includes('seo')) matched.push('AI SEO');
      else if (lower.includes('not sure')) matched.push('Not sure yet');
      else matched.push('Not sure yet');
      setServices(matched);
    }
    setStep(1);
    setErrors({});
    setIsOpen(true);
    document.body.classList.add('lock');
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.classList.remove('lock');
  };

  useEffect(() => {
    window.openGrowthModal = openModal;
    window.closeGrowthModal = closeModal;
    window.openLeadModal = openModal;
    window.closeLeadModal = closeModal;

    const handleGlobalClick = (e) => {
      const trigger = e.target.closest('[data-popup]');
      if (trigger) {
        e.preventDefault();
        openModal(trigger.getAttribute('data-popup') || '');
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    document.addEventListener('click', handleGlobalClick);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('click', handleGlobalClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

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

  const validateStep2 = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please add your name so we know who to ask for.';
    }
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
    if (!validateStep2()) return;

    setIsSubmitting(true);
    const svcs = services.join(', ') || 'Not specified';
    const notes = formData.message.trim();
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
          services: svcs,
          budget: budget || 'Not specified',
          market: market,
          website: formData.website.trim(),
          message: notes,
          source: typeof window !== 'undefined' ? window.location.href : '',
          page_url: typeof window !== 'undefined' ? window.location.href : ''
        })
      }).catch(async () => {
        await fetch('https://crm.warrgyizmorsch.com/api/warr-leads', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          keepalive: true,
          body: JSON.stringify({
            name: formData.name.trim(),
            email: formData.email.trim(),
            mobile_no: cleanPhone,
            service_categories: svcs,
            message: `Budget: ${budget} | Market: ${market} | ${notes}`,
            source: typeof window !== 'undefined' ? window.location.href : '',
            page_url: typeof window !== 'undefined' ? window.location.href : ''
          })
        }).catch(() => {});
      });
    } catch (err) {
      // ignore network errors and still route to thank-you
    }

    setIsSubmitting(false);
    closeModal();
    router.push('/thank-you');
  };

  return (
    <div className={`pop ${isOpen ? 'open' : ''}`} id="pop" aria-hidden={!isOpen}>
      <div className="pop-bg" onClick={closeModal} />
      <div className="pop-box" role="dialog" aria-modal="true" aria-labelledby="popTitle" ref={modalBoxRef}>
        <button className="pop-x" type="button" onClick={closeModal} aria-label="Close">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.2" strokeLinecap="round">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <aside className="pop-side">
          <h3 id="popTitle">Let's find where your growth is leaking.</h3>
          <div className="proof">
            <strong>₹1L → ₹90L+</strong>
            <span>Oltao, in six months with Meta + Google Ads</span>
          </div>
          <ol className="next-steps">
            <li>Tell us what you need. It takes under a minute.</li>
            <li>We review your accounts, website and funnel before we talk.</li>
            <li>30-minute call: the three biggest fixes, whether you hire us or not.</li>
          </ol>
          <div className="reach">
            <span>Prefer to talk now?</span>
            <span>+91 92578 74994 · +44 7789 161193</span>
          </div>
        </aside>

        <div className="pop-main">
          <div className="pop-prog" id="popProg">
            <span id="popStepLbl">{step === 3 ? 'Done' : `Step ${step} of 2`}</span>
            <i style={{ '--p': step === 1 ? '50%' : '100%' }} />
          </div>

          <form id="leadForm" noValidate onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="pstep on" data-step="1">
                <h4>What can we help you with?</h4>
                <fieldset className="fg">
                  <legend>
                    Services <em className="muted" style={{ fontStyle: 'normal', fontWeight: 500 }}>(pick any)</em>
                  </legend>
                  <div className="opts">
                    {['Performance Marketing', 'Social Media', 'AI SEO', 'Not sure yet'].map((s) => (
                      <label className="opt" key={s}>
                        <input
                          type="checkbox"
                          name="service"
                          value={s}
                          checked={services.includes(s)}
                          onChange={() => handleServiceChange(s)}
                        />
                        <span>{s}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="fg">
                  <legend>Monthly ad budget</legend>
                  <div className="opts">
                    {['Under ₹50K', '₹50K – ₹1L', '₹1L – ₹3L', '₹3L+'].map((b) => (
                      <label className="opt" key={b}>
                        <input
                          type="radio"
                          name="budget"
                          value={b}
                          checked={budget === b}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <fieldset className="fg">
                  <legend>Where is your business based?</legend>
                  <div className="opts">
                    {['India', 'United Kingdom', 'Elsewhere'].map((m) => (
                      <label className="opt" key={m}>
                        <input
                          type="radio"
                          name="market"
                          value={m}
                          checked={market === m}
                          onChange={(e) => setMarket(e.target.value)}
                        />
                        <span>{m}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                <div className="pop-actions">
                  <span className="fine" id="s1hint">
                    {canContinueStep1 ? 'Step 2 is your contact details' : 'Pick a service and a budget to continue'}
                  </span>
                  <button
                    type="button"
                    className="btn btn-white"
                    id="toStep2"
                    disabled={!canContinueStep1}
                    onClick={() => setStep(2)}
                  >
                    Continue{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="pstep on" data-step="2">
                <h4>Where should we send your plan?</h4>
                <div className="grid2">
                  <div className={`field ${errors.name ? 'bad' : ''}`} id="f-name">
                    <label htmlFor="leadName">Your name</label>
                    <input
                      id="leadName"
                      name="name"
                      autoComplete="name"
                      placeholder="Priya Sharma"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <span className="err">{errors.name}</span>
                  </div>

                  <div className={`field ${errors.email ? 'bad' : ''}`} id="f-email">
                    <label htmlFor="leadEmail">Work email</label>
                    <input
                      id="leadEmail"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="priya@yourbrand.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                    <span className="err">{errors.email}</span>
                  </div>

                  <div className={`field ${errors.phone ? 'bad' : ''}`} id="f-phone">
                    <label htmlFor="leadPhone">Phone / WhatsApp</label>
                    <input
                      id="leadPhone"
                      name="phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                    <span className="err">{errors.phone}</span>
                  </div>

                  <div className="field" id="f-site">
                    <label htmlFor="leadSite">
                      Website <em>(optional)</em>
                    </label>
                    <input
                      id="leadSite"
                      name="website"
                      type="url"
                      inputMode="url"
                      placeholder="yourbrand.com"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                    />
                    <span className="err"></span>
                  </div>
                </div>

                <div className="field">
                  <label htmlFor="leadMsg">
                    Anything we should know? <em>(optional)</em>
                  </label>
                  <textarea
                    id="leadMsg"
                    name="message"
                    placeholder="Current ROAS, what you've tried, your goal for the next quarter…"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  />
                </div>

                <div className="pop-actions">
                  <button type="button" className="back" id="toStep1" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button type="submit" className="btn btn-white" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending...' : 'Send my request'}{' '}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M5 12h14M13 6l6 6-6 6" />
                    </svg>
                  </button>
                </div>
                <p className="fine">We only use your details to reply to this request.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
