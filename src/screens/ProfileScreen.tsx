import * as React from 'react';
import { View, Card, CardItem, Left, Thumbnail, Text, Body, Button, Switch } from 'native-base';
import { DEFAULT_PIC } from '../utils/ProfileUtils';
import { getCurrentUser } from '../utils/FirebaseAuth/AuthUtils';
import { SwitchButton } from '../components/SwitchButton';
import { Widget } from '../typings/Widget';
import { dispatchUpdateWidget, getWidgetById } from '../utils/WidgetUtils';
import { connect } from 'react-redux';
import { setChoRatio, setInsulinSuggestions } from '../actions/actions';
import NumericInput from 'react-native-numeric-input';
import store from '../store';

interface ProfileScreenProps {
  navigation: any;
  widgets: Widget[];
  choRatio: number;
  insulinSuggestions: boolean;
  setChoRatio: (ratio: number) => void;
  setInsulinSuggestions: (value: boolean) => void;
}

const profilePic = DEFAULT_PIC;

class ProfileScreen extends React.Component<ProfileScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    user: getCurrentUser(),
    choRatioInput: this.props.choRatio,
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

  handleChoRatioInput = (value: number) => {
    this.setState({ choRatioInput: value });
    this.props.setChoRatio(value);
  };

  clearApp = () => {
    store
      .getPersistor()
      .purge()
      .then(() => console.log('App Cleared.'))
      .catch(error => console.log(error));
  };

  render() {
    const { user } = this.state;
    const { widgets } = this.props;

    // Get widgets
    const recentLogsWidget = getWidgetById('recentLogs', widgets);

    return (
      <View>
        {/* Profile */}
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

        {/* Widgets */}
        <Card>
          <CardItem header bordered>
            <Text>Widgets Enabled</Text>
          </CardItem>
          <CardItem>
            <SwitchButton widget={recentLogsWidget} handleChange={this.handleRecentLogsChange} />
          </CardItem>
        </Card>

        <Card>
          <CardItem header bordered>
            <Text>Carbohydrate Counting</Text>
          </CardItem>

          {/* Enable/ Disable */}
          <CardItem>
            <Text>Enable Insulin Suggestions: </Text>
            <Switch
              value={this.props.insulinSuggestions}
              onValueChange={this.props.setInsulinSuggestions}
            ></Switch>
          </CardItem>

          {this.props.insulinSuggestions && (
            <CardItem>
              <Text>Insulin : Carb Ratio </Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                <Text>1 Unit : </Text>
                <NumericInput
                  value={this.state.choRatioInput}
                  type="up-down"
                  onChange={this.handleChoRatioInput}
                  // onChange={value => this.props.setChoRatio(value)}
                  totalWidth={100}
                  // totalHeight={60}
                  // iconSize={25}
                  step={0.5}
                  valueType="real"
                  rounded
                  // textColor="#B0228C"
                  // iconStyle={{ color: 'white' }}
                  // rightButtonBackgroundColor="#EA3788"
                  // leftButtonBackgroundColor="#E56B70"
                />
                <Text> g</Text>
              </View>
            </CardItem>
          )}
        </Card>

        {/* Other Settings */}
        <Card>
          <CardItem header bordered>
            <Text>Other Settings</Text>
          </CardItem>

          <CardItem>
            <Button onPress={this.clearApp}>
              <Text>Clear App Memory (Purge Redux)</Text>
            </Button>
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
    logs: state.logs,
    choRatio: state.choRatio,
    insulinSuggestions: state.insulinSuggestions,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setChoRatio: (ratio: number) => {
      dispatch(setChoRatio(ratio));
    },
    setInsulinSuggestions: (value: boolean) => {
      dispatch(setInsulinSuggestions(value));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileScreen);
