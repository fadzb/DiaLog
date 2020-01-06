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
import { connect } from 'react-redux';

interface RegisterScreenProps {
  navigation: any;
}

class RegisterScreen extends React.Component<RegisterScreenProps> {
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
        console.log('success...');
        this.onSuccessfulRegister(userCredential);
      })
      .catch(error => console.log(error));
  }

  // Redirect to home page and display alert (Account registered, now logged in)
  onSuccessfulRegister = (userCredential: any) => {
    // for now just log the display name
    console.log(userCredential.user.email);
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

  handleSwitchToLogin = () => {
    this.props.navigation.navigate('Login', {});
  };

  handleSwitchToHome = () => {
    this.props.navigation.navigate('Home', {});
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
          <Button primary style={styles.registerButton} onPress={this.handleSwitchToLogin}>
            <Text>Switch to Login</Text>
          </Button>
          <Button primary style={styles.registerButton} onPress={this.handleSwitchToHome}>
            <Text>Switch to Home</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);
