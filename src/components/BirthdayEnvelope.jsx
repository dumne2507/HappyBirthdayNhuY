import { useState, useCallback } from 'react';
import config from '../config';
import './BirthdayEnvelope.css';

export default function BirthdayEnvelope() {
  const [isOpen, setIsOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);

  const handleOpen = useCallback(() => {
    if (isOpen) return;
    setIsOpen(true);
    // Delay letter slide-up until flap is partially open
    setTimeout(() => setLetterVisible(true), 350);
    // Tự động cuộn nhẹ nhàng để đọc trọn vẹn lá thư
    setTimeout(() => {
      document.querySelector('.letter-container')?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }, 450);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    setLetterVisible(false);
    // Wait for letter to slide back in before closing flap
    setTimeout(() => setIsOpen(false), 500);
  }, []);

  // Decorative side border hearts
  const borderSymbols = ['♡', '✿', '♡', '✿', '♡', '✿', '♡'];

  return (
    <section className="section envelope-section">
      <h2 className="section-title">Thư Tay Dành Cho Bạn 💌</h2>
      <p className="envelope-subtitle">Nhấn vào phong bì để mở thư nhé!</p>

      <div className={`card envelope-card ${isOpen ? 'envelope-open' : ''}`}>
        {/* Decorative floating emojis */}
        <span className="envelope-deco">💕</span>
        <span className="envelope-deco">✨</span>
        <span className="envelope-deco">🌸</span>
        <span className="envelope-deco">💫</span>

        {/* Envelope */}
        <div
          className={`envelope-scene${isOpen ? ' is-open' : ''}`}
          onClick={handleOpen}
          role="button"
          tabIndex={0}
          aria-label="Mở phong bì"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleOpen();
          }}
        >
          {/* Inner lining (behind body) */}
          <div className="envelope-inner" />

          {/* Letter (positioned inside envelope, slides up on open) */}
          <div
            className={`letter-container ${
              letterVisible ? 'letter-visible' : 'letter-hidden'
            }`}
          >
            <div className="letter">
              {/* Paper line effect */}
              <div className="letter-paper-lines" />

              {/* Decorative side borders */}
              <div className="letter-border-left">
                {borderSymbols.map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>
              <div className="letter-border-right">
                {borderSymbols.map((s, i) => (
                  <span key={i}>{s}</span>
                ))}
              </div>

              {/* Sparkle animations */}
              <div className="letter-sparkles">
                <span>✨</span>
                <span>💖</span>
                <span>✨</span>
              </div>

              {/* Letter text */}
              <div className="letter-content">
                <div className="letter-greeting">Gửi Như Ý 💌</div>
                <div className="letter-text">{config.letterContent}</div>
              </div>

              {/* Close button */}
              <button
                className="letter-close-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Đóng thư"
              >
                Cất thư lại ✉️
              </button>
            </div>
          </div>

          {/* Envelope body (front face) */}
          <div className="envelope-body">
            {/* Bottom edge */}
            <div className="envelope-edge" />
            {/* Decorative dots */}
            <div className="envelope-pattern">
              <span /><span /><span /><span /><span />
            </div>
          </div>

          {/* Flap */}
          <div className={`envelope-flap${isOpen ? ' flap-open' : ''}`}>
            <div className="flap-front" />
            <div className="flap-back" />
            {/* Wax seal */}
            <div className="wax-seal" />
          </div>
        </div>

        {/* Hint text */}
        <p className={`envelope-hint${isOpen ? ' hidden' : ''}`}>
          Nhấn để mở phong bì 💌
        </p>
      </div>
    </section>
  );
}
