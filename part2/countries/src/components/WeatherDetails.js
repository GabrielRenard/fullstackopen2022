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
    <div className="flex flex-col mt-5">
      <h2 className="font-bold text-2xl xl:text-3xl self-center">
        Current Weather in {weatherData.name}
      </h2>
      <div className="w-75 xl:w-100 self-center">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData?.weather?.[0].icon}@2x.png`}
          alt="weather-icon"
        />
      </div>
      <div className="flex text-xl xl:text-2xl justify-between">
        <div className="text-center">
          <h3 className="font-bold">Temperature</h3>
          <h3>{weatherData?.main?.temp} &deg;C</h3>
        </div>
        <div className="text-center">
          <h3 className="font-bold">Description</h3>
          <h3>{weatherData?.weather?.[0].description}</h3>
          <h3>Wind: {weatherData?.wind?.speed} m/s</h3>
        </div>
      </div>
    </div>
  );

  return <>{filteredList && filteredList.length === 1 && weatherDataList}</>;
};

export default WeatherDetails;
