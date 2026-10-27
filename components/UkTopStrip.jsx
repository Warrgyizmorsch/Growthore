'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function UkTopStrip() {
  const pathname = usePathname();

  if (pathname && pathname.startsWith('/lp-')) return null;

  return (
    <div id="ukTopStrip" className="uk-top-strip">
      <div className="uk-strip-container">
        <div className="uk-strip-left">
          <span className="uk-badge">UK</span>
          <span>Registered in United Kingdom</span>
          <span className="uk-sep">|</span>
          <span>
            Company No: <strong>16386627</strong>
          </span>
        </div>
        <div className="uk-strip-right">
          <a href="tel:+447789161193" className="uk-strip-item">
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span>+44 7789 161193</span>
          </a>
          <span className="uk-sep">|</span>
          <a href="mailto:info@warrgyizmorsch.com" className="uk-strip-item">
            <svg
              viewBox="0 0 24 24"
              width="12"
              height="12"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <span>info@warrgyizmorsch.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}
