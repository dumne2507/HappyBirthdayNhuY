import { useState, useRef, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import config from '../config';
import './HeartMiniGame.css';

const HEART_EMOJIS = ['❤️', '💗', '💖', '💕', '💓', '💝'];
const TARGET_SCORE = 10;
const HEART_LIFETIME = 2000;   // ms before a heart auto-disappears
const SPAWN_INTERVAL = 1000;   // ms between new hearts
const EDGE_PADDING = 40;       // px from edges

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function HeartMiniGame() {
  const [gameState, setGameState] = useState('idle'); // idle | playing | completed
  const [score, setScore] = useState(0);
  const [hearts, setHearts] = useState([]);       // { id, x, y, size, emoji, status }
  const [plusOnes, setPlusOnes] = useState([]);    // { id, x, y }

  const areaRef = useRef(null);
  const spawnTimerRef = useRef(null);
  const heartIdRef = useRef(0);
  const scoreRef = useRef(0); // keep in sync for use inside intervals

  // Keep scoreRef current
  useEffect(() => {
    scoreRef.current = score;
  }, [score]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearInterval(spawnTimerRef.current);
    };
  }, []);

  /* ---------- Spawn a single heart ---------- */
  const spawnHeart = useCallback(() => {
    if (scoreRef.current >= TARGET_SCORE) return;

    const area = areaRef.current;
    if (!area) return;

    const rect = area.getBoundingClientRect();
    const size = randomBetween(30, 50);
    const x = randomBetween(EDGE_PADDING, rect.width - EDGE_PADDING - size);
    const y = randomBetween(EDGE_PADDING, rect.height - EDGE_PADDING - size);
    const emoji = HEART_EMOJIS[randomBetween(0, HEART_EMOJIS.length - 1)];
    const id = ++heartIdRef.current;

    const heart = { id, x, y, size, emoji, status: 'active' };

    setHearts((prev) => [...prev, heart]);

    // Auto-remove after lifetime
    const fadeTimeout = setTimeout(() => {
      setHearts((prev) =>
        prev.map((h) => (h.id === id && h.status === 'active' ? { ...h, status: 'fading' } : h))
      );
      // Remove from DOM after fade animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 400);
    }, HEART_LIFETIME);

    // Store timeout on the heart so we can cancel if clicked
    heart._fadeTimeout = fadeTimeout;
  }, []);

  /* ---------- Start the game ---------- */
  const startGame = useCallback(() => {
    setGameState('playing');
    setScore(0);
    scoreRef.current = 0;
    setHearts([]);
    setPlusOnes([]);
    heartIdRef.current = 0;

    // Spawn first heart immediately, then every SPAWN_INTERVAL
    setTimeout(() => spawnHeart(), 300);
    spawnTimerRef.current = setInterval(() => {
      spawnHeart();
    }, SPAWN_INTERVAL);
  }, [spawnHeart]);

  /* ---------- Handle heart click ---------- */
  const handleHeartClick = useCallback(
    (e, heartId) => {
      e.stopPropagation();

      setHearts((prev) => {
        const heart = prev.find((h) => h.id === heartId);
        if (!heart || heart.status !== 'active') return prev;

        // Show +1 at click position
        const plusId = Date.now() + Math.random();
        setPlusOnes((p) => [...p, { id: plusId, x: heart.x + heart.size / 2, y: heart.y }]);
        setTimeout(() => {
          setPlusOnes((p) => p.filter((pl) => pl.id !== plusId));
        }, 800);

        const newScore = scoreRef.current + 1;
        setScore(newScore);
        scoreRef.current = newScore;

        // Check win
        if (newScore >= TARGET_SCORE) {
          clearInterval(spawnTimerRef.current);
          setGameState('completed');
          fireConfetti();
        }

        return prev.map((h) =>
          h.id === heartId ? { ...h, status: 'caught' } : h
        );
      });

      // Remove heart after burst animation
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== heartId));
      }, 450);
    },
    []
  );

  /* ---------- Confetti ---------- */
  const fireConfetti = () => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#FF6B9D', '#C4A6FF', '#FFD6E7', '#D8F0FF'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#FF6B9D', '#C4A6FF', '#FFD6E7', '#D8F0FF'],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();

    // Big burst in the center
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
        colors: ['#FF6B9D', '#C4A6FF', '#FFD6E7', '#E6D9FF', '#FFF6E8'],
      });
    }, 200);
  };

  /* ---------- Reset ---------- */
  const resetGame = useCallback(() => {
    clearInterval(spawnTimerRef.current);
    setHearts([]);
    setPlusOnes([]);
    setScore(0);
    scoreRef.current = 0;
    setGameState('idle');
  }, []);

  /* ---------- Render ---------- */
  return (
    <section className="section heart-minigame">
      <h2 className="section-title">Mini Game 🎮</h2>

      <div className="card">
        {/* Score display (visible during play and completed) */}
        {gameState !== 'idle' && (
          <div className="heart-minigame__score">
            💗 Score:&nbsp;
            <span className="heart-minigame__score-num">
              {score} / {TARGET_SCORE}
            </span>
          </div>
        )}

        {/* Game area */}
        <div className="heart-minigame__area" ref={areaRef}>
          {/* ---- IDLE STATE ---- */}
          {gameState === 'idle' && (
            <div className="heart-minigame__idle">
              <div className="heart-minigame__idle-emoji">💗</div>
              <p className="heart-minigame__idle-text">
                Bắt {TARGET_SCORE} trái tim để nhận lời chúc bí mật! Nhấn nút bên dưới để bắt đầu~
              </p>
            </div>
          )}

          {/* ---- PLAYING STATE ---- */}
          {gameState === 'playing' && (
            <>
              {hearts.map((heart) => (
                <div
                  key={heart.id}
                  className={`heart-minigame__heart ${
                    heart.status === 'fading'
                      ? 'heart-minigame__heart--fading'
                      : heart.status === 'caught'
                      ? 'heart-minigame__heart--caught'
                      : ''
                  }`}
                  style={{
                    left: heart.x,
                    top: heart.y,
                    fontSize: heart.size,
                    width: heart.size,
                    height: heart.size,
                  }}
                  onClick={(e) => handleHeartClick(e, heart.id)}
                  role="button"
                  aria-label="Catch the heart"
                >
                  {heart.emoji}
                </div>
              ))}

              {plusOnes.map((p) => (
                <span
                  key={p.id}
                  className="heart-minigame__plus-one"
                  style={{ left: p.x, top: p.y }}
                >
                  +1
                </span>
              ))}
            </>
          )}

          {/* ---- COMPLETED STATE ---- */}
          {gameState === 'completed' && (
            <div className="heart-minigame__congrats">
              <div className="heart-minigame__congrats-emoji">🎉🏆🎉</div>
              <div className="heart-minigame__congrats-title">
                Chúc mừng! Bạn đã thắng!
              </div>
              <p className="heart-minigame__congrats-message">
                {config.secretGameMessage}
              </p>
              <div className="heart-minigame__congrats-sparkles">
                ✨ 💗 ⭐ 💗 ✨
              </div>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="heart-minigame__btn-wrap">
          {gameState === 'idle' && (
            <button className="btn btn-primary" onClick={startGame}>
              Bắt đầu chơi! 🎮
            </button>
          )}

          {gameState === 'completed' && (
            <button className="btn btn-secondary" onClick={resetGame}>
              Chơi lại 🔄
            </button>
          )}

          {gameState === 'playing' && (
            <button className="btn btn-secondary" onClick={resetGame}>
              Chơi lại 🔄
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
