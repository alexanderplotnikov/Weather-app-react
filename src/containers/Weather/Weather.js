import React, { Component } from 'react';
import WeatherView from '../../components/WeatherView/WeatherView';
import Sidebar from '../../components/Sidebar/Sidebar';
import classes from './Weather.module.css';
import SelectContext from '../../components/context/SelectContext';
const DEFAULT_CITIES = [5128581, 5368361, 2643743, 1850144, 524901];
class Weather extends Component {
  state = {
    cities: DEFAULT_CITIES,
    units: {
      name: 'imperial',
      speed: 'mph',
      temp: 'F',
    },
    selectedCity: null,
  };
  selectCityHandler = (city) => {
    this.setState({ selectedCity: city });
    console.log(this.state.selectedCity);
  };
  addFavoriteHandler = (cityCode) => {
    const updatedCities = [...this.state.cities];
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
  toggleUnitsHandler = () => {
    let units = { ...this.state.units };
    const imperial = { name: 'imperial', speed: 'mph', temp: 'F' };
    const metric = { name: 'metric', speed: 'm/s', temp: 'C' };
    let newUnit = units.name === 'metric' ? imperial : metric;
    this.setState({ units: newUnit });
  };
  render() {
    return (
      <div className={classes.Weather}>
        <SelectContext.Provider
          value={{
            selectedCity: this.state.selectedCity,
            select: this.selectCityHandler,
          }}
        >
          <Sidebar cities={this.state.cities} units={this.state.units} />
        </SelectContext.Provider>
        <WeatherView
          favorite={this.state.cities}
          addFavorite={this.addFavoriteHandler}
          removeFavorite={this.removeFavoriteHandler}
          units={this.state.units}
          toggleUnits={this.toggleUnitsHandler}
          selectedCity={this.state.selectedCity}
        />
      </div>
    );
  }
}

export default Weather;
