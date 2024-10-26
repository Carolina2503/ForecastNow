function updateWeather(response) {
  let temperatureElement = document.querySelector("temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
}

function searchCity(city) {
  let apikey = "obcc5d4b0bc4t336609c2f30ba544fa3";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiURL).then(updateWeather);
}

function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

let searchElement = document.querySelector("#weather-search");

searchElement.addEventListener("submit", searchSubmit);

searchCity("Asunción");
