import React from 'react';
import City from './City/City';
const cities = (props) => {
  const cities = [
    { city: 'moscow', temp: '23' },
    { city: 'los gatos', temp: '34' },
  ];

  let TEMP = Object.keys(cities).map((cKey) => {
    return [...Array(cities[cKey])].map((city, i) => {
      console.log(i);
      return <City key={cKey} city={city.city} temp={city.temp} />;
    });
  });
  return <div>{TEMP}</div>;
};

export default cities;
