// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// Triggering a new deployment to fetch updated secrets.
export default defineConfig({
  base: '/byplanleggingsprosjekt-clean/',
  plugins: [react()],
})
