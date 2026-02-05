export interface GeoPosition {
  latitude: number
  longitude: number
  accuracy?: number
  altitude?: number | null
  altitudeAccuracy?: number | null
  heading?: number | null
  speed?: number | null
}

export type Quadrant = 'NE' | 'NW' | 'SE' | 'SW'

export function getQuadrant(lat: number, lon: number): Quadrant {
  const n = lat >= 0 ? 'N' : 'S'
  const e = lon >= 0 ? 'E' : 'W'
  return (n + e) as Quadrant // NE, NW, SE, SW
}

export interface OpenWeatherResponse {
  coord: { lon: number; lat: number }
  weather: Array<{
    id: number
    main: string
    description: string
    icon: string
  }>
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
    sea_level?: number
    grnd_level?: number
  }
  visibility: number
  wind: { speed: number; deg: number; gust?: number }
  clouds: { all: number }
  dt: number
  sys: {
    type?: number
    id?: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

export interface WeatherDisplay {
  location: string
  country: string
  temp: number
  feelsLike: number
  tempMin: number
  tempMax: number
  description: string
  icon: string
  humidity: number
  pressure: number
  windSpeed: number
  windDeg: number
  visibility: number
  clouds: number
  sunrise: Date
  sunset: Date
  timezone: number
  coord: { lat: number; lon: number }
}
