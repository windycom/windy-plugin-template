# 🌌 Windy Plugin: Astronomy Seeing & Transparency

A professional-grade decision-making engine for astrophotographers and astronomers, integrated directly into Windy.com. 

This plugin analyzes complex atmospheric data to predict **Seeing** (turbulence) and **Transparency** (clarity), helping you decide *if* and *what* to shoot tonight.

![Plugin Screenshot](dist/screenshot.png) <!-- Placeholder -->

## ✨ Key Features

### 🔭 Advanced Forecasting
- **Seeing Prediction:** Uses Jet Stream velocity (>200hPa) and surface wind to estimate atmospheric stability (arcseconds approximation).
- **Transparency Score:** Analyzes cloud layers (High/Mid/Low), humidity, and Precipitable Water Vapor (PWV).
- **Air Quality Integration (CAMS):** Real-time fetches of **PM2.5** and **Dust Mass** to detect smoke, haze, or calima that might ruin deep-sky imaging.

### 🧠 Smart Decision Engine
- **Scoring System:** A weighted 0-100% score customized for:
  - **DSO Mode:** Prioritizes transparency and darkness (Moon phase).
  - **Planetary Mode:** Prioritizes atmospheric stability (Seeing) above all else.
- **Equipment Recommendations:** Suggests optimal focal lengths and warns if a Dew Heater is required.

### 📊 Detailed Diagnostics
- **Cloud Structure:** Breakdown of high, medium, and low clouds.
- **Deep Sky Darkness:** "Astro Twilight" usage and Moon illumination impact.
- **Interactive UI:** Hourly forecast table for the next 48h to find the perfect weather window.

## 🚀 Getting Started

1. **Install:**
   ```bash
   npm install
   ```
2. **Run:**
   ```bash
   npm start
   ```
3. **Open Windy:**
   Go to [https://www.windy.com/developer-mode](https://www.windy.com/developer-mode) and load from `https://localhost:9999/plugin.js`.

## 🧮 How it Works

The plugin retrieves Point Forecast data (European ECMWF & CAMS models) for the clicked location:

1. **Jet Stream Analysis (250hPa):** High winds in the upper tropopause are the #1 killer of good seeing.
2. **Moisture Check:** High humidity (>85%) or high PWV (>20mm) scatters light, reducing contrast.
3. **Pollution Check:** PM2.5 > 5µg/m³ or Dust Mass > 10µg/m³ triggers a transparency penalty.
4. **Calculated Score:** A subtractive algorithm starts at 100% and applies penalties based on the above factors.

## 🛠 Tech Stack

- Svelte 3 (UI)
- Windy.com API (Maps & Data)
- TypeScript

## 👨‍💻 Author

**Edgar Lopez**  
*Clear Skies!*
