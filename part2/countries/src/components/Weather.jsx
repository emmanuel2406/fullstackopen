import weatherService from '../services/weather'
import { useState, useEffect } from 'react'

const Weather = ({ country }) => {
    const [weather, setWeather] = useState(null)

    useEffect(() => {
        weatherService
            .getWeather(country.capital[0])
            .then(weather => {
                console.log(weather)
                setWeather(weather)
            })
            .catch(error => console.error(error))
    }, [country])

    if (!weather) {
        return <div>Loading weather data...</div>
    }

    // round to 2 decimal places
    const temperature = Math.round((weather.main.temp - 273.15) * 100) / 100

    return <div>
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature {temperature} Celsius</p>
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`} alt={weather.weather[0].description} />
        <p>Wind {weather.wind.speed} m/s</p>
    </div>
}

export default Weather