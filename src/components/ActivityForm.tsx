import * as React from 'react';
import { styles } from '../styles/LogActScreen';
import { Item, Input, Button, Text, Form, Badge, View, Textarea } from 'native-base';
import DateTimeInput from './DateTimeInput';
import { Log } from '../typings/Log';
import { FoodItem } from '../typings/FoodItem';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { ActivityInput } from './ActivityInput';
import ActivityAddButton from './ActivityAddButton';
import { getIcon } from '../utils/IconUtils';
import { AbstractChart } from 'react-native-chart-kit';
import { Keyboard } from 'react-native';

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

  textInputs = {
    glucoseRef: null,
    insulinRef: null,
    choRef: null,
    notesRef: null,
  };

  state = {
    dateTimeInput: this.props.currentTime,
    glucoseInput: 0,
    insulinInput: 0,
    choInput: 0,
    notesInput: '',

    // Toggle inputs
    addGlucose: false,
    addInsulin: false,
    addCho: false,
    addNotes: false,
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

  handleNotesChange = (notesInput: string) => {
    this.setState({
      notesInput: notesInput,
    });
  };

  // Submit inputs as log then clear form
  handleSubmit = () => {
    const { dateTimeInput, glucoseInput, insulinInput, choInput, notesInput } = this.state;

    const log: Log = {
      time: dateTimeInput,
      glucose: glucoseInput,
      insulin: insulinInput,
      cho: choInput,
      notes: notesInput,
    };

    // Dispatch redux action
    this.props.addLog(log);

    // Clear Inputs
    this.resetInputs();

    // Record Submitted: go to view activity screen
    this.props.handleSubmit();
  };

  getName = () => {
    if (this.props.item) {
      return this.props.item.name;
    }
  };

  resetInputs = () => {
    // Clear inputs
    this.textInputs.glucoseRef && this.textInputs.glucoseRef._root.clear();
    this.textInputs.insulinRef && this.textInputs.insulinRef._root.clear();
    this.textInputs.choRef && this.textInputs.choRef._root.clear();
    this.textInputs.notesRef && this.textInputs.notesRef._root.clear();

    // Re-hide inputs and reset state
    this.setState({
      dateTimeInput: new Date(),
      glucoseInput: 0,
      insulinInput: 0,
      choInput: 0,
      notesRef: '',
      addGlucose: false,
      addInsulin: false,
      addCho: false,
      addNotes: false,
    });
  };

  //TODO: Make the inputs more discrete initially, so it is clear to the user that not all fields are neccessary
  //TODO: Add a Clear button
  //TODO: Allow user to add a note
  //TODO: Format time more appropriately

  // Componenet Updated: May have moved off and back onto screen
  componentDidUpdate(prevProps: any) {
    // Time has changed
    if (prevProps.currentTime !== this.props.currentTime) {
      // Update time and reset inputs
      this.resetInputs();
    }
    // Pass in item CHO from search screen
    if (prevProps.item !== this.props.item) {
      this.props.item && this.setState({ choInput: Number(this.props.item.cho) });
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        {/* <SafeAreaView style={{ flex: 1 }}> */}
        <ScrollView contentContainerStyle={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{ padding: 24, flex: 1, justifyContent: 'flex-end' }}>
              <Form style={styles.form}>
                <DateTimeInput
                  currentTime={this.state.dateTimeInput}
                  updateDateTime={this.handleUpdateDateTime}
                />

                {/* TODO: Refactor: export component to ActivityInput */}
                {/* <ActivityInput placeholder="Enter Glucose" badgeType="glucose" /> */}

                {this.state.addGlucose ? (
                  <Item rounded style={styles.inputPills}>
                    <Input
                      ref={input => {
                        this.textInputs.glucoseRef = input;
                      }}
                      placeholder="Enter Glucose"
                      onChangeText={this.handleGlucoseChange}
                      keyboardType={'numeric'}
                    />
                    <Badge success style={styles.badge}>
                      <Text>{this.state.glucoseInput} mmo/l</Text>
                    </Badge>
                  </Item>
                ) : (
                  <ActivityAddButton
                    success
                    handlePress={() => this.setState({ addGlucose: true })}
                  >
                    <Text>Add Glucose</Text>
                  </ActivityAddButton>
                )}

                {this.state.addInsulin ? (
                  <Item rounded style={styles.inputPills}>
                    <Input
                      ref={input => {
                        this.textInputs.insulinRef = input;
                      }}
                      placeholder="Enter Insulin"
                      onChangeText={this.handleInsulinChange}
                      keyboardType={'numeric'}
                    />
                    <Badge info style={styles.badge}>
                      <Text>{this.state.insulinInput} Units</Text>
                    </Badge>
                  </Item>
                ) : (
                  <ActivityAddButton info handlePress={() => this.setState({ addInsulin: true })}>
                    <Text>Add Insulin</Text>
                  </ActivityAddButton>
                )}

                {this.getName() || this.state.addCho ? (
                  <Item rounded style={styles.inputPills}>
                    <Input
                      ref={input => {
                        this.textInputs.choRef = input;
                      }}
                      placeholder={this.getName() || 'Enter Carbohydrate'}
                      onChangeText={this.handleChoChange}
                      keyboardType={'numeric'}
                    />
                    <Badge warning style={styles.badge}>
                      <Text>{this.state.choInput} g</Text>
                    </Badge>
                  </Item>
                ) : (
                  <ActivityAddButton warning handlePress={() => this.setState({ addCho: true })}>
                    <Text>Add Carbohydrate</Text>
                  </ActivityAddButton>
                )}

                {this.state.addNotes ? (
                  <Item rounded style={styles.inputPills}>
                    <Input
                      ref={input => {
                        this.textInputs.notesRef = input;
                      }}
                      placeholder="Enter Notes..."
                      onChangeText={this.handleNotesChange}
                      keyboardType={'default'}
                      multiline={true}
                      numberOfLines={5}
                      style={{ lineHeight: 23, height: 200 }}
                    />
                  </Item>
                ) : (
                  <Button
                    light
                    onPress={() => this.setState({ addNotes: true })}
                    style={{ marginVertical: 20 }}
                  >
                    <Text>Add Notes...</Text>
                  </Button>
                )}
              </Form>

              <View
                style={{
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  marginBottom: 36,
                  flex: 1,
                }}
              >
                <Button
                  style={{ width: '70%', justifyContent: 'center' }}
                  onPress={this.handleSubmit}
                >
                  <Text>Submit Log</Text>
                </Button>

                {/* <View style={{ flex: 1 }} /> */}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {/* </SafeAreaView> */}
      </KeyboardAvoidingView>
    );
  }
}
