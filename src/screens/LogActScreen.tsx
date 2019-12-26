import * as React from 'react';
import {
  Container,
  Header,
  Content,
  Item,
  Input,
  Title,
  Button,
  Text,
  Form,
  Badge,
} from 'native-base';
import { styles } from '../styles/LogActScreen';
import DateTimeInput from '../components/DateTimeInput';
import { Log } from '../typings/Log';
import { ActivityForm } from '../components/ActivityForm';

interface LogActScreenProps {}

export class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTimeInput: new Date(),
    glucoseInput: 0,
    insulinInput: 0,
    choInput: 0,
  };

  handleChange = (formState: any) => {
    this.setState(formState);
    console.log('changed state');
  };

  handleUpdateDateTime = (dateTimeInput: any) => {
    this.setState({
      dateTimeInput,
    });
  };

  handleSubmit = () => {
    const { dateTimeInput, glucoseInput, insulinInput, choInput } = this.state;

    const log: Log = {
      time: dateTimeInput,
      glucose: glucoseInput,
      insulin: insulinInput,
      cho: choInput,
    };

    console.log(log);
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Log Activity</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <DateTimeInput updateDateTime={this.handleUpdateDateTime} />
          <ActivityForm handleChange={this.handleChange} />
          <Button primary style={styles.submitButton} onPress={this.handleSubmit}>
            <Text>Submit Records</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
