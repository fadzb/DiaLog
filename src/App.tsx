import React, { useState, useEffect } from 'react';
import { createAppContainer } from 'react-navigation';
import { View } from 'native-base';
import { firebase } from '@react-native-firebase/auth';
import { AppStack } from './navigation/MainStackNavigator';
import LinearGradient from 'react-native-linear-gradient';

const NavContainer = ({ initialRoute }: any) => {
  // return React.createElement(createAppContainer(MainStackNavigator(initialRoute)));
  return React.createElement(createAppContainer(AppStack(initialRoute)));
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
    <LinearGradient style={{ flex: 1, minHeight: '100%' }} colors={['#e66465', '#9198e5']}>
      <AppContainer />
    </LinearGradient>
  </View>
);

export default App;
