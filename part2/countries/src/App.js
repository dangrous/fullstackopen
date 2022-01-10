import React, { useEffect, useState } from "react";
import axios from 'axios'

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

  const toggleDisplay = (display) => {
    setDisplayToggle(!displayToggle)
    console.log("Toggled");
  }

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
            <li>{v}</li>)}
        </ul>
        <img src={country.flags.png} alt={"The flag of "+country.name.common} />
        <div><button onClick={toggleDisplay}>Hide Details</button></div>
      </div>
    )
  }
}

export default App;
