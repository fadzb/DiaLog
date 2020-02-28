import * as React from 'react';
import { Container, Header, Content, Title } from 'native-base';
import { styles } from '../styles/LogActScreen';
import { ActivityForm } from '../components/ActivityForm';
import { addLog } from '../actions/actions';
import { connect } from 'react-redux';
import { Log } from '../typings/Log';
import { DateUtils } from '../utils/DateUtils';
import { ScrollView } from 'react-native';

interface LogActScreenProps {
  navigation: any;

  //Redux dispatch actions
  addLog: (log: Log) => void;
}

class LogActScreen extends React.Component<LogActScreenProps> {
  navigationWillFocusListener: any;

  constructor(props: any) {
    super(props);

    // Trying to subscibe component to navigation state
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      // do something like this.setState() to update your view
      this.handleFocus();
    });
  }

  // get food item from navigation prop state
  state = {
    currentTime: new Date(),
    item: {},
  };

  handleFormSubmit = () => {
    this.props.navigation.navigate('ViewAct');
  };

  // Whenever Screen is navigated to
  handleFocus = () => {
    // Set the state to the nav query param
    this.setState({
      currentTime: DateUtils.getTodaysDateTime(),
      item: this.props.navigation.getParam('item'),
    });
    // Clear Params
    this.props.navigation.setParams({ item: null });
  };

  // Remove listener
  componentWillUnmount() {
    this.navigationWillFocusListener.remove();
  }

  render() {
    return (
      <ActivityForm
        currentTime={this.state.currentTime}
        item={this.state.item}
        handleSubmit={this.handleFormSubmit}
        addLog={this.props.addLog}
      />
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addLog: (log: Log) => {
      dispatch(addLog(log));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogActScreen);
