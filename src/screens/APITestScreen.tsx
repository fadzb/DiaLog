import * as React from 'react';
import { Container, Header, Content, Title, Button, Text } from 'native-base';
import { styles } from '../styles/APITestScreen';
import { getLogsForDate } from '../utils/ActivityLogUtils';
import { DateUtils } from '../utils/DateUtils';
import { Log } from '../typings/Log';
import { aysncStoreItem, asyncGetAllKeys, asyncMultiRemove } from '../storage/AsyncStorage';

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
      .catch(error => console.log('error here...' + error));
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
      </Container>
    );
  }
}
