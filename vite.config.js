import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {NodeGlobalsPolyfillPlugin} from '@esbuild-plugins/node-globals-polyfill'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process:true,
          buffer:true,
        })
      ]
    }
  },
  resolve: {
    alias: {
      buffer:'buffer',
    }
  },
  define: {
    'process.env':{},
  },
});
