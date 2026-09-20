// Run with a static server serving the repository root on port 8765; PLAYWRIGHT_MODULE may point to a local installation.
import assert from 'node:assert/strict';
import fs from 'node:fs';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch({headless:true});
const context = await browser.newContext({viewport:{width:390,height:844}, acceptDownloads:true});
await context.route('https://www.googletagmanager.com/**', route => route.fulfill({contentType:'text/javascript', body:'/* Analytics disabled in tests; inspect exact queued parameters. */'}));
const page = await context.newPage(); const errors=[]; const requests=[];
page.on('pageerror', e => errors.push(e.message)); page.on('request', request => requests.push({url:request.url(),body:request.postData()}));
const base='http://127.0.0.1:8765';
await page.clock.install({time:new Date(2026,8,20,12,0,0)});
await page.goto(`${base}/daily-zodiac-card/`);
await page.waitForFunction(() => !document.getElementById('generate').disabled);
assert.equal(await page.locator('h1').count(), 1);
assert.equal(await page.locator('link[rel=canonical]').getAttribute('href'), 'https://chinesefortunetools.online/daily-zodiac-card/');
assert.ok((await page.title()).includes('Daily Chinese Zodiac'));
assert.ok((await page.locator('meta[name=description]').getAttribute('content')).length > 80);
assert.equal(JSON.parse(await page.locator('script[type="application/ld+json"]').textContent()).offers.price,'0');
await page.locator('#generate').click(); assert.ok((await page.locator('#input-error').textContent()).includes('valid birth year'));
await page.locator('#birth-year').fill('1990'); await page.locator('#birth-month').selectOption('2'); await page.locator('#generate').click();
await page.waitForFunction(() => !document.getElementById('download').disabled);
assert.ok((await page.locator('#sign-note').textContent()).includes('Horse'));
const initial = await page.locator('#card-transcript').textContent();
const imageURLs=[];
for (const theme of ['red-gold','paper-cut','ink']) {
  await page.locator(`input[value="${theme}"]`).check({force:true});
  await page.waitForFunction(() => !document.getElementById('download').disabled);
  assert.equal(await page.locator('#card-transcript').textContent(), initial);
  imageURLs.push(await page.locator('#fortune-canvas').evaluate(c=>c.toDataURL()));
  const wait = page.waitForEvent('download'); await page.locator('#download').click(); const download=await wait;
  assert.ok(download.suggestedFilename().endsWith(`${theme}.png`));
  await download.saveAs(`/tmp/cft-${theme}.png`);
  const bytes=fs.readFileSync(`/tmp/cft-${theme}.png`); assert.equal(bytes.readUInt32BE(16),1080);assert.equal(bytes.readUInt32BE(20),1350);
}
assert.equal(new Set(imageURLs).size,3);
for (const width of [320,360,390,430,768,1280]) {
  await page.setViewportSize({width,height:900});
  assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true,`overflow at ${width}`);
}
await page.setViewportSize({width:390,height:844});await page.evaluate(()=>scrollTo(0,0));await page.screenshot({path:'/tmp/cft-mobile.png',fullPage:true});
await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>true});Object.defineProperty(navigator,'share',{configurable:true,value:async value=>{window.sharedFile=value.files[0].name;}});});
await page.locator('#share').click(); await page.waitForFunction(()=>document.getElementById('action-status').textContent==='Card shared.');
assert.ok((await page.evaluate(()=>window.sharedFile)).includes('horse'));
const shareCount=await page.evaluate(()=>window.dataLayer.filter(x=>x[1]==='daily_zodiac_share').length);
await page.evaluate(()=>Object.defineProperty(navigator,'share',{configurable:true,value:async()=>{throw new DOMException('Canceled','AbortError');}}));
await page.locator('#share').click(); await page.waitForFunction(()=>document.getElementById('action-status').textContent.includes('canceled'));
assert.equal(await page.evaluate(()=>window.dataLayer.filter(x=>x[1]==='daily_zodiac_share').length),shareCount);
await page.evaluate(()=>{Object.defineProperty(navigator,'canShare',{configurable:true,value:()=>false});Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.copied=text;}}});});
await page.locator('#share').click();await page.waitForFunction(()=>!!window.copied);assert.equal(await page.evaluate(()=>window.copied),'https://chinesefortunetools.online/daily-zodiac-card/');
const events=await page.evaluate(()=>window.dataLayer.filter(x=>x[0]==='event').map(x=>[x[1],x[2]]));
assert.ok(events.some(x=>x[0]==='daily_zodiac_generate')); assert.ok(events.some(x=>x[0]==='daily_zodiac_download'));assert.ok(events.some(x=>x[0]==='daily_zodiac_share'));
for (const [name,params] of events) {assert.deepEqual(Object.keys(params).sort(),['theme','zodiac']);assert.equal(params.zodiac,'horse');}
assert.equal(await page.evaluate(()=>localStorage.length+sessionStorage.length),0);assert.equal((await context.cookies()).length,0);
assert.equal(requests.some(r=>(r.url+(r.body||'')).includes('1990')),false);
await page.clock.setSystemTime(new Date(2026,8,20,23,59,59));
await page.locator('#generate').click();const before=await page.locator('#card-transcript').textContent();await page.clock.fastForward(17000);const after=await page.locator('#card-transcript').textContent();assert.notEqual(before,after);assert.ok(after.includes('2026-09-21'));
for(const href of await page.locator('a[href]').evaluateAll(links=>links.map(a=>a.getAttribute('href')))){const response=await page.request.get(base+href);assert.equal(response.status(),200,href);}
const sitemap=await page.request.get(base+'/sitemap.xml'); assert.equal(sitemap.status(),200); assert.ok((await sitemap.text()).includes('https://chinesefortunetools.online/daily-zodiac-card/'));
assert.equal((await page.request.get(base+'/new-year-2027/')).status(),200);
assert.deepEqual(errors,[]);
await context.close();
const failureContext=await browser.newContext();await failureContext.route('**/fortunes.json',route=>route.abort());const failurePage=await failureContext.newPage();await failurePage.goto(base+'/daily-zodiac-card/');await failurePage.waitForFunction(()=>document.getElementById('action-status').textContent.includes('could not load'));assert.equal(await failurePage.locator('#generate').isDisabled(),true);
await browser.close();console.log('PASS: SEO, local links, validation, 3 themes, deterministic rendering, 3 PNG downloads, 6 viewport widths, share/cancel/fallback, analytics allowlist, no storage/year leakage, midnight rollover, data-load failure, existing 2027 page smoke check.');
