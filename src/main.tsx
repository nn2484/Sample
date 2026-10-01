// Defensive guard for sandboxed/iframe preview environments where window.fetch has only a getter
try {
  if (typeof window !== 'undefined' && 'fetch' in window) {
    let currentFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get: () => currentFetch,
      set: (val: typeof window.fetch) => {
        currentFetch = val;
      },
      configurable: true,
      enumerable: true
    });
  }
} catch {
  // Ignored if window property cannot be modified
}

import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
