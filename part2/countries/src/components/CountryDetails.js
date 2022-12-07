import React from "react";
import WeatherDetails from "./WeatherDetails";
import Button from "./UI/Button";
import Card from "./UI/Card";

const CountryDetails = ({ countryData, query, onClick }) => {
  const filteredList = countryData.filter(country => {
    return country.name.toLowerCase().includes(query.toLowerCase());
  });

  const mainDetails = filteredList.map(country => {
    return (
      <>
        <div className=" w-full text-lg flex flex-col justify-center items-center xl:text-2xl">
          <Card key={country.capital}>
            <div className="flex w-1/2">
              <img
                src={country.flags?.svg}
                alt="Country flag"
                className="opacity-80 rounded-md"
              />
              <div className="ml-5 flex flex-col">
                <div className="flex space-x-1">
                  <h3 className="font-bold">Capital</h3>
                  <h3>{country.capital}</h3>
                </div>
                <div className="flex space-x-1">
                  <h3 className="font-bold">Area</h3>
                  <h3>{country.area}km²</h3>
                </div>
                <div>
                  <h3 className="font-bold">Languages:</h3>
                  <ol>
                    {Object.values(country.languages || {}).map(language => (
                      <li
                        key={Math.random() * 10000}
                        className="list-decimal ml-5"
                      >
                        {language}
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
            <div className="">
              <WeatherDetails filteredList={filteredList} />
            </div>
          </Card>
        </div>
      </>
    );
  });

  const simpleList = filteredList.map(country => {
    return (
      <div
        key={country.name}
        className="flex self-center mt-5 text-xl glass-card p-2 rounded-full mb-5 w-fit"
      >
        <h4 className="font-bold">{country.name}</h4>
        {filteredList.length > 1 && (
          <Button onClick={() => onClick(country.name)} text="Show"></Button>
        )}
      </div>
    );
  });

  return (
    <>
      {filteredList.length > 10 && (
        <p className="self-center mt-3 font-bold text-white text-xl md:text-2xl md:text-black">
          Too many matches, specify another filter
        </p>
      )}
      {filteredList.length <= 10 && simpleList}
      {filteredList.length === 1 && mainDetails}
    </>
  );
};

export default CountryDetails;
