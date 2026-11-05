// Make anchor arrivals usable with the keyboard as well as the pointer.
document.addEventListener('click', event => {
  const link = event.target.closest('a[href^="#"]');
  if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  const target = document.getElementById(link.hash.slice(1));
  if (!target) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll:true});
  if (!reduced) {
    target.classList.remove('arrival');
    requestAnimationFrame(() => target.classList.add('arrival'));
    target.addEventListener('animationend', () => target.classList.remove('arrival'), {once:true});
  }
});
