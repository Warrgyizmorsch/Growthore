'use client';

import React, { useState, useEffect } from 'react';

export default function VideoModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [title, setTitle] = useState('Client Story');

  const openVideo = (videoId, brandName = '') => {
    setTitle((brandName ? brandName + ' — ' : '') + 'Client Video Story');
    setVideoUrl(`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeVideo = () => {
    setVideoUrl('');
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
      <div className="video-modal-dialog">
        <div className="video-modal-head">
          <span id="storyVideoTitle">{title}</span>
          <button type="button" className="video-modal-close" onClick={closeVideo} aria-label="Close video">
            ✕
          </button>
        </div>
        <div className="video-modal-body">
          <iframe
            id="storyVideoIframe"
            src={videoUrl}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}
