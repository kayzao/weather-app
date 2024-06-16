import './App.css';
import React, { useEffect, useState } from "react";
import Weather from './components/weather';

function App() {
  const [lat, setLat] = useState([]); //initialized as null
  const [long, setLong] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition(function(position) {
        setLat(position.coords.latitude);
        setLong(position.coords.longitude);
      });

      // console.log("Latitude is:", lat);
      // console.log("Longitude is:", long);
    };

    fetchData();
  }, [lat, long]); // Empty dependency array ensures this runs only once

  useEffect(() => {
    const fetchWeatherData = async () => {
      if (lat && long) {
        await fetch(`${process.env.REACT_APP_API_URL}/weather?lat=${lat}&lon=${long}&units=imperial&appid=${process.env.REACT_APP_API_KEY}`)
          .then(res => res.json())
          .then(result => {
            if (result.cod === "400") console.log("grabbing API data...");
            else {
              setData(result);
              console.log(result);
            }
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
      <h1 class="my-5">Weather Station Report:</h1>
      <div class="inline-flex">
      {data.length !== 0 ? (
        <Weather weatherData={data}/> //adds data as a prop to weather, and renders the weather component
      ) : (
        <div class="loader m-5"></div>
      )}
      </div>
    </div>
  );
}

export default App;
