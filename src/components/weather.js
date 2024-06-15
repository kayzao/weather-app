import React from 'react';
import '../App.css';
import { Card } from 'semantic-ui-react'

const CardExampleCard = ({weatherData}) => (

  <Card>
    <Card.Content>
        <Card.Header className="header">{weatherData.name}</Card.Header>
        <p>Temperature: {weatherData.main.temp}&deg;F</p>
        <p>Humidity: {weatherData.main.humidity}%</p>
        <p>Feels Like: {weatherData.main.feels_like}&deg;F</p>
        <p>{weatherData.weather[0].description}</p>
    </Card.Content>
  </Card>
)

export default CardExampleCard;