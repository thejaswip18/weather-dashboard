import React, { useEffect, useState } from 'react';
import { getLastSearchedCity, saveLastSearchedCity } from '../utils/storage';
import { fetchForecastData, fetchWeatherData } from '../utils/weatherAPI';
import Favorites from './Favorites';
import Search from './Search';
import WeatherDisplay from './WeatherDisplay';
import "../css/WeatherDisplay.css"

const WeatherDashboard = () => {
  const [city, setCity] = useState(getLastSearchedCity() || '');  
  const [weather, setWeather] = useState(null); 
  const [forecast, setForecast] = useState([]);  
  const [favorites, setFavorites] = useState([]);  
  const [unit, setUnit] = useState('metric');  
  const [loading, setLoading] = useState(false);  

  
  useEffect(() => {
    if (city) {
      fetchWeather();  
      saveLastSearchedCity(city);  
    }
  }, [city, unit]);

  
  useEffect(() => {
    loadFavorites();
  }, []);

  
  const fetchWeather = async () => {
    setLoading(true);
    try {
      const weatherData = await fetchWeatherData(city, unit);
      const forecastData = await fetchForecastData(city, unit);
      if (weatherData && forecastData) {
        setWeather(weatherData);  
        setForecast(forecastData.list.slice(0, 5));  
      } else {
        alert('Weather data not found for the selected city.');
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
      alert('Failed to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  
  const loadFavorites = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(localFavorites);
  };

 
  const handleSearch = (cityName) => {
    setCity(cityName);
  };

  
  const handleAddFavorite = () => {
    const localFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!localFavorites.includes(city)) {
      localFavorites.push(city);
      localStorage.setItem('favorites', JSON.stringify(localFavorites));
      setFavorites(localFavorites);
    } else {
      alert('This city is already in your favorites.');
    }
  };

 
  const handleRemoveFavorite = (cityToRemove) => {
    const updatedFavorites = favorites.filter((favorite) => favorite !== cityToRemove);
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    setFavorites(updatedFavorites);
  };

  
  const toggleUnit = () => {
    setUnit((prevUnit) => (prevUnit === 'metric' ? 'imperial' : 'metric'));
  };

  return (
    <div className="weather-dashboard">
      <div className="search">
        <Search onSearch={handleSearch} />
        <button onClick={toggleUnit}>
          {unit === 'metric' ? 'Fahrenheit' : 'Celsius'}
        </button>
      </div>
      <div className="weather">
        <div className="weather-details">
          {loading ? (
            <p>Loading...</p>
          ) : (
            weather && <WeatherDisplay weather={weather} forecast={forecast} unit={unit} />
          )}
        </div>
        <div className="favorite">
          <button onClick={handleAddFavorite}>Add to Favorites</button>
          <Favorites
            favorites={favorites}
            onRemove={handleRemoveFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default WeatherDashboard;
