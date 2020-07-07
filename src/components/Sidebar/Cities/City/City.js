import React, { useContext } from 'react';
import classes from './City.module.css';
import SelectContext from '../../../context/SelectContext';

const City = (props) => {
  const selectContext = useContext(SelectContext);
  return (
    <div className={classes.City}>
      <p onClick={(e) => selectContext.select(e.target.innerText)}>
        {props.city}
      </p>
      <p>
        {props.temp.toFixed(1)}
        &deg;{props.unit}
      </p>
    </div>
  );
};

export default City;
