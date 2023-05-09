import React from 'react'
import { useState } from 'react'
import './SearchData.css'
import SpinnerLoading from './Components/SpinnerLoading'

const key = 'fbf712a5a83d7305c3cda4ca8fe7ef29'
function SearchData() {
  const [isLoading, setIsLoading] = useState(false)
  const [location, setLocation] = useState('')
  const [weatherData, setWeatherData] = useState(null)
  const [error, setError] = useState(null)

  const handleSubmit = (e) => {
    setIsLoading(true)
    e.preventDefault()
    setTimeout(() => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=metric`
      )
        .then((response) => response.json())
        .then((data) => {
          setWeatherData(data)
          console.log(data)
        })
        .catch((err) => setError(error.message))
    }, 1000)
    setIsLoading(false)
  }

  return (
    <div className='searchData'>
      <form className='searchData__weather' onSubmit={handleSubmit}>
        <div className='searchData__input'>
          <label htmlFor='location'>Enter location:</label>
          <input
            type='text'
            id='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <button type='submit'>Get Weather</button>
      </form>
      {isLoading && <SpinnerLoading />}
      {weatherData && (
        <div className='weatherData'>
          <h2>Weather for {weatherData.name}</h2>
          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind Speed : {weatherData.wind.speed} km/hr</p>
          <p>Humidity : {weatherData.main.humidity}%</p>
        </div>
      )}
    </div>
  )
}

export default SearchData
