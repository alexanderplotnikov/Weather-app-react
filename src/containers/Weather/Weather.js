import React, { Component } from 'react';
import WeatherView from '../../components/WeatherView/WeatherView';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Weather.module.css';
class Weather extends Component {
  state = {
    cities: [],
  };
  render() {
    return (
      <div className={classes.Weather}>
        <Sidebar />
        <WeatherView />
      </div>
    );
  }
}

export default Weather;
