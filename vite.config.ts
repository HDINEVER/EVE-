import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// 自定义插件：复制 Cloudflare Pages 配置文件
function cloudflareFilesPlugin(): Plugin {
  return {
    name: 'cloudflare-files',
    closeBundle() {
      // 复制 _redirects 和 _headers 到 dist
      const filesToCopy = ['_redirects', '_headers'];
      filesToCopy.forEach(file => {
        const src = path.resolve(__dirname, file);
        const dest = path.resolve(__dirname, 'dist', file);
        if (fs.existsSync(src)) {
          fs.copyFileSync(src, dest);
          console.log(`Copied ${file} to dist/`);
        }
      });
    }
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
        // 添加 CORS 和 iframe 支持（仅用于本地开发）
        headers: {
          'Access-Control-Allow-Origin': '*',
          'X-Frame-Options': 'ALLOWALL',
          'Content-Security-Policy': "frame-ancestors 'self' http://localhost:* http://127.0.0.1:* https://*.pages.dev"
        }
      },
      plugins: [react(), cloudflareFilesPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
