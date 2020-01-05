import * as React from 'react';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Label,
  Input,
  Body,
  Title,
  Left,
  Text,
  Right,
  Button,
} from 'native-base';
import auth from '@react-native-firebase/auth';
import { styles } from '../styles/RegisterScreen';

interface RegisterScreenProps {
  navigation: any;
}

export class RegisterScreen extends React.Component<RegisterScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state: any = {
    email: '',
    password: '',
  };

  // Registers user then signs them in and returns user credential promise
  async register(email: string, password: any) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(userCredential => {
        console.log('success...' + userCredential);
        this.onSuccessfulRegister(userCredential);
      })
      .catch(error => console.log(error));
  }

  // Redirect to home page and display alert (Account registered, now logged in)
  onSuccessfulRegister = (userCredential: any) => {
    // for now just log the display name
    console.log(userCredential.user.displayName);
  };

  handleEmailChange = (email: string) => {
    this.setState({ email });
  };

  handlePasswordChange = (password: string) => {
    this.setState({ password });
  };

  handleRegister = () => {
    const { email, password } = this.state;

    this.register(email, password);
  };

  //TODO: Add event handler for return (enter key) submission

  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Sign Up</Title>
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
            <Button primary style={styles.registerButton} onPress={this.handleRegister}>
              <Text>Register</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}
