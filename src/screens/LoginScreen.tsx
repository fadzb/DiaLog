import React, { Component } from 'react';
import { Text, View, TextInput } from 'react-native';
import Button from '../components/Button';
import { container } from '../styles/LoginScreen';
import { Header } from 'react-native/Libraries/NewAppScreen';
import css from '@emotion/native';

const text = css`
  height: 40;
  bordercolour: black;
`;

export class LoginScreen extends Component {
  handleLoginPress = () => {
    // void
  };

  render() {
    return (
      <View style={container}>
        <Text style={text}>Welcome to HealthyApp</Text>
        <TextInput style={text}>Name</TextInput>
        <Button
          label="Login"
          onPress={this.handleLoginPress}
        ></Button>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#fda',
//     paddingTop: 50,
//     alignItems: 'center',
//     flex: 1,
//   },
// });
