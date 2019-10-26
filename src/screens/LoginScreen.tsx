import * as React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { styles } from '../styles/LoginScreen';
import colors from '../colors';
const EMAIL_PLACEHOLDER = 'Email';
const PASSWORD_PLACEHOLDER = 'Password';
const LOGIN_LABEL = 'Login';

export class LoginScreen extends React.Component {
  readonly state: any = {
    email: '',
    password: '',
  };

  handleEmailChange = (email: string) => {
    this.setState({ email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password });
  };

  handleLoginPress = () => {
    // should verify account
    // for now will just advance to next screen
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to HealthyApp</Text>

        <View style={styles.form}>
          <TextInput
            style={styles.text}
            placeholder={EMAIL_PLACEHOLDER}
            onChangeText={this.handleEmailChange}
          />
          <TextInput
            style={styles.text}
            placeholder={PASSWORD_PLACEHOLDER}
            onChangeText={this.handlePasswordChange}
          />
          <Button
            label={LOGIN_LABEL}
            onPress={this.handleLoginPress}
          />
        </View>
      </View>
    );
  }
}
