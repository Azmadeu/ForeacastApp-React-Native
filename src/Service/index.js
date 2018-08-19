import axios from 'axios'

const GOOGLEMAPS_SEARCH_CITY_API = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
const WEATHER_API = 'http://fcc-weather-api.glitch.me/api/current?';

export const getCityWeather = (city) => {
  return axios.get(GOOGLEMAPS_SEARCH_CITY_API + city)
          .then(response => {
            return { lat, lng } = response.data.results[0].geometry.location;
          })
          .then(coords => axios.get(WEATHER_API + 'lon=' + coords.lng + '&lat=' + coords.lat))
          .then(response => {
            const responseData = response.data;
            const icon = responseData.weather[0].icon;
            const description = responseData.weather[0].description;
            const wind = responseData.wind.speed;
            const temp = responseData.main.temp;
            return { icon, description, wind, city, temp }
          })
};