import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// This code is for handling the GitHub Pages SPA refresh issue.
// It checks if a redirect path is stored in sessionStorage, and if so,
// it navigates to that path and then clears the stored path.
const path = sessionStorage.getItem('redirect');
if (path) {
  sessionStorage.removeItem('redirect');
  // Use replaceState to change the URL without adding to history,
  // and without triggering a page reload.
  const newUrl = new URL(window.location.href);
  window.history.replaceState(null, null, newUrl.origin + path);
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
