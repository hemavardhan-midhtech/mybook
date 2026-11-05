// Add only approved titles here. Each entry becomes a book on the author shelf.
const authorBooks = [
  {
    id: 'road-back', title: 'The Road Back to Myself',
    cover: './assets/front-cover.jpg',
    genre: 'Contemporary fiction',
    description: 'A heartfelt story about love, loss, friendship, and the quiet courage it takes to start over.',
    status: 'Paperback and Kindle editions planned',
    story: '#story', preview: '#inside', details: '#details'
  }
];
(() => {
  const shelf = document.querySelector('#book-catalog');
  if (!shelf) return;
  const cards = authorBooks.map(book => {
    const card = document.createElement('article'); card.className = 'catalog-book';
    const art = document.createElement('a'); art.href = book.details; art.className = 'catalog-cover';
    const img = document.createElement('img'); img.src = book.cover; img.alt = `${book.title} — front cover`; img.width = 712; img.height = 1076; img.loading = 'lazy'; art.append(img);
    const copy = document.createElement('div');
    const genre = document.createElement('p'); genre.className = 'eyebrow'; genre.textContent = book.genre;
    const title = document.createElement('h3'); title.textContent = book.title;
    const description = document.createElement('p'); description.textContent = book.description;
    const status = document.createElement('p'); status.className = 'catalog-status'; status.textContent = book.status;
    const links = document.createElement('div'); links.className = 'catalog-links';
    for (const [label,href] of [['Discover the story',book.story],['Read a preview',book.preview],['Book details',book.details]]) {
      if (!href) continue;
      const link = document.createElement('a'); link.href = href; link.textContent = label + ' →'; links.append(link);
    }
    copy.append(genre,title,description,status,links); card.append(art,copy); return card;
  });
  shelf.replaceChildren(...cards);
})();
