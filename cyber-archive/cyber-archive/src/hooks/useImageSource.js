import { useState } from 'react';
import { assetUrl } from '../lib/paths.js';

const EXTENSIONS = ['jpg', 'jpeg', 'png', 'webp', 'avif'];

export default function useImageSource(name) {
  const [attempt, setAttempt] = useState(0);
  const candidates = EXTENSIONS.map((extension) => assetUrl(`images/${name}.${extension}`));
  const src = attempt < candidates.length ? candidates[attempt] : null;
  const onError = () => setAttempt((current) => current + 1);
  return { src, onError };
}
