import React, { useEffect, useState } from "react";

const WeatherDetails = ({ filteredList }) => {
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    if (filteredList && filteredList.length === 1) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${filteredList[0].capital}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      )
        .then(res => res.json())
        .then(data => setWeatherData(data));
    }
  }, [filteredList]);

  const weatherDataList = (
    <div>
      <h2>Weather in {weatherData.name}</h2>
      <h3>{weatherData?.main?.temp} &deg; Celsius</h3>
      <h3>{weatherData?.weather?.[0].description}</h3>

      <img
        src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`}
        alt=""
      />
      <h3>Wind: {weatherData?.wind?.speed} m/s</h3>
    </div>
  );

  return <>{filteredList && filteredList.length === 1 && weatherDataList}</>;
};

export default WeatherDetails;
