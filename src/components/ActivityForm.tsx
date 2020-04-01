import * as React from 'react';
import { styles } from '../styles/LogActScreen';
import { Item, Input, Button, Text, Form, Badge, Icon, CardItem, View, Toast } from 'native-base';
import DateTimeInput from './DateTimeInput';
import { Log } from '../typings/Log';
import { FoodItem } from '../typings/FoodItem';
import ActivityAddButton from './ActivityAddButton';
import { makeNotesFromItem } from '../utils/ActivityLogUtils';
import { getIcon } from '../utils/IconUtils';
import { TouchableOpacity, AccessibilityInfo } from 'react-native';
import { Card } from 'react-native-paper';
import { GLOBAL, PRIMARY, SECONDARY } from '../styles/global';
import { DateUtils } from '../utils/DateUtils';

interface ActivityFormProps {
  handleSubmit: () => void;
  item: FoodItem;
  currentTime: any;
  navigation: any;

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

    // Empty Log
    if (log.insulin == 0 && log.cho == 0 && log.glucose == 0) {
      Toast.show({
        text: `Error: Cannot Submit Empty Log!`,
        buttonText: 'Okay',
      });
      return;
    }

    Toast.show({
      text: `Log at ${DateUtils.parseDateTimeIntoDateLabel(dateTimeInput)} Added!`,
      buttonText: 'Okay',
    });

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
      notesInput: null,
      addGlucose: false,
      addInsulin: false,
      addCho: false,
      addNotes: false,
    });
  };

  //TODO: Add a Clear button
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
      this.props.item &&
        this.setState({
          choInput: Number(this.props.item.cho),
          notesInput: makeNotesFromItem(this.props.item),
        });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Form style={styles.form}>
          <View
            style={[
              {
                backgroundColor: 'white',
                marginVertical: 20,
                borderRadius: 30,
                // borderWidth: 3,
                paddingHorizontal: 10,
              },
              GLOBAL.shadowBox,
            ]}
          >
            <DateTimeInput
              currentTime={this.state.dateTimeInput}
              updateDateTime={this.handleUpdateDateTime}
            />
          </View>

          {/* TODO: Refactor: export component to ActivityInput */}
          {/* <ActivityInput placeholder="Enter Glucose" badgeType="glucose" /> */}

          {this.state.addGlucose ? (
            <Item rounded style={[styles.inputPills, GLOBAL.shadowBox]}>
              <Input
                ref={input => {
                  this.textInputs.glucoseRef = input;
                }}
                placeholder="Enter Glucose"
                onChangeText={this.handleGlucoseChange}
                keyboardType={'numeric'}
                maxLength={2}
              />
              <Badge success style={styles.badge}>
                <Text>{this.state.glucoseInput} mmo/l</Text>
              </Badge>
            </Item>
          ) : (
            <ActivityAddButton success handlePress={() => this.setState({ addGlucose: true })}>
              <Text style={styles.buttonText}>Add Blood Glucose</Text>
            </ActivityAddButton>
          )}

          {this.state.addInsulin ? (
            <Item rounded style={[styles.inputPills, GLOBAL.shadowBox]}>
              <Input
                ref={input => {
                  this.textInputs.insulinRef = input;
                }}
                placeholder="Enter Insulin"
                onChangeText={this.handleInsulinChange}
                keyboardType={'numeric'}
                maxLength={2}
              />
              <Badge info style={styles.badge}>
                <Text>{this.state.insulinInput} Units</Text>
              </Badge>
            </Item>
          ) : (
            <ActivityAddButton info handlePress={() => this.setState({ addInsulin: true })}>
              <Text style={styles.buttonText}>Add Insulin</Text>
            </ActivityAddButton>
          )}

          {this.getName() || this.state.addCho ? (
            <Item rounded style={[styles.inputPills, GLOBAL.shadowBox]}>
              <Input
                ref={input => {
                  this.textInputs.choRef = input;
                }}
                placeholder={this.getName() || 'Enter Carbohydrate'}
                onChangeText={this.handleChoChange}
                keyboardType={'numeric'}
                maxLength={3}
              />
              <Badge warning style={styles.badge}>
                <Text>{this.state.choInput} g</Text>
              </Badge>
            </Item>
          ) : (
            <View style={{}}>
              <ActivityAddButton
                warning
                style={{ backgroundColor: SECONDARY }}
                handlePress={() => this.setState({ addCho: true })}
              >
                <Text style={styles.buttonText}>Add Carbohydrate</Text>
              </ActivityAddButton>
              <TouchableOpacity onPressOut={() => this.props.navigation.navigate('Carb')}>
                <Icon
                  style={{
                    position: 'absolute',
                    right: -40,
                    bottom: 13,
                    color: PRIMARY,
                  }}
                  name={'search'}
                />
              </TouchableOpacity>
            </View>
          )}

          {this.state.addNotes || this.state.notesInput ? (
            <Item rounded style={[styles.inputPills, GLOBAL.shadowBox]}>
              <Input
                ref={input => {
                  this.textInputs.notesRef = input;
                }}
                placeholder="Enter Notes..."
                onChangeText={this.handleNotesChange}
                keyboardType={'default'}
                multiline={true}
                numberOfLines={5}
                style={{ lineHeight: 23, height: 100 }}
                value={this.state.notesInput}
              />
            </Item>
          ) : (
            <Button
              light
              onPress={() => this.setState({ addNotes: true })}
              style={[{ marginVertical: 20 }, GLOBAL.shadowBox]}
            >
              <Text>Add Notes...</Text>
            </Button>
          )}
        </Form>

        <View
          style={[
            {
              justifyContent: 'flex-end',
              alignItems: 'center',
              marginBottom: 36,
              flex: 1,
            },
            GLOBAL.shadowBox,
          ]}
        >
          <Button
            style={{ width: '65%', justifyContent: 'center', marginVertical: 20, borderRadius: 10 }}
            onPress={this.handleSubmit}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 21 }}>SUBMIT LOG</Text>
          </Button>
        </View>
      </View>
    );
  }
}
