// Defualt index.js

// import {AppRegistry} from 'react-native';
// import App from './src/App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);

import { AppRegistry } from 'react-native';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import configureStore from './src/store';

const store = configureStore();

const RNRedux = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
