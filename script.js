const apiKey = "06bd74b46b6fc11aca5a8a973b5150f7";

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const resultDiv = document.getElementById("weatherResult");

  if (!city) {
    resultDiv.innerHTML = `<p class="hint">Please enter a city name.</p>`;
    return;
  }

  resultDiv.innerHTML = `<p class="hint">Loading weather...</p>`;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city},in&units=metric&appid=${apiKey}`,
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 200) {
        const condition = data.weather[0].main;

        let emoji = "☁️";
        if (condition === "Clear") emoji = "☀️";
        if (condition === "Rain") emoji = "🌧️";
        if (condition === "Clouds") emoji = "☁️";
        if (condition === "Snow") emoji = "❄️";
        if (condition === "Thunderstorm") emoji = "⛈️";
        if (condition === "Drizzle") emoji = "🌦️";
        if (condition === "Mist") emoji = "🌫️";

        resultDiv.innerHTML = `
          <h1>${emoji}</h1>
          <h2>${data.name}</h2>
          <p><strong>${data.main.temp} °C</strong></p>
          <p style="text-transform: capitalize;">
            ${data.weather[0].description}
          </p>
          <p>💨 Wind: ${data.wind.speed} m/s</p>
        `;
      } else {
        resultDiv.innerHTML = `<p class="hint">${data.message}</p>`;
      }
    })
    .catch(() => {
      resultDiv.innerHTML = `<p class="hint">Unable to fetch weather data.</p>`;
    });
}
