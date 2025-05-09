// https://vitejs.dev/config/
import type { UserConfig } from 'vite';
import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import { extname, relative } from 'path';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import { glob } from 'glob';

export default defineConfig({
  plugins: [
    // 🎨 Tailwind is only used in Storybook stories
    tailwindcss(),
    dts(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      input: Object.fromEntries(
        glob.sync(['src/components/**/!(*.test).{js,ts}', 'src/index.ts']).map(file => [
          // The name of the entry point
          // src/components/foo/foo.ts becomes components/foo/foo
          relative('src', file.slice(0, file.length - extname(file).length)),
          // The absolute path to the entry file
          fileURLToPath(new URL(file, import.meta.url)),
        ]),
      ),
      // https://rollupjs.org/configuration-options/#treeshake
      treeshake: 'recommended',
      output: {
        exports: 'named',
        assetFileNames: 'assets/[name][extname]',
        chunkFileNames: 'chunks/[name].js',
        entryFileNames: '[name].js',
        // preserveModules: true,
        globals: {
          // lit: 'lit',
        },
      },
    },
  },
}) satisfies UserConfig;
