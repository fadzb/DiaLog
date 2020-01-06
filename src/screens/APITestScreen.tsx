import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/APITestScreen';
import { getLogsForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
import { aysncStoreItem, asyncGetAllKeys, asyncMultiRemove } from '../storage/AsyncStorage';
import { firebase } from '@react-native-firebase/auth';
import { ErrorCodes } from '../utils/FirebaseAuth/ErrorCodes';

const TEST_EMAIL = 'test@gmail.com';
const TEST_PASSWORD = '123456';

interface APITestScreenProps {
  navigation: any;
}

export class APITestScreen extends React.Component<APITestScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {};

  handleGoBack = () => {
    this.props.navigation.goBack();
  };

  testTodaysLogs = () => {
    // Getting logs for todays date
    getLogsForDate(DateUtils.getTodaysDateTime())
      .then(logs => console.log(logs))
      .catch(error => console.log('Error getting todays logs.' + error));
  };

  addNewLog = () => {
    //Create a log
    const log: Log = {
      time: DateUtils.getTodaysDateTime(),
      glucose: 3,
      insulin: 3,
      cho: 3,
    };

    // Store this log
    aysncStoreItem(log.time.toString(), log);
  };

  clearAllLogs = () => {
    asyncGetAllKeys().then(keys => asyncMultiRemove(keys));
  };

  // Firebase Auth Tests

  register = async () => {
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
      console.log('success.');
    } catch (error) {
      if (error.code == ErrorCodes.emailAlreadyInUse) {
        console.log('Test account already registered...');
      }
    }
  };

  getCurrentUser = () => {
    const user = firebase.auth().currentUser;
    user && console.log(user.email);
    return user;
  };

  login = async () => {
    //Login a test user
    console.log('before');
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(TEST_EMAIL, TEST_PASSWORD);
      console.log(userCredential.user.email + ' logged in.');
    } catch (error) {
      console.log(error);
    }
    console.log('after');
  };

  signOut = async () => {
    const currentUser = this.getCurrentUser();
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Test APIs</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <Title>Test AsyncStorage</Title>
          <Button style={styles.testButtons} onPress={this.testTodaysLogs}>
            <Text>Test Todays Logs</Text>
          </Button>
          <Button style={styles.testButtons} onPress={this.addNewLog}>
            <Text>Add New Log</Text>
          </Button>
          <Button style={styles.testButtons} onPress={this.clearAllLogs}>
            <Text>Clear All Logs</Text>
          </Button>
        </Content>
        <Content style={styles.contentContainer}>
          <Title>Test Firebase Auth</Title>
          <Button style={styles.testButtons} onPress={this.register}>
            <Text>Register</Text>
          </Button>
          <Button style={styles.testButtons} onPress={this.getCurrentUser}>
            <Text>Get Current User</Text>
          </Button>
          <Button style={styles.testButtons} onPress={this.login}>
            <Text>Login</Text>
          </Button>
          <Button style={styles.testButtons} onPress={this.signOut}>
            <Text>Sign out</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
