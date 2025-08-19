import React, { useEffect, useState } from "react";

const WeatherApi = () => {
  const [city, setCity] = useState("Delhi");       // default city
  const [weather, setWeather] = useState(null);    // store weather data
  const [error, setError] = useState(null);

  const API_KEY = "0d85d384cad6c37b0d83cc70dc80312a"; 

  // Function to fetch weather
  const fetchWeather = async () => {
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeather(null);
      } else {
        setWeather(data);
        setError(null);
      }
    } catch (err) {
      setError("Failed to fetch weather");
    }
  };

  // Fetch once on mount
  useEffect(() => {
    fetchWeather();
  }, []);

  // Handle input + submit
  const handleChange = (e) => setCity(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>🌦 Weather App</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={handleChange}
          placeholder="Enter city"
          required
        />
        <button type="submit">Search</button>
      </form>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: "20px" }}>
          <h2>{weather.name}</h2>
          <h3>{weather.main.temp} °C</h3>
          <p>{weather.weather[0].main}</p>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default WeatherApi;
