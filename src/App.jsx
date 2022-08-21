import React, { useState,useEffect } from 'react';


const App = () => {
  //get ip address
  const [ip, setIp] = useState('');
  const [country, setCountry] = useState('');
  const [location, setLocation] = useState({
    lat: 0,
    lng: 0
  });
  const [sun, setSun] = useState({
    sunrise: '',
    sunset: ''
  });
  const [weather, setWeather] = useState({
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
    pressure: 0,
    wind: 0,
    description: ''
  });
  const APICALL = async() => {
    await fetch('https://api.ipify.org?format=json')
    .then(res => res.json())
    .then(async(data) => {
      setIp(data.ip);
      await fetch('https://ipapi.co/' + data.ip + "/json").then(res => res.json()).then(async(data) => {
      setCountry(data.country);
      console.log(data.latitude);
      setLocation({
        lat: data.latitude,
        lng: data.longitude
      });
      //get weather
      await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + data.latitude + '&lon=' + data.longitude + '&appid=b045804ab93431828b3e101e2be26dc1')
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setWeather({
            temp: data.main.temp,
            temp_min: data.main.temp_min,
            temp_max: data.main.temp_max,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            wind: data.wind.speed,
            description: data.weather[0].description
          });
        }).catch(err => {
          console.log(err);
        })
      await fetch('https://api.sunrise-sunset.org/json?lat=' + data.latitude + '&lng=' + data.longitude).then(res => res.json()).then(data => {
        setSun({
          sunrise: data.results.sunrise,
          sunset: data.results.sunset
        });
      }).catch(err => console.log(err));
    }).catch(err => console.log(err));
    }).catch(err => console.log(err));
  }
  useEffect(() => {
    APICALL();
  }
  , []);
  return (
    <div>
      <h1>IP Address: {ip}</h1>
      <h1>Country: {country}</h1>
      {sun.sunrise && sun.sunset && <h1>Sunrise: {sun.sunrise}</h1>}
      {weather.temp && <h1>Temperature: {(weather.temp - 273.15).toFixed(2)}</h1>}
      {weather.description && <h1>Weather: {weather.description}</h1>}
    </div>
  );
}

export default App;