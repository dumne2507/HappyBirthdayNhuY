import { useState, useCallback, useRef, useEffect } from 'react';
import config from '../config';
import './FloatingBalloons.css';

const FLOAT_CLASSES = [
  'balloon-float',
  'balloon-float-delay1',
  'balloon-float-delay2',
  'balloon-float-delay3',
  'balloon-float-delay4',
  'balloon-float-delay5',
];

export default function FloatingBalloons() {
  const wishes = config.balloonWishes || [
    'Luôn vui vẻ! 🌈',
    'Xinh đẹp mãi! 💖',
    'Hạnh phúc nhé! 🌸',
    'Thành công nha! ⭐',
    'Mãi yêu đời! 🦋',
    'Bớt Hụt Cầu nhóe 😏',
  ];

  // Array of 6 balloons: { id, flown: bool, flying: bool }
  const [balloons, setBalloons] = useState(
    wishes.map((_, i) => ({ id: i, flown: false, flying: false }))
  );

  const [activeToast, setActiveToast] = useState(null); // string or null
  const [isToastFading, setIsToastFading] = useState(false);
  const toastTimeoutRef = useRef(null);
  const fadeTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(toastTimeoutRef.current);
      clearTimeout(fadeTimeoutRef.current);
    };
  }, []);

  const handleBalloonClick = useCallback((index) => {
    setBalloons((prev) => {
      if (prev[index].flying || prev[index].flown) return prev;
      const updated = [...prev];
      updated[index] = { ...updated[index], flying: true };
      return updated;
    });

    // Mark as completely flown after animation
    setTimeout(() => {
      setBalloons((prev) => {
        const updated = [...prev];
        updated[index] = { ...updated[index], flying: false, flown: true };
        return updated;
      });
    }, 1600);

    // Show toast message
    clearTimeout(toastTimeoutRef.current);
    clearTimeout(fadeTimeoutRef.current);
    setIsToastFading(false);
    setActiveToast(wishes[index % wishes.length]);

    toastTimeoutRef.current = setTimeout(() => {
      setIsToastFading(true);
      fadeTimeoutRef.current = setTimeout(() => {
        setActiveToast(null);
        setIsToastFading(false);
      }, 500);
    }, 2000);
  }, [wishes]);

  const handleReset = () => {
    setBalloons(wishes.map((_, i) => ({ id: i, flown: false, flying: false })));
    setActiveToast(null);
    setIsToastFading(false);
  };

  const allFlown = balloons.every((b) => b.flown);

  return (
    <section className="section balloons-section">
      <h2 className="section-title">Bóng Bay Lời Chúc 🎈</h2>
      <p className="balloons-subtitle">Nhấn vào từng quả bóng để nhận lời chúc bay lên trời nhé!</p>

      <div className="card">
        <div className="balloons-container">
          {balloons.map((balloon, index) => {
            if (balloon.flown) return null;

            const floatClass = FLOAT_CLASSES[index % FLOAT_CLASSES.length];
            const colorClass = `balloon-color-${index % 6}`;

            return (
              <div
                key={balloon.id}
                className={`balloon-wrapper ${colorClass} ${
                  balloon.flying ? 'balloon-flying' : floatClass
                }`}
                onClick={() => handleBalloonClick(index)}
                role="button"
                tabIndex={0}
                aria-label={`Bóng bay số ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleBalloonClick(index);
                }}
              >
                <div className="balloon-body" />
                <div className="balloon-knot" />
                <div className="balloon-string" />
              </div>
            );
          })}
        </div>

        {allFlown && (
          <div className="balloons-reset-wrapper">
            <p className="balloons-done-msg">Tất cả bóng bay và lời chúc đã bay lên bầu trời! ✨</p>
            <button className="balloons-reset-btn" onClick={handleReset}>
              Thả bóng bay lại 🎈
            </button>
          </div>
        )}
      </div>

      {/* Floating Wish Toast */}
      {activeToast && (
        <div className={`wish-toast ${isToastFading ? 'fading-out' : ''}`}>
          <span className="wish-toast-emoji">🎈</span>
          <span className="wish-toast-text">{activeToast}</span>
        </div>
      )}
    </section>
  );
}
