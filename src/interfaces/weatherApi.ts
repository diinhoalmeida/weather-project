export interface WeatherData {
  last_updated: string; // Local time when the real-time data was updated.
  last_updated_epoch: number; // Local time when the real-time data was updated in Unix time.
  temp_c: number; // Temperature in Celsius.
  temp_f: number; // Temperature in Fahrenheit.
  feelslike_c: number; // Feels like temperature in Celsius.
  feelslike_f: number; // Feels like temperature in Fahrenheit.
  condition_text: string; // Weather condition text.
  condition_icon: string; // Weather icon URL.
  condition_code: number; // Weather condition unique code.
  wind_mph: number; // Wind speed in miles per hour.
  wind_kph: number; // Wind speed in kilometers per hour.
  wind_degree: number; // Wind direction in degrees.
  wind_dir: string; // Wind direction as a 16-point compass, e.g.: "NSW".
  pressure_mb: number; // Pressure in millibars.
  pressure_in: number; // Pressure in inches.
  precip_mm: number; // Precipitation amount in millimeters.
  precip_in: number; // Precipitation amount in inches.
  humidity: number; // Humidity as a percentage.
  cloud: number; // Cloud cover as a percentage.
  is_day: number; // 1 = Yes, 0 = No; Whether to show day condition icon or night icon.
  uv: number; // UV Index.
  gust_mph: number; // Wind gust in miles per hour.
  gust_kph: number; // Wind gust in kilometers per hour.
}
