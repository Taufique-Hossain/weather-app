import { useEffect, useState } from 'react'
import { Box, Container } from '@mui/material'
import { useGeolocation } from '@/hooks/useGeolocation'
import { fetchWeatherByCoords } from '@/services/weatherApi'
import { saveLocationAndWeather } from '@/services/firestoreService'
import { LocationPrompt } from '@/components/LocationPrompt'
import { WeatherDashboard } from '@/components/WeatherDashboard'
import type { WeatherDisplay } from '@/types/weather'

export default function App() {
  const { position, status, error, requestLocation } = useGeolocation()

  const [weather, setWeather] = useState<WeatherDisplay | null>(null)
  const [weatherError, setWeatherError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (status !== 'granted' || !position) return

    // ✅ Capture non-null value for TypeScript safety
    const currentPosition = position
    let cancelled = false

    async function loadWeather() {
      try {
        setWeatherError(null)

        const data = await fetchWeatherByCoords(
          currentPosition.latitude,
          currentPosition.longitude
        )

        if (!cancelled) {
          setWeather(data)
        }

        try {
          await saveLocationAndWeather(currentPosition, data)
          if (!cancelled) {
            setSaved(true)
          }
        } catch {
          // Firestore is optional — do not block UI
        }
      } catch (e) {
        if (!cancelled) {
          setWeatherError(
            e instanceof Error ? e.message : 'Failed to load weather'
          )
        }
      }
    }

    loadWeather()

    return () => {
      cancelled = true
    }
  }, [status, position])

  const showPrompt =
    status === 'prompt' ||
    status === 'loading' ||
    status === 'denied' ||
    status === 'error'

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background:
          'linear-gradient(160deg, #0a1628 0%, #0f172a 40%, #1e293b 100%)',
        py: { xs: 2, sm: 3 },
        px: 1,
      }}
    >
      <Container maxWidth="md" disableGutters>
        {showPrompt && (
          <LocationPrompt
            status={status}
            error={error}
            onRequest={requestLocation}
          />
        )}

        {status === 'granted' && weather && !weatherError && (
          <WeatherDashboard weather={weather} savedToDb={saved} />
        )}

        {status === 'granted' && weatherError && (
          <LocationPrompt
            status="error"
            error={weatherError}
            onRequest={() => window.location.reload()}
          />
        )}
      </Container>
    </Box>
  )
}
