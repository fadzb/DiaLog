import * as React from 'react';
import { Text, View, TextInput } from 'react-native';
import { styles } from '../styles/LoginScreen';
import { login } from '../utils/FirebaseAuth/AuthUtils';
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
} from 'native-base';
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

  //TODO: Alert user
  handleOnSuccessfulLogin = (userCredential: any) => {
    console.log(`${userCredential.user.email} logged in`);
  };

  handleLogin = () => {
    const { email, password } = this.state;

    login(email, password).then(
      userCredential => userCredential && this.handleOnSuccessfulLogin(userCredential),
    );
  };

  handleSwitchToSignUp = () => {
    this.props.navigation.navigate('Reg', {});
  };

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Login</Title>
          </Body>
          <Right />
        </Header>
        <Content>
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
              <Text>Login</Text>
            </Button>
          </Form>
          <Button primary style={styles.registerButton} onPress={this.handleSwitchToSignUp}>
            <Text>Sign Up</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
