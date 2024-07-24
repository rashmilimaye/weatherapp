// Select HTML elements and store them in separate variables
const locationInput = document.getElementById('locationInput');
const weatherOutput = document.getElementById('weatherOutput');

// Define constants for app data, unit, and the API key
const APP_NAME = "WeatherApp";
const DEFAULT_UNIT = "metric"; // You can replace "metric" with "imperial" or any other unit
const API_KEY = "4e4826c5bac93f75772960db2acd49ba"; // Replace with your actual API key

// Check if the browser supports geolocation
if (navigator.geolocation) {
    // Set the user’s position
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
} else {
    showError("Geolocation is not supported by this browser.");
}

// Success callback for geolocation
function successCallback(position) {
    const userLatitude = position.coords.latitude;
    const userLongitude = position.coords.longitude;

    // Fetch weather conditions from the API depending on the user’s current location
    fetchWeatherByCoordinates(userLatitude, userLongitude);
}

// Error callback for geolocation
function errorCallback(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            showError("User denied the request for geolocation.");
            break;
        case error.POSITION_UNAVAILABLE:
            showError("Location information is unavailable.");
            break;
        case error.TIMEOUT:
            showError("The request to get user location timed out.");
            break;
        case error.UNKNOWN_ERROR:
            showError("An unknown error occurred.");
            break;
    }
}

// Fetch weather conditions in the searched location
function fetchWeatherByLocation(location) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${DEFAULT_UNIT}&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => showError("Error fetching weather data."));
}

// Fetch weather conditions from the API depending on the user’s current location
function fetchWeatherByCoordinates(latitude, longitude) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=${DEFAULT_UNIT}&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => showError("Error fetching weather data."));
}

// Display weather to UI
function displayWeather(weatherData) {
    const temperature = weatherData.main.temp;
    const description = weatherData.weather[0].description;

    weatherOutput.innerHTML = `<p>Temperature: ${temperature}°C</p>
                               <p>Description: ${description}</p>`;
}

// Show error when there is an issue with the geolocation service
function showError(message) {
    weatherOutput.innerHTML = `<p style="color: red;">${message}</p>`;
}

// Function to get weather based on user input
function getWeather() {
    const location = locationInput.value;
    if (location) {
        fetchWeatherByLocation(location);
    } else {
        showError("Please enter a location.");
    }
}