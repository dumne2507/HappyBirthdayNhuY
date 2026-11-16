import React from 'react';
import config from '../config';
import './BirthdayFooter.css';

const BirthdayFooter = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="birthday-footer">
      <div className="footer-decorations">
        <span className="footer-deco">✨</span>
        <span className="footer-deco">💗</span>
        <span className="footer-deco">🌸</span>
        <span className="footer-deco">💗</span>
        <span className="footer-deco">✨</span>
      </div>
      
      <div className="footer-divider">
        <span className="divider-star">⭐</span>
      </div>

      <p className="footer-message">
        made with <span className="footer-sender">claude gemini antigravity</span> not bun hehee
        <img src="./media/meme.png" alt="hehee" className="footer-meme-icon" />
      </p>
      
      <p className="footer-wish">
        Happy Birthday {config.recipientName}! 🎂
      </p>
      
      <p className="footer-year">{year}</p>

      <div className="footer-sparkles">
        {[...Array(8)].map((_, i) => (
          <span
            key={i}
            className="footer-sparkle"
            style={{
              left: `${10 + i * 12}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✦
          </span>
        ))}
      </div>
    </footer>
  );
};

export default BirthdayFooter;
