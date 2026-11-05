// Progressive enhancement: the approved excerpt remains available without JS.
(() => {
  const book = document.querySelector('#inside');
  if (!book) return;
  const spread = document.createElement('div');
  spread.className = 'reading-spread';
  [...book.children].forEach(page => { page.classList.remove('reveal'); spread.append(page); });
  book.append(spread);
  const opening = spread.innerHTML;
  const pages = [opening,
    `<div class="excerpt"><p class="eyebrow">COMPANION NOTES · THE STORY</p><h2>A life that feels<br>like <em>his own.</em></h2><p>After his relationship ends, Aditya must face the friendships he neglected, the interests he abandoned, and the parts of himself he left behind.</p><p>Through ordinary mornings, shared cups of chai, difficult conversations, and unexpected beginnings, he slowly rebuilds a life that feels like his own.</p><p class="excerpt-note">From the official book description.</p></div><div class="chapters"><p class="eyebrow">THREE THREADS TO FOLLOW</p><h3>Love and Loss</h3><p>The pain of losing someone who had become part of everyday life.</p><h3>Friendship and Rediscovery</h3><p>Reconnecting with people, interests, and the life left behind.</p><h3>Finding Yourself Again</h3><p>Learning that moving forward does not require forgetting the past.</p></div>`,
    `<div class="excerpt"><p class="eyebrow">COMPANION NOTES · PAUSE & REFLECT</p><h2>A little room<br>for <em>yourself.</em></h2><p>These optional prompts explore the book’s themes. Take a quiet moment, or return to them as you read.</p><ol class="reflection-prompts"><li>What interest would you like to make time for again?</li><li>Who makes an ordinary day feel a little warmer?</li><li>What could one small new beginning look like for you?</li></ol><p class="excerpt-note">Website reflection prompts · not an excerpt from the novel.</p></div><div class="chapters"><p class="eyebrow">KEEP EXPLORING</p><h2>The story<br><em>continues.</em></h2><p>The Road Back to Myself<br>by Hema Vardhan Velaga</p><p>A heartfelt story about love, loss, friendship, and the quiet courage it takes to start over.</p><a class="reading-detail-link" href="#details">Explore the book details →</a><p>Only the approved opening excerpt is included in this preview.</p></div>`];
  const controls = document.createElement('div');
  controls.className = 'reading-controls';
  controls.innerHTML = '<span class="reading-status" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" class="reading-scroll">Scroll to turn the page ↓</button><span class="reading-help">Scroll up to revisit · tap the cue on touch screens</span>';
  book.append(controls);
  const cue = controls.querySelector('.reading-scroll');
  const restart = document.createElement('button');
  restart.type = 'button'; restart.className = 'reading-restart'; restart.textContent = 'Return to the opening'; restart.hidden = true;
  controls.append(restart);
  const status = controls.querySelector('.reading-status');
  let index = 0, busy = false;
  function update() {
    status.textContent = `Spread ${index + 1} of ${pages.length} · Pages ${index * 2 + 1}–${index * 2 + 2}`;
    cue.textContent = index === pages.length - 1 ? 'Scroll to explore more ↓' : 'Scroll to turn the page ↓';
    restart.hidden = index === 0;
  }
  async function turn(direction) {
    if (busy || index + direction < 0 || index + direction >= pages.length) return;
    busy = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const oldPage = spread.children[direction > 0 ? 1 : 0].cloneNode(true);
    const oldHeight = spread.getBoundingClientRect().height;
    index += direction; spread.innerHTML = pages[index];
    if (!reduced && spread.animate) {
      const sheet = document.createElement('div');
      sheet.className = `turning-sheet ${direction > 0 ? 'forward' : 'backward'}`;
      sheet.setAttribute('aria-hidden', 'true'); sheet.inert = true;
      const front = document.createElement('div'), back = document.createElement('div');
      front.className = 'sheet-face sheet-front'; back.className = 'sheet-face sheet-back';
      front.append(oldPage); back.append(spread.children[direction > 0 ? 0 : 1].cloneNode(true));
      sheet.append(front, back); spread.style.minHeight = `${Math.max(oldHeight,spread.getBoundingClientRect().height)}px`; spread.append(sheet);
      try {
        await sheet.animate([
          {transform:'rotateY(0deg)',filter:'brightness(1)'},
          {transform:`rotateY(${direction * -55}deg) rotateZ(${direction * -1.2}deg)`,filter:'brightness(.9)',offset:.35},
          {transform:`rotateY(${direction * -125}deg) rotateZ(${direction * -.6}deg)`,filter:'brightness(.82)',offset:.7},
          {transform:`rotateY(${direction * -180}deg)`,filter:'brightness(1)'}
        ],{duration:1050,easing:'cubic-bezier(.3,.05,.2,1)',fill:'forwards'}).finished;
      } finally { sheet.remove(); spread.style.minHeight = ''; }
    }
    update();
    busy = false;
    if (matchMedia('(max-width:700px)').matches) spread.scrollIntoView({behavior:reduced?'instant':'smooth',block:'start'});
  }
  restart.addEventListener('click', () => { if (!busy) { index=0; spread.innerHTML=pages[0]; update(); spread.scrollIntoView({behavior:'instant',block:'start'}); cue.focus({preventScroll:true}); } });
  let touchStart = null;
  spread.addEventListener('touchstart', event => {const t=event.touches[0]; touchStart={x:t.clientX,y:t.clientY};},{passive:true});
  spread.addEventListener('touchend', event => {
    if (!touchStart) return;
    const t=event.changedTouches[0], dx=t.clientX-touchStart.x, dy=t.clientY-touchStart.y;
    touchStart=null;
    if(Math.abs(dx)>65 && Math.abs(dx)>Math.abs(dy)*1.5) turn(dx<0?1:-1);
  },{passive:true});
  controls.querySelector('.reading-help').textContent='Scroll or swipe to turn · tap the cue on touch screens';
  cue.addEventListener('click', () => {
    if(index < pages.length - 1) turn(1);
    else document.querySelector('#author').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  });
  let wheelTotal = 0, lastWheel = 0;
  book.addEventListener('wheel', event => {
    if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    const rect = spread.getBoundingClientRect();
    // Leave ordinary document scrolling available while reading tall/mobile pages.
    if (rect.height > innerHeight - 100 || rect.top < -100 || rect.top > innerHeight * .4) return;
    const direction = event.deltaY > 0 ? 1 : -1;
    if(index + direction < 0 || index + direction >= pages.length) return;
    event.preventDefault();
    const now = performance.now();
    if(busy || now - lastWheel < 1300) return;
    wheelTotal += event.deltaY;
    if(Math.abs(wheelTotal) > 65) {lastWheel=now; wheelTotal=0;turn(direction);}
  }, {passive:false});
  controls.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); }
  });
  update();
})();
