import React from 'react';
import { View, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { DateUtils } from '../utils/DateUtils';

interface DateTimeInputProps {
  updateDateTime: (dateTimeInput: any) => void;
}

const ANDROID = Platform.OS === 'android';

export default class DateTimeInput extends React.Component<DateTimeInputProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTime: new Date(),
    show: false,
  };

  componentDidMount = () => {
    const todaysDateTime = DateUtils.getTodaysDateTime();

    this.setState({
      dateTime: todaysDateTime,
    });

    this.props.updateDateTime(todaysDateTime);
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

  render() {
    const { show, dateTime } = this.state;

    return (
      <View>
        <View style={{ flexDirection: 'row' }}>
          <Button onPress={this.showPicker} title="Change Time" />
          <Button onPress={this.hidePicker} title="Hide" />
        </View>
        {show && <DateTimePicker value={dateTime} mode={'datetime'} onChange={this.setDateTime} />}
        {ANDROID && show && (
          <DateTimePicker value={dateTime} mode={'time'} onChange={this.setDateTime} />
        )}
        <Text>{DateUtils.parseDate(dateTime)}</Text>
      </View>
    );
  }
}
