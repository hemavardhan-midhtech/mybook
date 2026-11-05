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
  controls.innerHTML = '<button type="button" class="reading-prev" aria-label="Previous spread">← Previous</button><span class="reading-status" role="status" aria-live="polite" aria-atomic="true"></span><button type="button" class="reading-next" aria-label="Next spread">Next →</button>';
  book.append(controls);
  const prev = controls.querySelector('.reading-prev'), next = controls.querySelector('.reading-next');
  const status = controls.querySelector('.reading-status');
  let index = 0, busy = false;
  function update() {
    status.textContent = `Spread ${index + 1} of ${pages.length} · Pages ${index * 2 + 1}–${index * 2 + 2}`;
    prev.disabled = index === 0; next.disabled = index === pages.length - 1;
  }
  async function turn(direction) {
    if (busy || index + direction < 0 || index + direction >= pages.length) return;
    busy = true;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced && spread.animate) {
      await spread.animate([{transform:'perspective(1800px) rotateY(0)',opacity:1},{transform:`perspective(1800px) rotateY(${direction * -12}deg)`,opacity:0}],{duration:230,easing:'ease-in',fill:'none'}).finished;
    }
    index += direction; spread.innerHTML = pages[index]; update();
    if (!reduced && spread.animate) {
      await spread.animate([{transform:`perspective(1800px) rotateY(${direction * 12}deg)`,opacity:0},{transform:'perspective(1800px) rotateY(0)',opacity:1}],{duration:320,easing:'ease-out'}).finished;
    }
    busy = false;
  }
  prev.addEventListener('click', () => turn(-1)); next.addEventListener('click', () => turn(1));
  controls.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') { event.preventDefault(); turn(event.key === 'ArrowRight' ? 1 : -1); }
  });
  update();
})();
