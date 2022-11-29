import React from "react";
import WeatherDetails from "./WeatherDetails";

const CountryDetails = ({ countryData, query, onClick }) => {
  const filteredList = countryData.filter(country => {
    return country.name.toLowerCase().includes(query.toLowerCase());
  });

  const mainDetails = filteredList.map(country => {
    return (
      <div key={country.capital}>
        <h1>{country.name}</h1>
        <h3>Capital: {country.capital}</h3>
        <h3>Area: {country.area}</h3>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map(language => (
            <li key={Math.random() * 10000}>{language}</li>
          ))}
        </ul>
        <img src={country.flags?.svg} alt="Country flag" width="250" />
        <WeatherDetails filteredList={filteredList} />
      </div>
    );
  });

  const simpleList = filteredList.map(country => {
    return (
      <div key={country.name}>
        <h4>{country.name}</h4>
        <button onClick={() => onClick(country.name)}>show</button>
      </div>
    );
  });

  console.log(filteredList);

  return (
    <>
      {filteredList.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteredList.length <= 10 && simpleList}
      {filteredList.length === 1 && mainDetails}
    </>
  );
};

export default CountryDetails;
