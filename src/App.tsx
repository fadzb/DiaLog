import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { addName } from './actions/actions';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CarbScreen } from './screens/CarbScreen';
import { LogActScreen } from './screens/LogActScreen';
import { ViewActScreen } from './screens/ViewActScreen';
import { TrainScreen } from './screens/TrainScreen';
import { APITestScreen } from './screens/APITestScreen';
import { ModuleScreen } from './screens/ModuleScreen';
import { RegisterScreen } from './screens/RegisterScreen';

// TODO: May need to add async functions to wait for fonts for Native Base: https://github.com/GeekyAnts/NativeBase
// TODO: Need to sort out redux

// const state = {
//   name: 'user',
// };

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Carb: CarbScreen,
    LogAct: LogActScreen,
    ViewAct: ViewActScreen,
    Train: TrainScreen,
    ApiTest: APITestScreen,
    Mod: ModuleScreen,
    Reg: RegisterScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'screen',

    //style the header if decide to render in future
    defaultNavigationOptions: {
      headerShown: false,
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
  },
);

const AppContainer = createAppContainer(AppNavigator);

const App = () => (
  <View style={{ flex: 1 }}>
    <AppContainer />
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
