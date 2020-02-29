import * as React from 'react';
import { View, Switch, Text, Card, CardItem, List, ListItem } from 'native-base';
import { Widget } from '../typings/Widget';
import { Log } from '../typings/Log';

interface RecentLogsWidgetProps {
  logs: Log[];
  onSelectLog: (log: Log) => void;
}

export class RecentLogsWidget extends React.Component<RecentLogsWidgetProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { logs } = this.props;

    return (
      <View>
        <Card>
          <CardItem header>
            <Text>Recent Logs</Text>
          </CardItem>
          <List>
            {logs.map((log: Log, index: any) => {
              return (
                <ListItem key={index} onPress={() => this.props.onSelectLog(log)}>
                  <Text>{String(log.time)}</Text>
                </ListItem>
              );
            })}
          </List>
        </Card>
      </View>
    );
  }
}
