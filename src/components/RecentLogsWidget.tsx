import * as React from 'react';
import { View, Text, Card, CardItem, List, ListItem } from 'native-base';
import { Log } from '../typings/Log';
import { sortByDateDescending, getLogHeader } from '../utils/ActivityLogUtils';
import { styles } from '../styles/HomeScreen';
import { GLOBAL } from '../styles/global';

interface RecentLogsWidgetProps {
  logs: Log[];
  onSelectLog: (log: Log) => void;
  onPressOut?: (log: Log) => void;
  maxLogs?: number;
  preview?: boolean;
  selectedLog: Log;
}

export class RecentLogsWidget extends React.Component<RecentLogsWidgetProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { logs } = this.props;
    let onPressOut: (log: Log) => void;

    const sortedLogs = sortByDateDescending(logs);

    if (!this.props.onPressOut) {
      onPressOut = () => {};
    } else {
      onPressOut = this.props.onPressOut;
    }

    return (
      <View style={GLOBAL.shadowBox}>
        <Card style={this.props.preview ? styles.card : {}}>
          <CardItem header>
            <Text style={this.props.preview ? styles.header : {}}>Recent Logs</Text>
          </CardItem>
          <List>
            {sortedLogs.slice(0, this.props.maxLogs).map((log: Log, index: any) => {
              return (
                <ListItem
                  key={index}
                  onPress={() => this.props.onSelectLog(log)}
                  onPressOut={() => onPressOut(log)}
                  selected={this.props.selectedLog == log}
                >
                  {getLogHeader(log)}
                </ListItem>
              );
            })}
          </List>
        </Card>
      </View>
    );
  }
}
