import CountryInfo from './CountryInfo'
import { useState } from 'react'

const Country = ({ country }) => {
    const [showCountry, setShowCountry] = useState(false)

    if (showCountry) {
        return (
            <>
                <CountryInfo country={country} />
                <br/><button onClick={() => setShowCountry(false)}>Hide</button>
            </>
        )
    }

    return (
        <div>
            {country.name.common}
            <button onClick={() => setShowCountry(true)}>Show</button>
        </div>
    )
}

const Countries = ({ countries }) => {
    if (countries.length > 10) {
        return <div>Too many matches, specify another filter</div>
    } else if (countries.length === 1) {
        return <CountryInfo country={countries[0]} />
    } else {
        return (
            <div>{countries.map(country => <Country key={country.name.common} country={country} />)}</div>
        )
    }
}

export default Countries