import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  useTheme,
} from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import LocationDisabledIcon from '@mui/icons-material/LocationDisabled'
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline'

interface LocationPromptProps {
  status: 'prompt' | 'loading' | 'denied' | 'error'
  error: string | null
  onRequest: () => void
}

export function LocationPrompt({ status, error, onRequest }: LocationPromptProps) {
  const theme = useTheme()
  const isDenied = status === 'denied'
  const isError = status === 'error'
  const isLoading = status === 'loading'

  return (
    <Card
      sx={{
        maxWidth: 480,
        mx: 'auto',
        mt: { xs: 4, sm: 6 },
        background: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
      }}
    >
      <CardContent sx={{ p: { xs: 3, sm: 4 }, textAlign: 'center' }}>
        <Box
          sx={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            bgcolor: isDenied || isError ? 'error.dark' : 'primary.main',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: 2,
            opacity: 0.9,
          }}
        >
          {isLoading ? (
            <CircularProgress size={36} sx={{ color: 'white' }} />
          ) : isDenied || isError ? (
            <LocationDisabledIcon sx={{ fontSize: 40, color: 'white' }} />
          ) : (
            <LocationOnIcon sx={{ fontSize: 40, color: 'white' }} />
          )}
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom color="text.primary">
          {isLoading
            ? 'Getting your location…'
            : isDenied
              ? 'Location access denied'
              : isError
                ? 'Something went wrong'
                : 'Allow location access'}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2, maxWidth: 360, mx: 'auto' }}>
          {isLoading
            ? 'We need your location to show local weather.'
            : error || 'We need your location to show the weather.'}
        </Typography>
        {!isLoading && (
          <Button
            variant="contained"
            size="large"
            onClick={onRequest}
            startIcon={isDenied || isError ? <ErrorOutlineIcon /> : <LocationOnIcon />}
            sx={{
              px: 3,
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              boxShadow: theme.shadows[4],
            }}
          >
            {isDenied || isError ? 'Try again' : 'Allow location'}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
