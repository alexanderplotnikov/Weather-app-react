import React, { Component } from 'react';
import classes from './WeatherView.module.css';
import WeatherControls from './WeatherControls/WeatherControls';
import axios from 'axios';

class WeatherView extends Component {
  state = {
    city: null,
    temp: null,
    wind: null,
  };
  fetchData = (city) => {
    console.log(city);
    axios
      .get(
        `/weather?q=${city}&units=metric&appid=cff94b8a948e9c08f85577e5ff4c22d7`
      )
      .then((response) => {
        console.log(response);
        this.setState({
          city: city,
          temp: response.data.main.temp,
          wind: response.data.wind['speed'],
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    return (
      <div className={classes.WeatherView}>
        <WeatherControls fetchData={this.fetchData} />
        <p>Weather in {this.state.city} today</p>
        <div>
          <p>{this.state.temp}</p>
          <p>info</p>
          <p>{this.state.wind}</p>
        </div>
      </div>
    );
  }
}

export default WeatherView;
