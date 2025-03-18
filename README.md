# Windy.com Plug-in – Feels Like Temperature

This Windy plug-in creates a new overlay named “Feels Like” that displays wind chill-based temperature values using a Met Office-like formula for cold conditions.

## Installation

1. Clone or download this repository into your local Windy plug-in folder.
2. Open Windy.com in a browser (or your dev environment).
3. Ensure the plug-in is recognised by referencing its index.js file, or by installing as per the official Windy Plugin documentation.

## Usage

- Open the Windy overlay selector.
- Choose “Feels Like” from the list of overlays (or set `store.set('overlay', 'feelslike')` in the console).

## Customising

- If you’d like to handle higher temperatures with humidity, incorporate a humidex or heat index calculation for `airTempC > 10`.
- Modify colour scales or legends in the overlay as you see fit.

## Licence

[MIT License]
