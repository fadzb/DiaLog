import * as React from 'react';
import { styles } from '../styles/LogActScreen';
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

interface ActivityFormProps {
  handleChange: (state: any) => void;
}

export class ActivityForm extends React.Component<ActivityFormProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTimeInput: new Date(),
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
      <Form style={styles.form}>
        <Item rounded style={styles.inputPills}>
          <Input
            placeholder="Enter Glucose"
            onChangeText={this.handleGlucoseChange}
            keyboardType={'numeric'}
          />
          <Badge success style={styles.badge}>
            <Text>{this.state.glucoseInput} mmo/l</Text>
          </Badge>
        </Item>
        <Item rounded style={styles.inputPills}>
          <Input
            placeholder="Enter Insulin"
            onChangeText={this.handleInsulinChange}
            keyboardType={'numeric'}
          />
          <Badge info style={styles.badge}>
            <Text>{this.state.insulinInput} Units</Text>
          </Badge>
        </Item>
        <Item rounded style={styles.inputPills}>
          <Input
            placeholder="Enter CHO"
            onChangeText={this.handleChoChange}
            keyboardType={'numeric'}
          />
          <Badge warning style={styles.badge}>
            <Text>{this.state.choInput} g</Text>
          </Badge>
        </Item>
      </Form>
    );
  }
}
