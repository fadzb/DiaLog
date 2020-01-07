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
import { styles } from '../styles/RegisterScreen';
import { connect } from 'react-redux';
import { register } from '../utils/FirebaseAuth/AuthUtils';

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

  // Currently the onAuthStateChanged which wraps around the App will render the Home Page when a user is logged in
  onSuccessfulRegister = (userCredential: any) => {
    //TODO: Show an alert box or maybe send an email
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

    //Register then call onSuccessfulRegister to handle what happens next
    register(email, password).then(
      userCredential => userCredential && this.onSuccessfulRegister(userCredential),
    );
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
