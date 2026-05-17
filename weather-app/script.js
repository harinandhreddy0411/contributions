const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weather = document.getElementById("weather");

searchBtn.addEventListener("click", async () => {
  const city = cityInput.value.trim();

  const response = await fetch(`https://wttr.in/${city}?format=j1`);

  const data = await response.json();

  weather.innerHTML = `
    <h2>${city}</h2>
    <p>Temperature: ${data.current_condition[0].temp_C}°C</p>
    <p>Condition: ${data.current_condition[0].weatherDesc[0].value}</p>
    <p>Humidity: ${data.current_condition[0].humidity}%</p>
  `;
});