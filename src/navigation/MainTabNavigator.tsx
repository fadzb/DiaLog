import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import { CarbScreen } from '../screens/CarbScreen';
import LogActScreen from '../screens/LogActScreen';
import ViewActScreen from '../screens/ViewActScreen';
import { getIcon } from '../utils/IconUtils';
import ProfileScreen from '../screens/ProfileScreen';

export const TabNavigator = () =>
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeScreen,
        navigationOptions: {
          tabBarLabel: 'Home',
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
        screen: ProfileScreen,
        navigationOptions: {
          tabBarLabel: 'Profile',
        },
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
        // tab bar options can go here
        title: 'Healthy App',
        headerMode: 'screen',
        headerStyle: {
          backgroundColor: '#f4511e',
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }),
    },
  );
