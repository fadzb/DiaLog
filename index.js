import { AppRegistry } from 'react-native';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';

const RNRedux = () => (
  <Provider store={store.getStore()}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
