import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';
import { TabNavigator } from './MainTabNavigator';
import ChatScreen from '../screens/ChatScreen';

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
    },
    {
      initialRouteName: `${initialRoute}`,
      headerMode: 'screen',

      defaultNavigationOptions: {
        title: 'DiaLog',
        headerStyle: {
          // backgroundColor: '#f4511e',
          backgroundColor: '#e66465',
          borderBottomWidth: 0,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      },
    },
  );
