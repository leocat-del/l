import { useEffect, useState } from 'react';
import useImageSource from '../hooks/useImageSource.js';

export default function SignalPage({ onExit }) {
  const { src, onError } = useImageSource('secret-image');
  const [imageReady, setImageReady] = useState(false);
  const ready = src ? imageReady : true;

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onExit();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onExit]);

  return (
    <main className="signal">
      {src ? (
        <img
          className="signal-image"
          src={src}
          alt=""
          onLoad={() => setImageReady(true)}
          onError={onError}
        />
      ) : (
        <div className="signal-placeholder" aria-hidden="true" />
      )}
      <div className="signal-noise" aria-hidden="true" />
      <p className={`signal-caption${ready ? ' is-visible' : ''}`}>Она придёт</p>
      <button type="button" className="signal-exit" onClick={onExit}>
        ESC
      </button>
    </main>
  );
}
