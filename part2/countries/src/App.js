import React, { useEffect, useState } from "react";
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

function App() {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState({})

  // This should not run on every change because it's crazy that way...
  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${search}`)
      .then(response => {
        setCountries(response.data)
      })
  },[search])
  
  console.log(countries)

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };
  
  return (
    <div className="App">
      <div>find countries <input value={search} onChange={handleSearchChange} /></div>
      <Results countries={countries} />
    </div>
  );
}

const Results = ({countries}) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>
  } else if (countries.length > 1) {
    return countries.map(country => <Country country={country} display={false} />)
  } else if (countries.length === 1) {
    return (
      <Country country={countries[0]} display={true} />
    )
  } else {
    return <div>No matches</div>
  }
}

const Country = ({country, display}) => {
  const [displayToggle, setDisplayToggle] = useState(display)
  const [weather, setWeather] = useState({"coord":{"lon":-0.1257,"lat":51.5085},"weather":[{"id":804,"main":"Clouds","description":"overcast clouds","icon":"04n"}],"base":"stations","main":{"temp":47.03,"feels_like":44.28,"temp_min":44.46,"temp_max":49.24,"pressure":1025,"humidity":93},"visibility":5000,"wind":{"speed":5.75,"deg":160},"clouds":{"all":100},"dt":1641853083,"sys":{"type":2,"id":2019646,"country":"GB","sunrise":1641801781,"sunset":1641831148},"timezone":0,"id":2643743,"name":"London","cod":200})

  const toggleDisplay = (display) => {
    setDisplayToggle(!displayToggle)
    console.log("Toggled");
  }

  useEffect(() => {
    console.log(`Getting weather for ${country.capital}`)
    axios
    .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.ccn3}&units=imperial&APPID=${api_key}`)
    .then(response => {
      setWeather(response.data)
    })
  },[])

  if (!displayToggle) {
    return (
      <div key={country.name.common}>
        {country.name.common}
        {' '}
        <button onClick={toggleDisplay}>Show Details</button>
      </div>
    )
  } else {

    return (
      <div key={country.name.common}>
        <h2>{country.name.common}</h2>
        <div>Capital: {country.capital}</div>
        <div>Population: {country.population}</div>
        <h3>Languages</h3>
        <ul>
          {Object.entries(country.languages).map(([k,v]) =>
            <li key={k}>{v}</li>)}
        </ul>
        <img src={country.flags.png} alt={"The flag of "+country.name.common} />
        <h3>Weather in {country.capital}</h3>
        <div><strong>temperature: </strong>{weather.main.temp}° Fahrenheit</div>
        <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
        <div><strong>wind: </strong>{weather.wind.speed} mph direction {weather.wind.deg}°</div>

        <div><button onClick={toggleDisplay}>Hide Details</button></div>
      </div>
    )
  }
}

export default App;
