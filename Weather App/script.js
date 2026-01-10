// ============================================
// WEATHER APP
// ============================================

// DOM ELEMENTS - Get search button, input, error display, and weather info
const searchBtn = document.getElementById("searchBtn");
const errorMsg = document.getElementById("errorMsg");
const weatherDisplay = document.getElementById("weatherDisplay");
const cityName = document.getElementById("cityName");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");
const description = document.getElementById("description");
const cityInput = document.getElementById("cityInput");

// GET WEATHER - Fetch weather data from OpenWeatherMap API
async function getWeather(cityName) {
  try {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"db7b45d69aee78f23cf6b82e04b8e64e"}&units=metric`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    displayWeather(data);
  } catch (error) {
    errorMsg.textContent = "City not found";
    weatherDisplay.classList.remove("active");
  }
}

// DISPLAY WEATHER - Show weather data on screen
function displayWeather(data) {
  errorMsg.textContent = "";

  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed}m/s`;
  description.textContent = data.weather[0].description;
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

  weatherDisplay.classList.add("active");
}

// SEARCH BUTTON - Get weather for entered city
searchBtn.addEventListener("click", () => {
  let cityNameValue = cityInput.value;

  if (cityNameValue.trim() !== "") {
    getWeather(cityNameValue);
  }
});
