import { useState, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import config from '../config';
import './GiftBox.css';

const SPARKLE_EMOJIS = ['✨', '⭐', '🌟', '💖', '🎀', '💫', '🌸', '💝', '🦋', '🎉'];

export default function GiftBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const sparkleTimerRef = useRef(null);

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

  return (
    <section className="gift-section section">
      <h2 className="section-title">Hộp Quà Bất Ngờ 🎁</h2>

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

        {/* Secret Message */}
        <div className={`gift-message-container ${isOpen ? 'visible' : ''}`}>
          <div className="gift-message-card">
            <span className="gift-message-corner">✦</span>
            <div className="gift-message-icon">🎁</div>
            <div className="gift-message-label">Lời nhắn bí mật</div>
            <p className="gift-message-text">{config.giftSecretMessage}</p>
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
