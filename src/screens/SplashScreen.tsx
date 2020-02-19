import React from 'react';
import { View } from 'native-base';
import { ActivityIndicator } from 'react-native';

export default class SplashScreen extends React.Component {
  render() {
    console.log('splash screen rendered');
    return (
      <View>
        <ActivityIndicator size={'large'} color="#0000ff" />
      </View>
    );
  }
}
