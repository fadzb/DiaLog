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
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          title: 'Home',
        },
      },
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
        headerStyle: {
          backgroundColor: '#f4511e',
          borderBottomWidth: 0,
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

const AppContainer = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user: any) {
    console.log('onAuthStateChanged fired.');
    if (user) {
      //Signed in
      setUser(user);
    } else {
      //Signed Out or switched accounts
      setUser(user);
    }
    if (initializing) {
      setInitializing(false);
    }
  }

  //React runs function returned by useEffect when component unmounts
  useEffect(() => {
    console.log('useEffect fired.');
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  if (user) {
    return <NavContainer initialRoute={'Home'} />;
  }
  return <NavContainer initialRoute={'Login'} />;
};

const App = () => (
  <View style={{ flex: 1 }}>
    <AppContainer />
  </View>
);

export default App;
