import React from 'react';
import { TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { addName } from '../actions/actions';
import { styles } from '../styles/HomeScreen';
import { getIcon } from '../utils/IconUtils';
import { ActivityChart } from '../components/ActivityChart';
import { Card, CardItem, View, Text, List, ListItem } from 'native-base';
import { Widget } from '../typings/Widget';
import store from '../store';
import { getWidgetById, shouldRenderWidget } from '../utils/WidgetUtils';

interface HomeScreenProps {
  navigation: any;

  //Redux dispatch actions
  addName: (name: any) => void;

  //Redux state
  widgets: any;
}

const labels = {
  LOGIN: 'Login',
  CARB: 'Estimate CHO',
  LOG_ACT: 'Log Activity',
  VIEW_ACT: 'View Activity',
  TRAIN: 'Training Modules',
  API_TEST: 'Test APIs',
  REDUX_TEST: 'Test Redux',
};

class HomeScreen extends React.Component<HomeScreenProps> {
  constructor(props: any) {
    super(props);
  }

  state = {
    DASHBOARD_TOGGLED: true,
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

  render() {
    const recentLogsWidget = getWidgetById('recentLogs', this.props.widgets);
    const renderRecentLogs = recentLogsWidget && shouldRenderWidget(recentLogsWidget);

    if (this.state.DASHBOARD_TOGGLED) {
      return (
        <ScrollView style={styles.container}>
          {/* Always render Overview Widget */}
          <Card>
            <CardItem header>
              <Text>Overview</Text>
            </CardItem>
            <CardItem>
              <ActivityChart preview={true} />
            </CardItem>
          </Card>

          {/* Conditionally render other widgets: i.e. Recent Logs */}
          {renderRecentLogs && (
            <Card>
              <CardItem header>
                <Text>Recent Logs</Text>
              </CardItem>
              <List>
                <ListItem>
                  <Text>Recent Log 1</Text>
                </ListItem>
                <ListItem>
                  <Text>Recent Log 2</Text>
                </ListItem>
                <ListItem>
                  <Text>Recent Log 3</Text>
                </ListItem>
              </List>
            </Card>
          )}

          {/* Toggle View Button */}
          <View style={{ alignSelf: 'center', width: 150 }}>
            <Button label={'Toggle Dashboard'} onPress={this.toggleDashboard} />
          </View>
        </ScrollView>
      );
    } else
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
