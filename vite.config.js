// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Load env variables for the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Create a new object that only contains the VITE_ variables
  const viteEnv = {};
  Object.keys(env).forEach((key) => {
    if (key.startsWith('VITE_')) {
      viteEnv[`import.meta.env.${key}`] = JSON.stringify(env[key]);
    }
  });

  return {
    plugins: [react()],
    // Make only the VITE_ variables available in the client-side code
    define: viteEnv,
    base: "/byplanleggingsprosjekt-clean/",
  }
})
