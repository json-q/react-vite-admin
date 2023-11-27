import react from '@vitejs/plugin-react';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv, type ConfigEnv, type UserConfig } from 'vite';

type Recordable<T = any> = Record<string, T>;
interface ViteEnv {
  VITE_APP_TITLE: string;
  VITE_API_URL: string;
  VITE_BASE_URL: string;
  VITE_PORT: number;
  VITE_OPEN: boolean;
  VITE_DROP_CONSOLE: boolean;
  VITE_REPORT: boolean;
}

/** 对获取的环境变量做类型转换 */
const wrapperEnv = (envConf: Recordable): ViteEnv => {
  const ret: any = {};
  for (const envName of Object.keys(envConf)) {
    let realName = envConf[envName].replace(/\\n/g, '\n');
    realName = realName === 'true' ? true : realName === 'false' ? false : realName;

    if (envName === 'VITE_PORT') {
      realName = Number(realName);
    }
    ret[envName] = realName;
    process.env[envName] = realName;
  }
  return ret;
};

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
  const viteEnv = wrapperEnv(env);

  return {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: true,
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: {
        [viteEnv.VITE_BASE_URL]: {
          target: viteEnv.VITE_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
    plugins: [react(), viteEnv.VITE_REPORT && visualizer()],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
    build: {
      outDir: 'dist',
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式 npm i terser --legacy--peer-deps
      // minify: 'esbuild',
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: viteEnv.VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'js/chunk-[name]-[hash].js',
          entryFileNames: 'js/[name]-[hash].js',
          assetFileNames: '[ext]/[name]-[hash].[ext]',
        },
      },
    },
  };
});
