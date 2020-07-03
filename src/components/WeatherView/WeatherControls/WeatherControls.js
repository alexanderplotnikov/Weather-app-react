import React from 'react';

const weatherControls = (props) => {
  const submitHandler = (e) => {
    const city = document.querySelector('input');
    props.fetchData(city.value);
    e.preventDefault();
  };
  return (
    <form onSubmit={submitHandler}>
      <input type="text" placeholder="City:" />
      <button>Search</button>
    </form>
  );
};

export default weatherControls;
