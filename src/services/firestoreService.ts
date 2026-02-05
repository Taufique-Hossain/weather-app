import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { getDb } from '@/config/firebase'
import type { GeoPosition } from '@/types/weather'
import { getQuadrant } from '@/types/weather'
import type { WeatherDisplay } from '@/types/weather'

export interface StoredRecord {
  latitude: number
  longitude: number
  quadrant: string
  accuracy?: number
  altitude?: number | null
  timestamp: unknown
  weather: {
    location: string
    country: string
    temp: number
    feelsLike: number
    description: string
    humidity: number
    pressure: number
    windSpeed: number
    visibility: number
    icon: string
  }
}

export async function saveLocationAndWeather(
  position: GeoPosition,
  weather: WeatherDisplay
): Promise<void> {
  const db = getDb()
  if (!db) return

  const quadrant = getQuadrant(position.latitude, position.longitude)

  const record: Omit<StoredRecord, 'timestamp'> & { timestamp: ReturnType<typeof serverTimestamp> } = {
    latitude: position.latitude,
    longitude: position.longitude,
    quadrant,
    accuracy: position.accuracy,
    altitude: position.altitude ?? null,
    timestamp: serverTimestamp(),
    weather: {
      location: weather.location,
      country: weather.country,
      temp: weather.temp,
      feelsLike: weather.feelsLike,
      description: weather.description,
      humidity: weather.humidity,
      pressure: weather.pressure,
      windSpeed: weather.windSpeed,
      visibility: weather.visibility,
      icon: weather.icon,
    },
  }

  await addDoc(collection(db, 'weather_logs'), record)
}
