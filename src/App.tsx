import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './screens/HomeScreen';
import { LoginScreen } from './screens/LoginScreen';
import { CarbScreen } from './screens/CarbScreen';
import { LogActScreen } from './screens/LogActScreen';
import { ViewActScreen } from './screens/ViewActScreen';
import { TrainScreen } from './screens/TrainScreen';
import { APITestScreen } from './screens/APITestScreen';
import { ModuleScreen } from './screens/ModuleScreen';
import RegisterScreen from './screens/RegisterScreen';
import { View } from 'native-base';
import { firebase } from '@react-native-firebase/auth';

// TODO: May need to add async functions to wait for fonts for Native Base: https://github.com/GeekyAnts/NativeBase

// Todo: Tidy up
const AppNavigator = (initialRoute: any) =>
  createStackNavigator(
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
      initialRouteName: `${initialRoute}`,
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

const NavContainer = ({ initialRoute }: any) => {
  return React.createElement(createAppContainer(AppNavigator(initialRoute)));
};

const AppContainer = (props: any) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('onAuthStateChanged fired.');
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    console.log('useEffect fired.');
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (user) {
    console.log('user email: ' + user.email);
    return <NavContainer initialRoute={'Home'} />;
  }
  console.log('no user');
  return <NavContainer initialRoute={'Reg'} />;
};

const App = () => (
  <View style={{ flex: 1 }}>
    <AppContainer />
  </View>
);

export default App;
