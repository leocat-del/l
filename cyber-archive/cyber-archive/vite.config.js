import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';
import { resolve } from 'node:path';

const spaFallbackForStaticHosts = () => ({
  name: 'spa-fallback-for-static-hosts',
  apply: 'build',
  closeBundle() {
    copyFileSync(resolve('dist/index.html'), resolve('dist/404.html'));
  }
});

export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react(), spaFallbackForStaticHosts()]
});
