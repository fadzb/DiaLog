import * as React from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { styles } from '../styles/LoginScreen';
const EMAIL_PLACEHOLDER = 'Email';
const PASSWORD_PLACEHOLDER = 'Password';
const LOGIN_LABEL = 'Login';
const SIGNUP_LABEL = 'Sign Up';

interface LoginScreenProps {
  navigation: any;
}

export class LoginScreen extends React.Component<LoginScreenProps> {
  state: any = {
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

  handleSwitchToSignUp = () => {
    this.props.navigation.navigate('Reg', {});
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
          <Button label={LOGIN_LABEL} onPress={this.handleLoginPress} />
          <Button label={SIGNUP_LABEL} onPress={this.handleSwitchToSignUp} />
        </View>
      </View>
    );
  }
}
