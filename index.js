function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#windSpeed");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let iconElement = document.querySelector(".weather-icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" alt="Weather Icon" />`;
  cityElement.innerHTML = response.data.city;
  timeElement.innerHTML = dateFormat(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
  temperatureElement.innerHTML = `${Math.round(temperature)}°C`;

  getForecast(response.data.city); // Obtén el pronóstico de la ciudad
}

function dateFormat(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${day} ${hours}:${minutes}`;
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

function formatDay(timestamp) {
  // Asegúrate de que el nombre de la función es 'formatDay'
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apikey = "obcc5d4b0bc4t336609c2f30ba544fa3";
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apikey}&units=metric`;
  axios.get(apiURL).then(displayForecast); // Usa 'axios.get()' para obtener la respuesta
}

function displayForecast(response) {
  let forecast = document.querySelector("#forecast");
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
          <div class="weather-forecast-temperatures">
            <strong>${Math.round(day.temperature.maximum)}°C</strong> /
              <span>${Math.round(day.temperature.minimum)}°C</span>
          </div>
        </div>`;
    }
  });

  forecast.innerHTML = forecastHtml;
}

let searchElement = document.querySelector("#weather-search");
searchElement.addEventListener("submit", searchSubmit);

// Inicializa la búsqueda con una ciudad predeterminada
searchCity("Asunción");
