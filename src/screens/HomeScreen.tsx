import React from 'react';
import { TouchableOpacity, ScrollView } from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { addName } from '../actions/actions';
import { styles } from '../styles/HomeScreen';
import { getIcon } from '../utils/IconUtils';
import { ActivityChart } from '../components/ActivityChart';
import { Card, CardItem, View, Text } from 'native-base';
import { getWidgetById, shouldRenderWidget, getDisabledWidgets } from '../utils/WidgetUtils';
import { Log } from '../typings/Log';
import { WidgetButton } from '../components/WidgetButton';
import { Widget } from '../typings/Widget';
import { RecentLogsWidget } from '../components/RecentLogsWidget';
import WebView from 'react-native-webview';
import LinearGradient from 'react-native-linear-gradient';
import { GradientContainer } from '../components/GradientContainer';
import { GLOBAL } from '../styles/global';
import { TrainWidget } from '../components/TrainWidget';
import { ChatWidget } from '../components/ChatWidget';

interface HomeScreenProps {
  navigation: any;
  channelKey: string;
  addName: (name: any) => void;
  widgets: any;
  logs: Log[];
}

class HomeScreen extends React.Component<HomeScreenProps> {
  navigationWillFocusListener: any;

  constructor(props: any) {
    super(props);

    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      // do something like this.setState() to update your view
      this.handleFocus();
    });
  }

  state = {
    DASHBOARD_TOGGLED: true,
  };

  // Remove listener
  componentWillUnmount() {
    this.navigationWillFocusListener.remove();
  }

  handleFocus = () => {
    // Reset the selected log
    // this.setState({ selectedLog: null });
  };

  handleLoginNav = () => {
    this.props.navigation.navigate('Login', {});
  };

  handleEstimateNav = () => {
    this.props.navigation.navigate('Carb', {});
  };

  handleLogActNav = () => {
    this.props.navigation.navigate('LogAct', {});
  };

  handleViewActNav = () => {
    this.props.navigation.navigate('ViewAct', {});
  };

  handleTrainNav = () => {
    this.props.navigation.navigate('Train', {});
  };

  handleChatNav = () => {
    this.props.navigation.navigate('Chat', {});
  };

  handleApiTestNav = () => {
    this.props.navigation.navigate('ApiTest', {});
  };

  handleProfileNav = () => {
    this.props.navigation.navigate('Profile', {});
  };

  handleReduxTest = () => {
    console.log('testing addName reducer');
    this.props.addName('Faddle');
  };

  toggleDashboard = () => {
    this.setState({ DASHBOARD_TOGGLED: !this.state.DASHBOARD_TOGGLED });
  };

  handleSelectLog = () => {
    this.props.navigation.navigate('ViewAct', {});
  };

  render() {
    const { widgets } = this.props;

    // Widgets
    const recentLogsWidget = getWidgetById('recentLogs', widgets);
    const trainWidget = getWidgetById('Train', widgets);
    const chatWidget = getWidgetById('Chat', widgets);

    // Toggles
    const renderRecentLogs = recentLogsWidget && shouldRenderWidget(recentLogsWidget);
    const renderTrainingModules = trainWidget && shouldRenderWidget(trainWidget);
    const renderChat = chatWidget && shouldRenderWidget(chatWidget);

    // Disabled widgets:
    const disabledWidgets = getDisabledWidgets(this.props.widgets);

    if (this.state.DASHBOARD_TOGGLED) {
      return (
        <ScrollView style={styles.container}>
          {/* Always render Overview Widget */}
          <GradientContainer>
            <View style={GLOBAL.shadowBox}>
              <Card style={styles.card}>
                <CardItem header>
                  <Text>Overview</Text>
                </CardItem>

                <CardItem>
                  <ActivityChart
                    preview={true}
                    logs={this.props.logs}
                    onSelectLog={this.handleSelectLog}
                    navigation={this.props.navigation}
                  />
                </CardItem>
              </Card>
            </View>

            {/* Conditionally render other widgets:*/}

            {/* Recent Logs */}
            {renderRecentLogs && (
              <RecentLogsWidget
                selectedLog={null}
                logs={this.props.logs}
                onSelectLog={() => {}}
                onPressOut={this.handleSelectLog}
                maxLogs={5}
                preview={true}
              />
            )}

            {/* Chat */}
            {renderChat && (
              <ChatWidget navigation={this.props.navigation} channelKey={this.props.channelKey} />
            )}

            {/* Training Modules */}
            {renderTrainingModules && <TrainWidget navigation={this.props.navigation} />}

            {/* Create a list component that takes a list of all disabled widgets */}
            {disabledWidgets.length > 0 && (
              <View style={GLOBAL.shadowBox}>
                <Card style={styles.card}>
                  <CardItem header>
                    <Text>Other Apps</Text>
                  </CardItem>
                  <CardItem>
                    <ScrollView horizontal={true}>
                      {disabledWidgets.map((widget: Widget, index: any) => {
                        return (
                          <WidgetButton
                            navigation={this.props.navigation}
                            widget={widget}
                            key={index}
                          />
                        );
                      })}
                    </ScrollView>
                  </CardItem>
                </Card>
              </View>
            )}

            {/* Toggle View Button */}
            {false && (
              <View style={{ alignSelf: 'center', width: 150, marginTop: 30 }}>
                <Button label={'Toggle Dashboard'} onPress={this.toggleDashboard} />
              </View>
            )}
          </GradientContainer>
        </ScrollView>
      );
    } // Else (Simple Views)
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.handleEstimateNav} style={styles.item}>
            {getIcon('food')}
            <Text style={styles.itemText}>Search Foods</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleLogActNav} style={styles.item}>
            {getIcon('addLog')}
            <Text style={styles.itemText}>Log Activity</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleViewActNav} style={styles.item}>
            {getIcon('activity')}
            <Text style={styles.itemText}>View Activity</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.handleTrainNav} style={styles.item}>
            {getIcon('train')}
            <Text style={styles.itemText}>Training Modules</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleChatNav} style={styles.item}>
            {getIcon('chat')}
            <Text style={styles.itemText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleProfileNav} style={styles.item}>
            {getIcon('profile')}
            <Text style={styles.itemText}>Profile</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={this.handleApiTestNav} style={styles.item}>
            <Text style={styles.itemText}>Test APIs</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.handleReduxTest} style={styles.item}>
            <Text style={styles.itemText}>Test Redux</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignSelf: 'center', width: 150, position: 'absolute', bottom: 0 }}>
          <Button label={'Toggle Dashboard'} onPress={this.toggleDashboard} />
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
    widgets: state.widgets,
    logs: state.logs,
    channelKey: state.channelKey,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addName: (name: any) => {
      dispatch(addName(name));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
