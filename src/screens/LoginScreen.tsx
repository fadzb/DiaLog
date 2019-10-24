import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { Header } from 'react-native/Libraries/NewAppScreen';
import css from '@emotion/native';
import { Styles } from '../styles/LoginScreen';
import colors from '../colors';

const text = css`
  height: 40;
  bordercolour: ${colors.PURPLE};
  borderbottomwidth: ${StyleSheet.hairlineWidth};
  marginbottom: 20;
`;

const EMAIL_PLACEHOLDER = 'Email';
const PASSWORD_PLACEHOLDER = 'Password';

export class LoginScreen extends Component {
  handleLoginPress = () => {
    // void
  };

  render() {
    return (
      <View style={Styles.container}>
        <Text>Welcome to HealthyApp</Text>
        <View style={Styles.form}>
          <TextInput style={text} placeholder={EMAIL_PLACEHOLDER} />
          <TextInput
            style={text}
            placeholder={PASSWORD_PLACEHOLDER}
          />
          <Button label="Login" onPress={this.handleLoginPress} />
        </View>
      </View>
    );
  }
}
