import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  resolve: {
    
  },
  plugins: [react()],
  base: "/products/"
})
