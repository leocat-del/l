export const BASE = import.meta.env.BASE_URL;
export const HOME_PATH = BASE;
export const SIGNAL_PATH = `${BASE}signal`;

export const assetUrl = (path) => `${BASE}${path}`;

const trimTrailingSlashes = (value) => value.replace(/\/+$/, '');

export const isSignalPath = (pathname) =>
  trimTrailingSlashes(pathname) === trimTrailingSlashes(SIGNAL_PATH);
