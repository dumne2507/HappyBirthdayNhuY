import { useState, useRef } from 'react';
import config from '../config';
import './MemoryGallery.css';

const TAPES = ['tape-top', 'tape-pin', 'tape-left', 'tape-top', 'tape-pin', 'tape-left'];
const STICKERS = [
  { emoji: '🌸', top: '-10px', right: '-8px' },
  { emoji: '✨', bottom: '8px', right: '-6px' },
  { emoji: '💖', top: '15px', left: '-10px' },
  { emoji: '🎀', top: '-8px', right: '-6px' },
  { emoji: '⭐', bottom: '12px', left: '-8px' },
  { emoji: '💫', top: '20px', right: '-10px' },
];

export default function MemoryGallery() {
  const [photos, setPhotos] = useState(config.memories || []);
  const [activePhotoId, setActivePhotoId] = useState(null);
  const fileInputRef = useRef(null);

  const handleFrameClick = (id) => {
    setActivePhotoId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // reset
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file && activePhotoId) {
      const imageUrl = URL.createObjectURL(file);
      setPhotos((prev) =>
        prev.map((photo) =>
          photo.id === activePhotoId ? { ...photo, src: imageUrl } : photo
        )
      );
    }
  };

  return (
    <section className="section memory-gallery">
      <h2 className="section-title">Album Kỷ Niệm 📸</h2>

      {/* Hidden file input for image uploads */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="memory-file-input"
        onChange={handleFileChange}
      />

      <div className="card">
        <div className="memory-grid">
          {photos.map((item, index) => {
            const tapeType = TAPES[index % TAPES.length];
            const sticker = STICKERS[index % STICKERS.length];

            return (
              <div
                key={item.id}
                className="polaroid"
                onClick={() => handleFrameClick(item.id)}
                role="button"
                tabIndex={0}
                aria-label={item.caption || `Ảnh ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleFrameClick(item.id);
                }}
              >
                {/* Decorative Tape / Pin */}
                {tapeType === 'tape-pin' ? (
                  <span className="polaroid-tape tape-pin">📌</span>
                ) : (
                  <div className={`polaroid-tape ${tapeType}`} />
                )}

                {/* Decorative Sticker */}
                <span
                  className="polaroid-sticker"
                  style={{
                    top: sticker.top,
                    bottom: sticker.bottom,
                    left: sticker.left,
                    right: sticker.right,
                  }}
                >
                  {sticker.emoji}
                </span>

                {/* Photo or Placeholder */}
                <div className="polaroid-image-wrapper">
                  {item.src ? (
                    <img
                      src={item.src}
                      alt={item.caption}
                      className="polaroid-photo"
                    />
                  ) : (
                    <div className="polaroid-placeholder">
                      <span className="placeholder-camera">📸</span>
                      <span className="placeholder-text">Nhấn để thêm ảnh</span>
                    </div>
                  )}
                </div>

                {/* Caption */}
                <div className="polaroid-caption">
                  {item.caption}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
