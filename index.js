function searchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchInput.value;
}

let searchElement = document.querySelector("#weather-search");

searchElement.addEventListener("submit", searchSubmit);
