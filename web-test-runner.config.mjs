import fs from 'fs';
import { esbuildPlugin } from '@web/dev-server-esbuild';
// import { globbySync } from 'globby'
import { playwrightLauncher } from '@web/test-runner-playwright';

// https://modern-web.dev/docs/test-runner/cli-and-configuration/
export default {
  rootDir: '.',
  files: 'src/**/*.test.ts', // "default" group
  concurrentBrowsers: 3,
  nodeResolve: {
    exportConditions: ['production', 'default'],
  },
  testFramework: {
    config: {
      timeout: 3000000,
      retries: 1,
    },
  },
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2021',
    }),
  ],
  browsers: [
    // https://modern-web.dev/docs/test-runner/browser-launchers/playwright/#customizing-launch-options
    playwrightLauncher({
      product: 'chromium',
      launchOptions: {
        headless: true,
        devtools: false,
        //args: ['--some-flag'],
      },
    }),
    // Firefox started failing randomly so we're temporarily disabling it here. This could be a rogue test, not really
    // sure what's happening.
    // playwrightLauncher({ product: 'firefox' }),
    //playwrightLauncher({ product: 'webkit' }),
  ],
  testRunnerHtml: testFramework => `
    <html lang="en-US">
      <head></head>
      <body>
        <script>
          window.process = {env: { NODE_ENV: "production" }}
        </script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>
  `,
};
