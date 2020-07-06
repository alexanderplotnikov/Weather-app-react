import React, { Component } from 'react';
import City from './City/City';
import axios from 'axios';

class Cities extends Component {
  state = {
    promises: null,
  };
  componentDidMount() {
    this.fetchSidebarData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.cities !== prevProps.cities) {
      console.log('[Cities.js] ComponentDidUpdate');
      this.fetchSidebarData();
    }
  }
  fetchSidebarData = () => {
    const cities = [...this.props.cities];
    const promises = cities.map((city) => {
      return axios
        .get(
          `/weather?id=${city}&units=metric&appid=cff94b8a948e9c08f85577e5ff4c22d7`
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
      let TEMP = Object.keys(data)
        .map((cKey) => {
          return [...Array(data[cKey])].map((city, i) => {
            return (
              <City key={cKey + i} city={city.name} temp={city.main.temp} />
            );
          });
        })
        .reduce((arr, el) => {
          return arr.concat(el);
        }, []);
      this.setState({ promises: TEMP });
    });
  };

  render() {
    const cities = this.state.promises;
    console.log(cities);
    return <div>{cities}</div>;
  }
}

// let TEMP = Object.keys(props.cities).map((cKey) => {
//   return [...Array(props.cities[cKey])].map((city, i) => {
//     return <City key={i} city={city.id} />;
//   });
// });

export default Cities;
