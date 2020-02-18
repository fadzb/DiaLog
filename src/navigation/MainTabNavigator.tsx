import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import { CarbScreen } from '../screens/CarbScreen';
import LogActScreen from '../screens/LogActScreen';
import ViewActScreen from '../screens/ViewActScreen';
import { getIcon } from '../utils/IconUtils';
import ProfileScreen from '../screens/ProfileScreen';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { Text } from 'native-base';

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
    //TODO: Use onPress to ensure the dateTimePicker updates upon navigate
    LogAct: {
      screen: LogActScreen,
      navigationOptions: ({ navigation }: any) => ({
        tabBarLabel: ({ tintColor }: any) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('LogActScreen', { date: new Date() })}
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>All</Text>
          </TouchableOpacity>
        ),
      }),
    },
    ViewAct: {
      screen: ViewActScreen,
      navigationOptions: {
        tabBarLabel: 'Activity',
      },
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {},
    },
  },
  {
    defaultNavigationOptions: ({ navigation }: any) => ({
      // eslint-disable-next-line react/prop-types
      tabBarIcon: () => {
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
