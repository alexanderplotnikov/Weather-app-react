import React from 'react';

const selectContext = React.createContext({
  selectedCity: null,
  select: () => {},
});

export default selectContext;
