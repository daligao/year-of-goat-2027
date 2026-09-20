// Serve the repository on port 8765. PLAYWRIGHT_MODULE can point to an existing install.
import assert from 'node:assert/strict';
const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await chromium.launch();
const base = process.env.TEST_BASE_URL || 'http://127.0.0.1:8765';
const encoded = 'eyJ0IjoidHR0IiwiciI6IkZyaWVuZCIsInciOiJTZW5kaW5nIGdvb2QgdmliZXMgYW5kIGx1Y2t5IG51bWJlcnMgeW91ciB3YXkuIiwibiI6Ijg4IiwidGgiOiJjbGFzc2ljIn0';
try {
  for (const reducedMotion of ['reduce', 'no-preference']) {
    const page = await browser.newPage({viewport:{width:390,height:844},reducedMotion,serviceWorkers:'block'});
    await page.route('https://www.googletagmanager.com/**',route=>route.abort());
    const errors=[];page.on('pageerror',error=>errors.push(error.message));
    const response=await page.goto(`${base}/red-envelope-open/#d=${encoded}`);
    assert.equal(response.status(),200);
    const frames=await page.evaluate(async()=>{
      const frames=[];const start=performance.now();document.getElementById('open-btn').click();
      await new Promise(resolve=>{
        function sample(){
          const content=document.getElementById('env-content');const closed=document.getElementById('env-closed');
          frames.push({hidden:content.hidden,opacity:Number(getComputedStyle(content).opacity),transform:getComputedStyle(content).transform,closedOpacity:Number(getComputedStyle(closed).opacity),closedY:closed.getBoundingClientRect().y});
          if(performance.now()-start<1300)requestAnimationFrame(sample);else resolve();
        }requestAnimationFrame(sample);
      });return frames;
    });
    assert.ok(frames.some(f=>!f.hidden&&f.opacity>0&&f.opacity<1),`${reducedMotion}: missing intermediate fade frames`);
    assert.equal(frames.at(-1).opacity,1);
    assert.equal(await page.locator('#r-to').textContent(),'ttt');
    if(reducedMotion==='reduce'){
      assert.ok(frames.filter(f=>!f.hidden).every(f=>f.transform==='none'));
      const fading=frames.filter(f=>f.closedOpacity>0&&f.closedOpacity<1);
      assert.ok(fading.length>1);assert.ok(fading.every(f=>Math.abs(f.closedY-fading[0].closedY)<1),'Envelope moved during reduced-motion fade');
      assert.equal(await page.locator('#open-btn').evaluate(el=>el.classList.contains('spin')),false);
    }
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
    assert.equal(await page.locator('#sendback-btn').isVisible(),true);assert.deepEqual(errors,[]);
    await page.close();console.log(`PASS: ${reducedMotion} has intermediate fade frames, completed reveal, correct wish and no horizontal overflow.`);
  }
} finally {await browser.close();}
