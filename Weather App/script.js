// Grab DOM elements
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
//a async function Fetches weather data from OpenWeatherMap API g
async function getWeather(cityName) {
  // a try catch for error handling
  try {
    // getting the data with city name and with api with celsius fahrenheit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${"db7b45d69aee78f23cf6b82e04b8e64e"}&units=metric`;
    // Wait for response because fetching takes time network request
    const response = await fetch(apiUrl);
    // Convert response to JSON format to access weather data
    const data = await response.json();
    // call the func
    displayWeather(data);
    // error part is there is error
  } catch (error) {
    errorMsg.textContent = "City is not found";
    // remove weather display active class
    weatherDisplay.classList.remove("active");
  }
}
// display the weather data on ui
function displayWeather(data) {
  // set the error elem to empty
  errorMsg.textContent = "";
  // update the ui with api rresponse
  cityName.textContent = data.name;
  temperature.textContent = `${data.main.temp}°C`;
  humidity.textContent = `${data.main.humidity}%`;
  windSpeed.textContent = `${data.wind.speed}m/s`;
  // API returns array of weather conditions, we take the first one
  description.textContent = data.weather[0].description;
  // gives the icon according to the data weather
  weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  // Show the weather display by adding active class
  weatherDisplay.classList.add("active");
}

// lsiting for clicks
searchBtn.addEventListener("click", () => {
  // geting input value
  let cityNameValue = cityInput.value;
  // validation if its empty or not
  if (cityNameValue.trim() !== "") {
    // call the func
    getWeather(cityNameValue);
  }
});
