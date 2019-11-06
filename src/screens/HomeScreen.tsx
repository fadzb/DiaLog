import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from './LoginScreen';
import { CarbScreen } from './CarbScreen';
import { LogActScreen } from './LogActScreen';
import { TrainScreen } from './TrainScreen';
import Button from '../components/Button';

const labels = {
  LOGIN: 'Login',
  CARB: 'Estimate CHO',
  LOG_ACT: 'Log Activity',
  TRAIN: 'Training Modules',
};

class HomeScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    // Just to see what was passed...
    console.log(props);
  }

  handleLoginNav = () => {
    this.props.navigation.navigate('Login', {});
  };

  handleEstimateNav = () => {
    this.props.navigation.navigate('Carb', {});
  };

  handleLogActNav = () => {
    this.props.navigation.navigate('LogAct', {});
  };

  handleTrainNav = () => {
    this.props.navigation.navigate('Train', {});
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Text>Home Screen</Text>
        <Button label={labels.LOGIN} onPress={this.handleLoginNav} />
        <Button label={labels.CARB} onPress={this.handleEstimateNav} />
        <Button label={labels.LOG_ACT} onPress={this.handleLogActNav} />
        <Button label={labels.TRAIN} onPress={this.handleTrainNav} />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Login: LoginScreen,
    Carb: CarbScreen,
    LogAct: LogActScreen,
    Train: TrainScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
