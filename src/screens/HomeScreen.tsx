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

interface HomeScreenProps {
  navigation: any;

  //Redux dispatch actions
  addName: (name: any) => void;

  //Redux state
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
    const recentLogsWidget = getWidgetById('recentLogs', this.props.widgets);
    const renderRecentLogs = recentLogsWidget && shouldRenderWidget(recentLogsWidget);

    if (this.state.DASHBOARD_TOGGLED) {
      return (
        <ScrollView style={styles.container}>
          {/* Always render Overview Widget */}
          <GradientContainer>
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

            {/* Conditionally render other widgets: i.e. Recent Logs */}
            {renderRecentLogs && (
              <RecentLogsWidget
                logs={this.props.logs}
                onSelectLog={() => {}}
                onPressOut={this.handleSelectLog}
                maxLogs={5}
                preview={true}
              />
            )}

            {/* Create a list component that takes a list of all disabled widgets */}
            <Card style={styles.card}>
              <CardItem header>
                <Text>Other Apps</Text>
              </CardItem>
              <CardItem>
                <ScrollView horizontal={true}>
                  {getDisabledWidgets(this.props.widgets).map((widget: Widget, index: any) => {
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
