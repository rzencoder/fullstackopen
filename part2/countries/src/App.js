import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [showCountry, setShowCountry] = useState({});

  useEffect(() => {
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleSearch = e => {
    setNewSearch(e.target.value);
    setShowCountry({});
  };

  const getWeather = async country => {
    let res = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${process.env.REACT_APP_KEY}`
    );
    return res.data;
  };

  const handleShowCountry = country => {
    getWeather(country).then(data => {
      setShowCountry({ ...country, weather: data });
    });
  };

  const renderCountries = () => {
    const filteredCountries = countries.filter(country => {
      return country.name.toLowerCase().includes(newSearch);
    });
    if (filteredCountries.length > 10) {
      return <li>Too many matches, specify another filter</li>;
    } else {
      return filteredCountries.map(country => (
        <div key={country.name}>
          <div>{country.name}</div>
          <button onClick={() => handleShowCountry(country)}>show</button>
        </div>
      ));
    }
  };

  const renderCountry = () => {
    const languages = showCountry.languages.map(language => {
      return <li key={language.name}>{language.name}</li>;
    });
    const temp = Math.round(showCountry.weather.main.temp - 273);
    const weather = showCountry.weather.weather[0].main;
    const wind = showCountry.weather.wind.speed;
    return (
      <div>
        <h2>{showCountry.name}</h2>
        <p>capital: {showCountry.capital}</p>
        <p>population: {showCountry.population}</p>
        <h3>Languages</h3>
        <ul>{languages}</ul>
        <img src={showCountry.flag} alt={`Flag of ${showCountry.name}`} />
        <h3>Weather in {showCountry.capital}</h3>
        <div>temperature: {temp} C</div>
        <div>weather: {weather}</div>
        <div>wind speed: {wind}</div>
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
      {showCountry.name && renderCountry()}
    </div>
  );
}

export default App;
