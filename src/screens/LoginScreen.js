import React, { Component } from 'react';
import { StyleSheet, Image, Text, View } from 'react-native';

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
