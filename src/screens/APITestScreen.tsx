import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/APITestScreen';
import { getLogsForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
import { aysncStoreItem, asyncGetAllKeys, asyncMultiRemove } from '../storage/AsyncStorage';

import { login, signOut, getCurrentUser, register } from '../utils/FirebaseAuth/AuthUtils';
import { ScrollView } from 'react-native';
import { addTodo, getModules } from '../utils/FirebaseDB/FirestoreUtils';

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
    //Will register the test account if not already registered
    register(TEST_EMAIL, TEST_PASSWORD);
  };

  getCurrentUser = () => {
    //Gets current user
    getCurrentUser();
  };

  login = () => {
    //Login a test user
    login(TEST_EMAIL, TEST_PASSWORD);
  };

  signOut = () => {
    //Sign out
    signOut();
  };

  addTodo = () => {
    //Add todo to 'todos' collection
    addTodo();
  };

  getModules = () => {
    getModules('Diabetes Basics').then((moduleList: any) =>
      console.log('Module list: ' + moduleList),
    );
  };

  render() {
    return (
      <ScrollView>
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
          <Content style={styles.contentContainer}>
            <Title>Test Firestore DB</Title>
            <Button style={styles.testButtons} onPress={this.addTodo}>
              <Text>Add Todo</Text>
            </Button>
            <Button style={styles.testButtons} onPress={this.getModules}>
              <Text>Get Modules</Text>
            </Button>
          </Content>
        </Container>
      </ScrollView>
    );
  }
}
