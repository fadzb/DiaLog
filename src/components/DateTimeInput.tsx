import React, { Component } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'native-base';
import { styles } from '../styles/LogActScreen';

interface DateTimeInputProps {}

export default class DateTimeInput extends React.Component<DateTimeInputProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    date: new Date(),
    mode: '',
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
      date: dateTime,
    });
  };

  // TODO: Need to revist this function
  setDate = (event: any, date: any) => {
    date = date || this.state.date;

    this.setState({
      show: Platform.OS === 'ios' ? true : false,
      date,
    });
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
    const { show, date } = this.state;
    console.log('rendering');
    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={this.showPicker} title="Change Time" />
          <Button onPress={this.hidePicker} title="Hide" />
        </View>
        {show && <DateTimePicker value={date} mode={'datetime'} onChange={this.setDate} />}
        <Text>{this.parseDate(date)}</Text>
      </View>
    );
  }
}
