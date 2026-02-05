import type { OpenWeatherResponse, WeatherDisplay } from '@/types/weather'

const BASE = 'https://api.openweathermap.org/data/2.5/weather'
const API_KEY = 'd3263f5157ef6e0cb85671cc3df5c96e'

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherDisplay> {
  if (!API_KEY) throw new Error('Missing VITE_OPENWEATHER_API_KEY in .env')
  const url = `${BASE}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
  const res = await fetch(url)
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.message || `Weather API error: ${res.status}`)
  }
  const data: OpenWeatherResponse = await res.json()
  return mapToDisplay(data)
}

function mapToDisplay(d: OpenWeatherResponse): WeatherDisplay {
  const w = d.weather[0]
  return {
    location: d.name,
    country: d.sys.country,
    temp: Math.round(d.main.temp * 10) / 10,
    feelsLike: Math.round(d.main.feels_like * 10) / 10,
    tempMin: Math.round(d.main.temp_min * 10) / 10,
    tempMax: Math.round(d.main.temp_max * 10) / 10,
    description: w ? w.description : '',
    icon: w ? w.icon : '01d',
    humidity: d.main.humidity,
    pressure: d.main.pressure,
    windSpeed: d.wind.speed,
    windDeg: d.wind.deg,
    visibility: d.visibility,
    clouds: d.clouds.all,
    sunrise: new Date(d.sys.sunrise * 1000),
    sunset: new Date(d.sys.sunset * 1000),
    timezone: d.timezone,
    coord: { lat: d.coord.lat, lon: d.coord.lon },
  }
}
