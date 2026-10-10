import useImageSource from '../hooks/useImageSource.js';

export default function ImageFrame({ name, number, onOpen }) {
  const { src, onError } = useImageSource(name);

  const content = src ? (
    <img src={src} alt={`Архивный фрагмент ${number}`} onError={onError} loading="lazy" />
  ) : (
    <span className="frame-placeholder">FILE PENDING</span>
  );

  return (
    <figure className="frame">
      {src ? (
        <button type="button" className="frame-window" onClick={() => onOpen({ src, number })}>
          {content}
          <span className="frame-scan" />
        </button>
      ) : (
        <div className="frame-window">{content}</div>
      )}
      <i className="corner corner-tl" />
      <i className="corner corner-tr" />
      <i className="corner corner-bl" />
      <i className="corner corner-br" />
      <figcaption>
        <span className="frame-number">IMAGE {number}</span>
        <span>ARCHIVE FRAGMENT</span>
        <span className="frame-status">STATUS: {src ? 'STORED' : 'PENDING'}</span>
      </figcaption>
    </figure>
  );
}
