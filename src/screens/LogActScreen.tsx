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
  DatePicker,
} from 'native-base';
import { styles } from '../styles/LogActScreen';
import { Badge } from 'react-native-paper';

interface LogActScreenProps {}

export class LogActScreen extends React.Component<LogActScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    insulinInput: 0,
    choInput: 0,
  };

  handleInsulinChange = (insulinInput: string) => {
    this.setState({
      insulinInput,
    });
  };

  handleChoChange = (choInput: string) => {
    this.setState({
      choInput,
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
            <Item rounded style={styles.inputPills}>
              <Input placeholder="Enter Insulin" onChangeText={this.handleInsulinChange} />
              <Badge style={styles.badge}>
                <Text>{this.state.insulinInput} mmo/l</Text>
              </Badge>
            </Item>
            <Item rounded style={styles.inputPills}>
              <Input placeholder="Enter CHO" onChangeText={this.handleChoChange} />
              <Badge style={styles.badge}>
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
