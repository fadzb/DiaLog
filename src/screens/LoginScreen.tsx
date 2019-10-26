import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { styles } from '../styles/LoginScreen';
import colors from '../colors';
const EMAIL_PLACEHOLDER = 'Email';
const PASSWORD_PLACEHOLDER = 'Password';

export class LoginScreen extends Component {
  handleLoginPress = () => {
    // void
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to HealthyApp</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.text}
            placeholder={EMAIL_PLACEHOLDER}
          />
          <TextInput
            style={styles.text}
            placeholder={PASSWORD_PLACEHOLDER}
          />
          <Button label="Login" onPress={this.handleLoginPress} />
        </View>
      </View>
    );
  }
}
