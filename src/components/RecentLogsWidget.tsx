import * as React from 'react';
import { View, Text, Card, CardItem, List, ListItem } from 'native-base';
import { Log } from '../typings/Log';
import { sortByDateDescending } from '../utils/ActivityLogUtils';

interface RecentLogsWidgetProps {
  logs: Log[];
  onSelectLog: (log: Log) => void;
  onPressOut?: (log: Log) => void;
  maxLogs?: number;
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
      <View>
        <Card>
          <CardItem header>
            <Text>Recent Logs</Text>
          </CardItem>
          <List>
            {sortedLogs.slice(0, this.props.maxLogs).map((log: Log, index: any) => {
              return (
                <ListItem
                  key={index}
                  onPress={() => this.props.onSelectLog(log)}
                  onPressOut={() => onPressOut(log)}
                >
                  <Text>{String(new Date(log.time))}</Text>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </View>
    );
  }
}
