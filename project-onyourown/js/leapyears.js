// js/leapyears.js
// Builds the leap year list and adds it to leapyears.html.

// Import the async helper that builds the leap year HTML
import { generateLeapYearsHTML } from "./modules/timetools.js";

// Wait for the HTML to be parsed before touching the DOM
// (the handler is async so it can use await)
document.addEventListener("DOMContentLoaded", async () => {
  const output = document.getElementById("leap-output");

  // Wait for the list HTML, then put it on the page
  output.innerHTML = await generateLeapYearsHTML();
});