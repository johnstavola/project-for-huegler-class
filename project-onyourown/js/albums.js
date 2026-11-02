// js/albums.js
// Fetches data/coldplay.json and turns it into HTML for albums.html.

// Wait for the HTML to be parsed before touching the DOM
document.addEventListener('DOMContentLoaded', () => {
  // Elements we read from or write to
  const loadButton = document.getElementById('load-json');
  const output = document.getElementById('json-output');

  // Replaces the output area with one message (used for loading and error text)
  function showMessage(text, cssClass) {
    output.innerHTML = '';
    const message = document.createElement('p');
    message.textContent = text;
    if (cssClass) message.className = cssClass;
    output.appendChild(message);
  }

  // Adds one term/description pair to a <dl> (dt + dd)
  function addFact(list, term, value) {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    dd.textContent = value;
    list.append(dt, dd);
  }

  // Builds the band summary from the top-level properties (not the list)
  function buildSummary(data) {
    const section = document.createElement('section');
    section.className = 'profile-facts';

    const heading = document.createElement('h2');
    heading.textContent = data.band;
    section.appendChild(heading);

    const list = document.createElement('dl');
    addFact(list, 'Formed', data.formed);
    addFact(list, 'Origin', data.origin);
    addFact(list, 'Genre', data.genre);
    addFact(list, 'Members', data.members.join(', '));   // members is a list of strings
    section.appendChild(list);

    return section;
  }

  // Builds the albums table from the list of album objects
  function buildTable(albums) {
    const wrapper = document.createElement('div');
    wrapper.className = 'table-wrap';   // lets wide tables scroll on small screens

    const table = document.createElement('table');
    table.className = 'albums-table';

    const caption = document.createElement('caption');
    caption.textContent = 'Studio albums';
    table.appendChild(caption);

    // Header row: one column per property of an album object
    const headRow = document.createElement('tr');
    ['Title', 'Year', 'Top Single', 'Description'].forEach((label) => {
      const th = document.createElement('th');
      th.scope = 'col';
      th.textContent = label;
      headRow.appendChild(th);
    });
    const thead = document.createElement('thead');
    thead.appendChild(headRow);
    table.appendChild(thead);

    // Body: one row per album object
    const tbody = document.createElement('tbody');
    albums.forEach((album) => {
      const row = document.createElement('tr');
      [album.title, album.year, album.topSingle, album.description].forEach((value) => {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
      });
      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    wrapper.appendChild(table);
    return wrapper;
  }

  // Puts the summary and the table into the output area
  function displayData(data) {
    output.innerHTML = '';
    output.append(buildSummary(data), buildTable(data.albums));
  }

  // Fetches the JSON file, then builds the HTML from it
  async function loadData(url) {
    showMessage('Loading...');

    try {
      const response = await fetch(url);

      // fetch() only fails on network errors, so check for 404 and similar ourselves
      if (!response.ok) {
        throw new Error('HTTP ' + response.status);
      }

      const data = await response.json();   // parses the JSON text into a JS object
      displayData(data);
    } catch (error) {
      showMessage('Sorry, the album data could not be loaded.', 'snippet-error');
      console.error('JSON error:', error);
    }
  }

  // Click event: load the file named in the button's data-json attribute
  loadButton.addEventListener('click', () => {
    loadData(loadButton.dataset.json);
  });
});
