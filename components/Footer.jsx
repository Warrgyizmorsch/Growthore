'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './footer.css';

export default function Footer() {
  const pathname = usePathname();
  if (pathname && pathname.startsWith('/lp-')) return null;
  return (
    <footer>
      <div className="wrap">
        <div className="fcols">
          <div>
            <Link href="/" className="logo" style={{ marginBottom: '18px' }}>
              <img src="/logo.png" alt="GrowthOre" className="logo-img logo-footer" />
            </Link>
            <div className="footer-legal-identity" style={{ marginTop: '10px', marginBottom: '14px', fontSize: '12px', lineHeight: '1.55', color: '#8fa6ce' }}>
              <p style={{ margin: '0 0 6px 0', color: '#cbd9f5', whiteSpace: 'nowrap' }}>
                Growthore is a brand of{' '}
                <a href="https://warrgyizmorsch.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#48a9ff', textDecoration: 'none', fontWeight: '600' }}>
                  Warrgyizmorsch UK Ltd.
                </a>
              </p>
              <p style={{ margin: 0, color: '#8fa6ce', fontSize: '11.5px' }}>
                Legal Identity — 312, Pentax House, South Hill Avenue<br />
                South Harrow, Middlesex, HA2 0DU<br />
                Company Number: <strong style={{ color: '#ffffff' }}>16386627</strong>
              </p>
            </div>
            <p style={{ maxWidth: '380px' }}>
              Performance marketing, social media and AI SEO for brands that measure success in revenue.
            </p>
          </div>

          <div>
            <h4>Services</h4>
            <Link href="/service/performance-marketing">Performance Marketing</Link>
            <Link href="/service/social-media-marketing">Social Media Marketing</Link>
            <Link href="/service/ai-seo">AI SEO</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link href="/about-us">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/#work">Work</Link>
            <Link href="/contact-us">Contact Us</Link>
          </div>

          <div>
            <h4 style={{ marginBottom: '8px' }}>India</h4>
            <p style={{ marginBottom: '18px' }}>
              410, 4th Floor, Ashoka Palace<br />
              Shobhagpura, Udaipur, Rajasthan
            </p>
            <h4 style={{ marginBottom: '8px' }}>United Kingdom</h4>
            <p>
              312, Pentax House, South Hill Avenue<br />
              South Harrow, Middlesex, HA2 0DU
            </p>
          </div>
        </div>

        <div className="fbot">
          <span>© 2026 WM Digital, a Warrgyizmorsch company</span>
          <span>Privacy Policy · Terms &amp; Conditions · Cookie Policy</span>
        </div>
      </div>
      <div className="wordmark" aria-hidden="true">GROWTHORE</div>
    </footer>
  );
}
