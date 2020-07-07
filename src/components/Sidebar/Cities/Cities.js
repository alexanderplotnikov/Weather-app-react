import React, { Component } from 'react';
import City from './City/City';
import axios from 'axios';
import classes from './Cities.module.css';

class Cities extends Component {
  state = {
    promises: null,
  };
  componentDidMount() {
    this.fetchSidebarData();
  }
  componentDidUpdate(prevProps) {
    if (this.props !== prevProps) {
      this.fetchSidebarData();
    }
  }
  fetchSidebarData = () => {
    const cities = [...this.props.cities];
    const promises = cities.map((city) => {
      return axios
        .get(
          `/weather?id=${city}&units=${this.props.units.name}&appid=cff94b8a948e9c08f85577e5ff4c22d7`
        )
        .then((res) => {
          console.log(res);
          return res.data;
        })
        .catch((error) => {
          console.log(error);
        });
    });
    Promise.all(promises).then((data) => {
      let tranformed = Object.keys(data)
        .map((cKey) => {
          return [...Array(data[cKey])].map((city, i) => {
            return (
              <City
                key={cKey + i}
                unit={this.props.units.temp}
                city={city.name}
                temp={city.main.temp}
              />
            );
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
      this.setState({ promises: tranformed });
    });
  };

  render() {
    const cities = this.state.promises;
    return <div className={classes.Cities}>{cities}</div>;
  }
}

export default Cities;
