import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../colors';
import { CarbScreen } from '../screens/CarbScreen';
import { LogActScreen } from '../screens/LogActScreen';
import { ViewActScreen } from '../screens/ViewActScreen';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Using similar logic from react-native-starter for Tab Bar Navigation
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
        let iconSource;
        switch (routeName) {
          case 'Home':
            iconSource = 'iconHome';
            break;
          // case 'Calendar':
          //   iconSource = 'iconCalendar';
          //   break;
          // case 'Grids':
          //   iconSource = 'iconGrids';
          //   break;
          // case 'Pages':
          //   iconSource = '';
          //   break;
          // case 'Components':
          //   iconSource = 'iconComponents';
          //   break;
          // default:
          //   iconSource = 'iconComponents';
        }
        return (
          <View>
            <Text>Icon Image</Text>
          </View>
        );
      },
    }),
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: true,
      style: {
        backgroundColor: colors.WHITE,
        borderTopWidth: 0.5,
        borderTopColor: '#d6d6d6',
      },
      labelStyle: {
        color: colors.GRAY,
      },
    },
  },
);
