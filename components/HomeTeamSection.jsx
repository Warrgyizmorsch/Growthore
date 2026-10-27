'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const KEY_TEAM_MEMBERS = [
  {
    name: 'Mahipal Singh Rathore',
    role: 'Chief Executive Officer',
    experience: '7+ yrs',
    desc: 'Leads strategic direction, business growth initiatives, and client partnerships.',
    location: 'Udaipur',
    image: '/images/team/ceo.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Yashpal Singh Rathore',
    role: 'Chief Operating Officer',
    experience: '5+ yrs',
    desc: 'Oversees operations, delivery processes, and organizational coordination.',
    location: 'Udaipur',
    image: '/images/team/coo.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Ali Asgar Bhalam',
    role: 'Digital Marketing Manager',
    experience: '4+ yrs',
    desc: 'Drives performance media buying, paid social campaigns, and client conversion funnels.',
    location: 'London',
    image: '/images/team/ali.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Nisha Mewara',
    role: 'Social Media Manager',
    experience: '4+ yrs',
    desc: 'Leads organic social strategy, brand storytelling, and audience engagement.',
    location: 'Udaipur',
    image: '/images/team/nisha.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Aman Vashistha',
    role: 'SEO Team Lead',
    experience: '5+ yrs',
    desc: 'Drives organic growth, technical SEO architecture, and AI search rankings.',
    location: 'Udaipur',
    image: '/images/team/SEO lead.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Gourav Mehta',
    role: 'Graphics Team Lead',
    experience: '3+ yrs',
    desc: 'Directs creative visual identity, high-conversion ad creatives, and video assets.',
    location: 'Udaipur',
    image: '/images/team/gourav.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
  {
    name: 'Shubham Acharya',
    role: 'Project Manager',
    experience: '4+ yrs',
    desc: 'Manages agile project delivery, client communication, and execution quality.',
    location: 'London',
    image: '/images/team/shubham.webp',
    linkedin: 'https://linkedin.com',
    email: 'mailto:contact@growthore.com',
  },
];

export default function HomeTeamSection() {
  return (
    <section className="home-team-section" id="team-showcase">
      <div className="home-team-wrap">
        {/* Header */}
        <div className="home-team-head">
          <div className="home-team-head-left">
            <div className="home-team-eyebrow">
              <span>—</span> OUR TEAM
            </div>
            <h2 className="home-team-title">The people doing the work.</h2>
            <p className="home-team-subtitle">
              Strategists, ad buyers, editors and writers in Udaipur and London. These are the people on your account.
            </p>
          </div>

          <div className="home-team-head-right">
            <Link href="/about-us" className="home-team-cta-btn">
              Meet the whole team <span>→</span>
            </Link>
          </div>
        </div>

        {/* 8 Cards Grid */}
        <div className="home-team-grid">
          {KEY_TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="home-team-card">
              {/* Rounded image box with gradient blend */}
              <div className="home-team-img-box">
                <span className="home-team-badge">{member.experience}</span>
                <Image
                  src={member.image}
                  alt={member.name}
                  width={320}
                  height={225}
                  className="home-team-photo"
                  priority={false}
                />
              </div>

              {/* Card Body */}
              <div className="home-team-body">
                <h3 className="home-team-name">{member.name}</h3>
                <p className="home-team-role">{member.role}</p>
                <p className="home-team-desc">{member.desc}</p>

                {/* Footer Row */}
                <div className="home-team-footer-row">
                  <div className="home-team-loc">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span>{member.location}</span>
                  </div>

                  <div className="home-team-socials">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="home-team-icon-btn"
                      aria-label={`${member.name} LinkedIn`}
                    >
                      <svg viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                    <a
                      href={member.email}
                      className="home-team-icon-btn"
                      aria-label={`Email ${member.name}`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* 8th Card: Hiring Card */}
          <div className="home-team-card home-team-card-hiring">
            <div className="home-team-hiring-top">
              <h3 className="home-team-hiring-title">Could this be you?</h3>
              <p className="home-team-hiring-desc">
                We're always happy to hear from good marketers, editors and writers.
              </p>
            </div>

            <div className="home-team-hiring-visual" aria-hidden="true">
              <div className="home-team-avatar-stack">
                <span className="hiring-bubble bubble-1" />
                <span className="hiring-bubble bubble-2" />
                <span className="hiring-bubble bubble-3" />
                <span className="hiring-bubble bubble-4" />
              </div>
            </div>

            <Link href="/contact-us" className="home-team-hiring-btn">
              Get in touch <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
