import { useState, useRef } from 'react';
import config from '../config';
import './MemoryGallery.css';

const TAPES = ['tape-top', 'tape-pin', 'tape-left', 'tape-top', 'tape-pin', 'tape-left'];
const STICKERS = [
  { emoji: '🌸', top: '-12px', right: '-8px' },
  { emoji: '✨', bottom: '6px', right: '-8px' },
  { emoji: '💖', top: '-10px', left: '-8px' },
  { emoji: '🎀', top: '-12px', right: '-8px' },
  { emoji: '⭐', bottom: '6px', left: '-8px' },
  { emoji: '💫', top: '-10px', right: '-8px' },
];

export default function MemoryGallery() {
  const [photos, setPhotos] = useState(config.memories || []);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // Lightbox modal
  const [activePhotoId, setActivePhotoId] = useState(null);
  const fileInputRef = useRef(null);

  const handleFrameClick = (item) => {
    if (item.src) {
      // Mở xem ảnh phóng to không bị che
      setSelectedPhoto(item);
    } else {
      // Tải ảnh lên
      triggerUpload(item.id);
    }
  };

  const triggerUpload = (id) => {
    setActivePhotoId(id);
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
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
                onClick={() => handleFrameClick(item)}
                role="button"
                tabIndex={0}
                aria-label={item.caption || `Ảnh ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') handleFrameClick(item);
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
                      loading="lazy"
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

      {/* Lightbox Modal để xem ảnh to rõ ràng không bị che */}
      {selectedPhoto && (
        <div className="lightbox-overlay" onClick={() => setSelectedPhoto(null)}>
          <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.caption}
              className="lightbox-image"
            />
            <p className="lightbox-caption">{selectedPhoto.caption}</p>
            <button
              className="lightbox-close-btn"
              onClick={() => setSelectedPhoto(null)}
            >
              ✕ Đóng
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
