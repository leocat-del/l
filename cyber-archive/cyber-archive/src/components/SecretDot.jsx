import { useEffect, useRef, useState } from 'react';

const REQUIRED_CLICKS = 5;
const WINDOW_MS = 3000;

export default function SecretDot({ onActivate }) {
  const clicks = useRef([]);
  const [level, setLevel] = useState(0);

  useEffect(() => {
    if (level === 0) return undefined;
    const timer = setTimeout(() => {
      clicks.current = [];
      setLevel(0);
    }, WINDOW_MS);
    return () => clearTimeout(timer);
  }, [level]);

  const handleClick = () => {
    const now = Date.now();
    clicks.current = [...clicks.current.filter((time) => now - time < WINDOW_MS), now];
    if (clicks.current.length >= REQUIRED_CLICKS) {
      clicks.current = [];
      setLevel(0);
      onActivate();
      return;
    }
    setLevel(clicks.current.length);
  };

  return (
    <button
      type="button"
      className="secret-dot"
      data-level={level}
      onClick={handleClick}
      aria-label="Индикатор состояния"
    />
  );
}
