import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App.jsx';
import { unregister } from './registerServiceWorker';

import 'semantic-ui-css/semantic.css';
import 'basscss/css/basscss-important.css';
import './index.css';

/* eslint-disable react/jsx-filename-extension */
ReactDOM.render((
  <Router><App /></Router>
), document.getElementById('root'));

unregister();
