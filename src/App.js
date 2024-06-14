import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

function App() {
  const [lat, setLat] = useState(null); //initialized as null
  const [long, setLong] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      console.log("Latitude is:", lat);
      console.log("Longitude is:", long);
    };

    fetchData();
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat && long) {
        await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            setData(result);
            console.log(result);
          })
          .catch(error => {
            console.error('Error fetching the weather data:', error);
          });
      } else {
        console.log("lat and long dont exist");
      }
    };

    fetchWeatherData();
  }, [lat, long]); // Fetch weather data whenever lat or long change

  return (
    <div className="App">
      {data ? (
        <Weather weatherData={data}/> //adds data as a prop to weather
      ) : (
        <div>
          <p>Loading...</p>
        </div>
      )}
    </div>
  );
}

export default App;
