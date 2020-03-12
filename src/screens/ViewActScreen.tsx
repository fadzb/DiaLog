import * as React from 'react';
import { Button, Text, View } from 'native-base';
import { ActivityChart } from '../components/ActivityChart';
import { addName } from '../actions/actions';
import { connect } from 'react-redux';
import { Log } from '../typings/Log';
import { ScrollView } from 'react-native';
import { RecentLogsWidget } from '../components/RecentLogsWidget';
import { LogDetails } from '../components/LogDetails';

interface ViewActScreenProps {
  navigation: any;

  // Redux
  addName: (name: any) => void;
  logs: Log[];
}

class ViewActScreen extends React.Component<ViewActScreenProps> {
  navigationWillFocusListener: any;

  constructor(props: any) {
    super(props);

    // Subscribe to nav focus
    this.navigationWillFocusListener = props.navigation.addListener('willFocus', () => {
      // do something like this.setState() to update your view
      this.handleFocus();
    });
  }

  state = {
    selectedLog: null,
  };

  handleAddNewLog = () => {
    this.props.navigation.navigate('LogAct', {});
  };

  handleSelectLog = (log: Log) => {
    this.setState({ selectedLog: log });
  };

  handleFocus = () => {
    // Reset the selected log
    this.setState({ selectedLog: null });
  };

  // Remove listener
  componentWillUnmount() {
    this.navigationWillFocusListener.remove();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityChart preview={false} logs={this.props.logs} onSelectLog={this.handleSelectLog} />
        <Button
          style={{ width: '98%', alignSelf: 'center', justifyContent: 'center' }}
          onPress={this.handleAddNewLog}
        >
          <Text>Add New Log</Text>
        </Button>

        {/* Recent Logs */}
        {this.props.logs.length > 0 && (
          <ScrollView>
            <RecentLogsWidget logs={this.props.logs} onSelectLog={this.handleSelectLog} />
          </ScrollView>
        )}

        {/* Log Details */}
        {this.state.selectedLog && (
          <LogDetails
            log={this.state.selectedLog}
            closeDetails={() => this.setState({ selectedLog: null })}
          />
        )}
      </View>
    );
  }
}

const mapStateToProps = (state: any) => {
  return {
    name: state.name,
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
)(ViewActScreen);
