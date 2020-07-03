import React from 'react';
import ReactDOM from 'react-dom';
import './reset.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import axios from 'axios';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';
axios.interceptors.request.use(
  (config) => {
    config.params = config.params || {};
    config.params['token'] = 'cff94b8a948e9c08f85577e5ff4c22d7';
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
