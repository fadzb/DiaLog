import React, { Component } from 'react';
import { View, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'native-base';
import { styles } from '../styles/LogActScreen';

interface DateTimeInputProps {
  updateDateTime: (dateTimeInput: any) => void;
}

export default class DateTimeInput extends React.Component<DateTimeInputProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTime: new Date(),
    show: false,
  };

  componentDidMount = () => {
    const date = new Date().getDate(); //Current Date
    const month = new Date().getMonth(); //Current Month
    const year = new Date().getFullYear(); //Current Year
    const hours = new Date().getHours(); //Current Hours
    const min = new Date().getMinutes(); //Current Minutes
    const sec = new Date().getSeconds(); //Current Seconds

    const dateTime = new Date(year, month, date, hours, min, sec);
    this.setState({
      dateTime,
    });

    this.props.updateDateTime(dateTime);
  };

  setDateTime = (event: any, dateTime: any) => {
    if (dateTime) {
      this.setState({
        show: Platform.OS === 'ios' ? true : false,
        dateTime,
      });
    }

    this.props.updateDateTime(dateTime);
  };

  showPicker = () => {
    this.setState({
      show: true,
    });
  };

  hidePicker = () => {
    this.setState({
      show: false,
    });
  };

  parseDate = (date: any) => {
    let dateString = '';
    dateString += date.toString();
    return dateString;
  };

  render() {
    const { show, dateTime } = this.state;
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={this.showPicker} title="Change Time" />
          <Button onPress={this.hidePicker} title="Hide" />
        </View>
        {show && <DateTimePicker value={dateTime} mode={'datetime'} onChange={this.setDateTime} />}
        <Text>{this.parseDate(dateTime)}</Text>
      </View>
    );
  }
}
