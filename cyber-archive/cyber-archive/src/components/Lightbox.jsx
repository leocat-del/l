import { useEffect } from 'react';

export default function Lightbox({ image, onClose }) {
  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="lightbox" role="dialog" aria-modal="true" onClick={onClose}>
      <img src={image.src} alt={`Архивный фрагмент ${image.number}`} />
      <span className="lightbox-label">IMAGE {image.number} // CLICK OR ESC TO CLOSE</span>
    </div>
  );
}
