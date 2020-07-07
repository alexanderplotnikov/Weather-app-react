import React from 'react';
import Cities from './Cities/Cities';

const sidebar = (props) => {
  return <Cities cities={props.cities} units={props.units} />;
};

export default sidebar;
