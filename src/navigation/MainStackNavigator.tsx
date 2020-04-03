import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { TabNavigator } from './MainTabNavigator';
import ChatScreen from '../screens/ChatScreen';
import { WebViewScreen } from '../screens/WebViewScreen';
import { Image, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
const LOGO = require('../assets/images/logo-4.png');
const SCREEN_HEIGHT = Dimensions.get('window').height;

//FIXME: https://github.com/react-navigation/react-navigation/issues/741 to get individual header titles

// Configure routes statically
export const AppStack = (initialRoute: any) =>
  createStackNavigator(
    {
      Home: {
        screen: TabNavigator,
        navigationOptions: {},
      },
      Reg: RegisterScreen,
      Login: LoginScreen,
      ApiTest: APITestScreen,
      Chat: ChatScreen,
      Train: TrainScreen,
      Mod: ModuleScreen,
      Web: WebViewScreen,
    },
    {
      initialRouteName: `${initialRoute}`,
      headerMode: 'screen',

      defaultNavigationOptions: {
        headerBackground: (
          <Image
            source={LOGO}
            style={{ alignSelf: 'center', marginTop: SCREEN_HEIGHT > 800 ? 40 : 20 }}
          />
        ),
        headerStyle: {
          // backgroundColor: '#e66465',
          // backgroundColor: '#9198e5',

          backgroundColor: 'rgba(252, 126, 0, 1)',
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerBackTitle: 'Back',
      },
    },
  );
