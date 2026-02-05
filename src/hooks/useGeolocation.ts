import { useState, useCallback } from 'react'
import type { GeoPosition } from '@/types/weather'

type Status = 'idle' | 'prompt' | 'loading' | 'granted' | 'denied' | 'error'

interface UseGeolocationResult {
  position: GeoPosition | null
  status: Status
  error: string | null
  requestLocation: () => void
}

export function useGeolocation(): UseGeolocationResult {
  const [position, setPosition] = useState<GeoPosition | null>(null)
  const [status, setStatus] = useState<Status>('prompt')
  const [error, setError] = useState<string | null>(null)

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setStatus('error')
      setError('Geolocation is not supported by your browser.')
      return
    }

    setStatus('loading')
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
          altitude: pos.coords.altitude,
          altitudeAccuracy: pos.coords.altitudeAccuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed,
        })
        setStatus('granted')
      },
      (err) => {
        setStatus(err.code === 1 ? 'denied' : 'error')
        setError(
          err.code === 1
            ? 'Location access was denied.'
            : err.message || 'Unable to get your location.'
        )
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    )
  }, [])

  return { position, status, error, requestLocation }
}
