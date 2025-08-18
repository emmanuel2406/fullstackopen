import { useState ,useEffect } from 'react'
import countriesService from './services/countries'

import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])


  useEffect(() => {
    countriesService
      .getAll()
      .then(allCountries => {
        setCountries(allCountries)
        setFilteredCountries(allCountries)
      })
  }, [])

  useEffect(() => {
    const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(search.toLowerCase()))
    setFilteredCountries(filteredCountries)
  }, [search, countries])


  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  return (
    <div>
      find countries <input value={search} onChange={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  )
}

export default App