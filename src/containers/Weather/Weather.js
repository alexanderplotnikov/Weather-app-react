import React, { Component } from 'react';
import WeatherView from '../../components/WeatherView/WeatherView';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Weather.module.css';
class Weather extends Component {
  state = {
    cities: [524901],
  };
  addFavoriteHandler = (cityCode) => {
    const updatedCities = [...this.state.cities];
    // const newCity = { id: cityCode };
    updatedCities.push(cityCode);
    let uniqCities = [...new Set(updatedCities)];
    this.setState({ cities: uniqCities });
  };
  removeFavoriteHandler = (cityCode) => {
    const updatedCities = [...this.state.cities];
    const index = updatedCities.indexOf(cityCode);
    if (index !== -1) updatedCities.splice(index, 1);
    this.setState({ cities: updatedCities });
  };
  render() {
    return (
      <div className={classes.Weather}>
        <Sidebar cities={this.state.cities} />
        <WeatherView
          favorite={this.state.cities}
          addFavorite={this.addFavoriteHandler}
          removeFavorite={this.removeFavoriteHandler}
        />
      </div>
    );
  }
}

export default Weather;
