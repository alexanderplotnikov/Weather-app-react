import React, { Component } from 'react';
import WeatherView from '../../components/WeatherView/WeatherView';
import Sidebar from '../../components/Sidebar/Sidebar';

class Weather extends Component {
  render() {
    return (
      <div>
        <Sidebar />
        <WeatherView />
      </div>
    );
  }
}

export default Weather;
