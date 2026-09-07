import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';

const DOCS_DIR = path.resolve(__dirname, '../../../../docs/AUDITORIA_VISUAL_COMPLETA');
const IMAGES_DIR = path.join(DOCS_DIR, 'imagens');
const VIDEOS_DIR = path.join(DOCS_DIR, 'videos');

// Helper to ensure directory exists
function ensureDirSync(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Routes to capture
const STATIC_ROUTES = [
  { name: 'home', url: '/' },
  { name: 'dashboard', url: '/dashboard' },
  { name: 'trilha', url: '/trilha' },
  { name: 'produtos', url: '/produtos' },
  { name: 'shorts', url: '/shorts' },
  { name: 'prova-final', url: '/prova-final' },
  { name: 'certificado', url: '/certificado' },
  { name: 'ranking', url: '/ranking' },
  { name: 'profile', url: '/profile' },
  { name: 'glossario', url: '/glossario' },
  { name: 'admin', url: '/admin' },
];

const PRODUCT_SLUGS = ['profile', 'connect', 'gr', 'analytics'];

const MODULE_SLUGS = [
  '01-bem-vindo-atlasgr',
  '02-mercado-logistica',
  '03-gerenciamento-risco',
  '04-produtos-atlasgr',
  '05-software-logistico',
  '06-atlas-profile',
  '07-integracoes',
  '08-clientes',
  '09-processo-comercial',
  '10-termos-tecnicos',
  '11-operacao',
  '12-compliance',
  '13-tecnologia',
  '14-casos-reais',
  '15-preparacao-final'
];

test.describe('Visual Audit & Journey Capture Suite', () => {
  test.beforeAll(() => {
    ensureDirSync(IMAGES_DIR);
    ensureDirSync(VIDEOS_DIR);
  });

  // 1. Capture Desktop Screenshots (1440x900)
  test('Capture all static pages, products, and modules (Desktop 1440x900)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    // Seed localStorage so user has full progress, name, and unlocked features
    await page.goto('/');
    await page.evaluate(() => {
      localStorage.setItem('atlasgr-user-registration', JSON.stringify({
        name: 'Auditor Oficial',
        email: 'auditor@atlasgr.com.br',
        role: 'Diretoria de Operações',
        company: 'AtlasGR Logística',
        registeredAt: new Date().toISOString()
      }));
      localStorage.setItem('atlas-onboarding-storage', JSON.stringify({
        state: {
          completedModules: [
            '01-bem-vindo-atlasgr', '02-mercado-logistica', '03-gerenciamento-risco',
            '04-produtos-atlasgr', '05-software-logistico', '06-atlas-profile',
            '07-integracoes', '08-clientes', '09-processo-comercial',
            '10-termos-tecnicos', '11-operacao', '12-compliance',
            '13-tecnologia', '14-casos-reais', '15-preparacao-final'
          ],
          quizScores: {
            '01-bem-vindo-atlasgr': 100, '02-mercado-logistica': 100, '03-gerenciamento-risco': 100,
            '04-produtos-atlasgr': 100, '05-software-logistico': 100, '06-atlas-profile': 100,
            '07-integracoes': 100, '08-clientes': 100, '09-processo-comercial': 100,
            '10-termos-tecnicos': 100, '11-operacao': 100, '12-compliance': 100,
            '13-tecnologia': 100, '14-casos-reais': 100, '15-preparacao-final': 100
          },
          currentModuleSlug: '01-bem-vindo-atlasgr',
          finalExamPassed: true,
          finalExamScore: 100,
          userRank: 1
        },
        version: 0
      }));
    });

    // Helper to capture scroll-by-scroll
    async function capturePageComprehensive(routeCategory: string, routeName: string, urlPath: string) {
      const targetFolder = path.join(IMAGES_DIR, routeCategory, routeName);
      ensureDirSync(targetFolder);

      await page.goto(urlPath, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      // 01-inicio.png
      await page.screenshot({ path: path.join(targetFolder, '01-inicio.png') });

      // 02-full-page.png
      await page.screenshot({ path: path.join(targetFolder, '02-full-page.png'), fullPage: true });

      // Scroll-by-scroll captures
      const scrollHeight = await page.evaluate(() => document.body.scrollHeight);
      const viewportHeight = 900;
      let currentScroll = 0;
      let scrollIndex = 1;

      while (currentScroll + viewportHeight < scrollHeight && scrollIndex <= 8) {
        currentScroll += 600;
        await page.evaluate((sc) => window.scrollTo(0, sc), currentScroll);
        await page.waitForTimeout(300);
        const indexStr = String(scrollIndex).padStart(2, '0');
        await page.screenshot({ path: path.join(targetFolder, `scroll-${indexStr}.png`) });
        scrollIndex++;
      }

      // Reset scroll
      await page.evaluate(() => window.scrollTo(0, 0));
    }

    // Capture Static Pages
    for (const route of STATIC_ROUTES) {
      await capturePageComprehensive('telas', route.name, route.url);
    }

    // Capture Product Pages
    for (const slug of PRODUCT_SLUGS) {
      await capturePageComprehensive('produtos', slug, `/produtos/${slug}`);
    }

    // Capture Module Pages
    for (const slug of MODULE_SLUGS) {
      await capturePageComprehensive('modulos', slug, `/trilha/${slug}`);
    }
  });

  // 2. Capture Mobile Responsiveness (390x844)
  test('Capture mobile views for key routes (Mobile 390x844)', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });

    const keyMobileRoutes = [
      { name: 'home', url: '/' },
      { name: 'dashboard', url: '/dashboard' },
      { name: 'trilha', url: '/trilha' },
      { name: 'modulo-01', url: '/trilha/01-bem-vindo-atlasgr' },
      { name: 'produto-profile', url: '/produtos/profile' },
      { name: 'shorts', url: '/shorts' },
      { name: 'prova-final', url: '/prova-final' },
      { name: 'certificado', url: '/certificado' },
      { name: 'ranking', url: '/ranking' },
      { name: 'admin', url: '/admin' }
    ];

    for (const route of keyMobileRoutes) {
      const targetFolder = path.join(IMAGES_DIR, 'mobile', route.name);
      ensureDirSync(targetFolder);

      await page.goto(route.url, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(500);

      await page.screenshot({ path: path.join(targetFolder, '01-mobile-view.png') });
      await page.screenshot({ path: path.join(targetFolder, '02-mobile-full.png'), fullPage: true });
    }
  });

  // 3. Record Journeys with Context Video Recording
  test('Record Journeys with Playwright Context Video', async ({ browser }) => {
    const journeys = [
      { id: '01-home-ate-dashboard', steps: ['/', '/dashboard'] },
      { id: '02-navegacao-trilha', steps: ['/dashboard', '/trilha', '/trilha/01-bem-vindo-atlasgr'] },
      { id: '03-modulo-completo', steps: ['/trilha/01-bem-vindo-atlasgr', '/trilha/02-mercado-logistica'] },
      { id: '04-prova-final', steps: ['/prova-final'] },
      { id: '05-certificado', steps: ['/certificado'] },
      { id: '06-admin', steps: ['/admin'] },
      { id: '07-produtos', steps: ['/produtos', '/produtos/profile', '/produtos/connect', '/produtos/analytics'] },
      { id: '08-shorts-e-glossario', steps: ['/shorts', '/glossario', '/ranking', '/profile'] }
    ];

    for (const j of journeys) {
      const context = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        recordVideo: { dir: VIDEOS_DIR, size: { width: 1280, height: 720 } }
      });
      const page = await context.newPage();

      // Seed localStorage
      await page.goto('/');
      await page.evaluate(() => {
        localStorage.setItem('atlasgr-user-registration', JSON.stringify({
          name: 'Auditor Oficial',
          email: 'auditor@atlasgr.com.br',
          role: 'Diretoria de Operações',
          company: 'AtlasGR Logística'
        }));
      });

      for (const stepUrl of j.steps) {
        await page.goto(stepUrl, { waitUntil: 'domcontentloaded' });
        await page.waitForTimeout(500);
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(300);
        await page.evaluate(() => window.scrollBy(0, 400));
        await page.waitForTimeout(300);
      }

      const video = page.video();
      await context.close(); // Saves video

      if (video) {
        const videoPath = await video.path();
        const targetVideoPath = path.join(VIDEOS_DIR, `${j.id}.webm`);
        if (fs.existsSync(videoPath)) {
          fs.renameSync(videoPath, targetVideoPath);
        }
      }
    }
  });
});
