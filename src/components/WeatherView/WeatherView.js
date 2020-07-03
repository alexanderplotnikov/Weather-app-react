import React from 'react';
import classes from './WeatherView.module.css';
const weatherview = (props) => {
  return (
    <div className={classes.WeatherView}>
      <form>
        <input type="text" placeholder="City:" />
        <button>Search</button>
      </form>
      <p>Weather in ____ today</p>
      <div>
        <p>temp</p>
        <p>info</p>
        <p>wind</p>
      </div>
    </div>
  );
};

export default weatherview;
