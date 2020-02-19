import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body } from 'native-base';
import { DEFAULT_PIC } from '../utils/ProfileUtils';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';
import { Widget } from '../typings/Widget';
import { dispatchUpdateWidget, getWidgetById } from '../utils/WidgetUtils';
import { connect } from 'react-redux';

interface ProfileScreenProps {
  navigation: any;

  // Redux state-props
  widgets: Widget[];
}

const profilePic = DEFAULT_PIC;

class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    user: getCurrentUser(),
  };

  handleRecentLogsChange = (widget: Widget | undefined, newValue: boolean) => {
    if (!widget) {
      console.log('Widget undefined');
      return;
    }

    // Update widget with new value (i.e. enabled/disabled)
    widget.enabled = newValue;

    // Dispatch action
    dispatchUpdateWidget(widget);
  };

  render() {
    const { user } = this.state;
    const { widgets } = this.props;

    // Get widgets
    const recentLogsWidget = getWidgetById('recentLogs', widgets);

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

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    widgets: state.widgets,
  };
};

//TODO: Should be dispatching from here rather than Widget Utils
const mapDispatchToProps = (dispatch: any) => {
  return {};
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
