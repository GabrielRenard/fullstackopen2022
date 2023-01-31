import { useState, useEffect } from "react";
import CountryDetails from "./components/CountryDetails";
import Input from "./components/Input";
import "./index.css";

const App = () => {
  const [countryData, setCountryData] = useState([]);
  const [query, setQuery] = useState("");

  const filterChangeHandler = e => {
    setQuery(e.target.value);
  };

  const queryChangeHandler = query => {
    setQuery(query);
  };

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all", {mode: 'no-cors'}).then(res => res.json()).then(data =>
        setCountryData(
          data.map(country => ({
            name: country.name.common,
            capital: country.capital,
            area: country.area,
            languages: country.languages,
            flags: country.flags,
          }))
        )
      );
  }, []);

  return (
    <>
      <div className="flex flex-col">
        <Input onChange={filterChangeHandler} />
        <CountryDetails
          countryData={countryData}
          query={query}
          onClick={queryChangeHandler}
          onChange={filterChangeHandler}
        />
      </div>
    </>
  );
};

export default App;
