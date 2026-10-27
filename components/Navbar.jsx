'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
    setDropdownOpen(false);
  };

  const handleServicesClick = (e) => {
    if (typeof window !== 'undefined' && window.innerWidth <= 880) {
      e.preventDefault();
      setDropdownOpen(!dropdownOpen);
    }
  };

  if (pathname && pathname.startsWith('/lp-')) return null;

  return (
    <header className="nav">
      <div className="wrap">
        <div className="nav-in">
          <Link href="/" className="logo" onClick={handleLinkClick}>
            <img src="/logo.png" alt="GrowthOre" className="logo-img" />
          </Link>

          <nav className={`links ${menuOpen ? 'open' : ''}`} id="links" aria-label="Main">
            <div className={`nav-dropdown ${dropdownOpen ? 'open' : ''}`} ref={dropdownRef}>
              <Link
                href="/service"
                className="nav-drop-trigger"
                id="servicesTrigger"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
                onClick={handleServicesClick}
              >
                <span>Services</span>
                <svg
                  className="drop-caret"
                  viewBox="0 0 10 6"
                  width="10"
                  height="6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 1l4 4 4-4" />
                </svg>
              </Link>

              <div className="nav-drop-menu" role="menu" aria-labelledby="servicesTrigger">
                <Link href="/service/ai-seo" className="nav-drop-item" role="menuitem" onClick={handleLinkClick}>
                  <span className="nav-drop-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                      <path d="M12 3l1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2z" />
                    </svg>
                  </span>
                  <div className="nav-drop-info">
                    <span className="nav-drop-title">AI SEO</span>
                    <span className="nav-drop-desc">GEO, AEO &amp; AI answer visibility</span>
                  </div>
                  <svg className="nav-drop-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>

                <Link href="/service/performance-marketing" className="nav-drop-item" role="menuitem" onClick={handleLinkClick}>
                  <span className="nav-drop-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                      <path d="M12 20V10M18 20V4M6 20v-4" />
                    </svg>
                  </span>
                  <div className="nav-drop-info">
                    <span className="nav-drop-title">Performance Marketing</span>
                    <span className="nav-drop-desc">Meta &amp; Google Ads for revenue</span>
                  </div>
                  <svg className="nav-drop-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>

                <Link href="/service/social-media-marketing" className="nav-drop-item" role="menuitem" onClick={handleLinkClick}>
                  <span className="nav-drop-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="3" width="18" height="18" rx="5" />
                      <circle cx="12" cy="12" r="4" />
                      <circle cx="17.5" cy="6.5" r=".6" fill="currentColor" />
                    </svg>
                  </span>
                  <div className="nav-drop-info">
                    <span className="nav-drop-title">Social Media Marketing</span>
                    <span className="nav-drop-desc">Reels, creative tests &amp; paid social</span>
                  </div>
                  <svg className="nav-drop-arr" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </div>
            </div>

            <Link href="/about-us" onClick={handleLinkClick}>About</Link>
            <Link href="/#work" onClick={handleLinkClick}>Work</Link>
            <Link href="/blog" onClick={handleLinkClick}>Blog</Link>
            <Link href="/contact-us" onClick={handleLinkClick}>Contact</Link>
          </nav>

          <button
            type="button"
            className="btn btn-white"
            data-mag
            data-popup="Not sure yet"
            onClick={() => {
              if (typeof window !== 'undefined' && window.openGrowthModal) {
                window.openGrowthModal('Not sure yet');
              }
            }}
          >
            Let's talk{' '}
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>

          <button
            type="button"
            className="menu-btn"
            id="menuBtn"
            aria-expanded={menuOpen}
            aria-controls="links"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>
    </header>
  );
}
