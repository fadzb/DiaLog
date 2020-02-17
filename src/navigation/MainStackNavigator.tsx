import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

//TODO: https://github.com/react-navigation/react-navigation/issues/741 to get individual header titles

// Configure routes statically
export default (initialRoute: any) =>
  createStackNavigator(
    {
      Home: {
        screen: MainTabNavigator,
        navigationOptions: {
          headerLeft: null,
        },
      },
      Reg: RegisterScreen,
      Login: LoginScreen,
      ApiTest: APITestScreen,

      // At the moment, these screens will not show tab bar on bottom: need to define custom componenet
      Train: TrainScreen,
      Mod: ModuleScreen,
    },
    {
      initialRouteName: `${initialRoute}`,
      headerMode: 'screen',

      defaultNavigationOptions: {
        title: 'Healthy App',
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
