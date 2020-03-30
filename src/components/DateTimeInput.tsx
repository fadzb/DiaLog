import React from 'react';
import { View, Platform, Button, Dimensions, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Text, Icon } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { DateUtils } from '../utils/DateUtils';
import { SECONDARY, PRIMARY } from '../styles/global';
const SCREEN_HEIGHT = Dimensions.get('window').height;

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
    show: SCREEN_HEIGHT > 800 ? true : false,
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

  togglePicker = () => {
    this.setState({
      show: !this.state.show,
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
      <View style={{ marginVertical: 10, minWidth: '80%' }}>
        <View style={styles.pickerControls}>
          {/* {!show && <Button onPress={this.showPicker} title="Change Time" />} */}
          {show && <Button onPress={this.hidePicker} title="Hide" />}
        </View>
        {show && (
          <DateTimePicker
            style={{ width: 300 }}
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

        <TouchableOpacity
          style={{ flexDirection: 'row', alignSelf: 'center' }}
          onPress={this.togglePicker}
        >
          <Icon name="clock" style={{ backgroundColor: 'white', color: 'orange' }} />
          <Text
            style={{
              marginLeft: 10,
              marginTop: 3,
              fontSize: 22,
              color: PRIMARY,
            }}
          >
            {DateUtils.parseDateTimeIntoDateLabel(dateTime)}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
