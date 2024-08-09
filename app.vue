<template>
  <div class="weather-app">
    <h1>Ignite Test: Weather App</h1>
    <div class="input-container">
      <input v-model="city" @keyup.enter="getWeather" placeholder="Enter city name">
      <button @click="getWeather">Get Weather</button>
    </div>
    <div v-if="weather" class="weather-info">
      <h2>{{ weather.name }}, {{ weather.sys.country }}</h2>
      <div class="weather-details">
        <p class="temperature">{{ Math.round(weather.main.temp) }}°C</p>
        <p class="feels-like">Feels like: {{ Math.round(weather.main.feels_like) }}°C</p>
        <p class="description">{{ weather.weather[0].description }}</p>
        <p>Humidity: {{ weather.main.humidity }}%</p>
        <p>Wind Speed: {{ weather.wind.speed }} m/s</p>
      </div>
    </div>
    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const config = useRuntimeConfig()
const city = ref('')
const weather = ref(null)
const error = ref('')

async function getWeather() {
  if (!city.value) return
  try {
    const response = await axios.get('https://api.openweathermap.org/data/2.5/weather', {
      params: {
        q: city.value,
        appid: config.public.openWeatherApiKey,
        units: 'metric'
      }
    })
    weather.value = response.data
    error.value = ''
  } catch (e) {
    weather.value = null
    error.value = 'Failed to fetch weather data. Please try again.'
    console.error(e)
  }
}
</script>

<style scoped>
.weather-app {
  font-family: Arial, sans-serif;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  text-align: center;
}

.input-container {
  display: flex;
  margin-bottom: 20px;
  gap: 20px;
}

input {
  flex-grow: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px 0 0 5px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #45a049;
}

.weather-info {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
}

.weather-info h2 {
  color: #333;
  margin-top: 0;
}

.weather-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.temperature {
  font-size: 2em;
  font-weight: bold;
  color: #4CAF50;
  grid-column: 1 / -1;
  margin: 0;
}

.feels-like {
  color: #666;
}

.description {
  text-transform: capitalize;
}

.error {
  color: #d32f2f;
  text-align: center;
}
</style>