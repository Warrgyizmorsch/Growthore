'use client';

import React, { useState, useEffect } from 'react';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('Client Story');
  const [isInstagram, setIsInstagram] = useState(false);
  const [permalink, setPermalink] = useState('');

  const openVideo = (videoId, brandName = '') => {
    const isIg =
      typeof videoId === 'string' &&
      (videoId.includes('instagram.com') || videoId.includes('/reel/') || videoId.includes('/p/'));

    if (isIg) {
      setIsInstagram(true);
      setTitle(brandName ? `${brandName} — Instagram Reel` : 'Instagram Reel');
      setPermalink(videoId);

      const match = videoId.match(/instagram\.com\/(?:reel|p)\/([^/?#&]+)/i);
      const code = match ? match[1] : videoId;
      setVideoUrl(`https://www.instagram.com/reel/${code}/embed/captioned/`);
    } else {
      setIsInstagram(false);
      setPermalink('');
      setTitle((brandName ? brandName + ' — ' : '') + 'Client Video Story');
      setVideoUrl(`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
    }

    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setVideoUrl('');
    setPermalink('');
    setIsInstagram(false);
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  useEffect(() => {
    window.openStoryVideo = openVideo;
    window.closeStoryVideo = closeVideo;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeVideo();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="video-modal-backdrop active"
      id="storyVideoModal"
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target.id === 'storyVideoModal') closeVideo();
      }}
    >
      <div className={`video-modal-dialog ${isInstagram ? 'instagram-dialog' : ''}`}>
        <div className="video-modal-head">
          <span id="storyVideoTitle">{title}</span>
          <div className="video-modal-head-actions">
            {isInstagram && permalink && (
              <a
                href={permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="video-modal-ig-link"
              >
                <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>View on Instagram ↗</span>
              </a>
            )}
            <button type="button" className="video-modal-close" onClick={closeVideo} aria-label="Close video">
              ✕
            </button>
          </div>
        </div>
        <div className={`video-modal-body ${isInstagram ? 'instagram-body' : ''}`}>
          <iframe
            id="storyVideoIframe"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
