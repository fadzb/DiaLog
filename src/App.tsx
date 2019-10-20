import React from 'react';
import { View } from 'react-native';
import { RouterComponent } from './Router';
import { connect } from 'react-redux';
import { addPlace } from './actions/place';

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
