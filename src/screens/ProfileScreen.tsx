import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body, Switch } from 'native-base';
import { DEFAULT_PIC, createGuestUser } from '../utils/ProfileUtils';
import { Image } from 'react-native';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';
import { Widget } from '../typings/Widget';
import { createDispatchHook } from 'react-redux';
import store from '../store';
import { addName } from '../actions/actions';
import { dispatchUpdateWidget } from '../utils/WidgetUtils';

interface ProfileScreenProps {
  navigation: any;
}

const profilePic = DEFAULT_PIC;

const recentLogsWidget: Widget = {
  widgetId: 'recentLogs',
  widgetName: 'Recent Logs',
  enabled: true,
};

export class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    user: getCurrentUser(),
  };

  handleRecentLogsChange = (newValue: boolean) => {
    // Update widget with new value (i.e. enabled/disabled)
    recentLogsWidget.enabled = newValue;
    // Dispatch action
    dispatchUpdateWidget(recentLogsWidget);
  };

  render() {
    const { user } = this.state;

    return (
      <View>
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={profilePic} />
              <Body>
                <Text>{user.displayName || 'No Display Name'}</Text>
                <Text note>{user.email}</Text>
              </Body>
            </Left>
          </CardItem>
        </Card>
        <Card>
          <CardItem header bordered>
            <Text>Widgets Enabled</Text>
          </CardItem>
          <CardItem>
            <SwitchButton widget={recentLogsWidget} handleChange={this.handleRecentLogsChange} />
          </CardItem>
        </Card>
      </View>
    );
  }
}
