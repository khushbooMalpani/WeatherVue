import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('London');

  const fetchWeather = async (city) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=afa35c62e74feccbba76290f15d0bc87`);
      setWeather(response.data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWeather(city);
  }, [city]);

  const handleSearch = (event) => {
    event.preventDefault();
    const newCity = event.target.elements.city.value;
    setCity(newCity);
  };

  return (
    <div>
      <h1>WeatherVue</h1>
      <form onSubmit={handleSearch}>
        <input type="text" name="city" placeholder="Enter city" />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.name}</h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Condition: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
