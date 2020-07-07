import React, { Component } from 'react';
import classes from './WeatherView.module.css';
import WeatherControls from './WeatherControls/WeatherControls';
import axios from 'axios';
import Aux from '../../hoc/Aux/Aux';
import favIcon from '../../assets/svg/star.svg';
import favIconSolid from '../../assets/svg/star-solid.svg';

import iconClasses from '../../assets/css/weather-icons.module.css';
import iconWindClasses from '../../assets/css/weather-icons-wind.module.css';

class WeatherView extends Component {
  state = {
    city: null,
    temp: null,
    windSpeed: null,
    windDeg: null,
    time: null,
    humidity: null,
    units: { temp: 'C', speed: 'm/s' },
    cityID: null,
    saved: null,
  };
  isFavorite = (id) => {
    return this.props.favorite.includes(id);
  };
  componentDidUpdate = (prevProps) => {
    if (this.props.units !== prevProps.units) {
      this.fetchData(this.state.city);
      this.setState({ units: this.props.units });
    } else if (this.props.selectedCity !== prevProps.selectedCity) {
      this.fetchData(this.props.selectedCity);
    }
  };
  fetchData = (city) => {
    axios
      .get(
        `/weather?q=${city}&units=${this.props.units.name}&appid=cff94b8a948e9c08f85577e5ff4c22d7`
      )
      .then((response) => {
        console.log(response);
        const iconImg = response.data.weather[0].icon;
        const daytime = iconImg.includes('d') ? 'day' : 'night';
        const iconId = response.data.weather[0].id;
        const windDirection = response.data.wind.deg;
        const humidity = response.data.main.humidity;
        const cityCode = response.data.id;
        const cityName = response.data.name;
        const inFavorite = this.isFavorite(cityCode);
        console.log(inFavorite);
        this.setState({
          city: cityName,
          temp: response.data.main.temp.toFixed(1),
          windSpeed: response.data.wind['speed'],
          iconId: iconId,
          time: '-' + daytime,
          windDeg: windDirection,
          humidity: humidity,
          cityID: cityCode,
          saved: inFavorite,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  saveHandler = () => {
    if (this.state.saved) {
      this.props.removeFavorite(this.state.cityID);
    } else {
      this.props.addFavorite(this.state.cityID);
    }
    const isSaved = this.state.saved;
    this.setState({ saved: !isSaved });
  };
  render() {
    return (
      <div className={classes.WeatherView}>
        <WeatherControls
          fetchData={this.fetchData}
          selectedCity={this.props.selectedCity}
        />
        {this.state.city ? (
          <Aux>
            <h2>
              <span>Weather in {this.state.city} today</span>
            </h2>
            <div>
              <button onClick={this.saveHandler}>
                {!this.state.saved ? (
                  <img className={classes.Fav} src={favIcon} alt="Save" />
                ) : (
                  <img
                    className={classes.FavSolid}
                    src={favIconSolid}
                    alt="Save"
                  />
                )}
              </button>
              <div className={classes.Units}>
                {this.state.units.temp === 'C' ? (
                  <p>
                    <span onClick={this.props.toggleUnits}>&deg;F</span>/
                    <span className={classes.Active}>&deg;C</span>
                  </p>
                ) : (
                  <p>
                    <span className={classes.Active}>&deg;F</span>/
                    <span onClick={this.props.toggleUnits}>&deg;C</span>
                  </p>
                )}
              </div>
            </div>

            <div>
              <i
                className={[
                  classes.Info,
                  iconClasses.wi,
                  iconClasses[`wi-owm${this.state.time}-${this.state.iconId}`],
                ].join(' ')}
              ></i>
            </div>
            <div>
              <div>
                <span className={classes.Thermometer}>
                  <i
                    className={[
                      iconClasses.wi,
                      iconClasses['wi-thermometer'],
                    ].join(' ')}
                  ></i>
                </span>
                <p className={classes.Temp}>
                  {this.state.temp}&deg;{this.state.units.temp}
                </p>
              </div>
              <div>
                <i
                  className={[
                    classes.Humidity,
                    iconClasses.wi,
                    iconClasses['wi-raindrop'],
                  ].join(' ')}
                ></i>
                <p className={classes.Humidity}>{this.state.humidity}%</p>
              </div>
              <div>
                <i
                  className={[
                    classes.Wind,
                    iconWindClasses.wi,
                    iconWindClasses['wi-wind'],
                    iconWindClasses[`from-${this.state.windDeg}-deg`],
                  ].join(' ')}
                ></i>
                <p>
                  {this.state.windSpeed}
                  {this.state.units.speed}
                </p>
              </div>
            </div>
          </Aux>
        ) : null}
      </div>
    );
  }
}

export default WeatherView;
