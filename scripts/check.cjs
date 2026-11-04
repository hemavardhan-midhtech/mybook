const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(r.url())});
await page.goto('http://127.0.0.1:8001/mybook/',{waitUntil:'networkidle'});
assert.match(await page.title(),/The Road Back to Myself/);
for(const image of await page.locator('img').all()){await image.scrollIntoViewIfNeeded();await image.evaluate(i=>i.decode());}
await page.evaluate(()=>scrollTo(0,0));
assert.equal(await page.locator('.chapters li').count(),5);
assert.equal(await page.locator('img.official-cover').count(),2);
assert(await page.locator('img.official-cover').evaluateAll(images=>images.every(i=>i.naturalWidth===712&&i.naturalHeight===1076))); 
assert.equal(await page.locator('dd').filter({hasText:'978-93-345-7669-6'}).count(),1);
assert.equal(await page.locator('#purchase-links a, form').count(),0);
assert(await page.evaluate(()=>[...document.querySelectorAll('a[href^="#"]')].every(a=>document.getElementById(a.hash.slice(1)))));
assert(await page.evaluate(()=>[...document.images].every(i=>i.complete&&i.naturalWidth>0)));
assert(await page.evaluate(()=>[...document.querySelectorAll('[src],link[href]')].every(e=>!(e.getAttribute('src')||e.getAttribute('href')).startsWith('/'))));
for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:1000});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`overflow ${width}`)}
await page.emulateMedia({reducedMotion:'reduce'});
await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'review/desktop.png',fullPage:true});
await page.setViewportSize({width:390,height:844});const menu=page.locator('.menu-toggle');await menu.click();assert.equal(await menu.getAttribute('aria-expanded'),'true');
await page.locator('#navigation').getByRole('link',{name:'The Story',exact:true}).click();assert.equal(await menu.getAttribute('aria-expanded'),'false');assert.equal(new URL(page.url()).hash,'#story');
await menu.click();await page.keyboard.press('Escape');assert.equal(await menu.getAttribute('aria-expanded'),'false');
await page.goto('http://127.0.0.1:8001/mybook/',{waitUntil:'networkidle'});await page.screenshot({path:'review/mobile.png',fullPage:true});
const plain=await browser.newPage({javaScriptEnabled:false});await plain.goto('http://127.0.0.1:8001/mybook/');assert(await plain.locator('#story h2').isVisible());assert.equal(await plain.locator('img.official-cover').count(),2);
assert.deepEqual(errors,[]);await browser.close();console.log('PASS: 4 viewport widths, anchors, images, relative asset paths, book details, menu, Escape, no-JS content, reduced-motion screenshots, no browser errors.');
})().catch(e=>{console.error(e);process.exit(1)});
