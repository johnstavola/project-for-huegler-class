// js/events.js
// Keyboard and mouse event examples for events.html.

// Wait for the HTML to be parsed before touching the DOM
document.addEventListener('DOMContentLoaded', () => {
  const MAX_LOG_ENTRIES = 12;   // keep the log short

  // Elements we read from or write to
  const mouseArea = document.getElementById('mouse-area');
  const keyInput = document.getElementById('key-input');
  const eventLog = document.getElementById('event-log');
  const clearButton = document.getElementById('clear-log');

  // Adds a line to the top of the log and trims old entries
  function logEvent(type, detail, cssClass) {
    const item = document.createElement('li');
    item.className = cssClass;
    item.textContent = type + ' - ' + detail;
    eventLog.prepend(item);

    while (eventLog.children.length > MAX_LOG_ENTRIES) {
      eventLog.lastElementChild.remove();
    }
  }

  const buttonNames = ['Left', 'Middle', 'Right'];   // MouseEvent.button values 0, 1, 2

  // ---------- Mouse events ----------

  // Mouse enters the box
  mouseArea.addEventListener('mouseenter', () => {
    mouseArea.classList.add('is-inside');
    logEvent('mouseenter', 'pointer entered the box', 'mouse-event');
  });

  // Mouse leaves the box
  mouseArea.addEventListener('mouseleave', () => {
    mouseArea.classList.remove('is-inside', 'is-down');
    document.getElementById('mouse-position').textContent = '-';
    logEvent('mouseleave', 'pointer left the box', 'mouse-event');
  });

  // Mouse moves: show coordinates relative to the box (not logged, too frequent)
  mouseArea.addEventListener('mousemove', (event) => {
    const box = mouseArea.getBoundingClientRect();
    const x = Math.round(event.clientX - box.left);
    const y = Math.round(event.clientY - box.top);
    document.getElementById('mouse-position').textContent = 'x: ' + x + ', y: ' + y;
  });

  // A mouse button is pressed down
  mouseArea.addEventListener('mousedown', (event) => {
    mouseArea.classList.add('is-down');
    document.getElementById('mouse-button').textContent = buttonNames[event.button] || 'Other';
    logEvent('mousedown', (buttonNames[event.button] || 'Other') + ' button', 'mouse-event');
  });

  // A mouse button is released
  mouseArea.addEventListener('mouseup', (event) => {
    mouseArea.classList.remove('is-down');
    logEvent('mouseup', (buttonNames[event.button] || 'Other') + ' button', 'mouse-event');
  });

  // Full click (down + up on the same element)
  mouseArea.addEventListener('click', () => {
    logEvent('click', 'left click', 'mouse-event');
  });

  // Two quick clicks
  mouseArea.addEventListener('dblclick', () => {
    logEvent('dblclick', 'double click', 'mouse-event');
  });

  // Right click: block the browser menu so the demo is visible
  mouseArea.addEventListener('contextmenu', (event) => {
    event.preventDefault();
    logEvent('contextmenu', 'right click', 'mouse-event');
  });

  // Mouse wheel scrolls over the box
  mouseArea.addEventListener('wheel', (event) => {
    const direction = event.deltaY < 0 ? 'up' : 'down';
    document.getElementById('mouse-wheel').textContent = direction;
    logEvent('wheel', 'scrolled ' + direction, 'mouse-event');
  }, { passive: true });

  // ---------- Keyboard events ----------

  // Describes which modifier keys are held, e.g. "Shift + Ctrl"
  function getModifiers(event) {
    const held = [];
    if (event.shiftKey) held.push('Shift');
    if (event.ctrlKey) held.push('Ctrl');
    if (event.altKey) held.push('Alt');
    if (event.metaKey) held.push('Meta');
    return held.length ? held.join(' + ') : 'none';
  }

  // A key is pressed down
  keyInput.addEventListener('keydown', (event) => {
    const shownKey = event.key === ' ' ? 'Space' : event.key;
    document.getElementById('key-display').textContent = shownKey;
    document.getElementById('key-value').textContent = shownKey;
    document.getElementById('key-code').textContent = event.code;
    document.getElementById('key-modifiers').textContent = getModifiers(event);
    logEvent('keydown', shownKey + ' (' + event.code + ')', 'key-event');
  });

  // A key is released
  keyInput.addEventListener('keyup', (event) => {
    const shownKey = event.key === ' ' ? 'Space' : event.key;
    logEvent('keyup', shownKey + ' (' + event.code + ')', 'key-event');
  });

  // ---------- Log controls ----------

  // Clear button empties the log
  clearButton.addEventListener('click', () => {
    eventLog.innerHTML = '';
  });
});