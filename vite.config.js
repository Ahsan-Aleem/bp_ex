import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Change this to 'dist' if you want to keep the default
  },
  plugins: [react()],
})