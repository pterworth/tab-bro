const article = document.querySelector('article');

// `document.querySelector` may return null if the selector doesn't match anything.
if (article) {
  const text = article.textContent;
  const wordMatchRegExp = /[^\s]+/g; // Regular expression
  const words = text.matchAll(wordMatchRegExp);
  // matchAll returns an iterator, convert to array to get word count
  const wordCount = [...words].length;
  const readingTime = Math.round(wordCount / 200);
  const badge = document.createElement('p');
  badge.id = 'tabbro-reading-time-badge';

  const badgeStyle = document.createElement('style');
  badgeStyle.innerHTML = `
    #tabbro-reading-time-badge {
      color: white;
      padding: 0.25rem 0.5rem;
      font-size: 0.75rem;
      border-radius: 0.25rem;
      display: block;
      margin-top: 0.5rem;
      ${
        readingTime <= 3
          ? 'background-color: #84cc16;'
          : readingTime >= 5
          ? 'background-color: #facc15;'
          : readingTime >= 10
          ? 'background-color: #dc2626;'
          : 'background-color: #262626;'
      }
    }`;
  document.head.appendChild(badgeStyle);
  badge.textContent = `⏱️ ${readingTime} min read`;

  // Support for API reference docs
  const heading = article.querySelector('h1');
  // Support for article docs with date
  const date = article.querySelector('time')?.parentNode;

  (date ?? heading).insertAdjacentElement('afterend', badge);
}
