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
    return countries.map(country => <div key={country.name.common}>{country.name.common}</div>)
  } else if (countries.length === 1) {
    return (
      <div>
        <h2>{countries[0].name.common}</h2>
        <div>Capital: {countries[0].capital}</div>
        <div>Population: {countries[0].population}</div>
        <h3>Languages</h3>
        <ul>
          {Object.entries(countries[0].languages).map(([k,v]) =>
            <li>{v}</li>)}
        </ul>
        <img src={countries[0].flags.png} alt={"The flag of "+countries[0].name.common} />
      </div>
    )
  } else {
    return <div>No matches</div>
  }
}

export default App;
