import React from 'react';
import { View } from 'react-native';
import { RouterComponent } from './Router';
import { connect } from 'react-redux';
import { addName } from './actions/actions';
import { LoginScreen } from './screens/LoginScreen';

const state = {
  name: 'user',
};

const App = () => (
  <View style={{ flex: 1 }}>
    {/* <RouterComponent></RouterComponent> */}
    <LoginScreen />
  </View>
);

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch: (dispatch: any) => void) => {
  return {
    addName: (name: any) => {
      dispatch(addName(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);
