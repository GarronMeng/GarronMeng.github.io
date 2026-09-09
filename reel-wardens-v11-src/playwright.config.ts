import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests', workers: 1, fullyParallel: false,
  use: { baseURL: 'http://127.0.0.1:5188', trace: 'retain-on-failure' },
  webServer: { command: 'npm run dev -- --port 5188', url: 'http://127.0.0.1:5188', reuseExistingServer: true },
  projects: [
    { name: 'mobile', use: { ...devices['iPhone 13'], viewport: { width: 390, height: 844 } } },
    { name: 'desktop', use: { viewport: { width: 1280, height: 900 } } }
  ]
});
