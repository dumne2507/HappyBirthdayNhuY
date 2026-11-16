import { useState, useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import './BirthdayIntro.css';

/* ---- Floating decoration data ---- */
const DECORATIONS = [
  { emoji: '✨', top: '8%',  left: '10%',  dur: '5s',  delay: '0s',   dx: '12px',  dy: '-18px', spin: '40deg',  opacity: 0.7 },
  { emoji: '💖', top: '15%', left: '85%',  dur: '6s',  delay: '0.8s', dx: '-15px', dy: '-10px', spin: '-25deg', opacity: 0.6 },
  { emoji: '🌟', top: '75%', left: '8%',   dur: '7s',  delay: '1.2s', dx: '10px',  dy: '15px',  spin: '50deg',  opacity: 0.5 },
  { emoji: '💗', top: '80%', left: '90%',  dur: '5.5s', delay: '0.3s', dx: '-8px',  dy: '-20px', spin: '-35deg', opacity: 0.6 },
  { emoji: '⭐', top: '25%', left: '5%',   dur: '6.5s', delay: '1.5s', dx: '18px',  dy: '8px',   spin: '60deg',  opacity: 0.5 },
  { emoji: '🎀', top: '40%', left: '92%',  dur: '5s',  delay: '2s',   dx: '-12px', dy: '-12px', spin: '30deg',  opacity: 0.55 },
  { emoji: '💕', top: '60%', left: '6%',   dur: '7.5s', delay: '0.5s', dx: '14px',  dy: '-6px',  spin: '-20deg', opacity: 0.5 },
  { emoji: '✨', top: '90%', left: '50%',  dur: '6s',  delay: '1.8s', dx: '-5px',  dy: '-22px', spin: '45deg',  opacity: 0.45 },
  { emoji: '🌸', top: '5%',  left: '50%',  dur: '8s',  delay: '0.2s', dx: '10px',  dy: '14px',  spin: '-40deg', opacity: 0.5 },
  { emoji: '💫', top: '50%', left: '3%',   dur: '5.5s', delay: '2.5s', dx: '20px',  dy: '5px',   spin: '55deg',  opacity: 0.55 },
  { emoji: '🎀', top: '35%', left: '95%',  dur: '6s',  delay: '1s',   dx: '-16px', dy: '10px',  spin: '-45deg', opacity: 0.4 },
  { emoji: '🩷', top: '70%', left: '80%',  dur: '7s',  delay: '3s',   dx: '6px',   dy: '-16px', spin: '35deg',  opacity: 0.45 },
];

const SPARKLES = [
  { top: '12%', left: '22%', dur: '2.5s', delay: '0s' },
  { top: '20%', left: '78%', dur: '3s',   delay: '0.5s' },
  { top: '65%', left: '15%', dur: '2.8s', delay: '1s' },
  { top: '45%', left: '88%', dur: '2.2s', delay: '1.5s' },
  { top: '82%', left: '30%', dur: '3.2s', delay: '0.7s' },
  { top: '55%', left: '70%', dur: '2.6s', delay: '2s' },
  { top: '30%', left: '40%', dur: '3.5s', delay: '0.3s' },
  { top: '88%', left: '65%', dur: '2.4s', delay: '1.2s' },
];

const BURST_EMOJIS = ['🎉', '🎊', '💖', '⭐', '🌟', '🎁', '💗', '✨', '🩷', '🎀', '🦋', '🌸'];

function BirthdayIntro({ onComplete }) {
  const [opened, setOpened] = useState(false);
  const [bursting, setBursting] = useState(false);
  const [exiting, setExiting] = useState(false);
  const burstRef = useRef(null);

  /* Fire canvas-confetti */
  const fireConfetti = useCallback(() => {
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 1100 };
    const count = 200;

    function fire(particleRatio, opts) {
      confetti({
        ...defaults,
        particleCount: Math.floor(count * particleRatio),
        origin: { x: 0.5, y: 0.45 },
        ...opts,
      });
    }

    fire(0.25, { spread: 26, startVelocity: 55, colors: ['#ff6b9d', '#c4a6ff'] });
    fire(0.2, { spread: 60, colors: ['#FFD6E7', '#E6D9FF'] });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8, colors: ['#ff6b9d', '#c4a6ff', '#D8F0FF'] });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2, colors: ['#FFD6E7', '#FFF6E8'] });
    fire(0.1, { spread: 120, startVelocity: 45, colors: ['#ff6b9d', '#c4a6ff', '#D8F0FF', '#FFD6E7'] });
  }, []);

  /* Generate emoji burst elements */
  const createBurstEmojis = useCallback(() => {
    if (!burstRef.current) return;
    burstRef.current.innerHTML = '';

    for (let i = 0; i < 16; i++) {
      const span = document.createElement('span');
      const emoji = BURST_EMOJIS[i % BURST_EMOJIS.length];
      span.textContent = emoji;

      const angle = (i / 16) * 360;
      const radius = 80 + Math.random() * 100;
      const tx = Math.cos((angle * Math.PI) / 180) * radius * 0.6 + 'px';
      const ty = Math.sin((angle * Math.PI) / 180) * radius * 0.6 + 'px';
      const txEnd = Math.cos((angle * Math.PI) / 180) * radius * 1.3 + 'px';
      const tyEnd = Math.sin((angle * Math.PI) / 180) * radius * 1.3 - 40 + 'px';
      const rot = (Math.random() - 0.5) * 180 + 'deg';
      const rotEnd = (Math.random() - 0.5) * 360 + 'deg';

      span.style.setProperty('--tx', tx);
      span.style.setProperty('--ty', ty);
      span.style.setProperty('--tx-end', txEnd);
      span.style.setProperty('--ty-end', tyEnd);
      span.style.setProperty('--rot', rot);
      span.style.setProperty('--rot-end', rotEnd);
      span.style.animationDelay = `${i * 0.04}s`;

      burstRef.current.appendChild(span);
    }
  }, []);

  /* Handle the button click */
  const handleOpen = useCallback(() => {
    if (opened) return;
    setOpened(true);
    setBursting(true);

    /* Slight delay so lid opens first, then confetti */
    setTimeout(() => {
      fireConfetti();
      createBurstEmojis();
    }, 300);

    /* Transition out after 1.5s */
    setTimeout(() => {
      setExiting(true);
    }, 1800);

    /* Call onComplete after exit animation finishes */
    setTimeout(() => {
      onComplete?.();
    }, 2600);
  }, [opened, fireConfetti, createBurstEmojis, onComplete]);

  return (
    <div className={`intro ${exiting ? 'intro--exiting' : ''}`}>
      {/* Animated gradient background */}
      <div className="intro__bg" />

      {/* Floating decorative emojis */}
      {DECORATIONS.map((d, i) => (
        <span
          key={i}
          className="intro__deco"
          style={{
            top: d.top,
            left: d.left,
            '--dur': d.dur,
            '--delay': d.delay,
            '--dx': d.dx,
            '--dy': d.dy,
            '--spin': d.spin,
            '--peak-opacity': d.opacity,
          }}
        >
          {d.emoji}
        </span>
      ))}

      {/* Sparkle dots */}
      {SPARKLES.map((s, i) => (
        <span
          key={`sparkle-${i}`}
          className="intro__sparkle"
          style={{
            top: s.top,
            left: s.left,
            '--dur': s.dur,
            '--delay': s.delay,
          }}
        />
      ))}

      {/* Main content */}
      <div className="intro__content">
        {/* Heading */}
        <h1 className="intro__title">Heyyy Birthday Girl! 💗</h1>
        <p className="intro__subtext">Today is your special day!</p>

        {/* Gift box */}
        <div className={`intro__gift-area ${opened ? 'gift--opened' : ''}`}>
          {/* Bow */}
          <div className="gift-box__bow">
            <div className="gift-box__bow-tail gift-box__bow-tail--left" />
            <div className="gift-box__bow-tail gift-box__bow-tail--right" />
            <div className="gift-box__bow-center" />
          </div>

          {/* Box */}
          <div className="gift-box">
            <div className="gift-box__dots" />
            <div className="gift-box__knot" />
            {/* Lid */}
            <div className="gift-box__lid" />
          </div>

          {/* Emoji burst container */}
          {bursting && <div className="intro__emoji-burst" ref={burstRef} />}
        </div>

        {/* CTA Button */}
        <button
          className="intro__button"
          onClick={handleOpen}
          disabled={opened}
        >
          OPEN YOUR SURPRISE 🎁
        </button>
      </div>
    </div>
  );
}

export default BirthdayIntro;
