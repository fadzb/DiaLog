import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { CarbScreen } from '../screens/CarbScreen';
import { LogActScreen } from '../screens/LogActScreen';
import { ViewActScreen } from '../screens/ViewActScreen';
import { TrainScreen } from '../screens/TrainScreen';
import { APITestScreen } from '../screens/APITestScreen';
import { ModuleScreen } from '../screens/ModuleScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainTabNavigator from './MainTabNavigator';

export default (initialRoute: any) =>
  createStackNavigator(
    {
      Home: {
        screen: MainTabNavigator,
        navigationOptions: {
          title: 'Home',
          headerLeft: null,
        },
      },
      Login: LoginScreen,
      Carb: CarbScreen,
      LogAct: LogActScreen,
      ViewAct: ViewActScreen,
      Train: TrainScreen,
      ApiTest: APITestScreen,
      Mod: ModuleScreen,
      Reg: RegisterScreen,
    },
    {
      initialRouteName: `${initialRoute}`,
      headerMode: 'screen',

      defaultNavigationOptions: {
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
