async function getWeather() {
    const cityInput = document.getElementById('cityInput');
    const city = cityInput.value.trim();
    if (!city) {
        document.getElementById('weatherData').innerHTML = '<p>Please enter a city name.</p>';
        document.body.className = '';
        document.querySelectorAll('.sun-bg, .sun-rays-realistic, .sun-bird, .cloud-bg, .floating-cloud, .rain-bg, .rain-streak, .rain-puddle, .snow-bg, .snowflake, .thunder-flash, .thunder-bolt-anim').forEach(e => e.remove());
        if (window.vantaEffect) { window.vantaEffect.destroy(); window.vantaEffect = null; }
        return;
    }
    const apiKey = '06a0519cd508a4272e403dda3f39f8dc'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod === 200 || data.cod === "200") {
            const weatherMain = data.weather[0].main.toLowerCase();
            let animation = '';
            let bodyClass = '';
            if (weatherMain.includes('clear')) {
                animation = '<div class="sun"></div>';
                bodyClass = 'sunny';
            } else if (weatherMain.includes('rain')) {
                animation = `<div class="rain">
                    <div class="rain-drop"></div>
                    <div class="rain-drop"></div>
                    <div class="rain-drop"></div>
                </div>`;
                bodyClass = 'rainy';
            } else if (weatherMain.includes('cloud')) {
                animation = '<div class="cloud"></div>';
                bodyClass = 'cloudy';
            } else if (weatherMain.includes('snow')) {
                animation = `<div class="snow">
                    <div class="snow-flake"></div>
                    <div class="snow-flake"></div>
                    <div class="snow-flake"></div>
                </div>`;
                bodyClass = 'snowy';
            } else if (weatherMain.includes('thunder')) {
                animation = `<div class="thunder">
                    <div class="thunder-bolt"></div>
                </div>`;
                bodyClass = 'thunder';
            } else {
                animation = '<div class="cloud"></div>';
                bodyClass = 'cloudy';
            }
            document.body.className = bodyClass;

            // Remove previous Vanta effect if any
            if (window.vantaEffect) {
                window.vantaEffect.destroy();
                window.vantaEffect = null;
            }

            // Remove previous animated elements
            document.querySelectorAll('.sun-bg, .sun-rays-realistic, .sun-bird, .cloud-bg, .floating-cloud, .rain-bg, .rain-streak, .rain-puddle, .snow-bg, .snowflake, .thunder-flash, .thunder-bolt-anim').forEach(e => e.remove());

            const weatherVideo = document.getElementById('weatherVideo');
            weatherVideo.style.display = 'none';

            if (bodyClass === 'cloudy') {
                 weatherVideo.src = "c:/Users/MSIDDARD/Downloads/vecteezy_thunder-storm-and-clouds_22713448.mp4";
                 weatherVideo.style.display = 'block';
                window.vantaEffect = VANTA.CLOUDS({
                  el: "body",
                  skyColor: 0xb0c4de,
                  cloudColor: 0xffffff,
                  cloudShadowColor: 0x888888,
                  sunColor: 0xffe259,
                  sunlightColor: 0xfffbe4,
                  speed: 1.2
                });
                const cloud = document.createElement('div');
                cloud.className = 'cloud-bg';
                cloud.innerHTML = `
                    <div class="cloud-shape one"></div>
                    <div class="cloud-shape two"></div>
                    <div class="cloud-shape three"></div>
                `;
                document.body.appendChild(cloud);
                for (let i = 1; i <= 3; i++) {
                    const floating = document.createElement('div');
                    floating.className = 'floating-cloud cloud' + i;
                    document.body.appendChild(floating);
                }
            } else if (bodyClass === 'snowy') {
                window.vantaEffect = VANTA.SNOW({
                  el: "body",
                  color: 0xffffff,
                  snowColor: 0xffffff,
                  backgroundColor: 0xe0eafc,
                  speed: 1.2
                });
                const snow = document.createElement('div');
                snow.className = 'snow-bg';
                snow.innerHTML = `
                    <div class="snow-flake-bg"></div>
                    <div class="snow-flake-bg"></div>
                    <div class="snow-flake-bg"></div>
                    <div class="snow-flake-bg"></div>
                    <div class="snow-flake-bg"></div>
                    <div class="snow-flake-bg"></div>
                `;
                document.body.appendChild(snow);
                for (let i = 1; i <= 5; i++) {
                    const flake = document.createElement('div');
                    flake.className = 'snowflake flake' + i;
                    document.body.appendChild(flake);
                }
            } else if (bodyClass === 'sunny') {
                weatherVideo.src = "vecteezy_clouds-in-the-blue-sky-with-sunny-background-blue-sky-with_36115911.mp4";
                weatherVideo.style.display = 'block';
    // Optionally add sun rays/bird overlays here
                const sun = document.createElement('div');
                sun.className = 'sun-bg';
                document.body.appendChild(sun);
                const rays = document.createElement('div');
                rays.className = 'sun-rays-realistic';
                rays.innerHTML = '<span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span><span></span>';
                document.body.appendChild(rays);
                const bird = document.createElement('div');
                bird.className = 'sun-bird';
                document.body.appendChild(bird);
            } else if (bodyClass === 'rainy') {
                 weatherVideo.src = "vecteezy_thunder-storm-and-clouds_22713448.mp4";
                 weatherVideo.style.display = 'block';
                const rain = document.createElement('div');
                rain.className = 'rain-bg';
                rain.innerHTML = `
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                    <div class="rain-drop-bg"></div>
                `;
                document.body.appendChild(rain);
                for (let i = 1; i <= 5; i++) {
                    const streak = document.createElement('div');
                    streak.className = 'rain-streak streak' + i;
                    document.body.appendChild(streak);
                }
                const puddle = document.createElement('div');
                puddle.className = 'rain-puddle';
                document.body.appendChild(puddle);
            } else if (bodyClass === 'thunder') {
                const flash = document.createElement('div');
                flash.className = 'thunder-flash';
                document.body.appendChild(flash);
                const bolt = document.createElement('div');
                bolt.className = 'thunder-bolt-anim';
                bolt.innerHTML = `<div class="thunder-bolt-anim-shape"></div>`;
                document.body.appendChild(bolt);
            }

            const weatherData = `
                ${animation}
                <h2>${data.name}</h2>
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity} %</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            document.getElementById('weatherData').innerHTML = weatherData;
        } else {
            document.getElementById('weatherData').innerHTML = `<p>City not found: ${city}</p>`;
            document.body.className = '';
            document.querySelectorAll('.sun-bg, .sun-rays-realistic, .sun-bird, .cloud-bg, .floating-cloud, .rain-bg, .rain-streak, .rain-puddle, .snow-bg, .snowflake, .thunder-flash, .thunder-bolt-anim').forEach(e => e.remove());
            if (window.vantaEffect) { window.vantaEffect.destroy(); window.vantaEffect = null; }
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherData').innerHTML = '<p>Error fetching weather data</p>';
        document.body.className = '';
        document.querySelectorAll('.sun-bg, .sun-rays-realistic, .sun-bird, .cloud-bg, .floating-cloud, .rain-bg, .rain-streak, .rain-puddle, .snow-bg, .snowflake, .thunder-flash, .thunder-bolt-anim').forEach(e => e.remove());
        if (window.vantaEffect) { window.vantaEffect.destroy(); window.vantaEffect = null; }
    }
}