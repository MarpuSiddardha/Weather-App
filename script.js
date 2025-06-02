async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim(); // Trim spaces
    if (!city) {
        document.getElementById('weatherData').innerHTML = '<p>Please enter a city name.</p>';
        return;
    }
    const apiKey = '06a0519cd508a4272e403dda3f39f8dc'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod === 200) {
            const weatherData = `
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherData').innerHTML = weatherData;
        } else {
            document.getElementById('weatherData').innerHTML = `<p>City not found: ${city}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherData').innerHTML = '<p>Error fetching weather data</p>';
    }
}