import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleSearch = e => {
    setNewSearch(e.target.value);
  };

  const renderCountries = () => {
    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(newSearch);
    });
    if (filteredCountries.length > 10) {
      return <li>Too many matches, specify another filter</li>;
    } else if (filteredCountries.length === 1) {
      return renderCountry(filteredCountries[0]);
    } else {
      return filteredCountries.map(country => (
        <div key={country.name}>{country.name}</div>
      ));
    }
  };

  const renderCountry = country => {
    const languages = country.languages.map(language => {
      return <li key={language.name}>{language.name}</li>;
    });
    return (
      <div>
        <h2>{country.name}</h2>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h3>Languages</h3>
        <ul>{languages}</ul>
        <img src={country.flag} alt={`Flag of ${country.name}`} />
      </div>
    );
  };

  return (
    <div>
      <div>
        <div>find countries</div>
        <input onChange={handleSearch} value={newSearch} />
      </div>
      {countries.length && renderCountries()}
    </div>
  );
}

export default App;
