import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import CarbScreen from '../screens/CarbScreen';
import LogActScreen from '../screens/LogActScreen';
import ViewActScreen from '../screens/ViewActScreen';
import { getIcon } from '../utils/IconUtils';
import ProfileScreen from '../screens/ProfileScreen';
import { PRIMARY, SECONDARY, TERTIARY } from '../styles/global';
import { View, Text } from 'native-base';
import * as React from 'react';

export const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }: any) => (
          <Text style={{ fontSize: 13, color: tintColor }}>Home</Text>
        ),
        tabBarIcon: ({ tintColor }) => getIcon('home', tintColor),
      },
    },
    Carb: {
      screen: CarbScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }: any) => (
          <Text style={{ fontSize: 13, color: tintColor }}>Food</Text>
        ),
        tabBarIcon: ({ tintColor }) => getIcon('food', tintColor),
      },
    },
    LogAct: {
      screen: LogActScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }: any) => (
          <Text style={{ fontSize: 13, color: tintColor }}>Add Log</Text>
        ),
        tabBarIcon: ({ tintColor }) => getIcon('addLog', tintColor),
      },
    },
    ViewAct: {
      screen: ViewActScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }: any) => (
          <Text style={{ fontSize: 13, color: tintColor }}>Activity</Text>
        ),
        tabBarIcon: ({ tintColor }) => getIcon('activity', tintColor),
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: ({ tintColor }: any) => (
          <Text style={{ fontSize: 13, color: tintColor }}>Settings</Text>
        ),
        tabBarIcon: ({ tintColor }) => getIcon('settings', tintColor),
      },
    },
  },
  {
    // tab bar options can go here
    tabBarOptions: {
      activeTintColor: SECONDARY,
      inactiveTintColor: PRIMARY,
      // activeBackgroundColor: SECONDARY,
      tabStyle: {},
    },
  },
);

TabNavigator.navigationOptions = ({ navigation }: any) => {
  // const { routeName } = navigation.state.routes[navigation.state.index];
  // console.log(navigation.state.index);

  // You can do whatever you like here to pick the title based on the route name
  // const headerTitle = routeName;

  // const backAction = NavigationActions.back({
  //   key: null,
  // });

  // const headerLeft = (
  //   <HeaderBackButton
  //     backTitleVisible={true}
  //     onPress={() => {
  //       navigation.goBack(null);
  //     }}
  //   />
  // );

  return {
    // headerTitle, //Uncomment to show Screen names in header
    // headerLeft, //Uncomment for headerLeft button
  };
};
