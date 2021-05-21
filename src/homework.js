function convertMinutes(inputMinutes) {
  if (inputMinutes < 10) {
    inputMinutes = `0${inputMinutes}`;
  }
  return inputMinutes;
}

function getCurrentLocal() {
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let degreeUnit = "metric";
    let currentDegree = document.querySelector("#today-degree").innerHTML;
    if (currentDegree === "°C") {
      degreeUnit = "metric";
    } else {
      degreeUnit = "imperial";
    }

    let apiKey = "cb9c7365e24a5b0ca2daf7074587f771";

    let latLonCall = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${degreeUnit}&appid=${apiKey}`;
    console.log(latLonCall);

    axios.get(latLonCall).then(function (response) {
      console.log(response);
      let displayedCity = document.querySelector("#current-city");
      displayedCity.innerHTML = response.data.name;

      let headerTemp = document.querySelector("#today-temp");
      headerTemp.innerHTML = Math.round(response.data.main.temp);

      let headerCond = document.querySelector("#header-status");
      headerCond.innerHTML = response.data.weather[0].main;
    });
  });
}

function displayCity(event) {
  event.preventDefault();
  let degreeUnit = "metric";

  let currentDegree = document.querySelector("#today-degree").innerHTML;
  if (currentDegree === "°C") {
    degreeUnit = "metric";
  } else {
    degreeUnit = "imperial";
  }

  let apiKey = "cb9c7365e24a5b0ca2daf7074587f771";
  let cityName = document.querySelector("#inserted-city").value;

  let cityCall = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${degreeUnit}&appid=${apiKey}`;
  console.log(cityCall);

  axios.get(cityCall).then(function (response) {
    console.log(response);
    let displayedCity = document.querySelector("#current-city");
    displayedCity.innerHTML = response.data.name;

    let headerTemp = document.querySelector("#today-temp");
    headerTemp.innerHTML = Math.round(response.data.main.temp);

    let headerCond = document.querySelector("#header-status");
    headerCond.innerHTML = response.data.weather[0].main;
  });
}

function convertCelsius(temperature) {
  temperature = ((temperature - 32) * 5) / 9;
  return temperature;
}

function convertFahrenheit(temperature) {
  temperature = (temperature * 9) / 5 + 32;
  return temperature;
}

function changeToFah() {
  let degree = document.querySelector("#today-degree");
  let temperature = document.querySelector("#today-temp");
  if (degree.innerHTML === "°C") {
    degree.innerHTML = "°F";
    temperature.innerHTML = Math.round(
      convertFahrenheit(temperature.innerHTML)
    );
  }
}

function changeToCel() {
  let degree = document.querySelector("#today-degree");
  let temperature = document.querySelector("#today-temp");
  if (degree.innerHTML === "°F") {
    degree.innerHTML = "°C";
    temperature.innerHTML = Math.round(convertCelsius(temperature.innerHTML));
  }
}

let week = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let today = new Date();
let hourSite = document.querySelector("#current-hour");
hourSite.innerHTML = `${
  week[today.getDay()]
}  - ${today.getHours()}:${convertMinutes(today.getMinutes())}`;

let citySearch = document.querySelector("#search-city-form");
citySearch.addEventListener("submit", displayCity);

let celButton = document.querySelector("#to-celsius");
let fahButton = document.querySelector("#to-fahrenheit");
fahButton.addEventListener("click", changeToFah);
celButton.addEventListener("click", changeToCel);

let currentLocal = document.querySelector("#current-place");
currentLocal.addEventListener("click", getCurrentLocal);
