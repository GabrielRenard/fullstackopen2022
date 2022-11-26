import { useState, useEffect } from "react";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => setCountryData(data));
  }, []);

  const filterChangeHandler = e => {
    setQuery(e.target.value);
  };

  const filteredList = countryData
    .filter(country => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    })
    .map(country => (
      <div key={country.id}>
        <h1>{country.name.common}</h1>
        <h3>Capital: {country.capital}</h3>
        <h3>Area: {country.area}</h3>
        <h3>Languages:</h3>
        <ul>
          {Object.values(country.languages || {}).map(language => (
            <li>{language}</li>
          ))}
        </ul>
      </div>
    ));

  return (
    <>
      <div>
        <label htmlFor="country">Enter a country</label>
        <input type="text" id="country" onChange={filterChangeHandler} />
      </div>
      <div>{filteredList}</div>
    </>
  );
};

export default App;
