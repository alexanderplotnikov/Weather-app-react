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
    units: 'C',
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
        this.setState({
          city: city,
          temp: response.data.main.temp.toFixed(1),
          windSpeed: response.data.wind['speed'],
          iconId: iconId,
          time: '-' + daytime,
          windDeg: windDirection,
          humidity: humidity,
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
          <i
            className={[
              iconClasses.wi,
              iconClasses[`wi-owm${this.state.time}-${this.state.iconId}`],
            ].join(' ')}
          ></i>
        </div>
        <div>
          <div>
            <i
              className={[iconClasses.wi, iconClasses['wi-thermometer']].join(
                ' '
              )}
            ></i>
            <p>
              {this.state.temp}&deg;{this.state.units}
            </p>
          </div>
          <div>
            <i
              className={[iconClasses.wi, iconClasses['wi-raindrop']].join(' ')}
            ></i>
            <p>{this.state.humidity}%</p>
          </div>
          <div>
            <i
              className={[
                iconWindClasses.wi,
                iconWindClasses['wi-wind'],
                iconWindClasses[`from-${this.state.windDeg}-deg`],
              ].join(' ')}
            ></i>
            <p>{this.state.windSpeed}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default WeatherView;
