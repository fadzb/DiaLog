import * as React from 'react';
import { styles } from '../styles/LogActScreen';
import { Item, Input, Button, Text, Form, Badge } from 'native-base';
import DateTimeInput from './DateTimeInput';
import { Log } from '../typings/Log';
import { FoodItem } from '../typings/FoodItem';

interface ActivityFormProps {
  handleSubmit: () => void;
  item: FoodItem;
  currentTime: any;

  //Redux dispatch actions
  addLog: (log: Log) => void;
}

export class ActivityForm extends React.Component<ActivityFormProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTimeInput: this.props.currentTime,
    glucoseInput: 0,
    insulinInput: 0,
    choInput: 0,
  };

  handleUpdateDateTime = (dateTimeInput: any) => {
    this.setState({
      dateTimeInput: dateTimeInput,
    });
  };

  handleGlucoseChange = (glucoseInput: string) => {
    this.setState({
      glucoseInput: glucoseInput ? Number(glucoseInput) : 0,
    });
  };

  handleInsulinChange = (insulinInput: string) => {
    this.setState({
      insulinInput: insulinInput ? Number(insulinInput) : 0,
    });
  };

  handleChoChange = (choInput: string) => {
    this.setState({
      choInput: choInput ? Number(choInput) : 0,
    });
  };

  // Submit inputs as log then clear form
  handleSubmit = () => {
    const { dateTimeInput, glucoseInput, insulinInput, choInput } = this.state;

    const log: Log = {
      time: dateTimeInput,
      glucose: glucoseInput,
      insulin: insulinInput,
      cho: choInput,
    };

    // Dispatch redux action
    this.props.addLog(log);

    // Clear Inputs
    this.clearInputs();

    // Record Submitted: go to view activity screen
    this.props.handleSubmit();
  };

  getName = () => {
    if (this.props.item) {
      return this.props.item.name;
    }
  };

  //TODO: Only clears badges, not text input values
  clearInputs = () => {
    console.log('cleared');
    this.setState({ dateTimeInput: new Date(), glucoseInput: 0, insulinInput: 0, choInput: 0 });
  };

  //TODO: Make the inputs more discrete initially, so it is clear to the user that not all fields are neccessary
  //TODO: Add a Clear button
  //TODO: Allow user to add a note
  //TODO: Format time more appropriately

  // Componenet Updated: May have moved off and back onto screen
  componentDidUpdate(prevProps: any, prevState: any) {
    if (prevProps.item !== this.props.item) {
      this.props.item && this.setState({ choInput: Number(this.props.item.cho) });
    }
    if (prevProps.currentTime !== this.props.currentTime) {
      this.setState({ dateTimeInput: this.props.currentTime });
    }
  }

  render() {
    console.log(this.state.glucoseInput);

    return (
      <Form style={styles.form}>
        <DateTimeInput
          currentTime={this.state.dateTimeInput}
          updateDateTime={this.handleUpdateDateTime}
        />
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
            placeholder={this.getName() || 'Enter CHO'}
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
