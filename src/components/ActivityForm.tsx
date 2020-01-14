import * as React from 'react';
import { styles } from '../styles/LogActScreen';
import { Item, Input, Button, Text, Form, Badge } from 'native-base';
import DateTimeInput from './DateTimeInput';
import { Log } from '../typings/Log';
import { aysncStoreItem } from '../storage/AsyncStorage';
import { FoodItem } from '../typings/FoodItem';

interface ActivityFormProps {
  handleSubmit: () => void;
  item: FoodItem;
}

export class ActivityForm extends React.Component<ActivityFormProps> {
  // If coming from Estimate CHO screen, set initial state for CHO
  cho: number = (this.props.item && Number(this.props.item.cho)) || 0;

  constructor(props: any) {
    super(props);
  }

  state = {
    dateTimeInput: new Date(),
    glucoseInput: 0,
    insulinInput: 0,
    choInput: this.cho,
  };

  handleUpdateDateTime = (dateTimeInput: any) => {
    this.setState({
      dateTimeInput,
    });
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

  handleSubmit = () => {
    const { dateTimeInput, glucoseInput, insulinInput, choInput } = this.state;

    const log: Log = {
      time: dateTimeInput,
      glucose: glucoseInput,
      insulin: insulinInput,
      cho: choInput,
    };

    // Store this log
    aysncStoreItem(log.time.toString(), log);

    // Record Submitted: go to view activity screen
    this.props.handleSubmit();
  };

  //TODO: Make the inputs more discrete initially, so it is clear to the user that not all fields are neccessary

  render() {
    return (
      <Form style={styles.form}>
        <DateTimeInput updateDateTime={this.handleUpdateDateTime} />
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
            placeholder={String(this.props.item.name) || 'Enter CHO'}
            onChangeText={this.handleChoChange}
            keyboardType={'numeric'}
          />
          <Badge warning style={styles.badge}>
            <Text>{this.state.choInput} g</Text>
          </Badge>
        </Item>
        <Button primary style={styles.submitButton} onPress={this.handleSubmit}>
          <Text>Submit Records</Text>
        </Button>
      </Form>
    );
  }
}
