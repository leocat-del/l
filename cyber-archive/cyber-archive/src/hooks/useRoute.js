import { useCallback, useEffect, useState } from 'react';

export default function useRoute() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const syncPathname = () => setPathname(window.location.pathname);
    window.addEventListener('popstate', syncPathname);
    return () => window.removeEventListener('popstate', syncPathname);
  }, []);

  const navigate = useCallback((target) => {
    window.history.pushState({}, '', target);
    setPathname(window.location.pathname);
    window.scrollTo(0, 0);
  }, []);

  return { pathname, navigate };
}
