import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { View } from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import { TabNavigator } from './navigation/MainTabNavigator';

// TODO: May need to add async functions to wait for fonts for Native Base: https://github.com/GeekyAnts/NativeBase

const NavContainer = ({ initialRoute }: any) => {
  // return React.createElement(createAppContainer(MainStackNavigator(initialRoute)));
  return React.createElement(createAppContainer(TabNavigator(initialRoute)));
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
