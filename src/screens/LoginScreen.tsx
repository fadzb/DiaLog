import * as React from 'react';
import { styles } from '../styles/LoginScreen';
import { login, register } from '../utils/FirebaseAuth/AuthUtils';
import {
  Container,
  Left,
  Title,
  Body,
  Right,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Header,
  Text,
  View,
  Tabs,
  Tab,
  TabHeading,
  Icon,
  Toast,
} from 'native-base';
import { SafeAreaView } from 'react-navigation';
import { Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
export const REGISTER_IMAGE = require('../assets/images/register.png');
export const LOGIN_IMAGE = require('../assets/images/login.png');

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

  handleLogin = () => {
    const { email, password } = this.state;

    login(email, password).then(
      userCredential => userCredential && this.handleOnSuccessfulLogin(userCredential),
    );
  };

  handleOnSuccessfulLogin = (userCredential: any) => {
    Toast.show({
      text: `Welcome back ${userCredential.user.displayName || userCredential.user.email}! `,
      type: 'success',
      duration: 4000,
    });
  };

  handleSwitchToSignUp = () => {
    this.props.navigation.navigate('Reg', {});
  };

  handleLoginGuest = () => {
    this.props.navigation.navigate('Home', {});
  };

  handleRegister = () => {
    const { email, password } = this.state;

    //Register then call onSuccessfulRegister to handle what happens next
    register(email, password).then(
      userCredential => userCredential && this.onSuccessfulRegister(userCredential),
    );
  };

  // Currently the onAuthStateChanged which wraps around the App will render the Home Page when a user is logged in
  onSuccessfulRegister = (userCredential: any) => {
    Toast.show({
      text: `Account Registered!`,
      type: 'success',
      duration: 4000,
    });
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <Container>
          <Tabs style={{}}>
            <Tab
              heading={
                <TabHeading>
                  <Text>REGISTER</Text>
                </TabHeading>
              }
            >
              <View style={{ marginTop: 100 }}>
                <Image style={{ alignSelf: 'center' }} source={REGISTER_IMAGE} />
                <Form>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={this.handleEmailChange} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={this.handlePasswordChange} />
                  </Item>
                  <Button primary style={styles.registerButton} onPress={this.handleRegister}>
                    <Text style={styles.buttonText}>REGISTER</Text>
                  </Button>
                </Form>
              </View>
            </Tab>
            <Tab
              heading={
                <TabHeading>
                  <Text>LOGIN</Text>
                </TabHeading>
              }
            >
              <View style={{ marginTop: 100 }}>
                <Image style={{ alignSelf: 'center' }} source={LOGIN_IMAGE} />
                <Form>
                  <Item floatingLabel>
                    <Label>Email</Label>
                    <Input onChangeText={this.handleEmailChange} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input secureTextEntry onChangeText={this.handlePasswordChange} />
                  </Item>
                  <Button primary style={styles.registerButton} onPress={this.handleLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                  </Button>
                </Form>
                <Button
                  primary
                  style={[styles.registerButton, { backgroundColor: 'orange' }]}
                  onPress={this.handleLoginGuest}
                >
                  <Text style={styles.buttonText}>LOGIN as Guest</Text>
                </Button>
              </View>
            </Tab>
          </Tabs>
        </Container>
      </KeyboardAwareScrollView>
    );
  }
}
