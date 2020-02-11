import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../colors';
import { CarbScreen } from '../screens/CarbScreen';
import LogActScreen from '../screens/LogActScreen';
import { ViewActScreen } from '../screens/ViewActScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { Icon } from 'native-base';
import { getIcon } from '../utils/IconUtils';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Carb: {
      screen: CarbScreen,
      navigationOptions: {
        tabBarLabel: 'Food',
      },
    },
    LogAct: {
      screen: LogActScreen,
      navigationOptions: {
        header: null,
        tabBarLabel: 'Add Log',
      },
    },
    ViewAct: {
      screen: ViewActScreen,
      navigationOptions: {
        tabBarLabel: 'Activity',
      },
    },
    Profile: {
      screen: HomeScreen,
      navigationOptions: {},
    },
  },
  {
    defaultNavigationOptions: ({ navigation }: any) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: ({ focused }: any) => {
        const { routeName } = navigation.state;
        let icon = '';
        switch (routeName) {
          case 'Home':
            icon = 'home';
            break;
          case 'Carb':
            icon = 'food';
            break;
          case 'LogAct':
            icon = 'addLog';
            break;
          case 'ViewAct':
            icon = 'activity';
            break;
          case 'Profile':
            icon = 'profile';
            break;
          default:
            icon = 'home';
        }

        return getIcon(icon);
      },
    }),
    // tab bar options can go here
  },
);
