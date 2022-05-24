import "./App.css";
import React, { useState, useEffect } from "react";

const api = {
  key: "c37e5c1c422f4da27a45bc21e7f95777",
  base: "https://api.openweathermap.org/data/2.5/",
};

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const fetchWeather = (queryParams = query) => {
    fetch(`${api.base}weather?q=${queryParams}&units=metric&APPID=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
        setQuery("");
      });
  };

  const onSearch = (evt) => {
    if (evt.key === "Enter") {
      fetchWeather();
    }
  };

  const today = String(new window.Date()).slice(0, 15);

  useEffect(() => {
    fetchWeather("Hanoi, VN");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={
        typeof weather.main != "undefined"
          ? weather.main.temp > 16
            ? "app warm"
            : "app"
          : "app"
      }
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
            value={query}
            onKeyPress={onSearch}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{today}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].main}</div>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

export default App;
