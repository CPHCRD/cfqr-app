import { readFileSync } from 'node:fs';
import { defineConfig, loadEnv } from 'vite';

const { version } = JSON.parse(readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

// Environment variables keep their historical names (no VITE_ prefix) so the
// values already configured on Netlify keep working.
const ENV_KEYS = [
  'FIREBASE_API_KEY',
  'FIREBASE_AUTH_DOMAIN',
  'FIREBASE_DATABASE_URL',
  'GOOGLE_ANALYTICS_ID'
];

export default defineConfig(({ mode }) => {
  const env = { ...loadEnv(mode, process.cwd(), ''), ...process.env };

  const define = {
    'process.env.NODE_ENV': JSON.stringify(mode === 'production' ? 'production' : 'development'),
    'process.env.APP_VERSION': JSON.stringify(version),
    'process.env.isWeb': 'true'
  };
  ENV_KEYS.forEach(key => {
    define[`process.env.${key}`] = JSON.stringify(env[key]);
  });

  return {
    publicDir: 'static',
    define,
    plugins: [{
      // Exposes the deployed version as <meta name="app-version"> in the page head
      name: 'app-version-meta',
      transformIndexHtml: () => [{
        tag: 'meta',
        attrs: { name: 'app-version', content: version },
        injectTo: 'head'
      }]
    }],
    resolve: {
      // Browser polyfills for the Node core modules used by @seald-io/nedb
      alias: {
        events: 'events/',
        util: 'util/'
      }
    },
    // React 15 has no automatic JSX runtime
    oxc: {
      jsx: { runtime: 'classic' }
    },
    css: {
      preprocessorOptions: {
        scss: {
          // legacy Sass syntax (@import, lighten/darken...) still compiles with Sass 1.x
          silenceDeprecations: ['import', 'global-builtin', 'color-functions']
        }
      }
    },
    build: {
      outDir: 'dist',
      sourcemap: true
    }
  };
});
