import { useState } from 'react';
import config from './config';
import BirthdayIntro from './components/BirthdayIntro';
import BirthdayCake from './components/BirthdayCake';
import GiftBox from './components/GiftBox';
import BirthdayEnvelope from './components/BirthdayEnvelope';
import FloatingBalloons from './components/FloatingBalloons';
import HeartAnimation from './components/HeartAnimation';
import MemoryGallery from './components/MemoryGallery';
import HeartMiniGame from './components/HeartMiniGame';
import BirthdayFooter from './components/BirthdayFooter';
import './App.css';

const BACKGROUND_DOODLES = [
  { emoji: '✨', top: '5%', left: '8%', delay: '0s' },
  { emoji: '🌸', top: '15%', right: '6%', delay: '1s' },
  { emoji: '💖', top: '30%', left: '4%', delay: '2s' },
  { emoji: '⭐', top: '48%', right: '5%', delay: '0.5s' },
  { emoji: '🎀', top: '65%', left: '6%', delay: '1.5s' },
  { emoji: '🦋', top: '80%', right: '8%', delay: '2.5s' },
  { emoji: '💫', top: '92%', left: '10%', delay: '3s' },
];

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className="app-container">
      {/* Background Floating Doodles */}
      <div className="bg-doodles">
        {BACKGROUND_DOODLES.map((item, idx) => (
          <span
            key={idx}
            className="bg-doodle"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              animationDelay: item.delay,
            }}
          >
            {item.emoji}
          </span>
        ))}
      </div>

      {/* Opening Intro Splash Screen */}
      {showIntro ? (
        <BirthdayIntro onComplete={() => setShowIntro(false)} />
      ) : (
        <main className="main-content">
          {/* Hero Greeting Section */}
          <header className="hero-header">
            <div className="hero-badge">
              <span>🎂</span>
              <span>Special Day • {config.birthday}</span>
              <span>💗</span>
            </div>

            <h1 className="hero-title">HAPPY BIRTHDAYYYY 🎂</h1>

            <h2 className="hero-wish">
              {config.mainWish}
            </h2>

            <p className="hero-message">
              {config.mainMessage}
            </p>

            <div className="top-actions">
              <button
                className="replay-intro-btn"
                onClick={() => setShowIntro(true)}
              >
                🎁 Xem lại mở đầu
              </button>
            </div>
          </header>

          {/* Interactive Component 1: Birthday Cake */}
          <BirthdayCake />

          {/* Interactive Component 2: Gift Box */}
          <GiftBox />

          {/* Interactive Component 3: Birthday Envelope & Letter */}
          <BirthdayEnvelope />

          {/* Interactive Component 4: Floating Balloons */}
          <FloatingBalloons />

          {/* Interactive Component 5: Heart Beat & Flying Hearts */}
          <HeartAnimation />

          {/* Interactive Component 6: Polaroid Memory Album */}
          <MemoryGallery />

          {/* Interactive Component 7: Mini Game (Collect The Hearts) */}
          <HeartMiniGame />

          {/* Footer */}
          <BirthdayFooter />
        </main>
      )}
    </div>
  );
}
