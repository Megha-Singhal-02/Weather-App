import React,{useState, useEffect} from "react"
import axios from "axios"

import clearWeather from './assets/clear_weather.jpg';
import cloudyWeather from './assets/cloudy_weather.jpg';
import rainyWeather from './assets/rainy_weather.jpg';
import snowyWeather from './assets/snowy_weather.jpg';
import mistyWeather from './assets/misty_weather.jpg';
import foggyWeather from './assets/foggy_weather.jpg';
import hazzyWeather from './assets/haze_weather.jpg';
import defaultWeather from './assets/default_weather.jpg';

const weatherBackgrounds = {
  Clear: clearWeather,
  Clouds: cloudyWeather,
  Rain: rainyWeather,
  Snow: snowyWeather,
  Mist: mistyWeather,
  Fog: foggyWeather,
  Haze: hazzyWeather
};

function App() {
  const [data,setData] = useState({})
  const [location,setLocation] = useState('')
  const [backgroundImage, setBackgroundImage] = useState(defaultWeather);
  const [error,setError]=useState('');

  const url=`https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=5ef26675276153f757a5a6f9792f69cc`;
  
  const searchLocation = (event) =>{
    if(event.key === 'Enter'){
      axios.get(url).then((response)=>{
        setData(response.data)
        setError('')
        console.log(response.data)
      }).catch((err) => {
        setError('');
      })
      setLocation('')
    }
  }

  useEffect(() => {
    if (data.weather && data.weather[0]) {
      const weatherDescription = data.weather[0].main;
      const newBackgroundImage = weatherBackgrounds[weatherDescription] || defaultWeather;
      setBackgroundImage(newBackgroundImage);
    }
  }, [data]);
  
  return (
    <div className="app" style={{backgroundImage: `url(${backgroundImage})`}}>
      <div className="search">
        <input 
        value={location}
        onChange={event => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Enter Location"
        type="text"/>
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{data.weather[0].main}</p> : null}
          </div>
        </div>

        {data.name !=undefined && 
          <div className="bottom">
            <div className="feels">
              {data.main ? <p className="bold">{data.main.feels_like.toFixed()}°C</p> : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed.toFixed()} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        }
      </div>
    </div>
  );
}

export default App;
