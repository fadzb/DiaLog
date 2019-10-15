import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';
// import { connect } from 'react-redux';
// import { LoadingView, SocialButton } from '../components';
// import { login } from '../actions';
import colors from '../colors';
import fonts from '../fonts';
// import i18n from '../i18n';
// import imgAppIcon from '../../assets/images/app-icon.png';
// import imgGoogleIcon from '../../assets/images/google-icon.png';

export class LoginScreen extends Component {
  render() {
    return (
        <View style={styles.container}>
            <Text>
                Welcome to HealthyApp. Login/Register
            </Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fda',
        paddingTop: 50,
        alignItems: "center",
        flex: 1,
    }
});
