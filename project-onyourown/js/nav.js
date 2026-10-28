// js/nav.js
// Shared by every page: makes any button with a data-page attribute
// (nav buttons and card buttons) load that page when clicked.

// Wait until the HTML is fully parsed before touching the DOM
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('button[data-page]');

  buttons.forEach((button) => {
    // Click event: load the page stored in the button's data-page attribute
    button.addEventListener('click', () => {
      window.location.href = button.dataset.page;
    });
  });
});