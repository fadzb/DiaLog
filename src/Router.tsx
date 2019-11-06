import React, { Component } from 'react';
import { Scene, Stack, Router } from 'react-native-router-flux';
import { LoginScreen } from './screens/LoginScreen';

export class RouterComponent extends Component {
  render() {
    return (
      <Router>
        <Stack key="root">
          <Stack key="login" hideNavBar>
            <Scene component={LoginScreen} />
          </Stack>
        </Stack>
      </Router>
    );
  }
}
