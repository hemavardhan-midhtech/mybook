document.documentElement.classList.add('js-nav');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  navigation.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  document.documentElement.classList.add('js-motion');
}
// Only add verified, author-approved HTTPS product URLs here when available.
const approvedStores = [];
function createPurchaseLink({ label, url }) {
  const parsed = new URL(url);
  if (parsed.protocol !== 'https:') throw new Error('Purchase URLs must use HTTPS.');
  const link = document.createElement('a');
  link.className = 'button';
  link.href = parsed.href;
  link.textContent = label;
  return link;
}
if (approvedStores.length) {
  document.querySelector('.coming-soon').hidden = true;
  approvedStores.forEach(store => document.querySelector('#purchase-links').append(createPurchaseLink(store)));
}
