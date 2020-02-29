import * as React from 'react';
import {
  Container,
  Header,
  Content,
  Title,
  Button,
  Text,
  View,
  Card,
  CardItem,
  List,
  ListItem,
} from 'native-base';
import { styles } from '../styles/ViewActScreen';
import { ActivityChart } from '../components/ActivityChart';
import { addName } from '../actions/actions';
import { connect } from 'react-redux';
import { Log } from '../typings/Log';
import { ScrollView } from 'react-native';
import { RecentLogsWidget } from '../components/RecentLogsWidget';

interface ViewActScreenProps {
  navigation: any;

  // Redux
  addName: (name: any) => void;
  logs: Log[];
}

class ViewActScreen extends React.Component<ViewActScreenProps> {
  constructor(props: any) {
    super(props);
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

  render() {
    return (
      <View style={{ flex: 1 }}>
        <ActivityChart preview={false} logs={this.props.logs} />
        <Button
          style={{ width: '98%', alignSelf: 'center', justifyContent: 'center' }}
          onPress={this.handleAddNewLog}
        >
          <Text>Add New Log</Text>
        </Button>

        {/* Recent Logs */}
        <ScrollView>
          <RecentLogsWidget logs={this.props.logs} onSelectLog={this.handleSelectLog} />
        </ScrollView>

        {/* Log Details */}
        {this.state.selectedLog && (
          <View>
            <Card>
              <CardItem header>
                <Text>Log Details</Text>
              </CardItem>
              <Text>Time: {String(this.state.selectedLog.time)}</Text>
              <Text>Carbohydrate: 0g</Text>
            </Card>
          </View>
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
