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
            <li key={Math.random()}>{language}</li>
          ))}
        </ul>
        <img src={country.flags?.svg} width="250" />
      </div>
    ));

  const simpleList = countryData
    .filter(country => {
      return country.name.common.toLowerCase().includes(query.toLowerCase());
    })
    .map(country => <p>{country.name.common}</p>);

  return (
    <>
      <div>
        <label htmlFor="country">Enter a country</label>
        <input type="text" id="country" onChange={filterChangeHandler} />
      </div>
      <div>
        {filteredList.length > 10 && (
          <p>Too many matches, specify another filter</p>
        )}
        {filteredList.length < 10 && simpleList}
        {filteredList.length === 1 && filteredList}
      </div>
    </>
  );
};

export default App;
