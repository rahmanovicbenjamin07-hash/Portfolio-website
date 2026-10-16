import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // The SSR build (dist-ssr/) is only used for prerendering: public/ is copied by the client build.
  build: { copyPublicDir: !isSsrBuild },
}))
