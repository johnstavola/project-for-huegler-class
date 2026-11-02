// js/author.js
// Loads HTML snippets into author.html with fetch() when a button is clicked.

// Wait for the HTML to be parsed before touching the DOM
document.addEventListener('DOMContentLoaded', () => {
  // Elements we read from or write to
  const snippetArea = document.getElementById('snippet-area');
  const buttons = document.querySelectorAll('button[data-snippet]');

  // Marks the clicked button as the active one (CSS highlights aria-pressed="true")
  function setActiveButton(activeButton) {
    buttons.forEach((button) => {
      button.setAttribute('aria-pressed', button === activeButton ? 'true' : 'false');
    });
  }

  // Replaces the snippet area with one message (used for loading and error text)
  function showMessage(text, cssClass) {
    snippetArea.innerHTML = '';
    const message = document.createElement('p');
    message.textContent = text;
    if (cssClass) message.className = cssClass;
    snippetArea.appendChild(message);
  }

  // Fetches the snippet file and puts its HTML into the snippet area
  async function loadSnippet(url) {
    showMessage('Loading...');

    try {
      const response = await fetch(url);

      // fetch() only fails on network errors, so check for 404 and similar ourselves
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      snippetArea.innerHTML = await response.text();
    } catch (error) {
      showMessage('Sorry, that content could not be loaded.', 'snippet-error');
      console.error('Snippet error:', error);
    }
  }

  // Click event: load the file named in the button's data-snippet attribute
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      setActiveButton(button);
      loadSnippet(button.dataset.snippet);
    });
  });
});
