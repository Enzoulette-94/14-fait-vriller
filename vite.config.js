import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/14-fait-vriller/', // remplace si ton repo a un autre nom
  build: {
    outDir: 'docs',
    emptyOutDir: true,
  },
})
