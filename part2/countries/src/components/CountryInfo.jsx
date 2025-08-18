import countriesService from '../services/countries'
import { useState, useEffect } from 'react'

import Weather from './Weather'

const CountryInfo = ({ country }) => {
    const [countryData, setCountryData] = useState(null)

    useEffect(() => {
        countriesService
            .getCountry(country.name.common)
            .then(country => {
                setCountryData(country)
            })
    }, [country])

    if (countryData) {
        return (
            <>
                <h1>{countryData.name.common}</h1>
                <p>Capital {countryData.capital}</p>
                <p>Area {countryData.area}</p>
                <h2>Languages</h2>
                <ul>
                    {Object.values(countryData.languages).map(language => <li key={language}>{language}</li>)}
                </ul>
                <img src={countryData.flags.png} alt={`Flag of ${countryData.name.common}`} />
                <Weather country={country} />
            </>
        )
    }
    return <div>Loading...</div>
}

export default CountryInfo