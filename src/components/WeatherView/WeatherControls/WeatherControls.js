import React from 'react';
import classes from './WeatherControls.module.css';
import searchIcon from '../../../assets/svg/loupe.svg';

const weatherControls = (props) => {
  const submitHandler = (e) => {
    const city = document.querySelector('input');
    props.fetchData(city.value);
    e.preventDefault();
  };
  return (
    <form className={classes.WeatherControls} onSubmit={submitHandler}>
      <input type="text" placeholder="City:" />
      <button tabIndex="-1">
        <img src={searchIcon} alt="search" />
      </button>
    </form>
  );
};

export default weatherControls;
