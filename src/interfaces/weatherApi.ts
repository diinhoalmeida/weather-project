export interface CurrentWeatherData {
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
  condition: ConditionProps; // Condition Properties
}

export interface WeatherData {
  current: CurrentWeatherData;
  forecast: ForecastDay;
  location: LocationData;
}

interface ConditionProps {
  code: number;
  icon: string;
  text: string;
}

interface HourProps {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  windchill_c: number;
  windchill_f: number;
  heatindex_c: number;
  heatindex_f: number;
  dewpoint_c: number;
  dewpoint_f: number;
  will_it_rain: number;
  chance_of_rain: number;
  will_it_snow: number;
  chance_of_snow: number;
  vis_km: number;
  vis_miles: number;
  gust_mph: number;
  gust_kph: number;
  uv: number;
}

interface LocationData {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

export interface ForecastDay {
  forecastday: ForecastDayPropsArrayProps[];
}
export interface ForecastDayPropsArrayProps {
  hour: HourProps;
  date: string;
  day: ForecastDayProps;
  date_epoch: number;
  astro: AstroProps;
}

interface AstroProps {
  sunrise: string;
  sunset: string;
  moonrise: string;
  moonset: string;
  moon_phase: string;
  moon_illumination: string;
  is_moon_up: number;
  is_sun_up: number;
}

export interface ForecastDayProps {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  avgtemp_c: number;
  avgtemp_f: number;
  maxwind_mph: number;
  maxwind_kph: number;
  totalprecip_mm: number;
  totalprecip_in: number;
  totalsnow_cm: number;
  avgvis_km: number;
  avgvis_miles: number;
  avghumidity: number;
  daily_will_it_rain: number;
  daily_chance_of_rain: number;
  daily_will_it_snow: number;
  daily_chance_of_snow: number;
  condition: {
    text: string;
    icon: string;
    code: number;
  };
  uv: number;
}
