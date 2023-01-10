const API_KEY = "11ca89ffdf355371fbb92287e60ef489";

function onGeoSubmit(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((Response) => Response.json())
    .then((data) => {
      const weatherContainer = document.querySelector(
        "#weather span:first-child"
      );
      const cityContainer = document.querySelector("#weather span:last-child");
      const name = data.name;
      const weather = data.weather[0].main;
      weatherContainer.innerText = `It's ${weather} outside.`;
      cityContainer.innerText = `It seems like you're in ${name}.`;
    });
}

function onNoGeo() {
  alert("Weather information is not available");
}

navigator.geolocation.getCurrentPosition(onGeoSubmit, onNoGeo);
