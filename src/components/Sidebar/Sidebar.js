import React from 'react';
import Cities from './Cities/Cities';
import classes from './Sidebar.module.css';

const sidebar = (props) => {
  return (
    <div className={classes.Sidebar}>
      <Cities cities={props.cities} />
    </div>
  );
};

export default sidebar;
