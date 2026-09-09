import { test, expect } from '@playwright/test';

test('core loop + three diagnostics', async ({ page }) => {
  const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto('/');
  await expect(page.getByRole('button',{name:'开始这一局'})).toBeVisible();
  await page.getByRole('button',{name:'开始这一局'}).click();
  await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.seed(1337));
  await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.setState('active-play'));
  await expect(page.getByText('ROSTER · RANDOM STATS')).toBeVisible();
  await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.action('nudge'));
  await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.action('spin'));
  await expect.poll(async()=>page.evaluate(()=>(window.__THREE_GAME_TEST_HOOKS__!.snapshot() as any).reel.spinning),{timeout:5000}).toBe(false);
  const afterSpin:any=await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.snapshot());
  expect(afterSpin.lines.length).toBeGreaterThan(0);expect(afterSpin.units.length).toBeGreaterThan(0);
  await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.action('battle'));
  await expect.poll(async()=>page.evaluate(()=>(window.__THREE_GAME_TEST_HOOKS__!.snapshot() as any).phase),{timeout:15000}).not.toBe('battle');
  const diag:any=await page.evaluate(()=>window.__THREE_GAME_DIAGNOSTICS__);expect(diag.renderer.calls).toBeGreaterThan(0);expect(errors).toEqual([]);
});

test('mobile layout has no horizontal overflow', async ({ page }) => {
  await page.goto('/');await page.evaluate(()=>window.__THREE_GAME_TEST_HOOKS__!.setState('active-play'));const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);expect(overflow).toBeLessThanOrEqual(1);
});
