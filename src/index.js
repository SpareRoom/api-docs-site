import ReactDOM from 'react-dom';
import React from 'react';

import App from './App.jsx';
import registerServiceWorker from './registerServiceWorker';

import 'semantic-ui-css/semantic.css';
import 'basscss/css/basscss-important.css';
import './index.css';

// eslint-disable-next-line react/jsx-filename-extension
ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
