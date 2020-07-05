import React, { Component } from 'react';
import WeatherView from '../../components/WeatherView/WeatherView';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Weather.module.css';
class Weather extends Component {
  state = {
    cities: [],
  };
  addFavoriteHandler = (cityCode) => {
    const updatedCities = [...this.state.cities];
    // const newCity = { id: cityCode };
    updatedCities.push(cityCode);
    let uniqCities = [...new Set(updatedCities)];
    this.setState({ cities: uniqCities });
  };
  render() {
    return (
      <div className={classes.Weather}>
        <Sidebar cities={this.state.cities} />
        <WeatherView addFavorite={this.addFavoriteHandler} />
      </div>
    );
  }
}

export default Weather;
