import React, { Component } from 'react';
import classes from './WeatherControls.module.css';
import searchIcon from '../../../assets/svg/loupe.svg';

class WeatherControls extends Component {
  state = {
    searchVal: '',
  };
  componentDidUpdate(prevProps) {
    if (this.props.selectedCity !== prevProps.selectedCity) {
      this.setState({ searchVal: this.props.selectedCity });
    }
  }
  submitHandler = (e) => {
    const city = document.querySelector('input');
    this.props.fetchData(city.value);
    e.preventDefault();
  };
  changedHandler = (e) => {
    this.setState({ searchVal: e.target.value });
  };
  render() {
    return (
      <form className={classes.WeatherControls} onSubmit={this.submitHandler}>
        <input
          type="text"
          placeholder="City:"
          value={this.state.searchVal}
          onChange={(e) => this.changedHandler(e)}
        />
        <button tabIndex="-1">
          <img src={searchIcon} alt="search" />
        </button>
      </form>
    );
  }
}

export default WeatherControls;
