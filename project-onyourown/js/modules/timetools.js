/* global dayjs */
// js/modules/timeTools.js
// Time helpers: world clock HTML and leap year list.
// dayjs (with the UTC and Timezone plugins) is loaded globally in the page's <head>.

// ---------- World clock helpers ----------

// Return the current time, with seconds, for a specific IANA timezone
export function getTimeForZone(zone) {
  return dayjs().tz(zone).format("YYYY-MM-DD HH:mm:ss");
}

// Build the HTML layout for all world clock items
export function generateWorldClockHTML(zones) {
  let html = `<div class="clock-container">`;

  // Create a clock box for each timezone
  zones.forEach((zone) => {
    html += `
      <div class="clock-item">
        <h3>${zone}</h3>
        <p>${getTimeForZone(zone)}</p>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

// ---------- Leap year helpers ----------

// Returns a promise that resolves to an array of the leap years
// in the next 100 years (async functions always return a promise)
async function getLeapYears() {
    // Start from the current year
    const year = dayjs().year();

    // Array that will hold the leap years we find
    const leapYears = [ ];

    // Check each of the next 100 years
    for(let i=0; i<100; i++) {
        const workYear = year + i + 1;
        // Leap year rule: divisible by 4 but not by 100, unless also divisible by 400
        if(((workYear % 4 == 0) && (workYear % 100 != 0)) || (workYear % 400 == 0))
            leapYears.push(workYear);
    }

    // Hand the finished list back to the caller
    return leapYears;
}

// Builds the HTML for the leap year list.
// async because it waits (await) for getLeapYears() to finish.
export async function generateLeapYearsHTML() {
  // Wait for the list of leap years
  const leapYears = await getLeapYears();

  // Start the list, then add one item per leap year
  let html = `<ul class="leap-list">`;

  leapYears.forEach((leapYear) => {
    html += `<li class="leap-year">${leapYear}</li>`;
  });

  html += `</ul>`;
  return html;
}