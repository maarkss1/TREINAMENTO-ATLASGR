import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  outputDir: './test-results',
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: { baseURL: 'http://127.0.0.1:3020', trace: 'retain-on-failure' },
  webServer: {
    command: 'node e2e-server.mjs',
    url: 'http://127.0.0.1:3020',
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
