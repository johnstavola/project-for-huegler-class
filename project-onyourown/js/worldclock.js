// js/worldclock.js
// Builds the world clock and refreshes it every second.

// Import the helper function that builds the clock HTML
import { generateWorldClockHTML } from "./modules/timeTools.js";

// Activate the Day.js plugins (the old inline <script> block in worldclock.html)
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// List of time zones to display on the page
const zones = [
  "America/New_York",
  "Europe/London",
  "Asia/Tokyo",
  "Australia/Sydney"
];

// Wait for the HTML to be parsed before touching the DOM
document.addEventListener("DOMContentLoaded", () => {
  const output = document.getElementById("clock-output");

  // Rebuild the clock HTML with the current date and time
  function updateClocks() {
    output.innerHTML = generateWorldClockHTML(zones);
  }

  updateClocks();                   // show the clocks right away
  setInterval(updateClocks, 1000);  // timer: refresh every 1000 ms (1 second)
});