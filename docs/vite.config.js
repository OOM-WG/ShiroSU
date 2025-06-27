// vite.config.ts
import { defineConfig } from 'vite'
import path from 'path';

export default defineConfig({
    // base: '/your-base-path/',
    experimental: {
        renderBuiltUrl(filename, { hostType, type, hostId }) {
            if (type === 'public') {
                return 'https://ssu.yumeyuka.plus/' + filename;
            } else if (path.extname(hostId) === '.js') {
                return {
                    runtime: `window.__assetsPath(${JSON.stringify(filename)})`
                };
            } else {
                return 'https://ssu.yumeyuka.plus/assets/' + filename;
            }
        }
    }
})