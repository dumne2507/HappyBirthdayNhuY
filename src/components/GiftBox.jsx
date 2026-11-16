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

    // Cuộn mượt để hiển thị trọn vẹn 2 bức ảnh
    setTimeout(() => {
      document.querySelector('.gift-message-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 350);

    // Fire confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Second burst slightly delayed
    setTimeout(() => {
      confetti({
        particleCount: 50,
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
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const urls = files.map((f) => URL.createObjectURL(f));
      setMedia((prev) => ({
        ...prev,
        images: urls,
      }));
    }
  };

  const images = media?.images || (media?.image ? [media.image] : []);

  return (
    <section className="gift-section section">
      <h2 className="section-title">Hộp Quà Bất Ngờ 🎁</h2>

      {/* Hidden file input for uploading photo */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
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

            {/* Hiển thị 2 bức ảnh cùng xuất hiện cực đẹp */}
            {images.length > 0 && (
              <div className="gift-photos-grid">
                {images.map((src, index) => (
                  <div key={index} className="gift-photo-item">
                    <img
                      src={src}
                      alt={`Ảnh kỷ niệm ${index + 1}`}
                      className="gift-photo-img"
                    />
                  </div>
                ))}
              </div>
            )}

            {media?.caption && (
              <p className="gift-media-caption">{media.caption}</p>
            )}

            {/* Secret Message Text */}
            <p className="gift-message-text">{config.giftSecretMessage}</p>

            {/* Quick Upload Button */}
            <div className="gift-media-toolbar">
              <button
                className="gift-upload-mini-btn"
                onClick={() => fileInputRef.current?.click()}
                title="Thay hoặc thêm ảnh khác"
              >
                📷 Đổi ảnh khác
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
