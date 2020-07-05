import React from 'react';
import City from './City/City';
import axios from 'axios';
const cities = (props) => {
  // let TEMP = Object.keys(props.cities).map((cKey) => {
  //   return [...Array(props.cities[cKey])].map((city, i) => {
  //     return <City key={i} city={city.id} />;
  //   });
  // });

  async function getCities() {
    const cities = [...props.cities];
  }
  const contents = getCities();
  console.log(contents);
  return <div>{}</div>;
};

export default cities;
