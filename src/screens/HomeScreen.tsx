import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { LoginScreen } from './LoginScreen';
import Button from '../components/Button';

class HomeScreen extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    // Just to see what was passed...
    console.log(props);
  }

  handleButtonPress = () => {
    this.props.navigation.navigate('Login', {});
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
        <Button
          label={'Go to login page'}
          onPress={this.handleButtonPress}
        />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    // Carb: CarbScreen,
    Login: LoginScreen,
  },
  {
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
