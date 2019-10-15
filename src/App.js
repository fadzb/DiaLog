/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { LoginScreen } from './screens/LoginScreen';
import { RouterComponent } from './Router'

const App = () => (
  <View style={{ flex: 1 }}>
    <StatusBar barStyle='default' backgroundColor={'blue'} />
    <RouterComponent></RouterComponent>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fda',
    paddingTop: 50,
    alignItems: "center",
    flex: 1,
  }
});

export default App;