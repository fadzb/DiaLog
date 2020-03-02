import * as React from 'react';
import { styles } from '../styles/LogActScreen';
import { Item, Input, Text, Badge, View } from 'native-base';
import { TouchableOpacity } from 'react-native';

interface ActivityInputProps {}

export class ActivityInput extends React.Component<ActivityInputProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    glucoseInput: 0,

    // Toggle inputs
    addGlucose: false,
  };

  handleGlucoseChange = (glucoseInput: string) => {
    this.setState({
      glucoseInput: glucoseInput ? Number(glucoseInput) : 0,
    });
  };

  getName = () => {
    if (this.props.item) {
      return this.props.item.name;
    }
  };

  clearInputs = () => {
    this.textInput._root.clear();
    this.setState({ dateTimeInput: new Date(), glucoseInput: 0, insulinInput: 0, choInput: 0 });
  };

  render() {
    return (
      <View>
        {this.state.addGlucose ? (
          <Item rounded style={styles.inputPills}>
            <Input
              ref={input => {
                this.textInput = input;
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
          <TouchableOpacity onPress={() => this.setState({ addGlucose: true })}>
            <Badge success style={{ marginLeft: 20, width: 200 }}>
              <Text>Add Glucose</Text>
            </Badge>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}
