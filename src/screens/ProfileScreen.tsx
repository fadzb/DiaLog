import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body } from 'native-base';
import { DEFAULT_PIC } from '../utils/ProfileUtils';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';
import { recentLogsWidget } from '../typings/Widget';
import { dispatchUpdateWidget } from '../utils/WidgetUtils';

interface ProfileScreenProps {
  navigation: any;
}

const profilePic = DEFAULT_PIC;

export class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  // Get a ref to widgets
  recentLogsWidget = recentLogsWidget;

  state = {
    user: getCurrentUser(),
  };

  handleRecentLogsChange = (newValue: boolean) => {
    // Update widget with new value (i.e. enabled/disabled)
    const widget = this.recentLogsWidget;
    widget.enabled = newValue;

    // Dispatch action
    dispatchUpdateWidget(widget);
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
            <SwitchButton
              widget={this.recentLogsWidget}
              handleChange={this.handleRecentLogsChange}
            />
          </CardItem>
        </Card>
      </View>
    );
  }
}
