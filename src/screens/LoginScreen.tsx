import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../components/Button';

export class LoginScreen extends Component {
  handleLoginPress = () => {
    // void
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to HealthyApp. Login/Register</Text>
        <Button
          label="Login"
          onPress={this.handleLoginPress}
        ></Button>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fda',
    paddingTop: 50,
    alignItems: 'center',
    flex: 1,
  },
});
