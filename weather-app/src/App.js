import React, { useState, useEffect } from "react";

function App() {
  const [city, setCity] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const currentDate = new Date();
  const months = [
    "January","February","March","April","May","June",
    "July","August","September","October","November","December"
  ];
  const formattedDate = `${months[currentDate.getMonth()]} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const API_KEY = "0d85d384cad6c37b0d83cc70dc80312a";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await response.json();
      if (data.cod !== 200) {
        setError(data.message);
        setWeatherData(null);
      } else {
        setWeatherData(data);
        setError(null);
      }
    } catch (error) {
      setError("Failed to fetch weather data");
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds": return "/thunder.png";
      case "Rain":   return "/rain_with_cloud.png";
      case "Mist":   return "/Tornado.png";
      case "Haze":   return "/sun.png";
      default:       return "/default.png";
    }
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="container_date">{formattedDate}</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {weatherData && (
          <div className="weather_data">
            <h2 className="container_city">{weatherData.name}</h2>
            <img
              className="container_img"
              src={getWeatherIconUrl(weatherData.weather[0].main)}
              width="180px"
              alt="Weather Icon"
            />
            <h2 className="container_degree">{weatherData.main.temp}°C</h2>
            <h2 className="country_per">{weatherData.weather[0].main}</h2>
          </div>
        )}

        <form className="form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input"
            placeholder="Enter city name"
            value={city}
            onChange={handleInputChange}
            required
          />
          <button type="submit">Search</button>
        </form>
      </div>
    </div>
  );
}

export default App;
