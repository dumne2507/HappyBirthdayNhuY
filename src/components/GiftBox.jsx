import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import config from '../config';
import './GiftBox.css';

const SPARKLE_EMOJIS = ['✨', '⭐', '🌟', '💖', '🎀', '💫', '🌸', '💝', '🦋', '🎉'];

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [media, setMedia] = useState(config.giftMedia || null);
  const sparkleTimerRef = useRef(null);
  const fileInputRef = useRef(null);

  const openBox = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    setShowSparkles(true);

    // Fire confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Second burst slightly delayed
    setTimeout(() => {
      confetti({
        particleCount: 40,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#FFD6E7', '#E6D9FF', '#FF6B9D', '#C4A6FF', '#D8F0FF'],
      });
    }, 300);

    // Clear sparkles after animation
    clearTimeout(sparkleTimerRef.current);
    sparkleTimerRef.current = setTimeout(() => {
      setShowSparkles(false);
    }, 2000);
  }, [isOpen]);

  const closeBox = useCallback(() => {
    setIsOpen(false);
    setShowSparkles(false);
    clearTimeout(sparkleTimerRef.current);
  }, []);

  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video');
      const url = URL.createObjectURL(file);
      setMedia({
        type: isVideo ? 'video' : 'image',
        src: url,
        caption: config.giftMedia?.caption || 'Món quà đặc biệt dành riêng cho bạn! 💖',
      });
    }
  };

  return (
    <section className="gift-section section">
      <h2 className="section-title">Hộp Quà Bất Ngờ 🎁</h2>

      {/* Hidden file input for uploading photo or video */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        style={{ display: 'none' }}
        onChange={handleMediaUpload}
      />

      <div className="card gift-card">
        {/* Gift Box */}
        <div
          className={`gift-box-wrapper ${!isOpen ? 'idle' : ''}`}
          onClick={openBox}
          role="button"
          tabIndex={0}
          aria-label="Mở hộp quà"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              openBox();
            }
          }}
        >
          {/* Glow effect */}
          <div className={`gift-glow ${isOpen ? 'active' : ''}`} />

          {/* Bow */}
          <div className={`gift-bow ${isOpen ? 'open' : ''}`}>
            <div className="bow-loop-left" />
            <div className="bow-loop-right" />
            <div className="bow-knot" />
            <div className="bow-tail-left" />
            <div className="bow-tail-right" />
          </div>

          {/* Lid */}
          <div className={`gift-box-lid ${isOpen ? 'open' : ''}`}>
            <div className="gift-lid-ribbon" />
          </div>

          {/* Box Body */}
          <div className="gift-box-body">
            <div className="gift-ribbon-vertical" />
            <div className="gift-ribbon-horizontal" />
            <div className="gift-ribbon-center" />
          </div>

          {/* Sparkle emojis flying up */}
          {showSparkles && (
            <div className="gift-sparkles">
              {SPARKLE_EMOJIS.map((emoji, i) => (
                <span key={i} className="gift-sparkle-emoji">
                  {emoji}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Prompt text */}
        <p className={`gift-prompt ${isOpen ? 'hidden' : ''}`}>
          Nhấn vào hộp quà để mở! 👆
        </p>

        {/* Secret Message & Surprise Media Card */}
        <div className={`gift-message-container ${isOpen ? 'visible' : ''}`}>
          <div className="gift-message-card">
            <span className="gift-message-corner">✦</span>
            <div className="gift-message-icon">🎁</div>
            <div className="gift-message-label">Món quà & Lời nhắn bí mật</div>

            {/* Surprise Media: Photo or Video if available */}
            {media?.src ? (
              <div className="gift-media-box">
                {media.type === 'video' ? (
                  <video
                    src={media.src}
                    controls
                    autoPlay
                    muted
                    playsInline
                    className="gift-media-element"
                  />
                ) : (
                  <img
                    src={media.src}
                    alt="Món quà bất ngờ"
                    className="gift-media-element"
                  />
                )}
                {media.caption && (
                  <p className="gift-media-caption">{media.caption}</p>
                )}
              </div>
            ) : null}

            {/* Secret Message Text */}
            <p className="gift-message-text">{config.giftSecretMessage}</p>

            {/* Quick Upload Button (cho phép đổi ảnh/video trực tiếp) */}
            <div className="gift-media-toolbar">
              <button
                className="gift-upload-mini-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Thay ảnh hoặc video trong hộp quà"
              >
                {media?.src ? '📷 Đổi ảnh/video khác' : '📷 Thêm ảnh/video vào hộp quà'}
              </button>
            </div>

            <div className="gift-message-dots">
              <span className="gift-message-dot" />
              <span className="gift-message-dot" />
              <span className="gift-message-dot" />
            </div>
          </div>

          <button className="gift-close-btn" onClick={closeBox}>
            🎀 Đóng hộp quà
          </button>
        </div>
      </div>
    </section>
  );
}
