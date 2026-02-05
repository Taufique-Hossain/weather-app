import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import type { WeatherDisplay } from '@/types/weather'
import ThermostatIcon from '@mui/icons-material/Thermostat'
import WaterDropIcon from '@mui/icons-material/WaterDrop'
import AirIcon from '@mui/icons-material/Air'
import CompressIcon from '@mui/icons-material/Compress'
import VisibilityIcon from '@mui/icons-material/Visibility'
import CloudIcon from '@mui/icons-material/Cloud'
import WbSunnyIcon from '@mui/icons-material/WbSunny'
import NightlightRoundIcon from '@mui/icons-material/NightlightRound'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const ICON_BASE = 'https://openweathermap.org/img/wn'

const WIND_DIRECTIONS = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']

function windDegToDirection(deg: number): string {
  const i = Math.round(deg / 22.5) % 16
  return WIND_DIRECTIONS[i]
}

interface WeatherDashboardProps {
  weather: WeatherDisplay
  savedToDb?: boolean
}

function formatTime(d: Date) {
  return d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
}

export function WeatherDashboard({ weather, savedToDb }: WeatherDashboardProps) {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const statCards = [
    {
      label: 'Feels like',
      value: `${weather.feelsLike}°C`,
      icon: <ThermostatIcon />,
    },
    {
      label: 'Humidity',
      value: `${weather.humidity}%`,
      icon: <WaterDropIcon />,
    },
    {
      label: 'Wind',
      value: `${weather.windSpeed} m/s ${windDegToDirection(weather.windDeg)}`,
      icon: <AirIcon />,
    },
    {
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      icon: <CompressIcon />,
    },
    {
      label: 'Visibility',
      value: `${(weather.visibility / 1000).toFixed(1)} km`,
      icon: <VisibilityIcon />,
    },
    {
      label: 'Clouds',
      value: `${weather.clouds}%`,
      icon: <CloudIcon />,
    },
  ]

  return (
    <Box sx={{ maxWidth: 720, mx: 'auto' }}>
      {/* Hero card */}
      <Card
        sx={{
          mb: 2,
          background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.25) 0%, rgba(6, 182, 212, 0.15) 100%)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          backdropFilter: 'blur(12px)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
        }}
      >
        <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1 }}>
            <Box>
              <Typography variant="h4" fontWeight={700} color="text.primary">
                {weather.location}, {weather.country}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                {weather.coord.lat.toFixed(4)}°, {weather.coord.lon.toFixed(4)}°
              </Typography>
            </Box>
            {savedToDb && (
              <Chip
                icon={<CheckCircleIcon />}
                label="Saved"
                size="small"
                color="success"
                sx={{ fontWeight: 600 }}
              />
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: { xs: 1, sm: 2 },
              mt: 2,
              flexWrap: 'wrap',
            }}
          >
            <Box
              component="img"
              src={`${ICON_BASE}/${weather.icon}@2x.png`}
              alt={weather.description}
              sx={{ width: 80, height: 80 }}
            />
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Typography variant="h3" fontWeight={700} color="text.primary">
                {weather.temp}°C
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                {weather.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                H: {weather.tempMax}° L: {weather.tempMin}°
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2, flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <WbSunnyIcon sx={{ color: 'warning.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Sunrise {formatTime(weather.sunrise)}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <NightlightRoundIcon sx={{ color: 'info.main', fontSize: 20 }} />
              <Typography variant="body2" color="text.secondary">
                Sunset {formatTime(weather.sunset)}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Stats grid */}
      <Grid container spacing={2}>
        {statCards.map(({ label, value, icon }) => (
          <Grid item xs={6} sm={4} key={label}>
            <Card
              sx={{
                height: '100%',
                background: 'rgba(15, 23, 42, 0.85)',
                border: '1px solid rgba(71, 85, 105, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Box sx={{ color: 'primary.light' }}>{icon}</Box>
                  <Typography variant="caption" color="text.secondary" fontWeight={600}>
                    {label}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight={700} color="text.primary">
                  {value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  )
}
