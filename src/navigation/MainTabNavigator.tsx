import React from 'react';
import { Image, View, StyleSheet, Text } from 'react-native';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import { colors } from '../colors';

export default createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Calendar: {
      screen: HomeScreen,
      navigationOptions: {},
    },
    Grids: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      },
    },
    Pages: {
      screen: HomeScreen,
      navigationOptions: {},
    },
    Components: {
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
          case 'Calendar':
            iconSource = 'iconCalendar';
            break;
          case 'Grids':
            iconSource = 'iconGrids';
            break;
          case 'Pages':
            iconSource = '';
            break;
          case 'Components':
            iconSource = 'iconComponents';
            break;
          default:
            iconSource = 'iconComponents';
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
