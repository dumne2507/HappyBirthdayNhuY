import { useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import config from '../config';
import './BirthdayCake.css';

export default function BirthdayCake() {
  const [candlesLit, setCandlesLit] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [showWishModal, setShowWishModal] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleCakeClick = () => {
    if (candlesLit && !showWishModal) {
      setShowTooltip(true);
      setTimeout(() => setShowTooltip(false), 2500);
    }
  };

  const handleMakeWish = useCallback(() => {
    if (!candlesLit) return;
    
    // Blow out candles
    setCandlesLit(false);
    setShowTooltip(false);
    setShowSparkles(true);

    // Fire celebratory confetti & sparkles
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#FFD6E7', '#E6D9FF', '#FF6B9D', '#FFF6E8', '#D8F0FF'],
    });

    setTimeout(() => {
      setShowSparkles(false);
      setShowWishModal(true);
    }, 800);
  }, [candlesLit]);

  const handleRelight = () => {
    setCandlesLit(true);
    setShowWishModal(false);
  };

  return (
    <section className="section cake-section">
      <h2 className="section-title">Thổi Nến & Ước Nguyện 🎂</h2>

      <div className="card" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div className="cake-wrapper" onClick={handleCakeClick}>
          {showTooltip && (
            <div className="cake-tooltip">
              Hãy ước một điều rồi nhấn nút bên dưới nhé! ✨
            </div>
          )}

          {/* Decorative Sparkles Around Cake */}
          <span className="cake-deco cake-deco-1">✨</span>
          <span className="cake-deco cake-deco-2">⭐</span>
          <span className="cake-deco cake-deco-3">🌸</span>
          <span className="cake-deco cake-deco-4">✨</span>

          {/* Sparkle burst when blowing out */}
          {showSparkles && (
            <div className="sparkle-burst">
              <span className="sparkle-particle">✨</span>
              <span className="sparkle-particle">⭐</span>
              <span className="sparkle-particle">💫</span>
              <span className="sparkle-particle">✨</span>
              <span className="sparkle-particle">🌟</span>
              <span className="sparkle-particle">💖</span>
              <span className="sparkle-particle">✨</span>
              <span className="sparkle-particle">⭐</span>
            </div>
          )}

          {/* Cake Main Body */}
          <div className="cake">
            {/* Cherry on top */}
            <div className="cherry">
              <div className="cherry-fruit" />
            </div>

            {/* Candles Row */}
            <div className="candles-row">
              {[0, 1, 2, 3, 4].map((index) => (
                <div key={index} className="candle">
                  <div className={`flame-container ${!candlesLit ? 'blown-out' : ''}`}>
                    <div className="flame" />
                  </div>
                  <div className={`smoke ${!candlesLit ? 'visible' : ''}`} />
                  <div className="candle-stick" />
                </div>
              ))}
            </div>

            {/* Top Layer */}
            <div className="cake-top-layer">
              <div className="frosting-drips-top">
                <span className="drip drip-1" />
                <span className="drip drip-2" />
                <span className="drip drip-3" />
                <span className="drip drip-4" />
                <span className="drip drip-5" />
                <span className="drip drip-6" />
              </div>
              <div className="sprinkles">
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
              </div>
            </div>

            {/* Middle Layer */}
            <div className="cake-middle-layer">
              <div className="frosting-drips-mid">
                <span className="drip drip-m1" />
                <span className="drip drip-m2" />
                <span className="drip drip-m3" />
                <span className="drip drip-m4" />
                <span className="drip drip-m5" />
                <span className="drip drip-m6" />
              </div>
              <div className="sprinkles">
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
              </div>
            </div>

            {/* Bottom Layer */}
            <div className="cake-bottom-layer">
              <div className="sprinkles">
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
                <span className="sprinkle" />
              </div>
            </div>

            {/* Cake Plate */}
            <div className="cake-plate" />
          </div>
        </div>

        {/* Buttons / Actions */}
        <div className="cake-actions">
          {candlesLit ? (
            <button className="btn btn-primary" onClick={handleMakeWish}>
              MAKE A WISH ✨
            </button>
          ) : (
            <button className="relight-btn" onClick={handleRelight}>
              Thắp lại nến 🕯️
            </button>
          )}
        </div>
      </div>

      {/* Wish Modal */}
      {showWishModal && (
        <div className="wish-overlay" onClick={() => setShowWishModal(false)}>
          <div className="wish-card" onClick={(e) => e.stopPropagation()}>
            <div className="wish-card-emoji">🕯️✨</div>
            <h3 className="wish-card-title">Ước Nguyện Thành Công!</h3>
            <p className="wish-card-message">{config.wishMessage}</p>
            <button className="wish-card-close" onClick={() => setShowWishModal(false)}>
              Tuyệt vời! 💗
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
