import React from 'react';
import { View } from 'react-native';
import { RouterComponent } from './Router';
import { connect } from 'react-redux';
import { addPlace } from './actions/place';

// const state = {
//   placeName: '',
//   places: [],
// };

const App = () => (
  <View style={{ flex: 1 }}>
    <RouterComponent></RouterComponent>
  </View>
);

const mapStateToProps = (state: any) => {
  return {
    places: state.places,
  };
};

const mapDispatchToProps = (dispatch: (dispatch: any) => void) => {
  return {
    add: (name: any) => {
      dispatch(addPlace(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
