import { useState, useCallback, useRef } from 'react';
import './HeartAnimation.css';

const HEART_COLORS = [
  '#FF6B9D', // deep pink
  '#FF8AB5', // light pink
  '#C4A6FF', // soft purple
  '#E6D9FF', // lavender
  '#FFB3D1', // pastel pink
  '#FFA07A', // light coral
  '#FF69B4', // hot pink
];

const SPARKLE_POSITIONS = [
  { top: '10px', left: '20px', dur: '2s', delay: '0s' },
  { top: '15px', right: '15px', dur: '2.4s', delay: '0.4s' },
  { bottom: '25px', left: '15px', dur: '1.8s', delay: '0.8s' },
  { bottom: '20px', right: '20px', dur: '2.6s', delay: '1.2s' },
  { top: '50%', left: '0px', dur: '2.1s', delay: '0.6s' },
  { top: '50%', right: '0px', dur: '2.3s', delay: '1s' },
];

export default function HeartAnimation() {
  const [flyingHearts, setFlyingHearts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const heartCounterRef = useRef(0);

  const handleClick = useCallback(() => {
    setShowMessage(true);

    // Create 15 flying hearts with random trajectories
    const count = 15;
    const newHearts = [];

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * 360 * Math.PI) / 180;
      // Distance mostly upward
      const distance = 90 + Math.random() * 120;
      const tx = Math.cos(angle) * distance * 1.2 + 'px';
      const ty = -Math.abs(Math.sin(angle) * distance * 1.5) - 30 + 'px';
      const size = 14 + Math.random() * 16 + 'px';
      const rot = (Math.random() - 0.5) * 120 + 'deg';
      const color = HEART_COLORS[Math.floor(Math.random() * HEART_COLORS.length)];
      const flyDuration = 1.3 + Math.random() * 0.7 + 's';
      const flyDelay = Math.random() * 0.2 + 's';

      newHearts.push({
        id: ++heartCounterRef.current,
        tx,
        ty,
        size,
        rot,
        color,
        flyDuration,
        flyDelay,
      });
    }

    setFlyingHearts((prev) => [...prev, ...newHearts]);

    // Clean up hearts after animation ends
    setTimeout(() => {
      setFlyingHearts((prev) => prev.filter((h) => !newHearts.some((nh) => nh.id === h.id)));
    }, 2500);
  }, []);

  return (
    <section className="section heart-section">
      <h2 className="section-title">Gửi Yêu Thương 💗</h2>

      <div className="card heart-card">
        {/* Clickable Heart Stage */}
        <div
          className="heart-stage"
          onClick={handleClick}
          role="button"
          tabIndex={0}
          aria-label="Nhấn để gửi tim"
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleClick();
          }}
        >
          {/* Sparkles around heart */}
          {SPARKLE_POSITIONS.map((sp, idx) => (
            <span
              key={idx}
              className="heart-sparkle"
              style={{
                top: sp.top,
                bottom: sp.bottom,
                left: sp.left,
                right: sp.right,
                '--dur': sp.dur,
                '--delay': sp.delay,
              }}
            >
              ✨
            </span>
          ))}

          {/* Main Big Heart */}
          <div className="heart-main">
            <div className="heart-main__shine" />
          </div>

          {/* Flying hearts container */}
          <div className="flying-hearts-container">
            {flyingHearts.map((heart) => (
              <div
                key={heart.id}
                className="flying-heart"
                style={{
                  '--tx': heart.tx,
                  '--ty': heart.ty,
                  '--size': heart.size,
                  '--rot': heart.rot,
                  '--heart-color': heart.color,
                  '--fly-duration': heart.flyDuration,
                  '--fly-delay': heart.flyDelay,
                }}
              />
            ))}
          </div>
        </div>

        {/* Hint text */}
        <p className="heart-hint">Chạm vào trái tim để gửi ngàn yêu thương! 💕</p>

        {/* Animated Message */}
        {showMessage && (
          <p className="heart-message">
            Sending you lots of happiness! 💗✨
          </p>
        )}
      </div>
    </section>
  );
}
