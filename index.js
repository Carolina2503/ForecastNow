function updateWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  let timeElement = document.querySelector("#time"); // Ensure this element exists in your HTML
  let weatherDescription = response.data.condition.description;
  let humidity = response.data.temperature.humidity;
  let windSpeed = response.data.wind.speed;
  let date = new Date(response.data.time * 1000); // Verify that 'response.data.time' is correct

  // Format the date and time
  let options = { weekday: "long", hour: "2-digit", minute: "2-digit" };
  let formattedDateTime = date.toLocaleString("en-US", options);

  // Update the time display
  if (timeElement) {
    timeElement.innerHTML = formattedDateTime; // Display the formatted date and time
  }

  // Determine the emoji based on the weather description
  let emoji = "🌤️"; // Default: partly sunny
  if (weatherDescription.includes("clear")) {
    emoji = "☀️"; // Clear
  } else if (weatherDescription.includes("cloud")) {
    emoji = "☁️"; // Cloudy
  } else if (
    weatherDescription.includes("rain") ||
    weatherDescription.includes("shower")
  ) {
    emoji = "🌧️"; // Rain
  } else if (weatherDescription.includes("snow")) {
    emoji = "❄️"; // Snow
  } else if (weatherDescription.includes("storm")) {
    emoji = "⛈️"; // Storm
  } else if (
    weatherDescription.includes("mist") ||
    weatherDescription.includes("fog")
  ) {
    emoji = "🌫️"; // Mist
  }

  // Update the DOM with the new weather information
  if (temperatureElement) {
    temperatureElement.innerHTML = `${emoji} ${Math.round(temperature)}℃`; // Update temperature with the emoji
  }

  cityElement.innerHTML = response.data.city; // Display the current city

  // Update weather information in general
  let weatherInfoElement = document.querySelector(".weather-info p");
  weatherInfoElement.innerHTML = `${formattedDateTime}, ${weatherDescription}<br />
                                  Humidity: ${humidity}%, Wind: ${Math.round(
    windSpeed
  )} km/h`; // Update humidity, wind speed, and date
}

function searchCity(city) {
  let apiKey = "obcc5d4b0bc4t336609c2f30ba544fa3"; // Replace with your actual API key
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios
    .get(apiURL)
    .then(updateWeather)
    .catch(function (error) {
      alert("City not found or invalid data. Please check the city name."); // More informative error message
      console.error("Error fetching the weather data:", error);
    });
}

function searchSubmit(event) {
  event.preventDefault(); // Prevent default form submission behavior

  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value); // Fetch weather data for the entered city
}

let searchElement = document.querySelector("#weather-search");
searchElement.addEventListener("submit", searchSubmit); // Attach event listener for form submission
