# Weather App

A modern React weather app that uses your browser location, fetches weather from OpenWeatherMap, and stores location + weather data in Firebase Firestore.

## Features

- **Location access** – Prompts for browser location on open
- **Live weather** – Current conditions, temp, feels like, humidity, wind, pressure, visibility, clouds, sunrise/sunset
- **Firestore** – Saves latitude, longitude, quadrant (NE/NW/SE/SW), accuracy, altitude, and weather summary
- **Responsive UI** – MUI-based layout for mobile and desktop

## Setup

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Environment and Firebase**

   - **OpenWeatherMap** – Copy `.env.example` to `.env` and set `VITE_OPENWEATHER_API_KEY` (get a free key at [openweathermap.org/api](https://openweathermap.org/api)).
   - **Firebase (browser)** – Copy `firebase-config.example.json` to `firebase-config.json` and fill in your **web app** config from Firebase Console → Project settings → General → “Your apps” → Web app (apiKey, appId, messagingSenderId). Use this file instead of `.env` for Firebase.  
   - **Note:** `firebase-key.json` (service account) is for **server-side only** (e.g. Admin SDK, Cloud Functions). Do not use it in this frontend app; the browser uses `firebase-config.json` (public web config) only.

3. **Firestore**

   In Firebase Console → Firestore Database → create a database (test or production). The app writes to a collection named `weather_logs`. No extra security rules are required for a basic test; tighten rules for production.

## Run

```bash
npm run dev
```

Open the URL shown (e.g. `http://localhost:5173`). Allow location when prompted; the app will fetch weather and save a document to Firestore.

## Build

```bash
npm run build
npm run preview
```

## Stored data (Firestore `weather_logs`)

Each document includes:

- `latitude`, `longitude`, `quadrant` (NE/NW/SE/SW)
- `accuracy`, `altitude` (if available)
- `timestamp` (server timestamp)
- `weather`: `location`, `country`, `temp`, `feelsLike`, `description`, `humidity`, `pressure`, `windSpeed`, `visibility`, `icon`
