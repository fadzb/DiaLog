import { AppRegistry, ActivityIndicator } from 'react-native';
import React from 'react';
import App from './src/App';
import { name as appName } from './app.json';
import { Provider } from 'react-redux';
import store from './src/store';
import { PersistGate } from 'redux-persist/integration/react';
import SplashScreen from './src/screens/SplashScreen.tsx';

// TODO: loading component not working

const RNRedux = () => (
  <Provider store={store.getStore()}>
    <PersistGate persistor={store.getPersistor()} loading={<SplashScreen />}>
      <App />
    </PersistGate>
  </Provider>
);

AppRegistry.registerComponent(appName, () => RNRedux);
