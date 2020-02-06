import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Button from '../components/Button';
import { connect } from 'react-redux';
import { addName } from '../actions/actions';
import { styles } from '../styles/HomeScreen';

interface HomeScreenProps {
  navigation: any;

  //Redux dispatch actions
  addName: (name: any) => void;
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
    if (this.state.DASHBOARD_TOGGLED) {
      return (
        <View style={styles.container}>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.handleEstimateNav} style={styles.item}>
              {/* <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} /> */}
              <Text style={styles.itemText}>Search Foods</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.handleTrainNav} style={styles.item}>
              {/* <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} /> */}
              <Text style={styles.itemText}>Training Modules</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.handleLogActNav} style={styles.item}>
              {/* <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} /> */}
              <Text style={styles.itemText}>Log Activity</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.handleViewActNav} style={styles.item}>
              {/* <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} /> */}
              <Text style={styles.itemText}>View Activity</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.row}>
            <TouchableOpacity onPress={this.handleProfileNav} style={styles.item}>
              {/* <Image resizeMode="contain" source={chartIcon} style={styles.itemImage} /> */}
              <Text style={styles.itemText}>Profile</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.item}>
            <Button label={'Toggle Dashboard'} onPress={this.toggleDashboard} />
          </View>
        </View>
      );
    } else
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text>Home Screen</Text>
          <Button label={labels.LOGIN} onPress={this.handleLoginNav} />
          <Button label={labels.CARB} onPress={this.handleEstimateNav} />
          <Button label={labels.LOG_ACT} onPress={this.handleLogActNav} />
          <Button label={labels.VIEW_ACT} onPress={this.handleViewActNav} />
          <Button label={labels.TRAIN} onPress={this.handleTrainNav} />
          <Button label={labels.API_TEST} onPress={this.handleApiTestNav} />
          <Button label={labels.REDUX_TEST} onPress={this.handleReduxTest} />

          <Button label={'Toggle Dashboard'} onPress={this.toggleDashboard} />
        </View>
      );
  }
}

const mapStateToProps = () => {
  return {
    name: 'state.name for now is faddle',
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
