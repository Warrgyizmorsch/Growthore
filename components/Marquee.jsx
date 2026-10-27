'use client';

import React from 'react';

const logos = [
  { name: 'Truepower', src: '/images/growthore/truepower.png' },
  { name: 'LE FIGARO', src: '/images/growthore/le-figaro-logo.webp' },
  { name: 'WTS', src: '/images/growthore/wts.png' },
  { name: 'Iron Street', src: '/images/growthore/iron_street.png' },
  { name: 'Comfort Transfers', src: '/images/growthore/comfort_transfers.png' },
  { name: 'Aloe Naturals', src: '/images/growthore/aloe_naturals.png' },
  { name: 'OLTAO', src: '/images/growthore/oltao.png' },
  { name: 'Bharat Ceramic', src: '/images/growthore/bharat-ceramic.webp' },
  { name: 'Arclay', src: '/images/growthore/arclay-logo.webp' },
];

export default function Marquee() {
  return (
    <section className="brand-marquee-sec" aria-label="Brands we have scaled">
      <div className="eyebrow">Brands We Have Scaled</div>
      <div className="brand-marquee-wrap">
        <div className="brand-marquee-track">
          <div className="brand-marquee-set">
            {logos.map((logo, idx) => (
              <div className="b-logo-cell" key={`set1-${idx}`}>
                <img alt={logo.name} src={logo.src} />
              </div>
            ))}
          </div>
          <div className="brand-marquee-set" aria-hidden="true">
            {logos.map((logo, idx) => (
              <div className="b-logo-cell" key={`set2-${idx}`}>
                <img alt={logo.name} src={logo.src} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
