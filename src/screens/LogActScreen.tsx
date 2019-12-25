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

interface LogActScreenProps {}

export class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    glucoseInput: 0,
    insulinInput: 0,
    choInput: 0,
  };

  handleGlucoseChange = (glucoseInput: string) => {
    this.setState({
      glucoseInput: glucoseInput ? glucoseInput : 0,
    });
  };

  handleInsulinChange = (insulinInput: string) => {
    this.setState({
      insulinInput: insulinInput ? insulinInput : 0,
    });
  };

  handleChoChange = (choInput: string) => {
    this.setState({
      choInput: choInput ? choInput : 0,
    });
  };

  render() {
    return (
      <Container style={styles.container}>
        <Header>
          <Title>Log Activity</Title>
        </Header>
        <Content style={styles.contentContainer}>
          <Form style={styles.form}>
            <DateTimeInput />
            <Item rounded style={styles.inputPills}>
              <Input placeholder="Enter Glucose" onChangeText={this.handleGlucoseChange} />
              <Badge success style={styles.badge}>
                <Text>{this.state.glucoseInput} mmo/l</Text>
              </Badge>
            </Item>
            <Item rounded style={styles.inputPills}>
              <Input placeholder="Enter Insulin" onChangeText={this.handleInsulinChange} />
              <Badge info style={styles.badge}>
                <Text>{this.state.insulinInput} Units</Text>
              </Badge>
            </Item>
            <Item rounded style={styles.inputPills}>
              <Input placeholder="Enter CHO" onChangeText={this.handleChoChange} />
              <Badge warning style={styles.badge}>
                <Text>{this.state.choInput} g</Text>
              </Badge>
            </Item>
          </Form>
          <Button primary style={styles.submitButton}>
            <Text>Submit Records</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}
