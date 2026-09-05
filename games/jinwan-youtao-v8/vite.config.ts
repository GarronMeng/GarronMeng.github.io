import {defineConfig} from 'vite';
export default defineConfig({base:'./',build:{target:'es2022',chunkSizeWarningLimit:700},server:{host:'0.0.0.0',port:4173,allowedHosts:['terminal.local']}});
