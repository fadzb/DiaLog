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
import { RouterComponent } from './Router';
import { connect } from 'react-redux';
import { addPlace } from './actions/place';

const state = {
  placeName: '',
  places: [],
};

const App = () => (
  <View style={{ flex: 1 }}>
    <RouterComponent></RouterComponent>
  </View>
);

const mapStateToProps = state => {
  return {
    places: state.places.places,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    add: name => {
      dispatch(addPlace(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
