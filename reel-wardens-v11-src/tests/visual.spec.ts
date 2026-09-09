import { test, expect } from '@playwright/test';

for (const state of ['active-play','battle']) {
  test(`visual evidence ${state}`, async ({ page }, testInfo) => {
    const errors:string[]=[];
    page.on('pageerror',e=>errors.push(e.message));
    page.on('console',m=>{ if(m.type()==='error') errors.push(m.text()); });
    await page.goto('/');
    await page.evaluate((s)=>{
      const h=window.__THREE_GAME_TEST_HOOKS__!;
      h.seed(2026);h.setState(s);h.setReducedMotion(true);h.hideDebugUi(true);
    },state);
    await page.waitForTimeout(180);
    await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.setPausedForScreenshot(true));
    await page.waitForTimeout(50);
    const canvas=page.locator('.stage canvas');
    await expect(canvas).toBeVisible();
    const box=await canvas.boundingBox();expect(box?.width||0).toBeGreaterThan(250);expect(box?.height||0).toBeGreaterThan(150);
    const shot=await page.locator('#app').screenshot({path:testInfo.outputPath(`${state}.png`),animations:'disabled'});expect(shot.byteLength).toBeGreaterThan(5000);
    const diag:any=await page.evaluate(()=>window.__THREE_GAME_DIAGNOSTICS__);expect(diag.renderer.calls).toBeGreaterThan(0);expect(diag.renderer.triangles).toBeGreaterThan(0);expect(errors).toEqual([]);
  });
}
