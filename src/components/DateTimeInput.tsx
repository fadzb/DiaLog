import React from 'react';
import { View, Platform, Button } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { DateUtils } from '../utils/DateUtils';

interface DateTimeInputProps {
  currentTime: any;
  updateDateTime: (dateTimeInput: any) => void;
}

const ANDROID = Platform.OS === 'android';

export default class DateTimeInput extends React.Component<DateTimeInputProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    dateTime: this.props.currentTime,
    show: false,
  };

  setDateTime = (event: any, dateTime: any) => {
    if (dateTime) {
      this.setState({
        show: Platform.OS === 'ios',
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

  // Update time if parent component updated in meantime
  componentDidUpdate = (prevProps: any) => {
    if (prevProps.currentTime != this.props.currentTime) {
      this.setState({ dateTime: this.props.currentTime });
    }
  };

  render() {
    const { show, dateTime } = this.state;

    return (
      <View>
        <View style={styles.pickerControls}>
          <Button onPress={this.showPicker} title="Change Time" />
          <Button onPress={this.hidePicker} title="Hide" />
        </View>
        {show && (
          <DateTimePicker
            display={'default'}
            is24Hour={true}
            value={dateTime}
            mode={'datetime'}
            onChange={this.setDateTime}
          />
        )}
        {ANDROID && show && (
          <DateTimePicker value={dateTime} mode={'time'} onChange={this.setDateTime} />
        )}
        <Text>{DateUtils.parseDate(dateTime)}</Text>
      </View>
    );
  }
}
