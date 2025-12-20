// Select time and date display elements
let timeCLock = document.getElementById("time");
let dateClock = document.getElementById("date");

// Function to update clock display with current time and date
function updateTime() {
  // Get current date and time
  let now = new Date();
  let getMinutes = now.getMinutes(); // Get minutes (0-59)
  let getHours = now.getHours(); // Get hours (0-23)
  let getSeconds = now.getSeconds(); // Get seconds (0-59)
  let dateNow = now.toLocaleDateString(); // Get formatted date

  // Format time as HH:MM:SS with leading zeros
  let checker =
    getHours.toString().padStart(2, "0") +
    ":" +
    getMinutes.toString().padStart(2, "0") +
    ":" +
    getSeconds.toString().padStart(2, "0");

  // Update display with formatted time and date
  timeCLock.textContent = checker;
  dateClock.textContent = dateNow;
}

// Call function immediately to show time without delay
updateTime();

// Update clock every second (1000 milliseconds)
setInterval(updateTime, 1000);
