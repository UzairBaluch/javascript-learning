// ============================================
// DIGITAL CLOCK
// ============================================

// DOM ELEMENTS - Get time and date display elements
let timeCLock = document.getElementById("time");
let dateClock = document.getElementById("date");

// UPDATE CLOCK - Display current time and date
function updateTime() {
  let now = new Date();

  // Get current time components
  let getHours = now.getHours();
  let getMinutes = now.getMinutes();
  let getSeconds = now.getSeconds();
  let dateNow = now.toLocaleDateString();

  // Format time as HH:MM:SS with leading zeros
  let formattedTime =
    getHours.toString().padStart(2, "0") +
    ":" +
    getMinutes.toString().padStart(2, "0") +
    ":" +
    getSeconds.toString().padStart(2, "0");

  // Update display
  timeCLock.textContent = formattedTime;
  dateClock.textContent = dateNow;
}

// Initial call to show time immediately
updateTime();

// Update clock every second
setInterval(updateTime, 1000);
