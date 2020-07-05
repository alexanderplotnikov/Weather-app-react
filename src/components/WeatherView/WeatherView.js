import React, { Component } from 'react';
import classes from './WeatherView.module.css';
import WeatherControls from './WeatherControls/WeatherControls';
import axios from 'axios';

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
  };
  fetchData = (city) => {
    axios
      .get(
        `/weather?q=${city}&units=metric&appid=cff94b8a948e9c08f85577e5ff4c22d7`
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
        this.setState({
          city: cityName,
          temp: response.data.main.temp.toFixed(1),
          windSpeed: response.data.wind['speed'],
          iconId: iconId,
          time: '-' + daytime,
          windDeg: windDirection,
          humidity: humidity,
          cityID: cityCode,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  saveHandler = () => {
    this.props.addFavorite(this.state.cityID);
  };
  render() {
    return (
      <div className={classes.WeatherView}>
        <WeatherControls fetchData={this.fetchData} />

        <h2>
          <span>Weather in {this.state.city} today</span>
          <button onClick={this.saveHandler}>Save to Fav</button>
        </h2>

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
                className={[iconClasses.wi, iconClasses['wi-thermometer']].join(
                  ' '
                )}
              ></i>
            </span>
            <p className={classes.Thermometer}>
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
      </div>
    );
  }
}

export default WeatherView;
