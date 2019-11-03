import React from 'react';
import { View } from 'react-native';
import { RouterComponent } from './Router';
import { connect } from 'react-redux';
import { addName } from './actions/actions';
import { LoginScreen } from './screens/LoginScreen';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';

const state = {
  name: 'user',
};

const AppNavigator = createStackNavigator({
  Home: HomeScreen,
});

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <View style={{ flex: 1 }}>
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
